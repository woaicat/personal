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
  [GitCompareArrows, "非确定性输出", "同一个输入可能产生多种有效输出，不能只验证唯一答案。", ["可接受范围", "多次运行"]],
  [UsersRound, "质量带有主观性", "创意、摘要等任务没有唯一标准，业务人员也要参与判断。", ["业务标准", "人工校准"]],
  [TriangleAlert, "独特失败模式", "大模型会出现传统测试覆盖不到的新风险。", ["幻觉", "偏见", "提示敏感", "提示注入"]],
  [BarChart3, "衡量产品成功", "把抽象质量与真实业务成果连接起来。", ["任务满足度", "用户满意度", "边缘风险"]],
  [Gauge, "定位问题并迭代", "量化反馈能验证改进假设，避免团队凭感觉反复修改。", ["定位失败点", "验证改动"]]
] as const;

function WhyEvaluationVisual() {
  return <div className={s.visualCard} aria-label="大模型产品需要评测的五个原因与持续改进链路">
    <div className={s.visualLead}><strong>传统软件测试不够用了</strong><p>评测要同时回答：输出是否可接受、业务是否成功、风险是否受控、改动是否有效。</p></div>
    <div className={s.reasonGrid}>{evaluationReasons.map(([Icon, title, detail, tags], index) => <article key={title}><div className={s.cardTopline}><span><Icon size={20} aria-hidden="true" /></span><em>{String(index + 1).padStart(2, "0")}</em></div><strong>{title}</strong><p>{detail}</p><div className={s.reasonTags}>{tags.map((tag) => <small key={tag}>{tag}</small>)}</div></article>)}</div>
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
  [CircleUserRound, "人工测试", "标准尚不清楚、需要专业判断或发现意外问题", ["产品 / 测试 / 业务专家", "校准自动评测器"], "速度慢、成本高，评测人标准可能不一致"],
  [Braces, "代码 / 规则", "格式、字段、阈值、工具参数和数据库状态", ["快、便宜、稳定", "适合 CI 回归"], "难以判断表达质量等开放问题"],
  [Sparkles, "LLM-as-a-Judge", "完整性、语义正确性、有依据程度与版本比较", ["明确评分标准", "用人工标注校准"], "可能受风格、顺序和模型偏好影响"],
  [Bot, "Agent-as-a-Judge", "需要主动访问文件、网页、数据库或完整轨迹", ["主动寻找证据", "确认真实环境结果"], "成本更高，自身也可能选错工具或漏看证据"]
] as const;

function EvaluatorRouter() {
  return <div className={s.evaluatorSection} id="section-3-3">
    <div className={s.visualSubheading}><span>3.3</span><div><h3>第三步：方法和工具</h3><p>“人工 / 自动化”说明由谁执行；下面四张卡片说明具体怎么判断。</p></div></div>
    <div className={s.routerVisual} aria-label="四种 Agent 评测方法对比">
      <div className={s.routerQuestion}><ClipboardCheck size={24} /><div><strong>从判断对象出发选择方法</strong><span>优先使用成本最低、能够可靠判断问题的方法，不追求形式更“高级”。</span></div></div>
      <div className={s.routeGrid}>{evaluatorRoutes.map(([Icon, title, fit, strengths, tradeoff], index) => <article key={title}><div className={s.cardTopline}><span><Icon size={21} /></span><em>0{index + 1}</em></div><strong>{title}</strong><p>{fit}</p><div className={s.methodTags}>{strengths.map((item) => <small key={item}>{item}</small>)}</div><div className={s.tradeoff}><AlertTriangle size={14} /><span>{tradeoff}</span></div></article>)}</div>
      <div className={s.combination}><Wrench size={19} /><p><strong>组合示例：</strong>代码确认退款单状态，LLM Judge 检查解释质量，人工复核高风险失败。</p></div>
      <div className={s.sourceLinks}><span>延伸阅读</span><a href="https://openai.com/index/evals-drive-next-chapter-of-ai/" target="_blank" rel="noreferrer">人工校准 LLM Judge ↗</a><a href="https://arxiv.org/abs/2410.10934" target="_blank" rel="noreferrer">Agent-as-a-Judge 论文 ↗</a></div>
    </div>
  </div>;
}

