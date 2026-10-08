"use client";

import { useState } from "react";
import { practiceCaseTags, type PracticeCase, type PracticeCaseTag } from "@/content/practice-cases/cases";
import CaseArtwork from "./CaseArtwork";
import styles from "./practice-cases.module.css";

export default function PracticeCaseCatalog({ cases }: { cases: readonly PracticeCase[] }) {
  const [activeTag, setActiveTag] = useState<PracticeCaseTag | null>(null);
  const tags = practiceCaseTags.filter((tag) => cases.some((item) => item.tags.includes(tag)));
  const visibleCases = activeTag ? cases.filter((item) => item.tags.includes(activeTag)) : cases;

  return (
    <section className={styles.catalog} aria-labelledby="catalog-title">
      <div className={styles.catalogHead}>
        <h2 id="catalog-title">按主题探索</h2>
        <span className={styles.count} aria-live="polite">{visibleCases.length} 篇案例</span>
      </div>
      <div className={styles.topics} role="group" aria-label="按主题筛选">
        <button type="button" className={activeTag === null ? styles.active : undefined} onClick={() => setActiveTag(null)} aria-pressed={activeTag === null}>全部案例</button>
        {tags.map((tag) => <button type="button" key={tag} className={activeTag === tag ? styles.active : undefined} onClick={() => setActiveTag(tag)} aria-pressed={activeTag === tag}>{tag}</button>)}
      </div>
      <div className={styles.caseGrid}>
        {visibleCases.map((item) => <article className={styles.case} key={item.id}>
          <a className={styles.caseArt} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`阅读${item.title}，在新标签页打开`}><CaseArtwork kind={item.artwork} /></a>
          <div className={styles.caseBody}>
            <p className={styles.caseKicker}>{item.tags.join(" / ")}</p>
            <h3><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></h3>
            <p className={styles.caseSummary}>{item.summary}</p>
            <div className={styles.caseFoot}><span>{item.source}</span><i aria-hidden="true" /><span>{item.format}</span><a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`阅读${item.title}，在新标签页打开`}>↗</a></div>
          </div>
        </article>)}
      </div>
    </section>
  );
}
