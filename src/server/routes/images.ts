/** Image API routes — spot images with multi-source fallback */

import { TTLCache } from "../../lib/ttl-cache";
import { apiJson, apiError } from "../utils";
import {
  fetchUnsplashImage, fetchUnsplashImages,
  fetchPexelsImage, fetchPexelsImages,
  fetchBingImages, fetchBingImage,
  getCategoryFallback,
} from "../services/image-fetcher";

const spotImageCache = new TTLCache<string, string>({ maxSize: 1000, ttlMs: 60 * 60 * 1000 });

export async function handleImageRoutes(
  pathname: string,
  url: URL,
  request: Request,
): Promise<Response | undefined> {
  // GET /api/spot-images — batch image URLs
  if (pathname === "/api/spot-images" && request.method === "GET") {
    const query = url.searchParams.get("q") ?? "";
    const count = Math.min(parseInt(url.searchParams.get("count") ?? "6"), 12);
    if (!query) return apiError(400, "缺少搜索词");

    const batchKey = `__batch__${query}__${count}`;
    const cachedBatch = spotImageCache.get(batchKey);
    if (cachedBatch) {
      return apiJson(JSON.parse(cachedBatch), 200, 3600);
    }

    const unsplashResults = await fetchUnsplashImages(query, count);
    const results = unsplashResults.slice(0, count);

    if (results.length < count) {
      const pexelsResults = await fetchPexelsImages(query, count - results.length);
      for (const u of pexelsResults) {
        if (results.length >= count) break;
        if (!results.includes(u)) results.push(u);
      }
    }

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

  // GET /api/spot-image — single image redirect
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
    if (cachedUrl) return imgRedirect(cachedUrl);

    const unsplashUrl = await fetchUnsplashImage(query);
    if (unsplashUrl) {
      spotImageCache.set(query, unsplashUrl);
      return imgRedirect(unsplashUrl);
    }

    const pexelsUrl = await fetchPexelsImage(query);
    if (pexelsUrl) {
      spotImageCache.set(query, pexelsUrl);
      return imgRedirect(pexelsUrl);
    }

    const bingUrl = await fetchBingImage(query);
    if (bingUrl) {
      spotImageCache.set(query, bingUrl);
      return imgRedirect(bingUrl);
    }

    const fallback = getCategoryFallback(query);
    spotImageCache.set(query, fallback);
    return imgRedirect(fallback);
  }

  return undefined;
}
