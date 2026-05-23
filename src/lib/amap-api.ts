/**
 * AMap Web Service API — server-side only
 * Geocoding, route planning (driving/walking/transit)
 */

/** Read AMap key from server-side env (never exposed to client) */
function getAmapKey(): string {
  if (typeof process !== "undefined" && process.env?.AMAP_WEB_KEY) {
    return process.env.AMAP_WEB_KEY;
  }
  const env = import.meta.env as Record<string, string | undefined>;
  return env.AMAP_WEB_KEY ?? "";
}

function isLiveRoutePlanningEnabled(): boolean {
  if (typeof process !== "undefined" && process.env?.ENABLE_LIVE_ROUTE_PLANNING) {
    return process.env.ENABLE_LIVE_ROUTE_PLANNING === "true";
  }
  const env = import.meta.env as Record<string, string | undefined>;
  return env.ENABLE_LIVE_ROUTE_PLANNING === "true";
}

/** Geocode using OpenStreetMap Nominatim (works worldwide, free) */
async function nominatimGeocode(query: string): Promise<{ lng: number; lat: number } | null> {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: "1",
  });

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { "User-Agent": "Routey/1.0" },
    });
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (data.length > 0) {
      const lng = parseFloat(data[0].lon);
      const lat = parseFloat(data[0].lat);
      if (!isNaN(lng) && !isNaN(lat)) return { lng, lat };
    }
  } catch {
    // fall through
  }
  return null;
}

/** Geocode a place — tries multiple query strategies for best results */
export async function geocode(
  address: string,
  city?: string,
): Promise<{ lng: number; lat: number } | null> {
  // Build a list of progressively simpler queries
  const queries: string[] = [];

  // 1. Full address as-is (already contains city/country for AI-generated addresses)
  queries.push(address);

  // 2. With city context appended
  if (city) queries.push(`${address}, ${city}`);

  // 3. Extract just the first part (landmark name) + country if present
  const parts = address.split(",").map((s) => s.trim());
  if (parts.length >= 3) {
    // "Landmark, City, Country" → try "Landmark, Country"
    queries.push(`${parts[0]}, ${parts[parts.length - 1]}`);
    // Also just "Landmark City"
    queries.push(`${parts[0]} ${parts[1]}`);
  }

  // 4. Just the landmark name alone
  if (parts.length > 1) queries.push(parts[0]);

  // Deduplicate
  const seen = new Set<string>();
  for (const q of queries) {
    if (seen.has(q)) continue;
    seen.add(q);
    const result = await nominatimGeocode(q);
    if (result) return result;
  }
  return null;
}

import { TTLCache } from "./ttl-cache";

/** In-memory geocode cache to avoid duplicate lookups */
const geocodeCache = new TTLCache<string, { lng: number; lat: number } | null>({
  maxSize: 500,
  ttlMs: 60 * 60 * 1000, // 1 hour
});

/** Batch geocode — fill in missing lat/lng for spots */
export async function batchGeocode(
  spots: Array<{ title: string; lat?: number; lng?: number; city?: string }>,
): Promise<Array<{ title: string; lat?: number; lng?: number }>> {
  const results: Array<{ title: string; lat?: number; lng?: number }> = [];

  for (const spot of spots) {
    if (spot.lat != null && spot.lng != null) {
      results.push(spot);
      continue;
    }

    const cacheKey = `${spot.title}|${spot.city ?? ""}`;
    if (geocodeCache.has(cacheKey)) {
      const cached = geocodeCache.get(cacheKey);
      results.push(cached ? { ...spot, lat: cached.lat, lng: cached.lng } : spot);
      continue;
    }

    const geo = await geocode(spot.title, spot.city);
    geocodeCache.set(cacheKey, geo);
    if (geo) {
      results.push({ ...spot, lat: geo.lat, lng: geo.lng });
    } else {
      /* logged: geocode failed */
      results.push(spot);
    }

    // Nominatim rate limit: 1 req/sec — respect it to avoid 429 errors
    await new Promise((r) => setTimeout(r, 1100));
  }

  return results;
}

/* ─── Route planning ─── */

interface RouteStep {
  instruction: string;
  distance: string;
  duration: string;
  polyline: string; // "lng,lat;lng,lat;..."
}

