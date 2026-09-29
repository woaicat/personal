import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  aggregate,
  dateBoundary,
  dateLabel,
  DAY,
  durationBucket,
  normalizePath,
  parseQuery,
  unionDuration,
} from "../../lib/private-analytics/aggregate";
import { analyticsConfig } from "../../lib/private-analytics/config";
import { SqliteAnalyticsRepository } from "../../lib/private-analytics/sqlite";
import {
  hashPassword,
  verifyPassword,
} from "../../lib/private-analytics/password";
import {
  validateEvent,
  deviceFromAgent,
} from "../../lib/private-analytics/validation";
import type {
  CollectEvent,
  AnalyticsQuery,
} from "../../lib/private-analytics/types";

const start = dateBoundary("2026-09-20");
function view(visitor: string = randomUUID(), path = "/"): CollectEvent {
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
const query: AnalyticsQuery = {
  from: start,
  to: start + 3 * DAY,
  path: null,
  granularity: "day",
  rankBy: "pv",
};

test("PV deduplication; whole-period UV is not a sum of page/day UV", () => {
  const db = new SqliteAnalyticsRepository(":memory:");
  try {
    const visitor = randomUUID();
    const a = view(visitor);
    const b = view(visitor, "/a");
    const c = view(visitor, "/a");
    db.ingest(a, visitor, "首页", "广东", "桌面端", start + 1000);
    db.ingest(a, visitor, "首页", "广东", "桌面端", start + 1000);
    db.ingest(
      { ...a, event_id: randomUUID() },
      visitor,
      "首页",
      "广东",
      "桌面端",
      start + 2000,
    );
    db.ingest(b, visitor, "A", "北京", "手机", start + 2000);
    db.ingest(c, visitor, "A", "北京", "手机", start + DAY + 1000);
    const snapshot = db.snapshot(query.from, query.to);
    const result = aggregate(snapshot, query, query.to);
    assert.deepEqual(result.summary, { uv: 1, pv: 3 });
    assert.deepEqual(
      result.trend.map((r) => r.uv),
      [1, 1, 0],
    );
    assert.equal(
      result.pageRanking.reduce((n, p) => n + p.uv, 0),
      2,
    );
    assert.deepEqual(result.regionDistribution, [{ name: "广东", count: 1 }]);
    assert.deepEqual(result.deviceDistribution, [{ name: "桌面端", count: 1 }]);
    const page = aggregate(snapshot, { ...query, path: "/a" }, query.to);
    assert.deepEqual(page.summary, { uv: 1, pv: 2 });
    assert.equal(page.pageRanking.length, 2);
    assert.deepEqual(page.regionDistribution, [{ name: "北京", count: 1 }]);
  } finally {
    db.close();
  }
});

test("Multiple tabs merge sessions; overlapping heartbeats use union and sequence deduplication", () => {
  const db = new SqliteAnalyticsRepository(":memory:");
  try {
    const visitor = randomUUID(),
      a = view(visitor),
      b = view(visitor, "/b");
    db.ingest(a, visitor, "首页", "未知", "桌面端", start);
    db.ingest(b, visitor, "B", "未知", "桌面端", start + 10000);
    const activity: CollectEvent = {
      ...a,
      type: "activity_batch",
      event_id: randomUUID(),
      sequence: 1,
      elapsed_ms: 50000,
      intervals: [[0, 50000]],
    };
    db.ingest(activity, visitor, "首页", "未知", "桌面端", start + 50000);
    db.ingest(
      { ...activity, event_id: randomUUID() },
      visitor,
      "首页",
      "未知",
      "桌面端",
      start + 55000,
    );
    db.ingest(
      {
        ...b,
        type: "activity_batch",
        event_id: randomUUID(),
        sequence: 1,
        elapsed_ms: 50000,
        intervals: [[0, 50000]],
      },
      visitor,
      "B",
      "未知",
      "桌面端",
      start + 60000,
    );
    const snapshot = db.snapshot(query.from, query.to);
    assert.equal(snapshot.sessions.length, 1);
    assert.equal(snapshot.activities.length, 2);
    assert.deepEqual(
      aggregate(snapshot, query, query.to).durationDistribution.map(
        (r) => r.count,
      ),
      [0, 1, 0, 0, 0],
    );
    assert.deepEqual(
      aggregate(
        snapshot,
        { ...query, path: "/b" },
        query.to,
      ).durationDistribution.map((r) => r.count),
      [1, 0, 0, 0, 0],
    );
    assert.throws(() =>
      db.ingest(
        {
          ...activity,
          visitor_id: randomUUID(),
          event_id: randomUUID(),
          sequence: 2,
        },
        "intruder",
        "首页",
        "未知",
        "桌面端",
        start + 60000,
      ),
    );
  } finally {
    db.close();
  }
});

test("Duration boundaries and clipped union", () => {
  assert.deepEqual(
    [0, 59.9, 60, 3599, 3600, 7199, 7200, 10799, 10800].map(durationBucket),
    [0, 0, 1, 1, 2, 2, 3, 3, 4],
  );
  assert.equal(
    unionDuration(
      [
        [0, 8000],
        [5000, 10000],
        [9000, 15000],
      ],
      2000,
      12000,
    ),
    10,
  );
});

test("Inactive heartbeat cannot keep a session alive; returning after 30 minutes creates a new visit", () => {
  const db = new SqliteAnalyticsRepository(":memory:");
  try {
    const visitor = randomUUID(),
      a = view(visitor);
    db.ingest(a, visitor, "首页", "未知", "手机", start);
    db.ingest(
      {
        ...a,
        type: "activity_batch",
        event_id: randomUUID(),
        sequence: 1,
        elapsed_ms: 1800000,
      },
      visitor,
      "首页",
      "未知",
      "手机",
      start + 1800000,
    );
    db.ingest(view(visitor), visitor, "首页", "未知", "手机", start + 1800001);
    const snapshot = db.snapshot(query.from, query.to);
    assert.equal(snapshot.sessions.length, 2);
    assert.equal(
      aggregate(snapshot, query, query.to).durationDistribution[0].count,
      2,
    );
  } finally {
    db.close();
  }
});

test("Beijing midnight; sessions attributed by start, clipped duration; late arrivals respect page end", () => {
  const db = new SqliteAnalyticsRepository(":memory:");
  try {
    const a = view();
    db.ingest(a, a.visitor_id, "首页", "未知", "手机", start - 20000);
    db.ingest(
      {
        ...a,
        type: "page_end",
        event_id: randomUUID(),
        sequence: 2,
        elapsed_ms: 90000,
      },
      a.visitor_id,
      "首页",
      "未知",
      "手机",
      start + 70000,
    );
    db.ingest(
      {
        ...a,
        type: "activity_batch",
        event_id: randomUUID(),
        sequence: 1,
        elapsed_ms: 100000,
        intervals: [[0, 100000]],
      },
      a.visitor_id,
      "首页",
      "未知",
      "手机",
      start + 90000,
    );
    const snapshot = db.snapshot(start - DAY, start + DAY);
    assert.equal(
      unionDuration(
        snapshot.activities.map((i) => [i.start, i.end]),
        start - DAY,
        start + DAY,
      ),
      90,
    );
    const currentDay = aggregate(
      snapshot,
      { ...query, to: start + DAY },
      start + DAY,
    );
    assert.equal(
      currentDay.durationDistribution.reduce((n, r) => n + r.count, 0),
      0,
    );
    assert.equal(dateLabel(Date.parse("2026-09-19T16:00:00Z")), "2026-09-20");
  } finally {
    db.close();
  }
});

test("Shared durable login rate limit, sessions revoked/expired, data survives reopening", () => {
  const directory = mkdtempSync(join(tmpdir(), "analytics-db-")),
    file = join(directory, "db.sqlite");
  const a = new SqliteAnalyticsRepository(file),
    b = new SqliteAnalyticsRepository(file);
  try {
    for (let i = 0; i < 5; i++)
      assert.equal(
        (i % 2 ? a : b).reserveAttempt("source", 5, 1000, start).allowed,
        true,
      );
    assert.equal(b.reserveAttempt("source", 5, 1000, start + 1).allowed, false);
    assert.equal(
      a.reserveAttempt("source", 5, 1000, start + 1000).allowed,
      true,
    );
    a.createAdminSession("digest", start + 5000);
    assert.equal(b.hasAdminSession("digest", start), true);
    b.revokeAdminSession("digest");
    assert.equal(a.hasAdminSession("digest", start), false);
    a.createAdminSession("expired", start);
    assert.equal(b.hasAdminSession("expired", start), false);
    const event = view();
    a.ingest(event, event.visitor_id, "首页", "未知", "未知", start);
    assert.equal(b.snapshot(start, start + DAY).views.length, 1);
  } finally {
    a.close();
    b.close();
    rmSync(directory, { recursive: true, force: true });
  }
});

test("Reject invalid IDs, payloads, private paths, bad intervals and impossible calendars", () => {
  const a = view();
  assert.deepEqual(validateEvent(a), a);
  for (const bad of [
    { ...a, visitor_id: "IP" },
    { ...a, path: "/admin" },
    { ...a, intervals: [[0, 1]] },
    {
      ...a,
      type: "activity_batch",
      sequence: 1,
      elapsed_ms: 20,
      intervals: [[10, 30]],
    },
  ])
    assert.throws(() => validateEvent(bad));
  assert.equal(normalizePath("/api/admin/analytics"), null);
  assert.equal(normalizePath("/a?q=secret"), null);
  assert.throws(() => dateBoundary("2026-02-30"));
  assert.throws(() =>
    parseQuery(
      new URLSearchParams("from=2026-09-22&to=2026-09-20"),
      null,
      start + 5 * DAY,
    ),
  );
  assert.equal(deviceFromAgent("Mozilla/5.0 (iPad)"), "平板");
  assert.equal(deviceFromAgent("Mozilla/5.0 (Windows NT 10.0)"), "桌面端");
});

test("Coarser buckets use distinct visitors; no zero history before collection; row totals reconcile", () => {
  const db = new SqliteAnalyticsRepository(":memory:");
  try {
    for (let i = 0; i < 4; i++)
      db.ingest(
        view("stable"),
        "stable",
        "首页",
        "未知",
        "未知",
        start + i * DAY + 1,
      );
    const snapshot = db.snapshot(start - 100 * DAY, start + 5 * DAY);
    const result = aggregate(
      snapshot,
      {
        ...query,
        from: start - 100 * DAY,
        to: start + 5 * DAY,
        granularity: "month",
      },
      start + 5 * DAY,
    );
    assert.equal(result.trend.length, 1);
    assert.equal(result.trend[0].uv, 1);
    assert.equal(result.summary.uv, 1);
    assert.equal(
      result.regionDistribution.reduce((n, r) => n + r.count, 0),
      result.summary.uv,
    );
    assert.equal(
      result.deviceDistribution.reduce((n, r) => n + r.count, 0),
      result.summary.uv,
    );
  } finally {
    db.close();
  }
});

test("Salted slow password hash verifies; wrong password and malformed config fail closed", async () => {
  const hash = await hashPassword("local-test-password-long");
  assert.equal(await verifyPassword("local-test-password-long", hash), true);
  assert.equal(await verifyPassword("wrong", hash), false);
  assert.equal(await verifyPassword("anything", "invalid"), false);
  assert.throws(() => analyticsConfig());
});

test("Invalid timing is excluded from duration rather than fabricated as a zero-second visit", () => {
  const db = new SqliteAnalyticsRepository(":memory:");
  try {
    const a = view();
    db.ingest(a, a.visitor_id, "首页", "未知", "手机", start);
    db.markInvalidTiming(a.page_view_id, "different-visitor");
    assert.equal(
      aggregate(db.snapshot(start, start + DAY), query).meta
        .invalidDurationVisits,
      0,
    );
    db.markInvalidTiming(a.page_view_id, a.visitor_id);
    const result = aggregate(db.snapshot(start, start + DAY), query);
    assert.equal(result.summary.pv, 1);
    assert.equal(result.meta.invalidDurationVisits, 1);
    assert.equal(
      result.durationDistribution.reduce((n, r) => n + r.count, 0),
      0,
    );
  } finally {
    db.close();
  }
});
