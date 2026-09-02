import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Heart,
  ListChecks,
  RefreshCw,
  Search,
  Sparkles,
  Table2,
  Target,
  Users,
  type LucideIcon
} from "lucide-react";
import type { AgentLessonPageDetail } from "../_content/lesson-page-details";
import AgentLessonShell from "./AgentLessonShell";
import LessonChoiceQuestion, { type LessonChoiceFeedback } from "./LessonChoiceQuestion";
import styles from "./agent-course.module.css";

const valueCards: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: BarChart3, title: "业务价值", description: "赚钱、降本、增效，解决这个问题能为个人或组织带来多少可量化的价值" },
  { icon: Users, title: "影响范围", description: "受众多少，解决这个问题多少人可以因此受益" },
  { icon: Heart, title: "被服务程度", description: "这个问题当前已有的解决方案质量如何，已有解决方案比较成熟，已有解决方案不能完全解决问题或者有明显的漏洞或痛点。" },
  { icon: AlertTriangle, title: "不解决的损失", description: "这个问题就算不解决又能怎样？不做不会影响业务流程，不做业务流程无法进行下去" }
];

const choiceOptions = [
  "客服团队每天处理 2,000+ 条产品咨询，人工重复回答占用 30 名客服，响应速度影响续费",
  "每月为 5 位同事整理一次固定格式的报销单，用 Excel 模板 30 分钟即可完成",
  "为部门分享会重新挑选封面字体，预计只影响 10 位同事"
];

const choiceFeedback: LessonChoiceFeedback[] = [
  { icon: "check", tone: "lessonFeedbackPositive", label: "A", text: "最值得优先解决，影响用户和业务结果，且有明确的人力与效率成本。" },
  { icon: "x", tone: "lessonFeedbackNegative", label: "B", text: "已有简单模板可以解决，投入 Agent 的复杂度与收益不匹配。" },
  { icon: "sparkles", tone: "lessonFeedbackBest", label: "C", text: "影响范围小、业务损失低，不值得优先投入。" }
];

const decisionRows = [
  ["任务执行流程", "流程步骤固定可预测", "动态变化、不可预测"],
  ["任务规则和分支", "可以穷尽", "不可穷尽"],
  ["交付结果", "封闭、唯一正确答案", "开放、需要灵活处理"]
];

const workflowSteps: Array<{ icon: LucideIcon; label: string }> = [
  { icon: FileText, label: "文档" },
  { icon: Table2, label: "表格" },
  { icon: ListChecks, label: "规则" },
  { icon: CheckCircle2, label: "结果" }
];

const agentSteps: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Heart, label: "理解需求" },
  { icon: Target, label: "制定计划" },
  { icon: Search, label: "收集信息" },
  { icon: ClipboardList, label: "整合输出" }
];

const exercises = [
  {
    title: "练习 1：以下哪个场景更适合 Workflow?",
    options: [
      "根据规则批量抽取合同字段并写入系统",
      "为几位同事提供最开放的职涯建议并持续追问",
      "根据管理提纲将竞品报告不断改写"
    ],
    correctIndex: 0,
    explanations: [
      "规则明确、流程清晰，适合 Workflow。",
      "需要动态判断，不能仅靠固定流程解决。",
      "需要根据反馈调整，更适合 Agent。"
    ]
  },
  {
    title: "练习 2：以下哪个场景更适合 Agent?",
    options: [
      "按照模板生成固定格式日报",
      "根据用户生命周期识别客服场景并编写文档，并持续修改",
      "统计一年只发生两次的冷门投诉类型"
    ],
    correctIndex: 1,
    explanations: [
      "更适合 Workflow。",
      "任务开放、需要追问和动态调整，适合 Agent。",
      "受众少、业务价值低，不值得优先投入。"
    ]
  }
];

function LessonSystemFlow({ steps }: { steps: Array<{ icon: LucideIcon; label: string }> }) {
  return (
    <div className={styles.lessonSystemFlow} aria-label={steps.map((step) => step.label).join("、")}>
      {steps.map(({ icon: Icon, label }, index) => (
        <div className={styles.lessonSystemFlowStep} key={label}>
          <span className={styles.lessonSystemFlowIcon}><Icon aria-hidden="true" size={17} strokeWidth={1.8} /></span>
          <span>{label}</span>
          {index < steps.length - 1 ? <ArrowRight aria-hidden="true" size={16} strokeWidth={1.7} /> : null}
        </div>
      ))}
    </div>
  );
}

