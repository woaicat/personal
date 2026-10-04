import type { Metadata } from "next";
import ScalingLawsPage from "@/components/ai-papers/ScalingLawsPage";

export const metadata: Metadata = {
  title: "Scaling Laws 图解 | 语言模型的规模定律 | JiaXuan GAO",
  description: "用可视化实验读懂 Kaplan 等人在 2020 年提出的语言模型规模定律：参数、数据、算力与测试损失的关系及其边界。",
  alternates: { canonical: "/ai-papers/scaling-laws" }
};

export default function ScalingLawsExplainerPage() {
  return <ScalingLawsPage />;
}
