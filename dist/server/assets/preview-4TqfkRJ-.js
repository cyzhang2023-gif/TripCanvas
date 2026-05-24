import { V as jsxRuntimeExports, r as reactExports } from "./server-DSDkCfEf.js";
import { u as useNavigate, b as Route } from "./router-D-67bGNW.js";
import { a as useTripActions, u as useTripQuery } from "./tripStore-D1dKS6e8.js";
import { C as ChevronLeft } from "./chevron-left-DlV_M45D.js";
import { I as Info } from "./info-BpQMJRlW.js";
import { L as LoaderCircle } from "./loader-circle-B-OKNFZT.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-BeQ7_xaa.js";
import "node:events";
import "./createLucideIcon-BgI0Sl8-.js";
const categoryColors = {
  住宿: "text-blue-600",
  景点: "text-emerald-600",
  美食: "text-orange-600",
  购物: "text-pink-600",
  休闲: "text-violet-600"
};
function SpotPreviewCard({ spot, selected, onToggle, index }) {
  const categoryColor = categoryColors[spot.category ?? ""] ?? "text-gray-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onToggle,
      className: "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors duration-200 active:scale-[0.99]",
      style: {
        background: selected ? "rgba(219,234,254,0.45)" : "transparent",
        animation: `fadeIn 0.35s ease both`,
        animationDelay: `${index * 60}ms`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2.5 6L5 8.5L9.5 3.5", stroke: "white", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full border-2 border-gray-300" }) }),
        spot.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: spot.image,
            alt: spot.title,
            className: "h-16 w-16 shrink-0 rounded-xl object-cover",
            loading: "lazy"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl", children: spot.category === "美食" ? "🍜" : spot.category === "住宿" ? "🏨" : spot.category === "购物" ? "🛍" : "📍" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-gray-900", children: spot.title }),
          spot.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 line-clamp-1 text-xs text-gray-500", children: spot.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-1 text-xs", children: [
            spot.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${categoryColor}`, children: spot.category }),
            spot.category && spot.address && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300", children: "|" }),
            spot.address && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-gray-400", children: spot.address })
          ] })
        ] })
      ]
    }
  );
}
function sourceLabel(trip) {
  const kind = trip.source?.kind;
  if (kind === "link") return "来自链接导入";
  if (kind === "image") return "来自截图导入";
  if (kind === "video") return "来自视频导入";
  if (kind === "text") return "来自文本导入";
  return "智能解析结果";
}
function sourceIcon(trip) {
  const title = trip.source?.title ?? "";
  if (title.includes("小红书")) return "📕";
  if (title.includes("TikTok") || title.includes("抖音")) return "🎵";
  if (title.includes("知乎")) return "💡";
  return "📋";
}
function ImportPreview({ trip }) {
  const nav = useNavigate();
  const actions = useTripActions();
  const allSpots = reactExports.useMemo(() => {
    return trip.days.flatMap(
      (day) => day.spots.map((spot) => ({
        ...spot,
        dayId: day.id,
        dayLabel: day.label
      }))
    );
  }, [trip.days]);
  const [selected, setSelected] = reactExports.useState(() => new Set(allSpots.map((s) => s.id)));
  const [submitting, setSubmitting] = reactExports.useState(false);
  const allSelected = selected.size === allSpots.length;
  const noneSelected = selected.size === 0;
  const toggleAll = reactExports.useCallback(() => {
    if (allSelected) {
      setSelected(/* @__PURE__ */ new Set());
    } else {
      setSelected(new Set(allSpots.map((s) => s.id)));
    }
  }, [allSelected, allSpots]);
  const toggleSpot = reactExports.useCallback((spotId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(spotId)) next.delete(spotId);
      else next.add(spotId);
      return next;
    });
  }, []);
  const handleAddToTrip = async () => {
    if (noneSelected) return;
    setSubmitting(true);
    try {
      const toRemove = allSpots.filter((s) => !selected.has(s.id));
      for (const spot of toRemove) {
        await actions.deleteSpot(trip.id, spot.dayId, spot.id);
      }
      nav({ to: "/trip", search: { id: trip.id, focus: "map" }, replace: true });
    } catch (err) {
      console.error("Failed to update trip:", err);
      nav({ to: "/trip", search: { id: trip.id, focus: "map" }, replace: true });
    }
  };
  const handleBack = () => {
    nav({ to: "/import" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", style: { background: "var(--gradient-soft)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center justify-center px-5 pb-2 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleBack,
          className: "pressable absolute left-5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-semibold", children: "导入预览" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 px-5 pb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: sourceIcon(trip) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: sourceLabel(trip) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500", children: [
        "共 ",
        allSpots.length,
        " 个地点"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-5 mt-3 flex items-start gap-2 rounded-xl bg-sky-50 px-3.5 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "mt-0.5 h-4 w-4 shrink-0 text-sky-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-sky-700", children: "地点和行程可能会有出入，请你仔细核对" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pb-1 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-gray-700", children: [
        "已选择 ",
        selected.size,
        " / ",
        allSpots.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: toggleAll,
          className: "text-sm font-medium text-gray-500 active:text-gray-700",
          children: allSelected ? "取消全选" : "全选"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-2 pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: allSpots.map((spot, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      SpotPreviewCard,
      {
        spot,
        selected: selected.has(spot.id),
        onToggle: () => toggleSpot(spot.id),
        index
      },
      spot.id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-20 border-t border-gray-100 bg-white/90 px-5 pb-8 pt-3 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handleAddToTrip,
        disabled: noneSelected || submitting,
        className: "flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-semibold text-white shadow-md transition active:scale-[0.98] disabled:opacity-40",
        children: [
          submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" }) : null,
          "添加至行程",
          !noneSelected && ` (${selected.size})`
        ]
      }
    ) }) })
  ] });
}
function PreviewPage() {
  const nav = useNavigate();
  const {
    tripId
  } = Route.useSearch();
  const {
    data: trip,
    isLoading,
    isError
  } = useTripQuery(tripId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", style: {
      background: "var(--gradient-soft)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gray-400" }) });
  }
  if (isError || !trip) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center gap-4", style: {
      background: "var(--gradient-soft)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "无法加载行程数据" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => nav({
        to: "/import"
      }), className: "rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white", children: "返回导入" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ImportPreview, { trip });
}
export {
  PreviewPage as component
};
