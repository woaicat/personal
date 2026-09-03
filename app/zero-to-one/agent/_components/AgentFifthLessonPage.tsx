import {
  ArrowUpRight,
  Code2,
  FileText,
  Gem,
  LayoutGrid,
  LockKeyhole,
  MessageSquareText,
  PencilLine,
  Target,
  TriangleAlert,
  UserRound,
  type LucideIcon
} from "lucide-react";
import type { AgentLessonPageDetail } from "../_content/lesson-page-details";
import AgentLessonShell from "./AgentLessonShell";
import styles from "./agent-course.module.css";

const articleLinks = [
  { title: "2025年的AI prompt工程：什么仍然有效 & 什么没那么有效", href: "https://www.woshipm.com/ai/6232635.html" },
  { title: "用XML和json撰写生产级提示词", href: "https://www.woshipm.com/ai/6232135.html" },
  { title: "提示词工程基础：概念、流程、框架和技巧（一）", href: "https://www.woshipm.com/ai/6240546.html" },
  { title: "结构化设计：用Markdown、XML和JSON设计生产级提示词（二）", href: "https://www.woshipm.com/ai/6240582.html" },
  { title: "自动化势在必行：利用AI设计更优的提示词（三）", href: "https://www.woshipm.com/ai/6240595.html" },
  { title: "如何进行提示词评测调优和版本管理（四）", href: "https://www.woshipm.com/ai/6240631.html" }
];

const principles: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: UserRound,
    title: "1、站在智能体的角度想问题",
    description: "很多时候是我们自己没把话说清楚，存在歧义。还需要考虑智能体能获取的所有上下文和工具，是否足以支撑它理解并执行我们的指令。这是和人类交流一样的道理，当对方的反应不符合自己的预期时，首先想想是不是自己没说清或者没提供足够的资源支持。"
  },
  {
    icon: PencilLine,
    title: "2、开个好头，逐字逐句地改",
    description: "在第一次写的时候，就认真写。在之后的优化中，提示词的修改常常需要精确到字词、用句。很多时候改一个词，调整文案顺序，都会对最终效果产生影响，所以这是个精细活。"
  },
  {
    icon: MessageSquareText,
    title: "3、反馈大于技巧",
    description: "通过调试、查看反馈、分析现象，再进一步改进提示词。"
  },
  {
    icon: Gem,
    title: "4、惜字如金",
    description: "用尽量少的话把自己想表达的表达清楚。主要还是因为模型的上下文窗口有限，需要最大化利用。"
  }
];

const formulaItems: Array<{ icon: LucideIcon; label: string }> = [
  { icon: UserRound, label: "角色" },
  { icon: FileText, label: "背景" },
  { icon: Target, label: "任务" },
  { icon: LockKeyhole, label: "约束" },
  { icon: Code2, label: "示例" },
  { icon: LayoutGrid, label: "格式" }
];

const boundaryItems: Array<{ title: string; description: string }> = [
  {
    title: "想通过提示词优化提升的能力，已经超出了模型的基本能力时。",
    description: "提示词优化的只能是模型的输出，除此之外它也做不了什么。比如我们想要限制模型调用工具失败时的重试次数，在提示词里说是没用的，必须通过硬编码来实现。又比如我们希望智能体总是获取最新的日期，在提示词里说也没用，需要把真正的日期注入到上下文中。"
  },
  {
    title: "投入产出不成正比时。",
    description: "继续优化或许会有提升，但是对最终目标的影响微乎其微。"
  },
  {
    title: "有其他更好的解决方案时。",
    description: "凡是希望智能体必须遵循的，硬编码好过提示词（后面几节课中会提到很多成本约束、安全护栏，提示词都可以作为其中优化的一环，但不能作为智能体运行的兜底措施）。"
  }
];

export default function AgentFifthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return (
    <AgentLessonShell detail={detail}>
      <div className={styles.lessonFiveIntro}>
        <p>在编写智能体的系统提示词时：</p>
        <ul>
          <li>一种论调是，模型能力越来越强，提示词完全不重要了。</li>
          <li>一种论调是，写好提示词就万事大吉，有问题就改提示词。</li>
        </ul>
        <p>我们还是要在这两者之间找到一种平衡。提示词承担了非常多的作用，是智能体的灵魂所在。</p>
        <p>它没有我们想象的那么不重要，也没有我们想象的那么重要。</p>
      </div>

      <section className={styles.lessonSection} id="section-1" aria-labelledby="lesson-five-section-one-title">
        <h2 id="lesson-five-section-one-title">1. 提示词教程</h2>
        <p>关于提示词工程，我写了很多教程，提示词具体怎么写、测、改。</p>
        <p>欢迎大家阅读以下文章：</p>
        <div className={styles.lessonFiveArticleList}>
          {articleLinks.map((article) => (
            <a className={styles.lessonFiveArticleLink} href={article.href} key={article.href} rel="noreferrer" target="_blank">
              <FileText className={styles.lessonFiveArticleIcon} aria-hidden="true" size={19} strokeWidth={1.8} />
              <span>{article.title}</span>
              <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} />
            </a>
          ))}
        </div>
        <p className={styles.lessonFiveAfterLinks}>在本课我只对自己觉得最重要的内容进行解释：</p>
      </section>

      <section className={styles.lessonSection} id="section-2" aria-labelledby="lesson-five-section-two-title">
        <h2 id="lesson-five-section-two-title">2. 核心原则：</h2>
        <div className={styles.lessonFivePrincipleList}>
          {principles.map(({ icon: Icon, title, description }) => (
            <article className={styles.lessonFivePrincipleCard} key={title}>
              <div className={styles.lessonFivePrincipleIcon}><Icon aria-hidden="true" size={28} strokeWidth={1.7} /></div>
              <div className={styles.lessonFivePrincipleCopy}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.lessonSection} id="section-3" aria-labelledby="lesson-five-section-three-title">
        <h2 id="lesson-five-section-three-title">3. 万能公式：</h2>
        <div className={styles.lessonFiveFormula} aria-label="角色加背景加任务加约束加示例加格式">
          {formulaItems.map(({ icon: Icon, label }, index) => (
            <div className={styles.lessonFiveFormulaItem} key={label}>
              <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
              <strong>{label}</strong>
              {index < formulaItems.length - 1 ? <span className={styles.lessonFiveFormulaSymbol} aria-hidden="true">+</span> : null}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.lessonSection} id="section-4" aria-labelledby="lesson-five-section-four-title">
        <h2 id="lesson-five-section-four-title">4. 什么时候不该继续优化提示词</h2>
        <div className={styles.lessonFiveBoundaryList}>
          {boundaryItems.map(({ title, description }) => (
            <article className={styles.lessonFiveBoundaryCard} key={title}>
              <TriangleAlert aria-hidden="true" size={27} strokeWidth={1.7} />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.lessonSection} id="section-5" aria-labelledby="lesson-five-section-five-title">
        <h2 id="lesson-five-section-five-title">5. 练习题</h2>
        <div className={styles.lessonFiveExercise}>
          <strong>尝试为 B 端销售助手 Agent 编写系统提示词</strong>
        </div>
      </section>
    </AgentLessonShell>
  );
}
