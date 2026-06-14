import type { IncomingMessage, ServerResponse } from "node:http";

// Runs on Vercel's Node.js runtime (the default — no edge config). The built
// server entry is a Cloudflare-style bundle that relies on Node built-ins
// (node:events, etc.) via nodejs_compat, which Vercel's *Edge* runtime does not
// provide — so it must run on Node. This handler bridges Vercel's Node
// (req, res) signature to the bundle's Web `fetch(Request) -> Response`.
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    // The built server entry is a JS artifact with no type declarations and
    // lives outside this file's tsconfig. Cast the specifier to a plain string
    // so TS treats it as a dynamic import (typed `any`) rather than failing
    // module resolution (TS2307) when the build output isn't present at check time.
    const mod = (await import("../dist/server/index.js" as string)) as {
      default: {
        fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
      };
    };
    const serverEntry = mod.default;

    const proto =
      (req.headers["x-forwarded-proto"] as string | undefined)?.split(",")[0] || "https";
    const host = req.headers.host || "localhost";
    const url = new URL(req.url || "/", `${proto}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
      else headers.set(key, value);
    }

    const method = (req.method || "GET").toUpperCase();
    let body: BodyInit | undefined;
    if (method !== "GET" && method !== "HEAD") {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      // A Node Buffer is a Uint8Array at runtime (a valid BodyInit); cast for
      // TS, whose Buffer<ArrayBufferLike> type doesn't match the DOM BodyInit.
      if (chunks.length) body = Buffer.concat(chunks) as unknown as BodyInit;
    }

    const request = new Request(url.toString(), { method, headers, body });
    const response: Response = await serverEntry.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      // Let Node set these from the buffered body to avoid length/encoding mismatches.
      if (lower === "content-length" || lower === "transfer-encoding") return;
      res.setHeader(key, value);
    });
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}
