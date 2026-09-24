"use client";

import { Fragment, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  Eye,
  FileCheck2,
  FileText,
  Hand,
  Headphones,
  Image,
  ListChecks,
  MessageCircle,
  Mic,
  MousePointer2,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Users,
  Volume2,
  type LucideIcon
} from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import s from "@/components/agent-course/styles/agent-uiux.module.css";

const principles: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: CheckCircle2, title: "原则一：确保意图清晰", description: "目标、约束、例外与禁区" },
  { icon: FileText, title: "原则二：提供透明度，为用户赋能", description: "解释关键判断，而非倾倒日志" },
  { icon: SlidersHorizontal, title: "原则三：维持用户控制", description: "可暂停、可覆盖、可调整自主度" },
  { icon: ShieldCheck, title: "原则四：用反馈建立安全感", description: "告诉用户发生了什么、为什么、下一步" },
  { icon: Users, title: "原则五：为协作而设计，而非替代", description: "AI 提建议，人类保留判断与介入" }
];

const lifecyclePatterns: Array<{ icon: LucideIcon; phase: string; title: string; description: string }> = [
  { icon: FileCheck2, phase: "行动前", title: "意图预览", description: "让用户审阅目标与计划" },
  { icon: SlidersHorizontal, phase: "行动前", title: "自主性调节", description: "按任务设定行动边界" },
  { icon: Eye, phase: "行动中", title: "可解释理由", description: "展示关键决策的原因" },
  { icon: CircleHelp, phase: "行动中", title: "置信度信号", description: "提示不确定性与适用范围" },
  { icon: ListChecks, phase: "行动后", title: "行动审计与撤销", description: "查看记录，必要时恢复" },
  { icon: UserRound, phase: "行动后", title: "升级路径", description: "不确定时请求澄清或人工帮助" }
];

const auditPhases = [
  { title: "准备与绘图", steps: [["1", "组建跨职能团队", "产品、设计、工程与领域专家"], ["2", "画出端到端流程", "记录从用户输入到系统输出"]] },
  { title: "定位隐藏逻辑", steps: [["3", "标记模糊点", "找出没有唯一匹配的选择"], ["4", "识别最佳猜测", "检查系统依赖的概率与置信度"], ["5", "弄清判断依据", "标出影响决定的规则和信息"]] },
  { title: "创造用户体验", steps: [["6", "写清晰解释", "把关键判断翻译成人话"], ["7", "更新界面", "在需要的时候显示信息"], ["8", "验证信任", "确认用户理解并能介入"]] }
];

const inputModes: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: MousePointer2, title: "点按", description: "单步确认" },
  { icon: Mic, title: "语音", description: "手或眼被占用" },
  { icon: MessageCircle, title: "自然语言", description: "模糊探索" },
  { icon: ClipboardList, title: "表单 / 向导", description: "结构化录入" },
  { icon: SlidersHorizontal, title: "GUI", description: "筛选、滑块、拖拽" },
  { icon: Image, title: "多模态", description: "图 + 文" }
];

const outputModes: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: Bell, title: "推送通知", description: "时间敏感" },
  { icon: Headphones, title: "音频摘要", description: "移动 / 工作中" },
  { icon: FileText, title: "短文本", description: "聚焦查询" },
  { icon: SlidersHorizontal, title: "视觉仪表盘", description: "高密度对比" },
  { icon: Image, title: "交互画布", description: "生成与迭代" },
  { icon: CheckCircle2, title: "行内确认", description: "引导式任务" }
];

const intentRows = [
  ["快速状态检查", "语音或单键点按", "音频或推送通知", "手忙、眼忙"],
  ["具体细节查询", "自然语言对话", "短文本摘要", "聚焦、低密度需求"],
  ["复杂分析", "GUI（筛选器、滑块）", "视觉仪表盘", "桌面办公"],
  ["创意生成", "多模态（图 + 文）", "交互画布", "设计或起草环境"],
  ["监控 / 警报", "被动（后台系统）", "推送通知或音频", "任何环境"],
  ["引导式任务", "结构化表单或向导", "行内确认 + 进度", "聚焦工作流"]
];

