import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClient } from "@libsql/client";
import schema from "../../lib/private-analytics/schema.json";
import { TursoAnalyticsRepository } from "../../lib/private-analytics/turso";
import { SqliteAnalyticsRepository } from "../../lib/private-analytics/sqlite";
import {
  InvalidEvent,
  MissingPageView,
} from "../../lib/private-analytics/repository";
import {
  analyticsConfig,
  trackingEnabled,
  tursoConnection,
} from "../../lib/private-analytics/config";
import {
  aggregate,
  dateBoundary,
  DAY,
} from "../../lib/private-analytics/aggregate";
import type {
  CollectEvent,
  AnalyticsQuery,
} from "../../lib/private-analytics/types";

const start = dateBoundary("2026-09-20");
const query: AnalyticsQuery = {
  from: start,
  to: start + 3 * DAY,
  path: null,
  granularity: "day",
  rankBy: "pv",
};
function view(visitor = randomUUID(), path = "/"): CollectEvent {
  return {
    schema_version: 1,
    type: "page_view",
    event_id: randomUUID(),
    visitor_id: visitor,
    page_view_id: randomUUID(),
    tab_id: randomUUID(),
    path,
    client_time: start,
    elapsed_ms: 0,
    sequence: 0,
    intervals: [],
  };
}
async function fixture() {
  const directory = mkdtempSync(join(tmpdir(), "analytics-libsql-"));
  const url = `file:${join(directory, "test.sqlite")}`;
  const client = createClient({ url, intMode: "number" });
  await client.execute("PRAGMA journal_mode=WAL");
  await client.batch(
    [...schema.statements, `PRAGMA user_version=${schema.version}`],
    "write",
  );
  const repo = new TursoAnalyticsRepository(client);
  await repo.verifySchema();
  return {
    repo,
    url,
    client,
    close() {
      repo.close();
      rmSync(directory, { recursive: true, force: true });
    },
  };
}

test("libSQL adapter matches SQLite metrics for repeat visits, overlaps, midnight and late end", async () => {
  const f = await fixture(),
    local = new SqliteAnalyticsRepository(":memory:");
  try {
    const visitor = randomUUID(),
      a = view(visitor),
      b = view(visitor, "/a"),
      c = view(visitor, "/a");
    const trace: [CollectEvent, number][] = [
      [a, start],
      [a, start],
      [{ ...a, event_id: randomUUID() }, start + 1000],
      [b, start + 10000],
      [
        {
          ...a,
          type: "activity_batch",
          event_id: randomUUID(),
          sequence: 1,
          elapsed_ms: 80000,
          intervals: [[0, 80000]],
        },
        start + 80000,
      ],
      [
        {
          ...b,
          type: "activity_batch",
          event_id: randomUUID(),
          sequence: 1,
          elapsed_ms: 70000,
          intervals: [[0, 70000]],
        },
        start + 80000,
      ],
      [
        {
          ...a,
          type: "page_end",
          event_id: randomUUID(),
          sequence: 2,
          elapsed_ms: 40000,
          intervals: [],
        },
        start + 90000,
      ],
      [c, start + DAY - 10000],
      [
        {
          ...c,
          type: "activity_batch",
          event_id: randomUUID(),
          sequence: 1,
          elapsed_ms: 30000,
          intervals: [[0, 30000]],
        },
        start + DAY + 20000,
      ],
    ];
    for (const [event, now] of trace) {
      const args = [
        event,
        visitor,
        event.path === "/" ? "首页" : "A",
        "广东",
        "桌面端",
        now,
      ] as const;
      await f.repo.ingest(...args);
      local.ingest(...args);
    }
    for (const range of [
      query,
      { ...query, path: "/a" },
      { ...query, from: start + DAY },
    ])
      assert.deepEqual(
        aggregate(await f.repo.snapshot(range.from, range.to), range, range.to),
        aggregate(local.snapshot(range.from, range.to), range, range.to),
      );
    await f.repo.markInvalidTiming(b.page_view_id, "other");
    assert.equal(
      (await f.repo.snapshot(query.from, query.to)).invalidTimingViews?.length,
      0,
    );
    await f.repo.markInvalidTiming(b.page_view_id, visitor);
    local.markInvalidTiming(b.page_view_id, visitor);
    assert.deepEqual(
      aggregate(await f.repo.snapshot(query.from, query.to), query, query.to),
      aggregate(local.snapshot(query.from, query.to), query, query.to),
    );
    assert.deepEqual(
      aggregate(await f.repo.snapshot(query.from, query.to), query, query.to)
        .summary,
      { uv: 1, pv: 3 },
    );
  } finally {
    local.close();
    f.close();
  }
});

