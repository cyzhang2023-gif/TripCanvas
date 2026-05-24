import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Info } from "lucide-react";
import { SpotPreviewCard } from "./SpotPreviewCard";
import { useTripActions } from "@/lib/tripStore";
import type { Trip, Spot } from "@/lib/tripTypes";

type FlatSpot = Spot & { dayId: string; dayLabel: string };

type ImportPreviewProps = {
  trip: Trip;
};

function sourceLabel(trip: Trip): string {
  const kind = trip.source?.kind;
  if (kind === "link") return "来自链接导入";
  if (kind === "image") return "来自截图导入";
  if (kind === "video") return "来自视频导入";
  if (kind === "text") return "来自文本导入";
  return "智能解析结果";
}

function sourceIcon(trip: Trip): string {
  const title = trip.source?.title ?? "";
  if (title.includes("小红书")) return "📕";
  if (title.includes("TikTok") || title.includes("抖音")) return "🎵";
  if (title.includes("知乎")) return "💡";
  return "📋";
}

export function ImportPreview({ trip }: ImportPreviewProps) {
  const nav = useNavigate();
  const actions = useTripActions();

  // Flatten all spots across days
  const allSpots = useMemo<FlatSpot[]>(() => {
    return trip.days.flatMap((day) =>
      day.spots.map((spot) => ({
        ...spot,
        dayId: day.id,
        dayLabel: day.label,
      })),
    );
  }, [trip.days]);

  const [selected, setSelected] = useState<Set<string>>(() => new Set(allSpots.map((s) => s.id)));
  const [submitting, setSubmitting] = useState(false);

  const allSelected = selected.size === allSpots.length;
  const noneSelected = selected.size === 0;

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allSpots.map((s) => s.id)));
    }
  }, [allSelected, allSpots]);

  const toggleSpot = useCallback((spotId: string) => {
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
      // Delete unselected spots from the trip
      const toRemove = allSpots.filter((s) => !selected.has(s.id));
      for (const spot of toRemove) {
        await actions.deleteSpot(trip.id, spot.dayId, spot.id);
      }
      // Navigate to the trip
      nav({ to: "/trip", search: { id: trip.id, focus: "map" }, replace: true });
    } catch (err) {
      console.error("Failed to update trip:", err);
      // Even on error, navigate to trip - spots are still there
      nav({ to: "/trip", search: { id: trip.id, focus: "map" }, replace: true });
    }
  };

  const handleBack = () => {
    nav({ to: "/import" });
  };

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--gradient-soft)" }}>
      {/* Header */}
      <header className="relative flex items-center justify-center px-5 pb-2 pt-5">
        <button
          type="button"
          onClick={handleBack}
          className="pressable absolute left-5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold">导入预览</h1>
      </header>

      {/* Source attribution */}
      <div className="flex items-center justify-center gap-1.5 px-5 pb-1">
        <span className="text-sm">{sourceIcon(trip)}</span>
        <span className="text-xs text-gray-500">{sourceLabel(trip)}</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-500">共 {allSpots.length} 个地点</span>
      </div>

      {/* Warning banner */}
      <div className="mx-5 mt-3 flex items-start gap-2 rounded-xl bg-sky-50 px-3.5 py-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
        <p className="text-xs leading-relaxed text-sky-700">
          地点和行程可能会有出入，请你仔细核对
        </p>
      </div>

      {/* Select all toggle */}
      <div className="flex items-center justify-between px-5 pb-1 pt-4">
        <span className="text-sm font-medium text-gray-700">
          已选择 {selected.size} / {allSpots.length}
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="text-sm font-medium text-gray-500 active:text-gray-700"
        >
          {allSelected ? "取消全选" : "全选"}
        </button>
      </div>

      {/* Spot list */}
      <div className="flex-1 px-2 pb-32">
        <div className="space-y-0.5">
          {allSpots.map((spot, index) => (
            <SpotPreviewCard
              key={spot.id}
              spot={spot}
              selected={selected.has(spot.id)}
              onToggle={() => toggleSpot(spot.id)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-100 bg-white/90 px-5 pb-8 pt-3 backdrop-blur-xl">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleAddToTrip}
            disabled={noneSelected || submitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-semibold text-white shadow-md transition active:scale-[0.98] disabled:opacity-40"
          >
            {submitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : null}
            添加至行程{!noneSelected && ` (${selected.size})`}
          </button>
        </div>
      </div>
    </div>
  );
}