const pathLayers = [
  ["01", "原则层", "意图、透明、控制、反馈、协作"],
  ["02", "模式层", "行动前、中、后的交互模式"],
  ["03", "时机层", "决策节点与风险审计"],
  ["04", "呈现层", "状态公式、容器与失败处理"],
  ["05", "形态层", "模态分类、任务审计与对齐矩阵"]
];

function PrincipleList() {
  return <div className={s.principleList}>
    {principles.map(({ icon: Icon, title, description }) => <article className={s.principleRow} key={title}>
      <span className={s.principleIcon}><Icon size={25} strokeWidth={1.8} aria-hidden="true" /></span>
      <div className={s.principleCopy}><h3>{title}</h3><p>{description}</p></div>
    </article>)}
    <div className={s.trustFormula}>可见性 <b>+</b> 可预测性 <b>+</b> 可控性 <b>=</b> 信任</div>
  </div>;
}

function JourneyPlan({ onChoose }: { onChoose: (choice: string) => void }) {
  const steps = [
    ["取消 UA456 航班", "处理退款并确认取消细节"],
    ["改签 DL789 航班", "下一个有确认座位的直飞航班，下午 2:30 起飞"],
    ["更新酒店预订", "通知 Marriott 您会晚到"],
    ["发送更新后的行程", "把新的航班和酒店信息发给您和您的助理 Jane Doe"]
  ];
  return <article className={s.planCard}>
    <h3><span><FileCheck2 size={20} aria-hidden="true" /></span>您的行程中断处理方案</h3>
    <p>我检测到您上午 10:05 的航班已取消。我计划这样做：</p>
    <ol>{steps.map(([title, description], index) => <li key={title}><b>{index + 1}</b><span><strong>{title}</strong><small>{description}</small></span></li>)}</ol>
    <div className={s.planActions}>
      <button type="button" className={s.primaryAction} onClick={() => onChoose("已选择按此计划执行。")}>按此计划执行</button>
      <button type="button" onClick={() => onChoose("已选择编辑计划。")}>编辑计划</button>
      <button type="button" className={s.textAction} onClick={() => onChoose("已选择自己处理。")}>我自己处理</button>
    </div>
  </article>;
}

function AutonomyScale() {
  const [selected, setSelected] = useState(2);
  const levels = ["观察并建议", "计划并提议", "确认后行动", "自主行动"];
  const captions = ["仅提供建议", "计划待审阅", "最终确认后执行", "在边界内完成"];
  return <article className={s.autonomyCard}>
    <h3><span><SlidersHorizontal size={19} aria-hidden="true" /></span>自主性调节</h3>
    <p>根据任务复杂度与风险，选择合适的自主程度。</p>
    <div className={s.autonomySteps} role="group" aria-label="选择 Agent 自主程度">
      {levels.map((level, index) => <button type="button" className={selected === index ? s.autonomySelected : ""} aria-pressed={selected === index} onClick={() => setSelected(index)} key={level}>
        <b>{index + 1}</b><strong>{level}</strong><small>{captions[index]}</small>
      </button>)}
    </div>
    <div className={s.autonomyNote}>信任不是开关，而是渐进授权。</div>
  </article>;
}

function LifecyclePatterns() {
  return <div className={s.lifecycleGrid}>
    {(["行动前", "行动中", "行动后"] as const).map((phase) => <section id={phase === "行动前" ? "section-2-1" : phase === "行动中" ? "section-2-2" : "section-2-3"} className={s.lifecycleColumn} key={phase}>
      <h3>{phase === "行动前" ? <MousePointer2 size={18} /> : phase === "行动中" ? <Eye size={18} /> : <ShieldCheck size={18} />}{phase} <span>{phase === "行动前" ? "建立意图" : phase === "行动中" ? "提供上下文" : "安全与恢复"}</span></h3>
      {lifecyclePatterns.filter((pattern) => pattern.phase === phase).map(({ icon: Icon, title, description }) => <article key={title}><Icon size={18} aria-hidden="true" /><div><strong>{title}</strong><small>{description}</small></div></article>)}
    </section>)}
  </div>;
}

