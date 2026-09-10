import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AlertTriangle,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  CircleMinus,
  CircleSlash2,
  CircleDot,
  CircleHelp,
  Clock3,
  Crown,
  Database,
  FileText,
  FileStack,
  FlaskConical,
  Filter,
  FolderOpen,
  GitBranch,
  Lightbulb,
  Merge,
  MessageCircle,
  Moon,
  Plane,
  PlayCircle,
  RefreshCw,
  Scale,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Timer,
  Trash2,
  TrendingUp,
  UserRound,
  UsersRound,
  Utensils,
  XCircle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import s from "@/components/agent-course/styles/agent-memory.module.css";

function ConversationLine({ speaker, children }: { speaker: "user" | "assistant"; children: ReactNode }) {
  const SpeakerIcon = speaker === "user" ? UserRound : Bot;
  return <div className={`${s.conversationLine} ${speaker === "user" ? s.conversationUser : s.conversationAssistant}`}><SpeakerIcon aria-hidden="true" size={14} strokeWidth={1.8} /><span>{children}</span></div>;
}

function MemoryValueDiagram() {
  return (
    <figure className={s.memoryValueDiagram} aria-labelledby="memory-value-diagram-title">
      <div className={s.diagramTitle} id="memory-value-diagram-title">从每次重新认识，到跨会话理解</div>
      <div className={s.memoryValueFlow}>
        <article className={`${s.memoryWindow} ${s.memoryWindowNeutral}`}>
          <h4>无记忆</h4>
          <ConversationLine speaker="user">你偏好什么座位？</ConversationLine>
          <ConversationLine speaker="assistant">靠过道。</ConversationLine>
          <div className={s.sessionDivider}><span>下一次会话</span></div>
          <ConversationLine speaker="user">你偏好什么座位？</ConversationLine>
        </article>
        <div className={s.memoryBridge} aria-hidden="true"><span>保存 → 更新 → 使用</span><ArrowRight size={24} strokeWidth={1.7} /></div>
        <article className={`${s.memoryWindow} ${s.memoryWindowRemembered}`}>
          <h4>有记忆</h4>
          <ConversationLine speaker="user">你偏好什么座位？</ConversationLine>
          <ConversationLine speaker="assistant">靠过道。</ConversationLine>
          <div className={s.memoryNote}><FileText aria-hidden="true" size={15} strokeWidth={1.8} /><strong>长期偏好：靠过道</strong></div>
          <ConversationLine speaker="assistant">这次也优先找靠过道的座位。</ConversationLine>
          <small>仅在相关、有效时使用</small>
        </article>
      </div>
    </figure>
  );
}

function MemoryShapePanel({ variant }: { variant: "retrieval" | "state" }) {
  if (variant === "retrieval") {
    return <article className={`${s.memoryShapePanel} ${s.retrievalPanel}`}>
      <h4><Search aria-hidden="true" size={16} strokeWidth={1.8} />检索式记忆</h4>
      <div className={s.retrievalBody}>
        <div className={s.noteStack} aria-label="历史文档片段"><span>历史片段</span><span>旅行对话</span><span>偏好提及</span></div>
        <div className={s.retrievalConnector} aria-hidden="true"><Search size={25} strokeWidth={1.7} /><small>检索</small><ArrowRight size={18} strokeWidth={1.7} /></div>
        <div className={s.searchResults}><strong>相关结果</strong><span>1. 用户偏好靠过道</span><span>2. 通常选择素食餐</span></div>
      </div>
      <p>从历史文档中查找相关信息</p>
    </article>;
  }

  return <article className={`${s.memoryShapePanel} ${s.statePanel}`}>
    <h4><Database aria-hidden="true" size={16} strokeWidth={1.8} />状态式记忆</h4>
    <div className={s.stateSheet}>
      <div><UserRound aria-hidden="true" size={15} strokeWidth={1.8} /><strong>用户状态</strong></div>
      <span><Plane aria-hidden="true" size={13} strokeWidth={1.8} />座位默认：靠过道</span>
      <span><Utensils aria-hidden="true" size={13} strokeWidth={1.8} />餐食偏好：素食</span>
      <span><Crown aria-hidden="true" size={13} strokeWidth={1.8} />会员等级：金卡</span>
      <b><Clock3 aria-hidden="true" size={13} strokeWidth={1.8} />本次覆盖：靠窗休息</b>
    </div>
    <p>维护当前连贯的用户状态</p>
  </article>;
}

function MemoryShapeDiagram() {
  return <figure className={s.memoryShapeDiagram} aria-labelledby="memory-shape-diagram-title">
    <div className={s.shapeBracket}><span id="memory-shape-diagram-title">任务相关的信息</span></div>
    <div className={s.memoryShapeGrid}>
      <article className={`${s.memoryForm} ${s.structuredForm}`}>
        <h4><Database aria-hidden="true" size={17} strokeWidth={1.8} />结构化记忆</h4>
        <div className={s.structuredBody}><code>seat: aisle<br />meal: vegetarian<br />member_tier: gold</code><span>身份档案<br />会员<br />偏好<br />约束</span></div>
        <p>参与校验、过滤与工具参数</p>
      </article>
      <article className={`${s.memoryForm} ${s.unstructuredForm}`}>
        <h4><FileText aria-hidden="true" size={17} strokeWidth={1.8} />非结构化记忆</h4>
        <div className={s.notePaper}><span>短于一周的旅行通常不托运行李。</span><span>商务出行更重视效率。</span></div>
        <p>保留背景、情境与推理线索</p>
      </article>
    </div>
    <div className={s.routingDiagram} aria-label="内部状态按用途路由到模型上下文或工具参数">
      <div className={s.internalState}><Database aria-hidden="true" size={25} strokeWidth={1.5} /><strong>内部状态</strong></div>
      <div className={s.routingRows}>
        <div className={s.routingRow}><ArrowRight aria-hidden="true" size={18} /><span>影响决策的信息</span><ArrowRight aria-hidden="true" size={18} /><strong className={s.contextRoute}>模型上下文</strong><small>用于生成回答<br />不包含所有内部字段</small></div>
        <div className={s.routingRow}><ArrowRight aria-hidden="true" size={18} /><span>执行所需字段</span><ArrowRight aria-hidden="true" size={18} /><strong className={s.toolRoute}>工具参数</strong><small>用于调用工具<br />只包含必要字段</small></div>
      </div>
    </div>
    <figcaption>不要把内部系统的所有字段都灌进用户档案。</figcaption>
  </figure>;
}

type ScopeMemoryCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  items: Array<{ icon: LucideIcon; title: string; subtitle?: string }>;
  tone: "global" | "session";
};

