"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Cpu, Database, Layers3, X, Check, Info, Box, Timer, ChartNoAxesCombined } from "lucide-react";
import { papers } from "@/content/ai-papers/papers";
import PaperSiteHeader from "./PaperSiteHeader";
import ScalingLawsChart, { relativeLoss, scaleFactors, type ScaleKey } from "./ScalingLawsChart";
import ComputeAllocationChart from "./ComputeAllocationChart";
import shared from "./ai-papers.module.css";
import styles from "./ScalingLaws.module.css";

const paper = papers.find((item) => item.slug === "scaling-laws")!;
const keys: ScaleKey[] = ["N", "D", "C"];
const controls = {
  N: { icon: Layers3, heading: "模型参数 N", unit: "倍参数量", description: "网络里可学习的数字有多少" },
  D: { icon: Database, heading: "训练数据 D", unit: "倍训练 token", description: "训练时读了多少文本" },
  C: { icon: Cpu, heading: "最优训练算力 Cₘᵢₙ", unit: "倍计算量", description: "按论文研究的最优方式分配计算" }
};

export default function ScalingLawsPage() {
  const [selected, setSelected] = useState<ScaleKey>("N");
  const [steps, setSteps] = useState<Record<ScaleKey, number>>({ N: 2, D: 2, C: 2 });
  const multipliers = { N: 10 ** steps.N, D: 10 ** steps.D, C: 10 ** steps.C };
  const currentLoss = Math.round(relativeLoss(selected, multipliers[selected]) * 100);

  return (
    <div className={shared.paperSite}>
      <PaperSiteHeader onDetail />
      <main className={`${shared.detailMain} ${styles.main}`}>
        <section className={styles.hero} aria-labelledby="scaling-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>论文图解 04 / 语言模型 · 规模规律</p>
            <h1 id="scaling-title">Scaling Laws</h1>
            <p className={styles.heroChinese}>规模变大，语言模型会怎样？</p>
            <div className={styles.meta}><span>Jared Kaplan、Sam McCandlish 等</span><span>2020</span><span>arXiv: 2001.08361</span></div>
            <p className={styles.deck}>模型、数据与算力增加时，测试损失沿着可估计的曲线下降。</p>
            <a className={styles.sourceButton} href={paper.sourceUrl} target="_blank" rel="noopener noreferrer">阅读论文原文 <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroVisualImage}><Image src="/ai-papers/scaling-laws/hero-scale.png" alt="浅绿色立体网格上的六个球沿曲线依次下降，表示模型规模增加时测试损失逐渐降低" fill sizes="(max-width: 700px) 90vw, 44vw" priority /></div>
            <span className={styles.heroFormula}>L(N) ∝ N<sup>−α</sup></span>
            <div className={styles.heroVisualCaption}><span>模型规模 ↑</span><span>测试损失 ↓</span></div>
          </div>
        </section>

        <section className={styles.foreword} aria-labelledby="foreword-title">
          <h2 id="foreword-title">论文前言</h2>
          <p>2020 年，Jared Kaplan、Sam McCandlish 等人发表了《Scaling Laws for Neural Language Models》。他们通过语言模型实验，研究测试损失如何随模型参数量、训练数据量和训练算力变化，发现在论文考察的范围内，这些关系近似遵循幂律。这项研究让规模扩展带来的效果更容易估计，也为后续研究如何分配模型、数据和算力提供了重要参考。</p>
        </section>

        <section className={styles.section} aria-labelledby="simple-title">
          <div className={styles.sectionHeading}><div><p className={styles.sectionKicker}>01 / 先看懂它在做什么</p><h2 id="simple-title">小学生也能看懂的解释</h2></div><p>想象教一个小朋友玩“猜下一个词”的游戏。</p></div>
          <div className={styles.storyGrid}>
            <article className={styles.storyCard}>
              <div className={styles.storyTitle}><span>1</span><div><h3>看很多例子</h3><p>读大量句子，记住常见的词语搭配。</p></div></div>
              <div className={styles.storyPicture}><Image src="/ai-papers/scaling-laws/book-example.png" alt="摊开的书，代表训练用的许多句子" fill sizes="(max-width: 720px) 90vw, 30vw" /></div>
              <p className={styles.storyExample}>“今天天气真不错。”</p>
            </article>
            <article className={styles.storyCard}>
              <div className={styles.storyTitle}><span>2</span><div><h3>从例子里找规律</h3><p>读得越多，越知道哪些词常接在一起。</p></div></div>
              <div className={styles.storyPicture}><Image src="/ai-papers/scaling-laws/reader-pattern.png" alt="读书的小朋友，代表从文本里学习规律" fill sizes="(max-width: 720px) 90vw, 30vw" /></div>
              <p className={styles.storyExample}>“今天天气……”后面可能是什么？</p>
            </article>
            <article className={styles.storyCard}>
              <div className={styles.storyTitle}><span>3</span><div><h3>猜下一个词</h3><p>根据学到的规律，给候选词分配概率。</p></div></div>
              <div className={styles.storyPicture}><Image src="/ai-papers/scaling-laws/guess-next.png" alt="举手猜答案的小朋友，代表预测下一个词" fill sizes="(max-width: 720px) 90vw, 30vw" /></div>
              <p className={styles.storyExample}>“真”比“不”更可能接在后面。</p>
            </article>
          </div>
          <p className={styles.storyTakeaway}><BookOpen size={18} aria-hidden="true" /> 论文研究的是：把模型做大、让它读更多内容，或者投入更多计算后，它猜错的程度会怎样变化？</p>
        </section>

        <section className={styles.section} id="experiment" aria-labelledby="experiment-title">
          <div className={styles.sectionHeading}><div><p className={styles.sectionKicker}>02 / 动手实验</p><h2 id="experiment-title">看看规模如何影响测试损失</h2></div><p>选一个变量，拖动滑块，观察对应的曲线。</p></div>
          <p className={styles.smallNote}>下图按论文报告的幂律指数归一化绘制，用来理解趋势。算力曲线指最优分配时的计算效率前沿；这些曲线不是原始实验数据，也不能直接相加预测同一个模型。</p>
          <div className={styles.controlGrid}>
            {keys.map((key) => {
              const item = controls[key];
              const Icon = item.icon;
              return <div className={`${styles.controlCard} ${selected === key ? styles.controlActive : ""}`} key={key}>
                <div className={styles.controlTitle}><Icon size={19} aria-hidden="true" /><strong>{item.heading}</strong></div>
                <p>{item.description}</p>
                <output htmlFor={`slider-${key}`}>{multipliers[key].toLocaleString()} {item.unit}</output>
                <input id={`slider-${key}`} type="range" min="0" max="4" step="1" value={steps[key]}
                  aria-label={`${item.heading}的增加倍数`}
                  onFocus={() => setSelected(key)}
                  onChange={(event) => { setSelected(key); setSteps({ ...steps, [key]: Number(event.target.value) }); }} />
                <div className={styles.rangeEnds}><span>1×</span><span>10,000×</span></div>
              </div>;
            })}
          </div>
          <div className={styles.chartGrid}>
            <div className={styles.chartPanel}>
              <div className={styles.chartPanelHeader}><div><h3>不同因素的规模定律</h3><p>横轴：规模增加的倍数 · 纵轴：相对测试损失</p></div><span className={styles.axisTag}>双对数坐标</span></div>
              <div className={styles.chartLegend}>{keys.map((key) => <button key={key} type="button" className={selected === key ? styles.legendActive : ""} onClick={() => setSelected(key)}><i style={{ background: scaleFactors[key].color }} />{scaleFactors[key].label}</button>)}</div>
              <ScalingLawsChart selected={selected} multipliers={multipliers} />
              <p className={styles.chartFoot}>选择的变量增加到 <strong>{multipliers[selected].toLocaleString()} 倍</strong> 时，示意曲线上的相对损失约为 <strong>{currentLoss}%</strong>。基准点设为 100%。</p>
            </div>
            <div className={styles.insightPanel}>
              <p className={styles.panelKicker}>你会看到</p><h3>边际收益递减</h3>
              <p>规模每增加相同的倍数，损失仍会下降；但想把损失再降低同样多，往往需要更大的规模投入。</p>
              <div className={styles.miniCurve} role="img" aria-label="规模从一倍增加到一万倍，损失先较快下降，然后下降趋缓"><svg viewBox="0 0 240 150" aria-hidden="true"><path d="M23 12V128H223" fill="none" stroke="#b7c9bb" strokeWidth="1.5" /><path d="M24 20 C40 62 64 88 104 106 S178 125 218 130" fill="none" stroke="#3e6c54" strokeWidth="3" strokeLinecap="round" /><circle cx="57" cy="78" r="4.5" fill="#3e6c54" /><circle cx="162" cy="122" r="4.5" fill="#3e6c54" /></svg></div>
              <p className={styles.insightCaption}>这里的“损失”衡量模型预测下一个词时的不确定程度，越低越好。</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="balance-title">
          <div className={styles.sectionHeading}><div><p className={styles.sectionKicker}>03 / 一起扩展</p><h2 id="balance-title">别只拧一个旋钮</h2></div><p>模型、数据与算力彼此关联。单独增加其中一个，其他瓶颈不会自动消失。</p></div>
          <div className={styles.balanceGrid}>
            <article className={styles.balanceCard}><div className={styles.balanceTitle}><X size={18} aria-hidden="true" /><h3>只增加模型，数据仍很少</h3></div><p>模型有更多参数，却没有足够多的训练例子；继续增大模型，额外的收益会受数据限制。</p><div className={styles.balanceDiagram} aria-label="一个大模型配少量数据，输出仍有较高损失"><div className={styles.cubeLarge}>模型<br />更大</div><b>+</b><div className={styles.dataSmall}>少量<br />数据</div><ArrowRight size={22} /><div className={styles.lossHigh}>损失较高</div></div></article>
            <article className={`${styles.balanceCard} ${styles.balanceGood}`}><div className={styles.balanceTitle}><Check size={18} aria-hidden="true" /><h3>模型与数据相互配合</h3></div><p>给更大的模型足够的训练数据和算力，才能更充分地利用扩展带来的潜力。</p><div className={styles.balanceDiagram} aria-label="较大模型配更多数据和算力，损失更低"><div className={styles.cubeLarge}>模型<br />更大</div><b>+</b><div className={styles.dataLarge}>更多<br />数据</div><b>+</b><div className={styles.computeShape}>充足<br />算力</div><ArrowRight size={22} /><div className={styles.lossLow}>损失更低</div></div></article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="allocation-title">
          <div className={styles.sectionHeading}><div><p className={styles.sectionKicker}>04 / 资源分配</p><h2 id="allocation-title">固定算力怎么分？</h2></div><p>训练预算有限时，参数量与训练步数需要取舍。</p></div>
          <p className={styles.smallNote}>这张图说明 2020 年论文的结论：在它研究的模型、数据与训练设置中，较大的模型即使训练较少步，也能更有效地利用固定计算预算。这里不使用原论文的数值坐标。</p>
          <div className={styles.allocationGrid}>
            <div className={styles.allocationFigure}>
              <h3>不同训练策略的对比 <span>固定算力</span></h3>
              <ComputeAllocationChart />
              <div className={styles.allocationCallout}>较大的模型在较少步数处停止，在论文研究的设置中损失更低。</div>
              <p>归一化机制示意 · 曲线不是论文原始实验数据</p>
            </div>
            <aside className={styles.conclusionPanel}><p className={styles.panelKicker}>2020 年论文的结论</p><ol><li><Box size={23} aria-hidden="true" /><div><strong>增加参数</strong><span>固定算力下，优先把一部分预算给更大的模型。</span></div></li><li><Timer size={23} aria-hidden="true" /><div><strong>更早停止</strong><span>模型不必等到完全收敛，再用同样算力训练小模型。</span></div></li><li><ChartNoAxesCombined size={23} aria-hidden="true" /><div><strong>前提要记住</strong><span>这是当时实验范围内的最优分配，不是永远适用的配方。</span></div></li></ol></aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="impact-title">
          <div className={styles.sectionHeading}><div><p className={styles.sectionKicker}>05 / 影响与边界</p><h2 id="impact-title">它改变了什么？又不能说明什么？</h2></div></div>
          <div className={styles.finalGrid}>
            <article className={styles.finalPanel}><h3>Kaplan 2020 与 Chinchilla 2022</h3><p>这篇论文让“扩大多少规模会得到怎样的测试损失”变得可估计。后来 Chinchilla 在新的设置下重新研究固定算力的分配，发现许多大模型训练时见过的数据偏少，提出模型参数与训练 token 数应更均衡地一起增长。</p><div className={styles.yearRows}><div><span>2020</span><strong>Kaplan 等</strong><p>在其设置下，计算最优策略倾向更大的模型、较少训练步数。</p></div><div><span>2022</span><strong>Chinchilla</strong><p>在新的研究范围内，参数量和训练 token 数宜近似同步扩展。</p></div></div><a href="https://arxiv.org/abs/2203.15556" target="_blank" rel="noopener noreferrer">阅读 Chinchilla 原论文 <ArrowUpRight size={15} aria-hidden="true" /></a></article>
            <article className={styles.finalPanel}><h3>测量的是什么？有哪些边界？</h3><ul className={styles.boundaryList}><li><Info size={17} aria-hidden="true" /><span><strong>测量的是测试损失。</strong>它衡量预测文本的误差，不能单独代表推理、可靠性或实际使用体验。</span></li><li><Info size={17} aria-hidden="true" /><span><strong>幂律是经验拟合。</strong>在论文考察的模型和数据范围内成立；换任务、数据和训练方法，需要重新验证。</span></li><li><Info size={17} aria-hidden="true" /><span><strong>固定算力结论依赖条件。</strong>2020 年的建议不应直接当成今天所有模型的训练处方。</span></li></ul></article>
          </div>
        </section>

        <div className={shared.detailEnd}><Link href="/ai-papers"><ArrowLeft size={17} aria-hidden="true" /> 返回全部论文</Link><a href={paper.sourceUrl} target="_blank" rel="noopener noreferrer">论文原文 <ArrowUpRight size={17} aria-hidden="true" /></a></div>
      </main>
      <footer className={shared.siteFooter}><span>© {new Date().getFullYear()} jiaxuan · 人工智能论文图解</span><Link href="/ai-papers">论文目录 <ArrowRight size={15} aria-hidden="true" /></Link></footer>
    </div>
  );
}
