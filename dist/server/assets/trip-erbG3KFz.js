import { r as reactExports, V as jsxRuntimeExports } from "./server-F62Km59P.js";
import { R as Route, L as Link } from "./router-_rLCEenn.js";
import { P as Plus, B as BottomNav } from "./BottomNav-BNMZze1E.js";
import { X, P as Pencil } from "./x-DGENQlpv.js";
import { M as MapPin } from "./map-pin-CPNfM5hP.js";
import { c as createLucideIcon } from "./createLucideIcon-DxQ4Tsu1.js";
import { C as Clock } from "./clock-DmtXB3SA.js";
import { C as Check } from "./check-DBdnkFLf.js";
import { T as Trash2 } from "./trash-2-NicP8QrS.js";
import { C as ChevronLeft } from "./chevron-left-BXODXwXM.js";
import { C as ChevronRight } from "./chevron-right-XWBozJyy.js";
import { h as hasUserRated, S as StarRating, R as RATING_TAGS, a as addRating, b as RatingSummary } from "./RatingSummary-CM4XuldQ.js";
import { u as useTripQuery, a as useTripActions, c as coverUrl, b as useTravelInfo } from "./tripStore-CAEye6oe.js";
import { H as Heart } from "./heart-Bw71y72P.js";
import { S as Share2 } from "./share-2-Bin_H6Jd.js";
import { S as Star } from "./star-DP9rEFUN.js";
import { W as Wallet } from "./wallet-Cl1yDYSp.js";
import { H as Hotel, C as ChevronUp } from "./hotel-Dws_ou-a.js";
import { U as Utensils } from "./utensils-67wryfse.js";
import { I as Info } from "./info-kAeSuc8L.js";
import { C as ChevronDown } from "./chevron-down-Dmv_Oz55.js";
import { S as Sparkles } from "./sparkles-BGCx3Sdg.js";
import { T as ThumbsUp } from "./thumbs-up-C1x3d-1V.js";
import { G as Globe } from "./globe-BHcEkULQ.js";
import { C as CalendarDays } from "./calendar-days-y4dNeoa4.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-CC4dDzJM.js";
import "node:events";
const __iconNode$7 = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode$7);
const __iconNode$6 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }
  ],
  ["path", { d: "M17 14V2", key: "8ymqnk" }]
];
const ThumbsDown = createLucideIcon("thumbs-down", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 4v16", key: "1654pz" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
  ["path", { d: "M9 20h6", key: "s66wpe" }]
];
const Type = createLucideIcon("type", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode);
const DAY_COLORS = [
  "#003580",
  "#e85d04",
  "#9b59b6",
  "#27ae60",
  "#e74c3c",
  "#0ea5e9",
  "#d97706",
  "#6366f1",
  "#14b8a6",
  "#f43f5e"
];
let _mlgl = null;
let _mlglPromise = null;
function loadMapLibre() {
  if (_mlgl) return Promise.resolve(_mlgl);
  if (!_mlglPromise) {
    _mlglPromise = Promise.all([
      import("./maplibre-gl-DPyyrJSB.js").then((n) => n.m),
      Promise.resolve({                })
    ]).then(([mod]) => {
      _mlgl = mod;
      return mod;
    });
  }
  return _mlglPromise;
}
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
function hasCoordinate(spot) {
  return spot.lat != null && spot.lng != null;
}
function routePoints(day, travelInfo) {
  const points = [];
  const spots = day.spots.filter(hasCoordinate);
  spots.forEach((spot, index) => {
    if (index === 0) {
      points.push({ lat: spot.lat, lng: spot.lng });
      return;
    }
    const previous = spots[index - 1];
    const segment = travelInfo?.[`${previous.id}→${spot.id}`];
    const polyline = segment?.polyline?.length ? segment.polyline.map(([lng, lat]) => ({ lat, lng })) : [
      { lat: previous.lat, lng: previous.lng },
      { lat: spot.lat, lng: spot.lng }
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
function visiblePoints(days, focusDay, travelInfoByDay) {
  return days.flatMap(
    (day, dayIndex) => focusDay == null || focusDay === dayIndex ? routePoints(day, travelInfoByDay[day.id]) : []
  );
}
function getBounds(points) {
  if (points.length === 0) return null;
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  return [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)]
  ];
}
function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function createPinElement(label, color, opacity, highlighted) {
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
function SketchMap({
  days,
  focusDay,
  highlightedSpotId,
  travelInfoByDay,
  className,
  height,
  onSpotClick
}) {
  const activePoints = visiblePoints(days, focusDay, travelInfoByDay);
  const lats = activePoints.map((p) => p.lat);
  const lngs = activePoints.map((p) => p.lng);
  const minLat = Math.min(...lats, 0);
  const maxLat = Math.max(...lats, 1);
  const minLng = Math.min(...lngs, 0);
  const maxLng = Math.max(...lngs, 1);
  const latSpan = Math.max(maxLat - minLat, 1e-3);
  const lngSpan = Math.max(maxLng - minLng, 1e-3);
  const globalSpotOrder = /* @__PURE__ */ new Map();
  let globalIndex = 0;
  days.forEach((day) => {
    day.spots.filter(hasCoordinate).forEach((spot) => {
      globalIndex += 1;
      globalSpotOrder.set(spot.id, globalIndex);
    });
  });
  const project = (point) => ({
    x: 8 + (point.lng - minLng) / lngSpan * 84,
    y: 92 - (point.lat - minLat) / latSpan * 84
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative overflow-hidden rounded-2xl bg-[#eef3f4] ${height} ${className}`,
      style: {
        backgroundImage: "linear-gradient(135deg, rgba(0,53,128,.08), rgba(20,184,166,.10)), radial-gradient(circle at 18% 26%, rgba(255,255,255,.9), transparent 24%), radial-gradient(circle at 82% 68%, rgba(255,255,255,.65), transparent 22%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-full w-full", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: DAY_COLORS.map((color, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "marker",
            {
              id: `arrow-${index}`,
              markerHeight: "5",
              markerWidth: "5",
              orient: "auto",
              refX: "4",
              refY: "2.5",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,0 L5,2.5 L0,5 Z", fill: color })
            },
            color
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 30 C20 24 33 38 51 31 S81 21 100 34", fill: "none", stroke: "white", strokeWidth: "1.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 63 C19 57 36 73 56 64 S82 55 100 67", fill: "none", stroke: "white", strokeWidth: "1.2" }),
          days.map((day, dayIndex) => {
            const dimmed = focusDay != null && focusDay !== dayIndex;
            const path = routePoints(day, travelInfoByDay[day.id]).map(project);
            const points = path.map((p) => `${p.x},${p.y}`).join(" ");
            if (path.length < 2 || dimmed) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "polyline",
              {
                fill: "none",
                markerEnd: `url(#arrow-${dayIndex % DAY_COLORS.length})`,
                points,
                stroke: DAY_COLORS[dayIndex % DAY_COLORS.length],
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.8"
              },
              day.id
            );
          })
        ] }),
        days.map((day, dayIndex) => {
          const color = DAY_COLORS[dayIndex % DAY_COLORS.length];
          const dimmed = focusDay != null && focusDay !== dayIndex;
          return day.spots.filter(hasCoordinate).map((spot, spotIndex) => {
            const point = project(spot);
            const highlighted = highlightedSpotId === spot.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": spot.title,
                onClick: () => onSpotClick?.(spot, dayIndex),
                className: "absolute flex items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow-md transition-transform active:scale-95",
                style: {
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: highlighted ? 28 : 24,
                  height: highlighted ? 28 : 24,
                  marginLeft: highlighted ? -14 : -12,
                  marginTop: highlighted ? -14 : -12,
                  background: color,
                  opacity: dimmed ? 0.25 : 1,
                  boxShadow: highlighted ? `0 0 0 4px ${hexToRgba(color, 0.2)}` : void 0
                },
                children: focusDay != null ? spotIndex + 1 : globalSpotOrder.get(spot.id) ?? spotIndex + 1
              },
              spot.id
            );
          });
        })
      ]
    }
  );
}
const TripMapView = reactExports.forwardRef(function TripMapView2({ tripId, days, className = "", height = "h-72", onSpotClick }, ref) {
  const containerRef = reactExports.useRef(null);
  const mapRef = reactExports.useRef(null);
  const markersRef = reactExports.useRef([]);
  const [focusDay, setFocusDay] = reactExports.useState(null);
  const [highlightedSpotId, setHighlightedSpotId] = reactExports.useState(null);
  const [travelInfoByDay, setTravelInfoByDay] = reactExports.useState({});
  const [mapReady, setMapReady] = reactExports.useState(false);
  const [useSketchMap, setUseSketchMap] = reactExports.useState(false);
  const daysKey = reactExports.useMemo(
    () => days.map((d) => `${d.id}:${d.spots.map((s) => s.id).join(",")}`).join("|"),
    [days]
  );
  reactExports.useEffect(() => {
    const controller = new AbortController();
    async function loadTravelInfo() {
      const entries = await Promise.all(
        days.map(async (day) => {
          if (day.spots.filter(hasCoordinate).length < 2) return [day.id, {}];
          try {
            const response = await fetch("/api/travel-info", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ tripId, dayId: day.id }),
              signal: controller.signal
            });
            if (!response.ok) return [day.id, {}];
            const data = await response.json();
            return [day.id, data];
          } catch {
            return [day.id, {}];
          }
        })
      );
      if (!controller.signal.aborted) setTravelInfoByDay(Object.fromEntries(entries));
    }
    void loadTravelInfo();
    return () => controller.abort();
  }, [daysKey, tripId]);
  const [mapLoading, setMapLoading] = reactExports.useState(true);
  const mlglRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (useSketchMap || typeof window === "undefined" || !containerRef.current) return;
    let dead = false;
    setMapLoading(true);
    loadMapLibre().then((ml) => {
      if (dead || !containerRef.current) return;
      mlglRef.current = ml;
      const map = new ml.Map({
        container: containerRef.current,
        style: MAP_STYLE,
        center: [139.77, 35.68],
        zoom: 11,
        attributionControl: false
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
    }).catch(() => {
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
  const drawOverlays = reactExports.useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    days.forEach((_, i) => {
      const layerId = `route-line-${i}`;
      const sourceId = `route-source-${i}`;
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    });
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
              coordinates: path.map((p) => [p.lng, p.lat])
            }
          }
        });
        map.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": color,
            "line-width": 4,
            "line-opacity": 0.85
          }
        });
      }
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
        const marker = new ml.Marker({ element: el, anchor: "bottom" }).setLngLat([spot.lng, spot.lat]).addTo(map);
        markersRef.current.push(marker);
      });
    });
    const points = visiblePoints(days, focusDay, travelInfoByDay);
    const bounds = getBounds(points);
    if (bounds) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 15, duration: 400 });
    }
  }, [days, focusDay, highlightedSpotId, travelInfoByDay, onSpotClick]);
  reactExports.useEffect(() => {
    if (mapReady && !useSketchMap) drawOverlays();
  }, [drawOverlays, mapReady, useSketchMap]);
  reactExports.useImperativeHandle(
    ref,
    () => ({
      focusDay: (dayIndex) => setFocusDay(dayIndex),
      highlightSpot: (spotId) => setHighlightedSpotId(spotId)
    }),
    []
  );
  if (useSketchMap) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SketchMap,
      {
        className,
        days,
        focusDay,
        height,
        highlightedSpotId,
        onSpotClick,
        travelInfoByDay
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative overflow-hidden rounded-2xl ${height} ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "h-full w-full" }),
    mapLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-[#eef3f4]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "地图加载中..." })
    ] }) })
  ] });
});
function amapNavUrl(spot) {
  return spot.lat != null && spot.lng != null ? `https://uri.amap.com/navigation?to=${spot.lng},${spot.lat},${encodeURIComponent(spot.title)}&mode=walking&callnative=1` : `https://uri.amap.com/search?keyword=${encodeURIComponent(spot.title)}`;
}
function googleMapsNavUrl(spot) {
  return spot.lat != null && spot.lng != null ? `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}&destination_place_id=&travelmode=walking` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.title)}`;
}
function appleMapsNavUrl(spot) {
  return spot.lat != null && spot.lng != null ? `https://maps.apple.com/?daddr=${spot.lat},${spot.lng}&dirflg=w&t=m` : `https://maps.apple.com/?q=${encodeURIComponent(spot.title)}`;
}
const categories$1 = ["景点", "美食", "购物", "住宿", "休闲"];
function AddSpotButton({ onAdd }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setOpen(true),
        className: "group mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#e8614d]/40 py-3 text-[12px] font-bold text-[#e8614d] transition-all hover:border-[#e8614d]/80 hover:bg-[#fff0ed] active:scale-[0.98]",
        style: {
          animation: "pulseGlow 2s ease-in-out infinite"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-[#fff0ed] text-[#d4532e] transition-transform group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5", strokeWidth: 3 }) }),
          "添加地点"
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddSpotModal,
      {
        onAdd: (data) => {
          onAdd(data);
          setOpen(false);
        },
        onClose: () => setOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232, 97, 77, 0); }
          50% { box-shadow: 0 0 0 4px rgba(232, 97, 77, 0.1); }
        }
      ` })
  ] });
}
function AddSpotModal({
  onAdd,
  onClose
}) {
  const [entered, setEntered] = reactExports.useState(false);
  const [closing, setClosing] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("10:00");
  const [category, setCategory] = reactExports.useState("景点");
  reactExports.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 320);
  };
  const handleSave = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), desc: desc.trim(), category, time });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end justify-center",
      style: {
        background: entered && !closing ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        transition: "background 300ms ease"
      },
      onClick: handleClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          style: {
            maxHeight: "75vh",
            transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
            opacity: entered && !closing ? 1 : 0,
            transition: "transform 400ms cubic-bezier(.32,.72,0,1), opacity 300ms ease"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-12 rounded-full bg-gray-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[16px] font-bold text-slate-900", children: "添加新地点" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:bg-gray-200",
                  "aria-label": "关闭",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-5 pb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                  " 地点名称 *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] font-medium text-slate-900 outline-none transition focus:border-[#e8614d]/80 focus:bg-white focus:ring-2 focus:ring-[#fff0ed]",
                    placeholder: "输入地点名称",
                    autoFocus: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5" }),
                  " 描述"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: desc,
                    onChange: (e) => setDesc(e.target.value),
                    className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] text-slate-700 outline-none transition focus:border-[#e8614d]/80 focus:bg-white focus:ring-2 focus:ring-[#fff0ed]",
                    placeholder: "简短描述（选填）"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  " 时间"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: time,
                    onChange: (e) => setTime(e.target.value),
                    className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] text-slate-900 outline-none transition focus:border-[#e8614d]/80 focus:bg-white focus:ring-2 focus:ring-[#fff0ed]",
                    placeholder: "例如: 10:00"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5" }),
                  " 分类"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: categories$1.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setCategory(cat),
                    className: `rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all ${category === cat ? "bg-[#d4532e] text-white shadow-md shadow-[#e8614d]/20" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
                    children: cat
                  },
                  cat
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: handleClose,
                    className: "flex-1 rounded-xl border border-gray-200 py-3 text-[13px] font-semibold text-gray-600 transition active:bg-gray-50",
                    children: "取消"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: handleSave,
                    disabled: !title.trim(),
                    className: "flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d4532e] to-[#d4532e] py-3 text-[13px] font-bold text-white shadow-lg shadow-[#e8614d]/20 transition active:scale-[0.98] disabled:opacity-50",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                      " 添加"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
const STORAGE_KEY = "routey-checkins";
function loadCheckins() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCheckins(checkins) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkins));
}
function generateId() {
  return `ci_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function addCheckin(tripId, dayId, spotId, spotTitle, note, photo) {
  const checkins = loadCheckins();
  const checkin = {
    id: generateId(),
    tripId,
    dayId,
    spotId,
    spotTitle,
    note: note?.trim() || void 0,
    photo: void 0,
    checkedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  checkins.push(checkin);
  saveCheckins(checkins);
  return checkin;
}
function getCheckins(tripId) {
  return loadCheckins().filter((c) => c.tripId === tripId);
}
function getSpotCheckin(tripId, spotId) {
  return loadCheckins().find((c) => c.tripId === tripId && c.spotId === spotId);
}
function getCheckinStatsWithTotal(tripId, totalSpots) {
  const checked = getCheckins(tripId).length;
  return {
    total: totalSpots,
    checked,
    percentage: totalSpots > 0 ? Math.round(checked / totalSpots * 100) : 0
  };
}
function CheckInButton({ tripId, dayId, spotId, spotTitle, onCheckedIn }) {
  const [checkin, setCheckin] = reactExports.useState(
    () => getSpotCheckin(tripId, spotId)
  );
  const [showSheet, setShowSheet] = reactExports.useState(false);
  const [showDetail, setShowDetail] = reactExports.useState(false);
  const [animating, setAnimating] = reactExports.useState(false);
  const [note, setNote] = reactExports.useState("");
  const burstRef = reactExports.useRef(null);
  const isChecked = !!checkin;
  const handleClick = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      if (isChecked) {
        setShowDetail((v) => !v);
      } else {
        setShowSheet(true);
      }
    },
    [isChecked]
  );
  const handleCheckin = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      const ci = addCheckin(tripId, dayId, spotId, spotTitle, note || void 0);
      setCheckin(ci);
      setShowSheet(false);
      setNote("");
      setAnimating(true);
      setTimeout(() => setAnimating(false), 800);
      onCheckedIn?.();
    },
    [tripId, dayId, spotId, spotTitle, note, onCheckedIn]
  );
  const formatTime = (iso) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-flex", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleClick,
        className: `relative flex items-center justify-center rounded-full transition-all duration-300 ${isChecked ? "h-7 w-7 bg-emerald-500 text-white shadow-md shadow-emerald-200" : "h-7 w-7 border-2 border-dashed border-gray-300 text-gray-400 hover:border-emerald-400 hover:text-emerald-500"}`,
        style: animating ? {
          animation: "checkinPop 600ms cubic-bezier(.34,1.56,.64,1) forwards"
        } : isChecked ? { animation: "checkinPulse 2s ease-in-out infinite" } : void 0,
        "aria-label": isChecked ? "查看打卡" : "打卡",
        children: [
          isChecked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5", strokeWidth: 3 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          animating && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: burstRef, className: "pointer-events-none absolute inset-0", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-emerald-400",
              style: {
                animation: `checkinBurst 600ms cubic-bezier(.25,.46,.45,.94) forwards`,
                animationDelay: `${i * 30}ms`,
                // Spread in 6 directions
                "--burst-x": `${Math.cos(i * 60 * Math.PI / 180) * 18}px`,
                "--burst-y": `${Math.sin(i * 60 * Math.PI / 180) * 18}px`
              }
            },
            i
          )) })
        ]
      }
    ),
    showDetail && checkin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40", onClick: () => setShowDetail(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-9 z-50 w-44 rounded-xl bg-white p-2.5 shadow-lg ring-1 ring-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-medium text-emerald-600", children: [
          formatTime(checkin.checkedAt),
          " 已打卡"
        ] }),
        checkin.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-gray-600", children: checkin.note })
      ] })
    ] }),
    showSheet && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0 z-40 bg-black/20",
          onClick: (e) => {
            e.stopPropagation();
            setShowSheet(false);
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-2xl bg-white px-5 pb-8 pt-4 shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          style: {
            animation: "checkinSheetUp 300ms cubic-bezier(.32,.72,0,1) forwards"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-10 rounded-full bg-gray-200" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[14px] font-bold text-gray-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-1 inline h-4 w-4 text-emerald-500" }),
              "打卡 · ",
              spotTitle
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: note,
                onChange: (e) => setNote(e.target.value),
                placeholder: "记录一下此刻的心情...",
                className: "mt-3 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[13px] text-gray-700 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100",
                autoFocus: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleCheckin,
                className: "mt-3 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-2.5 text-[14px] font-bold text-white shadow-md shadow-emerald-200 active:scale-[0.98]",
                children: "打卡"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes checkinPop {
          0% { transform: scale(1); background: transparent; }
          30% { transform: scale(1.3); }
          50% { background: #10b981; }
          100% { transform: scale(1); background: #10b981; }
        }
        @keyframes checkinBurst {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% {
            transform: translate(
              calc(-50% + var(--burst-x)),
              calc(-50% + var(--burst-y))
            ) scale(0);
            opacity: 0;
          }
        }
        @keyframes checkinPulse {
          0%, 100% { box-shadow: 0 4px 6px -1px rgba(16,185,129,0.2), 0 0 0 0 rgba(16,185,129,0.15); }
          50% { box-shadow: 0 4px 6px -1px rgba(16,185,129,0.2), 0 0 0 4px rgba(16,185,129,0.08); }
        }
        @keyframes checkinSheetUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
      ` })
  ] });
}
function TripProgressBar({ tripId, days, refreshKey }) {
  const totalSpots = reactExports.useMemo(
    () => days.reduce((n, d) => n + d.spots.length, 0),
    [days]
  );
  const stats = reactExports.useMemo(
    () => getCheckinStatsWithTotal(tripId, totalSpots),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tripId, totalSpots, refreshKey]
  );
  if (totalSpots === 0) return null;
  const isComplete = stats.checked >= stats.total && stats.total > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 mb-2 rounded-xl bg-white px-3.5 py-2.5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-600", children: "全部打卡完成!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "已打卡",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-600", children: stats.checked }),
        "/",
        stats.total,
        " 个景点"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-emerald-600", children: [
        stats.percentage,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500 ease-out",
        style: {
          width: `${stats.percentage}%`,
          animation: stats.checked > 0 ? "progressShimmer 2s ease-in-out infinite" : void 0,
          backgroundSize: "200% 100%"
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes progressShimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }
      ` })
  ] });
}
function EditableSpotCard({
  spot,
  dayColor,
  onDelete,
  onEdit,
  children
}) {
  const [confirming, setConfirming] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group relative",
      style: {
        animation: "wobble 0.8s ease-in-out infinite alternate"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -left-1 top-1/2 z-10 flex -translate-y-1/2 cursor-grab items-center justify-center rounded-lg bg-white/80 p-1 shadow-sm backdrop-blur-sm active:cursor-grabbing",
            title: "拖动排序",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 text-gray-400" })
          }
        ),
        !confirming ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setConfirming(true);
            },
            className: "absolute -right-1.5 -top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white shadow-md transition-transform hover:scale-110",
            style: {
              animation: "popIn 0.3s cubic-bezier(.34,1.56,.64,1)"
            },
            "aria-label": "删除",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute -right-1 -top-1 z-10 flex items-center gap-1 rounded-full bg-white p-0.5 shadow-lg",
            style: { animation: "popIn 0.2s ease" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    onDelete();
                  },
                  className: "rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white",
                  children: "确认删除"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    setConfirming(false);
                  },
                  className: "rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-600",
                  children: "取消"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            onClick: (e) => {
              e.stopPropagation();
              onEdit();
            },
            className: "cursor-pointer rounded-xl transition-all hover:bg-[#fff0ed]/50",
            title: "点击编辑",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes wobble {
          0% { transform: rotate(-0.5deg); }
          100% { transform: rotate(0.5deg); }
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      ` })
      ]
    }
  );
}
const categories = ["景点", "美食", "购物", "住宿", "休闲"];
function EditSpotModal({ spot, onSave, onClose }) {
  const [entered, setEntered] = reactExports.useState(false);
  const [closing, setClosing] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState(spot.title);
  const [desc, setDesc] = reactExports.useState(spot.desc ?? "");
  const [time, setTime] = reactExports.useState(spot.time);
  const [category, setCategory] = reactExports.useState(spot.category ?? "景点");
  const [durationMin, setDurationMin] = reactExports.useState(spot.durationMin ?? 60);
  reactExports.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 320);
  };
  const handleSave = () => {
    onSave({
      id: spot.id,
      title: title.trim() || spot.title,
      desc: desc.trim(),
      time,
      category,
      durationMin
    });
    handleClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end justify-center",
      style: {
        background: entered && !closing ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        transition: "background 300ms ease"
      },
      onClick: handleClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          style: {
            maxHeight: "80vh",
            transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
            opacity: entered && !closing ? 1 : 0,
            transition: "transform 400ms cubic-bezier(.32,.72,0,1), opacity 300ms ease"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-12 rounded-full bg-gray-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[16px] font-bold text-slate-900", children: "编辑地点" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:bg-gray-200",
                  "aria-label": "关闭",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-5 pb-8 overflow-y-auto", style: { maxHeight: "calc(80vh - 120px)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-3.5 w-3.5" }),
                  " 名称"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] font-medium text-slate-900 outline-none transition focus:border-[#e8614d]/80 focus:bg-white focus:ring-2 focus:ring-[#fff0ed]",
                    placeholder: "地点名称"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                  " 描述"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    value: desc,
                    onChange: (e) => setDesc(e.target.value),
                    rows: 2,
                    className: "w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] text-slate-700 outline-none transition focus:border-[#e8614d]/80 focus:bg-white focus:ring-2 focus:ring-[#fff0ed]",
                    placeholder: "简短描述..."
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  " 时间"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: time,
                    onChange: (e) => setTime(e.target.value),
                    className: "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] text-slate-900 outline-none transition focus:border-[#e8614d]/80 focus:bg-white focus:ring-2 focus:ring-[#fff0ed]",
                    placeholder: "例如: 09:00"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5" }),
                  " 分类"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setCategory(cat),
                    className: `rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all ${category === cat ? "bg-[#d4532e] text-white shadow-md shadow-[#e8614d]/20" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
                    children: cat
                  },
                  cat
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  " 游玩时长 (",
                  durationMin,
                  " 分钟)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 15,
                    max: 300,
                    step: 15,
                    value: durationMin,
                    onChange: (e) => setDurationMin(Number(e.target.value)),
                    className: "w-full accent-[#d4532e]"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between text-[10px] text-gray-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "15分钟" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "5小时" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: handleClose,
                    className: "flex-1 rounded-xl border border-gray-200 py-3 text-[13px] font-semibold text-gray-600 transition active:bg-gray-50",
                    children: "取消"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: handleSave,
                    className: "flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d4532e] to-[#d4532e] py-3 text-[13px] font-bold text-white shadow-lg shadow-[#e8614d]/20 transition active:scale-[0.98]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                      " 保存"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function ImageGallery({ images, title }) {
  const scrollRef = reactExports.useRef(null);
  const [activeIdx, setActiveIdx] = reactExports.useState(0);
  const [fullscreen, setFullscreen] = reactExports.useState(false);
  const [loadedSet, setLoadedSet] = reactExports.useState(/* @__PURE__ */ new Set());
  const handleScroll = reactExports.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIdx(Math.min(idx, images.length - 1));
  }, [images.length]);
  const markLoaded = reactExports.useCallback((i) => {
    setLoadedSet((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);
  if (images.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full overflow-hidden rounded-2xl shadow-lg", style: { aspectRatio: "4/3" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: scrollRef,
          onScroll: handleScroll,
          className: "no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto",
          style: { scrollSnapType: "x mandatory" },
          children: images.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative h-full w-full shrink-0 snap-center",
              style: { scrollSnapAlign: "center" },
              children: [
                !loadedSet.has(i) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-pulse bg-white/10 rounded-2xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: url,
                    alt: `${title} ${i + 1}`,
                    className: "h-full w-full object-cover cursor-pointer",
                    loading: i < 2 ? "eager" : "lazy",
                    onLoad: () => markLoaded(i),
                    onClick: () => {
                      setActiveIdx(i);
                      setFullscreen(true);
                    },
                    draggable: false
                  }
                )
              ]
            },
            i
          ))
        }
      ),
      images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5", children: images.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `block h-[6px] w-[6px] rounded-full transition-all duration-200 ${i === activeIdx ? "bg-white scale-110" : "bg-white/40 ring-1 ring-white/50"}`
        },
        i
      )) })
    ] }),
    fullscreen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FullscreenViewer,
      {
        images,
        title,
        initialIdx: activeIdx,
        onClose: () => setFullscreen(false)
      }
    )
  ] });
}
function FullscreenViewer({
  images,
  title,
  initialIdx,
  onClose
}) {
  const [idx, setIdx] = reactExports.useState(initialIdx);
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = initialIdx * el.clientWidth;
  }, [initialIdx]);
  const handleScroll = reactExports.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const newIdx = Math.round(el.scrollLeft / el.clientWidth);
    setIdx(Math.min(newIdx, images.length - 1));
  }, [images.length]);
  const goTo = (target) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm active:bg-white/20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-5 left-0 right-0 text-center text-sm text-white/70 font-medium", children: [
          idx + 1,
          " / ",
          images.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: scrollRef,
            onScroll: handleScroll,
            onClick: (e) => e.stopPropagation(),
            className: "no-scrollbar flex h-full w-full snap-x snap-mandatory items-center overflow-x-auto",
            style: { scrollSnapType: "x mandatory" },
            children: images.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full shrink-0 snap-center items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: url,
                alt: `${title} ${i + 1}`,
                className: "max-h-full max-w-full object-contain rounded-lg",
                loading: "lazy",
                draggable: false
              }
            ) }, i))
          }
        ),
        idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              goTo(idx - 1);
            },
            className: "absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm active:bg-white/20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
          }
        ),
        idx < images.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              goTo(idx + 1);
            },
            className: "absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm active:bg-white/20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
          }
        ),
        images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2", children: images.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              goTo(i);
            },
            className: `block h-2 w-2 rounded-full transition-all ${i === idx ? "bg-white scale-125" : "bg-white/40"}`
          },
          i
        )) })
      ]
    }
  );
}
const tagStyles = {
  ranking: { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-400/20" },
  category: { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-400/20" },
  distance: { bg: "bg-slate-500/15", text: "text-slate-300", border: "border-slate-400/20" },
  popularity: { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-400/20" },
  price: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-400/20" }
};
function buildTags(spot) {
  const tags = [];
  if (spot.rating && spot.rating >= 4.5) {
    const catLabel = spot.category ?? "景点";
    tags.push({ label: `${catLabel}top推荐`, kind: "ranking" });
  } else if (spot.rating && spot.rating >= 4) {
    tags.push({ label: `评分 ${spot.rating}`, kind: "ranking" });
  }
  if (spot.category) {
    const categoryMap = {
      "景点": "观光景点",
      "美食": "美食餐厅",
      "购物": "购物商场",
      "住宿": "宾馆酒店",
      "休闲": "休闲娱乐"
    };
    tags.push({ label: categoryMap[spot.category] ?? spot.category, kind: "category" });
  }
  if (spot.durationMin) {
    const label = spot.durationMin >= 60 ? `建议游玩${Math.floor(spot.durationMin / 60)}h` : `建议游玩${spot.durationMin}min`;
    tags.push({ label, kind: "distance" });
  }
  if (spot.price) {
    tags.push({ label: spot.price, kind: "price" });
  }
  if (spot.tags && spot.tags.length >= 3) {
    tags.push({ label: "热门打卡", kind: "popularity" });
  }
  return tags;
}
function SmartTags({ spot }) {
  const tags = buildTags(spot);
  if (tags.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-0.5", children: tags.map((tag, i) => {
    const style = tagStyles[tag.kind];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold ${style.bg} ${style.text} ${style.border}`,
        children: tag.label
      },
      i
    );
  }) });
}
function RatingModal({
  routeId,
  routeName,
  onClose,
  onSubmitted
}) {
  const [entered, setEntered] = reactExports.useState(false);
  const [closing, setClosing] = reactExports.useState(false);
  const [score, setScore] = reactExports.useState(0);
  const [selectedTags, setSelectedTags] = reactExports.useState([]);
  const [comment, setComment] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const alreadyRated = hasUserRated(routeId);
  const commentRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 350);
  };
  const toggleTag = (tag) => {
    setSelectedTags(
      (prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const handleSubmit = () => {
    if (score === 0 || submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      addRating(routeId, score, selectedTags, comment);
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onSubmitted?.();
        handleClose();
      }, 1200);
    }, 300);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end justify-center",
      style: {
        background: entered && !closing ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
        transition: "background 300ms ease"
      },
      onClick: handleClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full max-w-md overflow-hidden rounded-t-[28px] shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          style: {
            maxHeight: "85vh",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
            opacity: entered && !closing ? 1 : 0,
            transition: "transform 400ms cubic-bezier(.32,.72,0,1), opacity 300ms ease"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-12 rounded-full bg-gray-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleClose,
                className: "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 active:bg-gray-200",
                "aria-label": "关闭",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            ),
            success ? /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessView, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto px-6 pb-8", style: { maxHeight: "calc(85vh - 48px)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-center text-[18px] font-bold text-gray-900", children: "为路线评分" }),
              routeName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-center text-[12px] text-gray-400 line-clamp-1", children: routeName }),
              alreadyRated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-[11px] text-amber-600", children: "你已评过此路线，再次提交将追加新评分" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: score, onChange: setScore, size: 36, gap: 8 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[13px] font-medium text-gray-500", children: score === 0 ? "点击星星评分" : score <= 1 ? "不太满意" : score <= 2 ? "一般般" : score <= 3 ? "还不错" : score <= 4 ? "很满意" : "非常棒!" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2.5 text-[13px] font-semibold text-gray-700", children: "选择标签" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: RATING_TAGS.map((tag, i) => {
                  const isSelected = selectedTags.includes(tag);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleTag(tag),
                      className: "flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-200",
                      style: {
                        animationDelay: `${i * 40}ms`,
                        animation: entered ? `tagEnter 300ms ${i * 40}ms both` : void 0,
                        borderColor: isSelected ? "transparent" : "#e5e7eb",
                        background: isSelected ? "linear-gradient(135deg, #e8614d, #d4532e)" : "white",
                        color: isSelected ? "white" : "#4b5563",
                        transform: isSelected ? "scale(1.02)" : "scale(1)"
                      },
                      children: [
                        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
                        tag
                      ]
                    },
                    tag
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-[13px] font-semibold text-gray-700", children: [
                  "说点什么 ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-gray-400", children: "(可选)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    ref: commentRef,
                    value: comment,
                    onChange: (e) => setComment(e.target.value),
                    placeholder: "分享你的旅行体验...",
                    maxLength: 300,
                    rows: 3,
                    className: "w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-[13px] text-gray-700 placeholder-gray-400 outline-none transition-colors focus:border-[#e8614d]/40 focus:bg-white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-right text-[10px] text-gray-400", children: [
                  comment.length,
                  "/300"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSubmit,
                  disabled: score === 0 || submitting,
                  className: "mt-4 flex h-[48px] w-full items-center justify-center rounded-2xl text-[15px] font-bold text-white shadow-lg transition-all duration-200 disabled:opacity-50",
                  style: {
                    background: score > 0 ? "linear-gradient(135deg, #e8614d, #c44a2d)" : "#d1d5db",
                    boxShadow: score > 0 ? "0 8px 24px rgba(212,83,46,0.3)" : "none"
                  },
                  children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" }) : "提交评分"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          @keyframes tagEnter {
            from { opacity: 0; transform: translateY(8px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        ` })
          ]
        }
      )
    }
  );
}
function SuccessView() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center px-6 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-20 w-20 items-center justify-center", children: [
      [0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "absolute h-2 w-2 rounded-full",
          style: {
            background: i % 2 === 0 ? "#F59E0B" : "#e8614d",
            transform: `rotate(${deg}deg) translateY(-32px)`,
            animation: `sparkle 600ms ${i * 60}ms ease-out both`
          }
        },
        deg
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-10 w-10 text-green-500", style: { animation: "scaleIn 400ms ease-out" } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[16px] font-bold text-gray-900", children: "评分成功" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[12px] text-gray-400", children: "感谢你的评价!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes sparkle {
          0% { opacity: 0; transform: rotate(var(--r, 0deg)) translateY(-16px) scale(0); }
          50% { opacity: 1; transform: rotate(var(--r, 0deg)) translateY(-36px) scale(1.2); }
          100% { opacity: 0; transform: rotate(var(--r, 0deg)) translateY(-48px) scale(0); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      ` })
  ] });
}
function tempColor(temp) {
  if (temp >= 35) return "text-red-500";
  if (temp >= 28) return "text-orange-500";
  if (temp >= 22) return "text-amber-500";
  if (temp >= 15) return "text-yellow-600";
  if (temp >= 8) return "text-emerald-500";
  if (temp >= 0) return "text-sky-500";
  return "text-blue-500";
}
function tempBgGradient(tempMax) {
  if (tempMax >= 35) return "from-red-50/80 to-orange-50/60";
  if (tempMax >= 28) return "from-orange-50/80 to-amber-50/60";
  if (tempMax >= 22) return "from-amber-50/80 to-yellow-50/60";
  if (tempMax >= 15) return "from-emerald-50/80 to-green-50/60";
  if (tempMax >= 8) return "from-sky-50/80 to-blue-50/60";
  return "from-blue-50/80 to-indigo-50/60";
}
function sectionBg(avgTemp) {
  if (avgTemp >= 28) return "from-amber-100/30 via-orange-50/20 to-rose-50/10";
  if (avgTemp >= 18) return "from-sky-100/30 via-emerald-50/20 to-amber-50/10";
  return "from-slate-100/30 via-blue-50/20 to-indigo-50/10";
}
function WeatherForecast({
  lat,
  lng,
  className = ""
}) {
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/weather?lat=${lat}&lng=${lng}&days=7`).then((r) => {
      if (!r.ok) throw new Error("获取天气失败");
      return r.json();
    }).then((json) => {
      if (!cancelled) {
        setData(json);
        setLoading(false);
      }
    }).catch((err) => {
      if (!cancelled) {
        setError(err instanceof Error ? err.message : "未知错误");
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [lat, lng]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl bg-white/60 backdrop-blur-sm p-4 shadow-sm ${className}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 rounded-full bg-slate-200 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-20 rounded bg-slate-200 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2.5 overflow-hidden", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[120px] w-[88px] shrink-0 rounded-xl bg-slate-100 animate-pulse" }, i)) })
    ] });
  }
  if (error || !data || data.days.length === 0) {
    return null;
  }
  const avgTemp = data.days.reduce((s, d) => s + (d.tempMax + d.tempMin) / 2, 0) / data.days.length;
  const todayClothing = data.days[0]?.clothingSuggestion;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl bg-gradient-to-br ${sectionBg(avgTemp)} backdrop-blur-sm p-3.5 shadow-sm border border-white/40 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[16px]", children: data.days[0]?.weatherEmoji ?? "🌤️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[13px] font-bold text-slate-800", children: "7日天气预报" }),
          todayClothing && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-500 mt-0.5", children: [
            "👔 ",
            todayClothing
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-400", children: "Open-Meteo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1", children: data.days.map((day, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `shrink-0 rounded-xl bg-gradient-to-b ${tempBgGradient(day.tempMax)} backdrop-blur-md border border-white/50 px-3 py-2.5 shadow-sm transition-all`,
        style: {
          minWidth: 78,
          animationDelay: `${i * 80}ms`,
          animation: "fadeInUp 400ms ease-out both"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-center text-[11px] font-bold ${i === 0 ? "text-primary" : "text-slate-600"}`, children: day.dayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[24px] leading-[32px] mt-0.5", children: day.weatherEmoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-baseline justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[15px] font-extrabold ${tempColor(day.tempMax)}`, children: [
              day.tempMax,
              "°"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-slate-400", children: [
              day.tempMin,
              "°"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-center text-[9px] text-slate-500 truncate", children: day.weatherDesc }),
          day.precipProb > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px]", children: "💧" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[9px] font-medium ${day.precipProb >= 50 ? "text-blue-500" : "text-blue-400/70"}`, children: [
              day.precipProb,
              "%"
            ] })
          ] })
        ]
      },
      day.date
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      ` })
  ] });
}
const categoryConfig = {
  景点: {
    icon: MapPin,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  美食: {
    icon: Utensils,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  购物: {
    icon: MapPin,
    color: "text-pink-600",
    bg: "bg-pink-50"
  },
  住宿: {
    icon: Hotel,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  休闲: {
    icon: MapPin,
    color: "text-[#d4532e]",
    bg: "bg-orange-50"
  }
};
const currencyPatterns = [[/\$|美元|USD/i, "$"], [/€|欧元|EUR/i, "€"], [/£|英镑|GBP/i, "£"], [/日元|JPY|円/i, "¥(JPY)"], [/韩元|KRW|원/i, "₩"], [/泰铢|THB|฿/i, "฿"], [/AED|迪拉姆/i, "AED "], [/AUD|澳元|AU\$/i, "A$"], [/新元|SGD|S\$/i, "S$"], [/ISK|冰岛克朗/i, "ISK "], [/里拉|TL|TRY/i, "₺"], [/卢比|INR|Rs|尼泊尔卢比|NPR/i, "₹"], [/比索|PHP|MXN/i, "MXN "], [/索尔|PEN/i, "PEN "], [/雷亚尔|BRL|R\$/i, "R$"], [/¥|元|人民币|RMB|CNY/i, "¥"]];
const countryToCurrency = {
  日本: "JPY ",
  japan: "JPY ",
  韩国: "₩",
  "south korea": "₩",
  korea: "₩",
  泰国: "฿",
  thailand: "฿",
  中国: "¥",
  china: "¥",
  美国: "$",
  "united states": "$",
  usa: "$",
  法国: "€",
  france: "€",
  德国: "€",
  germany: "€",
  意大利: "€",
  italy: "€",
  西班牙: "€",
  spain: "€",
  英国: "£",
  "united kingdom": "£",
  uk: "£",
  新加坡: "S$",
  singapore: "S$",
  澳大利亚: "A$",
  australia: "A$",
  菲律宾: "₱",
  philippines: "₱"
};
function detectCurrency(price, country) {
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
function parsePrice(price) {
  if (!price) return 0;
  const rangeMatch = price.match(/([\d,]+)\s*[-~]\s*([\d,]+)/);
  if (rangeMatch) {
    const lo = Number(rangeMatch[1].replace(/,/g, ""));
    const hi = Number(rangeMatch[2].replace(/,/g, ""));
    return Math.round((lo + hi) / 2);
  }
  const match = price.match(/[\d,]+/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}
function formatCurrency(n, sym = "¥") {
  const display = sym.replace("(JPY)", "").trim();
  const isJPY = sym.includes("JPY") || sym.includes("(JPY)");
  if (isJPY) {
    if (n >= 1e4) return `¥${(n / 1e4).toFixed(1)}万(JPY)`;
    return `¥${n.toLocaleString()}(JPY)`;
  }
  if (sym === "¥" && n >= 1e4) return `${display}${(n / 1e4).toFixed(1)}万`;
  if (sym === "₩" && n >= 1e4) return `${display}${(n / 1e4).toFixed(1)}만`;
  return `${display}${n.toLocaleString()}`;
}
function dayBudget(spots, country) {
  const breakdown = {};
  let total = 0;
  let currency = country ? countryToCurrency[country.toLowerCase()] ?? countryToCurrency[country] ?? "¥" : "¥";
  let detected = false;
  for (const s of spots) {
    const p = parsePrice(s.price);
    if (p > 0) {
      if (!detected) {
        currency = detectCurrency(s.price, country);
        detected = true;
      }
      const cat = s.category ?? "其他";
      breakdown[cat] = (breakdown[cat] ?? 0) + p;
      total += p;
    }
  }
  return {
    total,
    breakdown,
    currency
  };
}
function travelMinutesFallback(a, b) {
  if (a.lat == null || a.lng == null || b.lat == null || b.lng == null) return null;
  const km = Math.hypot((a.lat - b.lat) * 111, (a.lng - b.lng) * 111 * Math.cos(a.lat * Math.PI / 180));
  return Math.max(3, Math.min(90, Math.round(km / 30 * 60)));
}
function formatDistance(meters) {
  if (meters >= 1e3) return `${(meters / 1e3).toFixed(1)}km`;
  return `${meters}m`;
}
function formatDuration(seconds) {
  const mins = Math.round(seconds / 60);
  if (mins >= 60) return `${Math.floor(mins / 60)}h${mins % 60 > 0 ? `${mins % 60}min` : ""}`;
  return `${mins} 分钟`;
}
const modeLabel = {
  driving: "驾车",
  walking: "步行",
  transit: "公交"
};
function isValidImageUrl(url) {
  return !!url && !url.includes("source.unsplash.com");
}
function spotImageUrl(spot) {
  if (isValidImageUrl(spot.image)) return spot.image;
  const cat = spot.category ?? "";
  const q = cat && ["美食", "购物", "住宿"].includes(cat) ? `${spot.title} ${cat}` : spot.title;
  return `/api/spot-image?q=${encodeURIComponent(q)}`;
}
function Trip() {
  const {
    id,
    focus,
    edit
  } = Route.useSearch();
  const {
    data: trip,
    isLoading
  } = useTripQuery(id);
  const actions = useTripActions();
  const [editing, setEditing] = reactExports.useState(edit === "1");
  const [activeDay, setActiveDay] = reactExports.useState(null);
  const [selectedSpot, setSelectedSpot] = reactExports.useState(null);
  const [detailSpot, setDetailSpot] = reactExports.useState(null);
  const [showBudget, setShowBudget] = reactExports.useState(false);
  const [showRating, setShowRating] = reactExports.useState(false);
  const [ratingKey, setRatingKey] = reactExports.useState(0);
  const [checkinKey, setCheckinKey] = reactExports.useState(0);
  const mapHandleRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (focus === "map") {
      setActiveDay(null);
      setSelectedSpot(null);
      mapHandleRef.current?.focusDay(null);
      mapHandleRef.current?.highlightSpot(null);
    }
  }, [focus]);
  const handleDayClick = reactExports.useCallback((dayIdx) => {
    setActiveDay((prev) => {
      const next = prev === dayIdx ? null : dayIdx;
      mapHandleRef.current?.focusDay(next);
      return next;
    });
    setSelectedSpot(null);
    mapHandleRef.current?.highlightSpot(null);
  }, []);
  const handleSpotClickFromList = reactExports.useCallback((spot, dayIndex) => {
    setSelectedSpot((prev) => {
      if (prev?.spot.id === spot.id) {
        mapHandleRef.current?.highlightSpot(null);
        return null;
      }
      mapHandleRef.current?.highlightSpot(spot.id);
      return {
        spot,
        dayIndex
      };
    });
    if (activeDay !== dayIndex) {
      setActiveDay(dayIndex);
      mapHandleRef.current?.focusDay(dayIndex);
    }
  }, [activeDay]);
  const handleMapSpotClick = reactExports.useCallback((spot, dayIndex) => {
    setSelectedSpot({
      spot,
      dayIndex
    });
    mapHandleRef.current?.highlightSpot(spot.id);
    if (activeDay !== dayIndex) {
      setActiveDay(dayIndex);
      mapHandleRef.current?.focusDay(dayIndex);
    }
  }, [activeDay]);
  const weatherCoords = reactExports.useMemo(() => {
    for (const day of trip?.days ?? []) {
      for (const spot of day.spots) {
        if (spot.lat != null && spot.lng != null) {
          return {
            lat: spot.lat,
            lng: spot.lng
          };
        }
      }
    }
    return null;
  }, [trip?.days]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { text: "正在加载行程..." });
  if (!trip) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Centered, { text: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "行程不存在 ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/my-trips", className: "text-primary", children: "返回" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell pb-20", style: {
    background: "var(--gradient-soft)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative flex items-center justify-center px-5 pb-1.5 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/my-trips", className: "pressable absolute left-5 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mx-14 truncate text-center text-[15px] font-bold", children: trip.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-5 flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void actions.toggleFavorite(trip.id), "aria-label": "收藏", className: "pressable flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-5 w-5 ${trip.favorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/share", search: {
          id: trip.id
        }, "aria-label": "分享", className: "pressable flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowRating(true), "aria-label": "评分", className: "pressable flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-amber-500", fill: "#f59e0b" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing((v) => !v), className: `pressable flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ${editing ? "text-primary" : ""}`, "aria-label": "编辑", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-5 w-5" }) })
      ] })
    ] }),
    (trip.summary || trip.mood || trip.budgetLevel || trip.travelType) && /* @__PURE__ */ jsxRuntimeExports.jsx(TripMetaBar, { trip }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-3 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RatingSummary, { routeId: trip.id }) }, ratingKey),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TripProgressBar, { tripId: trip.id, days: trip.days, refreshKey: checkinKey }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20", style: {
      background: "var(--background)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TripMapView, { ref: mapHandleRef, tripId: trip.id, days: trip.days, height: "h-[36vh]", className: "shadow-[var(--shadow-card)]", onSpotClick: handleMapSpotClick }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-scrollbar mt-1.5 flex items-center gap-1.5 overflow-x-auto px-3 pb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setActiveDay(null);
          setSelectedSpot(null);
          mapHandleRef.current?.focusDay(null);
          mapHandleRef.current?.highlightSpot(null);
        }, className: `pressable shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap ${activeDay === null ? "bg-primary text-primary-foreground shadow-md" : "bg-card text-muted-foreground shadow-sm"}`, children: [
          "全部 (",
          trip.days.reduce((n, d) => n + d.spots.length, 0),
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowBudget(true), className: "pressable flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 shadow-sm whitespace-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3 w-3" }),
          "预算"
        ] }),
        trip.days.map((day, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDayClick(idx), className: `pressable shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap max-w-[160px] truncate ${activeDay === idx ? "text-white shadow-md" : "bg-card text-muted-foreground shadow-sm"}`, style: activeDay === idx ? {
          background: DAY_COLORS[idx % DAY_COLORS.length]
        } : void 0, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle", style: {
            background: DAY_COLORS[idx % DAY_COLORS.length]
          } }),
          day.label,
          day.route ? `: ${day.route}` : ""
        ] }, day.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryFilterTabs, { days: trip.days }),
      selectedSpot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SpotDetailPopup, { spot: selectedSpot.spot, dayColor: DAY_COLORS[selectedSpot.dayIndex % DAY_COLORS.length], onClose: () => {
        setSelectedSpot(null);
        mapHandleRef.current?.highlightSpot(null);
      }, onDetail: () => setDetailSpot(selectedSpot.spot) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-gradient-to-b from-[var(--background)] to-transparent shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]" })
    ] }),
    weatherCoords && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherForecast, { lat: weatherCoords.lat, lng: weatherCoords.lng }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-0.5 space-y-2 px-3 pb-2", children: trip.days.map((day, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(DaySection, { tripId: trip.id, day, dayIndex: idx, editing, isActive: activeDay === null || activeDay === idx, selectedSpotId: selectedSpot?.spot.id ?? null, onSpotClick: handleSpotClickFromList, onDetail: setDetailSpot, onCheckedIn: () => setCheckinKey((k) => k + 1) }, day.id)) }),
    detailSpot && /* @__PURE__ */ jsxRuntimeExports.jsx(SpotModal, { spot: detailSpot, onClose: () => setDetailSpot(null) }),
    showBudget && /* @__PURE__ */ jsxRuntimeExports.jsx(BudgetPopup, { days: trip.days, country: trip.country, onClose: () => setShowBudget(false) }),
    showRating && /* @__PURE__ */ jsxRuntimeExports.jsx(RatingModal, { routeId: trip.id, routeName: trip.name, onClose: () => setShowRating(false), onSubmitted: () => setRatingKey((k) => k + 1) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing((v) => !v), className: `fixed bottom-24 right-5 z-30 flex items-center gap-2 rounded-full px-5 py-3 font-bold text-white shadow-lg transition-all active:scale-95 ${editing ? "bg-gradient-to-r from-emerald-500 to-green-500 shadow-emerald-200" : "bg-gradient-to-r from-[#d4532e] to-[#e8614d] shadow-[#e8614d]/30"}`, style: {
      animation: editing ? "none" : "fabFloat 3s ease-in-out infinite"
    }, children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4.5 w-4.5", strokeWidth: 2.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px]", children: "完成编辑" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px]", children: "编辑行程" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes fabFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
function CategoryFilterTabs({
  days
}) {
  const categoryCounts = reactExports.useMemo(() => {
    const counts = {};
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar flex items-center gap-1.5 overflow-x-auto px-3 pb-1.5", children: cats.map((cat) => {
    const count = categoryCounts[cat] ?? 0;
    if (count === 0) return null;
    const cfg = categoryConfig[cat] ?? categoryConfig["景点"];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `shrink-0 rounded-full px-2.5 py-[3px] text-[10px] font-bold whitespace-nowrap ${cfg.bg} ${cfg.color}`, children: [
      cat,
      " ",
      count
    ] }, cat);
  }) });
}
const budgetLabel = {
  low: "经济",
  medium: "舒适",
  high: "高品质"
};
const typeLabel = {
  solo: "独行",
  couple: "情侣",
  family: "家庭",
  friends: "朋友"
};
const paceLabel = {
  relaxed: "慢节奏",
  normal: "适中",
  fast: "暴走"
};
function TripMetaBar({
  trip
}) {
  const tripCover = trip.coverUrl || coverUrl(trip.cover, trip.country, trip.destination);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-3 mb-2 overflow-hidden rounded-2xl bg-white px-3.5 py-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      trip.summary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-3 text-[12px] leading-[18px] text-slate-600", children: trip.summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5", children: [
        trip.destination && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-0.5 inline h-2.5 w-2.5" }),
          trip.city || trip.destination
        ] }),
        trip.budgetLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "mr-0.5 inline h-2.5 w-2.5" }),
          budgetLabel[trip.budgetLevel] || trip.budgetLevel
        ] }),
        trip.travelType && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-medium text-pink-700", children: typeLabel[trip.travelType] || trip.travelType }),
        trip.pace && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700", children: paceLabel[trip.pace] || trip.pace }),
        trip.mood && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-[#d4532e]", children: trip.mood }),
        trip.sourceRouteId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 rounded-full bg-gradient-to-r from-orange-50 to-pink-50 px-2 py-0.5 text-[10px] font-medium text-[#d4532e]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-2.5 w-2.5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "3", x2: "6", y2: "15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "18", cy: "6", r: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6", cy: "18", r: "3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 9a9 9 0 0 1-9 9" })
          ] }),
          "基于路线定制"
        ] })
      ] }),
      trip.tags && trip.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: trip.tags.slice(0, 5).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-bold text-primary/70", children: [
        "#",
        tag
      ] }, tag)) })
    ] }),
    tripCover && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: tripCover, alt: "封面", className: "h-[88px] w-[88px] rounded-2xl object-cover shadow-md", loading: "lazy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-medium text-primary", children: "查看攻略 →" })
    ] })
  ] }) });
}
function spotSearchQuery(spot) {
  const cat = spot.category ?? "";
  if (["美食", "购物", "住宿"].includes(cat)) return `${spot.title} ${cat}`;
  return spot.title;
}
function SpotModal({
  spot,
  onClose
}) {
  const searchQuery = reactExports.useMemo(() => spotSearchQuery(spot), [spot]);
  const [gallery, setGallery] = reactExports.useState([spotImageUrl(spot)]);
  reactExports.useEffect(() => {
    let cancelled = false;
    fetch(`/api/spot-images?q=${encodeURIComponent(searchQuery)}&count=6`).then((r) => r.json()).then((urls) => {
      if (!cancelled && Array.isArray(urls) && urls.length > 0) setGallery(urls);
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, [searchQuery]);
  const [entered, setEntered] = reactExports.useState(false);
  const [closing, setClosing] = reactExports.useState(false);
  const [introExpanded, setIntroExpanded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
  }, []);
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 320);
  };
  const config = categoryConfig[spot.category ?? "景点"] ?? categoryConfig["景点"];
  const CatIcon = config.icon;
  const durationText = spot.durationMin ? spot.durationMin >= 60 ? `${Math.floor(spot.durationMin / 60)}小时${spot.durationMin % 60 ? `${spot.durationMin % 60}分钟` : ""}` : `${spot.durationMin}分钟` : null;
  const introText = spot.intro || spot.desc || "";
  const introIsLong = introText.length > 120;
  const reviewData = reactExports.useMemo(() => {
    const positives = [];
    const negatives = [];
    if (spot.rating && spot.rating >= 4) positives.push("整体评分较高，值得一去");
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
    return {
      positives: positives.slice(0, 3),
      negatives: negatives.slice(0, 2)
    };
  }, [spot]);
  const facilities = reactExports.useMemo(() => {
    const list = [];
    const allTags = (spot.tags ?? []).join(" ").toLowerCase();
    if (spot.category === "住宿" || allTags.includes("wifi")) list.push("WiFi");
    if (spot.category === "美食" || spot.category === "住宿") list.push("停车场");
    if (allTags.includes("亲子") || allTags.includes("儿童") || allTags.includes("家庭")) list.push("儿童友好");
    if (spot.category === "住宿") list.push("空调");
    if (spot.payment && spot.payment.length > 1) list.push("多种支付");
    return list;
  }, [spot]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center", style: {
    background: entered && !closing ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
    transition: "background 350ms cubic-bezier(.4,0,.2,1)"
  }, onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md overflow-hidden rounded-t-[28px] shadow-2xl", onClick: (e) => e.stopPropagation(), style: {
    maxHeight: "92vh",
    background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
    transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
    opacity: entered && !closing ? 1 : 0,
    transition: "transform 400ms cubic-bezier(.32,.72,0,1), opacity 300ms ease"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-0 z-10 flex justify-center pt-2.5 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-10 rounded-full bg-white/25" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, className: "absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm active:bg-black/50", "aria-label": "关闭", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto", style: {
      maxHeight: "92vh"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageGallery, { images: gallery, title: spot.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-8 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "flex-1 text-[22px] font-extrabold leading-tight text-white", children: spot.title }),
          spot.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1 rounded-lg bg-amber-500/15 px-2 py-1 text-[13px] font-bold text-amber-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-amber-300" }),
            " ",
            spot.rating
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-2", children: [
          spot.category && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[12px] font-medium text-white/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "h-3 w-3" }),
            " ",
            spot.category
          ] }),
          spot.price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-semibold text-white/70", children: spot.price })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SmartTags, { spot }) }),
        introText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[13px] font-bold text-white/80", children: "地点介绍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-[#e8614d]/20 px-2 py-0.5 text-[10px] font-semibold text-[#e8614d]/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5" }),
              " AI生成"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[13px] leading-6 text-white/70 transition-all duration-300 ${!introExpanded && introIsLong ? "line-clamp-3" : ""}`, children: introText }),
            introIsLong && !introExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-0 left-0 right-0 h-8", style: {
              background: "linear-gradient(transparent, #1a1a2e)"
            } }),
            introIsLong && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIntroExpanded(!introExpanded), className: "mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#e8614d]/80 active:text-[#e8614d]/60", children: introExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "收起 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "展开全文 ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[13px] font-bold text-white/80", children: "真实评价" }),
            spot.xhsUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] text-red-400/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px]", children: "📕" }),
              " 来自小红书"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-emerald-500/15 bg-emerald-500/8 px-3.5 py-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "h-3.5 w-3.5 text-emerald-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-emerald-400", children: "好评" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: reviewData.positives.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1.5 text-[12px] text-emerald-200/80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-emerald-400/60" }),
                p
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-orange-500/15 bg-orange-500/8 px-3.5 py-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "h-3.5 w-3.5 text-orange-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-orange-400", children: "注意" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: reviewData.negatives.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1.5 text-[12px] text-orange-200/80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-orange-400/60" }),
                n
              ] }, i)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          (spot.address || durationText) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 text-[12px] text-white/60", children: [
            spot.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-tight", children: spot.address })
            ] }),
            spot.time && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 shrink-0 text-white/40" }),
              "营业中 · ",
              spot.time
            ] }),
            durationText && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5 shrink-0 text-white/40" }),
              "建议游玩 ",
              durationText
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 shrink-0 text-white/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "暂无电话信息" })
            ] }),
            spot.dpUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: spot.dpUrl, target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 text-blue-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5 shrink-0" }),
              "查看商户主页"
            ] })
          ] }),
          facilities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: facilities.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/60", children: [
            f === "WiFi" && /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "h-2.5 w-2.5" }),
            f
          ] }, f)) })
        ] }),
        spot.payment && spot.payment.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 text-[11px] font-semibold text-white/50", children: "支付方式" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: spot.payment.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300", children: p }, p)) })
        ] }),
        spot.backup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl border border-blue-400/20 bg-blue-400/10 px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-blue-300", children: "☂ 天气备选" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[12px] text-blue-200", children: spot.backup })
        ] }),
        (spot.xhsUrl || spot.dpUrl) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2.5", children: [
          spot.xhsUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: spot.xhsUrl, target: "_blank", rel: "noreferrer", className: "flex items-center gap-1.5 rounded-xl bg-red-500/15 px-3 py-2 text-[11px] font-semibold text-red-300 transition active:scale-[0.97]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px]", children: "📕" }),
            " 小红书攻略"
          ] }),
          spot.dpUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: spot.dpUrl, target: "_blank", rel: "noreferrer", className: "flex items-center gap-1.5 rounded-xl bg-orange-500/15 px-3 py-2 text-[11px] font-semibold text-orange-300 transition active:scale-[0.97]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px]", children: "⭐" }),
            " 大众点评"
          ] })
        ] }),
        spot.tags && spot.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3.5 flex flex-wrap gap-2", children: spot.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-medium text-white/70", children: tag }, tag)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-semibold text-white/50", children: "选择导航" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: amapNavUrl(spot), target: "_blank", rel: "noreferrer", className: "flex flex-1 flex-col items-center gap-1 rounded-2xl bg-blue-500/15 py-3 text-white transition active:scale-[0.97]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-5 w-5 text-blue-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: "高德地图" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: googleMapsNavUrl(spot), target: "_blank", rel: "noreferrer", className: "flex flex-1 flex-col items-center gap-1 rounded-2xl bg-green-500/15 py-3 text-white transition active:scale-[0.97]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-green-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: "Google Maps" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: appleMapsNavUrl(spot), target: "_blank", rel: "noreferrer", className: "flex flex-1 flex-col items-center gap-1 rounded-2xl bg-slate-400/15 py-3 text-white transition active:scale-[0.97]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-slate-300" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: "Apple Maps" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-14 flex-col items-center justify-center gap-1 rounded-2xl bg-white/8 text-white/70 active:bg-white/12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: "收藏" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function SpotDetailPopup({
  spot,
  dayColor,
  onClose,
  onDetail
}) {
  const config = categoryConfig[spot.category ?? "景点"] ?? categoryConfig["景点"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 rounded-xl bg-card px-3 py-2 shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-2.5 w-2.5 shrink-0 rounded-full", style: {
      background: dayColor
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: spot.time }),
        spot.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded px-1 py-0.5 text-[10px] font-medium ${config.bg} ${config.color}`, children: spot.category })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold", children: spot.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onDetail, className: "pressable flex h-6 items-center gap-0.5 rounded-full bg-muted px-2 text-[10px] font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3 w-3" }),
        " 详情"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: amapNavUrl(spot), target: "_blank", rel: "noreferrer", className: "pressable flex h-6 w-6 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3 w-3 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "pressable flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground", "aria-label": "关闭", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
    ] })
  ] }) });
}
function DonutChart({
  segments,
  size = 120
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;
  const r = 42;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: size, height: size, viewBox: "0 0 100 100", className: "shrink-0", children: segments.map((seg, i) => {
    const pct = seg.value / total;
    const dash = pct * c;
    const gap = c - dash;
    const cur = offset;
    offset += dash;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r, fill: "none", strokeWidth: "14", stroke: seg.color, strokeDasharray: `${dash} ${gap}`, strokeDashoffset: -cur, strokeLinecap: "round", transform: "rotate(-90 50 50)" }, i);
  }) });
}
function BudgetPopup({
  days,
  country,
  onClose
}) {
  const [expandedDay, setExpandedDay] = reactExports.useState(null);
  const {
    grandTotal,
    perDay,
    tripCurrency
  } = reactExports.useMemo(() => {
    let grandTotal2 = 0;
    const currencyCount = {};
    const perDay2 = days.map((day) => {
      const b = dayBudget(day.spots, country);
      grandTotal2 += b.total;
      if (b.total > 0) currencyCount[b.currency] = (currencyCount[b.currency] ?? 0) + b.total;
      return {
        label: day.label,
        ...b
      };
    });
    const tripCurrency2 = Object.entries(currencyCount).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "¥";
    return {
      grandTotal: grandTotal2,
      perDay: perDay2,
      tripCurrency: tripCurrency2
    };
  }, [days, country]);
  const catTotals = {};
  for (const d of perDay) {
    for (const [cat, val] of Object.entries(d.breakdown)) {
      catTotals[cat] = (catTotals[cat] ?? 0) + val;
    }
  }
  const catConfig = {
    住宿: {
      color: "#10b981",
      mark: "住",
      bg: "rgba(16,185,129,0.08)"
    },
    美食: {
      color: "#f97316",
      mark: "食",
      bg: "rgba(249,115,22,0.08)"
    },
    休闲: {
      color: "#8b5cf6",
      mark: "闲",
      bg: "rgba(139,92,246,0.08)"
    },
    景点: {
      color: "#3b82f6",
      mark: "景",
      bg: "rgba(59,130,246,0.08)"
    },
    购物: {
      color: "#ec4899",
      mark: "购",
      bg: "rgba(236,72,153,0.08)"
    }
  };
  const dayMarks = ["01", "02", "03", "04", "05", "06", "07"];
  const dayIconColors = ["#3b82f6", "#f97316", "#8b5cf6", "#10b981", "#ec4899", "#06b6d4", "#eab308"];
  const donutSegments = Object.entries(catTotals).map(([cat, val]) => ({
    color: catConfig[cat]?.color ?? "#94a3b8",
    value: val
  }));
  const topCats = Object.entries(catTotals).sort(([, a], [, b]) => b - a).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-t-3xl bg-white pb-6 shadow-2xl", style: {
    maxHeight: "85vh",
    overflowY: "auto"
  }, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-12 rounded-full bg-gray-300" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-gray-900", children: "预算估算" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gray-400", children: "预估行程总花费" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-[#d4532e] px-2 py-0.5 text-[10px] font-bold text-white", children: formatCurrency(grandTotal, tripCurrency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-3 gap-0.5", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-2 rounded-sm bg-[#e8614d]/30" }, i)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "pressable flex h-7 w-7 items-center justify-center rounded-full bg-gray-100", "aria-label": "关闭", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-gray-500" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-2xl bg-gradient-to-r from-gray-50 to-slate-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DonutChart, { segments: donutSegments, size: 100 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-gray-400", children: "总预算" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: formatCurrency(grandTotal, tripCurrency) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gray-500", children: "行程总预算" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[28px] font-extrabold tracking-tight text-gray-900", children: formatCurrency(grandTotal, tripCurrency) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-[11px] text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }),
            " ",
            days.length,
            " 天 · 含餐饮、门票、住宿等"
          ] })
        ] })
      ] }) }),
      grandTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2.5 text-[13px] font-bold text-gray-900", children: "分类占比" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: topCats.map(([cat, val]) => {
          const pct = Math.round(val / grandTotal * 100);
          const cfg = catConfig[cat] ?? {
            color: "#94a3b8",
            mark: "项",
            bg: "rgba(148,163,184,0.08)"
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-100 bg-white p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full text-sm", style: {
                  background: cfg.bg
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-bold", style: {
                  color: cfg.color
                }, children: cfg.mark }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-semibold text-gray-800", children: cat })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full px-1.5 py-0.5 text-[10px] font-bold", style: {
                color: cfg.color,
                background: cfg.bg
              }, children: [
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: {
              width: `${pct}%`,
              background: cfg.color
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[15px] font-bold text-gray-900", children: formatCurrency(val, tripCurrency) })
          ] }, cat);
        }) }),
        Object.entries(catTotals).length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 grid grid-cols-2 gap-2", children: Object.entries(catTotals).sort(([, a], [, b]) => b - a).slice(3).map(([cat, val]) => {
          const pct = Math.round(val / grandTotal * 100);
          const cfg = catConfig[cat] ?? {
            color: "#94a3b8",
            mark: "项",
            bg: "rgba(148,163,184,0.08)"
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold", style: {
              background: cfg.bg,
              color: cfg.color
            }, children: cfg.mark }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-gray-600", children: cat }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold", style: {
                  color: cfg.color
                }, children: [
                  pct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-bold text-gray-900", children: formatCurrency(val, tripCurrency) })
            ] })
          ] }, cat);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2.5 text-[13px] font-bold text-gray-900", children: "每日明细" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: perDay.map((d, idx) => {
          const isExpanded = expandedDay === idx;
          const iconColor = dayIconColors[idx % dayIconColors.length];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setExpandedDay(isExpanded ? null : idx), className: "pressable flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-3 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl text-base", style: {
                  background: `${iconColor}15`
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black tracking-tight", style: {
                  color: iconColor
                }, children: dayMarks[idx % dayMarks.length] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[13px] font-bold", style: {
                    color: iconColor
                  }, children: [
                    "Day ",
                    idx + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gray-400", children: d.label })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] font-bold text-gray-900", children: d.total > 0 ? formatCurrency(d.total, d.currency) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: `h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" }) })
              ] })
            ] }),
            isExpanded && Object.keys(d.breakdown).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 ml-4 space-y-1 rounded-lg bg-gray-50 p-2.5", children: Object.entries(d.breakdown).map(([cat, val]) => {
              const cfg = catConfig[cat] ?? {
                color: "#94a3b8",
                mark: "项",
                bg: "rgba(148,163,184,0.08)"
              };
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[11px] text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold", style: {
                    background: cfg.bg,
                    color: cfg.color
                  }, children: cfg.mark }),
                  " ",
                  cat
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-gray-700", children: formatCurrency(val, d.currency) })
              ] }, cat);
            }) })
          ] }, d.label);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-[11px] text-gray-400", children: "以上为预估费用，实际花费可能因个人消费习惯有所不同哦~" })
      ] })
    ] })
  ] }) });
}
function DaySection({
  tripId,
  day,
  dayIndex,
  editing,
  isActive,
  selectedSpotId,
  onSpotClick,
  onDetail,
  onCheckedIn
}) {
  const actions = useTripActions();
  const dayColor = DAY_COLORS[dayIndex % DAY_COLORS.length];
  const {
    data: travelData
  } = useTravelInfo(tripId, day.id);
  const budget = dayBudget(day.spots);
  const [expanded, setExpanded] = reactExports.useState(false);
  const totalHours = reactExports.useMemo(() => {
    let mins = 0;
    for (const spot of day.spots) {
      mins += spot.durationMin ?? 60;
    }
    return (mins / 60).toFixed(1);
  }, [day.spots]);
  const visibleSpots = expanded || editing ? day.spots : day.spots.slice(0, 3);
  const hasMore = day.spots.length > 3 && !editing;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: isActive ? "" : "hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-white px-3 py-2.5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[12px] font-black text-white", style: {
          background: dayColor
        }, children: dayIndex + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-[13px] font-bold text-slate-800", children: day.label }),
          day.route && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[10px] text-muted-foreground", children: day.route })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
          " ",
          totalHours,
          "h"
        ] }),
        budget.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700", children: formatCurrency(budget.total, budget.currency) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-0 space-y-0 pl-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-[7px] top-2 w-[2px] rounded-full", style: {
        background: dayColor
      } }),
      visibleSpots.map((spot, sIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SpotCard, { tripId, dayId: day.id, dayIndex, spot, editing, dayColor, isSelected: selectedSpotId === spot.id, onSpotClick, onDetail, onCheckedIn }),
        sIdx < visibleSpots.length - 1 && (() => {
          const next = visibleSpots[sIdx + 1];
          const travelKey = `${spot.id}→${next.id}`;
          const info = travelData?.[travelKey];
          const fallbackMins = travelMinutesFallback(spot, next);
          if (info) {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 py-1 pl-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5 text-blue-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-blue-500/80", children: [
                modeLabel[info.mode],
                " ",
                formatDuration(info.duration),
                " · ",
                formatDistance(info.distance)
              ] })
            ] });
          }
          if (fallbackMins) {
            const dist = spot.lat != null && spot.lng != null && next.lat != null && next.lng != null ? Math.round(Math.hypot((spot.lat - next.lat) * 111e3, (spot.lng - next.lng) * 111e3 * Math.cos(spot.lat * Math.PI / 180))) : null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 py-1 pl-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5 text-blue-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-blue-500/80", children: [
                "步行 ",
                fallbackMins,
                "分钟",
                dist ? ` · ${formatDistance(dist)}` : ""
              ] })
            ] });
          }
          return null;
        })()
      ] }, spot.id)),
      day.spots.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-xs text-muted-foreground", children: "这一天还没有安排" })
    ] }),
    hasMore && !expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setExpanded(true), className: "mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-slate-50 py-2 text-[11px] font-medium text-primary", children: [
      "查看全部行程 (",
      day.spots.length,
      " 个地点) ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
    ] }),
    hasMore && expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setExpanded(false), className: "mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-slate-50 py-2 text-[11px] font-medium text-muted-foreground", children: [
      "收起 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 rotate-180" })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx(AddSpotButton, { onAdd: (data) => {
      void actions.addSpot(tripId, day.id, data.title, data.desc);
    } })
  ] });
}
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
  onCheckedIn
}) {
  const actions = useTripActions();
  const config = categoryConfig[spot.category ?? "景点"] ?? categoryConfig["景点"];
  const [editModalOpen, setEditModalOpen] = reactExports.useState(false);
  const imgUrl = spotImageUrl(spot);
  const cardContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex items-start gap-3 py-2 cursor-pointer transition-all active:scale-[0.99] ${isSelected ? "rounded-lg bg-blue-50/50" : ""}`, onClick: () => !editing && onSpotClick(spot, dayIndex), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-[1] flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-[2.5px] border-white", style: {
      background: dayColor,
      boxShadow: `0 0 0 1.5px ${dayColor}60`
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-bold text-slate-700", children: spot.time }),
        spot.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-1.5 py-px text-[9px] font-semibold ${config.bg} ${config.color}`, children: spot.category }),
        spot.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-[10px] text-amber-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-2.5 w-2.5 fill-amber-400" }),
          " ",
          spot.rating
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[13px] font-semibold leading-tight text-slate-900", children: spot.title }),
      spot.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[11px] text-muted-foreground", children: spot.desc }),
      spot.payment && spot.payment.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex flex-wrap gap-1", children: spot.payment.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-emerald-50 px-1.5 py-px text-[8px] font-medium text-emerald-700", children: p }, p)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex flex-wrap items-center gap-2", children: [
        spot.backup && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-blue-500", title: `备选：${spot.backup}`, children: [
          "☂ 备选: ",
          spot.backup
        ] }),
        spot.xhsUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: spot.xhsUrl, target: "_blank", rel: "noreferrer", onClick: (e) => e.stopPropagation(), className: "text-[9px] font-medium text-red-400 hover:underline", children: "小红书" }),
        spot.dpUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: spot.dpUrl, target: "_blank", rel: "noreferrer", onClick: (e) => e.stopPropagation(), className: "text-[9px] font-medium text-orange-400 hover:underline", children: "大众点评" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-end gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imgUrl, alt: spot.title, className: "h-[56px] w-[56px] rounded-lg object-cover shadow-sm", loading: "lazy" }),
      !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: amapNavUrl(spot), target: "_blank", rel: "noreferrer", onClick: (e) => e.stopPropagation(), className: "flex items-center gap-0.5 text-[10px] font-medium text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3 w-3" }),
          " 导航"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckInButton, { tripId, dayId, spotId: spot.id, spotTitle: spot.title, onCheckedIn })
      ] })
    ] })
  ] });
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EditableSpotCard, { spot, dayColor, onDelete: () => void actions.deleteSpot(tripId, dayId, spot.id), onEdit: () => setEditModalOpen(true), children: cardContent }),
      editModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(EditSpotModal, { spot, onSave: (updated) => {
        void actions.updateSpot(tripId, dayId, {
          ...spot,
          ...updated
        });
      }, onClose: () => setEditModalOpen(false) })
    ] });
  }
  return cardContent;
}
function Centered({
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-5 text-sm text-muted-foreground", children: text });
}
export {
  Trip as component
};
