import { Star } from "lucide-react";
import { Img } from "./Img";

export type HotSpotData = {
  name: string;
  image: string;
  category: string;
  rating: number;
  appearance: number;
  destination: string;
  country: string;
  avgQuality: number;
};

const categoryConfig: Record<string, { dot: string; label: string }> = {
  "景点": { dot: "bg-blue-500", label: "景点" },
  "美食": { dot: "bg-orange-500", label: "美食" },
  "住宿": { dot: "bg-purple-500", label: "住宿" },
  "购物": { dot: "bg-pink-500", label: "购物" },
  "休闲": { dot: "bg-green-500", label: "休闲" },
};

function getRankStyle(rank: number): { text: string; border: string; bg: string } {
  if (rank === 1) return { text: "from-amber-400 to-yellow-600", border: "border-l-amber-400", bg: "bg-amber-50" };
  if (rank === 2) return { text: "from-slate-300 to-slate-500", border: "border-l-slate-400", bg: "bg-slate-50" };
  if (rank === 3) return { text: "from-amber-600 to-orange-800", border: "border-l-amber-700", bg: "bg-orange-50" };
  return { text: "from-gray-300 to-gray-500", border: "border-l-gray-300", bg: "" };
}

function formatAppearance(count: number): string {
  if (count >= 10000) return `${(count / 10000).toFixed(1)}w`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

export function HotSpotCard({ spot, rank }: { spot: HotSpotData; rank: number }) {
  const rankStyle = getRankStyle(rank);
  const cat = categoryConfig[spot.category] || { dot: "bg-gray-400", label: spot.category };

  return (
    <div
      className={`group flex items-center gap-3 rounded-2xl bg-card px-3 py-2.5 shadow-[var(--shadow-soft)] border-l-[3px] ${rankStyle.border} ${rankStyle.bg} transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5`}
    >
      {/* Rank number */}
      <span
        className={`shrink-0 text-[28px] font-extrabold leading-none bg-gradient-to-b ${rankStyle.text} bg-clip-text text-transparent w-8 text-center`}
      >
        {rank}
      </span>

      {/* Image */}
      <div className="shrink-0 h-[72px] w-[72px] rounded-2xl overflow-hidden">
        <Img
          src={spot.image}
          alt={spot.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold leading-tight truncate text-foreground">
          {spot.name}
        </p>

        <div className="mt-1 flex items-center gap-2">
          {/* Category badge */}
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${cat.dot}`} />
            {cat.label}
          </span>

          {/* Rating */}
          {spot.rating > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-amber-600">
              <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
              {spot.rating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          {/* Appearance count */}
          <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-[2px] text-[9px] font-semibold text-orange-700">
            {formatAppearance(spot.appearance)}人规划
          </span>

          {/* Destination */}
          {spot.destination && (
            <span className="text-[9px] text-muted-foreground truncate">
              {spot.destination}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
