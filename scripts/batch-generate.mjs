import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.N8N_DATABASE_URL || 'postgresql://postgres:123456@localhost:5433/tripcanvas' });
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || 'sk-53675764347146ba8ba22f6614c69f9d';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

const DESTINATIONS = [
  // 中国国内 (30)
  { city: '北京', country: '中国', destination: '中国', themes: ['culture','citywalk','food'] },
  { city: '上海', country: '中国', destination: '中国', themes: ['citywalk','shopping','food'] },
  { city: '成都', country: '中国', destination: '中国', themes: ['food','nature','culture'] },
  { city: '西安', country: '中国', destination: '中国', themes: ['culture','food','citywalk'] },
  { city: '杭州', country: '中国', destination: '中国', themes: ['nature','citywalk','culture'] },
  { city: '重庆', country: '中国', destination: '中国', themes: ['food','citywalk','nature'] },
  { city: '广州', country: '中国', destination: '中国', themes: ['food','shopping','citywalk'] },
  { city: '深圳', country: '中国', destination: '中国', themes: ['shopping','citywalk','food'] },
  { city: '厦门', country: '中国', destination: '中国', themes: ['beach','food','citywalk'] },
  { city: '昆明', country: '中国', destination: '中国', themes: ['nature','culture','food'] },
  { city: '大理', country: '中国', destination: '中国', themes: ['nature','culture','citywalk'] },
  { city: '丽江', country: '中国', destination: '中国', themes: ['nature','culture','citywalk'] },
  { city: '三亚', country: '中国', destination: '中国', themes: ['beach','luxury','nature'] },
  { city: '苏州', country: '中国', destination: '中国', themes: ['culture','citywalk','nature'] },
  { city: '南京', country: '中国', destination: '中国', themes: ['culture','food','citywalk'] },
  { city: '武汉', country: '中国', destination: '中国', themes: ['food','culture','citywalk'] },
  { city: '长沙', country: '中国', destination: '中国', themes: ['food','citywalk','culture'] },
  { city: '青岛', country: '中国', destination: '中国', themes: ['beach','food','citywalk'] },
  { city: '哈尔滨', country: '中国', destination: '中国', themes: ['culture','food','nature'] },
  { city: '拉萨', country: '中国', destination: '中国', themes: ['culture','nature','citywalk'] },
  { city: '桂林', country: '中国', destination: '中国', themes: ['nature','culture','food'] },
  { city: '张家界', country: '中国', destination: '中国', themes: ['nature','culture'] },
  { city: '敦煌', country: '中国', destination: '中国', themes: ['culture','nature'] },
  { city: '洛阳', country: '中国', destination: '中国', themes: ['culture','food'] },
  { city: '贵阳', country: '中国', destination: '中国', themes: ['food','nature','culture'] },
  { city: '福州', country: '中国', destination: '中国', themes: ['food','culture','citywalk'] },
  { city: '泉州', country: '中国', destination: '中国', themes: ['culture','food','citywalk'] },
  { city: '黄山', country: '中国', destination: '中国', themes: ['nature','culture'] },
  { city: '九寨沟', country: '中国', destination: '中国', themes: ['nature'] },
  { city: '乌镇', country: '中国', destination: '中国', themes: ['culture','citywalk'] },
  // 日本 (7)
  { city: '东京', country: '日本', destination: '日本', themes: ['citywalk','shopping','food'] },
  { city: '大阪', country: '日本', destination: '日本', themes: ['food','shopping','citywalk'] },
  { city: '京都', country: '日本', destination: '日本', themes: ['culture','citywalk','nature'] },
  { city: '北海道', country: '日本', destination: '日本', themes: ['nature','food','citywalk'] },
  { city: '冲绳', country: '日本', destination: '日本', themes: ['beach','nature','food'] },
  { city: '奈良', country: '日本', destination: '日本', themes: ['culture','nature','citywalk'] },
  { city: '福冈', country: '日本', destination: '日本', themes: ['food','citywalk','nature'] },
  // 韩国 (3)
  { city: '首尔', country: '韩国', destination: '韩国', themes: ['shopping','food','citywalk'] },
  { city: '釜山', country: '韩国', destination: '韩国', themes: ['beach','food','citywalk'] },
  { city: '济州岛', country: '韩国', destination: '韩国', themes: ['nature','beach','food'] },
  // 东南亚 (14)
  { city: '曼谷', country: '泰国', destination: '泰国', themes: ['food','culture','shopping'] },
  { city: '清迈', country: '泰国', destination: '泰国', themes: ['culture','nature','food'] },
  { city: '普吉岛', country: '泰国', destination: '泰国', themes: ['beach','luxury','nature'] },
  { city: '新加坡', country: '新加坡', destination: '新加坡', themes: ['food','shopping','citywalk'] },
  { city: '吉隆坡', country: '马来西亚', destination: '马来西亚', themes: ['food','shopping','culture'] },
  { city: '槟城', country: '马来西亚', destination: '马来西亚', themes: ['food','culture','citywalk'] },
  { city: '巴厘岛', country: '印度尼西亚', destination: '印度尼西亚', themes: ['beach','culture','luxury'] },
  { city: '河内', country: '越南', destination: '越南', themes: ['food','culture','citywalk'] },
  { city: '胡志明市', country: '越南', destination: '越南', themes: ['food','citywalk','culture'] },
  { city: '岘港', country: '越南', destination: '越南', themes: ['beach','food','culture'] },
  { city: '马尼拉', country: '菲律宾', destination: '菲律宾', themes: ['beach','food','culture'] },
  { city: '暹粒', country: '柬埔寨', destination: '柬埔寨', themes: ['culture','nature'] },
  { city: '科伦坡', country: '斯里兰卡', destination: '斯里兰卡', themes: ['culture','nature','beach'] },
  { city: '加德满都', country: '尼泊尔', destination: '尼泊尔', themes: ['culture','nature'] },
  // 欧洲 (20)
  { city: '巴黎', country: '法国', destination: '法国', themes: ['culture','food','shopping'] },
  { city: '尼斯', country: '法国', destination: '法国', themes: ['beach','luxury','food'] },
  { city: '伦敦', country: '英国', destination: '英国', themes: ['culture','citywalk','shopping'] },
  { city: '爱丁堡', country: '英国', destination: '英国', themes: ['culture','nature','citywalk'] },
  { city: '罗马', country: '意大利', destination: '意大利', themes: ['culture','food','citywalk'] },
  { city: '佛罗伦萨', country: '意大利', destination: '意大利', themes: ['culture','food','shopping'] },
  { city: '威尼斯', country: '意大利', destination: '意大利', themes: ['culture','citywalk'] },
  { city: '巴塞罗那', country: '西班牙', destination: '西班牙', themes: ['culture','food','beach'] },
  { city: '马德里', country: '西班牙', destination: '西班牙', themes: ['culture','food','citywalk'] },
  { city: '柏林', country: '德国', destination: '德国', themes: ['culture','citywalk','food'] },
  { city: '慕尼黑', country: '德国', destination: '德国', themes: ['culture','food','nature'] },
  { city: '苏黎世', country: '瑞士', destination: '瑞士', themes: ['nature','luxury','citywalk'] },
  { city: '因特拉肯', country: '瑞士', destination: '瑞士', themes: ['nature','luxury'] },
  { city: '雷克雅未克', country: '冰岛', destination: '冰岛', themes: ['nature','culture'] },
  { city: '圣托里尼', country: '希腊', destination: '希腊', themes: ['beach','luxury','culture'] },
  { city: '雅典', country: '希腊', destination: '希腊', themes: ['culture','food','citywalk'] },
  { city: '里斯本', country: '葡萄牙', destination: '葡萄牙', themes: ['food','citywalk','culture'] },
  { city: '阿姆斯特丹', country: '荷兰', destination: '荷兰', themes: ['culture','citywalk','food'] },
  { city: '布拉格', country: '捷克', destination: '捷克', themes: ['culture','citywalk','food'] },
  { city: '维也纳', country: '奥地利', destination: '奥地利', themes: ['culture','food','citywalk'] },
  { city: '布达佩斯', country: '匈牙利', destination: '匈牙利', themes: ['culture','food','citywalk'] },
  { city: '杜布罗夫尼克', country: '克罗地亚', destination: '克罗地亚', themes: ['beach','culture','citywalk'] },
  // 北美 (10)
  { city: '纽约', country: '美国', destination: '美国', themes: ['citywalk','shopping','food'] },
  { city: '洛杉矶', country: '美国', destination: '美国', themes: ['beach','shopping','food'] },
  { city: '旧金山', country: '美国', destination: '美国', themes: ['citywalk','food','nature'] },
  { city: '拉斯维加斯', country: '美国', destination: '美国', themes: ['luxury','shopping','food'] },
  { city: '夏威夷', country: '美国', destination: '美国', themes: ['beach','nature','luxury'] },
  { city: '迈阿密', country: '美国', destination: '美国', themes: ['beach','food','shopping'] },
  { city: '芝加哥', country: '美国', destination: '美国', themes: ['food','culture','citywalk'] },
  { city: '温哥华', country: '加拿大', destination: '加拿大', themes: ['nature','food','citywalk'] },
  { city: '多伦多', country: '加拿大', destination: '加拿大', themes: ['culture','food','citywalk'] },
  { city: '坎昆', country: '墨西哥', destination: '墨西哥', themes: ['beach','luxury','culture'] },
  // 南美 (3)
  { city: '利马', country: '秘鲁', destination: '秘鲁', themes: ['food','culture','nature'] },
  { city: '布宜诺斯艾利斯', country: '阿根廷', destination: '阿根廷', themes: ['food','culture','citywalk'] },
  { city: '里约热内卢', country: '巴西', destination: '巴西', themes: ['beach','culture','nature'] },
  // 大洋洲 (4)
  { city: '悉尼', country: '澳大利亚', destination: '澳洲', themes: ['beach','citywalk','nature'] },
  { city: '墨尔本', country: '澳大利亚', destination: '澳洲', themes: ['food','citywalk','culture'] },
  { city: '奥克兰', country: '新西兰', destination: '新西兰', themes: ['nature','food','citywalk'] },
  { city: '皇后镇', country: '新西兰', destination: '新西兰', themes: ['nature','luxury'] },
  // 中东/非洲 (7)
  { city: '马拉喀什', country: '摩洛哥', destination: '摩洛哥', themes: ['culture','food','shopping'] },
  { city: '开罗', country: '埃及', destination: '埃及', themes: ['culture','nature'] },
  { city: '伊斯坦布尔', country: '土耳其', destination: '土耳其', themes: ['culture','food','shopping'] },
  { city: '卡帕多奇亚', country: '土耳其', destination: '土耳其', themes: ['nature','culture'] },
  { city: '迪拜', country: '阿联酋', destination: '阿联酋', themes: ['luxury','shopping','beach'] },
  { city: '开普敦', country: '南非', destination: '南非', themes: ['nature','food','beach'] },
  { city: '内罗毕', country: '肯尼亚', destination: '肯尼亚', themes: ['nature','culture'] },
];

