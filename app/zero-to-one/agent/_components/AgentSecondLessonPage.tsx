import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Heart,
  ListChecks,
  MessageCircle,
  RefreshCw,
  Search,
  Sparkles,
  Table2,
  Target,
  Users,
  X,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import styles from "./agent-course.module.css";

const outlineItems = [
  { id: "section-1", number: "1", label: "判断问题是否值得解决" },
  { id: "section-2", number: "2", label: "判断是否适合用 Agent 做" },
  { id: "section-2-1", number: "2.1", label: "Workflow 与 Agent 的区别", nested: true },
  { id: "section-2-2", number: "2.2", label: "问答机器人一定要用 Agent 吗?", nested: true },
  { id: "section-3", number: "3", label: "练习题" }
];

const valueCards: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: BarChart3, title: "业务价值", description: "规模 / 影响 / 增效，可量化收益" },
  { icon: Users, title: "影响范围", description: "受众多少，多少人会因此受益" },
  { icon: Heart, title: "被服务程度", description: "现有方案是否成熟，是否仍有明显痛点" },
  { icon: AlertTriangle, title: "不解决的损失", description: "不做会影响的关键流程，损失有多大" }
];

const choiceOptions = [
  "投研团队每天手工整理基金资料，耗时 2 天，影响 60+ 人",
  "3 位同事想把会议宣讲材料换得更统一",
  "合规审核结果需要多人重复核对，出错会影响材料上线"
];

