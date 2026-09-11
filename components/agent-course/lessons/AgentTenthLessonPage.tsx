import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  Bot,
  Building2,
  ClipboardList,
  Clock3,
  FileJson,
  FileText,
  Heart,
  Layers3,
  Lightbulb,
  MessageCircle,
  Network,
  PanelTop,
  Puzzle,
  RefreshCcw,
  Timer,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import LessonChoiceQuestion, { type LessonChoiceFeedback } from "@/components/agent-course/LessonChoiceQuestion";
import s from "@/components/agent-course/styles/agent-multi-agent.module.css";

const comparisonRows = [
  ["能力边界", "一个 Agent 做所有事", "每个 Agent 各有所长"],
  ["上下文", "自己维护一个上下文", "每个 Agent 各自维护自己的上下文"],
  ["工具", "一个 Agent 掌握全部工具", "每个 Agent 只挂自己需要的工具"],
  ["决策路径", "单线程、顺序推理", "可并行、可交接"],
  ["调试难度", "链路清晰，相对简单", "协调环节多，调试更复杂"],
  ["适用任务", "任务专一、上下文可控", "任务多分支、需要专业分工"]
];

type IconItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const conditionItems: IconItem[] = [
  {
    icon: Heart,
    title: "一个 Agent 完成任务有困难",
    description: "系统提示词膨胀、工具过多，容易开始“走神”。"
  },
  {
    icon: Puzzle,
    title: "不同子任务需要不同能力或工具",
    description: "搜索、分析、写作等工作模式各不相同。"
  },
  {
    icon: RefreshCcw,
    title: "任务可以并行处理",
    description: "子任务之间依赖较弱，可以同时跑，提升效率。"
  },
  {
    icon: Layers3,
    title: "需要多个角色相互检查",
    description: "例如写代码、审代码、写测试，互相监督。"
  },
  {
    icon: Timer,
    title: "任务需要的上下文超出单窗口容量",
    description: "多个 Agent 联合起来，可以处理更大的信息量。"
  }
];

const communicationRows = [
  { icon: ClipboardList, label: "任务", meaning: "要做什么", example: "“帮我调研 X 公司的竞争对手”" },
  { icon: Layers3, label: "上下文", meaning: "背景信息", example: "“我们的产品定位是 Y”" },
  { icon: FileText, label: "中间结果", meaning: "已经完成的产出", example: "“已经搜到 N 条候选公司”" },
  { icon: Clock3, label: "状态", meaning: "当前进度", example: "“检索完成 80%，还剩 3 项”" },
  { icon: Users, label: "控制权", meaning: "谁接管下一步", example: "“这个任务交给写作 Agent”" }
];

const communicationMethodRows = [
  ["结构化消息", "Agent 数量少、固定", "每条消息有 schema，容易校验", '{ "task": "...", "input": "..." }'],
  ["共享状态", "父子模式", "父 Agent 把中间结果写到共享区，子 Agent 读取", "共享内存 / 数据库 / 缓存"],
  ["任务队列", "蜂群、管理者模式", "每个 Agent 从队列里抢活，异步处理", "消息队列（如 Redis、SQS）"],
  ["文件系统", "长任务、大输出", "子 Agent 把结果写文件，只回传“引用”，避免大段文本在对话里传递", "/outputs/report.md"]
];

const a2aConceptRows = [
  ["Agent Card", "一个 JSON 文件，描述“我能做什么，我怎么被调用”，相当于 Agent 的“名片”"],
  ["Task", "任务对象，有完整生命周期（pending → in-progress → completed / failed）"],
  ["Message / Part", "Agent 之间互发的小段内容，可以是文本、图片、文件等"],
  ["Artifact", "任务最终产出"]
];

