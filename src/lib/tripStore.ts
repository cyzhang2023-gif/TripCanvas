import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import tokyo from "@/assets/tokyo.jpg";
import japan from "@/assets/dest-japan.jpg";
import korea from "@/assets/dest-korea.jpg";
import thailand from "@/assets/dest-thailand.jpg";
import france from "@/assets/dest-france.jpg";
import mapBg from "@/assets/map-bg.jpg";
import type {
  CoverKey,
  Day,
  DestinationGroup,
  ExploreRoute,
  ImportJob,
  ImportPayload,
  Spot,
  TravelInfo,
  Trip,
} from "./tripTypes";

export type {
  Day,
  DestinationGroup,
  ExploreRoute,
  ImportJob,
  ImportPayload,
  SourceKind,
  Spot,
  TravelInfo,
  Trip,
} from "./tripTypes";

const keys = {
  trips: ["trips"] as const,
  trip: (id: string) => ["trip", id] as const,
  publicRoutes: (filters: string) => ["public-routes", filters] as const,
  job: (id: string) => ["import-job", id] as const,
  explore: (dest: string) => ["explore", dest] as const,
  destinations: ["destinations"] as const,
  travelInfo: (tripId: string, dayId: string) => ["travel-info", tripId, dayId] as const,
  featuredRoutes: ["featured-routes"] as const,
};

const covers: Record<CoverKey, string> = {
  tokyo,
  japan,
  korea,
  thailand,
  france,
  map: mapBg,
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(typeof data.message === "string" ? data.message : "请求失败");
  }

  return response.json() as Promise<T>;
}

