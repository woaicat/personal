import type { Metadata } from "next";
import LickliderPage from "@/components/ai-papers/LickliderPage";

export const metadata: Metadata = {
  title: "人机共生图解 | Man-Computer Symbiosis | JiaXuan GAO",
  description: "通俗解读 Licklider 1960 年提出的人机共生概念、协作分工、技术前提与历史边界。",
  alternates: { canonical: "/ai-papers/licklider" }
};

export default function LickliderExplainerPage() {
  return <LickliderPage />;
}
