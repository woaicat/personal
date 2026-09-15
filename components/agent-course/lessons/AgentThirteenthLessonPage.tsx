import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  CloudCog,
  Database,
  Diamond,
  FileText,
  Gauge,
  Layers3,
  RefreshCw,
  ServerCog,
  Users,
  WalletCards,
  Zap
} from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import s from "@/components/agent-course/styles/agent-cost.module.css";

type OptimizationVisual = "routing" | "context" | "calls" | "cache" | "limits";
type ValidationVisual = "baseline" | "test-set" | "compare" | "result" | "rollout";
type Optimization = { number: string; title: string; description: string; visual: OptimizationVisual };
type Validation = { number: string; title: string; description: string; visual: ValidationVisual };

const optimizations: Optimization[] = [
  { number: "3.1", title: "模型路由", description: "根据任务的复杂度，选择不同的模型。", visual: "routing" },
  { number: "3.2", title: "上下文管理", description: "控制输入的上下文长度，去除不必要的历史信息。", visual: "context" },
  { number: "3.3", title: "减少模型调用次数", description: "通过优化提示词，合并请求等方式减少不必要的调用。", visual: "calls" },
  { number: "3.4", title: "使用缓存", description: "对不变的内容进行缓存，减少重复的 token 消耗。", visual: "cache" },
  { number: "3.5", title: "设置 Agent 的执行限制", description: "设置合理的执行限制，避免无限循环导致过多重试。", visual: "limits" }
];

const validations: Validation[] = [
  { number: "5.1", title: "建立基线", description: "在优化前记录关键指标作为对比基线。", visual: "baseline" },
  { number: "5.2", title: "准备测试集", description: "使用相同的测试集进行前后对比，保证公平性。", visual: "test-set" },
  { number: "5.3", title: "同时比较成本和效果", description: "不只要看成本是否下降，还要看效果是否有明显变化。", visual: "compare" },
  { number: "5.4", title: "判断优化结果", description: "如果成本下降且效果不变或提升，则认为优化有效。", visual: "result" },
  { number: "5.5", title: "灰度上线", description: "先在小范围用户中验证，再逐步扩大范围。", visual: "rollout" }
];

const issues = [
  ["成本下降了，效果却变差", "模型或上下文被压缩过度；需要把质量指标设为成本优化的护栏。"],
  ["缓存命中率低", "缓存键、过期策略或任务颗粒度不合适；先定位哪些结果真的可复用。"],
  ["工具调用成本过高", "检查是否重复查询、是否能合并请求，或先在本地做轻量判断。"],
  ["难以定位成本高的环节", "按模型、工具、检索、重试等维度拆分 Trace，而不是只看总价。"],
  ["优化效果不稳定", "使用固定测试集和线上灰度，区分模型波动、数据变化和策略问题。"]
];

function OptimizationCard({ number, title, description, visual }: Optimization) {
  return <article className={s.methodCard}>
    <h3><span>{number}</span>{title}</h3>
    <p>{description}</p>
    <div className={s.methodVisual}>
      {visual === "routing" && <div className={s.routingVisual}>
        {["简单任务", "中等任务", "复杂任务"].map((task, index) => <div className={s.routingRow} key={task}><span>{task}</span><ArrowRight aria-hidden="true" size={17} /><span>{["小模型", "中等模型", "大模型"][index]}</span></div>)}
      </div>}
      {visual === "context" && <div className={s.contextVisual}><FileText aria-hidden="true" size={38} strokeWidth={1.7} /><div><span>保留关键信息</span><span>压缩历史对话</span><span>使用摘要替代全文</span></div></div>}
      {visual === "calls" && <div className={s.iconList}>{["合并多个问题", "避免重复调用", "合理使用工具"].map((item) => <div key={item}><Users aria-hidden="true" size={20} strokeWidth={2.3} /><span>{item}</span></div>)}</div>}
      {visual === "cache" && <div className={s.cacheVisual}>
        <div className={`${s.cacheBox} ${s.cacheStable}`}><strong>稳定内容</strong><span>（前后不变/固定内容）</span></div>
        <ArrowRight aria-hidden="true" size={17} />
        <div className={`${s.cacheBox} ${s.cacheDynamic}`}><strong>变化内容</strong><span>（用户问题）</span></div>
        <div className={s.cacheResult}><ArrowDown aria-hidden="true" size={17} /><span>结果缓存</span></div>
      </div>}
      {visual === "limits" && <div className={s.limitList}><span>最大执行步数：10</span><span>最大重试次数：2</span><span>任务超时：60 秒</span></div>}
    </div>
  </article>;
}

