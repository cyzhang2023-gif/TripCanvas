import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronLeft, Plane, Hotel, Utensils, Bus, Ticket, ShoppingBag,
  Wallet, TrendingUp, MapPin, Calendar, Pencil, ChevronDown, ChevronUp,
  ChevronRight, Route as RouteIcon,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { BottomNav } from "@/components/BottomNav";
import { BudgetPageSkeleton } from "@/components/PageSkeletons";
import { useDestinations, useExploreRoutes } from "@/lib/tripStore";
import heroImg from "@/assets/hero-santorini-blue.webp";

export const Route = createFileRoute("/budget")({
  component: BudgetPage,
  pendingComponent: BudgetPageSkeleton,
  head: () => ({ meta: [{ title: "预算规划 · Routey" }] }),
});

type BudgetLevel = "economy" | "comfort" | "luxury";

const levels: { key: BudgetLevel; label: string; emoji: string; desc: string }[] = [
  { key: "economy", label: "经济游", emoji: "🎒", desc: "青旅/民宿 · 街头美食" },
  { key: "comfort", label: "舒适游", emoji: "🛋️", desc: "三四星酒店 · 特色餐厅" },
  { key: "luxury", label: "品质游", emoji: "👑", desc: "五星酒店 · 米其林/高端" },
];

const regionIcons: Record<string, string> = {
  "日本": "⛩️", "韩国": "🇰🇷", "泰国": "🏖️", "越南": "🍜", "新加坡": "🦁",
  "马来西亚": "🌴", "印度尼西亚": "🏝️", "柬埔寨": "🛕", "菲律宾": "🐚",
  "法国": "🗼", "意大利": "🏛️", "西班牙": "💃", "英国": "🎡", "德国": "🏰",
  "瑞士": "⛷️", "希腊": "🏺", "冰岛": "🧊", "克罗地亚": "⛵", "捷克": "🍺",
  "美国": "🗽", "加拿大": "🍁", "墨西哥": "🌮", "巴西": "🎭", "秘鲁": "🦙",
  "澳洲": "🦘", "新西兰": "🥝",
  "土耳其": "🎈", "摩洛哥": "🐪", "埃及": "🏜️", "南非": "🦁", "阿联酋": "🕌",
  "中国": "🏔️", "斯里兰卡": "🍵", "印度": "🕌", "尼泊尔": "🏔️",
};
function getIcon(name: string): string {
  for (const [key, icon] of Object.entries(regionIcons)) {
    if (name.includes(key)) return icon;
  }
  return "📍";
}

