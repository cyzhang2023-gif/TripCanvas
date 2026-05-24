import{a as N,r as b,j as t,L as y}from"./index-CPoPtYdV.js";import{S as z}from"./PhoneFrame-DSnCsz5J.js";import{u as L,c as R}from"./tripStore-C13ToksA.js";import{C as U}from"./chevron-left-C2OVoBRy.js";import{c as j}from"./createLucideIcon-Cq_oTmMM.js";import{G as C}from"./globe-Bfgua0dr.js";import{C as T}from"./copy-DtyQOp4c.js";const S=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],B=j("download",S);const H=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],M=j("send",H),v=["清新","简约","艺术","手绘","地图风"],_=["微信","朋友圈","小红书","Instagram","更多"];function J(){const{id:l}=N.useSearch(),{data:n}=L(l),[c,x]=b.useState(v[0]),p=b.useMemo(()=>n?O(n):"",[n]),f=()=>{if(!n)return;const a=URL.createObjectURL(new Blob([p],{type:"text/plain;charset=utf-8"})),i=document.createElement("a");i.href=a,i.download=`${n.name}.txt`,i.click(),URL.revokeObjectURL(a)},e=()=>{if(!n)return;const a=E(n),i=URL.createObjectURL(new Blob([a],{type:"text/html;charset=utf-8"})),o=document.createElement("a");o.href=i,o.download=`${n.name}-地图.html`,o.click(),URL.revokeObjectURL(i)},r=async()=>{p&&("share"in navigator?await navigator.share({title:n?.name??"Routey 行程",text:p}).catch(()=>{}):await navigator.clipboard?.writeText(p))};return n?t.jsxs("div",{className:"min-h-screen pb-10",style:{background:"var(--gradient-soft)"},children:[t.jsx(z,{}),t.jsxs("header",{className:"relative flex items-center justify-center px-6 pb-3 pt-2",children:[t.jsx(y,{to:"/trip",search:{id:n.id},className:"absolute left-6",children:t.jsx(U,{className:"h-6 w-6"})}),t.jsx("h1",{className:"text-lg font-semibold",children:"分享行程"}),t.jsx("button",{onClick:f,className:"absolute right-6","aria-label":"下载",children:t.jsx(B,{className:"h-5 w-5"})})]}),t.jsxs("div",{className:"mx-5 mt-3 overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-glow)]",children:[t.jsxs("div",{className:"relative",children:[t.jsx("img",{src:n.coverUrl||R(n.cover,n.country,n.destination),alt:n.name,className:"h-72 w-full object-cover",loading:"lazy"}),t.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-black/40"}),t.jsxs("div",{className:"absolute inset-x-0 top-6 text-center text-foreground",children:[t.jsx("h2",{className:"mx-auto max-w-72 truncate text-3xl font-bold",children:n.name}),t.jsx("p",{className:"mt-1 text-xs opacity-70",children:n.date})]}),t.jsx("div",{className:"absolute inset-x-5 bottom-5 rounded-2xl bg-white/88 p-3 text-xs text-foreground backdrop-blur",children:n.days.slice(0,3).map(a=>t.jsxs("p",{className:"truncate",children:[a.label,": ",a.route]},a.id))})]}),t.jsxs("div",{className:"flex items-center justify-between px-5 py-3",children:[t.jsxs("span",{className:"flex items-center gap-1.5 text-sm font-bold text-primary",children:[t.jsx("span",{className:"flex h-6 w-6 items-center justify-center rounded-md text-white",style:{background:"var(--gradient-hero)"},children:"R"}),"Routey"]}),t.jsxs("span",{className:"text-xs text-muted-foreground",children:[c,"模板"]})]})]}),t.jsxs("section",{className:"px-5 pt-6",children:[t.jsx("p",{className:"text-sm font-semibold",children:"选择模板"}),t.jsx("div",{className:"mt-3 flex gap-3 overflow-x-auto pb-2",children:v.map((a,i)=>t.jsxs("button",{onClick:()=>x(a),className:"shrink-0 text-center",children:[t.jsx("div",{className:`h-20 w-16 rounded-xl ${a===c?"ring-2 ring-primary":""} shadow-[var(--shadow-card)]`,style:{background:I(i)}}),t.jsx("p",{className:"mt-1.5 text-xs text-muted-foreground",children:a})]},a))})]}),t.jsxs("section",{className:"px-5 pt-6",children:[t.jsx("p",{className:"text-sm font-semibold",children:"导出地图页"}),t.jsx("p",{className:"mt-1 text-xs text-muted-foreground",children:"生成独立 HTML 文件，包含交互地图 + 时间线，可直接部署分享"}),t.jsxs("button",{onClick:e,className:"mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white shadow-lg transition active:scale-[0.98]",style:{background:"var(--gradient-hero)"},children:[t.jsx(C,{className:"h-4 w-4"})," 生成交互地图 HTML"]})]}),t.jsxs("section",{className:"px-5 pt-6",children:[t.jsx("p",{className:"text-sm font-semibold",children:"分享到"}),t.jsx("div",{className:"mt-3 grid grid-cols-5 gap-2",children:_.map(a=>t.jsxs("button",{onClick:r,className:"flex flex-col items-center gap-1.5",children:[t.jsx("span",{className:"flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-[var(--shadow-card)]",children:a==="更多"?t.jsx(M,{className:"h-4 w-4 text-primary"}):t.jsx(T,{className:"h-4 w-4 text-primary"})}),t.jsx("span",{className:"text-xs text-muted-foreground",children:a})]},a))})]})]}):t.jsxs("div",{className:"flex min-h-screen items-center justify-center text-sm text-muted-foreground",children:["行程不存在 ·"," ",t.jsx(y,{to:"/my-trips",className:"ml-1 text-primary",children:"返回"})]})}function O(l){return[`${l.name} (${l.date})`,...l.days.map(n=>`${n.label} ${n.route}: ${n.spots.map(c=>c.title).join(" -> ")}`),"Generated by Routey"].join(`
`)}function I(l){return["linear-gradient(135deg, oklch(0.52 0.18 250), oklch(0.42 0.16 255))","linear-gradient(135deg, oklch(0.95 0.01 250), oklch(0.72 0.08 255))","linear-gradient(135deg, oklch(0.48 0.14 260), oklch(0.38 0.12 255))","linear-gradient(135deg, oklch(0.60 0.14 245), oklch(0.50 0.16 255))","linear-gradient(135deg, oklch(0.45 0.16 255), oklch(0.55 0.12 250))"][l]}const d=["#4361ee","#f72585","#4cc9f0","#7209b7","#3a0ca3","#f77f00","#06d6a0","#ef476f","#118ab2","#073b4c"],$={美食:"#f97316",景点:"#3b82f6",购物:"#ec4899",住宿:"#10b981",休闲:"#8b5cf6"};function s(l){return l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function E(l){const n=l.days.flatMap((e,r)=>e.spots.filter(a=>a.lat&&a.lng).map(a=>({...a,dayIndex:r,dayLabel:e.label}))),c=n.length>0?{lat:n.reduce((e,r)=>e+r.lat,0)/n.length,lng:n.reduce((e,r)=>e+r.lng,0)/n.length}:{lat:35.68,lng:139.76},x=n.map((e,r)=>{const a=d[e.dayIndex%d.length],i=$[e.category??"景点"]??"#3b82f6",o=e.payment?.length?`<div style="margin-top:4px;display:flex;gap:3px;flex-wrap:wrap">${e.payment.map(h=>`<span style="background:#d1fae5;color:#065f46;padding:1px 6px;border-radius:99px;font-size:10px">${s(h)}</span>`).join("")}</div>`:"",m=e.backup?`<div style="margin-top:4px;font-size:10px;color:#60a5fa">☂ 备选: ${s(e.backup)}</div>`:"",g=`<div style="margin-top:6px;display:flex;gap:6px"><a href="https://uri.amap.com/navigation?to=${e.lng},${e.lat},${encodeURIComponent(e.title)}&mode=walking" target="_blank" style="font-size:11px;color:#4361ee;text-decoration:none">高德</a><a href="https://www.google.com/maps/dir/?api=1&destination=${e.lat},${e.lng}&travelmode=walking" target="_blank" style="font-size:11px;color:#16a34a;text-decoration:none">Google</a><a href="https://maps.apple.com/?daddr=${e.lat},${e.lng}&dirflg=w" target="_blank" style="font-size:11px;color:#6b7280;text-decoration:none">Apple</a></div>`;return`L.circleMarker([${e.lat},${e.lng}],{radius:8,fillColor:"${a}",color:"#fff",weight:2,fillOpacity:0.9}).addTo(map).bindPopup('<div style="min-width:180px"><b>${s(e.title)}</b><br><span style="font-size:11px;color:${i}">${s(e.category??"景点")}</span> · <span style="font-size:11px">${s(e.time)}</span>${e.rating?` · ⭐${e.rating}`:""}${e.price?`<br><span style="font-size:11px">${s(e.price)}</span>`:""}${o}${m}${g}</div>');`}).join(`
`),p=l.days.map((e,r)=>{const a=e.spots.filter(i=>i.lat&&i.lng).map(i=>`[${i.lat},${i.lng}]`);return a.length<2?"":`L.polyline([${a.join(",")}],{color:"${d[r%d.length]}",weight:3,opacity:0.6,dashArray:"6 4"}).addTo(map);`}).join(`
`),f=l.days.map((e,r)=>{const a=d[r%d.length],i=e.spots.map(o=>{const m=$[o.category??"景点"]??"#3b82f6",g=o.payment?.length?`<div style="margin-top:3px;display:flex;gap:3px;flex-wrap:wrap">${o.payment.map(k=>`<span style="background:#d1fae5;color:#065f46;padding:1px 5px;border-radius:99px;font-size:9px">${s(k)}</span>`).join("")}</div>`:"",h=o.backup?`<div style="font-size:10px;color:#60a5fa;margin-top:2px">☂ ${s(o.backup)}</div>`:"",u=[o.xhsUrl?`<a href="${s(o.xhsUrl)}" target="_blank" style="font-size:10px;color:#f87171;text-decoration:none">📕小红书</a>`:"",o.dpUrl?`<a href="${s(o.dpUrl)}" target="_blank" style="font-size:10px;color:#fb923c;text-decoration:none">⭐点评</a>`:""].filter(Boolean).join(" "),w=u?`<div style="margin-top:3px">${u}</div>`:"";return`<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9">
        <div style="width:40px;text-align:right;font-size:12px;font-weight:600;color:#64748b;padding-top:2px">${s(o.time)}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:6px">
            <span style="font-size:13px;font-weight:700">${s(o.title)}</span>
            <span style="background:${m}15;color:${m};padding:1px 6px;border-radius:99px;font-size:9px;font-weight:600">${s(o.category??"景点")}</span>
            ${o.rating?`<span style="font-size:10px;color:#f59e0b">⭐${o.rating}</span>`:""}
          </div>
          ${o.desc?`<div style="font-size:11px;color:#94a3b8;margin-top:2px">${s(o.desc)}</div>`:""}
          ${o.price?`<div style="font-size:11px;color:#64748b;margin-top:1px">${s(o.price)}</div>`:""}
          ${g}${h}${w}
        </div>
      </div>`}).join("");return`<div style="margin-bottom:20px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="background:${a};color:#fff;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:700">${s(e.label)}</span>
        <span style="font-size:13px;font-weight:600;color:#334155">${s(e.route)}</span>
      </div>
      ${i}
    </div>`}).join("");return`<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${s(l.name)} - Routey</title>
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
  <h1>${s(l.name)}</h1>
  <p>${s(l.date)}${l.destination?` · ${s(l.destination)}`:""}</p>
</div>
<div id="map"></div>
<div class="legend">${l.days.map((e,r)=>`<span onclick="flyTo(${r})"><span class="dot" style="background:${d[r%d.length]}"></span>${s(e.label)} ${s(e.route)}</span>`).join("")}</div>
<div class="timeline">${f}</div>
<div class="footer">Generated by Routey · AI 智能旅行规划</div>
<script>
var map=L.map('map').setView([${c.lat},${c.lng}],12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{maxZoom:19,attribution:'Routey'}).addTo(map);
${x}
${p}
var bounds=L.latLngBounds([${n.map(e=>`[${e.lat},${e.lng}]`).join(",")}]);
if(bounds.isValid())map.fitBounds(bounds,{padding:[30,30]});
var dayBounds=[${l.days.map(e=>`[${e.spots.filter(a=>a.lat&&a.lng).map(a=>`[${a.lat},${a.lng}]`).join(",")}]`).join(",")}];
function flyTo(i){var b=L.latLngBounds(dayBounds[i]);if(b.isValid())map.fitBounds(b,{padding:[40,40]})}
<\/script>
</body>
</html>`}export{J as component};
