/** Explore & destinations API routes */

import { exploreAddSchema } from "../../lib/api-schemas";
import { getDestinationsByRegion, getExploreRoutes, getExploreRouteInfo, addExploreRouteToTrips, optimizeTrip } from "../../lib/tripPlanner";
import { getTripRepository } from "../../lib/tripRepository";
import type { ExploreRoute } from "../../lib/tripTypes";
import { apiJson, apiError, readJson } from "../utils";
import { getN8nPool, n8nRouteToTrip, regionMap } from "../services/n8n-db";
import { citySearchTerms, getRouteCoverUrl, getRouteSpecificCover, validatedCoverCache, resolveValidCoverUrl } from "../services/cover-resolver";
import { createNewJob, importJobs, processImportJob } from "../services/import-jobs";

const AI_STEPS = ["读取攻略来源", "AI 智能解析", "地理编码定位", "优化路线排序"];

export async function handleExploreRoutes(
  pathname: string,
  url: URL,
  request: Request,
  env: unknown,
  ownerId: string,
): Promise<Response | undefined> {
  // GET /api/destinations
  if (pathname === "/api/destinations" && request.method === "GET") {
    return handleDestinations();
  }

  // GET /api/explore
  if (pathname === "/api/explore" && request.method === "GET") {
    return handleExplore(url);
  }

  // POST /api/explore/add
  if (pathname === "/api/explore/add" && request.method === "POST") {
    return handleExploreAdd(request, env, ownerId);
  }

  return undefined;
}

async function handleDestinations(): Promise<Response> {
  const DEST_CACHE_KEY = "__destinations_response__";
  const destCached = validatedCoverCache.get(DEST_CACHE_KEY);
  if (destCached && Date.now() - destCached.ts < 30 * 60_000) {
    return apiJson(JSON.parse(destCached.url), 200, 300);
  }

  try {
    const pool = await getN8nPool();
    if (pool) {
      const { rows } = await pool.query(`
        SELECT country, COUNT(*) AS route_count
        FROM routes WHERE status = 'published'
        GROUP BY country ORDER BY COUNT(*) DESC
      `);

      const countryRouteCount = new Map<string, number>();
      for (const r of rows) {
        const country = (r.country as string) || "";
        if (country) countryRouteCount.set(country, Number(r.route_count) || 0);
      }

      const placedCountries = new Set<string>();
      for (const rm of regionMap) for (const c of rm.countries) placedCountries.add(c);

      const extraCountries = new Set<string>();
      for (const r of rows) {
        const country = (r.country as string) || "";
        if (country && !placedCountries.has(country)) extraCountries.add(country);
      }

      const allCountries: string[] = [];
      for (const { countries } of regionMap) {
        for (const c of countries) {
          if (countryRouteCount.has(c) || countryRouteCount.has(c === "澳洲" ? "澳大利亚" : c)) {
            allCountries.push(c);
          }
        }
      }
      for (const c of extraCountries) allCountries.push(c);

      const coverPromises = allCountries.map(async (country) => {
        const searchTerm = citySearchTerms[country] || `${country} 著名景点`;
        try {
          const url = await resolveValidCoverUrl(searchTerm);
          return [country, url] as const;
        } catch {
          return [country, getRouteCoverUrl(country)] as const;
        }
      });

      const timeout = new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 8000));
      const raceResult = await Promise.race([Promise.all(coverPromises), timeout]);
      const coverMap = new Map<string, string>();
      if (raceResult === "timeout") {
        for (const country of allCountries) {
          const cached = validatedCoverCache.get(citySearchTerms[country] || `${country} 著名景点`);
          coverMap.set(country, cached ? cached.url : getRouteCoverUrl(country));
        }
        Promise.all(coverPromises).catch(() => {});
      } else {
        for (const [country, url] of raceResult) coverMap.set(country, url);
      }

      const groups = regionMap.map(({ region, countries }) => {
        const destinations: { name: string; routes: number; cover: string }[] = [];
        for (const country of countries) {
          const displayName = country === "澳大利亚" ? "澳洲" : country;
          const totalRoutes = countryRouteCount.get(country) || 0;
          if (totalRoutes > 0) {
            destinations.push({
              name: displayName,
              routes: totalRoutes,
              cover: coverMap.get(country) || getRouteCoverUrl(country),
            });
          }
        }
        return { region, destinations };
      }).filter(g => g.destinations.length > 0);

      if (extraCountries.size > 0) {
        const otherDests: { name: string; routes: number; cover: string }[] = [];
        for (const country of extraCountries) {
          const totalRoutes = countryRouteCount.get(country) || 0;
          if (totalRoutes > 0) {
            otherDests.push({
              name: country,
              routes: totalRoutes,
              cover: coverMap.get(country) || getRouteCoverUrl(country),
            });
          }
        }
        if (otherDests.length > 0) {
          groups.push({ region: "其他", destinations: otherDests.sort((a, b) => b.routes - a.routes) });
        }
      }

      if (groups.length > 0) {
        validatedCoverCache.set(DEST_CACHE_KEY, { url: JSON.stringify(groups), ts: Date.now() });
        return apiJson(groups, 200, 300);
      }
    }
  } catch (err) {
    console.error("[destinations] DB query failed, falling back to hardcoded:", err);
  }

  return apiJson(getDestinationsByRegion(), 200, 300);
}

