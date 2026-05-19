import "./lib/error-capture";

import { parseWithAI, generateQuizTrip } from "./lib/ai";
import type { QuizAnswers, StreamProgress } from "./lib/ai";
import { getDayTravelInfo, type TravelInfo } from "./lib/amap-api";
import {
  importPayloadSchema,
  tripPatchSchema,
  travelInfoSchema,
  quizAnswersSchema,
  exploreAddSchema,
  quizAiStatusSchema,
} from "./lib/api-schemas";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { TTLCache } from "./lib/ttl-cache";
import {
  addExploreRouteToTrips,
  createTripFromImport,
  getDestinationsByRegion,
  getExploreRouteInfo,
  getExploreRoutes,
  matchQuizToRoutes,
  optimizeDay,
  optimizeTrip,
} from "./lib/tripPlanner";
import { DEFAULT_OWNER_ID, getTripRepository, type PublicRouteFilters } from "./lib/tripRepository";
import type { ExploreRoute, SourceKind, Spot, Trip } from "./lib/tripTypes";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

/* ─── Async import jobs (real AI) ─── */
type ImportJobState = {
  id: string;
  kind: SourceKind;
  content: string;
  createdAt: number;
  status: "processing" | "done" | "error";
  progress: number;
  tripId?: string;
  error?: string;
  steps: Array<{ label: string; state: "done" | "active" | "pending" }>;
  streamInfo?: string;
};

const importJobs = new TTLCache<string, ImportJobState>({ maxSize: 200, ttlMs: 10 * 60 * 1000 });

type QuizAiJobState = {
  status: "generating" | "done" | "error";
  tripId?: string;
  tripName?: string;
};
const quizAiJobs = new TTLCache<string, QuizAiJobState>({ maxSize: 100, ttlMs: 10 * 60 * 1000 });

const AI_STEPS = ["读取攻略来源", "AI 智能解析", "地理编码定位", "优化路线排序"];

/* ─── Xiaohongshu (小红书) content extraction ─── */
const XHS_URL_RE = /(?:xiaohongshu\.com|xhslink\.com)\//;
const XHS_NOTE_URL_RE = /https?:\/\/(?:www\.)?(?:xiaohongshu\.com\/(?:explore|discovery\/item)\/[a-zA-Z0-9]+|xhslink\.com\/[^\s]+)/;

