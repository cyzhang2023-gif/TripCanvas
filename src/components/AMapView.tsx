import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { Day, Spot, TravelInfo } from "@/lib/tripTypes";
import { DAY_COLORS } from "@/lib/constants";

type MapLibreGL = typeof import("maplibre-gl");
let _mlgl: MapLibreGL | null = null;
let _mlglPromise: Promise<MapLibreGL> | null = null;

function loadMapLibre(): Promise<MapLibreGL> {
  if (_mlgl) return Promise.resolve(_mlgl);
  if (!_mlglPromise) {
    _mlglPromise = Promise.all([
      import("maplibre-gl"),
      import("maplibre-gl/dist/maplibre-gl.css"),
    ]).then(([mod]) => {
      _mlgl = mod;
      return mod;
    });
  }
  return _mlglPromise;
}

type Coordinate = { lat: number; lng: number };
type TravelInfoByDay = Record<string, Record<string, TravelInfo>>;

/** Free vector tile style — CARTO Voyager (worldwide, no key required) */
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

export type TripMapHandle = {
  focusDay: (dayIndex: number | null) => void;
  highlightSpot: (spotId: string | null) => void;
};

/* ─── Utility helpers ─── */

function hasCoordinate(spot: Spot): spot is Spot & { lat: number; lng: number } {
  return spot.lat != null && spot.lng != null;
}

function routePoints(day: Day, travelInfo?: Record<string, TravelInfo>): Coordinate[] {
  const points: Coordinate[] = [];
  const spots = day.spots.filter(hasCoordinate);

  spots.forEach((spot, index) => {
    if (index === 0) {
      points.push({ lat: spot.lat, lng: spot.lng });
      return;
    }

    const previous = spots[index - 1];
    const segment = travelInfo?.[`${previous.id}→${spot.id}`];
    const polyline = segment?.polyline?.length
      ? segment.polyline.map(([lng, lat]) => ({ lat, lng }))
      : [
          { lat: previous.lat, lng: previous.lng },
          { lat: spot.lat, lng: spot.lng },
        ];

    polyline.forEach((point, pointIndex) => {
      const last = points[points.length - 1];
      const duplicate = last && last.lat === point.lat && last.lng === point.lng;
      if (pointIndex === 0 && duplicate) return;
      points.push(point);
    });
  });

  return points;
}

function visiblePoints(days: Day[], focusDay: number | null, travelInfoByDay: TravelInfoByDay) {
  return days.flatMap((day, dayIndex) =>
    focusDay == null || focusDay === dayIndex ? routePoints(day, travelInfoByDay[day.id]) : [],
  );
}

