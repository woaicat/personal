import type {
  AnalyticsQuery,
  AnalyticsResult,
  Interval,
  Snapshot,
} from "./types";

export const DAY = 86400000;
const OFFSET = 8 * 3600000;
export function dateLabel(time: number) {
  return new Date(time + OFFSET).toISOString().slice(0, 10);
}
export function dateBoundary(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Invalid date");
  const value = Date.parse(`${date}T00:00:00+08:00`);
  if (!Number.isFinite(value) || dateLabel(value) !== date)
    throw new Error("Invalid date");
  return value;
}
function bucketStart(time: number, granularity: AnalyticsQuery["granularity"]) {
  const date = new Date(time + OFFSET);
  date.setUTCHours(0, 0, 0, 0);
  if (granularity === "week")
    date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  if (granularity === "month") date.setUTCDate(1);
  return date.getTime() - OFFSET;
}
function nextBucket(time: number, granularity: AnalyticsQuery["granularity"]) {
  if (granularity !== "month")
    return time + DAY * (granularity === "week" ? 7 : 1);
  const date = new Date(time + OFFSET);
  date.setUTCMonth(date.getUTCMonth() + 1);
  return date.getTime() - OFFSET;
}
export function unionDuration(intervals: Interval[], from: number, to: number) {
  const clipped = intervals
    .map(
      ([start, end]) => [Math.max(start, from), Math.min(end, to)] as Interval,
    )
    .filter(([start, end]) => end > start)
    .sort((a, b) => a[0] - b[0]);
  let total = 0,
    lastEnd = -Infinity;
  for (const [start, end] of clipped) {
    total += Math.max(0, end - Math.max(start, lastEnd));
    lastEnd = Math.max(lastEnd, end);
  }
  return total / 1000;
}
export function durationBucket(seconds: number) {
  return seconds < 60
    ? 0
    : seconds < 3600
      ? 1
      : seconds < 7200
        ? 2
        : seconds < 10800
          ? 3
          : 4;
}