const a2aPrinciples = [
  ["拥抱 Agent 能力", "允许以非结构化的方式工作"],
  ["基于现有标准", "建立在 HTTP、JSON-RPC 等成熟标准之上"],
  ["支持多模态", "不仅支持文本，还支持音频、视频、文件等"],
  ["安全优先", "内置身份认证、权限控制、企业级安全考虑"],
  ["兼容多生态", "可以与不同厂商的 Agent 无缝对接"]
];

const buildNoteItems: IconItem[] = [
  { icon: Users, title: "5.1 明确分工与边界", description: "每个 Agent 做什么，不做什么。避免职责重叠和相互干扰。" },
  { icon: MessageCircle, title: "5.2 设计通信机制", description: "选择合适的通信方式，明确消息格式、超时、重试和兜底逻辑。" },
  { icon: Layers3, title: "5.3 评估和控制成本", description: "多智能体会显著增加 token 和调用次数，需要在效果和成本之间找到平衡。" },
  { icon: AlertTriangle, title: "5.4 处理失败与异常", description: "考虑超时、任务失败、输出不符合预期等情况，设计重试和兜底机制。" },
  { icon: RefreshCcw, title: "5.5 从简单开始，逐步迭代", description: "先用少量 Agent 跑通效果，再逐步扩展，避免一开始就过度复杂。" }
];

type ExerciseItem = {
  title: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  feedback: LessonChoiceFeedback[];
};

const exerciseItems: ExerciseItem[] = [
  {
    title: "练习 1",
    prompt: "金融行业研究报告",
    options: ["适合用 Agent（多智能体）", "适合用工作流", "不值得解决（不需要做）"],
    correctIndex: 0,
    feedback: [
      { icon: "check", tone: "lessonFeedbackPositive", label: "A", text: "任务开放、需要搜索、分析和迭代，适合用多智能体协作完成。" },
      { icon: "x", tone: "lessonFeedbackNegative", label: "B", text: "固定流程不足以覆盖调研、分析和根据反馈调整内容的过程。" },
      { icon: "sparkles", tone: "lessonFeedbackBest", label: "C", text: "需求目标明确，且结果会影响业务判断，值得认真完成。" }
    ]
  },
  {
    title: "练习 2",
    prompt: "每日报表数据提取",
    options: ["适合用 Agent（多智能体）", "适合用工作流", "不值得解决（不需要做）"],
    correctIndex: 1,
    feedback: [
      { icon: "x", tone: "lessonFeedbackNegative", label: "A", text: "字段、来源和输出格式都固定，不需要多智能体进行动态判断。" },
      { icon: "check", tone: "lessonFeedbackPositive", label: "B", text: "步骤固定、规则清晰，适合用工作流稳定完成。" },
      { icon: "sparkles", tone: "lessonFeedbackBest", label: "C", text: "这是高频重复且有明确产出的任务，值得自动化。" }
    ]
  }
];

type AgentNodeProps = {
  label: string;
  detail?: string;
  tone?: "main" | "worker" | "manager" | "neutral";
};

function AgentNode({ label, detail, tone = "neutral" }: AgentNodeProps) {
  return (
    <div className={`${s.agentNode} ${s[`agentNode${tone[0].toUpperCase()}${tone.slice(1)}`]}`}>
      <Bot aria-hidden="true" size={19} strokeWidth={1.75} />
      <span>{label}</span>
      {detail ? <small>{detail}</small> : null}
    </div>
  );
}