function ScopeMemoryCard({ icon: Icon, title, subtitle, items, tone }: ScopeMemoryCardProps) {
  return <article className={`${s.scopeMemoryPanel} ${tone === "global" ? s.scopeGlobalPanel : s.scopeSessionPanel}`}>
    <div className={s.scopePanelHeader}><Icon aria-hidden="true" size={24} strokeWidth={1.8} /><div><h4>{title}</h4>{subtitle ? <p>{subtitle}</p> : null}</div></div>
    <div className={s.scopeMemoryItems}>{items.map(({ icon: ItemIcon, title: itemTitle, subtitle: itemSubtitle }) => <div className={s.scopeMemoryItem} key={itemTitle}><ItemIcon aria-hidden="true" size={26} strokeWidth={1.7} /><div><strong>{itemTitle}</strong>{itemSubtitle ? <small>{itemSubtitle}</small> : null}</div></div>)}</div>
  </article>;
}

function MemoryScopeDiagram() {
  return <figure className={s.memoryScopeDiagram} aria-labelledby="memory-scope-diagram-title">
    <div className={s.scopeMemoryStack}>
      <ScopeMemoryCard
        icon={Database}
        title="用户级记忆 · 跨会话默认值"
        subtitle="相对稳定，影响未来的多次行程"
        tone="global"
        items={[
          { icon: Plane, title: "通常偏好靠过道", subtitle: "座位偏好" },
          { icon: Utensils, title: "素食", subtitle: "饮食偏好" },
          { icon: Crown, title: "航司金卡会员", subtitle: "会员等级" }
        ]}
      />
      <div className={s.scopeDecision} aria-label="记忆是否持久的判断">
        <div className={`${s.scopeDecisionPath} ${s.scopeDecisionUp}`}><ArrowUp aria-hidden="true" size={23} /><span>是 → 整合后晋升</span></div>
        <div className={s.scopeDiamond} id="memory-scope-diagram-title"><span>是否持久？</span></div>
        <div className={`${s.scopeDecisionPath} ${s.scopeDecisionDown}`}><ArrowDown aria-hidden="true" size={23} /><span>仅本次 → 保留在会话</span></div>
      </div>
      <ScopeMemoryCard
        icon={FolderOpen}
        title="会话级记忆 · 当前暂存区"
        subtitle="临时、情境性的，通常只在本次会话中生效"
        tone="session"
        items={[
          { icon: UsersRound, title: "这次是家庭旅行" },
          { icon: Database, title: "本次预算不超过 2000 美元" },
          { icon: Moon, title: "今晚想靠窗睡觉" }
        ]}
      />
    </div>
    <div className={s.preferenceExample}>
      <h3>有效偏好示例</h3>
      <div className={s.preferenceFlow}>
        <div className={`${s.preferenceCard} ${s.preferenceDefault}`}><Plane aria-hidden="true" size={22} /><div><strong>全局默认：靠过道</strong><small>长期生效的偏好</small></div></div>
        <ArrowRight aria-hidden="true" size={20} />
        <div className={`${s.preferenceCard} ${s.preferenceOverride}`}><Plane aria-hidden="true" size={22} /><div><strong>本次覆盖：靠窗</strong><small>仅本次会话生效</small></div></div>
        <ArrowRight aria-hidden="true" size={20} />
        <div className={`${s.preferenceCard} ${s.preferenceCurrent}`}><Plane aria-hidden="true" size={22} /><div><strong>本次使用：靠窗</strong><small>当前生效的偏好</small></div></div>
      </div>
      <p>本次覆盖，不改写长期默认值。</p>
    </div>
  </figure>;
}

function MemoryLifetimeCards() {
  return <div className={s.memoryLifetimeCards}>
    <article className={s.lifetimeCard}>
      <h3><ShieldCheck aria-hidden="true" size={20} strokeWidth={1.8} />稳定性</h3>
      <div className={s.stabilityFlow}><div><CircleDot aria-hidden="true" size={20} /><span>靠过道</span></div><ArrowRight aria-hidden="true" size={22} /><div><CircleDot aria-hidden="true" size={20} /><span>靠过道</span></div><ArrowRight aria-hidden="true" size={22} /><div><CircleDot aria-hidden="true" size={20} /><span>靠过道</span></div></div>
      <p>验证稳定后，可结构化</p>
    </article>
    <article className={s.lifetimeCard}>
      <h3><BarChart3 aria-hidden="true" size={20} strokeWidth={1.8} />漂移</h3>
      <div className={s.budgetFlow}><span>预算<br />1000 美元</span><ArrowRight aria-hidden="true" size={18} /><span>预算<br />1500 美元</span><ArrowRight aria-hidden="true" size={18} /><span>预算<br />2000 美元</span></div>
      <p>保留时间，关注较新信息</p>
    </article>
    <article className={s.lifetimeCard}>
      <h3><GitBranch aria-hidden="true" size={20} strokeWidth={1.8} />上下文变异</h3>
      <div className={s.contextVariation}><strong>出行目的</strong><div><span>商务</span><ArrowRight aria-hidden="true" size={16} /><b>偏好靠过道</b></div><div><span>家庭</span><ArrowRight aria-hidden="true" size={16} /><b>更愿意省钱</b></div></div>
      <p>保留情境、置信度或有效期</p>
    </article>
  </div>;
}

type LifecycleNodeProps = { icon: LucideIcon; number: string; title: string; description: string; tone?: "green" | "amber" | "plain" };

function LifecycleNode({ icon: Icon, number, title, description, tone = "plain" }: LifecycleNodeProps) {
  return <article className={`${s.lifecycleNode} ${tone === "green" ? s.lifecycleNodeGreen : tone === "amber" ? s.lifecycleNodeAmber : ""}`}>
    <div className={s.lifecycleNodeTop}>{number ? <span>{number}</span> : null}<Icon aria-hidden="true" size={19} strokeWidth={1.8} /></div>
    <div><h4>{title}</h4><small>{description}</small></div>
  </article>;
}

