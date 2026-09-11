import type { Metadata } from "next";
import PersonalSpace from "@/components/personal-space/PersonalSpace";

export const metadata: Metadata = {
  title: "个人空间 | JiaXuan GAO",
  description: "一个用四张画面循环组成的个人空间动态场景。"
};

export default function PersonalSpacePage() {
  return <PersonalSpace />;
}
