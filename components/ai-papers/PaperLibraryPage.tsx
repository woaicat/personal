"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpenText, Layers3, Monitor, RefreshCw, UserRound } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { chronologicalPapers, paperTopics, type PaperTopic } from "@/content/ai-papers/papers";
import PaperSiteHeader from "./PaperSiteHeader";
import { ViTCardDiagram } from "./vit/ViTDiagrams";
import styles from "./ai-papers.module.css";

type Filter = "全部" | PaperTopic;
const illustratedPapers = chronologicalPapers.filter((paper) => paper.explainerUrl);
const featuredLeads: Record<string, string> = {
  alexnet: "一张图片，怎样在神经网络里逐层变成可识别的特征？",
  licklider: "人提出目标与判断，计算机协助检索和推演，再把结果送回共同讨论。",
  "scaling-laws": "把模型、数据与算力的旋钮拧大，测试损失会怎样变化？",
  "gpt-3": "不再为每个任务重新微调：给出说明和少量示例，模型能跟上吗？",
  vit: "把图像切成 patch，变成 Transformer 可以处理的 token 序列。"
};
const featuredCaptions: Record<string, string> = {
  alexnet: "结构示意 · 可在解读页逐层探索",
  licklider: "概念示意 · 回到人手中继续判断",
  "scaling-laws": "三张插图解释 · 可亲手调节规模曲线",
  "gpt-3": "切换零样本、单样本与少样本提示",
  vit: "patch → token → 分类 · 实验结果与适用边界"
};

