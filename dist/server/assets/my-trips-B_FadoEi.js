import { r as reactExports, V as jsxRuntimeExports } from "./server-CIjysBVW.js";
import { L as Link } from "./router-AIpkPezt.js";
import { B as BottomNav } from "./BottomNav-gKN_j-G4.js";
import { e as useTripsQuery, a as useTripActions, c as coverUrl } from "./tripStore-Dc0SmsRM.js";
import { S as Search } from "./search-CrLvbJDF.js";
import { E as Ellipsis } from "./ellipsis-BlcePxd1.js";
import { C as CalendarDays } from "./calendar-days-pEt4IZCi.js";
import { H as Heart } from "./heart-Bant-PO8.js";
import { c as createLucideIcon } from "./createLucideIcon-DQdQFHPR.js";
import { T as Trash2 } from "./trash-2-BSzfOU9x.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-D2Ec-dK9.js";
import "node:events";
const __iconNode = [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
];
const RotateCw = createLucideIcon("rotate-cw", __iconNode);
function MyTrips() {
  const {
    data: trips = [],
    isLoading
  } = useTripsQuery();
  const [tab, setTab] = reactExports.useState("全部");
  const filtered = trips.filter((trip) => tab === "全部" ? true : tab === "收藏" ? trip.favorite : trip.status === "草稿");
  const countFor = (t) => trips.filter((trip) => t === "全部" ? true : t === "收藏" ? trip.favorite : trip.status === "草稿").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell pb-24", style: {
    background: "var(--gradient-soft)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-start justify-between px-4 pt-5 pb-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[18px] font-extrabold tracking-tight", children: "我的行程" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "每一次旅行，都是新的故事" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pt-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "pressable flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5 text-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "pressable flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-3.5 w-3.5 text-foreground" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mt-1.5 flex rounded-xl bg-card p-0.5 shadow-sm", children: ["全部", "收藏", "草稿"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(item), className: `pressable flex-1 rounded-lg py-1.5 text-[11px] font-semibold ${tab === item ? "text-primary-foreground shadow" : "text-muted-foreground"}`, style: tab === item ? {
      background: "var(--gradient-hero)"
    } : void 0, children: [
      item,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 text-[10px] opacity-80", children: countFor(item) })
    ] }, item)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 px-4 pt-2.5", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-xs text-muted-foreground", children: "正在加载行程..." }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "暂无行程" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/import", className: "pressable mt-3 inline-flex rounded-xl px-4 py-2 text-xs font-semibold text-primary-foreground", style: {
          background: "var(--gradient-hero)"
        }, children: "创建新行程" })
      ] }),
      filtered.map((trip) => /* @__PURE__ */ jsxRuntimeExports.jsx(TripCard, { trip }, trip.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
function TripCard({
  trip
}) {
  const actions = useTripActions();
  const statusStyle = trip.status === "进行中" ? "bg-violet-500/90" : trip.status === "已完成" ? "bg-gray-400/90" : "bg-amber-500/90";
  const totalSpots = trip.days.reduce((n, day) => n + day.spots.length, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "relative overflow-hidden rounded-[18px] shadow-[0_10px_26px_rgba(38,43,70,.10)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: trip.coverUrl || coverUrl(trip.cover), alt: trip.name, loading: "lazy", className: "absolute inset-0 h-full w-full object-cover" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/trip", search: {
      id: trip.id
    }, className: "pressable relative block px-3 pt-7 pb-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-[16px] font-extrabold text-white", style: {
            textShadow: "0 1px 6px rgba(0,0,0,0.4)"
          }, children: trip.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/65", children: trip.date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm ${statusStyle}`, children: trip.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-[10px] text-white/65", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
          trip.days.length,
          " 天 · ",
          totalSpots,
          " 个地点"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            void actions.toggleFavorite(trip.id);
          }, className: "pressable flex h-7 w-7 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm", "aria-label": "收藏", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-3.5 w-3.5 ${trip.favorite ? "fill-rose-400 text-rose-400" : "text-white/75"}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            void actions.regenerate(trip.id);
          }, className: "pressable flex h-7 w-7 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm", "aria-label": "重新生成", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-3.5 w-3.5 text-white/75" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (confirm(`删除 ${trip.name}?`)) void actions.deleteTrip(trip.id);
          }, className: "pressable flex h-7 w-7 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm", "aria-label": "删除", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 text-white/75" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  MyTrips as component
};