test("libSQL write transaction serializes duplicate events across connections and rolls back invalid identity", async () => {
  const f = await fixture(),
    other = new TursoAnalyticsRepository(
      createClient({ url: f.url, intMode: "number" }),
    );
  try {
    const visitor = randomUUID(),
      a = view(visitor),
      b = view(visitor, "/b");
    await Promise.all([
      f.repo.ingest(a, visitor, "首页", "未知", "手机", start),
      other.ingest(a, visitor, "首页", "未知", "手机", start),
    ]);
    await Promise.all([
      f.repo.ingest(b, visitor, "B", "未知", "手机", start + 1000),
      other.ingest(
        { ...a, event_id: randomUUID() },
        visitor,
        "首页",
        "未知",
        "手机",
        start + 1000,
      ),
    ]);
    const snapshot = await f.repo.snapshot(start, start + DAY);
    assert.equal(snapshot.views.length, 2);
    assert.equal(snapshot.sessions.length, 1);
    await assert.rejects(
      f.repo.ingest(
        { ...a, event_id: randomUUID(), sequence: 2 },
        "wrong",
        "首页",
        "未知",
        "手机",
        start + 2000,
      ),
      InvalidEvent,
    );
    await assert.rejects(
      f.repo.ingest(
        { ...view(), type: "activity_batch", sequence: 1 },
        visitor,
        "首页",
        "未知",
        "手机",
        start + 2000,
      ),
      MissingPageView,
    );
    const next = view(visitor);
    await f.repo.ingest(
      next,
      visitor,
      "首页",
      "未知",
      "手机",
      start + 1800001 + 1000,
    );
    assert.equal(
      (await f.repo.snapshot(start, start + DAY)).sessions.length,
      2,
    );
  } finally {
    other.close();
    f.close();
  }
});

test("libSQL shared rate limit is atomic across clients; expiry, reset, logout and restart persist", async () => {
  const f = await fixture(),
    other = new TursoAnalyticsRepository(
      createClient({ url: f.url, intMode: "number" }),
    );
  try {
    const attempts = await Promise.all(
      Array.from({ length: 20 }, (_, i) =>
        (i % 2 ? other : f.repo).reserveAttempt("login", 5, 1000, start),
      ),
    );
    assert.equal(attempts.filter((a) => a.allowed).length, 5);
    assert.ok(attempts.every((a) => a.resetAt === start + 1000));
    assert.equal(
      (await other.reserveAttempt("login", 5, 1000, start + 1000)).allowed,
      true,
    );
    await other.clearAttempts("login");
    assert.equal(
      (await f.repo.reserveAttempt("login", 5, 1000, start + 1001)).allowed,
      true,
    );
    await f.repo.createAdminSession("digest", start + 5000);
    assert.equal(await other.hasAdminSession("digest", start), true);
    assert.equal(await other.hasAdminSession("digest", start + 5000), false);
    await other.revokeAdminSession("digest");
    assert.equal(await f.repo.hasAdminSession("digest", start), false);
    await f.repo.createAdminSession("restart", start + 5000);
    const reopened = new TursoAnalyticsRepository(createClient({ url: f.url }));
    try {
      assert.equal(await reopened.hasAdminSession("restart", start), true);
    } finally {
      reopened.close();
    }
    // Hourly cleanup removes expired rows without touching live limits/sessions.
    await f.repo.reserveAttempt("fresh", 5, 1000, start + 3600000);
    assert.equal(
      (await f.client.execute("SELECT COUNT(*) AS n FROM admin_sessions"))
        .rows[0].n,
      0,
    );
    assert.equal(
      (await f.client.execute("SELECT COUNT(*) AS n FROM rate_limits")).rows[0]
        .n,
      1,
    );
  } finally {
    other.close();
    f.close();
  }
});