function MemoryLifecycleDiagram() {
  return <figure className={s.memoryLifecycleDiagram} aria-labelledby="memory-lifecycle-diagram-title">
    <div className={s.lifecycleTitleRow}><h3 id="memory-lifecycle-diagram-title">一次会话做笔记，会话之后再整合</h3><span>三个记忆管理阶段，连接一个持续循环</span></div>
    <div className={s.lifecycleRealtime}>
      <strong className={s.lifecycleBandLabel}>实时会话</strong>
      <div className={s.lifecycleRealtimeFlow}>
        <LifecycleNode icon={UserRound} number="1" title="注入" description="根据记忆注入上下文" tone="green" />
        <ArrowRight aria-hidden="true" size={22} />
        <LifecycleNode icon={Bot} number="" title="推理 / 交互" description="理解需求、生成回应" tone="green" />
        <ArrowRight aria-hidden="true" size={22} />
        <LifecycleNode icon={Filter} number="2" title="蒸馏" description="会话级候选记忆" tone="green" />
      </div>
    </div>
    <div className={s.lifecycleDownlink}><ArrowDown aria-hidden="true" size={21} /><span>下一次会话</span></div>
    <div className={s.lifecycleAsync}>
      <strong className={s.lifecycleBandLabel}>会话结束后 · 异步</strong>
      <div className={s.lifecycleAsyncFlow}>
        <LifecycleNode icon={Database} number="" title="更新全局记忆" description="写入长期记忆" />
        <ArrowLeft aria-hidden="true" size={19} />
        <LifecycleNode icon={Trash2} number="" title="清零" description="清理临时信息" />
        <ArrowLeft aria-hidden="true" size={19} />
        <LifecycleNode icon={Scale} number="" title="冲突解决" description="按规则处理" />
        <ArrowLeft aria-hidden="true" size={19} />
        <LifecycleNode icon={FileText} number="" title="去重" description="合并相似内容" />
        <ArrowLeft aria-hidden="true" size={19} />
        <LifecycleNode icon={Merge} number="3" title="整合" description="筛选合格记忆" tone="amber" />
      </div>
    </div>
    <div className={s.lifecycleNotes}>
      <p><strong>蒸馏：</strong>从用户明确表达中捕获新信号，可操作的信号，先写入会话暂存区。也可在会话结束后，从可观测执行记录中提取。</p>
      <p><strong>整合：</strong>把会话级候选记忆合入全局记忆，处理冲突与过时信息。</p>
      <p><strong>注入：</strong>在运行前，把当前任务相关的记忆放入上下文。</p>
    </div>
    <div className={s.integrationWorkbench}>
      <h3>整合工作台</h3>
      <div className={s.integrationTableWrap} tabIndex={0} aria-label="整合工作台记忆处理示例">
        <table><thead><tr><th>原始笔记（Before）</th><th>决策（Decision）</th><th>整合结果（After）</th></tr></thead><tbody>
          <tr><td>喜欢靠过道<br />偏好过道座位</td><td>语义去重</td><td><strong className={s.resultGreen}>通常偏好靠过道</strong></td></tr>
          <tr><td>旧：偏好早班<br />新：以后优先晚班</td><td>明确变更，按规则更新</td><td><strong className={s.resultGreen}>优先晚班</strong></td></tr>
          <tr><td>这次靠窗休息</td><td>仅本次，不晋升</td><td><strong className={s.resultAmber}>保留在会话级记忆<small>不写入全局记忆</small></strong></td></tr>
        </tbody></table>
      </div>
      <p className={s.integrationWarning}><span>!</span><strong>整合最容易出错的地方：</strong>过度修剪、提升噪声、引入矛盾，都可能污染后续决策。</p>
    </div>
  </figure>;
}

type MemoryPipelineStep = { icon: LucideIcon; title: string; description: string };

function MemoryPipelineDiagram() {
  const steps: MemoryPipelineStep[] = [
    { icon: FileText, title: "准备状态", description: "定义与整理" },
    { icon: Database, title: "捕获与保留", description: "工具与会话" },
    { icon: Settings2, title: "注入与编排", description: "提示与 Hooks" },
    { icon: BarChart3, title: "整合更新", description: "评估与写回" }
  ];

  return <figure className={s.memoryPipelineDiagram} aria-label="记忆系统的八个设计步骤总览">
    <div className={s.pipelineSteps}>{steps.map(({ icon: Icon, title, description }, index) => <div className={s.pipelineStep} key={title}>
      <div><Icon aria-hidden="true" size={22} strokeWidth={1.8} /><strong>{title}</strong><small>{description}</small></div>
      {index < steps.length - 1 ? <ArrowRight aria-hidden="true" size={20} strokeWidth={1.7} /> : null}
    </div>)}</div>
  </figure>;
}

type StateObjectCardProps = { name: string; label: string; icon: LucideIcon; items: string[] };

function StateObjectDiagram() {
  const cards: StateObjectCardProps[] = [
    { name: "profile", label: "结构化档案", icon: UserRound, items: ["姓名：张三", "常旅客级别：金卡", "偏好：靠过道"] },
    { name: "global_notes", label: "全局笔记", icon: FileText, items: ["更喜欢高铁出行", "倾向早班机", "2026-09-09 更新"] },
    { name: "session_notes", label: "会话候选", icon: FileText, items: ["本次预算不超过 2000 美元", "希望靠窗", "2026-09-09 10:24"] },
    { name: "history", label: "近期行程", icon: BarChart3, items: ["2026-08-12 上海 → 北京", "2026-07-03 深圳 → 武汉", "2026-06-18 北京 → 杭州"] }
  ];

  return <figure className={`${s.memoryPipelineFigure} ${s.stateObjectDiagram}`} aria-labelledby="state-object-diagram-title">
    <div className={s.visualPanelTitle} id="state-object-diagram-title"><FolderOpen aria-hidden="true" size={20} strokeWidth={1.8} />状态对象</div>
    <div className={s.stateObjectGrid}>{cards.map(({ name, label, icon: Icon, items }) => <article className={s.stateObjectCard} key={name}>
      <div className={s.stateObjectCardHeader}><Icon aria-hidden="true" size={21} strokeWidth={1.8} /><div><strong>{name}</strong><small>{label}</small></div></div>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>)}</div>
  </figure>;
}

function DistillDiagram() {
  return <figure className={`${s.memoryPipelineFigure} ${s.distillDiagram}`} aria-labelledby="distill-diagram-title">
    <div className={s.distillFlow}>
      <div className={s.distillUserSignal}><ConversationLine speaker="user">以后出差我更喜欢坐靠窗。</ConversationLine></div>
      <ArrowRight aria-hidden="true" size={25} strokeWidth={1.7} />
      <article className={s.distillSaveCard}>
        <h4 id="distill-diagram-title"><Settings2 aria-hidden="true" size={19} strokeWidth={1.8} />保存记忆笔记</h4>
        <ul><li><CheckCircle2 aria-hidden="true" size={14} />用户明确表达</li><li><CheckCircle2 aria-hidden="true" size={14} />可用于日后</li><li><CheckCircle2 aria-hidden="true" size={14} />抽象字段</li></ul>
      </article>
      <ArrowRight aria-hidden="true" size={25} strokeWidth={1.7} />
      <article className={s.distillCandidateCard}><FileText aria-hidden="true" size={21} strokeWidth={1.8} /><div><strong>会话候选：优先靠窗</strong><small>仅保留到会话暂存区</small></div></article>
    </div>
    <div className={s.distillGuardFlow}>
      <div className={s.distillSoftCard}><FileText aria-hidden="true" size={18} /><strong>推测性偏好</strong><small>例如：可能喜欢夜航</small></div>
      <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
      <div className={s.distillSoftCard}><ShieldCheck aria-hidden="true" size={18} /><strong>敏感信息 / 系统指令</strong><small>例如：内部政策、密码</small></div>
      <ArrowRight className={s.distillDashedArrow} aria-hidden="true" size={20} strokeWidth={1.5} />
      <div className={s.distillReject}><CircleSlash2 aria-hidden="true" size={20} /><span>不保存</span></div>
    </div>
  </figure>;
}

function TrimConversation({ muted = false, children }: { muted?: boolean; children: ReactNode }) {
  return <div className={`${s.trimMessage} ${muted ? s.trimMessageMuted : ""}`}><span className={s.trimMessageAvatar}><CircleDot aria-hidden="true" size={15} /></span><span>{children}</span></div>;
}

