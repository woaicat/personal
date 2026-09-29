export class AnalyticsUnavailable extends Error {}

export function tursoConnection(
  urlValue = process.env.TURSO_DATABASE_URL,
  token = process.env.TURSO_AUTH_TOKEN,
) {
  try {
    const url = new URL(urlValue || "");
    if (
      !["libsql:", "https:"].includes(url.protocol) ||
      !/^[a-z0-9-]+\.turso\.io$/i.test(url.hostname) ||
      url.username ||
      url.password ||
      url.port ||
      url.search ||
      url.hash ||
      !["", "/"].includes(url.pathname) ||
      !token ||
      token.length < 32 ||
      token.length > 8192
    )
      throw new Error("Invalid connection");
    return { url: url.toString(), authToken: token };
  } catch {
    // Never include credentials or connection strings in surfaced errors.
    throw new AnalyticsUnavailable(
      "Configure a secure Turso libSQL connection",
    );
  }
}
export function analyticsConfig() {
  const hosted = process.env.NODE_ENV === "production" || !!process.env.VERCEL;
  const storage = process.env.ANALYTICS_STORAGE;
  if (
    !["local-sqlite", "turso"].includes(storage || "") ||
    (storage === "local-sqlite" && hosted)
  )
    throw new AnalyticsUnavailable(
      "Persistent analytics storage is not configured",
    );
  const mode = process.env.ANALYTICS_DATA_MODE || "test";
  if (!["test", "production"].includes(mode))
    throw new AnalyticsUnavailable("Invalid analytics data mode");
  if (storage === "turso") {
    tursoConnection();
    // A preview/dev checkout must never collect into a production-configured store.
    if (
      mode === "production" &&
      (!hosted ||
        (process.env.VERCEL && process.env.VERCEL_ENV !== "production"))
    )
      throw new AnalyticsUnavailable(
        "Production analytics cannot run in preview/development",
      );
    if (process.env.VERCEL_ENV === "production" && mode !== "production")
      throw new AnalyticsUnavailable(
        "Production deployment requires an explicit production data mode",
      );
  }
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  const identitySecret = process.env.ANALYTICS_ID_SECRET;
  if (
    !passwordHash ||
    !sessionSecret ||
    sessionSecret.length < 32 ||
    !identitySecret ||
    identitySecret.length < 32
  ) {
    throw new AnalyticsUnavailable("Private analytics is not configured");
  }
  return {
    storage: storage as "local-sqlite" | "turso",
    source: (storage === "local-sqlite"
      ? "local"
      : mode === "production"
        ? "production"
        : "turso-test") as "local" | "turso-test" | "production",
    passwordHash,
    sessionSecret,
    identitySecret,
    file:
      process.env.ANALYTICS_SQLITE_PATH || ".local/private-analytics.sqlite",
  };
}

export function trackingEnabled() {
  try {
    analyticsConfig();
    if (process.env.ANALYTICS_ENABLED !== "true") return false;
    if (process.env.VERCEL && process.env.VERCEL_ENV !== "production")
      return process.env.ANALYTICS_PREVIEW_ENABLED === "true";
    if (process.env.NODE_ENV === "production") return true;
    return process.env.ANALYTICS_DEV_ENABLED === "true";
  } catch {
    return false;
  }
}
