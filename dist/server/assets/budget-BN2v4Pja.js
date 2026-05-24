import { r as reactExports, V as jsxRuntimeExports } from "./server-F62Km59P.js";
import { L as Link } from "./router-_rLCEenn.js";
import { B as BottomNav } from "./BottomNav-BNMZze1E.js";
import { i as useDestinations, h as useExploreRoutes } from "./tripStore-CAEye6oe.js";
import { h as heroImg } from "./hero-santorini-blue-BZZprHFp.js";
import { C as ChevronLeft } from "./chevron-left-BXODXwXM.js";
import { M as MapPin } from "./map-pin-CPNfM5hP.js";
import { C as ChevronUp, H as Hotel } from "./hotel-Dws_ou-a.js";
import { C as ChevronDown } from "./chevron-down-Dmv_Oz55.js";
import { R as Route } from "./route-CoYB_o8O.js";
import { C as ChevronRight } from "./chevron-right-XWBozJyy.js";
import { W as Wallet } from "./wallet-Cl1yDYSp.js";
import { T as TrendingUp } from "./trending-up-DmO-5Gzb.js";
import { P as Plane } from "./plane-Di15hxAj.js";
import { U as Utensils } from "./utensils-67wryfse.js";
import { c as createLucideIcon } from "./createLucideIcon-DxQ4Tsu1.js";
import { S as ShoppingBag } from "./shopping-bag-CknxgqgK.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-CC4dDzJM.js";
import "node:events";
const __iconNode$1 = [
  ["path", { d: "M8 6v6", key: "18i7km" }],
  ["path", { d: "M15 6v6", key: "1sg6z9" }],
  ["path", { d: "M2 12h19.6", key: "de5uta" }],
  [
    "path",
    {
      d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",
      key: "1wwztk"
    }
  ],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
  ["path", { d: "M9 18h5", key: "lrx6i" }],
  ["circle", { cx: "16", cy: "18", r: "2", key: "1v4tcr" }]
];
const Bus = createLucideIcon("bus", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode);
const levels = [{
  key: "economy",
  label: "经济游",
  emoji: "🎒",
  desc: "青旅/民宿 · 街头美食"
}, {
  key: "comfort",
  label: "舒适游",
  emoji: "🛋️",
  desc: "三四星酒店 · 特色餐厅"
}, {
  key: "luxury",
  label: "品质游",
  emoji: "👑",
  desc: "五星酒店 · 米其林/高端"
}];
const regionIcons = {
  "日本": "⛩️",
  "韩国": "🇰🇷",
  "泰国": "🏖️",
  "越南": "🍜",
  "新加坡": "🦁",
  "马来西亚": "🌴",
  "印度尼西亚": "🏝️",
  "柬埔寨": "🛕",
  "菲律宾": "🐚",
  "法国": "🗼",
  "意大利": "🏛️",
  "西班牙": "💃",
  "英国": "🎡",
  "德国": "🏰",
  "瑞士": "⛷️",
  "希腊": "🏺",
  "冰岛": "🧊",
  "克罗地亚": "⛵",
  "捷克": "🍺",
  "美国": "🗽",
  "加拿大": "🍁",
  "墨西哥": "🌮",
  "巴西": "🎭",
  "秘鲁": "🦙",
  "澳洲": "🦘",
  "新西兰": "🥝",
  "土耳其": "🎈",
  "摩洛哥": "🐪",
  "埃及": "🏜️",
  "南非": "🦁",
  "阿联酋": "🕌",
  "中国": "🏔️",
  "斯里兰卡": "🍵",
  "印度": "🕌",
  "尼泊尔": "🏔️"
};
function getIcon(name) {
  for (const [key, icon] of Object.entries(regionIcons)) {
    if (name.includes(key)) return icon;
  }
  return "📍";
}
const costData = {
  "东京": {
    economy: [3500, 300, 150, 80, 100, 200],
    comfort: [5e3, 800, 350, 120, 200, 500],
    luxury: [8e3, 2e3, 800, 300, 400, 1e3]
  },
  "大阪": {
    economy: [3200, 280, 140, 70, 90, 180],
    comfort: [4800, 750, 320, 110, 180, 450],
    luxury: [7500, 1800, 700, 280, 350, 900]
  },
  "京都": {
    economy: [3200, 300, 130, 60, 120, 150],
    comfort: [4800, 800, 300, 100, 220, 400],
    luxury: [7500, 1900, 700, 250, 400, 800]
  },
  "北海道": {
    economy: [3800, 350, 160, 100, 80, 200],
    comfort: [5500, 900, 380, 150, 180, 500],
    luxury: [9e3, 2200, 850, 350, 350, 1e3]
  },
  "曼谷": {
    economy: [2e3, 150, 80, 30, 50, 150],
    comfort: [3500, 500, 200, 60, 120, 400],
    luxury: [6e3, 1500, 600, 200, 300, 800]
  },
  "清迈": {
    economy: [2200, 120, 60, 25, 40, 120],
    comfort: [3800, 400, 160, 50, 100, 350],
    luxury: [6500, 1200, 500, 150, 250, 700]
  },
  "巴黎": {
    economy: [5e3, 400, 200, 100, 150, 300],
    comfort: [7e3, 1200, 500, 180, 300, 800],
    luxury: [12e3, 3e3, 1200, 400, 500, 2e3]
  },
  "罗马": {
    economy: [4500, 350, 180, 80, 130, 250],
    comfort: [6500, 1e3, 450, 150, 280, 700],
    luxury: [11e3, 2500, 1e3, 350, 450, 1500]
  },
  "伦敦": {
    economy: [5500, 500, 250, 120, 180, 350],
    comfort: [7500, 1400, 550, 200, 350, 900],
    luxury: [13e3, 3500, 1300, 450, 550, 2200]
  },
  "大理": {
    economy: [800, 120, 60, 30, 40, 100],
    comfort: [1500, 400, 150, 60, 100, 300],
    luxury: [2500, 1e3, 400, 150, 200, 600]
  },
  "成都": {
    economy: [600, 120, 80, 30, 50, 100],
    comfort: [1200, 400, 200, 60, 120, 300],
    luxury: [2e3, 1e3, 500, 150, 250, 600]
  },
  "首尔": {
    economy: [2500, 250, 120, 60, 80, 200],
    comfort: [4e3, 700, 300, 100, 180, 500],
    luxury: [7e3, 1800, 700, 280, 350, 1e3]
  },
  "新加坡": {
    economy: [3e3, 300, 150, 50, 100, 250],
    comfort: [4500, 800, 350, 100, 200, 600],
    luxury: [8e3, 2e3, 800, 250, 400, 1200]
  },
  "巴厘岛": {
    economy: [3e3, 150, 80, 40, 50, 150],
    comfort: [4500, 500, 200, 80, 120, 400],
    luxury: [7e3, 1500, 600, 200, 300, 900]
  },
  "纽约": {
    economy: [6e3, 500, 250, 100, 150, 350],
    comfort: [8e3, 1500, 550, 200, 350, 900],
    luxury: [14e3, 3500, 1300, 450, 550, 2200]
  },
  "悉尼": {
    economy: [5e3, 400, 200, 100, 130, 300],
    comfort: [7e3, 1100, 450, 180, 280, 750],
    luxury: [12e3, 2800, 1e3, 400, 450, 1600]
  },
  "冰岛": {
    economy: [6e3, 500, 300, 150, 100, 200],
    comfort: [8e3, 1200, 600, 250, 250, 500],
    luxury: [13e3, 3e3, 1200, 500, 500, 1e3]
  },
  "瑞士": {
    economy: [5500, 500, 280, 150, 120, 250],
    comfort: [7500, 1300, 550, 250, 280, 700],
    luxury: [12e3, 3200, 1200, 500, 500, 1500]
  },
  "迪拜": {
    economy: [4e3, 350, 150, 60, 80, 250],
    comfort: [6e3, 1e3, 400, 120, 200, 600],
    luxury: [1e4, 3e3, 1e3, 300, 400, 1500]
  },
  "马尔代夫": {
    economy: [5e3, 400, 200, 50, 100, 200],
    comfort: [8e3, 1500, 500, 100, 200, 500],
    luxury: [15e3, 4e3, 1200, 200, 400, 1e3]
  },
  "普吉岛": {
    economy: [2500, 150, 80, 30, 50, 150],
    comfort: [4e3, 500, 200, 60, 120, 400],
    luxury: [6500, 1500, 600, 200, 300, 800]
  },
  "夏威夷": {
    economy: [6e3, 400, 200, 100, 80, 250],
    comfort: [8e3, 1200, 450, 180, 200, 600],
    luxury: [13e3, 3e3, 1e3, 400, 400, 1200]
  }
};
const domesticRegions = ["华东", "华南", "华北", "华中", "西南", "西北", "东北", "国内", "中国"];
const asiaRegions = ["东南亚", "东亚", "南亚"];
const domesticDefault = {
  economy: [600, 150, 80, 30, 50, 100],
  comfort: [1200, 450, 200, 60, 130, 350],
  luxury: [2500, 1100, 500, 150, 280, 700]
};
const asiaDefault = {
  economy: [2500, 200, 100, 50, 70, 180],
  comfort: [4e3, 650, 280, 100, 170, 450],
  luxury: [7e3, 1700, 650, 250, 350, 950]
};
const intlDefault = {
  economy: [5e3, 400, 200, 100, 120, 280],
  comfort: [7e3, 1100, 450, 180, 280, 700],
  luxury: [12e3, 2800, 1e3, 400, 500, 1500]
};
function getCost(destName, routeTitle, region) {
  const search = routeTitle + destName;
  for (const [key, val] of Object.entries(costData)) {
    if (search.includes(key)) return val;
  }
  if (domesticRegions.some((r) => region.includes(r))) return domesticDefault;
  if (asiaRegions.some((r) => region.includes(r))) return asiaDefault;
  return intlDefault;
}
const catList = [{
  icon: Plane,
  label: "往返交通",
  color: "text-sky-600",
  bg: "bg-sky-100"
}, {
  icon: Hotel,
  label: "住宿",
  color: "text-[#d4532e]",
  bg: "bg-[#fff0ed]"
}, {
  icon: Utensils,
  label: "餐饮",
  color: "text-amber-600",
  bg: "bg-amber-100"
}, {
  icon: Bus,
  label: "当地交通",
  color: "text-emerald-600",
  bg: "bg-emerald-100"
}, {
  icon: Ticket,
  label: "景点门票",
  color: "text-rose-500",
  bg: "bg-rose-100"
}, {
  icon: ShoppingBag,
  label: "购物娱乐",
  color: "text-indigo-600",
  bg: "bg-indigo-100"
}];
function BudgetPage() {
  const {
    data: groups
  } = useDestinations();
  const [dest, setDest] = reactExports.useState("");
  const [destRegion, setDestRegion] = reactExports.useState("");
  const [selectedRoute, setSelectedRoute] = reactExports.useState("");
  const [level, setLevel] = reactExports.useState("comfort");
  const [showAllDests, setShowAllDests] = reactExports.useState(false);
  const allDests = reactExports.useMemo(() => {
    if (!groups) return [];
    return groups.flatMap((g) => g.destinations.map((d) => ({
      name: d.name,
      routes: d.routes,
      region: g.region
    }))).sort((a, b) => b.routes - a.routes);
  }, [groups]);
  const activeDest = dest || allDests[0]?.name || "日本";
  const activeRegion = destRegion || allDests[0]?.region || "东亚";
  const visibleDests = showAllDests ? allDests : allDests.slice(0, 8);
  const {
    data: routes
  } = useExploreRoutes(activeDest);
  const activeRoute = routes?.find((r) => r.id === selectedRoute) ?? routes?.[0];
  const days = activeRoute?.days || 5;
  reactExports.useEffect(() => {
    if (routes?.[0] && !selectedRoute) setSelectedRoute(routes[0].id);
  }, [routes, selectedRoute]);
  const costs = getCost(activeDest, activeRoute?.title ?? "", activeRegion);
  const perDay = costs[level];
  const transport = perDay[0];
  const dailyCosts = perDay.slice(1);
  const total = transport + dailyCosts.reduce((s, v) => s + v, 0) * days;
  const perDayAvg = Math.round(total / days);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#f5f6fa] pb-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[430px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center justify-center px-4 pt-[env(safe-area-inset-top,44px)] pb-2 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "absolute left-4 grid place-items-center h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[16px] font-bold", children: "预算规划" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[110px] w-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "预算规划背景", className: "h-full w-full object-cover", loading: "lazy", style: {
        objectPosition: "75% 40%"
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 -mt-5 space-y-2.5 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-white p-3.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-bold", children: "选择目的地" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground ml-auto", children: [
              allDests.length,
              " 个"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: visibleDests.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setDest(d.name);
            setDestRegion(d.region);
            setSelectedRoute("");
          }, className: `flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition ${activeDest === d.name ? "bg-primary text-white shadow-md" : "bg-white border border-border/60 text-foreground"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px]", children: getIcon(d.name) }),
            d.name
          ] }, d.name)) }),
          allDests.length > 8 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowAllDests(!showAllDests), className: "mt-1.5 flex items-center gap-0.5 mx-auto text-[10px] text-primary font-medium", children: showAllDests ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }),
            " 收起"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }),
            " 更多 (",
            allDests.length,
            ")"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-white p-3.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-bold", children: "选择路线" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground ml-auto", children: [
              routes?.length ?? 0,
              " 条路线"
            ] })
          ] }),
          !routes?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground py-2 text-center", children: "加载中..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-[180px] overflow-y-auto", children: routes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedRoute(r.id), className: `w-full flex items-center gap-2.5 rounded-xl p-2 text-left transition ${activeRoute?.id === r.id ? "bg-primary/8 ring-1.5 ring-primary" : "bg-gray-50 active:bg-gray-100"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.cover, alt: r.title || "路线封面", className: "h-10 w-10 rounded-lg object-cover shrink-0", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold truncate", children: r.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground", children: [
                r.days,
                "天 · ",
                r.spots,
                "个景点"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: `h-3 w-3 shrink-0 ${activeRoute?.id === r.id ? "text-primary" : "text-muted-foreground/30"}` })
          ] }, r.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-white p-3.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-bold", children: "旅行风格" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: levels.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setLevel(l.key), className: `rounded-xl p-2.5 text-center transition ${level === l.key ? "ring-2 ring-primary bg-primary/5" : "bg-[#faf9fe]"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[24px] block", children: l.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold mt-1", children: l.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[8px] text-muted-foreground mt-0.5 leading-tight", children: l.desc })
          ] }, l.key)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl p-4 text-white shadow-lg overflow-hidden relative", style: {
          background: "linear-gradient(135deg, #e8614d 0%, #d4532e 50%, #c44a2d 100%)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium opacity-90", children: "预估总费用" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px]", children: [
                "约 ¥",
                perDayAvg.toLocaleString(),
                "/天均"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[32px] font-extrabold mt-1.5 tracking-tight leading-none", children: [
            "¥",
            total.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] opacity-70 mt-1 truncate", children: [
            activeRoute?.title ?? activeDest,
            " · ",
            days,
            "天 · ",
            levels.find((l) => l.key === level)?.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute right-3 bottom-2.5 opacity-30", width: "80", height: "32", viewBox: "0 0 100 40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", points: "0,30 10,25 20,28 30,20 40,22 50,15 60,18 70,10 80,12 90,5 100,8" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl bg-white p-3.5 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-bold", children: "费用明细" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: catList.map(({
            icon: Icon,
            label,
            color,
            bg
          }, i) => {
            const amount = i === 0 ? perDay[0] : perDay[i] * days;
            const pct = total > 0 ? Math.round(amount / total * 100) : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid place-items-center h-8 w-8 rounded-lg shrink-0 ${bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3.5 w-3.5 ${color}` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 h-1.5 rounded-full bg-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all duration-500", style: {
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #e8614d, #c44a2d)"
                } }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[12px] font-bold shrink-0", children: [
                "¥",
                amount.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground w-7 text-right shrink-0", children: [
                pct,
                "%"
              ] })
            ] }, label);
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
export {
  BudgetPage as component
};
