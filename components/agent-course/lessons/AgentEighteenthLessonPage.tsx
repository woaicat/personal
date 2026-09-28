import {
  AlertTriangle, ArrowDown, ArrowRight, BarChart3, Bot, Brain,
  CheckCircle2, CircleAlert, CircleUserRound, Cpu, Database,
  FileSearch, FileText, GitBranch, Lightbulb, List, Play, RefreshCw,
  Search, Settings, Share2, Shield, SlidersHorizontal, Wrench,
  Workflow, type LucideIcon
} from "lucide-react";
import type { ReactNode } from "react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import s from "@/components/agent-course/styles/agent-self-evolution.module.css";

function Icon({ icon: Icon }: { icon: LucideIcon }) {
  return <span className={s.icon}><Icon size={25} strokeWidth={1.8} aria-hidden="true" /></span>;
}

function Panel({ icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return <div className={s.panel}><div className={s.panelHead}><Icon icon={icon} /><div><h3>{title}</h3>{children}</div></div></div>;
}

function FlowStep({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text?: string }) {
  return <div className={s.flowStep}><Icon size={27} strokeWidth={1.7} aria-hidden="true" /><strong>{title}</strong>{text && <span>{text}</span>}</div>;
}

function StepCard({ icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return <div className={s.stepCard}><Icon icon={icon} /><div><strong>{title}</strong><p>{children}</p></div></div>;
}

const traceItems = ["用户请求", "判断", "工具结果", "错误修正", "任务结果"];
const contextRows: Array<[LucideIcon, string, string]> = [
  [FileText, "提示词", "更清晰的指令，提供更好的提示词。"],
  [Settings, "技能", "可复用的能力，通过工具和技能增强 Agent。"],
  [FileText, "知识", "领域知识与规则，注入专业知识和业务规则。"],
  [Search, "检索", "引入外部信息，通过检索获取实时或外部知识。"],
  [Workflow, "工作流", "规划与任务编排，通过工作流组织多步骤任务。"]
];
const skillFields: Array<[LucideIcon, string, string]> = [
  [FileText, "适用条件", "什么情况下使用。"],
  [List, "推荐步骤", "具体的执行流程。"],
  [Wrench, "所需工具", "需要哪些工具或资源。"],
  [CircleAlert, "常见错误与处理", "可能的问题及解决方法。"]
];
const reviewFlow: Array<[LucideIcon, string, string]> = [
  [FileText, "多条任务轨迹", "收集多条相似任务的运行轨迹，作为生成技能建议的依据。"],
  [Lightbulb, "生成技能建议", "基于轨迹中的经验，提炼出可复用的技能建议。"],
  [FileSearch, "呈现证据", "展示具体的任务证据，帮助判断该技能的价值和适用范围。"],
  [CircleUserRound, "人工审核", "由人类判断该技能是否正确、安全、且具有推广价值。"]
];
const attentionItems: Array<[LucideIcon, string, string]> = [
  [FileText, "记录完整轨迹", "保存任务的输入、执行过程、使用的工具、输出结果以及 Agent 的自我反思，形成完整的经验轨迹，为后续学习和分析提供基础。"],
  [Search, "从多个任务中寻找稳定规律", "不要只根据单个任务的结果就做出调整，而是从多个任务的经验中寻找重复出现、稳定有效的规律，避免受到偶然结果的干扰。"],
  [Database, "保留经验的证据与来源", "记录每条经验的具体证据，如任务实例、输出结果、评估反馈等，并标明来源，确保经验可追溯、可验证，便于后续检查和维护。"],
  [BarChart3, "通过评估确认 Agent 是否变好", "在应用新的经验或调整后，需要通过评估来确认 Agent 的能力是否真正提升，避免因错误的经验导致性能下降。"],
  [Shield, "明确自动变化、人工审核与禁止修改的范围", "清晰划分哪些内容可以由 Agent 自动调整，哪些需要人工审核，哪些是禁止修改的，设置合理的边界，保证自进化过程的安全和可控。"]
];

export default function AgentEighteenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}>
    <AgentLessonSection id="section-1" title="1、什么是自进化 Agent">
      <div className={s.comparison}>
        <div className={s.compareCard}><h3>A. 普通 Agent</h3><p>完成任务后，保留运行轨迹作为历史记录，<br />不会自动改进自身。</p><div className={s.flow}>{[[CircleUserRound, "用户请求"], [Bot, "执行任务"], [CheckCircle2, "任务完成"]].map(([icon, label], i) => <div className={s.flowItem} key={String(label)}><FlowStep icon={icon as LucideIcon} title={label as string} />{i < 2 && <ArrowRight aria-hidden="true" />}</div>)}</div><div className={s.trace}><strong>运行轨迹（保存为历史记录）</strong><div>{traceItems.map(item => <span key={item}>{item}</span>)}</div></div></div>
        <div className={s.compareCard}><h3>B. 自进化 Agent</h3><p>在完成任务后，基于运行轨迹分析经验、更新自身、再次执行任务，形成持续改进的闭环。</p><div className={s.flow}>{[[CircleUserRound, "用户请求"], [Bot, "执行任务"], [FileText, "记录过程"], [BarChart3, "分析经验"], [Settings, "更新 Agent"], [Play, "再次执行任务"]].map(([icon, label], i) => <div className={s.flowItem} key={String(label)}><FlowStep icon={icon as LucideIcon} title={label as string} />{i < 5 && <ArrowRight aria-hidden="true" />}</div>)}</div><div className={s.loopNote}><RefreshCw size={18} />持续改进</div><div className={s.trace}><strong>运行轨迹（用于分析和改进）</strong><div>{traceItems.map(item => <span key={item}>{item}</span>)}</div></div></div>
      </div>
    </AgentLessonSection>

    <AgentLessonSection id="section-2" title="2、自进化从哪里开始">
      <p className={s.lead}>在大多数情况下，先从模型外部的上下文、知识和指令入手，只有在仍无法满足需求时，再考虑调整模型权重进行微调。</p>
      <div className={s.levelCard}><div className={s.numberHeading}><b>1</b><div><h3>先改进上下文、知识和指令</h3><p>通过更好的提示词、技能、知识、检索和工作流，提升 Agent 的表现。</p></div></div><div className={s.innerPanel}><h3>Token Space / 上下文空间</h3><p>不改变模型参数，主要通过输入来引导和增强 Agent。</p><div className={s.tableRows}>{contextRows.map(([icon, title, desc]) => <div key={title}><Icon icon={icon} /><strong>{title}</strong><span>{desc}</span></div>)}</div></div></div>
      <div className={`${s.levelCard} ${s.mutedCard}`}><div className={s.numberHeading}><b>2</b><div><h3>仍无法满足需求时</h3><p>如果在改进上下文、知识和指令后，Agent 仍然无法达到预期，再考虑调整模型权重。</p></div></div><div className={s.innerPanel}><h3>Weight Space / 权重空间</h3><p>通过微调等方式更新模型参数，让模型具备新的能力。</p><div className={s.singleRow}><Icon icon={SlidersHorizontal} /><div><strong>微调</strong><span>更新模型权重。</span></div></div></div></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-3" title="3、行为进化：把经验变成可以复用的技能">
      <p className={s.lead}>通过分析多条相似任务的运行轨迹，找到重复的模式，将经验归纳为可复用的技能，并在未来的任务中检索并复用，实现持续改进。</p>
      <div className={s.panel}><h3>技能归纳的四个关键领域</h3><div className={s.skillRows}>{skillFields.map(([icon, title, desc], i) => <div key={title}><b>{i + 1}</b><Icon icon={icon} /><strong>{title}</strong><span>{desc}</span></div>)}</div><div className={s.greenNote}>在实践中产生新的轨迹，持续改进。</div></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-4" title="4、知识进化：让 Agent 持续维护自己对环境的理解">
      <p className={s.lead}>Agent 需要不断吸收新的信息，并将这些信息组织成结构化的知识，这样才能在后续任务中做出更准确的判断和决策。</p>
      <Panel icon={Share2} title="从相关起点到关键上下文"><p>以一个起点为切入点，通过实体之间的关系，找到完成任务所需的关键上下文。</p><div className={s.knowledgeMap}><div><strong>相关起点</strong><span>客户</span></div><ArrowRight size={18} /><div className={s.knowledgeCenter}><span>主体</span><strong>合同</strong></div><div className={s.knowledgeTargets}><strong>关键上下文</strong><span>条款</span><span>制度</span></div></div></Panel>
      <Panel icon={RefreshCw} title="两方面的持续更新"><p>让知识体系与检索方式一起进化，才能持续提升 Agent 的理解能力。</p><div className={s.stack}><StepCard icon={Database} title="知识持续更新">不断将新的信息纳入知识体系，保持对环境的最新理解。</StepCard><StepCard icon={Settings} title="检索方式持续更新">根据任务和数据的变化，持续优化检索方式，找到更相关的知识。</StepCard></div></Panel>
      <Panel icon={BarChart3} title="不同场景的知识组织方式"><p>根据场景的复杂度，选择合适的知识组织与检索方式。</p><div className={s.stack}><StepCard icon={FileText} title="简单场景：文档库 + 向量检索">适用于关系较简单、信息相对独立的场景。</StepCard><StepCard icon={Share2} title="关系密集场景：知识图谱与关系检索">适用于实体关系复杂、需要多跳推理的场景。</StepCard></div></Panel>
    </AgentLessonSection>

    <AgentLessonSection id="section-5" title="5、知识进化同样需要闭环">
      <p className={s.lead}>知识的更新不是一次性的工作，而是一个需要持续运行的闭环，只有形成闭环，Agent 才能在不断变化的环境中保持对知识的准确理解。</p>
      <Panel icon={RefreshCw} title="知识更新的闭环流程"><p>从新信息的发现到重新进入检索，形成持续进化的循环。</p><div className={s.knowledgeLoop}>{[
        [FileText, "新文档或环境变化", "从新信息的发现到准入检索，形成持续进化的循环。"],
        [Search, "识别对象与关系", "识别新信息中的实体、关系和相关内容。"],
        [Database, "去重、冲突检测", "对新信息进行去重，并检测可能的冲突。"],
        [List, "更新与排序", "将有效信息纳入知识体系，并进行排序。"],
        [Play, "重新进入检索", "将更新后的知识重新投入检索，支持后续任务。"]
      ].map(([icon, title, desc]) => <div key={title as string}><Icon icon={icon as LucideIcon} /><strong>{title as string}</strong><span>{desc as string}</span></div>)}</div><small>变化频繁的信息可以更高频更新</small></Panel>
    </AgentLessonSection>

    <AgentLessonSection id="section-6" title="6、为什么自进化需要人工审核">
      <p className={s.lead}>自进化可以让 Agent 从经验中学习，但经验并不总是可靠的。为了保证新技能的质量、安全性和通用性，需要在进入技能库之前进行人工审核。</p>
      <div className={s.warning}><AlertTriangle size={21} />自进化不等于让 Agent 随意修改自己。</div>
      <div className={s.subheading}><b>1</b><div><h3>人工审核的流程</h3><p>从任务轨迹中生成技能建议后，需要呈现证据并由人工审核，确认合适后才能进入技能库并供 Agent 使用。</p></div></div>
      <div className={s.reviewFlow}>{reviewFlow.map(([icon, title, desc], i) => <div key={title}><StepCard icon={icon} title={title}>{desc}</StepCard>{i < reviewFlow.length - 1 && <ArrowDown className={s.downArrow} size={19} />}</div>)}</div>
      <div className={s.reviewBranches}><div><span className={s.approved}>审核通过</span><StepCard icon={Database} title="进入技能库">将审核通过的技能加入技能库。</StepCard><StepCard icon={Play} title="Agent 使用新技能">Agent 在未来的任务中调用新技能。</StepCard></div><div><span className={s.rejected}>审核不通过</span><StepCard icon={FileSearch} title="记录拒绝原因">记录拒绝原因，用于后续分析，在更多经验积累后重新评估。</StepCard></div></div>
      <div className={s.subheading}><b>2</b><h3>需要人工审核的主要原因</h3></div><div className={s.stack}><StepCard icon={BarChart3} title="一次成功不代表通用">某个任务上的成功经验，可能只适用于特定场景，无法推广到其他任务。</StepCard><StepCard icon={Shield} title="轨迹可能包含不可信的信息">任务轨迹中可能包含用户、网页、文件或工具返回的错误或具有误导性的内容，如果不加审核就学习，可能会让 Agent 掌握不正确的做法。</StepCard></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-7" title="7、什么时候需要修改模型">
      <p className={s.lead}>修改模型的成本较高，应按照从简单到复杂的顺序排查。只有在通过调整上下文、技能与工作流、知识与检索仍无法解决问题时，再考虑修改模型。</p>
      <Panel icon={GitBranch} title="排查顺序：从简单到复杂"><p>按照以下顺序逐步排查，优先使用成本更低、迭代更快的方法。</p><div className={s.priorityRows}>{[
        [FileText, "上下文", "优化系统提示、任务描述、示例等上下文信息，让 Agent 更清楚任务目标和约束条件。"],
        [Settings, "技能与工作流", "检查和优化工具使用、流程设计、提示链路等技能与工作流，提升 Agent 的执行能力。"],
        [Database, "知识与检索", "补充领域知识、优化检索策略，确保 Agent 能够获取到需要的外部知识。"],
        [Cpu, "仍无法解决时，\n再考虑模型", "在前三步都无法解决问题时，再考虑修改模型，例如进行微调等权重调整。"]
      ].map(([icon, title, desc], i) => <div key={title as string}><b>{i + 1}</b><Icon icon={icon as LucideIcon} /><strong>{title as string}</strong><span>{desc as string}</span></div>)}</div></Panel>
      <Panel icon={SlidersHorizontal} title="微调适合稳定行为、固定格式或表达风格"><p>当需要让 Agent 在特定任务上表现出稳定的行为、遵循固定的输出格式，或使用特定的表达风格时，可以通过微调来调整模型的权重。常见的方式包括 LoRA 等参数高效的微调方法。</p></Panel>
      <Panel icon={Database} title="新的事实知识放在外部知识库，需要时检索"><p>对于新的事实知识（如领域知识、实时信息等），不建议通过修改模型来记住，而是放在外部知识库中，在需要时通过检索获取，保持模型的通用性和可维护性。</p></Panel>
    </AgentLessonSection>

    <AgentLessonSection id="section-8" title="8、自进化 Agent 的三个层次">
      <p className={s.lead}>自进化的 Agent 可以从行为、知识和模型三个层次进行演进。三个层次的成本和验证复杂度逐步提高，应根据实际需求选择合适的演进方式。</p>
      <Panel icon={BarChart3} title="三个层次的演进路径"><p>从行为到知识，再到模型，能力更强，但成本和验证复杂度也逐步提高。</p><div className={s.threeLevels}>{[
        [Play, "行为进化", "Agent 应该怎么做", "技能与工作流", "通过优化工具使用、流程设计和提示策略，让 Agent 学会更好的行为。"],
        [Database, "知识进化", "Agent 应该知道什么、\n去哪里找到", "知识与检索", "扩展领域知识、优化检索策略，让 Agent 获取更准确、更全面的知识。"],
        [Cpu, "模型进化", "模型本身需要发生\n什么改变", "微调等权重调整", "在需要更强的能力或特定的行为时，通过微调等方式调整模型本身。"]
      ].map(([icon, title, question, method, desc], i) => <div key={title as string}><b>{i + 1}</b><Icon icon={icon as LucideIcon} /><div><strong>{title as string}</strong><small>{question as string}</small></div><ArrowRight size={17} /><em>{method as string}</em><span>{desc as string}</span></div>)}</div><div className={s.complexity}>成本与验证复杂度：低 <ArrowDown size={22} /> 高</div></Panel>
    </AgentLessonSection>

    <AgentLessonSection id="section-9" title="9、构建自进化 Agent 时需要注意什么">
      <p className={s.lead}>让 Agent 能够从经验中学习、不断改进，是一件复杂的工程工作。在构建自进化 Agent 时，需要特别注意以下几个方面，才能让它稳定、可靠地运行。</p>
      <div className={s.attention}>{attentionItems.map(([icon, title, desc], i) => <div key={title}><b>{i + 1}</b><Icon icon={icon} /><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div>
    </AgentLessonSection>

    <AgentLessonSection id="section-10" title="10、总结">
      <p className={s.lead}>自进化 Agent 的核心价值，在于让每一次任务的经验都能转化为未来更好的表现。它不只是完成当前任务，更能从过去的经验中学习，不断改进自己。</p>
      <div className={s.summary}><StepCard icon={CircleUserRound} title="普通 Agent：">这一次任务能不能完成？</StepCard><ArrowDown size={23} /><StepCard icon={Brain} title="自进化 Agent：">这一次任务留下了什么，可以让下一次做得更好？</StepCard><div className={s.finalNote}><Icon icon={Lightbulb} /><strong>让一次任务产生的经验真正进入未来的任务，这才是自进化 Agent 最核心的能力。</strong></div></div>
    </AgentLessonSection>
  </AgentLessonShell>;
}
