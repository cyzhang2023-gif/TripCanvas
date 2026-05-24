const STORAGE_KEY = "routey-checkins";

export interface CheckIn {
  id: string;
  tripId: string;
  dayId: string;
  spotId: string;
  spotTitle: string;
  photo?: string;
  note?: string;
  checkedAt: string;
  lat?: number;
  lng?: number;
}

function loadCheckins(): CheckIn[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CheckIn[]) : [];
  } catch {
    return [];
  }
}

function saveCheckins(checkins: CheckIn[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkins));
}

function generateId(): string {
  return `ci_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function addCheckin(
  tripId: string,
  dayId: string,
  spotId: string,
  spotTitle: string,
  note?: string,
  photo?: string,
): CheckIn {
  const checkins = loadCheckins();
  const checkin: CheckIn = {
    id: generateId(),
    tripId,
    dayId,
    spotId,
    spotTitle,
    note: note?.trim() || undefined,
    photo: photo || undefined,
    checkedAt: new Date().toISOString(),
  };
  checkins.push(checkin);
  saveCheckins(checkins);
  return checkin;
}

export function getCheckins(tripId: string): CheckIn[] {
  return loadCheckins().filter((c) => c.tripId === tripId);
}

export function getSpotCheckin(tripId: string, spotId: string): CheckIn | undefined {
  return loadCheckins().find((c) => c.tripId === tripId && c.spotId === spotId);
}

export function isSpotCheckedIn(tripId: string, spotId: string): boolean {
  return loadCheckins().some((c) => c.tripId === tripId && c.spotId === spotId);
}

export function getCheckinStats(tripId: string): { total: number; checked: number; percentage: number } {
  // We need to count total spots from the trip data, but since we don't have
  // access to trip data here, we provide checked count and let the caller supply total.
  const checked = getCheckins(tripId).length;
  return { total: 0, checked, percentage: 0 };
}

/**
 * Get check-in stats with a known total spot count.
 * Call this from a component that knows the trip structure.
 */
export function getCheckinStatsWithTotal(
  tripId: string,
  totalSpots: number,
): { total: number; checked: number; percentage: number } {
  const checked = getCheckins(tripId).length;
  return {
    total: totalSpots,
    checked,
    percentage: totalSpots > 0 ? Math.round((checked / totalSpots) * 100) : 0,
  };
}
