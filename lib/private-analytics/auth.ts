import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { analyticsConfig } from "./config";
import { analyticsRepository } from "./sqlite";

export const COOKIE = "jiaxuan_admin";
export const SESSION_AGE = 7 * 86400;
export function identityDigest(value: string, domain: string) {
  const { identitySecret } = analyticsConfig();
  return createHmac("sha256", identitySecret)
    .update(`${domain}:${value}`)
    .digest("hex");
}
export function sessionDigest(token: string) {
  const { sessionSecret, passwordHash } = analyticsConfig();
  return createHmac("sha256", sessionSecret)
    .update(passwordHash)
    .update(token)
    .digest("hex");
}
export async function isAdmin() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return false;
  return analyticsRepository().hasAdminSession(
    sessionDigest(token),
    Date.now(),
  );
}
export function createSession() {
  const token = randomBytes(32).toString("hex");
  analyticsRepository().createAdminSession(
    sessionDigest(token),
    Date.now() + SESSION_AGE * 1000,
  );
  return token;
}
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_AGE,
};
