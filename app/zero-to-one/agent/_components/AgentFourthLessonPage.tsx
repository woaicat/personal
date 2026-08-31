import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Database,
  FileText,
  MessageCircle,
  ShieldCheck,
  Target,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import styles from "./agent-course.module.css";

const outlineItems = [
  { id: "section-1", number: "1", label: "什么是任务（task）" },
  { id: "section-2", number: "2", label: "什么是 benchmark？" },
  { id: "section-3", number: "3", label: "选择模型的 3 个评估维度" },
  { id: "section-4", number: "4", label: "验证模型在具体任务中的表现" },
  { id: "section-5", number: "5", label: "综合评分" }
];

const taskCards: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: MessageCircle, title: "问答任务", description: "根据用户的问题，判断用户意图，并给出正确的解决方案。" },
  { icon: ShieldCheck, title: "审查任务", description: "审核一份合同，找出其中可能存在的风险条款。" },
  { icon: BarChart3, title: "数据分析任务", description: "读取一份销售数据，输出关键指标并生成图表。" },
  { icon: FileText, title: "信息提取任务", description: "从几十份简历中提取姓名、工作年限、学历、技能等信息。" }
];

const dimensions: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: Target, title: "在当前任务中的表现", description: "能否稳定、准确地完成我们真正要解决的任务。" },
  { icon: Database, title: "token 成本", description: "完成一次任务需要消耗多少 token，成本是否可接受。" },
  { icon: Clock3, title: "延迟（响应速度）", description: "从发起请求到得到结果需要等待多久。" }
];

const evaluationRows = [
  ["客服 Agent", "判断用户意图，并给出合适的解决方案", "读取 100 条真实客服问题，涵盖错别字、重复、简短和隐含意图", "问题回复正确率", "88", "94", "90"],
  ["信息提取 Agent", "从简历中提取结构化信息", "读取 100 份不同模式的简历，提取姓名、年龄、职位、工作年限、学历等字段", "字段提取正确率", "91", "93", "96"],
  ["数据分析 Agent", "分析销售数据并输出关键指标", "读取 50 份销售明细，发现数据趋势并生成图表", "指标识别/准确率", "87", "96", "92"],
  ["编程 Agent", "根据需求生成或修改复用代码", "读取 30 个真实编程组任务，包含算法、调试、流程和单元测试等", "测试通过率", "90", "97", "89"]
];

function StepRail() {
  return (
    <div className={styles.lessonFourStepRail} aria-label="模型验证步骤">
      <div className={styles.lessonFourStep}>
        <span>1</span>
        <strong>整理测试用例</strong>
      </div>
      <ArrowRight className={styles.lessonFourStepArrow} aria-hidden="true" size={20} strokeWidth={1.7} />
      <div className={styles.lessonFourStep}>
        <span>2</span>
        <strong>设计评估指标</strong>
        <small>基于评估指标的设计会在评估维度部分介绍</small>
      </div>
      <ArrowRight className={styles.lessonFourStepArrow} aria-hidden="true" size={20} strokeWidth={1.7} />
      <div className={styles.lessonFourStep}>
        <span>3</span>
        <strong>测试并打分</strong>
      </div>
    </div>
  );
}

