import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  RefreshCw,
  Share2,
  Sparkles,
  Compass,
  TreePine,
  Snowflake,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { useFeaturedRoutes, type FeaturedRoute } from "@/lib/tripStore";

export const Route = createFileRoute("/inspiration")({
  component: InspirationMap,
  head: () => ({ meta: [{ title: "灵感地图 · Routey" }] }),
});

/* ─── Continent bubble data ─── */
type MapBubble = {
  name: string;
  sub: string;
  query: string; // image search query
  top: string;
  left: string;
  size: "lg" | "md" | "sm";
  continent: string;
};

const mapBubbles: MapBubble[] = [
  { name: "日本赏樱", sub: "春日限定", query: "日本樱花 富士山", top: "18%", left: "14%", size: "md", continent: "亚洲" },
  { name: "欧洲小镇", sub: "浪漫与历史", query: "欧洲小镇 布拉格", top: "8%", left: "42%", size: "md", continent: "欧洲" },
  { name: "冰岛极光", sub: "奇幻之旅", query: "冰岛极光 aurora", top: "12%", left: "78%", size: "sm", continent: "欧洲" },
  { name: "大阪·潮流街区", sub: "活力与美食", query: "大阪道顿堀", top: "46%", left: "45%", size: "lg", continent: "亚洲" },
  { name: "东南亚海岛", sub: "碧海蓝天", query: "泰国普吉岛海滩", top: "68%", left: "18%", size: "md", continent: "亚洲" },
  { name: "文化探索", sub: "千年文明", query: "柬埔寨吴哥窟", top: "58%", left: "75%", size: "sm", continent: "亚洲" },
];

const continents = ["全部", "亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"];

/* ─── Themed recommendation data ─── */
type RecommendationItem = {
  city: string;
  country: string;
  label: string;
  labelColor: string;
  desc: string;
  season: string;
  query: string;
};

const curatedRecommendations: RecommendationItem[] = [
  { city: "东京", country: "日本", label: "日本赏樱", labelColor: "#e11d48", desc: "樱花与古建筑的诗意相遇", season: "最佳季节 3-4月", query: "东京上野公园樱花" },
  { city: "普吉岛", country: "泰国", label: "东南亚海岛", labelColor: "#0891b2", desc: "阳光沙滩，慢享悠闲时光", season: "最佳季节 11-2月", query: "泰国普吉岛" },
  { city: "吴哥窟", country: "柬埔寨", label: "文化探索", labelColor: "#7c3aed", desc: "穿越千年的文明奇迹", season: "最佳季节 11-2月", query: "柬埔寨吴哥窟日出" },
  { city: "哈尔施塔特", country: "奥地利", label: "欧洲小镇", labelColor: "#2563eb", desc: "童话般的湖畔小镇", season: "最佳季节 5-9月", query: "奥地利哈尔施塔特" },
  { city: "圣托里尼", country: "希腊", label: "海岛度假", labelColor: "#0d9488", desc: "蓝白相间的爱琴海明珠", season: "最佳季节 5-10月", query: "希腊圣托里尼日落" },
  { city: "巴厘岛", country: "印尼", label: "热带天堂", labelColor: "#059669", desc: "神庙与稻田的和谐之美", season: "最佳季节 4-10月", query: "巴厘岛梯田" },
];

