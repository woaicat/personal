"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  ExternalLink,
  LockKeyhole,
  LogOut,
  RefreshCw,
  UsersRound,
} from "lucide-react";
import { DAY, dateLabel } from "@/lib/private-analytics/aggregate";
import type { AnalyticsResult } from "@/lib/private-analytics/types";
import {
  DistributionChart,
  EmptyChart,
  Legend,
  RankingChart,
  TrendChart,
} from "./Charts";

const presets = [
  { name: "近7天", days: 7 },
  { name: "近1个月", days: 30 },
  { name: "近3个月", days: 90 },
  { name: "近半年", days: 180 },
  { name: "近一年", days: 365 },
  { name: "有史以来", days: 0 },
];
const number = (n: number) => n.toLocaleString("zh-CN");
export default function AnalyticsDashboard() {
  const [preset, setPreset] = useState(7),
    [from, setFrom] = useState(() => dateLabel(Date.now() - 6 * DAY)),
    [to, setTo] = useState(() => dateLabel(Date.now()));
  const [path, setPath] = useState(""),
    [search, setSearch] = useState(""),
    [grain, setGrain] = useState(""),
    [rankBy, setRankBy] = useState("pv"),
    [refresh, setRefresh] = useState(0);
  const [data, setData] = useState<AnalyticsResult | null>(null),
    [options, setOptions] = useState<AnalyticsResult["pages"]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [logoutError, setLogoutError] = useState("");
  const params = new URLSearchParams({
    from: preset === 0 ? "all" : from,
    to,
    scope: path ? "page" : "site",
    rankBy,
  });
  if (path) params.set("path", path);
  if (grain) params.set("granularity", grain);
  const query = params.toString();
  const invalidRange =
    preset !== 0 && (!from || !to || from > to || to > dateLabel(Date.now()));
  useEffect(() => {
    if (invalidRange) {
      setLoading(false);
      setData(null);
      setError("请选择有效时间段，结束日期不能晚于今天");
      return;
    }
    let disposed = false;
    let controller: AbortController | null = null;
    const load = async (initial = false) => {
      controller?.abort();
      controller = new AbortController();
      const activeController = controller;
      const timeout = setTimeout(
        () => activeController.abort("timeout"),
        10000,
      );
      if (initial) {
        setLoading(true);
        setData(null);
        setError("");
      }
      try {
        const response = await fetch(`/api/admin/analytics?${query}`, {
          signal: activeController.signal,
          cache: "no-store",
        });
        if (disposed || activeController !== controller) return;
        if (response.status === 401) {
          setData(null);
          window.location.replace("/admin/login");
          return;
        }
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || "统计数据暂时不可用");
        setData(body);
        setOptions(body.pages);
        setError("");
      } catch (failure) {
        if (!disposed && activeController === controller) {
          setData(null);
          setError(
            activeController.signal.reason === "timeout"
              ? "请求超时，请点击刷新重试"
              : failure instanceof Error
                ? failure.message
                : "统计数据暂时不可用",
          );
        }
      } finally {
        clearTimeout(timeout);
        if (!disposed && activeController === controller) setLoading(false);
      }
    };
    void load(true);
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, 30000);
    return () => {
      disposed = true;
      controller?.abort();
      clearInterval(timer);
    };
  }, [query, refresh, invalidRange]);
  function choosePreset(days: number) {
    setPreset(days);
    setGrain("");
    setTo(dateLabel(Date.now()));
    if (days) setFrom(dateLabel(Date.now() - (days - 1) * DAY));
  }
  async function logout() {
    setLogoutError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error();
      setData(null);
      window.location.replace("/admin/login");
    } catch {
      setLogoutError("退出失败，请重试");
    }
  }
  const selected = options.find((o) => o.path === path);
  const filteredOptions = options.filter(
    (o) =>
      o.path === path ||
      `${o.name} ${o.path}`.toLowerCase().includes(search.toLowerCase()),
  );
  if (path && !filteredOptions.some((o) => o.path === path))
    filteredOptions.unshift({ path, name: path });
  const scopeName = path ? selected?.name || path : "全站";
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-wordmark">
          jiaxuan
        </Link>
        <p>私人后台</p>
        <nav aria-label="后台导航">
          <Link href="/admin/analytics" aria-current="page">
            <BarChart3 size={19} />
            数据概览
          </Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/">
            <ExternalLink size={17} />
            打开主站
          </Link>
          <button onClick={logout}>
            <LogOut size={17} />
            退出登录
          </button>
          {logoutError ? (
            <p role="alert" className="admin-error">
              {logoutError}
            </p>
          ) : null}
        </div>
      </aside>
      <main className="admin-dashboard">
        <header className="admin-dashboard-header">
          <div>
            <h1>网站访问统计</h1>
            <p>了解流量趋势、页面表现与访客分布</p>
          </div>
          <div className="admin-status">
            <span>
              <LockKeyhole size={15} />
              仅管理员可见
            </span>
            <strong>
              {!data
                ? "等待数据"
                : data.meta.source === "production"
                  ? "生产数据"
                  : data.meta.source === "turso-test"
                    ? "云端测试数据"
                    : "本地测试数据"}
            </strong>
            <span>
              {data
                ? `更新于 ${new Date(data.meta.generatedAt).toLocaleTimeString("zh-CN", { timeZone: "Asia/Shanghai", hour: "2-digit", minute: "2-digit" })}`
                : "等待更新"}
            </span>
            <button
              aria-label="刷新统计数据"
              onClick={() => setRefresh((v) => v + 1)}
              disabled={loading}
            >
              <RefreshCw
                size={17}
                className={loading ? "admin-spinning" : ""}
              />
            </button>
          </div>
        </header>
        <section className="admin-panel admin-filters" aria-label="统计筛选">
          <div className="admin-presets">
            {presets.map((p) => (
              <button
                key={p.days}
                className={preset === p.days ? "active" : ""}
                aria-pressed={preset === p.days}
                onClick={() => choosePreset(p.days)}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="admin-filter-row">
            <label>
              开始日期
              <input
                aria-label="开始日期"
                type="date"
                min="2020-01-01"
                max={to}
                value={
                  preset === 0
                    ? data?.meta.firstCollected
                      ? dateLabel(data.meta.firstCollected)
                      : ""
                    : from
                }
                onChange={(e) => {
                  setFrom(e.target.value);
                  setPreset(-1);
                }}
              />
            </label>
            <span className="admin-date-dash">—</span>
            <label>
              结束日期
              <input
                aria-label="结束日期"
                type="date"
                min={preset === 0 ? undefined : from}
                max={dateLabel(Date.now())}
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setPreset(-1);
                }}
              />
            </label>
            <label className="admin-scope-select">
              统计范围
              <select
                aria-label="统计范围"
                value={path}
                onChange={(e) => setPath(e.target.value)}
              >
                <option value="">主站 · 全站</option>
                {filteredOptions.map((o) => (
                  <option key={o.path} value={o.path}>
                    {o.name}（{o.path}）
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-page-search">
              查找页面
              <input
                type="search"
                placeholder="搜索页面名称或路径"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
        </section>
        {error ? (
          <div className="admin-error-panel" role="alert">
            {error}
            <button onClick={() => setRefresh((v) => v + 1)}>重试</button>
          </div>
        ) : null}
        {loading ? (
          <div className="admin-loading" role="status">
            正在读取统计数据…
          </div>
        ) : null}
        {data ? (
          <>
            <section className="admin-kpis" aria-label="访问总览">
              <article className="admin-panel admin-kpi">
                <span className="admin-kpi-icon blue">
                  <UsersRound size={25} />
                </span>
                <div>
                  <h2>访客数 UV</h2>
                  <strong>{number(data.summary.uv)}</strong>
                  <p>所选时间内去重访客 · {scopeName}</p>
                </div>
              </article>
              <article className="admin-panel admin-kpi">
                <span className="admin-kpi-icon green">
                  <BarChart3 size={25} />
                </span>
                <div>
                  <h2>浏览量 PV</h2>
                  <strong>{number(data.summary.pv)}</strong>
                  <p>所选时间内页面浏览次数 · {scopeName}</p>
                </div>
              </article>
            </section>
            <section className="admin-panel admin-trend">
              <div className="admin-panel-heading">
                <h2>访问趋势</h2>
                <div>
                  <Legend />
                  <select
                    aria-label="趋势时间粒度"
                    value={grain}
                    onChange={(e) => setGrain(e.target.value)}
                  >
                    <option value="">
                      自动（按
                      {data.meta.granularity === "day"
                        ? "天"
                        : data.meta.granularity === "week"
                          ? "周"
                          : "月"}
                      ）
                    </option>
                    <option value="day">按天</option>
                    <option value="week">按周</option>
                    <option value="month">按月</option>
                  </select>
                </div>
              </div>
              <TrendChart rows={data.trend} />
            </section>
            <div className="admin-middle-grid">
              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <h2>页面访问排行榜</h2>
                    <p>仅显示有访问数据的页面 · 全站</p>
                  </div>
                  <select
                    aria-label="排行榜排序"
                    value={rankBy}
                    onChange={(e) => setRankBy(e.target.value)}
                  >
                    <option value="pv">按 PV 排序</option>
                    <option value="uv">按 UV 排序</option>
                  </select>
                </div>
                <div className="admin-rank-legend">
                  <small>仅受时间筛选影响</small>
                  <Legend />
                </div>
                <RankingChart rows={data.pageRanking} />
              </section>
              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <h2>单次访问时长分布</h2>
                    <p>统计单位：{data.meta.durationUnit}</p>
                  </div>
                </div>
                <DistributionChart
                  rows={data.durationDistribution}
                  unit={data.meta.durationUnit}
                />
                <p className="admin-chart-note">
                  按单次访问的有效停留时长统计，进行中的访问可能变化。
                  {data.meta.invalidDurationVisits > 0
                    ? ` 已排除 ${data.meta.invalidDurationVisits} 次计时异常访问。`
                    : ""}
                </p>
              </section>
            </div>
            <div className="admin-bottom-grid">
              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <h2>访客属地分布</h2>
                    <p>按 UV 统计 · IP 属地为估算信息</p>
                  </div>
                </div>
                <DistributionChart rows={data.regionDistribution} horizontal />
                <p className="admin-chart-note">
                  {data.meta.source === "local"
                    ? "本地演示属地可包含模拟记录，真实本地访问显示“未知”。"
                    : "属地为粗粒度估算；未解析到的信息归入“未知”。"}
                </p>
              </section>
              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <h2>访客设备分布</h2>
                    <p>按 UV 统计 · 每名访客取首次访问设备</p>
                  </div>
                </div>
                <DistributionChart
                  rows={data.deviceDistribution}
                  color="blue"
                />
              </section>
            </div>
            <footer className="admin-dashboard-footer">
              时间口径：北京时间 · 每30秒刷新 ·{" "}
              {data.meta.firstCollected
                ? `采集起点：${dateLabel(data.meta.firstCollected)}`
                : "尚未采集数据"}
              <br />
              去重访客为近似统计；仅计算可见、获得焦点且最近5分钟有活动的停留时间。
              {data.meta.source !== "production"
                ? "当前为测试数据，不进入正式统计。"
                : null}
            </footer>
          </>
        ) : !loading && !error ? (
          <EmptyChart />
        ) : null}
      </main>
    </div>
  );
}