function TrimDiagram() {
  return <figure className={`${s.memoryPipelineFigure} ${s.trimDiagram}`} aria-labelledby="trim-diagram-title">
    <div className={s.trimSignalRow}><strong>本次预算不超过 2000 美元</strong><span>修剪标志 = true → 重新注入</span></div>
    <div className={s.trimFlow}>
      <article className={`${s.trimHistoryPanel} ${s.trimMutedPanel}`}><h4>更早的对话轮次<small>超出上下文窗口</small></h4><div><TrimConversation muted>……</TrimConversation><TrimConversation muted>……</TrimConversation></div></article>
      <ArrowRight aria-hidden="true" size={24} strokeWidth={1.7} />
      <article className={s.trimContextPanel}><h4 id="trim-diagram-title">上下文窗口 <small>（保留最近 3 个轮次）</small></h4><div><TrimConversation><b>用户</b>我想去上海出差。</TrimConversation><TrimConversation><b>助手</b>好的，我来帮您查询。</TrimConversation><TrimConversation><b>用户</b>本次预算不超过 2000 美元。</TrimConversation></div></article>
      <ArrowRight aria-hidden="true" size={24} strokeWidth={1.7} />
      <article className={`${s.trimHistoryPanel} ${s.trimMutedPanel}`}><h4>后续对话<small>新一轮</small></h4><div><TrimConversation muted>……</TrimConversation><TrimConversation muted>……</TrimConversation></div></article>
    </div>
  </figure>;
}

function InjectionDiagram() {
  const priorities = [
    { number: "1", title: "当前用户要求", description: "最高优先级" },
    { number: "2", title: "会话覆盖", description: "本次会话有效" },
    { number: "3", title: "全局默认值", description: "长期偏好" }
  ];

  return <figure className={`${s.memoryPipelineFigure} ${s.injectionDiagram}`} aria-labelledby="injection-diagram-title">
    <div className={s.injectionGrid}>
      <div className={s.priorityList}>{priorities.map(({ number, title, description }) => <div className={s.priorityItem} key={number}><span>{number}</span><div><strong>{title}</strong><small>（{description}）</small></div></div>)}</div>
      <div className={s.trustedProfile}><UserRound aria-hidden="true" size={28} strokeWidth={1.7} /><strong id="injection-diagram-title">可信档案</strong><small>先校验来源与适用范围</small></div>
      <article className={s.injectionExample}><strong>示例：临时需求覆盖默认偏好</strong><div><span>通常靠过道<small>全局默认值</small></span><ArrowRight aria-hidden="true" size={21} /><b>这次靠窗<small>当前用户要求</small></b></div><p>这是本次会话的临时偏好，不会自动更新全局记忆。</p></article>
    </div>
  </figure>;
}

function RenderStateDiagram() {
  return <figure className={`${s.memoryPipelineFigure} ${s.renderStateDiagram}`} aria-label="结构化档案和记忆笔记的渲染方式">
    <article><h4>结构化档案 → YAML frontmatter</h4><pre>seat_preference: aisle{`\n`}meal: vegetarian</pre></article>
    <article><h4>记忆笔记 → Markdown 列表</h4><div className={s.markdownNotes}><span>- 通常偏好靠过道</span><span>- 短途旅行不托运行李</span></div></article>
    <ul><li>确定性渲染</li><li>精选相关条目</li><li>保留时间信息</li></ul>
  </figure>;
}

function HooksDiagram() {
  return <figure className={`${s.memoryPipelineFigure} ${s.hooksDiagram}`} aria-label="使用 Hooks 编排记忆注入自动化">
    <div className={s.hookNode}><PlayCircle aria-hidden="true" size={20} /><strong>运行开始</strong></div><ArrowRight aria-hidden="true" size={22} />
    <div className={s.hookNode}><FileText aria-hidden="true" size={20} /><strong>渲染档案与全局记忆</strong></div><ArrowRight aria-hidden="true" size={22} />
    <div className={s.hookDecision}><span>发生偏好吗？</span></div>
    <div className={s.hookBranches}><div><b>是</b><ArrowRight aria-hidden="true" size={18} /><span className={s.hookPositive}><FileText aria-hidden="true" size={17} />补入会话记忆</span></div><div><b>否</b><ArrowRight aria-hidden="true" size={18} /><span className={s.hookNegative}><Clock3 aria-hidden="true" size={17} />跳过注入</span></div></div>
  </figure>;
}

function AssembleAgentDiagram() {
  return <figure className={`${s.memoryPipelineFigure} ${s.assembleAgentDiagram}`} aria-label="组装记忆化智能体">
    <div className={s.assembleInputs}><div><UserRound aria-hidden="true" size={19} /><strong>基础角色设定</strong><small>你是一名专业的差旅助手</small></div><div><FileText aria-hidden="true" size={19} /><strong>个人偏好档案</strong><small>个人偏好与约束</small></div><div><FileText aria-hidden="true" size={19} /><strong>精选记忆与使用策略</strong><small>相关记忆与规则</small></div></div>
    <ArrowRight aria-hidden="true" size={23} />
    <div className={s.promptNode}><FileText aria-hidden="true" size={22} /><strong>本轮提示词</strong><small>得到记忆化的提示</small></div>
    <div className={s.assembleBranches}><div><Settings2 aria-hidden="true" size={18} /><strong>记忆工具</strong><small>保存 / 查询 / 更新</small></div><div><GitBranch aria-hidden="true" size={18} /><strong>生命周期 Hooks</strong><small>运行时自动化</small></div></div>
    <ArrowRight aria-hidden="true" size={23} />
    <div className={s.agentNode}><Bot aria-hidden="true" size={24} /><strong>Agent</strong><small>差旅助手</small></div>
  </figure>;
}

function AfterConversationDiagram() {
  const nodes = [
    { icon: CircleDot, title: "有效性", description: "值得长期保存" },
    { icon: Merge, title: "去重", description: "合并相似内容" },
    { icon: Scale, title: "冲突解决", description: "以最新为准" },
    { icon: ShieldCheck, title: "有效性校验", description: "不引入新事实" },
    { icon: Database, title: "更新全局", description: "每条一句话" },
    { icon: FolderOpen, title: "状态对象", description: "更新后" }
  ];

  return <figure className={`${s.memoryPipelineFigure} ${s.afterConversationDiagram}`} aria-label="会话后记忆整合流程">
    <div className={s.afterFlow}>{nodes.map(({ icon: Icon, title, description }, index) => <div className={s.afterFlowItem} key={title}><div><Icon aria-hidden="true" size={19} /><strong>{title}</strong><small>{description}</small></div>{index < nodes.length - 1 ? <ArrowRight aria-hidden="true" size={20} /> : null}</div>)}</div>
    <div className={s.afterFooter}><span>仅本次不晋升</span><strong>整合成功后，清空会话暂存区。</strong></div>
  </figure>;
}

