import { O as useRouter, V as jsxRuntimeExports } from "./server-ykwvy-Gx.js";
import { L as Link } from "./router-ui_gSyIh.js";
import { c as createLucideIcon } from "./createLucideIcon-BsuMyznQ.js";
function useLocation(opts) {
  const router = useRouter();
  {
    const location = router.stores.location.get();
    return location;
  }
}
const __iconNode$6 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$5);
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ]
];
const Compass = createLucideIcon("compass", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function BottomNav({ variant = "global" } = {}) {
  const { pathname } = useLocation();
  const isChina = variant === "china";
  const navItems = isChina ? [
    { to: "/", icon: House, label: "首页" },
    { to: "/destinations", icon: Map, label: "地图" },
    { to: "/my-trips", icon: Calendar, label: "行程" },
    { to: "/my-trips", icon: User, label: "我的" }
  ] : [
    { to: "/", icon: Compass, label: "Explore" },
    { to: "/destinations", icon: BookOpen, label: "Discover" },
    { to: "/my-trips", icon: Calendar, label: "Trips" },
    { to: "/my-trips", icon: User, label: "Profile" }
  ];
  const item = ({ to, icon: Icon, label }) => {
    const active = pathname === to;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to,
        className: `group flex flex-1 flex-col items-center gap-1 pt-3 text-[11px] leading-none transition ${active ? "font-semibold text-primary" : "font-medium text-[#8b8f9a]"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `flex h-8 w-8 items-center justify-center rounded-full transition ${active ? "bg-[#f0eeff] shadow-[0_8px_18px_rgba(91,69,243,.14)]" : "group-active:bg-muted"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[21px] w-[21px]", strokeWidth: active ? 2.5 : 2.15 })
            }
          ),
          label
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      className: `fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[430px] items-start justify-around border border-white/70 bg-white/92 px-2 shadow-[0_-14px_36px_rgba(20,25,45,.10)] backdrop-blur-xl ${isChina ? "h-[94px] rounded-t-[24px]" : "h-[86px] rounded-t-[22px]"}`,
      children: [
        item(navItems[0]),
        item(navItems[1]),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/quiz",
            className: `flex flex-1 flex-col items-center gap-1 text-[11px] font-semibold leading-none text-[#6f7280] ${isChina ? "-mt-5" : "-mt-4"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `flex items-center justify-center rounded-full border-[6px] border-white text-white shadow-[0_18px_28px_rgba(82,65,235,.30)] transition active:scale-95 ${isChina ? "h-[66px] w-[66px]" : "h-[62px] w-[62px]"}`,
                  style: { background: "linear-gradient(180deg, #6d61ff 0%, #4a36ef 100%)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-9 w-9", strokeWidth: 2.25 })
                }
              ),
              isChina ? "规划" : "Plan"
            ]
          }
        ),
        item(navItems[2]),
        item(navItems[3])
      ]
    }
  );
}
export {
  BottomNav as B,
  Compass as C,
  House as H,
  Plus as P,
  User as U
};
