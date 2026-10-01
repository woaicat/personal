import { ArrowUpRight } from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import styles from "@/components/agent-course/styles/agent-concepts.module.css";

const concepts = [
  {
    id: "section-1",
    title: "Agent Loop",
    explanation: "Agent Loop 是 Agent 在一次任务中反复进行判断、行动和反馈的过程。系统把当前目标与信息交给模型，模型决定回答还是调用工具；行动结果再成为下一轮判断的依据。这个循环会在任务完成、需要人工介入或达到停止条件时结束。",
    analogy: "像厨师炒菜时边做边尝：尝过觉得淡，就补一点盐，再尝一次，满意后才出锅。每一步都根据刚得到的结果决定下一步，而不是只按最初的计划机械执行。",
    references: [
      { label: "OpenAI｜Unrolling the Codex agent loop", href: "https://openai.com/index/unrolling-the-codex-agent-loop/" },
      { label: "OpenAI｜Running agents", href: "https://developers.openai.com/api/docs/guides/agents/running-agents" }
    ]
  },
  {
    id: "section-2",
    title: "Agent Harness",
    explanation: "Agent Harness 是围绕模型搭建的控制程序，让模型能按规则完成任务。它准备上下文、驱动 Agent Loop、安排工具调用并把结果交还模型，也可以管理状态、权限和停止条件。模型负责提出下一步，Harness 负责把这些步骤组织成可执行、可控制的过程。",
    analogy: "像餐厅的出餐系统：它接收订单，把菜谱和过敏提醒交给厨师，安排可用的厨具，并记录菜做到哪一步。厨师判断怎么做菜，出餐系统让这件事有顺序、有记录，也不会漏掉必要的检查。",
    references: [
      { label: "OpenAI｜Unlocking the Codex harness: how we built the App Server", href: "https://openai.com/index/unlocking-the-codex-harness/" },
      { label: "OpenAI｜Harness engineering: leveraging Codex in an agent-first world", href: "https://openai.com/index/harness-engineering/" }
    ]
  },
  {
    id: "section-3",
    title: "Agent Runtime",
    explanation: "Agent Runtime 是 Agent 实际执行时依赖的运行环境与服务能力。它承载任务和会话，提供计算资源与隔离，并在需要时支持长任务的暂停、恢复和扩缩容。不同产品对 Runtime 的划分略有差异；这里用它指支撑 Harness 稳定运行的执行层。",
    analogy: "像餐厅真正营业的厨房：灶台、水电和工位让厨师与出餐系统可以持续工作。订单变多时要增加工位，设备中断后还要能接着处理未完成的订单；这些都是厨房运转条件的问题。",
    references: [
      { label: "Google Cloud｜Agent Executor, Google’s distributed Agent Runtime", href: "https://cloud.google.com/blog/products/ai-machine-learning/agent-executor-googles-distributed-agent-runtime/" },
      { label: "AWS｜The new AgentCore runtime", href: "https://aws.amazon.com/blogs/machine-learning/the-new-agentcore-runtime-elastic-optimized-and-consistently-fast-starts/" }
    ]
  }
] as const;

export default function AgentTwentiethLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}>
    {concepts.map((concept, index) => <AgentLessonSection key={concept.id} id={concept.id} title={`${index + 1}. ${concept.title}`}>
      <div className={styles.conceptBody}>
        <div className={styles.copyBlock}><h3>概念解释</h3><p>{concept.explanation}</p></div>
        <div className={styles.example}><h3>生活中的例子</h3><p>{concept.analogy}</p></div>
        <div className={styles.references}><h3>参考材料</h3><ul>{concept.references.map((reference) => <li key={reference.href}><a href={reference.href} target="_blank" rel="noopener noreferrer">{reference.label}<ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} /></a></li>)}</ul></div>
      </div>
    </AgentLessonSection>)}
  </AgentLessonShell>;
}
