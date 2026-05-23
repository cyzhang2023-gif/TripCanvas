/** Cover image resolution — city search terms, route-specific covers, and validation */

import {
  fetchUnsplashImage,
  fetchPexelsImage,
  buildImageSearchQuery,
  fetchWikipediaImage,
  validateImageUrl,
  FALLBACK_IMAGES,
} from "./image-fetcher";

/** City/country → specific landmark search query for cover images */
export const citySearchTerms: Record<string, string> = {
  // 中国
  北京: "北京天安门故宫", 上海: "上海外滩夜景", 成都: "成都宽窄巷子",
  西安: "西安兵马俑", 杭州: "杭州西湖断桥", 重庆: "重庆洪崖洞夜景",
  广州: "广州塔小蛮腰", 深圳: "深圳市民中心", 厦门: "厦门鼓浪屿",
  昆明: "昆明滇池", 大理: "大理洱海", 丽江: "丽江古城",
  三亚: "三亚亚龙湾", 苏州: "苏州拙政园", 南京: "南京夫子庙",
  武汉: "武汉黄鹤楼", 长沙: "长沙岳麓山", 青岛: "青岛栈桥",
  哈尔滨: "哈尔滨冰雪大世界", 拉萨: "拉萨布达拉宫",
  桂林: "桂林山水漓江", 张家界: "张家界天门山", 敦煌: "敦煌莫高窟",
  洛阳: "洛阳龙门石窟", 贵阳: "贵阳黄果树瀑布", 黄山: "黄山迎客松",
  乌镇: "乌镇水乡古镇", 泉州: "泉州开元寺", 福州: "福州三坊七巷",
  九寨沟: "九寨沟五花海", 香港: "香港维多利亚港夜景",
  // 日本
  东京: "Tokyo Tower night", 大阪: "Osaka Castle Japan", 京都: "Kyoto Fushimi Inari",
  北海道: "Hokkaido lavender field", 冲绳: "Okinawa blue ocean", 奈良: "Nara deer temple",
  福冈: "Fukuoka canal city",
  // 韩国
  首尔: "Seoul Gyeongbokgung palace", 釜山: "Busan Haeundae beach", 济州岛: "Jeju Island sunrise",
  // 东南亚
  曼谷: "Bangkok Grand Palace temple", 清迈: "Chiang Mai temple", 普吉岛: "Phuket beach sunset",
  新加坡: "Singapore Marina Bay Sands", 吉隆坡: "Kuala Lumpur Petronas Towers",
  槟城: "Penang street art Georgetown", 巴厘岛: "Bali rice terrace Ubud",
  河内: "Hanoi Old Quarter Vietnam", 胡志明市: "Ho Chi Minh City Vietnam",
  岘港: "Da Nang Golden Bridge", 马尼拉: "Manila Philippines skyline",
  暹粒: "Angkor Wat sunrise Cambodia", 科伦坡: "Colombo Sri Lanka",
  加德满都: "Kathmandu Nepal temple", 马尔代夫: "Maldives overwater bungalow",
  // 欧洲
  巴黎: "Paris Eiffel Tower", 尼斯: "Nice France Riviera", 伦敦: "London Big Ben Thames",
  爱丁堡: "Edinburgh Castle Scotland", 罗马: "Rome Colosseum Italy",
  佛罗伦萨: "Florence Duomo Italy", 威尼斯: "Venice Grand Canal gondola",
  巴塞罗那: "Barcelona Sagrada Familia", 马德里: "Madrid Royal Palace",
  柏林: "Berlin Brandenburg Gate", 慕尼黑: "Munich Marienplatz",
  苏黎世: "Zurich Switzerland lake", 因特拉肯: "Interlaken Swiss Alps",
  雷克雅未克: "Iceland Northern Lights", 圣托里尼: "Santorini blue dome Greece",
  雅典: "Athens Acropolis Parthenon", 里斯本: "Lisbon tram Portugal",
  阿姆斯特丹: "Amsterdam canal houses", 布拉格: "Prague Charles Bridge",
  维也纳: "Vienna Schonbrunn Palace", 布达佩斯: "Budapest Parliament night",
  杜布罗夫尼克: "Dubrovnik old town Croatia",
  // 北美
  纽约: "New York City Manhattan skyline", 洛杉矶: "Los Angeles Hollywood sign",
  旧金山: "San Francisco Golden Gate Bridge", 拉斯维加斯: "Las Vegas strip night",
  夏威夷: "Hawaii Waikiki beach", 迈阿密: "Miami Beach sunset",
  芝加哥: "Chicago skyline Lake Michigan", 温哥华: "Vancouver Stanley Park",
  多伦多: "Toronto CN Tower", 坎昆: "Cancun Mexico beach",
  // 南美
  利马: "Lima Peru historic center", 布宜诺斯艾利斯: "Buenos Aires La Boca",
  里约热内卢: "Rio de Janeiro Christ Redeemer",
  // 大洋洲
  悉尼: "Sydney Opera House Harbour", 墨尔本: "Melbourne Australia laneways",
  奥克兰: "Auckland New Zealand skyline",
  // 国家级别
  中国: "Great Wall China", 日本: "Mount Fuji Japan cherry blossom",
  韩国: "Seoul Namsan Tower Korea", 泰国: "Thailand Bangkok temple",
  马来西亚: "Malaysia Petronas Towers", 越南: "Ha Long Bay Vietnam",
  印度尼西亚: "Bali Indonesia temple sunset", 菲律宾: "Philippines Palawan beach",
  柬埔寨: "Angkor Wat Cambodia sunrise", 斯里兰卡: "Sri Lanka Sigiriya rock",
  尼泊尔: "Nepal Himalayas Everest", 印度: "Taj Mahal India sunrise",
  法国: "Paris Eiffel Tower sunset", 英国: "London Tower Bridge",
  意大利: "Rome Colosseum Italy", 西班牙: "Barcelona Spain Sagrada Familia",
  德国: "Berlin Germany skyline", 瑞士: "Swiss Alps Matterhorn",
  冰岛: "Iceland Aurora Northern Lights", 希腊: "Santorini Greece blue dome",
  葡萄牙: "Lisbon Portugal tram", 荷兰: "Amsterdam Netherlands canal",
  挪威: "Norway fjord landscape", 克罗地亚: "Dubrovnik Croatia coast",
  美国: "New York Statue of Liberty", 加拿大: "Banff Canada Lake Louise",
  墨西哥: "Cancun Mexico Caribbean", 秘鲁: "Machu Picchu Peru",
  阿根廷: "Buenos Aires Argentina", 巴西: "Rio de Janeiro Christ Redeemer statue",
  澳洲: "Sydney Opera House Australia", 澳大利亚: "Sydney Opera House Australia",
  新西兰: "New Zealand Milford Sound", 斐济: "Fiji tropical island beach",
  摩洛哥: "Morocco Marrakech medina", 埃及: "Egypt Pyramids Giza sunset",
  土耳其: "Istanbul Hagia Sophia Turkey", 以色列: "Jerusalem Western Wall Israel",
  约旦: "Petra Jordan treasury", 南非: "Cape Town Table Mountain sunset",
  阿联酋: "Dubai skyline Burj Khalifa", 捷克: "Prague old town square Czech",
};

