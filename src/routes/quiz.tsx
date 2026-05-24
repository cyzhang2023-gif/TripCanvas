import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Globe,
  Home as HomeIcon,
  Loader2,
  MapPin,
  Mountain,
  Palmtree,
  Sun,
  ThumbsUp,
  TreePine,
  UtensilsCrossed,
  Building2,
  Landmark,
  ShoppingBag,
  Palette,
  Compass,
  Users,
  Heart,
  Baby,
  UserCircle,
  Wallet,
  CalendarDays,
  Snowflake,
  Leaf,
  Flower2,
  Clock,
  Star,
  SlidersHorizontal,
  Route as RouteIcon,
} from "lucide-react";
import { useState, useCallback } from "react";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
  head: () => ({
    meta: [{ title: "旅行偏好 · Routey" }],
  }),
});

type QuizAnswers = {
  scope: "domestic" | "international" | "";
  styles: string[];
  days: string;
  travelType: string;
  budget: string;
  season: string;
};

type MatchedRoute = {
  id: string;
  title: string;
  days: number;
  spots: number;
  source: string;
  likes: number;
  cover: string;
  tags: string[];
  profileKey: string;
  matchScore: number;
  destination: string;
};

type AiRoute = {
  id: string;
  status: "generating" | "done" | "error";
  tripId?: string;
  tripName?: string;
};

const TOTAL_STEPS = 6;

const scopeOptions = [
  { value: "international", label: "出国玩", icon: Globe, desc: "探索世界各地" },
  { value: "domestic", label: "国内游", icon: HomeIcon, desc: "发现国内美景" },
];

const styleOptions = [
  { value: "海滩", label: "海滩", icon: Palmtree, bg: "from-cyan-50 to-blue-50", border: "border-cyan-200" },
  { value: "森林", label: "森林/自然", icon: TreePine, bg: "from-green-50 to-emerald-50", border: "border-green-200" },
  { value: "都市", label: "都市", icon: Building2, bg: "from-blue-50 to-indigo-50", border: "border-blue-200" },
  { value: "古迹", label: "古迹/历史", icon: Landmark, bg: "from-amber-50 to-orange-50", border: "border-amber-200" },
  { value: "美食", label: "美食", icon: UtensilsCrossed, bg: "from-orange-50 to-red-50", border: "border-orange-200" },
  { value: "冒险", label: "冒险/户外", icon: Compass, bg: "from-indigo-50 to-[#fff0ed]", border: "border-indigo-200" },
  { value: "购物", label: "购物", icon: ShoppingBag, bg: "from-pink-50 to-rose-50", border: "border-pink-200" },
  { value: "文艺", label: "文艺/艺术", icon: Palette, bg: "from-[#fff0ed] to-[#fff0ed]", border: "border-[#e8614d]/20" },
];

const daysOptions = [
  { value: "1-3", label: "1-3 天", desc: "短途周末", icon: Clock },
  { value: "4-5", label: "4-5 天", desc: "小长假", icon: CalendarDays },
  { value: "6-7", label: "6-7 天", desc: "一周深度", icon: RouteIcon },
  { value: "7+", label: "7 天以上", desc: "长途旅行", icon: Compass },
];

const travelTypeOptions = [
  { value: "solo", label: "独自旅行", icon: UserCircle },
  { value: "couple", label: "情侣出游", icon: Heart },
  { value: "family", label: "家庭亲子", icon: Baby },
  { value: "friends", label: "朋友聚会", icon: Users },
];

const budgetOptions = [
  { value: "budget", label: "经济实惠", desc: "精打细算", icon: Wallet },
  { value: "comfort", label: "舒适中档", desc: "品质优先", icon: ThumbsUp },
  { value: "luxury", label: "高端奢华", desc: "极致享受", icon: Star },
];