const TRAVEL_TYPES = ['solo','couple','family','friends'];
const BUDGET_LEVELS = ['low','medium','high'];
const PACES = ['relaxed','normal','fast'];
const DAYS_OPTIONS = [3,4,5,6,7];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/** Nearest-neighbor reorder: sort places so each next place is closest to the previous one */
function reorderByProximity(places) {
  if (!places || places.length <= 2) return places;
  // Only reorder if we have lat/lng for most places
  const withCoords = places.filter(p => p.latitude && p.longitude);
  if (withCoords.length < places.length * 0.7) return places;

  const dist = (a, b) => {
    if (!a.latitude || !b.latitude) return 9999;
    const dlat = a.latitude - b.latitude;
    const dlng = a.longitude - b.longitude;
    return Math.sqrt(dlat * dlat + dlng * dlng);
  };

  // Start from the first place (usually morning hotel/start point)
  const ordered = [places[0]];
  const remaining = places.slice(1);

  while (remaining.length > 0) {
    const last = ordered[ordered.length - 1];
    let nearest = 0;
    let minDist = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = dist(last, remaining[i]);
      if (d < minDist) { minDist = d; nearest = i; }
    }
    ordered.push(remaining.splice(nearest, 1)[0]);
  }

  // Re-assign visit_time sequentially (keep original time slots pattern)
  const times = places.map(p => p.visit_time).sort();
  ordered.forEach((p, i) => { p.visit_time = times[i] || p.visit_time; });

  return ordered;
}

