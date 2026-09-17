"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Database,
  FileText,
  GitBranch,
  Link2,
  ListChecks,
  LockKeyhole,
  Search,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Tags,
  type LucideIcon
} from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import {
  lessonFifteenIntro,
  lessonFifteenSection1,
  lessonFifteenSection2,
  lessonFifteenSection2AfterConceptTable,
  lessonFifteenSection2AfterFieldTable,
  lessonFifteenSection2AfterMetricTable,
  lessonFifteenSection2BeforeConceptTable,
  lessonFifteenSection2BeforeFieldTable,
  lessonFifteenSection2BeforeMetricTable,
  lessonFifteenSection2VersionNote,
  lessonFifteenSection3,
  lessonFifteenSection4
} from "@/content/agent-course/lesson-15";
import s from "@/components/agent-course/styles/agent-observability.module.css";

function Markdown({ children }: { children: string }) {
  return <div className={s.copy}><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({ node: _node, children: label, ...props }) => <a className={s.referenceLink} {...props} target="_blank" rel="noreferrer">{label} ↗</a> }} >{children}</ReactMarkdown></div>;
}

const problemNodes = [
  { icon: ClipboardList, title: "查询订单", detail: "签收时间" },
  { icon: Search, title: "检索规则", detail: "退货规则", alert: true },
  { icon: Bot, title: "模型判断", detail: "是否可退" },
  { icon: CheckCircle2, title: "返回回答", detail: "给出解释" }
];

const conceptRows = [
  ["Trace：调用链路", "一次请求从开始到结束的执行记录", "一次退货咨询的处理过程", GitBranch],
  ["Span：执行步骤", "链路中的一个操作，可以包含子步骤", "一次模型调用、订单查询或知识检索", ListChecks],
  ["Log：日志", "某个时刻发生的具体事件", "查询超时、重试开始、人工审批通过", FileText]
] as const;

function ConceptCards() {
  return <div className={s.conceptCards}>{conceptRows.map(([title, meaning, example, Icon]) => <article key={title}><Icon size={25} aria-hidden="true" /><div><strong>{title}</strong><span>{meaning}</span><small>{example}</small></div></article>)}</div>;
}

function ProblemDiagnosis() {
  return <div className={s.visualCard} role="img" aria-label="Agent 退货咨询执行链路与问题定位示意">
    <div className={s.visualHeader}><span className={s.userQuestion}><Bot size={18} aria-hidden="true" />用户：这件商品还能退吗？</span></div>
    <div className={s.problemFlow}>{problemNodes.map(({ icon: Icon, title, detail, alert }, index) => <div className={`${s.problemNode} ${alert ? s.problemNodeAlert : ""}`} key={title}><div className={s.problemNodeBox}><Icon size={20} aria-hidden="true" /><strong>{title}</strong></div><span>{detail}</span>{index < problemNodes.length - 1 ? <ArrowRight className={s.flowArrow} size={18} aria-hidden="true" /> : null}</div>)}</div>
    <div className={s.problemReasons}><div><span>可能的问题</span><b>签收时间错误</b></div><div><span>&nbsp;</span><b>规则已失效</b></div><div><span>&nbsp;</span><b>判断错误</b></div><div><span>&nbsp;</span><b>工具失败仍给出确定回答</b></div></div>
    <div className={s.visualCaption}>不同原因，需要不同的改进方法。</div>
  </div>;
}

function ResultSplit() {
  return <div className={s.resultSplit} role="img" aria-label="运行结果与业务结果双重判断"><div><CheckCircle2 size={29} aria-hidden="true" /><div><strong>运行结果：成功</strong><span>接口正常 · 无超时 · 无异常</span></div></div><div><AlertTriangle size={31} aria-hidden="true" /><div><strong>业务结果：失败</strong><span>错误承诺可以退款</span></div></div><p>同一次客服请求，两个不同的判断维度</p></div>;
}

const comparisonRows = [
  ["模型版本", "v1.0", "v1.1", "响应耗时", "3.2s", "1.6s"],
  ["提示词版本", "p0", "p1", "工具调用次数", "6 次", "3 次"],
  ["任务类型", "客服咨询", "退货处理", "失败比例", "18%", "8%"]
];

