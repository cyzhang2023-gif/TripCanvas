import { useMemo } from "react";
import { getCheckinStatsWithTotal } from "@/lib/checkinStore";
import type { Day } from "@/lib/tripTypes";

interface TripProgressBarProps {
  tripId: string;
  days: Day[];
  /** Incremented externally to force re-render when check-ins change */
  refreshKey?: number;
}

export function TripProgressBar({ tripId, days, refreshKey }: TripProgressBarProps) {
  const totalSpots = useMemo(
    () => days.reduce((n, d) => n + d.spots.length, 0),
    [days],
  );

  const stats = useMemo(
    () => getCheckinStatsWithTotal(tripId, totalSpots),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tripId, totalSpots, refreshKey],
  );

  if (totalSpots === 0) return null;

  const isComplete = stats.checked >= stats.total && stats.total > 0;

  return (
    <div className="mx-3 mb-2 rounded-xl bg-white px-3.5 py-2.5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {isComplete ? (
            <span className="font-bold text-emerald-600">
              全部打卡完成!
            </span>
          ) : (
            <>
              已打卡{" "}
              <span className="font-bold text-emerald-600">{stats.checked}</span>
              /{stats.total} 个景点
            </>
          )}
        </p>
        <span className="text-xs font-bold text-emerald-600">
          {stats.percentage}%
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500 ease-out"
          style={{
            width: `${stats.percentage}%`,
            animation: stats.checked > 0 ? "progressShimmer 2s ease-in-out infinite" : undefined,
            backgroundSize: "200% 100%",
          }}
        />
      </div>
      <style>{`
        @keyframes progressShimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }
      `}</style>
    </div>
  );
}
