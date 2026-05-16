import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const clientDir = join(rootDir, "dist/client");
const serverEntry = join(rootDir, "dist/server/index.js");
const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "127.0.0.1";

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".gif", "image/gif"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function resolveClientAsset(pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return undefined;
  }

  const normalizedPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(clientDir, `.${normalizedPath}`);
  const rel = relative(clientDir, filePath);

  if (rel.startsWith("..") || rel === "" || normalize(rel).startsWith("..")) {
    return undefined;
  }

  if (!existsSync(filePath)) return undefined;
  const stat = statSync(filePath);
  return stat.isFile() ? filePath : undefined;
}

function serveStatic(req, res, filePath) {
  const ext = extname(filePath);
  res.statusCode = 200;
  res.setHeader("Content-Type", mimeTypes.get(ext) ?? "application/octet-stream");
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  createReadStream(filePath).pipe(res);
}

async function readRequestBody(req) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  return req;
}

function buildRequest(req) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const proto = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto || "http";
  const hostHeader = req.headers.host ?? `${host}:${port}`;
  const url = `${proto}://${hostHeader}${req.url ?? "/"}`;
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(key, item));
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  const body = readRequestBody(req);
  return body instanceof Promise
    ? body.then(
        (resolvedBody) =>
          new Request(url, { method: req.method, headers, body: resolvedBody, duplex: "half" }),
      )
    : new Request(url, { method: req.method, headers, body, duplex: "half" });
}

async function writeResponse(res, response) {
  res.statusCode = response.status;
  res.statusMessage = response.statusText;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (!response.body) {
    res.end();
    return;
  }

  const reader = response.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  } finally {
    res.end();
    reader.releaseLock();
  }
}

async function main() {
  const handlerModule = await import(pathToFileURL(serverEntry).href);
  const handler = handlerModule.default;

  if (!handler?.fetch) {
    throw new Error("Aliyun server entry must export a default fetch handler.");
  }

  const server = createServer(async (req, res) => {
    try {
      const pathname = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`)
        .pathname;
      const assetPath = resolveClientAsset(pathname);
      if (assetPath) {
        serveStatic(req, res, assetPath);
        return;
      }

      const request = await buildRequest(req);
      const response = await handler.fetch(request, process.env, {
        waitUntil: () => undefined,
        passThroughOnException: () => undefined,
      });
      await writeResponse(res, response);
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Internal Server Error");
    }
  });

  server.listen(port, host, () => {
    console.log(`Routey is listening on http://${host}:${port}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