function getBounds(points: Coordinate[]): [[number, number], [number, number]] | null {
  if (points.length === 0) return null;
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Create a pin-shaped marker DOM element */
function createPinElement(label: number, color: string, opacity: number, highlighted: boolean): HTMLElement {
  const size = highlighted ? 40 : 34;
  const el = document.createElement("div");
  el.style.width = `${size}px`;
  el.style.height = `${size + 10}px`;
  el.style.cursor = "pointer";
  el.style.opacity = String(opacity);
  const radius = highlighted ? 12 : 10;
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 10}" viewBox="0 0 ${size} ${size + 10}">
    <path d="M${size / 2} ${size + 6} C${size / 2} ${size + 6} ${size * 0.18} ${size * 0.58} ${size * 0.18} ${size * 0.35} C${size * 0.18} ${size * 0.15} ${size * 0.34} 2 ${size / 2} 2 C${size * 0.66} 2 ${size * 0.82} ${size * 0.15} ${size * 0.82} ${size * 0.35} C${size * 0.82} ${size * 0.58} ${size / 2} ${size + 6} ${size / 2} ${size + 6} Z" fill="${color}" stroke="white" stroke-width="3"/>
    <circle cx="${size / 2}" cy="${size * 0.35}" r="${radius}" fill="white"/>
    <text x="${size / 2}" y="${size * 0.35 + 4}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${highlighted ? 13 : 11}" font-weight="700" fill="${color}">${label}</text>
  </svg>`;
  return el;
}

/* ─── SketchMap fallback (SVG-based, no external map service) ─── */

function SketchMap({
  days,
  focusDay,
  highlightedSpotId,
  travelInfoByDay,
  className,
  height,
  onSpotClick,
}: {
  days: Day[];
  focusDay: number | null;
  highlightedSpotId: string | null;
  travelInfoByDay: TravelInfoByDay;
  className: string;
  height: string;
  onSpotClick?: (spot: Spot, dayIndex: number) => void;
}) {
  const activePoints = visiblePoints(days, focusDay, travelInfoByDay);
  const lats = activePoints.map((p) => p.lat);
  const lngs = activePoints.map((p) => p.lng);
  const minLat = Math.min(...lats, 0);
  const maxLat = Math.max(...lats, 1);
  const minLng = Math.min(...lngs, 0);
  const maxLng = Math.max(...lngs, 1);
  const latSpan = Math.max(maxLat - minLat, 0.001);
  const lngSpan = Math.max(maxLng - minLng, 0.001);
  const globalSpotOrder = new Map<string, number>();
  let globalIndex = 0;
  days.forEach((day) => {
    day.spots.filter(hasCoordinate).forEach((spot) => {
      globalIndex += 1;
      globalSpotOrder.set(spot.id, globalIndex);
    });
  });

  const project = (point: Coordinate) => ({
    x: 8 + ((point.lng - minLng) / lngSpan) * 84,
    y: 92 - ((point.lat - minLat) / latSpan) * 84,
  });

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#eef3f4] ${height} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(0,53,128,.08), rgba(20,184,166,.10)), radial-gradient(circle at 18% 26%, rgba(255,255,255,.9), transparent 24%), radial-gradient(circle at 82% 68%, rgba(255,255,255,.65), transparent 22%)",
      }}
    >
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {DAY_COLORS.map((color, index) => (
            <marker
              key={color}
              id={`arrow-${index}`}
              markerHeight="5"
              markerWidth="5"
              orient="auto"
              refX="4"
              refY="2.5"
            >
              <path d="M0,0 L5,2.5 L0,5 Z" fill={color} />
            </marker>
          ))}
        </defs>
        <path d="M0 30 C20 24 33 38 51 31 S81 21 100 34" fill="none" stroke="white" strokeWidth="1.4" />
        <path d="M0 63 C19 57 36 73 56 64 S82 55 100 67" fill="none" stroke="white" strokeWidth="1.2" />
        {days.map((day, dayIndex) => {
          const dimmed = focusDay != null && focusDay !== dayIndex;
          const path = routePoints(day, travelInfoByDay[day.id]).map(project);
          const points = path.map((p) => `${p.x},${p.y}`).join(" ");
          if (path.length < 2 || dimmed) return null;
          return (
            <polyline
              key={day.id}
              fill="none"
              markerEnd={`url(#arrow-${dayIndex % DAY_COLORS.length})`}
              points={points}
              stroke={DAY_COLORS[dayIndex % DAY_COLORS.length]}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          );
        })}
      </svg>
      {days.map((day, dayIndex) => {
        const color = DAY_COLORS[dayIndex % DAY_COLORS.length];
        const dimmed = focusDay != null && focusDay !== dayIndex;
        return day.spots.filter(hasCoordinate).map((spot, spotIndex) => {
          const point = project(spot);
          const highlighted = highlightedSpotId === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              aria-label={spot.title}
              onClick={() => onSpotClick?.(spot, dayIndex)}
              className="absolute flex items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow-md transition-transform active:scale-95"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: highlighted ? 28 : 24,
                height: highlighted ? 28 : 24,
                marginLeft: highlighted ? -14 : -12,
                marginTop: highlighted ? -14 : -12,
                background: color,
                opacity: dimmed ? 0.25 : 1,
                boxShadow: highlighted ? `0 0 0 4px ${hexToRgba(color, 0.2)}` : undefined,
              }}
            >
              {focusDay != null ? spotIndex + 1 : (globalSpotOrder.get(spot.id) ?? spotIndex + 1)}
            </button>
          );
        });
      })}
    </div>
  );
}

