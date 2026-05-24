import { Link, useLocation } from "@tanstack/react-router";
import { Calendar, Home, Map, Plus, User, type LucideIcon } from "lucide-react";

type NavItem = {
  to: "/" | "/destinations" | "/my-trips" | "/profile";
  icon: LucideIcon;
  label: string;
};

const navItems: [NavItem, NavItem, NavItem, NavItem] = [
  { to: "/", icon: Home, label: "首页" },
  { to: "/destinations", icon: Map, label: "发现" },
  { to: "/my-trips", icon: Calendar, label: "行程" },
  { to: "/profile", icon: User, label: "我的" },
];

export function BottomNav() {
  const { pathname } = useLocation();

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
            active ? "bg-[#fff0ed] shadow-[0_8px_18px_rgba(228,97,77,.14)]" : "group-active:bg-muted"
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
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex h-[90px] max-w-[430px] items-start justify-around rounded-t-[24px] border border-white/70 bg-white/92 px-2 shadow-[0_-14px_36px_rgba(20,25,45,.10)] backdrop-blur-xl"
    >
      {item(navItems[0])}
      {item(navItems[1])}
      <Link
        to="/quiz"
        className="flex flex-1 flex-col items-center gap-1 -mt-5 text-[11px] font-semibold leading-none text-[#6f7280]"
      >
        <span
          className="flex h-[64px] w-[64px] items-center justify-center rounded-full border-[6px] border-white text-white shadow-[0_18px_28px_rgba(228,97,77,.30)] transition active:scale-95"
          style={{ background: "linear-gradient(180deg, #e8614d 0%, #d4432e 100%)" }}
        >
          <Plus className="h-9 w-9" strokeWidth={2.25} />
        </span>
        规划
      </Link>
      {item(navItems[2])}
      {item(navItems[3])}
    </nav>
  );
}