function TrustRecovery() {
  return <div className={s.recoveryGrid}>
    <article className={s.recoveryCard}><h3><AlertTriangle size={19} aria-hidden="true" />设计道歉：不只是报错</h3><p>错误不可避免，修复路径是展示问责、重建信任的机会。</p><div className={s.apologySteps}><span><b>1</b><strong>承认错误</strong></span><ArrowRight size={16} /><span><b>2</b><strong>说明即时纠正</strong></span><ArrowRight size={16} /><span><b>3</b><strong>提供人工支持</strong></span></div></article>
    <article className={s.recoveryCard}><h3><BookOpen size={19} aria-hidden="true" />分阶段落地</h3><p>先建立安全，再根据用户信任和运行数据逐步增加自主性。</p><div className={s.rolloutSteps}>{[["基础安全", "建议与提议"], ["校准自主", "确认后行动"], ["主动委托", "低风险自主" ]].map(([title, detail], index) => <div key={title}><b>{index + 1}</b><span><strong>{title}</strong><small>{detail}</small></span>{index < 2 ? <ArrowRight size={15} aria-hidden="true" /> : null}</div>)}</div>
      <details className={s.governanceDetails}><summary>治理让这些模式持续运转</summary><p>产品、设计、工程、领域专家和客户支持共同维护自主性政策、风险登记与行动审计。</p></details>
    </article>
  </div>;
}

function DecisionAudit() {
  const insuranceRows = [
    ["正在评估损伤照片", "与车辆损伤样本比对"],
    ["正在审查事故报告", "分析责任关键词与法律依据"],
    ["正在核实保单覆盖", "检查具体除外条款"]
  ];
  return <div className={s.auditVisual}>
    <div className={s.auditPhases}>{auditPhases.map((phase) => <article key={phase.title}><h3>{phase.title}</h3><div>{phase.steps.map(([number, title, description]) => <div className={s.auditStep} key={number}><b>{number}</b><ArrowRight size={14} aria-hidden="true" /><span><strong>{title}</strong><small>{description}</small></span></div>)}</div></article>)}</div>
    <article className={s.insuranceExample}><h3>保险理赔审核示例</h3>{insuranceRows.map(([title, detail], index) => <div key={title}><b>{index + 1}</b><strong>{title}</strong><span>{detail}</span><span className={s.rowMore}>•••</span></div>)}<p>只展示帮助用户理解、判断和追责的信息，不暴露低层技术日志。</p></article>
  </div>;
}

function RiskMatrix() {
  const cells = [
    { label: "高影响 + 可逆", action: "审阅", detail: "通知 + 审阅轨迹", icon: FileCheck2 },
    { label: "高影响 + 不可逆", action: "意图预览", detail: "明确授权", icon: AlertTriangle },
    { label: "低影响 + 可逆", action: "自动执行", detail: "被动提示 / 日志", icon: CheckCircle2 },
    { label: "低影响 + 不可逆", action: "确认", detail: "简单撤销选项", icon: UserRound }
  ];
  return <div className={s.riskMatrixWrap}>
    <div className={s.impactAxis}><span>高</span><ArrowDown size={15} aria-hidden="true" /><strong>影响</strong><ArrowDown size={15} aria-hidden="true" /><span>低</span></div>
    <div className={s.riskMatrix}>{cells.map(({ label, action, detail, icon: Icon }) => <article key={label}><Icon size={20} aria-hidden="true" /><div><small>{label}</small><strong>{action}</strong><span>{detail}</span></div></article>)}</div>
    <div className={s.reversibilityAxis}><span>可逆</span><ArrowRight size={15} aria-hidden="true" /><strong>可逆性</strong><ArrowRight size={15} aria-hidden="true" /><span>不可逆</span></div>
  </div>;
}

function ModeCards() {
  const cards: Array<{ icon: LucideIcon; title: string; description: string; visual: string }> = [
    { icon: ArrowRight, title: "动态面包屑", description: "低风险、安静地显示后台进度", visual: "正在读取邮件　→　正在起草回复　→　等待确认" },
    { icon: ListChecks, title: "动态清单", description: "高风险流程的任务锚点", visual: "✓ 验证账户余额　　◌ 计算换汇　　○ 执行转账" },
    { icon: Eye, title: "思考开关", description: "为需要深挖的人保留原始日志", visual: "查看决策依据　⌄　已应用的用户偏好" },
    { icon: FileText, title: "审计轨迹", description: "可回放、可撤销的事后信任", visual: "查看这次操作如何产生　→" }
  ];
  return <div className={s.modeGrid}>{cards.map(({ icon: Icon, title, description, visual }) => <article key={title}><h3><Icon size={19} aria-hidden="true" />{title}</h3><p>{description}</p><div>{visual}</div></article>)}</div>;
}

