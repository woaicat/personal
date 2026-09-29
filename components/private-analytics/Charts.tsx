"use client";
import dynamic from "next/dynamic";
import type { AnalyticsResult, CountRow } from "@/lib/private-analytics/types";
import type { ChartOption } from "./EChart";

const EChart = dynamic(() => import("./EChart"), {
  ssr: false,
  loading: () => (
    <div className="admin-chart-loading" role="status">
      图表加载中…
    </div>
  ),
});
const BLUE = "#3288ff",
  GREEN = "#25b269";
const base: ChartOption = {
  animation: false,
  textStyle: {
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
    fontSize: 11,
    color: "#708198",
  },
  aria: { enabled: true },
  tooltip: {
    trigger: "axis",
    triggerOn: "mousemove|click|mousewheel",
    renderMode: "html",
    confine: true,
    className: "admin-chart-tooltip",
    backgroundColor: "#fff",
    borderColor: "#e1e7ef",
    borderWidth: 1,
    padding: [10, 14],
    textStyle: { color: "#30415a", fontSize: 12 },
    extraCssText:
      "max-width:300px;white-space:pre-line;overflow-wrap:anywhere;box-shadow:0 6px 24px rgba(28,45,72,.12);border-radius:8px;",
    valueFormatter: (value) =>
      typeof value === "number" ? value.toLocaleString("zh-CN") : String(value),
    axisPointer: {
      type: "line",
      lineStyle: { color: "#ccd8e8", type: "dashed" },
    },
  },
};
const numericAxis = {
  type: "value" as const,
  min: 0,
  minInterval: 1,
  splitNumber: 4,
  axisLine: { show: false },
  axisTick: { show: false },
  splitLine: { lineStyle: { color: "#edf1f6" } },
};
const categoryAxis = {
  type: "category" as const,
  axisLine: { lineStyle: { color: "#d5deeb" } },
  axisTick: { show: false },
  axisLabel: { color: "#708198" },
};

export function Legend() {
  return (
    <span className="admin-legend">
      <span>
        <i className="blue" />
        UV
      </span>
      <span>
        <i className="green" />
        PV
      </span>
    </span>
  );
}
export function TrendChart({ rows }: { rows: AnalyticsResult["trend"] }) {
  if (!rows.length) return <EmptyChart text="此时间段尚无采集记录" />;
  const option: ChartOption = {
    ...base,
    grid: { left: 12, right: 20, top: 30, bottom: 15, containLabel: true },
    xAxis: {
      ...categoryAxis,
      boundaryGap: true,
      data: rows.map((r) => r.date),
      axisLabel: {
        formatter: (date: string) => date.slice(5),
        hideOverlap: true,
      },
    },
    yAxis: numericAxis,
    series: (["uv", "pv"] as const).map((metric) => ({
      name: metric.toUpperCase(),
      type: "line",
      data: rows.map((r) => r[metric]),
      showSymbol: rows.length <= 60,
      symbol: "circle",
      symbolSize: 7,
      itemStyle: { color: metric === "uv" ? BLUE : GREEN },
      lineStyle: { width: 2.5 },
      ...(rows.length > 1 ? { areaStyle: { opacity: 0.04 } } : {}),
      emphasis: { focus: "series" },
    })),
  };
  return (
    <>
      <EChart
        option={option}
        label="访问趋势，悬浮查看日期及UV/PV"
        height={260}
      />
      <details className="admin-data-table">
        <summary>查看趋势数据</summary>
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>UV</th>
              <th>PV</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.date}>
                <td>{r.date}</td>
                <td>{r.uv}</td>
                <td>{r.pv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </>
  );
}
export function EmptyChart({
  text = "所选时间段暂无访问数据",
}: {
  text?: string;
}) {
  return <div className="admin-chart-empty">{text}</div>;
}
export function RankingChart({
  rows,
}: {
  rows: AnalyticsResult["pageRanking"];
}) {
  if (!rows.length) return <EmptyChart />;
  const option: ChartOption = {
    ...base,
    grid: { left: 5, right: 40, top: 10, bottom: 20, containLabel: true },
    xAxis: numericAxis,
    yAxis: {
      ...categoryAxis,
      inverse: true,
      data: rows.map((r) => `${r.name}\n${r.path}`),
      axisLabel: {
        width: 105,
        overflow: "truncate",
        formatter: (value: string) => value.split("\n")[0],
      },
    },
    series: (["uv", "pv"] as const).map((metric) => ({
      name: metric.toUpperCase(),
      type: "bar",
      data: rows.map((r) => r[metric]),
      barMaxWidth: 12,
      itemStyle: {
        color: metric === "uv" ? BLUE : GREEN,
        borderRadius: [0, 2, 2, 0],
      },
      label: { show: true, position: "right", fontSize: 10, color: "#596983" },
      emphasis: { focus: "series" },
    })),
  };
  return (
    <div className="admin-chart-scroll">
      <EChart
        option={option}
        label="页面访问排行榜，悬浮查看页面路径及UV/PV"
        height={Math.max(230, rows.length * 54 + 40)}
      />
    </div>
  );
}
export function DistributionChart({
  rows,
  horizontal = false,
  color = "green",
  unit = "访客数 UV",
}: {
  rows: CountRow[];
  horizontal?: boolean;
  color?: "blue" | "green";
  unit?: string;
}) {
  if (!rows.some((r) => r.count > 0)) return <EmptyChart />;
  const categories = rows.map((r) => r.name);
  const option: ChartOption = {
    ...base,
    grid: {
      left: 5,
      right: horizontal ? 35 : 10,
      top: 28,
      bottom: 15,
      containLabel: true,
    },
    xAxis: horizontal
      ? numericAxis
      : {
          ...categoryAxis,
          data: categories,
          axisLabel: {
            interval: 0,
            formatter: (value: string) => value.replace("–", "\n–"),
            fontSize: 10,
          },
        },
    yAxis: horizontal
      ? {
          ...categoryAxis,
          data: categories,
          inverse: true,
          axisLabel: { width: 85, overflow: "truncate" },
        }
      : numericAxis,
    series: [
      {
        name: unit,
        type: "bar",
        data: rows.map((r) => r.count),
        barMaxWidth: horizontal ? 14 : 44,
        itemStyle: {
          color: color === "blue" ? BLUE : GREEN,
          borderRadius: horizontal ? [0, 2, 2, 0] : [2, 2, 0, 0],
        },
        label: {
          show: true,
          position: horizontal ? "right" : "top",
          fontSize: 10,
          color: "#596983",
        },
      },
    ],
  };
  const chart = (
    <EChart
      option={option}
      label={`${unit}分布，悬浮查看分类和数量`}
      height={horizontal ? Math.max(230, rows.length * 35 + 45) : 245}
    />
  );
  return horizontal ? <div className="admin-chart-scroll">{chart}</div> : chart;
}
