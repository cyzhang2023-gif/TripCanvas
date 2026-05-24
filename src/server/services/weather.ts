/**
 * Weather service using Open-Meteo API (free, no API key needed).
 * Results are cached in memory for 1 hour.
 */

import { TTLCache } from "../../lib/ttl-cache";

/* ─── Types ─── */

export type DailyForecast = {
  date: string;          // "2024-03-15"
  dayName: string;       // "周五"
  weatherCode: number;   // WMO weather code
  weatherDesc: string;   // Chinese description
  weatherEmoji: string;  // Emoji icon
  tempMax: number;       // Celsius
  tempMin: number;       // Celsius
  precipProb: number;    // 0-100
  clothingSuggestion: string; // Based on temp range
};

export type WeatherForecastResult = {
  lat: number;
  lng: number;
  days: DailyForecast[];
  fetchedAt: string;
};

/* ─── WMO Weather Code Mapping ─── */

const weatherCodeMap: Record<number, { desc: string; emoji: string }> = {
  0:  { desc: "晴朗",     emoji: "☀️" },
  1:  { desc: "大部晴朗", emoji: "🌤️" },
  2:  { desc: "多云",     emoji: "⛅" },
  3:  { desc: "阴天",     emoji: "☁️" },
  45: { desc: "有雾",     emoji: "🌫️" },
  48: { desc: "雾凇",     emoji: "🌫️" },
  51: { desc: "小毛毛雨", emoji: "🌦️" },
  53: { desc: "毛毛雨",   emoji: "🌦️" },
  55: { desc: "大毛毛雨", emoji: "🌧️" },
  56: { desc: "冻毛毛雨", emoji: "🌧️" },
  57: { desc: "冻雨",     emoji: "🌧️" },
  61: { desc: "小雨",     emoji: "🌧️" },
  63: { desc: "中雨",     emoji: "🌧️" },
  65: { desc: "大雨",     emoji: "🌧️" },
  66: { desc: "冻雨",     emoji: "🌧️" },
  67: { desc: "大冻雨",   emoji: "🌧️" },
  71: { desc: "小雪",     emoji: "🌨️" },
  73: { desc: "中雪",     emoji: "🌨️" },
  75: { desc: "大雪",     emoji: "❄️" },
  77: { desc: "雪粒",     emoji: "❄️" },
  80: { desc: "阵雨",     emoji: "🌦️" },
  81: { desc: "中阵雨",   emoji: "🌧️" },
  82: { desc: "暴雨",     emoji: "⛈️" },
  85: { desc: "小阵雪",   emoji: "🌨️" },
  86: { desc: "大阵雪",   emoji: "❄️" },
  95: { desc: "雷暴",     emoji: "⛈️" },
  96: { desc: "雷暴+小冰雹", emoji: "⛈️" },
  99: { desc: "雷暴+冰雹",   emoji: "⛈️" },
};

function getWeatherInfo(code: number): { desc: string; emoji: string } {
  return weatherCodeMap[code] ?? { desc: "未知", emoji: "🌤️" };
}

/* ─── Day name helpers ─── */

const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

function getDayName(dateStr: string, index: number): string {
  if (index === 0) return "今天";
  if (index === 1) return "明天";
  const d = new Date(dateStr + "T00:00:00");
  return dayNames[d.getDay()] ?? "未知";
}

/* ─── Clothing suggestion ─── */

function clothingSuggestion(tempMax: number, tempMin: number): string {
  const avg = (tempMax + tempMin) / 2;
  if (avg >= 35) return "极热，轻薄透气衣物+防晒";
  if (avg >= 28) return "短袖短裤，注意防晒";
  if (avg >= 22) return "T恤+薄外套";
  if (avg >= 15) return "长袖+轻便外套";
  if (avg >= 8)  return "厚外套+毛衣";
  if (avg >= 0)  return "羽绒服+保暖内衣";
  return "极寒，做好全面保暖";
}

/* ─── Cache ─── */

const weatherCache = new TTLCache<string, WeatherForecastResult>({
  maxSize: 200,
  ttlMs: 60 * 60 * 1000, // 1 hour
});

function cacheKey(lat: number, lng: number, days: number): string {
  // Round to 2 decimal places to group nearby locations
  return `${lat.toFixed(2)},${lng.toFixed(2)},${days}`;
}

/* ─── Main function ─── */

export async function getWeatherForecast(
  lat: number,
  lng: number,
  days = 7,
): Promise<WeatherForecastResult> {
  const key = cacheKey(lat, lng, days);
  const cached = weatherCache.get(key);
  if (cached) return cached;

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat.toFixed(4));
  url.searchParams.set("longitude", lng.toFixed(4));
  url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", String(Math.min(days, 16)));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Open-Meteo API error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as {
    daily: {
      time: string[];
      weather_code: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_probability_max: number[];
    };
  };

  const daily = data.daily;
  const forecastDays: DailyForecast[] = daily.time.map((date, i) => {
    const code = daily.weather_code[i] ?? 0;
    const info = getWeatherInfo(code);
    const tempMax = Math.round(daily.temperature_2m_max[i] ?? 0);
    const tempMin = Math.round(daily.temperature_2m_min[i] ?? 0);
    return {
      date,
      dayName: getDayName(date, i),
      weatherCode: code,
      weatherDesc: info.desc,
      weatherEmoji: info.emoji,
      tempMax,
      tempMin,
      precipProb: Math.round(daily.precipitation_probability_max[i] ?? 0),
      clothingSuggestion: clothingSuggestion(tempMax, tempMin),
    };
  });

  const result: WeatherForecastResult = {
    lat,
    lng,
    days: forecastDays,
    fetchedAt: new Date().toISOString(),
  };

  weatherCache.set(key, result);
  return result;
}
