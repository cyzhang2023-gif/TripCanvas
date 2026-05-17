import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  Clock,
  Compass,
  Flame,
  Heart,
  MapPin,
  Minus,
  Plus,
  RefreshCw,
  Share2,
  Snowflake,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { useFeaturedRoutes, type FeaturedRoute } from "@/lib/tripStore";

export const Route = createFileRoute("/inspiration")({
  component: InspirationMap,
  head: () => ({ meta: [{ title: "灵感地图 · Routey" }] }),
});

/* ─── Map bubble data — positions hand-tuned for 400×340 map container ─── */
type MapBubble = {
  name: string;
  sub: string;
  query: string;
  top: number;
  left: number;
  size: "lg" | "md" | "sm";
  continent: string;
};

const allDestinations: MapBubble[] = [
  { name: "冰岛极光", sub: "奇幻之旅", query: "iceland northern lights aurora", top: 8, left: 44, size: "md", continent: "欧洲" },
  { name: "圣托里尼", sub: "蓝白梦幻", query: "santorini greece blue dome sunset", top: 32, left: 56, size: "sm", continent: "欧洲" },
  { name: "瑞士雪山", sub: "阿尔卑斯", query: "swiss alps matterhorn snow", top: 20, left: 51, size: "sm", continent: "欧洲" },
  { name: "挪威峡湾", sub: "壮美北欧", query: "norway fjord scenic landscape", top: 12, left: 52, size: "sm", continent: "欧洲" },
  { name: "肯尼亚", sub: "动物迁徙", query: "kenya safari animal migration", top: 55, left: 58, size: "md", continent: "非洲" },
  { name: "摩洛哥沙漠", sub: "撒哈拉之旅", query: "morocco sahara desert camel", top: 37, left: 47, size: "sm", continent: "非洲" },
  { name: "马尔代夫", sub: "水上天堂", query: "maldives overwater villa ocean", top: 52, left: 70, size: "md", continent: "亚洲" },
  { name: "北海道", sub: "春日赏樱", query: "hokkaido cherry blossom japan spring", top: 22, left: 88, size: "md", continent: "亚洲" },
  { name: "菲律宾科隆", sub: "潜水天堂", query: "coron palawan island diving lagoon", top: 48, left: 83, size: "lg", continent: "亚洲" },
  { name: "巴厘岛", sub: "神庙与稻田", query: "bali rice terrace temple indonesia", top: 62, left: 80, size: "sm", continent: "亚洲" },
  { name: "纽约", sub: "不夜之城", query: "new york manhattan skyline night", top: 28, left: 28, size: "sm", continent: "北美洲" },
  { name: "夏威夷", sub: "阳光海浪", query: "hawaii waikiki beach sunset", top: 40, left: 10, size: "sm", continent: "北美洲" },
  { name: "秘鲁", sub: "失落文明", query: "machu picchu peru inca ruins", top: 66, left: 28, size: "sm", continent: "南美洲" },
  { name: "巴塔哥尼亚", sub: "世界尽头", query: "patagonia glacier argentina", top: 84, left: 32, size: "sm", continent: "南美洲" },
  { name: "澳大利亚", sub: "大堡礁", query: "great barrier reef australia coral", top: 72, left: 78, size: "sm", continent: "大洋洲" },
];

function pickBubbles(pool: MapBubble[], count: number): MapBubble[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked: MapBubble[] = [];
  for (const b of shuffled) {
    const tooClose = picked.some(
      (p) => Math.abs(p.left - b.left) < 17 && Math.abs(p.top - b.top) < 17,
    );
    if (!tooClose) {
      picked.push(b);
      if (picked.length >= count) break;
    }
  }
  return picked;
}

const continents = ["全部", "亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"];

/* ─── Curated recommendation cards ─── */
type CuratedItem = {
  title: string;
  label: string;
  labelColor: string;
  desc: string;
  season: string;
  query: string;
  dest: string;
};

