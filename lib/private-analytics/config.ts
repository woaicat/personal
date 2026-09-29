export class AnalyticsUnavailable extends Error {}

export function analyticsConfig() {
  // Local SQLite is deliberately unavailable in production/serverless deployments.
  if (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL ||
    process.env.ANALYTICS_STORAGE !== "local-sqlite"
  ) {
    throw new AnalyticsUnavailable(
      "Persistent production adapter has not been configured",
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
    return (
      process.env.ANALYTICS_ENABLED === "true" &&
      process.env.ANALYTICS_DEV_ENABLED === "true"
    );
  } catch {
    return false;
  }
}