function extractXhsShareText(raw: string): string | null {
  const urlIdx = raw.search(/https?:\/\/(?:www\.)?(?:xiaohongshu\.com|xhslink\.com)\//);
  if (urlIdx <= 0) return null;
  const textBefore = raw.slice(0, urlIdx).trim()
    .replace(/^\d+\s*赞同了该笔记\s*/, "")
    .replace(/，分享给你[，。！]?\s*$/, "")
    .replace(/\s*发布了一篇小红书笔记[，。！]?\s*$/, "")
    .trim();
  return textBefore.length >= 5 ? textBefore : null;
}

function extractXhsUrl(raw: string): string | null {
  const m = raw.match(XHS_NOTE_URL_RE);
  return m ? m[0] : null;
}

type XhsNoteRef = { noteId: string; xsecToken?: string };

function extractXhsNoteRef(noteUrl: string): XhsNoteRef | null {
  const m = noteUrl.match(/xiaohongshu\.com\/(?:explore|discovery\/item)\/([a-zA-Z0-9]+)/);
  if (!m) return null;
  const noteId = m[1];
  const tokenMatch = noteUrl.match(/xsec_token=([^&\s]+)/);
  return { noteId, xsecToken: tokenMatch?.[1] };
}

async function resolveXhsShortLink(shortUrl: string): Promise<XhsNoteRef | null> {
  try {
    const resp = await fetch(shortUrl, { redirect: "manual" });
    const location = resp.headers.get("location");
    if (location) return extractXhsNoteRef(location);
    return null;
  } catch {
    return null;
  }
}

type XhsNoteContent = { title: string; desc: string; tags: string[]; raw: string; images: string[] };

async function fetchXhsViaTikHub(noteUrl: string): Promise<XhsNoteContent | null> {
  const apiKey = process.env.TIKHUB_API_KEY;
  if (!apiKey) {
    console.log("[XHS] No TIKHUB_API_KEY configured, skipping TikHub fetch");
    return null;
  }

  try {
    let ref = extractXhsNoteRef(noteUrl);
    if (!ref && noteUrl.includes("xhslink.com")) {
      ref = await resolveXhsShortLink(noteUrl);
    }
    if (!ref) {
      console.log(`[XHS] Could not extract note ID from: ${noteUrl}`);
      return null;
    }

    console.log(`[XHS] Fetching via TikHub API, note ID: ${ref.noteId}`);
    const resp = await fetch(
      `https://api.tikhub.io/api/v1/xiaohongshu/app/get_note_info?note_id=${ref.noteId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      console.log(`[XHS] TikHub API returned ${resp.status}: ${errText.slice(0, 200)}`);
      return null;
    }

    const json = await resp.json() as any;
    // app/get_note_info structure: data.data[0].note_list[0]
    const noteData = json?.data?.data?.[0]?.note_list?.[0]
      ?? json?.data?.note_item?.note_card
      ?? json?.data?.note_card
      ?? json?.data?.items?.[0]?.note_card
      ?? json?.data;

    if (!noteData?.title && !noteData?.desc) {
      console.log("[XHS] TikHub returned no note data");
      return null;
    }

    const title = noteData.title || noteData.display_title || "";
    const desc = noteData.desc || noteData.note_desc || "";
    const tags = (noteData.tag_list || noteData.tags || noteData.topics || [])
      .map((t: any) => t?.name || t?.topic_name || t)
      .filter((t: any) => typeof t === "string" && t.length > 0);

    // Extract note images (high-res)
    const imagesList = noteData.images_list || noteData.image_list || [];
    const images: string[] = imagesList
      .map((img: any) => img?.url_size_large || img?.url || img?.original || "")
      .filter((u: string) => u.startsWith("http"));
    if (images.length > 0) {
      console.log(`[XHS] Extracted ${images.length} note images`);
    }

    const parts = [
      title && `标题: ${title}`,
      desc && `内容: ${desc}`,
      tags.length && `标签: ${tags.join(", ")}`,
    ].filter(Boolean);
    const result = parts.join("\n\n");

    if (result.length > 20) {
      console.log(`[XHS] TikHub extracted: "${title}" (${desc.length} chars)`);
      return { title, desc, tags, raw: result, images };
    }
    return null;
  } catch (err) {
    console.error(`[XHS] TikHub fetch failed:`, (err as Error).message);
    return null;
  }
}

function makeJobResponse(job: ImportJobState) {
  return {
    id: job.id,
    kind: job.kind,
    status: job.status,
    progress: job.progress,
    tripId: job.status === "done" ? job.tripId : undefined,
    error: job.error,
    steps: job.steps,
    streamInfo: job.streamInfo,
  };
}

function updateJobProgress(
  job: ImportJobState,
  stepIndex: number,
  progress: number,
  status: "processing" | "done" | "error" = "processing",
) {
  job.progress = progress;
  job.status = status;
  job.steps = AI_STEPS.map((label, i) => ({
    label,
    state:
      i < stepIndex
        ? ("done" as const)
        : i === stepIndex
          ? ("active" as const)
          : ("pending" as const),
  }));
  if (status === "done") {
    job.steps = AI_STEPS.map((label) => ({ label, state: "done" as const }));
  }
}

function buildXhsHintedContent(note: XhsNoteContent, city?: string, country?: string): string {
  const dest = city || "";
  const ctry = country || "";
  const hint = dest || ctry
    ? `⚠️ 重要：本笔记的目的地是「${dest}」（${ctry}），你必须生成关于「${dest}」的行程，禁止生成其他城市的行程！`
    : `⚠️ 重要：请从以下笔记内容中提取真实目的地，禁止替换为其他城市！`;
  return `来源: 小红书笔记\n${hint}\n\n标题：${note.title}\n\n${note.raw}\n\n标签：${note.tags.join(", ")}`;
}

/** Fire n8n webhook in background (saves to explore DB, does not block user) */
function fireN8nWebhookAsync(note: XhsNoteContent) {
  const n8nUrl = process.env.N8N_WEBHOOK_URL || "http://127.0.0.1:5678/webhook/xhs-parse";
  fetch(n8nUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: note.title,
      desc: note.desc,
      tags: note.tags.join(", "),
      source_url: "",
    }),
    signal: AbortSignal.timeout(90_000),
  })
    .then(async (resp) => {
      if (resp.ok) {
        const text = await resp.text();
        console.log(`[XHS→n8n] Background save done (${text.length} chars)`);
      } else {
        console.log(`[XHS→n8n] Background webhook returned ${resp.status}`);
      }
    })
    .catch((err) => console.log(`[XHS→n8n] Background webhook failed: ${(err as Error).message}`));
}

/** Process import job asynchronously with real AI */
async function processImportJob(job: ImportJobState, env: unknown, ownerId: string) {
  try {
    // Step 1: Reading source — fetch XHS content if applicable
    updateJobProgress(job, 0, 10);
    let aiContent = job.content;
    let aiKind = job.kind;

    let xhsNote: XhsNoteContent | null = null;
    if (XHS_URL_RE.test(job.content)) {
      const noteUrl = extractXhsUrl(job.content);
      if (noteUrl) {
        xhsNote = await fetchXhsViaTikHub(noteUrl);
        if (xhsNote) {
          aiContent = `来源: 小红书笔记\n\n${xhsNote.raw}`;
          aiKind = "text";
        }
      }
      if (!xhsNote && aiContent === job.content) {
        const shareText = extractXhsShareText(job.content);
        if (shareText) {
          console.log(`[Import] Fallback to XHS share text: "${shareText.slice(0, 60)}..."`);
          aiContent = `来源: 小红书笔记分享\n\n${shareText}`;
          aiKind = "text";
        }
      }
    }

    // Step 2: AI parsing with streaming progress
    updateJobProgress(job, 1, 20);
    const onProgress = (p: StreamProgress) => {
      if (p.phase === "connecting") {
        job.streamInfo = "正在连接 AI...";
        job.progress = 20;
      } else if (p.phase === "generating") {
        const parts: string[] = [];
        if (p.destination) parts.push(`目的地：${p.destination}`);
        if (p.daysFound > 0) parts.push(`${p.daysFound} 天行程`);
        if (p.spotsFound > 0) parts.push(`${p.spotsFound} 个景点`);
        job.streamInfo = parts.length > 0 ? `已识别 ${parts.join("、")}` : "AI 正在生成行程...";
        job.progress = Math.min(20 + Math.floor(p.spotsFound * 2), 65);
      } else if (p.phase === "parsing") {
        job.streamInfo = "正在解析行程数据...";
        job.progress = 68;
      }
    };
    let trip: Trip;
    if (xhsNote) {
      fireN8nWebhookAsync(xhsNote);
      const hinted = buildXhsHintedContent(xhsNote);
      console.log(`[Import] Parsing XHS note via DeepSeek (n8n saving in background)...`);
      trip = await parseWithAI("text", hinted, onProgress);
    } else {
      trip = await parseWithAI(aiKind, aiContent, onProgress);
    }

    // Step 3: Geocoding (already done inside parseWithAI)
    job.streamInfo = "正在定位景点坐标...";
    updateJobProgress(job, 2, 70);

    // Step 4: Optimize routes
    updateJobProgress(job, 3, 85);
    const optimized = optimizeTrip(trip);

    // Save trip
    const repository = await getTripRepository(env);
    await repository.saveUserTrip(optimized, ownerId);
    job.tripId = optimized.id;
    updateJobProgress(job, 4, 100, "done");

    console.log(`[Import] Job ${job.id} completed → trip "${optimized.name}"`);
  } catch (err) {
    console.error(`[Import] Job ${job.id} failed:`, err);
    try {
      if (xhsNote) {
        console.log(`[Import] AI failed for XHS note, retrying parseWithAI with strong hints...`);
        const hinted = buildXhsHintedContent(xhsNote);
        const retryTrip = await parseWithAI("text", hinted);
        const repository = await getTripRepository(env);
        await repository.saveUserTrip(optimizeTrip(retryTrip), ownerId);
        job.tripId = retryTrip.id;
        updateJobProgress(job, 4, 100, "done");
        console.log(`[Import] XHS retry succeeded → trip "${retryTrip.name}"`);
      } else {
        console.log(`[Import] Falling back to keyword-based matching...`);
        const fallbackTrip = createTripFromImport({ kind: job.kind, content: job.content });
        const repository = await getTripRepository(env);
        await repository.saveUserTrip(fallbackTrip, ownerId);
        job.tripId = fallbackTrip.id;
        updateJobProgress(job, 4, 100, "done");
        console.log(`[Import] Fallback succeeded → trip "${fallbackTrip.name}"`);
      }
    } catch (fallbackErr) {
      job.status = "error";
      job.error = err instanceof Error ? err.message : "解析失败";
      job.progress = 0;
      job.steps = AI_STEPS.map((label) => ({ label, state: "pending" as const }));
    }
  }
}

/* ─── Travel info cache ─── */
const travelCache = new TTLCache<string, { data: Record<string, TravelInfo>; ts: number }>({
  maxSize: 500,
  ttlMs: 30 * 60 * 1000,
});

/* ─── Spot image cache ─── */
const spotImageCache = new TTLCache<string, string>({ maxSize: 1000, ttlMs: 60 * 60 * 1000 });

function getUnsplashKey(): string {
  if (typeof process !== "undefined" && process.env?.UNSPLASH_ACCESS_KEY) {
    return process.env.UNSPLASH_ACCESS_KEY;
  }
  const env = import.meta.env as Record<string, string | undefined>;
  return env.UNSPLASH_ACCESS_KEY ?? "";
}

function getPexelsKey(): string {
  if (typeof process !== "undefined" && process.env?.PEXELS_API_KEY) {
    return process.env.PEXELS_API_KEY;
  }
  const env = import.meta.env as Record<string, string | undefined>;
  return env.PEXELS_API_KEY ?? "";
}

async function fetchPexelsImage(query: string): Promise<string | null> {
  const key = getPexelsKey();
  if (!key) return null;
  try {
    const params = new URLSearchParams({ query, per_page: "1", orientation: "landscape" });
    const res = await fetch(`https://api.pexels.com/v1/search?${params}`, {
      headers: { Authorization: key },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      if (res.status === 429) console.warn("[Image] Pexels rate limit reached");
      return null;
    }
    const data = (await res.json()) as { photos: Array<{ src: { large: string } }> };
    const url = data.photos?.[0]?.src?.large;
    if (url) {
      console.log(`[Image] Pexels: "${query}" → found`);
      return url;
    }
  } catch (err) {
    console.error(`[Image] Pexels fetch failed for "${query}":`, err);
  }
  return null;
}

async function fetchPexelsImages(query: string, count = 5): Promise<string[]> {
  const key = getPexelsKey();
  if (!key) return [];
  try {
    const params = new URLSearchParams({ query, per_page: String(count), orientation: "landscape" });
    const res = await fetch(`https://api.pexels.com/v1/search?${params}`, {
      headers: { Authorization: key },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { photos: Array<{ src: { large: string } }> };
    return (data.photos || []).map((p) => p.src.large).filter(Boolean);
  } catch {
    return [];
  }
}

interface UnsplashResult {
  urls: { regular: string; small: string };
  description: string | null;
}

async function fetchUnsplashImage(query: string): Promise<string | null> {
  const key = getUnsplashKey();
  if (!key) return null;

  try {
    const params = new URLSearchParams({
      query,
      per_page: "1",
      orientation: "landscape",
      content_filter: "high",
    });
    const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
      headers: { Authorization: `Client-ID ${key}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      if (res.status === 403) console.warn("[Image] Unsplash rate limit reached");
      return null;
    }
    const data = (await res.json()) as { results: UnsplashResult[] };
    const url = data.results?.[0]?.urls?.regular;
    if (url) {
      console.log(`[Image] Unsplash: "${query}" → found`);
      return url;
    }
  } catch (err) {
    console.error(`[Image] Unsplash fetch failed for "${query}":`, err);
  }
  return null;
}

async function fetchUnsplashImages(query: string, count = 5): Promise<string[]> {
  const key = getUnsplashKey();
  if (!key) return [];

  try {
    const params = new URLSearchParams({
      query,
      per_page: String(count),
      orientation: "landscape",
      content_filter: "high",
    });
    const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
      headers: { Authorization: `Client-ID ${key}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { results: UnsplashResult[] };
    return (data.results || []).map((r) => r.urls.regular).filter(Boolean);
  } catch {
    return [];
  }
}

function buildImageSearchQuery(query: string): string {
  const q = query.toLowerCase();
  // Detect category from query content and add appropriate suffix
  if (/酒店|住宿|民宿|hostel|hotel|旅馆|青旅/.test(q)) return `${query} 酒店外观 实拍`;
  if (/美食|餐厅|餐馆|小吃|咖啡|奶茶|酒吧|料理|拉面|寿司|烤肉/.test(q)) return `${query} 美食实拍`;
  if (/购物|商场|商店|市场|免税|百货/.test(q)) return `${query} 购物`;
  if (/机场|车站|地铁|交通|码头/.test(q)) return `${query} 实拍`;
  if (/海滩|沙滩|海岛|beach/.test(q)) return `${query} 海滩风景`;
  if (/寺|庙|神社|教堂|清真寺|temple|shrine/.test(q)) return `${query} 实景`;
  return `${query} 旅游实拍`;
}

async function fetchBingImages(query: string): Promise<string[]> {
  const searchQuery = buildImageSearchQuery(query);
  const url = `https://cn.bing.com/images/async?q=${encodeURIComponent(searchQuery)}&first=0&count=20&mmasync=1`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) return [];
    const html = await res.text();

    // Extract murl (media URL) from Bing's response
    const urlMatches = html.match(/murl&quot;:&quot;(https?:\/\/[^&]+)/g);
    if (!urlMatches || urlMatches.length === 0) return [];

    const urls = urlMatches.map((m) => m.replace('murl&quot;:&quot;', ''));

    // Block domains that prevent hotlinking or return broken images
    const blockedHosts = [
      "gettyimages.com", "istockphoto.com", "shutterstock.com", "alamy.com",
      "dreamstime.com", "123rf.com", "depositphotos.com", "adobe.stock",
      "pinterest.com", "pin.it", "flickr.com", "static.flickr.com",
      "rare-gallery.com", "wallpapercave.com", "wallpaperflare.com",
      "hdqwalls.com", "wallpaperaccess.com", "peakpx.com",
      "thehoneycombers.com", "shutterbug.com", "travelchannel.com",
    ];
    const safeUrls = urls.filter((u) => !blockedHosts.some((h) => u.includes(h)));

    const preferredHosts = [
      "ctrip.com", "qunarzz.com", "mafengwo.net", "duitang.com", "bdimg.com",
      "bcebos.com", "sinaimg.cn", "zhimg.com", "youimg1.c-ctrip.com",
      "img1.qunarzz.com", "hiphotos.baidu.com", "699pic.com",
      "cdn.britannica.com", "upload.wikimedia.org", "static1.thetravelimages.com",
      "tripsavvy.com", "lonelyplanet.com", "worldatlas.com", "aceadventurer.com",
    ];
    const skipUnreliable = ["huaban.com", "best-wallpaper.net", "wallhaven.cc"];

    // Sort: preferred hosts first, then reliable HTTPS, then rest
    const ranked: string[] = [];
    const seen = new Set<string>();
    const addUnique = (u: string) => { if (!seen.has(u)) { seen.add(u); ranked.push(u); } };

    // 1. Preferred hosts
    for (const u of safeUrls) {
      if (preferredHosts.some((h) => u.includes(h))) addUnique(u);
    }
    // 2. Reliable HTTPS
    for (const u of safeUrls) {
      if (u.startsWith("https://") && !skipUnreliable.some((h) => u.includes(h))) addUnique(u);
    }
    // 3. Everything else
    for (const u of safeUrls) addUnique(u);

    if (ranked.length > 0) {
      console.log(`[Image] Bing CN: "${query}" → ${ranked.length} results`);
    }
    return ranked;
  } catch (err) {
    console.error(`[Image] Bing fetch failed for "${query}":`, err);
  }
  return [];
}

/** Compat wrapper — returns single best image */
async function fetchBingImage(query: string): Promise<string | null> {
  const results = await fetchBingImages(query);
  return results[0] ?? null;
}

/** Fallback: fetch image from Wikipedia (for international spots) */
async function fetchWikipediaImage(query: string): Promise<string | null> {
  const wikis = ["zh", "en", "ja", "ko"];

  for (const lang of wikis) {
    try {
      const searchParams = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: query,
        srlimit: "1",
        format: "json",
        origin: "*",
      });
      const searchRes = await fetch(`https://${lang}.wikipedia.org/w/api.php?${searchParams}`);
      const searchData = (await searchRes.json()) as {
        query?: { search?: Array<{ title: string }> };
      };
      const title = searchData.query?.search?.[0]?.title;
      if (!title) continue;

      const imgParams = new URLSearchParams({
        action: "query",
        titles: title,
        prop: "pageimages",
        format: "json",
        pithumbsize: "1200",
        origin: "*",
      });
      const imgRes = await fetch(`https://${lang}.wikipedia.org/w/api.php?${imgParams}`);
      const imgData = (await imgRes.json()) as {
        query?: { pages?: Record<string, { thumbnail?: { source: string } }> };
      };
      const pages = imgData.query?.pages;
      if (!pages) continue;
      const page = Object.values(pages)[0];
      if (page?.thumbnail?.source) {
        console.log(`[Image] Wiki ${lang}: "${query}" → "${title}"`);
        return page.thumbnail.source;
      }
    } catch {
      continue;
    }
  }
  return null;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
];
let fallbackIdx = 0;