/* ─── Component ─── */
function InspirationMap() {
  const nav = useNavigate();
  const { data: n8nRoutes } = useFeaturedRoutes();
  const [activeContinent, setActiveContinent] = useState("全部");
  const [recoOffset, setRecoOffset] = useState(0);

  // Build recommendation cards from n8n routes + curated fallback
  const recommendations = useMemo(() => {
    if (n8nRoutes && n8nRoutes.length >= 4) {
      const seen = new Set<string>();
      const items: (FeaturedRoute & { _label: string; _labelColor: string })[] = [];
      const themeColors: Record<string, string> = {
        "城市漫步": "#2563eb", "美食之旅": "#ea580c", "自然风光": "#059669",
        "文化探索": "#7c3aed", "海滩度假": "#0891b2", "购物血拼": "#e11d48",
        "奢华体验": "#b45309", "亲子出行": "#0d9488",
      };
      for (const r of n8nRoutes) {
        if (seen.has(r.city)) continue;
        seen.add(r.city);
        items.push({
          ...r,
          _label: r.route_theme || r.tags?.split(",")[0] || "推荐",
          _labelColor: themeColors[r.route_theme] ?? "#6366f1",
        });
        if (items.length >= 12) break;
      }
      return items;
    }
    return null;
  }, [n8nRoutes]);

  const visibleRecos = useMemo(() => {
    if (!recommendations) return curatedRecommendations.slice(0, 4);
    const start = recoOffset % recommendations.length;
    const slice: typeof recommendations = [];
    for (let i = 0; i < 4; i++) {
      slice.push(recommendations[(start + i) % recommendations.length]);
    }
    return slice;
  }, [recommendations, recoOffset]);

  const handleRefresh = useCallback(() => {
    setRecoOffset((o) => o + 4);
  }, []);

  // Filter map bubbles by continent
  const filteredBubbles = activeContinent === "全部"
    ? mapBubbles
    : mapBubbles.filter((b) => b.continent === activeContinent);

  return (
    <div className="min-h-screen bg-[#f5f6fa] pb-20">
      {/* Header */}
      <header className="relative flex items-center justify-between px-5 pb-2 pt-14">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-[20px] font-extrabold text-gray-900">灵感地图</h1>
            <p className="text-[12px] text-gray-400">探索世界精彩，发现旅行灵感</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
            <Heart className="h-4.5 w-4.5 text-gray-600" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
            <Share2 className="h-4.5 w-4.5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* ═══ Interactive Map Area ═══ */}
      <section className="relative mx-3 mt-2 overflow-hidden rounded-3xl shadow-lg" style={{ height: "42vh" }}>
        {/* Map background image */}
        <img
          src="/api/spot-image?q=world+map+watercolor+light"
          alt="map"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(1.05) saturate(0.9)" }}
        />
        <div className="absolute inset-0 bg-white/30" />

        {/* Region dropdown */}
        <div className="absolute left-4 top-4 z-10">
          <button className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-gray-700 shadow-md">
            全部地区
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Map legend button */}
        <div className="absolute right-4 top-4 z-10">
          <button className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-600 shadow-md">
            <MapPin className="h-3 w-3 text-primary" /> 地图图例
          </button>
        </div>

        {/* Floating destination bubbles */}
        {filteredBubbles.map((bubble) => {
          const sizeClass = bubble.size === "lg"
            ? "h-[72px] w-[72px] ring-[3px] ring-primary/40"
            : bubble.size === "md"
              ? "h-[52px] w-[52px] ring-[2.5px] ring-white"
              : "h-[44px] w-[44px] ring-[2px] ring-white";

          return (
            <Link
              key={bubble.name}
              to="/explore"
              search={{ dest: bubble.query.split(" ")[0] }}
              className="absolute flex flex-col items-center transition-transform active:scale-95"
              style={{ top: bubble.top, left: bubble.left, transform: "translate(-50%,-50%)" }}
            >
              <div className={`${sizeClass} overflow-hidden rounded-full shadow-lg`}>
                <img
                  src={`/api/spot-image?q=${encodeURIComponent(bubble.query)}`}
                  alt={bubble.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="mt-1 text-[11px] font-bold text-gray-800 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                {bubble.name}
              </span>
              <span className="text-[9px] text-gray-500 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                {bubble.sub}
              </span>
            </Link>
          );
        })}

        {/* Zoom controls */}
        <div className="absolute bottom-16 right-3 flex flex-col gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-600 shadow-md text-[16px] font-bold">+</button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-600 shadow-md text-[16px] font-bold">−</button>
        </div>
        <button className="absolute bottom-4 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-500 shadow-md">
          <MapPin className="h-4 w-4" />
        </button>
      </section>

      {/* ═══ Continent Tabs ═══ */}
      <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto px-4">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setActiveContinent(c)}
            className={`pressable shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              activeContinent === c
                ? "bg-gray-900 text-white shadow-md"
                : "bg-white text-gray-600 shadow-sm"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ═══ Recommendations ═══ */}
      <section className="mt-5 px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-extrabold text-gray-900">为你推荐</h2>
            <p className="text-[11px] text-gray-400">基于你的兴趣生成</p>
          </div>
          <button
            onClick={handleRefresh}
            className="pressable flex items-center gap-1 text-[12px] font-medium text-gray-500"
          >
            换一批 <RefreshCw className="h-3 w-3" />
          </button>
        </div>

        {/* Horizontal scroll cards */}
        <div className="no-scrollbar -mx-4 mt-3 flex gap-3 overflow-x-auto px-4">
          {recommendations
            ? visibleRecos.map((r: any, i: number) => (
                <Link
                  key={r.id ?? i}
                  to="/explore"
                  search={{ dest: r.city }}
                  className="group w-[160px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm transition active:scale-[0.98]"
                >
                  <div className="relative h-[120px] w-full overflow-hidden">
                    <img
                      src={r.cover_url || `/api/spot-image?q=${encodeURIComponent(r.city + " " + r.country + " 景点")}`}
                      alt={r.city}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ background: r._labelColor }}
                    >
                      {r._label}
                    </span>
                  </div>
                  <div className="px-2.5 pb-2.5 pt-2">
                    <p className="truncate text-[13px] font-bold text-gray-900">
                      {r.country}·{r.city}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-gray-400">{r.summary?.slice(0, 15) || r.route_title}</p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="h-2.5 w-2.5" /> {r.days_count}天行程
                    </p>
                  </div>
                </Link>
              ))
            : curatedRecommendations.slice(0, 4).map((r, i) => (
                <Link
                  key={i}
                  to="/explore"
                  search={{ dest: r.city }}
                  className="group w-[160px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm transition active:scale-[0.98]"
                >
                  <div className="relative h-[120px] w-full overflow-hidden">
                    <img
                      src={`/api/spot-image?q=${encodeURIComponent(r.query)}`}
                      alt={r.city}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ background: r.labelColor }}
                    >
                      {r.label}
                    </span>
                  </div>
                  <div className="px-2.5 pb-2.5 pt-2">
                    <p className="truncate text-[13px] font-bold text-gray-900">
                      {r.country}·{r.city}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-gray-400">{r.desc}</p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="h-2.5 w-2.5" /> {r.season}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* ═══ AI Banner ═══ */}
      <section className="mx-4 mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="flex items-center gap-1.5 text-[15px] font-bold text-indigo-900">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              让 AI 为你生成专属旅行灵感
            </h3>
            <p className="mt-1 text-[12px] text-indigo-400">
              告诉我们你喜欢的风景、活动和节奏
            </p>
          </div>
          <Link
            to="/quiz"
            className="pressable shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg transition active:scale-95"
          >
            去定制
          </Link>
        </div>
      </section>

      {/* ═══ Bottom theme tabs ═══ */}
      <section className="mt-6 border-t border-gray-100 bg-white px-4 py-4">
        <div className="flex items-center justify-around">
          <Link to="/explore" search={{ cat: "nature" }} className="flex flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
              <Compass className="h-5 w-5 text-orange-500" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700">热门灵感</span>
          </Link>
          <Link to="/explore" search={{ cat: "outdoor" }} className="flex flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
              <TreePine className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700">小众秘境</span>
          </Link>
          <Link to="/explore" className="flex flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <Snowflake className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-[11px] font-semibold text-gray-700">季节限定</span>
          </Link>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
