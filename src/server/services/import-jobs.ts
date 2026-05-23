/** Import job management — async AI-powered route parsing */

import { parseWithAI } from "../../lib/ai";
import type { StreamProgress } from "../../lib/ai";
import { TTLCache } from "../../lib/ttl-cache";
import { createTripFromImport, optimizeTrip } from "../../lib/tripPlanner";
import { getTripRepository } from "../../lib/tripRepository";
import type { SourceKind, Trip } from "../../lib/tripTypes";
import {
  isXhsUrl, extractXhsUrl, extractXhsShareText,
  fetchXhsViaTikHub, buildXhsHintedContent, fireN8nWebhookAsync,
  type XhsNoteContent,
} from "./xhs";

const AI_STEPS = ["读取攻略来源", "AI 智能解析", "地理编码定位", "优化路线排序"];

export type ImportJobState = {
  id: string;
  kind: SourceKind;
  content: string;
  createdAt: number;
  status: "processing" | "done" | "error";
  progress: number;
  tripId?: string;
  error?: string;
  steps: Array<{ label: string; state: "done" | "active" | "pending" }>;
  streamInfo?: string;
};

export const importJobs = new TTLCache<string, ImportJobState>({ maxSize: 200, ttlMs: 10 * 60 * 1000 });

export type QuizAiJobState = {
  status: "generating" | "done" | "error";
  tripId?: string;
  tripName?: string;
};

export const quizAiJobs = new TTLCache<string, QuizAiJobState>({ maxSize: 100, ttlMs: 10 * 60 * 1000 });

export function makeJobResponse(job: ImportJobState) {
  return {
    id: job.id,
    kind: job.kind,
    status: job.status,
    progress: job.progress,
    tripId: job.status === "done" ? job.tripId : undefined,
    error: job.error,
    steps: job.steps,
    streamInfo: job.streamInfo,
  };
}

function updateJobProgress(
  job: ImportJobState,
  stepIndex: number,
  progress: number,
  status: "processing" | "done" | "error" = "processing",
) {
  job.progress = progress;
  job.status = status;
  job.steps = AI_STEPS.map((label, i) => ({
    label,
    state:
      i < stepIndex
        ? ("done" as const)
        : i === stepIndex
          ? ("active" as const)
          : ("pending" as const),
  }));
  if (status === "done") {
    job.steps = AI_STEPS.map((label) => ({ label, state: "done" as const }));
  }
}

export function createNewJob(kind: SourceKind, content: string): ImportJobState {
  const id = `job-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  return {
    id,
    kind,
    content,
    createdAt: Date.now(),
    status: "processing",
    progress: 5,
    steps: AI_STEPS.map((label, i) => ({
      label,
      state: i === 0 ? ("active" as const) : ("pending" as const),
    })),
  };
}

/** Process import job asynchronously with real AI */
export async function processImportJob(job: ImportJobState, env: unknown, ownerId: string) {
  let xhsNote: XhsNoteContent | null = null;

  try {
    updateJobProgress(job, 0, 10);
    let aiContent = job.content;
    let aiKind = job.kind;

    if (isXhsUrl(job.content)) {
      const noteUrl = extractXhsUrl(job.content);
      if (noteUrl) {
        xhsNote = await fetchXhsViaTikHub(noteUrl);
        if (xhsNote) {
          aiContent = `来源: 小红书笔记\n\n${xhsNote.raw}`;
          aiKind = "text";
        }
      }
      if (!xhsNote && aiContent === job.content) {
        const shareText = extractXhsShareText(job.content);
        if (shareText) {
          aiContent = `来源: 小红书笔记分享\n\n${shareText}`;
          aiKind = "text";
        }
      }
    }

    updateJobProgress(job, 1, 20);
    const onProgress = (p: StreamProgress) => {
      if (p.phase === "connecting") {
        job.streamInfo = "正在连接 AI...";
        job.progress = 20;
      } else if (p.phase === "generating") {
        const parts: string[] = [];
        if (p.destination) parts.push(`目的地：${p.destination}`);
        if (p.daysFound > 0) parts.push(`${p.daysFound} 天行程`);
        if (p.spotsFound > 0) parts.push(`${p.spotsFound} 个景点`);
        job.streamInfo = parts.length > 0 ? `已识别 ${parts.join("、")}` : "AI 正在生成行程...";
        job.progress = Math.min(20 + Math.floor(p.spotsFound * 2), 65);
      } else if (p.phase === "parsing") {
        job.streamInfo = "正在解析行程数据...";
        job.progress = 68;
      }
    };

    let trip: Trip;
    if (xhsNote) {
      fireN8nWebhookAsync(xhsNote);
      const hinted = buildXhsHintedContent(xhsNote);
      trip = await parseWithAI("text", hinted, onProgress);
    } else {
      trip = await parseWithAI(aiKind, aiContent, onProgress);
    }

    job.streamInfo = "正在定位景点坐标...";
    updateJobProgress(job, 2, 70);

    updateJobProgress(job, 3, 85);
    const optimized = optimizeTrip(trip);

    const repository = await getTripRepository(env);
    await repository.saveUserTrip(optimized, ownerId);
    job.tripId = optimized.id;
    updateJobProgress(job, 4, 100, "done");
  } catch (err) {
    console.error(`[Import] Job ${job.id} failed:`, err);
    try {
      if (xhsNote) {
        const hinted = buildXhsHintedContent(xhsNote);
        const retryTrip = await parseWithAI("text", hinted);
        const repository = await getTripRepository(env);
        await repository.saveUserTrip(optimizeTrip(retryTrip), ownerId);
        job.tripId = retryTrip.id;
        updateJobProgress(job, 4, 100, "done");
      } else {
        const fallbackTrip = createTripFromImport({ kind: job.kind, content: job.content });
        const repository = await getTripRepository(env);
        await repository.saveUserTrip(fallbackTrip, ownerId);
        job.tripId = fallbackTrip.id;
        updateJobProgress(job, 4, 100, "done");
      }
    } catch {
      job.status = "error";
      job.error = err instanceof Error ? err.message : "解析失败";
      job.progress = 0;
      job.steps = AI_STEPS.map((label) => ({ label, state: "pending" as const }));
    }
  }
}
