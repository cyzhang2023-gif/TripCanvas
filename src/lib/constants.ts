/**
 * Shared constants used across components and pages.
 * Single source of truth — import from here instead of duplicating.
 */

/** Color palette for day indicators on maps and timelines */
export const DAY_COLORS = [
  "#003580",
  "#e85d04",
  "#9b59b6",
  "#27ae60",
  "#e74c3c",
  "#0ea5e9",
  "#d97706",
  "#6366f1",
  "#14b8a6",
  "#f43f5e",
] as const;

/** Category display config for spots */
export const CATEGORY_CONFIG: Record<
  string,
  { color: string; bg: string }
> = {
  景点: { color: "text-blue-600", bg: "bg-blue-50" },
  美食: { color: "text-orange-600", bg: "bg-orange-50" },
  购物: { color: "text-pink-600", bg: "bg-pink-50" },
  住宿: { color: "text-emerald-600", bg: "bg-emerald-50" },
  休闲: { color: "text-[#d4532e]", bg: "bg-[#fff0ed]" },
};