type EvaluationConversation = {
  label: string;
  date: string;
  quote: string;
  result: string;
  resultDetail: string;
  tone: "plain" | "amber";
};

function EvaluationTimelineDiagram() {
  const conversations: EvaluationConversation[] = [
    { label: "会话 A：通常靠过道", date: "2024-06-01 10:24", quote: "我通常总是想要靠过道的座位。", result: "捕获长期偏好", resultDetail: "", tone: "plain" },
    { label: "会话 B：这次靠窗", date: "2024-08-14 16:20", quote: "这次出差我想要靠窗。", result: "仅覆盖当前行程", resultDetail: "", tone: "amber" },
    { label: "会话 C：恢复默认", date: "2024-10-03 09:17", quote: "下次还是帮我订靠过道吧。", result: "仍优先靠过道", resultDetail: "", tone: "plain" }
  ];

  return <figure className={`${s.memoryEvalFigure} ${s.evaluationTimeline}`} aria-labelledby="evaluation-timeline-title">
    <div className={s.visualPanelTitle} id="evaluation-timeline-title"><Database aria-hidden="true" size={20} strokeWidth={1.8} />把同一个用户，放进连续的时间里测试</div>
    <div className={s.evaluationArc} aria-hidden="true"><span>长期记忆应保留</span><i /><i /></div>
    <div className={s.evaluationCards}>{conversations.map(({ label, date, quote, result, tone }, index) => <div className={s.evaluationCardGroup} key={label}>
      <article className={`${s.evaluationConversation} ${tone === "amber" ? s.evaluationConversationAmber : ""}`}><MessageCircle aria-hidden="true" size={20} strokeWidth={1.8} /><div><strong>{label}</strong><small>{date}</small><p>“{quote}”</p></div></article>
      <div className={`${s.evaluationResult} ${tone === "amber" ? s.evaluationResultAmber : ""}`}><CheckCircle2 aria-hidden="true" size={18} /><div><small>预期结果</small><strong>{result}</strong></div></div>
      {index < conversations.length - 1 ? <ArrowRight className={s.evaluationArrow} aria-hidden="true" size={23} strokeWidth={1.7} /> : null}
    </div>)}</div>
    <div className={s.evaluationTemporaryLabel}>临时覆盖</div>
  </figure>;
}

type EvaluationDimension = { icon: LucideIcon; title: string; items: string[] };

