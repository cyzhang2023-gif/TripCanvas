import type { Spot } from "@/lib/tripTypes";

interface SmartTagsProps {
  spot: Spot;
}

type TagStyle = {
  bg: string;
  text: string;
  border: string;
};

const tagStyles: Record<string, TagStyle> = {
  ranking: { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-400/20" },
  category: { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-400/20" },
  distance: { bg: "bg-slate-500/15", text: "text-slate-300", border: "border-slate-400/20" },
  popularity: { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-400/20" },
  price: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-400/20" },
};

function buildTags(spot: Spot): { label: string; kind: keyof typeof tagStyles }[] {
  const tags: { label: string; kind: keyof typeof tagStyles }[] = [];

  // Rating-based ranking tag
  if (spot.rating && spot.rating >= 4.5) {
    const catLabel = spot.category ?? "景点";
    tags.push({ label: `${catLabel}top推荐`, kind: "ranking" });
  } else if (spot.rating && spot.rating >= 4.0) {
    tags.push({ label: `评分 ${spot.rating}`, kind: "ranking" });
  }

  // Category tag
  if (spot.category) {
    const categoryMap: Record<string, string> = {
      "景点": "观光景点",
      "美食": "美食餐厅",
      "购物": "购物商场",
      "住宿": "宾馆酒店",
      "休闲": "休闲娱乐",
    };
    tags.push({ label: categoryMap[spot.category] ?? spot.category, kind: "category" });
  }

  // Duration tag
  if (spot.durationMin) {
    const label = spot.durationMin >= 60
      ? `建议游玩${Math.floor(spot.durationMin / 60)}h`
      : `建议游玩${spot.durationMin}min`;
    tags.push({ label, kind: "distance" });
  }

  // Price tag
  if (spot.price) {
    tags.push({ label: spot.price, kind: "price" });
  }

  // Popularity tag (based on tags array length as proxy)
  if (spot.tags && spot.tags.length >= 3) {
    tags.push({ label: "热门打卡", kind: "popularity" });
  }

  return tags;
}

export function SmartTags({ spot }: SmartTagsProps) {
  const tags = buildTags(spot);
  if (tags.length === 0) return null;

  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-0.5">
      {tags.map((tag, i) => {
        const style = tagStyles[tag.kind];
        return (
          <span
            key={i}
            className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold ${style.bg} ${style.text} ${style.border}`}
          >
            {tag.label}
          </span>
        );
      })}
    </div>
  );
}
