export const sourceKinds = ["link", "image", "text", "video"] as const;

export type SourceKind = (typeof sourceKinds)[number];
export type TripStatus = "进行中" | "已完成" | "草稿";
export type TripVisibility =
  | "private_draft"
  | "published_pending"
  | "public"
  | "archived"
  | "rejected";
export type CoverKey = "tokyo" | "japan" | "korea" | "thailand" | "france" | "map";
export type RouteTheme = "citywalk" | "food" | "beach" | "luxury" | "nature" | "shopping" | "culture";
export type BudgetLevel = "low" | "medium" | "high";
export type TravelType = "solo" | "couple" | "family" | "friends";
export type TripPace = "relaxed" | "normal" | "fast";
export type BestTime = "spring" | "summer" | "autumn" | "winter" | "all";
export type PoiCategory = "景点" | "美食" | "购物" | "住宿" | "休闲";

export type RouteSourceReference = {
  title: string;
  publisher: string;
  url: string;
  verifiedAt: string;
};

export type Spot = {
  id: string;
  time: string;
  title: string;
  desc: string;
  lat?: number;
  lng?: number;
  category?: PoiCategory;
  intro?: string;
  rating?: number;
  price?: string;
  image?: string;
  tags?: string[];
  address?: string;
  durationMin?: number;
};

export type Day = {
  id: string;
  label: string;
  route: string;
  spots: Spot[];
};

export type Trip = {
  id: string;
  name: string;
  date: string;
  cover: CoverKey;
  status: TripStatus;
  favorite: boolean;
  days: Day[];
  ownerId?: string;
  visibility?: TripVisibility;
  sourceRouteId?: string;
  publishedAt?: string;
  qualityScore?: number;
  destination?: string;
  country?: string;
  tags?: string[];
  source?: {
    kind: SourceKind;
    title: string;
    url?: string;
    verified?: boolean;
    references?: RouteSourceReference[];
  };
  /* ─── n8n / AI-generated route metadata ─── */
  coverUrl?: string;
  mood?: string;
  summary?: string;
  routeTheme?: RouteTheme;
  budgetLevel?: BudgetLevel;
  travelType?: TravelType;
  pace?: TripPace;
  bestTime?: BestTime;
  likes?: number;
  city?: string;
  daysCount?: number;
};

export type ImportPayload = {
  kind: SourceKind;
  content: string;
};

export type ExploreRoute = {
  id: string;
  title: string;
  days: number;
  spots: number;
  source: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceVerified?: boolean;
  sourceReferences?: RouteSourceReference[];
  qualityScore?: number;
  includes?: PoiCategory[];
  likes: number;
  cover: string;
  tags: string[];
  profileKey: string;
};

export type DestinationInfo = {
  name: string;
  routes: number;
  cover: string;
};

export type DestinationGroup = {
  region: string;
  destinations: DestinationInfo[];
};

export type ImportStep = {
  label: string;
  state: "done" | "active" | "pending";
};

export type ImportJob = {
  id: string;
  kind: SourceKind;
  status: "processing" | "done" | "error";
  progress: number;
  tripId?: string;
  error?: string;
  steps: ImportStep[];
};

export type TravelInfo = {
  distance: number; // meters
  duration: number; // seconds
  mode: "driving" | "walking" | "transit";
  polyline?: number[][]; // [[lng,lat], ...] for map drawing
};
