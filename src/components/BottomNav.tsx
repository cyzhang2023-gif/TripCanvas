import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, Calendar, Compass, Home, Map, Plus, User, type LucideIcon } from "lucide-react";

type BottomNavVariant = "global" | "china";

type NavItem = {
  to: "/" | "/destinations" | "/my-trips";
  icon: LucideIcon;
  label: string;
};

export function BottomNav({ variant = "global" }: { variant?: BottomNavVariant } = {}) {
  const { pathname } = useLocation();
  const isChina = variant === "china";
  const navItems: [NavItem, NavItem, NavItem, NavItem] = isChina
    ? [
        { to: "/", icon: Home, label: "首页" },
        { to: "/destinations", icon: Map, label: "地图" },
        { to: "/my-trips", icon: Calendar, label: "行程" },
        { to: "/my-trips", icon: User, label: "我的" },
      ]
    : [
        { to: "/", icon: Compass, label: "Explore" },
        { to: "/destinations", icon: BookOpen, label: "Discover" },
        { to: "/my-trips", icon: Calendar, label: "Trips" },
        { to: "/my-trips", icon: User, label: "Profile" },
      ];

  const item = ({ to, icon: Icon, label }: NavItem) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`group flex flex-1 flex-col items-center gap-1 pt-3 text-[11px] leading-none transition ${
          active ? "font-semibold text-primary" : "font-medium text-[#8b8f9a]"
        }`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
            active ? "bg-[#f0eeff] shadow-[0_8px_18px_rgba(91,69,243,.14)]" : "group-active:bg-muted"
          }`}
        >
          <Icon className="h-[21px] w-[21px]" strokeWidth={active ? 2.5 : 2.15} />
        </span>
        {label}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[430px] items-start justify-around border border-white/70 bg-white/92 px-2 shadow-[0_-14px_36px_rgba(20,25,45,.10)] backdrop-blur-xl ${
        isChina ? "h-[94px] rounded-t-[24px]" : "h-[86px] rounded-t-[22px]"
      }`}
    >
      {item(navItems[0])}
      {item(navItems[1])}
      <Link
        to="/quiz"
        className={`flex flex-1 flex-col items-center gap-1 text-[11px] font-semibold leading-none text-[#6f7280] ${
          isChina ? "-mt-5" : "-mt-4"
        }`}
      >
        <span
          className={`flex items-center justify-center rounded-full border-[6px] border-white text-white shadow-[0_18px_28px_rgba(82,65,235,.30)] transition active:scale-95 ${
            isChina ? "h-[66px] w-[66px]" : "h-[62px] w-[62px]"
          }`}
          style={{ background: "linear-gradient(180deg, #6d61ff 0%, #4a36ef 100%)" }}
        >
          <Plus className="h-9 w-9" strokeWidth={2.25} />
        </span>
        {isChina ? "规划" : "Plan"}
      </Link>
      {item(navItems[2])}
      {item(navItems[3])}
    </nav>
  );
}
