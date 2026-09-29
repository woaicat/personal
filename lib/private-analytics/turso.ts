import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import type { Client, InStatement, Transaction } from "@libsql/client";
import schema from "./schema.json";
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

// Only explicit setup scripts create tables. Runtime credentials do not manage databases.
export class TursoAnalyticsRepository implements AnalyticsRepository {
  private nextCleanup = 0;
  private cleanup: Promise<unknown> | undefined;
  constructor(private client: Client) {}
  close() {
    this.client.close();
  }
  async verifySchema() {
    const result = await this.client.execute(
      "SELECT version FROM analytics_schema WHERE id=1",
    );
    if (Number(result.rows[0]?.version) !== schema.version)
      throw new Error("Analytics schema has not been initialized");
  }
  private async write<T>(fn: (tx: Transaction) => Promise<T>): Promise<T> {
    let tx: Transaction | undefined;
    for (let attempt = 0; !tx; attempt++) {
      try {
        tx = await this.client.transaction("write");
      } catch (error) {
        // Retry only a lock failure before any writes, never an ambiguous commit.
        if (
          attempt >= 4 ||
          !(error instanceof Error) ||
          !("code" in error) ||
          error.code !== "SQLITE_BUSY"
        )
          throw error;
        await delay(25 * 2 ** attempt);
      }
    }
    try {
      const result = await fn(tx);
      if (!tx.closed) await tx.commit();
      return result;
    } catch (error) {
      try {
        await tx.rollback();
      } catch {
        /* Keep the original failure. */
      }
      throw error;
    } finally {
      tx.close();
    }
  }
  async ingest(
    event: CollectEvent,
    visitor: string,
    name: string,
    region: string,
    device: Device,
    now: number,
  ) {
    await this.write(async (tx) => {
      const [seen, stored] = await tx.batch([
        { sql: "SELECT 1 FROM events WHERE id=?", args: [event.event_id] },
        { sql: "SELECT * FROM views WHERE id=?", args: [event.page_view_id] },
      ]);
      if (seen.rows.length) {
        await tx.rollback();
        return;
      }
      let view = stored.rows[0] as unknown as
        | (PageView & { tab: string })
        | undefined;
      if (
        view &&
        (view.visitor !== visitor ||
          view.path !== event.path ||
          view.tab !== event.tab_id)
      )
        throw new InvalidEvent("Identity mismatch");
      if (event.type === "page_view" && !view) {
        const previous = (
          await tx.execute({
            sql: "SELECT * FROM sessions WHERE visitor=? AND lastActivity>=? ORDER BY lastActivity DESC LIMIT 1",
            args: [visitor, now - 1800000],
          })
        ).rows[0] as unknown as VisitSession | undefined;
        const session = previous?.id || randomUUID();
        await tx.batch([
          previous
            ? {
                sql: "UPDATE sessions SET lastActivity=MAX(lastActivity,?) WHERE id=?",
                args: [now, session],
              }
            : {
                sql: "INSERT INTO sessions VALUES(?,?,?,?)",
                args: [session, visitor, now, now],
              },
          {
            sql: "INSERT INTO views VALUES(?,?,?,?,?,?,?,?,NULL,?)",
            args: [
              event.page_view_id,
              visitor,
              session,
              event.path,
              name,
              now,
              region,
              device,
              event.tab_id,
            ],
          },
        ]);
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
      const inserted = await tx.execute({
        sql: "INSERT OR IGNORE INTO events VALUES(?,?,?)",
        args: [event.event_id, view.id, event.sequence],
      });
      if (!inserted.rowsAffected) {
        await tx.rollback();
        return;
      }
      const statements: InStatement[] = [];
      for (const [a, b] of event.intervals) {
        const start = view.started + a,
          end = Math.min(view.started + b, now, view.ended ?? Infinity);
        if (end > start)
          statements.push({
            sql: "INSERT OR IGNORE INTO activities VALUES(?,?,?,?)",
            args: [view.id, view.session, start, end],
          });
      }
      if (event.type === "page_end") {
        const end = Math.min(view.started + event.elapsed_ms, now);
        statements.push(
          {
            sql: "UPDATE views SET ended=MIN(COALESCE(ended,?),?) WHERE id=?",
            args: [end, end, view.id],
          },
          {
            sql: "DELETE FROM activities WHERE view=? AND start>=?",
            args: [view.id, end],
          },
          {
            sql: "UPDATE OR IGNORE activities SET end=MIN(end,?) WHERE view=? AND end>?",
            args: [end, view.id, end],
          },
          {
            sql: "DELETE FROM activities WHERE view=? AND end>?",
            args: [view.id, end],
          },
        );
      }
      const last = Math.max(
        view.started,
        ...event.intervals.map((i) =>
          Math.min(view!.started + i[1], now, view!.ended ?? Infinity),
        ),
      );
      statements.push({
        sql: "UPDATE sessions SET lastActivity=MAX(lastActivity,?) WHERE id=?",
        args: [last, view.session],
      });
      await tx.batch(statements);
    });
  }
  async snapshot(from: number, to: number): Promise<Snapshot> {
    // One read transaction: first collection and every chart see the same snapshot.
    const [sessions, views, activities, first, invalid] =
      await this.client.batch(
        [
          {
            sql: "SELECT * FROM sessions WHERE started>=? AND started<? ORDER BY started",
            args: [from, to],
          },
          {
            sql: "SELECT * FROM views WHERE (started>=? AND started<?) OR session IN (SELECT id FROM sessions WHERE started>=? AND started<?) ORDER BY started,id",
            args: [from, to, from, to],
          },
          {
            sql: "SELECT * FROM activities WHERE end>? AND start<?",
            args: [from, to],
          },
          "SELECT MIN(started) AS value FROM views",
          "SELECT view FROM timing_quality",
        ],
        "read",
      );
    return {
      sessions: sessions.rows as unknown as VisitSession[],
      views: views.rows as unknown as PageView[],
      activities: activities.rows as unknown as Activity[],
      firstCollected:
        first.rows[0]?.value === null ? null : Number(first.rows[0]?.value),
      invalidTimingViews: invalid.rows.map((r) => String(r.view)),
    };
  }
  async reserveAttempt(
    key: string,
    limit: number,
    window: number,
    now: number,
  ) {
    if (now >= this.nextCleanup && !this.cleanup) {
      this.cleanup = this.client
        .batch(
          [
            { sql: "DELETE FROM rate_limits WHERE resetAt<=?", args: [now] },
            { sql: "DELETE FROM admin_sessions WHERE expires<=?", args: [now] },
          ],
          "write",
        )
        .then(() => {
          this.nextCleanup = now + 3600000;
        });
    }
    if (this.cleanup) {
      try {
        await this.cleanup;
      } finally {
        this.cleanup = undefined;
      }
    }
    // A single conditional UPSERT is atomic across concurrent serverless instances.
    const result = await this.client.execute({
      sql: `INSERT INTO rate_limits VALUES(?,1,?)
        ON CONFLICT(key) DO UPDATE SET
          count=CASE WHEN rate_limits.resetAt<=? THEN 1 ELSE rate_limits.count+1 END,
          resetAt=CASE WHEN rate_limits.resetAt<=? THEN ? ELSE rate_limits.resetAt END
        WHERE rate_limits.resetAt<=? OR rate_limits.count<? RETURNING resetAt`,
      args: [key, now + window, now, now, now + window, now, limit],
    });
    if (result.rows.length)
      return { allowed: true, resetAt: Number(result.rows[0].resetAt) };
    const row = (
      await this.client.execute({
        sql: "SELECT resetAt FROM rate_limits WHERE key=?",
        args: [key],
      })
    ).rows[0];
    return {
      allowed: false,
      resetAt: row ? Number(row.resetAt) : now + window,
    };
  }
  async clearAttempts(key: string) {
    await this.client.execute({
      sql: "DELETE FROM rate_limits WHERE key=?",
      args: [key],
    });
  }
  async createAdminSession(digest: string, expires: number) {
    await this.client.execute({
      sql: "INSERT INTO admin_sessions VALUES(?,?)",
      args: [digest, expires],
    });
  }
  async hasAdminSession(digest: string, now: number) {
    return (
      (
        await this.client.execute({
          sql: "SELECT 1 FROM admin_sessions WHERE digest=? AND expires>?",
          args: [digest, now],
        })
      ).rows.length > 0
    );
  }
  async revokeAdminSession(digest: string) {
    await this.client.execute({
      sql: "DELETE FROM admin_sessions WHERE digest=?",
      args: [digest],
    });
  }
  async markInvalidTiming(view: string, visitor: string) {
    await this.client.execute({
      sql: "INSERT OR IGNORE INTO timing_quality SELECT id FROM views WHERE id=? AND visitor=?",
      args: [view, visitor],
    });
  }
}
