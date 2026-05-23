/** n8n PostgreSQL database service */

import type { Spot, Trip } from "../../lib/tripTypes";
import { spotImageUrl, getRouteCoverUrl, getRouteSpecificCover } from "./cover-resolver";

export type N8nPgPool = {
  query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<{ rows: T[]; rowCount: number | null }>;
};

let n8nPool: N8nPgPool | undefined;

export async function getN8nPool(): Promise<N8nPgPool | null> {
  if (n8nPool) return n8nPool;
  const dbUrl =
    process.env.N8N_DATABASE_URL ??
    process.env.DATABASE_URL ??
    "postgresql://postgres:123456@localhost:5433/tripcanvas";
  try {
    const loadPg = new Function("specifier", "return import(specifier)") as (
      specifier: string,
    ) => Promise<unknown>;
    const pg = (await loadPg("pg")) as {
      Pool: new (options: { connectionString: string }) => N8nPgPool;
    };
    n8nPool = new pg.Pool({ connectionString: dbUrl });
    return n8nPool;
  } catch {
    return null;
  }
}

/** Convert n8n DB row into frontend Trip format */
export function n8nRouteToTrip(route: Record<string, unknown>, days: Record<string, unknown>[]): Trip {
  const coverUrl = (route.cover_url as string) || "";
  const coverKeyMap: Record<string, Trip["cover"]> = {
    japan: "japan", 日本: "japan", tokyo: "tokyo", 东京: "tokyo",
    korea: "korea", 韩国: "korea", thailand: "thailand", 泰国: "thailand",
    france: "france", 法国: "france",
  };
  const dest = ((route.destination as string) || "").toLowerCase();
  const city = ((route.city as string) || "").toLowerCase();
  const coverKey = coverKeyMap[dest] ?? coverKeyMap[city] ?? "map";

  return {
    id: `n8n-${route.id}`,
    name: (route.route_title as string) || "AI 生成行程",
    date: route.created_at ? String(route.created_at).split("T")[0] : "",
    cover: coverKey,
    status: "已完成",
    favorite: false,
    destination: (route.destination as string) || undefined,
    country: (route.country as string) || undefined,
    city: (route.city as string) || undefined,
    tags: route.tags ? String(route.tags).split(",").map((t: string) => t.trim()) : undefined,
    qualityScore: route.quality_score != null ? Number(route.quality_score) : undefined,
    coverUrl: coverUrl || getRouteCoverUrl((route.city as string) || ""),
    mood: (route.mood as string) || undefined,
    summary: (route.summary as string) || undefined,
    routeTheme: (route.route_theme as Trip["routeTheme"]) || undefined,
    budgetLevel: (route.budget_level as Trip["budgetLevel"]) || undefined,
    travelType: (route.travel_type as Trip["travelType"]) || undefined,
    pace: (route.pace as Trip["pace"]) || undefined,
    bestTime: (route.best_time as Trip["bestTime"]) || undefined,
    likes: route.likes != null ? Number(route.likes) : 0,
    daysCount: route.days_count != null ? Number(route.days_count) : undefined,
    days: days.map((day) => ({
      id: `n8n-d${day.id}`,
      label: (day.title as string) || `Day ${day.day_number}`,
      route: (day.summary as string) || "",
      spots: ((day as Record<string, unknown>).places as Record<string, unknown>[] || []).map(
        (p, si) => ({
          id: `n8n-p${p.id}`,
          time: (p.visit_time as string) || "09:00",
          title: (p.place_name as string) || "",
          desc: (p.description as string) || "",
          lat: p.latitude != null ? Number(p.latitude) : undefined,
          lng: p.longitude != null ? Number(p.longitude) : undefined,
          category: ((p.category as string) || "景点") as Spot["category"],
          intro: (p.intro as string) || undefined,
          rating: p.rating != null ? Number(p.rating) : undefined,
          price: (p.price as string) || undefined,
          image: (p.image_url as string) || spotImageUrl(
            p.image_query as string | undefined,
            (p.place_name as string) || "",
            p.category as string | undefined,
            si,
          ),
          tags: p.tags ? String(p.tags).split(",").map((t: string) => t.trim()) : undefined,
          address: (p.address as string) || undefined,
          durationMin: p.duration_min != null ? Number(p.duration_min) : undefined,
        }),
      ),
    })),
    source: { kind: "text" as const, title: "n8n AI 自动生成" },
  };
}

/** Region map for grouping destinations */
export const regionMap = [
  { region: "中国", countries: ["中国"] },
  { region: "东亚", countries: ["日本", "韩国"] },
  { region: "东南亚", countries: ["泰国", "新加坡", "马来西亚", "越南", "印度尼西亚", "菲律宾", "柬埔寨", "斯里兰卡", "马尔代夫", "尼泊尔", "印度"] },
  { region: "欧洲", countries: ["法国", "英国", "意大利", "西班牙", "德国", "瑞士", "冰岛", "希腊", "葡萄牙", "荷兰", "挪威", "克罗地亚"] },
  { region: "北美", countries: ["美国", "加拿大", "墨西哥"] },
  { region: "南美", countries: ["秘鲁", "阿根廷", "巴西"] },
  { region: "大洋洲", countries: ["澳洲", "澳大利亚", "新西兰", "斐济"] },
  { region: "非洲与中东", countries: ["摩洛哥", "埃及", "土耳其", "以色列", "约旦", "南非", "迪拜", "阿联酋"] },
];
