import type { AgentLessonPageDetail } from "@/lib/agent-course/types";

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
    nextLesson: { id: "03", title: "调研用户、业务和数据", description: "把问题描述清楚，问题就解决了一半。" }
  },
  "03": {
    id: "03",
    title: "调研用户、业务和数据",
    subtitle: "把问题描述清楚，问题就解决了一半。",
    duration: "20 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: [
      "先了解为什么要做这件事、当前是怎么解决的，以及最终希望达到什么结果",
      "列举所有潜在用户，分析不同用户的痛点，并进行用户优先级排序",
      "理解用户所处的完整业务流程，并拆解核心用户具体需要完成的任务",
      "调研完成任务所需的数据、信息和工具"
    ],
    outline: [
      { id: "section-1", number: "1", label: "原因、目标和现状" },
      { id: "section-2", number: "2", label: "用户、痛点" },
      { id: "section-3", number: "3", label: "业务流程" },
      { id: "section-4", number: "4", label: "用户任务" },
      { id: "section-5", number: "5", label: "数据" },
      { id: "section-6", number: "6", label: "信息和工具" }
    ],
    output: "完成这些调研以后，我们才真正拥有设计 Agent 所需要的业务基础。",
    nextLesson: { id: "04", title: "选择合适的模型", description: "继续学习如何根据具体任务选择合适的模型。" }
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
    nextLesson: { id: "05", title: "系统提示词", description: "学习如何为 Agent 设计清晰、可执行的系统提示词，并明确行为边界。" }
  },
  "06": {
    id: "06",
    title: "Agent loop",
    subtitle: "理解循环如何驱动智能体，以及如何让它持续推进、适时停止。",
    duration: "10 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: ["行动结果进入下一轮决策，形成 Agent loop", "避免无效重复，区分完成、等待、无法继续与被终止", "在决策前、执行前、返回后和结束时按业务需要加工循环"],
    outline: [
      { id: "section-1", number: "1", label: "什么是 Agent loop" },
      { id: "section-2", number: "2", label: "为什么需要循环" },
      { id: "section-3", number: "3", label: "生产环境中的循环" },
      { id: "section-3-1", number: "3.1", label: "防止陷入死循环", nested: true },
      { id: "section-3-2", number: "3.2", label: "什么时候停下来", nested: true },
      { id: "section-3-3", number: "3.3", label: "根据需要调整循环", nested: true },
      { id: "section-4", number: "4", label: "练习题" }
    ],
    output: "画出任务的决策、行动与反馈循环，并明确停止条件和关键检查点。",
    nextLesson: { id: "07", title: "工具和 MCP", description: "继续学习智能体如何通过工具与 MCP 连接真实世界。" }
  },
  "07": {
    id: "07",
    title: "工具和 MCP",
    subtitle: "理解 Agent 如何通过工具获得外部能力，并选择合适的接入方式与执行边界。",
    duration: "15 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: [
      "工具让 Agent 获取信息、完成计算并执行外部动作；模型提出请求，运行环境负责执行与返回结果",
      "MCP 标准化 AI 应用与外部能力之间的连接方式；它不替代 Agent 的决策和业务规则",
      "工具需要清晰的职责、说明、权限与失败处理；直接接入和 MCP 接入要按复用与约束选择"
    ],
    outline: [
      { id: "section-1", number: "1", label: "什么是工具" },
      { id: "section-1-1", number: "1.1", label: "定义工具", nested: true },
      { id: "section-1-2", number: "1.2", label: "调用工具", nested: true },
      { id: "section-1-3", number: "1.3", label: "管理工具", nested: true },
      { id: "section-2", number: "2", label: "什么是 MCP" },
      { id: "section-2-1", number: "2.1", label: "MCP 如何工作", nested: true },
      { id: "section-3", number: "3", label: "工具和 MCP 的区别" },
      { id: "section-3-1", number: "3.1", label: "如何选择", nested: true },
      { id: "section-4", number: "4", label: "工具如何设计" },
      { id: "section-4-1", number: "4.1", label: "工具在精，不在多", nested: true },
      { id: "section-4-2", number: "4.2", label: "把容易误解的信息说清楚", nested: true },
      { id: "section-4-3", number: "4.3", label: "权限落实到程序", nested: true },
      { id: "section-4-4", number: "4.4", label: "信任和安全边界", nested: true },
      { id: "section-5", number: "5", label: "如何处理工具调用失败？" },
      { id: "section-6", number: "6", label: "如何评估工具设计？" },
      { id: "section-exercise", number: "7", label: "练习题" }
    ],
    output: "一份工具与接入方案表：明确能力、输入输出、授权、失败处理与直接接入或 MCP 接入的选择理由。",
    nextLesson: { id: "08", title: "上下文工程：管理上下文窗口", description: "继续学习如何控制 Agent 看到的信息范围、顺序与压缩方式。" }
  },
  "08": {
    id: "08",
    title: "上下文工程：管理上下文窗口",
    subtitle: "管理上下文窗口就是管理注意力。",
    duration: "18 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: [
      "理解模型上下文窗口与 Agent 自己上下文预算的区别",
      "看懂上下文如何组装，以及固定前缀、截断、压缩与检索的作用",
      "决定这一轮到底应该让模型看到什么，并识别哪些信息不能忘"
    ],
    outline: [
      { id: "section-1", number: "1", label: "上下文窗口大小" },
      { id: "section-2", number: "2", label: "上下文由什么组成" },
      { id: "section-3", number: "3", label: "智能体如何在有限窗口中处理无限上下文" },
      { id: "section-3-1", number: "3.1", label: "硬截断", nested: true },
      { id: "section-3-2", number: "3.2", label: "压缩", nested: true },
      { id: "section-3-3", number: "3.3", label: "历史信息检索", nested: true },
      { id: "section-4", number: "4", label: "不同产品是怎么做的" }
    ],
    output: "明确上下文组成、预算与控制策略。",
    nextLesson: { id: "09", title: "上下文工程：管理记忆", description: "继续学习短期、长期与可检索记忆的设计思路。" }
  },
  "09": {
    id: "09",
    title: "上下文工程：管理记忆",
    subtitle: "管理模型在任意时刻知道什么。",
    duration: "24 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: [
      "决定什么值得记住，什么只属于当前会话",
      "设计蒸馏、整合与注入的记忆循环",
      "用评估与护栏，让记忆可靠地服务当前任务"
    ],
    outline: [
      { id: "section-1", number: "1", label: "为什么记忆很重要" },
      { id: "section-2", number: "2", label: "Agent 记忆的架构决策" },
      { id: "section-2-1", number: "2.1", label: "检索式记忆 vs 状态式记忆", nested: true },
      { id: "section-2-2", number: "2.2", label: "记忆的形态", nested: true },
      { id: "section-2-3", number: "2.3", label: "记忆作用域", nested: true },
      { id: "section-2-4", number: "2.4", label: "记忆生命周期", nested: true },
      { id: "section-3", number: "3", label: "构建一个记忆系统：八个设计步骤" },
      { id: "section-3-1", number: "3.1", label: "定义状态对象", nested: true },
      { id: "section-3-2", number: "3.2", label: "实时记忆蒸馏", nested: true },
      { id: "section-3-3", number: "3.3", label: "修剪会话", nested: true },
      { id: "section-3-4", number: "3.4", label: "记忆注入与优先级规则", nested: true },
      { id: "section-3-5", number: "3.5", label: "渲染状态", nested: true },
      { id: "section-3-6", number: "3.6", label: "用 Hooks 编排自动化", nested: true },
      { id: "section-3-7", number: "3.7", label: "组装智能体", nested: true },
      { id: "section-3-8", number: "3.8", label: "会话后记忆整合", nested: true },
      { id: "section-4", number: "4", label: "记忆评估" },
      { id: "section-5", number: "5", label: "记忆护栏" },
      { id: "section-5-1", number: "5.1", label: "蒸馏检查", nested: true },
      { id: "section-5-2", number: "5.2", label: "整合检查", nested: true },
      { id: "section-5-3", number: "5.3", label: "注入检查", nested: true },
      { id: "section-6", number: "6", label: "结论与下一步" },
      { id: "section-7", number: "7", label: "案例演示：差旅助手智能体" },
      { id: "section-7-1", number: "7.1", label: "完整差旅服务的六个阶段", nested: true },
      { id: "section-7-2", number: "7.2", label: "同一句话，分成两种不同寿命的记忆", nested: true },
      { id: "section-7-3", number: "7.3", label: "把案例映射回设计步骤", nested: true }
    ],
    output: "一份包含记忆形态、作用域、生命周期、评估与护栏的设计方案。",
    nextLesson: { id: "10", title: "多智能体", description: "学习多个 Agent 如何分工协作。" }
  },
  "10": {
    id: "10",
    title: "多智能体（Multi-Agent）",
    subtitle: "众人拾柴火焰高，还是三个和尚没水喝？",
    duration: "14 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: [
      "理解多智能体的含义和价值",
      "判断什么时候需要多智能体",
      "掌握三种常见的协作模式：父子模式、管理者模式、蜂群模式",
      "了解多智能体之间的通信方式与 A2A 协议",
      "构建多智能体时的关键注意事项"
    ],
    outline: [
      { id: "section-1", number: "1", label: "什么是多智能体" },
      { id: "section-1-1", number: "1.1", label: "多智能体的含义", nested: true },
      { id: "section-1-2", number: "1.2", label: "单 Agent 和多 Agent 的区别", nested: true },
      { id: "section-2", number: "2", label: "什么时候需要多智能体" },
      { id: "section-2-1", number: "2.1", label: "一个 Agent 完成任务有困难", nested: true },
      { id: "section-2-2", number: "2.2", label: "不同子任务需要不同能力或工具", nested: true },
      { id: "section-2-3", number: "2.3", label: "任务可以并行处理", nested: true },
      { id: "section-2-4", number: "2.4", label: "需要多个角色相互检查", nested: true },
      { id: "section-2-5", number: "2.5", label: "任务需要的上下文超出单窗口容量", nested: true },
      { id: "section-3", number: "3", label: "多智能体的三种常见模式" },
      { id: "section-3-1", number: "3.1", label: "父子模式（Orchestrator-Worker）", nested: true },
      { id: "section-3-2", number: "3.2", label: "管理者模式（Manager-Workers）", nested: true },
      { id: "section-3-3", number: "3.3", label: "蜂群模式（Swarm）", nested: true },
      { id: "section-3-4", number: "3.4", label: "三种模式的横向对比", nested: true },
      { id: "section-4", number: "4", label: "多智能体之间怎么通信" },
      { id: "section-4-1", number: "4.1", label: "通信本质上在传什么", nested: true },
      { id: "section-4-2", number: "4.2", label: "系统内部怎么通信", nested: true },
      { id: "section-4-3", number: "4.3", label: "跨系统 Agent 通信：A2A 协议", nested: true },
      { id: "section-5", number: "5", label: "构建多智能体时需要注意什么" },
      { id: "section-5-1", number: "5.1", label: "明确分工与边界", nested: true },
      { id: "section-5-2", number: "5.2", label: "设计通信机制", nested: true },
      { id: "section-5-3", number: "5.3", label: "评估和控制成本", nested: true },
      { id: "section-5-4", number: "5.4", label: "处理失败与异常", nested: true },
      { id: "section-5-5", number: "5.5", label: "从简单开始，逐步迭代", nested: true },
      { id: "section-exercise", number: "6", label: "练习题" }
    ],
    output: "一份多智能体协作的核心概念、通信方式、A2A 协议和构建注意事项，并能在实际场景中判断是否需要多智能体。",
    nextLesson: { id: "11", title: "安全、成本、Hook 与沙箱护栏", description: "继续学习如何为 Agent 的执行过程设置护栏。" }
  },
  "05": {
    id: "05",
    title: "系统提示词",
    subtitle: "掌握核心原则，比学技巧更重要。",
    duration: "5 分钟",
    series: "从 0 到 1 设计一个 Agent",
    keyPoints: [
      "提示词承担了非常多的作用，是智能体的灵魂所在",
      "掌握 4 大核心原则，少走弯路，高效写出高质量提示词",
      "牢记万能公式，并知道何时不该继续优化提示词"
    ],
    outline: [
      { id: "section-1", number: "1", label: "提示词教程" },
      { id: "section-2", number: "2", label: "核心原则" },
      { id: "section-3", number: "3", label: "万能公式" },
      { id: "section-4", number: "4", label: "什么时候不该继续优化提示词" },
      { id: "section-5", number: "5", label: "练习题" }
    ],
    output: "掌握编写系统提示词的核心原则、万能公式，以及判断优化边界的方法。",
    nextLesson: { id: "06", title: "设计 Agent Loop", description: "继续学习如何把提示词接入 Agent 的循环执行过程。" }
  }
};
