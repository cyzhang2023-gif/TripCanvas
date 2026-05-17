import { readFileSync, writeFileSync } from "fs";
import { feature } from "topojson-client";

const topo = JSON.parse(
  readFileSync(
    new URL("../node_modules/world-atlas/countries-110m.json", import.meta.url),
    "utf8"
  )
);
const countries = feature(topo, topo.objects.countries);

const W = 1000;
const LAT_TOP = 78, LAT_BOT = -60;
const LAT_RANGE = LAT_TOP - LAT_BOT; // 138°
const H = 550; // ~1.82:1 ratio — taller than true equirectangular for a natural map look

function project(lng, lat) {
  const x = ((lng + 180) / 360) * W;
  const y = ((LAT_TOP - Math.max(LAT_BOT, Math.min(LAT_TOP, lat))) / LAT_RANGE) * H;
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

const palette = [
  "#a8d8b9", "#f7d1a6", "#b5cfe0", "#e6c2d9", "#c9e4a5", "#f5c6aa",
  "#a9c8e8", "#d4e8b0", "#f0d5c8", "#b8d4cb", "#e8d4a2", "#c3b8d8",
];

const countryPaths = countries.features.map((f, i) => {
  const d = geoToSvgPaths(f.geometry);
  if (!d.trim()) return "";
  const color = palette[i % palette.length];
  return `  <path d="${d}" fill="${color}" stroke="#fff" stroke-width="0.5" stroke-linejoin="round"/>`;
}).filter(Boolean).join("\n");

const gridLats = [60, 40, 20, 0, -20, -40];
const gridLngs = [-120, -60, 0, 60, 120];
const gridLines = [
  ...gridLats.map(lat => {
    const [, y] = project(0, lat).split(",");
    return `    <line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
  }),
  ...gridLngs.map(lng => {
    const [x] = project(lng, 0).split(",");
    return `    <line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`;
  }),
].join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d6ebf5"/>
      <stop offset="50%" stop-color="#c8e1f0"/>
      <stop offset="100%" stop-color="#bdd8ec"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#ocean)"/>
  <g stroke="#d0e2ee" stroke-width="0.3" fill="none" opacity="0.3" stroke-dasharray="5 4">
${gridLines}
  </g>
${countryPaths}
</svg>`;

writeFileSync(new URL("../public/world-map.svg", import.meta.url), svg);
console.log(`Generated public/world-map.svg (${Math.round(svg.length / 1024)} KB, ${W}×${H})`);
