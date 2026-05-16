import type { TravelInfo } from "./amap-api";
import { getSeedTrips } from "./tripPlanner";
import type { Trip, TripVisibility } from "./tripTypes";

export const DEFAULT_OWNER_ID = "anonymous_user_id";

export type PublicRouteFilters = {
  destination?: string;
  days?: number;
  tag?: string;
  budget?: string;
  q?: string;
};

type TravelInfoMap = Record<string, TravelInfo>;

type RepositoryState = {
  userTrips: Trip[];
  publicRoutes: Trip[];
  routeSegments: Record<string, { data: TravelInfoMap; ts: number }>;
};

export type TripRepository = {
  listUserTrips(ownerId?: string): Promise<Trip[]>;
  getTrip(id: string, ownerId?: string): Promise<Trip | undefined>;
  saveUserTrip(trip: Trip, ownerId?: string): Promise<Trip>;
  updateTrip(
    id: string,
    updater: (trip: Trip) => Trip,
    ownerId?: string,
  ): Promise<Trip | undefined>;
  deleteTrip(id: string, ownerId?: string): Promise<boolean>;
  listPublicRoutes(filters?: PublicRouteFilters): Promise<Trip[]>;
  publishTrip(id: string, ownerId?: string): Promise<Trip | undefined>;
  savePublicRoute(routeId: string, ownerId?: string): Promise<Trip | undefined>;
  getRouteSegments(tripId: string, dayId: string): Promise<TravelInfoMap | undefined>;
  saveRouteSegments(tripId: string, dayId: string, data: TravelInfoMap): Promise<void>;
};

const countryByKeyword: Array<[string, string]> = [
  ["东京", "日本"],
  ["京都", "日本"],
  ["大阪", "日本"],
  ["富士", "日本"],
  ["首尔", "韩国"],
  ["济州", "韩国"],
  ["曼谷", "泰国"],
  ["清迈", "泰国"],
  ["普吉", "泰国"],
  ["巴黎", "法国"],
  ["尼斯", "法国"],
  ["伦敦", "英国"],
  ["冰岛", "冰岛"],
  ["纽约", "美国"],
  ["洛杉矶", "美国"],
  ["夏威夷", "美国"],
  ["巴厘", "印度尼西亚"],
  ["新加坡", "新加坡"],
  ["悉尼", "澳大利亚"],
  ["墨尔本", "澳大利亚"],
  ["西班牙", "西班牙"],
  ["意大利", "意大利"],
  ["土耳其", "土耳其"],
  ["摩洛哥", "摩洛哥"],
  ["埃及", "埃及"],
];

function createInitialState(): RepositoryState {
  const seeds = getSeedTrips();
  return {
    userTrips: seeds.map((trip) =>
      normalizeTrip(trip, {
        ownerId: DEFAULT_OWNER_ID,
        visibility: "private_draft",
      }),
    ),
    publicRoutes: seeds.map((trip) =>
      normalizeTrip(
        {
          ...trip,
          id: `seed-${trip.id}`,
          favorite: false,
          status: "已完成",
          sourceRouteId: trip.id,
          publishedAt: new Date().toISOString(),
        },
        {
          ownerId: "routey_official",
          visibility: "public",
        },
      ),
    ),
    routeSegments: {},
  };
}

function compactText(value: string) {
  return value.trim().toLowerCase();
}

function unique(values: Array<string | undefined>) {
  return [
    ...new Set(
      values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)),
    ),
  ];
}

function inferDestination(trip: Trip): { destination: string; country: string } {
  const text = [trip.name, trip.source?.title, trip.days.map((day) => day.route).join(" ")].join(
    " ",
  );
  const destination =
    countryByKeyword.find(([keyword]) => text.includes(keyword))?.[0] ??
    trip.name
      .replace(/\d+日.*$/, "")
      .replace(/之旅|游|攻略|路线/g, "")
      .trim() ??
    "精选目的地";
  const country = countryByKeyword.find(([keyword]) => text.includes(keyword))?.[1] ?? destination;
  return { destination, country };
}

