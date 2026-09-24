"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { papers } from "@/content/ai-papers/papers";
import PaperSiteHeader from "./PaperSiteHeader";
import styles from "./ai-papers.module.css";

const licklider = papers.find((paper) => paper.slug === "licklider")!;

const flows = {
  offline: {
    label: "传统离线流程",
    summary: "先把问题和步骤写完整，再交给计算机集中处理。出现新问题后，要修改程序并重新提交。",
    steps: [
      { actor: "人", label: "记录研究现象", detail: "研究者发现某种材料在高温下容易变脆，先整理已知条件。" },
      { actor: "人 + 程序员", label: "预先写定步骤", detail: "把要比较的条件、计算顺序和分支都写清楚；程序无法临时补出未定义的研究问题。" },
      { actor: "计算机", label: "排队运行", detail: "计算机按固定步骤批量处理数据，结果通常在任务完成后再交还给研究者。" },
      { actor: "人", label: "读结果、改程序", detail: "如果输出带来一个新问题，研究者需要调整分析步骤，再开始下一次运行。" }
    ]
  },
  cooperation: {
    label: "人机协作流程",
    summary: "研究者提出目标和初步假设，计算机把可整理的工作及时做完，再把结果交还给人继续判断。",
    steps: [
      { actor: "人", label: "提出目标与假设", detail: "研究者想弄清高温材料变脆的原因，先猜测升温速度可能有关，并决定要观察哪些条件。" },
      { actor: "计算机", label: "检索资料、计算", detail: "按研究者指定的名字或关系找到可用资料，把数据变成可比较的形式，并计算不同假设的结果。" },
      { actor: "人 + 计算机", label: "共同查看图表", detail: "计算机及时画出图表或显示模型行为，研究者检查趋势、遗漏的条件和不合常理的地方。" },
      { actor: "人", label: "修正假设", detail: "研究者看到结果后，可能发现还要考虑保温时间，于是修改问题、评价标准或下一轮的条件。" },
      { actor: "计算机", label: "再计算一轮", detail: "计算机按更新后的条件重新整理和推演，把新结果交还给人；双方继续往返，直到人认为证据足以支持下一步判断。" }
    ]
  }
} as const;

type FlowMode = keyof typeof flows;

