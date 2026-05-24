import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Search, Bell, MapPin, Sparkles, Play, CalendarCheck, Wallet, Utensils,
  ArrowRight, ChevronRight, ChevronLeft, Mountain, Users, Building2,
  Landmark, TreePine, Heart, User, Loader2, Plane, Link2, Image as ImageIcon,
  FileText, Youtube, type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { HotSpotsSection } from "@/components/HotSpotsSection";
import { useFeaturedRoutes, useTripActions, type SourceKind } from "@/lib/tripStore";
import heroImg from "@/assets/hero-santorini-blue.webp";
import tokyoImg from "@/assets/tokyo-sakura.webp";
import maldivesImg from "@/assets/maldives.webp";
import chiangmaiImg from "@/assets/chiangmai.webp";
import lavenderImg from "@/assets/lavender.webp";
import festivalImg from "@/assets/festival.webp";
import surfImg from "@/assets/surf.webp";
import whaleImg from "@/assets/whale.webp";
import amalfiImg from "@/assets/amalfi.webp";
import cappadociaImg from "@/assets/cappadocia.webp";
import auroraImg from "@/assets/aurora.webp";
import lijiangImg from "@/assets/lijiang.webp";
import swissImg from "@/assets/swiss-train.webp";
import destFranceImg from "@/assets/dest-france.webp";
import destJapanImg from "@/assets/dest-japan.webp";
import grandCanyonImg from "@/assets/grand-canyon.webp";
import machuPicchuImg from "@/assets/machu-picchu.webp";
import safariImg from "@/assets/safari.webp";
import sydneyImg from "@/assets/sydney.webp";
import aiBot from "@/assets/ai-bot.webp";
import avatarUser from "@/assets/avatar-user.webp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "趣旅 — 发现灵感 · 规划行程 · 无忧出发" },
      { name: "description", content: "AI 智能旅行助手,帮你发现目的地、生成行程、规划预算,探索世界精彩。" },
    ],
  }),
});

/* ─── Data ─── */

const tools = [
  { icon: CalendarCheck, label: "一键做行程", sub: "生成完整计划", color: "from-emerald-400 to-teal-500", action: "import" },
  { icon: Wallet, label: "预算规划", sub: "计算旅行花费", color: "from-amber-400 to-orange-500", action: "budget" },
  { icon: Utensils, label: "美食地图", sub: "发现当地美食", color: "from-sky-400 to-blue-500", action: "food" },
];

const seasonal = [
  { img: tokyoImg, tag: "赏花季", tagColor: "var(--tag-pink)", title: "日本·东京", sub: "樱花季限定体验", meta: "4天3晚 | 机票+酒店", dest: "日本" },
  { img: maldivesImg, tag: "海岛推荐", tagColor: "var(--tag-cyan)", title: "马尔代夫", sub: "住进玻璃海的梦", meta: "5天4晚 | 蜜月优选", dest: "马尔代夫" },
  { img: chiangmaiImg, tag: "文化探索", tagColor: "var(--tag-amber)", title: "泰国·清迈", sub: "古城慢生活", meta: "6天5晚 | 深度游", dest: "泰国" },
];

const categories = [
  { icon: Mountain, label: "自然风光", sub: "山川湖海", tint: "bg-emerald-100 text-emerald-600", cat: "nature" },
  { icon: Users, label: "亲子家庭", sub: "寓教于乐", tint: "bg-amber-100 text-amber-600", cat: "family" },
  { icon: Building2, label: "城市漫游", sub: "街拍美食", tint: "bg-sky-100 text-sky-600", cat: "city" },
  { icon: Landmark, label: "文化探索", sub: "历史人文", tint: "bg-indigo-100 text-indigo-600", cat: "culture" },
  { icon: TreePine, label: "户外探险", sub: "徒步露营", tint: "bg-green-100 text-green-600", cat: "outdoor" },
  { icon: Heart, label: "蜜月旅行", sub: "浪漫时光", tint: "bg-rose-100 text-rose-600", cat: "couple" },
];

