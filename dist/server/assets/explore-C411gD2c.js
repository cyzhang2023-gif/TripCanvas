import { r as reactExports, V as jsxRuntimeExports } from "./server-DFlOycZ2.js";
import { c as Route, u as useNavigate } from "./router-BDww2PIn.js";
import { B as BottomNav } from "./BottomNav-Dh8qr3Dn.js";
import { a as useTripActions, f as useExploreRoutes } from "./tripStore-TFpuedM-.js";
import { c as createLucideIcon } from "./createLucideIcon-CDnRq0Yy.js";
import { S as Star } from "./star-Bz9W6VlQ.js";
import { H as Heart } from "./heart-DaZq5N6u.js";
import { M as Mountain } from "./mountain-CWKJJ4EK.js";
import { C as ChevronLeft } from "./chevron-left-D6qSMu61.js";
import { S as Share2 } from "./share-2-DbMA7yta.js";
import { E as Ellipsis } from "./ellipsis-_MiYXLtw.js";
import { C as Copy } from "./copy-B_jmkRP-.js";
import { M as MapPin } from "./map-pin-B7sVjqgm.js";
import { C as Check } from "./check-C1ShzKzC.js";
import { C as CalendarDays } from "./calendar-days-Czof-4EJ.js";
import { L as LoaderCircle } from "./loader-circle-ItRPxMeL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-C1pEbzxG.js";
import "node:events";
const __iconNode$5 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$5);
const __iconNode$4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
];
const Footprints = createLucideIcon("footprints", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }]
];
const UsersRound = createLucideIcon("users-round", __iconNode);
const unsplash = (id, w = 600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;
const heroImages = {
  美国: unsplash("photo-1500916434205-0c77489c6cf7", 800),
  日本: unsplash("photo-1490806843957-31f4c9a91c65", 800),
  韩国: unsplash("photo-1534274988757-a28bf1a57c17", 800),
  泰国: unsplash("photo-1508009603885-50cf7c579365", 800),
  法国: unsplash("photo-1502602898657-3e91760cbb34", 800),
  菲律宾: unsplash("photo-1507525428034-b723cf961d3e", 800)
};
const categories = [{
  key: "hot",
  label: "热门推荐",
  icon: Flame,
  color: "#5b45f3",
  matcher: () => true
}, {
  key: "classic",
  label: "经典必去",
  icon: Star,
  color: "#2e8cf0",
  matcher: (r) => r.likes >= 7e3 || r.tags.some((t) => ["经典", "都市"].includes(t))
}, {
  key: "family",
  label: "亲子家庭",
  icon: UsersRound,
  color: "#5bd36b",
  matcher: (r) => r.tags.some((t) => ["博物馆", "国家公园", "自然"].includes(t))
}, {
  key: "couple",
  label: "情侣浪漫",
  icon: Heart,
  color: "#ff6681",
  matcher: (r) => r.tags.some((t) => ["海岸", "海滩", "浪漫"].includes(t))
}, {
  key: "nature",
  label: "自然风光",
  icon: Mountain,
  color: "#5bd8a4",
  matcher: (r) => r.tags.some((t) => ["自然", "国家公园", "海岸", "海滩", "火山"].includes(t))
}, {
  key: "city",
  label: "城市",
  icon: LayoutGrid,
  color: "#22242c",
  matcher: (r) => r.tags.some((t) => ["都市", "博物馆", "百老汇", "好莱坞"].includes(t))
}];
const cityOptions = ["全部城市", "纽约", "加州", "洛杉矶", "黄石", "夏威夷"];
const dayOptions = ["天数", "3天", "5天", "7天"];
const modeOptions = ["出行方式", "自驾", "都市", "自然", "海滩"];
const budgetOptions = ["预算", "舒适", "高品质"];
const sortOptions = ["综合排序", "热度优先", "天数从短到长"];
const localGuides = [{
  name: "纽约本地人",
  handle: "@NYC小王",
  avatar: unsplash("photo-1500648767791-00dcc994a43e", 120),
  tint: "#f1ecff"
}, {
  name: "加州玩家",
  handle: "@加州RoadTrip",
  avatar: unsplash("photo-1506794778202-cad84cf45f1d", 120),
  tint: "#edf4ff"
}, {
  name: "LA生活家",
  handle: "@LA生活日记",
  avatar: unsplash("photo-1494790108377-be9c29b29330", 120),
  tint: "#fff3e9"
}, {
  name: "摄影爱好者",
  handle: "@TravelLens",
  avatar: unsplash("photo-1527980965255-d3b416303d12", 120),
  tint: "#fff0f3"
}];
function cycle(opts, cur, set) {
  set(opts[(opts.indexOf(cur) + 1) % opts.length]);
}
function fmtLikes(n) {
  return n >= 1e3 ? `${(n / 1e3).toFixed(1)}k` : `${n}`;
}
function ExplorePage() {
  const {
    dest
  } = Route.useSearch();
  const nav = useNavigate();
  const actions = useTripActions();
  const {
    data: routes = [],
    isLoading
  } = useExploreRoutes(dest);
  const [cat, setCat] = reactExports.useState("hot");
  const [city, setCity] = reactExports.useState("全部城市");
  const [days, setDays] = reactExports.useState("天数");
  const [mode, setMode] = reactExports.useState("出行方式");
  const [budget, setBudget] = reactExports.useState("预算");
  const [sort, setSort] = reactExports.useState("综合排序");
  const [addingId, setAddingId] = reactExports.useState("");
  const [addedId, setAddedId] = reactExports.useState("");
  const [toast, setToast] = reactExports.useState("");
  const [showMenu, setShowMenu] = reactExports.useState(false);
  const visible = reactExports.useMemo(() => {
    const active = categories.find((c) => c.key === cat) ?? categories[0];
    const filtered = routes.filter((r) => {
      if (!active.matcher(r)) return false;
      if (city !== "全部城市" && !r.title.includes(city) && !r.tags.includes(city)) return false;
      if (days !== "天数" && `${r.days}天` !== days) return false;
      if (mode !== "出行方式" && !r.tags.includes(mode) && !r.title.includes(mode)) return false;
      return true;
    });
    const list = [...filtered.length ? filtered : routes];
    if (sort === "热度优先") list.sort((a, b) => b.likes - a.likes);
    if (sort === "天数从短到长") list.sort((a, b) => a.days - b.days);
    return list;
  }, [cat, city, days, mode, routes, sort]);
  const heroImg = heroImages[dest] ?? routes[0]?.cover ?? heroImages["日本"];
  const openRoute = async (route) => {
    setAddingId(route.id);
    try {
      const res = await actions.addExploreRoute(route.id);
      if ("aiJobId" in res) nav({
        to: "/parsing",
        search: {
          jobId: res.aiJobId
        }
      });
      else {
        setAddedId(route.id);
        nav({
          to: "/trip",
          search: {
            id: res.id
          }
        });
      }
    } catch (err) {
      setToast(err instanceof Error ? err.message : "路线打开失败");
    } finally {
      setAddingId("");
    }
  };
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({
        title: `${dest} · 热门路线`,
        url: location.href
      });
      else {
        await navigator.clipboard?.writeText(location.href);
        setToast("链接已复制");
      }
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "app-shell pb-[94px] text-[#1d2029]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", style: {
      height: 220
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "", className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/55" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex h-full flex-col px-4 pt-5 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => window.history.length > 1 ? window.history.back() : nav({
            to: "/"
          }), className: "pressable flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#20232c] shadow-sm backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: share, className: "pressable flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#20232c] shadow-sm backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5", strokeWidth: 2.5 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowMenu(!showMenu), className: "pressable flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#20232c] shadow-sm backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4", strokeWidth: 2.5 }) }),
            showMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-10 w-28 overflow-hidden rounded-xl bg-white text-[11px] font-semibold text-[#242735] shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
                navigator.clipboard?.writeText(location.href);
                setToast("链接已复制");
                setShowMenu(false);
              }, className: "pressable flex w-full items-center gap-1.5 px-3 py-2 text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }),
                "复制链接"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => nav({
                to: "/destinations"
              }), className: "pressable flex w-full items-center gap-1.5 px-3 py-2 text-left text-[#6b6f7c]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                "全部城市"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "flex items-center gap-1.5 text-[20px] font-extrabold leading-tight", children: [
            dest,
            " · 热门路线",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-[#ff7a45]", fill: "#ff7a45" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-white/85", children: "官方来源核验 · 精品路线覆盖餐厅、酒店、购物和休闲" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/85", children: "21.3万人收藏" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-1.5", children: localGuides.slice(0, 4).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: g.avatar, alt: "", className: "h-5 w-5 rounded-full border-[1.5px] border-white object-cover" }, g.handle)) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative z-10 -mt-4 rounded-t-[24px] bg-white px-3 pt-4 shadow-[0_-14px_32px_rgba(22,28,45,.08)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start overflow-x-auto scrollbar-none", children: categories.map(({
        key,
        label,
        icon: Icon,
        color
      }) => {
        const active = cat === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setCat(key), className: `pressable relative flex shrink-0 flex-1 flex-col items-center gap-1 pb-2.5 ${key === "city" ? "border-l border-gray-100" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]", color, fill: key === "couple" ? color : "none", strokeWidth: 2.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `whitespace-nowrap text-[10px] leading-none ${active ? "font-bold text-[#262936]" : "font-medium text-[#6f7480]"}`, children: label }),
          key === "city" && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute bottom-2 right-0 h-3 w-3 text-[#22242c]" }),
          active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 h-[3px] w-5 rounded-full bg-[#5b45f3]" })
        ] }, key);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { label: city, active: city !== "全部城市", onClick: () => cycle(cityOptions, city, setCity) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { label: days, active: days !== "天数", onClick: () => cycle(dayOptions, days, setDays) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { label: mode, active: mode !== "出行方式", onClick: () => cycle(modeOptions, mode, setMode) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { label: budget, active: budget !== "预算", onClick: () => cycle(budgetOptions, budget, setBudget) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => cycle(sortOptions, sort, setSort), className: "pressable ml-auto flex shrink-0 items-center gap-0.5 rounded-full px-2 py-1 text-[10px] font-semibold text-[#353947]", children: [
          sort,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2.5", children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, {}),
        !isLoading && visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-[#f8f8fb] py-6 text-center text-[11px] text-[#777c89]", children: "暂无已核验精品路线，换个筛选试试" }),
        visible.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RouteCard, { route: r, rank: i + 1, adding: addingId === r.id, added: addedId === r.id, onOpen: () => void openRoute(r) }, r.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-1.5 text-[14px] font-bold text-[#1d2029]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-[#6b56ff]", fill: "#6b56ff" }),
          " 本地人推荐"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-2 overflow-x-auto scrollbar-none", children: localGuides.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSort("热度优先"), className: "pressable flex min-w-[120px] items-center gap-2 rounded-xl px-2.5 py-2 text-left shadow-sm", style: {
          backgroundColor: g.tint
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: g.avatar, alt: "", className: "h-8 w-8 rounded-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#5b45f3] p-[1px] text-white" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[10px] font-bold text-[#252834]", children: g.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[9px] text-[#5f6470]", children: g.handle })
          ] })
        ] }, g.handle)) })
      ] })
    ] }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#20232c] px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg", children: toast }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { variant: "china" })
  ] });
}
function Pill({
  label,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: `pressable flex shrink-0 items-center gap-0.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none ${active ? "border-[#6b56ff] bg-[#f4f1ff] text-[#5b45f3]" : "border-transparent bg-[#f5f5f8] text-[#313542]"}`, children: [
    label,
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
  ] });
}
function RouteCard({
  route,
  rank,
  adding,
  added,
  onOpen
}) {
  const sub = route.sourceVerified ? `${route.sourceName ?? route.source} · 官方来源` : "待人工核验";
  const includes = route.includes?.length ? route.includes : ["景点", "美食", "住宿", "购物", "休闲"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "grid grid-cols-[30%_1fr] gap-2 rounded-[16px] bg-white pr-1 shadow-[0_8px_24px_rgba(38,43,70,.08)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[104px] overflow-hidden rounded-[16px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: route.cover, alt: "", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#5b45f3] shadow-sm", children: rank })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-0 py-1.5 pr-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1 pr-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-[13px] font-bold leading-tight text-[#1e212b]", children: route.title }),
        rank === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded bg-[#f6f1ff] px-1 py-px text-[8px] font-bold text-[#6b56ff]", children: "热门" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-1 top-1.5 flex items-center gap-0.5 text-[10px] text-[#555b67]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5 text-[#ff6b8d]" }),
        " ",
        fmtLikes(route.likes)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[10px] text-[#656a75]", children: sub }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-2", children: route.tags.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-[#4f57a6]", children: t }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-1 overflow-hidden", children: includes.slice(0, 5).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-[#f3f1ff] px-1.5 py-px text-[8px] font-bold text-[#6554e8]", children: item }, item)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[9px] text-[#4f5561]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
            " ",
            route.days,
            "天",
            Math.max(route.days - 1, 0),
            "晚"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            " ",
            route.spots,
            "个地点"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Footprints, { className: "h-3 w-3" }),
            " ",
            Math.max(1, Math.round(route.spots * 0.08)),
            ".0w步"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onOpen, disabled: adding, className: "pressable flex h-[26px] items-center justify-center rounded-full bg-gradient-to-r from-[#735cff] to-[#5b45f3] px-3 text-[10px] font-bold text-white shadow-[0_8px_18px_rgba(91,69,243,.22)] disabled:opacity-70", children: adding ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : added ? "已加入" : "查看详情" })
      ] })
    ] })
  ] });
}
function Skeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid animate-pulse grid-cols-[30%_1fr] gap-2 rounded-xl bg-white pr-1 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[104px] rounded-xl bg-[#eef0f6]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 py-3 pr-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-3/4 rounded-full bg-[#eef0f6]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full rounded-full bg-[#eef0f6]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 rounded-full bg-[#eef0f6]" })
    ] })
  ] }, i)) });
}
export {
  ExplorePage as component
};