export default function AgentFourthLessonPage() {
  return (
    <div className={`${styles.coursePage} ${styles.lessonPage} ${styles.fourthLessonPage}`}>
      <div className={styles.lessonLayout}>
        <main className={styles.lessonMain}>
          <Link className={styles.lessonBackLink} href="/zero-to-one/agent">
            <ArrowLeft aria-hidden="true" size={19} strokeWidth={1.8} />
            返回课程目录
          </Link>

          <header className={styles.lessonHeader}>
            <h1>第 4 课&nbsp;&nbsp;选择合适的模型</h1>
            <p className={styles.lessonSubtitle}>比较不同模型能力、成本与延迟，明确选型思路。</p>
            <p className={styles.lessonMeta}>预计 5 分钟&nbsp;&nbsp;·&nbsp;&nbsp;系列：从 0 到 1 设计一个 Agent</p>
          </header>

          <section className={styles.lessonKeyPoints} aria-labelledby="lesson-four-key-points-title">
            <h2 id="lesson-four-key-points-title">
              <span className={styles.lessonBadge} aria-hidden="true"><CheckCircle2 size={13} strokeWidth={2.4} /></span>
              本课要点
            </h2>
            <ul>
              <li>选择模型不只看公开评分，要结合具体任务验证</li>
              <li>评估模型至少看 3 个维度：任务表现、token 成本、响应速度</li>
              <li>通过测试用例、评估指标、测试打分来验证模型</li>
            </ul>
          </section>

          <div className={styles.lessonFourIntro}>
            <p>这里的模型指通用大语言模型，比如 DeepSeek、GPT、Kimi 等等。如果你还记得第一课提到：模型是智能体的大脑，是驱动智能体行动的引擎。</p>
            <p>选择模型不能只看公开的基准测试和评分，也不能只看大模型公司的宣传，最关键的还是需要在具体任务上进行验证，根据 Agent 将要处理的任务选择合适的模型。</p>
            <p>公开的模型表现评分可以作为参考，但是无法完全代表模型在我们自己的任务中的表现，尤其现实生活中的场景千变万化。</p>
            <p>没有万能的模型，所以需要为我们的任务设计专属的 <strong>“benchmark”</strong>。</p>
          </div>

          <section className={styles.lessonSection} id="section-1" aria-labelledby="lesson-four-section-one-title">
            <h2 id="lesson-four-section-one-title">1. 什么是任务（task）</h2>
            <p>在搭建 AI、Agent 时所需解决的问题会被统一命名为：任务。</p>
            <p>简单来说就是：你要用 AI、Agent 来解决的问题。</p>
            <p>比如：</p>
            <div className={styles.lessonFourTaskGrid}>
              {taskCards.map(({ icon: Icon, title, description }) => (
                <article className={styles.lessonFourTaskCard} key={title}>
                  <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
                  <strong>{title}</strong>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <p className={styles.lessonFourClosing}>这就是最基本的“任务”。</p>
          </section>

          <section className={styles.lessonSection} id="section-2" aria-labelledby="lesson-four-section-two-title">
            <h2 id="lesson-four-section-two-title">2. 什么是 benchmark？</h2>
            <p>没有万能的模型，所以需要为我们的任务设计专属的“benchmark”。</p>
            <p>benchmark 可以理解为一套专门用来“考试”的题目和评分标准。我们自己定义一组任务，测试不同模型的表现，看看谁更适合。</p>
            <p>在公开基准中，下面几个比较常见：</p>
            <ul className={styles.lessonFourBenchmarkList}>
              <li><a href="https://github.com/hendrycks/test" target="_blank" rel="noreferrer">MMLU</a>：覆盖人文、社会科学、STEM 等多学科，测试模型的广泛知识理解与多任务推理能力。</li>
              <li><a href="https://github.com/idavidrein/gpqa" target="_blank" rel="noreferrer">GPQA</a>：面向研究生水平的高难度问答，重点观察模型的知识运用与科学推理能力。</li>
              <li><a href="https://github.com/openai/human-eval" target="_blank" rel="noreferrer">HumanEval</a>：根据自然语言描述生成代码，主要测试代码生成和函数功能正确性。</li>
              <li><a href="https://www.swebench.com/" target="_blank" rel="noreferrer">SWE-bench</a>：基于真实 GitHub issue，测试模型理解代码库、定位问题并完成软件修复的能力。</li>
            </ul>
            <div className={styles.lessonFourBenchmarkNote}>
              <strong>说明：</strong>公开基准就好像高考，考语数英等通用学科，测试模型的底层基础能力。为 Agent 设计定制化的测试基准，就相当于进入具体的工作岗位后，定制化的绩效考核标准。
            </div>
          </section>

          <section className={styles.lessonSection} id="section-3" aria-labelledby="lesson-four-section-three-title">
            <h2 id="lesson-four-section-three-title">3. 选择模型的 3 个评估维度</h2>
            <div className={styles.lessonFourDimensionGrid}>
              {dimensions.map(({ icon: Icon, title }) => (
                <article className={styles.lessonFourDimensionCard} key={title}>
                  <Icon aria-hidden="true" size={28} strokeWidth={1.7} />
                  <strong>{title}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.lessonSection} id="section-4" aria-labelledby="lesson-four-section-four-title">
            <h2 id="lesson-four-section-four-title">4. 验证模型在具体任务中的表现，具体分为 3 步</h2>
            <StepRail />
            <div className={styles.lessonFourTableWrap}>
              <table className={styles.lessonFourTable}>
                <thead>
                  <tr>
                    <th scope="col">Agent</th>
                    <th scope="col">任务描述</th>
                    <th scope="col">测试用例</th>
                    <th scope="col">评估指标</th>
                    <th scope="col">DeepSeek v4<br />flash得分</th>
                    <th scope="col">GPT-5.6-Luna<br />得分</th>
                    <th scope="col">Kimi K3<br />得分</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluationRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${row[0]}-${index}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.lessonFourTableNote}>表格中的模型评分为虚构，请按自身场景设计测试。</p>
          </section>

          <section className={styles.lessonSection} id="section-5" aria-labelledby="lesson-four-section-five-title">
            <h2 id="lesson-four-section-five-title">5. 综合评分</h2>
            <p>除了任务得分，还需要考虑 token 成本和延迟，最后综合评分。可以用以下这个简单的公式进行计算：</p>
            <div className={styles.lessonFourFormula}>
              总分 = 任务表现得分（权重 50%） + token 成本得分（权重 25%） + 响应速度得分（权重 25%）
            </div>
            <p>关于不同维度的评分占比权重不是一成不变的，可以根据产品的侧重、用户的期望、现实条件等因素来进行调整。</p>
          </section>

          <footer className={styles.lessonFooter}>
            <div className={styles.lessonOutputSummary}>
              <FileText aria-hidden="true" size={28} strokeWidth={1.6} />
              <div><h2>本课产出</h2><p>你将学会根据具体任务，从任务表现、成本和延迟等维度选择合适的模型。</p></div>
            </div>
            <Link className={styles.lessonNextButton} href="/zero-to-one/agent/05">
              进入下一课 <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </footer>
        </main>

        <aside className={styles.lessonAside} aria-label="本课大纲">
          <div className={styles.lessonOutline}>
            <h2>本课大纲</h2>
            <nav>
              {outlineItems.map((item) => (
                <a href={`#${item.id}`} key={item.id}>
                  <strong>{item.number}</strong>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className={styles.lessonContinue}>
            <h2><BookOpen aria-hidden="true" size={22} strokeWidth={1.8} /><span>继续学习</span></h2>
            <Link href="/zero-to-one/agent/05">
              <strong>下一课：编写系统提示词</strong>
              <ArrowRight aria-hidden="true" size={19} />
              <span>学习如何为 Agent 设计清晰、可执行的系统提示词，并明确行为边界。</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
