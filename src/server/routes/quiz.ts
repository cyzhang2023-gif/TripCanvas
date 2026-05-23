/** Quiz recommendation API routes */

import { generateQuizTrip } from "../../lib/ai";
import type { QuizAnswers } from "../../lib/ai";
import { quizAnswersSchema, quizAiStatusSchema } from "../../lib/api-schemas";
import { matchQuizToRoutes, optimizeTrip } from "../../lib/tripPlanner";
import { getTripRepository } from "../../lib/tripRepository";
import { apiJson, apiError, readJson } from "../utils";
import { quizAiJobs } from "../services/import-jobs";

export async function handleQuizRoutes(
  pathname: string,
  _url: URL,
  request: Request,
  env: unknown,
  ownerId: string,
): Promise<Response | undefined> {
  // POST /api/quiz-recommend
  if (pathname === "/api/quiz-recommend" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = quizAnswersSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请填写完整的旅行偏好");
    const answers = parsed.data as QuizAnswers;
    const dbMatches = matchQuizToRoutes(answers);
    const repository = await getTripRepository(env);

    const aiId = `ai-${Date.now().toString(36)}`;
    const aiRoute = { id: aiId, status: "generating" as const };
    quizAiJobs.set(aiId, { status: "generating" });

    generateQuizTrip(answers)
      .then(async (trip) => {
        const optimized = optimizeTrip(trip);
        await repository.saveUserTrip(optimized, ownerId);
        quizAiJobs.set(aiId, { status: "done", tripId: optimized.id, tripName: optimized.name });
      })
      .catch((err) => {
        console.error("[Quiz AI] Failed:", err);
        quizAiJobs.set(aiId, { status: "error" });
      });

    return apiJson({ dbMatches, aiRoutes: [aiRoute] });
  }

  // POST /api/quiz-ai-status
  if (pathname === "/api/quiz-ai-status" && request.method === "POST") {
    const body = await readJson(request);
    const parsed = quizAiStatusSchema.safeParse(body);
    if (!parsed.success) return apiError(400, "请提供有效的任务 ID 列表");
    const { ids } = parsed.data;
    const routes = ids.map((id) => {
      const job = quizAiJobs.get(id);
      return job ? { id, ...job } : { id, status: "error" };
    });
    return apiJson({ routes });
  }

  return undefined;
}
