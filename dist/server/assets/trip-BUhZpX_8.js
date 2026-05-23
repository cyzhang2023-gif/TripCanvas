import { r as reactExports, V as jsxRuntimeExports } from "./server-0CXOUeYX.js";
import { R as Route, L as Link } from "./router-C4teJ7Oq.js";
import { B as BottomNav, P as Plus } from "./BottomNav-Bjvl5Wfi.js";
import { u as useTripQuery, a as useTripActions, c as coverUrl, b as useTravelInfo } from "./tripStore-YDHZIwB5.js";
import { C as ChevronLeft } from "./chevron-left-7A3NdEFE.js";
import { H as Heart } from "./heart-CWnt7c0s.js";
import { S as Share2 } from "./share-2-DiaiK3hf.js";
import { C as Check } from "./check-BfF48kaj.js";
import { P as Pencil, X } from "./x-CO_Fedjt.js";
import { W as Wallet } from "./wallet-MGZgLSrP.js";
import { M as MapPin } from "./map-pin-C1ipS1UM.js";
import { H as Hotel } from "./hotel-BZ3qWaTQ.js";
import { U as Utensils } from "./utensils-DgZNS74c.js";
import { c as createLucideIcon } from "./createLucideIcon-6d7O46wd.js";
import { C as Clock } from "./clock-CrmUMfhO.js";
import { C as ChevronDown } from "./chevron-down-IP5JteOE.js";
import { S as Star } from "./star-Cvw177s8.js";
import { C as CalendarDays } from "./calendar-days-B11AtnEK.js";
import { T as Trash2 } from "./trash-2-BMVVKlNg.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-CK2K-e3H.js";
import "node:events";
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
const __iconNode = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode);
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
      import("./maplibre-gl-CQpiMQtY.js").then((n) => n.m),
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
    color: "text-violet-600",
    bg: "bg-violet-50"
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
    focus
  } = Route.useSearch();
  const {
    data: trip,
    isLoading
  } = useTripQuery(id);
  const actions = useTripActions();
  const [editing, setEditing] = reactExports.useState(false);
  const [activeDay, setActiveDay] = reactExports.useState(null);
  const [selectedSpot, setSelectedSpot] = reactExports.useState(null);
  const [detailSpot, setDetailSpot] = reactExports.useState(null);
  const [showBudget, setShowBudget] = reactExports.useState(false);
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing((v) => !v), className: `pressable flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ${editing ? "text-primary" : ""}`, "aria-label": "编辑", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-5 w-5" }) })
      ] })
    ] }),
    (trip.summary || trip.mood || trip.budgetLevel || trip.travelType) && /* @__PURE__ */ jsxRuntimeExports.jsx(TripMetaBar, { trip }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-0.5 space-y-2 px-3 pb-2", children: trip.days.map((day, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(DaySection, { tripId: trip.id, day, dayIndex: idx, editing, isActive: activeDay === null || activeDay === idx, selectedSpotId: selectedSpot?.spot.id ?? null, onSpotClick: handleSpotClickFromList, onDetail: setDetailSpot }, day.id)) }),
    detailSpot && /* @__PURE__ */ jsxRuntimeExports.jsx(SpotModal, { spot: detailSpot, onClose: () => setDetailSpot(null) }),
    showBudget && /* @__PURE__ */ jsxRuntimeExports.jsx(BudgetPopup, { days: trip.days, country: trip.country, onClose: () => setShowBudget(false) }),
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
        trip.mood && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700", children: trip.mood })
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
  const [heroIdx, setHeroIdx] = reactExports.useState(0);
  const [entered, setEntered] = reactExports.useState(false);
  const [closing, setClosing] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center", style: {
    background: entered && !closing ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
    transition: "background 350ms cubic-bezier(.4,0,.2,1)"
  }, onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md overflow-hidden rounded-t-[28px] shadow-2xl", onClick: (e) => e.stopPropagation(), style: {
    maxHeight: "88vh",
    background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
    transform: entered && !closing ? "translateY(0)" : "translateY(100%)",
    opacity: entered && !closing ? 1 : 0,
    transition: "transform 400ms cubic-bezier(.32,.72,0,1), opacity 300ms ease"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", style: {
      height: "38vh"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gallery[heroIdx], alt: spot.title, className: "h-full w-full object-cover animate-[fadeIn_300ms_ease]", loading: "eager" }, heroIdx),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.15) 40%, rgba(26,26,46,0.85) 85%, rgba(26,26,46,1) 100%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, className: "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm active:bg-black/50", "aria-label": "关闭", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-14 left-5 flex flex-wrap items-center gap-2", children: [
        spot.category && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "h-3 w-3" }),
          " ",
          spot.category
        ] }),
        spot.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[13px] font-bold text-amber-300 drop-shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-amber-300" }),
          " ",
          spot.rating
        ] }),
        spot.price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-semibold text-white/90 drop-shadow-lg", children: spot.price })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto px-5 pb-6", style: {
      maxHeight: "calc(88vh - 38vh)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[22px] font-extrabold leading-tight text-white", children: spot.title }),
      spot.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[13px] leading-relaxed text-white/60", children: spot.desc }),
      spot.intro && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[13px] leading-6 text-white/75", children: spot.intro }),
      (spot.address || durationText) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/50", children: [
        spot.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-start gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-3 w-3 shrink-0 text-white/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-tight", children: spot.address })
        ] }),
        spot.time && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 shrink-0 text-white/40" }),
          "营业中 · ",
          spot.time
        ] }),
        durationText && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3 w-3 shrink-0 text-white/40" }),
          "步行",
          durationText
        ] })
      ] }),
      spot.tags && spot.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3.5 flex flex-wrap gap-2", children: spot.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-medium text-white/70", children: tag }, tag)) }),
      spot.payment && spot.payment.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5", children: [
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
      gallery.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-scrollbar -mx-5 mt-4 flex gap-2.5 overflow-x-auto px-5", children: gallery.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setHeroIdx(i), className: `relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl transition-all ${heroIdx === i ? "ring-2 ring-white/80 ring-offset-2 ring-offset-[#1a1a2e]" : "opacity-70 hover:opacity-100"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: `${spot.title} ${i + 1}`, className: "h-full w-full object-cover", loading: "lazy", style: {
        background: "rgba(255,255,255,0.06)"
      } }) }, i)) }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-violet-700 px-2 py-0.5 text-[10px] font-bold text-white", children: formatCurrency(grandTotal, tripCurrency) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-3 gap-0.5", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-2 rounded-sm bg-violet-300" }, i)) })
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2.5", children: [
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
  onDetail
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(SpotCard, { tripId, dayId: day.id, dayIndex, spot, editing, dayColor, isSelected: selectedSpotId === spot.id, onSpotClick, onDetail }),
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
    editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void actions.addSpot(tripId, day.id), className: "mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-primary/30 py-1.5 text-xs font-semibold text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
      " 添加地点"
    ] })
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
  onDetail
}) {
  const actions = useTripActions();
  const config = categoryConfig[spot.category ?? "景点"] ?? categoryConfig["景点"];
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SpotCardEditing, { tripId, dayId, spot, dayColor, actions });
  }
  const imgUrl = spotImageUrl(spot);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex items-start gap-3 py-2 cursor-pointer transition-all active:scale-[0.99] ${isSelected ? "rounded-lg bg-blue-50/50" : ""}`, onClick: () => onSpotClick(spot, dayIndex), children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: amapNavUrl(spot), target: "_blank", rel: "noreferrer", onClick: (e) => e.stopPropagation(), className: "flex items-center gap-0.5 text-[10px] font-medium text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3 w-3" }),
        " 导航"
      ] })
    ] })
  ] });
}
function SpotCardEditing({
  tripId,
  dayId,
  spot,
  dayColor,
  actions
}) {
  const [time, setTime] = reactExports.useState(spot.time);
  const [title, setTitle] = reactExports.useState(spot.title);
  const [desc, setDesc] = reactExports.useState(spot.desc);
  const save = () => void actions.updateSpot(tripId, dayId, {
    ...spot,
    time,
    title,
    desc
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center pt-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-3 w-3 rounded-full border-2 border-white", style: {
      background: dayColor,
      boxShadow: `0 0 0 1px ${dayColor}40`
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card p-2.5 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: time, onChange: (e) => setTime(e.target.value), onBlur: save, className: "w-12 rounded border border-border bg-background px-1 py-0.5 text-center text-[11px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), onBlur: save, className: "flex-1 rounded border border-border px-2 py-0.5 text-xs font-semibold outline-none focus:border-primary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: desc, onChange: (e) => setDesc(e.target.value), onBlur: save, className: "mt-1 w-full rounded border border-border px-2 py-0.5 text-[11px] text-muted-foreground outline-none focus:border-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void actions.deleteSpot(tripId, dayId, spot.id), className: "mt-1.5 flex items-center gap-1 text-[11px] text-rose-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
        " 删除"
      ] })
    ] }) })
  ] });
}
function Centered({
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-5 text-sm text-muted-foreground", children: text });
}
export {
  Trip as component
};
