import type { RouteRating, RouteRatingStats } from "./tripTypes";

const STORAGE_KEY = "routey-ratings";

export const RATING_TAGS = [
  "风景绝佳",
  "性价比高",
  "适合亲子",
  "美食丰富",
  "交通便利",
  "文化体验",
  "浪漫氛围",
  "冒险刺激",
  "休闲放松",
  "拍照圣地",
] as const;

function loadRatings(): RouteRating[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RouteRating[]) : [];
  } catch {
    return [];
  }
}

function saveRatings(ratings: RouteRating[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
}

function generateId(): string {
  return `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getOwnerId(): string {
  let id = localStorage.getItem("routey-owner-id");
  if (!id) {
    id = `owner_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem("routey-owner-id", id);
  }
  return id;
}

export function addRating(
  routeId: string,
  score: number,
  tags: string[],
  comment?: string,
): RouteRating {
  const ratings = loadRatings();
  const ownerId = getOwnerId();
  const rating: RouteRating = {
    id: generateId(),
    routeId,
    score: Math.max(1, Math.min(5, Math.round(score * 2) / 2)), // clamp 1-5 half-step
    tags,
    comment: comment?.trim() || undefined,
    createdAt: new Date().toISOString(),
    ownerId,
  };
  ratings.push(rating);
  saveRatings(ratings);
  return rating;
}

export function getRatings(routeId: string): RouteRating[] {
  return loadRatings().filter((r) => r.routeId === routeId);
}

export function getRatingStats(routeId: string): RouteRatingStats {
  const ratings = getRatings(routeId);
  if (ratings.length === 0) {
    return { routeId, averageScore: 0, totalRatings: 0, tagCounts: {} };
  }
  const total = ratings.reduce((sum, r) => sum + r.score, 0);
  const tagCounts: Record<string, number> = {};
  for (const r of ratings) {
    for (const tag of r.tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }
  return {
    routeId,
    averageScore: Math.round((total / ratings.length) * 10) / 10,
    totalRatings: ratings.length,
    tagCounts,
  };
}

export function hasUserRated(routeId: string): boolean {
  const ownerId = getOwnerId();
  return loadRatings().some((r) => r.routeId === routeId && r.ownerId === ownerId);
}
