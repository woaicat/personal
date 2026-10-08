import type { Metadata } from "next";
import PracticeCasesPage from "@/components/practice-cases/PracticeCasesPage";

export const metadata: Metadata = {
  title: "实战案例 | 从 0 到 1 设计一个 Agent | JiaXuan GAO",
  description: "整理 Agent 产品开发与设计的真实实践案例，按评测、成本优化、安全控制和工作流设计等主题探索。",
  alternates: { canonical: "/zero-to-one/practice-cases" }
};

export default function PracticeCasesRoute() {
  return <PracticeCasesPage />;
}