function SingleMultiDiagram() {
  return (
    <figure className={s.singleMultiDiagram} aria-labelledby="single-multi-diagram-title">
      <figcaption id="single-multi-diagram-title" className={s.diagramCaption}>一个通才，还是一支团队？</figcaption>
      <div className={s.singleMultiPanels}>
        <div className={s.singleMultiPanel}>
          <strong>单 Agent</strong>
          <div className={s.singleDiagramVisual}>
            <PanelTop aria-hidden="true" size={26} strokeWidth={1.6} />
            <AgentNode label="Agent" tone="main" />
            <PanelTop aria-hidden="true" size={26} strokeWidth={1.6} />
          </div>
          <p>一个通才<br />搞定一切</p>
        </div>
        <div className={s.singleMultiDivider} aria-hidden="true" />
        <div className={s.singleMultiPanel}>
          <strong>多 Agent</strong>
          <div className={s.multiDiagramVisual}>
            <AgentNode label="Agent" tone="worker" />
            <AgentNode label="Agent" tone="worker" />
            <AgentNode label="Agent" tone="worker" />
            <AgentNode label="Agent" tone="worker" />
            <div className={s.multiDiagramConnections} aria-hidden="true">
              <ArrowRight className={`${s.multiDiagramArrow} ${s.multiDiagramArrowTop}`} size={18} strokeWidth={1.7} />
              <ArrowDown className={`${s.multiDiagramArrow} ${s.multiDiagramArrowRight}`} size={18} strokeWidth={1.7} />
              <ArrowLeft className={`${s.multiDiagramArrow} ${s.multiDiagramArrowBottom}`} size={18} strokeWidth={1.7} />
              <ArrowUp className={`${s.multiDiagramArrow} ${s.multiDiagramArrowLeft}`} size={18} strokeWidth={1.7} />
            </div>
          </div>
          <p>多个角色配合<br />完成复杂任务</p>
        </div>
      </div>
    </figure>
  );
}

function CommunicationAgent({ className, name, detail }: { className: string; name: string; detail: string }) {
  return (
    <div className={`${s.communicationAgent} ${className}`}>
      <Bot aria-hidden="true" size={28} strokeWidth={1.5} />
      <strong>{name}</strong>
      <small>{detail}</small>
    </div>
  );
}

function CommunicationDiagram() {
  return (
    <div className={s.communicationVisual} role="img" aria-label="研究、分析、评审和写作 Agent 围绕中心协作">
      <CommunicationAgent className={s.communicationAgentResearch} name="研究 Agent" detail="任务：帮我分析市场数据" />
      <CommunicationAgent className={s.communicationAgentAnalysis} name="分析 Agent" detail="中间结果：已整理 10 条报告" />
      <CommunicationAgent className={s.communicationAgentReview} name="评审 Agent" detail="反馈意见：退改价竞品分析" />
      <CommunicationAgent className={s.communicationAgentWriting} name="写作 Agent" detail="下一步交给你：撰写报告" />
      <ArrowDown className={`${s.communicationArrow} ${s.communicationArrowTop}`} aria-hidden="true" size={19} />
      <ArrowRight className={`${s.communicationArrow} ${s.communicationArrowLeft}`} aria-hidden="true" size={19} />
      <ArrowLeft className={`${s.communicationArrow} ${s.communicationArrowRight}`} aria-hidden="true" size={19} />
      <ArrowUp className={`${s.communicationArrow} ${s.communicationArrowBottom}`} aria-hidden="true" size={19} />
      <div className={s.communicationCenter}><strong>多智能体</strong><span>协作</span></div>
    </div>
  );
}