const seasonOptions = [
  { value: "spring", label: "春季", icon: Flower2 },
  { value: "summer", label: "夏季", icon: Sun },
  { value: "autumn", label: "秋季", icon: Leaf },
  { value: "winter", label: "冬季", icon: Snowflake },
  { value: "anytime", label: "随时都行", icon: Clock },
];

function QuizPage() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    scope: "",
    styles: [],
    days: "",
    travelType: "",
    budget: "",
    season: "",
  });

  const [loading, setLoading] = useState(false);
  const [dbMatches, setDbMatches] = useState<MatchedRoute[]>([]);
  const [aiRoutes, setAiRoutes] = useState<AiRoute[]>([]);
  const [addingRoute, setAddingRoute] = useState<string | null>(null);

  const canNext =
    step === 0
      ? answers.scope !== ""
      : step === 1
        ? answers.styles.length > 0
        : step === 2
          ? answers.days !== ""
          : step === 3
            ? answers.travelType !== ""
            : step === 4
              ? answers.budget !== ""
              : step === 5
                ? answers.season !== ""
                : true;

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      submitQuiz(answers);
    }
  }, [step, answers]);

  const goBack = () => {
    if (step > 0) setStep(step - 1);
    else nav({ to: "/" });
  };

  const submitQuiz = async (finalAnswers?: QuizAnswers) => {
    const payload = finalAnswers ?? answers;
    setStep(TOTAL_STEPS);
    setLoading(true);
    try {
      const res = await fetch("/api/quiz-recommend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setDbMatches(data.dbMatches ?? []);
      setAiRoutes(data.aiRoutes ?? []);

      if (data.aiRoutes?.some((r: AiRoute) => r.status === "generating")) {
        pollAiRoutes(data.aiRoutes);
      }
    } catch {
      setDbMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const pollAiRoutes = async (routes: AiRoute[]) => {
    const pending = routes.filter((r) => r.status === "generating");
    if (pending.length === 0) return;

    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      try {
        const res = await fetch("/api/quiz-ai-status", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ids: pending.map((r) => r.id) }),
        });
        const data = await res.json();
        const updated: AiRoute[] = data.routes ?? [];
        if (updated.length > 0) {
          setAiRoutes((prev) =>
            prev.map((r) => {
              const u = updated.find((x: AiRoute) => x.id === r.id);
              return u ?? r;
            }),
          );
          if (updated.every((r: AiRoute) => r.status !== "generating")) break;
        }
      } catch {
        break;
      }
    }
  };

  const addRoute = async (routeId: string) => {
    setAddingRoute(routeId);
    try {
      const res = await fetch("/api/explore/add", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ routeId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.aiJobId) {
          nav({ to: "/parsing", search: { jobId: data.aiJobId } });
        } else {
          nav({ to: "/trip", search: { id: data.id, focus: "map" } });
        }
      }
    } finally {
      setAddingRoute(null);
    }
  };

  const showResults = step === TOTAL_STEPS;

  return (
    <div className="app-shell bg-white pb-20">
      {/* Header */}
      <header className="flex items-center gap-2 px-4 pt-5">
        <button onClick={goBack} className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f6f8]">
          <ArrowLeft className="h-4.5 w-4.5 text-gray-800" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <h1 className="text-[15px] font-bold tracking-tight text-gray-900">
              {showResults ? "为你推荐" : "旅行偏好"}
            </h1>
            {showResults && <RouteIcon className="h-3.5 w-3.5 text-primary" />}
          </div>
          {showResults && (
            <p className="text-[10px] text-muted-foreground">按偏好匹配适合你的精品路线</p>
          )}
        </div>
        {!showResults && (
          <span className="text-[12px] font-medium text-gray-400">
            {step + 1}/{TOTAL_STEPS}
          </span>
        )}
        {showResults && (
          <button className="pressable flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f6f8]">
            <SlidersHorizontal className="h-4 w-4 text-foreground" />
          </button>
        )}
      </header>

      {/* Progress bar */}
      {!showResults && (
        <div className="mx-5 mt-2.5 h-[3px] overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
              background: "linear-gradient(90deg, #d4532e 0%, #e8614d 100%)",
            }}
          />
        </div>
      )}

      {/* Question screens */}
      {!showResults && (
        <div className="px-5 pt-6">
          {step === 0 && (
            <QuestionScreen title="想去哪儿旅行？" subtitle="选择你的出行范围">
              <div className="mt-5 grid grid-cols-2 gap-3">
                {scopeOptions.map(({ value, label, icon: Icon, desc }) => {
                  const isSelected = answers.scope === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setAnswers({ ...answers, scope: value as "domestic" | "international" });
                        setTimeout(() => setStep(1), 200);
                      }}
                      className={`pressable flex flex-col items-center gap-2.5 rounded-2xl border p-5 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]"
                          : "border-gray-100 bg-gradient-to-br from-gray-50 to-slate-50"
                      }`}
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                        <Icon className="h-7 w-7" strokeWidth={2.1} />
                      </span>
                      <span className={`text-[15px] font-bold ${isSelected ? "text-primary" : "text-gray-800"}`}>{label}</span>
                      <span className={`text-[11px] ${isSelected ? "text-primary/70" : "text-gray-400"}`}>{desc}</span>
                    </button>
                  );
                })}
              </div>
            </QuestionScreen>
          )}

          {step === 1 && (
            <QuestionScreen title="喜欢什么类型的旅行？" subtitle="多选，让我们为你推荐更合适的行程">
              <div className="mt-5 grid grid-cols-2 gap-3">
                {styleOptions.map(({ value, label, icon: Icon, bg, border }) => {
                  const selected = answers.styles.includes(value);
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setAnswers({
                          ...answers,
                          styles: selected
                            ? answers.styles.filter((s) => s !== value)
                            : [...answers.styles, value],
                        });
                      }}
                      className={`pressable flex items-center gap-3 rounded-2xl border px-3 py-3.5 ${
                        selected
                          ? `border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]`
                          : `${border} bg-gradient-to-br ${bg}`
                      }`}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                        <Icon className="h-6 w-6" strokeWidth={2.1} />
                      </span>
                      <span className={`flex-1 text-left text-[14px] font-semibold ${selected ? "text-primary" : "text-gray-700"}`}>
                        {label}
                      </span>
                      {/* Radio circle */}
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        selected ? "border-primary bg-primary" : "border-gray-300"
                      }`}>
                        {selected && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Tip banner */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-blue-50/80 px-4 py-3">
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[12px] font-bold text-primary">小提示</span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500">选择越多，我们越能为你推荐符合期待的目的地和玩法哦~</p>
                </div>
                <RouteIcon className="h-9 w-9 text-primary/70" />
              </div>

              {answers.styles.length > 0 && (
                <button
                  onClick={goNext}
                  className="pressable mt-4 flex w-full items-center justify-center gap-1 rounded-2xl py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/25"
                  style={{ background: "linear-gradient(135deg, #d4532e 0%, #e8614d 100%)" }}
                >
                  下一步
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </QuestionScreen>
          )}

          {step === 2 && (
            <QuestionScreen title="计划玩几天？" subtitle="选择出行时长">
              <div className="mt-5 flex flex-col gap-2.5">
                {daysOptions.map(({ value, label, desc, icon: Icon }) => {
                  const isSelected = answers.days === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setAnswers({ ...answers, days: value });
                        setTimeout(() => setStep(3), 200);
                      }}
                      className={`pressable flex items-center gap-3 rounded-2xl border px-4 py-3.5 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1 text-left">
                        <span className={`text-[14px] font-bold ${isSelected ? "text-primary" : "text-gray-800"}`}>{label}</span>
                        <p className={`text-[11px] ${isSelected ? "text-primary/60" : "text-gray-400"}`}>{desc}</p>
                      </div>
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-primary bg-primary" : "border-gray-300"
                      }`}>
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </QuestionScreen>
          )}

          {step === 3 && (
            <QuestionScreen title="和谁一起去？" subtitle="选择出行方式">
              <div className="mt-5 grid grid-cols-2 gap-3">
                {travelTypeOptions.map(({ value, label, icon: Icon }) => {
                  const isSelected = answers.travelType === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setAnswers({ ...answers, travelType: value });
                        setTimeout(() => setStep(4), 200);
                      }}
                      className={`pressable flex flex-col items-center gap-2.5 rounded-2xl border p-5 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]"
                          : "border-gray-100 bg-gradient-to-br from-gray-50 to-white"
                      }`}
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                        <Icon className="h-7 w-7" strokeWidth={2.1} />
                      </span>
                      <span className={`text-[14px] font-bold ${isSelected ? "text-primary" : "text-gray-800"}`}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </QuestionScreen>
          )}

          {step === 4 && (
            <QuestionScreen title="预算大概多少？" subtitle="选择消费档次">
              <div className="mt-5 flex flex-col gap-2.5">
                {budgetOptions.map(({ value, label, desc, icon: Icon }) => {
                  const isSelected = answers.budget === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setAnswers({ ...answers, budget: value });
                        setTimeout(() => setStep(5), 200);
                      }}
                      className={`pressable flex items-center gap-3 rounded-2xl border px-4 py-4 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1 text-left">
                        <span className={`text-[14px] font-bold ${isSelected ? "text-primary" : "text-gray-800"}`}>{label}</span>
                        <p className={`text-[11px] ${isSelected ? "text-primary/60" : "text-gray-400"}`}>{desc}</p>
                      </div>
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        isSelected ? "border-primary bg-primary" : "border-gray-300"
                      }`}>
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </QuestionScreen>
          )}

          {step === 5 && (
            <QuestionScreen title="什么时候出发？" subtitle="选择出行季节">
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {seasonOptions.map(({ value, label, icon: Icon }) => {
                  const isSelected = answers.season === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        const updated = { ...answers, season: value };
                        setAnswers(updated);
                        setTimeout(() => submitQuiz(updated), 300);
                      }}
                      className={`pressable flex flex-col items-center gap-2 rounded-2xl border py-4 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]"
                          : "border-gray-100 bg-white"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-primary" strokeWidth={2.1} />
                      <span className={`text-[13px] font-bold ${isSelected ? "text-primary" : "text-gray-700"}`}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </QuestionScreen>
          )}
        </div>
      )}

      {/* Results */}
      {showResults && (
        <ResultsView
          loading={loading}
          dbMatches={dbMatches}
          aiRoutes={aiRoutes}
          addingRoute={addingRoute}
          onAddRoute={addRoute}
        />
      )}

      <BottomNav />
    </div>
  );
}

