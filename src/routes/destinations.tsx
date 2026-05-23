import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, Globe, Loader2, MapPin, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Img } from "@/components/Img";
import { DestinationsPageSkeleton } from "@/components/PageSkeletons";
import { useDestinations } from "@/lib/tripStore";

export const Route = createFileRoute("/destinations")({
  component: Destinations,
  pendingComponent: DestinationsPageSkeleton,
  head: () => ({ meta: [{ title: "探索世界的美好 · 趣旅" }] }),
});

const regionConfig: Record<string, { label: string; layout: "hero" | "dual" | "grid4" }> = {
  中国: { label: "热门目的地", layout: "hero" },
  东亚: { label: "亚洲精选", layout: "dual" },
  东南亚: { label: "东南亚热选", layout: "grid4" },
  欧洲: { label: "欧洲精选", layout: "grid4" },
  北美: { label: "北美精选", layout: "dual" },
  南美: { label: "南美精选", layout: "dual" },
  大洋洲: { label: "大洋洲精选", layout: "dual" },
  "非洲与中东": { label: "非洲与中东", layout: "dual" },
};

function Destinations() {
  const { data: groups = [], isLoading } = useDestinations();
  const [search, setSearch] = useState("");
  const [heroIdx, setHeroIdx] = useState(0);

  const filtered = search.trim()
    ? groups
        .map((g) => ({ ...g, destinations: g.destinations.filter((d) => d.name.toLowerCase().includes(search.trim().toLowerCase())) }))
        .filter((g) => g.destinations.length > 0)
    : groups;

  return (
    <div className="min-h-screen bg-background pb-20">

      {/* ═══ Header ═══ */}
      <header className="px-4 pt-[env(safe-area-inset-top,44px)]">
        <div className="flex items-center justify-between">
          <Link to="/" className="grid place-items-center h-8 w-8 rounded-full bg-card shadow-sm">
            <Search className="h-3.5 w-3.5 text-foreground" />
          </Link>
          <div className="relative">
            <button className="grid place-items-center h-8 w-8 rounded-full bg-card shadow-sm">
              <Bell className="h-3.5 w-3.5 text-foreground" />
            </button>
            <span className="absolute top-0.5 right-1 h-[6px] w-[6px] rounded-full bg-rose-500 ring-[1.5px] ring-background" />
          </div>
        </div>
        <h1 className="mt-2.5 text-[20px] font-extrabold tracking-tight">探索世界的美好</h1>
        <p className="text-[10px] text-muted-foreground mt-[2px]">发现热门目的地，开启下一段旅程</p>
      </header>

      {/* ═══ Search ═══ */}
      <div className="mx-4 mt-2.5">
        <div className="flex items-center gap-2 h-10 rounded-xl bg-card px-3 shadow-sm border border-border/40">
          <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索国家、城市或旅行灵感"
            className="min-w-0 flex-1 bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none" />
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      )}

      {/* ═══ Sections ═══ */}
      <section className="mt-3 space-y-4 px-4 pb-4">
        {filtered.map((group) => {
          const cfg = regionConfig[group.region] ?? { label: group.region, layout: "dual" };
          const total = group.destinations.reduce((n, d) => n + d.routes, 0);

          return (
            <div key={group.region}>
              {/* Section header */}
              <div className="mb-1.5 flex items-center justify-between">
                <h2 className="flex items-center gap-1.5 text-[14px] font-bold">
                  <span className="h-[10px] w-[3px] rounded-full bg-primary" />
                  {cfg.label}
                </h2>
                <button className="flex items-center text-[10px] text-muted-foreground font-medium">
                  全部 {total}+ <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* Hero — large card with CTA */}
              {cfg.layout === "hero" && group.destinations.length > 0 && (() => {
                const d = group.destinations[heroIdx % group.destinations.length];
                return (
                  <div>
                    <div className="relative overflow-hidden rounded-2xl h-[160px] shadow-md">
                      <Img src={d.cover} alt={d.name} wrapperClass="absolute inset-0" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <span className="absolute top-2.5 right-2.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[9px] font-semibold px-2 py-[3px]">
                        全部 {d.routes}+
                      </span>
                      <div className="absolute bottom-3 left-3.5">
                        <p className="text-[24px] font-extrabold text-white drop-shadow-md leading-none">{d.name}</p>
                        <p className="flex items-center gap-0.5 text-white/80 text-[10px] mt-1">
                          <MapPin className="h-2.5 w-2.5" />{d.routes}条路线
                        </p>
                        <Link to="/explore" search={{ dest: d.name }}
                          className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary text-white text-[10px] font-semibold px-3 py-1 shadow">
                          探索{d.name} <ArrowRight className="h-2.5 w-2.5" />
                        </Link>
                      </div>
                    </div>
                    {group.destinations.length > 1 && (
                      <div className="flex justify-center gap-1 mt-2">
                        {group.destinations.map((_, i) => (
                          <button key={i} onClick={() => setHeroIdx(i)}
                            className={`rounded-full transition-all ${i === heroIdx % group.destinations.length ? "h-[6px] w-4 bg-primary" : "h-[6px] w-[6px] bg-border"}`} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Dual — 2 columns */}
              {cfg.layout === "dual" && (
                <div className="grid grid-cols-2 gap-2">
                  {group.destinations.map((d) => (
                    <Link key={d.name} to="/explore" search={{ dest: d.name }}
                      className="relative overflow-hidden rounded-xl h-[96px] shadow-sm group">
                      <Img src={d.cover} alt={d.name} loading="lazy"
                        wrapperClass="absolute inset-0" className="h-full w-full object-cover transition-transform group-active:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <p className="text-[13px] font-bold text-white drop-shadow-md leading-none">{d.name}</p>
                        <p className="flex items-center gap-[2px] text-white/75 text-[9px] mt-[3px]">
                          <MapPin className="h-2 w-2" />{d.routes}条路线
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Grid4 — 4 columns */}
              {cfg.layout === "grid4" && (
                <div className="grid grid-cols-4 gap-1.5">
                  {group.destinations.map((d) => (
                    <Link key={d.name} to="/explore" search={{ dest: d.name }}
                      className="relative overflow-hidden rounded-lg h-[80px] shadow-sm group">
                      <Img src={d.cover} alt={d.name} loading="lazy"
                        wrapperClass="absolute inset-0" className="h-full w-full object-cover transition-transform group-active:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-1.5 left-1.5">
                        <p className="text-[10px] font-bold text-white drop-shadow-sm leading-none">{d.name}</p>
                        <p className="flex items-center gap-[1px] text-white/70 text-[7px] mt-[2px]">
                          <MapPin className="h-[7px] w-[7px]" />{d.routes}条路线
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <BottomNav />
    </div>
  );
}
