"use client";

import { ArrowRight, ArrowUpRight, BookOpenText, Layers3 } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { chronologicalPapers, paperTopics, type PaperTopic } from "@/content/ai-papers/papers";
import PaperSiteHeader from "./PaperSiteHeader";
import styles from "./ai-papers.module.css";

type Filter = "全部" | PaperTopic;

export default function PaperLibraryPage() {
  const [filter, setFilter] = useState<Filter>("全部");
  const visiblePapers = useMemo(
    () => filter === "全部" ? chronologicalPapers : chronologicalPapers.filter((paper) => paper.topic === filter),
    [filter]
  );

  return (
    <div className={styles.paperSite}>
      <PaperSiteHeader />
      <main>
        <section className={styles.libraryHero} aria-labelledby="library-title">
          <div className={styles.libraryHeroInner}>
            <div className={styles.libraryIntro}>
              <p className={styles.eyebrow}>用图解看懂人工智能</p>
              <h1 id="library-title">人工智能<br /><span>论文图解</span></h1>
              <p className={styles.libraryDescription}>用可视化的方式，拆解重要的 AI 论文。先看懂它解决的问题，再亲手试一试关键机制。</p>
            </div>
            <div className={styles.featuredPaper}>
              <p className={styles.featuredTopline}>2012 · 视觉理解</p>
              <div className={styles.featuredHeading}>
                <div><h2>AlexNet</h2><p>ImageNet Classification with Deep Convolutional Neural Networks</p></div>
                <span className={styles.featuredBadge}><Layers3 size={18} aria-hidden="true" /> 5 + 3 层</span>
              </div>
              <p className={styles.featuredLead}>一张图片，怎样在神经网络里逐层变成可识别的特征？</p>
              <div className={styles.heroFlow} aria-label="AlexNet 的图像分类流程示意">
                <div className={styles.heroFlowImage} role="img" aria-label="橘白色猫的示例照片" />
                <ArrowRight size={20} aria-hidden="true" />
                <div className={styles.heroFlowBlock}><span>卷积 × 5</span><small>提取局部特征</small></div>
                <ArrowRight size={20} aria-hidden="true" />
                <div className={styles.heroFlowBlock}><span>全连接 × 3</span><small>组合并分类</small></div>
                <ArrowRight size={20} aria-hidden="true" />
                <div className={styles.heroFlowResult}><span>1000</span><small>个类别</small></div>
              </div>
              <div className={styles.featuredBottom}><span>结构示意 · 可在解读页逐层探索<span className={styles.mobileSwipeHint}>左右滑动查看完整流程</span></span><Link href="/ai-papers/alexnet">进入图解 <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
            </div>
          </div>
        </section>

        <section className={styles.librarySection} aria-labelledby="paper-list-title">
          <div className={styles.libraryToolbar}>
            <div><p className={styles.sectionEyebrow}>论文目录</p><h2 id="paper-list-title">沿着论文，理解技术如何演进</h2></div>
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
