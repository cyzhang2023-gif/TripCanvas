import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MapPin, Star, Clock, Flame, Heart, ChevronRight } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Img } from "@/components/Img";

export const Route = createFileRoute("/food-map")({
  component: FoodMapPage,
  head: () => ({ meta: [{ title: "美食地图 · Routey" }] }),
});

type City = { name: string; country: string; emoji: string };
const cities: City[] = [
  { name: "东京", country: "日本", emoji: "🇯🇵" },
  { name: "曼谷", country: "泰国", emoji: "🇹🇭" },
  { name: "首尔", country: "韩国", emoji: "🇰🇷" },
  { name: "成都", country: "中国", emoji: "🇨🇳" },
  { name: "巴黎", country: "法国", emoji: "🇫🇷" },
  { name: "大阪", country: "日本", emoji: "🇯🇵" },
];

type FoodCategory = { emoji: string; label: string; key: string };
const foodCategories: FoodCategory[] = [
  { emoji: "🍜", label: "面食", key: "noodle" },
  { emoji: "🍣", label: "寿司", key: "sushi" },
  { emoji: "🍲", label: "火锅", key: "hotpot" },
  { emoji: "🧁", label: "甜品", key: "dessert" },
  { emoji: "🍢", label: "小吃", key: "snack" },
  { emoji: "🦐", label: "海鲜", key: "seafood" },
  { emoji: "🥩", label: "烤肉", key: "bbq" },
  { emoji: "☕", label: "咖啡", key: "cafe" },
];

type FoodSpot = {
  name: string;
  area: string;
  rating: number;
  price: string;
  tags: string[];
  desc: string;
  img: string;
  hot?: boolean;
};

