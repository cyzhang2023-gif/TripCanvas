import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  Clock,
  Compass,
  Flame,
  Heart,
  MapPin,
  RefreshCw,
  Share2,
  Snowflake,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  dest: string;
  top: number;
  left: number;
  size: "lg" | "md" | "sm";
  continent: string;
};

/* Positions are % of the SVG viewBox (equirectangular: 0-100% = 180W-180E, 78N-60S) */
const allDestinations: MapBubble[] = [
  // 亚洲
  { name: "北海道", sub: "春日赏樱", query: "hokkaido cherry blossom japan spring", dest: "北海道", top: 25.4, left: 89.7, size: "md", continent: "亚洲" },
  { name: "菲律宾科隆", sub: "潜水天堂", query: "coron palawan island diving lagoon", dest: "科隆岛", top: 47.8, left: 83.3, size: "lg", continent: "亚洲" },
  { name: "巴厘岛", sub: "神庙与稻田", query: "bali rice terrace temple indonesia", dest: "巴厘岛", top: 62.5, left: 82, size: "sm", continent: "亚洲" },
  { name: "马尔代夫", sub: "水上天堂", query: "maldives overwater villa ocean", dest: "马尔代夫", top: 54.2, left: 70.4, size: "md", continent: "亚洲" },
  { name: "泰国清迈", sub: "古城寺庙", query: "chiang mai thailand temple golden", dest: "清迈", top: 42.9, left: 77.5, size: "sm", continent: "亚洲" },
  { name: "京都", sub: "千年古都", query: "kyoto japan temple bamboo geisha", dest: "京都", top: 31.2, left: 87.7, size: "sm", continent: "亚洲" },
  { name: "迪拜", sub: "奢华之城", query: "dubai skyline burj khalifa luxury", dest: "迪拜", top: 38.3, left: 65.4, size: "sm", continent: "亚洲" },
  { name: "尼泊尔", sub: "喜马拉雅", query: "nepal himalaya mountain trek everest", dest: "尼泊尔", top: 36.4, left: 73.7, size: "sm", continent: "亚洲" },
  // 欧洲
  { name: "冰岛极光", sub: "奇幻之旅", query: "iceland northern lights aurora", dest: "冰岛", top: 9.8, left: 44.7, size: "md", continent: "欧洲" },
  { name: "圣托里尼", sub: "蓝白梦幻", query: "santorini greece blue dome sunset", dest: "圣托里尼", top: 30.1, left: 57.1, size: "sm", continent: "欧洲" },
  { name: "瑞士雪山", sub: "阿尔卑斯", query: "swiss alps matterhorn snow", dest: "瑞士", top: 22.6, left: 52.1, size: "sm", continent: "欧洲" },
  { name: "挪威峡湾", sub: "壮美北欧", query: "norway fjord scenic landscape", dest: "挪威", top: 12.3, left: 51.9, size: "sm", continent: "欧洲" },
  { name: "巴黎", sub: "浪漫之都", query: "paris eiffel tower seine river", dest: "巴黎", top: 21.1, left: 50.6, size: "sm", continent: "欧洲" },
  { name: "巴塞罗那", sub: "高迪之城", query: "barcelona sagrada familia gaudi spain", dest: "巴塞罗那", top: 26.5, left: 50.6, size: "sm", continent: "欧洲" },
  { name: "布拉格", sub: "百塔之城", query: "prague castle charles bridge czech", dest: "布拉格", top: 20.2, left: 54, size: "sm", continent: "欧洲" },
  // 北美洲
  { name: "纽约", sub: "不夜之城", query: "new york manhattan skyline night", dest: "纽约", top: 27, left: 29.4, size: "sm", continent: "北美洲" },
  { name: "夏威夷", sub: "阳光海浪", query: "hawaii waikiki beach sunset", dest: "夏威夷", top: 42.1, left: 6.8, size: "sm", continent: "北美洲" },
  { name: "旧金山", sub: "金门大桥", query: "san francisco golden gate bridge fog", dest: "旧金山", top: 29.1, left: 16, size: "sm", continent: "北美洲" },
  { name: "墨西哥坎昆", sub: "加勒比海", query: "cancun mexico caribbean beach resort", dest: "坎昆", top: 41.2, left: 25.9, size: "md", continent: "北美洲" },
  { name: "班夫国家公园", sub: "落基山脉", query: "banff national park canada rocky mountain lake", dest: "班夫", top: 19.4, left: 17.9, size: "sm", continent: "北美洲" },
  // 南美洲
  { name: "秘鲁", sub: "失落文明", query: "machu picchu peru inca ruins", dest: "秘鲁", top: 66.1, left: 30, size: "sm", continent: "南美洲" },
  { name: "巴塔哥尼亚", sub: "世界尽头", query: "patagonia glacier argentina", dest: "巴塔哥尼亚", top: 92.8, left: 30, size: "sm", continent: "南美洲" },
  { name: "里约热内卢", sub: "狂欢之城", query: "rio de janeiro brazil christ redeemer carnival", dest: "里约热内卢", top: 73.1, left: 38, size: "md", continent: "南美洲" },
  { name: "加拉帕戈斯", sub: "达尔文群岛", query: "galapagos islands ecuador wildlife tortoise", dest: "加拉帕戈斯", top: 57.1, left: 24.9, size: "sm", continent: "南美洲" },
  // 非洲
  { name: "肯尼亚", sub: "动物迁徙", query: "kenya safari animal migration", dest: "肯尼亚", top: 57.5, left: 60.5, size: "md", continent: "非洲" },
  { name: "摩洛哥沙漠", sub: "撒哈拉之旅", query: "morocco sahara desert camel", dest: "摩洛哥", top: 33.6, left: 48.9, size: "sm", continent: "非洲" },
  { name: "南非开普敦", sub: "好望角", query: "cape town south africa table mountain", dest: "开普敦", top: 81.1, left: 55.1, size: "sm", continent: "非洲" },
  { name: "坦桑尼亚", sub: "乞力马扎罗", query: "kilimanjaro tanzania safari serengeti", dest: "坦桑尼亚", top: 61.2, left: 59.7, size: "sm", continent: "非洲" },
  { name: "埃及", sub: "金字塔", query: "egypt pyramids giza sphinx cairo", dest: "埃及", top: 34.8, left: 58.7, size: "sm", continent: "非洲" },
  // 大洋洲
  { name: "澳大利亚", sub: "大堡礁", query: "great barrier reef australia coral", dest: "澳大利亚", top: 69.6, left: 90.6, size: "sm", continent: "大洋洲" },
  { name: "新西兰", sub: "中土世界", query: "new zealand milford sound fjord mountain", dest: "新西兰", top: 86.2, left: 98.3, size: "md", continent: "大洋洲" },
  { name: "斐济", sub: "南太平洋", query: "fiji island tropical beach resort", dest: "斐济", top: 69.6, left: 95, size: "sm", continent: "大洋洲" },
  { name: "悉尼", sub: "歌剧院", query: "sydney opera house harbour bridge", dest: "悉尼", top: 81.1, left: 92, size: "sm", continent: "大洋洲" },
];

