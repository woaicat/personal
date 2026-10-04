"use client";

import { useEffect, useRef } from "react";
import { init, use as registerCharts, type EChartsType } from "echarts/core";
import { LineChart, ScatterChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

registerCharts([LineChart, ScatterChart, GridComponent, TooltipComponent, SVGRenderer]);

export type ScaleKey = "N" | "D" | "C";

export const scaleFactors: Record<ScaleKey, { label: string; alpha: number; color: string }> = {
  N: { label: "模型参数 N", alpha: 0.076, color: "#3e6c54" },
  D: { label: "训练数据 D", alpha: 0.095, color: "#6692a3" },
  C: { label: "最优训练算力 Cₘᵢₙ", alpha: 0.050, color: "#c6925c" }
};

const xValues = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 5000, 10000];

export function relativeLoss(key: ScaleKey, multiplier: number) {
  return Math.pow(multiplier, -scaleFactors[key].alpha);
}

export default function ScalingLawsChart({
  selected,
  multipliers,
  compact = false
}: {
  selected: ScaleKey;
  multipliers: Record<ScaleKey, number>;
  compact?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<EChartsType | null>(null);

  useEffect(() => {
    if (!container.current) return;
    const instance = init(container.current, undefined, { renderer: "svg" });
    chart.current = instance;
    const observer = new ResizeObserver(() => instance.resize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      chart.current = null;
      instance.dispose();
    };
  }, []);

  useEffect(() => {
    const keys: ScaleKey[] = compact ? ["N"] : ["N", "D", "C"];
    chart.current?.setOption({
      animationDuration: 450,
      grid: compact ? { left: 20, right: 12, top: 18, bottom: 16 } : { left: 64, right: 22, top: 22, bottom: 48 },
      tooltip: compact ? { show: false } : {
        trigger: "item",
        backgroundColor: "#fbfcf9",
        borderColor: "#dbe6dd",
        textStyle: { color: "#202b25", fontSize: 12 },
        formatter: (item: { seriesName?: string; value?: [number, number] }) => {
          const value = item.value;
          return value ? `${item.seriesName ?? ""}<br/>规模 ${Number(value[0]).toLocaleString()} 倍 · 相对损失 ${Number(value[1]).toFixed(2)}` : "";
        }
      },
      xAxis: {
        type: "log", logBase: 10, min: 1, max: 10000,
        axisLine: { lineStyle: { color: "#a8b8ac" } },
        axisTick: { show: false },
        splitLine: { show: !compact, lineStyle: { color: "#edf2ed" } },
        axisLabel: { show: !compact, color: "#7a887d", formatter: (value: number) => `${value}×`, fontSize: 11 }
      },
      yAxis: {
        type: "log", logBase: 10, min: 0.4, max: 1,
        axisLine: { show: !compact, lineStyle: { color: "#a8b8ac" } },
        axisTick: { show: false },
        splitLine: { show: !compact, lineStyle: { color: "#edf2ed" } },
        axisLabel: { show: !compact, color: "#7a887d", formatter: (value: number) => value.toFixed(1), fontSize: 11 }
      },
      series: keys.flatMap((key) => {
        const factor = scaleFactors[key];
        const active = compact || selected === key;
        return [
          {
            name: factor.label,
            type: "line",
            symbol: "none",
            smooth: false,
            silent: compact,
            data: xValues.map((x) => [x, relativeLoss(key, x)]),
            lineStyle: { width: active ? (compact ? 3 : 3.5) : 2, color: factor.color, opacity: active ? 1 : 0.44 },
            itemStyle: { color: factor.color },
            emphasis: { focus: "series" }
          },
          ...(compact ? [] : [{
            name: `${factor.label} · 当前值`,
            type: "scatter",
            data: [[multipliers[key], relativeLoss(key, multipliers[key])]],
            symbolSize: active ? 13 : 10,
            itemStyle: { color: factor.color, borderColor: "#fff", borderWidth: 2, opacity: active ? 1 : 0.56 },
            z: 5
          }])
        ];
      })
    });
  }, [selected, multipliers, compact]);

  return (
    <div
      ref={container}
      style={{ width: "100%", height: compact ? 225 : 320 }}
      role="img"
      aria-label={compact ? "模型规模增加时，相对测试损失沿幂律曲线下降的示意图" : "模型参数、训练数据和训练算力分别增加时，相对测试损失下降的交互曲线图。纵轴和横轴均为对数坐标。"}
    />
  );
}
