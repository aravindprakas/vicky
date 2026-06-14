import type { IncomingMessage, ServerResponse } from "node:http";

// Runs on Vercel's Node.js runtime (the default — no edge config). The built
// server entry is a Cloudflare-style bundle that relies on Node built-ins
// (node:events, etc.) via nodejs_compat, which Vercel's *Edge* runtime does not
// provide — so it must run on Node. This handler bridges Vercel's Node
// (req, res) signature to the bundle's Web `fetch(Request) -> Response`.
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const { default: serverEntry } = await import("../dist/server/index.js");

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
    let body: Buffer | undefined;
    if (method !== "GET" && method !== "HEAD") {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      if (chunks.length) body = Buffer.concat(chunks);
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