function getCategoryFallback(_query: string): string {
  return FALLBACK_IMAGES[fallbackIdx++ % FALLBACK_IMAGES.length];
}

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

/* ─── n8n PostgreSQL pool (reads routes generated by n8n workflow) ─── */
type N8nPgPool = {
  query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<{ rows: T[]; rowCount: number | null }>;
};

let n8nPool: N8nPgPool | undefined;

async function getN8nPool(): Promise<N8nPgPool | null> {
  if (n8nPool) return n8nPool;
  const dbUrl =
    process.env.N8N_DATABASE_URL ??
    process.env.DATABASE_URL ??
    "postgresql://postgres:123456@localhost:5433/tripcanvas";
  try {
    const loadPg = new Function("specifier", "return import(specifier)") as (
      specifier: string,
    ) => Promise<unknown>;
    const pg = (await loadPg("pg")) as {
      Pool: new (options: { connectionString: string }) => N8nPgPool;
    };
    n8nPool = new pg.Pool({ connectionString: dbUrl });
    return n8nPool;
  } catch (e) {
    console.warn("[n8n] Failed to connect to n8n database:", e);
    return null;
  }
}

/** Convert n8n DB row into frontend Trip format */
/**
 * Generate a spot image URL from image_query.
 * Points to /api/spot-image which does Bing CN → Wikipedia → Unsplash fallback
 * and returns a 302 redirect to the actual image.
 * Browser caches the redirect, so subsequent loads are instant.
 */
function spotImageUrl(
  imageQuery: string | undefined,
  placeName: string,
  _category: string | undefined,
  _index: number,
): string | undefined {
  const query = imageQuery || placeName;
  if (!query) return undefined;
  return `/api/spot-image?q=${encodeURIComponent(query)}`;
}