export default function AgentSecondLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return (
    <AgentLessonShell detail={detail}>
          <section className={styles.lessonSection} id="section-1" aria-labelledby="section-two-one-title">
            <div className={styles.lessonSectionIntro}>
              <p>你可能会说：我要学到底怎么设计一个 agent，看这些干什么？</p>
              <p>别着急，毕竟不是所有问题都值得上 agent，甚至不是所有问题都值得解决。</p>
              <p>在开始动手前，了解我们要解决的问题、判断它的价值和特点，可以帮助我们更好的选择方案。</p>
            </div>
            <h2 id="section-two-one-title">1. 判断问题是否值得解决?</h2>
            <p className={styles.lessonSectionLead}>不是所有问题都值得投入资源。先判断问题本身的价值。</p>
            <div className={`${styles.lessonSplit} ${styles.lessonValueSplit}`}>
              <div className={styles.lessonSplitColumn}>
                <h3>A. 价值判断框架</h3>
                <div className={styles.lessonValueGrid}>
                  {valueCards.map(({ icon: Icon, title, description }) => (
                    <article className={styles.lessonValueCard} key={title}>
                      <Icon aria-hidden="true" size={26} strokeWidth={1.7} />
                      <div><strong>{title}</strong><p>{description}</p></div>
                    </article>
                  ))}
                </div>
              </div>
              <div className={styles.lessonSplitColumn}>
                <h3>B. 选择题</h3>
                <p className={styles.lessonPrompt}>以下哪个问题最值得优先解决?</p>
                <LessonChoiceQuestion
                  ariaLabel="价值判断选择题"
                  options={choiceOptions}
                  correctIndex={0}
                  feedback={choiceFeedback}
                />
              </div>
            </div>
          </section>

          <section className={styles.lessonSection} id="section-2" aria-labelledby="section-two-two-title">
            <h2 id="section-two-two-title">2. 判断是否适合用 Agent 做?</h2>
            <p className={styles.lessonSectionLead}>不是所有问题都应该让 Agent 做，先看任务的特点。</p>
            <table className={styles.lessonDecisionTable}>
              <thead>
                <tr><th scope="col">维度</th><th scope="col">Workflow</th><th scope="col">Agent</th></tr>
              </thead>
              <tbody>
                {decisionRows.map(([dimension, workflow, agent]) => (
                  <tr key={dimension}><th scope="row">{dimension}</th><td>{workflow}</td><td>{agent}</td></tr>
                ))}
              </tbody>
            </table>
            <p className={styles.lessonDecisionCallout}>
              <CheckCircle2 aria-hidden="true" size={17} />
              能用简单办法解决的，尽量不要增加复杂度。除非有明确的证据说明简单办法无法解决问题。
            </p>

            <div className={styles.lessonSubsection} id="section-2-1">
              <h3>2.1&nbsp;&nbsp;Workflow 与 Agent 的区别</h3>
              <div className={styles.lessonSystemCompare}>
                <article className={styles.lessonSystemPanel}>
                  <h4>适合 Workflow 的典型例子</h4>
                  <ul>
                    <li>按照规则批量审核材料，输出通过 / 不通过结果</li>
                    <li>按照固定模板生成日报、合同字段或会议纪要</li>
                  </ul>
                  <LessonSystemFlow steps={workflowSteps} />
                  <p>工作流也可以很复杂，主要复杂在流程编排。如果你使用过coze、dify 这类平台，可能会见过很多人设计的工作流看起来让人眼花缭乱、线条错综复杂。<br />不过不管再复杂也在可控的范围内，只是多了一些分支和条件判断，毕竟每一步都是提前预设好的。</p>
                </article>
                <article className={styles.lessonSystemPanel}>
                  <h4>适合 Agent 的典型例子</h4>
                  <ul>
                    <li>需要根据文档、多轮询问收集信息，创建文档并动态总结</li>
                    <li>生成调研报告、制定计划，以及根据意见、判断提交修改</li>
                  </ul>
                  <LessonSystemFlow steps={agentSteps} />
                  <div className={styles.lessonSystemLoop}><RefreshCw aria-hidden="true" size={15} />反思 / 调整</div>
                  <p className={styles.lessonAgentPrinciple}>灵活性、反思性、能自主决策是Agent核心价值的体现。换言之，不需要太灵活，也不需要自主决策的任务，大都没必要用到Agent。</p>
                </article>
              </div>
            </div>

            <div className={styles.lessonSubsection} id="section-2-2">
              <h3>2.2&nbsp;&nbsp;问答机器人一定要用 Agent 吗?</h3>
              <ul className={styles.lessonQuestionList}>
                <li><CircleHelp aria-hidden="true" size={18} />不一定。场景明确且可以穷尽的简单问答，也可以用 Workflow 实现。</li>
                <li><FileSpreadsheet aria-hidden="true" size={18} />RAG 本身也是一种 Workflow。</li>
                <li><Sparkles aria-hidden="true" size={18} />PS: Workflow 中也可以调用工具，所以调用工具并不是 Agent 的独特之处。</li>
              </ul>
            </div>
          </section>

          <section className={styles.lessonSection} id="section-3" aria-labelledby="section-two-three-title">
            <h2 id="section-two-three-title">3. 练习题</h2>
            <div className={styles.lessonExerciseGrid}>
              {exercises.map(({ title, options, correctIndex, explanations }) => (
                <article className={styles.lessonExerciseCard} key={title}>
                  <h3>{title}</h3>
                  <LessonChoiceQuestion
                    ariaLabel={title}
                    options={options}
                    correctIndex={correctIndex}
                    compact
                    feedback={explanations.map((text, index) => ({
                      label: String.fromCharCode(65 + index),
                      text
                    }))}
                  />
                </article>
              ))}
            </div>
          </section>

    </AgentLessonShell>
  );
}
