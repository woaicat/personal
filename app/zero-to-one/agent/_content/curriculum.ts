export type LessonStatus = "not-started" | "in-progress" | "completed";

export interface AgentLesson {
  id: string;
  title: string;
  summary: string;
  output: string;
  whyItMatters: string;
  caseApplication: string;
}

export interface AgentStage {
  id: string;
  label: string;
  title: string;
  description: string;
  lessons: AgentLesson[];
}

export const agentCurriculum: AgentStage[] = [
  {
    id: "discovery",
    label: "第一阶段",
    title: "需求调研",
    description: "先判断 Agent 是否值得做，再梳理用户、业务与问题边界。",
    lessons: [
      {
        id: "01",
        title: "认识智能体",
        summary: "理解 Agent 的定义、边界，以及它与普通工作流的区别。",
        output: "概念判断清单",
        whyItMatters: "不是所有自动化需求都需要 Agent。先建立共同语言，才能避免从技术方案倒推产品需求。",
        caseApplication: "我们从一个虚拟电商客服案例开始，区分哪些问题适合由 Agent 处理，哪些问题仍应交给固定流程或人工。"
      },
      {
        id: "02",
        title: "判断价值、问题与需求是否适合 Agent",
        summary: "识别真实痛点，判断为什么要做，而不是为了技术而做。",
        output: "问题与价值判断卡",
        whyItMatters: "只有把用户痛点、业务价值和风险放到同一张卡里，才能判断 Agent 是否比现有方案更合适。",
        caseApplication: "围绕商品咨询、物流解释和退换货判断，梳理客服团队的高频问题与成功指标。"
      },
      {
        id: "03",
        title: "调研用户、业务和数据",
        summary: "把问题描述清楚，问题就解决了一半。",
        output: "完成这些调研以后，我们才真正拥有设计 Agent 所需要的业务基础。",
        whyItMatters: "为了设计这个 Agent，我们需要把业务调研清楚到什么程度？",
        caseApplication: "假设一家saas企业提出：希望做一个 B 端销售助手 Agent，提升销售业务效率。"
      }
    ]
  },
  {
    id: "design",
    label: "第二阶段",
    title: "设计智能体",
    description: "从模型、提示词、循环机制、工具与上下文出发，系统完成 Agent 设计。",
    lessons: [
      {
        id: "04",
        title: "选择合适的模型",
        summary: "比较不同模型能力、成本与延迟，明确选型思路。",
        output: "模型选型表",
        whyItMatters: "模型不是越强越好。任务难度、响应速度、成本和可替换性都需要一起权衡。",
        caseApplication: "为售前问答、订单查询和复杂售后分别判断模型能力要求与切换策略。"
      },
      {
        id: "05",
        title: "编写系统提示词",
        summary: "设计稳定、清晰、可执行的系统提示词骨架。",
        output: "系统提示词初稿",
        whyItMatters: "提示词要把角色、目标、规则、工具和异常处理讲清楚，不能只写一句人格设定。",
        caseApplication: "为电商客服 Agent 写出服务对象、回答风格、信息引用和禁止承诺的行为边界。"
      },
      {
        id: "06",
        title: "设计 Agent Loop",
        summary: "定义感知、思考、行动与反馈的循环结构。",
        output: "Agent Loop 图",
        whyItMatters: "循环机制决定 Agent 如何处理多步任务，也决定系统在哪些节点可以被观测和拦截。",
        caseApplication: "把用户问题拆成理解意图、查询信息、生成回答、校验结果和转人工的连续步骤。"
      },
      {
        id: "07",
        title: "设计工具、MCP 与 Skill",
        summary: "梳理工具接入方式，以及 MCP 与 Skill 的组织方法。",
        output: "工具能力清单",
        whyItMatters: "工具是 Agent 连接真实世界的边界，必须让每项能力都有明确的输入、输出和调用条件。",
        caseApplication: "为知识检索、订单状态查询、平台规则查询和转人工分别定义能力边界。"
      },
      {
        id: "08",
        title: "上下文工程：管理上下文窗口",
        summary: "控制输入内容的范围、顺序与压缩方式。",
        output: "上下文策略图",
        whyItMatters: "上下文不是越多越好，相关信息的选择、排序和压缩会直接影响回答质量与成本。",
        caseApplication: "为当前对话、用户信息、订单信息和平台规则安排优先级，并设计超长对话的处理方式。"
      },
      {
        id: "09",
        title: "上下文工程：管理记忆",
        summary: "区分短期记忆、长期记忆与可检索记忆的设计思路。",
        output: "记忆设计方案",
        whyItMatters: "记忆需要明确写入、读取、更新和遗忘规则，否则会把错误信息持续带入后续决策。",
        caseApplication: "判断哪些偏好可以记住，哪些订单信息只能在当前会话中使用，以及如何处理过期信息。"
      },
      {
        id: "10",
        title: "多智能体",
        summary: "判断何时需要多智能体，以及如何进行分工协作。",
        output: "协作角色图",
        whyItMatters: "多 Agent 会增加通信和调度成本，只有在角色边界清晰且确有收益时才值得引入。",
        caseApplication: "比较由一个客服 Agent 统一处理，还是拆分为检索、售后判断和质检角色。"
      },
      {
        id: "11",
        title: "安全、成本、Hook 与沙箱护栏",
        summary: "平衡安全、成本与可控性，为执行过程设置护栏。",
        output: "风险控制清单",
        whyItMatters: "Agent 需要在能做事和不能越界之间保持平衡，风险控制必须进入流程而不是只写在文档里。",
        caseApplication: "限制退款、改订单和权益承诺等高风险操作，并设置预算、审批和人工接管节点。"
      },
      {
        id: "12",
        title: "设计前端 UI 与人机协作",
        summary: "设计用户界面、交互反馈与人工介入机制。",
        output: "交互原型要点",
        whyItMatters: "好的 Agent 体验不仅是输出答案，还要让人知道它正在做什么、为什么停下以及如何接管。",
        caseApplication: "设计客服工作台中的状态反馈、证据展示、转人工和高风险操作审批。"
      }
    ]
  },
  {
    id: "evaluation",
    label: "第三阶段",
    title: "评测智能体",
    description: "通过评测机制倒推 Agent 是否真正有效。",
    lessons: [
      {
        id: "13",
        title: "搭建评测飞轮",
        summary: "建立样本、指标、评测流程与迭代机制。",
        output: "评测飞轮图",
        whyItMatters: "没有基线和回归集，就无法判断一次提示词或模型调整到底带来了改善还是退化。",
        caseApplication: "为商品咨询、物流解释、退换货判断和转人工建立样本集、指标与问题归因流程。"
      }
    ]
  },
  {
    id: "observability",
    label: "第四阶段",
    title: "监控智能体",
    description: "上线后持续观察运行状态、异常与优化方向。",
    lessons: [
      {
        id: "14",
        title: "建立可观测性并完成方案",
        summary: "关注调用链、成本、错误、成功率与关键行为指标。",
        output: "可观测性画板要点",
        whyItMatters: "只有能看到 Agent 的运行过程，团队才能发现异常、解释结果并持续优化。",
        caseApplication: "为虚拟电商客服 Agent 设计 Trace、日志、指标和告警，并汇总为可评审的方案包。"
      }
    ]
  }
];

export const allAgentLessons = agentCurriculum.flatMap((stage) => stage.lessons);

export function findAgentLesson(lessonId: string) {
  return allAgentLessons.find((lesson) => lesson.id === lessonId);
}
