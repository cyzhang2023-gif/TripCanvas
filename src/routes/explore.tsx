import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpDown,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  Copy,
  Flame,
  Footprints,
  GitBranch,
  Heart,
  LayoutGrid,
  Loader2,
  MapPin,
  MoreHorizontal,
  Mountain,
  Share2,
  Star,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { BottomNav } from "@/components/BottomNav";
import { Img } from "@/components/Img";
import { ExplorePageSkeleton } from "@/components/PageSkeletons";
import { RatingSummary } from "@/components/RatingSummary";
import { useExploreRoutes, useTripActions, type ExploreRoute } from "@/lib/tripStore";

const unsplash = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const Route = createFileRoute("/explore")({
  validateSearch: z.object({ dest: z.string().default(""), cat: z.string().optional() }),
  component: ExplorePage,
  pendingComponent: ExplorePageSkeleton,
  head: () => ({ meta: [{ title: "Routey · 热门路线" }] }),
});

/* ─── Types & data ─── */

type CategoryKey = "hot" | "classic" | "family" | "couple" | "nature" | "city" | "culture" | "outdoor";
type Category = {
  key: CategoryKey;
  label: string;
  icon: LucideIcon;
  color: string;
  matcher: (r: ExploreRoute) => boolean;
};

const heroImages: Record<string, string> = {
  美国: unsplash("photo-1500916434205-0c77489c6cf7", 800),
  日本: unsplash("photo-1490806843957-31f4c9a91c65", 800),
  韩国: unsplash("photo-1534274988757-a28bf1a57c17", 800),
  泰国: unsplash("photo-1508009603885-50cf7c579365", 800),
  法国: unsplash("photo-1502602898657-3e91760cbb34", 800),
  菲律宾: unsplash("photo-1507525428034-b723cf961d3e", 800),
};

const categories: Category[] = [
  { key: "hot", label: "热门推荐", icon: Flame, color: "#5b45f3", matcher: () => true },
  {
    key: "nature",
    label: "自然风光",
    icon: Mountain,
    color: "#5bd8a4",
    matcher: (r) => r.tags.some((t) => ["自然", "自然风光", "山川湖海", "山水", "山海", "湖泊", "森林", "火山", "雪山", "海岛", "冰川", "湖光山色"].some((k) => t.includes(k))),
  },
  {
    key: "family",
    label: "亲子家庭",
    icon: UsersRound,
    color: "#5bd36b",
    matcher: (r) => r.tags.some((t) => ["亲子", "家庭", "博物馆", "动物"].some((k) => t.includes(k))),
  },
  {
    key: "city",
    label: "城市漫游",
    icon: LayoutGrid,
    color: "#2e8cf0",
    matcher: (r) => r.tags.some((t) => ["citywalk", "城市漫步", "城市探索", "购物", "美食", "夜市"].some((k) => t.includes(k))),
  },
  {
    key: "culture",
    label: "文化探索",
    icon: Star,
    color: "#a855f7",
    matcher: (r) => r.tags.some((t) => ["文化", "历史", "古城", "寺庙", "世界遗产", "人文", "宗教"].some((k) => t.includes(k))),
  },
  {
    key: "outdoor",
    label: "户外探险",
    icon: Footprints,
    color: "#22c55e",
    matcher: (r) => r.tags.some((t) => ["徒步", "探险", "冲浪", "海岸徒步", "沙漠", "登山", "露营"].some((k) => t.includes(k))),
  },
  {
    key: "couple",
    label: "蜜月旅行",
    icon: Heart,
    color: "#ff6681",
    matcher: (r) => r.tags.some((t) => ["浪漫", "蜜月", "二人世界", "海滩度假"].some((k) => t.includes(k))),
  },
];

const cityOptions = ["全部城市", "纽约", "加州", "洛杉矶", "黄石", "夏威夷"] as const;
const dayOptions = ["天数", "3天", "5天", "7天"] as const;
const modeOptions = ["出行方式", "自驾", "都市", "自然", "海滩"] as const;
const budgetOptions = ["预算", "舒适", "高品质"] as const;
const sortOptions = ["综合排序", "热度优先", "天数从短到长"] as const;

const localGuides = [
  {
    name: "纽约本地人",
    handle: "@NYC小王",
    avatar: unsplash("photo-1500648767791-00dcc994a43e", 120),
    tint: "#f1ecff",
  },
  {
    name: "加州玩家",
    handle: "@加州RoadTrip",
    avatar: unsplash("photo-1506794778202-cad84cf45f1d", 120),
    tint: "#edf4ff",
  },
  {
    name: "LA生活家",
    handle: "@LA生活日记",
    avatar: unsplash("photo-1494790108377-be9c29b29330", 120),
    tint: "#fff3e9",
  },
  {
    name: "摄影爱好者",
    handle: "@TravelLens",
    avatar: unsplash("photo-1527980965255-d3b416303d12", 120),
    tint: "#fff0f3",
  },
];

