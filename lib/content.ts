import type { PortfolioData, SiteContent } from "@/lib/types";

function buildSite(): SiteContent {
  return {
    brandName: "JiaXuan GAO",
    pageTitle: "个人作品集",
    profile: {
      name: "JiaXuan GAO",
      title: "你好，欢迎来到我的个人作品集和资料库！",
      description: "这里持续更新我的个人介绍、文章创作、项目经历和知识库沉淀，展示从思考到落地的完整过程。",
      ctaText: "联系我",
      ctaUrl: "#subscribe-anchor",
      visualImage: "/hero-top.png",
      visualCaption: "用实验和指标推动产品快速迭代",
      visualText: "顶部展示图"
    },
    topTabs: [
      { label: "个人介绍", href: "#profile-intro" },
      { label: "文章创作", href: "#articles" },
      { label: "项目经历", href: "#projects" },
      { label: "知识库", href: "#knowledge" }
    ]
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  return {
    site: buildSite(),
    contacts: [
      { platform: "人人都是产品经理", account: "猫猫观察员的AI思考" },
      { platform: "微信公众号", account: "猫猫观察员的AI思考" },
      { platform: "谷歌邮箱", account: "gjx19990911@gmail.com" },
      { platform: "微信", account: "g13520327967" }
    ],
    articles: {
      intro: {
        eyebrow: "文章创作",
        title: "关于AI产品设计、智能体构建、方法论总结的个人文章",
        description: "为偏爱清晰、结构与一点大胆的创造者，整理长文笔记、实践记录与可落地的方法论。",
        ctaText: "浏览文章",
        ctaUrl: "#articles",
        stats: [
          { label: "文章", value: "7" },
          { label: "专题", value: "5" }
        ],
        featured: {
          eyebrow: "精选",
          title: "从听不懂到完全信任：我的 Codex 深度产品体验",
          description:
            "基于高频实战复盘 Codex 的交付完整性与排错稳定性，并结合 Agent Loop 机制与产品指标解释其为何成为核心工作流工具。",
          linkLabel: "阅读精选文章 →",
          linkUrl: "https://www.woshipm.com/ai/6344250.html"
        },
        panelTags: ["编辑网格", "瑞士现代主义", "克制动效"]
      },
      filters: ["全部", "产品评测", "方法论总结", "经验复盘", "提示词", "智能体实践"],
      sectionHeader: {
        title: "文章",
        description: "写作主要有感而发、观点类文章自己写、教程类文章AI辅助写。"
      },
      cards: [
        {
          id: "article-1",
          category: "产品评测",
          title: "从听不懂到完全信任：我的 Codex 深度产品体验",
          summary:
            "基于高频实战复盘 Codex 的交付完整性与排错稳定性，并结合 Agent Loop 机制与产品指标解释其为何成为核心工作流工具。",
          publishDate: "2026/4/12",
          url: "https://www.woshipm.com/ai/6344250.html"
        },
        {
          id: "article-2",
          category: "方法论总结",
          title: "如何为AI产品设计产品成功指标",
          summary: "提出 AI 产品指标设计的五项原则与四步方法，从业务价值出发定义北极星指标并完成指标拆解与权衡。",
          publishDate: "2026/2/1",
          url: "https://www.woshipm.com/ai/6336434.html"
        },
        {
          id: "article-3",
          category: "经验复盘",
          title: "用 Agent Skill 倒推 AI 应用解决方案",
          summary: "介绍先用 Agent Skill 做效果验证与技术选型再反推产品方案的方法，并说明 Skill 与 MCP 的协同关系与实践路径。",
          publishDate: "2026/1/7",
          url: "https://www.woshipm.com/ai/6319731.html"
        },
        {
          id: "article-4",
          category: "提示词",
          title: "9个常用的提示框架及使用教程",
          summary: "系统梳理 9 种常用提示框架及适用场景，配套风险分级与组合策略，帮助把模糊需求转为可执行且可验证的高质量提示。",
          publishDate: "2025/12/22",
          url: "https://www.woshipm.com/ai/6177377.html"
        },
        {
          id: "article-5",
          category: "方法论总结",
          title: "消费级AI应用对比：谷歌Gemini与OpenAI ChatGPT",
          summary: "从模型能力与产品形态及生态战略三方面对比 Gemini 与 ChatGPT，分析两者在多模态架构与工作流扩展上的差异。",
          publishDate: "2025/9/27",
          url: "https://www.woshipm.com/evaluating/6273874.html"
        },
        {
          id: "article-6",
          category: "经验复盘",
          title: "Vibe Coding实践：绕远路是最快的捷径",
          summary:
            "基于真实实践总结 Vibe Coding 的核心方法与边界：先规划后执行并通过高质量上下文补齐降低返工，强调把它作为提效工具而非万能方案，在持续复盘中形成个人开发流程。",
          publishDate: "2025/11/10",
          url: "https://mp.weixin.qq.com/s/Q1Fh4e3NkBrit8oE7Pu2xw"
        },
        {
          id: "article-7",
          category: "智能体实践",
          title: "智能体产品落地实践：20%的智能+80%的苦工",
          summary:
            "结合落地项目总结智能体工程化常见坑点，覆盖产品定义架构选择上下文策略评测与可观测性，强调先跑通最小闭环再迭代优化。",
          publishDate: "2025/12/5",
          url: "https://www.woshipm.com/ai/6301184.html"
        }
      ]
    },
    projects: {
      intro: {
        eyebrow: "项目经历",
        title: "把想法做成可验证、可迭代的真实产品。",
        description: "围绕智能体、效率工具和内容产品持续构建项目，用真实场景验证需求、体验与可持续增长模型。",
        ctaText: "浏览项目",
        ctaUrl: "#projects-content",
        stats: [{ label: "项目", value: "4" }],
        featured: {
          eyebrow: "精选项目",
          title: "评测方案设计智能体",
          description:
            "基于 FastAPI 与 LangGraph 构建可恢复的评测方案设计智能体，支持上传文档自动规划执行并生成评测方案与样本文件。",
          linkLabel: "查看项目详情 →",
          linkUrl: "https://github.com/woaicat/-"
        },
        panelTags: ["Agent", "Workflow", "B2B SaaS"]
      },
      sectionHeader: {
        title: "项目经历",
        description: "包含项目简介、项目链接和关键标签，快速查看每个项目的核心价值。"
      },
      cards: [
        {
          id: "project-1",
          status: "已上线",
          title: "评测方案设计智能体",
          summary:
            "基于 FastAPI 与 LangGraph 构建可恢复的评测方案设计智能体 支持上传文档自动规划执行并生成评测方案 数据集规范与样本文件 通过 SSE 实时反馈任务进度与产物。",
          videoUrl: "",
          projectUrl: "https://github.com/woaicat/-",
          detailUrl: "https://github.com/woaicat/-",
          tags: ["AI智能体", "评测方案", "LangGraph", "FastAPI"]
        },
        {
          id: "project-2",
          status: "已上线",
          title: "营销材料审核",
          summary:
            "面向营销材料合规场景设计 AI 助审流程 通过提示词迭代与评测体系搭建平衡召回率与精确率 上线后审核时长下降约50% 并显著降低人工负担。",
          videoUrl: "",
          projectUrl: "",
          detailUrl: "",
          tags: ["AI合规", "营销审核", "提示词优化", "评测体系"]
        },
        {
          id: "project-3",
          status: "已上线",
          title: "批量素材生成AI插件",
          summary:
            "面向游戏买量场景的 Figma 插件 支持多尺寸素材一键裂变 自动替换图文并接入 Gemini 生成文案和背景图 提升设计产出效率与风格一致性。",
          videoUrl: "",
          projectUrl:
            "https://github.com/woaicat/AI-GAME/tree/main/%E7%B4%A0%E6%9D%90%E6%89%B9%E9%87%8F%E7%94%9F%E4%BA%A7%E6%8F%92%E4%BB%B6",
          detailUrl:
            "https://github.com/woaicat/AI-GAME/tree/main/%E7%B4%A0%E6%9D%90%E6%89%B9%E9%87%8F%E7%94%9F%E4%BA%A7%E6%8F%92%E4%BB%B6",
          tags: ["Figma插件", "素材生成", "AIGC", "Gemini", "游戏买量"]
        },
        {
          id: "project-4",
          status: "已上线",
          title: "法规智能分析skill",
          summary:
            "用于新旧法规对比的自动化 Skill 支持中文 docx 条文抽取 差异识别与影响分析 并输出可汇报的 Markdown CSV 差异表与总结文档。",
          videoUrl: "",
          projectUrl: "https://github.com/woaicat/-skills-regulation-diff",
          detailUrl: "https://github.com/woaicat/-skills-regulation-diff",
          tags: ["法规对比", "合规分析", "Python", "Docx", "Skill"]
        }
      ]
    },
    knowledge: {
      intro: {
        eyebrow: "知识库",
        title: "基于Notebooklm的知识库沉淀",
        description: "从查找信息到发掘洞见，加速学习进程，深化学习层次。",
        ctaText: "浏览知识库",
        ctaUrl: "#knowledge-content",
        stats: [{ label: "知识库", value: "6" }],
        featured: {
          eyebrow: "精选知识库",
          title: "AI三巨头的工程实践",
          description: "聚焦 AI 智能体的评估体系、开发架构与 Skills 扩展机制，帮助快速建立工程化落地认知。",
          linkLabel: "",
          linkUrl: ""
        },
        panelTags: ["工程实践", "Agent", "增长策略"]
      },
      sectionHeader: {
        title: "知识库",
        description: "将项目经验、技术方案和复盘沉淀为可复用的结构化资产。"
      },
      cards: [
        {
          id: "knowledge-1",
          iconText: "AI",
          title: "AI+游戏",
          summary: "这些资料全面分析了人工智能（AI）如何从深度研发到全球化营销全方位重塑中国及全球游戏产业。",
          url: "https://notebooklm.google.com/notebook/04c695bc-0de9-4836-9125-16c1c35c8ab5",
          tags: ["游戏", "AI"]
        },
        {
          id: "knowledge-2",
          iconText: "AGT",
          title: "Codex：自主编码代理的未来",
          summary: "这些来源深入探讨了 OpenAI Codex 的演变及其在 2026年 迈向 AI 智能体 时代的愿景。",
          url: "https://notebooklm.google.com/notebook/def1c26e-29bf-4219-8c72-b346b52c256b",
          tags: ["Agent", "编程", "OpenAI"]
        },
        {
          id: "knowledge-3",
          iconText: "ENG",
          title: "AI三巨头的工程实践",
          summary: "这些资源详细介绍了AI智能体（AI Agent）的评估体系、开发架构以及技能（Skills）扩展机制。",
          url: "https://notebooklm.google.com/notebook/101a096f-92dc-42f9-b7bb-794d86083c24",
          tags: ["智能体", "工程化"]
        },
        {
          id: "knowledge-4",
          iconText: "MKT",
          title: "AI+内容/营销",
          summary: "这些资料系统地阐述了电子商务与B2B营销在2024至2026年间的演进趋势，核心聚焦于人工智能（AI）如何重构营销全链路。",
          url: "https://notebooklm.google.com/notebook/df9b43e4-afa8-45f3-9195-f3fccce34918",
          tags: ["营销", "AI"]
        },
        {
          id: "knowledge-5",
          iconText: "POD",
          title: "播客访谈",
          summary: "这些来源主要探讨了在人工智能时代如何构建卓越的产品以及职业发展的核心策略。",
          url: "https://notebooklm.google.com/notebook/25660173-9d69-4283-b4c9-25ca7e3d416b",
          tags: ["职业发展"]
        },
        {
          id: "knowledge-6",
          iconText: "PRM",
          title: "提示工程",
          summary: "这些资料全面探讨了提示词工程（Prompt Engineering）从人工调优向自动化与系统化转型的趋势。",
          url: "https://notebooklm.google.com/notebook/410b350a-1a9e-473d-a21e-377b8db59e54",
          tags: ["提示词"]
        }
      ]
    }
  };
}