async function callDeepSeek(prompt) {
  const res = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 12000,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek ${res.status}: ${err.slice(0,200)}`);
  }
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

function buildPrompt(dest, theme, days, travelType, budget) {
  const themeHints = {
    citywalk: '街头巷尾漫步、隐藏小店、本地生活气息',
    food: '地道美食、深夜食堂、菜市场、老字号',
    beach: '海岸线、日出日落、浪花与沙滩',
    luxury: '精致体验、设计酒店、私享空间',
    nature: '山川湖海、徒步秘境、呼吸自然',
    shopping: '潮流街区、集市淘宝、设计品牌',
    culture: '历史痕迹、古建老街、在地故事',
  };
  const hint = themeHints[theme] || '深度探索';

  return `你是一位有温度的旅行作家，也是资深的行程策划人。请帮我写一条${dest.city}的${days}天旅行路线。

背景：
- 城市: ${dest.city}（${dest.country}）
- 氛围关键词: ${hint}
- 同行: ${travelType === 'solo' ? '一个人' : travelType === 'couple' ? '和另一半' : travelType === 'family' ? '带家人' : '和朋友'}
- 预算: ${budget === 'low' ? '穷游但不将就' : budget === 'high' ? '偶尔奢侈一下' : '正常花销'}

关于标题——这是最重要的部分：
- 不要写"X天Y主题之旅"这种模板句式，太机械了
- 好的标题像朋友发的朋友圈：「在京都，和鹿一起散步的五天」「成都：火锅与茶馆之间的慢时光」「沿着地中海海岸线，从巴塞到瓦伦西亚」
- 可以用"与、和、之间、沿着、从…到…、那些、遇见、迷失在"等自然表达
- 标题里不必罗列所有标签（不要写"奢华购物美食"这种堆砌），抓住一个情感点就好
- 10-20个字，带上城市名

请返回JSON格式（只返回JSON，不要其他内容）：
{
  "route_title": "有诗意的路线标题，像人写的不像AI写的",
  "summary": "1-2句让人想出发的概要，用第二人称'你'",
  "mood": "旅行氛围(4-8字，如'慵懒海风''古都禅意')",
  "tags": "5个标签逗号分隔(中文)",
  "best_time": "spring/summer/autumn/winter/all",
  "quality_score": 80到95之间的整数,
  "days": [
    {
      "day_number": 1,
      "title": "当天主题(不要Day 1前缀，直接写主题如'老城区的清晨与黄昏')",
      "summary": "当天概要",
      "places": [
        {
          "place_name": "真实地点名称(必须真实存在)",
          "description": "地点描述(20字内，有画面感)",
          "visit_time": "HH:MM格式",
          "latitude": 真实纬度数字,
          "longitude": 真实经度数字,
          "category": "景点/美食/购物/住宿/休闲",
          "duration_min": 停留分钟数,
          "address": "真实详细地址",
          "image_query": "英文搜索关键词(地点名+城市名)",
          "intro": "50字内详细介绍，要像朋友推荐而不是百科介绍",
          "rating": 1.0到5.0之间,
          "price": "价格信息",
          "tags": "2-3个标签逗号分隔"
        }
      ]
    }
  ]
}

要求:
1. 每天安排5-7个真实存在的地点，含早中晚餐推荐
2. 地点经纬度必须准确真实（这是最容易出错的，请仔细确认）
3. visit_time从08:00到21:00合理分布
4. category覆盖景点、美食、购物、休闲
5. 所有地点名称和地址必须是真实可验证的
6. image_query用英文，包含地点名+城市名
7. 【极其重要】每天的地点必须按照地理位置顺路排列！从早到晚是一条不走回头路的路线，像当地朋友带你逛一样自然`;
}

async function generateAndInsert(dest, theme, days, travelType, budget) {
  const prompt = buildPrompt(dest, theme, days, travelType, budget);
  const result = await callDeepSeek(prompt);

  const routeRes = await pool.query(`
    INSERT INTO routes (route_title, city, country, destination, route_theme, mood, summary,
      days_count, budget_level, travel_type, pace, tags, best_time, quality_score, status, cover_url, likes)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'published','',0)
    RETURNING id
  `, [
    result.route_title, dest.city, dest.country, dest.destination, theme,
    result.mood || '', result.summary || '', days, budget, travelType,
    pick(PACES), result.tags || '', result.best_time || 'all',
    result.quality_score || 85,
  ]);
  const routeId = routeRes.rows[0].id;

  let totalPlaces = 0;
  for (const day of (result.days || [])) {
    const dayRes = await pool.query(`
      INSERT INTO itinerary_days (route_id, day_number, title, summary)
      VALUES ($1, $2, $3, $4) RETURNING id
    `, [routeId, day.day_number, day.title, day.summary || '']);
    const dayId = dayRes.rows[0].id;

    const sortedPlaces = reorderByProximity(day.places || []);
    for (let i = 0; i < sortedPlaces.length; i++) {
      const p = sortedPlaces[i];
      await pool.query(`
        INSERT INTO itinerary_places (day_id, place_name, description, visit_time, latitude, longitude,
          category, duration_min, address, image_query, intro, rating, price, tags, place_order)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      `, [
        dayId, p.place_name, p.description || '', p.visit_time || '09:00',
        p.latitude || null, p.longitude || null, p.category || '景点',
        p.duration_min || 60, p.address || '', p.image_query || p.place_name,
        p.intro || '', p.rating || null, p.price || '', p.tags || '', i + 1,
      ]);
      totalPlaces++;
    }
  }
  return { routeId, title: result.route_title, days: (result.days || []).length, places: totalPlaces };
}

async function main() {
  const startCount = Number((await pool.query('SELECT count(*) FROM routes')).rows[0].count);
  console.log(`[START] Current routes: ${startCount}, target: 1000`);
  console.log(`[INFO] ${DESTINATIONS.length} destinations available`);

  let generated = 0;
  let errors = 0;
  let consecutiveErrors = 0;
  const startTime = Date.now();

  while (true) {
    const current = Number((await pool.query('SELECT count(*) FROM routes')).rows[0].count);
    if (current >= 1000) {
      console.log(`\n[DONE] Reached ${current} routes!`);
      break;
    }

    const dest = pick(DESTINATIONS);
    const theme = pick(dest.themes);
    const days = pick(DAYS_OPTIONS);
    const travelType = pick(TRAVEL_TYPES);
    const budget = pick(BUDGET_LEVELS);

    try {
      const t0 = Date.now();
      const result = await generateAndInsert(dest, theme, days, travelType, budget);
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
      generated++;
      consecutiveErrors = 0;

      const totalElapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
      const rate = (generated / (Date.now() - startTime) * 3600000).toFixed(0);
      console.log(`[${current+1}/1000] ${result.title} (${dest.city}) → ${result.days}d/${result.places}p id=${result.routeId} [${elapsed}s] rate=${rate}/hr elapsed=${totalElapsed}min`);

      // 1.5s delay between requests
      await new Promise(r => setTimeout(r, 1500));
    } catch (err) {
      errors++;
      consecutiveErrors++;
      console.error(`[ERR ${errors}] ${dest.city}: ${err.message?.slice(0,150)}`);

      if (consecutiveErrors >= 20) {
        console.error(`[ABORT] 20 consecutive errors. Stopping.`);
        break;
      }
      await new Promise(r => setTimeout(r, err.message?.includes('429') ? 30000 : 5000));
    }
  }

  const finalCount = Number((await pool.query('SELECT count(*) FROM routes')).rows[0].count);
  const totalMin = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n[SUMMARY]`);
  console.log(`  Generated: ${generated}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Total routes: ${finalCount}`);
  console.log(`  Time: ${totalMin} minutes`);
  await pool.end();
}

main().catch(err => { console.error(err); process.exit(1); });
