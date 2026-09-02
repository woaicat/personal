import {
  ArrowRight,
  ClipboardList,
  Info,
  Search,
  Send,
  Wrench,
  type LucideIcon
} from "lucide-react";
import type { AgentLessonPageDetail } from "../_content/lesson-page-details";
import AgentLessonShell from "./AgentLessonShell";
import styles from "./agent-course.module.css";

const processSteps = [
  "获得销售线索",
  "了解客户",
  "首次接触",
  "了解客户需求",
  "建立商机",
  "持续推进商机",
  "方案 / 报价",
  "商务谈判",
  "成交或失败",
  "维护客户和商机信息"
];

const processRows = [
  ["销售", "获得新线索", "查询客户背景", "CRM、官网、企业信息平台", "客户初步画像"],
  ["销售", "完成客户会议", "整理沟通结果", "会议记录、个人笔记", "商机信息"],
  ["销售", "到达跟进时间", "判断下一步动作", "CRM、邮件、历史沟通", "跟进计划"]
];

const researchSteps = ["原因、目标和现状", "用户与痛点", "业务流程", "用户任务", "数据", "信息和工具"];

const userSteps: Array<{ number: string; title: string; body: string }> = [
  {
    number: "1",
    title: "列举所有潜在用户",
    body: "先把与这项业务相关的用户角色尽可能列完整，重点考虑：谁直接执行这项工作、谁负责管理这项工作、谁提供上游输入、谁使用下游结果、谁会频繁受到这个问题影响。"
  },
  {
    number: "2",
    title: "分析不同用户的痛点",
    body: "分别了解每一类用户主要负责什么工作、在当前业务中承担什么责任、哪些任务最耗时间、最容易出错、最依赖经验、哪些操作最重复、当前有什么替代方案、对现状最不满意的地方是什么。例如：“每次开始处理任务前，需要在三个系统之间来回查找资料，平均耗时 20 分钟。”"
  },
  {
    number: "3",
    title: "进行用户优先级排序",
    body: "第一版 Agent 一般不应该同时解决所有用户的问题，需要选择最重要的用户作为主要服务对象。可以从这几个维度排序："
  }
];

const userPriorityRows = [
  ["用户数量 / 占比", "这类用户有多少？"],
  ["工作价值", "他们的工作对业务结果有多重要？"],
  ["使用频率", "他们使用 Agent 的频率会有多高？"]
];

const userPainRows = [
  ["一线销售", "高", "每天", "高", "信息分散、客户多、商机推进判断复杂"],
  ["销售主管", "中", "每天 / 每周", "高", "很难及时掌握所有商机情况"],
  ["销售运营", "少", "每周", "中", "CRM 数据维护和统计成本高"]
];

const taskTypes: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: Search, title: "信息获取", description: "用户需要寻找、阅读、整理什么信息？" },
  { icon: ClipboardList, title: "分析和判断", description: "用户需要根据什么做判断？哪些地方依赖经验？" },
  { icon: Send, title: "执行", description: "完成判断以后还需要进行哪些实际操作？例如写内容、修改系统、发邮件、创建任务、更新数据。" }
];

const salesTasks = [
  "查看有哪些客户需要跟进",
  "选择客户",
  "查看客户基本信息",
  "查看当前商机阶段",
  "回顾历史沟通",
  "判断客户目前的真实状态",
  "判断最大的成交阻碍",
  "决定下一步应该采取什么动作",
  "查找合适的产品资料或案例",
  "编写跟进内容",
  "联系客户",
  "记录沟通结果",
  "更新 CRM",
  "设置下一次跟进计划"
];

const dataRows = [
  ["输入数据", "Agent 开始执行任务前需要拿到什么数据？例如用户输入、业务系统数据、文档、历史记录、图片、外部数据。"],
  ["输出数据", "任务完成以后需要产生什么结果？例如自然语言文本、分类结果、判断结果、结构化字段、修改后的文件、更新后的业务数据。"],
  ["数据来源", "数据当前存在哪里？例如数据库、CRM、企业微信、邮箱、知识库、Excel、本地文档、外部网站。"],
  ["数据质量和可用性", "还要调查：数据是否完整、准确，更新是否及时，是否结构化，是否存在大量缺失，是否能够获取，是否存在权限限制，是否有隐私或合规要求。"]
];