export default function PaperLibraryPage() {
  const [filter, setFilter] = useState<Filter>("全部");
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const featuredTrackRef = useRef<HTMLDivElement>(null);
  const visiblePapers = useMemo(
    () => filter === "全部" ? chronologicalPapers : chronologicalPapers.filter((paper) => paper.topic === filter),
    [filter]
  );

  const showFeaturedPaper = (index: number) => {
    const track = featuredTrackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    setActiveFeaturedIndex(index);
  };

  const updateFeaturedIndex = () => {
    const track = featuredTrackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const closestIndex = cards.reduce((closest, card, index) =>
      Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[closest].offsetLeft - track.scrollLeft) ? index : closest, 0);
    setActiveFeaturedIndex(closestIndex);
  };

  return (
    <div className={styles.paperSite}>
      <PaperSiteHeader />
      <main>
        <section className={styles.libraryHero} aria-labelledby="library-title">
          <div className={styles.libraryHeroInner}>
            <div className={styles.libraryIntro}>
              <h1 id="library-title">人工智能<br /><span>论文图解</span></h1>
              <p className={styles.libraryDescription}>用可视化的方式，拆解重要的 AI 论文。先看懂它解决的问题，再亲手试一试关键机制。</p>
            </div>
            <div className={styles.featuredCarousel}>
              <div
                ref={featuredTrackRef}
                className={styles.featuredTrack}
                role="region"
                aria-label="可阅读的论文图解"
                aria-roledescription="轮播"
                tabIndex={illustratedPapers.length > 1 ? 0 : undefined}
                onScroll={updateFeaturedIndex}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft" && activeFeaturedIndex > 0) {
                    event.preventDefault();
                    showFeaturedPaper(activeFeaturedIndex - 1);
                  } else if (event.key === "ArrowRight" && activeFeaturedIndex < illustratedPapers.length - 1) {
                    event.preventDefault();
                    showFeaturedPaper(activeFeaturedIndex + 1);
                  }
                }}
              >
                {illustratedPapers.map((paper) => (
                  <article className={styles.featuredPaper} key={paper.slug} aria-label={`${paper.shortTitle} 图解卡片`}>
                    <p className={styles.featuredTopline}>{paper.year} · {paper.topic}</p>
                    <div className={styles.featuredHeading}>
                      <div><h2>{paper.shortTitle}</h2><p>{paper.title}</p></div>
                      {paper.slug === "alexnet" && <span className={styles.featuredBadge}><Layers3 size={18} aria-hidden="true" /> 5 + 3 层</span>}
                    </div>
                    <p className={styles.featuredLead}>{featuredLeads[paper.slug] ?? "从问题出发，一步步看懂这篇论文的核心机制。"}</p>
                    {paper.slug === "alexnet" ? (
                      <div className={styles.heroFlow} aria-label="AlexNet 的图像分类流程示意">
                        <div className={styles.heroFlowImage} role="img" aria-label="橘白色猫的示例照片" />
                        <ArrowRight size={20} aria-hidden="true" />
                        <div className={styles.heroFlowBlock}><span>卷积 × 5</span><small>提取局部特征</small></div>
                        <ArrowRight size={20} aria-hidden="true" />
                        <div className={styles.heroFlowBlock}><span>全连接 × 3</span><small>组合并分类</small></div>
                        <ArrowRight size={20} aria-hidden="true" />
                        <div className={styles.heroFlowResult}><span>1000</span><small>个类别</small></div>
                      </div>
                    ) : paper.slug === "licklider" ? (
                      <div
                        className={styles.symbiosisHeroDiagram}
                        role="img"
                        aria-label="人提出目标、假设并评价结果；计算机检索资料、计算和模拟；结果返回给人继续修正。"
                      >
                        <div className={styles.symbiosisHeroPair}>
                          <div className={`${styles.symbiosisHeroNode} ${styles.symbiosisHeroHuman}`}>
                            <UserRound size={20} aria-hidden="true" />
                            <strong>人</strong>
                            <small>目标 · 假设 · 评价</small>
                          </div>
                          <div className={styles.symbiosisHeroExchange} aria-hidden="true">
                            <ArrowRight size={17} /><ArrowLeft size={17} />
                          </div>
                          <div className={`${styles.symbiosisHeroNode} ${styles.symbiosisHeroMachine}`}>
                            <Monitor size={20} aria-hidden="true" />
                            <strong>计算机</strong>
                            <small>检索 · 计算 · 模拟</small>
                          </div>
                        </div>
                        <div className={styles.symbiosisHeroReturn}>
                          <RefreshCw size={15} aria-hidden="true" />
                          <span>共同看见结果，再修正下一步</span>
                        </div>
                      </div>
                    ) : paper.slug === "scaling-laws" ? (
                      <div className={styles.scalingHeroDiagram} role="img" aria-label="模型参数、训练数据、训练算力一起增加时，语言模型测试损失下降的规模定律示意">
                        <div className={styles.scalingHeroInputs}><span>模型参数 N <b>↑</b></span><span>训练数据 D <b>↑</b></span><span>训练算力 C <b>↑</b></span></div>
                        <ArrowRight size={23} aria-hidden="true" />
                        <div className={styles.scalingHeroResult}><strong>测试损失</strong><span>沿幂律曲线下降 ↘</span></div>
                      </div>
                    ) : paper.slug === "gpt-3" ? (
                      <div className={styles.gpt3HeroDiagram} role="img" aria-label="任务说明和少量示例组成输入上下文，交给参数不变的 GPT-3，模型继续预测答案。">
                        <div className={styles.gpt3Prompt}><small>输入上下文</small><span>任务说明</span><span>少量示例</span></div>
                        <ArrowRight className={styles.gpt3FlowArrow} size={20} aria-hidden="true" />
                        <div className={styles.gpt3Model}><strong>GPT-3</strong><small>参数不变</small></div>
                        <ArrowRight className={styles.gpt3FlowArrow} size={20} aria-hidden="true" />
                        <div className={styles.gpt3Output}><small>继续预测</small><strong>答案</strong></div>
                      </div>
                    ) : paper.slug === "vit" ? (
                      <ViTCardDiagram />
                    ) : (
                      <div className={styles.featuredSummary}><BookOpenText size={25} aria-hidden="true" /><p>{paper.summary}</p></div>
                    )}
                    <div className={styles.featuredBottom}>
                      <span>
                        {featuredCaptions[paper.slug] ?? "阅读图解，了解论文的关键思路"}
                        {paper.slug === "alexnet" && <span className={styles.mobileSwipeHint}>左右滑动查看完整流程</span>}
                      </span>
                      <Link href={paper.explainerUrl as Route}>进入图解 <ArrowUpRight size={16} aria-hidden="true" /></Link>
                    </div>
                  </article>
                ))}
              </div>
              {illustratedPapers.length > 1 && (
                <div className={styles.featuredControls}>
                  <span aria-live="polite">{activeFeaturedIndex + 1} / {illustratedPapers.length}</span>
                  <div>
                    <button type="button" aria-label="上一篇论文" disabled={activeFeaturedIndex === 0} onClick={() => showFeaturedPaper(activeFeaturedIndex - 1)}><ArrowLeft size={18} aria-hidden="true" /></button>
                    <button type="button" aria-label="下一篇论文" disabled={activeFeaturedIndex === illustratedPapers.length - 1} onClick={() => showFeaturedPaper(activeFeaturedIndex + 1)}><ArrowRight size={18} aria-hidden="true" /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={styles.librarySection} aria-labelledby="paper-list-title">
          <div className={styles.libraryToolbar}>
            <div><h2 id="paper-list-title">沿着论文，理解技术如何演进</h2></div>
            <p>已收录 <strong>{chronologicalPapers.length}</strong> 篇论文</p>
          </div>
          <div className={styles.filterBar} aria-label="按领域浏览论文">
            {paperTopics.map((topic) => (
              <button
                type="button"
                key={topic}
                className={`${styles.filterButton} ${filter === topic ? styles.filterActive : ""}`}
                onClick={() => setFilter(topic)}
                aria-pressed={filter === topic}
              >
                {topic}
              </button>
            ))}
          </div>
          <div className={styles.paperList}>
            {visiblePapers.map((paper) => (
              <article className={styles.paperRow} key={paper.slug}>
                <div className={styles.paperYear}>{paper.year}</div>
                <div className={styles.paperRowMain}>
                  <div className={styles.paperRowHeading}><h3>{paper.shortTitle}</h3><span>{paper.topic}</span></div>
                  <p className={styles.paperEnglishTitle}>{paper.title}</p>
                  <p className={styles.paperSummary}>{paper.summary}</p>
                </div>
                <div className={styles.paperRowVisual} aria-hidden="true"><BookOpenText size={18} /><span>{paper.explainerUrl ? "交互图解可阅读" : "图解待补充"}</span></div>
                <div className={styles.paperRowActions}>
                  {paper.explainerUrl ? (
                    <Link className={styles.rowPrimaryLink} href={paper.explainerUrl as Route}>阅读图解 <ArrowRight size={17} aria-hidden="true" /></Link>
                  ) : (
                    <a href={paper.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`阅读 ${paper.shortTitle} 原论文`}>
                      阅读原文 <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className={styles.catalogNote}>按论文首次公开年份排列；每篇的原论文链接均可直接访问。图解会陆续补充。</p>
        </section>
      </main>
      <footer className={styles.siteFooter}><span>© {new Date().getFullYear()} jiaxuan · 人工智能论文图解</span><Link href="/">返回个人网站</Link></footer>
    </div>
  );
}
