import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI 产品经理知识体系",
    template: "%s · AI 产品经理知识体系"
  },
  description: "面向 AI 产品经理的个人知识库，整理方法论、技术基础、Agent、案例库和行业观察。",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