const calendar = [
  { month: "5月", title: "北海道薰衣草季", date: "5–7月", img: lavenderImg, color: "from-rose-400 to-pink-500", dest: "北海道" },
  { month: "6月", title: "欧洲音乐节季", date: "6–8月", img: festivalImg, color: "from-pink-400 to-rose-500", dest: "西班牙" },
  { month: "7月", title: "夏威夷冲浪季", date: "7–9月", img: surfImg, color: "from-cyan-400 to-teal-500", dest: "夏威夷" },
  { month: "8月", title: "北极观鲸季", date: "8–10月", img: whaleImg, color: "from-amber-400 to-orange-500", dest: "冰岛" },
];

const staticCommunity = [
  { img: amalfiImg, title: "意大利阿马尔菲海岸", author: "旅行家小七", likes: "1.2万", video: true, dest: "意大利" },
  { img: cappadociaImg, title: "土耳其热气球全攻略", author: "摄影师阿May", likes: "9862", dest: "土耳其" },
  { img: auroraImg, title: "冰岛极光追逐指南", author: "背包客小鱼", likes: "7521", dest: "冰岛" },
  { img: lijiangImg, title: "丽江古城慢生活", author: "阿杰的旅行日记", likes: "6430", dest: "中国" },
  { img: swissImg, title: "瑞士冬季列车体验", author: "旅行摄影师KK", likes: "5821", dest: "瑞士" },
];

const inspoMap = [
  { name: "欧洲", sub: "浪漫小镇", img: destFranceImg, top: "10%", left: "55%" },
  { name: "亚洲", sub: "文化之旅", img: destJapanImg, top: "20%", left: "80%" },
  { name: "北美洲", sub: "自然奇观", img: grandCanyonImg, top: "28%", left: "12%" },
  { name: "南美洲", sub: "热情探险", img: machuPicchuImg, top: "62%", left: "20%" },
  { name: "非洲", sub: "野生动物", img: safariImg, top: "54%", left: "52%" },
  { name: "大洋洲", sub: "海岛度假", img: sydneyImg, top: "74%", left: "82%" },
];

const heroTags = ["日本赏樱", "冰岛极光", "东南亚海岛", "欧洲小镇", "亲子游"];

/* ─── Import config ─── */
const importKinds: Array<{ kind: SourceKind; label: string; icon: LucideIcon; placeholder: string }> = [
  { kind: "link", label: "链接", icon: Link2, placeholder: "粘贴攻略链接，例如小红书/公众号/网页" },
  { kind: "image", label: "截图", icon: ImageIcon, placeholder: "上传攻略截图，也可以补充目的地" },
  { kind: "text", label: "文本", icon: FileText, placeholder: "粘贴攻略文本、想去的地点或旅行灵感" },
  { kind: "video", label: "视频", icon: Youtube, placeholder: "粘贴视频链接或描述视频内容" },
];

