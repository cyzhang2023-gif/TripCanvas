/** Xiaohongshu (小红书) content extraction service */

const XHS_URL_RE = /(?:xiaohongshu\.com|xhslink\.com)\//;
const XHS_NOTE_URL_RE = /https?:\/\/(?:www\.)?(?:xiaohongshu\.com\/(?:explore|discovery\/item)\/[a-zA-Z0-9]+|xhslink\.com\/[^\s]+)/;

type XhsNoteRef = { noteId: string; xsecToken?: string };

export type XhsNoteContent = { title: string; desc: string; tags: string[]; raw: string; images: string[] };

export function isXhsUrl(content: string): boolean {
  return XHS_URL_RE.test(content);
}

export function extractXhsShareText(raw: string): string | null {
  const urlIdx = raw.search(/https?:\/\/(?:www\.)?(?:xiaohongshu\.com|xhslink\.com)\//);
  if (urlIdx <= 0) return null;
  const textBefore = raw.slice(0, urlIdx).trim()
    .replace(/^\d+\s*赞同了该笔记\s*/, "")
    .replace(/，分享给你[，。！]?\s*$/, "")
    .replace(/\s*发布了一篇小红书笔记[，。！]?\s*$/, "")
    .trim();
  return textBefore.length >= 5 ? textBefore : null;
}

function extractXhsNoteRef(noteUrl: string): XhsNoteRef | null {
  const m = noteUrl.match(/xiaohongshu\.com\/(?:explore|discovery\/item)\/([a-zA-Z0-9]+)/);
  if (!m) return null;
  const noteId = m[1];
  const tokenMatch = noteUrl.match(/xsec_token=([^&\s]+)/);
  return { noteId, xsecToken: tokenMatch?.[1] };
}

async function resolveXhsShortLink(shortUrl: string): Promise<XhsNoteRef | null> {
  try {
    const resp = await fetch(shortUrl, { redirect: "manual" });
    const location = resp.headers.get("location");
    if (location) return extractXhsNoteRef(location);
    return null;
  } catch {
    return null;
  }
}

export function extractXhsUrl(raw: string): string | null {
  const m = raw.match(XHS_NOTE_URL_RE);
  return m ? m[0] : null;
}

export async function fetchXhsViaTikHub(noteUrl: string): Promise<XhsNoteContent | null> {
  const apiKey = process.env.TIKHUB_API_KEY;
  if (!apiKey) return null;

  try {
    let ref = extractXhsNoteRef(noteUrl);
    if (!ref && noteUrl.includes("xhslink.com")) {
      ref = await resolveXhsShortLink(noteUrl);
    }
    if (!ref) return null;

    const resp = await fetch(
      `https://api.tikhub.io/api/v1/xiaohongshu/app/get_note_info?note_id=${ref.noteId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!resp.ok) return null;

    const json = await resp.json() as any;
    const noteData = json?.data?.data?.[0]?.note_list?.[0]
      ?? json?.data?.note_item?.note_card
      ?? json?.data?.note_card
      ?? json?.data?.items?.[0]?.note_card
      ?? json?.data;

    if (!noteData?.title && !noteData?.desc) return null;

    const title = noteData.title || noteData.display_title || "";
    const desc = noteData.desc || noteData.note_desc || "";
    const tags = (noteData.tag_list || noteData.tags || noteData.topics || [])
      .map((t: any) => t?.name || t?.topic_name || t)
      .filter((t: any) => typeof t === "string" && t.length > 0);

    const imagesList = noteData.images_list || noteData.image_list || [];
    const images: string[] = imagesList
      .map((img: any) => img?.url_size_large || img?.url || img?.original || "")
      .filter((u: string) => u.startsWith("http"));

    const parts = [
      title && `标题: ${title}`,
      desc && `内容: ${desc}`,
      tags.length && `标签: ${tags.join(", ")}`,
    ].filter(Boolean);
    const result = parts.join("\n\n");

    if (result.length > 20) {
      return { title, desc, tags, raw: result, images };
    }
    return null;
  } catch {
    return null;
  }
}

export function buildXhsHintedContent(note: XhsNoteContent, city?: string, country?: string): string {
  const dest = city || "";
  const ctry = country || "";
  const hint = dest || ctry
    ? `⚠️ 重要：本笔记的目的地是「${dest}」（${ctry}），你必须生成关于「${dest}」的行程，禁止生成其他城市的行程！`
    : `⚠️ 重要：请从以下笔记内容中提取真实目的地，禁止替换为其他城市！`;
  return `来源: 小红书笔记\n${hint}\n\n标题：${note.title}\n\n${note.raw}\n\n标签：${note.tags.join(", ")}`;
}

/** Fire n8n webhook in background (saves to explore DB, does not block user) */
export function fireN8nWebhookAsync(note: XhsNoteContent) {
  const n8nUrl = process.env.N8N_WEBHOOK_URL || "http://127.0.0.1:5678/webhook/xhs-parse";
  fetch(n8nUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: note.title,
      desc: note.desc,
      tags: note.tags.join(", "),
      source_url: "",
    }),
    signal: AbortSignal.timeout(90_000),
  }).catch(() => {});
}