// Per-day cost by destination keyword: [transport_fixed, hotel, food, local_transport, tickets, shopping]
const costData: Record<string, Record<BudgetLevel, number[]>> = {
  "东京": { economy: [3500, 300, 150, 80, 100, 200], comfort: [5000, 800, 350, 120, 200, 500], luxury: [8000, 2000, 800, 300, 400, 1000] },
  "大阪": { economy: [3200, 280, 140, 70, 90, 180], comfort: [4800, 750, 320, 110, 180, 450], luxury: [7500, 1800, 700, 280, 350, 900] },
  "京都": { economy: [3200, 300, 130, 60, 120, 150], comfort: [4800, 800, 300, 100, 220, 400], luxury: [7500, 1900, 700, 250, 400, 800] },
  "北海道": { economy: [3800, 350, 160, 100, 80, 200], comfort: [5500, 900, 380, 150, 180, 500], luxury: [9000, 2200, 850, 350, 350, 1000] },
  "曼谷": { economy: [2000, 150, 80, 30, 50, 150], comfort: [3500, 500, 200, 60, 120, 400], luxury: [6000, 1500, 600, 200, 300, 800] },
  "清迈": { economy: [2200, 120, 60, 25, 40, 120], comfort: [3800, 400, 160, 50, 100, 350], luxury: [6500, 1200, 500, 150, 250, 700] },
  "巴黎": { economy: [5000, 400, 200, 100, 150, 300], comfort: [7000, 1200, 500, 180, 300, 800], luxury: [12000, 3000, 1200, 400, 500, 2000] },
  "罗马": { economy: [4500, 350, 180, 80, 130, 250], comfort: [6500, 1000, 450, 150, 280, 700], luxury: [11000, 2500, 1000, 350, 450, 1500] },
  "伦敦": { economy: [5500, 500, 250, 120, 180, 350], comfort: [7500, 1400, 550, 200, 350, 900], luxury: [13000, 3500, 1300, 450, 550, 2200] },
  "大理": { economy: [800, 120, 60, 30, 40, 100], comfort: [1500, 400, 150, 60, 100, 300], luxury: [2500, 1000, 400, 150, 200, 600] },
  "成都": { economy: [600, 120, 80, 30, 50, 100], comfort: [1200, 400, 200, 60, 120, 300], luxury: [2000, 1000, 500, 150, 250, 600] },
  "首尔": { economy: [2500, 250, 120, 60, 80, 200], comfort: [4000, 700, 300, 100, 180, 500], luxury: [7000, 1800, 700, 280, 350, 1000] },
  "新加坡": { economy: [3000, 300, 150, 50, 100, 250], comfort: [4500, 800, 350, 100, 200, 600], luxury: [8000, 2000, 800, 250, 400, 1200] },
  "巴厘岛": { economy: [3000, 150, 80, 40, 50, 150], comfort: [4500, 500, 200, 80, 120, 400], luxury: [7000, 1500, 600, 200, 300, 900] },
  "纽约": { economy: [6000, 500, 250, 100, 150, 350], comfort: [8000, 1500, 550, 200, 350, 900], luxury: [14000, 3500, 1300, 450, 550, 2200] },
  "悉尼": { economy: [5000, 400, 200, 100, 130, 300], comfort: [7000, 1100, 450, 180, 280, 750], luxury: [12000, 2800, 1000, 400, 450, 1600] },
  "冰岛": { economy: [6000, 500, 300, 150, 100, 200], comfort: [8000, 1200, 600, 250, 250, 500], luxury: [13000, 3000, 1200, 500, 500, 1000] },
  "瑞士": { economy: [5500, 500, 280, 150, 120, 250], comfort: [7500, 1300, 550, 250, 280, 700], luxury: [12000, 3200, 1200, 500, 500, 1500] },
  "迪拜": { economy: [4000, 350, 150, 60, 80, 250], comfort: [6000, 1000, 400, 120, 200, 600], luxury: [10000, 3000, 1000, 300, 400, 1500] },
  "马尔代夫": { economy: [5000, 400, 200, 50, 100, 200], comfort: [8000, 1500, 500, 100, 200, 500], luxury: [15000, 4000, 1200, 200, 400, 1000] },
  "普吉岛": { economy: [2500, 150, 80, 30, 50, 150], comfort: [4000, 500, 200, 60, 120, 400], luxury: [6500, 1500, 600, 200, 300, 800] },
  "夏威夷": { economy: [6000, 400, 200, 100, 80, 250], comfort: [8000, 1200, 450, 180, 200, 600], luxury: [13000, 3000, 1000, 400, 400, 1200] },
};

const domesticRegions = ["华东", "华南", "华北", "华中", "西南", "西北", "东北", "国内", "中国"];
const asiaRegions = ["东南亚", "东亚", "南亚"];

const domesticDefault: Record<BudgetLevel, number[]> = { economy: [600, 150, 80, 30, 50, 100], comfort: [1200, 450, 200, 60, 130, 350], luxury: [2500, 1100, 500, 150, 280, 700] };
const asiaDefault: Record<BudgetLevel, number[]> = { economy: [2500, 200, 100, 50, 70, 180], comfort: [4000, 650, 280, 100, 170, 450], luxury: [7000, 1700, 650, 250, 350, 950] };
const intlDefault: Record<BudgetLevel, number[]> = { economy: [5000, 400, 200, 100, 120, 280], comfort: [7000, 1100, 450, 180, 280, 700], luxury: [12000, 2800, 1000, 400, 500, 1500] };

