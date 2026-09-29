import { analyticsConfig } from "@/lib/private-analytics/config";
import { aggregate, parseQuery } from "@/lib/private-analytics/aggregate";
import { isAdmin } from "@/lib/private-analytics/auth";
import { analyticsRepository } from "@/lib/private-analytics/store";
import { json } from "@/lib/private-analytics/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    if (!(await isAdmin())) return json({ error: "请先登录" }, 401);
    const repository = await analyticsRepository();
    // First collection and filtered records must come from the same read snapshot.
    const params = new URL(request.url).searchParams;
    const now = Date.now();
    let query;
    try {
      query = parseQuery(params, null, now);
    } catch {
      return json({ error: "请选择有效的时间和统计范围" }, 400);
    }
    if (params.get("from") === "all") query.from = 0;
    const snapshot = await repository.snapshot(query.from, query.to);
    try {
      query = parseQuery(params, snapshot.firstCollected, now);
      const result = aggregate(snapshot, query, now);
      result.meta.source = analyticsConfig().source;
      result.meta.local = result.meta.source !== "production";
      return json(result);
    } catch {
      return json({ error: "时间范围过长或筛选无效，请调整统计粒度" }, 400);
    }
  } catch {
    return json({ error: "统计数据暂时不可用，请稍后重试" }, 503);
  }
}
