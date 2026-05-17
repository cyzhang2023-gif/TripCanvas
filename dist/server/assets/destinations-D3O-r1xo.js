import { r as reactExports, V as jsxRuntimeExports } from "./server-Bmd9Y2Uz.js";
import { L as Link } from "./router-D8tPg44T.js";
import { B as BottomNav } from "./BottomNav-BgqiKBqP.js";
import { h as useDestinations } from "./tripStore-cMDVB5jQ.js";
import { S as Search } from "./search-CpTuTDLZ.js";
import { B as Bell, A as ArrowRight } from "./bell-DnoYHeJE.js";
import { G as Globe } from "./globe-BbB3_KRV.js";
import { L as LoaderCircle } from "./loader-circle-8tABeSus.js";
import { C as ChevronRight } from "./chevron-right-03cVIg3j.js";
import { M as MapPin } from "./map-pin-DgcoXswc.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-B84YN9ZP.js";
import "node:events";
import "./createLucideIcon-DK2DcyUo.js";
const regionConfig = {
  中国: {
    label: "热门目的地",
    layout: "hero"
  },
  东亚: {
    label: "亚洲精选",
    layout: "dual"
  },
  东南亚: {
    label: "东南亚热选",
    layout: "grid4"
  },
  欧洲: {
    label: "欧洲精选",
    layout: "grid4"
  },
  北美: {
    label: "北美精选",
    layout: "dual"
  },
  南美: {
    label: "南美精选",
    layout: "dual"
  },
  大洋洲: {
    label: "大洋洲精选",
    layout: "dual"
  },
  "非洲与中东": {
    label: "非洲与中东",
    layout: "dual"
  }
};
function Destinations() {
  const {
    data: groups = [],
    isLoading
  } = useDestinations();
  const [search, setSearch] = reactExports.useState("");
  const [heroIdx, setHeroIdx] = reactExports.useState(0);
  const filtered = search.trim() ? groups.map((g) => ({
    ...g,
    destinations: g.destinations.filter((d) => d.name.toLowerCase().includes(search.trim().toLowerCase()))
  })).filter((g) => g.destinations.length > 0) : groups;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-4 pt-[env(safe-area-inset-top,44px)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "grid place-items-center h-8 w-8 rounded-full bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5 text-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "grid place-items-center h-8 w-8 rounded-full bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5 text-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0.5 right-1 h-[6px] w-[6px] rounded-full bg-rose-500 ring-[1.5px] ring-background" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2.5 text-[20px] font-extrabold tracking-tight", children: "探索世界的美好" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-[2px]", children: "发现热门目的地，开启下一段旅程" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mt-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 h-10 rounded-xl bg-card px-3 shadow-sm border border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "搜索国家、城市或旅行灵感", className: "min-w-0 flex-1 bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none" })
    ] }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-3 space-y-4 px-4 pb-4", children: filtered.map((group) => {
      const cfg = regionConfig[group.region] ?? {
        label: group.region,
        layout: "dual"
      };
      const total = group.destinations.reduce((n, d) => n + d.routes, 0);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-1.5 text-[14px] font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[10px] w-[3px] rounded-full bg-primary" }),
            cfg.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center text-[10px] text-muted-foreground font-medium", children: [
            "全部 ",
            total,
            "+ ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
          ] })
        ] }),
        cfg.layout === "hero" && group.destinations.length > 0 && (() => {
          const d = group.destinations[heroIdx % group.destinations.length];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl h-[160px] shadow-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.cover, alt: "", className: "absolute inset-0 h-full w-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2.5 right-2.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-[3px]", children: [
                "全部 ",
                d.routes,
                "+"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[24px] font-extrabold text-white drop-shadow-md leading-none", children: d.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-0.5 text-white/80 text-[10px] mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2.5 w-2.5" }),
                  d.routes,
                  "条路线"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
                  dest: d.name
                }, className: "mt-2 inline-flex items-center gap-1 rounded-full bg-primary text-white text-[10px] font-semibold px-3 py-1 shadow", children: [
                  "探索",
                  d.name,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-2.5 w-2.5" })
                ] })
              ] })
            ] }),
            group.destinations.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1 mt-2", children: group.destinations.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setHeroIdx(i), className: `rounded-full transition-all ${i === heroIdx % group.destinations.length ? "h-[6px] w-4 bg-primary" : "h-[6px] w-[6px] bg-border"}` }, i)) })
          ] });
        })(),
        cfg.layout === "dual" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: group.destinations.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
          dest: d.name
        }, className: "relative overflow-hidden rounded-xl h-[96px] shadow-sm group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.cover, alt: "", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform group-active:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-bold text-white drop-shadow-md leading-none", children: d.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-[2px] text-white/75 text-[9px] mt-[3px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-2 w-2" }),
              d.routes,
              "条路线"
            ] })
          ] })
        ] }, d.name)) }),
        cfg.layout === "grid4" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: group.destinations.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
          dest: d.name
        }, className: "relative overflow-hidden rounded-lg h-[80px] shadow-sm group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.cover, alt: "", loading: "lazy", className: "absolute inset-0 h-full w-full object-cover transition-transform group-active:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1.5 left-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-white drop-shadow-sm leading-none", children: d.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-[1px] text-white/70 text-[7px] mt-[2px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-[7px] w-[7px]" }),
              d.routes,
              "条路线"
            ] })
          ] })
        ] }, d.name)) })
      ] }, group.region);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
export {
  Destinations as component
};
