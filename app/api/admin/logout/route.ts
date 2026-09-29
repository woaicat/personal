import { cookies } from "next/headers";
import {
  COOKIE,
  cookieOptions,
  sessionDigest,
} from "@/lib/private-analytics/auth";
import { analyticsRepository } from "@/lib/private-analytics/sqlite";
import { json, sameOrigin } from "@/lib/private-analytics/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "请求来源无效" }, 403);
  try {
    const token = (await cookies()).get(COOKIE)?.value;
    if (token) analyticsRepository().revokeAdminSession(sessionDigest(token));
    const response = json({ ok: true });
    response.cookies.set(COOKIE, "", { ...cookieOptions, maxAge: 0 });
    return response;
  } catch {
    return json({ error: "暂时无法退出，请稍后重试" }, 503);
  }
}