test("libSQL empty/uninitialized schema and fail-closed production connection configuration", async () => {
  const raw = createClient({ url: ":memory:" }),
    repo = new TursoAnalyticsRepository(raw);
  try {
    await assert.rejects(repo.verifySchema());
  } finally {
    repo.close();
  }
  const f = await fixture();
  try {
    assert.equal(
      (await f.repo.snapshot(start, start + DAY)).firstCollected,
      null,
    );
  } finally {
    f.close();
  }
  const keys = [
    "NODE_ENV",
    "VERCEL",
    "VERCEL_ENV",
    "ANALYTICS_STORAGE",
    "ANALYTICS_DATA_MODE",
    "TURSO_DATABASE_URL",
    "TURSO_AUTH_TOKEN",
    "ADMIN_PASSWORD_HASH",
    "ADMIN_SESSION_SECRET",
    "ANALYTICS_ID_SECRET",
    "ANALYTICS_ENABLED",
    "ANALYTICS_DEV_ENABLED",
    "ANALYTICS_PREVIEW_ENABLED",
  ];
  const before = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  try {
    keys.forEach((k) => delete process.env[k]);
    Object.assign(process.env, {
      NODE_ENV: "development",
      ANALYTICS_STORAGE: "turso",
      TURSO_DATABASE_URL: "libsql://analytics-test.turso.io",
      TURSO_AUTH_TOKEN: "x".repeat(64),
      ADMIN_PASSWORD_HASH: "hash",
      ADMIN_SESSION_SECRET: "s".repeat(64),
      ANALYTICS_ID_SECRET: "i".repeat(64),
      ANALYTICS_ENABLED: "true",
      ANALYTICS_DEV_ENABLED: "true",
    });
    assert.equal(analyticsConfig().source, "turso-test");
    assert.equal(trackingEnabled(), true);
    for (const url of [
      "http://analytics-test.turso.io",
      "https://evil.example",
      "https://x.turso.io?q=secret",
      "https://user:password@x.turso.io",
      "https://x.turso.io/not-root",
    ])
      assert.throws(() => tursoConnection(url, "t".repeat(64)));
    process.env.ANALYTICS_DATA_MODE = "production";
    assert.equal(trackingEnabled(), false);
    Object.assign(process.env, { NODE_ENV: "production" });
    process.env.VERCEL = "1";
    process.env.VERCEL_ENV = "preview";
    assert.equal(trackingEnabled(), false);
    process.env.ANALYTICS_DATA_MODE = "test";
    assert.equal(trackingEnabled(), false);
    process.env.ANALYTICS_PREVIEW_ENABLED = "true";
    assert.equal(trackingEnabled(), true);
    process.env.VERCEL_ENV = "production";
    assert.equal(trackingEnabled(), false);
    process.env.ANALYTICS_DATA_MODE = "production";
    assert.equal(analyticsConfig().source, "production");
    assert.equal(trackingEnabled(), true);
    process.env.ANALYTICS_STORAGE = "local-sqlite";
    assert.equal(trackingEnabled(), false);
    delete process.env.TURSO_AUTH_TOKEN;
    process.env.ANALYTICS_STORAGE = "turso";
    assert.equal(trackingEnabled(), false);
  } finally {
    for (const k of keys) {
      if (before[k] === undefined) delete process.env[k];
      else process.env[k] = before[k];
    }
  }
});
