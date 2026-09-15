import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CloudCog,
  Database,
  Gauge,
  Layers3,
  ListTree,
  RefreshCw,
  ServerCog,
  TimerReset,
  WalletCards,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import s from "@/components/agent-course/styles/agent-cost.module.css";

type CostPart = { icon: LucideIcon; title: string; description: string; examples: string[] };
type Optimization = { number: string; icon: LucideIcon; title: string; description: string; action: string };
type Validation = { number: string; title: string; description: string; signal: string };

const costParts: CostPart[] = [
  { icon: BrainCircuit, title: "Token 成本", description: "输入、输出与推理过程消耗的模型用量。", examples: ["系统提示词与历史对话", "检索结果与工具返回", "模型生成的答案"] },
  { icon: CloudCog, title: "API 调用成本", description: "模型之外，每次调用外部能力也会消耗预算。", examples: ["搜索与知识库检索", "地图、OCR、语音等服务", "第三方业务系统 API"] },
  { icon: ServerCog, title: "基础设施成本", description: "承载 Agent 运行、存储与处理数据的资源。", examples: ["服务器与 GPU", "数据库与缓存", "日志、监控与队列"] },
  { icon: RefreshCw, title: "失败与重试成本", description: "循环、无效调用和错误重试会放大单次任务成本。", examples: ["重复检索同一问题", "工具报错后反复重试", "过长上下文导致的低效推理"] }
];

const optimizations: Optimization[] = [
  { number: "3.1", icon: Bot, title: "模型路由", description: "按任务难度选择不同能力与价格的模型，不让每一步都使用最贵模型。", action: "简单分类、格式整理用轻量模型；复杂判断再升级。" },
  { number: "3.2", icon: ListTree, title: "上下文管理", description: "只带入当前任务真正相关的信息，避免历史对话、文档与工具结果无上限累积。", action: "按需检索、摘要压缩，并设置上下文长度上限。" },
  { number: "3.3", icon: Zap, title: "减少模型调用次数", description: "合并可一次完成的判断，避免 Agent 在没有新信息时继续反复思考或调用工具。", action: "为重复动作设缓存、去重和停止条件。" },
  { number: "3.4", icon: Database, title: "使用缓存", description: "对可复用、变化慢的结果优先复用，减少相同问题的模型和工具消耗。", action: "缓存常见问答、规则检索结果和稳定工具结果，并设置失效时间。" },
  { number: "3.5", icon: TimerReset, title: "设置 Agent 的执行限制", description: "在任务开始前明确预算、时间和最大调用次数，防止异常循环把成本持续放大。", action: "例如：最大 10 步、最多 2 次重试、任务超时 60 秒。" }
];

const validations: Validation[] = [
  { number: "5.1", title: "建立基线", description: "在优化前记录任务成功率、耗时、Token、工具调用和单次任务成本。", signal: "建议优先关注 P90，避免平均值掩盖少量高成本任务。" },
  { number: "5.2", title: "准备测试集", description: "使用覆盖常见、复杂和异常情况的固定样本，保证前后方案可比较。", signal: "样本应包含典型任务与边界场景。" },
  { number: "5.3", title: "同时比较成本和效果", description: "不能只看降价；还要确认任务是否完成、答案是否准确、是否更慢。", signal: "对比成功率、cost / successful task、延迟与用户评价。" },
  { number: "5.4", title: "判断优化结果", description: "只有质量不下降、成本下降或单位产出提升，优化才真正成立。", signal: "质量下降时，记录是哪类任务受影响，再调整策略。" },
  { number: "5.5", title: "灰度上线", description: "先让部分真实流量使用新策略，观察线上数据后再扩大范围。", signal: "5% → 20% → 50% → 100%，逐步扩大并保留回退。" }
];

