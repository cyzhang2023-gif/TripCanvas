import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.N8N_DATABASE_URL || 'postgresql://postgres:123456@localhost:5433/tripcanvas' });
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || 'sk-53675764347146ba8ba22f6614c69f9d';
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

async function callDeepSeek(prompt) {
  const res = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 300,
    }),
  });
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

async function main() {
  const { rows } = await pool.query(`
    SELECT id, route_title, city, country, route_theme, days_count, travel_type, budget_level, summary
    FROM routes WHERE status = 'published' ORDER BY id
  `);

  console.log(`Found ${rows.length} routes to rename`);
  let renamed = 0;

  for (const r of rows) {
    const prompt = `给下面这条旅行路线起一个新标题，要求：
- 像朋友圈文案或小红书标题，不要像AI生成的
- 不要"X天Y主题之旅"这种模板句式
- 不必罗列所有标签（不要堆砌"奢华购物美食"）
- 好的例子：「在京都，和鹿一起散步的五天」「成都慢时光：火锅与茶馆之间」「沿着海岸线从巴塞到瓦伦西亚」「迷失在伊斯坦布尔的七个日夜」「清迈：寺庙与夜市之间的小确幸」
- 10-20个字，必须含城市名"${r.city}"
- 也请给一个新的mood(4-8字氛围词)和新的summary(1-2句，用"你"称呼读者)

当前旧标题: ${r.route_title}
城市: ${r.city} (${r.country})
主题: ${r.route_theme}
天数: ${r.days_count}天
出行: ${r.travel_type}
预算: ${r.budget_level}

只返回JSON，格式: {"title":"新标题","mood":"新氛围","summary":"新概要"}`;

    try {
      let text = await callDeepSeek(prompt);
      // Clean markdown code blocks
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const result = JSON.parse(text);

      if (result.title && result.title.length >= 5) {
        await pool.query(
          `UPDATE routes SET route_title = $1, mood = COALESCE($2, mood), summary = COALESCE($3, summary) WHERE id = $4`,
          [result.title, result.mood || null, result.summary || null, r.id]
        );
        renamed++;
        console.log(`[${renamed}/${rows.length}] "${r.route_title}" → "${result.title}"`);
      } else {
        console.log(`[SKIP] "${r.route_title}" — bad result: ${text.slice(0, 80)}`);
      }
    } catch (err) {
      console.error(`[ERR] "${r.route_title}":`, err.message);
    }

    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\nDone! Renamed ${renamed}/${rows.length} routes.`);
  await pool.end();
}

main().catch(console.error);
