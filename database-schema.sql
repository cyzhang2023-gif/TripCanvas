-- ============================================================
-- Routey 完整数据库设计
-- 基于现有 n8n + DeepSeek + PostgreSQL 后端 & 前端 APP 所有功能
-- ============================================================

-- 说明：
-- 1. 兼容现有 n8n 工作流已有的 routes / itinerary_days / itinerary_places 三张表
-- 2. 新增用户体系、收藏、行程管理、推荐、导入、缓存等表
-- 3. 所有表使用 TIMESTAMPTZ 作为时间类型
-- 4. 使用 JSONB 存储灵活结构（tags、元数据等）

-- ============================================================
-- 0. 扩展
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- 模糊搜索加速

-- ============================================================
-- 1. 用户表 (users)
-- 支持：匿名用户、注册用户、未来微信/手机号登录
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id              TEXT PRIMARY KEY DEFAULT 'user_' || substr(md5(random()::text), 1, 12),
    nickname        TEXT,
    avatar_url      TEXT,
    phone           TEXT UNIQUE,           -- 手机号（可选）
    wechat_openid   TEXT UNIQUE,           -- 微信 OpenID（可选）
    email           TEXT UNIQUE,
    is_anonymous    BOOLEAN NOT NULL DEFAULT TRUE,
    preferences     JSONB DEFAULT '{}',    -- 用户偏好（quiz 历史等）
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone) WHERE phone IS NOT NULL;
CREATE INDEX idx_users_wechat ON users(wechat_openid) WHERE wechat_openid IS NOT NULL;