/** City-specific Unsplash photo IDs for route covers — mapped by city name */
// City/country → specific landmark search query for cover images (uses /api/spot-image dynamic search)
const citySearchTerms: Record<string, string> = {
  // 中国
  北京: "北京天安门故宫", 上海: "上海外滩夜景", 成都: "成都宽窄巷子",
  西安: "西安兵马俑", 杭州: "杭州西湖断桥", 重庆: "重庆洪崖洞夜景",
  广州: "广州塔小蛮腰", 深圳: "深圳市民中心", 厦门: "厦门鼓浪屿",
  昆明: "昆明滇池", 大理: "大理洱海", 丽江: "丽江古城",
  三亚: "三亚亚龙湾", 苏州: "苏州拙政园", 南京: "南京夫子庙",
  武汉: "武汉黄鹤楼", 长沙: "长沙岳麓山", 青岛: "青岛栈桥",
  哈尔滨: "哈尔滨冰雪大世界", 拉萨: "拉萨布达拉宫",
  桂林: "桂林山水漓江", 张家界: "张家界天门山", 敦煌: "敦煌莫高窟",
  洛阳: "洛阳龙门石窟", 贵阳: "贵阳黄果树瀑布", 黄山: "黄山迎客松",
  乌镇: "乌镇水乡古镇", 泉州: "泉州开元寺", 福州: "福州三坊七巷",
  九寨沟: "九寨沟五花海", 香港: "香港维多利亚港夜景",
  // 日本
  东京: "Tokyo Tower night", 大阪: "Osaka Castle Japan", 京都: "Kyoto Fushimi Inari",
  北海道: "Hokkaido lavender field", 冲绳: "Okinawa blue ocean", 奈良: "Nara deer temple",
  福冈: "Fukuoka canal city",
  // 韩国
  首尔: "Seoul Gyeongbokgung palace", 釜山: "Busan Haeundae beach", 济州岛: "Jeju Island sunrise",
  // 东南亚
  曼谷: "Bangkok Grand Palace temple", 清迈: "Chiang Mai temple", 普吉岛: "Phuket beach sunset",
  新加坡: "Singapore Marina Bay Sands", 吉隆坡: "Kuala Lumpur Petronas Towers",
  槟城: "Penang street art Georgetown", 巴厘岛: "Bali rice terrace Ubud",
  河内: "Hanoi Old Quarter Vietnam", 胡志明市: "Ho Chi Minh City Vietnam",
  岘港: "Da Nang Golden Bridge", 马尼拉: "Manila Philippines skyline",
  暹粒: "Angkor Wat sunrise Cambodia", 科伦坡: "Colombo Sri Lanka",
  加德满都: "Kathmandu Nepal temple", 马尔代夫: "Maldives overwater bungalow",
  // 欧洲
  巴黎: "Paris Eiffel Tower", 尼斯: "Nice France Riviera", 伦敦: "London Big Ben Thames",
  爱丁堡: "Edinburgh Castle Scotland", 罗马: "Rome Colosseum Italy",
  佛罗伦萨: "Florence Duomo Italy", 威尼斯: "Venice Grand Canal gondola",
  巴塞罗那: "Barcelona Sagrada Familia", 马德里: "Madrid Royal Palace",
  柏林: "Berlin Brandenburg Gate", 慕尼黑: "Munich Marienplatz",
  苏黎世: "Zurich Switzerland lake", 因特拉肯: "Interlaken Swiss Alps",
  雷克雅未克: "Iceland Northern Lights", 圣托里尼: "Santorini blue dome Greece",
  雅典: "Athens Acropolis Parthenon", 里斯本: "Lisbon tram Portugal",
  阿姆斯特丹: "Amsterdam canal houses", 布拉格: "Prague Charles Bridge",
  维也纳: "Vienna Schonbrunn Palace", 布达佩斯: "Budapest Parliament night",
  杜布罗夫尼克: "Dubrovnik old town Croatia",
  // 北美
  纽约: "New York City Manhattan skyline", 洛杉矶: "Los Angeles Hollywood sign",
  旧金山: "San Francisco Golden Gate Bridge", 拉斯维加斯: "Las Vegas strip night",
  夏威夷: "Hawaii Waikiki beach", 迈阿密: "Miami Beach sunset",
  芝加哥: "Chicago skyline Lake Michigan", 温哥华: "Vancouver Stanley Park",
  多伦多: "Toronto CN Tower", 坎昆: "Cancun Mexico beach",
  // 南美
  利马: "Lima Peru historic center", 布宜诺斯艾利斯: "Buenos Aires La Boca",
  里约热内卢: "Rio de Janeiro Christ Redeemer",
  // 大洋洲
  悉尼: "Sydney Opera House Harbour", 墨尔本: "Melbourne Australia laneways",
  奥克兰: "Auckland Sky Tower New Zealand", 皇后镇: "Queenstown Milford Sound",
  // 中东/非洲
  马拉喀什: "Marrakech Morocco medina", 开罗: "Egypt Pyramids Giza sphinx",
  伊斯坦布尔: "Istanbul Blue Mosque Turkey", 卡帕多奇亚: "Cappadocia hot air balloon",
  迪拜: "Dubai Burj Khalifa night skyline", 开普敦: "Cape Town Table Mountain",
  内罗毕: "Nairobi Kenya safari",
  // 国家级别
  中国: "Great Wall China", 日本: "Mount Fuji Japan cherry blossom",
  韩国: "Seoul Namsan Tower Korea", 泰国: "Thailand Bangkok temple",
  马来西亚: "Malaysia Petronas Towers", 越南: "Ha Long Bay Vietnam",
  印度尼西亚: "Bali Indonesia temple sunset", 菲律宾: "Philippines Palawan beach",
  柬埔寨: "Angkor Wat Cambodia sunrise", 斯里兰卡: "Sri Lanka Sigiriya rock",
  尼泊尔: "Nepal Himalayas Everest", 印度: "Taj Mahal India sunrise",
  法国: "Paris Eiffel Tower sunset", 英国: "London Tower Bridge",
  意大利: "Rome Colosseum Italy", 西班牙: "Barcelona Spain Sagrada Familia",
  德国: "Berlin Germany skyline", 瑞士: "Swiss Alps Matterhorn",
  冰岛: "Iceland Aurora Northern Lights", 希腊: "Santorini Greece blue dome",
  葡萄牙: "Lisbon Portugal tram", 荷兰: "Amsterdam Netherlands canal",
  挪威: "Norway fjord landscape", 克罗地亚: "Dubrovnik Croatia coast",
  美国: "New York Statue of Liberty", 加拿大: "Banff Canada Lake Louise",
  墨西哥: "Cancun Mexico Caribbean", 秘鲁: "Machu Picchu Peru",
  阿根廷: "Buenos Aires Argentina", 巴西: "Rio de Janeiro Christ Redeemer statue",
  澳洲: "Sydney Opera House Australia", 澳大利亚: "Sydney Opera House Australia",
  新西兰: "New Zealand Milford Sound", 斐济: "Fiji tropical island beach",
  摩洛哥: "Morocco Marrakech medina", 埃及: "Egypt Pyramids Giza sunset",
  土耳其: "Istanbul Hagia Sophia Turkey", 以色列: "Jerusalem Western Wall Israel",
  约旦: "Petra Jordan treasury", 南非: "Cape Town Table Mountain sunset",
  阿联酋: "Dubai skyline Burj Khalifa", 捷克: "Prague old town square Czech",
};

function getRouteCoverUrl(city: string, hint?: string): string {
  // If a hint (theme/title keywords) is provided, use city + hint for a unique image
  if (hint) {
    return `/api/spot-image?q=${encodeURIComponent(city + " " + hint)}`;
  }
  const searchTerm = citySearchTerms[city];
  if (searchTerm) {
    return `/api/spot-image?q=${encodeURIComponent(searchTerm)}`;
  }
  // Fallback: search with city name directly
  return `/api/spot-image?q=${encodeURIComponent(city + " 景点 风景")}`;
}

/** Extract diverse image search keywords from route data to avoid duplicate covers */
const themeCoverKeywords: Record<string, string[]> = {
  citywalk: ["街景 漫步", "老城区 小巷", "城市夜景"],
  food: ["美食 餐厅", "当地美食 市场", "特色小吃 街头"],
  beach: ["海滩 日落", "海景 度假", "海岸线 风光"],
  luxury: ["奢华酒店 泳池", "高级度假村", "豪华 全景"],
  nature: ["自然风光 山", "湖泊 森林", "日出 山峰"],
  shopping: ["购物 商圈", "商场 夜市", "集市 特产"],
  culture: ["历史 古迹", "博物馆 文化", "寺庙 建筑"],
};