function patchTrip(id: string, body: Record<string, unknown>) {
  return api<Trip>(`/api/trips/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function coverUrl(cover: CoverKey) {
  return covers[cover] ?? tokyo;
}

export function mapsUrl(spot: Spot, mode: "navigate" | "view" = "view") {
  const q =
    spot.lat != null && spot.lng != null
      ? `${spot.lat},${spot.lng}`
      : encodeURIComponent(spot.title);
  return mode === "navigate"
    ? `https://www.google.com/maps/dir/?api=1&destination=${q}`
    : `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function useTripsQuery() {
  return useQuery({
    queryKey: keys.trips,
    queryFn: () => api<Trip[]>("/api/trips"),
    staleTime: 10_000,
  });
}

export function useTrips() {
  return useTripsQuery().data ?? [];
}

export function useTripQuery(id: string) {
  return useQuery({
    queryKey: keys.trip(id),
    queryFn: () => api<Trip>(`/api/trips/${id}`),
    enabled: Boolean(id),
    staleTime: 10_000,
  });
}

export function useTrip(id: string) {
  return useTripQuery(id).data;
}

export function useImportJob(id?: string) {
  return useQuery({
    queryKey: keys.job(id ?? "missing"),
    queryFn: () => api<ImportJob>(`/api/imports/${id}`),
    enabled: Boolean(id),
    refetchInterval: 1500,
  });
}

export function useDestinations() {
  return useQuery({
    queryKey: keys.destinations,
    queryFn: () => api<DestinationGroup[]>("/api/destinations"),
    staleTime: 30 * 60_000, // 30 min — images are pre-validated and cached server-side
  });
}

export function useTravelInfo(tripId: string, dayId: string) {
  return useQuery({
    queryKey: keys.travelInfo(tripId, dayId),
    queryFn: () =>
      api<Record<string, TravelInfo>>("/api/travel-info", {
        method: "POST",
        body: JSON.stringify({ tripId, dayId }),
      }),
    enabled: Boolean(tripId && dayId),
    staleTime: 5 * 60_000, // 5 minutes
  });
}

export function useExploreRoutes(dest: string) {
  return useQuery({
    queryKey: keys.explore(dest),
    queryFn: () => api<ExploreRoute[]>(`/api/explore?dest=${encodeURIComponent(dest)}`),
    enabled: Boolean(dest),
    staleTime: 60_000,
  });
}

/** Fetch top n8n-generated routes for homepage featured section */
export type FeaturedRoute = {
  id: number;
  route_title: string;
  city: string;
  country: string;
  destination: string;
  route_theme: string;
  summary: string;
  days_count: number;
  budget_level: string;
  travel_type: string;
  tags: string;
  cover_url: string;
  likes: number;
  quality_score: number;
  created_at: string;
};
export function useFeaturedRoutes() {
  return useQuery({
    queryKey: keys.featuredRoutes,
    queryFn: () => api<FeaturedRoute[]>("/api/n8n-routes?limit=30"),
    staleTime: 5 * 60_000,
  });
}

export function usePublicRoutes(filters: Record<string, string | number | undefined> = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && String(value).trim()) params.set(key, String(value));
  });
  const query = params.toString();

  return useQuery({
    queryKey: keys.publicRoutes(query),
    queryFn: () => api<Trip[]>(`/api/routes/public${query ? `?${query}` : ""}`),
    staleTime: 60_000,
  });
}

export function useTripActions() {
  const queryClient = useQueryClient();

  return useMemo(() => {
    const syncTrip = async (request: Promise<Trip>) => {
      const trip = await request;
      queryClient.setQueryData(keys.trip(trip.id), trip);
      await queryClient.invalidateQueries({ queryKey: keys.trips });
      return trip;
    };

    return {
      async createImport(payload: ImportPayload) {
        const job = await api<ImportJob>("/api/imports", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        await queryClient.invalidateQueries({ queryKey: keys.trips });
        return job;
      },
      toggleFavorite: (id: string) => syncTrip(patchTrip(id, { action: "toggleFavorite" })),
      regenerate: (id: string) => syncTrip(patchTrip(id, { action: "regenerate" })),
      optimizeDay: (tripId: string, dayId: string) =>
        syncTrip(patchTrip(tripId, { action: "optimizeDay", dayId })),
      updateSpot: (tripId: string, dayId: string, spot: Spot) =>
        syncTrip(patchTrip(tripId, { action: "updateSpot", dayId, spot })),
      addSpot: (tripId: string, dayId: string) =>
        syncTrip(patchTrip(tripId, { action: "addSpot", dayId })),
      deleteSpot: (tripId: string, dayId: string, spotId: string) =>
        syncTrip(patchTrip(tripId, { action: "deleteSpot", dayId, spotId })),
      async publishTrip(id: string) {
        const trip = await syncTrip(api<Trip>(`/api/trips/${id}/publish`, { method: "POST" }));
        await queryClient.invalidateQueries({ queryKey: ["public-routes"] });
        return trip;
      },
      async savePublicRoute(routeId: string) {
        const trip = await api<Trip>(`/api/routes/${routeId}/save`, { method: "POST" });
        queryClient.setQueryData(keys.trip(trip.id), trip);
        await queryClient.invalidateQueries({ queryKey: keys.trips });
        return trip;
      },
      async deleteTrip(id: string) {
        await api<{ ok: true }>(`/api/trips/${id}`, { method: "DELETE" });
        queryClient.removeQueries({ queryKey: keys.trip(id) });
        await queryClient.invalidateQueries({ queryKey: keys.trips });
      },
      async addExploreRoute(routeId: string): Promise<Trip | { aiJobId: string; title: string }> {
        const res = await fetch("/api/explore/add", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ routeId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message ?? "添加失败");
        // AI generation case — returns jobId
        if (data.aiJobId) return data as { aiJobId: string; title: string };
        // Direct profile case — returns Trip
        const trip = data as Trip;
        queryClient.setQueryData(keys.trip(trip.id), trip);
        await queryClient.invalidateQueries({ queryKey: keys.trips });
        return trip;
      },
    };
  }, [queryClient]);
}
