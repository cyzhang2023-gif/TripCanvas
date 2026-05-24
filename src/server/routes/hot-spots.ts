/** Hot Spots ranking API */

import { apiJson, apiError } from "../utils";
import { getN8nPool } from "../services/n8n-db";
import { spotImageUrl } from "../services/cover-resolver";
import { TTLCache } from "../../lib/ttl-cache";

export type HotSpotRow = {
  name: string;
  image: string;
  category: string;
  rating: number;
  appearance: number;
  destination: string;
  country: string;
  avgQuality: number;
};

const hotSpotsCache = new TTLCache<string, { data: HotSpotRow[]; ts: number }>({
  maxSize: 50,
  ttlMs: 10 * 60 * 1000, // 10 min
});

export async function handleHotSpotsRoutes(
  pathname: string,
  url: URL,
  request: Request,
): Promise<Response | undefined> {
  if (pathname === "/api/hot-spots" && request.method === "GET") {
    return handleHotSpots(url);
  }
  return undefined;
}

async function handleHotSpots(url: URL): Promise<Response> {
  const destination = url.searchParams.get("destination") || "";
  const category = url.searchParams.get("category") || "";
  const limit = Math.min(Number(url.searchParams.get("limit")) || 20, 50);

  const cacheKey = `${destination}|${category}|${limit}`;
  const cached = hotSpotsCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < 10 * 60_000) {
    return apiJson(cached.data, 200, 120);
  }

  const pool = await getN8nPool();
  if (!pool) return apiError(500, "数据库未连接");

  try {
    // Aggregate spots across all published routes
    // Rank by: frequency of appearance + avg quality score + avg rating
    const params: unknown[] = [];
    let whereClause = "WHERE r.status = 'published'";

    if (destination) {
      params.push(destination);
      whereClause += ` AND (
        r.destination ILIKE '%' || $${params.length} || '%'
        OR r.city ILIKE '%' || $${params.length} || '%'
        OR r.country ILIKE '%' || $${params.length} || '%'
      )`;
    }

    if (category) {
      params.push(category);
      whereClause += ` AND ip.category = $${params.length}`;
    }

    params.push(limit);

    const sql = `
      SELECT
        ip.place_name AS name,
        ip.category,
        COALESCE(AVG(ip.rating), 0)::numeric(3,1) AS rating,
        COUNT(DISTINCT r.id)::int AS appearance,
        COALESCE(MAX(r.destination), MAX(r.country)) AS destination,
        MAX(r.country) AS country,
        COALESCE(AVG(r.quality_score), 0)::numeric(5,1) AS avg_quality,
        MAX(ip.image_url) AS image_url,
        MAX(ip.image_query) AS image_query
      FROM itinerary_places ip
      JOIN itinerary_days d ON d.id = ip.day_id
      JOIN routes r ON r.id = d.route_id
      ${whereClause}
        AND ip.place_name IS NOT NULL
        AND ip.place_name != ''
      GROUP BY ip.place_name, ip.category
      HAVING COUNT(DISTINCT r.id) >= 1
      ORDER BY
        (COUNT(DISTINCT r.id) * 2 + COALESCE(AVG(r.quality_score), 0) / 10 + COALESCE(AVG(ip.rating), 0)) DESC,
        COUNT(DISTINCT r.id) DESC
      LIMIT $${params.length}
    `;

    const result = await pool.query(sql, params);

    const rows: HotSpotRow[] = (result.rows as Record<string, unknown>[]).map((r, i) => {
      const name = (r.name as string) || "";
      const cat = (r.category as string) || "景点";
      const imageUrl = (r.image_url as string) || "";
      return {
        name,
        image: imageUrl || spotImageUrl(
          r.image_query as string | undefined,
          name,
          cat,
          i,
        ) || `/api/spot-image?q=${encodeURIComponent(name)}`,
        category: cat,
        rating: Number(r.rating) || 0,
        appearance: Number(r.appearance) || 1,
        destination: (r.destination as string) || "",
        country: (r.country as string) || "",
        avgQuality: Number(r.avg_quality) || 0,
      };
    });

    hotSpotsCache.set(cacheKey, { data: rows, ts: Date.now() });
    return apiJson(rows, 200, 120);
  } catch (err) {
    console.error("[hot-spots] query failed:", err);
    return apiError(500, "获取热门景点失败");
  }
}
