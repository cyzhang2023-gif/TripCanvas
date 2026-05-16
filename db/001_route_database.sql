CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS routes (
  id TEXT PRIMARY KEY,
  owner_id TEXT,
  source_trip_id TEXT,
  visibility TEXT NOT NULL CHECK (
    visibility IN ('private_draft', 'published_pending', 'public', 'archived', 'rejected')
  ),
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

CREATE TABLE IF NOT EXISTS user_trips (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  source_route_id TEXT REFERENCES routes(id) ON DELETE SET NULL,
  visibility TEXT NOT NULL CHECK (
    visibility IN ('private_draft', 'published_pending', 'public', 'archived', 'rejected')
  ),
  trip_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS route_days (
  id TEXT PRIMARY KEY,
  route_id TEXT REFERENCES routes(id) ON DELETE CASCADE,
  user_trip_id TEXT REFERENCES user_trips(id) ON DELETE CASCADE,
  day_index INTEGER NOT NULL,
  label TEXT NOT NULL,
  route_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS route_spots (
  id TEXT PRIMARY KEY,
  route_day_id TEXT NOT NULL REFERENCES route_days(id) ON DELETE CASCADE,
  spot_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  intro TEXT,
  rating NUMERIC(3, 1),
  price TEXT,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  location GEOGRAPHY(POINT, 4326),
  raw_json JSONB NOT NULL DEFAULT '{}'::JSONB
);

CREATE TABLE IF NOT EXISTS route_sources (
  id TEXT PRIMARY KEY,
  route_id TEXT REFERENCES routes(id) ON DELETE CASCADE,
  user_trip_id TEXT REFERENCES user_trips(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL,
  source_url TEXT,
  raw_text_key TEXT,
  parse_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS route_media (
  id TEXT PRIMARY KEY,
  route_id TEXT REFERENCES routes(id) ON DELETE CASCADE,
  user_trip_id TEXT REFERENCES user_trips(id) ON DELETE CASCADE,
  spot_id TEXT,
  media_type TEXT NOT NULL,
  oss_key TEXT NOT NULL,
  url TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS route_segments (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL,
  day_id TEXT NOT NULL,
  segment_key TEXT NOT NULL,
  from_spot_id TEXT,
  to_spot_id TEXT,
  distance_meters INTEGER,
  duration_seconds INTEGER,
  mode TEXT,
  polyline JSONB,
  data JSONB NOT NULL DEFAULT '{}'::JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_trips_owner ON user_trips(owner_id, visibility);
CREATE INDEX IF NOT EXISTS idx_routes_public ON routes(visibility, destination, country);
CREATE INDEX IF NOT EXISTS idx_routes_tags ON routes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_routes_search ON routes USING GIN(
  (to_tsvector('simple', coalesce(destination, '') || ' ' || coalesce(country, '') || ' ' || coalesce(trip_json->>'name', '')))
);
CREATE INDEX IF NOT EXISTS idx_route_days_route ON route_days(route_id, day_index);
CREATE INDEX IF NOT EXISTS idx_route_days_user_trip ON route_days(user_trip_id, day_index);
CREATE INDEX IF NOT EXISTS idx_route_spots_day ON route_spots(route_day_id, spot_index);
CREATE INDEX IF NOT EXISTS idx_route_spots_location ON route_spots USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_route_segments_trip_day ON route_segments(trip_id, day_id);