function EvaluationDimensionsDiagram() {
  const dimensions: EvaluationDimension[] = [
    { icon: Database, title: "蒸馏 · 捕获质量", items: ["精确率", "召回率", "敏感写入拦截"] },
    { icon: FileText, title: "注入 · 使用质量", items: ["时效正确性", "是否影响当前意图", "Token 效率"] },
    { icon: Settings2, title: "整合 · 更新质量", items: ["去重质量", "冲突解决", "是否引入新事实"] }
  ];

  return <figure className={s.evaluationDimensions} aria-labelledby="evaluation-dimensions-title">
    <h3 id="evaluation-dimensions-title">评估维度与关注点</h3>
    <div>{dimensions.map(({ icon: Icon, title, items }) => <article key={title}><h4><Icon aria-hidden="true" size={19} strokeWidth={1.8} />{title}</h4><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
    <figcaption>评估维度，不代表实测结果。</figcaption>
  </figure>;
}

function EvaluationStrategyList() {
  const strategies = [
    { icon: FlaskConical, title: "策略 A/B：相关度 vs 相关度 + 时效", detail: "对比不同检索与排序策略的效果" },
    { icon: TrendingUp, title: "偏好漂移：模拟同一用户随时间变化", detail: "测试记忆在时间维度上的稳定性" },
    { icon: ShieldAlert, title: "对抗样本：敏感写入与指令伪装", detail: "验证系统对恶意或非必要输入的拦截性" }
  ];

  return <div className={s.evaluationStrategy}><h3>让测试覆盖真实失败方式</h3><div>{strategies.map(({ icon: Icon, title, detail }) => <article key={title}><Icon aria-hidden="true" size={19} strokeWidth={1.8} /><strong>{title}</strong><span>{detail}</span><ArrowRight aria-hidden="true" size={17} /></article>)}</div></div>;
}

function EvaluationMetrics() {
  const metrics = [
    { icon: FileText, label: "每百轮写入次数" },
    { icon: UsersRound, label: "用户覆盖偏好的频率" },
    { icon: Timer, label: "正确应用所需轮数" },
    { icon: ShieldCheck, label: "敏感写入拦截率" }
  ];

  return <div className={s.evaluationMetrics}><strong>关键评估指标（示例）</strong><div>{metrics.map(({ icon: Icon, label }) => <span key={label}><Icon aria-hidden="true" size={19} strokeWidth={1.8} />{label}</span>)}</div></div>;
}

type GuardCheck = { icon: LucideIcon; title: string; detail: string; reject: string };

function GuardrailPipelineDiagram() {
  const checks: GuardCheck[] = [
    { icon: Filter, title: "捕获检查", detail: "抽象字段 · 拒绝敏感载荷", reject: "拒绝" },
    { icon: Database, title: "整合检查", detail: "无虚构 · 去重 · 冲突规则", reject: "不晋升" },
    { icon: ShieldCheck, title: "注入检查", detail: "相关性 · 时效 · 数据边界", reject: "不注入" }
  ];

  return <figure className={`${s.memoryGuardFigure} ${s.guardrailPipeline}`} aria-labelledby="guardrail-pipeline-title">
    <div className={s.visualPanelTitle} id="guardrail-pipeline-title"><ShieldAlert aria-hidden="true" size={20} strokeWidth={1.8} />多层检查，防止不安全或不合适的记忆进入上下文</div>
    <div className={s.guardrailFlow}>
      <div className={s.guardrailSignals}><div><FileText aria-hidden="true" size={18} /><strong>敏感信息</strong><small>如个人身份、支付信息</small></div><div><AlertTriangle aria-hidden="true" size={18} /><strong>伪装成系统规则</strong><small>如“你必须始终……”</small></div><div><Clock3 aria-hidden="true" size={18} /><strong>过时偏好</strong><small>如已不再适用的信息</small></div></div>
      {checks.map(({ icon: Icon, title, detail, reject }, index) => <div className={s.guardrailCheckGroup} key={title}><article><Icon aria-hidden="true" size={21} strokeWidth={1.8} /><strong>{title}</strong><small>{detail}</small></article><div className={s.guardrailReject}><XCircle aria-hidden="true" size={17} />{reject}</div>{index < checks.length - 1 ? <ArrowRight className={s.guardrailArrow} aria-hidden="true" size={21} /> : null}</div>)}
      <article className={s.contextSafeNode}><FileText aria-hidden="true" size={21} strokeWidth={1.8} /><strong>本轮上下文</strong><small>仅包含通过检查的安全记忆</small></article>
    </div>
  </figure>;
}

function SystemBoundaryDiagram() {
  return <figure className={s.systemBoundaryDiagram} aria-labelledby="system-boundary-title">
    <h3 id="system-boundary-title">系统规则与记忆的边界</h3>
    <div className={s.boundaryGrid}>
      <article className={s.systemRuleCard}><Settings2 aria-hidden="true" size={23} strokeWidth={1.8} /><div><strong>系统规则</strong><small>定义模型的行为与能力边界</small></div></article>
      <article className={s.referenceMemoryCard}><FileText aria-hidden="true" size={23} strokeWidth={1.8} /><div><strong>参考数据</strong><span>通常靠过道</span><small>来自用户记忆，仅作为参考数据</small></div></article>
      <p>用户记忆不会成为系统规则，也不会替代模型的原始指令。</p>
    </div>
  </figure>;
}

function ConclusionDecisionDiagram() {
  return <figure className={`${s.memoryConclusionFigure} ${s.conclusionDecision}`} aria-labelledby="conclusion-decision-title">
    <div className={s.litmusQuestion}><CircleHelp aria-hidden="true" size={24} strokeWidth={1.8} /><div><strong id="conclusion-decision-title">先问一个试金石问题</strong><span>记住上一次交互，是否能实质性地帮助它更好或更快地完成任务？</span></div></div>
    <div className={s.decisionBranches}><div><b>是</b><ArrowRight aria-hidden="true" size={18} /><strong>从简单记忆流水线开始</strong></div><div><b>不明确</b><ArrowRight aria-hidden="true" size={18} /><strong>先验证收益</strong></div></div>
  </figure>;
}

function IterationLoopDiagram() {
  const steps = [
    { icon: FileText, title: "基础方案" },
    { icon: BarChart3, title: "收集真实失败" },
    { icon: Settings2, title: "针对性改进" },
    { icon: PlayCircle, title: "重跑评估" }
  ];

  return <figure className={s.iterationLoopDiagram} aria-labelledby="iteration-loop-title">
    <h3 id="iteration-loop-title">持续迭代，基于真实结果改进</h3>
    <div className={s.iterationFlow}>{steps.map(({ icon: Icon, title }, index) => <div className={s.iterationStep} key={title}><div><Icon aria-hidden="true" size={18} /><strong>{title}</strong></div>{index < steps.length - 1 ? <ArrowRight aria-hidden="true" size={19} /> : null}</div>)}</div>
    <div className={s.iterationLoopBack}><RefreshCw aria-hidden="true" size={17} /><span>必要时再评估微调专用记忆模型</span></div>
  </figure>;
}

function TravelCaseOverviewDiagram() {
  return <figure className={s.travelCaseOverview} aria-labelledby="travel-case-overview-title">
    <div className={s.travelCaseUserLine}>
      <div className={s.travelCaseUserBadge}><UserRound aria-hidden="true" size={22} strokeWidth={1.8} /><strong>用户</strong></div>
      <div className={s.travelCasePrompt} id="travel-case-overview-title">帮我安排下周出差。这次想靠窗休息；以后短途优先高铁。</div>
    </div>
    <div className={s.travelCaseSignals}>
      <span className={s.travelCaseSessionSignal}><FileText aria-hidden="true" size={18} strokeWidth={1.8} />这次靠窗 → 会话覆盖</span>
      <span className={s.travelCaseGlobalSignal}><Plane aria-hidden="true" size={19} strokeWidth={1.8} />以后短途优先高铁 → 长期候选</span>
    </div>
  </figure>;
}

type TravelStage = {
  number: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  content: ReactNode;
  className: string;
  contentClassName?: string;
  footer?: ReactNode;
};

function TravelStageCard({ number, title, description, icon: Icon, content, className, contentClassName, footer }: TravelStage) {
  return <article className={`${s.travelStageCard} ${className}`}>
    <div className={s.travelStageHeading}><span>{number}</span><h4>{title}</h4></div>
    <p>{description}</p>
    <div className={`${s.travelStageContent} ${contentClassName ?? ""}`}>{Icon ? <Icon aria-hidden="true" size={24} strokeWidth={1.8} /> : null}{content}</div>
    {footer ? <p className={s.travelStageFooter}>{footer}</p> : null}
  </article>;
}

function TravelServiceLifecycleDiagram() {
  return <figure className={s.travelLifecycleDiagram} aria-labelledby="travel-lifecycle-title">
    <div className={s.travelLifecycleArc} id="travel-lifecycle-title"><span>跨会话积累，临时覆盖不扩散</span></div>
    <div className={s.travelStageGrid}>
      <TravelStageCard
        number="1"
        title="会话开始前"
        description="读取已有的状态对象，了解用户的默认偏好。"
        className={s.travelStageOne}
        contentClassName={s.travelStateContent}
        content={<div><div className={s.travelStateHeader}><FolderOpen aria-hidden="true" size={32} strokeWidth={1.8} /><strong>状态对象</strong></div><ul className={s.travelStateList}><li>profile：素食</li><li>全局：通常靠过道</li></ul></div>}
      />
      <ArrowRight className={`${s.travelStageArrow} ${s.travelArrowOne}`} aria-hidden="true" size={22} strokeWidth={1.7} />
      <TravelStageCard
        number="2"
        title="新会话开始"
        description="档案与精选的全局记忆被注入，构成本轮上下文。"
        icon={FileStack}
        className={s.travelStageTwo}
        content={<div><strong>档案 + 精选全局记忆<br />→ 本轮上下文</strong></div>}
        footer="YAML + Markdown"
      />
      <ArrowRight className={`${s.travelStageArrow} ${s.travelArrowTwo}`} aria-hidden="true" size={22} strokeWidth={1.7} />
      <TravelStageCard
        number="3"
        title="会话进行中"
        description="从用户表达中提取记忆候选，并暂存到会话区。"
        className={s.travelStageThree}
        contentClassName={s.travelStageThreeContent}
        content={<div><div className={s.travelConversationBubble}><UserRound aria-hidden="true" size={16} strokeWidth={1.8} /><p className={s.travelMiniQuote}>帮我安排下周出差。<br />这次想靠窗休息；<br />以后短途优先高铁。</p></div><div className={s.travelMiniSignals}><span>这次靠窗</span><span>短途优先高铁</span></div></div>}
        footer="保存记忆工具 → 会话暂存区"
      />
      <ArrowDown className={`${s.travelStageArrow} ${s.travelArrowThree}`} aria-hidden="true" size={22} strokeWidth={1.7} />
      <TravelStageCard
        number="4"
        title="上下文被修剪"
        description="当对话变长时，修剪旧消息，并重新注入必要的会话记忆。"
        className={s.travelStageFour}
        content={<div className={s.travelTrimPreview}><div className={s.travelTrimGhost}>······</div><strong><MessageCircle aria-hidden="true" size={13} strokeWidth={1.8} />本次：靠窗</strong><div className={s.travelTrimGhost}>······</div></div>}
        footer="修剪后重新注入必要会话记忆"
      />
      <ArrowLeft className={`${s.travelStageArrow} ${s.travelArrowFour}`} aria-hidden="true" size={22} strokeWidth={1.7} />
      <TravelStageCard
        number="5"
        title="会话结束"
        description="对暂存的记忆进行筛选、整合，决定哪些写入长期记忆。"
        className={s.travelStageFive}
        contentClassName={s.travelStageFiveContent}
        content={<div className={s.travelSessionResults}><h5><Filter aria-hidden="true" size={24} strokeWidth={1.8} />异步整合</h5><strong><CheckCircle2 aria-hidden="true" size={14} strokeWidth={1.8} /><span>短途优先高铁<small>整合为长期记忆</small></span></strong><strong><CircleMinus aria-hidden="true" size={14} strokeWidth={1.8} /><span>本次靠窗：不晋升<small>仅本次会话</small></span></strong></div>}
        footer="去重 · 冲突处理 · 无虚构"
      />
      <ArrowLeft className={`${s.travelStageArrow} ${s.travelArrowFive}`} aria-hidden="true" size={22} strokeWidth={1.7} />
      <TravelStageCard
        number="6"
        title="下一次运行"
        description="使用更新后的状态对象，提供更贴合的服务。"
        className={s.travelStageSix}
        contentClassName={s.travelStateContent}
        content={<div><div className={s.travelStateHeader}><FolderOpen aria-hidden="true" size={32} strokeWidth={1.8} /><strong>状态对象（已更新）</strong></div><ul className={s.travelStateList}><li>通常靠过道</li><li>短途优先高铁</li></ul></div>}
        footer="继续使用更新后的状态"
      />
      <ArrowUp className={`${s.travelStageArrow} ${s.travelArrowSix}`} aria-hidden="true" size={22} strokeWidth={1.7} />
    </div>
  </figure>;
}

function TravelMemoryLifespanTable() {
  return <div className={s.travelTableBlock}>
    <div className={s.travelTableWrap} tabIndex={0} aria-label="同一句话在不同会话中的记忆寿命比较">
      <table className={s.travelTable}><thead><tr><th scope="col">用户表达</th><th scope="col">本次会话</th><th scope="col">下一次会话</th></tr></thead><tbody>
        <tr><th scope="row">这次想靠窗休息</th><td>覆盖座位默认值</td><td>不沿用本次例外</td></tr>
        <tr><th scope="row">以后短途优先高铁</th><td>写入候选并确认适用范围</td><td>整合后作为长期默认</td></tr>
        <tr><th scope="row">原有：通常靠过道</th><td>被本次覆盖，仍保留</td><td>仍是适用行程的默认值</td></tr>
      </tbody></table>
    </div>
  </div>;
}

function TravelDesignMappingTable() {
  return <div className={s.travelMappingBlock}>
    <div className={s.travelTableWrap} tabIndex={0} aria-label="差旅案例与记忆设计步骤映射">
      <table className={s.travelTable}><thead><tr><th scope="col">状态对象与作用域</th><th scope="col">案例中的阶段</th></tr></thead><tbody>
        <tr><th scope="row">状态对象与作用域</th><td>会话开始前</td></tr>
        <tr><th scope="row">注入、渲染与 Hooks</th><td>新会话与修剪之后</td></tr>
        <tr><th scope="row">蒸馏与整合</th><td>对话进行中与会话结束</td></tr>
      </tbody></table>
    </div>
  </div>;
}

export default function AgentNinthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}>
    <AgentLessonSection id="section-1" title="1. 为什么记忆很重要">
      <p>智能体正在从“响应式的助手”演变为“有适应力的协作者”。记忆管理的核心，是管理模型在任意时刻“知道什么”——即存储什么、召回什么、注入什么。</p>
      <MemoryValueDiagram />
      <div className={s.perspectiveGrid}>
        <article><UserRound aria-hidden="true" size={20} strokeWidth={1.8} /><div><h3>用户视角</h3><p>被理解的体验，带来信任与愉悦。</p></div></article>
        <article><Building2 aria-hidden="true" size={20} strokeWidth={1.8} /><div><h3>企业视角</h3><p>交互沉淀为更高信号的行为信息，帮助改善服务、留存与需求洞察。</p></div></article>
      </div>
      <p>记忆也可以帮助客服、客户经理与旅行顾问理解用户。不同类型的智能体需要不同节奏的记忆：人生教练的记忆变化更快，IT 故障排除更需要稳定、可预测的状态。</p>
    </AgentLessonSection>

    <AgentLessonSection id="section-2" title="2. Agent 记忆的架构决策">
      <p className={s.ninthQuote}>“记忆没有放之四海而皆准的方案。设计从使用场景出发。”</p>
      <section className={s.ninthSubsection} id="section-2-1" aria-labelledby="section-2-1-title">
        <h3 id="section-2-1-title">2.1 检索式记忆 vs 状态式记忆</h3>
        <div className={s.memoryComparison}>
          <MemoryShapePanel variant="retrieval" />
          <MemoryShapePanel variant="state" />
        </div>
        <div className={s.comparisonTableWrap} tabIndex={0} aria-label="检索式记忆与状态式记忆比较表">
          <table className={s.comparisonTable}><thead><tr><th scope="col">对比维度</th><th scope="col">检索式记忆</th><th scope="col">状态式记忆</th></tr></thead><tbody>
            <tr><th scope="row">数据形态</th><td>松散关联的文档</td><td>结构化字段与当前状态</td></tr>
            <tr><th scope="row">更新方式</th><td>查找相关片段</td><td>显式更新与冲突规则</td></tr>
            <tr><th scope="row">使用特点</th><td>依赖检索质量</td><td>一致应用有效状态</td></tr>
          </tbody></table>
        </div>
        <p>本课差旅案例采用状态式设计：会员、座位、预算与行程约束需要跨任务保持一致。检索也可与状态更新组合使用。</p>
      </section>

      <section className={s.ninthSubsection} id="section-2-2" aria-labelledby="section-2-2-title">
        <h3 id="section-2-2-title">2.2 记忆的形态</h3>
        <p className={s.ninthQuote}>“如果是人类代理，他会主动记住什么来完成任务？”</p>
        <MemoryShapeDiagram />
        <p>结构化字段从可信来源同步，笔记补充灵活信息。本课案例只从用户显式表达中提取候选记忆。</p>
      </section>
      <section className={s.ninthSubsection} id="section-2-3" aria-labelledby="section-2-3-title">
        <h3 id="section-2-3-title">2.3 记忆作用域</h3>
        <p>按作用域分离记忆，降低噪声，让演化更安全。如果它默认应该影响未来的行程，存为全局；如果只是当前需要，保留为会话级。</p>
        <MemoryScopeDiagram />
      </section>
      <section className={s.ninthSubsection} id="section-2-4" aria-labelledby="section-2-4-title">
        <h3 id="section-2-4-title">2.4 记忆生命周期</h3>
        <p>持续区分哪些是持久的、哪些是情境性的。记忆设计应当随系统的学习而演进。</p>
        <MemoryLifetimeCards />
        <MemoryLifecycleDiagram />
      </section>
    </AgentLessonSection>

    <AgentLessonSection id="section-3" title="3. 构建一个记忆系统：八个设计步骤">
      <p>从状态对象到会话后整合，把架构决策落成一条可运行的记忆流水线。以下是差旅助手案例的实现方式。</p>
      <MemoryPipelineDiagram />

      <section className={s.ninthSubsection} id="section-3-1" aria-labelledby="section-3-1-title">
        <h3 id="section-3-1-title">3.1 定义状态对象</h3>
        <p>建立明确的事实来源，不把内部系统的所有字段都暴露给模型。</p>
        <StateObjectDiagram />
      </section>

      <section className={s.ninthSubsection} id="section-3-2" aria-labelledby="section-3-2-title">
        <h3 id="section-3-2-title">3.2 实时记忆蒸馏</h3>
        <p>让模型通过专用工具保存记忆。工具说明本身，就是捕获质量的关键。</p>
        <DistillDiagram />
      </section>

      <section className={s.ninthSubsection} id="section-3-3" aria-labelledby="section-3-3-title">
        <h3 id="section-3-3-title">3.3 修剪会话</h3>
        <p>只保留最近 N 个用户轮次。修剪后设置标志，下一轮重新注入必要的会话记忆。</p>
        <TrimDiagram />
      </section>

      <section className={s.ninthSubsection} id="section-3-4" aria-labelledby="section-3-4-title">
        <h3 id="section-3-4-title">3.4 记忆注入与优先级规则</h3>
        <p>记忆默认为参考，不能覆盖用户当下的业务意图。影响重大且无法判断时，聚焦澄清。</p>
        <InjectionDiagram />
      </section>

      <section className={s.ninthSubsection} id="section-3-5" aria-labelledby="section-3-5-title">
        <h3 id="section-3-5-title">3.5 渲染状态</h3>
        <p>将结构化数据与精选记忆渲染为清晰的文本格式，便于模型使用。</p>
        <RenderStateDiagram />
      </section>

      <section className={s.ninthSubsection} id="section-3-6" aria-labelledby="section-3-6-title">
        <h3 id="section-3-6-title">3.6 用 Hooks 编排自动化</h3>
        <p>事件触发，在需要时注入会话记忆，避免重复注入。</p>
        <HooksDiagram />
      </section>

      <section className={s.ninthSubsection} id="section-3-7" aria-labelledby="section-3-7-title">
        <h3 id="section-3-7-title">3.7 组装智能体</h3>
        <p>每次运行根据最新状态生成提示词。记忆内容以清晰分隔块包装，作为数据使用。</p>
        <AssembleAgentDiagram />
      </section>

      <section className={s.ninthSubsection} id="section-3-8" aria-labelledby="section-3-8-title">
        <h3 id="section-3-8-title">3.8 会话后记忆整合</h3>
        <p>对会话产生的候选记忆进行清洗、合并和更新，形成更稳定的长期记忆。</p>
        <AfterConversationDiagram />
      </section>
    </AgentLessonSection>

    <AgentLessonSection id="section-4" title="4. 记忆评估">
      <p>记忆系统是一条提取、整合与注入的流水线。评估应覆盖端到端，并关注时间的变化：过去的记忆只应在相关时帮助当前任务。</p>
      <EvaluationTimelineDiagram />
      <EvaluationDimensionsDiagram />
      <EvaluationStrategyList />
      <EvaluationMetrics />
    </AgentLessonSection>

    <AgentLessonSection id="section-5" title="5. 记忆护栏">
      <p>记忆会进入模型上下文。错误或恶意内容一旦被反复使用，就可能持续影响后续判断。</p>
      <GuardrailPipelineDiagram />
      <SystemBoundaryDiagram />
      <section className={s.ninthSubsection} id="section-5-1" aria-labelledby="section-5-1-title">
        <h3 id="section-5-1-title">5.1 蒸馏检查</h3>
        <p>限制可写字段，拦截敏感内容与指令伪装。</p>
      </section>
      <section className={s.ninthSubsection} id="section-5-2" aria-labelledby="section-5-2-title">
        <h3 id="section-5-2-title">5.2 整合检查</h3>
        <p>不添加源记忆中不存在的事实，按明确规则处理冲突、重复与失效。</p>
      </section>
      <section className={s.ninthSubsection} id="section-5-3" aria-labelledby="section-5-3-title">
        <h3 id="section-5-3-title">5.3 注入检查</h3>
        <p>筛选相关、有效的记忆，使用清晰的数据边界。分隔符有帮助，但不能单独保证安全。</p>
      </section>
      <div className={s.memoryGuardrailCallout}><Lightbulb aria-hidden="true" size={20} strokeWidth={1.8} /><strong>可能改变行为的记忆，要经过捕获、整合与注入三次检查。</strong></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-6" title="6. 结论与下一步">
      <p>并非每个任务在第一天就需要长期记忆。最好的记忆系统是“精准”的：针对具体任务，明确能记什么、不能记什么。</p>
      <ConclusionDecisionDiagram />
      <IterationLoopDiagram />
      <p className={s.memoryConclusionQuote}>“从简单开始，严格评估，审慎演化。”</p>
    </AgentLessonSection>

    <AgentLessonSection id="section-7" title="7. 案例演示：差旅助手智能体">
      <p>把档案、会话记忆、长期记忆和整合任务串进一次完整的差旅服务。以下为教学用虚构案例。</p>
      <TravelCaseOverviewDiagram />

      <section className={s.ninthSubsection} id="section-7-1" aria-labelledby="section-7-1-title">
        <h3 id="section-7-1-title">7.1 完整差旅服务的六个阶段</h3>
        <p>从一次用户请求开始，经历记忆的捕获、使用、修剪与整合，形成跨会话的持续体验。</p>
        <TravelServiceLifecycleDiagram />
      </section>

      <section className={s.ninthSubsection} id="section-7-2" aria-labelledby="section-7-2-title">
        <h3 id="section-7-2-title">7.2 同一句话，分成两种不同寿命的记忆</h3>
        <p>同一个用户表达中，既有只在本次生效的临时偏好，也有适合沉淀为长期记忆的稳定偏好。</p>
        <TravelMemoryLifespanTable />
      </section>

      <section className={s.ninthSubsection} id="section-7-3" aria-labelledby="section-7-3-title">
        <h3 id="section-7-3-title">7.3 把案例映射回设计步骤</h3>
        <p>这个案例覆盖了课程中的核心设计环节，展示各步骤如何在一次完整的任务中协同工作。</p>
        <TravelDesignMappingTable />
        <p>长期记忆提供默认理解，会话记忆承接当前变化。两者通过清晰的捕获、暂存与整合流程协作，既能保持本轮连贯，也能跨会话持续理解用户。</p>
        <div className={s.travelCaseCallout}><Lightbulb aria-hidden="true" size={22} strokeWidth={1.8} /><strong>记住该记的，也允许用户此刻有所不同。</strong></div>
      </section>
    </AgentLessonSection>
  </AgentLessonShell>;
}
