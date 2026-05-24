import { r as reactExports, V as jsxRuntimeExports } from "./server-DSDkCfEf.js";
import { u as useNavigate, L as Link } from "./router-D-67bGNW.js";
import { a as Calendar, B as BottomNav } from "./BottomNav-B3kl0Tsd.js";
import { d as useTrips } from "./tripStore-D1dKS6e8.js";
import { a as avatarUser } from "./avatar-user-DuIvLvK3.js";
import { h as heroImg } from "./hero-santorini-blue-BZZprHFp.js";
import { c as createLucideIcon } from "./createLucideIcon-BgI0Sl8-.js";
import { S as Star } from "./star-Bi-WE9ei.js";
import { P as Pencil, X } from "./x-Bw5J3Wt-.js";
import { H as Heart } from "./heart-CFWfmLvC.js";
import { M as MapPin } from "./map-pin-BYq5lxXL.js";
import { C as ChevronRight } from "./chevron-right-c6n95luU.js";
import { G as Globe } from "./globe-UDQWhuwx.js";
import { T as TrendingUp } from "./trending-up-g9o3-MZa.js";
import { C as Clock } from "./clock-DUlHS_Nm.js";
import { B as Bell } from "./bell-C1UbD2lt.js";
import { R as Route } from "./route-BN3QBIw0.js";
import { C as Check } from "./check-BH6EQsWP.js";
import { C as ChevronLeft } from "./chevron-left-DlV_M45D.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./worker-entry-BeQ7_xaa.js";
import "node:events";
const __iconNode$4 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      key: "oz39mx"
    }
  ]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function Toast({
  msg,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 top-12 z-[60] flex justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-auto flex items-center gap-2 rounded-2xl bg-card px-4 py-2.5 shadow-lg border border-border/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-emerald-500" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-medium", children: msg }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "ml-1 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
  ] }) });
}
function Profile() {
  const trips = useTrips();
  const nav = useNavigate();
  const favCount = trips.filter((t) => t.favorite).length;
  const totalDays = trips.reduce((s, t) => s + t.days.length, 0);
  const totalSpots = trips.reduce((s, t) => s + t.days.reduce((ds, d) => ds + d.spots.length, 0), 0);
  const countries = new Set(trips.map((t) => t.country).filter(Boolean));
  const destinations = new Set(trips.map((t) => t.destination).filter(Boolean));
  const [toast, setToast] = reactExports.useState("");
  const [showEditProfile, setShowEditProfile] = reactExports.useState(false);
  const [showCountries, setShowCountries] = reactExports.useState(false);
  const [showStats, setShowStats] = reactExports.useState(false);
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [showAbout, setShowAbout] = reactExports.useState(false);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2e3);
  };
  const level = Math.min(Math.max(trips.length, 1), 10);
  const progress = Math.min(trips.length * 10, 100);
  const catCounts = {};
  trips.forEach((t) => t.days.forEach((d) => d.spots.forEach((s) => {
    const cat = s.category ?? "其他";
    catCounts[cat] = (catCounts[cat] ?? 0) + 1;
  })));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell bg-[#f5f6fa] pb-28", children: [
    toast && /* @__PURE__ */ jsxRuntimeExports.jsx(Toast, { msg: toast, onClose: () => setToast("") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[200px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "个人主页背景", className: "absolute inset-0 h-full w-full object-cover", loading: "lazy", style: {
        objectPosition: "75% 60%"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSettings(true), className: "absolute right-4 top-[env(safe-area-inset-top,44px)] z-10 grid h-9 w-9 place-items-center rounded-full bg-black/20 backdrop-blur-md text-white", "aria-label": "设置", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative px-5 -mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUser, alt: "用户头像", className: "h-[72px] w-[72px] rounded-full border-[3px] border-white object-cover shadow-lg", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 ring-2 ring-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-2.5 w-2.5 text-white", fill: "currentColor" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[18px] font-bold", children: "旅行者" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-emerald-500 px-2 py-[1px] text-[9px] font-bold text-white", children: [
            "Lv.",
            level
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-1 text-[12px] text-muted-foreground", children: [
          "探索世界，记录美好 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowEditProfile(true), className: "mb-1 flex items-center gap-1 rounded-full border border-border/60 bg-white px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm active:bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
        " 编辑资料"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 mt-4 grid grid-cols-4 rounded-2xl bg-white p-4 shadow-sm", children: [{
      icon: Briefcase,
      label: "行程",
      value: trips.length,
      color: "text-blue-500",
      bg: "bg-blue-50"
    }, {
      icon: Heart,
      label: "收藏",
      value: favCount,
      color: "text-rose-500",
      bg: "bg-rose-50"
    }, {
      icon: Calendar,
      label: "天数",
      value: totalDays,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    }, {
      icon: MapPin,
      label: "地点",
      value: totalSpots,
      color: "text-orange-500",
      bg: "bg-orange-50"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => nav({
      to: "/my-trips"
    }), className: "flex flex-col items-center gap-1.5 active:opacity-70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-9 w-9 items-center justify-center rounded-xl ${s.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `h-4 w-4 ${s.color}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[18px] font-extrabold leading-none", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 mt-3 flex items-center gap-3 rounded-2xl p-4 cursor-pointer active:opacity-90", style: {
      background: "linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)"
    }, onClick: () => setShowStats(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-6 w-6 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[14px] font-bold text-gray-800", children: [
          "旅行达人 Lv.",
          level
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] text-gray-500", children: countries.size > 0 ? `已解锁 ${countries.size} 个国家` : "开始你的第一次旅行吧" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[13px] font-bold text-emerald-600", children: [
          progress,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-16 overflow-hidden rounded-full bg-white/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: {
          width: `${progress}%`,
          background: "linear-gradient(90deg, #6d61ff, #4a36ef)"
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-white/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-violet-600" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-[14px] font-bold", children: "我的旅行" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TravelCard, { icon: Globe, label: "去过的国家", sub: `${countries.size} 个国家`, color: "text-blue-500", bg: "bg-blue-50", onClick: () => setShowCountries(true) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TravelCard, { icon: TrendingUp, label: "旅行统计", sub: "查看详情", color: "text-emerald-500", bg: "bg-emerald-50", onClick: () => setShowStats(true) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TravelCard, { icon: Bookmark, label: "收藏路线", sub: `${favCount} 条路线`, color: "text-amber-500", bg: "bg-amber-50", onClick: () => nav({
          to: "/my-trips"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TravelCard, { icon: Clock, label: "浏览历史", sub: `${trips.length} 条记录`, color: "text-violet-500", bg: "bg-violet-50", onClick: () => nav({
          to: "/my-trips"
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-[14px] font-bold", children: "设置与服务" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl bg-white shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Bell, label: "消息通知", color: "bg-rose-50 text-rose-500", onClick: () => showToast("暂无新消息") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Shield, label: "隐私与安全", color: "bg-slate-100 text-slate-600", onClick: () => showToast("数据仅存储在本地设备"), border: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Settings, label: "通用设置", color: "bg-gray-100 text-gray-600", onClick: () => setShowSettings(true), border: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-[10px] text-muted-foreground/50", children: "Routey v1.0.0" }),
    showEditProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { title: "编辑资料", onClose: () => setShowEditProfile(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full border-[3px] border-primary/20 p-[2px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUser, alt: "用户头像", className: "h-full w-full rounded-full object-cover", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "点击更换头像（即将开放）" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block px-1 text-[11px] font-semibold text-muted-foreground", children: "昵称" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: "旅行者", className: "mt-1 w-full rounded-xl bg-muted px-3.5 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-primary/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mt-3 block px-1 text-[11px] font-semibold text-muted-foreground", children: "个性签名" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: "探索世界，记录美好", className: "mt-1 w-full rounded-xl bg-muted px-3.5 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-primary/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setShowEditProfile(false);
        showToast("资料已保存");
      }, className: "mt-5 w-full rounded-2xl py-3 text-[13px] font-bold text-white", style: {
        background: "linear-gradient(135deg, #6d61ff, #4a36ef)"
      }, children: "保存" })
    ] }),
    showCountries && /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { title: "去过的国家", onClose: () => setShowCountries(false), children: countries.size === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "mx-auto h-10 w-10 text-muted-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[12px] text-muted-foreground", children: "还没有旅行记录" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/quiz", className: "mt-3 inline-block rounded-full bg-primary px-5 py-2 text-[12px] font-semibold text-white", children: "规划第一次旅行" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-2", children: [...countries].map((c) => {
      const countryTrips = trips.filter((t) => t.country === c);
      const countryDests = new Set(countryTrips.map((t) => t.destination).filter(Boolean));
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-muted/50 px-3.5 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-[13px]", children: countryFlag(c) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-semibold", children: c }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            countryTrips.length,
            " 条行程 · ",
            [...countryDests].join("、")
          ] })
        ] })
      ] }, c);
    }) }) }),
    showStats && /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { title: "旅行统计", onClose: () => setShowStats(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2.5 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "总行程", value: String(trips.length), sub: "条", color: "from-primary to-violet-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "总天数", value: String(totalDays), sub: "天", color: "from-emerald-500 to-teal-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "总地点", value: String(totalSpots), sub: "个", color: "from-amber-500 to-orange-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "国家", value: String(countries.size), sub: "个", color: "from-sky-500 to-blue-600" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-2 text-[11px] font-semibold text-muted-foreground", children: "城市足迹" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex flex-wrap gap-1.5", children: [
        [...destinations].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary", children: d }, d)),
        destinations.size === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "暂无数据" })
      ] }),
      Object.keys(catCounts).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-[11px] font-semibold text-muted-foreground", children: "地点分类" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 space-y-1.5", children: Object.entries(catCounts).sort(([, a], [, b]) => b - a).map(([cat, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-[11px] font-medium", children: cat }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-primary to-violet-500", style: {
            width: `${Math.round(count / totalSpots * 100)}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-right text-[10px] text-muted-foreground", children: count })
        ] }, cat)) })
      ] })
    ] }),
    showSettings && /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { title: "通用设置", onClose: () => setShowSettings(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0 rounded-2xl bg-muted/50 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "深色模式", sub: "跟随系统", action: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleSwitch, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "地图服务", sub: "Google Maps", border: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "货币单位", sub: "自动检测", border: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "语言", sub: "简体中文", border: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-0 rounded-2xl bg-muted/50 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "清除缓存", sub: "释放存储空间", onClick: () => showToast("缓存已清除") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "数据与存储", sub: "本地存储", border: true })
      ] })
    ] }),
    showAbout && /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { title: "关于 Routey", onClose: () => setShowAbout(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg", style: {
          background: "linear-gradient(135deg, #6d61ff, #4a36ef)"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-[15px] font-bold", children: "Routey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "v1.0.0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-[11px] leading-relaxed text-muted-foreground px-4", children: "AI 智能旅行规划助手，帮你发现目的地灵感、一键生成行程、规划预算，让每一次旅行都轻松无忧。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0 rounded-2xl bg-muted/50 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "路线数据库", sub: "707 条精选路线" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "覆盖国家", sub: "24 个国家与地区", border: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { label: "AI 引擎", sub: "DeepSeek", border: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, { variant: "china" })
  ] });
}
function TravelCard({
  icon: Icon,
  label,
  sub,
  color,
  bg,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: "flex items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-sm active:bg-muted/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-10 w-10 items-center justify-center rounded-xl ${bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-semibold", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground/40 shrink-0" })
  ] });
}
function MenuItem({
  icon: Icon,
  label,
  color,
  onClick,
  border
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-muted/50 ${border ? "border-t border-border/30" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-9 w-9 items-center justify-center rounded-xl ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[16px] w-[16px]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-[13px] font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground/40" })
  ] });
}
function Sheet({
  title,
  onClose,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-black/40", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] max-h-[85vh] overflow-y-auto rounded-t-[24px] bg-white px-5 pb-8 pt-4 shadow-2xl", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex h-8 w-8 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[14px] font-bold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8" })
    ] }),
    children
  ] }) });
}
function StatCard({
  label,
  value,
  sub,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl bg-gradient-to-br ${color} p-3.5 text-white`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] opacity-80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[22px] font-extrabold leading-none", children: [
      value,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 text-[11px] font-medium opacity-80", children: sub })
    ] })
  ] });
}
function SettingRow({
  label,
  sub,
  action,
  onClick,
  border
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `flex w-full items-center justify-between px-4 py-3 text-left active:bg-muted/70 ${border ? "border-t border-border/30" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-medium", children: label }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: sub })
    ] }),
    action ?? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground/50" })
  ] });
}
function ToggleSwitch() {
  const [on, setOn] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
    e.stopPropagation();
    setOn(!on);
  }, className: `relative h-6 w-11 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted-foreground/20"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}` }) });
}
function countryFlag(country) {
  const flags = {
    中国: "🇨🇳",
    日本: "🇯🇵",
    韩国: "🇰🇷",
    泰国: "🇹🇭",
    美国: "🇺🇸",
    法国: "🇫🇷",
    英国: "🇬🇧",
    意大利: "🇮🇹",
    西班牙: "🇪🇸",
    德国: "🇩🇪",
    澳洲: "🇦🇺",
    瑞士: "🇨🇭",
    新加坡: "🇸🇬",
    马来西亚: "🇲🇾",
    印度尼西亚: "🇮🇩",
    越南: "🇻🇳",
    柬埔寨: "🇰🇭",
    菲律宾: "🇵🇭",
    印度: "🇮🇳",
    土耳其: "🇹🇷",
    希腊: "🇬🇷",
    冰岛: "🇮🇸",
    加拿大: "🇨🇦",
    巴西: "🇧🇷",
    秘鲁: "🇵🇪",
    新西兰: "🇳🇿",
    南非: "🇿🇦",
    摩洛哥: "🇲🇦",
    埃及: "🇪🇬",
    墨西哥: "🇲🇽",
    阿联酋: "🇦🇪",
    克罗地亚: "🇭🇷",
    捷克: "🇨🇿"
  };
  return flags[country] ?? "🌍";
}
export {
  Profile as component
};
