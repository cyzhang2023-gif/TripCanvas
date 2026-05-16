/**
 * Deepseek AI integration — server-side only
 * Parses travel content into structured trip data
 */

import { batchGeocode } from "./amap-api";
import { PARSE_SYSTEM_PROMPT, QUIZ_SYSTEM_PROMPT } from "./prompts";
import type { Day, Spot, Trip, SourceKind, PoiCategory, CoverKey } from "./tripTypes";

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

/** Read Deepseek key from server-side env (never exposed to client) */
function getDeepseekKey(): string {
  // Cloudflare Workers / Node.js — try process.env first
  if (typeof process !== "undefined" && process.env?.DEEPSEEK_API_KEY) {
    return process.env.DEEPSEEK_API_KEY;
  }
  // Fallback for Vite dev (server-side modules still have access to all env)
  const env = import.meta.env as Record<string, string | undefined>;
  return env.DEEPSEEK_API_KEY ?? "";
}

type MessageContent =
  | string
  | Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }>;

interface DeepseekMessage {
  role: "system" | "user" | "assistant";
  content: MessageContent;
}

interface DeepseekChoice {
  message: { content: string };
  finish_reason: string;
}

interface DeepseekResponse {
  choices: DeepseekChoice[];
  usage?: { total_tokens: number };
}

interface ParsedTrip {
  name: string;
  destination: string;
  country: string;
  totalDays: number;
  cover: string;
  days: Array<{
    label: string;
    route: string;
    spots: Array<{
      time: string;
      title: string;
      desc: string;
      category: string;
      intro?: string;
      rating?: number;
      price?: string;
      tags?: string[];
      lat?: number;
      lng?: number;
      address?: string;
      imageQuery?: string;
    }>;
  }>;
}

