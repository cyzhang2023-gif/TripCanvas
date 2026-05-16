/**
 * Zod schemas for API request body validation.
 * Validates all user input before passing to business logic.
 */
import { z } from "zod";
import { sourceKinds } from "./tripTypes";

const poiCategories = ["景点", "美食", "购物", "住宿", "休闲"] as const;

/* ─── Import ─── */
export const importPayloadSchema = z.object({
  kind: z.enum(sourceKinds),
  content: z.string().min(2, "请提供有效的导入内容"),
});

/* ─── Trip PATCH actions ─── */
export const tripPatchSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("toggleFavorite") }),
  z.object({ action: z.literal("regenerate") }),
  z.object({ action: z.literal("optimizeDay"), dayId: z.string().min(1) }),
  z.object({
    action: z.literal("addSpot"),
    dayId: z.string().min(1),
    title: z.string().optional(),
    desc: z.string().optional(),
  }),
  z.object({
    action: z.literal("deleteSpot"),
    dayId: z.string().min(1),
    spotId: z.string().min(1),
  }),
  z.object({
    action: z.literal("updateSpot"),
    dayId: z.string().min(1),
    spot: z.object({
      id: z.string().min(1),
      time: z.string().optional(),
      title: z.string().optional(),
      desc: z.string().optional(),
      category: z.enum(poiCategories).optional(),
      lat: z.number().optional(),
      lng: z.number().optional(),
      intro: z.string().optional(),
      rating: z.number().min(0).max(5).optional(),
      price: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  }),
]);

/* ─── Travel info ─── */
export const travelInfoSchema = z.object({
  tripId: z.string().min(1),
  dayId: z.string().min(1),
});

/* ─── Quiz recommendation ─── */
export const quizAnswersSchema = z.object({
  scope: z.enum(["domestic", "international"]),
  styles: z.array(z.string()).min(1),
  days: z.string().min(1),
  travelType: z.string().min(1),
  budget: z.string().min(1),
  season: z.string().min(1),
});

/* ─── Explore add ─── */
export const exploreAddSchema = z.object({
  routeId: z.string().min(1),
});

/* ─── Quiz AI status ─── */
export const quizAiStatusSchema = z.object({
  ids: z.array(z.string()),
});