function getCost(destName: string, routeTitle: string, region: string): Record<BudgetLevel, number[]> {
  const search = routeTitle + destName;
  for (const [key, val] of Object.entries(costData)) {
    if (search.includes(key)) return val;
  }
  if (domesticRegions.some(r => region.includes(r))) return domesticDefault;
  if (asiaRegions.some(r => region.includes(r))) return asiaDefault;
  return intlDefault;
}

const catList: { icon: LucideIcon; label: string; color: string; bg: string }[] = [
  { icon: Plane, label: "往返交通", color: "text-sky-600", bg: "bg-sky-100" },
  { icon: Hotel, label: "住宿", color: "text-violet-600", bg: "bg-violet-100" },
  { icon: Utensils, label: "餐饮", color: "text-amber-600", bg: "bg-amber-100" },
  { icon: Bus, label: "当地交通", color: "text-emerald-600", bg: "bg-emerald-100" },
  { icon: Ticket, label: "景点门票", color: "text-rose-500", bg: "bg-rose-100" },
  { icon: ShoppingBag, label: "购物娱乐", color: "text-indigo-600", bg: "bg-indigo-100" },
];

function BudgetPage() {
  const { data: groups } = useDestinations();
  const [dest, setDest] = useState("");
  const [destRegion, setDestRegion] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [level, setLevel] = useState<BudgetLevel>("comfort");
  const [showAllDests, setShowAllDests] = useState(false);

  const allDests = useMemo(() => {
    if (!groups) return [];
    return groups.flatMap(g =>
      g.destinations.map(d => ({ name: d.name, routes: d.routes, region: g.region }))
    ).sort((a, b) => b.routes - a.routes);
  }, [groups]);

  const activeDest = dest || allDests[0]?.name || "日本";
  const activeRegion = destRegion || allDests[0]?.region || "东亚";
  const visibleDests = showAllDests ? allDests : allDests.slice(0, 8);

  const { data: routes } = useExploreRoutes(activeDest);
  const activeRoute = routes?.find(r => r.id === selectedRoute) ?? routes?.[0];
  const days = activeRoute?.days || 5;

  useEffect(() => {
    if (routes?.[0] && !selectedRoute) setSelectedRoute(routes[0].id);
  }, [routes, selectedRoute]);

  const costs = getCost(activeDest, activeRoute?.title ?? "", activeRegion);
  const perDay = costs[level];
  const transport = perDay[0];
  const dailyCosts = perDay.slice(1);
  const total = transport + dailyCosts.reduce((s, v) => s + v, 0) * days;
  const perDayAvg = Math.round(total / days);

  return (
    <div className="min-h-screen bg-[#f5f6fa] pb-28">
      <div className="mx-auto max-w-[430px]">
        <header className="relative flex items-center justify-center px-4 pt-[env(safe-area-inset-top,44px)] pb-2 bg-white">
          <Link to="/" className="absolute left-4 grid place-items-center h-8 w-8">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-[16px] font-bold">预算规划</h1>
        </header>

        <div className="h-[110px] w-full overflow-hidden">
          <img src={heroImg} alt="预算规划背景" className="h-full w-full object-cover" loading="lazy" style={{ objectPosition: "75% 40%" }} />
        </div>

        <div className="px-3 -mt-5 space-y-2.5 relative z-10">
          {/* Destination picker */}
          <section className="rounded-2xl bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[12px] font-bold">选择目的地</p>
              <span className="text-[9px] text-muted-foreground ml-auto">{allDests.length} 个</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {visibleDests.map((d) => (
                <button key={d.name} onClick={() => { setDest(d.name); setDestRegion(d.region); setSelectedRoute(""); }}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition ${
                    activeDest === d.name
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-border/60 text-foreground"
                  }`}>
                  <span className="text-[11px]">{getIcon(d.name)}</span>
                  {d.name}
                </button>
              ))}
            </div>
            {allDests.length > 8 && (
              <button onClick={() => setShowAllDests(!showAllDests)}
                className="mt-1.5 flex items-center gap-0.5 mx-auto text-[10px] text-primary font-medium">
                {showAllDests ? <><ChevronUp className="h-3 w-3" /> 收起</> : <><ChevronDown className="h-3 w-3" /> 更多 ({allDests.length})</>}
              </button>
            )}
          </section>

          {/* Route picker */}
          <section className="rounded-2xl bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <RouteIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[12px] font-bold">选择路线</p>
              <span className="text-[9px] text-muted-foreground ml-auto">{routes?.length ?? 0} 条路线</span>
            </div>
            {!routes?.length ? (
              <p className="text-[10px] text-muted-foreground py-2 text-center">加载中...</p>
            ) : (
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
                {routes.map((r) => (
                  <button key={r.id} onClick={() => setSelectedRoute(r.id)}
                    className={`w-full flex items-center gap-2.5 rounded-xl p-2 text-left transition ${
                      activeRoute?.id === r.id ? "bg-primary/8 ring-1.5 ring-primary" : "bg-gray-50 active:bg-gray-100"
                    }`}>
                    <img src={r.cover} alt={r.title || "路线封面"} className="h-10 w-10 rounded-lg object-cover shrink-0" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold truncate">{r.title}</p>
                      <p className="text-[9px] text-muted-foreground">{r.days}天 · {r.spots}个景点</p>
                    </div>
                    <ChevronRight className={`h-3 w-3 shrink-0 ${activeRoute?.id === r.id ? "text-primary" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Budget level */}
          <section className="rounded-2xl bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[12px] font-bold">旅行风格</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {levels.map((l) => (
                <button key={l.key} onClick={() => setLevel(l.key)}
                  className={`rounded-xl p-2.5 text-center transition ${
                    level === l.key ? "ring-2 ring-primary bg-primary/5" : "bg-[#faf9fe]"
                  }`}>
                  <span className="text-[24px] block">{l.emoji}</span>
                  <p className="text-[11px] font-bold mt-1">{l.label}</p>
                  <p className="text-[8px] text-muted-foreground mt-0.5 leading-tight">{l.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Total */}
          <section className="rounded-2xl p-4 text-white shadow-lg overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #7c6dff 0%, #5b45f3 50%, #4a36ef 100%)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5" />
                <span className="text-[11px] font-medium opacity-90">预估总费用</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5">
                <TrendingUp className="h-3 w-3" />
                <span className="text-[9px]">约 ¥{perDayAvg.toLocaleString()}/天均</span>
              </div>
            </div>
            <p className="text-[32px] font-extrabold mt-1.5 tracking-tight leading-none">
              ¥{total.toLocaleString()}
            </p>
            <p className="text-[10px] opacity-70 mt-1 truncate">
              {activeRoute?.title ?? activeDest} · {days}天 · {levels.find(l => l.key === level)?.label}
            </p>
            <svg className="absolute right-3 bottom-2.5 opacity-30" width="80" height="32" viewBox="0 0 100 40">
              <polyline fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                points="0,30 10,25 20,28 30,20 40,22 50,15 60,18 70,10 80,12 90,5 100,8" />
            </svg>
          </section>

          {/* Breakdown */}
          <section className="rounded-2xl bg-white p-3.5 shadow-sm">
            <div className="flex items-center gap-2 mb-2.5">
              <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[12px] font-bold">费用明细</p>
            </div>
            <div className="space-y-3">
              {catList.map(({ icon: Icon, label, color, bg }, i) => {
                const amount = i === 0 ? perDay[0] : perDay[i] * days;
                const pct = total > 0 ? Math.round(amount / total * 100) : 0;
                return (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className={`grid place-items-center h-8 w-8 rounded-lg shrink-0 ${bg}`}>
                      <Icon className={`h-3.5 w-3.5 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-medium">{label}</span>
                      <div className="mt-0.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, background: "linear-gradient(90deg, #6d61ff, #4a36ef)" }} />
                      </div>
                    </div>
                    <span className="text-[12px] font-bold shrink-0">¥{amount.toLocaleString()}</span>
                    <span className="text-[10px] text-muted-foreground w-7 text-right shrink-0">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
