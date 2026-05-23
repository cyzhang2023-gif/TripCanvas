/** Image fetching service — Unsplash, Pexels, Bing CN, Wikipedia fallback chain */

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

export async function fetchPexelsImage(query: string): Promise<string | null> {
  const key = getPexelsKey();
  if (!key) return null;
  try {
    const params = new URLSearchParams({ query, per_page: "1", orientation: "landscape" });
    const res = await fetch(`https://api.pexels.com/v1/search?${params}`, {
      headers: { Authorization: key },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { photos: Array<{ src: { large: string } }> };
    return data.photos?.[0]?.src?.large ?? null;
  } catch {
    return null;
  }
}

export async function fetchPexelsImages(query: string, count = 5): Promise<string[]> {
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

export async function fetchUnsplashImage(query: string): Promise<string | null> {
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
    if (!res.ok) return null;
    const data = (await res.json()) as { results: UnsplashResult[] };
    return data.results?.[0]?.urls?.regular ?? null;
  } catch {
    return null;
  }
}

export async function fetchUnsplashImages(query: string, count = 5): Promise<string[]> {
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

export function buildImageSearchQuery(query: string): string {
  const q = query.toLowerCase();
  if (/酒店|住宿|民宿|hostel|hotel|旅馆|青旅/.test(q)) return `${query} 酒店外观 实拍`;
  if (/美食|餐厅|餐馆|小吃|咖啡|奶茶|酒吧|料理|拉面|寿司|烤肉/.test(q)) return `${query} 美食实拍`;
  if (/购物|商场|商店|市场|免税|百货/.test(q)) return `${query} 购物`;
  if (/机场|车站|地铁|交通|码头/.test(q)) return `${query} 实拍`;
  if (/海滩|沙滩|海岛|beach/.test(q)) return `${query} 海滩风景`;
  if (/寺|庙|神社|教堂|清真寺|temple|shrine/.test(q)) return `${query} 实景`;
  return `${query} 旅游实拍`;
}

export async function fetchBingImages(query: string): Promise<string[]> {
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

    const urlMatches = html.match(/murl&quot;:&quot;(https?:\/\/[^&]+)/g);
    if (!urlMatches || urlMatches.length === 0) return [];

    const urls = urlMatches.map((m) => m.replace('murl&quot;:&quot;', ''));

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

    const ranked: string[] = [];
    const seen = new Set<string>();
    const addUnique = (u: string) => { if (!seen.has(u)) { seen.add(u); ranked.push(u); } };

    for (const u of safeUrls) {
      if (preferredHosts.some((h) => u.includes(h))) addUnique(u);
    }
    for (const u of safeUrls) {
      if (u.startsWith("https://") && !skipUnreliable.some((h) => u.includes(h))) addUnique(u);
    }
    for (const u of safeUrls) addUnique(u);

    return ranked;
  } catch {
    return [];
  }
}

export async function fetchBingImage(query: string): Promise<string | null> {
  const results = await fetchBingImages(query);
  return results[0] ?? null;
}

export async function fetchWikipediaImage(query: string): Promise<string | null> {
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
        return page.thumbnail.source;
      }
    } catch {
      continue;
    }
  }
  return null;
}

export const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
];

let fallbackIdx = 0;

export function getCategoryFallback(_query: string): string {
  return FALLBACK_IMAGES[fallbackIdx++ % FALLBACK_IMAGES.length];
}

/** Validate a URL can actually serve an image */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-1023" },
      signal: AbortSignal.timeout(5000),
    });
    if (res.status !== 200 && res.status !== 206) return false;
    const ct = res.headers.get("content-type") || "";
    return ct.startsWith("image/") || ct.includes("octet-stream") || ct.includes("jpeg") || ct.includes("png");
  } catch { return false; }
}
