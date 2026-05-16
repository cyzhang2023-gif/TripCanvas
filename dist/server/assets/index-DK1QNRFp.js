import { r as reactExports, V as jsxRuntimeExports } from "./server-JDzKWfNw.js";
import { u as useNavigate, L as Link } from "./router-BNbIXVqy.js";
import { U as User, B as BottomNav } from "./BottomNav-C-9ePxP5.js";
import { a as useTripActions, h as useFeaturedRoutes, i as destFranceImg, j as destJapanImg } from "./tripStore-CFdIWIc-.js";
import { M as MapPin } from "./map-pin-CKN6pFSg.js";
import { B as Bell, A as ArrowRight } from "./bell-DAC3HDRZ.js";
import { c as createLucideIcon } from "./createLucideIcon-DdHt3wbZ.js";
import { S as Search } from "./search-C-SS4FX7.js";
import { L as LoaderCircle } from "./loader-circle-Chj5r3YF.js";
import { W as Wallet } from "./wallet-BrjpPAHR.js";
import { U as Utensils } from "./utensils-Bjknj3eQ.js";
import { C as ChevronRight } from "./chevron-right-Dr3SYITc.js";
import { M as Mountain } from "./mountain-DahbkqgI.js";
import { U as Users, B as Building2, L as Landmark, T as TreePine } from "./users-BUyeKWNc.js";
import { H as Heart } from "./heart-CVIZAnhU.js";
import { C as ChevronLeft } from "./chevron-left-CeO0aPRr.js";
import { L as Link2, F as FileText } from "./link-2-CoLKT2Qi.js";
import { I as Image$1, Y as Youtube } from "./youtube-CVcpJmBI.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-DE4vcQQz.js";
import "node:events";
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
];
const Plane = createLucideIcon("plane", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const heroImg = "/assets/hero-santorini-CD99p4fJ.jpg";
const tokyoImg = "/assets/tokyo-sakura-BjLcUMeO.jpg";
const maldivesImg = "/assets/maldives-Bc8V39NY.jpg";
const chiangmaiImg = "/assets/chiangmai-6g1-IPeU.jpg";
const lavenderImg = "/assets/lavender-cscufEbi.jpg";
const festivalImg = "/assets/festival-ymQUE770.jpg";
const surfImg = "/assets/surf-BwYsLgJr.jpg";
const whaleImg = "/assets/whale-DYnqAbtA.jpg";
const amalfiImg = "/assets/amalfi-PTfRPJ-S.jpg";
const cappadociaImg = "/assets/cappadocia-CLHWEk4O.jpg";
const auroraImg = "/assets/aurora-CufqUTEu.jpg";
const lijiangImg = "/assets/lijiang-CbVLEVMR.jpg";
const swissImg = "/assets/swiss-train-VycQgW5W.jpg";
const grandCanyonImg = "/assets/grand-canyon-DuyYvcNf.jpg";
const machuPicchuImg = "/assets/machu-picchu-DUugAe0N.jpg";
const safariImg = "/assets/safari-BGWGTiCE.jpg";
const sydneyImg = "/assets/sydney-CmhhTu5r.jpg";
const aiBot = "/assets/ai-bot-CnEitRUx.png";
const avatarUser = "/assets/avatar-user-DtrQojxL.png";
const tools = [{
  icon: CalendarCheck,
  label: "一键做行程",
  sub: "生成完整计划",
  color: "from-emerald-400 to-teal-500",
  action: "import"
}, {
  icon: Wallet,
  label: "预算规划",
  sub: "计算旅行花费",
  color: "from-amber-400 to-orange-500",
  action: "budget"
}, {
  icon: Utensils,
  label: "美食地图",
  sub: "发现当地美食",
  color: "from-sky-400 to-blue-500",
  action: "food"
}];
const seasonal = [{
  img: tokyoImg,
  tag: "赏花季",
  tagColor: "var(--tag-pink)",
  title: "日本·东京",
  sub: "樱花季限定体验",
  meta: "4天3晚 | 机票+酒店",
  dest: "日本"
}, {
  img: maldivesImg,
  tag: "海岛推荐",
  tagColor: "var(--tag-cyan)",
  title: "马尔代夫",
  sub: "住进玻璃海的梦",
  meta: "5天4晚 | 蜜月优选",
  dest: "马尔代夫"
}, {
  img: chiangmaiImg,
  tag: "文化探索",
  tagColor: "var(--tag-amber)",
  title: "泰国·清迈",
  sub: "古城慢生活",
  meta: "6天5晚 | 深度游",
  dest: "泰国"
}];
const categories = [{
  icon: Mountain,
  label: "自然风光",
  sub: "山川湖海",
  tint: "bg-emerald-100 text-emerald-600"
}, {
  icon: Users,
  label: "亲子家庭",
  sub: "寓教于乐",
  tint: "bg-amber-100 text-amber-600"
}, {
  icon: Building2,
  label: "城市漫游",
  sub: "街拍美食",
  tint: "bg-sky-100 text-sky-600"
}, {
  icon: Landmark,
  label: "文化探索",
  sub: "历史人文",
  tint: "bg-violet-100 text-violet-600"
}, {
  icon: TreePine,
  label: "户外探险",
  sub: "徒步露营",
  tint: "bg-green-100 text-green-600"
}, {
  icon: Heart,
  label: "蜜月旅行",
  sub: "浪漫时光",
  tint: "bg-rose-100 text-rose-600"
}];
const calendar = [{
  month: "5月",
  title: "北海道薰衣草季",
  date: "5–7月",
  img: lavenderImg,
  color: "from-violet-400 to-purple-500"
}, {
  month: "6月",
  title: "欧洲音乐节季",
  date: "6–8月",
  img: festivalImg,
  color: "from-pink-400 to-rose-500"
}, {
  month: "7月",
  title: "夏威夷冲浪季",
  date: "7–9月",
  img: surfImg,
  color: "from-cyan-400 to-teal-500"
}, {
  month: "8月",
  title: "北极观鲸季",
  date: "8–10月",
  img: whaleImg,
  color: "from-amber-400 to-orange-500"
}];
const staticCommunity = [{
  img: amalfiImg,
  title: "意大利阿马尔菲海岸",
  author: "旅行家小七",
  likes: "1.2万",
  video: true,
  dest: "意大利"
}, {
  img: cappadociaImg,
  title: "土耳其热气球全攻略",
  author: "摄影师阿May",
  likes: "9862",
  dest: "土耳其"
}, {
  img: auroraImg,
  title: "冰岛极光追逐指南",
  author: "背包客小鱼",
  likes: "7521",
  dest: "冰岛"
}, {
  img: lijiangImg,
  title: "丽江古城慢生活",
  author: "阿杰的旅行日记",
  likes: "6430",
  dest: "中国"
}, {
  img: swissImg,
  title: "瑞士冬季列车体验",
  author: "旅行摄影师KK",
  likes: "5821",
  dest: "瑞士"
}];
const inspoMap = [{
  name: "欧洲",
  sub: "浪漫小镇",
  img: destFranceImg,
  top: "10%",
  left: "55%"
}, {
  name: "亚洲",
  sub: "文化之旅",
  img: destJapanImg,
  top: "20%",
  left: "80%"
}, {
  name: "北美洲",
  sub: "自然奇观",
  img: grandCanyonImg,
  top: "28%",
  left: "12%"
}, {
  name: "南美洲",
  sub: "热情探险",
  img: machuPicchuImg,
  top: "62%",
  left: "20%"
}, {
  name: "非洲",
  sub: "野生动物",
  img: safariImg,
  top: "54%",
  left: "52%"
}, {
  name: "大洋洲",
  sub: "海岛度假",
  img: sydneyImg,
  top: "74%",
  left: "82%"
}];
const heroTags = ["日本赏樱", "冰岛极光", "东南亚海岛", "欧洲小镇", "亲子游"];
const importKinds = [{
  kind: "link",
  label: "链接",
  icon: Link2,
  placeholder: "粘贴攻略链接，例如小红书/公众号/网页"
}, {
  kind: "image",
  label: "截图",
  icon: Image$1,
  placeholder: "上传攻略截图，也可以补充目的地"
}, {
  kind: "text",
  label: "文本",
  icon: FileText,
  placeholder: "粘贴攻略文本、想去的地点或旅行灵感"
}, {
  kind: "video",
  label: "视频",
  icon: Youtube,
  placeholder: "粘贴视频链接或描述视频内容"
}];
function inferKind(v) {
  return /^https?:\/\//i.test(v.trim()) ? "link" : "text";
}
function getCityCover(city) {
  return `/api/spot-image?q=${encodeURIComponent(city + " 景点 风景")}`;
}
const themeLabels = {
  citywalk: "城市漫步",
  food: "美食之旅",
  beach: "海滩度假",
  luxury: "奢华体验",
  nature: "自然风光",
  shopping: "购物血拼",
  culture: "文化探索"
};
function Index() {
  const nav = useNavigate();
  const actions = useTripActions();
  const {
    data: n8nRoutes
  } = useFeaturedRoutes();
  const [content, setContent] = reactExports.useState("");
  const [showImport, setShowImport] = reactExports.useState(false);
  const [activeKind, setActiveKind] = reactExports.useState("link");
  const [drawerText, setDrawerText] = reactExports.useState("");
  const [fileName, setFileName] = reactExports.useState("");
  const [imageBase64, setImageBase64] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const {
    seasonalPicks,
    communityCards
  } = reactExports.useMemo(() => {
    if (!n8nRoutes || n8nRoutes.length < 3) return {
      seasonalPicks: [],
      communityCards: []
    };
    const usedIds = /* @__PURE__ */ new Set(), seenCities = /* @__PURE__ */ new Set();
    const picks = [];
    for (const r of n8nRoutes) {
      if (seenCities.has(r.city) || !r.city) continue;
      seenCities.add(r.city);
      usedIds.add(r.id);
      picks.push(r);
      if (picks.length >= 6) break;
    }
    const community = [], commCities = /* @__PURE__ */ new Set();
    for (const r of n8nRoutes) {
      if (usedIds.has(r.id) || commCities.has(r.city)) continue;
      commCities.add(r.city);
      usedIds.add(r.id);
      community.push(r);
      if (community.length >= 10) break;
    }
    return {
      seasonalPicks: picks,
      communityCards: community
    };
  }, [n8nRoutes]);
  const doImport = async (kind, raw) => {
    if (raw.trim().length < 2) {
      setError("请先输入攻略内容或旅行灵感");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const job = await actions.createImport({
        kind,
        content: raw.trim()
      });
      nav({
        to: "/parsing",
        search: {
          jobId: job.id
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "导入失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };
  const submitHero = () => {
    if (!content.trim()) {
      nav({
        to: "/quiz"
      });
      return;
    }
    void doImport(inferKind(content), content);
  };
  const submitDrawer = () => {
    const parts = [];
    if (drawerText.trim()) parts.push(drawerText.trim());
    if (imageBase64) parts.push(`[IMAGE_BASE64]${imageBase64}[/IMAGE_BASE64]`);
    else if (fileName) parts.push(`截图文件：${fileName}`);
    void doImport(activeKind, parts.join("\n"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[300px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "", className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 35%, rgba(0,0,0,0.55) 100%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-end gap-2 px-4 pt-[env(safe-area-inset-top,44px)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2 py-[3px] text-white text-[10px] font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
          " 圣托里尼"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "relative grid place-items-center h-7 w-7 rounded-full bg-white/20 backdrop-blur-md text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0.5 right-1 h-1.5 w-1.5 rounded-full bg-rose-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUser, alt: "", className: "h-7 w-7 rounded-full object-cover ring-[1.5px] ring-white/50" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-5 mt-3 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[28px] leading-[1.15] font-bold tracking-tight drop-shadow-md", children: [
          "世界很大",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            "去看看吧 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-amber-200" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] text-white/85 tracking-wide", children: "发现灵感 · 规划行程 · 无忧出发" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-4 bottom-3 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-full bg-white shadow-lg pl-3 pr-1 py-[3px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5 text-gray-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "想去哪儿? 搜索目的地 / 景点 / 攻略", className: "flex-1 bg-transparent text-[11px] py-1.5 outline-none placeholder:text-gray-400 min-w-0", value: content, onChange: (e) => setContent(e.target.value), onKeyDown: (e) => {
            if (e.key === "Enter") submitHero();
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: submitHero, disabled: submitting, className: "grid place-items-center h-7 w-7 rounded-full text-white shrink-0 disabled:opacity-70", style: {
            background: "var(--gradient-ai)"
          }, children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex gap-1.5 overflow-x-auto no-scrollbar", children: heroTags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setContent(t), className: "shrink-0 rounded-full bg-white/20 backdrop-blur text-white text-[9px] px-2 py-[3px] font-medium", children: t }, t)) })
      ] })
    ] }),
    error && !showImport && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-4 mt-1 text-[10px] text-rose-500", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-3 -mt-3 relative z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card px-3 py-2.5 shadow-[var(--shadow-card)] flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 grid grid-cols-3", children: tools.map(({
        icon: Icon,
        label,
        sub,
        color,
        action
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
        if (action === "budget") nav({
          to: "/quiz"
        });
        if (action === "import") setShowImport(true);
        if (action === "food") nav({
          to: "/destinations"
        });
      }, className: "flex flex-col items-center gap-[3px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br ${color} text-white`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-semibold text-foreground leading-none", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[7px] text-muted-foreground leading-none", children: sub })
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 w-[100px] relative overflow-hidden rounded-xl p-2 text-white cursor-pointer", style: {
        background: "var(--gradient-ai)"
      }, onClick: () => nav({
        to: "/quiz"
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold leading-none", children: "AI旅行规划师" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[5px] font-bold bg-white/25 px-0.5 rounded leading-none", children: "BETA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-[3px] text-[6.5px] text-white/80 leading-[1.4]", children: [
            "告诉我你的想法",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "为你定制专属旅程"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 inline-flex items-center gap-0.5 rounded-full bg-white text-primary text-[7px] font-semibold px-1.5 py-[2px] leading-none", children: [
            "去和AI聊聊 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-2 w-2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: aiBot, alt: "", className: "absolute -right-1.5 -bottom-1.5 h-[52px] w-[52px] object-contain opacity-80" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-3 px-3 grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations", className: "rounded-2xl bg-card p-2.5 shadow-[var(--shadow-soft)] relative overflow-hidden block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[12px] leading-none", children: "灵感地图" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[8px] text-muted-foreground mt-[3px]", children: "探索世界精彩" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[130px] mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20", style: {
            backgroundImage: "radial-gradient(circle, oklch(0.7 0.04 260) 0.8px, transparent 0.8px)",
            backgroundSize: "5px 5px"
          } }),
          inspoMap.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex flex-col items-center", style: {
            top: p.top,
            left: p.left,
            transform: "translate(-50%,-50%)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: "", className: "h-[22px] w-[22px] rounded-full object-cover ring-[1.5px] ring-white shadow-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[6.5px] font-semibold mt-[1px] leading-none", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[5.5px] text-muted-foreground leading-none", children: p.sub })
          ] }, p.name))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 inline-flex items-center gap-0.5 rounded-full bg-white shadow text-[8px] font-semibold px-2 py-1", children: [
          "查看世界地图 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-2 w-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card p-2.5 shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[12px] leading-none", children: "当季精选" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[8px] text-muted-foreground mt-[3px]", children: "最适合出发的目的地" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations", className: "text-[8px] text-muted-foreground flex items-center", children: [
            "更多",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-2.5 w-2.5" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 -mx-0.5 overflow-x-auto no-scrollbar flex gap-1.5", children: (seasonalPicks.length > 0 ? seasonalPicks.slice(0, 3).map((r, i) => ({
          img: r.cover_url || getCityCover(r.city),
          tag: themeLabels[r.route_theme] || "精选",
          tagColor: ["var(--tag-pink)", "var(--tag-cyan)", "var(--tag-amber)"][i % 3],
          title: `${r.country}·${r.city}`,
          sub: r.route_title,
          meta: `${r.days_count}天${Math.max(r.days_count - 1, 0)}晚`,
          dest: r.destination || r.country
        })) : seasonal.map((s) => ({
          ...s
        }))).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
          dest: s.dest || ""
        }, className: "relative shrink-0 w-[88px] aspect-[3/4] rounded-xl overflow-hidden block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.img, alt: "", className: "absolute inset-0 h-full w-full object-cover", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 left-1 text-[6px] font-bold px-1 py-[2px] rounded text-white", style: {
            background: s.tagColor
          }, children: s.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1.5 left-1 right-1 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold leading-tight", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[6.5px] opacity-85 mt-[1px] line-clamp-1", children: s.sub }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[5.5px] opacity-70 mt-[1px]", children: s.meta })
          ] })
        ] }, s.title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-[3px] mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[3px] w-2 rounded-full bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[3px] w-[3px] rounded-full bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[3px] w-[3px] rounded-full bg-border" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-3 px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[13px] font-bold px-1", children: "你可能喜欢" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex gap-1.5 overflow-x-auto no-scrollbar", children: [
        categories.map(({
          icon: Icon,
          label,
          sub,
          tint
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => nav({
          to: "/destinations"
        }), className: "shrink-0 flex items-center gap-1.5 rounded-xl bg-card px-2 py-[7px] shadow-[var(--shadow-soft)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid place-items-center h-6 w-6 rounded-md ${tint}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold leading-none", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[7px] text-muted-foreground leading-none mt-[2px]", children: sub })
          ] })
        ] }, label)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "shrink-0 grid place-items-center w-6 rounded-full bg-card shadow-[var(--shadow-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-3 px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[13px] font-bold", children: "旅行日历" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground", children: "未来3个月的最佳旅行时机" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex items-center px-1", children: calendar.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-[2px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-bold bg-gradient-to-r ${c.color} bg-clip-text text-transparent leading-none`, children: c.month }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-[5px] w-[5px] rounded-full bg-gradient-to-r ${c.color}` })
        ] }),
        i < calendar.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 h-[1.5px] mx-1 bg-gradient-to-r ${c.color} opacity-35 rounded-full` })
      ] }, c.month)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex gap-1.5 overflow-x-auto no-scrollbar", children: [
        calendar.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 w-[120px] h-[64px] rounded-xl overflow-hidden shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.img, alt: "", className: "absolute inset-0 h-full w-full object-cover", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1.5 left-1.5 right-1.5 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold leading-tight", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[7px] opacity-85 mt-[1px]", children: c.date })
          ] })
        ] }, c.title)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "shrink-0 grid place-items-center w-6 rounded-full bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-3 px-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[13px] font-bold", children: "社区灵感" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground", children: "看看旅行家们的真实分享" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destinations", className: "text-[8px] text-muted-foreground flex items-center", children: [
          "更多",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-2.5 w-2.5" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute -left-0.5 top-[40%] -translate-y-1/2 z-10 grid place-items-center h-6 w-6 rounded-full bg-card shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute -right-0.5 top-[40%] -translate-y-1/2 z-10 grid place-items-center h-6 w-6 rounded-full bg-card shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto no-scrollbar pb-1", children: (communityCards.length > 0 ? communityCards.slice(0, 5).map((r, i) => ({
          img: r.cover_url || getCityCover(r.city),
          title: r.route_title,
          author: ["旅行家小七", "摄影师阿May", "背包客小鱼", "阿杰旅行日记", "摄影师KK"][i % 5],
          likes: String(Math.floor(1200 + (r.id * 137 + i * 431) % 4800)),
          video: i === 0,
          dest: r.destination
        })) : staticCommunity.map((c) => ({
          ...c
        }))).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
          dest: p.dest || ""
        }, className: "shrink-0 w-[108px] block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square rounded-xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: "", className: "absolute inset-0 h-full w-full object-cover", loading: "lazy" }),
            p.video && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-black/25 backdrop-blur grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 fill-white text-white" }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[9px] font-semibold leading-tight line-clamp-1", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[2px] flex items-center justify-between text-[8px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[2px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-muted grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-[7px] w-[7px]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[52px] truncate", children: p.author })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[2px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-[7px] w-[7px]" }),
              p.likes
            ] })
          ] })
        ] }, p.title)) })
      ] })
    ] }),
    showImport && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/35 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] rounded-t-[20px] bg-white p-4 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-bold text-foreground", children: "导入攻略" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[10px] text-muted-foreground", children: "链接、截图、文本、视频都可以解析成路线" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowImport(false), className: "rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground", children: "关闭" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: importKinds.map(({
        kind,
        label,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
        setActiveKind(kind);
        setError("");
      }, className: `flex h-8 items-center justify-center gap-1 rounded-lg text-[10px] font-bold ${activeKind === kind ? "bg-primary text-white shadow" : "bg-muted text-muted-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
        label
      ] }, kind)) }),
      activeKind === "image" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-2 flex cursor-pointer items-center rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: fileName || "选择攻略截图" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setFileName(file.name);
          const img = new Image();
          img.onload = () => {
            const max = 1024;
            let {
              width: w,
              height: h
            } = img;
            if (w > max || h > max) {
              const s = max / Math.max(w, h);
              w = Math.round(w * s);
              h = Math.round(h * s);
            }
            const c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            c.getContext("2d").drawImage(img, 0, 0, w, h);
            setImageBase64(c.toDataURL("image/jpeg", 0.72).split(",")[1] ?? "");
            URL.revokeObjectURL(img.src);
          };
          img.src = URL.createObjectURL(file);
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: drawerText, onChange: (e) => setDrawerText(e.target.value), placeholder: importKinds.find((k) => k.kind === activeKind)?.placeholder, className: "mt-2 h-16 w-full resize-none rounded-xl bg-muted px-3 py-2 text-[11px] outline-none placeholder:text-muted-foreground" }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-rose-500", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: submitDrawer, disabled: submitting, className: "mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-full text-[12px] font-bold text-white disabled:opacity-70", style: {
        background: "var(--gradient-ai)"
      }, children: [
        submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { className: "h-3.5 w-3.5" }),
        " 开始解析"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
export {
  Index as component
};