const choiceFeedback: Array<{ icon: LucideIcon; tone: string; label: string; text: string }> = [
  { icon: CheckCircle2, tone: "lessonFeedbackPositive", label: "A", text: "有价值，能显著提升效率，但优先级次于关键流程问题。" },
  { icon: X, tone: "lessonFeedbackNegative", label: "B", text: "不值得优先解决，受众少、业务价值低、不解决几乎无损失。" },
  { icon: Sparkles, tone: "lessonFeedbackBest", label: "C", text: "最值得优先解决，影响核心流程，错误成本高，不解决损失明显。" }
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
    answer: "A",
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
    answer: "B",
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

export default function AgentSecondLessonPage() {
  return (
    <div className={`${styles.coursePage} ${styles.lessonPage} ${styles.secondLessonPage}`}>
      <div className={styles.lessonLayout}>
        <main className={styles.lessonMain}>
          <Link className={styles.lessonBackLink} href="/zero-to-one/agent">
            <ArrowLeft aria-hidden="true" size={19} strokeWidth={1.8} />
            返回课程目录
          </Link>

          <header className={styles.lessonHeader}>
            <h1>第 2 课&nbsp;&nbsp;价值判断</h1>
            <p className={styles.lessonSubtitle}>在动手设计 Agent 前，先判断问题是否值得解决，以及是否真的适合用 Agent。</p>
            <p className={styles.lessonMeta}>预计 6 分钟&nbsp;&nbsp;·&nbsp;&nbsp;系列：从 0 到 1 设计一个 Agent</p>
          </header>

          <section className={styles.lessonKeyPoints} aria-labelledby="lesson-two-key-points-title">
            <h2 id="lesson-two-key-points-title">
              <span className={styles.lessonBadge} aria-hidden="true"><Sparkles size={13} strokeWidth={2.4} /></span>
              本课要点
            </h2>
            <ul>
              <li>先判断问题都不值得解决：业务价值、影响范围、被服务程度、不解决的损失</li>
              <li>再判断是否适合用 Agent 做：看流程、规则分支、结果开放度</li>
              <li>能用简单办法解决的，尽量不要增加复杂度</li>
            </ul>
          </section>

          <section className={styles.lessonSection} id="section-1" aria-labelledby="section-two-one-title">
            <h2 id="section-two-one-title">1. 判断问题是否值得解决?</h2>
            <p className={styles.lessonSectionLead}>不是所有问题都值得投入资源。先判断问题本身的价值。</p>
            <div className={styles.lessonSplit}>
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
                <h3>B. 选择示例（金融公司）</h3>
                <p className={styles.lessonPrompt}>以下哪个问题最值得优先解决?</p>
                <div className={styles.lessonChoiceList}>
                  {choiceOptions.map((option, index) => (
                    <div className={styles.lessonChoiceOption} key={option}>
                      <strong>{String.fromCharCode(65 + index)}.</strong>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.lessonChoiceFeedback}>
                  {choiceFeedback.map(({ icon: Icon, tone, label, text }) => (
                    <p className={styles[tone]} key={label}>
                      <Icon aria-hidden="true" size={16} strokeWidth={1.9} />
                      <strong>{label}：</strong>{text}
                    </p>
                  ))}
                </div>
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
                  <h4>Workflow</h4>
                  <ul>
                    <li>按照规则，批量识别并提取信息</li>
                    <li>按照要求，生成固定格式的报告</li>
                  </ul>
                  <LessonSystemFlow steps={workflowSteps} />
                  <p>Workflow 也可以很复杂，每条主路径体现在流程编排，但每一步依照预先定义、可控执行。</p>
                </article>
                <article className={styles.lessonSystemPanel}>
                  <h4>Agent</h4>
                  <ul>
                    <li>需要根据文档、多轮询问收集信息，创建文档并动态总结</li>
                    <li>生成调研报告、制定计划，以及根据意见、判断提交修改</li>
                  </ul>
                  <LessonSystemFlow steps={agentSteps} />
                  <div className={styles.lessonSystemLoop}><RefreshCw aria-hidden="true" size={15} />反思 / 调整</div>
                  <p>灵活性、反思性、能自主决策，是 Agent 核心价值的体现。</p>
                </article>
              </div>
            </div>

            <div className={styles.lessonSubsection} id="section-2-2">
              <h3>2.2&nbsp;&nbsp;问答机器人一定要用 Agent 吗?</h3>
              <ul className={styles.lessonQuestionList}>
                <li><MessageCircle aria-hidden="true" size={18} />做一个问答机器人，一定要用 Agent 才实现吗?</li>
                <li><CircleHelp aria-hidden="true" size={18} />不一定。场景明确且可以穷尽的简单问答，也可以用 Workflow 实现。</li>
                <li><FileSpreadsheet aria-hidden="true" size={18} />RAG 本身也是一种 Workflow。</li>
                <li><Sparkles aria-hidden="true" size={18} />PS: Workflow 中也可以调用工具，所以调用工具并不是 Agent 的独特之处。</li>
              </ul>
            </div>
          </section>

          <section className={styles.lessonSection} id="section-3" aria-labelledby="section-two-three-title">
            <h2 id="section-two-three-title">3. 练习题</h2>
            <div className={styles.lessonExerciseGrid}>
              {exercises.map(({ title, options, answer, explanations }) => (
                <article className={styles.lessonExerciseCard} key={title}>
                  <h3>{title}</h3>
                  <ol className={styles.lessonExerciseOptions}>
                    {options.map((option, index) => <li key={option}><strong>{String.fromCharCode(65 + index)}.</strong>{option}</li>)}
                  </ol>
                  <div className={styles.lessonAnswer}>
                    <strong>答案：{answer}</strong>
                    {explanations.map((explanation, index) => <p key={explanation}><span>{String.fromCharCode(65 + index)}：</span>{explanation}</p>)}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className={styles.lessonFooter}>
            <div className={styles.lessonOutputSummary}>
              <FileText aria-hidden="true" size={28} strokeWidth={1.6} />
              <div><h2>本课产出</h2><p>你将学会在开始设计前，先判断问题是否值得解决，以及是否真的适合用 Agent 来做。</p></div>
            </div>
            <Link className={styles.lessonNextButton} href="/zero-to-one/agent/03">
              进入下一课 <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </footer>
        </main>

        <aside className={styles.lessonAside} aria-label="本课大纲">
          <div className={styles.lessonOutline}>
            <h2>本课大纲</h2>
            <nav>
              {outlineItems.map((item) => (
                <a className={item.nested ? styles.lessonOutlineNested : undefined} href={`#${item.id}`} key={item.id}>
                  {item.nested ? <span>{item.number}</span> : <strong>{item.number}</strong>}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className={styles.lessonContinue}>
            <h2><BookOpen aria-hidden="true" size={22} strokeWidth={1.8} /><span>继续学习</span></h2>
            <Link href="/zero-to-one/agent/03">
              <strong>下一课：调研用户、业务和生态</strong>
              <ArrowRight aria-hidden="true" size={19} />
              <span>继续学习如何从用户目标、业务流程与上下游生态出发，完成需求梳理。</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