export function aggregate(
  snapshot: Snapshot,
  query: AnalyticsQuery,
  now = Date.now(),
): AnalyticsResult {
  const { from, to, path, granularity } = query;
  const inRange = snapshot.views.filter(
    (v) => v.started >= from && v.started < to,
  );
  const selected = inRange.filter((v) => !path || v.path === path);
  const visitors = new Set(selected.map((v) => v.visitor));
  const ranking = new Map<
    string,
    { path: string; name: string; pv: number; visitors: Set<string> }
  >();
  for (const view of inRange) {
    const row = ranking.get(view.path) || {
      path: view.path,
      name: view.name,
      pv: 0,
      visitors: new Set<string>(),
    };
    row.pv++;
    row.visitors.add(view.visitor);
    ranking.set(view.path, row);
  }
  const trendMap = new Map<
    number,
    { date: string; pv: number; visitors: Set<string> }
  >();
  // Do not draw fabricated historical zeroes before collection began.
  if (snapshot.firstCollected !== null && snapshot.firstCollected < to) {
    for (
      let t = bucketStart(Math.max(from, snapshot.firstCollected), granularity);
      t < to;
      t = nextBucket(t, granularity)
    ) {
      if (trendMap.size >= 400) throw new Error("Choose a coarser granularity");
      trendMap.set(t, {
        date: dateLabel(
          Math.max(t, from, dateBoundary(dateLabel(snapshot.firstCollected))),
        ),
        pv: 0,
        visitors: new Set<string>(),
      });
    }
  }
  for (const view of selected) {
    const bucket = trendMap.get(bucketStart(view.started, granularity));
    if (bucket) {
      bucket.pv++;
      bucket.visitors.add(view.visitor);
    }
  }
  const durationDistribution = [
    "<1分钟",
    "1分钟–<1小时",
    "1–<2小时",
    "2–<3小时",
    "≥3小时",
  ].map((name) => ({ name, count: 0 }));
  const intervals = new Map<string, Interval[]>();
  for (const activity of snapshot.activities) {
    const key = path ? activity.view : activity.session;
    const row = intervals.get(key) || [];
    row.push([activity.start, activity.end]);
    intervals.set(key, row);
  }
  const visits = path
    ? selected
    : snapshot.sessions.filter((s) => s.started >= from && s.started < to);
  const invalidViews = new Set(snapshot.invalidTimingViews || []);
  const invalidVisits = path
    ? invalidViews
    : new Set(
        snapshot.views
          .filter((v) => invalidViews.has(v.id))
          .map((v) => v.session),
      );
  let invalidDurationVisits = 0;
  for (const visit of visits) {
    if (invalidVisits.has(visit.id)) {
      invalidDurationVisits++;
      continue;
    }
    durationDistribution[
      durationBucket(
        unionDuration(intervals.get(visit.id) || [], from, Math.min(to, now)),
      )
    ].count++;
  }
  const regions = new Map<string, number>(),
    devices = new Map<string, number>(),
    seen = new Set<string>();
  for (const view of selected) {
    if (seen.has(view.visitor)) continue;
    seen.add(view.visitor);
    regions.set(view.region, (regions.get(view.region) || 0) + 1);
    devices.set(view.device, (devices.get(view.device) || 0) + 1);
  }
  const distribution = (map: Map<string, number>) =>
    Array.from(map, ([name, count]) => ({ name, count })).sort(
      (a, b) => b.count - a.count || a.name.localeCompare(b.name),
    );
  const pageRanking = Array.from(ranking.values(), (row) => ({
    path: row.path,
    name: row.name,
    uv: row.visitors.size,
    pv: row.pv,
  })).sort(
    (a, b) => b[query.rankBy] - a[query.rankBy] || a.path.localeCompare(b.path),
  );
  return {
    summary: { uv: visitors.size, pv: selected.length },
    trend: Array.from(trendMap.values(), (row) => ({
      date: row.date,
      pv: row.pv,
      uv: row.visitors.size,
    })),
    pageRanking,
    durationDistribution,
    regionDistribution: distribution(regions),
    deviceDistribution: distribution(devices),
    pages: pageRanking.map(({ path: pagePath, name }) => ({
      path: pagePath,
      name,
    })),
    meta: {
      from,
      to,
      generatedAt: now,
      firstCollected: snapshot.firstCollected,
      granularity,
      local: true,
      durationUnit: path ? "页面访问次数" : "网站会话次数",
      invalidDurationVisits,
    },
  };
}

export function parseQuery(
  params: URLSearchParams,
  first: number | null,
  now = Date.now(),
): AnalyticsQuery {
  const from =
    params.get("from") === "all"
      ? dateBoundary(dateLabel(first ?? now))
      : dateBoundary(params.get("from") || dateLabel(now - 6 * DAY));
  const to = Math.min(
    dateBoundary(params.get("to") || dateLabel(now)) + DAY,
    now,
  );
  if (from >= to || from < dateBoundary("2020-01-01"))
    throw new Error("Invalid range");
  const scope = params.get("scope") || "site";
  const path = scope === "page" ? params.get("path") : null;
  if (
    !["page", "site"].includes(scope) ||
    (scope === "page" && (!path || !normalizePath(path)))
  )
    throw new Error("Invalid scope");
  const days = Math.ceil((to - from) / DAY);
  const granularity =
    params.get("granularity") ||
    (days <= 31 ? "day" : days <= 180 ? "week" : "month");
  const rankBy = params.get("rankBy") || "pv";
  if (
    !["day", "week", "month"].includes(granularity) ||
    !["pv", "uv"].includes(rankBy)
  )
    throw new Error("Invalid option");
  return {
    from,
    to,
    path,
    granularity: granularity as AnalyticsQuery["granularity"],
    rankBy: rankBy as AnalyticsQuery["rankBy"],
  };
}
export function normalizePath(path: string): string | null {
  if (
    path.length > 300 ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    /[?#\\\s\u0000-\u001f]/.test(path) ||
    path.includes("..") ||
    /^\/(admin|api|_next)(\/|$)/.test(path)
  )
    return null;
  if (path !== "/act.html" && /\.[a-z0-9]+$/i.test(path)) return null;
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}