const issues = [
  ["成本下降了，效果却变差", "模型或上下文被压缩过度；需要把质量指标设为成本优化的护栏。"],
  ["缓存命中率低", "缓存键、过期策略或任务颗粒度不合适；先定位哪些结果真的可复用。"],
  ["工具调用成本过高", "检查是否重复查询、是否能合并请求，或先在本地做轻量判断。"],
  ["难以定位成本高的环节", "按模型、工具、检索、重试等维度拆分 Trace，而不是只看总价。"],
  ["优化效果不稳定", "使用固定测试集和线上灰度，区分模型波动、数据变化和策略问题。"]
];

function CostPartCard({ icon: Icon, title, description, examples }: CostPart) {
  return <article className={s.costPart}><Icon aria-hidden="true" size={23} strokeWidth={1.65} /><div><h3>{title}</h3><p>{description}</p><ul>{examples.map((item) => <li key={item}>{item}</li>)}</ul></div></article>;
}

export default function AgentThirteenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}>
    <div className={s.opening}>
      <p>Agent 的成本不只是“模型用了多少 Token”。一次任务从理解请求、检索资料、调用工具到生成结果，每一步都可能消耗预算。</p>
      <p>成本优化不是单纯把调用变少，而是在<strong>任务效果、响应速度、稳定性和预算</strong>之间找到可持续的平衡。</p>
    </div>

    <AgentLessonSection id="section-1" title="1. Agent 的成本由什么构成">
      <p>先拆开一笔任务成本，才能知道应该从哪里优化。</p>
      <div className={s.costPartGrid}>{costParts.map((part) => <CostPartCard key={part.title} {...part} />)}</div>

      <div className={s.subsection} id="section-1-1"><h3>1.1 Token</h3><p>Token 是模型处理文本的基本单位。不同模型的切分方式不同；中文、英文、代码和表格的 Token 密度也不同。</p><div className={s.tokenLines}><span>输入 Token：系统提示词、历史对话、检索材料与工具返回</span><span>输出 Token：模型生成的回答、计划与结构化结果</span><span>推理 Token：部分推理模型在内部思考时额外消耗的用量</span></div></div>
      <div className={s.subsection} id="section-1-2"><h3>1.2 API 调用成本</h3><p>Agent 往往会调用搜索、知识库、OCR、地图或业务系统。即使模型调用不贵，频繁、重复的工具调用也可能成为主要成本。</p></div>
      <div className={s.subsection} id="section-1-3"><h3>1.3 本地部署与运维成本</h3><p>本地或私有化部署会减少按量 API 支出，但仍要考虑机器、GPU、存储、带宽、运维和故障处理。成本会从“每次调用”变成更固定的资源投入。</p></div>
      <div className={s.subsection} id="section-1-4"><h3>1.4 API 和本地部署怎么选</h3><div className={s.tableWrap}><table><thead><tr><th>维度</th><th>对比调用 API</th><th>本地部署</th></tr></thead><tbody><tr><th>成本方式</th><td>按 Token、调用量与服务计费</td><td>前期投入高，后续主要是硬件与运维</td></tr><tr><th>初始投入</th><td>低</td><td>高</td></tr><tr><th>使用弹性</th><td>高，可随业务波动调整</td><td>受限于已有资源</td></tr><tr><th>运维成本</th><td>低，主要关注配置与监控</td><td>高，需要维护推理服务与资源</td></tr><tr><th>适合场景</th><td>试验、迭代快、业务量波动大</td><td>长期稳定、对数据和部署有强要求的业务</td></tr></tbody></table></div></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-2" title="2. 如何进行成本优化">
      <p>成本优化可以按四步推进：先看清楚，再找到重点，实施调整，最后验证结果。</p>
      <ol className={s.optimizationFlow}><li><BarChart3 aria-hidden="true" size={21} /><strong>监控</strong><span>记录成本与结果</span><ArrowRight aria-hidden="true" size={17} /></li><li><Gauge aria-hidden="true" size={21} /><strong>定位</strong><span>找出高成本环节</span><ArrowRight aria-hidden="true" size={17} /></li><li><Zap aria-hidden="true" size={21} /><strong>优化</strong><span>选择合适策略</span><ArrowRight aria-hidden="true" size={17} /></li><li><CheckCircle2 aria-hidden="true" size={21} /><strong>验证</strong><span>确认质量与成本</span></li></ol>
      <div className={s.subsection} id="section-2-1"><h3>2.1 建立成本监控</h3><div className={s.monitorGrid}><article><h4>关键监控指标</h4><ul><li>总成本（USD）</li><li>每次任务成本</li><li>Token 与工具调用次数</li></ul></article><article><h4>按结果看成本</h4><ul><li>成功任务的平均成本</li><li>失败或转人工任务的成本</li><li>模型、工具、检索的成本占比</li></ul></article><article><h4>重点关注指标</h4><strong>cost / successful task</strong><p>只把真正完成业务目标的任务放进分母。</p></article></div></div>
      <div className={s.subsection} id="section-2-2"><h3>2.2 找到成本高的环节</h3><div className={s.diagnosis}><ol><li>按模型、工具、检索、重试和其他成本拆分任务</li><li>查看调用次数、单次成本与耗时</li><li>找出占总成本最高的 1–2 个环节，优先处理</li></ol><aside><h4>常见信号</h4><ul><li>模型调用次数过多</li><li>上下文过长</li><li>外部工具调用成本高</li></ul></aside></div></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-3" title="3. 常见的成本优化方法">
      <p>根据高成本环节选择手段。以下每一种方法都单独成行，便于阅读和逐项评审。</p>
      <div className={s.optimizationRows}>{optimizations.map(({ number, icon: Icon, title, description, action }) => <article key={number}><span>{number}</span><Icon aria-hidden="true" size={23} strokeWidth={1.65} /><div><h3>{title}</h3><p>{description}</p><strong>{action}</strong></div></article>)}</div>
    </AgentLessonSection>

    <AgentLessonSection id="section-4" title="4. 持续优化成本">
      <p>成本优化不是一次性项目。模型、提示词、工具、业务量和用户任务都会变化，因此要把它纳入日常运营。</p>
      <div className={s.continuousGrid}><article><BarChart3 aria-hidden="true" size={22} /><strong>定期分析成本数据</strong><span>按周或按月回看趋势与异常。</span></article><article><RefreshCw aria-hidden="true" size={22} /><strong>关注新的模型和工具</strong><span>评估能力、价格和迁移成本。</span></article><article><Layers3 aria-hidden="true" size={22} /><strong>根据业务反馈调整</strong><span>不同任务需要不同的质量与成本边界。</span></article><article><WalletCards aria-hidden="true" size={22} /><strong>建立成本优化的长期机制</strong><span>把预算、告警和回归测试写进流程。</span></article></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-5" title="5. 怎么验证成本优化是否有效">
      <p>不能只比较账单。每一步验证均单独成行，确保成本、效果和风险都有依据。</p>
      <div className={s.validationRows}>{validations.map(({ number, title, description, signal }) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p><strong>{signal}</strong></div></article>)}</div>
    </AgentLessonSection>

    <AgentLessonSection id="section-6" title="6. 常见问题">
      <div className={s.issueGrid}>{issues.map(([title, description], index) => <article key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </AgentLessonSection>

    <AgentLessonSection id="section-exercise" title="7. 练习题">
      <p>用本课的方法检查一个你熟悉的 Agent 或自动化流程，不需要在课程中运行真实系统。</p>
      <ol className={s.exerciseList}><li>列出一次任务中模型输入、输出、工具调用和基础设施的主要成本。</li><li>为该任务选择一个“成功任务成本”口径，并说明分子和分母。</li><li>找出一个成本最高的环节，提出 2–3 个可比较的优化方案。</li><li>为方案设计固定测试集、质量指标与成本指标。</li><li>制定灰度扩大与异常回退的条件。</li></ol>
    </AgentLessonSection>
  </AgentLessonShell>;
}
