import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  CheckCircle2,
  CircleUserRound,
  ClipboardCheck,
  Database,
  Gauge,
  GitCompareArrows,
  ListChecks,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  TestTube2,
  TriangleAlert,
  UsersRound,
  Wrench
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import s from "@/components/agent-course/styles/agent-evaluation.module.css";

type LessonSection = { title: string; body: string };

function splitLesson(markdown: string): LessonSection[] {
  return markdown.trim().split(/\n(?=## )/).map((block) => {
    const [heading, ...body] = block.split("\n");
    return { title: heading.replace(/^##\s+/, ""), body: body.join("\n").trim() };
  });
}

function Markdown({ children }: { children: string }) {
  return <div className={s.copy}><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    a: ({ node: _node, children: label, ...props }) => <a className={s.referenceLink} {...props} target="_blank" rel="noreferrer">{label} ↗</a>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>
  }}>{children}</ReactMarkdown></div>;
}

const evaluationReasons = [
  [GitCompareArrows, "非确定性", "同一输入可能产生多种有效输出", "不是只验一个标准答案"],
  [UsersRound, "主观质量", "业务方也要参与定义什么算好", "标准来自真实任务"],
  [TriangleAlert, "独特失败", "幻觉、偏见、提示敏感与注入", "风险要专项检查"],
  [Gauge, "持续迭代", "用量化反馈判断改动是否有效", "避免凭感觉原地打转"]
] as const;

function WhyEvaluationVisual() {
  return <div className={s.visualCard} role="img" aria-label="大模型产品需要评测的四个原因与持续改进链路">
    <div className={s.reasonGrid}>{evaluationReasons.map(([Icon, title, detail, note]) => <article key={title}><span><Icon size={20} aria-hidden="true" /></span><strong>{title}</strong><p>{detail}</p><small>{note}</small></article>)}</div>
    <div className={s.miniLoop}><span>真实运行</span><ArrowRight /><span>发现问题</span><ArrowRight /><span>建立评测</span><ArrowRight /><span>修改 Agent</span><ArrowRight /><span>回归验证</span><RefreshCw className={s.loopIcon} /></div>
    <p className={s.visualCaption}>评测不是终点分数，而是验证每次改动是否真的有效。</p>
  </div>;
}

const priorities = [
  ["业务影响", "出错会影响什么？", "任务失败 · 用户损失 · 合规风险"],
  ["发生概率", "这个问题多常见？", "高频失败 · 多场景重复"],
  ["不确定性", "团队知道它是否稳定吗？", "靠感觉判断 · 结果波动"],
  ["可改进性", "测出后能采取行动吗？", "可调整提示词 · 工具 · 流程"]
] as const;

function EvaluationScopeVisual() {
  return <div className={s.scopeVisual} role="img" aria-label="评测优先级公式与最终结果、关键过程、运行约束三层评测对象">
    <div className={s.priorityPanel}><div className={s.formula}><strong>评测优先级</strong><span>≈</span><b>影响</b><i>×</i><b>概率</b><i>×</i><b>不确定性</b><i>×</i><b>可改进性</b></div><div className={s.priorityGrid}>{priorities.map(([title, question, signal], index) => <article key={title}><em>0{index + 1}</em><strong>{title}</strong><span>{question}</span><small>{signal}</small></article>)}</div></div>
    <div className={s.layers}><article><span><Target size={20} /></span><div><b>先看最终结果</b><p>用户目标是否真正完成？退款单是否真实创建？</p></div></article><ArrowDown /><article><span><SearchCheck size={20} /></span><div><b>再看关键过程</b><p>是否查对订单、用了有效规则、在高风险时转人工？</p></div></article><ArrowDown /><article><span><ShieldCheck size={20} /></span><div><b>守住运行约束</b><p>耗时、成本、权限与循环次数是否可接受？</p></div></article></div>
  </div>;
}

const methodSteps = [
  [Target, "01", "目标和任务", "产品目标 → 用户任务 → 成功结果 → 关键失败 → 评测任务"],
  [Database, "02", "指标和用例", "主指标 + 约束指标；核心集 + 回归集 + 风险边界集"],
  [TestTube2, "03", "方法和工具", "用成本最低、能够可靠判断问题的方法组合评测器"]
] as const;

function MethodVisual() {
  return <div className={s.methodVisual} role="img" aria-label="Agent 评测从目标任务、指标用例到方法工具的三步方法">
    <div className={s.methodSteps}>{methodSteps.map(([Icon, number, title, description], index) => <div className={s.methodStep} key={number}><article><span><Icon size={22} /></span><em>{number}</em><strong>{title}</strong><p>{description}</p></article>{index < methodSteps.length - 1 ? <ArrowRight aria-hidden="true" /> : null}</div>)}</div>
    <div className={s.datasetStrip}><strong>第一批用例从哪里来？</strong>{["典型任务", "人工必测", "线上失败", "高风险边界", "正反对照"].map((item) => <span key={item}><CheckCircle2 size={15} />{item}</span>)}</div>
    <div className={s.signalLoop}><div><b>离线评测</b><span>基线 · 对比 · 回归</span></div><GitCompareArrows /><div><b>线上信号</b><span>真实分布 · 新问题</span></div><p>线上问题进入回归集，离线改进上线后继续接受真实流量检验。</p></div>
  </div>;
}

