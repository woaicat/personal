import { NextRequest, NextResponse } from "next/server";
import { consumeRateLimit, getClientIp, isSuspiciousUserAgent, pruneRateLimitStore } from "@/lib/security/guards";

const API_RATE_LIMIT = 60;
const API_RATE_LIMIT_WINDOW_MS = 60_000;
const STORE_PRUNE_INTERVAL_MS = 15 * 60_000;

const PAGE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const API_METHODS = new Set(["GET", "POST", "HEAD", "OPTIONS"]);

let lastPruneAt = 0;

function buildErrorResponse(status: number, message: string) {
  return NextResponse.json(
    {
      error: message
    },
    {
      status
    }
  );
}

function isBlockedMethod(pathname: string, method: string) {
  if (pathname.startsWith("/api/")) {
    return !API_METHODS.has(method);
  }

  return !PAGE_METHODS.has(method);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();
  const userAgent = request.headers.get("user-agent") ?? "";

  if (isSuspiciousUserAgent(userAgent)) {
    return buildErrorResponse(403, "Forbidden");
  }

  if (isBlockedMethod(pathname, method)) {
    return buildErrorResponse(405, "Method Not Allowed");
  }

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const identity = `${getClientIp(request.headers)}:${pathname}`;
  const result = consumeRateLimit(identity, API_RATE_LIMIT, API_RATE_LIMIT_WINDOW_MS);

  if (Date.now() - lastPruneAt > STORE_PRUNE_INTERVAL_MS) {
    lastPruneAt = Date.now();
    pruneRateLimitStore(30 * 60_000);
  }

  if (!result.allowed) {
    return NextResponse.json(
      {
        error: "Too Many Requests",
        retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000)
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000)))
        }
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js|ico|txt|map|woff|woff2|html)$).*)"
  ]
};
