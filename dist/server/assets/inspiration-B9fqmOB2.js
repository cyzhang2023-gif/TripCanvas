import { r as reactExports, V as jsxRuntimeExports } from "./server-iNGLsWf0.js";
import { u as useNavigate, L as Link } from "./router-BvWOY4f4.js";
import { C as Compass, B as BottomNav } from "./BottomNav-B237gffZ.js";
import { f as useFeaturedRoutes } from "./tripStore-CyC_Q_M5.js";
import { C as ChevronLeft } from "./chevron-left-Cw-GGbsf.js";
import { H as Heart } from "./heart-D_G0u6CQ.js";
import { S as Share2, C as ChevronDown } from "./share-2-o1VYaKbx.js";
import { M as MapPin } from "./map-pin-Ds0IeIYu.js";
import { c as createLucideIcon } from "./createLucideIcon-Dg0ODkPH.js";
import { C as Clock } from "./clock-CzMuhiJD.js";
import { F as Flame } from "./flame-Bz9r4cJa.js";
import { S as Snowflake } from "./snowflake-Cm6DICPB.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-Cje2GBqV.js";
import "node:events";
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const allDestinations = [
  // 亚洲
  {
    name: "北海道",
    sub: "春日赏樱",
    query: "hokkaido cherry blossom japan spring",
    dest: "北海道",
    top: 25.4,
    left: 89.7,
    size: "md",
    continent: "亚洲"
  },
  {
    name: "菲律宾科隆",
    sub: "潜水天堂",
    query: "coron palawan island diving lagoon",
    dest: "科隆岛",
    top: 47.8,
    left: 83.3,
    size: "lg",
    continent: "亚洲"
  },
  {
    name: "巴厘岛",
    sub: "神庙与稻田",
    query: "bali rice terrace temple indonesia",
    dest: "巴厘岛",
    top: 62.5,
    left: 82,
    size: "sm",
    continent: "亚洲"
  },
  {
    name: "马尔代夫",
    sub: "水上天堂",
    query: "maldives overwater villa ocean",
    dest: "马尔代夫",
    top: 54.2,
    left: 70.4,
    size: "md",
    continent: "亚洲"
  },
  {
    name: "泰国清迈",
    sub: "古城寺庙",
    query: "chiang mai thailand temple golden",
    dest: "清迈",
    top: 42.9,
    left: 77.5,
    size: "sm",
    continent: "亚洲"
  },
  {
    name: "京都",
    sub: "千年古都",
    query: "kyoto japan temple bamboo geisha",
    dest: "京都",
    top: 31.2,
    left: 87.7,
    size: "sm",
    continent: "亚洲"
  },
  {
    name: "迪拜",
    sub: "奢华之城",
    query: "dubai skyline burj khalifa luxury",
    dest: "迪拜",
    top: 38.3,
    left: 65.4,
    size: "sm",
    continent: "亚洲"
  },
  {
    name: "尼泊尔",
    sub: "喜马拉雅",
    query: "nepal himalaya mountain trek everest",
    dest: "尼泊尔",
    top: 36.4,
    left: 73.7,
    size: "sm",
    continent: "亚洲"
  },
  // 欧洲
  {
    name: "冰岛极光",
    sub: "奇幻之旅",
    query: "iceland northern lights aurora",
    dest: "冰岛",
    top: 9.8,
    left: 44.7,
    size: "md",
    continent: "欧洲"
  },
  {
    name: "圣托里尼",
    sub: "蓝白梦幻",
    query: "santorini greece blue dome sunset",
    dest: "圣托里尼",
    top: 30.1,
    left: 57.1,
    size: "sm",
    continent: "欧洲"
  },
  {
    name: "瑞士雪山",
    sub: "阿尔卑斯",
    query: "swiss alps matterhorn snow",
    dest: "瑞士",
    top: 22.6,
    left: 52.1,
    size: "sm",
    continent: "欧洲"
  },
  {
    name: "挪威峡湾",
    sub: "壮美北欧",
    query: "norway fjord scenic landscape",
    dest: "挪威",
    top: 12.3,
    left: 51.9,
    size: "sm",
    continent: "欧洲"
  },
  {
    name: "巴黎",
    sub: "浪漫之都",
    query: "paris eiffel tower seine river",
    dest: "巴黎",
    top: 21.1,
    left: 50.6,
    size: "sm",
    continent: "欧洲"
  },
  {
    name: "巴塞罗那",
    sub: "高迪之城",
    query: "barcelona sagrada familia gaudi spain",
    dest: "巴塞罗那",
    top: 26.5,
    left: 50.6,
    size: "sm",
    continent: "欧洲"
  },
  {
    name: "布拉格",
    sub: "百塔之城",
    query: "prague castle charles bridge czech",
    dest: "布拉格",
    top: 20.2,
    left: 54,
    size: "sm",
    continent: "欧洲"
  },
  // 北美洲
  {
    name: "纽约",
    sub: "不夜之城",
    query: "new york manhattan skyline night",
    dest: "纽约",
    top: 27,
    left: 29.4,
    size: "sm",
    continent: "北美洲"
  },
  {
    name: "夏威夷",
    sub: "阳光海浪",
    query: "hawaii waikiki beach sunset",
    dest: "夏威夷",
    top: 42.1,
    left: 6.8,
    size: "sm",
    continent: "北美洲"
  },
  {
    name: "旧金山",
    sub: "金门大桥",
    query: "san francisco golden gate bridge fog",
    dest: "旧金山",
    top: 29.1,
    left: 16,
    size: "sm",
    continent: "北美洲"
  },
  {
    name: "墨西哥坎昆",
    sub: "加勒比海",
    query: "cancun mexico caribbean beach resort",
    dest: "坎昆",
    top: 41.2,
    left: 25.9,
    size: "md",
    continent: "北美洲"
  },
  {
    name: "班夫国家公园",
    sub: "落基山脉",
    query: "banff national park canada rocky mountain lake",
    dest: "班夫",
    top: 19.4,
    left: 17.9,
    size: "sm",
    continent: "北美洲"
  },
  // 南美洲
  {
    name: "秘鲁",
    sub: "失落文明",
    query: "machu picchu peru inca ruins",
    dest: "秘鲁",
    top: 66.1,
    left: 30,
    size: "sm",
    continent: "南美洲"
  },
  {
    name: "巴塔哥尼亚",
    sub: "世界尽头",
    query: "patagonia glacier argentina",
    dest: "巴塔哥尼亚",
    top: 92.8,
    left: 30,
    size: "sm",
    continent: "南美洲"
  },
  {
    name: "里约热内卢",
    sub: "狂欢之城",
    query: "rio de janeiro brazil christ redeemer carnival",
    dest: "里约热内卢",
    top: 73.1,
    left: 38,
    size: "md",
    continent: "南美洲"
  },
  {
    name: "加拉帕戈斯",
    sub: "达尔文群岛",
    query: "galapagos islands ecuador wildlife tortoise",
    dest: "加拉帕戈斯",
    top: 57.1,
    left: 24.9,
    size: "sm",
    continent: "南美洲"
  },
  // 非洲
  {
    name: "肯尼亚",
    sub: "动物迁徙",
    query: "kenya safari animal migration",
    dest: "肯尼亚",
    top: 57.5,
    left: 60.5,
    size: "md",
    continent: "非洲"
  },
  {
    name: "摩洛哥沙漠",
    sub: "撒哈拉之旅",
    query: "morocco sahara desert camel",
    dest: "摩洛哥",
    top: 33.6,
    left: 48.9,
    size: "sm",
    continent: "非洲"
  },
  {
    name: "南非开普敦",
    sub: "好望角",
    query: "cape town south africa table mountain",
    dest: "开普敦",
    top: 81.1,
    left: 55.1,
    size: "sm",
    continent: "非洲"
  },
  {
    name: "坦桑尼亚",
    sub: "乞力马扎罗",
    query: "kilimanjaro tanzania safari serengeti",
    dest: "坦桑尼亚",
    top: 61.2,
    left: 59.7,
    size: "sm",
    continent: "非洲"
  },
  {
    name: "埃及",
    sub: "金字塔",
    query: "egypt pyramids giza sphinx cairo",
    dest: "埃及",
    top: 34.8,
    left: 58.7,
    size: "sm",
    continent: "非洲"
  },
  // 大洋洲
  {
    name: "澳大利亚",
    sub: "大堡礁",
    query: "great barrier reef australia coral",
    dest: "澳大利亚",
    top: 69.6,
    left: 90.6,
    size: "sm",
    continent: "大洋洲"
  },
  {
    name: "新西兰",
    sub: "中土世界",
    query: "new zealand milford sound fjord mountain",
    dest: "新西兰",
    top: 86.2,
    left: 98.3,
    size: "md",
    continent: "大洋洲"
  },
  {
    name: "斐济",
    sub: "南太平洋",
    query: "fiji island tropical beach resort",
    dest: "斐济",
    top: 69.6,
    left: 95,
    size: "sm",
    continent: "大洋洲"
  },
  {
    name: "悉尼",
    sub: "歌剧院",
    query: "sydney opera house harbour bridge",
    dest: "悉尼",
    top: 81.1,
    left: 92,
    size: "sm",
    continent: "大洋洲"
  }
];
const MAP_CANVAS_W = 260;
const continentView = (() => {
  const s0 = 100 / MAP_CANVAS_W;
  const s1 = 0.82;
  const canvasH = MAP_CANVAS_W * 383 / 1e3;
  function view(cx, cy) {
    return {
      scale: s1,
      left: 50 - cx / 100 * MAP_CANVAS_W * s1,
      top: 50 - cy / 100 * canvasH * s1
    };
  }
  return {
    "全部": {
      scale: s0,
      left: (100 - MAP_CANVAS_W * s0) / 2,
      top: (100 - canvasH * s0) / 2
    },
    "亚洲": view(78, 42),
    "欧洲": view(51, 21),
    "北美洲": view(20, 32),
    "南美洲": view(31, 72),
    "非洲": view(56, 54),
    "大洋洲": view(95, 77)
  };
})();
function pickBubbles(pool, count, minDist = 14) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked = [];
  for (const b of shuffled) {
    const tooClose = picked.some((p) => Math.abs(p.left - b.left) < minDist && Math.abs(p.top - b.top) < minDist);
    if (!tooClose) {
      picked.push(b);
      if (picked.length >= count) break;
    }
  }
  return picked;
}
const continents = ["全部", "亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"];
const curatedRecommendations = [{
  title: "东京·上野公园",
  label: "日本赏樱",
  labelColor: "#e11d48",
  desc: "樱花与古建筑的诗意相遇",
  season: "最佳季节 3-4月",
  query: "东京上野公园樱花",
  dest: "东京"
}, {
  title: "泰国·普吉岛",
  label: "东南亚海岛",
  labelColor: "#0891b2",
  desc: "阳光沙滩，慢享悠闲时光",
  season: "最佳季节 11-2月",
  query: "泰国普吉岛",
  dest: "普吉岛"
}, {
  title: "柬埔寨·吴哥窟",
  label: "文化探索",
  labelColor: "#7c3aed",
  desc: "穿越千年的文明奇迹",
  season: "最佳季节 11-2月",
  query: "柬埔寨吴哥窟日出",
  dest: "吴哥窟"
}, {
  title: "奥地利·哈尔施塔特",
  label: "欧洲小镇",
  labelColor: "#2563eb",
  desc: "童话般的湖畔小镇",
  season: "最佳季节 5-9月",
  query: "奥地利哈尔施塔特",
  dest: "哈尔施塔特"
}, {
  title: "希腊·圣托里尼",
  label: "海岛度假",
  labelColor: "#0d9488",
  desc: "蓝白相间的爱琴海明珠",
  season: "最佳季节 5-10月",
  query: "希腊圣托里尼日落",
  dest: "圣托里尼"
}, {
  title: "印尼·巴厘岛",
  label: "自然风光",
  labelColor: "#059669",
  desc: "神庙与稻田的和谐之美",
  season: "最佳季节 4-10月",
  query: "巴厘岛梯田",
  dest: "巴厘岛"
}];
const themeLabels = {
  "城市漫步": "城市漫步",
  "美食之旅": "美食之旅",
  "自然风光": "自然风光",
  "文化探索": "文化探索",
  "海滩度假": "海滩度假",
  "购物血拼": "购物血拼",
  "奢华体验": "奢华体验",
  "亲子出行": "亲子出行",
  food: "美食之旅",
  culture: "文化探索",
  luxury: "奢华体验",
  nature: "自然风光",
  beach: "海滩度假",
  city: "城市漫步",
  shopping: "购物血拼",
  family: "亲子出行",
  adventure: "户外探险"
};
const themeColors = {
  "城市漫步": "#2563eb",
  "美食之旅": "#ea580c",
  "自然风光": "#059669",
  "文化探索": "#7c3aed",
  "海滩度假": "#0891b2",
  "购物血拼": "#e11d48",
  "奢华体验": "#b45309",
  "亲子出行": "#0d9488",
  "户外探险": "#16a34a",
  "推荐": "#6366f1"
};
function resolveLabel(raw) {
  if (!raw) return "推荐";
  return themeLabels[raw] ?? themeLabels[raw.toLowerCase()] ?? raw;
}
function InspirationMap() {
  useNavigate();
  const {
    data: n8nRoutes
  } = useFeaturedRoutes();
  const [activeContinent, setActiveContinent] = reactExports.useState("全部");
  const [recoOffset, setRecoOffset] = reactExports.useState(0);
  const recommendations = reactExports.useMemo(() => {
    if (n8nRoutes && n8nRoutes.length >= 4) {
      const seen = /* @__PURE__ */ new Set();
      const items = [];
      for (const r of n8nRoutes) {
        if (seen.has(r.city)) continue;
        seen.add(r.city);
        const label = resolveLabel(r.route_theme || r.tags?.split(",")[0]);
        items.push({
          ...r,
          _label: label,
          _labelColor: themeColors[label] ?? "#6366f1"
        });
        if (items.length >= 12) break;
      }
      return items;
    }
    return null;
  }, [n8nRoutes]);
  const visibleRecos = reactExports.useMemo(() => {
    if (!recommendations) return curatedRecommendations.slice(0, 6);
    const start = recoOffset % recommendations.length;
    const slice = [];
    for (let i = 0; i < Math.min(6, recommendations.length); i++) {
      slice.push(recommendations[(start + i) % recommendations.length]);
    }
    return slice;
  }, [recommendations, recoOffset]);
  const handleRefresh = reactExports.useCallback(() => setRecoOffset((o) => o + 4), []);
  const displayBubbles = reactExports.useMemo(() => {
    if (activeContinent !== "全部") {
      const pool = allDestinations.filter((b) => b.continent === activeContinent);
      return pickBubbles(pool, Math.min(pool.length, 7), 5);
    }
    return pickBubbles(allDestinations, 6);
  }, [activeContinent]);
  const view = continentView[activeContinent] ?? continentView["全部"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell min-h-screen bg-[#f5f6fa] pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-4 pb-1 pt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "pressable flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5 text-gray-700" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[18px] font-extrabold text-gray-900", children: "灵感地图" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400", children: "探索世界精彩，发现旅行灵感" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white active:bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-gray-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white active:bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4 text-gray-600" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-3 mt-2 overflow-hidden rounded-[20px] bg-[#c8e1f0] shadow-md", style: {
      height: 260
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute", style: {
        width: `${MAP_CANVAS_W}%`,
        aspectRatio: "1000 / 383",
        left: `${view.left}%`,
        top: `${view.top}%`,
        transform: `scale(${view.scale})`,
        transformOrigin: "0 0",
        transition: "left 0.6s cubic-bezier(0.4,0,0.2,1), top 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/world-map.svg?v=3", alt: "", className: "absolute inset-0 h-full w-full", draggable: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
          ` }),
        displayBubbles.map((bubble, idx) => {
          const isLg = bubble.size === "lg";
          const isMd = bubble.size === "md";
          const basePx = isLg ? 64 : isMd ? 50 : 40;
          const px = basePx / view.scale;
          const floatDuration = 3 + idx * 0.4;
          const floatDelay = idx * 0.6;
          const fontSize = 10 / view.scale;
          const subFontSize = 8 / view.scale;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
            dest: bubble.dest
          }, className: "absolute z-[6] flex flex-col items-center active:scale-90", style: {
            top: `${bubble.top}%`,
            left: `${bubble.left}%`,
            animation: `bubble-fade-in 0.5s ${floatDelay * 0.3}s both, bubble-float ${floatDuration}s ${floatDelay}s ease-in-out infinite`
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-full", style: {
              width: px,
              height: px,
              border: isLg ? `${3 / view.scale}px solid rgba(67,97,238,0.45)` : `${2.5 / view.scale}px solid white`,
              boxShadow: `0 ${3 / view.scale}px ${12 / view.scale}px rgba(0,0,0,0.15)`,
              animation: isLg ? "bubble-pulse-ring 2.5s ease-out infinite" : void 0
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `/api/spot-image?q=${encodeURIComponent(bubble.query)}`, alt: bubble.name, className: "h-full w-full object-cover", loading: "lazy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-center font-bold text-gray-800", style: {
              fontSize,
              textShadow: "0 1px 3px rgba(255,255,255,0.95)",
              maxWidth: 80 / view.scale,
              lineHeight: 1.2
            }, children: bubble.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-500", style: {
              fontSize: subFontSize,
              textShadow: "0 1px 2px rgba(255,255,255,0.9)"
            }, children: bubble.sub })
          ] }, `${activeContinent}-${bubble.name}`);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-white/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-gray-700 shadow-sm", children: [
        activeContinent === "全部" ? "全部地区" : activeContinent,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-gray-500" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-gray-600 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-primary" }),
        " 地图图例"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar mt-3 flex items-center gap-2 overflow-x-auto px-4 py-1", children: continents.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveContinent(c), className: `pressable shrink-0 rounded-full px-4 py-[6px] text-[12px] font-bold transition-all ${activeContinent === c ? "bg-[#1e2a4a] text-white shadow-md" : "border border-gray-200 bg-white text-gray-500"}`, children: c }, c)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[16px] font-extrabold text-gray-900", children: "为你推荐" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-400", children: "基于你的兴趣生成" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleRefresh, className: "pressable flex items-center gap-1 text-[11px] font-medium text-gray-400", children: [
          "换一批 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar -mx-4 mt-2.5 flex gap-2.5 overflow-x-auto px-4 pb-1", children: recommendations ? visibleRecos.map((r, i) => {
        const label = r._label;
        const color = r._labelColor;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
          dest: r.city
        }, className: "group w-[140px] shrink-0 overflow-hidden rounded-xl bg-white shadow-sm transition active:scale-[0.98]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[105px] w-full overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.cover_url || `/api/spot-image?q=${encodeURIComponent(r.city + " " + r.country + " 景点")}`, alt: r.city, className: "h-full w-full object-cover", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 top-2 rounded-[4px] px-1.5 py-[2px] text-[9px] font-bold text-white", style: {
              background: color
            }, children: label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pb-2 pt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[12px] font-bold text-gray-900", children: [
              r.country,
              "·",
              r.city
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[10px] text-gray-400", children: r.summary?.slice(0, 16) || r.route_title?.slice(0, 16) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-0.5 text-[9px] text-gray-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
              " ",
              r.days_count,
              "天行程"
            ] })
          ] })
        ] }, r.id ?? i);
      }) : curatedRecommendations.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
        dest: r.dest
      }, className: "group w-[140px] shrink-0 overflow-hidden rounded-xl bg-white shadow-sm transition active:scale-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[105px] w-full overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `/api/spot-image?q=${encodeURIComponent(r.query)}`, alt: r.title, className: "h-full w-full object-cover", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 top-2 rounded-[4px] px-1.5 py-[2px] text-[9px] font-bold text-white", style: {
            background: r.labelColor
          }, children: r.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pb-2 pt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[12px] font-bold text-gray-900", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[10px] text-gray-400", children: r.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-0.5 text-[9px] text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
            " ",
            r.season
          ] })
        ] })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-2xl px-4 py-3.5", style: {
      background: "linear-gradient(135deg, #eef2ff 0%, #e8e0ff 50%, #dbeafe 100%)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[14px] font-bold text-indigo-900", children: "让 AI 为你生成专属旅行灵感" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[10px] text-indigo-400", children: "告诉我们你喜欢的风景、活动和节奏" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mr-1 flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-[20px] shadow-md", children: "🤖" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quiz", className: "pressable shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-[12px] font-bold text-white shadow-md transition active:scale-95", children: "去定制" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-4 mt-4 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-around rounded-2xl bg-white py-3 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
        cat: "nature"
      }, className: "flex items-center gap-1.5 text-[12px] font-semibold text-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-orange-500" }),
        "热门灵感"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
        cat: "outdoor"
      }, className: "flex items-center gap-1.5 text-[12px] font-semibold text-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4 text-gray-500" }),
        "小众秘境"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", className: "flex items-center gap-1.5 text-[12px] font-semibold text-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Snowflake, { className: "h-4 w-4 text-blue-500" }),
        "季节限定"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
export {
  InspirationMap as component
};
