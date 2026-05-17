import { readFileSync, writeFileSync } from "fs";
import { feature } from "topojson-client";

const topo = JSON.parse(
  readFileSync(
    new URL("../node_modules/world-atlas/land-110m.json", import.meta.url),
    "utf8"
  )
);
const land = feature(topo, topo.objects.land);

const W = 1000;
const LAT_TOP = 78, LAT_BOT = -60;
const LAT_RANGE = LAT_TOP - LAT_BOT; // 138°
const H = Math.round((LAT_RANGE / 360) * W * 2); // ~767 → keep proportional
const ACTUAL_H = 680; // slightly compressed for better container fit

function project(lng, lat) {
  const x = ((lng + 180) / 360) * W;
  const y = ((LAT_TOP - Math.max(LAT_BOT, Math.min(LAT_TOP, lat))) / LAT_RANGE) * ACTUAL_H;
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

function ringToPath(ring) {
  return ring
    .map((pt, i) => `${i === 0 ? "M" : "L"}${project(pt[0], pt[1])}`)
    .join(" ") + " Z";
}

function geoToSvgPaths(geometry) {
  const paths = [];
  if (geometry.type === "Polygon") {
    for (const ring of geometry.coordinates) paths.push(ringToPath(ring));
  } else if (geometry.type === "MultiPolygon") {
    for (const poly of geometry.coordinates)
      for (const ring of poly) paths.push(ringToPath(ring));
  }
  return paths.join(" ");
}

let d = "";
if (land.type === "FeatureCollection") {
  for (const f of land.features) d += geoToSvgPaths(f.geometry) + " ";
} else {
  d = geoToSvgPaths(land.geometry);
}

// Grid lines
const gridLats = [60, 40, 20, 0, -20, -40];
const gridLngs = [-120, -60, 0, 60, 120];
const gridLines = [
  ...gridLats.map(lat => {
    const [, y] = project(0, lat).split(",");
    return `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
  }),
  ...gridLngs.map(lng => {
    const [x] = project(lng, 0).split(",");
    return `<line x1="${x}" y1="0" x2="${x}" y2="${ACTUAL_H}"/>`;
  }),
].join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${ACTUAL_H}">
  <defs>
    <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dae9f4"/>
      <stop offset="50%" stop-color="#d0e4f2"/>
      <stop offset="100%" stop-color="#c8dced"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${ACTUAL_H}" fill="url(#ocean)"/>
  <g stroke="#b8ceda" stroke-width="0.4" fill="none" opacity="0.3" stroke-dasharray="5 4">
    ${gridLines}
  </g>
  <path d="${d.trim()}" fill="#a8c4a2" fill-opacity="0.55" stroke="#8aad84" stroke-width="0.6" stroke-linejoin="round"/>
</svg>`;

writeFileSync(new URL("../public/world-map.svg", import.meta.url), svg);
console.log(`Generated public/world-map.svg (${Math.round(svg.length / 1024)} KB, ${W}×${ACTUAL_H})`);