function ModalityGroup({ title, description, modes }: { title: string; description: string; modes: typeof inputModes }) {
  return <section className={s.modalityGroup}>
    <h3>{title === "输入模态" ? <MousePointer2 size={19} aria-hidden="true" /> : <ArrowDown size={19} aria-hidden="true" />}{title}<small>{description}</small></h3>
    <div className={s.modalityCards}>{modes.map(({ icon: Icon, title: mode, description: note }) => <article key={mode}><Icon size={21} aria-hidden="true" /><strong>{mode}</strong><small>{note}</small></article>)}</div>
  </section>;
}

function AgentFourteenthBody() {
  const [planMessage, setPlanMessage] = useState("");
  return <>
    <div className={s.opening}>
      <p>当 AI 从被动工具变为主动的 Agent，用户体验的重点不再只是“更强的功能”，而是“更好的协作关系”。我们需要通过合理的界面设计，让用户理解、信任并愿意与 Agent 一起完成任务。</p>
      <div className={s.modelCompare}>
        <article><strong>传统软件</strong><div><span><UserRound size={19} />用户意图</span><ArrowRight size={16} /><span><MousePointer2 size={19} />点击 / 输入</span><ArrowRight size={16} /><span><SlidersHorizontal size={19} />系统响应</span></div></article>
        <article><strong>Agent 系统</strong><div><span><UserRound size={19} />用户意图</span><ArrowRight size={16} /><span><FileText size={19} />制定计划</span><ArrowRight size={16} /><span><BookOpen size={19} />选择工具</span><ArrowRight size={16} /><span><Check size={19} />自主行动</span><ArrowRight size={16} /><span><MessageCircle size={19} />反馈与接管</span></div></article>
        <p>自主性是技术系统的输出，可信度是设计过程的输出。</p>
      </div>
    </div>

    <AgentLessonSection id="section-1" title="1. 设计原则">
      <p>好的 Agent 界面不是隐藏复杂性，而是让自主性变得可理解、可控制、可协作。设计任务是通过可见性、可预测性和可控性重建信任。</p>
      <PrincipleList />
    </AgentLessonSection>

    <AgentLessonSection id="section-2" title="2. 设计模式：控制、同意与问责">
      <p>原则回答方向，模式回答界面里该放什么。六个模式按照一次智能体交互的功能生命周期组织。</p>
      <LifecyclePatterns />
      <div className={s.patternExamples}>
        <JourneyPlan onChoose={setPlanMessage} />
        <AutonomyScale />
      </div>
      {planMessage ? <p className={s.demoMessage} role="status">示例交互：{planMessage}</p> : null}
      <TrustRecovery />
    </AgentLessonSection>

    <AgentLessonSection id="section-3" title="3. 识别必要的透明性时刻">
      <p>不是把每一步都展示出来，而是先识别系统在哪些节点作出了判断，再决定用户需要看到什么。</p>
      <div className={s.transparencyCompare}>
        <article><span><Eye size={19} /></span><strong>黑箱</strong><p>只汇报正在处理，用户不知道发生了什么。</p><div>正在处理……</div></article>
        <article className={s.transparencyIdeal}><span><CheckCircle2 size={19} /></span><strong>必要透明</strong><p>展示关键结果的判断、依据与边界。</p><div>正在评估申请，基于您的资料和政策规则进行判断……</div></article>
        <article><span><FileText size={19} /></span><strong>日志流水账</strong><p>暴露每次调用，关键信息被淹没。</p><div>调用 getUser() → search() → calc() → send()…</div></article>
      </div>
      <div className={s.insightBar}><Search size={17} aria-hidden="true" /><strong>先审计系统的决策逻辑，再决定界面在哪里开口。</strong></div>
      <div className={s.subsection} id="section-3-1"><h3>3.1 决策节点审计</h3><p>梳理 Agent 的决策流程，找到需要向用户解释的关键节点。</p><DecisionAudit /></div>
      <div className={s.subsection} id="section-3-2"><h3>3.2 影响 / 风险矩阵</h3><p>结合任务的影响程度与可逆性，决定合适的透明策略。</p><RiskMatrix /><div className={s.insightBar}><AlertTriangle size={17} aria-hidden="true" /><strong>把高影响操作留给真正不可逆的时刻，并明确请求用户授权。</strong></div></div>
      <div className={s.subsection} id="section-3-3"><h3>3.3 “等等，为什么？”测试</h3><p>用用户会追问的问题，找到系统需要说明的判断点。</p><div className={s.whyTest}>
        <article><h4>用户看到</h4><div><MessageCircle size={17} />“正在检查您的日历。”</div><p>等等，为什么？它在查谁的日历？</p></article><ArrowRight size={20} aria-hidden="true" /><article className={s.whyImproved}><h4>改进后的说明</h4><div><span><Check size={15} />检查您的可用时间</span><ArrowRight size={15} /><span><Check size={15} />与医生排班同步</span><ArrowRight size={15} /><span><Check size={15} />锁定预约时间</span></div></article>
      </div><div className={s.insightBar}><Eye size={17} aria-hidden="true" /><strong>用户提问的位置，就是控制感正在流失的位置。</strong></div></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-4" title="4. 透明性的实用界面模式">
      <p>在需要解释的时刻，透明性首先是一个文字问题：讲清正在发生的动作、具体对象和边界规则。</p>
      <div className={s.subsection} id="section-4-1"><h3>4.1 状态更新公式</h3>
        <div className={s.statusFormula}><span>动词</span><b>+</b><span>具体对象</span><b>+</b><span>边界规则</span><ArrowDown size={19} aria-hidden="true" /><div><article><strong>较弱</strong><p>“正在搜索航班……”</p></article><ArrowRight size={16} /><article className={s.statusStrong}><strong>更清楚</strong><p>“正在扫描机票价格，寻找 600 元以下的选项。”</p></article></div></div>
        <div className={s.toneRisk}><strong>语气与风险匹配</strong><div><article><CheckCircle2 size={18} /><b>低风险</b><span>友好、简洁，轻量提示</span></article><article><CircleHelp size={18} /><b>高风险</b><span>清晰、准确，明确说明边界</span></article></div></div>
      </div>
      <div className={s.subsection} id="section-4-2"><h3>4.2 四种界面容器</h3><p>根据任务类型和风险级别，选择合适的容器承载透明信息。</p><ModeCards /></div>
      <div className={s.subsection} id="section-4-3"><h3>4.3 对失败保持诚实</h3><div className={s.failureGrid}>
        <article><h4><CheckCircle2 size={17} />部分成功</h4><div className={s.resultList}><span><Check size={14} />航班已预订</span><span><Check size={14} />酒店已更新</span><span><AlertTriangle size={14} />租车失败：无库存</span></div><p>只恢复失败部分，不需要从头开始。</p></article>
        <article><h4><AlertTriangle size={17} />工具故障</h4><div className={s.errorMessage}>Google 日历连接无响应，我将在 30 秒后自动重试。</div><p>说明是工具故障，帮助用户区分系统能力与依赖问题。</p></article>
      </div></div>
      <div className={s.conclusionBar}>可预测性、可靠性和可理解性，就是 Agent 产品本身。</div>
    </AgentLessonSection>

    <AgentLessonSection id="section-5" title="5. 产品模态与用户意图的匹配">
      <div className={s.modalityIntro}><h3><MessageCircle size={22} aria-hidden="true" />聊天不是所有 AI 能力的天然归宿</h3>
        <div className={s.modalityPain}><article><strong><FileText size={18} />输入端：文本框的语言屏障</strong><p>用户必须会表达、会措辞，还要记住系统能做什么。</p></article><article><strong><Eye size={18} />输出端：长文本的认知成本</strong><p>读长段落才能提取信息，增加阅读和判断负担。</p></article></div>
        <div className={s.modalityThesis}>界面适应人，而不是人适应界面。</div>
      </div>
      <div className={s.subsection} id="section-5-1"><h3>5.1 输入与输出模态</h3>
        <ModalityGroup title="输入模态" description="不同的输入方式，适用于不同的场景与用户需求。" modes={inputModes} />
        <ModalityGroup title="输出模态" description="不同的输出方式，帮助用户在合适的场景下获取信息。" modes={outputModes} />
        <div className={s.accessibilityNote}><Eye size={17} aria-hidden="true" /><span>模态选择要增加信息路径，同时提供无障碍替代。</span></div>
      </div>
      <div className={s.subsection} id="section-5-2"><h3>5.2 任务审计</h3><p>通过真实场景收集证据，判断合适的输入与输出组合。</p>
        <div className={s.constraintGrid}>{[[UserRound, "输入约束", "手能用来打字或点按吗？"], [Eye, "输出约束", "用户能安全地看屏幕吗？"], [Users, "社交约束", "环境允许说话或听音频吗？"], [BookOpen, "认知负荷", "主任务已经占了多少脑力？"]].map(([Icon, title, question]) => { const C = Icon as LucideIcon; return <article key={title as string}><C size={20} aria-hidden="true" /><strong>{title as string}</strong><p>{question as string}</p></article>; })}</div>
        <div className={s.researchTrack}>{[["01", "情境观察", "看真实工作"], ["02", "聚焦访谈", "理解心智模型"], ["03", "协作工作坊", "定义任务边界"]].map(([number, title, detail], index) => <Fragment key={number}><div><b>{number}</b><span><strong>{title}</strong><small>{detail}</small></span></div>{index < 2 ? <ArrowRight size={17} aria-hidden="true" /> : null}</Fragment>)}</div>
      </div>
      <div className={s.subsection} id="section-5-3"><h3>5.3 输入 / 输出对齐矩阵</h3><p>根据用户意图选择体验，而不是从 AI 能做什么开始。</p>
        <div className={s.tableWrap}><table className={s.intentTable}><thead><tr><th>用户意图</th><th>最佳输入</th><th>最佳输出</th><th>环境</th></tr></thead><tbody>{intentRows.map(([intent, input, output, setting]) => <tr key={intent}><th scope="row">{intent}</th><td>{input}</td><td>{output}</td><td>{setting}</td></tr>)}</tbody></table></div>
      </div>
      <div className={s.subsection} id="section-5-4"><h3>5.4 案例：野外技术员的多模态交接</h3><p>根据工作环境切换输入和输出模态，让 AI 在不同场景下都能提供价值。</p>
        <div className={s.handoffVisual}>
          <article className={s.fieldScene}><span><Hand size={21} /><strong>高空作业现场</strong></span><small>厚手套 · 强眩光 · 手忙眼忙</small></article><ArrowRight size={17} aria-hidden="true" />
          <article className={s.handoffStep}><Mic size={22} /><strong>语音输入</strong></article><ArrowRight size={17} aria-hidden="true" />
          <article className={s.handoffStep}><Volume2 size={22} /><strong>简短音频摘要</strong></article><ArrowRight size={17} aria-hidden="true" /><span className={s.handoffLabel}>回到卡车后</span>
          <article className={s.dashboardScene}><strong>15 英寸视觉仪表盘</strong><div><span><SlidersHorizontal size={18} />历史趋势</span><span><Search size={18} />电网地图</span></div><small>深度复核</small></article>
          <div className={s.resultMetric}><CheckCircle2 size={17} /><strong>诊断时间缩短 20%</strong></div>
        </div>
        <div className={s.insightBar}><ShieldCheck size={17} aria-hidden="true" /><strong>现场保持安全感知，回到车内再完成高密度分析。</strong></div>
      </div>
      <div className={s.subsection}>
        <h3>结语：从原则到落地的完整路径</h3>
        <p>从“为什么”到“怎么做”，把原则、交互、时机、呈现与形态连接起来。</p>
        <div className={s.pathLayers}>{pathLayers.map(([number, title, description], index) => <article key={number}><b>{number}</b><strong>{title}</strong><small>{description}</small>{index < pathLayers.length - 1 ? <ArrowRight size={15} aria-hidden="true" /> : null}</article>)}</div>
        <div className={s.finalQuote}>自主性是技术系统的输出，可信度是设计过程的输出。</div>
      </div>
    </AgentLessonSection>
  </>;
}

export default function AgentFourteenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}><AgentFourteenthBody /></AgentLessonShell>;
}
