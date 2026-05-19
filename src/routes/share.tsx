import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Copy, Download, Globe, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { StatusBar } from "@/components/PhoneFrame";
import { coverUrl, useTripQuery, type Trip } from "@/lib/tripStore";

export const Route = createFileRoute("/share")({
  component: Share,
  validateSearch: z.object({ id: z.string().default("tokyo-5") }),
  head: () => ({ meta: [{ title: "分享行程 · Routey" }] }),
});

const templates = ["清新", "简约", "艺术", "手绘", "地图风"];
const platforms = ["微信", "朋友圈", "小红书", "Instagram", "更多"];

function Share() {
  const { id } = Route.useSearch();
  const { data: trip } = useTripQuery(id);
  const [template, setTemplate] = useState(templates[0]);
  const summary = useMemo(() => (trip ? buildSummary(trip) : ""), [trip]);

  const download = () => {
    if (!trip) return;
    const url = URL.createObjectURL(new Blob([summary], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${trip.name}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadMapHtml = () => {
    if (!trip) return;
    const html = buildMapHtml(trip);
    const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${trip.name}-地图.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    if (!summary) return;
    if ("share" in navigator) {
      await navigator
        .share({ title: trip?.name ?? "Routey 行程", text: summary })
        .catch(() => undefined);
    } else {
      await navigator.clipboard?.writeText(summary);
    }
  };

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        行程不存在 ·{" "}
        <Link to="/my-trips" className="ml-1 text-primary">
          返回
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10" style={{ background: "var(--gradient-soft)" }}>
      <StatusBar />
      <header className="relative flex items-center justify-center px-6 pb-3 pt-2">
        <Link to="/trip" search={{ id: trip.id }} className="absolute left-6">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-semibold">分享行程</h1>
        <button onClick={download} className="absolute right-6" aria-label="下载">
          <Download className="h-5 w-5" />
        </button>
      </header>

      <div className="mx-5 mt-3 overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-glow)]">
        <div className="relative">
          <img
            src={trip.coverUrl || coverUrl(trip.cover, trip.country, trip.destination)}
            alt={trip.name}
            className="h-72 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-black/40" />
          <div className="absolute inset-x-0 top-6 text-center text-foreground">
            <h2 className="mx-auto max-w-72 truncate text-3xl font-bold">{trip.name}</h2>
            <p className="mt-1 text-xs opacity-70">{trip.date}</p>
          </div>
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/88 p-3 text-xs text-foreground backdrop-blur">
            {trip.days.slice(0, 3).map((day) => (
              <p key={day.id} className="truncate">
                {day.label}: {day.route}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-md text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              R
            </span>
            Routey
          </span>
          <span className="text-xs text-muted-foreground">{template}模板</span>
        </div>
      </div>

      <section className="px-5 pt-6">
        <p className="text-sm font-semibold">选择模板</p>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {templates.map((item, index) => (
            <button key={item} onClick={() => setTemplate(item)} className="shrink-0 text-center">
              <div
                className={`h-20 w-16 rounded-xl ${item === template ? "ring-2 ring-primary" : ""} shadow-[var(--shadow-card)]`}
                style={{ background: templateGradient(index) }}
              />
              <p className="mt-1.5 text-xs text-muted-foreground">{item}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Generate standalone map HTML */}
      <section className="px-5 pt-6">
        <p className="text-sm font-semibold">导出地图页</p>
        <p className="mt-1 text-xs text-muted-foreground">生成独立 HTML 文件，包含交互地图 + 时间线，可直接部署分享</p>
        <button
          onClick={downloadMapHtml}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white shadow-lg transition active:scale-[0.98]"
          style={{ background: "var(--gradient-hero)" }}
        >
          <Globe className="h-4 w-4" /> 生成交互地图 HTML
        </button>
      </section>

      <section className="px-5 pt-6">
        <p className="text-sm font-semibold">分享到</p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {platforms.map((platform) => (
            <button key={platform} onClick={share} className="flex flex-col items-center gap-1.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-[var(--shadow-card)]">
                {platform === "更多" ? (
                  <Send className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4 text-primary" />
                )}
              </span>
              <span className="text-xs text-muted-foreground">{platform}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function buildSummary(trip: Trip) {
  return [
    `${trip.name} (${trip.date})`,
    ...trip.days.map(
      (day) => `${day.label} ${day.route}: ${day.spots.map((spot) => spot.title).join(" -> ")}`,
    ),
    "Generated by Routey",
  ].join("\n");
}

function templateGradient(index: number) {
  return [
    "linear-gradient(135deg, oklch(0.52 0.18 250), oklch(0.42 0.16 255))",
    "linear-gradient(135deg, oklch(0.95 0.01 250), oklch(0.72 0.08 255))",
    "linear-gradient(135deg, oklch(0.48 0.14 260), oklch(0.38 0.12 255))",
    "linear-gradient(135deg, oklch(0.60 0.14 245), oklch(0.50 0.16 255))",
    "linear-gradient(135deg, oklch(0.45 0.16 255), oklch(0.55 0.12 250))",
  ][index];
}

const DAY_COLORS = ["#4361ee","#f72585","#4cc9f0","#7209b7","#3a0ca3","#f77f00","#06d6a0","#ef476f","#118ab2","#073b4c"];
const TYPE_COLORS: Record<string, string> = { "美食": "#f97316", "景点": "#3b82f6", "购物": "#ec4899", "住宿": "#10b981", "休闲": "#8b5cf6" };

function esc(s: string) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

function buildMapHtml(trip: Trip) {
  const spots = trip.days.flatMap((d, di) => d.spots.filter(s => s.lat && s.lng).map(s => ({ ...s, dayIndex: di, dayLabel: d.label })));
  const center = spots.length > 0
    ? { lat: spots.reduce((s,p) => s + p.lat!, 0) / spots.length, lng: spots.reduce((s,p) => s + p.lng!, 0) / spots.length }
    : { lat: 35.68, lng: 139.76 };

  const markersJs = spots.map((s, i) => {
    const c = DAY_COLORS[s.dayIndex % DAY_COLORS.length];
    const tc = TYPE_COLORS[s.category ?? "景点"] ?? "#3b82f6";
    const payHtml = s.payment?.length ? `<div style="margin-top:4px;display:flex;gap:3px;flex-wrap:wrap">${s.payment.map(p => `<span style="background:#d1fae5;color:#065f46;padding:1px 6px;border-radius:99px;font-size:10px">${esc(p)}</span>`).join("")}</div>` : "";
    const backupHtml = s.backup ? `<div style="margin-top:4px;font-size:10px;color:#60a5fa">☂ 备选: ${esc(s.backup)}</div>` : "";
    const navHtml = `<div style="margin-top:6px;display:flex;gap:6px"><a href="https://uri.amap.com/navigation?to=${s.lng},${s.lat},${encodeURIComponent(s.title)}&mode=walking" target="_blank" style="font-size:11px;color:#4361ee;text-decoration:none">高德</a><a href="https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}&travelmode=walking" target="_blank" style="font-size:11px;color:#16a34a;text-decoration:none">Google</a><a href="https://maps.apple.com/?daddr=${s.lat},${s.lng}&dirflg=w" target="_blank" style="font-size:11px;color:#6b7280;text-decoration:none">Apple</a></div>`;
    return `L.circleMarker([${s.lat},${s.lng}],{radius:8,fillColor:"${c}",color:"#fff",weight:2,fillOpacity:0.9}).addTo(map).bindPopup('<div style="min-width:180px"><b>${esc(s.title)}</b><br><span style="font-size:11px;color:${tc}">${esc(s.category ?? "景点")}</span> · <span style="font-size:11px">${esc(s.time)}</span>${s.rating ? ` · ⭐${s.rating}` : ""}${s.price ? `<br><span style="font-size:11px">${esc(s.price)}</span>` : ""}${payHtml}${backupHtml}${navHtml}</div>');`;
  }).join("\n");

  const polylineJs = trip.days.map((d, di) => {
    const pts = d.spots.filter(s => s.lat && s.lng).map(s => `[${s.lat},${s.lng}]`);
    if (pts.length < 2) return "";
    return `L.polyline([${pts.join(",")}],{color:"${DAY_COLORS[di % DAY_COLORS.length]}",weight:3,opacity:0.6,dashArray:"6 4"}).addTo(map);`;
  }).join("\n");

  const timelineHtml = trip.days.map((d, di) => {
    const c = DAY_COLORS[di % DAY_COLORS.length];
    const spotsHtml = d.spots.map(s => {
      const tc = TYPE_COLORS[s.category ?? "景点"] ?? "#3b82f6";
      const payChips = s.payment?.length ? `<div style="margin-top:3px;display:flex;gap:3px;flex-wrap:wrap">${s.payment.map(p => `<span style="background:#d1fae5;color:#065f46;padding:1px 5px;border-radius:99px;font-size:9px">${esc(p)}</span>`).join("")}</div>` : "";
      const backupLine = s.backup ? `<div style="font-size:10px;color:#60a5fa;margin-top:2px">☂ ${esc(s.backup)}</div>` : "";
      const links = [
        s.xhsUrl ? `<a href="${esc(s.xhsUrl)}" target="_blank" style="font-size:10px;color:#f87171;text-decoration:none">📕小红书</a>` : "",
        s.dpUrl ? `<a href="${esc(s.dpUrl)}" target="_blank" style="font-size:10px;color:#fb923c;text-decoration:none">⭐点评</a>` : "",
      ].filter(Boolean).join(" ");
      const linksHtml = links ? `<div style="margin-top:3px">${links}</div>` : "";
      return `<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;text-align:right;font-size:12px;font-weight:600;color:#64748b;padding-top:2px">${esc(s.time)}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-size:13px;font-weight:700">${esc(s.title)}</span>
            <span style="background:${tc}15;color:${tc};padding:1px 6px;border-radius:99px;font-size:9px;font-weight:600">${esc(s.category ?? "景点")}</span>
            ${s.rating ? `<span style="font-size:10px;color:#f59e0b">⭐${s.rating}</span>` : ""}
          </div>
          ${s.desc ? `<div style="font-size:11px;color:#94a3b8;margin-top:2px">${esc(s.desc)}</div>` : ""}
          ${s.price ? `<div style="font-size:11px;color:#64748b;margin-top:1px">${esc(s.price)}</div>` : ""}
          ${payChips}${backupLine}${linksHtml}
        </div>
      </div>`;
    }).join("");
    return `<div style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="background:${c};color:#fff;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:700">${esc(d.label)}</span>
        <span style="font-size:13px;font-weight:600;color:#334155">${esc(d.route)}</span>
      </div>
      ${spotsHtml}
    </div>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(trip.name)} - Routey</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif;background:#f8fafc;color:#1e293b}
.header{background:linear-gradient(135deg,#4361ee,#3a0ca3);color:#fff;padding:40px 20px 30px;text-align:center}
.header h1{font-size:24px;font-weight:800;margin-bottom:4px}
.header p{font-size:13px;opacity:.75}
#map{height:40vh;width:100%;z-index:1}
.legend{display:flex;gap:8px;flex-wrap:wrap;padding:12px 16px;background:#fff;border-bottom:1px solid #e2e8f0}
.legend span{display:flex;align-items:center;gap:4px;font-size:11px;font-weight:600;color:#64748b;cursor:pointer}
.legend .dot{width:10px;height:10px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.15)}
.timeline{max-width:600px;margin:0 auto;padding:20px 16px 60px}
.footer{text-align:center;padding:20px;font-size:11px;color:#94a3b8}
</style>
</head>
<body>
<div class="header">
  <h1>${esc(trip.name)}</h1>
  <p>${esc(trip.date)}${trip.destination ? ` · ${esc(trip.destination)}` : ""}</p>
</div>
<div id="map"></div>
<div class="legend">${trip.days.map((d, i) => `<span onclick="flyTo(${i})"><span class="dot" style="background:${DAY_COLORS[i % DAY_COLORS.length]}"></span>${esc(d.label)} ${esc(d.route)}</span>`).join("")}</div>
<div class="timeline">${timelineHtml}</div>
<div class="footer">Generated by Routey · AI 智能旅行规划</div>
<script>
var map=L.map('map').setView([${center.lat},${center.lng}],12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{maxZoom:19,attribution:'Routey'}).addTo(map);
${markersJs}
${polylineJs}
var bounds=L.latLngBounds([${spots.map(s => `[${s.lat},${s.lng}]`).join(",")}]);
if(bounds.isValid())map.fitBounds(bounds,{padding:[30,30]});
var dayBounds=[${trip.days.map((d) => {
    const pts = d.spots.filter(s => s.lat && s.lng).map(s => `[${s.lat},${s.lng}]`);
    return `[${pts.join(",")}]`;
  }).join(",")}];
function flyTo(i){var b=L.latLngBounds(dayBounds[i]);if(b.isValid())map.fitBounds(b,{padding:[40,40]})}
<\/script>
</body>
</html>`;
}