function VersionComparison() {
  return <div className={s.versionCard} role="img" aria-label="按版本与任务类型比较响应耗时、工具调用次数和失败比例"><div className={s.versionGrid}>{comparisonRows.map(([label, before, after, metric, valueBefore, valueAfter]) => <div className={s.versionRow} key={label}><strong>{label}</strong><span>{before}</span><ArrowRight size={16} aria-hidden="true" /><span>{after}</span><strong>{metric}</strong><div className={s.measure}><i style={{ width: label === "模型版本" ? "87%" : label === "提示词版本" ? "100%" : "75%" }} /><span>{valueBefore}</span></div><div className={s.measure}><i className={s.measureAfter} style={{ width: label === "模型版本" ? "43%" : label === "提示词版本" ? "52%" : "35%" }} /><span>{valueAfter}</span></div></div>)}</div><div className={s.visualCaption}>按版本与任务类型比较</div></div>;
}

const traceSteps = [
  { title: "退货咨询", detail: "一次会话完整链路", start: 0, duration: 4.8, color: "root" },
  { title: "模型决定查询订单", detail: "模型调用", start: 0, duration: 0.6, color: "model" },
  { title: "订单查询", detail: "工具调用", start: 0.6, duration: 0.8, color: "tool" },
  { title: "检索退货规则", detail: "检索", start: 1.4, duration: 0.5, color: "selected" },
  { title: "生成判断和解释", detail: "模型调用", start: 1.9, duration: 2.7, color: "long" },
  { title: "返回用户", detail: "输出", start: 4.6, duration: 0.2, color: "output" }
] as const;

const traceDetails = [
  ["用户问题", "退货咨询：这件商品还能退吗？", "请求开始", "0.0s"],
  ["模型调用", "决定查询订单", "模型调用完成", "0.6s"],
  ["订单查询", "订单号：demo_015，签收时间", "订单查询完成", "0.8s"],
  ["检索退货规则", "商品类别、签收时间", "规则已过期", "0.5s"],
  ["生成判断和解释", "订单信息 + 规则文档 v1", "模型输出完成", "2.7s"],
  ["返回用户", "错误承诺可以退款", "响应已返回", "0.2s"]
] as const;

function TraceExplorer() {
  const [selected, setSelected] = useState(3);
  const step = traceSteps[selected];
  return <div className={s.traceExplorer}>
    <div className={s.traceHeader}><div><h4>退货咨询 · Trace 详情</h4><span>Trace ID: tr_demo_015&nbsp;&nbsp;|&nbsp;&nbsp;总耗时 4.8s</span></div></div>
    <div className={s.timelineScale}><span>步骤</span>{["0s", "1s", "2s", "3s", "4s", "4.8s"].map((item) => <span key={item}>{item}</span>)}</div>
    <div className={s.traceRows}>{traceSteps.map((item, index) => <button type="button" className={`${s.traceRow} ${selected === index ? s.traceSelected : ""}`} onClick={() => setSelected(index)} key={item.title} aria-pressed={selected === index}><span className={s.traceLabel}><i className={index === 0 ? s.traceRoot : undefined} />{item.title}</span><span className={s.traceDuration}>{item.duration.toFixed(1)}s</span><span className={`${s.traceBar} ${s[`traceBar${item.color[0].toUpperCase()}${item.color.slice(1) as string}`]}`} style={{ left: `${item.start / 4.8 * 100}%`, width: `${Math.max(item.duration / 4.8 * 100, 3)}%` }} /></button>)}</div>
    <div className={s.traceDetail}><div className={s.traceDetailIcon}><Search size={25} aria-hidden="true" /></div><div><strong>{step.title}</strong><p>输入：{traceDetails[selected][1]}<br />输出：{traceDetails[selected][2]}<br /><b>{selected === 3 ? "提示：规则已过期" : "状态：已记录"}</b></p></div><div className={s.relatedLog}><span>相关事件</span><p><i />Log　{traceDetails[selected][2]} <em>{traceDetails[selected][3]}</em></p></div></div>
    <div className={s.traceNotes}><span>●</span>同一会话中的多次请求，通过会话标识关联。<br /><span>●</span>执行记录要既能反映实际发生的操作，不等于模型内部推理的完整记录。</div>
  </div>;
}

