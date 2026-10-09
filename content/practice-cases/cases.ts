export const practiceCaseTags = ["Agent 评测", "成本优化", "安全控制", "工作流设计", "工具检索"] as const;

export type PracticeCaseTag = (typeof practiceCaseTags)[number];
export type PracticeCaseArtwork = "evaluation" | "routing" | "workflow" | "hyset";

export type PracticeCase = {
  id: string;
  title: string;
  originalTitle: string;
  source: string;
  format: "文章" | "课程" | "视频" | "论文";
  url: string;
  summary: string;
  tags: readonly PracticeCaseTag[];
  artwork: PracticeCaseArtwork;
};

// 标题直译自原文；简介根据原文内容撰写。新增案例时先核对原文与链接。
export const practiceCases: readonly PracticeCase[] = [
  {
    id: "hyset-set-level-tool-retrieval",
    title: "工具不是孤岛：通过查询条件化的超边预测实现大语言模型智能体的集合级工具检索",
    originalTitle: "Tools Are Not Islands: Set-Level Tool Retrieval for LLM Agents via Query-Conditioned Hyperedge Prediction",
    source: "上海交通大学 / 香港理工大学",
    format: "论文",
    url: "https://arxiv.org/abs/2607.25718",
    summary:
      "Agent 任务常需多工具协作，逐个排序容易漏掉互补项。HYSET 对候选工具组整体评分，并按组大小建模配合，再将选出的集合交给现有 Agent。论文在 ToolBench 基准中报告了更高的完整工具集覆盖率与任务通过率。",
    tags: ["工具检索"],
    artwork: "hyset"
  },
  {
    id: "doordash-llm-testing",
    title: "DoorDash 如何构建评估大语言模型的测试系统",
    originalTitle: "How DoorDash Built a Testing System to Evaluate LLMs",
    source: "ByteByteGo",
    format: "文章",
    url: "https://blog.bytebytego.com/p/how-doordash-built-a-testing-system",
    summary:
      "DoorDash 用历史客服对话生成多轮测试，结合规则检查、LLM 评审与人工标注，让难复现的幻觉问题变成可反复运行的评测样本，并在模型调整后发现回归。",
    tags: ["Agent 评测", "安全控制"],
    artwork: "evaluation"
  },
  {
    id: "token-spend-routing",
    title: "Token 开销失控？更智能的路由为何必要",
    originalTitle: "Token Spend Out of Control? The Case for Smarter Routing",
    source: "ByteByteGo",
    format: "文章",
    url: "https://blog.bytebytego.com/p/token-spend-out-of-control-the-case",
    summary:
      "Agent 循环会反复携带增长的上下文。文章以 Kilo 为例，讲解如何按任务难度路由到不同模型，并权衡成本、质量与延迟。",
    tags: ["成本优化", "工作流设计"],
    artwork: "routing"
  },
  {
    id: "langchain-gtm-agent",
    title: "我们如何构建 LangChain 的 GTM Agent",
    originalTitle: "How we built LangChain’s GTM Agent",
    source: "LangChain",
    format: "文章",
    url: "https://www.langchain.com/blog/how-we-built-langchains-gtm-agent",
    summary:
      "LangChain 拆解内部 GTM Agent 的线索检查、多源调研、邮件草稿与人工审核流程，并说明子 Agent、记忆和评测如何支撑长期迭代。",
    tags: ["工作流设计", "Agent 评测", "安全控制"],
    artwork: "workflow"
  }
];

// 只修改此 ID 即可轮换顶部推荐；对应案例仍保留在目录中。
export const featuredPracticeCaseId = "doordash-llm-testing";

export const featuredPracticeCase = practiceCases.find((item) => item.id === featuredPracticeCaseId);

// 推荐内容在目录末尾，避免读者刚看完推荐卡就再次看到相同内容。
export const catalogPracticeCases = [
  ...practiceCases.filter((item) => item.id !== featuredPracticeCaseId),
  ...practiceCases.filter((item) => item.id === featuredPracticeCaseId)
];
