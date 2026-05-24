import { r as reactExports, V as jsxRuntimeExports } from "./server-DSDkCfEf.js";
import { c as createLucideIcon } from "./createLucideIcon-BgI0Sl8-.js";
const __iconNode = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83", key: "1bzlo9" }],
  ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21", key: "1q0aeu" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "15", key: "5mozeu" }],
  [
    "path",
    {
      d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
      key: "mmje98"
    }
  ],
  ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9", key: "43el77" }]
];
const ImageOff = createLucideIcon("image-off", __iconNode);
function Img({ wrapperClass, className = "", alt = "", style, fallback, ...rest }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `overflow-hidden ${wrapperClass?.includes("absolute") ? "" : "relative "}${wrapperClass ?? ""}`, style, children: [
    !loaded && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-pulse bg-muted" }),
    error ? fallback ?? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-1 bg-muted/80 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-5 w-5 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-50", children: "加载失败" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        ...rest,
        alt,
        className: `${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`,
        onLoad: () => setLoaded(true),
        onError: () => setError(true)
      }
    )
  ] });
}
export {
  Img as I
};