const foodData: Record<string, FoodSpot[]> = {
  "东京": [
    { name: "筑地虎杖 本店", area: "筑地", rating: 4.7, price: "¥150-300", tags: ["海鲜丼", "刺身"], desc: "新鲜海鲜丼，早市必打卡", img: "/api/spot-image?q=tsukiji+seafood+bowl+tokyo", hot: true },
    { name: "一蘭拉面 涩谷店", area: "涩谷", rating: 4.5, price: "¥80-120", tags: ["拉面", "豚骨"], desc: "浓郁豚骨汤底，个人定制口味", img: "/api/spot-image?q=ichiran+ramen+tokyo" },
    { name: "松屋 新宿三丁目", area: "新宿", rating: 4.3, price: "¥40-80", tags: ["牛丼", "快餐"], desc: "高性价比牛肉饭，24小时营业", img: "/api/spot-image?q=matsuya+gyudon+tokyo" },
    { name: "HARBS 表参道", area: "表参道", rating: 4.6, price: "¥80-150", tags: ["蛋糕", "甜品"], desc: "超大份水果千层蛋糕", img: "/api/spot-image?q=harbs+cake+tokyo" },
    { name: "串カツ田中 歌舞伎町", area: "歌舞伎町", rating: 4.4, price: "¥100-200", tags: ["炸串", "居酒屋"], desc: "大阪风格炸串配冰啤酒", img: "/api/spot-image?q=kushikatsu+tanaka+tokyo" },
    { name: "すきやばし 次郎", area: "银座", rating: 4.9, price: "¥2000+", tags: ["寿司", "Omakase"], desc: "传说中的寿司之神", img: "/api/spot-image?q=sukiyabashi+jiro+sushi", hot: true },
  ],
  "曼谷": [
    { name: "Jay Fai", area: "老城区", rating: 4.8, price: "¥200-400", tags: ["蟹肉蛋卷", "街头美食"], desc: "唯一米其林星级街头摊", img: "/api/spot-image?q=jay+fai+bangkok+crab+omelette", hot: true },
    { name: "Raan Jay Fai 姐妹店", area: "考山路", rating: 4.3, price: "¥30-80", tags: ["炒面", "泰式"], desc: "正宗泰式炒河粉", img: "/api/spot-image?q=pad+thai+bangkok+street" },
    { name: "Som Tam Nua", area: "暹罗", rating: 4.5, price: "¥40-100", tags: ["青木瓜沙拉", "炸鸡"], desc: "青木瓜沙拉+炸鸡翅绝配", img: "/api/spot-image?q=som+tam+nua+bangkok" },
    { name: "After You Dessert", area: "Siam", rating: 4.4, price: "¥50-120", tags: ["刨冰", "蜜糖吐司"], desc: "网红蜜糖吐司甜品店", img: "/api/spot-image?q=after+you+dessert+bangkok" },
    { name: "Thip Samai", area: "大皇宫附近", rating: 4.6, price: "¥20-60", tags: ["炒粉", "泰式"], desc: "曼谷最好的Pad Thai", img: "/api/spot-image?q=thip+samai+pad+thai+bangkok" },
  ],
  "首尔": [
    { name: "明洞饺子", area: "明洞", rating: 4.6, price: "¥50-100", tags: ["饺子", "刀削面"], desc: "手工饺子配浓郁高汤", img: "/api/spot-image?q=myeongdong+kyoja+seoul", hot: true },
    { name: "广藏市场 麻药紫菜包饭", area: "钟路", rating: 4.5, price: "¥20-50", tags: ["紫菜包饭", "市场"], desc: "迷你紫菜包饭一口一个", img: "/api/spot-image?q=gwangjang+market+gimbap+seoul" },
    { name: "姜虎东烤肉", area: "江南", rating: 4.4, price: "¥150-300", tags: ["烤肉", "五花肉"], desc: "韩国烤肉名店五花肉必点", img: "/api/spot-image?q=kang+hodong+bbq+seoul" },
    { name: "토끼정", area: "弘大", rating: 4.3, price: "¥80-150", tags: ["韩定食", "拌饭"], desc: "精致韩定食石锅拌饭", img: "/api/spot-image?q=korean+bibimbap+stone+bowl" },
  ],
  "成都": [
    { name: "小龙坎火锅", area: "春熙路", rating: 4.6, price: "¥80-150", tags: ["火锅", "麻辣"], desc: "正宗川味牛油火锅", img: "/api/spot-image?q=chengdu+hotpot+sichuan", hot: true },
    { name: "钟水饺", area: "武侯祠", rating: 4.5, price: "¥15-30", tags: ["水饺", "红油"], desc: "百年老字号红油水饺", img: "/api/spot-image?q=zhong+shuijiao+chengdu" },
    { name: "马路边边串串香", area: "宽窄巷子", rating: 4.4, price: "¥50-100", tags: ["串串", "麻辣"], desc: "80年代复古串串香", img: "/api/spot-image?q=chengdu+chuanchuan+skewers" },
    { name: "方所书店·咖啡", area: "太古里", rating: 4.3, price: "¥30-60", tags: ["咖啡", "甜品"], desc: "书香与咖啡香的完美融合", img: "/api/spot-image?q=fangsuo+bookstore+chengdu+coffee" },
    { name: "降龙爪爪", area: "锦里", rating: 4.2, price: "¥20-40", tags: ["小吃", "鸡爪"], desc: "排队也要吃的卤味鸡爪", img: "/api/spot-image?q=chengdu+street+food+chicken+feet" },
  ],
  "巴黎": [
    { name: "Le Comptoir du Panthéon", area: "拉丁区", rating: 4.5, price: "¥150-300", tags: ["法餐", "牛排"], desc: "经典法式牛排薯条", img: "/api/spot-image?q=paris+steak+frites+bistro", hot: true },
    { name: "Pierre Hermé", area: "圣日耳曼", rating: 4.7, price: "¥50-150", tags: ["马卡龙", "甜品"], desc: "马卡龙界的爱马仕", img: "/api/spot-image?q=pierre+herme+macaron+paris" },
    { name: "L'As du Fallafel", area: "玛黑区", rating: 4.4, price: "¥40-80", tags: ["中东菜", "法拉费"], desc: "巴黎最好的法拉费三明治", img: "/api/spot-image?q=las+du+fallafel+paris" },
    { name: "Ladurée 香街旗舰", area: "香榭丽舍", rating: 4.5, price: "¥60-120", tags: ["马卡龙", "下午茶"], desc: "百年老店法式下午茶", img: "/api/spot-image?q=laduree+paris+afternoon+tea" },
  ],
  "大阪": [
    { name: "蟹道乐 道顿堀本店", area: "道顿堀", rating: 4.6, price: "¥300-600", tags: ["蟹料理", "日料"], desc: "巨型螃蟹招牌必打卡", img: "/api/spot-image?q=kani+doraku+osaka+crab", hot: true },
    { name: "一兰拉面 道顿堀店", area: "道顿堀", rating: 4.5, price: "¥80-120", tags: ["拉面", "豚骨"], desc: "全天排队的人气拉面", img: "/api/spot-image?q=ichiran+ramen+dotonbori+osaka" },
    { name: "大阪王将 千日前店", area: "难波", rating: 4.3, price: "¥40-80", tags: ["煎饺", "中华料理"], desc: "酥脆煎饺配冰啤酒", img: "/api/spot-image?q=osaka+gyoza+ohsho" },
    { name: "Pablo 心斋桥", area: "心斋桥", rating: 4.4, price: "¥30-60", tags: ["芝士蛋挞", "甜品"], desc: "半熟芝士蛋挞排队王", img: "/api/spot-image?q=pablo+cheese+tart+osaka" },
  ],
};

