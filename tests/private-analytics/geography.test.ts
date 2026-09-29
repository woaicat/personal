import test from "node:test";
import assert from "node:assert/strict";
import { regionFromHeaders } from "../../lib/private-analytics/geography";
import { analyticsConfig, trackingEnabled } from "../../lib/private-analytics/config";
import { sameOrigin } from "../../lib/private-analytics/http";

const production = { VERCEL: "1", VERCEL_ENV: "production" };
function geo(country: string, region = "") {
  return new Headers({
    "x-vercel-ip-country": country,
    "x-vercel-ip-country-region": region,
  });
}

test("production geography distinguishes similarly named provinces and handles overseas / missing data", () => {
  assert.equal(regionFromHeaders(geo("CN", "GD"), production), "广东");
  assert.equal(regionFromHeaders(geo("CN", "SX"), production), "山西");
  assert.equal(regionFromHeaders(geo("CN", "SN"), production), "陕西");
  assert.equal(regionFromHeaders(geo("cn", "bj"), production), "北京");
  assert.equal(regionFromHeaders(geo("HK"), production), "香港");
  assert.equal(regionFromHeaders(geo("US", "CA"), production), "美国");
  assert.equal(regionFromHeaders(geo("JP"), production), "日本");
  assert.equal(regionFromHeaders(geo("CN", "XX"), production), "中国（省区未知）");
  for (const country of ["", "ZZ", "XX", "<script>", "USA", "EU", "UN"])
    assert.equal(regionFromHeaders(geo(country), production), "未知");
});

test("local, self-hosted and preview requests ignore forged Vercel geography", () => {
  for (const environment of [{}, { NODE_ENV: "production" },
    { VERCEL: "1", VERCEL_ENV: "preview" },
    { VERCEL: "true", VERCEL_ENV: "production" }])
    assert.equal(regionFromHeaders(geo("CN", "GD"), environment), "未知");
});

test("production collection gate and canonical origin reject accidental test/preview collection", () => {
  const previous = { ...process.env };
  try {
    Object.assign(process.env, {
      VERCEL: "1", VERCEL_ENV: "production", NODE_ENV: "production",
      ANALYTICS_STORAGE: "turso", ANALYTICS_DATA_MODE: "production",
      TURSO_DATABASE_URL: "libsql://fixture-prod-owner.turso.io",
      TURSO_AUTH_TOKEN: "t".repeat(64), ADMIN_PASSWORD_HASH: "test-hash",
      ADMIN_SESSION_SECRET: "s".repeat(64), ANALYTICS_ID_SECRET: "i".repeat(64),
      ANALYTICS_ENABLED: "false", ANALYTICS_DEV_ENABLED: "true",
      ANALYTICS_PREVIEW_ENABLED: "true", NEXT_PUBLIC_SITE_URL: "https://jiaxuanstudio.com",
    });
    assert.equal(trackingEnabled(), false);
    process.env.ANALYTICS_ENABLED = "true";
    assert.equal(trackingEnabled(), true);
    const request = (origin: string, host: string, site = "same-origin") =>
      new Request("https://jiaxuanstudio.com/api/analytics/collect", {
        headers: { origin, host, "sec-fetch-site": site },
      });
    assert.equal(sameOrigin(request("https://jiaxuanstudio.com", "jiaxuanstudio.com")), true);
    assert.equal(sameOrigin(request("https://other.example", "other.example")), false);
    assert.equal(sameOrigin(request("https://jiaxuanstudio.com", "jiaxuanstudio.com", "cross-site")), false);
    process.env.VERCEL_ENV = "preview";
    assert.throws(() => analyticsConfig());
    assert.equal(trackingEnabled(), false);
    process.env.VERCEL_ENV = "production";
    process.env.ANALYTICS_DATA_MODE = "test";
    assert.throws(() => analyticsConfig());
    assert.equal(trackingEnabled(), false);
  } finally {
    for (const key of Object.keys(process.env)) if (!(key in previous)) delete process.env[key];
    Object.assign(process.env, previous);
  }
});