const guardrails = [
  ["系统视角", "评测整个 Agent，不只看模型", "提示词、上下文、知识库、工具、权限和外部环境都会影响结果。"],
  ["真实证据", "不要把 Agent 自述“完成”当成功", "邮件、日历、数据库和文件等任务，要检查真实环境状态。"],
  ["关键过程", "结果优先，但不能忽略关键路径", "只检查会影响结果、安全和成本的过程，不固定唯一工具顺序。"],
  ["重复运行", "一次通过不代表稳定", "同时观察首次成功、多次稳定性，以及失败集中在哪些任务和步骤。"],
  ["校准评测器", "先评测评测器", "用正确答案、明显错误和人工标注验证 Judge 是否可靠。"],
  ["平衡用例", "不要把 Agent 优化到另一个极端", "同时覆盖应该做 / 不该做、正常 / 异常、容易 / 困难。"],
  ["保留验证集", "不要在同一测试集上刷满分", "用未参与调试的数据检查泛化，并持续加入新的真实失败。"],
  ["风险门槛", "不要让平均分掩盖严重失败", "越权、数据泄露和错误付款应设为必须通过的硬门槛。"],
  ["版本与数据", "控制环境、版本和敏感数据", "记录模型、提示词、工具、评测器与数据集版本，并做好脱敏。"]
] as const;

function GuardrailVisual() {
  return <div className={s.guardrailVisual} aria-label="Agent 评测的九项护栏"><div className={s.guardrailTitle}><AlertTriangle size={22} /><div><strong>九项评测护栏</strong><span>防止分数很好看，产品却仍然不可靠</span></div></div><div className={s.guardrailGrid}>{guardrails.map(([title, principle, description], index) => <article key={title}><em>{String(index + 1).padStart(2, "0")}</em><div><small>{title}</small><strong>{principle}</strong><p>{description}</p></div></article>)}</div></div>;
}

const flywheelSteps = ["选择任务", "跑通流程", "定位问题", "确定指标", "建立用例集", "组合评测器", "建立基线", "解决一类问题", "运行回归", "上线观察"];

function FlywheelVisual() {
  return <div className={s.flywheelVisual} role="img" aria-label="第一版 Agent 评测飞轮十步闭环"><div className={s.flywheelCore}><RefreshCw size={28} /><strong>评测飞轮</strong><span>问题 → 用例 → 改进证据</span></div><ol>{flywheelSteps.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span>{index < flywheelSteps.length - 1 ? <ArrowRight /> : <RefreshCw />}</li>)}</ol><p>从 3～5 类重要任务、20～50 条代表性用例开始，不必等系统完全开发完成。</p></div>;
}

function ExerciseCard() {
  const fields = ["任务名称 / 用户目标", "为什么值得测", "成功结果 / 不可接受的失败", "最终状态 / 关键过程", "主指标 / 约束指标", "第一批用例", "评测方法", "回归触发条件"];
  return <div className={s.exerciseCard}><div><ListChecks size={25} /><h3>完成一张评测设计卡</h3><p>选择你的 Agent 中一个最重要的任务，把模糊的“效果好不好”变成可以执行和复核的评测方案。</p></div><ol>{fields.map((field, index) => <li key={field}><span>{String(index + 1).padStart(2, "0")}</span>{field}</li>)}</ol></div>;
}

export default async function AgentSixteenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  const sourcePath = path.join(process.cwd(), "content/agent-course/lesson-16.md");
  const sections = splitLesson(await readFile(sourcePath, "utf8"));
  const [sectionThreeBeforeMethods, sectionThreeMethodsAndAfter = ""] = sections[2].body.split("### 3.3 第三步：方法和工具");
  const [, sectionThreePlatforms = ""] = sectionThreeMethodsAndAfter.split("### 3.4 一些 Agent 评测平台和产品");

  return <AgentLessonShell detail={detail}>
    <div className={s.opening}><p>我认为设计 AI 产品最重要的事之一，就是搭建起评测飞轮，对产品表现进行检测、评估和改进。</p><div><BarChart3 size={19} /><span>找到问题</span><ArrowRight size={16} /><span>有的放矢</span></div></div>
    <AgentLessonSection id="section-1" title={sections[0].title}><WhyEvaluationVisual /></AgentLessonSection>
    <AgentLessonSection id="section-2" title={sections[1].title}><Markdown>{sections[1].body}</Markdown><EvaluationScopeVisual /></AgentLessonSection>
    <AgentLessonSection id="section-3" title={sections[2].title}><MethodVisual /><Markdown>{sectionThreeBeforeMethods}</Markdown><EvaluatorRouter /><Markdown>{`### 3.4 一些 Agent 评测平台和产品\n\n${sectionThreePlatforms}`}</Markdown></AgentLessonSection>
    <AgentLessonSection id="section-4" title={sections[3].title}><GuardrailVisual /></AgentLessonSection>
    <AgentLessonSection id="section-5" title={sections[4].title}><Markdown>{sections[4].body}</Markdown><FlywheelVisual /></AgentLessonSection>
    <AgentLessonSection id="section-6" title={sections[5].title}><Markdown>{sections[5].body}</Markdown><ExerciseCard /></AgentLessonSection>
  </AgentLessonShell>;
}
