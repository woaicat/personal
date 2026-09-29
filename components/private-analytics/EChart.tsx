"use client";
import { useEffect, useRef } from "react";
import {
  init,
  use as registerCharts,
  type ComposeOption,
  type EChartsType,
} from "echarts/core";
import {
  BarChart,
  LineChart,
  type BarSeriesOption,
  type LineSeriesOption,
} from "echarts/charts";
import {
  AriaComponent,
  GridComponent,
  TooltipComponent,
  type GridComponentOption,
  type TooltipComponentOption,
  type AriaComponentOption,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

registerCharts([
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  AriaComponent,
  SVGRenderer,
]);
export type ChartOption = ComposeOption<
  | LineSeriesOption
  | BarSeriesOption
  | GridComponentOption
  | TooltipComponentOption
  | AriaComponentOption
>;

// Only adapts React lifecycle; rendering, axes and tooltips belong to ECharts.
export default function EChart({
  option,
  label,
  height = 260,
}: {
  option: ChartOption;
  label: string;
  height?: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const instance = useRef<EChartsType | null>(null);
  useEffect(() => {
    if (!container.current) return;
    const chart = init(container.current, undefined, { renderer: "svg" });
    instance.current = chart;
    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      instance.current = null;
      chart.dispose();
    };
  }, []);
  useEffect(() => {
    instance.current?.setOption(option, { notMerge: true });
  }, [option]);
  return (
    <div
      ref={container}
      className="admin-echart"
      role="img"
      aria-label={label}
      style={{ height }}
    />
  );
}
