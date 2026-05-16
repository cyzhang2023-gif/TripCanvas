import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, FileText, Image as ImgIcon, Link2, Loader2, Youtube } from "lucide-react";
import { useState } from "react";
import { StatusBar } from "@/components/PhoneFrame";
import { useTripActions, type SourceKind } from "@/lib/tripStore";

export const Route = createFileRoute("/import")({
  component: ImportPage,
  head: () => ({ meta: [{ title: "导入攻略 · Routey" }] }),
});

const sources: Array<{
  kind: SourceKind;
  icon: typeof Link2;
  title: string;
  desc: string;
  color: string;
}> = [
  {
    kind: "link",
    icon: Link2,
    title: "粘贴链接",
    desc: "小红书、TikTok、知乎攻略",
    color: "oklch(0.42 0.16 255)",
  },
  {
    kind: "image",
    icon: ImgIcon,
    title: "上传截图",
    desc: "从图片文件名和补充说明识别",
    color: "oklch(0.48 0.14 260)",
  },
  {
    kind: "text",
    icon: FileText,
    title: "导入文本",
    desc: "复制粘贴完整攻略内容",
    color: "oklch(0.52 0.18 250)",
  },
  {
    kind: "video",
    icon: Youtube,
    title: "导入视频链接",
    desc: "短视频灵感一键变行程",
    color: "oklch(0.58 0.12 245)",
  },
];

function placeholder(kind: SourceKind) {
  return {
    link: "https://example.com/tokyo-5-days",
    image: "补充说明：东京 5 天，想去新宿、涩谷、浅草",
    text: "东京5日游：新宿御苑、涩谷、明治神宫、浅草寺、上野公园、银座...",
    video: "https://video.example.com/seoul-food-trip",
  }[kind];
}

function ImportPage() {
  const nav = useNavigate();
  const actions = useTripActions();
  const [kind, setKind] = useState<SourceKind>("link");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    const body = [content.trim(), fileName && `截图文件：${fileName}`].filter(Boolean).join("\n");
    if (body.length < 2) {
      setError(kind === "image" ? "请上传截图或补充一句目的地" : "请先填入攻略内容");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const job = await actions.createImport({ kind, content: body });
      nav({ to: "/parsing", search: { jobId: job.id } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "导入失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-8" style={{ background: "var(--gradient-soft)" }}>
      <StatusBar />
      <header className="relative flex items-center justify-center px-5 pb-2 pt-1">
        <Link to="/" className="absolute left-5">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold">导入攻略</h1>
      </header>

      <main className="px-5">
        <p className="text-center text-xs text-muted-foreground">
          攻略、截图和灵感都汇进同一条路线
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {sources.map(({ kind: itemKind, icon: Icon, title, desc, color }) => {
            const active = itemKind === kind;
            return (
              <button
                key={itemKind}
                onClick={() => {
                  setKind(itemKind);
                  setError("");
                }}
                className={`rounded-xl bg-card p-3 text-left shadow-[var(--shadow-card)] transition active:scale-[0.98] ${
                  active ? "ring-2 ring-primary" : ""
                }`}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: `color-mix(in oklab, ${color} 14%, white)` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                </span>
                <span className="mt-2 block text-sm font-semibold">{title}</span>
                <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                  {desc}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl bg-card p-3.5 shadow-[var(--shadow-card)]">
          {kind === "image" && (
            <label className="mb-3 flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-primary/40 px-3 py-3 text-sm text-primary">
              <span className="truncate">{fileName || "选择截图文件"}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
            </label>
          )}

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={placeholder(kind)}
            className="min-h-28 w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
          />

          {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}

          <button
            onClick={submit}
            disabled={submitting}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] disabled:opacity-60"
            style={{ background: "var(--gradient-hero)" }}
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            开始解析
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">下一站从这里开始</p>
      </main>
    </div>
  );
}
