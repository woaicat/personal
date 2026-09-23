import type { Metadata } from "next";
import AlexNetPage from "@/components/ai-papers/AlexNetPage";

export const metadata: Metadata = {
  title: "AlexNet 图解 | 人工智能论文图解 | JiaXuan GAO",
  description: "通过交互图解理解 AlexNet 的卷积结构、训练技巧与 2012 年 ImageNet 竞赛结果。",
  alternates: { canonical: "/ai-papers/alexnet" }
};

export default function AlexNetExplainerPage() {
  return <AlexNetPage />;
}
