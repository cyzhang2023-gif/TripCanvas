/** Weather API route */

import { getWeatherForecast } from "../services/weather";
import { apiJson, apiError } from "../utils";

export async function handleWeatherRoutes(
  pathname: string,
  url: URL,
  request: Request,
): Promise<Response | undefined> {
  // GET /api/weather?lat=XX&lng=YY&days=7
  if (pathname === "/api/weather" && request.method === "GET") {
    const latStr = url.searchParams.get("lat");
    const lngStr = url.searchParams.get("lng");
    const daysStr = url.searchParams.get("days");

    if (!latStr || !lngStr) {
      return apiError(400, "请提供 lat 和 lng 参数");
    }

    const lat = Number(latStr);
    const lng = Number(lngStr);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return apiError(400, "lat 和 lng 必须为有效数字");
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return apiError(400, "lat 或 lng 超出有效范围");
    }

    const days = daysStr ? Math.min(Math.max(Number(daysStr) || 7, 1), 16) : 7;

    try {
      const forecast = await getWeatherForecast(lat, lng, days);
      // Cache for 30 minutes on the client side
      return apiJson(forecast, 200, 1800);
    } catch (err) {
      console.error("[Weather] API error:", err);
      return apiError(502, "天气数据获取失败，请稍后重试");
    }
  }

  return undefined;
}
