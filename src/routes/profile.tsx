import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight, Heart, MapPin, Calendar, Route as RouteIcon, Star,
  Settings, HelpCircle, MessageSquare, Share2, Shield, Bell,
  Globe, Bookmark, Clock, TrendingUp, X, Check, ChevronLeft,
  Pencil, Award, Briefcase,
} from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { useTrips } from "@/lib/tripStore";
import avatarImg from "@/assets/avatar-user.webp";
import heroImg from "@/assets/hero-santorini-blue.webp";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "我的 · Routey" }] }),
});

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed inset-x-0 top-12 z-[60] flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-card px-4 py-2.5 shadow-lg border border-border/50">
        <Check className="h-4 w-4 text-emerald-500" />
        <span className="text-[12px] font-medium">{msg}</span>
        <button onClick={onClose} className="ml-1 text-muted-foreground"><X className="h-3 w-3" /></button>
      </div>
    </div>
  );
}

function Profile() {
  const trips = useTrips();
  const nav = useNavigate();
  const favCount = trips.filter((t) => t.favorite).length;
  const totalDays = trips.reduce((s, t) => s + t.days.length, 0);
  const totalSpots = trips.reduce(
    (s, t) => s + t.days.reduce((ds, d) => ds + d.spots.length, 0),
    0,
  );
  const countries = new Set(trips.map((t) => t.country).filter(Boolean));
  const destinations = new Set(trips.map((t) => t.destination).filter(Boolean));

  const [toast, setToast] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const level = Math.min(Math.max(trips.length, 1), 10);
  const progress = Math.min(trips.length * 10, 100);

  const catCounts: Record<string, number> = {};
  trips.forEach((t) =>
    t.days.forEach((d) =>
      d.spots.forEach((s) => {
        const cat = s.category ?? "其他";
        catCounts[cat] = (catCounts[cat] ?? 0) + 1;
      }),
    ),
  );

  const handleShare = async () => {
    const text = `我在 Routey 已规划了 ${trips.length} 条行程，探索了 ${countries.size} 个国家！快来一起规划旅行吧 ✈️`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Routey — 智能旅行规划", text, url: location.origin });
      } else {
        await navigator.clipboard?.writeText(text + " " + location.origin);
        showToast("分享文案已复制到剪贴板");
      }
    } catch {
      showToast("分享取消");
    }
  };

  return (
    <div className="app-shell bg-[#f5f6fa] pb-28">
      {toast && <Toast msg={toast} onClose={() => setToast("")} />}

      {/* Banner */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <img src={heroImg} alt="个人主页背景" className="absolute inset-0 h-full w-full object-cover" loading="lazy" style={{ objectPosition: "75% 60%" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        <button
          onClick={() => setShowSettings(true)}
          className="absolute right-4 top-[env(safe-area-inset-top,44px)] z-10 grid h-9 w-9 place-items-center rounded-full bg-black/20 backdrop-blur-md text-white"
          aria-label="设置"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* User info - overlapping banner */}
      <div className="relative px-5 -mt-10">
        <div className="flex items-end gap-4">
          <div className="relative shrink-0">
            <img src={avatarImg} alt="用户头像" className="h-[72px] w-[72px] rounded-full border-[3px] border-white object-cover shadow-lg" loading="lazy" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 ring-2 ring-white">
              <Star className="h-2.5 w-2.5 text-white" fill="currentColor" />
            </span>
          </div>
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-bold">旅行者</h1>
              <span className="rounded-full bg-emerald-500 px-2 py-[1px] text-[9px] font-bold text-white">Lv.{level}</span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-[12px] text-muted-foreground">
              探索世界，记录美好 <Pencil className="h-3 w-3" />
            </p>
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className="mb-1 flex items-center gap-1 rounded-full border border-border/60 bg-white px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm active:bg-muted"
          >
            <Pencil className="h-3 w-3" /> 编辑资料
          </button>
        </div>
      </div>

      {/* Stats card */}
      <div className="mx-4 mt-4 grid grid-cols-4 rounded-2xl bg-white p-4 shadow-sm">
        {[
          { icon: Briefcase, label: "行程", value: trips.length, color: "text-blue-500", bg: "bg-blue-50" },
          { icon: Heart, label: "收藏", value: favCount, color: "text-rose-500", bg: "bg-rose-50" },
          { icon: Calendar, label: "天数", value: totalDays, color: "text-emerald-500", bg: "bg-emerald-50" },
          { icon: MapPin, label: "地点", value: totalSpots, color: "text-orange-500", bg: "bg-orange-50" },
        ].map((s) => (
          <button
            key={s.label}
            onClick={() => nav({ to: "/my-trips" })}
            className="flex flex-col items-center gap-1.5 active:opacity-70"
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.bg}`}>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </span>
            <span className="text-[18px] font-extrabold leading-none">{s.value}</span>
            <span className="text-[10px] text-muted-foreground">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Achievement card */}
      <div
        className="mx-4 mt-3 flex items-center gap-3 rounded-2xl p-4 cursor-pointer active:opacity-90"
        style={{ background: "linear-gradient(135deg, #ede9fe 0%, #e0e7ff 100%)" }}
        onClick={() => setShowStats(true)}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
          <Award className="h-6 w-6 text-white" />
        </span>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-gray-800">旅行达人 Lv.{level}</p>
          <p className="mt-0.5 text-[11px] text-gray-500">
            {countries.size > 0 ? `已解锁 ${countries.size} 个国家` : "开始你的第一次旅行吧"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-emerald-600">{progress}%</span>
          <div className="h-2 w-16 overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #6d61ff, #4a36ef)" }}
            />
          </div>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/60">
            <ChevronRight className="h-3.5 w-3.5 text-violet-600" />
          </span>
        </div>
      </div>

      {/* 我的旅行 */}
      <div className="mt-5 px-4">
        <h3 className="mb-2 text-[14px] font-bold">我的旅行</h3>
        <div className="grid grid-cols-2 gap-3">
          <TravelCard icon={Globe} label="去过的国家" sub={`${countries.size} 个国家`} color="text-blue-500" bg="bg-blue-50" onClick={() => setShowCountries(true)} />
          <TravelCard icon={TrendingUp} label="旅行统计" sub="查看详情" color="text-emerald-500" bg="bg-emerald-50" onClick={() => setShowStats(true)} />
          <TravelCard icon={Bookmark} label="收藏路线" sub={`${favCount} 条路线`} color="text-amber-500" bg="bg-amber-50" onClick={() => nav({ to: "/my-trips" })} />
          <TravelCard icon={Clock} label="浏览历史" sub={`${trips.length} 条记录`} color="text-violet-500" bg="bg-violet-50" onClick={() => nav({ to: "/my-trips" })} />
        </div>
      </div>

      {/* 设置与服务 */}
      <div className="mt-5 px-4">
        <h3 className="mb-2 text-[14px] font-bold">设置与服务</h3>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <MenuItem icon={Bell} label="消息通知" color="bg-rose-50 text-rose-500" onClick={() => showToast("暂无新消息")} />
          <MenuItem icon={Shield} label="隐私与安全" color="bg-slate-100 text-slate-600" onClick={() => showToast("数据仅存储在本地设备")} border />
          <MenuItem icon={Settings} label="通用设置" color="bg-gray-100 text-gray-600" onClick={() => setShowSettings(true)} border />
        </div>
      </div>

      <p className="mt-6 text-center text-[10px] text-muted-foreground/50">Routey v1.0.0</p>

      {/* ── Popups ── */}

      {showEditProfile && (
        <Sheet title="编辑资料" onClose={() => setShowEditProfile(false)}>
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="h-20 w-20 rounded-full border-[3px] border-primary/20 p-[2px]">
              <img src={avatarImg} alt="用户头像" className="h-full w-full rounded-full object-cover" loading="lazy" />
            </div>
            <p className="text-[11px] text-muted-foreground">点击更换头像（即将开放）</p>
          </div>
          <label className="block px-1 text-[11px] font-semibold text-muted-foreground">昵称</label>
          <input defaultValue="旅行者" className="mt-1 w-full rounded-xl bg-muted px-3.5 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
          <label className="mt-3 block px-1 text-[11px] font-semibold text-muted-foreground">个性签名</label>
          <input defaultValue="探索世界，记录美好" className="mt-1 w-full rounded-xl bg-muted px-3.5 py-2.5 text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
          <button
            onClick={() => { setShowEditProfile(false); showToast("资料已保存"); }}
            className="mt-5 w-full rounded-2xl py-3 text-[13px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #6d61ff, #4a36ef)" }}
          >
            保存
          </button>
        </Sheet>
      )}

      {showCountries && (
        <Sheet title="去过的国家" onClose={() => setShowCountries(false)}>
          {countries.size === 0 ? (
            <div className="py-10 text-center">
              <Globe className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 text-[12px] text-muted-foreground">还没有旅行记录</p>
              <Link to="/quiz" className="mt-3 inline-block rounded-full bg-primary px-5 py-2 text-[12px] font-semibold text-white">
                规划第一次旅行
              </Link>
            </div>
          ) : (
            <div className="space-y-2 py-2">
              {[...countries].map((c) => {
                const countryTrips = trips.filter((t) => t.country === c);
                const countryDests = new Set(countryTrips.map((t) => t.destination).filter(Boolean));
                return (
                  <div key={c} className="flex items-center gap-3 rounded-xl bg-muted/50 px-3.5 py-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-[13px]">
                      {countryFlag(c)}
                    </span>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold">{c}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {countryTrips.length} 条行程 · {[...countryDests].join("、")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Sheet>
      )}

      {showStats && (
        <Sheet title="旅行统计" onClose={() => setShowStats(false)}>
          <div className="grid grid-cols-2 gap-2.5 py-3">
            <StatCard label="总行程" value={String(trips.length)} sub="条" color="from-primary to-violet-600" />
            <StatCard label="总天数" value={String(totalDays)} sub="天" color="from-emerald-500 to-teal-600" />
            <StatCard label="总地点" value={String(totalSpots)} sub="个" color="from-amber-500 to-orange-600" />
            <StatCard label="国家" value={String(countries.size)} sub="个" color="from-sky-500 to-blue-600" />
          </div>
          <h4 className="mt-2 text-[11px] font-semibold text-muted-foreground">城市足迹</h4>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {[...destinations].map((d) => (
              <span key={d} className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">{d}</span>
            ))}
            {destinations.size === 0 && <p className="text-[11px] text-muted-foreground">暂无数据</p>}
          </div>
          {Object.keys(catCounts).length > 0 && (
            <>
              <h4 className="mt-4 text-[11px] font-semibold text-muted-foreground">地点分类</h4>
              <div className="mt-1.5 space-y-1.5">
                {Object.entries(catCounts).sort(([, a], [, b]) => b - a).map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-2">
                    <span className="w-10 text-[11px] font-medium">{cat}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
                        style={{ width: `${Math.round((count / totalSpots) * 100)}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-[10px] text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Sheet>
      )}

      {showSettings && (
        <Sheet title="通用设置" onClose={() => setShowSettings(false)}>
          <div className="space-y-0 rounded-2xl bg-muted/50 overflow-hidden">
            <SettingRow label="深色模式" sub="跟随系统" action={<ToggleSwitch />} />
            <SettingRow label="地图服务" sub="Google Maps" border />
            <SettingRow label="货币单位" sub="自动检测" border />
            <SettingRow label="语言" sub="简体中文" border />
          </div>
          <div className="mt-4 space-y-0 rounded-2xl bg-muted/50 overflow-hidden">
            <SettingRow label="清除缓存" sub="释放存储空间" onClick={() => showToast("缓存已清除")} />
            <SettingRow label="数据与存储" sub="本地存储" border />
          </div>
        </Sheet>
      )}

      {showAbout && (
        <Sheet title="关于 Routey" onClose={() => setShowAbout(false)}>
          <div className="flex flex-col items-center py-6">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #6d61ff, #4a36ef)" }}
            >
              <RouteIcon className="h-8 w-8" />
            </div>
            <h3 className="mt-3 text-[15px] font-bold">Routey</h3>
            <p className="text-[11px] text-muted-foreground">v1.0.0</p>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground px-4">
              AI 智能旅行规划助手，帮你发现目的地灵感、一键生成行程、规划预算，让每一次旅行都轻松无忧。
            </p>
          </div>
          <div className="space-y-0 rounded-2xl bg-muted/50 overflow-hidden">
            <SettingRow label="路线数据库" sub="707 条精选路线" />
            <SettingRow label="覆盖国家" sub="24 个国家与地区" border />
            <SettingRow label="AI 引擎" sub="DeepSeek" border />
          </div>
        </Sheet>
      )}

      <BottomNav variant="china" />
    </div>
  );
}

/* ── Reusable components ── */

function TravelCard({ icon: Icon, label, sub, color, bg, onClick }: {
  icon: typeof Globe; label: string; sub: string; color: string; bg: string; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-sm active:bg-muted/50"
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold">{label}</p>
        <p className="text-[10px] text-muted-foreground">{sub}</p>
      </div>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
    </button>
  );
}

function MenuItem({ icon: Icon, label, color, onClick, border }: {
  icon: typeof Globe; label: string; color: string;
  onClick?: () => void; border?: boolean;
}) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-muted/50 ${border ? "border-t border-border/30" : ""}`}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-[16px] w-[16px]" />
      </span>
      <span className="flex-1 text-[13px] font-medium">{label}</span>
      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
    </button>
  );
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-[430px] max-h-[85vh] overflow-y-auto rounded-t-[24px] bg-white px-5 pb-8 pt-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h3 className="text-[14px] font-bold">{title}</h3>
          <div className="w-8" />
        </div>
        {children}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${color} p-3.5 text-white`}>
      <p className="text-[10px] opacity-80">{label}</p>
      <p className="mt-1 text-[22px] font-extrabold leading-none">{value}<span className="ml-0.5 text-[11px] font-medium opacity-80">{sub}</span></p>
    </div>
  );
}

