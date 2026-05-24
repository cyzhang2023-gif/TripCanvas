/**
 * WeatherForecast — 7-day horizontal scrollable weather cards
 * Aesthetic: SOFT ATMOSPHERIC with glassmorphism + temperature gradients
 */

import { useEffect, useState } from "react";

type DailyForecast = {
  date: string;
  dayName: string;
  weatherCode: number;
  weatherDesc: string;
  weatherEmoji: string;
  tempMax: number;
  tempMin: number;
  precipProb: number;
  clothingSuggestion: string;
};

type WeatherData = {
  lat: number;
  lng: number;
  days: DailyForecast[];
  fetchedAt: string;
};

/* ─── Temperature color helpers ─── */

function tempColor(temp: number): string {
  if (temp >= 35) return "text-red-500";
  if (temp >= 28) return "text-orange-500";
  if (temp >= 22) return "text-amber-500";
  if (temp >= 15) return "text-yellow-600";
  if (temp >= 8)  return "text-emerald-500";
  if (temp >= 0)  return "text-sky-500";
  return "text-blue-500";
}

function tempBgGradient(tempMax: number): string {
  if (tempMax >= 35) return "from-red-50/80 to-orange-50/60";
  if (tempMax >= 28) return "from-orange-50/80 to-amber-50/60";
  if (tempMax >= 22) return "from-amber-50/80 to-yellow-50/60";
  if (tempMax >= 15) return "from-emerald-50/80 to-green-50/60";
  if (tempMax >= 8)  return "from-sky-50/80 to-blue-50/60";
  return "from-blue-50/80 to-indigo-50/60";
}

function sectionBg(avgTemp: number): string {
  if (avgTemp >= 28) return "from-amber-100/30 via-orange-50/20 to-rose-50/10";
  if (avgTemp >= 18) return "from-sky-100/30 via-emerald-50/20 to-amber-50/10";
  return "from-slate-100/30 via-blue-50/20 to-indigo-50/10";
}

/* ─── Component ─── */

export function WeatherForecast({
  lat,
  lng,
  className = "",
}: {
  lat: number;
  lng: number;
  className?: string;
}) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/weather?lat=${lat}&lng=${lng}&days=7`)
      .then((r) => {
        if (!r.ok) throw new Error("获取天气失败");
        return r.json();
      })
      .then((json: WeatherData) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "未知错误");
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [lat, lng]);

  if (loading) {
    return (
      <div className={`rounded-2xl bg-white/60 backdrop-blur-sm p-4 shadow-sm ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="flex gap-2.5 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[120px] w-[88px] shrink-0 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data || data.days.length === 0) {
    return null; // Fail silently — weather is supplementary
  }

  const avgTemp = data.days.reduce((s, d) => s + (d.tempMax + d.tempMin) / 2, 0) / data.days.length;
  const todayClothing = data.days[0]?.clothingSuggestion;

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${sectionBg(avgTemp)} backdrop-blur-sm p-3.5 shadow-sm border border-white/40 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">{data.days[0]?.weatherEmoji ?? "🌤️"}</span>
          <div>
            <h3 className="text-[13px] font-bold text-slate-800">7日天气预报</h3>
            {todayClothing && (
              <p className="text-[10px] text-slate-500 mt-0.5">
                👔 {todayClothing}
              </p>
            )}
          </div>
        </div>
        <span className="text-[10px] text-slate-400">Open-Meteo</span>
      </div>

      {/* Scrollable cards */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {data.days.map((day, i) => (
          <div
            key={day.date}
            className={`shrink-0 rounded-xl bg-gradient-to-b ${tempBgGradient(day.tempMax)} backdrop-blur-md border border-white/50 px-3 py-2.5 shadow-sm transition-all`}
            style={{
              minWidth: 78,
              animationDelay: `${i * 80}ms`,
              animation: "fadeInUp 400ms ease-out both",
            }}
          >
            {/* Day name */}
            <p className={`text-center text-[11px] font-bold ${i === 0 ? "text-primary" : "text-slate-600"}`}>
              {day.dayName}
            </p>

            {/* Weather emoji */}
            <p className="text-center text-[24px] leading-[32px] mt-0.5">
              {day.weatherEmoji}
            </p>

            {/* Temp */}
            <div className="mt-1 flex items-baseline justify-center gap-1">
              <span className={`text-[15px] font-extrabold ${tempColor(day.tempMax)}`}>
                {day.tempMax}°
              </span>
              <span className="text-[11px] text-slate-400">
                {day.tempMin}°
              </span>
            </div>

            {/* Weather desc */}
            <p className="mt-0.5 text-center text-[9px] text-slate-500 truncate">
              {day.weatherDesc}
            </p>

            {/* Precipitation */}
            {day.precipProb > 0 && (
              <div className="mt-1 flex items-center justify-center gap-0.5">
                <span className="text-[8px]">💧</span>
                <span className={`text-[9px] font-medium ${day.precipProb >= 50 ? "text-blue-500" : "text-blue-400/70"}`}>
                  {day.precipProb}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Compact weather badge for destination cards.
 * Shows current weather icon + temp.
 */
export function WeatherBadge({
  lat,
  lng,
  className = "",
}: {
  lat: number;
  lng: number;
  className?: string;
}) {
  const [info, setInfo] = useState<{ emoji: string; temp: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/weather?lat=${lat}&lng=${lng}&days=1`)
      .then((r) => r.ok ? r.json() : null)
      .then((json: WeatherData | null) => {
        if (!cancelled && json?.days?.[0]) {
          setInfo({
            emoji: json.days[0].weatherEmoji,
            temp: json.days[0].tempMax,
          });
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [lat, lng]);

  if (!info) return null;

  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full bg-white/80 backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-medium shadow-sm ${className}`}>
      <span>{info.emoji}</span>
      <span className={tempColor(info.temp)}>{info.temp}°</span>
    </span>
  );
}
