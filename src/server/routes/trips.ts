/** Trip CRUD API routes */

import { importPayloadSchema, tripPatchSchema } from "../../lib/api-schemas";
import { optimizeTrip } from "../../lib/tripPlanner";
import { getTripRepository, type PublicRouteFilters } from "../../lib/tripRepository";
import type { Spot } from "../../lib/tripTypes";
import { apiJson, apiError, readJson, touchDay } from "../utils";
import { importJobs, makeJobResponse, createNewJob, processImportJob } from "../services/import-jobs";

export async function handleTripsRoutes(
  pathname: string,
  url: URL,
  request: Request,
  env: unknown,
  ownerId: string,
): Promise<Response | undefined> {
  const repository = await getTripRepository(env);

  // GET /api/trips
  if (pathname === "/api/trips" && request.method === "GET") {
    return apiJson(await repository.listUserTrips(ownerId));
  }

  // GET /api/routes/public
  if (pathname === "/api/routes/public" && request.method === "GET") {
    const filters: PublicRouteFilters = {
      destination: url.searchParams.get("destination") ?? undefined,
      tag: url.searchParams.get("tag") ?? undefined,
      budget: url.searchParams.get("budget") ?? undefined,
      q: url.searchParams.get("q") ?? undefined,
      days: url.searchParams.get("days") ? Number(url.searchParams.get("days")) : undefined,
    };
    return apiJson(await repository.listPublicRoutes(filters), 200, 60);
  }

  // POST /api/imports
  if (pathname === "/api/imports" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = importPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(400, parsed.error.errors[0]?.message ?? "请提供有效的导入类型和内容");
    }
    const { kind, content } = parsed.data;
    const job = createNewJob(kind, content);
    importJobs.set(job.id, job);
    processImportJob(job, env, ownerId).catch((err) => console.error("[Import] Unhandled:", err));
    return apiJson(makeJobResponse(job), 201);
  }

  // GET /api/imports/:id
  const importMatch = pathname.match(/^\/api\/imports\/([^/]+)$/);
  if (importMatch && request.method === "GET") {
    const job = importJobs.get(importMatch[1]);
    return job ? apiJson(makeJobResponse(job)) : apiError(404, "解析任务不存在");
  }

  // GET /api/trips/:id
  const tripMatch = pathname.match(/^\/api\/trips\/([^/]+)$/);
  if (tripMatch && request.method === "GET") {
    const trip = await repository.getTrip(tripMatch[1], ownerId);
    return trip ? apiJson(trip) : apiError(404, "行程不存在");
  }

  // PATCH /api/trips/:id
  if (tripMatch && request.method === "PATCH") {
    return handleTripPatch(tripMatch[1], request, env, ownerId);
  }

  // DELETE /api/trips/:id
  if (tripMatch && request.method === "DELETE") {
    const deleted = await repository.deleteTrip(tripMatch[1], ownerId);
    return deleted ? apiJson({ ok: true }) : apiError(404, "行程不存在");
  }

  // POST /api/trips/:id/publish
  const publishMatch = pathname.match(/^\/api\/trips\/([^/]+)\/publish$/);
  if (publishMatch && request.method === "POST") {
    const trip = await repository.publishTrip(publishMatch[1], ownerId);
    return trip ? apiJson(trip) : apiError(404, "行程不存在");
  }

  // POST /api/routes/:id/save
  const savePublicMatch = pathname.match(/^\/api\/routes\/([^/]+)\/save$/);
  if (savePublicMatch && request.method === "POST") {
    const trip = await repository.savePublicRoute(savePublicMatch[1], ownerId);
    return trip ? apiJson(trip, 201) : apiError(404, "公共路线不存在");
  }

  return undefined;
}

async function handleTripPatch(
  tripId: string,
  request: Request,
  env: unknown,
  ownerId: string,
): Promise<Response> {
  const body = await readJson(request);
  const parsed = tripPatchSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(400, parsed.error.errors[0]?.message ?? "无效的操作");
  }
  const data = parsed.data;
  const repository = await getTripRepository(env);

  const next = await repository.updateTrip(
    tripId,
    (trip) => {
      if (data.action === "toggleFavorite") {
        return { ...trip, favorite: !trip.favorite };
      }

      if (data.action === "regenerate") {
        return optimizeTrip({
          ...trip,
          status: "草稿",
          days: trip.days.map((day) => ({ ...day, spots: [...day.spots].reverse() })),
        });
      }

      if (data.action === "optimizeDay") {
        return optimizeTrip(trip, data.dayId);
      }

      if (data.action === "addSpot") {
        const spot: Spot = {
          id: `s-${Date.now().toString(36)}`,
          time: "12:00",
          title: data.title || "新景点",
          desc: data.desc || "",
          category: "景点",
        };
        return touchDay(trip, data.dayId, (spots) => [...spots, spot]);
      }

      if (data.action === "deleteSpot") {
        return touchDay(trip, data.dayId, (spots) =>
          spots.filter((spot) => spot.id !== data.spotId),
        );
      }

      if (data.action === "updateSpot") {
        const patch = data.spot;
        return touchDay(trip, data.dayId, (spots) =>
          spots.map((spot) => (spot.id === patch.id ? { ...spot, ...patch, id: spot.id } : spot)),
        );
      }

      return trip;
    },
    ownerId,
  );

  return next ? apiJson(next) : apiError(404, "行程不存在");
}
