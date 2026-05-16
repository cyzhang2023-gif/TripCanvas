import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, FileText, Link2, Loader2, MapPin, Route as RouteIcon } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";
import { useImportJob } from "@/lib/tripStore";

export const Route = createFileRoute("/parsing")({
  component: Parsing,
  validateSearch: z.object({ jobId: z.string().optional() }),
  head: () => ({ meta: [{ title: "生成路线中 · Routey" }] }),
});

const cleanStepLabel = (label: string) =>
  label.replace(/AI\s*智能解析/g, "结构化解析").replace(/AI\s*/g, "");

function Parsing() {
  const nav = useNavigate();
  const { jobId } = Route.useSearch();
  const { data: job, isError } = useImportJob(jobId);

  useEffect(() => {
    if (job?.status === "done" && job.tripId) {
      const timer = setTimeout(
        () => nav({ to: "/trip", search: { id: job.tripId, focus: "map" }, replace: true }),
        600,
      );
      return () => clearTimeout(timer);
    }
  }, [job?.status, job?.tripId, nav]);

  const steps =
    job?.steps ??
    ["等待导入内容", "提取地点与偏好", "合并相邻区域", "生成每日路线"].map((label, index) => ({
      label,
      state: index === 0 ? ("active" as const) : ("pending" as const),
    }));

  return (
    <div className="app-shell pb-10" style={{ background: "var(--gradient-soft)" }}>
      <header className="relative flex items-center justify-center px-6 pb-3 pt-5">
        <Link to="/import" className="pressable absolute left-6 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-semibold">生成路线中</h1>
      </header>
      <p className="px-6 text-center text-sm text-muted-foreground">
        {jobId ? "正在把攻略变成可执行行程" : "请先从导入页提交攻略内容"}
      </p>

      <div className="relative mx-auto mt-10 h-64 w-64">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
        <div className="absolute inset-6 rounded-full border-2 border-dashed border-primary/30" />
        <div className="absolute inset-12 rounded-full border-2 border-primary/20" />
        <div
          className="absolute inset-1/4 flex items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-glow)]"
          style={{ background: "var(--gradient-hero)" }}
        >
          <RouteIcon className="h-12 w-12" />
        </div>
        <Link2 className="absolute left-2 top-10 h-7 w-7 rounded-xl bg-card p-1.5 text-primary shadow" />
        <MapPin className="absolute right-2 top-6 h-7 w-7 rounded-xl bg-card p-1.5 text-orange-500 shadow" />
        <FileText className="absolute -bottom-1 right-6 h-7 w-7 rounded-xl bg-card p-1.5 text-blue-500 shadow" />
      </div>

      <div className="mx-5 mt-10 rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${job?.progress ?? 12}%`, background: "var(--gradient-hero)" }}
          />
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  step.state === "done"
                    ? "bg-emerald-500 text-white"
                    : step.state === "active"
                      ? "border-2 border-primary text-primary"
                      : "border border-border text-muted-foreground"
                }`}
              >
                {step.state === "done" ? (
                  <Check className="h-3.5 w-3.5" />
                ) : step.state === "active" ? (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                )}
              </span>
              <p
                className={`text-sm ${step.state === "done" ? "font-medium" : "text-muted-foreground"}`}
              >
                {cleanStepLabel(step.label)}
              </p>
              {step.state === "active" && (
                <span className="ml-auto text-xs text-primary">解析中</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {isError || !jobId || job?.status === "error" ? (
        <div className="mx-5 mt-6 space-y-2">
          {job?.error && (
            <p className="text-center text-xs text-rose-500">{job.error}</p>
          )}
          <Link
            to="/"
            className="flex items-center justify-center rounded-2xl bg-card py-3 text-sm font-semibold text-primary shadow-[var(--shadow-card)]"
          >
            返回重新导入
          </Link>
        </div>
      ) : (
        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          正在生成路线，请稍候...
        </p>
      )}
    </div>
  );
}
