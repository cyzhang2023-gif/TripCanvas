import type { Spot } from "@/lib/tripTypes";

const categoryColors: Record<string, string> = {
  住宿: "text-blue-600",
  景点: "text-emerald-600",
  美食: "text-orange-600",
  购物: "text-pink-600",
  休闲: "text-[#d4532e]",
};

type SpotPreviewCardProps = {
  spot: Spot;
  selected: boolean;
  onToggle: () => void;
  index: number;
};

export function SpotPreviewCard({ spot, selected, onToggle, index }: SpotPreviewCardProps) {
  const categoryColor = categoryColors[spot.category ?? ""] ?? "text-gray-500";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors duration-200 active:scale-[0.99]"
      style={{
        background: selected ? "rgba(219,234,254,0.45)" : "transparent",
        animation: `fadeIn 0.35s ease both`,
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Custom checkbox */}
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
        {selected ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : (
          <span className="h-5 w-5 rounded-full border-2 border-gray-300" />
        )}
      </span>

      {/* Thumbnail */}
      {spot.image ? (
        <img
          src={spot.image}
          alt={spot.title}
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
          loading="lazy"
        />
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {spot.category === "美食" ? "🍜" : spot.category === "住宿" ? "🏨" : spot.category === "购物" ? "🛍" : "📍"}
        </span>
      )}

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900">{spot.title}</p>
        {spot.desc && (
          <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">{spot.desc}</p>
        )}
        <div className="mt-1.5 flex items-center gap-1 text-xs">
          {spot.category && (
            <span className={`font-medium ${categoryColor}`}>{spot.category}</span>
          )}
          {spot.category && spot.address && (
            <span className="text-gray-300">|</span>
          )}
          {spot.address && (
            <span className="truncate text-gray-400">{spot.address}</span>
          )}
        </div>
      </div>
    </button>
  );
}