function getRouteSpecificCover(city: string, title: string, theme: string, tags: string, index: number): string {
  // Build a pool of diverse keyword candidates, then pick one by index
  const candidates: string[] = [];

  // Add theme-based keywords
  const themeKw = themeCoverKeywords[theme];
  if (themeKw) candidates.push(...themeKw);

  // Add tag-based keywords (each tag as a candidate)
  const tagList = tags ? tags.split(",").map(t => t.trim()).filter(t => t.length >= 2 && t !== city) : [];
  for (const tag of tagList) candidates.push(tag);

  // Add title-derived keywords
  const titleWords = title.replace(/[：:，,。.！!？?""''《》]/g, " ").split(/\s+/).filter(w => w.length >= 2 && w !== city);
  if (titleWords.length >= 2) candidates.push(titleWords.slice(0, 2).join(" "));
  if (titleWords.length >= 1) candidates.push(titleWords[0]);

  // Deduplicate
  const unique = [...new Set(candidates)];

  if (unique.length > 0) {
    const keyword = unique[index % unique.length];
    return getRouteCoverUrl(city, keyword);
  }
  return getRouteCoverUrl(city);
}

/** Persistent cache for validated destination cover images (survives spot-image cache clears) */
const validatedCoverCache = new Map<string, { url: string; ts: number }>();
const COVER_CACHE_TTL = 24 * 60 * 60_000; // 24 hours

/** Validate a URL can actually serve an image via GET request (some servers differ between HEAD and GET) */
async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-1023" }, // only fetch first 1KB to check
      signal: AbortSignal.timeout(5000),
    });
    // Accept 200 (full) or 206 (partial)
    if (res.status !== 200 && res.status !== 206) return false;
    const ct = res.headers.get("content-type") || "";
    return ct.startsWith("image/") || ct.includes("octet-stream") || ct.includes("jpeg") || ct.includes("png");
  } catch { return false; }
}

