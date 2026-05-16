import { r as reactExports, V as jsxRuntimeExports } from "./server-DUXkETns.js";
import { u as useNavigate, b as Route, L as Link } from "./router-n8CYDSHY.js";
import { d as useImportJob } from "./tripStore-CqeBepYS.js";
import { C as ChevronLeft } from "./chevron-left-BpQLlgPd.js";
import { R as Route$1 } from "./route-C-REQR1j.js";
import { L as Link2, F as FileText } from "./link-2-DqNgZBAN.js";
import { M as MapPin } from "./map-pin-DGH6F-pT.js";
import { C as Check } from "./check-Bgi7xqIH.js";
import { L as LoaderCircle } from "./loader-circle-Bb6Ocugh.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-DwDiR5s2.js";
import "node:events";
import "./createLucideIcon-2wozw8rg.js";
const cleanStepLabel = (label) => label.replace(/AI\s*智能解析/g, "结构化解析").replace(/AI\s*/g, "");
function Parsing() {
  const nav = useNavigate();
  const {
    jobId
  } = Route.useSearch();
  const {
    data: job,
    isError
  } = useImportJob(jobId);
  reactExports.useEffect(() => {
    if (job?.status === "done" && job.tripId) {
      const timer = setTimeout(() => nav({
        to: "/trip",
        search: {
          id: job.tripId,
          focus: "map"
        },
        replace: true
      }), 600);
      return () => clearTimeout(timer);
    }
  }, [job?.status, job?.tripId, nav]);
  const steps = job?.steps ?? ["等待导入内容", "提取地点与偏好", "合并相邻区域", "生成每日路线"].map((label, index) => ({
    label,
    state: index === 0 ? "active" : "pending"
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell pb-10", style: {
    background: "var(--gradient-soft)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center justify-center px-6 pb-3 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/import", className: "pressable absolute left-6 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold", children: "生成路线中" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 text-center text-sm text-muted-foreground", children: jobId ? "正在把攻略变成可执行行程" : "请先从导入页提交攻略内容" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto mt-10 h-64 w-64", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-ping rounded-full bg-primary/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-6 rounded-full border-2 border-dashed border-primary/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-12 rounded-full border-2 border-primary/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-1/4 flex items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-glow)]", style: {
        background: "var(--gradient-hero)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Route$1, { className: "h-12 w-12" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "absolute left-2 top-10 h-7 w-7 rounded-xl bg-card p-1.5 text-primary shadow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute right-2 top-6 h-7 w-7 rounded-xl bg-card p-1.5 text-orange-500 shadow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "absolute -bottom-1 right-6 h-7 w-7 rounded-xl bg-card p-1.5 text-blue-500 shadow" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-5 mt-10 rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: {
        width: `${job?.progress ?? 12}%`,
        background: "var(--gradient-hero)"
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-6 w-6 items-center justify-center rounded-full ${step.state === "done" ? "bg-emerald-500 text-white" : step.state === "active" ? "border-2 border-primary text-primary" : "border border-border text-muted-foreground"}`, children: step.state === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : step.state === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 animate-pulse rounded-full bg-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-muted-foreground/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm ${step.state === "done" ? "font-medium" : "text-muted-foreground"}`, children: cleanStepLabel(step.label) }),
        step.state === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-primary", children: "解析中" })
      ] }, step.label)) })
    ] }),
    isError || !jobId || job?.status === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-5 mt-6 space-y-2", children: [
      job?.error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-rose-500", children: job.error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center justify-center rounded-2xl bg-card py-3 text-sm font-semibold text-primary shadow-[var(--shadow-card)]", children: "返回重新导入" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
      "正在生成路线，请稍候..."
    ] })
  ] });
}
export {
  Parsing as component
};
