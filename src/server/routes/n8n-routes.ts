/** n8n generated routes API */

import { apiJson, apiError } from "../utils";
import { getN8nPool, n8nRouteToTrip } from "../services/n8n-db";
import { getRouteSpecificCover } from "../services/cover-resolver";
import { getDayTravelInfo, type TravelInfo } from "../../lib/amap-api";
import { travelInfoSchema } from "../../lib/api-schemas";
import { getTripRepository } from "../../lib/tripRepository";
import { TTLCache } from "../../lib/ttl-cache";
import { readJson } from "../utils";

const travelCache = new TTLCache<string, { data: Record<string, TravelInfo>; ts: number }>({
  maxSize: 500,
  ttlMs: 30 * 60 * 1000,
});

export async function handleN8nRoutes(
  pathname: string,
  url: URL,
  request: Request,
  env: unknown,
  ownerId: string,
): Promise<Response | undefined> {
  // POST /api/travel-info
  if (pathname === "/api/travel-info" && request.method === "POST") {
    return handleTravelInfo(request, env, ownerId);
  }

  // GET /api/n8n-routes
  if (pathname === "/api/n8n-routes" && request.method === "GET") {
    return handleN8nRoutesList(url);
  }

  // GET /api/n8n-route-detail
  if (pathname === "/api/n8n-route-detail" && request.method === "GET") {
    return handleN8nRouteDetail(url);
  }

  return undefined;
}

async function handleTravelInfo(request: Request, env: unknown, ownerId: string): Promise<Response> {
  const body = await readJson(request);
  const parsed = travelInfoSchema.safeParse(body);
  if (!parsed.success) return apiError(400, "请提供有效的 tripId 和 dayId");
  const { tripId, dayId } = parsed.data;
  const repository = await getTripRepository(env);

  const trip = await repository.getTrip(tripId, ownerId);
  if (!trip) return apiError(404, "行程不存在");

  const day = trip.days.find((d) => d.id === dayId);
  if (!day) return apiError(404, "天数不存在");

  const cacheKey = `${tripId}:${dayId}`;
  const cached = travelCache.get(cacheKey);
  if (cached) return apiJson(cached.data);

  const persisted = await repository.getRouteSegments(tripId, dayId);
  if (persisted) {
    travelCache.set(cacheKey, { data: persisted, ts: Date.now() });
    return apiJson(persisted);
  }

  try {
    const infoMap = await getDayTravelInfo(day.spots);
    const result: Record<string, TravelInfo> = {};
    infoMap.forEach((val, key) => {
      result[key] = val;
    });
    travelCache.set(cacheKey, { data: result, ts: Date.now() });
    await repository.saveRouteSegments(tripId, dayId, result);
    return apiJson(result);
  } catch (err) {
    console.error("[Travel] Error:", err);
    return apiError(500, "获取路线信息失败");
  }
}

async function handleN8nRoutesList(url: URL): Promise<Response> {
  const pool = await getN8nPool();
  if (!pool) return apiError(500, "n8n 数据库未连接");

  const dest = url.searchParams.get("destination") || "";
  const limit = Math.min(Number(url.searchParams.get("limit")) || 20, 100);

  let sql = `
    SELECT id, route_title, city, country, destination, route_theme,
           summary, days_count, budget_level, travel_type, tags,
           cover_url, likes, quality_score, created_at
    FROM routes
    WHERE status = 'published'
  `;
  const params: unknown[] = [];
  if (dest) {
    params.push(dest);
    sql += ` AND destination = $${params.length}`;
  }
  sql += ` ORDER BY quality_score DESC, created_at DESC`;
  params.push(limit);
  sql += ` LIMIT $${params.length}`;

  const result = await pool.query(sql, params);
  const featuredCityIdx = new Map<string, number>();
  const rows = (result.rows as Record<string, unknown>[]).map((r) => {
    const city = (r.city as string) || "";
    const idx = featuredCityIdx.get(city) ?? 0;
    featuredCityIdx.set(city, idx + 1);
    return {
      ...r,
      cover_url: (r.cover_url as string) || getRouteSpecificCover(
        city,
        (r.route_title as string) || "",
        (r.route_theme as string) || "",
        (r.tags as string) || "",
        idx,
      ),
    };
  });
  return apiJson(rows, 200, 120);
}

async function handleN8nRouteDetail(url: URL): Promise<Response> {
  const pool = await getN8nPool();
  if (!pool) return apiError(500, "n8n 数据库未连接");

  const routeId = Number(url.searchParams.get("id"));
  if (!routeId) return apiError(400, "缺少 id 参数");

  const routeRes = await pool.query("SELECT * FROM routes WHERE id = $1", [routeId]);
  if (routeRes.rows.length === 0) return apiError(404, "路线不存在");
  const route = routeRes.rows[0];

  const daysRes = await pool.query(
    "SELECT * FROM itinerary_days WHERE route_id = $1 ORDER BY day_number",
    [routeId],
  );

  const dayIds = daysRes.rows.map((d) => (d as Record<string, unknown>).id);
  let places: Record<string, unknown>[] = [];
  if (dayIds.length > 0) {
    const placesRes = await pool.query(
      `SELECT * FROM itinerary_places
       WHERE day_id = ANY($1)
       ORDER BY day_id, place_order`,
      [dayIds],
    );
    places = placesRes.rows as Record<string, unknown>[];
  }

  const days = daysRes.rows.map((day) => ({
    ...(day as Record<string, unknown>),
    places: places.filter(
      (p) => p.day_id === (day as Record<string, unknown>).id,
    ),
  }));

  const trip = n8nRouteToTrip(route as Record<string, unknown>, days);
  return apiJson({ route, trip });
}