function ValidationCard({ number, title, description, visual }: Validation) {
  return <article className={s.methodCard}>
    <h3><span>{number}</span>{title}</h3>
    <p>{description}</p>
    <div className={s.methodVisual}>
      {visual === "baseline" && <div className={s.baselineVisual}><strong>建议关注 p90</strong><span>即 90% 的用户完成任务，</span><span>低于此值，说明效果不稳定。</span></div>}
      {visual === "test-set" && <div className={s.iconList}>{["覆盖常见场景", "包含边界情况", "保证前后结果稳定"].map((item) => <div key={item}><Check aria-hidden="true" size={20} strokeWidth={3} /><span>{item}</span></div>)}</div>}
      {visual === "compare" && <div className={s.metricList}><h4>对比指标</h4><span><Check aria-hidden="true" size={17} strokeWidth={3} />总成本</span><span><Check aria-hidden="true" size={17} strokeWidth={3} />cost / successful task</span><span><Check aria-hidden="true" size={17} strokeWidth={3} />任务成功率 / 准确率</span></div>}
      {visual === "result" && <div className={s.metricList}><h4>可能的结果</h4><span><Diamond aria-hidden="true" size={13} fill="currentColor" />成本下降，效果提升</span><span><Diamond aria-hidden="true" size={13} fill="currentColor" />成本下降，效果不变</span><span><Diamond aria-hidden="true" size={13} fill="currentColor" />成本下降，但效果变差</span></div>}
      {visual === "rollout" && <div className={s.rolloutVisual}><div className={s.rolloutSteps}><span>5%</span><ArrowRight aria-hidden="true" size={15} /><span>20%</span><ArrowRight aria-hidden="true" size={15} /><span>50%</span><ArrowRight aria-hidden="true" size={15} /><span>100%</span></div><small>逐步扩大，降低风险。</small></div>}
    </div>
  </article>;
}

