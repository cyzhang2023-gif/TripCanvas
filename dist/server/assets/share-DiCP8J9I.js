import { r as reactExports, V as jsxRuntimeExports } from "./server-DcVOWMmA.js";
import { a as Route, L as Link } from "./router-T9rqgerR.js";
import { S as StatusBar } from "./PhoneFrame-Bxjxoz6b.js";
import { u as useTripQuery, c as coverUrl } from "./tripStore-cOcDTjlB.js";
import { C as ChevronLeft } from "./chevron-left-DDohO4JV.js";
import { c as createLucideIcon } from "./createLucideIcon-CMPbjueh.js";
import { C as Copy } from "./copy-CUd9fntd.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-BkDCkh-K.js";
import "node:events";
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const templates = ["清新", "简约", "艺术", "手绘", "地图风"];
const platforms = ["微信", "朋友圈", "小红书", "Instagram", "更多"];
function Share() {
  const {
    id
  } = Route.useSearch();
  const {
    data: trip
  } = useTripQuery(id);
  const [template, setTemplate] = reactExports.useState(templates[0]);
  const summary = reactExports.useMemo(() => trip ? buildSummary(trip) : "", [trip]);
  const download = () => {
    if (!trip) return;
    const url = URL.createObjectURL(new Blob([summary], {
      type: "text/plain;charset=utf-8"
    }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${trip.name}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const share = async () => {
    if (!summary) return;
    if ("share" in navigator) {
      await navigator.share({
        title: trip?.name ?? "Routey 行程",
        text: summary
      }).catch(() => void 0);
    } else {
      await navigator.clipboard?.writeText(summary);
    }
  };
  if (!trip) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen items-center justify-center text-sm text-muted-foreground", children: [
      "行程不存在 ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/my-trips", className: "ml-1 text-primary", children: "返回" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen pb-10", style: {
    background: "var(--gradient-soft)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center justify-center px-6 pb-3 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trip", search: {
        id: trip.id
      }, className: "absolute left-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold", children: "分享行程" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: download, className: "absolute right-6", "aria-label": "下载", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-5 mt-3 overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-glow)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: trip.coverUrl || coverUrl(trip.cover), alt: trip.name, className: "h-72 w-full object-cover", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-black/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 top-6 text-center text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mx-auto max-w-72 truncate text-3xl font-bold", children: trip.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs opacity-70", children: trip.date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-5 bottom-5 rounded-2xl bg-white/88 p-3 text-xs text-foreground backdrop-blur", children: trip.days.slice(0, 3).map((day) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate", children: [
          day.label,
          ": ",
          day.route
        ] }, day.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm font-bold text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-md text-white", style: {
            background: "var(--gradient-hero)"
          }, children: "R" }),
          "Routey"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          template,
          "模板"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "选择模板" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex gap-3 overflow-x-auto pb-2", children: templates.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTemplate(item), className: "shrink-0 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-20 w-16 rounded-xl ${item === template ? "ring-2 ring-primary" : ""} shadow-[var(--shadow-card)]`, style: {
          background: templateGradient(index)
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground", children: item })
      ] }, item)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: platforms.map((platform) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: share, className: "flex flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-[var(--shadow-card)]", children: platform === "更多" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: platform })
    ] }, platform)) }) })
  ] });
}
function buildSummary(trip) {
  return [`${trip.name} (${trip.date})`, ...trip.days.map((day) => `${day.label} ${day.route}: ${day.spots.map((spot) => spot.title).join(" -> ")}`), "Generated by Routey"].join("\n");
}
function templateGradient(index) {
  return ["linear-gradient(135deg, oklch(0.52 0.18 250), oklch(0.42 0.16 255))", "linear-gradient(135deg, oklch(0.95 0.01 250), oklch(0.72 0.08 255))", "linear-gradient(135deg, oklch(0.48 0.14 260), oklch(0.38 0.12 255))", "linear-gradient(135deg, oklch(0.60 0.14 245), oklch(0.50 0.16 255))", "linear-gradient(135deg, oklch(0.45 0.16 255), oklch(0.55 0.12 250))"][index];
}
export {
  Share as component
};
