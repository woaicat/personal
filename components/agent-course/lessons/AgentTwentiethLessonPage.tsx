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
  },
  {
    id: "section-4",
    title: "KV Cache（KV 缓存）",
    explanation: "KV Cache（Key-Value Cache）保存模型在当前上下文中已经计算出的注意力 Key、Value 状态。生成下一个 token 时，模型可以复用历史 token 的缓存状态，避免每一步都重新计算整段历史；新生成的 token 会继续加入缓存。它缓存的是中间计算状态，不是已经写出的答案。上下文越长，KV Cache 通常占用的显存也越多。",
    analogy: "像在一场考试里写作文：没有缓存时，每写下一句都从作文开头重新读起，反复梳理已经写过的内容；有 KV 缓存时，已处理过的题目和段落对应的关键信息会留在草稿纸上，继续写时直接接着用，不必重新计算已经处理过的内容，再根据现有上下文生成下一句。它帮助模型在同一段生成中持续往下写。",
    references: [
      { label: "Hugging Face｜KV cache 缓存策略", href: "https://huggingface.co/docs/transformers/main/kv_cache" }
    ]
  },
  {
    id: "section-5",
    title: "Prompt Cache（提示词缓存）",
    explanation: "Prompt Cache 通常指把已处理的提示词前缀对应的 KV 状态保留下来，供后续请求复用。可以把它理解为：KV Cache 主要复用当前生成中的历史状态，Prompt Cache 则尝试让后续请求复用相同提示词前缀的处理结果。当请求使用相同模型和兼容设置，且开头的内容完全一致时，系统可以跳过这段共享前缀的重复处理，继续处理后面的新内容并生成回答。它复用的是输入处理的中间结果，不是缓存并返回旧答案；具体命中规则和保留时间会因模型服务而异。",
    analogy: "像参加两场不同的考试，第二场又出现与第一场完全相同的题目。第一次做题时，你已经读懂并整理了题目背景；第二次可以复用这份“读题笔记”，少花时间重新读懂题干，再根据本场要求作答。注意，复用的是已处理的题目内容，不是把上一场的答案复制过来；如果题干、前置说明或规则有改动，对应部分就可能无法复用。",
    references: [
      { label: "OpenAI｜Prompt caching", href: "https://developers.openai.com/api/docs/guides/prompt-caching" },
      { label: "vLLM｜Automatic Prefix Caching", href: "https://docs.vllm.ai/en/v0.31.0/features/automatic_prefix_caching/" }
    ]
  },
  {
    id: "section-6",
    title: "Context Window（上下文窗口）",
    explanation: "Context Window 是模型一次请求中能够处理的 token 总量上限。输入的指令、对话历史、工具结果等会占用空间，模型生成的输出也需要空间；对一些推理模型，推理过程使用的 token 同样计入。窗口大小由所用模型决定，并不表示窗口内放满信息后模型就一定能准确利用每一部分。Agent 运行越久，历史和工具结果越可能挤占窗口，因此需要为后续回答预留空间并管理过长的内容。",
    analogy: "像餐厅的出餐台一次只能摆放有限数量的订单和备餐单。旧订单、当前订单、过敏提醒都要占位置，还得留出空间放新出炉的菜。台面有多大，决定这一轮最多能摆多少东西；但把台面堆满，也不代表厨师就能更快找到眼前最重要的订单。",
    references: [
      { label: "OpenAI｜Conversation state：Managing the context window", href: "https://developers.openai.com/api/docs/guides/conversation-state" },
      { label: "Anthropic｜Effective context engineering for AI agents", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" }
    ]
  },
  {
    id: "section-7",
    title: "Context（上下文）",
    explanation: "Context 是模型在当前这一步实际收到、可用于理解任务和决定下一步的信息。它可以包括系统指令、用户需求、相关对话、工具说明、检索到的资料与工具返回结果。上下文窗口说的是容量，上下文说的是放进窗口的内容；信息存放在外部文件或数据库里，不等于模型此刻已经看到了它，只有在需要时读取并送入模型，才成为这一轮的上下文。",
    analogy: "像厨师眼前拿到的这一单资料：客人点了什么、不要放什么、哪些菜已经做好。餐厅档案里也许还有很多其他记录，但厨师没有收到的内容，不会自动帮助他处理这一单。出餐台是能摆资料的地方，这一单实际摆上去的资料才是当前的上下文。",
    references: [
      { label: "Anthropic｜Effective context engineering for AI agents", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
      { label: "OpenAI｜From model to agent: Equipping the Responses API with a computer environment", href: "https://openai.com/index/equip-responses-api-computer-environment/" }
    ]
  },
  {
    id: "section-8",
    title: "Context Engineering（上下文工程）",
    explanation: "Context Engineering 是围绕任务目标，选择、组织并持续更新模型每一步所需上下文的做法。它不仅涉及怎么写提示词，还要决定何时检索资料、提供哪些工具说明、保留哪些历史、如何压缩过长内容，以及怎样把新的行动结果交给模型。目标是在有限的上下文窗口里提供足够、准确且相关的信息，让 Agent 能据此做出下一步判断；内容越多并不一定越好。",
    analogy: "像餐厅的领班管理每一单的备餐信息：接单时只把当前菜品、忌口和必要做法交给厨师；做菜中途有改动，就及时更新；已完成的步骤则简要记录，不让旧纸条盖住新要求。领班并没有扩大出餐台，而是在有限台面上安排每一步最该出现的信息。",
    references: [
      { label: "Anthropic｜Effective context engineering for AI agents", href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
      { label: "OpenAI｜Conversation state：Managing the context window", href: "https://developers.openai.com/api/docs/guides/conversation-state" }
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
        {concept.id === "section-5" ? (
          <div className={styles.comparison}>
            <h3>KV Cache 与 Prompt Cache 对比</h3>
            <div className={styles.comparisonTableWrap}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th scope="col">对比项</th>
                    <th scope="col">KV Cache</th>
                    <th scope="col">Prompt Cache</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">可以理解成</th>
                    <td><strong>当前答题时的草稿本</strong></td>
                    <td><strong>下次答题可以重复用的笔记</strong></td>
                  </tr>
                  <tr>
                    <th scope="row">主要发生在哪里</th>
                    <td>一次推理/生成过程中</td>
                    <td>多次请求之间</td>
                  </tr>
                  <tr>
                    <th scope="row">解决什么问题</th>
                    <td>不重复计算已经生成过的 Token</td>
                    <td>不重复处理相同的 Prompt</td>
                  </tr>
                  <tr>
                    <th scope="row">最明显的效果</th>
                    <td><strong>让生成速度更快</strong></td>
                    <td><strong>降低重复长 Prompt 的延迟和成本</strong></td>
                  </tr>
                  <tr>
                    <th scope="row">特别适合</th>
                    <td>所有文本生成</td>
                    <td>长 System Prompt、长文档、固定知识库、Agent 工具说明</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </AgentLessonSection>)}
  </AgentLessonShell>;
}