function InteractionLoopDemo() {
  const [mode, setMode] = useState<FlowMode>("cooperation");
  const [selectedStep, setSelectedStep] = useState(0);
  const flow = flows[mode];
  const activeStep = flow.steps[selectedStep];

  const selectMode = (nextMode: FlowMode) => {
    setMode(nextMode);
    setSelectedStep(0);
  };

  return (
    <div className={styles.lickliderDemo}>
      <div className={styles.lickliderDemoHeading}>
        <div>
          <p className={styles.sectionEyebrow}>教学示意 · 试着点选步骤</p>
          <h3>为什么材料会在高温下变脆？</h3>
          <p>用一个研究问题对照两种工作方式。示例只描述协作过程，不提供材料测量值。</p>
        </div>
        <div className={styles.lickliderModeSwitch} role="group" aria-label="选择研究工作流程">
          {(Object.keys(flows) as FlowMode[]).map((key) => (
            <button
              type="button"
              key={key}
              className={`${styles.lickliderModeButton} ${mode === key ? styles.lickliderModeButtonActive : ""}`}
              aria-pressed={mode === key}
              onClick={() => selectMode(key)}
            >
              {flows[key].label}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.lickliderFlowSummary} aria-live="polite">{flow.summary}</p>
      <div className={styles.lickliderStepRail} role="group" aria-label={`${flow.label}步骤`}>
        {flow.steps.map((step, index) => (
          <div className={styles.lickliderStepSlot} key={`${mode}-${step.label}`}>
            <button
              type="button"
              className={`${styles.lickliderStepButton} ${selectedStep === index ? styles.lickliderStepButtonActive : ""}`}
              aria-pressed={selectedStep === index}
              onClick={() => setSelectedStep(index)}
            >
              <span className={styles.lickliderStepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.lickliderStepActor}>{step.actor}</span>
              <strong>{step.label}</strong>
            </button>
            {index < flow.steps.length - 1 && <ArrowRight className={styles.lickliderStepArrow} size={16} aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className={styles.lickliderStepDetail} aria-live="polite">
        <div><span>当前步骤</span><strong>第 {selectedStep + 1} 步 / {flow.steps.length}</strong></div>
        <div><span>{activeStep.actor}</span><h4>{activeStep.label}</h4></div>
        <p>{activeStep.detail}</p>
      </div>
      {mode === "cooperation" && (
        <p className={styles.lickliderLoopNote}><RefreshCw size={16} aria-hidden="true" /> 结果回到人这里，修正后的假设再交给计算机。</p>
      )}
      <p className={styles.demoDisclaimer}>这是帮助理解论文主张的教学示意，不是论文里的实际软件、研究记录或实验数据。</p>
    </div>
  );
}

export default function LickliderPage() {
  return (
    <div className={styles.paperSite}>
      <PaperSiteHeader onDetail />
      <main className={`${styles.detailMain} ${styles.lickliderMain}`}>
        <div className={`${styles.detailHero} ${styles.lickliderHero}`}>
          <div className={styles.detailHeroText}>
            <p className={styles.eyebrow}>论文图解 00 / 人机协作</p>
            <h1>人机共生</h1>
            <p className={styles.originalTitle}>{licklider.title}</p>
            <p className={styles.detailDeck}>J. C. R. Licklider 想象一种紧密、反复的人机合作：计算机不只替人解已经写好的题，也帮助人检索资料、检验假设、形成问题并处理需要实时判断的情境。</p>
            <div className={styles.detailMeta}>
              <span>J. C. R. Licklider</span>
              <span>IRE Transactions on Human Factors in Electronics</span>
              <span>HFE-1(1) · March 1960 · pp. 4–11</span>
            </div>
            <a className={styles.inlineSource} href={licklider.sourceUrl} target="_blank" rel="noopener noreferrer">
              IEEE 原论文 <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <aside className={`${styles.detailHeroFact} ${styles.lickliderFact}`}>
            <p>核心命题</p>
            <blockquote>让人设定目标、提出假设并评价结果，让计算机及时完成可整理、可计算、可模拟的工作，再把新信息送回人的思考过程。</blockquote>
            <small>1960 年提出的概念与设计议程 · 论文没有报告一套已经建成的共生系统</small>
          </aside>
        </div>

        <section className={`${styles.plainExplanation} ${styles.lickliderPlain}`} aria-labelledby="plain-explanation-title">
          <h2 id="plain-explanation-title">小学生也能看懂的解释</h2>
          <p>假设一位工程师发现，某种材料加热后会变脆。他想知道是温度、加热速度，还是其他条件造成的。刚开始，他可能还不知道应该把问题分成哪几部分，也不知道哪种解释最值得试。</p>
          <p>在 Licklider 想象的合作里，工程师先告诉计算机自己想弄清什么，提出一个暂时的猜想，再决定哪些结果值得关注。计算机可以帮忙找相关记录、把数字整理到一起、计算不同条件的结果，或者模拟一个模型会怎样变化。</p>
          <p>接着，计算机把结果用表格、图表或共同显示的画面送回来。工程师观察后可能发现，光看温度不够，还要考虑材料加热了多久。于是他修改猜想或补上条件，计算机再算一遍。问题就在这一来一回里逐渐变清楚。</p>
          <p>人负责决定想解决什么、先试什么解释，以及结果是否可信；计算机负责快速处理大量重复的整理、计算和展示工作。它们要能及时交换信息，让人刚想到的新问题可以马上接上下一步分析。</p>
          <p>这篇论文写于 1960 年。当时的计算机不是今天会聊天的大模型，论文也没有介绍一个已经建成的 AI 产品；它提出的是一份关于未来人机协作方式和所需技术的设想。</p>
        </section>

        <nav className={styles.detailSectionNav} aria-label="本页内容">
          <a href="#problem">当年的问题</a>
          <a href="#roles">人和计算机分工</a>
          <a href="#interaction">协作循环示意</a>
          <a href="#prerequisites">实现前提</a>
          <a href="#boundaries">影响与边界</a>
        </nav>

        <section id="problem" className={styles.detailSection}>
          <div className={styles.detailSectionHead}>
            <span>01 / 问题</span>
            <div><h2>预先写好的流程，接不住还没问清的问题</h2><p>1960 年的计算机擅长按预先写定的步骤处理明确任务。遇到新的分支或尚未定义清楚的问题，常要停下来等待程序员改写流程；面对实时变化的情况，传统的离线批处理也可能慢一步。</p></div>
          </div>
          <div className={styles.lickliderProblemGrid}>
            <article className={styles.lickliderProblemCard}>
              <span>当问题还在形成</span>
              <h3>人需要先看见结果，才知道下一问是什么</h3>
              <p>先把所有问题和步骤写死，会漏掉试算过程中才出现的线索。Licklider 希望机器能进入探索、试错和修正假设的阶段，让人边思考边得到可用反馈。</p>
            </article>
            <article className={`${styles.lickliderProblemCard} ${styles.lickliderTimeCard}`}>
              <span>作者的非正式自我观察 · 1957</span>
              <strong>约 85%</strong>
              <p>Licklider 记录自己做技术工作时，约 85% 的“思考”时间花在让自己进入能够思考的状态：找资料、计算、画图、整理数据等。</p>
              <small>这是作者对自己工作的非正式观察。他提醒读者，记录方式有限、样本只有自己，不能当作普遍统计结论。</small>
            </article>
          </div>
        </section>

        <section id="roles" className={styles.detailSection}>
          <div className={styles.detailSectionHead}>
            <span>02 / 分工</span>
            <div><h2>人决定往哪里想，计算机让思考走得更快</h2><p>论文设想的是互相补足的伙伴关系。信息在两者之间反复传递，而不是交出一个目标后由机器独自完成整件事。</p></div>
          </div>
          <div className={styles.lickliderRolesGrid}>
            <article className={styles.lickliderRoleCard}>
              <span className={styles.lickliderRoleLabel}>人的工作</span>
              <h3>提出方向，理解结果</h3>
              <ul>
                <li>设定目标，提出问题和假设</li>
                <li>选择评价标准，检查结果是否有意义</li>
                <li>补充机器无法预先处理的例外情况</li>
                <li>根据新线索修正下一轮思路</li>
              </ul>
            </article>
            <div className={styles.lickliderRolesBridge} aria-hidden="true"><ArrowRight size={20} /><ArrowLeft size={20} /><span>反复交换</span></div>
            <article className={styles.lickliderRoleCard}>
              <span className={styles.lickliderRoleLabel}>计算机的工作</span>
              <h3>处理资料，展示可能性</h3>
              <ul>
                <li>按名称或特征检索相关资料</li>
                <li>计算、转换和比较大量数据</li>
                <li>把假设变成可检验的模型并做模拟</li>
                <li>及时画图、显示结果并等待人的判断</li>
              </ul>
            </article>
          </div>
          <p className={styles.lickliderRolesCaption}>分工会随着具体任务交织在一起，但目标、标准和判断由人来引导。</p>
        </section>

        <section id="interaction" className={styles.detailSection}>
          <div className={styles.detailSectionHead}>
            <span>03 / 往返协作</span>
            <div><h2>切换流程，再点开每一步</h2><p>Licklider 用“紧密耦合”来描述理想关系。看看同一个技术研究问题，怎样从固定的离线流程变成可以边看边改的协作循环。</p></div>
          </div>
          <InteractionLoopDemo />
        </section>

        <section id="prerequisites" className={styles.detailSection}>
          <div className={styles.detailSectionHead}>
            <span>04 / 技术前提</span>
            <div><h2>要让想法落地，计算机也得换一种工作方式</h2><p>作者把共生关系当作一项未来研究议程。除了更快的机器，他还指出存储、检索、语言、显示和输入输出都要一起进步。</p></div>
          </div>
          <div className={styles.lickliderPrereqGrid}>
            <article><span>01</span><h3>分时共享</h3><p>大型计算机的速度可以在多个使用者之间分配，让个人获得短促、及时的响应，而不是等到整批任务结束。</p></article>
            <article><span>02</span><h3>存储硬件</h3><p>保留可重复读取的资料和程序，降低存储成本，并支持研究过程中频繁调用数据。</p></article>
            <article><span>03</span><h3>按名称与特征检索</h3><p>信息要能被快速找到。论文讨论了 trie memory 等存储组织设想；这是计算机中的资料组织，不是现代互联网搜索。</p></article>
            <article><span>04</span><h3>面向目标的语言</h3><p>人常说想达到什么目标，再边走边改路线。作者设想的程序语言需要让人逐步表达目标、组合可用过程。</p></article>
            <article><span>05</span><h3>共同显示与输入</h3><p>人和计算机需要能共看图表、写下或画出想法，并迅速修正输出；当时一般可用计算机的人机沟通主要依靠电动打字机。</p></article>
            <article className={styles.lickliderSpeechNote}><span>当时的难题</span><h3>语音识别仍待解决</h3><p>Licklider 探讨了自然语音交流的可能性，也指出大词汇量、不同说话人和口音都让识别变难。它是待研究的方向，不是论文已具备的功能。</p></article>
          </div>
        </section>

        <section id="boundaries" className={styles.detailSection}>
          <div className={styles.detailSectionHead}>
            <span>05 / 影响与边界</span>
            <div><h2>这篇文章提出方向与需求，没有报告成熟系统的效果</h2><p>它分析人和计算机的能力差异，说明合作可能带来的价值，并把一些工程难题交给后续研究。作者也明确说，当时还没有真正的人机共生系统。</p></div>
          </div>
          <div className={styles.lickliderImpactGrid}>
            <article>
              <span>论文当时提出</span>
              <h3>把计算机带进问题形成与实时思考</h3>
              <p>文章的核心贡献是提出概念、梳理人和计算机可能的分工，并列出达到紧密合作所需的技术条件。它属于设计议程和前瞻构想，不是训练实验、基准评测或已上线产品报告。</p>
            </article>
            <article>
              <span>今天的后见之明</span>
              <h3>可以用交互协作来帮助理解</h3>
              <p>今天的一些交互工具也允许人设置目标、查看系统反馈并继续调整；拿这种“提出—反馈—修正”的过程作类比，有助于理解论文。这个类比不表示 Licklider 预见或发明了现代 AI Agent、互联网或今天的大模型。</p>
            </article>
          </div>
          <div className={styles.sourcePanel}>
            <div><p className={styles.sectionEyebrow}>原论文</p><h3>Man-Computer Symbiosis</h3><p>J. C. R. Licklider · IRE Transactions on Human Factors in Electronics, HFE-1(1), March 1960, pp. 4–11</p></div>
            <a href={licklider.sourceUrl} target="_blank" rel="noopener noreferrer">IEEE 原文 <ExternalLink size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <div className={styles.detailEnd}><Link href="/ai-papers"><ArrowLeft size={17} aria-hidden="true" /> 返回全部论文</Link><Link href="/ai-papers/alexnet">下一篇：AlexNet <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </main>
      <footer className={styles.siteFooter}><span>© {new Date().getFullYear()} jiaxuan · 人工智能论文图解</span><Link href="/ai-papers">论文目录 <ArrowRight size={15} aria-hidden="true" /></Link></footer>
    </div>
  );
}
