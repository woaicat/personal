import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Code2,
  Crosshair,
  Eye,
  Github,
  Layers3,
  Play,
  RefreshCw,
  Star,
  Wrench,
  type LucideIcon
} from "lucide-react";
import type { AgentLesson } from "../_content/curriculum";
import { agentLessonPageDetails } from "../_content/lesson-page-details";
import AgentSecondLessonPage from "./AgentSecondLessonPage";
import AgentFourthLessonPage from "./AgentFourthLessonPage";
import AgentLessonShell from "./AgentLessonShell";
import styles from "./agent-course.module.css";

const toolNames = ["Codex", "Claude Code", "Workbuddy", "豆包工作"];

const spectrumItems = ["确定性代码", "单次模型调用", "含模型节点的工作流", "垂直领域智能体", "通用智能体", "人类专家"];

const flowItems: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Crosshair, label: "决策 / 计划" },
  { icon: Play, label: "行动" },
  { icon: Eye, label: "观察结果" },
  { icon: RefreshCw, label: "反思 / 调整" }
];

const comparisonRows = [
  ["路径", "预先定义", "动态决定"],
  ["适合任务", "固定流程", "不确定任务"],
  ["是否需要判断", "较少", "较多"],
  ["典型例子", "按照规则批量审核材料", "客服问题处理"]
];

const checklistItems = [
  "任务目标明确，但处理路径不完全固定",
  "需要根据上下文做判断或决策",
  "需要调用外部工具或具备执行能力",
  "结果需要根据反馈持续调整"
];

const trendItems: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: Wrench, title: "工程化走向成熟", description: "从能跑到可控、可观测与稳定交付。" },
  { icon: Github, title: "开源harness", description: "降低使用门槛，推动生态快速迭代。" },
  { icon: Layers3, title: "各类现成的框架供人选择", description: "从通用能力到专业场景，加速落地。" },
  { icon: Star, title: "未来价值不只是在技术上更先进", description: "而是能解决问题、可规模化、可持续。" }
];

interface AgentLessonPageProps {
  lesson: AgentLesson;
}

