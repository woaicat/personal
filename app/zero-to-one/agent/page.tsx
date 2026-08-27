import type { Metadata } from "next";
import AgentCoursePage from "./_components/AgentCoursePage";

export const metadata: Metadata = {
  title: "从 0 到 1 设计一个 Agent | JiaXuan GAO",
  description: "面向具备一定产品设计与软件理论基础、但不具备编写代码能力的产品经理，系统理解 Agent 的设计方法。"
};

export default function AgentCourseListPage() {
  return <AgentCoursePage />;
}