function CommunicationContentTable() {
  return (
    <div className={s.communicationTableWrap} tabIndex={0} aria-label="多智能体通信内容表">
      <table className={s.communicationTable}>
        <thead><tr><th scope="col">传递内容</th><th scope="col">含义</th><th scope="col">典型场景</th></tr></thead>
        <tbody>{communicationRows.map(({ icon: Icon, label, meaning, example }) => (
          <tr key={label}><th scope="row"><span className={s.communicationRowLabel}><Icon aria-hidden="true" size={17} strokeWidth={1.8} />{label}</span></th><td>{meaning}</td><td>{example}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function CommunicationMethodTable() {
  return (
    <div className={s.communicationTableWrap} tabIndex={0} aria-label="系统内部通信方式表">
      <table className={`${s.communicationTable} ${s.communicationMethodTable}`}>
        <thead><tr><th scope="col">方式</th><th scope="col">适用场景</th><th scope="col">特点</th><th scope="col">示例</th></tr></thead>
        <tbody>{communicationMethodRows.map(([method, scene, feature, example]) => (
          <tr key={method}><th scope="row">{method}</th><td>{scene}</td><td>{feature}</td><td><code>{example}</code></td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function A2AVisual() {
  return (
    <div className={s.a2aVisual} aria-label="公司 A Agent 通过 A2A 协议与公司 B Agent 标准化通信">
      <div className={s.a2aCompany}><Building2 aria-hidden="true" size={32} strokeWidth={1.5} /><strong>公司 A</strong><span>Agent</span></div>
      <ArrowLeftRight className={s.a2aArrow} aria-hidden="true" size={25} strokeWidth={1.5} />
      <div className={s.a2aProtocol}><FileJson aria-hidden="true" size={30} strokeWidth={1.5} /><strong>A2A 协议</strong><span>标准化通信</span></div>
      <ArrowLeftRight className={s.a2aArrow} aria-hidden="true" size={25} strokeWidth={1.5} />
      <div className={s.a2aCompany}><Building2 aria-hidden="true" size={32} strokeWidth={1.5} /><strong>公司 B</strong><span>Agent</span></div>
    </div>
  );
}

function A2AConceptTable() {
  return (
    <div className={s.a2aConceptTable} tabIndex={0} aria-label="A2A 核心概念表">
      <table className={s.communicationTable}>
        <tbody>{a2aConceptRows.map(([term, description]) => (
          <tr key={term}><th scope="row">{term}</th><td>{description}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}

function ConditionCard({ icon: Icon, title, description, id }: IconItem & { id: string }) {
  return (
    <article className={s.conditionCard} id={id}>
      <Icon aria-hidden="true" size={23} strokeWidth={1.7} />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function ParentModeDiagram() {
  return (
    <div className={s.modeDiagram} aria-label="父子模式：父 Agent 分配任务给三个子 Agent">
      <AgentNode label="父 Agent" tone="main" />
      <ArrowDown className={s.modeCenterArrow} aria-hidden="true" size={18} />
      <div className={s.modeWorkerRow}>
        <AgentNode label="子 Agent A" detail="搜索" tone="worker" />
        <AgentNode label="子 Agent B" detail="分析" tone="worker" />
        <AgentNode label="子 Agent C" detail="写作" tone="worker" />
      </div>
    </div>
  );
}

function ManagerModeDiagram() {
  return (
    <div className={s.modeDiagram} aria-label="管理者模式：管理 Agent 调度三个专业 Agent">
      <AgentNode label="管理 Agent" tone="manager" />
      <ArrowDown className={s.modeCenterArrow} aria-hidden="true" size={18} />
      <div className={s.modeWorkerRow}>
        <AgentNode label="专家 A" detail="检索" tone="worker" />
        <AgentNode label="专家 B" detail="分析" tone="worker" />
        <AgentNode label="专家 C" detail="写作" tone="worker" />
      </div>
    </div>
  );
}

function SwarmModeDiagram() {
  return (
    <div className={s.swarmDiagram} aria-label="蜂群模式：多个 Agent 自主协作">
      <AgentNode label="Agent" tone="worker" />
      <AgentNode label="Agent" tone="worker" />
      <AgentNode label="Agent" tone="worker" />
      <AgentNode label="Agent" tone="worker" />
      <ArrowLeftRight className={s.swarmArrowTop} aria-hidden="true" size={26} />
      <ArrowLeftRight className={s.swarmArrowBottom} aria-hidden="true" size={26} />
      <Network className={s.swarmNetwork} aria-hidden="true" size={42} strokeWidth={1.15} />
    </div>
  );
}

type ModeCardProps = {
  title: string;
  englishTitle: string;
  description: string[];
  diagram: "parent" | "manager" | "swarm";
};

function ModeCard({ title, englishTitle, description, diagram, id }: ModeCardProps & { id: string }) {
  return (
    <article className={s.modeCard} id={id}>
      <h3>{title}</h3>
      <strong className={s.modeEnglishTitle}>{englishTitle}</strong>
      {diagram === "parent" ? <ParentModeDiagram /> : null}
      {diagram === "manager" ? <ManagerModeDiagram /> : null}
      {diagram === "swarm" ? <SwarmModeDiagram /> : null}
      <ul>
        {description.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

export default function AgentTenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return (
    <AgentLessonShell detail={detail}>
      <AgentLessonSection id="section-1" title="1. 什么是多智能体">
        <div className={s.lessonSubsection} id="section-1-1">
          <h3>1.1 多智能体的含义</h3>
          <p><strong>多智能体（Multi-Agent）</strong>就是把一个复杂任务交给多个 Agent 一起完成，而不是把所有事塞给一个 Agent。</p>
          <p>每个 Agent 都是一个独立的“决策单元”，有自己的提示词 / 人设、上下文和工具，能独立决定下一步动作或把任务交给别人。</p>
          <div className={s.multiAgentQuote}>
            <span aria-hidden="true">“</span>
            <p>一个“团队”代替“一个人”，这就是多智能体。</p>
          </div>
        </div>

        <div className={s.lessonSubsection} id="section-1-2">
          <h3>1.2 单 Agent 和多 Agent 的区别</h3>
          <div className={s.singleMultiComparison}>
            <div className={s.comparisonTableWrap} tabIndex={0} aria-label="单 Agent 和多 Agent 对比表">
              <table className={s.comparisonTable}>
                <thead>
                  <tr><th scope="col">维度</th><th scope="col">单 Agent</th><th scope="col">多 Agent</th></tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([dimension, single, multi]) => (
                    <tr key={dimension}><th scope="row">{dimension}</th><td>{single}</td><td>{multi}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SingleMultiDiagram />
          </div>
        </div>
      </AgentLessonSection>

      <AgentLessonSection id="section-2" title="2. 什么时候需要多智能体">
        <p>能用单 Agent 解决，就不要强行拆成多 Agent。多一层协作，就多一份成本和复杂度。</p>
        <div className={s.conditionGrid}>
          {conditionItems.map((item, index) => <ConditionCard key={item.title} id={`section-2-${index + 1}`} {...item} />)}
        </div>
      </AgentLessonSection>

      <AgentLessonSection id="section-3" title="3. 多智能体的三种常见模式">
        <p>按“权力集中度”从高到低，常见有三种协作模式。</p>
        <div className={s.modeGrid}>
          <ModeCard
            id="section-3-1"
            title="父子模式"
            englishTitle="(Orchestrator-Worker)"
            diagram="parent"
            description={["父 Agent 动态创建或调用子 Agent", "子 Agent 各自负责，汇总给父 Agent", "适合开放式任务，高度灵活"]}
          />
          <ModeCard
            id="section-3-2"
            title="管理者模式"
            englishTitle="(Manager-Workers)"
            diagram="manager"
            description={["长期固定的管理 Agent", "根据任务类型调度专业 Agent", "适合多角色协作、场景明确的任务"]}
          />
          <ModeCard
            id="section-3-3"
            title="蜂群模式"
            englishTitle="(Swarm / Decentralized)"
            diagram="swarm"
            description={["没有固定的管理者", "每个 Agent 自主决定下一步", "适合探索型任务、创造性研究"]}
          />
        </div>
        <div className={s.modeComparisonNote} id="section-3-4">
          <h3>3.4 三种模式的横向对比</h3>
          <div className={s.modeComparisonItems}>
            <span><strong>固定分工</strong> → 管理者模式</span>
            <span><strong>探索 + 并行</strong> → 父子模式</span>
            <span><strong>开放协作</strong> → 蜂群模式（谨慎）</span>
          </div>
        </div>
      </AgentLessonSection>

      <AgentLessonSection id="section-4" title="4. 多智能体之间怎么通信">
        <p>多智能体要协作，首先要能“说上话”。不同的 Agent 之间需要传递任务、上下文、中间结果等信息，并在合适的时候把任务交给下一个 Agent。</p>

        <div className={s.communicationSubsection} id="section-4-1">
          <h3>4.1 通信本质上在传什么</h3>
          <p>无论采用什么方式，Agent 之间的通信本质上是在传递以下内容：</p>
          <div className={s.communicationSplit}>
            <CommunicationContentTable />
            <CommunicationDiagram />
          </div>
        </div>

        <div className={s.communicationSubsection} id="section-4-2">
          <h3>4.2 系统内部怎么通信</h3>
          <p>在同一个系统里，多个 Agent 可以通过不同的方式进行通信，常见做法有：</p>
          <div className={s.communicationMethodLayout}>
            <CommunicationMethodTable />
            <aside className={s.communicationExperience}>
              <Lightbulb aria-hidden="true" size={22} strokeWidth={1.7} />
              <div><strong>Anthropic 的“传话”经验</strong><p>子 Agent 的输出不要都塞回主 Agent 的对话历史——token 会爆炸、信息会失真。直接让子 Agent 把产出写到文件系统，主 Agent 只拿到一个引用，既省 token 也更可控。</p></div>
            </aside>
          </div>
        </div>

        <div className={s.communicationSubsection} id="section-4-3">
          <h3>4.3 跨系统 Agent 通信：A2A 协议</h3>
          <p>当 Agent 来自不同的公司、不同的团队、不同的云，就需要一套跨系统协议，这就是 A2A（Agent-to-Agent Protocol）。A2A 是 Google 在 2025 年 4 月发起、目前托管在 Linux 基金会下的开放协议，目标是：让任何框架、任何厂商的 Agent 都能互相对话。</p>
          <div className={s.a2aLayout}>
            <div>
              <h4>核心概念</h4>
              <A2AConceptTable />
            </div>
            <div>
              <h4>A2A 五大设计原则</h4>
              <ol className={s.a2aPrinciples}>
                {a2aPrinciples.map(([title, description], index) => <li key={title}><strong>{index + 1}</strong><span><b>{title}</b>{description}</span></li>)}
              </ol>
              <A2AVisual />
            </div>
          </div>
        </div>
      </AgentLessonSection>

      <AgentLessonSection id="section-5" title="5. 构建多智能体时需要注意什么">
        <p>多智能体可以带来更强的能力，但也更复杂。下面是一些关键的注意事项：</p>
        <div className={s.buildNoteGrid}>
          {buildNoteItems.map(({ icon: Icon, title, description }, index) => (
            <article className={s.buildNoteCard} id={`section-5-${index + 1}`} key={title}>
              <Icon aria-hidden="true" size={23} strokeWidth={1.7} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </AgentLessonSection>

      <AgentLessonSection id="section-exercise" title="6. 练习题">
        <p>请选择最合适的选项，完成后查看解析。</p>
        <div className={s.exerciseGrid}>
          {exerciseItems.map(({ title, prompt, options, correctIndex, feedback }) => (
            <article className={s.exerciseCard} key={title}>
              <h3>{title}</h3>
              <p className={s.exercisePrompt}>{prompt}</p>
              <LessonChoiceQuestion ariaLabel={`${title}：${prompt}`} options={options} correctIndex={correctIndex} compact feedback={feedback} />
            </article>
          ))}
        </div>
        <p className={s.exerciseHint}><Lightbulb aria-hidden="true" size={18} strokeWidth={1.8} />点击选项后，可以看到每个选项的详细分析和建议。</p>
      </AgentLessonSection>
    </AgentLessonShell>
  );
}
