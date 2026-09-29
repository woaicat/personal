export type Interval = [number, number];
export type Device = "桌面端" | "手机" | "平板" | "未知";
export type CollectEvent = {
  schema_version: 1;
  type: "page_view" | "activity_batch" | "page_end";
  event_id: string;
  visitor_id: string;
  page_view_id: string;
  tab_id: string;
  path: string;
  client_time: number;
  elapsed_ms: number;
  sequence: number;
  intervals: Interval[];
};
export type PageView = {
  id: string;
  visitor: string;
  session: string;
  path: string;
  name: string;
  started: number;
  region: string;
  device: Device;
  ended: number | null;
};
export type VisitSession = {
  id: string;
  visitor: string;
  started: number;
  lastActivity: number;
};
export type Activity = {
  view: string;
  session: string;
  start: number;
  end: number;
};
export type Snapshot = {
  views: PageView[];
  sessions: VisitSession[];
  activities: Activity[];
  firstCollected: number | null;
  invalidTimingViews?: string[];
};
export type AnalyticsQuery = {
  from: number;
  to: number;
  path: string | null;
  granularity: "day" | "week" | "month";
  rankBy: "pv" | "uv";
};
export type CountRow = { name: string; count: number };
export type AnalyticsResult = {
  summary: { uv: number; pv: number };
  trend: { date: string; uv: number; pv: number }[];
  pageRanking: { path: string; name: string; uv: number; pv: number }[];
  durationDistribution: CountRow[];
  regionDistribution: CountRow[];
  deviceDistribution: CountRow[];
  pages: { path: string; name: string }[];
  meta: {
    from: number;
    to: number;
    generatedAt: number;
    firstCollected: number | null;
    granularity: string;
    local: boolean;
    durationUnit: string;
    invalidDurationVisits: number;
  };
};
