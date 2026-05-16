import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Copy, Download, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { StatusBar } from "@/components/PhoneFrame";
import { coverUrl, useTripQuery, type Trip } from "@/lib/tripStore";

export const Route = createFileRoute("/share")({
  component: Share,
  validateSearch: z.object({ id: z.string().default("tokyo-5") }),
  head: () => ({ meta: [{ title: "分享行程 · Routey" }] }),
});

const templates = ["清新", "简约", "艺术", "手绘", "地图风"];
const platforms = ["微信", "朋友圈", "小红书", "Instagram", "更多"];

function Share() {
  const { id } = Route.useSearch();
  const { data: trip } = useTripQuery(id);
  const [template, setTemplate] = useState(templates[0]);
  const summary = useMemo(() => (trip ? buildSummary(trip) : ""), [trip]);

  const download = () => {
    if (!trip) return;
    const url = URL.createObjectURL(new Blob([summary], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${trip.name}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    if (!summary) return;
    if ("share" in navigator) {
      await navigator
        .share({ title: trip?.name ?? "Routey 行程", text: summary })
        .catch(() => undefined);
    } else {
      await navigator.clipboard?.writeText(summary);
    }
  };

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        行程不存在 ·{" "}
        <Link to="/my-trips" className="ml-1 text-primary">
          返回
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10" style={{ background: "var(--gradient-soft)" }}>
      <StatusBar />
      <header className="relative flex items-center justify-center px-6 pb-3 pt-2">
        <Link to="/trip" search={{ id: trip.id }} className="absolute left-6">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-semibold">分享行程</h1>
        <button onClick={download} className="absolute right-6" aria-label="下载">
          <Download className="h-5 w-5" />
        </button>
      </header>

      <div className="mx-5 mt-3 overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-glow)]">
        <div className="relative">
          <img
            src={trip.coverUrl || coverUrl(trip.cover)}
            alt={trip.name}
            className="h-72 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-black/40" />
          <div className="absolute inset-x-0 top-6 text-center text-foreground">
            <h2 className="mx-auto max-w-72 truncate text-3xl font-bold">{trip.name}</h2>
            <p className="mt-1 text-xs opacity-70">{trip.date}</p>
          </div>
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/88 p-3 text-xs text-foreground backdrop-blur">
            {trip.days.slice(0, 3).map((day) => (
              <p key={day.id} className="truncate">
                {day.label}: {day.route}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-md text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              R
            </span>
            Routey
          </span>
          <span className="text-xs text-muted-foreground">{template}模板</span>
        </div>
      </div>

      <section className="px-5 pt-6">
        <p className="text-sm font-semibold">选择模板</p>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {templates.map((item, index) => (
            <button key={item} onClick={() => setTemplate(item)} className="shrink-0 text-center">
              <div
                className={`h-20 w-16 rounded-xl ${item === template ? "ring-2 ring-primary" : ""} shadow-[var(--shadow-card)]`}
                style={{ background: templateGradient(index) }}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">{item}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <div className="grid grid-cols-5 gap-2">
          {platforms.map((platform) => (
            <button key={platform} onClick={share} className="flex flex-col items-center gap-1.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-[var(--shadow-card)]">
                {platform === "更多" ? (
                  <Send className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4 text-primary" />
                )}
              </span>
              <span className="text-xs text-muted-foreground">{platform}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function buildSummary(trip: Trip) {
  return [
    `${trip.name} (${trip.date})`,
    ...trip.days.map(
      (day) => `${day.label} ${day.route}: ${day.spots.map((spot) => spot.title).join(" -> ")}`,
    ),
    "Generated by Routey",
  ].join("\n");
}

function templateGradient(index: number) {
  return [
    "linear-gradient(135deg, oklch(0.52 0.18 250), oklch(0.42 0.16 255))",
    "linear-gradient(135deg, oklch(0.95 0.01 250), oklch(0.72 0.08 255))",
    "linear-gradient(135deg, oklch(0.48 0.14 260), oklch(0.38 0.12 255))",
    "linear-gradient(135deg, oklch(0.60 0.14 245), oklch(0.50 0.16 255))",
    "linear-gradient(135deg, oklch(0.45 0.16 255), oklch(0.55 0.12 250))",
  ][index];
}