/*
 * The canvas is 260% of the container width (so full SVG always overflows).
 * The SVG aspect ratio is 1000:383 = 2.61:1. Container is ~1.42:1.
 * Canvas width = 260% of container, height = 260% / 2.61 * containerAspect ≈ 100% of container height.
 * Actually we set width=260%, height=auto preserving SVG aspect.
 *
 * For "全部": scale(0.42) to fit the full width in the container (100/260 ≈ 0.385, round up)
 * For continent: scale(~0.85) and translate to center that continent.
 *
 * translateX = -(centerX% * canvasWidth - 50% * containerWidth) / canvasWidth * 100
 * Simplified: translateX% = -(centerX - 50/scale) ... but we use left/top on the canvas div.
 */
const MAP_CANVAS_W = 260; // % of container width

type ViewState = { scale: number; left: number; top: number };
const CANVAS_H = MAP_CANVAS_W * 550 / 1000; // canvas height as % of container WIDTH
const S0 = 100 / MAP_CANVAS_W; // 0.385 — fits full map width
const S1 = 0.82; // zoomed-in scale

function computeViews(ar: number): Record<string, ViewState> {
  // ar = containerWidth / containerHeight
  // `left: X%` is X% of containerW, `top: Y%` is Y% of containerH
  // Canvas height is CANVAS_H% of containerW, so in containerH% it's CANVAS_H * ar
  function view(cx: number, cy: number, s: number): ViewState {
    return {
      scale: s,
      left: 50 - (cx / 100) * MAP_CANVAS_W * s,
      top: 50 - (cy / 100) * CANVAS_H * s * ar,
    };
  }
  return {
    "全部": { scale: S0, left: (100 - MAP_CANVAS_W * S0) / 2, top: (100 - CANVAS_H * S0 * ar) / 2 - 12 },
    "亚洲": view(78, 42, S1),
    "欧洲": view(51, 21, S1),
    "北美洲": view(20, 32, S1),
    "南美洲": view(31, 72, S1),
    "非洲": view(56, 54, S1),
    "大洋洲": view(95, 77, S1),
  };
}

