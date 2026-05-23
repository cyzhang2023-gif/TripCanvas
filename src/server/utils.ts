import { DEFAULT_OWNER_ID } from "../lib/tripRepository";
import type { Spot, Trip } from "../lib/tripTypes";
import { optimizeDay } from "../lib/tripPlanner";

export function apiJson(data: unknown, status = 200, cacheSeconds = 0): Response {
  const headers: Record<string, string> = { "content-type": "application/json; charset=utf-8" };
  if (cacheSeconds > 0) {
    headers["cache-control"] = `public, max-age=${cacheSeconds}, stale-while-revalidate=${cacheSeconds * 2}`;
  }
  return new Response(JSON.stringify(data), { status, headers });
}

export function apiError(status: number, message: string): Response {
  return apiJson({ message }, status);
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

export function getOwnerId(request: Request): string {
  return request.headers.get("x-routey-user-id")?.trim() || DEFAULT_OWNER_ID;
}

export function touchDay(trip: Trip, dayId: string, updater: (spots: Spot[]) => Spot[]): Trip {
  return {
    ...trip,
    days: trip.days.map((day) => {
      if (day.id !== dayId) return day;
      return optimizeDay({ ...day, spots: updater(day.spots) });
    }),
  };
}