const salesDataRows = [
  ["客户基本信息", "CRM", "了解客户背景"],
  ["联系人信息", "CRM", "了解沟通对象"],
  ["商机阶段", "CRM", "判断当前进度"],
  ["历史跟进记录", "CRM", "理解商机推进过程"],
  ["邮件记录", "企业邮箱", "获取沟通上下文"],
  ["企业微信记录", "企业微信", "获取沟通信息"],
  ["会议纪要", "会议系统", "了解客户需求"],
  ["产品资料", "企业知识库", "推荐产品和材料"],
  ["客户公开信息", "官网等", "补充客户背景"]
];

function ThirdLessonTable({
  headers,
  rows,
  className
}: {
  headers: string[];
  rows: string[][];
  className?: string;
}) {
  return (
    <div className={styles.lessonThirdTableWrap}>
      <table className={`${styles.lessonThirdTable} ${className ?? ""}`}>
        <thead>
          <tr>{headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => cellIndex === 0
                ? <th scope="row" key={`${row[0]}-${cellIndex}`}>{cell}</th>
                : <td key={`${row[0]}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ThirdLessonCaseTitle() {
  return (
    <h3 className={styles.lessonThirdCaseTitle}>
      <ClipboardList aria-hidden="true" size={18} strokeWidth={1.8} />
      <span>案例分析：B 端销售助手</span>
    </h3>
  );
}

function ThirdLessonFlow({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <div className={`${styles.lessonThirdFlow} ${className ?? ""}`}>
      {steps.map((step, index) => (
        <span className={styles.lessonThirdFlowItem} key={step}>
          {step}
          {index < steps.length - 1 ? <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} /> : null}
        </span>
      ))}
    </div>
  );
}

function ThirdLessonResearchFlow() {
  return (
    <div className={styles.lessonThirdResearchFlow} aria-label="需求调研六个步骤">
      {researchSteps.map((step, index) => (
        <div className={styles.lessonThirdResearchStep} key={step}>
          <span className={styles.lessonThirdResearchStepNumber}>{index + 1}</span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

export default function AgentThirdLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return (
    <AgentLessonShell detail={detail}>
      <div className={styles.lessonThirdIntro}>
        <p>上一课我们已经判断了问题值得解决，并决定使用 Agent。这一课默认方案方向已经确定，接下来要回答的是：</p>
        <p><strong>为了设计这个 Agent，我们需要把业务调研清楚到什么程度？</strong></p>
        <p>需求调研可以分成以下六个步骤：原因、目标和现状；用户与痛点；业务流程；用户任务；数据；信息和工具。</p>
        <ThirdLessonResearchFlow />
      </div>

      <section className={styles.lessonSection} id="section-1" aria-labelledby="lesson-third-section-one-title">
        <h2 id="lesson-third-section-one-title">1、原因、目标和现状</h2>
        <p>第一步先不要急着讨论 Agent 应该有什么功能，而是要先了解为什么要做这件事、当前是怎么解决的，以及最终希望达到什么结果。这一阶段包括三个部分。</p>

        <h3 className={styles.lessonThirdSubheading}>了解原因</h3>
        <p>首先弄清楚当前遇到了什么问题、为什么现在想解决。<br />常见的原因包括：人工成本过高、处理效率太低、错误率较高、业务量增长后人力无法继续扩张、工作高度依赖个人经验、现有系统体验不好，或者原来没有合适的技术方案而现在 Agent 提供了新的可能。</p>
        <p>调研中要避免只记下“业务方希望做一个 Agent”就止步，而要继续向下追问：<strong>真正想解决的业务问题是什么？</strong></p>

        <h3 className={styles.lessonThirdSubheading}>了解业务现状</h3>
        <p>接下来了解这个问题现在是怎么解决的，通常有两种情况。一种是已经存在解决方案，但解决得不够好——可能依赖人工、Excel、传统业务系统、RPA、规则引擎或普通 AI 功能，只是当前方案在效率、成本、准确性或体验上存在问题。另一种是当前基本没有成熟方案，只能靠人工经验或比较临时的方法完成。</p>
        <p>这里的重点是：<strong>理解 Agent 将来要进入一个怎样的现有环境，而不是假设业务从零开始。</strong></p>

        <h3 className={styles.lessonThirdSubheading}>了解期望和目标</h3>
        <p>还需要了解业务方希望 Agent 直接承担哪些工作、上线以后产生什么变化。<br />目标最好不要停留在“提升效率”这种表述，而要尽量转成明确、可量化的业务价值，例如：单次任务处理时间降低 50%、人工投入减少 30%、错误率从 10% 降到 3%、重点任务及时处理率达到 90%、用户完成任务的平均步骤减少 40%。</p>
        <p>量化目标之所以重要，是因为后续无论产品设计还是效果评估，都要不断回到这些目标。</p>

        <article className={styles.lessonThirdCase}>
          <ThirdLessonCaseTitle />
          <p>假设一家saas企业提出：希望做一个 B 端销售助手 Agent，提升销售业务效率。这时先不判断 Agent 最终服务谁，而是从整个销售业务出发了解问题。</p>
          <p>调研发现，当前销售业务中存在这些问题：客户和商机信息分散在多个系统；大量时间花在信息查询和整理上；商机推进过程中有很多重复操作；很多判断高度依赖个人经验；客户和商机数量增长后，人工管理压力越来越大。</p>
          <p>企业已经有 CRM、企业邮箱、企业微信、会议系统、知识库等工具，所以这并不是&quot;完全没有系统解决&quot;的问题。真正的问题是：<strong>系统负责记录信息，但信息之间比较分散，很多分析、判断和执行仍然需要业务人员自己完成。</strong></p>
          <p>业务方希望 Agent 上线后减少信息查询和整理时间、提高重点商机及时处理率、减少重复性人工操作。这些期望可以进一步转化成量化目标：商机相关信息整理时间降低 50%、重点商机遗漏率降低 30%、重复录入时间降低 50%。</p>
        </article>
      </section>

      <section className={styles.lessonSection} id="section-2" aria-labelledby="lesson-third-section-two-title">
        <h2 id="lesson-third-section-two-title">2、用户、痛点</h2>
        <p>明确业务问题以后，下一步需要回答：<strong>这个 Agent 应该优先为谁解决问题？</strong></p>

        <div className={styles.lessonThirdStepList}>
          {userSteps.map((step) => (
            <article className={styles.lessonThirdStep} key={step.number}>
              <span className={styles.lessonThirdStepNumber}>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>

        <ThirdLessonTable
          headers={["维度", "判断问题"]}
          rows={userPriorityRows}
          className={styles.lessonThirdCompactTable}
        />
        <p className={styles.lessonThirdPrioritySummary}>最终选择<strong>用户数量较大、使用频率高、工作价值高</strong>的群体作为第一阶段核心用户。其他用户的需求并不是不重要，而是可以先记录下来，后续逐步扩展。</p>

        <article className={styles.lessonThirdCase}>
          <ThirdLessonCaseTitle />
          <p>销售业务可能涉及一线销售、SDR、销售主管、销售运营、售前和管理层。分别调研后发现：</p>
          <ThirdLessonTable
            headers={["用户", "数量", "使用频率", "工作价值", "主要痛点"]}
            rows={userPainRows}
          />
          <p>综合用户数量、使用频率和工作价值，第一阶段优先选择一线销售。针对一线销售进一步梳理，核心痛点是：客户信息分散，需要频繁查找和整理；同时管理大量客户，不容易判断谁需要优先跟进；商机推进中很多判断依赖经验；历史沟通容易遗漏；存在大量重复记录和信息维护工作。后续 Agent 的设计重点就应该围绕这些问题展开。</p>
        </article>
      </section>

      <section className={styles.lessonSection} id="section-3" aria-labelledby="lesson-third-section-three-title">
        <h2 id="lesson-third-section-three-title">3、业务流程</h2>
        <p>确定核心用户和痛点以后，需要继续理解：<strong>用户所处的完整业务流程是什么？</strong></p>
        <p>这里不要只研究准备交给 Agent 的那一个局部任务，而应该先把 Agent 介入之前业务原本如何运转梳理出来。一个比较简单的梳理方式是：</p>
        <ThirdLessonFlow
          steps={["什么人", "在什么时间 / 什么条件下", "出于什么原因", "做了什么操作", "使用了哪些资源", "得到了什么结果"]}
          className={styles.lessonThirdQuestionFlow}
        />
        <p>通过这个方式可以把每个业务节点描述清楚。业务流程调研主要搞清楚：业务从哪里开始、中间经过哪些阶段、有哪些角色参与、上一步的结果如何进入下一步、每一步使用哪些系统和资源、哪些情况下流程会发生分支、哪些地方需要人与人协作。</p>
        <p>这一阶段的目标是<strong>理解 Agent 将来要进入的是怎样一条真实业务链路</strong>——先理解业务，再设计 Agent。</p>

        <article className={styles.lessonThirdCase}>
          <ThirdLessonCaseTitle />
          <p>围绕核心用户“一线销售”，可以梳理出销售业务流程：</p>
          <ThirdLessonFlow steps={processSteps} className={styles.lessonThirdProcessFlow} />
          <ThirdLessonTable
            headers={["角色", "触发条件", "操作", "使用资源", "结果"]}
            rows={processRows}
          />
          <p>通过流程梳理可以看到，销售助手 Agent 要进入的并不是一个孤立动作，而是一条完整的商机推进流程。</p>
        </article>
      </section>

      <section className={styles.lessonSection} id="section-4" aria-labelledby="lesson-third-section-four-title">
        <h2 id="lesson-third-section-four-title">4、用户任务</h2>
        <p>业务流程描述的是比较宏观的业务阶段，接下来要继续往下拆：<strong>核心用户为了完成这些业务环节，具体需要完成哪些任务？</strong></p>
        <p>例如“处理客户投诉”是一个业务环节，但落到用户实际工作里，可能包括查订单、看聊天记录、判断责任、查询规则、给出方案、回复用户、更新系统这一连串任务。只有拆到任务层，才能真正开始设计 Agent。</p>

        <h3 className={styles.lessonThirdSubheading}>任务调研需要了解什么</h3>
        <ThirdLessonFlow steps={["输入", "处理 / 判断", "行动", "输出"]} className={styles.lessonThirdTaskFlow} />
        <p>针对每一个任务，可以继续调查：什么情况下触发这个任务、用户希望完成什么、任务的输入是什么、用户需要经过哪些步骤、中间需要做哪些判断、需要执行哪些操作、什么结果代表任务完成。</p>

        <h3 className={styles.lessonThirdSubheading}>特别关注三类任务</h3>
        <div className={styles.lessonThirdTypeList}>
          {taskTypes.map(({ icon: Icon, title, description }) => (
            <article className={styles.lessonThirdTypeCard} key={title}>
              <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <article className={styles.lessonThirdCase}>
          <ThirdLessonCaseTitle />
          <p>以业务流程中的“持续推进商机”为例，销售可能需要完成这些任务：</p>
          <div className={styles.lessonThirdTaskGrid}>
            {salesTasks.map((task, index) => (
              <div className={styles.lessonThirdTaskItem} key={task}>
                <span>{index + 1}</span>
                <p>{task}</p>
              </div>
            ))}
          </div>
          <p>这些任务还可以继续分类。<strong>信息获取</strong>类包括查询客户资料、查看历史沟通、搜索产品资料；<strong>分析判断</strong>类包括判断客户当前状态、判断商机风险、判断下一步行动；<strong>执行</strong>类包括生成跟进邮件、创建会议、更新 CRM。到这里，Agent 未来可能承担哪些具体任务就比较清楚了。</p>
        </article>
      </section>

      <section className={styles.lessonSection} id="section-5" aria-labelledby="lesson-third-section-five-title">
        <h2 id="lesson-third-section-five-title">5、数据</h2>
        <p>知道用户具体需要完成哪些任务以后，就可以开始调研：<strong>完成这些任务需要哪些数据？</strong>数据调研至少要覆盖四件事。</p>
        <div className={styles.lessonThirdDataList}>
          {dataRows.map(([title, description], index) => (
            <article className={styles.lessonThirdDataRow} key={title}>
              <span className={styles.lessonThirdStepNumber}>{String(index + 1)}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p className={styles.lessonThirdTip}><Info aria-hidden="true" size={18} strokeWidth={1.8} /><strong>非常重要的一点是：</strong>企业拥有数据，不代表 Agent 就一定可以使用这些数据。数据质量和可获得性都会直接影响 Agent 最终能够做到什么。</p>

        <h3 className={styles.lessonThirdSubheading}>B 端销售助手案例</h3>
        <ThirdLessonTable
          headers={["数据", "来源", "用途"]}
          rows={salesDataRows}
          className={styles.lessonThirdSalesDataTable}
        />
        <p>进一步检查数据质量时可能发现：CRM 商机阶段更新不及时；部分关键沟通只存在于企业微信；会议纪要格式不统一；一些客户资料存在缺失。这些都会成为后续 Agent 设计时需要考虑的现实限制。</p>
      </section>

      <section className={styles.lessonSection} id="section-6" aria-labelledby="lesson-third-section-six-title">
        <h2 id="lesson-third-section-six-title">6、信息和工具</h2>
        <p>前面已经把业务、用户、任务和数据都梳理清楚了，最后一步才真正站在 Agent 的角度问两个问题：</p>
        <p><strong>为了完成任务，Agent 需要知道什么？为了完成任务，Agent 需要能够做什么？</strong>对应的就是信息和工具。</p>

        <article className={styles.lessonThirdInfoBlock}>
          <h3><Info aria-hidden="true" size={20} strokeWidth={1.8} /><span>信息：Agent 需要知道什么</span></h3>
          <p>这里的“信息”和上一节的“数据”不是一回事。数据调研关注的是<strong>企业现在拥有哪些原始数据</strong>；信息调研关注的是<strong>Agent 在执行某个具体任务时，到底需要获得哪些信息</strong>。</p>
          <p>企业可能有非常多数据，但没有必要全部放进 Agent 的上下文。需要进一步明确：哪个任务需要哪些信息、信息应该什么时候提供、从哪里获取、哪些是固定信息、哪些需要动态查询、哪些属于用户当前上下文。最终要建立的是<strong>任务与所需信息之间的对应关系</strong>。</p>
        </article>

        <article className={styles.lessonThirdInfoBlock}>
          <h3><Wrench aria-hidden="true" size={20} strokeWidth={1.8} /><span>工具：Agent 需要能够做什么</span></h3>
          <p>工具是 Agent 与外部系统发生交互的能力。如果 Agent 只能获得信息，那么它通常只能分析、判断、给建议；如果 Agent 还能调用工具，就可以进一步查询、修改和执行。</p>
          <p>工具可能包括搜索工具、数据库查询、CRM、邮件、日历、知识库、文档编辑、工作流系统、企业内部 API 等。需要进一步明确：Agent 需要调用哪些工具、每个工具可以完成什么、是只读还是允许写入、哪些操作需要用户确认、哪些操作风险比较高、是否存在权限限制。</p>
        </article>

        <article className={`${styles.lessonThirdCase} ${styles.lessonThirdNestedCase}`}>
          <ThirdLessonCaseTitle />
          <div className={styles.lessonThirdCaseTask}>
            <strong>任务：帮助销售判断今天应该优先跟进哪些客户，并给出下一步建议</strong>
            <p><b>需要的信息：</b>当前销售负责哪些客户、每个客户当前的商机阶段、最近一次跟进时间和沟通内容、客户当前需求和主要阻碍、客户价值和优先级。</p>
          </div>
          <div className={styles.lessonThirdCaseTask}>
            <strong>需要的工具</strong>
            <ul>
              <li>CRM 工具：查询客户和商机信息</li>
              <li>邮件工具：读取历史邮件并生成或发送跟进邮件</li>
              <li>知识库工具：搜索产品资料和成功案例</li>
              <li>日历工具：创建下一次客户会议</li>
              <li>CRM 写入工具：将新的跟进结果记录回 CRM。</li>
            </ul>
          </div>
          <ThirdLessonFlow steps={["查询商机", "获取相关客户信息", "整理历史上下文", "判断客户状态和优先级", "推荐下一步行动", "生成跟进内容", "销售确认", "执行", "更新 CRM"]} className={styles.lessonThirdCaseFlow} />
        </article>
      </section>

      <section className={styles.lessonThirdConclusion} aria-labelledby="lesson-third-conclusion-title">
        <h2 id="lesson-third-conclusion-title">完成需求调研后，我们应该得到什么？</h2>
        <p>通过以上六步，最终至少要回答清楚六个问题：</p>
        <ol>
          <li><strong>为什么做？</strong><span>当前是什么问题，希望创造什么业务价值？</span></li>
          <li><strong>为谁做？</strong><span>有哪些潜在用户，核心用户是谁，他们的核心痛点是什么？</span></li>
          <li><strong>业务怎么运行？</strong><span>Agent 将进入怎样一条真实业务流程？</span></li>
          <li><strong>用户具体在做什么？</strong><span>Agent 未来准备参与哪些具体任务？</span></li>
          <li><strong>有什么数据？</strong><span>输入输出是什么，数据从哪里来，质量怎么样？</span></li>
          <li><strong>Agent 需要知道什么、能做什么？</strong><span>完成任务需要哪些信息，需要使用哪些工具？</span></li>
        </ol>
        <p>完成这些调研以后，我们才真正拥有设计 Agent 所需要的业务基础。</p>
      </section>
    </AgentLessonShell>
  );
}
