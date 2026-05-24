import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Flame, Loader2 } from "lucide-react";
import { HotSpotCard, type HotSpotData } from "./HotSpotCard";

const categoryTabs = [
  { key: "", label: "全部" },
  { key: "景点", label: "景点" },
  { key: "美食", label: "美食" },
  { key: "住宿", label: "住宿" },
  { key: "休闲", label: "体验" },
];

async function fetchHotSpots(params: {
  destination?: string;
  category?: string;
  limit?: number;
}): Promise<HotSpotData[]> {
  const searchParams = new URLSearchParams();
  if (params.destination) searchParams.set("destination", params.destination);
  if (params.category) searchParams.set("category", params.category);
  if (params.limit) searchParams.set("limit", String(params.limit));

  const res = await fetch(`/api/hot-spots?${searchParams.toString()}`);
  if (!res.ok) throw new Error("获取热门景点失败");
  return res.json();
}

export function HotSpotsSection({ destination }: { destination?: string }) {
  const [activeCategory, setActiveCategory] = useState("");
  const [showAll, setShowAll] = useState(false);

  const { data: spots, isLoading } = useQuery({
    queryKey: ["hot-spots", destination || "", activeCategory],
    queryFn: () =>
      fetchHotSpots({
        destination,
        category: activeCategory || undefined,
        limit: 20,
      }),
    staleTime: 5 * 60 * 1000,
  });

  const displaySpots = showAll ? spots : spots?.slice(0, 6);

  return (
    <section className="mt-3 px-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <h2 className="text-[13px] font-bold flex items-center gap-1">
            热门景点排行
            <Flame className="h-3.5 w-3.5 text-orange-500" />
          </h2>
        </div>
      </div>

      {/* Category tabs */}
      <div className="mt-1.5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              setActiveCategory(tab.key);
              setShowAll(false);
            }}
            className={`shrink-0 rounded-full px-3 py-[5px] text-[10px] font-semibold transition-colors ${
              activeCategory === tab.key
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-2 space-y-1.5">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : displaySpots && displaySpots.length > 0 ? (
          displaySpots.map((spot, i) => (
            <div
              key={`${spot.name}-${spot.category}`}
              className="animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
            >
              <HotSpotCard spot={spot} rank={i + 1} />
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-[11px] text-muted-foreground">
            暂无热门景点数据
          </p>
        )}
      </div>

      {/* Show more button */}
      {spots && spots.length > 6 && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl bg-muted py-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-muted/80"
        >
          查看更多
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </section>
  );
}
