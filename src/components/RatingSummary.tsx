import { useState } from "react";
import { getRatingStats } from "@/lib/ratingStore";
import type { RouteRatingStats } from "@/lib/tripTypes";
import { StarRating } from "./StarRating";

export function RatingSummary({
  routeId,
  compact = false,
}: {
  routeId: string;
  compact?: boolean;
}) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const stats = getRatingStats(routeId);

  if (stats.totalRatings === 0) return null;

  const topTags = Object.entries(stats.tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  if (compact) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowBreakdown(true);
        }}
        className="flex items-center gap-1.5"
      >
        <StarRating value={stats.averageScore} size={12} gap={1} readonly />
        <span className="text-[10px] font-semibold text-amber-700">
          {stats.averageScore.toFixed(1)}
        </span>
        <span className="text-[9px] text-gray-400">
          ({stats.totalRatings})
        </span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowBreakdown(!showBreakdown);
        }}
        className="flex items-center gap-2"
      >
        <StarRating value={stats.averageScore} size={14} gap={2} readonly />
        <span className="text-[11px] font-bold text-amber-700">
          {stats.averageScore.toFixed(1)}
        </span>
        <span className="text-[10px] text-gray-400">
          {stats.totalRatings} 条评价
        </span>
        {topTags.length > 0 && (
          <div className="flex gap-1">
            {topTags.map(([tag]) => (
              <span
                key={tag}
                className="rounded-full bg-violet-50 px-1.5 py-px text-[8px] font-medium text-violet-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </button>

      {showBreakdown && (
        <RatingBreakdown stats={stats} onClose={() => setShowBreakdown(false)} />
      )}
    </>
  );
}

function RatingBreakdown({
  stats,
  onClose,
}: {
  stats: RouteRatingStats;
  onClose: () => void;
}) {
  const allTags = Object.entries(stats.tagCounts).sort(([, a], [, b]) => b - a);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "scaleIn 250ms ease-out" }}
      >
        <h3 className="text-center text-[16px] font-bold text-gray-900">
          评分详情
        </h3>

        <div className="mt-4 flex flex-col items-center">
          <span className="text-[36px] font-extrabold text-amber-600">
            {stats.averageScore.toFixed(1)}
          </span>
          <StarRating value={stats.averageScore} size={24} gap={4} readonly />
          <span className="mt-1 text-[12px] text-gray-400">
            {stats.totalRatings} 条评价
          </span>
        </div>

        {allTags.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-[12px] font-semibold text-gray-600">
              热门标签
            </p>
            <div className="flex flex-wrap gap-2">
              {allTags.map(([tag, count]) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700"
                >
                  {tag}
                  <span className="rounded-full bg-violet-200 px-1.5 py-px text-[9px] font-bold text-violet-800">
                    {count}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-gray-100 py-2.5 text-[13px] font-semibold text-gray-600 active:bg-gray-200"
        >
          关闭
        </button>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
