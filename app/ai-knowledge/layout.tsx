import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "AI产品经理知识库",
    template: "%s · AI产品经理知识库"
  },
  description: "面向 AI 产品经理的个人知识库，整理方法论、技术基础、Agent、案例库和行业观察。",
  robots: {
    index: false,
    follow: false
  }
};

export default function AiKnowledgeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="ai-knowledge-page">{children}</div>;
}
