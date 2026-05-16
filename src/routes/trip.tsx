import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  Clock,
  Heart,
  Hotel,
  Info,
  MapPin,
  Navigation,
  Pencil,
  Plus,
  Share2,
  Star,
  Trash2,
  Utensils,
  Wallet,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { TripMapView, amapNavUrl, type TripMapHandle } from "@/components/AMapView";
import { BottomNav } from "@/components/BottomNav";
import { DAY_COLORS } from "@/lib/constants";
import {
  coverUrl,
  useTravelInfo,
  useTripActions,
  useTripQuery,
  type Day,
  type Spot,
  type TravelInfo,
} from "@/lib/tripStore";
import type { Trip as TripType } from "@/lib/tripTypes";

export const Route = createFileRoute("/trip")({
  component: Trip,
  validateSearch: z.object({
    id: z.string().default("tokyo-5"),
    focus: z.enum(["map"]).optional(),
  }),
  head: () => ({ meta: [{ title: "行程详情 · Routey" }] }),
});

const categoryConfig: Record<string, { icon: typeof MapPin; color: string; bg: string }> = {
  景点: { icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
  美食: { icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
  购物: { icon: MapPin, color: "text-pink-600", bg: "bg-pink-50" },
  住宿: { icon: Hotel, color: "text-emerald-600", bg: "bg-emerald-50" },
  休闲: { icon: MapPin, color: "text-violet-600", bg: "bg-violet-50" },
};

/* ─── Budget & travel time helpers ─── */
function parsePrice(price?: string): number {
  if (!price) return 0;
  const match = price.match(/[\d,]+/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}

function formatCurrency(n: number): string {
  if (n >= 10000) return `¥${(n / 10000).toFixed(1)}万`;
  return `¥${n.toLocaleString()}`;
}

function dayBudget(spots: Spot[]): { total: number; breakdown: Record<string, number> } {
  const breakdown: Record<string, number> = {};
  let total = 0;
  for (const s of spots) {
    const p = parsePrice(s.price);
    if (p > 0) {
      const cat = s.category ?? "其他";
      breakdown[cat] = (breakdown[cat] ?? 0) + p;
      total += p;
    }
  }
  return { total, breakdown };
}

/** Fallback estimate when AMap API data is unavailable */
function travelMinutesFallback(a: Spot, b: Spot): number | null {
  if (a.lat == null || a.lng == null || b.lat == null || b.lng == null) return null;
  const km = Math.hypot((a.lat - b.lat) * 111, (a.lng - b.lng) * 111 * Math.cos((a.lat * Math.PI) / 180));
  return Math.max(3, Math.min(90, Math.round((km / 30) * 60)));
}

function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)}km`;
  return `${meters}m`;
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins >= 60) return `${Math.floor(mins / 60)}h${mins % 60 > 0 ? `${mins % 60}min` : ""}`;
  return `${mins} 分钟`;
}

const modeLabel: Record<string, string> = {
  driving: "驾车",
  walking: "步行",
  transit: "公交",
};

/**
 * Generate an HD image URL for any spot via Unsplash Source.
 * Uses the spot's image field first, then falls back to a search-based URL
 * keyed by the spot title and category.
 */
/** Check if a URL is valid and not the dead source.unsplash.com */
function isValidImageUrl(url?: string): boolean {
  return !!url && !url.includes("source.unsplash.com");
}

/** Build a server-side Wikipedia image URL for a spot (lazy loaded) */
function spotImageUrl(spot: Spot): string {
  if (isValidImageUrl(spot.image)) return spot.image!;
  // Use server endpoint that fetches real Wikipedia image for this spot
  return `/api/spot-image?q=${encodeURIComponent(spot.title)}`;
}

function Trip() {
  const { id, focus } = Route.useSearch();
  const { data: trip, isLoading } = useTripQuery(id);
  const actions = useTripActions();
  const [editing, setEditing] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<{ spot: Spot; dayIndex: number } | null>(null);
  const [detailSpot, setDetailSpot] = useState<Spot | null>(null);
  const [showBudget, setShowBudget] = useState(false);
  const mapHandleRef = useRef<TripMapHandle>(null);

  useEffect(() => {
    if (focus === "map") {
      setActiveDay(null);
      setSelectedSpot(null);
      mapHandleRef.current?.focusDay(null);
      mapHandleRef.current?.highlightSpot(null);
    }
  }, [focus]);

  const handleDayClick = useCallback((dayIdx: number) => {
    setActiveDay((prev) => {
      const next = prev === dayIdx ? null : dayIdx;
      mapHandleRef.current?.focusDay(next);
      return next;
    });
    setSelectedSpot(null);
    mapHandleRef.current?.highlightSpot(null);
  }, []);

  const handleSpotClickFromList = useCallback(
    (spot: Spot, dayIndex: number) => {
      setSelectedSpot((prev) => {
        if (prev?.spot.id === spot.id) {
          mapHandleRef.current?.highlightSpot(null);
          return null;
        }
        mapHandleRef.current?.highlightSpot(spot.id);
        return { spot, dayIndex };
      });
      if (activeDay !== dayIndex) {
        setActiveDay(dayIndex);
        mapHandleRef.current?.focusDay(dayIndex);
      }
    },
    [activeDay],
  );

  const handleMapSpotClick = useCallback(
    (spot: Spot, dayIndex: number) => {
      setSelectedSpot({ spot, dayIndex });
      mapHandleRef.current?.highlightSpot(spot.id);
      if (activeDay !== dayIndex) {
        setActiveDay(dayIndex);
        mapHandleRef.current?.focusDay(dayIndex);
      }
    },
    [activeDay],
  );

  if (isLoading) return <Centered text="正在加载行程..." />;

  if (!trip) {
    return (
      <Centered
        text={
          <>
            行程不存在 ·{" "}
            <Link to="/my-trips" className="text-primary">返回</Link>
          </>
        }
      />
    );
  }

  return (
    <div className="app-shell pb-20" style={{ background: "var(--gradient-soft)" }}>
      <header className="relative flex items-center justify-center px-5 pb-1.5 pt-5">
        <Link to="/my-trips" className="pressable absolute left-5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="mx-14 truncate text-center text-[15px] font-bold">{trip.name}</h1>
        <div className="absolute right-5 flex items-center gap-2.5">
          <button onClick={() => void actions.toggleFavorite(trip.id)} aria-label="收藏" className="pressable flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
            <Heart className={`h-5 w-5 ${trip.favorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`} />
          </button>
          <Link to="/share" search={{ id: trip.id }} aria-label="分享" className="pressable flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </Link>
          <button onClick={() => setEditing((v) => !v)} className={`pressable flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ${editing ? "text-primary" : ""}`} aria-label="编辑">
            {editing ? <Check className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Trip metadata bar */}
      {(trip.summary || trip.mood || trip.budgetLevel || trip.travelType) && (
        <TripMetaBar trip={trip} />
      )}

      {/* Sticky map + controls */}
      <div className="sticky top-0 z-10" style={{ background: "var(--background)" }}>
        {/* Map */}
        <div className="px-3">
          <TripMapView
            ref={mapHandleRef}
            tripId={trip.id}
            days={trip.days}
            height="h-[36vh]"
            className="shadow-[var(--shadow-card)]"
            onSpotClick={handleMapSpotClick}
          />
        </div>

        {/* Day chips — single scrollable row */}
        <div className="no-scrollbar mt-1.5 flex items-center gap-1.5 overflow-x-auto px-3 pb-1">
          <button
            onClick={() => {
              setActiveDay(null);
              setSelectedSpot(null);
              mapHandleRef.current?.focusDay(null);
              mapHandleRef.current?.highlightSpot(null);
            }}
            className={`pressable shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap ${
              activeDay === null
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-muted-foreground shadow-sm"
            }`}
          >
            全部 ({trip.days.reduce((n, d) => n + d.spots.length, 0)})
          </button>
          <button
            onClick={() => setShowBudget(true)}
            className="pressable flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 shadow-sm whitespace-nowrap"
          >
            <Wallet className="h-3 w-3" />
            预算
          </button>
          {trip.days.map((day, idx) => (
            <button
              key={day.id}
              onClick={() => handleDayClick(idx)}
              className={`pressable shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap max-w-[160px] truncate ${
                activeDay === idx ? "text-white shadow-md" : "bg-card text-muted-foreground shadow-sm"
              }`}
              style={activeDay === idx ? { background: DAY_COLORS[idx % DAY_COLORS.length] } : undefined}
            >
              <span
                className="mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{ background: DAY_COLORS[idx % DAY_COLORS.length] }}
              />
              {day.label}{day.route ? `: ${day.route}` : ""}
            </button>
          ))}
        </div>

        {/* Category summary pills */}
        <CategoryFilterTabs days={trip.days} />

        {/* Spot info popup from map click */}
        {selectedSpot && (
          <div className="px-3 pb-1">
            <SpotDetailPopup
              spot={selectedSpot.spot}
              dayColor={DAY_COLORS[selectedSpot.dayIndex % DAY_COLORS.length]}
              onClose={() => {
                setSelectedSpot(null);
                mapHandleRef.current?.highlightSpot(null);
              }}
              onDetail={() => setDetailSpot(selectedSpot.spot)}
            />
          </div>
        )}

        {/* Bottom shadow fade */}
        <div className="h-1 bg-gradient-to-b from-[var(--background)] to-transparent" />
      </div>

      {/* Day sections */}
      <section className="mt-0.5 space-y-2 px-3 pb-2">
        {trip.days.map((day, idx) => (
          <DaySection
            key={day.id}
            tripId={trip.id}
            day={day}
            dayIndex={idx}
            editing={editing}
            isActive={activeDay === null || activeDay === idx}
            selectedSpotId={selectedSpot?.spot.id ?? null}
            onSpotClick={handleSpotClickFromList}
            onDetail={setDetailSpot}
          />
        ))}
      </section>

      {/* Detail modal */}
      {detailSpot && <SpotModal spot={detailSpot} onClose={() => setDetailSpot(null)} />}

      {/* Budget popup */}
      {showBudget && <BudgetPopup days={trip.days} onClose={() => setShowBudget(false)} />}

      <BottomNav />
    </div>
  );
}

/* ─── Category summary pills ─── */
function CategoryFilterTabs({ days }: { days: Day[] }) {
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const day of days) {
      for (const spot of day.spots) {
        const cat = spot.category ?? "景点";
        counts[cat] = (counts[cat] ?? 0) + 1;
      }
    }
    return counts;
  }, [days]);

  const cats = ["景点", "美食", "住宿", "购物", "休闲"];
  const hasCats = cats.some((c) => (categoryCounts[c] ?? 0) > 0);
  if (!hasCats) return null;

  return (
    <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto px-3 pb-1.5">
      {cats.map((cat) => {
        const count = categoryCounts[cat] ?? 0;
        if (count === 0) return null;
        const cfg = categoryConfig[cat] ?? categoryConfig["景点"];
        return (
          <span
            key={cat}
            className={`shrink-0 rounded-full px-2.5 py-[3px] text-[10px] font-bold whitespace-nowrap ${cfg.bg} ${cfg.color}`}
          >
            {cat} {count}
          </span>
        );
      })}
    </div>
  );
}

/* ─── Trip metadata bar ─── */
const budgetLabel: Record<string, string> = { low: "经济", medium: "舒适", high: "高品质" };
const typeLabel: Record<string, string> = { solo: "独行", couple: "情侣", family: "家庭", friends: "朋友" };
const paceLabel: Record<string, string> = { relaxed: "慢节奏", normal: "适中", fast: "暴走" };

function TripMetaBar({ trip }: { trip: TripType }) {
  const tripCover = trip.coverUrl || coverUrl(trip.cover);
  return (
    <div className="mx-3 mb-2 overflow-hidden rounded-2xl bg-white px-3.5 py-3 shadow-sm">
      <div className="flex gap-3">
        {/* Left: text info */}
        <div className="min-w-0 flex-1">
          {trip.summary && (
            <p className="line-clamp-3 text-[12px] leading-[18px] text-slate-600">{trip.summary}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {trip.destination && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                <MapPin className="mr-0.5 inline h-2.5 w-2.5" />{trip.city || trip.destination}
              </span>
            )}
            {trip.budgetLevel && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                <Wallet className="mr-0.5 inline h-2.5 w-2.5" />{budgetLabel[trip.budgetLevel] || trip.budgetLevel}
              </span>
            )}
            {trip.travelType && (
              <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-medium text-pink-700">
                {typeLabel[trip.travelType] || trip.travelType}
              </span>
            )}
            {trip.pace && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">
                {paceLabel[trip.pace] || trip.pace}
              </span>
            )}
            {trip.mood && (
              <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                {trip.mood}
              </span>
            )}
          </div>
          {trip.tags && trip.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {trip.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="text-[9px] font-bold text-primary/70">#{tag}</span>
              ))}
            </div>
          )}
        </div>
        {/* Right: cover thumbnail */}
        {tripCover && (
          <div className="flex shrink-0 flex-col items-center gap-1">
            <img
              src={tripCover}
              alt="封面"
              className="h-[88px] w-[88px] rounded-2xl object-cover shadow-md"
            />
            <span className="text-[9px] font-medium text-primary">查看攻略 →</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Full-screen bottom-sheet detail modal ─── */
function SpotModal({ spot, onClose }: { spot: Spot; onClose: () => void }) {
  const imgUrl = spotImageUrl(spot);
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 320);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: entered && !closing ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
        transition: "background 350ms cubic-bezier(.4,0,.2,1)",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: "92vh",
          transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
          opacity: entered && !closing ? 1 : 0,
          transition: "transform 380ms cubic-bezier(.32,.72,0,1), opacity 280ms ease",
        }}
      >
        {/* Pull handle */}
        <div className="flex justify-center py-2.5">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Hero image — large, 50vw tall */}
        <div className="relative mx-4 overflow-hidden rounded-2xl" style={{ height: "42vh" }}>
          <img
            src={imgUrl}
            alt={spot.title}
            className="h-full w-full object-cover"
            loading="eager"
            style={{ imageRendering: "auto" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Close button floating on image */}
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md"
            style={{ transition: "background 200ms" }}
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {/* Badges on image bottom */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            {spot.category && (
              <span className="rounded-full bg-white/25 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                {spot.category}
              </span>
            )}
            {spot.rating && (
              <span className="flex items-center gap-0.5 text-[12px] font-bold text-amber-300 drop-shadow-md">
                <Star className="h-3.5 w-3.5 fill-amber-300" /> {spot.rating}
              </span>
            )}
            {spot.price && (
              <span className="text-[12px] font-medium text-white/90 drop-shadow-md">{spot.price}</span>
            )}
          </div>
        </div>

        {/* Content below image — scrollable */}
        <div className="overflow-y-auto px-5 pb-8 pt-4" style={{ maxHeight: "calc(92vh - 42vh - 44px)" }}>
          {/* Title */}
          <h3 className="text-[20px] font-extrabold leading-tight text-gray-900">
            {spot.title}
          </h3>
          {spot.desc && (
            <p className="mt-1 text-[13px] leading-relaxed text-gray-500">{spot.desc}</p>
          )}

          {/* Intro */}
          {spot.intro && (
            <p className="mt-3 rounded-xl bg-gray-50 px-3.5 py-3 text-[13px] leading-6 text-gray-700">
              {spot.intro}
            </p>
          )}

          {/* Address & Duration */}
          {(spot.address || spot.durationMin) && (
            <div className="mt-3.5 flex flex-wrap items-center gap-4 text-[12px] text-gray-500">
              {spot.address && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" /> {spot.address}
                </span>
              )}
              {spot.durationMin && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-gray-400" /> {spot.durationMin >= 60 ? `${Math.floor(spot.durationMin / 60)}h${spot.durationMin % 60 ? `${spot.durationMin % 60}min` : ""}` : `${spot.durationMin}min`}
                </span>
              )}
            </div>
          )}

          {/* Tags */}
          {spot.tags && spot.tags.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-2">
              {spot.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Navigation button */}
          <a
            href={amapNavUrl(spot)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[14px] font-bold text-white shadow-lg transition active:scale-[0.98]"
          >
            <Navigation className="h-4 w-4" /> 在高德地图中导航
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Map click popup ─── */
function SpotDetailPopup({
  spot,
  dayColor,
  onClose,
  onDetail,
}: {
  spot: Spot;
  dayColor: string;
  onClose: () => void;
  onDetail: () => void;
}) {
  const config = categoryConfig[spot.category ?? "景点"] ?? categoryConfig["景点"];

  return (
    <div className="mt-1.5 rounded-xl bg-card px-3 py-2 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2">
        <span className="flex h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: dayColor }} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">{spot.time}</span>
            {spot.category && (
              <span className={`rounded px-1 py-0.5 text-[10px] font-medium ${config.bg} ${config.color}`}>
                {spot.category}
              </span>
            )}
          </div>
          <p className="truncate text-[13px] font-semibold">{spot.title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={onDetail}
            className="pressable flex h-6 items-center gap-0.5 rounded-full bg-muted px-2 text-[10px] font-medium text-muted-foreground"
          >
            <Info className="h-3 w-3" /> 详情
          </button>
          <a
            href={amapNavUrl(spot)}
            target="_blank"
            rel="noreferrer"
            className="pressable flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"
          >
            <Navigation className="h-3 w-3 text-primary" />
          </a>
          <button onClick={onClose} className="pressable flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Donut chart (SVG) ─── */
function DonutChart({ segments, size = 120 }: { segments: { color: string; value: number }[]; size?: number }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;
  const r = 42; // radius
  const c = 2 * Math.PI * r; // circumference
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="shrink-0">
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * c;
        const gap = c - dash;
        const cur = offset;
        offset += dash;
        return (
          <circle key={i} cx="50" cy="50" r={r} fill="none" strokeWidth="14" stroke={seg.color}
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-cur}
            strokeLinecap="round" transform="rotate(-90 50 50)" />
        );
      })}
    </svg>
  );
}

/* ─── Budget popup (redesigned) ─── */
function BudgetPopup({ days, onClose }: { days: Day[]; onClose: () => void }) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const { grandTotal, perDay } = useMemo(() => {
    let grandTotal = 0;
    const perDay = days.map((day) => {
      const b = dayBudget(day.spots);
      grandTotal += b.total;
      return { label: day.label, ...b };
    });
    return { grandTotal, perDay };
  }, [days]);

  const catTotals: Record<string, number> = {};
  for (const d of perDay) {
    for (const [cat, val] of Object.entries(d.breakdown)) {
      catTotals[cat] = (catTotals[cat] ?? 0) + val;
    }
  }

  const catConfig: Record<string, { color: string; mark: string; bg: string }> = {
    住宿: { color: "#10b981", mark: "住", bg: "rgba(16,185,129,0.08)" },
    美食: { color: "#f97316", mark: "食", bg: "rgba(249,115,22,0.08)" },
    休闲: { color: "#8b5cf6", mark: "闲", bg: "rgba(139,92,246,0.08)" },
    景点: { color: "#3b82f6", mark: "景", bg: "rgba(59,130,246,0.08)" },
    购物: { color: "#ec4899", mark: "购", bg: "rgba(236,72,153,0.08)" },
  };

  const dayMarks = ["01", "02", "03", "04", "05", "06", "07"];
  const dayIconColors = ["#3b82f6", "#f97316", "#8b5cf6", "#10b981", "#ec4899", "#06b6d4", "#eab308"];

  // Build donut segments
  const donutSegments = Object.entries(catTotals).map(([cat, val]) => ({
    color: catConfig[cat]?.color ?? "#94a3b8",
    value: val,
  }));

  // Top 3 categories for display
  const topCats = Object.entries(catTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-3xl bg-white pb-6 shadow-2xl"
        style={{ maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center py-2.5">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        <div className="px-5">
          {/* Header with calculator illustration */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Wallet className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-bold text-gray-900">预算估算</h3>
                </div>
                <p className="text-[11px] text-gray-400">预估行程总花费</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              {/* Mini calculator illustration */}
              <div className="flex flex-col items-center">
                <div className="rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 p-2">
                  <div className="rounded-lg bg-violet-700 px-2 py-0.5 text-[10px] font-bold text-white">
                    ¥{grandTotal > 0 ? grandTotal.toLocaleString() : "0"}
                  </div>
                  <div className="mt-1 grid grid-cols-3 gap-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-1.5 w-2 rounded-sm bg-violet-300" />
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="pressable flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Total budget card with donut chart */}
          <div className="mt-4 rounded-2xl bg-gradient-to-r from-gray-50 to-slate-50 p-4">
            <div className="flex items-center gap-4">
              {/* Donut */}
              <div className="relative">
                <DonutChart segments={donutSegments} size={100} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[9px] text-gray-400">总预算</span>
                  <span className="text-sm font-bold text-primary">
                    {grandTotal >= 10000 ? `¥${(grandTotal / 10000).toFixed(1)}万` : `¥${grandTotal.toLocaleString()}`}
                  </span>
                </div>
              </div>
              {/* Total info */}
              <div className="flex-1">
                <p className="text-[11px] text-gray-500">行程总预算</p>
                <p className="text-[28px] font-extrabold tracking-tight text-gray-900">
                  ¥{grandTotal.toLocaleString()}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-400">
                  <CalendarDays className="h-3 w-3" /> {days.length} 天 · 含餐饮、门票、住宿等
                </p>
              </div>
            </div>
          </div>

          {/* Category breakdown - 3 column cards */}
          {grandTotal > 0 && (
            <div className="mt-5">
              <p className="mb-2.5 text-[13px] font-bold text-gray-900">分类占比</p>
              <div className="grid grid-cols-3 gap-2">
                {topCats.map(([cat, val]) => {
                  const pct = Math.round((val / grandTotal) * 100);
                  const cfg = catConfig[cat] ?? { color: "#94a3b8", mark: "项", bg: "rgba(148,163,184,0.08)" };
                  return (
                    <div key={cat} className="rounded-xl border border-gray-100 bg-white p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm" style={{ background: cfg.bg }}>
                            <span className="text-[12px] font-bold" style={{ color: cfg.color }}>{cfg.mark}</span>
                          </span>
                          <span className="text-[13px] font-semibold text-gray-800">{cat}</span>
                        </div>
                        <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold" style={{ color: cfg.color, background: cfg.bg }}>
                          {pct}%
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: cfg.color }} />
                      </div>
                      <p className="mt-2 text-[15px] font-bold text-gray-900">¥{val.toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>

              {/* Remaining categories */}
              {Object.entries(catTotals).length > 3 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {Object.entries(catTotals).sort(([, a], [, b]) => b - a).slice(3).map(([cat, val]) => {
                    const pct = Math.round((val / grandTotal) * 100);
                    const cfg = catConfig[cat] ?? { color: "#94a3b8", mark: "项", bg: "rgba(148,163,184,0.08)" };
                    return (
                      <div key={cat} className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: cfg.bg, color: cfg.color }}>{cfg.mark}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-gray-600">{cat}</span>
                            <span className="text-[10px] font-bold" style={{ color: cfg.color }}>{pct}%</span>
                          </div>
                          <p className="text-[13px] font-bold text-gray-900">¥{val.toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Per-day breakdown - expandable */}
          <div className="mt-5">
            <p className="mb-2.5 text-[13px] font-bold text-gray-900">每日明细</p>
            <div className="space-y-2">
              {perDay.map((d, idx) => {
                const isExpanded = expandedDay === idx;
                const iconColor = dayIconColors[idx % dayIconColors.length];
                return (
                  <div key={d.label}>
                    <button
                      onClick={() => setExpandedDay(isExpanded ? null : idx)}
                      className="pressable flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-3 py-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl text-base"
                          style={{ background: `${iconColor}15` }}>
                          <span className="text-[10px] font-black tracking-tight" style={{ color: iconColor }}>{dayMarks[idx % dayMarks.length]}</span>
                        </span>
                        <div className="text-left">
                          <span className="text-[13px] font-bold" style={{ color: iconColor }}>Day {idx + 1}</span>
                          <p className="text-[11px] text-gray-400">{d.label}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-gray-900">
                          {d.total > 0 ? `¥${d.total.toLocaleString()}` : "—"}
                        </span>
                        <svg className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {/* Expanded detail */}
                    {isExpanded && Object.keys(d.breakdown).length > 0 && (
                      <div className="mt-1 ml-4 space-y-1 rounded-lg bg-gray-50 p-2.5">
                        {Object.entries(d.breakdown).map(([cat, val]) => {
                          const cfg = catConfig[cat] ?? { color: "#94a3b8", mark: "项", bg: "rgba(148,163,184,0.08)" };
                          return (
                            <div key={cat} className="flex items-center justify-between py-1">
                              <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold" style={{ background: cfg.bg, color: cfg.color }}>{cfg.mark}</span> {cat}
                              </span>
                              <span className="text-[11px] font-semibold text-gray-700">¥{val.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer disclaimer */}
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2.5">
            <Info className="h-4 w-4 text-primary" />
            <p className="flex-1 text-[11px] text-gray-400">以上为预估费用，实际花费可能因个人消费习惯有所不同哦~</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Day section ─── */
function DaySection({
  tripId,
  day,
  dayIndex,
  editing,
  isActive,
  selectedSpotId,
  onSpotClick,
  onDetail,
}: {
  tripId: string;
  day: Day;
  dayIndex: number;
  editing: boolean;
  isActive: boolean;
  selectedSpotId: string | null;
  onSpotClick: (spot: Spot, dayIndex: number) => void;
  onDetail: (spot: Spot) => void;
}) {
  const actions = useTripActions();
  const dayColor = DAY_COLORS[dayIndex % DAY_COLORS.length];
  const { data: travelData } = useTravelInfo(tripId, day.id);
  const budget = dayBudget(day.spots);
  const [expanded, setExpanded] = useState(false);

  // Calculate total hours for the day
  const totalHours = useMemo(() => {
    let mins = 0;
    for (const spot of day.spots) {
      mins += spot.durationMin ?? 60;
    }
    return (mins / 60).toFixed(1);
  }, [day.spots]);

  const visibleSpots = expanded || editing ? day.spots : day.spots.slice(0, 3);
  const hasMore = day.spots.length > 3 && !editing;

  return (
    <div className={`transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}>
      {/* Day header */}
      <div className="rounded-xl bg-white px-3 py-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[12px] font-black text-white" style={{ background: dayColor }}>
              {dayIndex + 1}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[13px] font-bold text-slate-800">{day.label}</h3>
              {day.route && (
                <p className="truncate text-[10px] text-muted-foreground">{day.route}</p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="flex items-center gap-0.5 rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-muted-foreground">
              <Clock className="h-2.5 w-2.5" /> {totalHours}h
            </span>
            {budget.total > 0 && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                {formatCurrency(budget.total)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Timeline with solid blue line */}
      <div className="relative space-y-0 pl-4">
        <div
          className="absolute bottom-2 left-[7px] top-2 w-[2px] rounded-full"
          style={{ background: dayColor }}
        />
        {visibleSpots.map((spot, sIdx) => (
          <div key={spot.id}>
            <SpotCard
              tripId={tripId}
              dayId={day.id}
              dayIndex={dayIndex}
              spot={spot}
              editing={editing}
              dayColor={dayColor}
              isSelected={selectedSpotId === spot.id}
              onSpotClick={onSpotClick}
              onDetail={onDetail}
            />
            {/* Travel info between spots */}
            {sIdx < visibleSpots.length - 1 && (() => {
              const next = visibleSpots[sIdx + 1];
              const travelKey = `${spot.id}→${next.id}`;
              const info: TravelInfo | undefined = travelData?.[travelKey];
              const fallbackMins = travelMinutesFallback(spot, next);

              if (info) {
                return (
                  <div className="flex items-center gap-1 py-1 pl-2">
                    <Clock className="h-2.5 w-2.5 text-blue-400" />
                    <span className="text-[10px] text-blue-500/80">
                      {modeLabel[info.mode]} {formatDuration(info.duration)} · {formatDistance(info.distance)}
                    </span>
                  </div>
                );
              }
              if (fallbackMins) {
                const dist = (spot.lat != null && spot.lng != null && next.lat != null && next.lng != null)
                  ? Math.round(Math.hypot((spot.lat - next.lat) * 111000, (spot.lng - next.lng) * 111000 * Math.cos((spot.lat * Math.PI) / 180)))
                  : null;
                return (
                  <div className="flex items-center gap-1 py-1 pl-2">
                    <Clock className="h-2.5 w-2.5 text-blue-400" />
                    <span className="text-[10px] text-blue-500/80">
                      步行 {fallbackMins}分钟{dist ? ` · ${formatDistance(dist)}` : ""}
                    </span>
                  </div>
                );
              }
              return null;
            })()}
          </div>
        ))}
        {day.spots.length === 0 && (
          <p className="py-4 text-center text-xs text-muted-foreground">这一天还没有安排</p>
        )}
      </div>

      {/* Expand/collapse button */}
      {hasMore && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-slate-50 py-2 text-[11px] font-medium text-primary"
        >
          查看全部行程 ({day.spots.length} 个地点) <ChevronDown className="h-3 w-3" />
        </button>
      )}
      {hasMore && expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-slate-50 py-2 text-[11px] font-medium text-muted-foreground"
        >
          收起 <ChevronDown className="h-3 w-3 rotate-180" />
        </button>
      )}

      {editing && (
        <button
          onClick={() => void actions.addSpot(tripId, day.id)}
          className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-primary/30 py-1.5 text-xs font-semibold text-primary"
        >
          <Plus className="h-3 w-3" /> 添加地点
        </button>
      )}
    </div>
  );
}