function cycle<T extends string>(opts: readonly T[], cur: T, set: (v: T) => void) {
  set(opts[(opts.indexOf(cur) + 1) % opts.length]);
}

function fmtLikes(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

/* ─── Component ─── */

function ExplorePage() {
  const { dest, cat: initialCat } = Route.useSearch();
  const nav = useNavigate();
  const actions = useTripActions();
  const { data: routes = [], isLoading } = useExploreRoutes(dest);

  const [cat, setCat] = useState<CategoryKey>(
    (initialCat && categories.some((c) => c.key === initialCat) ? initialCat : "hot") as CategoryKey,
  );
  const [city, setCity] = useState<(typeof cityOptions)[number]>("全部城市");
  const [days, setDays] = useState<(typeof dayOptions)[number]>("天数");
  const [mode, setMode] = useState<(typeof modeOptions)[number]>("出行方式");
  const [budget, setBudget] = useState<(typeof budgetOptions)[number]>("预算");
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("综合排序");
  const [addingId, setAddingId] = useState("");
  const [addedId, setAddedId] = useState("");
  const [forkingId, setForkingId] = useState("");
  const [toast, setToast] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const visible = useMemo(() => {
    const active = categories.find((c) => c.key === cat) ?? categories[0];
    const filtered = routes.filter((r) => {
      if (!active.matcher(r)) return false;
      if (city !== "全部城市" && !r.title.includes(city) && !r.tags.includes(city)) return false;
      if (days !== "天数" && `${r.days}天` !== days) return false;
      if (mode !== "出行方式" && !r.tags.includes(mode) && !r.title.includes(mode)) return false;
      return true;
    });
    const list = [...(filtered.length ? filtered : routes)];
    if (sort === "热度优先") list.sort((a, b) => b.likes - a.likes);
    if (sort === "天数从短到长") list.sort((a, b) => a.days - b.days);
    return list;
  }, [cat, city, days, mode, routes, sort]);

  const heroImg = dest
    ? (heroImages[dest] ?? routes[0]?.cover ?? heroImages["日本"])
    : (routes[0]?.cover ?? unsplash("photo-1488646953014-85cb44e25828", 800));

  const openRoute = async (route: ExploreRoute) => {
    setAddingId(route.id);
    try {
      const res = await actions.addExploreRoute(route.id);
      if ("aiJobId" in res) nav({ to: "/parsing", search: { jobId: res.aiJobId } });
      else {
        setAddedId(route.id);
        nav({ to: "/trip", search: { id: res.id } });
      }
    } catch (err) {
      setToast(err instanceof Error ? err.message : "路线打开失败");
    } finally {
      setAddingId("");
    }
  };

  const forkRoute = async (route: ExploreRoute) => {
    setForkingId(route.id);
    try {
      const res = await actions.addExploreRoute(route.id);
      if ("aiJobId" in res) {
        nav({ to: "/parsing", search: { jobId: res.aiJobId } });
      } else {
        setToast("已收藏为我的行程");
        nav({ to: "/trip", search: { id: res.id, edit: "1" } });
      }
    } catch (err) {
      setToast(err instanceof Error ? err.message : "收藏失败");
    } finally {
      setForkingId("");
    }
  };

  const share = async () => {
    try {
      if (navigator.share)
        await navigator.share({ title: `${dest} · 热门路线`, url: location.href });
      else {
        await navigator.clipboard?.writeText(location.href);
        setToast("链接已复制");
      }
    } catch {
      /* cancelled */
    }
  };

  return (
    <main className="app-shell pb-[94px] text-[#1d2029]">
      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden" style={{ height: 260 }}>
        <Img src={heroImg} alt="目的地" wrapperClass="absolute inset-0" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/70" />

        <div className="relative z-10 flex h-full flex-col px-4 pt-[env(safe-area-inset-top,44px)] text-white">
          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => (window.history.length > 1 ? window.history.back() : nav({ to: "/" }))}
              className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white shadow-sm backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <div className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={share}
                className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white shadow-sm backdrop-blur-sm"
              >
                <Share2 className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white shadow-sm backdrop-blur-sm"
              >
                <MoreHorizontal className="h-4 w-4" strokeWidth={2.5} />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-10 w-28 overflow-hidden rounded-xl bg-white text-[11px] font-semibold text-[#242735] shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(location.href);
                      setToast("链接已复制");
                      setShowMenu(false);
                    }}
                    className="pressable flex w-full items-center gap-1.5 px-3 py-2 text-left"
                  >
                    <Copy className="h-3 w-3" />
                    复制链接
                  </button>
                  <button
                    type="button"
                    onClick={() => nav({ to: "/destinations" })}
                    className="pressable flex w-full items-center gap-1.5 px-3 py-2 text-left text-[#6b6f7c]"
                  >
                    <MapPin className="h-3 w-3" />
                    全部城市
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Title area */}
          <div className="mt-auto pb-6">
            <h1 className="flex items-center gap-2 text-[24px] font-extrabold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {dest ? `${dest} · 热门路线` : (categories.find((c) => c.key === cat)?.label ?? "热门路线")}
              <MapPin className="h-5 w-5 text-[#8b7aff]" fill="#8b7aff" strokeWidth={2.5} />
            </h1>
            <p className="mt-1.5 text-[12px] text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
              来自小红书、知乎、马蜂窝等平台的热门攻略
            </p>
            <div className="mt-3 flex items-center justify-end gap-2">
              <span className="text-[11px] font-medium text-white/90">21.3万人收藏</span>
              <div className="flex -space-x-1.5">
                {localGuides.slice(0, 4).map((g) => (
                  <img
                    key={g.handle}
                    src={g.avatar}
                    alt={g.name || "用户头像"}
                    className="h-6 w-6 rounded-full border-[1.5px] border-white object-cover shadow-sm"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Categories + Filters ═══ */}
      <section className="relative z-10 -mt-4 rounded-t-[24px] bg-white px-3 pt-4 shadow-[0_-14px_32px_rgba(22,28,45,.08)]">
        {/* Category tabs */}
        <div className="flex items-start overflow-x-auto scrollbar-none">
          {categories.map(({ key, label, icon: Icon, color }) => {
            const active = cat === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setCat(key)}
                className={`pressable relative flex shrink-0 flex-1 flex-col items-center gap-1 pb-2.5 ${key === "city" ? "border-l border-gray-100" : ""}`}
              >
                <Icon
                  className="h-[18px] w-[18px]"
                  color={color}
                  fill={key === "couple" ? color : "none"}
                  strokeWidth={2.5}
                />
                <span
                  className={`whitespace-nowrap text-[10px] leading-none ${active ? "font-bold text-[#262936]" : "font-medium text-[#6f7480]"}`}
                >
                  {label}
                </span>
                {key === "city" && (
                  <ChevronDown className="absolute bottom-2 right-0 h-3 w-3 text-[#22242c]" />
                )}
                {active && (
                  <span className="absolute bottom-0 h-[3px] w-5 rounded-full bg-[#5b45f3]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Filter pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Pill
            label={city}
            active={city !== "全部城市"}
            onClick={() => cycle(cityOptions, city, setCity)}
          />
          <Pill
            label={days}
            active={days !== "天数"}
            onClick={() => cycle(dayOptions, days, setDays)}
          />
          <Pill
            label={mode}
            active={mode !== "出行方式"}
            onClick={() => cycle(modeOptions, mode, setMode)}
          />
          <Pill
            label={budget}
            active={budget !== "预算"}
            onClick={() => cycle(budgetOptions, budget, setBudget)}
          />
          <button
            type="button"
            onClick={() => cycle(sortOptions, sort, setSort)}
            className="pressable ml-auto flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-[10px] font-semibold text-[#353947]"
          >
            {sort} <ArrowUpDown className="h-3 w-3" />
          </button>
        </div>

        {/* Route list */}
        <div className="mt-3 space-y-2.5">
          {isLoading && <Skeleton />}
          {!isLoading && visible.length === 0 && (
            <div className="rounded-xl bg-[#f8f8fb] py-6 text-center text-[11px] text-[#777c89]">
              暂无已核验精品路线，换个筛选试试
            </div>
          )}
          {visible.map((r, i) => (
            <RouteCard
              key={r.id}
              route={r}
              rank={i + 1}
              adding={addingId === r.id}
              added={addedId === r.id}
              forking={forkingId === r.id}
              onOpen={() => void openRoute(r)}
              onFork={() => void forkRoute(r)}
            />
          ))}
        </div>

        {/* Local guides */}
        <section className="mt-5 pb-4">
          <h2 className="flex items-center gap-1.5 text-[14px] font-bold text-[#1d2029]">
            <Star className="h-4 w-4 text-[#6b56ff]" fill="#6b56ff" /> 本地人推荐
          </h2>
          <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-none">
            {localGuides.map((g) => (
              <button
                key={g.handle}
                type="button"
                onClick={() => setSort("热度优先")}
                className="pressable flex min-w-[120px] items-center gap-2 rounded-xl px-2.5 py-2 text-left shadow-sm"
                style={{ backgroundColor: g.tint }}
              >
                <span className="relative shrink-0">
                  <img src={g.avatar} alt={g.name || "达人头像"} className="h-8 w-8 rounded-full object-cover" loading="lazy" />
                  <Check className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#5b45f3] p-[1px] text-white" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[10px] font-bold text-[#252834]">
                    {g.name}
                  </span>
                  <span className="block truncate text-[9px] text-[#5f6470]">{g.handle}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </section>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#20232c] px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
      <BottomNav />
    </main>
  );
}

/* ─── Sub-components ─── */

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pressable flex shrink-0 items-center gap-0.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none ${
        active
          ? "border-[#6b56ff] bg-[#f4f1ff] text-[#5b45f3]"
          : "border-transparent bg-[#f5f5f8] text-[#313542]"
      }`}
    >
      {label} <ChevronDown className="h-3 w-3" />
    </button>
  );
}

function RouteCard({
  route,
  rank,
  adding,
  added,
  forking,
  onOpen,
  onFork,
}: {
  route: ExploreRoute;
  rank: number;
  adding: boolean;
  added: boolean;
  forking: boolean;
  onOpen: () => void;
  onFork: () => void;
}) {
  const sub = route.sourceVerified
    ? `${route.sourceName ?? route.source} · 官方来源`
    : "待人工核验";
  // Estimate steps from spots and days: ~6000 steps per spot-day combo, with variance
  const estSteps = Math.round((route.spots * 2800 + route.days * 4500) / 10000 * 10) / 10;
  return (
    <article className="grid grid-cols-[30%_1fr] gap-2 rounded-[16px] bg-white pr-1 shadow-[0_8px_24px_rgba(38,43,70,.08)]">
      <div className="relative h-[104px] overflow-hidden rounded-[16px]">
        <Img src={route.cover} alt={route.title} wrapperClass="h-full w-full" className="h-full w-full object-cover" />
        <span className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#5b45f3] shadow-sm">
          {rank}
        </span>
      </div>
      <div className="relative min-w-0 py-1.5 pr-1">
        <div className="flex items-start gap-1 pr-12">
          <h3 className="truncate text-[13px] font-bold leading-tight text-[#1e212b]">
            {route.title}
          </h3>
          {rank === 1 && (
            <span className="shrink-0 rounded bg-[#f6f1ff] px-1 py-px text-[8px] font-bold text-[#6b56ff]">
              热门
            </span>
          )}
        </div>
        <div className="absolute right-1 top-1.5 flex items-center gap-0.5 text-[10px] text-[#555b67]">
          <Heart className="h-3.5 w-3.5 text-[#ff6b8d]" /> {fmtLikes(route.likes)}
        </div>
        <p className="mt-0.5 truncate text-[10px] text-[#656a75]">{sub}</p>
        {/* Tags as pill badges */}
        {route.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {route.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className={`rounded-full px-2 py-[2px] text-[9px] font-bold ${t === "小红书精选" ? "bg-gradient-to-r from-[#ff2442] to-[#ff6075] text-white" : "bg-[#f3f1ff] text-[#6554e8]"}`}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {/* Rating summary */}
        <div className="mt-1">
          <RatingSummary routeId={route.id} compact />
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[9px] text-[#4f5561]">
            <span className="flex items-center gap-0.5">
              <CalendarDays className="h-3 w-3" /> {route.days}天{Math.max(route.days - 1, 0)}晚
            </span>
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3" /> {route.spots}个地点
            </span>
            <span className="flex items-center gap-0.5">
              <Footprints className="h-3 w-3" /> {estSteps}w步
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onFork(); }}
              disabled={forking}
              className="pressable flex h-[26px] items-center justify-center gap-1 rounded-full border border-violet-300 bg-violet-50 px-2.5 text-[10px] font-bold text-violet-600 disabled:opacity-70"
              title="收藏为我的行程"
            >
              {forking ? <Loader2 className="h-3 w-3 animate-spin" /> : <GitBranch className="h-3 w-3" />}
              <span className="hidden min-[380px]:inline">定制</span>
            </button>
            <button
              type="button"
              onClick={onOpen}
              disabled={adding}
              className="pressable flex h-[26px] items-center justify-center rounded-full bg-gradient-to-r from-[#735cff] to-[#5b45f3] px-3 text-[10px] font-bold text-white shadow-[0_8px_18px_rgba(91,69,243,.22)] disabled:opacity-70"
            >
              {adding ? <Loader2 className="h-3 w-3 animate-spin" /> : added ? "已加入" : "查看详情"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Skeleton() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="grid animate-pulse grid-cols-[30%_1fr] gap-2 rounded-xl bg-white pr-1 shadow-sm"
        >
          <div className="h-[104px] rounded-xl bg-[#eef0f6]" />
          <div className="space-y-2 py-3 pr-2">
            <div className="h-3.5 w-3/4 rounded-full bg-[#eef0f6]" />
            <div className="h-3 w-full rounded-full bg-[#eef0f6]" />
            <div className="h-3 w-1/2 rounded-full bg-[#eef0f6]" />
          </div>
        </div>
      ))}
    </>
  );
}