function scoreTrip(trip: Trip) {
  const spots = trip.days.flatMap((day) => day.spots);
  const geoRatio = spots.length
    ? spots.filter((spot) => spot.lat != null && spot.lng != null).length / spots.length
    : 0;
  const imageRatio = spots.length ? spots.filter((spot) => spot.image).length / spots.length : 0;
  const detailRatio = spots.length
    ? spots.filter((spot) => spot.intro || spot.desc.length > 6).length / spots.length
    : 0;
  return Math.round(45 + geoRatio * 25 + imageRatio * 15 + detailRatio * 15);
}

export function normalizeTrip(
  trip: Trip,
  options: { ownerId?: string; visibility?: TripVisibility } = {},
): Trip {
  const inferred = inferDestination(trip);
  const tags = unique([
    trip.destination,
    inferred.destination,
    trip.country,
    inferred.country,
    ...(trip.tags ?? []),
    ...trip.days.flatMap((day) =>
      day.spots.flatMap((spot) => [spot.category, ...(spot.tags ?? [])]),
    ),
  ]).slice(0, 12);

  return {
    ...trip,
    ownerId: trip.ownerId ?? options.ownerId ?? DEFAULT_OWNER_ID,
    visibility: trip.visibility ?? options.visibility ?? "private_draft",
    destination: trip.destination ?? inferred.destination,
    country: trip.country ?? inferred.country,
    tags,
    qualityScore: trip.qualityScore ?? scoreTrip(trip),
  };
}

function matchesPublicFilters(route: Trip, filters: PublicRouteFilters = {}) {
  if (filters.days && route.days.length !== filters.days) return false;

  const destination = compactText(filters.destination ?? "");
  if (
    destination &&
    !compactText([route.destination, route.country, route.name].join(" ")).includes(destination)
  ) {
    return false;
  }

  const tag = compactText(filters.tag ?? filters.budget ?? "");
  if (tag && !(route.tags ?? []).some((routeTag) => compactText(routeTag).includes(tag)))
    return false;

  const q = compactText(filters.q ?? "");
  if (q) {
    const haystack = compactText(
      [
        route.name,
        route.destination,
        route.country,
        route.source?.title,
        ...(route.tags ?? []),
      ].join(" "),
    );
    if (!haystack.includes(q)) return false;
  }

  return route.visibility === "public";
}