async function handleExplore(url: URL): Promise<Response> {
  const dest = url.searchParams.get("dest") ?? "";
  const hardcoded = getExploreRoutes(dest);

  let n8nExplore: ExploreRoute[] = [];
  try {
    const pool = await getN8nPool();
    if (pool) {
      const n8nSql = `
        SELECT r.id, r.route_title, r.city, r.country, r.destination,
               r.route_theme, r.summary, r.days_count, r.budget_level,
               r.travel_type, r.tags, r.cover_url, r.likes, r.quality_score,
               COUNT(ip.id)::int AS total_spots
        FROM routes r
        LEFT JOIN itinerary_days d ON d.route_id = r.id
        LEFT JOIN itinerary_places ip ON ip.day_id = d.id
        WHERE r.status = 'published'
          ${dest ? "AND (r.destination ILIKE '%' || $1 || '%' OR r.city ILIKE '%' || $1 || '%' OR r.country ILIKE '%' || $1 || '%' OR $1 ILIKE '%' || r.destination || '%' OR $1 ILIKE '%' || r.city || '%' OR $1 ILIKE '%' || r.country || '%')" : ""}
        GROUP BY r.id
        ORDER BY r.quality_score DESC, r.created_at DESC
        LIMIT ${dest ? "30" : "100"}
      `;
      const n8nRes = await pool.query(n8nSql, dest ? [dest] : []);
      const cityIndex = new Map<string, number>();
      n8nExplore = (n8nRes.rows as Record<string, unknown>[]).map((r) => {
        const city = (r.city as string) || "";
        const idx = cityIndex.get(city) ?? 0;
        cityIndex.set(city, idx + 1);
        return {
          id: `n8n-${r.id}`,
          title: (r.route_title as string) || "AI 精选路线",
          days: Number(r.days_count) || 5,
          spots: Number(r.total_spots) || 0,
          source: "AI 智能生成",
          sourceName: "Routey AI",
          sourceVerified: true,
          qualityScore: Number(r.quality_score) || 80,
          includes: undefined,
          likes: Number(r.likes) || 0,
          cover: (r.cover_url as string) || getRouteSpecificCover(
            city,
            (r.route_title as string) || "",
            (r.route_theme as string) || "",
            (r.tags as string) || "",
            idx,
          ),
          tags: r.tags ? String(r.tags).split(",").map((t: string) => t.trim()) : [],
          profileKey: `n8n-${r.id}`,
        };
      });
    }
  } catch {
    /* n8n explore fetch failed */
  }

  if (n8nExplore.length > 0) return apiJson(n8nExplore, 200, 60);
  return apiJson(hardcoded, 200, 120);
}

async function handleExploreAdd(request: Request, env: unknown, ownerId: string): Promise<Response> {
  const body = await readJson(request);
  const parsed = exploreAddSchema.safeParse(body);
  if (!parsed.success) return apiError(400, "请提供有效的路线 ID");
  const { routeId } = parsed.data;
  const repository = await getTripRepository(env);

  if (routeId.startsWith("n8n-")) {
    const pool = await getN8nPool();
    if (!pool) return apiError(500, "n8n 数据库未连接");
    const dbId = Number(routeId.replace("n8n-", ""));
    const routeRes = await pool.query("SELECT * FROM routes WHERE id = $1", [dbId]);
    if (routeRes.rows.length === 0) return apiError(404, "路线不存在");
    const daysRes = await pool.query(
      "SELECT * FROM itinerary_days WHERE route_id = $1 ORDER BY day_number", [dbId],
    );
    const dayIds = daysRes.rows.map((d) => (d as Record<string, unknown>).id);
    let places: Record<string, unknown>[] = [];
    if (dayIds.length > 0) {
      const pRes = await pool.query(
        `SELECT * FROM itinerary_places WHERE day_id = ANY($1) ORDER BY day_id, place_order`,
        [dayIds],
      );
      places = pRes.rows as Record<string, unknown>[];
    }
    const assembledDays = daysRes.rows.map((day) => ({
      ...(day as Record<string, unknown>),
      places: places.filter((p) => p.day_id === (day as Record<string, unknown>).id),
    }));
    const n8nTrip = n8nRouteToTrip(routeRes.rows[0] as Record<string, unknown>, assembledDays);
    n8nTrip.id = `trip-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    return apiJson(await repository.saveUserTrip(n8nTrip, ownerId), 201);
  }

  const trip = addExploreRouteToTrips(routeId, await repository.listUserTrips(ownerId));
  if (trip) {
    return apiJson(await repository.saveUserTrip(trip, ownerId), 201);
  }

  const routeInfo = getExploreRouteInfo(routeId);
  if (!routeInfo) return apiError(404, "路线不存在");

  const aiContent = `${routeInfo.destination} ${routeInfo.title}，${routeInfo.days}天精品行程，关键词：${routeInfo.tags.join("、")}。路线来源：${routeInfo.source}。请生成至少12个真实地点，覆盖景点、餐厅/美食、酒店/住宿、购物、休闲体验，并保留合理每日路线。`;
  const job = createNewJob("text", aiContent);
  importJobs.set(job.id, job);
  processImportJob(job, env, ownerId).catch((err) =>
    console.error("[Explore AI] Unhandled:", err),
  );

  return apiJson({ aiJobId: job.id, title: routeInfo.title }, 202);
}