const curatedRecommendations: CuratedItem[] = [
  { title: "东京·上野公园", label: "日本赏樱", labelColor: "#e11d48", desc: "樱花与古建筑的诗意相遇", season: "最佳季节 3-4月", query: "东京上野公园樱花", dest: "东京" },
  { title: "泰国·普吉岛", label: "东南亚海岛", labelColor: "#0891b2", desc: "阳光沙滩，慢享悠闲时光", season: "最佳季节 11-2月", query: "泰国普吉岛", dest: "普吉岛" },
  { title: "柬埔寨·吴哥窟", label: "文化探索", labelColor: "#7c3aed", desc: "穿越千年的文明奇迹", season: "最佳季节 11-2月", query: "柬埔寨吴哥窟日出", dest: "吴哥窟" },
  { title: "奥地利·哈尔施塔特", label: "欧洲小镇", labelColor: "#2563eb", desc: "童话般的湖畔小镇", season: "最佳季节 5-9月", query: "奥地利哈尔施塔特", dest: "哈尔施塔特" },
  { title: "希腊·圣托里尼", label: "海岛度假", labelColor: "#0d9488", desc: "蓝白相间的爱琴海明珠", season: "最佳季节 5-10月", query: "希腊圣托里尼日落", dest: "圣托里尼" },
  { title: "印尼·巴厘岛", label: "自然风光", labelColor: "#059669", desc: "神庙与稻田的和谐之美", season: "最佳季节 4-10月", query: "巴厘岛梯田", dest: "巴厘岛" },
];

/* ─── Theme label mapping ─── */
const themeLabels: Record<string, string> = {
  "城市漫步": "城市漫步", "美食之旅": "美食之旅", "自然风光": "自然风光",
  "文化探索": "文化探索", "海滩度假": "海滩度假", "购物血拼": "购物血拼",
  "奢华体验": "奢华体验", "亲子出行": "亲子出行",
  food: "美食之旅", culture: "文化探索", luxury: "奢华体验",
  nature: "自然风光", beach: "海滩度假", city: "城市漫步",
  shopping: "购物血拼", family: "亲子出行", adventure: "户外探险",
};
const themeColors: Record<string, string> = {
  "城市漫步": "#2563eb", "美食之旅": "#ea580c", "自然风光": "#059669",
  "文化探索": "#7c3aed", "海滩度假": "#0891b2", "购物血拼": "#e11d48",
  "奢华体验": "#b45309", "亲子出行": "#0d9488", "户外探险": "#16a34a",
  "推荐": "#6366f1",
};
function resolveLabel(raw?: string): string {
  if (!raw) return "推荐";
  return themeLabels[raw] ?? themeLabels[raw.toLowerCase()] ?? raw;
}