function copyPublicRoute(route: Trip, ownerId: string): Trip {
  return normalizeTrip(
    {
      ...route,
      id: `trip-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      ownerId,
      visibility: "private_draft",
      sourceRouteId: route.id,
      publishedAt: undefined,
      status: "草稿",
      favorite: false,
      source: route.source ?? { kind: "link", title: "公共路线库" },
    },
    { ownerId, visibility: "private_draft" },
  );
}

class MemoryTripRepository implements TripRepository {
  protected state = createInitialState();

  protected async ensureReady() {}

  protected async persist() {}

  async listUserTrips(ownerId = DEFAULT_OWNER_ID): Promise<Trip[]> {
    await this.ensureReady();
    return this.state.userTrips
      .filter((trip) => trip.ownerId === ownerId && trip.visibility !== "archived")
      .map((trip) => normalizeTrip(trip, { ownerId }))
      .sort((a, b) => Number(b.favorite) - Number(a.favorite));
  }

  async getTrip(id: string, ownerId = DEFAULT_OWNER_ID): Promise<Trip | undefined> {
    await this.ensureReady();
    const trip =
      this.state.userTrips.find((item) => item.id === id && item.ownerId === ownerId) ??
      this.state.publicRoutes.find((item) => item.id === id && item.visibility === "public");
    return trip ? normalizeTrip(trip, { ownerId: trip.ownerId }) : undefined;
  }

  async saveUserTrip(trip: Trip, ownerId = DEFAULT_OWNER_ID): Promise<Trip> {
    await this.ensureReady();
    const next = normalizeTrip(trip, { ownerId, visibility: trip.visibility ?? "private_draft" });
    this.state.userTrips = [next, ...this.state.userTrips.filter((item) => item.id !== next.id)];
    await this.persist();
    return next;
  }

  async updateTrip(
    id: string,
    updater: (trip: Trip) => Trip,
    ownerId = DEFAULT_OWNER_ID,
  ): Promise<Trip | undefined> {
    await this.ensureReady();
    let nextTrip: Trip | undefined;
    this.state.userTrips = this.state.userTrips.map((trip) => {
      if (trip.id !== id || trip.ownerId !== ownerId) return trip;
      nextTrip = normalizeTrip(updater(trip), { ownerId });
      return nextTrip;
    });
    if (nextTrip) await this.persist();
    return nextTrip;
  }

  async deleteTrip(id: string, ownerId = DEFAULT_OWNER_ID): Promise<boolean> {
    await this.ensureReady();
    const before = this.state.userTrips.length;
    this.state.userTrips = this.state.userTrips.filter(
      (trip) => trip.id !== id || trip.ownerId !== ownerId,
    );
    const deleted = before !== this.state.userTrips.length;
    if (deleted) await this.persist();
    return deleted;
  }

  async listPublicRoutes(filters: PublicRouteFilters = {}): Promise<Trip[]> {
    await this.ensureReady();
    return this.state.publicRoutes
      .map((route) => normalizeTrip(route, { ownerId: route.ownerId, visibility: "public" }))
      .filter((route) => matchesPublicFilters(route, filters))
      .sort((a, b) => (b.qualityScore ?? 0) - (a.qualityScore ?? 0));
  }

  async publishTrip(id: string, ownerId = DEFAULT_OWNER_ID): Promise<Trip | undefined> {
    await this.ensureReady();
    const source = this.state.userTrips.find((trip) => trip.id === id && trip.ownerId === ownerId);
    if (!source) return undefined;

    const publishedAt = new Date().toISOString();
    const publicRoute = normalizeTrip(
      {
        ...source,
        id: `route-${source.id}`,
        ownerId,
        visibility: "public",
        sourceRouteId: source.id,
        publishedAt,
        favorite: false,
      },
      { ownerId, visibility: "public" },
    );
    const userTrip = normalizeTrip(
      { ...source, visibility: "published_pending", publishedAt },
      { ownerId, visibility: "published_pending" },
    );

    this.state.publicRoutes = [
      publicRoute,
      ...this.state.publicRoutes.filter((route) => route.id !== publicRoute.id),
    ];
    this.state.userTrips = this.state.userTrips.map((trip) => (trip.id === id ? userTrip : trip));
    await this.persist();
    return userTrip;
  }

  async savePublicRoute(routeId: string, ownerId = DEFAULT_OWNER_ID): Promise<Trip | undefined> {
    await this.ensureReady();
    const route = this.state.publicRoutes.find(
      (item) => item.id === routeId && item.visibility === "public",
    );
    if (!route) return undefined;
    const trip = copyPublicRoute(route, ownerId);
    this.state.userTrips = [trip, ...this.state.userTrips.filter((item) => item.id !== trip.id)];
    await this.persist();
    return trip;
  }

  async getRouteSegments(tripId: string, dayId: string): Promise<TravelInfoMap | undefined> {
    await this.ensureReady();
    return this.state.routeSegments[`${tripId}:${dayId}`]?.data;
  }

  async saveRouteSegments(tripId: string, dayId: string, data: TravelInfoMap): Promise<void> {
    await this.ensureReady();
    this.state.routeSegments[`${tripId}:${dayId}`] = { data, ts: Date.now() };
    await this.persist();
  }
}

function isRepositoryState(value: unknown): value is RepositoryState {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return (
    Array.isArray(record.userTrips) &&
    Array.isArray(record.publicRoutes) &&
    Boolean(record.routeSegments) &&
    typeof record.routeSegments === "object"
  );
}

function isNodeError(error: unknown): error is { code?: string } {
  return Boolean(error && typeof error === "object" && "code" in error);
}

class FileTripRepository extends MemoryTripRepository {
  private ready?: Promise<void>;

  protected async ensureReady() {
    if (!this.ready) {
      this.ready = this.load();
    }
    await this.ready;
  }

  private async dataFile() {
    const path = await import("node:path");
    const cwd = typeof process !== "undefined" ? process.cwd() : ".";
    return path.join(cwd, ".routey-data", "route-database.json");
  }

  private async load() {
    const fs = await import("node:fs/promises");
    const file = await this.dataFile();
    try {
      const raw = await fs.readFile(file, "utf8");
      const parsed: unknown = JSON.parse(raw);
      if (isRepositoryState(parsed)) {
        this.state = {
          userTrips: parsed.userTrips.map((trip) => normalizeTrip(trip)),
          publicRoutes: parsed.publicRoutes.map((trip) =>
            normalizeTrip(trip, { visibility: "public" }),
          ),
          routeSegments: parsed.routeSegments,
        };
        return;
      }
    } catch (error) {
      if (!isNodeError(error) || error.code !== "ENOENT") {
        console.warn("[TripRepository] Failed to read local route database, reseeding.", error);
      }
    }
    await this.persist();
  }

  protected async persist() {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = await this.dataFile();
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(this.state, null, 2), "utf8");
  }
}

type QueryResult<T> = { rows: T[]; rowCount: number | null };
type PgPool = {
  query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<QueryResult<T>>;
};

function tripFromRow(row: { trip_json: Trip }) {
  return normalizeTrip(row.trip_json);
}

class PostgresTripRepository implements TripRepository {
  private pool?: PgPool;
  private ready?: Promise<void>;

  constructor(private readonly connectionString: string) {}

  private async getPool() {
    if (!this.pool) {
      const loadPg = new Function("specifier", "return import(specifier)") as (
        specifier: string,
      ) => Promise<unknown>;
      const pg = (await loadPg("pg")) as {
        Pool: new (options: {
          connectionString: string;
          ssl?: { rejectUnauthorized: boolean };
        }) => PgPool;
      };
      this.pool = new pg.Pool({
        connectionString: this.connectionString,
        ssl: process.env.PGSSLMODE === "disable" ? undefined : { rejectUnauthorized: false },
      });
    }
    return this.pool;
  }

  private async ensureReady() {
    if (!this.ready) {
      this.ready = this.init();
    }
    await this.ready;
  }

  private async init() {
    const pool = await this.getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_trips (
        id TEXT PRIMARY KEY,
        owner_id TEXT NOT NULL,
        source_route_id TEXT,
        visibility TEXT NOT NULL,
        trip_json JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS routes (
        id TEXT PRIMARY KEY,
        owner_id TEXT,
        source_trip_id TEXT,
        visibility TEXT NOT NULL,
        destination TEXT,
        country TEXT,
        tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
        day_count INTEGER NOT NULL DEFAULT 0,
        quality_score INTEGER NOT NULL DEFAULT 0,
        trip_json JSONB NOT NULL,
        published_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS route_segments (
        id TEXT PRIMARY KEY,
        trip_id TEXT NOT NULL,
        day_id TEXT NOT NULL,
        segment_key TEXT NOT NULL,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_user_trips_owner ON user_trips(owner_id, visibility);
      CREATE INDEX IF NOT EXISTS idx_routes_public ON routes(visibility, destination, country);
      CREATE INDEX IF NOT EXISTS idx_route_segments_trip_day ON route_segments(trip_id, day_id);
    `);

    const userCount = await pool.query<{ count: string }>(
      "SELECT COUNT(*)::TEXT AS count FROM user_trips",
    );
    if (Number(userCount.rows[0]?.count ?? 0) === 0) {
      for (const trip of createInitialState().userTrips) {
        await this.upsertUserTrip(pool, trip, trip.ownerId);
      }
    }

    const routeCount = await pool.query<{ count: string }>(
      "SELECT COUNT(*)::TEXT AS count FROM routes",
    );
    if (Number(routeCount.rows[0]?.count ?? 0) === 0) {
      for (const route of createInitialState().publicRoutes) {
        await this.upsertPublicRoute(route);
      }
    }
  }

  private async upsertUserTrip(pool: PgPool, trip: Trip, ownerId = DEFAULT_OWNER_ID) {
    const normalized = normalizeTrip(trip, {
      ownerId,
      visibility: trip.visibility ?? "private_draft",
    });
    await pool.query(
      `
        INSERT INTO user_trips (id, owner_id, source_route_id, visibility, trip_json, updated_at)
        VALUES ($1,$2,$3,$4,$5::jsonb,NOW())
        ON CONFLICT (id) DO UPDATE SET
          owner_id = EXCLUDED.owner_id,
          source_route_id = EXCLUDED.source_route_id,
          visibility = EXCLUDED.visibility,
          trip_json = EXCLUDED.trip_json,
          updated_at = NOW()
      `,
      [
        normalized.id,
        normalized.ownerId,
        normalized.sourceRouteId,
        normalized.visibility,
        JSON.stringify(normalized),
      ],
    );
    return normalized;
  }

  private async upsertPublicRoute(route: Trip) {
    const pool = await this.getPool();
    const normalized = normalizeTrip(route, { ownerId: route.ownerId, visibility: "public" });
    await pool.query(
      `
        INSERT INTO routes (
          id, owner_id, source_trip_id, visibility, destination, country, tags,
          day_count, quality_score, trip_json, published_at, updated_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11,NOW())
        ON CONFLICT (id) DO UPDATE SET
          owner_id = EXCLUDED.owner_id,
          source_trip_id = EXCLUDED.source_trip_id,
          visibility = EXCLUDED.visibility,
          destination = EXCLUDED.destination,
          country = EXCLUDED.country,
          tags = EXCLUDED.tags,
          day_count = EXCLUDED.day_count,
          quality_score = EXCLUDED.quality_score,
          trip_json = EXCLUDED.trip_json,
          published_at = EXCLUDED.published_at,
          updated_at = NOW()
      `,
      [
        normalized.id,
        normalized.ownerId,
        normalized.sourceRouteId,
        normalized.visibility,
        normalized.destination,
        normalized.country,
        normalized.tags ?? [],
        normalized.days.length,
        normalized.qualityScore ?? 0,
        JSON.stringify(normalized),
        normalized.publishedAt ?? new Date().toISOString(),
      ],
    );
  }

  async listUserTrips(ownerId = DEFAULT_OWNER_ID): Promise<Trip[]> {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query<{ trip_json: Trip }>(
      `
        SELECT trip_json
        FROM user_trips
        WHERE owner_id = $1 AND visibility <> 'archived'
        ORDER BY (trip_json->>'favorite')::BOOLEAN DESC, updated_at DESC
      `,
      [ownerId],
    );
    return result.rows.map(tripFromRow);
  }

  async getTrip(id: string, ownerId = DEFAULT_OWNER_ID): Promise<Trip | undefined> {
    await this.ensureReady();
    const pool = await this.getPool();
    const userTrip = await pool.query<{ trip_json: Trip }>(
      "SELECT trip_json FROM user_trips WHERE id = $1 AND owner_id = $2 LIMIT 1",
      [id, ownerId],
    );
    if (userTrip.rows[0]) return tripFromRow(userTrip.rows[0]);

    const publicRoute = await pool.query<{ trip_json: Trip }>(
      "SELECT trip_json FROM routes WHERE id = $1 AND visibility = 'public' LIMIT 1",
      [id],
    );
    return publicRoute.rows[0] ? tripFromRow(publicRoute.rows[0]) : undefined;
  }

  async saveUserTrip(trip: Trip, ownerId = DEFAULT_OWNER_ID): Promise<Trip> {
    await this.ensureReady();
    const pool = await this.getPool();
    return this.upsertUserTrip(pool, trip, ownerId);
  }

  async updateTrip(
    id: string,
    updater: (trip: Trip) => Trip,
    ownerId = DEFAULT_OWNER_ID,
  ): Promise<Trip | undefined> {
    const trip = await this.getTrip(id, ownerId);
    if (!trip || trip.visibility === "public") return undefined;
    return this.saveUserTrip(updater(trip), ownerId);
  }

  async deleteTrip(id: string, ownerId = DEFAULT_OWNER_ID): Promise<boolean> {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query("DELETE FROM user_trips WHERE id = $1 AND owner_id = $2", [
      id,
      ownerId,
    ]);
    return (result.rowCount ?? 0) > 0;
  }

  async listPublicRoutes(filters: PublicRouteFilters = {}): Promise<Trip[]> {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query<{ trip_json: Trip }>(
      "SELECT trip_json FROM routes WHERE visibility = 'public' ORDER BY quality_score DESC, updated_at DESC",
    );
    return result.rows.map(tripFromRow).filter((route) => matchesPublicFilters(route, filters));
  }

  async publishTrip(id: string, ownerId = DEFAULT_OWNER_ID): Promise<Trip | undefined> {
    const trip = await this.getTrip(id, ownerId);
    if (!trip || trip.visibility === "public") return undefined;
    const publishedAt = new Date().toISOString();
    const userTrip = normalizeTrip(
      { ...trip, visibility: "published_pending", publishedAt },
      { ownerId, visibility: "published_pending" },
    );
    const publicRoute = normalizeTrip(
      {
        ...trip,
        id: `route-${trip.id}`,
        ownerId,
        visibility: "public",
        sourceRouteId: trip.id,
        publishedAt,
        favorite: false,
      },
      { ownerId, visibility: "public" },
    );
    await this.saveUserTrip(userTrip, ownerId);
    await this.upsertPublicRoute(publicRoute);
    return userTrip;
  }

  async savePublicRoute(routeId: string, ownerId = DEFAULT_OWNER_ID): Promise<Trip | undefined> {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query<{ trip_json: Trip }>(
      "SELECT trip_json FROM routes WHERE id = $1 AND visibility = 'public' LIMIT 1",
      [routeId],
    );
    const route = result.rows[0] ? tripFromRow(result.rows[0]) : undefined;
    if (!route) return undefined;
    return this.saveUserTrip(copyPublicRoute(route, ownerId), ownerId);
  }

  async getRouteSegments(tripId: string, dayId: string): Promise<TravelInfoMap | undefined> {
    await this.ensureReady();
    const pool = await this.getPool();
    const result = await pool.query<{ data: TravelInfoMap }>(
      "SELECT data FROM route_segments WHERE id = $1 LIMIT 1",
      [`${tripId}:${dayId}`],
    );
    return result.rows[0]?.data;
  }

  async saveRouteSegments(tripId: string, dayId: string, data: TravelInfoMap): Promise<void> {
    await this.ensureReady();
    const pool = await this.getPool();
    await pool.query(
      `
        INSERT INTO route_segments (id, trip_id, day_id, segment_key, data, updated_at)
        VALUES ($1,$2,$3,$4,$5::jsonb,NOW())
        ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
      `,
      [`${tripId}:${dayId}`, tripId, dayId, `${tripId}:${dayId}`, JSON.stringify(data)],
    );
  }
}

function readEnv(env: unknown, key: string) {
  if (env && typeof env === "object" && key in env) {
    const value = (env as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  const fromProcess = typeof process !== "undefined" ? process.env[key] : undefined;
  return fromProcess?.trim() || undefined;
}

let repositoryPromise: Promise<TripRepository> | undefined;

export async function getTripRepository(env?: unknown): Promise<TripRepository> {
  if (!repositoryPromise) {
    repositoryPromise = Promise.resolve().then<TripRepository>(() => {
      const databaseUrl = readEnv(env, "DATABASE_URL") ?? readEnv(env, "POSTGRES_URL");
      if (databaseUrl) {
        console.log("[TripRepository] Using PostgreSQL route database.");
        return new PostgresTripRepository(databaseUrl);
      }
      console.log("[TripRepository] Using local JSON route database.");
      return new FileTripRepository();
    });
  }
  return repositoryPromise;
}
