"use client";

import { useEffect, useRef } from "react";
import { init, use as registerCharts, type EChartsType } from "echarts/core";
import { LineChart, ScatterChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import styles from "./ScalingLaws.module.css";

registerCharts([LineChart, ScatterChart, GridComponent, LegendComponent, TooltipComponent, SVGRenderer]);

const steps = [1, 1.5, 2, 3, 5, 8, 10, 15, 20, 30, 50, 80, 100, 150, 200, 300, 500, 800, 1000];
const strategies = [
  { name: "小模型", color: "#a9b4b4", max: 1000, loss: (x: number) => 0.13 + 0.87 * Math.pow(x, -0.5) },
  { name: "中模型", color: "#6998b1", max: 300, loss: (x: number) => 0.08 + 0.68 * Math.pow(x, -0.6) },
  { name: "大模型", color: "#43845a", max: 100, loss: (x: number) => 0.035 + 0.43 * Math.pow(x, -0.65) }
];

export default function ComputeAllocationChart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const chart: EChartsType = init(container.current, undefined, { renderer: "svg" });
    chart.setOption({
      animationDuration: 400,
      grid: { left: 64, right: 145, top: 45, bottom: 60 },
      legend: { data: strategies.map((strategy) => strategy.name), orient: "vertical", top: 40, right: 5, itemWidth: 17, itemHeight: 3, itemGap: 12, textStyle: { color: "#718178", fontSize: 11 } },
      tooltip: {
        trigger: "item", backgroundColor: "#fbfcf9", borderColor: "#dbe6dd", textStyle: { color: "#202b25", fontSize: 12 },
        formatter: (item: { seriesName?: string; value?: [number, number] }) => item.value ? `${item.seriesName}<br/>相对步数 ${item.value[0]} · 示意损失 ${Number(item.value[1]).toFixed(2)}` : ""
      },
      xAxis: {
        name: "训练步数（示意对数刻度）", nameLocation: "middle", nameGap: 35, nameTextStyle: { color: "#87958a", fontSize: 11 },
        type: "log", logBase: 10, min: 1, max: 1000,
        axisLine: { lineStyle: { color: "#a5b9aa" } }, axisTick: { show: false },
        splitLine: { lineStyle: { color: "#edf2ed" } }, axisLabel: { color: "#819087", fontSize: 11 }
      },
      yAxis: {
        name: "相对损失", nameLocation: "middle", nameRotate: 90, nameGap: 37, nameTextStyle: { color: "#87958a", fontSize: 11 },
        type: "log", logBase: 10, min: 0.01, max: 1,
        axisLine: { show: true, lineStyle: { color: "#a5b9aa" } }, axisTick: { show: false },
        splitLine: { lineStyle: { color: "#edf2ed" } }, axisLabel: { color: "#819087", fontSize: 11 }
      },
      series: strategies.flatMap((strategy) => [
        {
          name: strategy.name, type: "line", symbol: "circle", symbolSize: 4, showSymbol: true, smooth: true,
          data: steps.filter((step) => step <= strategy.max).map((step) => [step, strategy.loss(step)]),
          lineStyle: { color: strategy.color, width: strategy.max === 100 ? 3 : 2.4 },
          itemStyle: { color: strategy.color }, emphasis: { focus: "series" }
        },
        {
          name: `${strategy.name} · 固定预算停止点`, type: "scatter", symbolSize: strategy.max === 100 ? 13 : 9,
          data: [[strategy.max, strategy.loss(strategy.max)]],
          itemStyle: { color: strategy.color, borderColor: "#fff", borderWidth: 2 }, z: 5
        }
      ])
    });
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(container.current);
    return () => { observer.disconnect(); chart.dispose(); };
  }, []);

  return <div ref={container} className={styles.allocationChart} role="img" aria-label="示意图：同样计算预算下，小模型需要较多训练步数，中模型需要适中步数；2020 年论文所研究的设置中，大模型在较少步数处停止，测试损失更低。三条曲线均为机制示意，不是论文原始实验数据。" />;
}