function FoodMapPage() {
  const [city, setCity] = useState("东京");
  const [cat, setCat] = useState<string | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const spots = foodData[city] ?? [];
  const filtered = cat
    ? spots.filter((s) => s.tags.some((t) => {
        if (cat === "noodle") return /面|拉面|炒粉|炒面/.test(t);
        if (cat === "sushi") return /寿司|刺身|海鲜丼/.test(t);
        if (cat === "hotpot") return /火锅|串串/.test(t);
        if (cat === "dessert") return /甜品|蛋糕|马卡龙|蛋挞|刨冰|吐司/.test(t);
        if (cat === "snack") return /小吃|饺子|包饭|炸串|鸡爪/.test(t);
        if (cat === "seafood") return /海鲜|蟹|虾/.test(t);
        if (cat === "bbq") return /烤肉|五花肉|牛排/.test(t);
        if (cat === "cafe") return /咖啡/.test(t);
        return false;
      }))
    : spots;

  const toggle = (name: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="relative flex items-center justify-center px-4 pt-[env(safe-area-inset-top,44px)] pb-2">
        <Link to="/" className="absolute left-4 grid place-items-center h-8 w-8 rounded-full bg-card shadow-sm">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-[16px] font-bold">美食地图</h1>
      </header>

      <div className="px-4 space-y-3">
        {/* City selector */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {cities.map((c) => (
            <button key={c.name} onClick={() => { setCity(c.name); setCat(null); }}
              className={`shrink-0 flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                city === c.name
                  ? "bg-primary text-white shadow"
                  : "bg-card text-foreground shadow-[var(--shadow-soft)]"
              }`}>
              <span className="text-[13px]">{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>

        {/* Food categories */}
        <div className="grid grid-cols-4 gap-2">
          {foodCategories.map((fc) => (
            <button key={fc.key}
              onClick={() => setCat(cat === fc.key ? null : fc.key)}
              className={`flex flex-col items-center gap-1 rounded-xl py-2.5 transition ${
                cat === fc.key
                  ? "bg-primary/10 ring-1 ring-primary"
                  : "bg-card shadow-[var(--shadow-soft)]"
              }`}>
              <span className="text-[22px]">{fc.emoji}</span>
              <span className="text-[10px] font-semibold">{fc.label}</span>
            </button>
          ))}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between px-0.5">
          <p className="text-[13px] font-bold">
            {city} · {cat ? foodCategories.find(f => f.key === cat)?.label : "全部美食"}
            <span className="ml-1 text-[11px] font-normal text-muted-foreground">({filtered.length})</span>
          </p>
          <Link to="/explore" search={{ dest: cities.find(c => c.name === city)?.country ?? city }}
            className="flex items-center text-[10px] text-primary font-medium">
            查看路线 <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Food cards */}
        <div className="space-y-2.5">
          {filtered.map((spot) => (
            <article key={spot.name}
              className="flex gap-2.5 rounded-2xl bg-card p-2 shadow-[var(--shadow-soft)]">
              <div className="relative h-[90px] w-[90px] shrink-0 overflow-hidden rounded-xl">
                <Img src={spot.img} alt={spot.name}
                  wrapperClass="h-full w-full" className="h-full w-full object-cover" loading="lazy" />
                {spot.hot && (
                  <span className="absolute top-1 left-1 flex items-center gap-0.5 rounded-full bg-rose-500/90 px-1.5 py-[2px] text-[8px] font-bold text-white backdrop-blur-sm">
                    <Flame className="h-2.5 w-2.5" /> 必吃
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0 py-0.5">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-[12px] font-bold truncate">{spot.name}</h3>
                  <button onClick={() => toggle(spot.name)} className="shrink-0 mt-0.5">
                    <Heart className={`h-4 w-4 ${liked.has(spot.name) ? "fill-rose-400 text-rose-400" : "text-muted-foreground"}`} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-0.5 text-[10px] text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-amber-400" /> {spot.rating}
                  </span>
                  <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <MapPin className="h-2.5 w-2.5" /> {spot.area}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">{spot.price}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{spot.desc}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {spot.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/8 px-2 py-[2px] text-[9px] font-medium text-primary">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[32px]">🍽️</p>
            <p className="mt-2 text-[12px] text-muted-foreground">该分类暂无推荐，换个分类看看</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