/* ─── Main MapLibre-based map component ─── */

export const TripMapView = forwardRef<
  TripMapHandle,
  {
    tripId: string;
    days: Day[];
    className?: string;
    height?: string;
    onSpotClick?: (spot: Spot, dayIndex: number) => void;
  }
>(function TripMapView({ tripId, days, className = "", height = "h-72", onSpotClick }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [focusDay, setFocusDay] = useState<number | null>(null);
  const [highlightedSpotId, setHighlightedSpotId] = useState<string | null>(null);
  const [travelInfoByDay, setTravelInfoByDay] = useState<TravelInfoByDay>({});
  const [mapReady, setMapReady] = useState(false);
  const [useSketchMap, setUseSketchMap] = useState(false);

  // Stable dependency key — only re-fetch when day IDs or spot IDs actually change
  const daysKey = useMemo(
    () => days.map((d) => `${d.id}:${d.spots.map((s) => s.id).join(",")}`).join("|"),
    [days],
  );

  // Load travel info from server
  useEffect(() => {
    const controller = new AbortController();

    async function loadTravelInfo() {
      const entries = await Promise.all(
        days.map(async (day) => {
          if (day.spots.filter(hasCoordinate).length < 2) return [day.id, {}] as const;
          try {
            const response = await fetch("/api/travel-info", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ tripId, dayId: day.id }),
              signal: controller.signal,
            });
            if (!response.ok) return [day.id, {}] as const;
            const data = (await response.json()) as Record<string, TravelInfo>;
            return [day.id, data] as const;
          } catch {
            return [day.id, {}] as const;
          }
        }),
      );
      if (!controller.signal.aborted) setTravelInfoByDay(Object.fromEntries(entries));
    }

    void loadTravelInfo();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysKey, tripId]);

  const [mapLoading, setMapLoading] = useState(true);
  const mlglRef = useRef<MapLibreGL | null>(null);

  // Initialize MapLibre map (dynamic import)
  useEffect(() => {
    if (useSketchMap || typeof window === "undefined" || !containerRef.current) return;

    let dead = false;
    setMapLoading(true);

    loadMapLibre()
      .then((ml) => {
        if (dead || !containerRef.current) return;
        mlglRef.current = ml;

        const map = new ml.Map({
          container: containerRef.current,
          style: MAP_STYLE,
          center: [139.77, 35.68],
          zoom: 11,
          attributionControl: false,
        });

        map.addControl(new ml.AttributionControl({ compact: true }), "bottom-right");

        map.on("load", () => {
          if (dead) return;
          mapRef.current = map;
          setMapReady(true);
          setMapLoading(false);
        });

        map.on("error", () => {
          if (dead) return;
          setUseSketchMap(true);
          setMapLoading(false);
        });
      })
      .catch(() => {
        if (!dead) {
          setUseSketchMap(true);
          setMapLoading(false);
        }
      });

    return () => {
      dead = true;
      setMapReady(false);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [useSketchMap]);

  // Draw route lines and markers
  const drawOverlays = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Remove old route sources/layers
    days.forEach((_, i) => {
      const layerId = `route-line-${i}`;
      const sourceId = `route-source-${i}`;
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    });
    // Also try cleaning up any extras from previous renders
    for (let i = 0; i < 20; i++) {
      const layerId = `route-line-${i}`;
      const sourceId = `route-source-${i}`;
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    }

    let globalIndex = 0;

    days.forEach((day, dayIndex) => {
      const color = DAY_COLORS[dayIndex % DAY_COLORS.length];
      const dimmed = focusDay != null && focusDay !== dayIndex;
      const opacity = dimmed ? 0.2 : 1;
      const path = routePoints(day, travelInfoByDay[day.id]);

      // Draw route polyline
      if (!dimmed && path.length >= 2) {
        const sourceId = `route-source-${dayIndex}`;
        const layerId = `route-line-${dayIndex}`;
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: path.map((p) => [p.lng, p.lat]),
            },
          },
        });
        map.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": color,
            "line-width": 4,
            "line-opacity": 0.85,
          },
        });
      }

      // Add markers
      const ml = mlglRef.current;
      if (!ml) return;
      day.spots.filter(hasCoordinate).forEach((spot, spotIndex) => {
        globalIndex += 1;
        const label = focusDay != null ? spotIndex + 1 : globalIndex;
        const highlighted = highlightedSpotId === spot.id;
        const el = createPinElement(label, color, opacity, highlighted);
        if (onSpotClick) {
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            onSpotClick(spot, dayIndex);
          });
        }
        const marker = new ml.Marker({ element: el, anchor: "bottom" })
          .setLngLat([spot.lng, spot.lat])
          .addTo(map);
        markersRef.current.push(marker);
      });
    });

    // Fit bounds
    const points = visiblePoints(days, focusDay, travelInfoByDay);
    const bounds = getBounds(points);
    if (bounds) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 400 });
    }
  }, [days, focusDay, highlightedSpotId, travelInfoByDay, onSpotClick]);

  // Redraw when overlays or map state changes
  useEffect(() => {
    if (mapReady && !useSketchMap) drawOverlays();
  }, [drawOverlays, mapReady, useSketchMap]);

  useImperativeHandle(
    ref,
    () => ({
      focusDay: (dayIndex: number | null) => setFocusDay(dayIndex),
      highlightSpot: (spotId: string | null) => setHighlightedSpotId(spotId),
    }),
    [],
  );

  if (useSketchMap) {
    return (
      <SketchMap
        className={className}
        days={days}
        focusDay={focusDay}
        height={height}
        highlightedSpotId={highlightedSpotId}
        onSpotClick={onSpotClick}
        travelInfoByDay={travelInfoByDay}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl ${height} ${className}`}>
      <div ref={containerRef} className="h-full w-full" />
      {mapLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#eef3f4]">
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-[10px] text-muted-foreground">地图加载中...</span>
          </div>
        </div>
      )}
    </div>
  );
});

export function AMapView({
  spots,
  className = "",
  height = "h-72",
}: {
  spots: Spot[];
  className?: string;
  height?: string;
}) {
  return (
    <TripMapView
      className={className}
      days={[{ id: "preview", label: "路线", route: "", spots }]}
      height={height}
      tripId="preview"
    />
  );
}

export function amapNavUrl(spot: Spot) {
  return spot.lat != null && spot.lng != null
    ? `https://uri.amap.com/navigation?to=${spot.lng},${spot.lat},${encodeURIComponent(spot.title)}&mode=walking&callnative=1`
    : `https://uri.amap.com/search?keyword=${encodeURIComponent(spot.title)}`;
}

export function amapSearchUrl(spot: Spot) {
  return spot.lat != null && spot.lng != null
    ? `https://uri.amap.com/marker?position=${spot.lng},${spot.lat}&name=${encodeURIComponent(spot.title)}`
    : `https://uri.amap.com/search?keyword=${encodeURIComponent(spot.title)}`;
}

export function googleMapsNavUrl(spot: Spot) {
  return spot.lat != null && spot.lng != null
    ? `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}&destination_place_id=&travelmode=walking`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.title)}`;
}

export function appleMapsNavUrl(spot: Spot) {
  return spot.lat != null && spot.lng != null
    ? `https://maps.apple.com/?daddr=${spot.lat},${spot.lng}&dirflg=w&t=m`
    : `https://maps.apple.com/?q=${encodeURIComponent(spot.title)}`;
}
