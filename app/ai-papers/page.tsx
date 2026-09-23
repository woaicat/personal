import type { Metadata } from "next";
import PaperLibraryPage from "@/components/ai-papers/PaperLibraryPage";

export const metadata: Metadata = {
  title: "人工智能论文图解 | JiaXuan GAO",
  description: "用可视化与可交互的方式，读懂推动人工智能发展的重要论文。",
  alternates: { canonical: "/ai-papers" }
};

export default function AiPapersPage() {
  return <PaperLibraryPage />;
}