/** Call Deepseek API — uses vision-capable model for image inputs */
async function callDeepseek(messages: DeepseekMessage[]): Promise<string> {
  const apiKey = getDeepseekKey();
  if (!apiKey) throw new Error("未配置 Deepseek API Key");

  const hasImage = messages.some((m) => Array.isArray(m.content));

  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: 0.2,
      max_tokens: 4096,
      response_format: hasImage ? undefined : { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Deepseek API error ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as DeepseekResponse;
  console.log(`[AI] Tokens used: ${data.usage?.total_tokens ?? "?"}`);
  return data.choices[0]?.message?.content ?? "";
}

/** Extract base64 image from content if present */
function extractImageBase64(content: string): { text: string; base64: string | null } {
  const match = content.match(/\[IMAGE_BASE64\]([\s\S]+?)\[\/IMAGE_BASE64\]/);
  if (!match) return { text: content, base64: null };
  const text = content.replace(/\[IMAGE_BASE64\][\s\S]+?\[\/IMAGE_BASE64\]/, "").trim();
  return { text, base64: match[1] };
}

/** Build user message based on source kind (supports multimodal for images) */
function buildUserMessage(kind: SourceKind, content: string): MessageContent {
  const prefix = {
    link: "以下是一篇旅行攻略的链接和内容，请解析生成行程：",
    image: "这是一张旅行攻略截图，请仔细识别图中的所有地点、行程安排、价格等信息，解析生成完整行程：",
    text: "以下是旅行攻略的文本内容，请解析生成行程：",
    video: "以下是旅行视频的链接和描述，请解析生成行程：",
  }[kind];

  const { text, base64 } = extractImageBase64(content);

  // If we have a base64 image, send as multimodal content
  if (base64) {
    const parts: Array<{ type: "text"; text: string } | { type: "image_url"; image_url: { url: string } }> = [
      { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` } },
      { type: "text", text: `${prefix}${text ? `\n\n用户补充说明：${text}` : ""}` },
    ];
    return parts;
  }

  return `${prefix}\n\n${text || content}`;
}

/** Pick cover key from parsed data */
function pickCover(parsed: ParsedTrip): CoverKey {
  const valid: CoverKey[] = ["tokyo", "japan", "korea", "thailand", "france", "map"];
  const c = parsed.cover as CoverKey;
  return valid.includes(c) ? c : "map";
}

/** Validate and normalize category */
function normalizeCategory(cat?: string): PoiCategory {
  const valid: PoiCategory[] = ["景点", "美食", "购物", "住宿", "休闲"];
  return valid.includes(cat as PoiCategory) ? (cat as PoiCategory) : "景点";
}

/** Parse AI response into Trip */
async function parseAiResponse(raw: string, kind: SourceKind): Promise<Trip> {
  let jsonStr = raw.trim();
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) jsonStr = codeBlockMatch[1].trim();

  const parsed: ParsedTrip = JSON.parse(jsonStr);
  const tripId = `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`;

  // Flatten all spots across all days for batch processing
  const allRaw: Array<{
    dIdx: number; sIdx: number;
    id: string; time: string; title: string; desc: string;
    category: PoiCategory; intro?: string; rating?: number;
    price?: string; tags?: string[]; imageQuery?: string;
    lat?: number; lng?: number; _address: string;
  }> = [];

  for (let dIdx = 0; dIdx < parsed.days.length; dIdx++) {
    const dayData = parsed.days[dIdx];
    dayData.spots.forEach((s, sIdx) => {
      allRaw.push({
        dIdx, sIdx,
        id: `${tripId}-d${dIdx + 1}-s${sIdx + 1}`,
        time: s.time || "09:00",
        title: s.title,
        desc: s.desc || "停留 1h",
        category: normalizeCategory(s.category),
        intro: s.intro, rating: s.rating, price: s.price,
        tags: s.tags, imageQuery: s.imageQuery,
        lat: s.lat, lng: s.lng,
        _address: s.address || s.title,
      });
    });
  }

  // Use AI-provided coordinates; only geocode spots that are missing lat/lng
  const needGeocode = allRaw.filter((s) => s.lat == null || s.lng == null);
  if (needGeocode.length > 0) {
    console.log(`[AI] ${allRaw.length - needGeocode.length}/${allRaw.length} spots have AI coordinates, geocoding ${needGeocode.length} remaining...`);
    const geocoded = await batchGeocode(
      needGeocode.map((s) => ({
        title: s._address || s.title,
        city: parsed.destination || parsed.country,
      })),
    );
    needGeocode.forEach((s, i) => {
      if (geocoded[i]?.lat != null) { s.lat = geocoded[i].lat; s.lng = geocoded[i].lng; }
    });
  } else {
    console.log(`[AI] All ${allRaw.length} spots have AI coordinates — skipping geocoding`);
  }

  // Reassemble into days
  const days: Day[] = parsed.days.map((dayData, dIdx) => {
    const daySpots = allRaw.filter((s) => s.dIdx === dIdx);
    const spots: Spot[] = daySpots.map((s) => ({
      id: s.id, time: s.time, title: s.title, desc: s.desc,
      category: s.category, intro: s.intro, rating: s.rating,
      price: s.price, tags: s.tags,
      lat: s.lat, lng: s.lng,
    }));
    return {
      id: `d${dIdx + 1}`,
      label: dayData.label || `Day ${dIdx + 1}`,
      route: dayData.route || spots.map((s) => s.title).slice(0, 2).join(" · "),
      spots,
    };
  });

  return {
    id: tripId,
    name: parsed.name || "AI 生成行程",
    date: generateDateRange(parsed.totalDays || days.length),
    cover: pickCover(parsed),
    status: "草稿",
    favorite: false,
    days,
    source: { kind, title: sourceTitle(kind) },
  };
}

function sourceTitle(kind: SourceKind): string {
  return { link: "链接导入", image: "截图导入", text: "文本导入", video: "视频导入" }[kind];
}

function generateDateRange(totalDays: number): string {
  const start = new Date();
  start.setDate(start.getDate() + 7); // Plan for next week
  const end = new Date(start);
  end.setDate(end.getDate() + totalDays - 1);
  const fmt = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  return `${fmt(start)} — ${fmt(end)}`;
}

/** Main entry: parse travel content using AI and geocode spots */
export async function parseWithAI(
  kind: SourceKind,
  content: string,
): Promise<Trip> {
  const hasImage = content.includes("[IMAGE_BASE64]");
  const messages: DeepseekMessage[] = [
    { role: "system", content: PARSE_SYSTEM_PROMPT },
    { role: "user", content: buildUserMessage(kind, content) },
  ];

  console.log(`[AI] Calling Deepseek for trip parsing (${hasImage ? "with image" : "text only"})...`);

  let raw: string;
  try {
    raw = await callDeepseek(messages);
  } catch (err) {
    // If multimodal call fails, retry with text-only
    if (hasImage) {
      console.log("[AI] Multimodal call failed, retrying with text only...");
      const { text } = extractImageBase64(content);
      const textContent = text || "请根据用户意图生成一个推荐旅行行程";
      const fallbackMessages: DeepseekMessage[] = [
        { role: "system", content: PARSE_SYSTEM_PROMPT },
        { role: "user", content: `以下是旅行截图中提取的文字信息，请解析生成行程：\n\n${textContent}` },
      ];
      raw = await callDeepseek(fallbackMessages);
    } else {
      throw err;
    }
  }

  console.log("[AI] Got response, parsing...");
  const trip = await parseAiResponse(raw, kind);
  console.log(`[AI] Trip "${trip.name}" created with ${trip.days.length} days`);

  return trip;
}

export type QuizAnswers = {
  scope: "domestic" | "international";
  styles: string[];
  days: string;
  travelType: string;
  budget: string;
  season: string;
};

export async function generateQuizTrip(answers: QuizAnswers): Promise<Trip> {
  const scopeText = answers.scope === "domestic" ? "国内旅行" : "国际旅行";
  const stylesText = answers.styles.join("、");
  const daysMap: Record<string, string> = {
    "1-3": "1-3天",
    "4-5": "4-5天",
    "6-7": "6-7天",
    "7+": "7天以上",
  };
  const daysText = daysMap[answers.days] ?? answers.days;
  const travelTypeMap: Record<string, string> = {
    solo: "独自旅行",
    couple: "情侣出游",
    family: "家庭亲子",
    friends: "朋友聚会",
  };
  const travelTypeText = travelTypeMap[answers.travelType] ?? answers.travelType;
  const budgetMap: Record<string, string> = {
    budget: "经济实惠",
    comfort: "舒适中档",
    luxury: "高端奢华",
  };
  const budgetText = budgetMap[answers.budget] ?? answers.budget;
  const seasonMap: Record<string, string> = {
    spring: "春季",
    summer: "夏季",
    autumn: "秋季",
    winter: "冬季",
    anytime: "不限",
  };
  const seasonText = seasonMap[answers.season] ?? answers.season;

  const userPrompt = `请根据以下旅行偏好推荐一个具体目的地并生成完整行程：

- 范围：${scopeText}
- 旅行风格：${stylesText}
- 天数：${daysText}
- 出行方式：${travelTypeText}
- 预算：${budgetText}
- 季节：${seasonText}`;

  const messages: DeepseekMessage[] = [
    { role: "system", content: QUIZ_SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ];

  console.log("[AI] Calling Deepseek for quiz trip generation...");
  const raw = await callDeepseek(messages);
  console.log("[AI] Got response, parsing...");

  const trip = await parseAiResponse(raw, "text");
  console.log(`[AI] Quiz trip "${trip.name}" created with ${trip.days.length} days`);

  return trip;
}