/* ─── Spot card (timeline style) ─── */
function SpotCard({
  tripId,
  dayId,
  dayIndex,
  spot,
  editing,
  dayColor,
  isSelected,
  onSpotClick,
  onDetail,
}: {
  tripId: string;
  dayId: string;
  dayIndex: number;
  spot: Spot;
  editing: boolean;
  dayColor: string;
  isSelected: boolean;
  onSpotClick: (spot: Spot, dayIndex: number) => void;
  onDetail: (spot: Spot) => void;
}) {
  const actions = useTripActions();
  const config = categoryConfig[spot.category ?? "景点"] ?? categoryConfig["景点"];

  if (editing) {
    return (
      <SpotCardEditing
        tripId={tripId}
        dayId={dayId}
        spot={spot}
        dayColor={dayColor}
        actions={actions}
      />
    );
  }

  const imgUrl = spotImageUrl(spot);

  return (
    <div
      className={`relative flex items-start gap-3 py-2 cursor-pointer transition-all active:scale-[0.99] ${
        isSelected ? "rounded-lg bg-blue-50/50" : ""
      }`}
      onClick={() => onSpotClick(spot, dayIndex)}
    >
      {/* Timeline dot */}
      <div className="relative z-10 flex flex-col items-center">
        <span
          className="mt-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-[2.5px] border-white"
          style={{ background: dayColor, boxShadow: `0 0 0 1.5px ${dayColor}60` }}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Top row: time + category + rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-bold text-slate-700">{spot.time}</span>
          {spot.category && (
            <span className={`rounded-full px-1.5 py-px text-[9px] font-semibold ${config.bg} ${config.color}`}>
              {spot.category}
            </span>
          )}
          {spot.rating && (
            <span className="flex items-center gap-0.5 text-[10px] text-amber-600">
              <Star className="h-2.5 w-2.5 fill-amber-400" /> {spot.rating}
            </span>
          )}
        </div>
        {/* Title */}
        <p className="mt-0.5 truncate text-[13px] font-semibold leading-tight text-slate-900">{spot.title}</p>
        {/* Desc */}
        {spot.desc && (
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{spot.desc}</p>
        )}
      </div>

      {/* Right side: photo + nav */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <img
          src={imgUrl}
          alt={spot.title}
          className="h-[56px] w-[56px] rounded-lg object-cover shadow-sm"
          loading="lazy"
        />
        <a
          href={amapNavUrl(spot)}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-0.5 text-[10px] font-medium text-primary"
        >
          <Navigation className="h-3 w-3" /> 导航
        </a>
      </div>
    </div>
  );
}

/** Editing sub-component — uses key to reset state when spot changes */
function SpotCardEditing({
  tripId,
  dayId,
  spot,
  dayColor,
  actions,
}: {
  tripId: string;
  dayId: string;
  spot: Spot;
  dayColor: string;
  actions: ReturnType<typeof useTripActions>;
}) {
  const [time, setTime] = useState(spot.time);
  const [title, setTitle] = useState(spot.title);
  const [desc, setDesc] = useState(spot.desc);

  const save = () => void actions.updateSpot(tripId, dayId, { ...spot, time, title, desc });

  return (
    <div className="relative flex gap-2">
      <div className="flex flex-col items-center pt-2.5">
        <span
          className="flex h-3 w-3 rounded-full border-2 border-white"
          style={{ background: dayColor, boxShadow: `0 0 0 1px ${dayColor}40` }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-lg bg-card p-2.5 shadow-[var(--shadow-card)]">
          <div className="flex gap-2">
            <input value={time} onChange={(e) => setTime(e.target.value)} onBlur={save}
              className="w-12 rounded border border-border bg-background px-1 py-0.5 text-center text-[11px]" />
            <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={save}
              className="flex-1 rounded border border-border px-2 py-0.5 text-xs font-semibold outline-none focus:border-primary" />
          </div>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} onBlur={save}
            className="mt-1 w-full rounded border border-border px-2 py-0.5 text-[11px] text-muted-foreground outline-none focus:border-primary" />
          <button onClick={() => void actions.deleteSpot(tripId, dayId, spot.id)}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-500">
            <Trash2 className="h-3 w-3" /> 删除
          </button>
        </div>
      </div>
    </div>
  );
}

function Centered({ text }: { text: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 text-sm text-muted-foreground">
      {text}
    </div>
  );
}