const evaluatorRoutes = [
  [Braces, "代码 / 规则", "格式、字段、阈值、数据库状态", "最快、稳定、优先使用"],
  [Sparkles, "LLM-as-a-Judge", "表达质量、语义正确性、是否有依据", "先用人工标注校准"],
  [Bot, "Agent-as-a-Judge", "证据分散，需要主动访问环境", "与确定性检查组合"],
  [CircleUserRound, "业务专家", "高风险、标准不清或存在争议", "保留最终人工判断"]
] as const;

function EvaluatorRouter() {
  return <div className={s.routerVisual} role="img" aria-label="根据判断内容选择代码、模型、评测 Agent 或人工专家">
    <div className={s.routerQuestion}><ClipboardCheck size={24} /><div><strong>要判断的内容是什么？</strong><span>优先选择成本最低、能够可靠判断问题的方法</span></div></div>
    <div className={s.routeGrid}>{evaluatorRoutes.map(([Icon, title, fit, note]) => <article key={title}><span><Icon size={21} /></span><strong>{title}</strong><p>{fit}</p><small>{note}</small></article>)}</div>
    <div className={s.combination}><Wrench size={19} /><p><strong>一个任务可以组合多个评测器：</strong>代码确认退款单状态，LLM Judge 检查解释质量，人工复核高风险失败。</p></div>
  </div>;
}

const guardrails = [
  ["系统", "评测整个 Agent，不只看模型"],
  ["证据", "真实环境状态优先于自述完成"],
  ["随机性", "同时看首次成功与多次稳定性"],
  ["评测器", "先验证评测器本身是否可靠"],
  ["数据", "平衡正反、难易、高低频用例"],
  ["风险", "严重失败设门槛，不被均分掩盖"],
  ["版本", "记录模型、提示词、工具和数据集版本"],
  ["泛化", "保留验证集，避免在测试集上刷满分"]
] as const;

function GuardrailVisual() {
  return <div className={s.guardrailVisual} role="img" aria-label="Agent 评测的八项护栏"><div className={s.guardrailTitle}><AlertTriangle size={22} /><div><strong>评测护栏</strong><span>防止分数很好看，产品却仍然不可靠</span></div></div><div className={s.guardrailGrid}>{guardrails.map(([title, description], index) => <article key={title}><em>{String(index + 1).padStart(2, "0")}</em><div><strong>{title}</strong><p>{description}</p></div></article>)}</div></div>;
}

const flywheelSteps = ["选择任务", "跑通流程", "定位问题", "确定指标", "建立用例集", "组合评测器", "建立基线", "解决一类问题", "运行回归", "上线观察"];

function FlywheelVisual() {
  return <div className={s.flywheelVisual} role="img" aria-label="第一版 Agent 评测飞轮十步闭环"><div className={s.flywheelCore}><RefreshCw size={28} /><strong>评测飞轮</strong><span>问题 → 用例 → 改进证据</span></div><ol>{flywheelSteps.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span>{index < flywheelSteps.length - 1 ? <ArrowRight /> : <RefreshCw />}</li>)}</ol><p>从 3～5 类重要任务、20～50 条代表性用例开始，不必等系统完全开发完成。</p></div>;
}

function ExerciseCard() {
  const fields = ["任务名称 / 用户目标", "为什么值得测", "成功结果 / 不可接受的失败", "最终状态 / 关键过程", "主指标 / 约束指标", "第一批用例", "评测方法", "回归触发条件"];
  return <div className={s.exerciseCard}><div><ListChecks size={25} /><h3>完成一张评测设计卡</h3><p>选择你的 Agent 中一个最重要的任务，把模糊的“效果好不好”变成可以执行和复核的评测方案。</p></div><ol>{fields.map((field, index) => <li key={field}><span>{String(index + 1).padStart(2, "0")}</span>{field}</li>)}</ol></div>;
}

const visualBySection = [<WhyEvaluationVisual key="why" />, <EvaluationScopeVisual key="scope" />, <MethodVisual key="method" />, <GuardrailVisual key="guardrail" />, <FlywheelVisual key="flywheel" />, <ExerciseCard key="exercise" />];

export default async function AgentSixteenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  const sourcePath = path.join(process.cwd(), "content/agent-course/lesson-16.md");
  const sections = splitLesson(await readFile(sourcePath, "utf8"));

  return <AgentLessonShell detail={detail}>
    <div className={s.opening}><p>我认为设计 AI 产品最重要的事之一，就是搭建起评测飞轮，对产品表现进行检测、评估和改进。</p><div><BarChart3 size={19} /><span>找到问题</span><ArrowRight size={16} /><span>有的放矢</span></div></div>
    {sections.map((section, index) => <AgentLessonSection id={`section-${index + 1}`} title={section.title} key={section.title}>
      {index === 2 ? <><MethodVisual /><Markdown>{section.body}</Markdown><EvaluatorRouter /></> : <><Markdown>{section.body}</Markdown>{visualBySection[index]}</>}
    </AgentLessonSection>)}
  </AgentLessonShell>;
}