function pickBubbles(pool: MapBubble[], count: number, minDist = 14): MapBubble[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked: MapBubble[] = [];
  for (const b of shuffled) {
    const tooClose = picked.some(
      (p) => Math.abs(p.left - b.left) < minDist && Math.abs(p.top - b.top) < minDist,
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

  const mapRef = useRef<HTMLDivElement>(null);
  const [containerAR, setContainerAR] = useState(1.35);
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (height > 0) setContainerAR(width / height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const continentViews = useMemo(() => computeViews(containerAR), [containerAR]);

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
      const pool = allDestinations.filter((b) => b.continent === activeContinent);
      const dist = pool.length <= 4 ? 4 : 7;
      return pickBubbles(pool, Math.min(pool.length, 5), dist);
    }
    return pickBubbles(allDestinations, 6, 16);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeContinent]);

  const view = continentViews[activeContinent] ?? continentViews["全部"];

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

      {/* ═══ Map Area ═══ */}
      <section ref={mapRef} className="relative mx-3 mt-2 overflow-hidden rounded-[20px] bg-[#c8e1f0] shadow-md" style={{ height: 260 }}>
        {/* Oversized canvas: SVG + bubbles move together */}
        <div
          className="absolute"
          style={{
            width: `${MAP_CANVAS_W}%`,
            aspectRatio: "1000 / 550",
            left: `${view.left}%`,
            top: `${view.top}%`,
            transform: `scale(${view.scale})`,
            transformOrigin: "0 0",
            transition: "left 0.6s cubic-bezier(0.4,0,0.2,1), top 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <img src="/world-map.svg?v=4" alt="" className="absolute inset-0 h-full w-full" draggable={false} />

          {/* Bubbles positioned as % of SVG coordinate space */}
          <style>{`
            @keyframes bubble-float {
              0%, 100% { transform: translate(-50%, -50%) translateY(0); }
              50% { transform: translate(-50%, -50%) translateY(-6px); }
            }
            @keyframes bubble-pulse-ring {
              0% { box-shadow: 0 0 0 0 rgba(67,97,238,0.35); }
              70% { box-shadow: 0 0 0 8px rgba(67,97,238,0); }
              100% { box-shadow: 0 0 0 0 rgba(67,97,238,0); }
            }
            @keyframes bubble-fade-in {
              from { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
              to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
          `}</style>
          {displayBubbles.map((bubble, idx) => {
            const isLg = bubble.size === "lg";
            const isMd = bubble.size === "md";
            const basePx = isLg ? 54 : isMd ? 44 : 36;
            const px = basePx / view.scale;
            const floatDuration = 3 + idx * 0.4;
            const floatDelay = idx * 0.6;
            const fontSize = 10 / view.scale;
            const subFontSize = 8 / view.scale;

            return (
              <Link
                key={`${activeContinent}-${bubble.name}`}
                to="/explore"
                search={{ dest: bubble.dest }}
                className="absolute z-[6] flex flex-col items-center active:scale-90"
                style={{
                  top: `${bubble.top}%`,
                  left: `${bubble.left}%`,
                  animation: `bubble-fade-in 0.5s ${floatDelay * 0.3}s both, bubble-float ${floatDuration}s ${floatDelay}s ease-in-out infinite`,
                }}
              >
                <div
                  className="overflow-hidden rounded-full"
                  style={{
                    width: px,
                    height: px,
                    border: isLg ? `${3 / view.scale}px solid rgba(67,97,238,0.45)` : `${2.5 / view.scale}px solid white`,
                    boxShadow: `0 ${3 / view.scale}px ${12 / view.scale}px rgba(0,0,0,0.15)`,
                    animation: isLg ? "bubble-pulse-ring 2.5s ease-out infinite" : undefined,
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
                  className="mt-0.5 text-center font-bold text-gray-800"
                  style={{ fontSize, textShadow: "0 1px 3px rgba(255,255,255,0.95)", maxWidth: 80 / view.scale, lineHeight: 1.2 }}
                >
                  {bubble.name}
                </span>
                <span
                  className="font-medium text-gray-500"
                  style={{ fontSize: subFontSize, textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}
                >
                  {bubble.sub}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-white/15" />

        {/* Top-left: region dropdown */}
        <div className="absolute left-3 top-3 z-10">
          <button className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-gray-700 shadow-sm">
            {activeContinent === "全部" ? "全部地区" : activeContinent}
            <ChevronDown className="h-3 w-3 text-gray-500" />
          </button>
        </div>

        {/* Top-right: map legend */}
        <div className="absolute right-3 top-3 z-10">
          <button className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-gray-600 shadow-sm">
            <MapPin className="h-3 w-3 text-primary" /> 地图图例
          </button>
        </div>
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