const keyFieldRows = [
  ["任务与会话", "任务标识、会话标识、任务类型、开始与结束时间", "找到一次运行，关联多轮对话"],
  ["版本与配置", "应用版本、模型名称及可获取的版本、提示词版本、关键参数", "比较不同版本，排查变更影响"],
  ["模型调用", "实际发送的消息与上下文、模型输出、Token 用量、耗时", "检查输入是否充分、输出是否合理"],
  ["工具调用", "工具名称、输入参数、返回结果、错误、重试次数", "判断工具选择、参数和执行是否正确"],
  ["检索与记忆", "查询内容、命中的资料标识与版本、实际加入上下文的片段、记忆读写变化", "排查信息缺失、过期或使用错误"],
  ["执行控制", "循环次数、子 Agent 分工、权限检查、审批、转人工、停止原因", "检查执行边界和异常处理"],
  ["最终结果", "最终回答或操作结果、任务完成状态、用户反馈、人工或自动评测结果", "判断业务效果，积累问题样本"]
];

function KeyFieldsVisual() {
  return <div className={s.keyFieldsVisual}><div className={s.fieldTableWrap}><table><thead><tr><th>记录对象</th><th>建议记录的信息</th><th>主要用途</th></tr></thead><tbody>{keyFieldRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div><div className={s.infoCallout}><Tags size={18} aria-hidden="true" /><div><strong>版本信息不要遗漏</strong><span>{lessonFifteenSection2VersionNote}</span></div></div></div>;
}

const dashboardMetrics = [
  [CheckCircle2, "效果", "任务成功率", "92.4%"],
  [Clock3, "速度", "P95 总耗时", "8.6s"],
  [Database, "成本", "单次任务成本", "¥0.032"],
  [ShieldCheck, "稳定性", "工具错误率", "1.8%"]
] as const;

function TrendChart() {
  return <div className={s.trendPanel}><h4>任务成功率与版本变化</h4><svg viewBox="0 0 330 122" role="img" aria-label="任务成功率版本趋势"><path className={s.chartGrid} d="M25 15H315M25 55H315M25 95H315" /><path className={s.chartLine} d="M25 74 L80 58 L135 50 L190 60 L245 52 L300 68" /><path className={s.chartGuide} d="M190 10V99" />{[[25,74],[80,58],[135,50],[190,60],[245,52],[300,68]].map(([x,y], i) => <circle className={i === 5 ? s.chartPointWarn : s.chartPoint} cx={x} cy={y} r="4" key={x} />)}<text x="180" y="9">提示词版本更新</text><text x="292" y="57">待排查</text><text x="17" y="116">第1批　 第2批　 第3批　 第4批　 第5批　 第6批</text></svg></div>;
}

function MetricsDashboard() {
  return <div className={s.dashboard} role="img" aria-label="Agent 运行概览教学仪表盘，包含效果、速度、成本、稳定性和 P95 分布"><div className={s.dashboardTop}><h4>Agent 运行概览</h4><div className={s.dashboardFilters}><span>任务类型：<b>退货咨询⌄</b></span><span>版本：<b>全部⌄</b></span></div></div><div className={s.metricCards}>{dashboardMetrics.map(([Icon, title, label, value]) => <article key={title}><Icon size={20} aria-hidden="true" /><strong>{title}</strong><span>{label}</span><b>{value}</b><svg viewBox="0 0 100 22" aria-hidden="true"><path d="M2 18 C20 15,26 9,43 13 S65 20,98 4" /></svg></article>)}</div><div className={s.dashboardCharts}><TrendChart /><div className={s.costBars}><h4>耗时分布</h4>{[["模型调用", "42%"], ["工具执行", "28%"], ["系统处理", "20%"], ["等待审批", "10%"]].map(([label, value], i) => <div key={label}><span>{label}</span><i className={i === 3 ? s.hatchedBar : ""} style={{ width: value }} /><b>{value}</b></div>)}</div></div><div className={s.metricExplanations}>{[["效果", "任务成功率、回答正确率、用户满意度、人工接管率"], ["速度", "首次响应耗时、任务总耗时、各步骤耗时"], ["成本", "每次任务成本、模型与工具费用、Token 用量"], ["稳定性", "错误率、超时率、重试次数、达到执行上限的比例"]].map(([title, items]) => <div key={title}><strong>{title}</strong><p>{items}</p></div>)}</div><div className={s.p95Panel}><h4>P95 怎么看</h4><div className={s.p95Dots}>{Array.from({ length: 20 }, (_, index) => <i className={index === 19 ? s.slowDot : ""} key={index} />)}<b>8.6s</b></div><span>约95%的请求耗时不超过这个值，用来了解较慢请求的体验。</span><div className={s.p95Legend}><span><i />正常请求（19 个）</span><span><i />较慢的请求（1 个）</span></div><p>系统处理时间与等待用户、等待审批的时间分开统计。</p></div></div>;
}

function ScopeVisual() {
  return <div className={s.scopeVisual}><div className={s.scopeCard}><h4><LockKeyhole size={19} aria-hidden="true" />内容与权限</h4>{[["敏感内容", "脱敏保存"], ["密码与密钥", "不进入日志"], ["访问与保留", "明确人员与期限"]].map(([from, to]) => <p key={from}><span>{from}</span><ArrowRight size={15} aria-hidden="true" /><b>{to}</b></p>)}</div><div className={s.scopeCard}><h4><Database size={19} aria-hidden="true" />采样与保留</h4><div className={s.retentionFlow}><span>全部请求</span><div><p><b>普通请求：平常保留</b><small>示例：10% 采样，保留 30 天</small></p><p><b>失败 / 超时 / 重要操作：优先保留</b><small>示例：100% 保留，保留 90 天</small></p></div></div></div><div className={s.scopeWarning}><AlertTriangle size={19} aria-hidden="true" /><strong>整体成功率和错误率，应使用完整计数或经过正确校正的数据。</strong><span>不要把偏向保留失败请求的样本，当成全部流量。</span></div></div>;
}

const platformIcons: Record<string, LucideIcon> = { link: Link2, bars: BarChart3, search: Search, server: Server, box: Database };

function PlatformRow({ platform }: { platform: (typeof lessonFifteenSection3.platforms)[number] }) {
  const Icon = platformIcons[platform.icon];
  return <article className={s.platformRow}><div className={s.platformHeading}><span className={s.platformIcon}><Icon size={24} aria-hidden="true" /></span><div><h3>{platform.number}&nbsp; {platform.name}</h3><p>{platform.description}{platform.linkLabel ? <> <a className={s.referenceLink} href={platform.link} target="_blank" rel="noreferrer">{platform.linkLabel} ↗</a></> : null}</p></div></div><div className={s.platformCompare}><div><Check size={17} aria-hidden="true" /><strong>特点</strong><p>{platform.feature}</p></div><div><SlidersHorizontal size={19} aria-hidden="true" /><strong>取舍</strong><p>{platform.tradeoff}{platform.tradeoffLinks.length > 0 ? <> {platform.tradeoffLinks.map((item, index) => <span key={item.url}>{index > 0 ? "、" : ""}<a className={s.referenceLink} href={item.url} target="_blank" rel="noreferrer">{item.text} ↗</a></span>)}</> : null}</p></div></div></article>;
}

function OpenSourcePipeline() {
  return <div className={s.pipeline}><div><Bot size={23} aria-hidden="true" /><strong>Agent</strong></div><ArrowRight size={18} aria-hidden="true" /><div><GitBranch size={23} aria-hidden="true" /><strong>OpenTelemetry</strong><small>负责采集与传输</small></div><div className={s.pipelineBranches}>{[[Database, "Tempo", "链路数据"], [BarChart3, "Prometheus", "指标数据"], [FileText, "Loki", "日志数据"]].map(([Icon, title, detail]) => <div key={title as string}>{(() => { const C = Icon as LucideIcon; return <C size={20} aria-hidden="true" />; })()}<strong>{title as string}</strong><small>{detail as string}</small></div>)}</div><ArrowRight size={18} aria-hidden="true" /><div><BarChart3 size={23} aria-hidden="true" /><strong>Grafana</strong><small>看板展示</small></div></div>;
}

function StartVisual() {
  const fields = ["用户问题", "订单与规则", "模型与提示词版本", "最终回答", "耗时", "成本"];
  const steps = [["01", "建立看板", "成功率、耗时、成本与错误率"], ["02", "设置告警", "触发条件明确，处理人可见"], ["03", "定位问题", "从异常指标进入具体链路"], ["04", "建立测试集", "将典型失败案例加入评测集"]];
  return <div className={s.startVisual}><div className={s.startFields}><h4><ClipboardList size={19} aria-hidden="true" />退货咨询：第一版至少要看见什么</h4><div>{fields.map((field) => <span key={field}>{field}</span>)}</div></div><div className={s.startSteps}>{steps.map(([number, title, description], index) => <div key={number}><b>{number}</b><article><strong>{title}</strong><span>{description}</span></article>{index < steps.length - 1 ? <ArrowRight size={18} aria-hidden="true" /> : null}</div>)}</div><div className={s.loopBack}><span />验证改进后继续观测<span /></div></div>;
}

export default function AgentFifteenthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}>
    <div className={s.opening}><Markdown>{lessonFifteenIntro}</Markdown></div>
    <AgentLessonSection id="section-1" title="1. 为什么需要可观测性">
      <div className={s.subsection} id="section-1-1"><h3>1.1 监控agent执行过程 定位问题</h3><Markdown>{lessonFifteenSection1.oneOne}</Markdown><ProblemDiagnosis /></div>
      <div className={s.subsection} id="section-1-2"><h3>1.2 区分运行成功与任务成功</h3><Markdown>{lessonFifteenSection1.oneTwo}</Markdown><ResultSplit /></div>
      <div className={s.subsection} id="section-1-3"><h3>1.3 寻找优化空间 支持持续改进</h3><Markdown>{lessonFifteenSection1.oneThree}</Markdown><VersionComparison /></div>
    </AgentLessonSection>
    <AgentLessonSection id="section-2" title="2. 需要记录什么">
      <div className={s.subsection} id="section-2-1"><h3>2.1 记录执行链路</h3><Markdown>{lessonFifteenSection2BeforeConceptTable}</Markdown><ConceptCards /><Markdown>{lessonFifteenSection2AfterConceptTable}</Markdown><TraceExplorer /></div>
      <div className={s.subsection} id="section-2-2"><h3>2.2 保留关键字段</h3><Markdown>{lessonFifteenSection2BeforeFieldTable}</Markdown><KeyFieldsVisual /><Markdown>{lessonFifteenSection2AfterFieldTable}</Markdown></div>
      <div className={s.subsection} id="section-2-3"><h3>2.3 汇总核心指标</h3><Markdown>{lessonFifteenSection2BeforeMetricTable}</Markdown><MetricsDashboard /><Markdown>{lessonFifteenSection2AfterMetricTable}</Markdown></div>
      <div className={s.subsection} id="section-2-4"><h3>2.4 控制监控范围</h3><Markdown>{lessonFifteenSection2.oneFour}</Markdown><ScopeVisual /></div>
    </AgentLessonSection>
    <AgentLessonSection id="section-3" title="3. 有哪些可用方案"><Markdown>{lessonFifteenSection3.intro}</Markdown>{lessonFifteenSection3.platforms.map((platform) => <div className={s.subsection} id={`section-${platform.number.replace(".", "-")}`} key={platform.number}><PlatformRow platform={platform} />{platform.number === "3.5" ? <><Markdown>{lessonFifteenSection3.openSourceList}</Markdown><OpenSourcePipeline /></> : null}</div>)}</AgentLessonSection>
    <AgentLessonSection id="section-4" title="4. 如何开始"><Markdown>{lessonFifteenSection4}</Markdown><StartVisual /></AgentLessonSection>
  </AgentLessonShell>;
}
