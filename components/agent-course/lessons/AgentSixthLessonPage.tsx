import { ArrowDown, ArrowLeft, ArrowRight, Brain, CheckCircle2, Eye, PauseCircle, RefreshCw, ShieldCheck, Square, Wrench } from "lucide-react";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentLessonShell, { AgentLessonSection } from "@/components/agent-course/AgentLessonShell";
import LessonChoiceQuestion from "@/components/agent-course/LessonChoiceQuestion";
import s from "@/components/agent-course/styles/agent-loop.module.css";

const failures = [
  ["重复相同行为", "没有有效利用历史行动和反馈，无法识别哪些方法已经尝试过、为什么不可行", "已经确认冰箱里没有可乐，却反复检查；或者在两家已经确认缺货的商店之间来回寻找", "保留已尝试的方法、结果和失败原因；发现连续行动没有带来新信息或任务进展时，调整策略，必要时停止"],
  ["执行遇到阻碍", "外部环境或工具无法支持当前行动，但系统没有区分“等待或重试能解决的问题”和“必须改变条件的问题”", "商店库存查询一直没有响应，仍无限等待；或者付款因余额不足失败，却不断重复付款", "设置超时和有限重试；临时故障可以等待后重试，余额不足等问题则需要补充条件、换方案或请求帮助"],
  ["缺少结束标准", "智能体无法判断什么算完成、什么情况下应放弃继续尝试", "已经买到符合要求的可乐，却继续寻找“更便宜的一瓶”；附近商店都缺货，仍无限扩大寻找范围", "提前明确完成条件和搜索范围，例如“买到一瓶预算内的可乐即可”；达到时间、费用或尝试次数上限时，整理结果并停止"]
];
const states = [
  { icon: CheckCircle2, title: "任务完成", trigger: "交付物已经满足验收条件", message: "给出结果和必要的完成依据" },
  { icon: PauseCircle, title: "暂停并等待", trigger: "缺少用户信息、授权，或需要人工确认", message: "说明缺什么，保存进度，等待补充后继续" },
  { icon: Wrench, title: "无法继续", trigger: "工具调用总是失败，或者可行方法已经尝试，仍无法完成", message: "说明已完成部分、阻碍和可选下一步" },
  { icon: Square, title: "被终止", trigger: "达到最大运行时间、费用、轮数上限，或用户手动停止", message: "明确任务尚未完成，以及停止原因" }
];
const checkpoints = [
  { title: "模型决策前", action: "整理当前目标、已完成事项、失败记录和剩余预算", example: "告诉 Agent：“已经查过这三家店，前两家缺货，剩余预算 10 元”" },
  { title: "工具执行前", action: "检查参数、权限和是否需要确认", example: "查询商品库存可以直接执行；超过预算的购买需要先确认" },
  { title: "工具返回后", action: "整理结果、更新状态、判断是否需要重试", example: "区分“商品缺货”“商店关门”和“查询接口暂时不可用”" },
  { title: "准备结束时", action: "检查交付物是否真正满足要求", example: "确认订单确实创建成功，再告诉用户已经购买" }
];
function Reference({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className={s.reference} href={href} target="_blank" rel="noreferrer">参考：{children} ↗</a>;
}
export default function AgentSixthLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentLessonShell detail={detail}>
    <AgentLessonSection id="section-1" title="1. 什么是 Agent loop？">
      <p>在本文中 loop 和循环同义。</p>
      <p>智能体的运行靠一个循环来驱动：用户的每一次请求，智能体都有两个选择——要么直接回答用户问题，要么调用工具获得结果，然后判断结果是否足以满足用户要求。如果可以满足，则回答用户。如果不能满足，则继续调用工具。</p>
      <figure className={s.loop} aria-label="智能体循环：决策后直接回答，或调用工具、观察结果；满足要求则回答，不满足则返回决策">
        <div className={s.loopCanvas}>
          <div className={s.request}>用户请求</div><ArrowDown className={s.arrow} aria-hidden="true" size={20} />
          <div className={s.decision}><Brain size={25} strokeWidth={1.8} aria-hidden="true" /><strong>决策</strong><span>下一步做什么？</span></div>
          <div className={s.flowGrid}>
            <span className={s.directLabel}>可以直接回答</span><span className={s.toolLabel}>需要行动或更多信息</span>
            <div className={`${s.node} ${s.directAnswer}`}><CheckCircle2 size={24} aria-hidden="true" /><strong>回答用户</strong></div>
            <div className={`${s.node} ${s.toolNode}`}><Wrench size={24} aria-hidden="true" /><strong>调用工具</strong></div>
            <ArrowDown className={s.toolArrow} size={20} aria-hidden="true" />
            <div className={`${s.node} ${s.observeNode}`}><Eye size={24} aria-hidden="true" /><strong>观察结果</strong></div>
            <ArrowDown className={s.observeArrow} size={20} aria-hidden="true" />
            <div className={`${s.node} ${s.resultAnswer}`}><CheckCircle2 size={24} aria-hidden="true" /><strong>回答用户问题</strong></div>
            <div className={s.yesPath}><span>满足</span><ArrowLeft aria-hidden="true" size={26} /></div>
            <div className={s.resultDecision}><strong>是否满足<br />用户要求？</strong></div>
            <div className={s.noPath}><span>不满足</span><ArrowDown aria-hidden="true" size={22} /></div>
            <div className={`${s.node} ${s.continueNode}`}><RefreshCw size={24} aria-hidden="true" /><div><strong>继续调用工具</strong><span>携带结果，进入下一轮决策与行动</span></div></div>
          </div>
          <figcaption>决策 → 行动 → 观察 → 再决策</figcaption>
        </div>
      </figure>
    </AgentLessonSection>
    <AgentLessonSection id="section-2" title="2. 为什么 Agent 需要循环">
      <p>因为 Agent 无法提前知道每一步行动的结果。它必须不断根据行动获得的新信息，而 <strong>Agent 做出的行动又会改变它掌握的信息。必须把行动结果重新告诉模型，模型才能继续</strong>决定下一步做什么，因此需要形成“决策 → 行动 → 观察 → 再决策”的循环。</p>
      <div className={s.callout}>可以把它类比成人类处理现实任务。<br />比如我让你：“去厨房看看有没有可乐，没有的话帮我买一瓶。”</div>
      <p>你不可能一开始就想好完整的行动计划。你得先：</p>
      <figure className={s.cola}>
        <div className={s.request}>去厨房 → 看冰箱</div>
        <div className={s.branches}>
          <div><span className={s.branchLabel}>如果有可乐</span><div className={s.node}><CheckCircle2 size={24} aria-hidden="true" /><strong>拿回来 → 结束</strong></div></div>
          <div><span className={s.branchLabel}>如果没有</span><ol className={s.steps}>{["查附近商店", "去商店", "看有没有货", "有就买", "回来把可乐给我"].map(x=><li key={x}>{x}</li>)}</ol></div>
        </div>
        <figcaption>下一步行动取决于上一步看到的结果，Agent 也是一样的。</figcaption>
      </figure>
    </AgentLessonSection>
    <AgentLessonSection id="section-3" title="3. 生产环境中的循环">
      <p>怎样让 Agent 在真实环境中持续推进任务，同时在该停的时候停下来。</p>
      <div className={s.three}>{["避免无效重复", "明确停止条件", "按业务需要调整循环"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div>
      <p>“决策 → 行动 → 观察 → 再决策”这个循环让 Agent 能够根据新信息调整行动。但把这个循环放到真实环境中还需要回答几个问题：</p>
      <ul className={s.questions}><li>如果它一直找不到答案怎么办？</li><li>如果工具一直报错怎么办？</li><li>如果任务已经完成，它却还在继续行动和推理怎么办？</li></ul>
      <p>因此，我们不仅要让 Agent 能够循环，还要设计好循环的边界。Anthropic 也明确提出：Agent 应依据环境反馈评估进展，在遇到阻碍时寻求人类帮助，并设置最大迭代次数等停止条件。</p>
      <Reference href="https://www.anthropic.com/engineering/building-effective-agents">Building effective agents</Reference>
      <section className={s.subsection} id="section-3-1" aria-labelledby="section-3-1-title"><h3 id="section-3-1-title">3.1 如何防止智能体陷入死循环</h3>
        <p>这里的“死循环”，可以理解为：<strong>Agent 不断行动，却没有取得有意义的进展。</strong>常见情况如下：</p>
        <div className={s.tableScroll} role="region" aria-label="死循环的情况、原因、买可乐的例子和应对方式" tabIndex={0}><table><thead><tr>{["情况", "原因", "买可乐的例子", "可以怎么处理"].map(x=><th key={x} scope="col">{x}</th>)}</tr></thead><tbody>{failures.map(([title,...cells])=><tr key={title}><th scope="row">{title}</th>{cells.map(x=><td key={x}>{x}</td>)}</tr>)}</tbody></table></div>
        <h3>应对时，可以分成两层。</h3>
        <div className={s.layers}><article><RefreshCw size={25} strokeWidth={1.8} aria-hidden="true" /><h4>第一层：让 Agent 根据反馈调整</h4><p>工具失败时，应该告诉模型“为什么失败、哪些信息仍然有效”，让它有机会修正下一步。</p><p>临时网络错误可以有限重试；缺少权限或输入错误，则需要先解决原因。重试策略通常也会区分异常类型，并设置重试次数和等待间隔。</p><Reference href="https://docs.langchain.com/oss/python/langgraph/fault-tolerance">LangGraph 容错机制</Reference></article>
        <article><ShieldCheck size={25} strokeWidth={1.8} aria-hidden="true" /><h4>第二层：由程序设置硬性边界</h4><p>例如，限制最大模型调用轮数、运行总耗时、token 费用和同类错误的重试次数。</p><p><strong>这些限制需要由运行 Agent 的程序执行，不能只在提示词里写“不要死循环”。</strong>OpenAI Agents SDK 提供了 max_turns，超过上限会抛出异常，需要应用接住并处理。</p><Reference href="https://openai.github.io/openai-agents-python/running_agents/">Running agents</Reference></article></div>
        <div className={s.callout}><strong>重复调用不一定是无效循环。</strong>等待一份报告生成时，定期查询状态可能是合理的。判断重点是：这次行动是否有明确用途，是否仍在允许的时间和成本范围内。<br />具体阈值应根据任务测试确定，不能把“最多循环 10 次”当成适用于所有 Agent 的标准。</div>
      </section>
      <section className={s.subsection} id="section-3-2" aria-labelledby="section-3-2-title"><h3 id="section-3-2-title">3.2 智能体什么时候该停下来</h3><p>停止不只有一种情况。产品设计时，至少应区分下面四种状态：</p>
        <div className={s.states}>{states.map(({icon:Icon,title,trigger,message})=><article key={title}><Icon size={25} strokeWidth={1.8} aria-hidden="true" /><h4>{title}</h4><p><span>触发条件</span>{trigger}</p><p><span>告诉用户</span>{message}</p></article>)}</div>
        <div className={s.callout}><strong>“模型说完成了”和“任务真的完成了”，需要分开判断。</strong><br />比如用户要求“整理报告并保存为文件”，只生成一段报告文字还不算完成；还需要确认文件确实保存成功。能够用程序检查的条件，应尽量用实际结果检查；主观质量则可以结合明确标准或人工评审。</div>
        <p>接近运行上限时，也可以提前进入收尾流程，整理已完成内容，而不是等异常发生后直接丢失结果。LangGraph 的剩余步数机制就支持这种提前处理方式。</p><Reference href="https://docs.langchain.com/oss/python/langgraph/graph-api">循环步数与提前收尾</Reference>
        <p><strong>另外，暂停与结束不同。</strong>需要用户确认时，可以保存任务状态，收到回复后继续，而不是重新执行整个任务。</p><Reference href="https://docs.langchain.com/oss/python/langgraph/interrupts">Interrupts</Reference>
      </section>
      <section className={s.subsection} id="section-3-3" aria-labelledby="section-3-3-title"><h3 id="section-3-3-title">3.3 根据实际需要调整循环</h3><p>基础循环只是起点。面对不同业务和场景，我们可以在循环的不同位置加入处理步骤。可以从四个位置考虑：</p>
        <ol className={s.checkpoints}>{checkpoints.map((x,i)=><li key={x.title}><span className={s.number}>0{i+1}</span><div><h4>{x.title}</h4><p>{x.action}</p><p className={s.example}>{x.example}</p></div></li>)}</ol>
        <p>这些处理步骤可以通过程序、规则或额外的模型调用完成。LangChain 的中间件机制就是在模型和工具执行的前后加入处理，例如调整输入、筛选工具、处理失败和提前终止。</p><Reference href="https://docs.langchain.com/oss/python/langchain/middleware/overview">Middleware</Reference>
        <div className={s.purchase}><strong>继续用买可乐的例子</strong><p>{["查看冰箱", "没有可乐", "查询商店", "检查价格是否符合预算", "购买", "确认买到了", "结束"].map((x,i)=><span key={x}>{i>0&&<ArrowRight size={15} aria-hidden="true" />}{x}</span>)}</p><p>如果价格超出预算，就暂停询问用户；如果查询失败，就按错误原因处理；如果买到了，就停止，不再继续找其他商店。</p></div>
      </section>
    </AgentLessonSection>
    <AgentLessonSection id="section-4" title="4. 练习题">
      <div className={s.exercise}><h3>01 / 冰箱里没有可乐，下一步呢？</h3><p>Agent 已检查冰箱并确认没有可乐，却又连续两次检查同一个冰箱。哪种处理最合理？</p><LessonChoiceQuestion ariaLabel="练习一：识别无效循环" options={["继续检查，调用次数越多，判断越可靠", "把已检查及缺货的结果带入下一轮决策，转向查询附近商店", "直接告诉用户已经买到可乐，结束循环"]} correctIndex={1} feedback={[{label:"解析",text:"行动结果必须进入下一轮决策。重复检查没有带来新信息，应利用已知结果调整方法，而不是凭空宣布完成。",icon:"check"}]} /></div>
      <div className={s.exercise}><h3>02 / 找到了可乐，却超过预算</h3><p>用户要求总价不超过 10 元，当前商品加配送费共 12 元，需要用户确认是否增加预算。此时应该怎么处理？</p><LessonChoiceQuestion ariaLabel="练习二：暂停与结束" options={["先购买，再告诉用户超出了预算", "保存已找到的商品与报价，暂停并询问用户，得到回复后继续", "不断重复查询同一家店，直到价格符合预算"]} correctIndex={1} feedback={[{label:"解析",text:"需要用户确认时应暂停并保存状态；工具执行前应检查预算和权限。暂停不等于失败，也不需要丢弃已获得的信息重新开始。",icon:"check"}]} /></div>
    </AgentLessonSection>
  </AgentLessonShell>;
}
