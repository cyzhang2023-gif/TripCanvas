import { r as reactExports, V as jsxRuntimeExports } from "./server-F62Km59P.js";
const STORAGE_KEY = "routey-ratings";
const RATING_TAGS = [
  "风景绝佳",
  "性价比高",
  "适合亲子",
  "美食丰富",
  "交通便利",
  "文化体验",
  "浪漫氛围",
  "冒险刺激",
  "休闲放松",
  "拍照圣地"
];
function loadRatings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveRatings(ratings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
}
function generateId() {
  return `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function getOwnerId() {
  let id = localStorage.getItem("routey-owner-id");
  if (!id) {
    id = `owner_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem("routey-owner-id", id);
  }
  return id;
}
function addRating(routeId, score, tags, comment) {
  const ratings = loadRatings();
  const ownerId = getOwnerId();
  const rating = {
    id: generateId(),
    routeId,
    score: Math.max(1, Math.min(5, Math.round(score * 2) / 2)),
    // clamp 1-5 half-step
    tags,
    comment: comment?.trim() || void 0,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    ownerId
  };
  ratings.push(rating);
  saveRatings(ratings);
  return rating;
}
function getRatings(routeId) {
  return loadRatings().filter((r) => r.routeId === routeId);
}
function getRatingStats(routeId) {
  const ratings = getRatings(routeId);
  if (ratings.length === 0) {
    return { routeId, averageScore: 0, totalRatings: 0, tagCounts: {} };
  }
  const total = ratings.reduce((sum, r) => sum + r.score, 0);
  const tagCounts = {};
  for (const r of ratings) {
    for (const tag of r.tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }
  }
  return {
    routeId,
    averageScore: Math.round(total / ratings.length * 10) / 10,
    totalRatings: ratings.length,
    tagCounts
  };
}
function hasUserRated(routeId) {
  const ownerId = getOwnerId();
  return loadRatings().some((r) => r.routeId === routeId && r.ownerId === ownerId);
}
function StarIcon({
  fill,
  size = 24,
  className = ""
}) {
  const uid = `star-grad-${Math.random().toString(36).slice(2, 6)}`;
  const starPath = "M12 2.5c.3 0 .6.18.74.46l2.46 5.04 5.52.8a.83.83 0 0 1 .46 1.42L17.2 14.1l.94 5.48a.83.83 0 0 1-1.2.87L12 17.77l-4.94 2.68a.83.83 0 0 1-1.2-.87l.94-5.48L2.82 10.22a.83.83 0 0 1 .46-1.42l5.52-.8 2.46-5.04A.83.83 0 0 1 12 2.5Z";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      className,
      style: { display: "inline-block", verticalAlign: "middle" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: `${uid}-fill`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#F59E0B" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#D97706" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: `${uid}-clip`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "0", width: fill >= 1 ? 24 : fill > 0 ? 12 : 0, height: "24" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: starPath,
            fill: "none",
            stroke: "#d1d5db",
            strokeWidth: "1",
            strokeDasharray: "2 1"
          }
        ),
        fill > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: starPath,
            fill: `url(#${uid}-fill)`,
            clipPath: `url(#${uid}-clip)`
          }
        )
      ]
    }
  );
}
function StarRating({
  value = 0,
  onChange,
  size = 28,
  gap = 4,
  readonly = false
}) {
  const [hoverValue, setHoverValue] = reactExports.useState(null);
  const [justSelected, setJustSelected] = reactExports.useState(false);
  const displayValue = hoverValue ?? value;
  const handleClick = (star) => {
    if (readonly) return;
    onChange?.(star);
    setJustSelected(true);
    setTimeout(() => setJustSelected(false), 400);
  };
  const handleMouseMove = (e, star) => {
    if (readonly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = x < rect.width / 2;
    setHoverValue(half ? star - 0.5 : star);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "inline-flex items-center",
      style: { gap },
      onMouseLeave: () => setHoverValue(null),
      children: [
        [1, 2, 3, 4, 5].map((star) => {
          const fillLevel = displayValue >= star ? 1 : displayValue >= star - 0.5 ? 0.5 : 0;
          const isHovered = hoverValue !== null && star <= Math.ceil(hoverValue);
          const isPulse = justSelected && star <= Math.ceil(value);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleClick(hoverValue !== null ? hoverValue >= star - 0.5 && hoverValue < star ? star - 0.5 : star : star),
              onMouseMove: (e) => handleMouseMove(e, star),
              disabled: readonly,
              className: "relative transition-transform duration-200 ease-out disabled:cursor-default",
              style: {
                transform: isHovered && !readonly ? "scale(1.2) rotate(-6deg)" : "scale(1)",
                animation: isPulse ? "starPulse 400ms ease-out" : void 0
              },
              "aria-label": `${star} 星`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarIcon, { fill: fillLevel, size })
            },
            star
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes starPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      ` })
      ]
    }
  );
}
function RatingSummary({
  routeId,
  compact = false
}) {
  const [showBreakdown, setShowBreakdown] = reactExports.useState(false);
  const stats = getRatingStats(routeId);
  if (stats.totalRatings === 0) return null;
  const topTags = Object.entries(stats.tagCounts).sort(([, a], [, b]) => b - a).slice(0, 3);
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: (e) => {
          e.stopPropagation();
          setShowBreakdown(true);
        },
        className: "flex items-center gap-1.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: stats.averageScore, size: 12, gap: 1, readonly: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-amber-700", children: stats.averageScore.toFixed(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-gray-400", children: [
            "(",
            stats.totalRatings,
            ")"
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: (e) => {
          e.stopPropagation();
          setShowBreakdown(!showBreakdown);
        },
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: stats.averageScore, size: 14, gap: 2, readonly: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-amber-700", children: stats.averageScore.toFixed(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-gray-400", children: [
            stats.totalRatings,
            " 条评价"
          ] }),
          topTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: topTags.map(([tag]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "rounded-full bg-[#fff0ed] px-1.5 py-px text-[8px] font-medium text-[#d4532e]",
              children: tag
            },
            tag
          )) })
        ]
      }
    ),
    showBreakdown && /* @__PURE__ */ jsxRuntimeExports.jsx(RatingBreakdown, { stats, onClose: () => setShowBreakdown(false) })
  ] });
}
function RatingBreakdown({
  stats,
  onClose
}) {
  const allTags = Object.entries(stats.tagCounts).sort(([, a], [, b]) => b - a);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mx-4 w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            style: { animation: "scaleIn 250ms ease-out" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-center text-[16px] font-bold text-gray-900", children: "评分详情" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[36px] font-extrabold text-amber-600", children: stats.averageScore.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: stats.averageScore, size: 24, gap: 4, readonly: true }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 text-[12px] text-gray-400", children: [
                  stats.totalRatings,
                  " 条评价"
                ] })
              ] }),
              allTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[12px] font-semibold text-gray-600", children: "热门标签" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: allTags.map(([tag, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1 rounded-full bg-[#fff0ed] px-2.5 py-1 text-[11px] font-medium text-[#c44a2d]",
                    children: [
                      tag,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-[#e8614d]/20 px-1.5 py-px text-[9px] font-bold text-[#b33f24]", children: count })
                    ]
                  },
                  tag
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "mt-5 w-full rounded-xl bg-gray-100 py-2.5 text-[13px] font-semibold text-gray-600 active:bg-gray-200",
                  children: "关闭"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      ` })
      ]
    }
  );
}
export {
  RATING_TAGS as R,
  StarRating as S,
  addRating as a,
  RatingSummary as b,
  hasUserRated as h
};
