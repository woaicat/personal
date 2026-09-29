import { getClientIp } from "@/lib/security/guards";
import { analyticsConfig } from "@/lib/private-analytics/config";
import { analyticsRepository } from "@/lib/private-analytics/store";
import { verifyPassword } from "@/lib/private-analytics/password";
import {
  COOKIE,
  cookieOptions,
  createSession,
  identityDigest,
} from "@/lib/private-analytics/auth";
import { json, readJson, sameOrigin } from "@/lib/private-analytics/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "请求来源无效" }, 403);
  let body: unknown;
  try {
    body = await readJson(request);
  } catch {
    return json({ error: "请求格式无效" }, 400);
  }
  const password = (body as { password?: unknown })?.password;
  if (typeof password !== "string" || !password || password.length > 512)
    return json({ error: "请输入有效密码" }, 400);
  try {
    const repository = await analyticsRepository();
    const key = identityDigest(getClientIp(request.headers), "login");
    const attempt = await repository.reserveAttempt(
      key,
      5,
      15 * 60000,
      Date.now(),
    );
    if (!attempt.allowed)
      return json({ error: "尝试次数过多，请稍后再试" }, 429, {
        "Retry-After": String(Math.ceil((attempt.resetAt - Date.now()) / 1000)),
      });
    if (!(await verifyPassword(password, analyticsConfig().passwordHash)))
      return json({ error: "密码不正确" }, 401);
    await repository.clearAttempts(key);
    const response = json({ next: "/admin/analytics" });
    response.cookies.set(COOKIE, await createSession(), cookieOptions);
    return response;
  } catch {
    return json({ error: "暂时无法登录，请稍后重试" }, 503);
  }
}
