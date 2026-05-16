import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
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
  Globe,
  ArrowRight,
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
  query: string;
  top: string;
  left: string;
  size: "lg" | "md" | "sm";
  continent: string;
};

const mapBubbles: MapBubble[] = [
  { name: "日本赏樱", sub: "春日限定", query: "日本樱花 富士山", top: "20%", left: "16%", size: "md", continent: "亚洲" },
  { name: "欧洲小镇", sub: "浪漫与历史", query: "欧洲小镇 布拉格", top: "10%", left: "46%", size: "md", continent: "欧洲" },
  { name: "冰岛极光", sub: "奇幻之旅", query: "冰岛极光 aurora", top: "15%", left: "82%", size: "sm", continent: "欧洲" },
  { name: "大阪美食", sub: "活力与美食", query: "大阪道顿堀", top: "48%", left: "50%", size: "lg", continent: "亚洲" },
  { name: "东南亚海岛", sub: "碧海蓝天", query: "泰国普吉岛海滩", top: "72%", left: "22%", size: "md", continent: "亚洲" },
  { name: "文化探索", sub: "千年文明", query: "柬埔寨吴哥窟", top: "62%", left: "78%", size: "sm", continent: "亚洲" },
];

const continents = ["全部", "亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"];

/* ─── Theme label mapping — always Chinese ─── */
const themeLabels: Record<string, string> = {
  "城市漫步": "城市漫步",
  "美食之旅": "美食之旅",
  "自然风光": "自然风光",
  "文化探索": "文化探索",
  "海滩度假": "海滩度假",
  "购物血拼": "购物血拼",
  "奢华体验": "奢华体验",
  "亲子出行": "亲子出行",
  // English fallbacks
  food: "美食之旅",
  culture: "文化探索",
  luxury: "奢华体验",
  nature: "自然风光",
  beach: "海滩度假",
  city: "城市漫步",
  shopping: "购物血拼",
  family: "亲子出行",
  adventure: "户外探险",
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

/* ─── Curated fallback ─── */
type CuratedItem = {
  city: string;
  country: string;
  label: string;
  labelColor: string;
  desc: string;
  season: string;
  query: string;
};

const curatedRecommendations: CuratedItem[] = [
  { city: "东京", country: "日本", label: "日本赏樱", labelColor: "#e11d48", desc: "樱花与古建筑的诗意相遇", season: "最佳季节 3-4月", query: "东京上野公园樱花" },
  { city: "普吉岛", country: "泰国", label: "海滩度假", labelColor: "#0891b2", desc: "阳光沙滩，慢享悠闲时光", season: "最佳季节 11-2月", query: "泰国普吉岛" },
  { city: "吴哥窟", country: "柬埔寨", label: "文化探索", labelColor: "#7c3aed", desc: "穿越千年的文明奇迹", season: "最佳季节 11-2月", query: "柬埔寨吴哥窟日出" },
  { city: "哈尔施塔特", country: "奥地利", label: "欧洲小镇", labelColor: "#2563eb", desc: "童话般的湖畔小镇", season: "最佳季节 5-9月", query: "奥地利哈尔施塔特" },
  { city: "圣托里尼", country: "希腊", label: "海滩度假", labelColor: "#0d9488", desc: "蓝白相间的爱琴海明珠", season: "最佳季节 5-10月", query: "希腊圣托里尼日落" },
  { city: "巴厘岛", country: "印尼", label: "自然风光", labelColor: "#059669", desc: "神庙与稻田的和谐之美", season: "最佳季节 4-10月", query: "巴厘岛梯田" },
];

/* ─── Quick link data ─── */
const quickLinks = [
  { icon: Compass, label: "热门灵感", color: "text-orange-500", bg: "bg-orange-50", cat: "nature" as const },
  { icon: TreePine, label: "小众秘境", color: "text-emerald-500", bg: "bg-emerald-50", cat: "outdoor" as const },
  { icon: Snowflake, label: "季节限定", color: "text-blue-500", bg: "bg-blue-50", cat: undefined },
  { icon: Globe, label: "全部目的地", color: "text-violet-500", bg: "bg-violet-50", cat: undefined },
];

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
        items.push({
          ...r,
          _label: label,
          _labelColor: themeColors[label] ?? "#6366f1",
        });
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

  const handleRefresh = useCallback(() => {
    setRecoOffset((o) => o + 4);
  }, []);

  const filteredBubbles = activeContinent === "全部"
    ? mapBubbles
    : mapBubbles.filter((b) => b.continent === activeContinent);

  return (
    <div className="min-h-screen bg-[#f4f5f9] pb-24">
      {/* ═══ Header ═══ */}
      <header className="sticky top-0 z-30 bg-[#f4f5f9]/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-5 pb-3 pt-14">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-[22px] font-extrabold tracking-tight text-gray-900">灵感地图</h1>
              <p className="text-[11px] tracking-wide text-gray-400">发现世界各地的旅行灵感</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm active:bg-gray-50">
              <Heart className="h-[18px] w-[18px] text-gray-500" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm active:bg-gray-50">
              <Share2 className="h-[18px] w-[18px] text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* ═══ Interactive Map Hero ═══ */}
      <section className="relative mx-4 overflow-hidden rounded-[24px] shadow-lg" style={{ height: 280 }}>
        <img
          src="/api/spot-image?q=world+map+watercolor+illustration"
          alt="map"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(1.08) saturate(0.85)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/40" />

        {/* Floating destination bubbles */}
        {filteredBubbles.map((bubble) => {
          const px = bubble.size === "lg" ? 68 : bubble.size === "md" ? 52 : 42;
          const ring = bubble.size === "lg"
            ? "ring-[3px] ring-white shadow-xl"
            : bubble.size === "md"
              ? "ring-[2.5px] ring-white shadow-lg"
              : "ring-2 ring-white/90 shadow-md";

          return (
            <Link
              key={bubble.name}
              to="/explore"
              search={{ dest: bubble.query.split(" ")[0] }}
              className="absolute flex flex-col items-center transition-transform active:scale-90"
              style={{ top: bubble.top, left: bubble.left, transform: "translate(-50%,-50%)" }}
            >
              <div
                className={`overflow-hidden rounded-full ${ring}`}
                style={{ width: px, height: px }}
              >
                <img
                  src={`/api/spot-image?q=${encodeURIComponent(bubble.query)}`}
                  alt={bubble.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="mt-1 max-w-[72px] truncate text-center text-[10px] font-bold text-gray-800"
                style={{ textShadow: "0 1px 3px rgba(255,255,255,0.9)" }}>
                {bubble.name}
              </span>
              <span className="text-[8px] font-medium text-gray-500"
                style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}>
                {bubble.sub}
              </span>
            </Link>
          );
        })}
      </section>

      {/* ═══ Continent Tabs ═══ */}
      <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto px-4">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setActiveContinent(c)}
            className={`pressable shrink-0 rounded-full px-4 py-[7px] text-[12px] font-bold tracking-wide transition-all ${
              activeContinent === c
                ? "bg-gray-900 text-white shadow-md"
                : "bg-white text-gray-500 shadow-sm active:bg-gray-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ═══ Quick Links ═══ */}
      <section className="mt-5 px-4">
        <div className="grid grid-cols-4 gap-3">
          {quickLinks.map(({ icon: Icon, label, color, bg, cat }) => (
            <Link
              key={label}
              to="/explore"
              {...(cat ? { search: { cat } } : {})}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3 shadow-sm active:bg-gray-50"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bg}`}>
                <Icon className={`h-[18px] w-[18px] ${color}`} />
              </div>
              <span className="text-[11px] font-semibold text-gray-700">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ Recommendations ═══ */}
      <section className="mt-6 px-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-[18px] font-extrabold tracking-tight text-gray-900">为你推荐</h2>
            <p className="mt-0.5 text-[11px] text-gray-400">基于你的兴趣智能推荐</p>
          </div>
          <button
            onClick={handleRefresh}
            className="pressable flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-500 shadow-sm active:bg-gray-50"
          >
            换一批 <RefreshCw className="h-3 w-3" />
          </button>
        </div>

        {/* Two-column cards */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {recommendations
            ? visibleRecos.map((r: any, i: number) => (
                <Link
                  key={r.id ?? i}
                  to="/explore"
                  search={{ dest: r.city }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition active:scale-[0.98]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={r.cover_url || `/api/spot-image?q=${encodeURIComponent(r.city + " " + r.country + " 景点")}`}
                      alt={r.city}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
                    <span
                      className="absolute left-2.5 top-2.5 rounded-md px-2 py-[3px] text-[10px] font-bold text-white backdrop-blur-sm"
                      style={{ background: `${r._labelColor}dd` }}
                    >
                      {r._label}
                    </span>
                  </div>
                  <div className="px-3 pb-3 pt-2.5">
                    <p className="truncate text-[14px] font-bold text-gray-900">
                      {r.city}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-400">{r.country}</p>
                    <p className="mt-1 line-clamp-1 text-[11px] leading-relaxed text-gray-500">
                      {r.summary?.slice(0, 20) || r.route_title}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="h-2.5 w-2.5" /> {r.days_count}天行程
                    </div>
                  </div>
                </Link>
              ))
            : curatedRecommendations.slice(0, 6).map((r, i) => (
                <Link
                  key={i}
                  to="/explore"
                  search={{ dest: r.city }}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition active:scale-[0.98]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={`/api/spot-image?q=${encodeURIComponent(r.query)}`}
                      alt={r.city}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
                    <span
                      className="absolute left-2.5 top-2.5 rounded-md px-2 py-[3px] text-[10px] font-bold text-white backdrop-blur-sm"
                      style={{ background: `${r.labelColor}dd` }}
                    >
                      {r.label}
                    </span>
                  </div>
                  <div className="px-3 pb-3 pt-2.5">
                    <p className="truncate text-[14px] font-bold text-gray-900">
                      {r.city}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-400">{r.country}</p>
                    <p className="mt-1 line-clamp-1 text-[11px] leading-relaxed text-gray-500">
                      {r.desc}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="h-2.5 w-2.5" /> {r.season}
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* ═══ AI Banner ═══ */}
      <section className="mx-4 mt-6">
        <div
          className="overflow-hidden rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, #eef2ff 0%, #ede9fe 40%, #e0f2fe 100%)",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
              <Sparkles className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-gray-900">
                让 AI 为你定制旅行
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
                告诉我们你的偏好，智能生成专属路线
              </p>
            </div>
          </div>
          <Link
            to="/quiz"
            className="pressable mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-[14px] font-bold text-white shadow-lg transition active:scale-[0.98]"
          >
            开始定制 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="h-4" />
      <BottomNav />
    </div>
  );
}