/** Resolve AND validate a cover image URL — Unsplash → Bing → Wikipedia */
async function resolveValidCoverUrl(query: string): Promise<string> {
  const cached = validatedCoverCache.get(query);
  if (cached && Date.now() - cached.ts < COVER_CACHE_TTL) return cached.url;

  // Primary: Unsplash
  const unsplashUrl = await fetchUnsplashImage(query);
  if (unsplashUrl) {
    validatedCoverCache.set(query, { url: unsplashUrl, ts: Date.now() });
    return unsplashUrl;
  }

  // Secondary: Pexels
  const pexelsUrl = await fetchPexelsImage(query);
  if (pexelsUrl) {
    validatedCoverCache.set(query, { url: pexelsUrl, ts: Date.now() });
    return pexelsUrl;
  }

  // Tertiary: Bing search
  const searchQuery = buildImageSearchQuery(query);
  const bingApiUrl = `https://cn.bing.com/images/async?q=${encodeURIComponent(searchQuery)}&first=0&count=12&mmasync=1`;
  try {
    const res = await fetch(bingApiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (res.ok) {
      const html = await res.text();
      const urlMatches = html.match(/murl&quot;:&quot;(https?:\/\/[^&]+)/g);
      if (urlMatches) {
        const blockedHosts = [
          "gettyimages.com", "istockphoto.com", "shutterstock.com", "alamy.com",
          "dreamstime.com", "123rf.com", "depositphotos.com", "pinterest.com",
          "flickr.com", "rare-gallery.com", "wallpapercave.com", "wallpaperflare.com",
          "hdqwalls.com", "peakpx.com", "thehoneycombers.com", "shutterbug.com",
          "huaban.com", "best-wallpaper.net",
        ];
        const candidates = urlMatches
          .map((m) => m.replace('murl&quot;:&quot;', ''))
          .filter((u) => u.startsWith("https://") && !blockedHosts.some((h) => u.includes(h)));

        for (const candidate of candidates.slice(0, 4)) {
          if (await validateImageUrl(candidate)) {
            console.log(`[CoverResolve] "${query}" → ${candidate.slice(0, 80)} (validated)`);
            validatedCoverCache.set(query, { url: candidate, ts: Date.now() });
            return candidate;
          }
        }
      }
    }
  } catch { /* continue to next source */ }

  // Tertiary: Wikipedia
  const wikiUrl = await fetchWikipediaImage(query);
  if (wikiUrl && await validateImageUrl(wikiUrl)) {
    validatedCoverCache.set(query, { url: wikiUrl, ts: Date.now() });
    return wikiUrl;
  }

  // Ultimate fallback
  const fallback = FALLBACK_IMAGES[fallbackIdx++ % FALLBACK_IMAGES.length];
  validatedCoverCache.set(query, { url: fallback, ts: Date.now() });
  return fallback;
}

function n8nRouteToTrip(route: Record<string, unknown>, days: Record<string, unknown>[]): Trip {
  // Map cover_url → CoverKey fallback
  const coverUrl = (route.cover_url as string) || "";
  const coverKeyMap: Record<string, Trip["cover"]> = {
    japan: "japan", 日本: "japan", tokyo: "tokyo", 东京: "tokyo",
    korea: "korea", 韩国: "korea", thailand: "thailand", 泰国: "thailand",
    france: "france", 法国: "france",
  };
  const dest = ((route.destination as string) || "").toLowerCase();
  const city = ((route.city as string) || "").toLowerCase();
  const coverKey = coverKeyMap[dest] ?? coverKeyMap[city] ?? "map";

  return {
    id: `n8n-${route.id}`,
    name: (route.route_title as string) || "AI 生成行程",
    date: route.created_at ? String(route.created_at).split("T")[0] : "",
    cover: coverKey,
    status: "已完成",
    favorite: false,
    destination: (route.destination as string) || undefined,
    country: (route.country as string) || undefined,
    city: (route.city as string) || undefined,
    tags: route.tags ? String(route.tags).split(",").map((t: string) => t.trim()) : undefined,
    qualityScore: route.quality_score != null ? Number(route.quality_score) : undefined,
    coverUrl: coverUrl || getRouteCoverUrl((route.city as string) || ""),
    mood: (route.mood as string) || undefined,
    summary: (route.summary as string) || undefined,
    routeTheme: (route.route_theme as Trip["routeTheme"]) || undefined,
    budgetLevel: (route.budget_level as Trip["budgetLevel"]) || undefined,
    travelType: (route.travel_type as Trip["travelType"]) || undefined,
    pace: (route.pace as Trip["pace"]) || undefined,
    bestTime: (route.best_time as Trip["bestTime"]) || undefined,
    likes: route.likes != null ? Number(route.likes) : 0,
    daysCount: route.days_count != null ? Number(route.days_count) : undefined,
    days: days.map((day) => ({
      id: `n8n-d${day.id}`,
      label: (day.title as string) || `Day ${day.day_number}`,
      route: (day.summary as string) || "",
      spots: ((day as Record<string, unknown>).places as Record<string, unknown>[] || []).map(
        (p, si) => ({
          id: `n8n-p${p.id}`,
          time: (p.visit_time as string) || "09:00",
          title: (p.place_name as string) || "",
          desc: (p.description as string) || "",
          lat: p.latitude != null ? Number(p.latitude) : undefined,
          lng: p.longitude != null ? Number(p.longitude) : undefined,
          category: ((p.category as string) || "景点") as Spot["category"],
          intro: (p.intro as string) || undefined,
          rating: p.rating != null ? Number(p.rating) : undefined,
          price: (p.price as string) || undefined,
          image: (p.image_url as string) || spotImageUrl(
            p.image_query as string | undefined,
            (p.place_name as string) || "",
            p.category as string | undefined,
            si,
          ),
          tags: p.tags ? String(p.tags).split(",").map((t: string) => t.trim()) : undefined,
          address: (p.address as string) || undefined,
          durationMin: p.duration_min != null ? Number(p.duration_min) : undefined,
        }),
      ),
    })),
    source: { kind: "text" as const, title: "n8n AI 自动生成" },
  };
}

function apiJson(data: unknown, status = 200, cacheSeconds = 0): Response {
  const headers: Record<string, string> = { "content-type": "application/json; charset=utf-8" };
  if (cacheSeconds > 0) {
    headers["cache-control"] = `public, max-age=${cacheSeconds}, stale-while-revalidate=${cacheSeconds * 2}`;
  }
  return new Response(JSON.stringify(data), { status, headers });
}

function apiError(status: number, message: string): Response {
  return apiJson({ message }, status);
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function getOwnerId(request: Request): string {
  return request.headers.get("x-routey-user-id")?.trim() || DEFAULT_OWNER_ID;
}

function touchDay(trip: Trip, dayId: string, updater: (spots: Spot[]) => Spot[]): Trip {
  return {
    ...trip,
    days: trip.days.map((day) => {
      if (day.id !== dayId) return day;
      return optimizeDay({ ...day, spots: updater(day.spots) });
    }),
  };
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
          time: "19:00",
          title: data.title?.trim() || "新地点",
          desc: data.desc?.trim() || "停留 30分钟",
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

async function handleApiRequest(request: Request, env: unknown): Promise<Response | undefined> {
  const url = new URL(request.url);
  const { pathname } = url;
  if (!pathname.startsWith("/api/")) return undefined;
  const ownerId = getOwnerId(request);
  const repository = await getTripRepository(env);

  if (request.method === "OPTIONS") return apiJson({ ok: true });
  if (pathname === "/api/health") return apiJson({ ok: true });

  if (pathname === "/api/trips" && request.method === "GET") {
    return apiJson(await repository.listUserTrips(ownerId));
  }

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

  /* ─── Import with real AI ─── */
  if (pathname === "/api/imports" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = importPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(400, parsed.error.errors[0]?.message ?? "请提供有效的导入类型和内容");
    }
    const { kind, content } = parsed.data;

    const id = `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const job: ImportJobState = {
      id,
      kind,
      content,
      createdAt: Date.now(),
      status: "processing",
      progress: 5,
      steps: AI_STEPS.map((label, i) => ({
        label,
        state: i === 0 ? ("active" as const) : ("pending" as const),
      })),
    };
    importJobs.set(id, job);

    // Start async processing (don't await)
    processImportJob(job, env, ownerId).catch((err) => console.error("[Import] Unhandled:", err));

    return apiJson(makeJobResponse(job), 201);
  }

  const importMatch = pathname.match(/^\/api\/imports\/([^/]+)$/);
  if (importMatch && request.method === "GET") {
    const job = importJobs.get(importMatch[1]);
    return job ? apiJson(makeJobResponse(job)) : apiError(404, "解析任务不存在");
  }

  const tripMatch = pathname.match(/^\/api\/trips\/([^/]+)$/);
  if (tripMatch && request.method === "GET") {
    const trip = await repository.getTrip(tripMatch[1], ownerId);
    return trip ? apiJson(trip) : apiError(404, "行程不存在");
  }

  if (tripMatch && request.method === "PATCH") {
    return handleTripPatch(tripMatch[1], request, env, ownerId);
  }

  if (tripMatch && request.method === "DELETE") {
    const deleted = await repository.deleteTrip(tripMatch[1], ownerId);
    return deleted ? apiJson({ ok: true }) : apiError(404, "行程不存在");
  }

  const publishMatch = pathname.match(/^\/api\/trips\/([^/]+)\/publish$/);
  if (publishMatch && request.method === "POST") {
    const trip = await repository.publishTrip(publishMatch[1], ownerId);
    return trip ? apiJson(trip) : apiError(404, "行程不存在");
  }

  const savePublicMatch = pathname.match(/^\/api\/routes\/([^/]+)\/save$/);
  if (savePublicMatch && request.method === "POST") {
    const trip = await repository.savePublicRoute(savePublicMatch[1], ownerId);
    return trip ? apiJson(trip, 201) : apiError(404, "公共路线不存在");
  }

  /* ─── Travel info between spots (real AMap data) ─── */
  if (pathname === "/api/travel-info" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = travelInfoSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请提供有效的 tripId 和 dayId");
    const { tripId, dayId } = parsed.data;

    const trip = await repository.getTrip(tripId, ownerId);
    if (!trip) return apiError(404, "行程不存在");

    const day = trip.days.find((d) => d.id === dayId);
    if (!day) return apiError(404, "天数不存在");

    // Check cache
    const cacheKey = `${tripId}:${dayId}`;
    const cached = travelCache.get(cacheKey);
    if (cached) {
      return apiJson(cached.data);
    }

    const persisted = await repository.getRouteSegments(tripId, dayId);
    if (persisted) {
      travelCache.set(cacheKey, { data: persisted, ts: Date.now() });
      return apiJson(persisted);
    }

    try {
      const infoMap = await getDayTravelInfo(day.spots);
      const result: Record<string, TravelInfo> = {};
      infoMap.forEach((val, key) => {
        result[key] = val;
      });
      travelCache.set(cacheKey, { data: result, ts: Date.now() });
      await repository.saveRouteSegments(tripId, dayId, result);
      return apiJson(result);
    } catch (err) {
      console.error("[Travel] Error:", err);
      return apiError(500, "获取路线信息失败");
    }
  }

  /* ─── Spot images batch — returns JSON array of image URLs for gallery ─── */
  if (pathname === "/api/spot-images" && request.method === "GET") {
    const query = url.searchParams.get("q") ?? "";
    const count = Math.min(parseInt(url.searchParams.get("count") ?? "6"), 12);
    if (!query) return apiError(400, "缺少搜索词");

    // Check batch cache
    const batchKey = `__batch__${query}__${count}`;
    const cachedBatch = spotImageCache.get(batchKey);
    if (cachedBatch) {
      return apiJson(JSON.parse(cachedBatch), 200, 3600);
    }

    // Primary: Unsplash
    const unsplashResults = await fetchUnsplashImages(query, count);
    const results = unsplashResults.slice(0, count);

    // Supplement with Pexels
    if (results.length < count) {
      const pexelsResults = await fetchPexelsImages(query, count - results.length);
      for (const u of pexelsResults) {
        if (results.length >= count) break;
        if (!results.includes(u)) results.push(u);
      }
    }

    // Supplement with Bing
    if (results.length < count) {
      const bingResults = await fetchBingImages(query);
      for (const u of bingResults) {
        if (results.length >= count) break;
        if (!results.includes(u)) results.push(u);
      }
    }

    while (results.length < count) {
      results.push(getCategoryFallback(query));
    }

    spotImageCache.set(batchKey, JSON.stringify(results));
    return apiJson(results, 200, 3600);
  }

  /* ─── Spot image — Unsplash → Bing CN → Wikipedia fallback ─── */
  if (pathname === "/api/spot-image" && request.method === "GET") {
    const query = url.searchParams.get("q") ?? "";
    if (!query) return apiError(400, "缺少搜索词");

    const imgRedirect = (targetUrl: string) =>
      new Response(null, {
        status: 302,
        headers: {
          location: targetUrl,
          "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
        },
      });

    const cachedUrl = spotImageCache.get(query);
    if (cachedUrl) {
      return imgRedirect(cachedUrl);
    }

    // Primary: Unsplash
    const unsplashUrl = await fetchUnsplashImage(query);
    if (unsplashUrl) {
      spotImageCache.set(query, unsplashUrl);
      return imgRedirect(unsplashUrl);
    }

    // Secondary: Pexels
    const pexelsUrl = await fetchPexelsImage(query);
    if (pexelsUrl) {
      spotImageCache.set(query, pexelsUrl);
      return imgRedirect(pexelsUrl);
    }

    // Tertiary: Bing China
    const bingUrl = await fetchBingImage(query);
    if (bingUrl) {
      spotImageCache.set(query, bingUrl);
      return imgRedirect(bingUrl);
    }

    // Fallback: curated landscape image
    const fallback = getCategoryFallback(query);
    spotImageCache.set(query, fallback);
    return imgRedirect(fallback);
  }

  /* All destinations grouped by region — dynamically from n8n DB, cached for 30 min */
  if (pathname === "/api/destinations" && request.method === "GET") {
    // Response-level cache: avoid re-querying DB + re-resolving images on every page load
    const DEST_CACHE_KEY = "__destinations_response__";
    const destCached = validatedCoverCache.get(DEST_CACHE_KEY);
    if (destCached && Date.now() - destCached.ts < 30 * 60_000) {
      return apiJson(JSON.parse(destCached.url), 200, 300);
    }

    try {
      const pool = await getN8nPool();
      if (pool) {
        const { rows } = await pool.query(`
          SELECT country, COUNT(*) AS route_count
          FROM routes WHERE status = 'published'
          GROUP BY country ORDER BY COUNT(*) DESC
        `);

        const countryRouteCount = new Map<string, number>();
        for (const r of rows) {
          const country = (r.country as string) || "";
          if (country) countryRouteCount.set(country, Number(r.route_count) || 0);
        }

        const regionMap = [
          { region: "中国", countries: ["中国"] },
          { region: "东亚", countries: ["日本", "韩国"] },
          { region: "东南亚", countries: ["泰国", "新加坡", "马来西亚", "越南", "印度尼西亚", "菲律宾", "柬埔寨", "斯里兰卡", "马尔代夫", "尼泊尔", "印度"] },
          { region: "欧洲", countries: ["法国", "英国", "意大利", "西班牙", "德国", "瑞士", "冰岛", "希腊", "葡萄牙", "荷兰", "挪威", "克罗地亚"] },
          { region: "北美", countries: ["美国", "加拿大", "墨西哥"] },
          { region: "南美", countries: ["秘鲁", "阿根廷", "巴西"] },
          { region: "大洋洲", countries: ["澳洲", "澳大利亚", "新西兰", "斐济"] },
          { region: "非洲与中东", countries: ["摩洛哥", "埃及", "土耳其", "以色列", "约旦", "南非", "迪拜", "阿联酋"] },
        ];

        const placedCountries = new Set<string>();
        for (const rm of regionMap) for (const c of rm.countries) placedCountries.add(c);

        const extraCountries = new Set<string>();
        for (const r of rows) {
          const country = (r.country as string) || "";
          if (country && !placedCountries.has(country)) extraCountries.add(country);
        }

        // Resolve all cover images in parallel with validation (timeout: 8s total)
        const allCountries: string[] = [];
        for (const { countries } of regionMap) {
          for (const c of countries) {
            if (countryRouteCount.has(c) || countryRouteCount.has(c === "澳洲" ? "澳大利亚" : c)) {
              allCountries.push(c);
            }
          }
        }
        for (const c of extraCountries) allCountries.push(c);

        const coverPromises = allCountries.map(async (country) => {
          const searchTerm = citySearchTerms[country] || `${country} 著名景点`;
          try {
            const url = await resolveValidCoverUrl(searchTerm);
            return [country, url] as const;
          } catch {
            return [country, getRouteCoverUrl(country)] as const;
          }
        });
        // Race: wait up to 8s for validated covers, then fall back to unvalidated
        const timeout = new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 8000));
        const raceResult = await Promise.race([Promise.all(coverPromises), timeout]);
        const coverMap = new Map<string, string>();
        if (raceResult === "timeout") {
          // Use cached or unvalidated covers
          for (const country of allCountries) {
            const cached = validatedCoverCache.get(citySearchTerms[country] || `${country} 著名景点`);
            coverMap.set(country, cached ? cached.url : getRouteCoverUrl(country));
          }
          // Let the validation continue in background
          Promise.all(coverPromises).catch(() => {});
        } else {
          for (const [country, url] of raceResult) coverMap.set(country, url);
        }

        const groups = regionMap.map(({ region, countries }) => {
          const destinations: { name: string; routes: number; cover: string }[] = [];
          for (const country of countries) {
            const displayName = country === "澳大利亚" ? "澳洲" : country;
            const totalRoutes = countryRouteCount.get(country) || 0;
            if (totalRoutes > 0) {
              destinations.push({
                name: displayName,
                routes: totalRoutes,
                cover: coverMap.get(country) || getRouteCoverUrl(country),
              });
            }
          }
          return { region, destinations };
        }).filter(g => g.destinations.length > 0);

        if (extraCountries.size > 0) {
          const otherDests: { name: string; routes: number; cover: string }[] = [];
          for (const country of extraCountries) {
            const totalRoutes = countryRouteCount.get(country) || 0;
            if (totalRoutes > 0) {
              otherDests.push({
                name: country,
                routes: totalRoutes,
                cover: coverMap.get(country) || getRouteCoverUrl(country),
              });
            }
          }
          if (otherDests.length > 0) {
            groups.push({ region: "其他", destinations: otherDests.sort((a, b) => b.routes - a.routes) });
          }
        }

        if (groups.length > 0) {
          // Cache the full response for 30 minutes
          validatedCoverCache.set(DEST_CACHE_KEY, { url: JSON.stringify(groups), ts: Date.now() });
          return apiJson(groups, 200, 300);
        }
      }
    } catch (err) {
      console.error("[destinations] DB query failed, falling back to hardcoded:", err);
    }

    return apiJson(getDestinationsByRegion(), 200, 300);
  }

  /* Explore routes per destination (merge hardcoded + n8n DB routes) */
  if (pathname === "/api/explore" && request.method === "GET") {
    const dest = url.searchParams.get("dest") ?? "";
    const hardcoded = getExploreRoutes(dest);

    // Also fetch n8n-generated routes from DB
    let n8nExplore: ExploreRoute[] = [];
    try {
      const pool = await getN8nPool();
      if (pool) {
        const n8nSql = `
          SELECT r.id, r.route_title, r.city, r.country, r.destination,
                 r.route_theme, r.summary, r.days_count, r.budget_level,
                 r.travel_type, r.tags, r.cover_url, r.likes, r.quality_score,
                 COUNT(ip.id)::int AS total_spots
          FROM routes r
          LEFT JOIN itinerary_days d ON d.route_id = r.id
          LEFT JOIN itinerary_places ip ON ip.day_id = d.id
          WHERE r.status = 'published'
            ${dest ? "AND (r.destination ILIKE '%' || $1 || '%' OR r.city ILIKE '%' || $1 || '%' OR r.country ILIKE '%' || $1 || '%' OR $1 ILIKE '%' || r.destination || '%' OR $1 ILIKE '%' || r.city || '%' OR $1 ILIKE '%' || r.country || '%')" : ""}
          GROUP BY r.id
          ORDER BY r.quality_score DESC, r.created_at DESC
          LIMIT ${dest ? "30" : "100"}
        `;
        const n8nRes = await pool.query(n8nSql, dest ? [dest] : []);
        // Track per-city index to assign different covers for same-city routes
        const cityIndex = new Map<string, number>();
        n8nExplore = (n8nRes.rows as Record<string, unknown>[]).map((r) => {
          const city = (r.city as string) || "";
          const idx = cityIndex.get(city) ?? 0;
          cityIndex.set(city, idx + 1);
          return {
            id: `n8n-${r.id}`,
            title: (r.route_title as string) || "AI 精选路线",
            days: Number(r.days_count) || 5,
            spots: Number(r.total_spots) || 0,
            source: "AI 智能生成",
            sourceName: "Routey AI",
            sourceVerified: true,
            qualityScore: Number(r.quality_score) || 80,
            includes: undefined,
            likes: Number(r.likes) || 0,
            cover: (r.cover_url as string) || getRouteSpecificCover(
              city,
              (r.route_title as string) || "",
              (r.route_theme as string) || "",
              (r.tags as string) || "",
              idx,
            ),
            tags: r.tags ? String(r.tags).split(",").map((t: string) => t.trim()) : [],
            profileKey: `n8n-${r.id}`,
          };
        });
      }
    } catch (e) {
      console.warn("[n8n explore] Failed to fetch n8n routes:", e);
    }

    // Use n8n routes only if available, fall back to hardcoded for destinations with no n8n data
    if (n8nExplore.length > 0) return apiJson(n8nExplore, 200, 60);
    return apiJson(hardcoded, 200, 120);
  }

  /* Add an explore route to user's trips */
  if (pathname === "/api/explore/add" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = exploreAddSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请提供有效的路线 ID");
    const { routeId } = parsed.data;

    // Handle n8n DB routes — fetch from Postgres, convert to Trip, save
    if (routeId.startsWith("n8n-")) {
      const pool = await getN8nPool();
      if (!pool) return apiError(500, "n8n 数据库未连接");
      const dbId = Number(routeId.replace("n8n-", ""));
      const routeRes = await pool.query("SELECT * FROM routes WHERE id = $1", [dbId]);
      if (routeRes.rows.length === 0) return apiError(404, "路线不存在");
      const daysRes = await pool.query(
        "SELECT * FROM itinerary_days WHERE route_id = $1 ORDER BY day_number", [dbId],
      );
      const dayIds = daysRes.rows.map((d) => (d as Record<string, unknown>).id);
      let places: Record<string, unknown>[] = [];
      if (dayIds.length > 0) {
        const pRes = await pool.query(
          `SELECT * FROM itinerary_places WHERE day_id = ANY($1) ORDER BY day_id, place_order`,
          [dayIds],
        );
        places = pRes.rows as Record<string, unknown>[];
      }
      const assembledDays = daysRes.rows.map((day) => ({
        ...(day as Record<string, unknown>),
        places: places.filter((p) => p.day_id === (day as Record<string, unknown>).id),
      }));
      const n8nTrip = n8nRouteToTrip(routeRes.rows[0] as Record<string, unknown>, assembledDays);
      // Give it a new unique ID for the user's trip list
      n8nTrip.id = `trip-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
      return apiJson(await repository.saveUserTrip(n8nTrip, ownerId), 201);
    }

    // Try sync profile-based generation first
    const trip = addExploreRouteToTrips(routeId, await repository.listUserTrips(ownerId));
    if (trip) {
      return apiJson(await repository.saveUserTrip(trip, ownerId), 201);
    }

    // No matching profile — use AI to generate real spots for this destination
    const routeInfo = getExploreRouteInfo(routeId);
    if (!routeInfo) return apiError(404, "路线不存在");

    // Create an import job that uses AI
    const jobId = `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const aiContent = `${routeInfo.destination} ${routeInfo.title}，${routeInfo.days}天精品行程，关键词：${routeInfo.tags.join("、")}。路线来源：${routeInfo.source}。请生成至少12个真实地点，覆盖景点、餐厅/美食、酒店/住宿、购物、休闲体验，并保留合理每日路线。`;
    const job: ImportJobState = {
      id: jobId,
      kind: "text",
      content: aiContent,
      createdAt: Date.now(),
      status: "processing",
      progress: 5,
      steps: AI_STEPS.map((label, i) => ({
        label,
        state: i === 0 ? ("active" as const) : ("pending" as const),
      })),
    };
    importJobs.set(jobId, job);
    processImportJob(job, env, ownerId).catch((err) =>
      console.error("[Explore AI] Unhandled:", err),
    );

    // Return a response that tells the frontend to poll for progress
    return apiJson({ aiJobId: jobId, title: routeInfo.title }, 202);
  }

  /* ─── Quiz recommendation ─── */
  if (pathname === "/api/quiz-recommend" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = quizAnswersSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请填写完整的旅行偏好");
    const answers = parsed.data as QuizAnswers;
    const dbMatches = matchQuizToRoutes(answers);

    const aiId = `ai-${Date.now().toString(36)}`;
    const aiRoute = { id: aiId, status: "generating" as const };
    quizAiJobs.set(aiId, { status: "generating" });

    generateQuizTrip(answers)
      .then(async (trip) => {
        const optimized = optimizeTrip(trip);
        await repository.saveUserTrip(optimized, ownerId);
        quizAiJobs.set(aiId, { status: "done", tripId: optimized.id, tripName: optimized.name });
        console.log(`[Quiz AI] Trip "${optimized.name}" generated`);
      })
      .catch((err) => {
        console.error("[Quiz AI] Failed:", err);
        quizAiJobs.set(aiId, { status: "error" });
      });

    return apiJson({ dbMatches, aiRoutes: [aiRoute] });
  }

  /* ─── Quiz AI status polling ─── */
  if (pathname === "/api/quiz-ai-status" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = quizAiStatusSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请提供有效的任务 ID 列表");
    const { ids } = parsed.data;
    const routes = ids.map((id) => {
      const job = quizAiJobs.get(id);
      return job ? { id, ...job } : { id, status: "error" };
    });
    return apiJson({ routes });
  }

  /* ─── n8n generated routes list ─── */
  if (pathname === "/api/n8n-routes" && request.method === "GET") {
    const pool = await getN8nPool();
    if (!pool) return apiError(500, "n8n 数据库未连接");

    const dest = url.searchParams.get("destination") || "";
    const limit = Math.min(Number(url.searchParams.get("limit")) || 20, 100);

    let sql = `
      SELECT id, route_title, city, country, destination, route_theme,
             summary, days_count, budget_level, travel_type, tags,
             cover_url, likes, quality_score, created_at
      FROM routes
      WHERE status = 'published'
    `;
    const params: unknown[] = [];
    if (dest) {
      params.push(dest);
      sql += ` AND destination = $${params.length}`;
    }
    sql += ` ORDER BY quality_score DESC, created_at DESC`;
    params.push(limit);
    sql += ` LIMIT $${params.length}`;

    const result = await pool.query(sql, params);
    // Inject city-specific cover URLs — use route-specific keywords to avoid duplicates
    const featuredCityIdx = new Map<string, number>();
    const rows = (result.rows as Record<string, unknown>[]).map((r) => {
      const city = (r.city as string) || "";
      const idx = featuredCityIdx.get(city) ?? 0;
      featuredCityIdx.set(city, idx + 1);
      return {
        ...r,
        cover_url: (r.cover_url as string) || getRouteSpecificCover(
          city,
          (r.route_title as string) || "",
          (r.route_theme as string) || "",
          (r.tags as string) || "",
          idx,
        ),
      };
    });
    return apiJson(rows, 200, 120);
  }

  /* ─── n8n route detail (with days + places, converted to Trip format) ─── */
  if (pathname === "/api/n8n-route-detail" && request.method === "GET") {
    const pool = await getN8nPool();
    if (!pool) return apiError(500, "n8n 数据库未连接");

    const routeId = Number(url.searchParams.get("id"));
    if (!routeId) return apiError(400, "缺少 id 参数");

    // Get route
    const routeRes = await pool.query("SELECT * FROM routes WHERE id = $1", [routeId]);
    if (routeRes.rows.length === 0) return apiError(404, "路线不存在");
    const route = routeRes.rows[0];

    // Get days
    const daysRes = await pool.query(
      "SELECT * FROM itinerary_days WHERE route_id = $1 ORDER BY day_number",
      [routeId],
    );

    // Get places
    const dayIds = daysRes.rows.map((d) => (d as Record<string, unknown>).id);
    let places: Record<string, unknown>[] = [];
    if (dayIds.length > 0) {
      const placesRes = await pool.query(
        `SELECT * FROM itinerary_places
         WHERE day_id = ANY($1)
         ORDER BY day_id, place_order`,
        [dayIds],
      );
      places = placesRes.rows as Record<string, unknown>[];
    }

    // Assemble nested structure
    const days = daysRes.rows.map((day) => ({
      ...(day as Record<string, unknown>),
      places: places.filter(
        (p) => p.day_id === (day as Record<string, unknown>).id,
      ),
    }));

    // Return both raw data and Trip format
    const trip = n8nRouteToTrip(route as Record<string, unknown>, days);
    return apiJson({ route, trip });
  }

  return apiError(404, "接口不存在");
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const apiResponse = await handleApiRequest(request, env);
      if (apiResponse) return apiResponse;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
