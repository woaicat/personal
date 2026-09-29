import { NextResponse } from "next/server";

export const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  Vary: "Cookie",
};
export function json(
  value: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return NextResponse.json(value, {
    status,
    headers: { ...PRIVATE_HEADERS, ...headers },
  });
}
export function sameOrigin(request: Request) {
  try {
    const origin = new URL(request.headers.get("origin") || "");
    const host = request.headers.get("host");
    const local =
      process.env.NODE_ENV !== "production" &&
      !process.env.VERCEL &&
      ["localhost", "127.0.0.1"].includes(origin.hostname);
    const production = new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://jiaxuanstudio.com",
    );
    // Next dev may canonicalize request.url to localhost even when the browser uses 127.0.0.1.
    return (
      origin.host === host &&
      (local
        ? ["http:", "https:"].includes(origin.protocol)
        : origin.origin === production.origin) &&
      request.headers.get("sec-fetch-site") !== "cross-site"
    );
  } catch {
    return false;
  }
}
export async function readJson(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!/^(application\/json|text\/plain)(;|$)/i.test(contentType))
    throw new Error("Unsupported content type");
  if (
    Number(request.headers.get("content-length") || 0) > 16384 ||
    !request.body
  )
    throw new Error("Invalid body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 16384) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}