function inferKind(v: string): SourceKind { return /^https?:\/\//i.test(v.trim()) ? "link" : "text"; }
function getCityCover(city: string) { return `/api/spot-image?q=${encodeURIComponent(city + " 景点 风景")}`; }
const themeLabels: Record<string, string> = { citywalk: "城市漫步", food: "美食之旅", beach: "海滩度假", luxury: "奢华体验", nature: "自然风光", shopping: "购物血拼", culture: "文化探索" };

/* ─────────── Component ─────────── */

function Index() {
  const nav = useNavigate();
  const actions = useTripActions();
  const { data: n8nRoutes } = useFeaturedRoutes();
  const [content, setContent] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [activeKind, setActiveKind] = useState<SourceKind>("link");
  const [drawerText, setDrawerText] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showXhsDrawer, setShowXhsDrawer] = useState(false);
  const [xhsNoteText, setXhsNoteText] = useState("");

  const { seasonalPicks, communityCards } = useMemo(() => {
    if (!n8nRoutes || n8nRoutes.length < 3) return { seasonalPicks: [] as typeof n8nRoutes, communityCards: [] as typeof n8nRoutes };
    const usedIds = new Set<number>(), seenCities = new Set<string>();
    const picks: typeof n8nRoutes = [];
    for (const r of n8nRoutes) { if (seenCities.has(r.city) || !r.city) continue; seenCities.add(r.city); usedIds.add(r.id); picks.push(r); if (picks.length >= 6) break; }
    const community: typeof n8nRoutes = [], commCities = new Set<string>();
    for (const r of n8nRoutes) { if (usedIds.has(r.id) || commCities.has(r.city)) continue; commCities.add(r.city); usedIds.add(r.id); community.push(r); if (community.length >= 10) break; }
    return { seasonalPicks: picks, communityCards: community };
  }, [n8nRoutes]);

  const doImport = async (kind: SourceKind, raw: string) => {
    if (raw.trim().length < 2) { setError("请先输入攻略内容或旅行灵感"); return; }
    setSubmitting(true); setError("");
    try { const job = await actions.createImport({ kind, content: raw.trim() }); nav({ to: "/parsing", search: { jobId: job.id } }); }
    catch (err) { setError(err instanceof Error ? err.message : "导入失败，请重试"); }
    finally { setSubmitting(false); }
  };
  const isXhsLink = /xiaohongshu\.com|xhslink\.com/.test(content);
  const submitHero = () => {
    if (!content.trim()) { nav({ to: "/quiz" }); return; }
    if (isXhsLink) { void doImport("text", content); return; }
    void doImport(inferKind(content), content);
  };
  const submitDrawer = () => {
    const parts: string[] = [];
    if (drawerText.trim()) parts.push(drawerText.trim());
    if (imageBase64) parts.push(`[IMAGE_BASE64]${imageBase64}[/IMAGE_BASE64]`);
    else if (fileName) parts.push(`截图文件：${fileName}`);
    void doImport(activeKind, parts.join("\n"));
  };

  return (
    <div className="min-h-screen bg-background pb-20">

      {/* ══════ HERO · 首屏黄金区 300px ══════
          设计思路: iPhone 14 可视844px，300px hero + 工具栏后
          用户首屏就能看到"灵感地图"的顶部，产生继续滑的欲望 */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <img src={heroImg} alt="圣托里尼日落全景" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "75% 60%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 35%, rgba(0,0,0,0.55) 100%)" }} />

        {/* top bar */}
        <div className="relative z-10 flex items-center justify-end gap-3 px-5 pt-[calc(env(safe-area-inset-top,44px)+4px)]">
          <div className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-white text-[11px] font-medium">
            <MapPin className="h-3 w-3" /> 圣托里尼
          </div>
          <button className="relative grid place-items-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white" aria-label="通知">
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </button>
          <img src={avatarUser} alt="用户头像" className="h-8 w-8 rounded-full object-cover ring-2 ring-white/40" loading="lazy" />
        </div>

        {/* headline */}
        <div className="relative z-10 px-5 mt-5 text-white">
          <h1 className="text-[30px] leading-[1.2] font-extrabold tracking-tight drop-shadow-md">
            世界很大<br />
            <span className="inline-flex items-center gap-1.5">去看看吧 <Sparkles className="h-5 w-5 text-amber-200" /></span>
          </h1>
          <p className="mt-2 text-[12px] text-white/80 tracking-wider font-light">发现灵感 · 规划行程 · 无忧出发</p>
        </div>

        {/* search + tags — 贴底 */}
        <div className="absolute inset-x-4 bottom-3 z-10">
          <div className="flex items-center gap-1.5 rounded-full bg-white shadow-lg pl-3 pr-1 py-[3px]">
            <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <input placeholder="想去哪儿? 搜索目的地 / 景点 / 攻略 / 行程"
              className="flex-1 bg-transparent text-[11px] py-1.5 outline-none placeholder:text-gray-400 min-w-0"
              value={content} onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submitHero(); }} />
            <button type="button" onClick={submitHero} disabled={submitting} aria-label="搜索"
              className="grid place-items-center h-7 w-7 rounded-full text-white shrink-0 disabled:opacity-70"
              style={{ background: "var(--gradient-ai)" }}>
              {submitting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            </button>
          </div>
          {content && isXhsLink ? (
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="shrink-0 rounded-full bg-emerald-500/90 backdrop-blur text-white text-[9px] px-2.5 py-[3px] font-medium flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                小红书笔记已识别
              </span>
              <span className="text-[9px] text-white/80">点击按钮解析为旅行路线</span>
            </div>
          ) : (
            <div className="mt-1.5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {heroTags.map(t => (
                <button key={t} type="button" onClick={() => setContent(t)}
                  className="shrink-0 rounded-full bg-white/20 backdrop-blur text-white text-[9px] px-2 py-[3px] font-medium">{t}</button>
              ))}
            </div>
          )}
        </div>
      </section>

      {error && !showImport && <p className="mx-4 mt-1 text-[10px] text-rose-500">{error}</p>}

      {/* ══════ TOOLS (3个) + AI卡片 ══════ */}
      <section className="px-3 -mt-3 relative z-20">
        <div className="rounded-2xl bg-card px-3 py-2.5 shadow-[var(--shadow-card)] flex items-center gap-2">
          <div className="flex-1 grid grid-cols-3">
            {tools.map(({ icon: Icon, label, sub, color, action }) => (
              <button key={label} type="button" onClick={() => {
                if (action === "budget") nav({ to: "/budget" });
                if (action === "import") setShowImport(true);
                if (action === "food") nav({ to: "/food-map" });
              }} className="flex flex-col items-center gap-[3px]">
                <div className={`grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br ${color} text-white`}>
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <span className="text-[9px] font-semibold text-foreground leading-none">{label}</span>
                <span className="text-[7px] text-muted-foreground leading-none">{sub}</span>
              </button>
            ))}
          </div>
          {/* AI mini card */}
          <div className="shrink-0 w-[100px] relative overflow-hidden rounded-xl p-2 text-white cursor-pointer"
            style={{ background: "var(--gradient-ai)" }} onClick={() => nav({ to: "/quiz" })}>
            <div className="relative z-10">
              <div className="flex items-center gap-0.5">
                <span className="text-[9px] font-bold leading-none">AI旅行规划师</span>
                <span className="text-[5px] font-bold bg-white/25 px-0.5 rounded leading-none">BETA</span>
              </div>
              <p className="mt-[3px] text-[6.5px] text-white/80 leading-[1.4]">告诉我你的想法<br/>为你定制专属旅程</p>
              <span className="mt-1 inline-flex items-center gap-0.5 rounded-full bg-white text-primary text-[7px] font-semibold px-1.5 py-[2px] leading-none">
                去和AI聊聊 <ArrowRight className="h-2 w-2" />
              </span>
            </div>
            <img src={aiBot} alt="AI助手" className="absolute -right-1.5 -bottom-1.5 h-[52px] w-[52px] object-contain opacity-80" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ══════ 灵感地图 + 当季精选 ══════ */}
      <section className="mt-3 px-3 grid grid-cols-2 gap-2">
        {/* 灵感地图 */}
        <Link to="/inspiration" className="rounded-2xl bg-card p-2.5 shadow-[var(--shadow-soft)] relative overflow-hidden block">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-[12px] leading-none">灵感地图</h3>
              <p className="text-[8px] text-muted-foreground mt-[3px]">探索世界精彩</p>
            </div>
            <MapPin className="h-3 w-3 text-primary" />
          </div>
          <div className="relative h-[105px] mt-1">
            <img src="/world-map-simple.svg" alt="世界地图" className="absolute inset-0 h-full w-full object-contain opacity-[0.55]" loading="lazy" />
            {inspoMap.map((p) => (
              <div key={p.name} className="absolute flex flex-col items-center" style={{ top: p.top, left: p.left, transform: "translate(-50%,-50%)" }}>
                <img src={p.img} alt={p.name} className="h-[22px] w-[22px] rounded-full object-cover ring-[1.5px] ring-white shadow-sm" loading="lazy" />
                <span className="text-[6.5px] font-semibold mt-[1px] leading-none">{p.name}</span>
                <span className="text-[5.5px] text-muted-foreground leading-none">{p.sub}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 left-2 inline-flex items-center gap-0.5 rounded-full bg-white shadow text-[8px] font-semibold px-2 py-1">
            查看世界地图 <ArrowRight className="h-2 w-2" />
          </div>
        </Link>

        {/* 当季精选 */}
        <div className="rounded-2xl bg-card p-2.5 shadow-[var(--shadow-soft)]">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-[12px] leading-none">当季精选</h3>
              <p className="text-[8px] text-muted-foreground mt-[3px]">最适合出发的目的地</p>
            </div>
            <Link to="/destinations" className="text-[8px] text-muted-foreground flex items-center">更多<ChevronRight className="h-2.5 w-2.5" /></Link>
          </div>
          <div className="mt-1.5 -mx-0.5 overflow-x-auto no-scrollbar flex gap-1.5">
            {(seasonalPicks.length > 0
              ? seasonalPicks.slice(0, 3).map((r, i) => ({
                  img: r.cover_url || getCityCover(r.city), tag: themeLabels[r.route_theme] || "精选",
                  tagColor: ["var(--tag-pink)","var(--tag-cyan)","var(--tag-amber)"][i%3],
                  title: `${r.country}·${r.city}`, sub: r.route_title,
                  meta: `${r.days_count}天${Math.max(r.days_count-1,0)}晚`, dest: r.destination||r.country }))
              : seasonal.map(s => ({ ...s }))
            ).map(s => (
              <Link key={s.title} to="/explore" search={{ dest: (s as any).dest || "" }}
                className="relative shrink-0 w-[88px] aspect-[4/5] rounded-xl overflow-hidden block">
                <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute top-1.5 left-1 text-[6px] font-bold px-1 py-[2px] rounded text-white" style={{ background: s.tagColor }}>{s.tag}</span>
                <div className="absolute bottom-1.5 left-1 right-1 text-white">
                  <p className="text-[9px] font-bold leading-tight">{s.title}</p>
                  <p className="text-[6.5px] opacity-85 mt-[1px] line-clamp-1">{s.sub}</p>
                  <p className="text-[5.5px] opacity-70 mt-[1px]">{s.meta}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-center gap-[3px] mt-1">
            <span className="h-[3px] w-2 rounded-full bg-primary" />
            <span className="h-[3px] w-[3px] rounded-full bg-border" />
            <span className="h-[3px] w-[3px] rounded-full bg-border" />
          </div>
        </div>
      </section>

      {/* ══════ 你可能喜欢 ══════ */}
      <section className="mt-3 px-3">
        <h2 className="text-[14px] font-bold px-1">你可能喜欢</h2>
        <div className="mt-1.5 flex gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map(({ icon: Icon, label, sub, tint, cat }) => (
            <Link key={label} to="/explore" search={{ cat }}
              className="shrink-0 flex items-center gap-1.5 rounded-xl bg-card px-2 py-[7px] shadow-[var(--shadow-soft)]">
              <div className={`grid place-items-center h-6 w-6 rounded-md ${tint}`}>
                <Icon className="h-3 w-3" />
              </div>
              <div>
                <p className="text-[10px] font-semibold leading-none">{label}</p>
                <p className="text-[7px] text-muted-foreground leading-none mt-[2px]">{sub}</p>
              </div>
            </Link>
          ))}
          <button className="shrink-0 grid place-items-center w-6 rounded-full bg-card shadow-[var(--shadow-soft)]" aria-label="查看更多">
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
      </section>

      {/* ══════ 热门景点排行 ══════ */}
      <HotSpotsSection />

      {/* ══════ 旅行日历 ══════ */}
      <section className="mt-3 px-3">
        <div className="flex items-baseline gap-1.5 px-1">
          <h2 className="text-[13px] font-bold">旅行日历</h2>
          <span className="text-[8px] text-muted-foreground">未来3个月的最佳旅行时机</span>
        </div>
        <div className="mt-1.5 flex gap-1.5 overflow-x-auto no-scrollbar">
          {calendar.map((c, i) => (
            <Link key={c.title} to="/explore" search={{ dest: c.dest }} className="shrink-0 w-[120px] block">
              {/* timeline dot + line */}
              <div className="flex items-center mb-1 h-4">
                <div className="flex flex-col items-start gap-[2px]">
                  <span className={`text-[9px] font-bold bg-gradient-to-r ${c.color} bg-clip-text text-transparent leading-none`}>{c.month}</span>
                  <span className={`h-[5px] w-[5px] rounded-full bg-gradient-to-r ${c.color}`} />
                </div>
                {i < calendar.length - 1 && <div className={`flex-1 h-[1.5px] ml-1 bg-gradient-to-r ${c.color} opacity-35 rounded-full`} />}
              </div>
              {/* card */}
              <div className="relative w-full h-[64px] rounded-xl overflow-hidden shadow-sm">
                <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                  <p className="text-[10px] font-bold leading-tight">{c.title}</p>
                  <p className="text-[7px] opacity-85 mt-[1px]">{c.date}</p>
                </div>
              </div>
            </Link>
          ))}
          <button className="shrink-0 grid place-items-center w-6 rounded-full bg-card shadow-sm" aria-label="查看更多">
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
      </section>

      {/* ══════ 社区灵感 ══════ */}
      <section className="mt-3 px-3">
        <div className="flex items-baseline justify-between px-1">
          <div className="flex items-baseline gap-1.5">
            <h2 className="text-[13px] font-bold">社区灵感</h2>
            <span className="text-[8px] text-muted-foreground">看看旅行家们的真实分享</span>
          </div>
          <Link to="/destinations" className="text-[8px] text-muted-foreground flex items-center">更多<ChevronRight className="h-2.5 w-2.5" /></Link>
        </div>
        <div className="mt-1.5 relative">
          <button className="absolute -left-0.5 top-[40%] -translate-y-1/2 z-10 grid place-items-center h-6 w-6 rounded-full bg-card shadow-md" aria-label="向左滑动">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button className="absolute -right-0.5 top-[40%] -translate-y-1/2 z-10 grid place-items-center h-6 w-6 rounded-full bg-card shadow-md" aria-label="向右滑动">
            <ChevronRight className="h-3 w-3" />
          </button>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {(communityCards.length > 0
              ? communityCards.slice(0, 5).map((r, i) => ({
                  img: r.cover_url || getCityCover(r.city), title: r.route_title,
                  author: ["旅行家小七","摄影师阿May","背包客小鱼","阿杰旅行日记","摄影师KK"][i%5],
                  likes: String(Math.floor(1200 + (r.id * 137 + i * 431) % 4800)),
                  video: i === 0, dest: r.destination }))
              : staticCommunity.map(c => ({ ...c }))
            ).map(p => (
              <Link key={p.title} to="/explore" search={{ dest: (p as any).dest || "" }} className="shrink-0 w-[108px] block">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <img src={p.img} alt={p.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  {p.video && (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="h-7 w-7 rounded-full bg-black/25 backdrop-blur grid place-items-center">
                        <Play className="h-3 w-3 fill-white text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-[9px] font-semibold leading-tight line-clamp-1">{p.title}</p>
                <div className="mt-[2px] flex items-center justify-between text-[8px] text-muted-foreground">
                  <div className="flex items-center gap-[2px]">
                    <span className="h-3 w-3 rounded-full bg-muted grid place-items-center"><User className="h-[7px] w-[7px]" /></span>
                    <span className="max-w-[52px] truncate">{p.author}</span>
                  </div>
                  <div className="flex items-center gap-[2px]"><Heart className="h-[7px] w-[7px]" />{p.likes}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ XHS Import Sheet ══════ */}
      {showXhsDrawer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) setShowXhsDrawer(false); }}>
          <div className="w-full max-w-[430px] rounded-t-[20px] bg-white p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-bold text-foreground flex items-center gap-1.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-rose-500 text-white text-[10px] font-black">红</span>
                  导入小红书笔记
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">粘贴笔记正文，AI 自动解析为旅行路线</p>
              </div>
              <button type="button" onClick={() => setShowXhsDrawer(false)} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">关闭</button>
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-200/60 px-3 py-2 mb-3">
              <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                📋 在小红书 App 中打开笔记 → 长按正文 → 复制 → 粘贴到下方
              </p>
            </div>

            <textarea
              value={xhsNoteText}
              onChange={(e) => setXhsNoteText(e.target.value)}
              placeholder={"粘贴小红书笔记正文...\n\n例如：Day1 东京浅草寺→秋叶原→涩谷，Day2 �的仓→江之岛..."}
              className="h-28 w-full resize-none rounded-xl bg-muted px-3 py-2.5 text-[11px] leading-relaxed outline-none placeholder:text-muted-foreground"
            />

            <div className="mt-2 flex gap-2">
              <button type="button"
                onClick={() => {
                  void doImport("text", content);
                  setShowXhsDrawer(false);
                }}
                disabled={submitting}
                className="flex h-9 flex-1 items-center justify-center gap-1 rounded-full border border-gray-200 text-[11px] font-semibold text-gray-600 disabled:opacity-70">
                仅用标题生成
              </button>
              <button type="button"
                onClick={() => {
                  const combined = xhsNoteText.trim()
                    ? `来源: 小红书笔记\n\n${xhsNoteText.trim()}`
                    : content;
                  void doImport("text", combined);
                  setShowXhsDrawer(false);
                }}
                disabled={submitting || !xhsNoteText.trim()}
                className="flex h-9 flex-[2] items-center justify-center gap-1.5 rounded-full text-[12px] font-bold text-white disabled:opacity-50"
                style={{ background: "var(--gradient-ai)" }}>
                {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                解析完整笔记
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════ Import Sheet ══════ */}
      {showImport && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 backdrop-blur-sm">
          <div className="w-full max-w-[430px] rounded-t-[20px] bg-white p-4 shadow-2xl">
            <div className="mb-2.5 flex items-center justify-between">
              <div>
                <p className="text-[14px] font-bold text-foreground">导入攻略</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">链接、截图、文本、视频都可以解析成路线</p>
              </div>
              <button type="button" onClick={() => setShowImport(false)} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">关闭</button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {importKinds.map(({ kind, label, icon: Icon }) => (
                <button key={kind} type="button" onClick={() => { setActiveKind(kind); setError(""); }}
                  className={`flex h-8 items-center justify-center gap-1 rounded-lg text-[10px] font-bold ${activeKind === kind ? "bg-primary text-white shadow" : "bg-muted text-muted-foreground"}`}>
                  <Icon className="h-3 w-3" />{label}
                </button>
              ))}
            </div>
            {activeKind === "image" && (
              <label className="mt-2 flex cursor-pointer items-center rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold text-primary">
                <span className="truncate">{fileName || "选择攻略截图"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0]; if (!file) return; setFileName(file.name);
                  const img = new Image(); img.onload = () => { const max=1024; let {width:w,height:h}=img; if(w>max||h>max){const s=max/Math.max(w,h);w=Math.round(w*s);h=Math.round(h*s);} const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d")!.drawImage(img,0,0,w,h);setImageBase64(c.toDataURL("image/jpeg",0.72).split(",")[1]??"");URL.revokeObjectURL(img.src);}; img.src=URL.createObjectURL(file);
                }} />
              </label>
            )}
            <textarea value={drawerText} onChange={(e) => setDrawerText(e.target.value)}
              placeholder={importKinds.find(k => k.kind === activeKind)?.placeholder}
              className="mt-2 h-16 w-full resize-none rounded-xl bg-muted px-3 py-2 text-[11px] outline-none placeholder:text-muted-foreground" />
            {error && <p className="mt-1 text-[10px] text-rose-500">{error}</p>}
            <button type="button" onClick={submitDrawer} disabled={submitting}
              className="mt-2 flex h-9 w-full items-center justify-center gap-1.5 rounded-full text-[12px] font-bold text-white disabled:opacity-70"
              style={{ background: "var(--gradient-ai)" }}>
              {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plane className="h-3.5 w-3.5" />} 开始解析
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
