export type LessonOutlineItem = {
  id: string;
  number: string;
  label: string;
  nested?: boolean;
};

export type AgentLessonPageDetail = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  series: string;
  keyPoints: string[];
  outline: LessonOutlineItem[];
  output: string;
  nextLesson: {
    id: string;
    title: string;
    description: string;
  };
};

export const agentLessonPageDetails: Record<string, AgentLessonPageDetail> = {
  "01": {
    id: "01",
    title: "认识智能体",
    subtitle: "理解 Agent 的基本概念、核心能力、与工作流的区别，以及它为何受到关注。",
    duration: "5 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: ["模型不等于 Agent，Agent = 模型 + harness", "Agent 能决策、行动、观察并反馈", "Agent 适合更灵活、更不确定的任务，但不是所有任务都适用 Agent"],
    outline: [
      { id: "section-1", number: "1", label: "什么是 Agent" },
      { id: "section-2", number: "2", label: "Agent 的核心能力" },
      { id: "section-3", number: "3", label: "Agent 和其他系统的区别" },
      { id: "section-3-1", number: "3.1", label: "灵活性光谱", nested: true },
      { id: "section-3-2", number: "3.2", label: "Agent 和 Workflow 的区别", nested: true },
      { id: "section-3-3", number: "3.3", label: "什么时候需要 Agent", nested: true },
      { id: "section-4", number: "4", label: "Agent 为何备受关注" },
      { id: "section-5", number: "5", label: "Agent 的发展趋势" }
    ],
    output: "你将建立了 Agent 的基础认知框架，并能初步区分模型、Workflow 与 Agent。",
    nextLesson: { id: "02", title: "判断价值与问题", description: "继续学习如何判断一个场景是否值得做成 Agent。" }
  },
  "02": {
    id: "02",
    title: "价值判断",
    subtitle: "在动手设计 Agent 前，先判断问题是否值得解决，以及是否真的适合用 Agent。",
    duration: "6 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: ["先判断问题是否值得解决：业务价值、影响范围、被服务程度、不解决的损失", "再判断是否适合用 Agent 做：看流程、规则分支、结果开放度", "能用简单办法解决的，尽量不要增加复杂度"],
    outline: [
      { id: "section-1", number: "1", label: "判断问题是否值得解决" },
      { id: "section-2", number: "2", label: "判断是否适合用 Agent 做" },
      { id: "section-2-1", number: "2.1", label: "Workflow 与 Agent 的区别", nested: true },
      { id: "section-2-2", number: "2.2", label: "问答机器人一定要用 Agent 吗?", nested: true },
      { id: "section-3", number: "3", label: "练习题" }
    ],
    output: "你将学会在开始设计前，先判断问题是否值得解决，以及是否真的适合用 Agent 来做。",
    nextLesson: { id: "03", title: "调研用户、业务和生态", description: "继续学习如何从用户目标、业务流程与上下游生态出发，完成需求梳理。" }
  },
  "04": {
    id: "04",
    title: "选择合适的模型",
    subtitle: "比较不同模型能力、成本与延迟，明确选型思路。",
    duration: "5 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: ["选择模型不只看公开评分，要结合具体任务验证", "评估模型至少看 3 个维度：任务表现、token 成本、响应速度", "通过测试用例、评估指标、测试打分来验证模型"],
    outline: [
      { id: "section-1", number: "1", label: "什么是任务（task）" },
      { id: "section-2", number: "2", label: "什么是 benchmark？" },
      { id: "section-3", number: "3", label: "选择模型的 3 个评估维度" },
      { id: "section-4", number: "4", label: "验证模型在具体任务中的表现" },
      { id: "section-5", number: "5", label: "综合评分" },
      { id: "section-6", number: "6", label: "练习题" }
    ],
    output: "你将学会根据具体任务，从任务表现、成本和延迟等维度选择合适的模型。",
    nextLesson: { id: "05", title: "编写系统提示词", description: "学习如何为 Agent 设计清晰、可执行的系统提示词，并明确行为边界。" }
  }
};
