import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";
import { mkdirSync, chmodSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { analyticsConfig } from "./config";
import {
  InvalidEvent,
  MissingPageView,
  type AnalyticsRepository,
} from "./repository";
import type {
  CollectEvent,
  Device,
  PageView,
  VisitSession,
  Activity,
  Snapshot,
} from "./types";

const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;
CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY,visitor TEXT NOT NULL,started INTEGER NOT NULL,lastActivity INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS sessions_visitor ON sessions(visitor,lastActivity);
CREATE TABLE IF NOT EXISTS views(id TEXT PRIMARY KEY,visitor TEXT NOT NULL,session TEXT NOT NULL REFERENCES sessions(id),path TEXT NOT NULL,name TEXT NOT NULL,started INTEGER NOT NULL,region TEXT NOT NULL,device TEXT NOT NULL,ended INTEGER,tab TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS views_time ON views(started);
CREATE INDEX IF NOT EXISTS views_path_time ON views(path,started);
CREATE INDEX IF NOT EXISTS views_session ON views(session);
CREATE TABLE IF NOT EXISTS events(id TEXT PRIMARY KEY,view TEXT NOT NULL REFERENCES views(id),sequence INTEGER NOT NULL,UNIQUE(view,sequence));
CREATE TABLE IF NOT EXISTS activities(view TEXT NOT NULL REFERENCES views(id),session TEXT NOT NULL REFERENCES sessions(id),start INTEGER NOT NULL,end INTEGER NOT NULL,UNIQUE(view,start,end));
CREATE INDEX IF NOT EXISTS activity_session ON activities(session,start);
CREATE TABLE IF NOT EXISTS admin_sessions(digest TEXT PRIMARY KEY,expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS rate_limits(key TEXT PRIMARY KEY,count INTEGER NOT NULL,resetAt INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS timing_quality(view TEXT PRIMARY KEY REFERENCES views(id));
PRAGMA user_version = 1;`;

export class SqliteAnalyticsRepository implements AnalyticsRepository {
  private db: DatabaseSync;
  constructor(file: string) {
    if (file !== ":memory:")
      mkdirSync(dirname(resolve(file)), { recursive: true, mode: 0o700 });
    this.db = new DatabaseSync(file);
    this.db.exec(SCHEMA);
    if (file !== ":memory:") chmodSync(file, 0o600);
  }
  close() {
    this.db.close();
  }
  private transaction<T>(fn: () => T): T {
    this.db.exec("BEGIN IMMEDIATE");
    try {
      const value = fn();
      this.db.exec("COMMIT");
      return value;
    } catch (error) {
      this.db.exec("ROLLBACK");
      throw error;
    }
  }
  ingest(
    event: CollectEvent,
    visitor: string,
    name: string,
    region: string,
    device: Device,
    now: number,
  ) {
    this.transaction(() => {
      if (
        this.db.prepare("SELECT 1 FROM events WHERE id=?").get(event.event_id)
      )
        return;
      let view = this.db
        .prepare("SELECT * FROM views WHERE id=?")
        .get(event.page_view_id) as (PageView & { tab: string }) | undefined;
      if (
        view &&
        (view.visitor !== visitor ||
          view.path !== event.path ||
          view.tab !== event.tab_id)
      )
        throw new InvalidEvent("Identity mismatch");
      if (event.type === "page_view" && !view) {
        const previous = this.db
          .prepare(
            "SELECT * FROM sessions WHERE visitor=? AND lastActivity>=? ORDER BY lastActivity DESC LIMIT 1",
          )
          .get(visitor, now - 1800000) as VisitSession | undefined;
        const session = previous?.id || randomUUID();
        if (!previous)
          this.db
            .prepare("INSERT INTO sessions VALUES(?,?,?,?)")
            .run(session, visitor, now, now);
        else
          this.db
            .prepare("UPDATE sessions SET lastActivity=? WHERE id=?")
            .run(now, session);
        this.db
          .prepare("INSERT INTO views VALUES(?,?,?,?,?,?,?,?,NULL,?)")
          .run(
            event.page_view_id,
            visitor,
            session,
            event.path,
            name,
            now,
            region,
            device,
            event.tab_id,
          );
        view = {
          id: event.page_view_id,
          visitor,
          session,
          path: event.path,
          name,
          started: now,
          region,
          device,
          ended: null,
          tab: event.tab_id,
        };
      }
      if (!view) throw new MissingPageView("Page view must arrive first");
      if (event.type !== "page_view" && now - view.started > 86400000)
        throw new InvalidEvent("Visit too old");
      const inserted = this.db
        .prepare("INSERT OR IGNORE INTO events VALUES(?,?,?)")
        .run(event.event_id, view.id, event.sequence);
      if (!inserted.changes) return;
      for (const [startOffset, endOffset] of event.intervals) {
        const start = view.started + startOffset;
        const end = Math.min(
          view.started + endOffset,
          now,
          view.ended ?? Infinity,
        );
        if (end > start)
          this.db
            .prepare("INSERT OR IGNORE INTO activities VALUES(?,?,?,?)")
            .run(view.id, view.session, start, end);
      }
      if (event.type === "page_end") {
        const end = Math.min(view.started + event.elapsed_ms, now);
        this.db
          .prepare("UPDATE views SET ended=MIN(COALESCE(ended,?),?) WHERE id=?")
          .run(end, end, view.id);
        this.db
          .prepare("DELETE FROM activities WHERE view=? AND start>=?")
          .run(view.id, end);
        this.db
          .prepare(
            "UPDATE OR IGNORE activities SET end=MIN(end,?) WHERE view=? AND end>?",
          )
          .run(end, view.id, end);
        this.db
          .prepare("DELETE FROM activities WHERE view=? AND end>?")
          .run(view.id, end);
      }
      // A heartbeat with no effective interval never extends an idle session.
      const last = Math.max(
        view.started,
        ...event.intervals.map((i) =>
          Math.min(view!.started + i[1], now, view!.ended ?? Infinity),
        ),
      );
      this.db
        .prepare(
          "UPDATE sessions SET lastActivity=MAX(lastActivity,?) WHERE id=?",
        )
        .run(last, view.session);
    });
  }
  snapshot(from: number, to: number): Snapshot {
    return this.transaction(() => {
      const sessions = this.db
        .prepare(
          "SELECT * FROM sessions WHERE started>=? AND started<? ORDER BY started",
        )
        .all(from, to) as VisitSession[];
      // Include views of sessions starting in range; page visits before range can contribute to site duration.
      const views = this.db
        .prepare(
          "SELECT * FROM views WHERE (started>=? AND started<?) OR session IN (SELECT id FROM sessions WHERE started>=? AND started<?) ORDER BY started,id",
        )
        .all(from, to, from, to) as PageView[];
      const activities = this.db
        .prepare("SELECT * FROM activities WHERE end>? AND start<?")
        .all(from, to) as Activity[];
      const first = this.db
        .prepare("SELECT MIN(started) AS value FROM views")
        .get() as { value: number | null };
      const invalidTimingViews = (
        this.db.prepare("SELECT view FROM timing_quality").all() as {
          view: string;
        }[]
      ).map((r) => r.view);
      return {
        views,
        sessions,
        activities,
        firstCollected: first.value,
        invalidTimingViews,
      };
    });
  }
  reserveAttempt(key: string, limit: number, window: number, now: number) {
    return this.transaction(() => {
      this.db.prepare("DELETE FROM rate_limits WHERE resetAt<=?").run(now);
      this.db.prepare("DELETE FROM admin_sessions WHERE expires<=?").run(now);
      const row = this.db
        .prepare("SELECT * FROM rate_limits WHERE key=?")
        .get(key) as { count: number; resetAt: number } | undefined;
      if (row && row.count >= limit)
        return { allowed: false, resetAt: row.resetAt };
      if (row)
        this.db
          .prepare("UPDATE rate_limits SET count=count+1 WHERE key=?")
          .run(key);
      else
        this.db
          .prepare("INSERT INTO rate_limits VALUES(?,1,?)")
          .run(key, now + window);
      return { allowed: true, resetAt: row?.resetAt || now + window };
    });
  }
  clearAttempts(key: string) {
    this.db.prepare("DELETE FROM rate_limits WHERE key=?").run(key);
  }
  createAdminSession(digest: string, expires: number) {
    this.db
      .prepare("INSERT INTO admin_sessions VALUES(?,?)")
      .run(digest, expires);
  }
  hasAdminSession(digest: string, now: number) {
    return !!this.db
      .prepare("SELECT 1 FROM admin_sessions WHERE digest=? AND expires>?")
      .get(digest, now);
  }
  revokeAdminSession(digest: string) {
    this.db.prepare("DELETE FROM admin_sessions WHERE digest=?").run(digest);
  }
  markInvalidTiming(view: string, visitor: string) {
    this.db
      .prepare(
        "INSERT OR IGNORE INTO timing_quality SELECT id FROM views WHERE id=? AND visitor=?",
      )
      .run(view, visitor);
  }
}

const localGlobal = globalThis as typeof globalThis & {
  privateAnalyticsStore?: { file: string; repo: SqliteAnalyticsRepository };
};
export function analyticsRepository(): AnalyticsRepository {
  const { file } = analyticsConfig();
  if (localGlobal.privateAnalyticsStore?.file !== file) {
    localGlobal.privateAnalyticsStore?.repo.close();
    localGlobal.privateAnalyticsStore = {
      file,
      repo: new SqliteAnalyticsRepository(file),
    };
  }
  return localGlobal.privateAnalyticsStore.repo;
}
