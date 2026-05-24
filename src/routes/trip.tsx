import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Clock,
  Globe,
  Heart,
  Hotel,
  Info,
  MapPin,
  Navigation,
  Pencil,
  Phone,
  Plus,
  Share2,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Utensils,
  Wallet,
  Wifi,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { TripMapView, amapNavUrl, googleMapsNavUrl, appleMapsNavUrl, type TripMapHandle } from "@/components/AMapView";
import { BottomNav } from "@/components/BottomNav";
import { AddSpotButton } from "@/components/AddSpotButton";
import { CheckInButton } from "@/components/CheckInButton";
import { TripProgressBar } from "@/components/TripProgressBar";
import { EditableSpotCard } from "@/components/EditableSpotCard";
import { EditSpotModal } from "@/components/EditSpotModal";
import { ImageGallery } from "@/components/ImageGallery";
import { SmartTags } from "@/components/SmartTags";
import { RatingModal } from "@/components/RatingModal";
import { RatingSummary } from "@/components/RatingSummary";
import { WeatherForecast } from "@/components/WeatherForecast";
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
import type { Trip as TripType, PoiCategory } from "@/lib/tripTypes";

export const Route = createFileRoute("/trip")({
  component: Trip,
  validateSearch: z.object({
    id: z.string().default("tokyo-5"),
    focus: z.enum(["map"]).optional(),
    edit: z.string().optional(),
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

/** Detect currency symbol/unit from a price string */
const currencyPatterns: [RegExp, string][] = [
  [/\$|美元|USD/i, "$"],
  [/€|欧元|EUR/i, "€"],
  [/£|英镑|GBP/i, "£"],
  [/日元|JPY|円/i, "¥(JPY)"],
  [/韩元|KRW|원/i, "₩"],
  [/泰铢|THB|฿/i, "฿"],
  [/AED|迪拉姆/i, "AED "],
  [/AUD|澳元|AU\$/i, "A$"],
  [/新元|SGD|S\$/i, "S$"],
  [/ISK|冰岛克朗/i, "ISK "],
  [/里拉|TL|TRY/i, "₺"],
  [/卢比|INR|Rs|尼泊尔卢比|NPR/i, "₹"],
  [/比索|PHP|MXN/i, "MXN "],
  [/索尔|PEN/i, "PEN "],
  [/雷亚尔|BRL|R\$/i, "R$"],
  [/¥|元|人民币|RMB|CNY/i, "¥"],
];

const countryToCurrency: Record<string, string> = {
  日本: "JPY ", japan: "JPY ",
  韩国: "₩", "south korea": "₩", korea: "₩",
  泰国: "฿", thailand: "฿",
  中国: "¥", china: "¥",
  美国: "$", "united states": "$", usa: "$",
  法国: "€", france: "€", 德国: "€", germany: "€", 意大利: "€", italy: "€", 西班牙: "€", spain: "€",
  英国: "£", "united kingdom": "£", uk: "£",
  新加坡: "S$", singapore: "S$",
  澳大利亚: "A$", australia: "A$",
  菲律宾: "₱", philippines: "₱",
};

function detectCurrency(price?: string, country?: string): string {
  if (!price) {
    if (country) return countryToCurrency[country.toLowerCase()] ?? countryToCurrency[country] ?? "¥";
    return "¥";
  }
  for (const [re, sym] of currencyPatterns) {
    if (re.test(price)) return sym;
  }
  if (country) return countryToCurrency[country.toLowerCase()] ?? countryToCurrency[country] ?? "¥";
  return "¥";
}

function parsePrice(price?: string): number {
  if (!price) return 0;
  // Handle range like "200-300" — take average
  const rangeMatch = price.match(/([\d,]+)\s*[-~]\s*([\d,]+)/);
  if (rangeMatch) {
    const lo = Number(rangeMatch[1].replace(/,/g, ""));
    const hi = Number(rangeMatch[2].replace(/,/g, ""));
    return Math.round((lo + hi) / 2);
  }
  const match = price.match(/[\d,]+/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}

function formatCurrency(n: number, sym = "¥"): string {
  const display = sym.replace("(JPY)", "").trim();
  const isJPY = sym.includes("JPY") || sym.includes("(JPY)");
  if (isJPY) {
    if (n >= 10000) return `¥${(n / 10000).toFixed(1)}万(JPY)`;
    return `¥${n.toLocaleString()}(JPY)`;
  }
  if (sym === "¥" && n >= 10000) return `${display}${(n / 10000).toFixed(1)}万`;
  if (sym === "₩" && n >= 10000) return `${display}${(n / 10000).toFixed(1)}만`;
  return `${display}${n.toLocaleString()}`;
}

type BudgetResult = { total: number; breakdown: Record<string, number>; currency: string };

function dayBudget(spots: Spot[], country?: string): BudgetResult {
  const breakdown: Record<string, number> = {};
  let total = 0;
  let currency = country ? (countryToCurrency[country.toLowerCase()] ?? countryToCurrency[country] ?? "¥") : "¥";
  let detected = false;
  for (const s of spots) {
    const p = parsePrice(s.price);
    if (p > 0) {
      if (!detected) { currency = detectCurrency(s.price, country); detected = true; }
      const cat = s.category ?? "其他";
      breakdown[cat] = (breakdown[cat] ?? 0) + p;
      total += p;
    }
  }
  return { total, breakdown, currency };
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

/** Build a server-side image URL for a spot — includes category for relevance */
function spotImageUrl(spot: Spot): string {
  if (isValidImageUrl(spot.image)) return spot.image!;
  // Include category so "美食" spots search for food, not scenery
  const cat = spot.category ?? "";
  const q = cat && ["美食", "购物", "住宿"].includes(cat)
    ? `${spot.title} ${cat}`
    : spot.title;
  return `/api/spot-image?q=${encodeURIComponent(q)}`;
}

function Trip() {
  const { id, focus, edit } = Route.useSearch();
  const { data: trip, isLoading } = useTripQuery(id);
  const actions = useTripActions();
  const [editing, setEditing] = useState(edit === "1");
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<{ spot: Spot; dayIndex: number } | null>(null);
  const [detailSpot, setDetailSpot] = useState<Spot | null>(null);
  const [showBudget, setShowBudget] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [ratingKey, setRatingKey] = useState(0); // force re-render on submit
  const [checkinKey, setCheckinKey] = useState(0); // force re-render on check-in
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

  // Find first spot with coordinates for weather
  const weatherCoords = useMemo(() => {
    for (const day of (trip?.days ?? [])) {
      for (const spot of day.spots) {
        if (spot.lat != null && spot.lng != null) {
          return { lat: spot.lat, lng: spot.lng };
        }
      }
    }
    return null;
  }, [trip?.days]);

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
          <button onClick={() => setShowRating(true)} aria-label="评分" className="pressable flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 shadow-sm">
            <Star className="h-4 w-4 text-amber-500" fill="#f59e0b" />
          </button>
          <button onClick={() => setEditing((v) => !v)} className={`pressable flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ${editing ? "text-primary" : ""}`} aria-label="编辑">
            {editing ? <Check className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Trip metadata bar */}
      {(trip.summary || trip.mood || trip.budgetLevel || trip.travelType) && (
        <TripMetaBar trip={trip} />
      )}

      {/* Rating summary */}
      <div key={ratingKey} className="mx-3 mb-2">
        <RatingSummary routeId={trip.id} />
      </div>

      {/* Check-in progress */}
      <TripProgressBar tripId={trip.id} days={trip.days} refreshKey={checkinKey} />

      {/* Sticky map + controls */}
      <div className="sticky top-0 z-20" style={{ background: "var(--background)" }}>
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

        {/* Bottom shadow edge */}
        <div className="h-2 bg-gradient-to-b from-[var(--background)] to-transparent shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]" />
      </div>

      {/* Weather forecast */}
      {weatherCoords && (
        <div className="px-3 mt-1.5">
          <WeatherForecast lat={weatherCoords.lat} lng={weatherCoords.lng} />
        </div>
      )}

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
            onCheckedIn={() => setCheckinKey((k) => k + 1)}
          />
        ))}
      </section>

      {/* Detail modal */}
      {detailSpot && <SpotModal spot={detailSpot} onClose={() => setDetailSpot(null)} />}

      {/* Budget popup */}
      {showBudget && <BudgetPopup days={trip.days} country={trip.country} onClose={() => setShowBudget(false)} />}

      {/* Rating modal */}
      {showRating && (
        <RatingModal
          routeId={trip.id}
          routeName={trip.name}
          onClose={() => setShowRating(false)}
          onSubmitted={() => setRatingKey((k) => k + 1)}
        />
      )}

      {/* Floating edit mode FAB */}
      <button
        onClick={() => setEditing((v) => !v)}
        className={`fixed bottom-24 right-5 z-30 flex items-center gap-2 rounded-full px-5 py-3 font-bold text-white shadow-lg transition-all active:scale-95 ${
          editing
            ? "bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-200"
            : "bg-gradient-to-r from-violet-600 to-purple-600 shadow-violet-300"
        }`}
        style={{
          animation: editing ? "none" : "fabFloat 3s ease-in-out infinite",
        }}
      >
        {editing ? (
          <>
            <Check className="h-4.5 w-4.5" strokeWidth={2.5} />
            <span className="text-[13px]">完成编辑</span>
          </>
        ) : (
          <>
            <Pencil className="h-4 w-4" />
            <span className="text-[13px]">编辑行程</span>
          </>
        )}
      </button>
      <style>{`
        @keyframes fabFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>

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
  const tripCover = trip.coverUrl || coverUrl(trip.cover, trip.country, trip.destination);
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
            {trip.sourceRouteId && (
              <span className="flex items-center gap-0.5 rounded-full bg-gradient-to-r from-violet-50 to-pink-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">
                <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
                基于路线定制
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
              loading="lazy"
            />
            <span className="text-[9px] font-medium text-primary">查看攻略 →</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Full-screen bottom-sheet detail modal ─── */
/** Generate truly unique image search queries for gallery */
/** Build the search query for a spot's images — one query, multiple results */
function spotSearchQuery(spot: Spot): string {
  const cat = spot.category ?? "";
  if (["美食", "购物", "住宿"].includes(cat)) return `${spot.title} ${cat}`;
  return spot.title;
}

function SpotModal({ spot, onClose }: { spot: Spot; onClose: () => void }) {
  const searchQuery = useMemo(() => spotSearchQuery(spot), [spot]);
  const [gallery, setGallery] = useState<string[]>([spotImageUrl(spot)]);
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/spot-images?q=${encodeURIComponent(searchQuery)}&count=6`)
      .then((r) => r.json())
      .then((urls: string[]) => {
        if (!cancelled && Array.isArray(urls) && urls.length > 0) setGallery(urls);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [searchQuery]);
  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [introExpanded, setIntroExpanded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 320);
  };

  const config = categoryConfig[spot.category ?? "景点"] ?? categoryConfig["景点"];
  const CatIcon = config.icon;
  const durationText = spot.durationMin
    ? spot.durationMin >= 60
      ? `${Math.floor(spot.durationMin / 60)}小时${spot.durationMin % 60 ? `${spot.durationMin % 60}分钟` : ""}`
      : `${spot.durationMin}分钟`
    : null;

  const introText = spot.intro || spot.desc || "";
  const introIsLong = introText.length > 120;

  const reviewData = useMemo(() => {
    const positives: string[] = [];
    const negatives: string[] = [];
    if (spot.rating && spot.rating >= 4.0) positives.push("整体评分较高，值得一去");
    if (spot.category === "美食") positives.push("食物口味地道");
    if (spot.category === "景点") positives.push("风景优美，拍照打卡好去处");
    if (spot.category === "住宿") positives.push("住宿环境舒适");
    if (spot.tags && spot.tags.length > 0) positives.push("特色鲜明，游客反馈良好");
    if (spot.durationMin && spot.durationMin <= 30) positives.push("不需要太多时间，适合穿插在行程中");
    if (positives.length === 0) positives.push("值得探索的好去处");
    if (spot.price) negatives.push("部分时段价格偏高");
    if (spot.category === "景点") negatives.push("旺季人流较多，建议避峰出行");
    if (spot.category === "美食") negatives.push("高峰期可能需要排队");
    if (negatives.length === 0) negatives.push("暂无明显差评");
    return { positives: positives.slice(0, 3), negatives: negatives.slice(0, 2) };
  }, [spot]);

  const facilities = useMemo(() => {
    const list: string[] = [];
    const allTags = (spot.tags ?? []).join(" ").toLowerCase();
    if (spot.category === "住宿" || allTags.includes("wifi")) list.push("WiFi");
    if (spot.category === "美食" || spot.category === "住宿") list.push("停车场");
    if (allTags.includes("亲子") || allTags.includes("儿童") || allTags.includes("家庭")) list.push("儿童友好");
    if (spot.category === "住宿") list.push("空调");
    if (spot.payment && spot.payment.length > 1) list.push("多种支付");
    return list;
  }, [spot]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: entered && !closing ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        transition: "background 350ms cubic-bezier(.4,0,.2,1)",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-t-[28px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: "92vh",
          background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
          transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
          opacity: entered && !closing ? 1 : 0,
          transition: "transform 400ms cubic-bezier(.32,.72,0,1), opacity 300ms ease",
        }}
      >
        {/* Drag handle */}
        <div className="absolute left-0 right-0 top-0 z-10 flex justify-center pt-2.5 pb-1">
          <div className="h-1 w-10 rounded-full bg-white/25" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm active:bg-black/50"
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto" style={{ maxHeight: "92vh" }}>
          {/* 1. Image Gallery */}
          <div className="px-4 pt-8">
            <ImageGallery images={gallery} title={spot.title} />
          </div>

          <div className="px-5 pb-8 pt-4">
            {/* Title row */}
            <div className="flex items-start gap-2">
              <h3 className="flex-1 text-[22px] font-extrabold leading-tight text-white">
                {spot.title}
              </h3>
              {spot.rating && (
                <span className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-500/15 px-2 py-1 text-[13px] font-bold text-amber-300">
                  <Star className="h-3.5 w-3.5 fill-amber-300" /> {spot.rating}
                </span>
              )}
            </div>

            {/* Category & price */}
            <div className="mt-1.5 flex items-center gap-2">
              {spot.category && (
                <span className="flex items-center gap-1 text-[12px] font-medium text-white/50">
                  <CatIcon className="h-3 w-3" /> {spot.category}
                </span>
              )}
              {spot.price && (
                <span className="text-[12px] font-semibold text-white/70">{spot.price}</span>
              )}
            </div>

            {/* 2. Smart Tags */}
            <div className="mt-3">
              <SmartTags spot={spot} />
            </div>

            {/* 3. AI Description */}
            {introText && (
              <div className="mt-5">
                <div className="mb-2 flex items-center gap-2">
                  <h4 className="text-[13px] font-bold text-white/80">地点介绍</h4>
                  <span className="flex items-center gap-1 rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                    <Sparkles className="h-2.5 w-2.5" /> AI生成
                  </span>
                </div>
                <div className="relative">
                  <p className={`text-[13px] leading-6 text-white/70 transition-all duration-300 ${!introExpanded && introIsLong ? "line-clamp-3" : ""}`}>
                    {introText}
                  </p>
                  {introIsLong && !introExpanded && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8" style={{ background: "linear-gradient(transparent, #1a1a2e)" }} />
                  )}
                  {introIsLong && (
                    <button
                      onClick={() => setIntroExpanded(!introExpanded)}
                      className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-violet-400 active:text-violet-300"
                    >
                      {introExpanded ? (<>收起 <ChevronUp className="h-3 w-3" /></>) : (<>展开全文 <ChevronDown className="h-3 w-3" /></>)}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 4. Review Summary */}
            <div className="mt-5">
              <div className="mb-2.5 flex items-center gap-2">
                <h4 className="text-[13px] font-bold text-white/80">真实评价</h4>
                {spot.xhsUrl && (
                  <span className="flex items-center gap-1 text-[10px] text-red-400/80">
                    <span className="text-[12px]">📕</span> 来自小红书
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/8 px-3.5 py-2.5">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <ThumbsUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[11px] font-bold text-emerald-400">好评</span>
                  </div>
                  <ul className="space-y-1">
                    {reviewData.positives.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[12px] text-emerald-200/80">
                        <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-emerald-400/60" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-orange-500/15 bg-orange-500/8 px-3.5 py-2.5">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <ThumbsDown className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-[11px] font-bold text-orange-400">注意</span>
                  </div>
                  <ul className="space-y-1">
                    {reviewData.negatives.map((n, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[12px] text-orange-200/80">
                        <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-orange-400/60" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Contact & Info */}
            <div className="mt-5">
              {(spot.address || durationText) && (
                <div className="flex flex-col gap-2 text-[12px] text-white/60">
                  {spot.address && (
                    <span className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" />
                      <span className="leading-tight">{spot.address}</span>
                    </span>
                  )}
                  {spot.time && (
                    <span className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-white/40" />
                      营业中 · {spot.time}
                    </span>
                  )}
                  {durationText && (
                    <span className="flex items-center gap-2">
                      <Navigation className="h-3.5 w-3.5 shrink-0 text-white/40" />
                      建议游玩 {durationText}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-white/40" />
                    <span className="text-white/40">暂无电话信息</span>
                  </span>
                  {spot.dpUrl && (
                    <a href={spot.dpUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400">
                      <Globe className="h-3.5 w-3.5 shrink-0" />
                      查看商户主页
                    </a>
                  )}
                </div>
              )}

              {facilities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {facilities.map((f) => (
                    <span key={f} className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/60">
                      {f === "WiFi" && <Wifi className="h-2.5 w-2.5" />}
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Payment methods */}
            {spot.payment && spot.payment.length > 0 && (
              <div className="mt-4">
                <p className="mb-1.5 text-[11px] font-semibold text-white/50">支付方式</p>
                <div className="flex flex-wrap gap-1.5">
                  {spot.payment.map((p) => (
                    <span key={p} className="rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Backup plan */}
            {spot.backup && (
              <div className="mt-3 rounded-xl border border-blue-400/20 bg-blue-400/10 px-3 py-2">
                <p className="text-[11px] font-semibold text-blue-300">☂ 天气备选</p>
                <p className="mt-0.5 text-[12px] text-blue-200">{spot.backup}</p>
              </div>
            )}

            {/* XHS / Dianping links */}
            {(spot.xhsUrl || spot.dpUrl) && (
              <div className="mt-3 flex gap-2.5">
                {spot.xhsUrl && (
                  <a href={spot.xhsUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-red-500/15 px-3 py-2 text-[11px] font-semibold text-red-300 transition active:scale-[0.97]">
                    <span className="text-[14px]">📕</span> 小红书攻略
                  </a>
                )}
                {spot.dpUrl && (
                  <a href={spot.dpUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-orange-500/15 px-3 py-2 text-[11px] font-semibold text-orange-300 transition active:scale-[0.97]">
                    <span className="text-[14px]">⭐</span> 大众点评
                  </a>
                )}
              </div>
            )}

            {/* Original tags */}
            {spot.tags && spot.tags.length > 0 && (
              <div className="mt-3.5 flex flex-wrap gap-2">
                {spot.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-medium text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Navigation options */}
            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold text-white/50">选择导航</p>
              <div className="flex gap-2.5">
                <a href={amapNavUrl(spot)} target="_blank" rel="noreferrer"
                  className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-blue-500/15 py-3 text-white transition active:scale-[0.97]">
                  <Navigation className="h-5 w-5 text-blue-400" />
                  <span className="text-[11px] font-semibold">高德地图</span>
                </a>
                <a href={googleMapsNavUrl(spot)} target="_blank" rel="noreferrer"
                  className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-green-500/15 py-3 text-white transition active:scale-[0.97]">
                  <MapPin className="h-5 w-5 text-green-400" />
                  <span className="text-[11px] font-semibold">Google Maps</span>
                </a>
                <a href={appleMapsNavUrl(spot)} target="_blank" rel="noreferrer"
                  className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-slate-400/15 py-3 text-white transition active:scale-[0.97]">
                  <MapPin className="h-5 w-5 text-slate-300" />
                  <span className="text-[11px] font-semibold">Apple Maps</span>
                </a>
                <button className="flex w-14 flex-col items-center justify-center gap-1 rounded-2xl bg-white/8 text-white/70 active:bg-white/12">
                  <Heart className="h-4 w-4" />
                  <span className="text-[10px]">收藏</span>
                </button>
              </div>
            </div>
          </div>
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
          <button onClick={onClose} className="pressable flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-label="关闭">
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
function BudgetPopup({ days, country, onClose }: { days: Day[]; country?: string; onClose: () => void }) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const { grandTotal, perDay, tripCurrency } = useMemo(() => {
    let grandTotal = 0;
    const currencyCount: Record<string, number> = {};
    const perDay = days.map((day) => {
      const b = dayBudget(day.spots, country);
      grandTotal += b.total;
      if (b.total > 0) currencyCount[b.currency] = (currencyCount[b.currency] ?? 0) + b.total;
      return { label: day.label, ...b };
    });
    const tripCurrency = Object.entries(currencyCount).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "¥";
    return { grandTotal, perDay, tripCurrency };
  }, [days, country]);

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
                    {formatCurrency(grandTotal, tripCurrency)}
                  </div>
                  <div className="mt-1 grid grid-cols-3 gap-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-1.5 w-2 rounded-sm bg-violet-300" />
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="pressable flex h-7 w-7 items-center justify-center rounded-full bg-gray-100" aria-label="关闭">
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
                    {formatCurrency(grandTotal, tripCurrency)}
                  </span>
                </div>
              </div>
              {/* Total info */}
              <div className="flex-1">
                <p className="text-[11px] text-gray-500">行程总预算</p>
                <p className="text-[28px] font-extrabold tracking-tight text-gray-900">
                  {formatCurrency(grandTotal, tripCurrency)}
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
                      <p className="mt-2 text-[15px] font-bold text-gray-900">{formatCurrency(val, tripCurrency)}</p>
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
                          <p className="text-[13px] font-bold text-gray-900">{formatCurrency(val, tripCurrency)}</p>
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
                          {d.total > 0 ? formatCurrency(d.total, d.currency) : "—"}
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
                              <span className="text-[11px] font-semibold text-gray-700">{formatCurrency(val, d.currency)}</span>
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
  onCheckedIn,
}: {
  tripId: string;
  day: Day;
  dayIndex: number;
  editing: boolean;
  isActive: boolean;
  selectedSpotId: string | null;
  onSpotClick: (spot: Spot, dayIndex: number) => void;
  onDetail: (spot: Spot) => void;
  onCheckedIn?: () => void;
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
    <div className={isActive ? "" : "hidden"}>

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
                {formatCurrency(budget.total, budget.currency)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Timeline with solid line */}
      <div className="relative z-0 space-y-0 pl-4">
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
              onCheckedIn={onCheckedIn}
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
        <AddSpotButton
          onAdd={(data) => {
            void actions.addSpot(tripId, day.id, data.title, data.desc);
          }}
        />
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
  onCheckedIn,
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
  onCheckedIn?: () => void;
}) {
  const actions = useTripActions();
  const config = categoryConfig[spot.category ?? "景点"] ?? categoryConfig["景点"];
  const [editModalOpen, setEditModalOpen] = useState(false);

  const imgUrl = spotImageUrl(spot);

  const cardContent = (
    <div
      className={`relative flex items-start gap-3 py-2 cursor-pointer transition-all active:scale-[0.99] ${
        isSelected ? "rounded-lg bg-blue-50/50" : ""
      }`}
      onClick={() => !editing && onSpotClick(spot, dayIndex)}
    >
      {/* Timeline dot */}
      <div className="relative z-[1] flex flex-col items-center">
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
        {/* Payment chips */}
        {spot.payment && spot.payment.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {spot.payment.map((p) => (
              <span key={p} className="rounded-full bg-emerald-50 px-1.5 py-px text-[8px] font-medium text-emerald-700">
                {p}
              </span>
            ))}
          </div>
        )}
        {/* Backup & links row */}
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          {spot.backup && (
            <span className="text-[9px] text-blue-500" title={`备选：${spot.backup}`}>
              ☂ 备选: {spot.backup}
            </span>
          )}
          {spot.xhsUrl && (
            <a href={spot.xhsUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="text-[9px] font-medium text-red-400 hover:underline">小红书</a>
          )}
          {spot.dpUrl && (
            <a href={spot.dpUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
              className="text-[9px] font-medium text-orange-400 hover:underline">大众点评</a>
          )}
        </div>
      </div>

      {/* Right side: photo + nav + check-in */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <img
          src={imgUrl}
          alt={spot.title}
          className="h-[56px] w-[56px] rounded-lg object-cover shadow-sm"
          loading="lazy"
        />
        {!editing && (
          <div className="flex items-center gap-1.5">
            <a
              href={amapNavUrl(spot)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-0.5 text-[10px] font-medium text-primary"
            >
              <Navigation className="h-3 w-3" /> 导航
            </a>
            <CheckInButton
              tripId={tripId}
              dayId={dayId}
              spotId={spot.id}
              spotTitle={spot.title}
              onCheckedIn={onCheckedIn}
            />
          </div>
        )}
      </div>
    </div>
  );

  if (editing) {
    return (
      <>
        <EditableSpotCard
          spot={spot}
          dayColor={dayColor}
          onDelete={() => void actions.deleteSpot(tripId, dayId, spot.id)}
          onEdit={() => setEditModalOpen(true)}
        >
          {cardContent}
        </EditableSpotCard>
        {editModalOpen && (
          <EditSpotModal
            spot={spot}
            onSave={(updated) => {
              void actions.updateSpot(tripId, dayId, { ...spot, ...updated });
            }}
            onClose={() => setEditModalOpen(false)}
          />
        )}
      </>
    );
  }

  return cardContent;
}

function Centered({ text }: { text: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 text-sm text-muted-foreground">
      {text}
    </div>
  );
}