function SettingRow({ label, sub, action, onClick, border }: {
  label: string; sub?: string; action?: React.ReactNode;
  onClick?: () => void; border?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between px-4 py-3 text-left active:bg-muted/70 ${border ? "border-t border-border/30" : ""}`}
    >
      <div>
        <p className="text-[13px] font-medium">{label}</p>
        {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
      </div>
      {action ?? <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />}
    </button>
  );
}

function ToggleSwitch() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); setOn(!on); }}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted-foreground/20"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`} />
    </button>
  );
}

function countryFlag(country: string): string {
  const flags: Record<string, string> = {
    中国: "🇨🇳", 日本: "🇯🇵", 韩国: "🇰🇷", 泰国: "🇹🇭", 美国: "🇺🇸",
    法国: "🇫🇷", 英国: "🇬🇧", 意大利: "🇮🇹", 西班牙: "🇪🇸", 德国: "🇩🇪",
    澳洲: "🇦🇺", 瑞士: "🇨🇭", 新加坡: "🇸🇬", 马来西亚: "🇲🇾", 印度尼西亚: "🇮🇩",
    越南: "🇻🇳", 柬埔寨: "🇰🇭", 菲律宾: "🇵🇭", 印度: "🇮🇳", 土耳其: "🇹🇷",
    希腊: "🇬🇷", 冰岛: "🇮🇸", 加拿大: "🇨🇦", 巴西: "🇧🇷", 秘鲁: "🇵🇪",
    新西兰: "🇳🇿", 南非: "🇿🇦", 摩洛哥: "🇲🇦", 埃及: "🇪🇬", 墨西哥: "🇲🇽",
    阿联酋: "🇦🇪", 克罗地亚: "🇭🇷", 捷克: "🇨🇿",
  };
  return flags[country] ?? "🌍";
}
