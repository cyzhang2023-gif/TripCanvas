import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Heart,
  MoreHorizontal,
  RotateCw,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { coverUrl, useTripActions, useTripsQuery, type Trip } from "@/lib/tripStore";

export const Route = createFileRoute("/my-trips")({
  component: MyTrips,
  head: () => ({ meta: [{ title: "我的行程 · Routey" }] }),
});

function MyTrips() {
  const { data: trips = [], isLoading } = useTripsQuery();
  const [tab, setTab] = useState<"全部" | "收藏" | "草稿">("全部");
  const filtered = trips.filter((trip) =>
    tab === "全部" ? true : tab === "收藏" ? trip.favorite : trip.status === "草稿",
  );

  const countFor = (t: "全部" | "收藏" | "草稿") =>
    trips.filter((trip) =>
      t === "全部" ? true : t === "收藏" ? trip.favorite : trip.status === "草稿",
    ).length;

  return (
    <div className="app-shell pb-24" style={{ background: "var(--gradient-soft)" }}>
      {/* Header */}
      <header className="flex items-start justify-between px-4 pt-5 pb-0.5">
        <div>
          <h1 className="text-[18px] font-extrabold tracking-tight">我的行程</h1>
          <p className="text-[10px] text-muted-foreground">每一次旅行，都是新的故事</p>
        </div>
        <div className="flex items-center gap-1 pt-0.5">
          <button className="pressable flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm">
            <Search className="h-3.5 w-3.5 text-foreground" />
          </button>
          <button className="pressable flex h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm">
            <MoreHorizontal className="h-3.5 w-3.5 text-foreground" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-4 mt-1.5 flex rounded-xl bg-card p-0.5 shadow-sm">
        {(["全部", "收藏", "草稿"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`pressable flex-1 rounded-lg py-1.5 text-[11px] font-semibold ${
              tab === item ? "text-primary-foreground shadow" : "text-muted-foreground"
            }`}
            style={tab === item ? { background: "var(--gradient-hero)" } : undefined}
          >
            {item}
            <span className="ml-0.5 text-[10px] opacity-80">{countFor(item)}</span>
          </button>
        ))}
      </div>

      {/* Trip list */}
      <div className="space-y-2.5 px-4 pt-2.5">
        {isLoading && (
          <p className="py-16 text-center text-xs text-muted-foreground">正在加载行程...</p>
        )}
        {!isLoading && filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-xs text-muted-foreground">暂无行程</p>
            <Link
              to="/import"
              className="pressable mt-3 inline-flex rounded-xl px-4 py-2 text-xs font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              创建新行程
            </Link>
          </div>
        )}
        {filtered.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  const actions = useTripActions();

  const statusStyle =
    trip.status === "进行中"
      ? "bg-violet-500/90"
      : trip.status === "已完成"
        ? "bg-gray-400/90"
        : "bg-amber-500/90";

  const totalSpots = trip.days.reduce((n, day) => n + day.spots.length, 0);

  return (
    <article className="relative overflow-hidden rounded-[18px] shadow-[0_10px_26px_rgba(38,43,70,.10)]">
      {/* Full background image */}
      <img
        src={trip.coverUrl || coverUrl(trip.cover)}
        alt={trip.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

      {/* Main content area — clickable */}
      <Link to="/trip" search={{ id: trip.id }} className="pressable relative block px-3 pt-7 pb-2.5">
        {/* Title + status */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className="truncate text-[16px] font-extrabold text-white"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              {trip.name}
            </h3>
            <p className="text-[10px] text-white/65">{trip.date}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-sm ${statusStyle}`}
          >
            {trip.status}
          </span>
        </div>

        {/* Info + action buttons */}
        <div className="mt-2 flex items-center justify-between">
          <p className="flex items-center gap-1 text-[10px] text-white/65">
            <CalendarDays className="h-3 w-3" />
            {trip.days.length} 天 · {totalSpots} 个地点
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void actions.toggleFavorite(trip.id);
              }}
              className="pressable flex h-7 w-7 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm"
              aria-label="收藏"
            >
              <Heart
                className={`h-3.5 w-3.5 ${trip.favorite ? "fill-rose-400 text-rose-400" : "text-white/75"}`}
              />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void actions.regenerate(trip.id);
              }}
              className="pressable flex h-7 w-7 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm"
              aria-label="重新生成"
            >
              <RotateCw className="h-3.5 w-3.5 text-white/75" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm(`删除 ${trip.name}?`)) void actions.deleteTrip(trip.id);
              }}
              className="pressable flex h-7 w-7 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm"
              aria-label="删除"
            >
              <Trash2 className="h-3.5 w-3.5 text-white/75" />
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
