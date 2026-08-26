import type { Metadata } from "next";
import AgentCoursePage from "./_components/AgentCoursePage";

export const metadata: Metadata = {
  title: "从 0 到 1 设计一个 Agent | JiaXuan GAO",
  description: "用一个虚拟电商客服案例，完成 Agent 的需求判断、设计、评测与监控。"
};

export default function AgentCourseListPage() {
  return <AgentCoursePage />;
}