export function getRouteCoverUrl(city: string, hint?: string): string {
  if (hint) {
    return `/api/spot-image?q=${encodeURIComponent(city + " " + hint)}`;
  }
  const searchTerm = citySearchTerms[city];
  if (searchTerm) {
    return `/api/spot-image?q=${encodeURIComponent(searchTerm)}`;
  }
  return `/api/spot-image?q=${encodeURIComponent(city + " 景点 风景")}`;
}

const themeCoverKeywords: Record<string, string[]> = {
  citywalk: ["街景 漫步", "老城区 小巷", "城市夜景"],
  food: ["美食 餐厅", "当地美食 市场", "特色小吃 街头"],
  beach: ["海滩 日落", "海景 度假", "海岸线 风光"],
  luxury: ["奢华酒店 泳池", "高级度假村", "豪华 全景"],
  nature: ["自然风光 山", "湖泊 森林", "日出 山峰"],
  shopping: ["购物 商圈", "商场 夜市", "集市 特产"],
  culture: ["历史 古迹", "博物馆 文化", "寺庙 建筑"],
};

export function getRouteSpecificCover(city: string, title: string, theme: string, tags: string, index: number): string {
  const candidates: string[] = [];

  const themeKw = themeCoverKeywords[theme];
  if (themeKw) candidates.push(...themeKw);

  const tagList = tags ? tags.split(",").map(t => t.trim()).filter(t => t.length >= 2 && t !== city) : [];
  for (const tag of tagList) candidates.push(tag);

  const titleWords = title.replace(/[：:，,。.！!？?""''《》]/g, " ").split(/\s+/).filter(w => w.length >= 2 && w !== city);
  if (titleWords.length >= 2) candidates.push(titleWords.slice(0, 2).join(" "));
  if (titleWords.length >= 1) candidates.push(titleWords[0]);

  const unique = [...new Set(candidates)];

  if (unique.length > 0) {
    const keyword = unique[index % unique.length];
    return getRouteCoverUrl(city, keyword);
  }
  return getRouteCoverUrl(city);
}