-- ============================================================
-- 2. 精选路线库 (explore_routes)
-- 对应前端 exploreDB + extraExploreDB，是预置的精选路线元数据
-- ============================================================
CREATE TABLE IF NOT EXISTS explore_routes (
    id              TEXT PRIMARY KEY,        -- 如 "jp-tokyo-culture-5d"
    title           TEXT NOT NULL,           -- "东京5日文化深度游"
    destination     TEXT NOT NULL,           -- "日本"
    region          TEXT,                    -- "东亚"
    days            INTEGER NOT NULL,
    spots           INTEGER NOT NULL,        -- 景点总数
    source          TEXT,                    -- "日本国家旅游局JNTO"
    source_name     TEXT,
    source_url      TEXT,
    source_verified BOOLEAN DEFAULT FALSE,
    source_references JSONB DEFAULT '[]',   -- [{title, publisher, url, verifiedAt}]
    quality_score   INTEGER DEFAULT 0,       -- 综合质量评分
    likes           INTEGER DEFAULT 0,
    cover           TEXT NOT NULL,            -- Unsplash URL
    tags            TEXT[] DEFAULT ARRAY[]::TEXT[],
    includes        TEXT[] DEFAULT ARRAY[]::TEXT[],  -- ["景点","美食","购物","住宿","休闲"]
    profile_key     TEXT,                    -- 用于匹配 profile 模板
    budget_level    TEXT,                    -- "budget" / "comfort" / "luxury"
    travel_type     TEXT,                    -- "solo" / "couple" / "family" / "friends"
    best_season     TEXT,                    -- "spring" / "summer" / "autumn" / "winter" / "anytime"
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_explore_destination ON explore_routes(destination);
CREATE INDEX idx_explore_region ON explore_routes(region);
CREATE INDEX idx_explore_days ON explore_routes(days);
CREATE INDEX idx_explore_tags ON explore_routes USING GIN(tags);
CREATE INDEX idx_explore_active ON explore_routes(is_active, quality_score DESC);

-- ============================================================
-- 3. n8n 路线表 (routes) — 兼容现有表结构，扩展字段
-- 由 n8n 工作流 (Webhook → DeepSeek → Postgres) 写入
-- ============================================================
CREATE TABLE IF NOT EXISTS routes (
    id              SERIAL PRIMARY KEY,
    route_title     TEXT NOT NULL,
    status          TEXT DEFAULT 'draft',          -- draft / published / archived
    quality_score   INTEGER DEFAULT 0,
    target_user     TEXT,                           -- 目标用户画像
    best_time       TEXT,                           -- 最佳出行时间
    days_count      INTEGER,
    budget_level    TEXT,                           -- 经济/舒适/奢华
    travel_type     TEXT,                           -- 独行/情侣/家庭/朋友
    pace            TEXT,                           -- 慢节奏/中等/快节奏
    tags            JSONB DEFAULT '[]',
    -- 扩展字段
    destination     TEXT,
    country         TEXT,
    region          TEXT,
    cover_url       TEXT,
    source_kind     TEXT,                           -- "link"/"text"/"image"/"video"
    source_content  TEXT,                           -- 原始攻略内容
    explore_route_id TEXT REFERENCES explore_routes(id),  -- 关联精选路线
    owner_id        TEXT REFERENCES users(id),
    visibility      TEXT DEFAULT 'private_draft',   -- private_draft / published_pending / public / archived
    published_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_routes_status ON routes(status);
CREATE INDEX idx_routes_destination ON routes(destination);
CREATE INDEX idx_routes_owner ON routes(owner_id);
CREATE INDEX idx_routes_visibility ON routes(visibility);
CREATE INDEX idx_routes_quality ON routes(quality_score DESC);

-- ============================================================
-- 4. 行程天数表 (itinerary_days) — 兼容现有表
-- ============================================================
CREATE TABLE IF NOT EXISTS itinerary_days (
    id              SERIAL PRIMARY KEY,
    route_id        INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    day_number      INTEGER NOT NULL,
    title           TEXT,                    -- "Day 1 - 浅草寺与银座"
    summary         TEXT,                    -- 当日路线概述
    route_desc      TEXT,                    -- 当日路线描述（对应前端 day.route）
    estimated_budget INTEGER DEFAULT 0,      -- 当日预算估算（元）
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_days_route ON itinerary_days(route_id, day_number);

-- ============================================================
-- 5. 行程地点表 (itinerary_places) — 兼容现有表，扩展字段
-- ============================================================
CREATE TABLE IF NOT EXISTS itinerary_places (
    id              SERIAL PRIMARY KEY,
    day_id          INTEGER NOT NULL REFERENCES itinerary_days(id) ON DELETE CASCADE,
    place_name      TEXT NOT NULL,
    visit_time      TEXT,                    -- "09:00"
    duration_min    INTEGER,                 -- 建议停留时间（分钟）
    description     TEXT,
    intro           TEXT,                    -- 详细介绍
    tags            JSONB DEFAULT '[]',
    place_order     INTEGER,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    -- 扩展字段
    category        TEXT,                    -- "景点"/"美食"/"购物"/"住宿"/"休闲"
    rating          NUMERIC(2,1),            -- 评分 1.0-5.0
    price           TEXT,                    -- "¥80" / "免费"
    price_value     INTEGER DEFAULT 0,       -- 数值化价格，用于预算计算
    image_url       TEXT,                    -- 地点图片
    address         TEXT,
    phone           TEXT,
    opening_hours   TEXT,
    external_id     TEXT,                    -- 高德/Google 地点 ID
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_places_day ON itinerary_places(day_id, place_order);
CREATE INDEX idx_places_category ON itinerary_places(category);
CREATE INDEX idx_places_geo ON itinerary_places(latitude, longitude)
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- ============================================================
-- 6. 用户行程表 (user_trips)
-- 用户从精选路线添加、AI 生成、或导入攻略产生的个人行程
-- ============================================================
CREATE TABLE IF NOT EXISTS user_trips (
    id              TEXT PRIMARY KEY,         -- "trip-xxx"
    owner_id        TEXT NOT NULL REFERENCES users(id),
    name            TEXT NOT NULL,
    date            TEXT,                     -- 出发日期描述
    cover           TEXT DEFAULT 'map',       -- CoverKey
    status          TEXT DEFAULT '草稿',       -- "进行中"/"已完成"/"草稿"
    favorite        BOOLEAN DEFAULT FALSE,
    visibility      TEXT DEFAULT 'private_draft',
    source_route_id TEXT,                     -- 来源精选路线 ID
    source_kind     TEXT,                     -- 导入来源类型
    source_title    TEXT,
    source_url      TEXT,
    source_verified BOOLEAN DEFAULT FALSE,
    destination     TEXT,
    country         TEXT,
    tags            TEXT[] DEFAULT ARRAY[]::TEXT[],
    quality_score   INTEGER DEFAULT 0,
    published_at    TIMESTAMPTZ,
    trip_json       JSONB NOT NULL,           -- 完整 Trip 对象（含 days/spots）
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_trips_owner ON user_trips(owner_id, visibility);
CREATE INDEX idx_user_trips_favorite ON user_trips(owner_id, favorite DESC);
CREATE INDEX idx_user_trips_destination ON user_trips(destination);
CREATE INDEX idx_user_trips_status ON user_trips(status);
CREATE INDEX idx_user_trips_tags ON user_trips USING GIN(tags);

-- ============================================================
-- 7. 公共路线库 (public_routes)
-- 用户发布的行程、官方精选路线
-- ============================================================
CREATE TABLE IF NOT EXISTS public_routes (
    id              TEXT PRIMARY KEY,
    owner_id        TEXT REFERENCES users(id),
    source_trip_id  TEXT,                     -- 来源用户行程 ID
    destination     TEXT,
    country         TEXT,
    tags            TEXT[] DEFAULT ARRAY[]::TEXT[],
    day_count       INTEGER DEFAULT 0,
    quality_score   INTEGER DEFAULT 0,
    visibility      TEXT DEFAULT 'public',
    trip_json       JSONB NOT NULL,
    published_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_public_routes_vis ON public_routes(visibility, quality_score DESC);
CREATE INDEX idx_public_routes_dest ON public_routes(destination, country);
CREATE INDEX idx_public_routes_tags ON public_routes USING GIN(tags);
CREATE INDEX idx_public_routes_days ON public_routes(day_count);

-- ============================================================
-- 8. 路线段落缓存 (route_segments)
-- 缓存两个景点之间的出行信息（高德 API 数据）
-- ============================================================
CREATE TABLE IF NOT EXISTS route_segments (
    id              TEXT PRIMARY KEY,          -- "tripId:dayId"
    trip_id         TEXT NOT NULL,
    day_id          TEXT NOT NULL,
    segment_key     TEXT NOT NULL,
    data            JSONB NOT NULL,            -- {spotA→spotB: {distance, duration, mode, polyline}}
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_segments_trip_day ON route_segments(trip_id, day_id);

-- ============================================================
-- 9. 导入任务表 (import_jobs)
-- 跟踪 AI 解析攻略的异步任务
-- ============================================================
CREATE TABLE IF NOT EXISTS import_jobs (
    id              TEXT PRIMARY KEY,
    owner_id        TEXT NOT NULL REFERENCES users(id),
    kind            TEXT NOT NULL,             -- "link"/"image"/"text"/"video"
    content         TEXT,                      -- 原始输入内容
    status          TEXT DEFAULT 'processing', -- processing / done / error
    progress        INTEGER DEFAULT 0,         -- 0-100
    trip_id         TEXT,                       -- 生成的行程 ID
    error_message   TEXT,
    steps           JSONB DEFAULT '[]',        -- [{label, state}]
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_import_jobs_owner ON import_jobs(owner_id, status);
CREATE INDEX idx_import_jobs_status ON import_jobs(status);

-- ============================================================
-- 10. Quiz 推荐记录 (quiz_sessions)
-- 记录用户的 Quiz 偏好与推荐结果
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_sessions (
    id              TEXT PRIMARY KEY DEFAULT 'quiz_' || substr(md5(random()::text), 1, 10),
    owner_id        TEXT NOT NULL REFERENCES users(id),
    scope           TEXT,                      -- "domestic" / "international"
    styles          TEXT[] DEFAULT ARRAY[]::TEXT[],  -- ["海滩","美食","都市"]
    days            TEXT,                      -- "1-3" / "4-5" / "6-7" / "7+"
    travel_type     TEXT,                      -- "solo" / "couple" / "family" / "friends"
    budget          TEXT,                      -- "budget" / "comfort" / "luxury"
    season          TEXT,                      -- "spring" / "summer" / "autumn" / "winter" / "anytime"
    matched_routes  JSONB DEFAULT '[]',        -- [{routeId, matchScore, destination}]
    ai_job_id       TEXT,                      -- 关联的 AI 生成任务
    ai_trip_id      TEXT,                      -- AI 生成的行程 ID
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quiz_owner ON quiz_sessions(owner_id);

-- ============================================================
-- 11. 收藏/点赞表 (user_likes)
-- 用户对精选路线的点赞/收藏
-- ============================================================
CREATE TABLE IF NOT EXISTS user_likes (
    id              SERIAL PRIMARY KEY,
    owner_id        TEXT NOT NULL REFERENCES users(id),
    target_type     TEXT NOT NULL,              -- "explore_route" / "public_route"
    target_id       TEXT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(owner_id, target_type, target_id)
);

CREATE INDEX idx_likes_owner ON user_likes(owner_id);
CREATE INDEX idx_likes_target ON user_likes(target_type, target_id);

-- ============================================================
-- 12. 景点图片缓存 (spot_image_cache)
-- 缓存 Bing/Wikipedia 景点图片查询结果
-- ============================================================
CREATE TABLE IF NOT EXISTS spot_image_cache (
    query           TEXT PRIMARY KEY,
    image_url       TEXT NOT NULL,
    source          TEXT,                      -- "bing" / "wikipedia" / "fallback"
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_image_cache_expires ON spot_image_cache(expires_at);

-- ============================================================
-- 13. 目的地信息表 (destinations)
-- 预置目的地元数据，包括分区、封面等
-- ============================================================
CREATE TABLE IF NOT EXISTS destinations (
    id              TEXT PRIMARY KEY,           -- "日本"
    name            TEXT NOT NULL,
    name_en         TEXT,                       -- "Japan"
    region          TEXT NOT NULL,              -- "东亚"
    cover           TEXT,                       -- Unsplash URL
    emoji           TEXT,                       -- "🗼"
    route_count     INTEGER DEFAULT 0,
    description     TEXT,
    best_season     TEXT,
    visa_info       TEXT,
    currency        TEXT,
    language        TEXT,
    timezone        TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_destinations_region ON destinations(region, sort_order);

-- ============================================================
-- 14. Profile 模板表 (route_profiles)
-- 存储路线模板，用于"一键添加"时直接生成行程
-- 对应前端 tripPlanner.ts 中的 profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS route_profiles (
    id              TEXT PRIMARY KEY,          -- "tokyo-culture-5d"
    destination     TEXT NOT NULL,             -- "日本"
    profile_key     TEXT NOT NULL,             -- 匹配 explore_routes.profile_key
    days            INTEGER NOT NULL,
    template_json   JSONB NOT NULL,            -- 完整的 Day[] 模板数据
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_profiles_dest_key ON route_profiles(destination, profile_key);

-- ============================================================
-- 15. n8n 工作流日志表 (workflow_logs)
-- 记录 n8n 工作流执行情况，便于排查问题
-- ============================================================
CREATE TABLE IF NOT EXISTS workflow_logs (
    id              SERIAL PRIMARY KEY,
    workflow_id     TEXT,                       -- n8n workflow ID
    execution_id    TEXT,
    route_id        INTEGER REFERENCES routes(id),
    step_name       TEXT,                       -- "webhook" / "deepseek" / "function" / "postgres"
    status          TEXT DEFAULT 'running',     -- running / success / error
    input_data      JSONB,
    output_data     JSONB,
    error_message   TEXT,
    duration_ms     INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_wf_logs_route ON workflow_logs(route_id);
CREATE INDEX idx_wf_logs_status ON workflow_logs(status);

-- ============================================================
-- 16. 旅行信息缓存 (travel_info_cache)
-- 缓存高德 API 查询的两点间交通数据
-- ============================================================
CREATE TABLE IF NOT EXISTS travel_info_cache (
    cache_key       TEXT PRIMARY KEY,          -- "lat1,lng1→lat2,lng2"
    distance        INTEGER,                   -- 距离(米)
    duration        INTEGER,                   -- 时间(秒)
    mode            TEXT,                      -- "driving"/"walking"/"transit"
    polyline        JSONB,                     -- [[lng,lat], ...]
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_travel_cache_expires ON travel_info_cache(expires_at);

-- ============================================================
-- 17. 来源验证参考表 (source_references)
-- 存储路线来源验证信息
-- ============================================================
CREATE TABLE IF NOT EXISTS source_references (
    id              SERIAL PRIMARY KEY,
    explore_route_id TEXT REFERENCES explore_routes(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    publisher       TEXT NOT NULL,
    url             TEXT,
    verified_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_source_refs_route ON source_references(explore_route_id);

-- ============================================================
-- 视图 & 统计
-- ============================================================

-- 目的地路线统计视图
CREATE OR REPLACE VIEW v_destination_stats AS
SELECT
    destination,
    region,
    COUNT(*) AS route_count,
    AVG(quality_score) AS avg_quality,
    MIN(days) AS min_days,
    MAX(days) AS max_days,
    SUM(likes) AS total_likes
FROM explore_routes
WHERE is_active = TRUE
GROUP BY destination, region
ORDER BY total_likes DESC;

-- 用户行程统计视图
CREATE OR REPLACE VIEW v_user_trip_stats AS
SELECT
    owner_id,
    COUNT(*) AS total_trips,
    COUNT(*) FILTER (WHERE status = '进行中') AS active_trips,
    COUNT(*) FILTER (WHERE status = '已完成') AS completed_trips,
    COUNT(*) FILTER (WHERE status = '草稿') AS draft_trips,
    COUNT(*) FILTER (WHERE favorite = TRUE) AS favorite_trips
FROM user_trips
WHERE visibility != 'archived'
GROUP BY owner_id;

-- ============================================================
-- 函数：更新 updated_at 触发器
-- ============================================================
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 给所有需要的表添加自动更新触发器
DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT unnest(ARRAY[
            'users', 'explore_routes', 'routes', 'user_trips',
            'public_routes', 'destinations', 'route_profiles'
        ])
    LOOP
        EXECUTE format(
            'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I
             FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at()',
            t
        );
    END LOOP;
END;
$$;

-- ============================================================
-- 关系说明：
--
-- users ─1:N─ user_trips          (用户的个人行程)
-- users ─1:N─ import_jobs         (用户的导入任务)
-- users ─1:N─ quiz_sessions       (用户的 Quiz 记录)
-- users ─1:N─ user_likes          (用户的收藏)
-- users ─1:N─ public_routes       (用户发布的公共路线)
--
-- explore_routes ─1:N─ source_references  (路线来源验证)
-- explore_routes ─1:1─ route_profiles     (路线模板)
--
-- routes ─1:N─ itinerary_days     (n8n 生成的天数)
-- itinerary_days ─1:N─ itinerary_places   (n8n 生成的地点)
--
-- user_trips.source_route_id ─→ explore_routes.id  (来源精选路线)
-- user_trips.trip_json                             (完整行程 JSON)
--
-- route_segments.trip_id ─→ user_trips.id          (交通段落缓存)
-- ============================================================