interface RoutePath {
  distance: string;
  duration: string;
  steps: RouteStep[];
}

interface DrivingResponse {
  status: string;
  route?: { paths: RoutePath[] };
}

interface WalkingResponse {
  status: string;
  route?: { paths: RoutePath[] };
}

interface TransitResponse {
  status: string;
  route?: {
    transits: Array<{
      duration: string;
      distance: string;
      walking_distance: string;
    }>;
  };
}

export type TravelInfo = {
  distance: number; // meters
  duration: number; // seconds
  mode: "driving" | "walking" | "transit";
  polyline?: number[][]; // [[lng,lat], ...] for drawing on the map
};

/** Parse AMap polyline string → [[lng, lat], ...] */
function parsePolyline(steps: RouteStep[]): number[][] {
  const points: number[][] = [];
  for (const step of steps) {
    if (!step.polyline) continue;
    for (const pair of step.polyline.split(";")) {
      const [lng, lat] = pair.split(",").map(Number);
      if (!isNaN(lng) && !isNaN(lat)) points.push([lng, lat]);
    }
  }
  return points;
}

/** Get driving route between two points */
export async function getDrivingRoute(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number },
): Promise<TravelInfo | null> {
  const amapKey = getAmapKey();
  if (!amapKey) return null;
  const params = new URLSearchParams({
    key: amapKey,
    origin: `${origin.lng},${origin.lat}`,
    destination: `${destination.lng},${destination.lat}`,
    output: "JSON",
    strategy: "10",
    extensions: "all", // get polyline in steps
  });

  try {
    const res = await fetch(`https://restapi.amap.com/v3/direction/driving?${params}`);
    const data = (await res.json()) as DrivingResponse;
    if (data.status !== "1" || !data.route?.paths?.length) return null;
    const path = data.route.paths[0];
    return {
      distance: parseInt(path.distance, 10),
      duration: parseInt(path.duration, 10),
      mode: "driving",
      polyline: parsePolyline(path.steps),
    };
  } catch {
    return null;
  }
}

/** Get walking route between two points */
export async function getWalkingRoute(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number },
): Promise<TravelInfo | null> {
  const amapKey = getAmapKey();
  if (!amapKey) return null;
  const params = new URLSearchParams({
    key: amapKey,
    origin: `${origin.lng},${origin.lat}`,
    destination: `${destination.lng},${destination.lat}`,
    output: "JSON",
  });

  try {
    const walkRes = await fetch(`https://restapi.amap.com/v3/direction/walking?${params}`);
    const data = (await walkRes.json()) as WalkingResponse;
    if (data.status !== "1" || !data.route?.paths?.length) return null;
    const path = data.route.paths[0];
    return {
      distance: parseInt(path.distance, 10),
      duration: parseInt(path.duration, 10),
      mode: "walking",
      polyline: parsePolyline(path.steps),
    };
  } catch {
    return null;
  }
}

/** Get transit route between two points */
export async function getTransitRoute(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number },
  city: string = "北京",
): Promise<TravelInfo | null> {
  const amapKey = getAmapKey();
  if (!amapKey) return null;
  const params = new URLSearchParams({
    key: amapKey,
    origin: `${origin.lng},${origin.lat}`,
    destination: `${destination.lng},${destination.lat}`,
    city,
    output: "JSON",
    strategy: "0",
  });

  try {
    const res = await fetch(`https://restapi.amap.com/v3/direction/transit/integrated?${params}`);
    const data = (await res.json()) as TransitResponse;
    if (data.status !== "1" || !data.route?.transits?.length) return null;
    const transit = data.route.transits[0];
    return {
      distance: parseInt(transit.distance, 10),
      duration: parseInt(transit.duration, 10),
      mode: "transit",
    };
  } catch {
    return null;
  }
}

/** Check if coordinates are roughly within China mainland */
function isInChina(coord: { lng: number; lat: number }): boolean {
  return coord.lng >= 73 && coord.lng <= 135 && coord.lat >= 18 && coord.lat <= 54;
}