/** Persistent cache for validated destination cover images */
export const validatedCoverCache = new Map<string, { url: string; ts: number }>();
const COVER_CACHE_TTL = 24 * 60 * 60_000;

let coverFallbackIdx = 0;

/** Resolve AND validate a cover image URL — Unsplash → Pexels → Bing → Wikipedia */
export async function resolveValidCoverUrl(query: string): Promise<string> {
  const cached = validatedCoverCache.get(query);
  if (cached && Date.now() - cached.ts < COVER_CACHE_TTL) return cached.url;

  const unsplashUrl = await fetchUnsplashImage(query);
  if (unsplashUrl) {
    validatedCoverCache.set(query, { url: unsplashUrl, ts: Date.now() });
    return unsplashUrl;
  }

  const pexelsUrl = await fetchPexelsImage(query);
  if (pexelsUrl) {
    validatedCoverCache.set(query, { url: pexelsUrl, ts: Date.now() });
    return pexelsUrl;
  }

  const searchQuery = buildImageSearchQuery(query);
  const bingApiUrl = `https://cn.bing.com/images/async?q=${encodeURIComponent(searchQuery)}&first=0&count=12&mmasync=1`;
  try {
    const res = await fetch(bingApiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (res.ok) {
      const html = await res.text();
      const urlMatches = html.match(/murl&quot;:&quot;(https?:\/\/[^&]+)/g);
      if (urlMatches) {
        const blockedHosts = [
          "gettyimages.com", "istockphoto.com", "shutterstock.com", "alamy.com",
          "dreamstime.com", "123rf.com", "depositphotos.com", "pinterest.com",
          "flickr.com", "rare-gallery.com", "wallpapercave.com", "wallpaperflare.com",
          "hdqwalls.com", "peakpx.com", "thehoneycombers.com", "shutterbug.com",
          "huaban.com", "best-wallpaper.net",
        ];
        const candidates = urlMatches
          .map((m) => m.replace('murl&quot;:&quot;', ''))
          .filter((u) => u.startsWith("https://") && !blockedHosts.some((h) => u.includes(h)));

        for (const candidate of candidates.slice(0, 4)) {
          if (await validateImageUrl(candidate)) {
            validatedCoverCache.set(query, { url: candidate, ts: Date.now() });
            return candidate;
          }
        }
      }
    }
  } catch { /* continue to next source */ }

  const wikiUrl = await fetchWikipediaImage(query);
  if (wikiUrl && await validateImageUrl(wikiUrl)) {
    validatedCoverCache.set(query, { url: wikiUrl, ts: Date.now() });
    return wikiUrl;
  }

  const fallback = FALLBACK_IMAGES[coverFallbackIdx++ % FALLBACK_IMAGES.length];
  validatedCoverCache.set(query, { url: fallback, ts: Date.now() });
  return fallback;
}

export function spotImageUrl(
  imageQuery: string | undefined,
  placeName: string,
  _category: string | undefined,
  _index: number,
): string | undefined {
  const query = imageQuery || placeName;
  if (!query) return undefined;
  return `/api/spot-image?q=${encodeURIComponent(query)}`;
}