export default function AgentLessonPage({ lesson }: AgentLessonPageProps) {
  const detail = agentLessonPageDetails[lesson.id];

  if (!detail) {
    return <main className={styles.coursePage} aria-label="课程详情页" />;
  }

  if (lesson.id === "02") {
    return <AgentSecondLessonPage detail={detail} />;
  }

  if (lesson.id === "04") {
    return <AgentFourthLessonPage detail={detail} />;
  }

  if (lesson.id !== "01") {
    return <main className={styles.coursePage} aria-label="课程详情页" />;
  }

  return (
    <AgentLessonShell detail={detail}>
          <section className={styles.lessonSection} id="section-1" aria-labelledby="section-1-title">
            <h2 id="section-1-title">1. 什么是 Agent?</h2>
            <div className={styles.lessonSplit}>
              <div className={styles.lessonSplitColumn}>
                <h3>A. 模型 ≠ Agent</h3>
                <p className={styles.lessonLabel}>Agent 产品典型代表</p>
                <div className={styles.lessonPills}>
                  {toolNames.map((name) => <span key={name}>{name}</span>)}
                </div>
                <p>不如自己动手，体验这些智能体是如何工作的。</p>
              </div>
              <div className={styles.lessonSplitColumn}>
                <h3>B. 概念解释</h3>
                <p>模型就好比人的大脑，harness 就是人的身体躯干。</p>
                <p>只有大脑，就只能思考；只有身体躯干，也无法产生行动的意义。只有大脑 + 身体，才能在现实世界中行动。</p>
                <div className={styles.lessonEquation} aria-label="模型加 harness 组成 Agent">
                  <div className={styles.lessonEquationCard}>
                    <Brain aria-hidden="true" size={25} strokeWidth={1.7} />
                    <strong>模型</strong>
                    <span>AI，如 DeepSeek、GPT</span>
                  </div>
                  <span className={styles.lessonEquationSymbol} aria-hidden="true">+</span>
                  <div className={styles.lessonEquationCard}>
                    <Code2 aria-hidden="true" size={25} strokeWidth={1.7} />
                    <strong>harness</strong>
                    <span>调度模型运行的代码、逻辑、规则</span>
                  </div>
                  <span className={styles.lessonEquationSymbol} aria-hidden="true">=</span>
                  <div className={`${styles.lessonEquationCard} ${styles.lessonEquationResult}`}>
                    <Bot aria-hidden="true" size={25} strokeWidth={1.7} />
                    <strong>Agent</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.lessonSection} id="section-2" aria-labelledby="section-2-title">
            <h2 id="section-2-title">2. Agent 的核心能力</h2>
            <p>Agent 能够做出一定的决策计划、行动、观察行动结果并反思，再进行下一步行动。</p>
            <div className={styles.lessonFlow} aria-label="Agent 的决策、行动、观察和反思循环">
              {flowItems.map(({ icon: Icon, label }, index) => (
                <div className={styles.lessonFlowStep} key={label}>
                  <div className={styles.lessonFlowCard}><Icon aria-hidden="true" size={24} strokeWidth={1.7} /><strong>{label}</strong></div>
                  {index < flowItems.length - 1 ? <ArrowRight className={styles.lessonFlowArrow} aria-hidden="true" size={20} strokeWidth={1.7} /> : null}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.lessonSection} id="section-3" aria-labelledby="section-3-title">
            <h2 id="section-3-title">3. Agent 和其他系统的区别</h2>

            <div className={styles.lessonSubsection} id="section-3-1">
              <h3>3.1&nbsp;&nbsp;灵活性光谱</h3>
              <ol className={styles.lessonSpectrum}>
                {spectrumItems.map((item) => <li key={item}>{item}</li>)}
              </ol>
              <p>从左往右，自动化和自主性逐步增强。行为灵活性逐渐提升，但灵活性不代表在每项任务上的表现。我们仍要为具体任务选择最合适的解决方案。</p>
            </div>

            <div className={styles.lessonSubsection} id="section-3-2">
              <h3>3.2&nbsp;&nbsp;Agent 和 Workflow 的区别</h3>
              <div className={styles.lessonComparison}>
                <table>
                  <thead>
                    <tr><th scope="col">&nbsp;</th><th scope="col">Workflow</th><th scope="col">Agent</th></tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map(([label, workflow, agent]) => (
                      <tr key={label}><th scope="row">{label}</th><td>{workflow}</td><td>{agent}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p><strong>Workflow</strong> 依赖预设路径，按规则执行。<br /><strong>Agent</strong> 能根据需要动态组织、动态选择下一步，更灵活，适合处理变化多、未知多的任务。</p>
              </div>
            </div>

            <div className={styles.lessonSubsection} id="section-3-3">
              <h3>3.3&nbsp;&nbsp;什么时候需要 Agent</h3>
              <ul className={styles.lessonChecklist}>
                {checklistItems.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" size={16} />{item}</li>)}
              </ul>
            </div>
          </section>

          <section className={styles.lessonSection} id="section-4" aria-labelledby="section-4-title">
            <h2 id="section-4-title">4. Agent 为何备受关注?</h2>
            <p>所有人类可以在电脑上完成的工作，Agent都可以代劳。不管是创建文件、核对表格、在线答疑还是编写代码。<br />从会计到律师、从开发到客服，所有面对电脑开展日常工作的人，都可以将部分工作委托给智能体。</p>
            <div className={styles.lessonRolePills}>
              {['设计', '培训', '开发', '产品', '运营', '客服'].map((role) => <span key={role}>{role}</span>)}
            </div>
          </section>

          <section className={styles.lessonSection} id="section-5" aria-labelledby="section-5-title">
            <h2 id="section-5-title">5. Agent 的发展趋势</h2>
            <div className={styles.lessonTrendGrid}>
              {trendItems.map(({ icon: Icon, title, description }) => (
                <article key={title} className={styles.lessonTrendCard}>
                  <Icon className={styles.lessonTrendIcon} aria-hidden="true" size={31} strokeWidth={1.7} />
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </section>

    </AgentLessonShell>
  );
}