export default function AgentThirteenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}>
    <div className={s.opening}>
      <p>Agent 成本是指为了完成任务，模型和接口调用、运维以及其他成本。每一次模型调用、工具调用和缓存，都会带来实际的费用。</p>
      <p>要做的事是：<strong>在有限预算下，用更少的成本完成更多有效任务。</strong></p>
    </div>

    <AgentLessonSection id="section-1" title="1. Agent 的成本由什么构成">
      <div className={s.subsection} id="section-1-1"><h3>1.1 Token</h3><p>Token 是模型处理文本的基本单位。不同模型的 Token 划分方式略有不同。</p><ul className={s.tokenFacts}><li>英文中，1 个 Token 大约对应 4 个字符或 0.75 个单词。</li><li>中文中，一个汉字通常对应 1 个或多个 Token。</li><li>图片、PDF 等多模态内容也会按各自规则转换成 Token。</li></ul><div className={s.formulaBand}><strong>Token 数量 × 对应的 Token 单价</strong></div></div>
      <div className={s.subsection} id="section-1-2"><h3>1.2 API 调用成本</h3><p>当使用调用 API 时，成本主要来自输入和输出的 Token，以及一些其他因素。</p><div className={s.apiCostGrid}><article><BrainCircuit aria-hidden="true" size={22} /><h4>输入 Token</h4><p>系统提示词、工具定义、历史对话、用户问题。</p><span>输入的 Token 越多，成本越高。</span></article><article><Bot aria-hidden="true" size={22} /><h4>输出 Token</h4><p>模型生成的回答、工具调用参数和结果。</p><span>限制输出长度，能直接减少费用。</span></article><article><Database aria-hidden="true" size={22} /><h4>缓存</h4><p>相同内容命中缓存时，可复用已处理结果。</p><span>例如 Prompt Cache、常见问答缓存。</span></article><article><CloudCog aria-hidden="true" size={22} /><h4>其他成本</h4><p>大模型推理、外部工具、第三方服务与网络资源。</p><span>还要关注检索、OCR、搜索等费用。</span></article></div><div className={s.formulaBand}><strong>单次任务成本 = ∑（每轮输入 Token × 输入单价 + 每轮输出 Token × 输出单价）+ 外部工具费用</strong></div></div>
      <div className={s.subsection} id="section-1-3"><h3>1.3 本地部署与运维成本</h3><p>如果选择本地部署，成本重点在于硬件：</p><div className={s.deploymentGrid}><article><ServerCog aria-hidden="true" size={22} /><h4>硬件成本</h4><p>服务器、GPU / 服务器等硬件。</p></article><article><Layers3 aria-hidden="true" size={22} /><h4>机房和基础设施</h4><p>包括机房、电力、网络、存储等基础设施投入。</p></article><article><Bot aria-hidden="true" size={22} /><h4>运维成本</h4><p>需要专门的运维人员进行部署、监控和维护。</p></article><article><Gauge aria-hidden="true" size={22} /><h4>资源折旧率</h4><p>如果资源利用率不高，实际单次成本会变高。</p></article></div></div>
      <div className={s.subsection} id="section-1-4"><h3>1.4 API 和本地部署怎么选</h3><p>两者各有优缺点，通常需要按实际业务需求选择。</p><div className={s.deploymentDecision}><div className={s.tableWrap}><table><thead><tr><th>对比项</th><th>调用 API</th><th>本地部署</th></tr></thead><tbody><tr><th>成本方式</th><td>按 Token 计算，使用多少付多少</td><td>前期投入高，后续主要是硬件与运维成本</td></tr><tr><th>初始投入</th><td>低</td><td>高</td></tr><tr><th>使用弹性</th><td>高，可随业务波动灵活调整</td><td>受限于已有资源</td></tr><tr><th>运维成本</th><td>低，无需关注底层推理服务</td><td>高，需要专门的运维团队</td></tr><tr><th>适合场景</th><td>试验、迭代快、业务量波动大的业务</td><td>长期稳定、对数据和部署有强要求的业务</td></tr></tbody></table></div><aside className={s.localTip}><Zap aria-hidden="true" size={21} /><div><h4>小结</h4><ul><li>如果试验、使用 API 更灵活。</li><li>如果对数据安全、长期成本和稳定性有要求，可以考虑本地部署。</li><li>实际选择时，往往需要结合评估。</li></ul></div></aside></div></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-2" title="2. 如何进行成本优化">
      <p>成本优化可以按四步推进：先看清楚，再找到重点，实施调整，最后验证结果。</p>
      <ol className={s.optimizationFlow}><li><BarChart3 aria-hidden="true" size={21} /><strong>监控</strong><span>记录成本与结果</span><ArrowRight aria-hidden="true" size={17} /></li><li><Gauge aria-hidden="true" size={21} /><strong>定位</strong><span>找出高成本环节</span><ArrowRight aria-hidden="true" size={17} /></li><li><Zap aria-hidden="true" size={21} /><strong>优化</strong><span>选择合适策略</span><ArrowRight aria-hidden="true" size={17} /></li><li><CheckCircle2 aria-hidden="true" size={21} /><strong>验证</strong><span>确认质量与成本</span></li></ol>
      <div className={s.subsection} id="section-2-1"><h3>2.1 建立成本监控</h3><div className={s.monitorGrid}><article><h4>关键监控指标</h4><ul><li>总成本（USD）</li><li>每次任务成本</li><li>Token 与工具调用次数</li></ul></article><article><h4>按结果看成本</h4><ul><li>成功任务的平均成本</li><li>失败或转人工任务的成本</li><li>模型、工具、检索的成本占比</li></ul></article><article><h4>重点关注指标</h4><strong>cost / successful task</strong><p>只把真正完成业务目标的任务放进分母。</p></article></div></div>
      <div className={s.subsection} id="section-2-2"><h3>2.2 找到成本高的环节</h3><div className={s.diagnosis}><ol><li>按模型、工具、检索、重试和其他成本拆分任务</li><li>查看调用次数、单次成本与耗时</li><li>找出占总成本最高的 1–2 个环节，优先处理</li></ol><aside><h4>常见信号</h4><ul><li>模型调用次数过多</li><li>上下文过长</li><li>外部工具调用成本高</li></ul></aside></div></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-3" title="3. 常见的成本优化方法">
      <p>根据实际情况，可以组合使用以下方法。</p>
      <div className={s.methodCards}>{optimizations.map((optimization) => <OptimizationCard key={optimization.number} {...optimization} />)}</div>
    </AgentLessonSection>

    <AgentLessonSection id="section-4" title="4. 持续优化成本">
      <p>成本优化不是一次性项目。模型、提示词、工具、业务量和用户任务都会变化，因此要把它纳入日常运营。</p>
      <div className={s.continuousGrid}><article><BarChart3 aria-hidden="true" size={22} /><strong>定期分析成本数据</strong><span>按周或按月回看趋势与异常。</span></article><article><RefreshCw aria-hidden="true" size={22} /><strong>关注新的模型和工具</strong><span>评估能力、价格和迁移成本。</span></article><article><Layers3 aria-hidden="true" size={22} /><strong>根据业务反馈调整</strong><span>不同任务需要不同的质量与成本边界。</span></article><article><WalletCards aria-hidden="true" size={22} /><strong>建立成本优化的长期机制</strong><span>把预算、告警和回归测试写进流程。</span></article></div>
    </AgentLessonSection>

    <AgentLessonSection id="section-5" title="5. 怎么验证成本优化是否有效">
      <p>优化之后，需要通过科学的方法验证效果。</p>
      <div className={`${s.methodCards} ${s.validationCards}`}>{validations.map((validation) => <ValidationCard key={validation.number} {...validation} />)}</div>
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
