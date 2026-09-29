"use client";
import type { AnalyticsResult, CountRow } from "@/lib/private-analytics/types";

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
  const max = Math.max(1, ...rows.map((r) => r.pv));
  const ceiling = Math.ceil(max / 4) * 4;
  const x = (index: number) =>
    rows.length === 1 ? 525 : 55 + (index / (rows.length - 1)) * 930;
  const y = (value: number) => 230 - (value / ceiling) * 195;
  const line = (metric: "uv" | "pv") =>
    rows.map((r, i) => `${x(i)},${y(r[metric])}`).join(" ");
  return (
    <>
      <div className="admin-trend-plot">
        <svg
          viewBox="0 0 1020 275"
          role="img"
          aria-label="访问趋势，蓝色为UV，绿色为PV"
        >
          <title>访问趋势：可在下方展开完整数据表</title>
          {[0, 1, 2, 3, 4].map((tick) => (
            <g key={tick}>
              <line
                x1="55"
                x2="985"
                y1={y((tick * ceiling) / 4)}
                y2={y((tick * ceiling) / 4)}
                stroke="#e8edf3"
              />
              <text x="43" y={y((tick * ceiling) / 4) + 4} textAnchor="end">
                {(tick * ceiling) / 4}
              </text>
            </g>
          ))}
          {(["pv", "uv"] as const).map((metric) => (
            <g key={metric}>
              {rows.length > 1 ? (
                <polygon
                  points={`55,230 ${line(metric)} 985,230`}
                  fill={metric === "uv" ? "#2e87ff" : "#23ad68"}
                  opacity="0.04"
                />
              ) : null}
              <polyline
                points={line(metric)}
                fill="none"
                stroke={metric === "uv" ? "#2e87ff" : "#23ad68"}
                strokeWidth="2.5"
              />
              {rows.length <= 60
                ? rows.map((r, i) => (
                    <g key={r.date}>
                      <circle
                        cx={x(i)}
                        cy={y(r[metric])}
                        r="4"
                        fill={metric === "uv" ? "#2e87ff" : "#23ad68"}
                        stroke="white"
                        strokeWidth="1.5"
                      >
                        <title>
                          {r.date} · {metric}: {r[metric]}
                        </title>
                      </circle>
                      {rows.length <= 8 ? (
                        <text
                          className={metric}
                          x={x(i)}
                          y={y(r[metric]) - 10}
                          textAnchor="middle"
                        >
                          {r[metric]}
                        </text>
                      ) : null}
                    </g>
                  ))
                : null}
            </g>
          ))}
          {rows.map((r, i) =>
            i % Math.ceil(rows.length / 8) === 0 || i === rows.length - 1 ? (
              <text key={r.date} x={x(i)} y="258" textAnchor="middle">
                {r.date.slice(5)}
              </text>
            ) : null,
          )}
        </svg>
      </div>
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
  const max = Math.max(1, ...rows.map((r) => Math.max(r.pv, r.uv)));
  return (
    <div className="admin-ranking-scroll">
      {rows.map((row) => (
        <div className="admin-ranking-row" key={row.path}>
          <span
            className="admin-ranking-name"
            title={`${row.name}\n${row.path}`}
          >
            {row.name}
            <small>{row.path}</small>
          </span>
          <div className="admin-bar-pair">
            {(["uv", "pv"] as const).map((metric) => (
              <div className="admin-horizontal-row" key={metric}>
                <div
                  className={`admin-bar ${metric}`}
                  style={{ width: `${(row[metric] / max) * 84}%` }}
                  title={`${row.name} · ${metric.toUpperCase()}: ${row[metric]}`}
                />
                <span>{row[metric].toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export function DistributionChart({
  rows,
  horizontal = false,
  color = "green",
}: {
  rows: CountRow[];
  horizontal?: boolean;
  color?: "blue" | "green";
}) {
  if (!rows.some((r) => r.count > 0)) return <EmptyChart />;
  const max = Math.max(1, ...rows.map((r) => r.count));
  if (horizontal)
    return (
      <div className="admin-region-chart">
        {rows.map((row) => (
          <div className="admin-region-row" key={row.name}>
            <span>{row.name}</span>
            <div className="admin-horizontal-row">
              <div
                className={`admin-bar ${color}`}
                style={{ width: `${(row.count / max) * 84}%` }}
              />
              <span>{row.count.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    );
  return (
    <div className="admin-column-chart">
      {rows.map((row) => (
        <div className="admin-column" key={row.name}>
          <div className="admin-column-slot">
            <div
              className={`admin-column-bar ${color}`}
              style={{ height: `${(row.count / max) * 85}%` }}
              title={`${row.name}: ${row.count}`}
            >
              <span>{row.count.toLocaleString()}</span>
            </div>
          </div>
          <span className="admin-column-label">{row.name}</span>
        </div>
      ))}
    </div>
  );
}