/* ─── Component ─── */
function InspirationMap() {
  const nav = useNavigate();
  const { data: n8nRoutes } = useFeaturedRoutes();
  const [activeContinent, setActiveContinent] = useState("全部");
  const [recoOffset, setRecoOffset] = useState(0);

  const recommendations = useMemo(() => {
    if (n8nRoutes && n8nRoutes.length >= 4) {
      const seen = new Set<string>();
      const items: (FeaturedRoute & { _label: string; _labelColor: string })[] = [];
      for (const r of n8nRoutes) {
        if (seen.has(r.city)) continue;
        seen.add(r.city);
        const label = resolveLabel(r.route_theme || r.tags?.split(",")[0]);
        items.push({ ...r, _label: label, _labelColor: themeColors[label] ?? "#6366f1" });
        if (items.length >= 12) break;
      }
      return items;
    }
    return null;
  }, [n8nRoutes]);

  const visibleRecos = useMemo(() => {
    if (!recommendations) return curatedRecommendations.slice(0, 6);
    const start = recoOffset % recommendations.length;
    const slice: typeof recommendations = [];
    for (let i = 0; i < Math.min(6, recommendations.length); i++) {
      slice.push(recommendations[(start + i) % recommendations.length]);
    }
    return slice;
  }, [recommendations, recoOffset]);

  const handleRefresh = useCallback(() => setRecoOffset((o) => o + 4), []);

  const displayBubbles = useMemo(() => {
    if (activeContinent !== "全部") {
      return allDestinations.filter((b) => b.continent === activeContinent);
    }
    return pickBubbles(allDestinations, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeContinent]);

  return (
    <div className="app-shell min-h-screen bg-[#f5f6fa] pb-20">
      {/* ═══ Header — matching mockup exactly ═══ */}
      <header className="flex items-center justify-between px-4 pb-1 pt-12">
        <div className="flex items-center gap-2.5">
          <Link
            to="/"
            className="pressable flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-[18px] font-extrabold text-gray-900">灵感地图</h1>
            <p className="text-[10px] text-gray-400">探索世界精彩，发现旅行灵感</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white active:bg-gray-50">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white active:bg-gray-50">
            <Share2 className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </header>

      {/* ═══ Map Area — with controls matching mockup ═══ */}
      <section className="relative mx-3 mt-2 overflow-hidden rounded-[20px] shadow-md" style={{ height: 340 }}>
        {/* World map background */}
        <div className="absolute inset-0 bg-[#e9f1f7]">
          <svg viewBox="0 0 1000 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="ocean" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#e9f3fa" />
                <stop offset="100%" stopColor="#d5e6f2" />
              </radialGradient>
            </defs>
            <rect width="1000" height="500" fill="url(#ocean)" />
            {/* Grid lines */}
            <g stroke="#c2d8e8" strokeWidth="0.4" fill="none" opacity="0.4" strokeDasharray="6 4">
              <line x1="0" y1="125" x2="1000" y2="125" />
              <line x1="0" y1="250" x2="1000" y2="250" />
              <line x1="0" y1="375" x2="1000" y2="375" />
              <line x1="250" y1="0" x2="250" y2="500" />
              <line x1="500" y1="0" x2="500" y2="500" />
              <line x1="750" y1="0" x2="750" y2="500" />
            </g>
            {/* Continents — equirectangular projection */}
            <g fill="#b6ced9" stroke="#96b5c6" strokeWidth="0.6" strokeLinejoin="round">
              {/* North America */}
              <path d="M45,75 L70,62 L115,58 L160,48 L210,45 L255,52 L290,58 L330,92 L318,112 L305,130 L290,148 L275,178 L255,168 L235,178 L218,192 L228,212 L215,218 L195,200 L178,165 L160,130 L152,112 L130,92 L85,78 Z" />
              {/* Greenland */}
              <path d="M340,32 L375,25 L400,35 L395,56 L368,60 L342,50 Z" />
              {/* Central America */}
              <path d="M215,218 L228,212 L240,222 L248,232 L238,238 L225,232 Z" />
              {/* South America */}
              <path d="M238,238 L265,228 L305,225 L350,232 L385,248 L402,268 L398,298 L382,322 L358,348 L328,368 L318,398 L308,380 L312,348 L298,315 L282,282 L278,255 L258,240 Z" />
              {/* Iceland */}
              <path d="M412,50 L428,46 L438,52 L432,60 L418,58 Z" />
              {/* UK + Ireland */}
              <path d="M448,88 L458,78 L465,85 L462,98 L452,100 Z" />
              <path d="M442,90 L448,84 L450,92 L444,96 Z" />
              {/* Europe */}
              <path d="M465,85 L478,72 L498,74 L518,82 L538,75 L558,68 L572,72 L568,88 L558,98 L548,108 L540,118 L530,128 L548,135 L562,142 L555,150 L540,142 L525,128 L510,118 L500,108 L492,118 L478,125 L468,120 L460,108 L465,95 Z" />
              {/* Scandinavia */}
              <path d="M478,42 L492,38 L502,45 L508,58 L498,74 L488,68 L478,55 Z" />
              {/* Africa */}
              <path d="M455,172 L478,165 L510,168 L535,178 L548,198 L555,225 L552,258 L542,295 L525,328 L505,352 L480,358 L462,345 L448,310 L440,268 L438,228 L445,195 Z" />
              {/* Madagascar */}
              <path d="M568,310 L575,298 L580,312 L575,325 L568,318 Z" />
              {/* Arabian Peninsula */}
              <path d="M558,168 L580,158 L598,172 L595,192 L582,198 L565,188 Z" />
              {/* India */}
              <path d="M628,130 L648,125 L662,142 L668,168 L658,198 L642,215 L628,205 L622,178 L618,155 Z" />
              {/* Sri Lanka */}
              <path d="M648,218 L655,212 L658,222 L652,226 Z" />
              {/* Asia (mainland) */}
              <path d="M572,72 L598,55 L640,48 L685,42 L720,48 L755,58 L780,72 L790,92 L785,115 L772,130 L755,138 L735,142 L715,135 L695,125 L675,118 L662,125 L648,125 L628,130 L618,120 L600,108 L585,95 L572,82 Z" />
              {/* Southeast Asia mainland */}
              <path d="M695,155 L710,148 L725,158 L735,175 L728,195 L715,205 L700,195 L695,175 Z" />
              {/* Indonesia — Sumatra, Java, Borneo */}
              <path d="M700,232 L718,225 L728,235 L720,245 L705,240 Z" />
              <path d="M725,248 L745,242 L755,250 L742,258 L728,255 Z" />
              <path d="M728,218 L748,212 L758,225 L748,235 L732,228 Z" />
              {/* Philippines */}
              <path d="M762,178 L770,168 L778,178 L775,192 L768,195 Z" />
              {/* Japan */}
              <path d="M798,88 L808,78 L815,88 L812,108 L802,112 L795,102 Z" />
              {/* Taiwan */}
              <path d="M778,148 L784,142 L788,150 L783,156 Z" />
              {/* Australia */}
              <path d="M762,318 L808,305 L848,312 L872,332 L868,362 L842,385 L802,382 L772,365 L758,342 Z" />
              {/* New Zealand */}
              <path d="M882,378 L888,368 L895,378 L892,392 L885,395 Z" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/20" />

        {/* Top-left: region dropdown */}
        <div className="absolute left-3 top-3 z-10">
          <button className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-gray-700 shadow-sm">
            全部地区
            <ChevronDown className="h-3 w-3 text-gray-500" />
          </button>
        </div>

        {/* Top-right: map legend */}
        <div className="absolute right-3 top-3 z-10">
          <button className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-gray-600 shadow-sm">
            <MapPin className="h-3 w-3 text-primary" /> 地图图例
          </button>
        </div>

        {/* Right side: zoom controls */}
        <div className="absolute bottom-14 right-3 z-10 flex flex-col gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm">
            <Plus className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm">
            <Minus className="h-4 w-4" />
          </button>
        </div>
        <button className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm">
          <MapPin className="h-4 w-4 text-primary" />
        </button>

        {/* Floating destination bubbles */}
        {displayBubbles.map((bubble) => {
          const isLg = bubble.size === "lg";
          const isMd = bubble.size === "md";
          const px = isLg ? 64 : isMd ? 50 : 40;

          return (
            <Link
              key={bubble.name}
              to="/explore"
              search={{ dest: bubble.query.split(" ")[0] }}
              className="absolute z-[6] flex flex-col items-center transition-transform active:scale-90"
              style={{ top: `${bubble.top}%`, left: `${bubble.left}%`, transform: "translate(-50%,-50%)" }}
            >
              <div
                className="overflow-hidden rounded-full shadow-lg"
                style={{
                  width: px,
                  height: px,
                  border: isLg ? "3px solid rgba(67,97,238,0.45)" : "2.5px solid white",
                  boxShadow: isLg
                    ? "0 0 0 3px rgba(67,97,238,0.18), 0 4px 12px rgba(0,0,0,0.15)"
                    : "0 3px 10px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={`/api/spot-image?q=${encodeURIComponent(bubble.query)}`}
                  alt={bubble.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <span
                className="mt-1 text-center text-[10px] font-bold text-gray-800"
                style={{ textShadow: "0 1px 3px rgba(255,255,255,0.95)", maxWidth: 80 }}
              >
                {bubble.name}
              </span>
              <span
                className="text-[8px] font-medium text-gray-500"
                style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}
              >
                {bubble.sub}
              </span>
            </Link>
          );
        })}
      </section>

      {/* ═══ Continent Tabs ═══ */}
      <div className="no-scrollbar mt-3 flex items-center gap-2 overflow-x-auto px-4 py-1">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setActiveContinent(c)}
            className={`pressable shrink-0 rounded-full px-4 py-[6px] text-[12px] font-bold transition-all ${
              activeContinent === c
                ? "bg-[#1e2a4a] text-white shadow-md"
                : "border border-gray-200 bg-white text-gray-500"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ═══ Recommendations ═══ */}
      <section className="mt-4 px-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-[16px] font-extrabold text-gray-900">为你推荐</h2>
            <p className="text-[10px] text-gray-400">基于你的兴趣生成</p>
          </div>
          <button
            onClick={handleRefresh}
            className="pressable flex items-center gap-1 text-[11px] font-medium text-gray-400"
          >
            换一批 <RefreshCw className="h-3 w-3" />
          </button>
        </div>

        {/* Horizontal scroll cards — matching mockup */}
        <div className="no-scrollbar -mx-4 mt-2.5 flex gap-2.5 overflow-x-auto px-4 pb-1">
          {recommendations
            ? visibleRecos.map((r: any, i: number) => {
                const label = r._label;
                const color = r._labelColor;
                return (
                  <Link
                    key={r.id ?? i}
                    to="/explore"
                    search={{ dest: r.city }}
                    className="group w-[140px] shrink-0 overflow-hidden rounded-xl bg-white shadow-sm transition active:scale-[0.98]"
                  >
                    <div className="relative h-[105px] w-full overflow-hidden">
                      <img
                        src={r.cover_url || `/api/spot-image?q=${encodeURIComponent(r.city + " " + r.country + " 景点")}`}
                        alt={r.city}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span
                        className="absolute left-2 top-2 rounded-[4px] px-1.5 py-[2px] text-[9px] font-bold text-white"
                        style={{ background: color }}
                      >
                        {label}
                      </span>
                    </div>
                    <div className="px-2 pb-2 pt-1.5">
                      <p className="truncate text-[12px] font-bold text-gray-900">
                        {r.country}·{r.city}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-gray-400">
                        {r.summary?.slice(0, 16) || r.route_title?.slice(0, 16)}
                      </p>
                      <p className="mt-1 flex items-center gap-0.5 text-[9px] text-gray-400">
                        <Clock className="h-2.5 w-2.5" /> {r.days_count}天行程
                      </p>
                    </div>
                  </Link>
                );
              })
            : curatedRecommendations.map((r, i) => (
                <Link
                  key={i}
                  to="/explore"
                  search={{ dest: r.dest }}
                  className="group w-[140px] shrink-0 overflow-hidden rounded-xl bg-white shadow-sm transition active:scale-[0.98]"
                >
                  <div className="relative h-[105px] w-full overflow-hidden">
                    <img
                      src={`/api/spot-image?q=${encodeURIComponent(r.query)}`}
                      alt={r.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className="absolute left-2 top-2 rounded-[4px] px-1.5 py-[2px] text-[9px] font-bold text-white"
                      style={{ background: r.labelColor }}
                    >
                      {r.label}
                    </span>
                  </div>
                  <div className="px-2 pb-2 pt-1.5">
                    <p className="truncate text-[12px] font-bold text-gray-900">{r.title}</p>
                    <p className="mt-0.5 truncate text-[10px] text-gray-400">{r.desc}</p>
                    <p className="mt-1 flex items-center gap-0.5 text-[9px] text-gray-400">
                      <Clock className="h-2.5 w-2.5" /> {r.season}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* ═══ AI Banner — matching mockup with robot + CTA ═══ */}
      <section className="mx-4 mt-4">
        <div
          className="relative overflow-hidden rounded-2xl px-4 py-3.5"
          style={{ background: "linear-gradient(135deg, #eef2ff 0%, #e8e0ff 50%, #dbeafe 100%)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-2">
              <h3 className="text-[14px] font-bold text-indigo-900">
                让 AI 为你生成专属旅行灵感
              </h3>
              <p className="mt-0.5 text-[10px] text-indigo-400">
                告诉我们你喜欢的风景、活动和节奏
              </p>
            </div>
            {/* Robot illustration area */}
            <div className="relative mr-1 flex items-center">
              <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-[20px] shadow-md">
                🤖
              </div>
              <Link
                to="/quiz"
                className="pressable shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-[12px] font-bold text-white shadow-md transition active:scale-95"
              >
                去定制
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Bottom theme row — 3 items matching mockup ═══ */}
      <section className="mx-4 mt-4 mb-2">
        <div className="flex items-center justify-around rounded-2xl bg-white py-3 shadow-sm">
          <Link to="/explore" search={{ cat: "nature" }} className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700">
            <Flame className="h-4 w-4 text-orange-500" />
            热门灵感
          </Link>
          <Link to="/explore" search={{ cat: "outdoor" }} className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700">
            <Compass className="h-4 w-4 text-gray-500" />
            小众秘境
          </Link>
          <Link to="/explore" className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700">
            <Snowflake className="h-4 w-4 text-blue-500" />
            季节限定
          </Link>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
