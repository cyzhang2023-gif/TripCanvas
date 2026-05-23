import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  handleTripsRoutes,
  handleImageRoutes,
  handleExploreRoutes,
  handleQuizRoutes,
  handleN8nRoutes,
  apiJson,
  apiError,
  getOwnerId,
} from "./server/index";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

/* ─── API Router ─── */
async function handleApiRequest(request: Request, env: unknown): Promise<Response | undefined> {
  const url = new URL(request.url);
  const { pathname } = url;
  if (!pathname.startsWith("/api/")) return undefined;
  const ownerId = getOwnerId(request);

  if (request.method === "OPTIONS") return apiJson({ ok: true });
  if (pathname === "/api/health") return apiJson({ ok: true });

  // Delegate to route modules
  const tripsResponse = await handleTripsRoutes(pathname, url, request, env, ownerId);
  if (tripsResponse) return tripsResponse;

  const imageResponse = await handleImageRoutes(pathname, url, request);
  if (imageResponse) return imageResponse;

  const exploreResponse = await handleExploreRoutes(pathname, url, request, env, ownerId);
  if (exploreResponse) return exploreResponse;

  const quizResponse = await handleQuizRoutes(pathname, url, request, env, ownerId);
  if (quizResponse) return quizResponse;

  const n8nResponse = await handleN8nRoutes(pathname, url, request, env, ownerId);
  if (n8nResponse) return n8nResponse;

  return apiError(404, "接口不存在");
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const apiResponse = await handleApiRequest(request, env);
      if (apiResponse) return apiResponse;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