function QuestionScreen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-200">
      <h2 className="text-xl font-extrabold tracking-tight text-gray-900">{title}</h2>
      <p className="mt-1 text-[13px] text-gray-400">{subtitle}</p>
      {children}
    </div>
  );
}

/* ─── Badge colors by card index ─── */
const badgeColors = [
  "linear-gradient(135deg, #e8614d, #f09080)", // 01 coral
  "linear-gradient(135deg, #34d399, #10b981)", // 02 green
  "linear-gradient(135deg, #34d399, #10b981)", // 03 green
  "linear-gradient(135deg, #fb923c, #f97316)", // 04 orange
  "linear-gradient(135deg, #60a5fa, #3b82f6)", // 05 blue
  "linear-gradient(135deg, #f472b6, #ec4899)", // 06 pink
];

const matchBadgeColor = (score: number) =>
  score >= 15 ? "bg-emerald-500" : "bg-orange-500";

/* ─── Results view (after quiz) ─── */

function ResultsView({
  loading,
  dbMatches,
  aiRoutes,
  addingRoute,
  onAddRoute,
}: {
  loading: boolean;
  dbMatches: MatchedRoute[];
  aiRoutes: AiRoute[];
  addingRoute: string | null;
  onAddRoute: (id: string) => void;
}) {
  const nav = useNavigate();

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 px-5 pt-20">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <RouteIcon className="h-7 w-7" />
          </div>
        </div>
        <p className="mt-2 text-sm font-semibold">正在匹配最佳路线...</p>
        <p className="text-[11px] text-muted-foreground">
          根据你的偏好从 150+ 条路线中筛选
        </p>
      </div>
    );
  }

  const hasGenerating = aiRoutes.some((r) => r.status === "generating");
  const doneAiRoute = aiRoutes.find((r) => r.status === "done" && r.tripId);

  return (
    <div className="flex flex-col gap-2.5 px-4 pt-2.5 pb-24">
      <div
        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
        style={{
          background: "linear-gradient(135deg, #e8614d 0%, #f09080 50%, #f5b8aa 100%)",
        }}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
          <RouteIcon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-bold text-white">
            {hasGenerating ? "路线生成中" : "路线推荐已准备"}
          </p>
          <p className="text-[9px] text-white/80">
            根据偏好匹配路线库，为你整理可执行行程
          </p>
        </div>
        {doneAiRoute ? (
          <Link
            to="/trip"
            search={{ id: doneAiRoute.tripId! }}
            className="flex shrink-0 items-center gap-0.5 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-primary shadow-sm"
          >
            查看 <ChevronRight className="h-3 w-3" />
          </Link>
        ) : (
          <button
            className="flex shrink-0 items-center gap-0.5 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-primary shadow-sm"
            onClick={() => nav({ to: "/" })}
          >
            去生成 <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Matched route cards */}
      {dbMatches.map((route, idx) => (
        <div
          key={route.id}
          className="group relative overflow-hidden rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.12)]"
          style={{ minHeight: 155 }}
        >
          {/* Background image */}
          <img
            src={route.cover}
            alt={route.title || "路线封面"}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />

          {/* Number badge - top left */}
          <div
            className="absolute left-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-extrabold text-white shadow-md"
            style={{ background: badgeColors[idx % badgeColors.length] }}
          >
            {String(idx + 1).padStart(2, "0")}
          </div>

          {/* Match score badge - top right */}
          <div
            className={`absolute right-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] font-bold text-white shadow-md backdrop-blur-sm ${matchBadgeColor(route.matchScore)}`}
          >
            {route.matchScore}% 匹配
          </div>

          {/* Content overlay - bottom */}
          <div className="relative flex min-h-[155px] flex-col justify-end p-3">
            {/* Title */}
            <h3 className="text-[14px] font-extrabold leading-tight text-white drop-shadow-md">
              {route.title}
            </h3>

            {/* Info row */}
            <div className="mt-1 flex items-center gap-2.5 text-[9px] text-white/85">
              <span className="flex items-center gap-0.5">
                <MapPin className="h-2.5 w-2.5" />
                中国 · {route.destination}
              </span>
              <span className="flex items-center gap-0.5">
                <CalendarDays className="h-2.5 w-2.5" />
                {route.days}天{route.days - 1}晚
              </span>
              <span className="flex items-center gap-0.5">
                <RouteIcon className="h-2.5 w-2.5" />
                {route.spots}个地点
              </span>
            </div>

            {/* Tags row + add button */}
            <div className="mt-1.5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {route.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/20 px-1.5 py-px text-[9px] font-medium text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onAddRoute(route.id)}
                disabled={addingRoute === route.id}
                className="pressable flex shrink-0 items-center gap-0.5 rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-primary shadow-md"
              >
                {addingRoute === route.id ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <MapPin className="h-3 w-3" />
                )}
                加入行程
              </button>
            </div>
          </div>
        </div>
      ))}

      {dbMatches.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-2 pt-10 text-center">
          <Mountain className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">暂无匹配的路线</p>
          <Link
            to="/"
            className="mt-2 rounded-xl px-4 py-2 text-sm font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            回到首页
          </Link>
        </div>
      )}
    </div>
  );
}