/** Use OSRM (free, open) for international real-road routing */
/** Use OSRM for real road polyline; fix duration with realistic speeds */
async function getOsrmRoute(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number },
  profile: "foot" | "car" = "foot",
): Promise<TravelInfo | null> {
  // OSRM demo server only has "driving" profile — we use it for the polyline
  // then recalculate duration based on realistic speeds
  const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    const data = (await res.json()) as {
      code: string;
      routes?: Array<{
        distance: number;
        duration: number;
        geometry: { coordinates: number[][] };
      }>;
    };
    if (data.code !== "Ok" || !data.routes?.length) return null;

    const route = data.routes[0];
    const distMeters = Math.round(route.distance);
    const polyline = route.geometry.coordinates.map((c) => [c[0], c[1]]);

    // Calculate realistic duration:
    // Walking: ~5 km/h = 1.39 m/s, Driving: use OSRM's duration (already realistic for cars)
    const isWalking = profile === "foot";
    const duration = isWalking
      ? Math.round(distMeters / 1.39) // walking ~5km/h
      : Math.round(route.duration); // OSRM driving duration is fine

    return {
      distance: distMeters,
      duration,
      mode: isWalking ? "walking" : "driving",
      polyline,
    };
  } catch (err) {
    /* logged: OSRM route failed */
    return null;
  }
}

/** Fallback: Euclidean distance estimate (no polyline) */
function estimateRoute(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number },
): TravelInfo {
  const dlat = (origin.lat - destination.lat) * 111000;
  const dlng = (origin.lng - destination.lng) * 111000 * Math.cos((origin.lat * Math.PI) / 180);
  const distMeters = Math.sqrt(dlat * dlat + dlng * dlng);
  const isWalking = distMeters < 2000;
  const speedMps = isWalking ? 5000 / 3600 : 30000 / 3600;
  const durationSec = Math.round(distMeters / speedMps);
  return {
    distance: Math.round(distMeters * 1.3),
    duration: Math.round(durationSec * 1.3),
    mode: isWalking ? "walking" : "driving",
    polyline: [
      [origin.lng, origin.lat],
      [destination.lng, destination.lat],
    ],
  };
}

/** Smart route: use AMap API for China, OSRM for abroad */
export async function getSmartRoute(
  origin: { lng: number; lat: number },
  destination: { lng: number; lat: number },
): Promise<TravelInfo | null> {
  if (!isLiveRoutePlanningEnabled()) return estimateRoute(origin, destination);

  const dlat = (origin.lat - destination.lat) * 111000;
  const dlng = (origin.lng - destination.lng) * 111000 * Math.cos((origin.lat * Math.PI) / 180);
  const roughDist = Math.sqrt(dlat * dlat + dlng * dlng);
  const isWalking = roughDist < 3000;

  // For Chinese locations, use AMap API
  if (isInChina(origin) && isInChina(destination)) {
    if (isWalking) {
      const walk = await getWalkingRoute(origin, destination);
      if (walk) return walk;
    }
    const drive = await getDrivingRoute(origin, destination);
    if (drive) return drive;
  }

  // For international locations (or AMap failures), use OSRM for real road routing
  const osrm = await getOsrmRoute(origin, destination, isWalking ? "foot" : "car");
  if (osrm) return osrm;

  // Last resort: straight line estimate
  return estimateRoute(origin, destination);
}

/** Get travel info between consecutive spots in a day */
export async function getDayTravelInfo(
  spots: Array<{ lng?: number; lat?: number; id: string }>,
): Promise<Map<string, TravelInfo>> {
  const result = new Map<string, TravelInfo>();

  const tasks: Array<{ fromId: string; toId: string; promise: Promise<TravelInfo | null> }> = [];

  for (let i = 0; i < spots.length - 1; i++) {
    const a = spots[i];
    const b = spots[i + 1];
    if (a.lng == null || a.lat == null || b.lng == null || b.lat == null) continue;

    const key = `${a.id}→${b.id}`;
    tasks.push({
      fromId: a.id,
      toId: b.id,
      promise: getSmartRoute({ lng: a.lng, lat: a.lat }, { lng: b.lng, lat: b.lat }),
    });
  }

  const settled = await Promise.all(tasks.map((t) => t.promise));
  tasks.forEach((task, i) => {
    const info = settled[i];
    if (info) {
      result.set(`${task.fromId}→${task.toId}`, info);
    }
  });

  return result;
}
