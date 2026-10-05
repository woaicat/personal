import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Paper } from "@/content/ai-papers/papers";
import styles from "./paper-detail.module.css";

export default function PaperHero({ paper, authors, publication, description = paper.summary, visual }: {
  paper: Paper;
  authors: string;
  publication: string;
  description?: string;
  visual?: ReactNode;
}) {
  return (
    <header className={styles.hero} data-visual={visual ? "true" : undefined}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>{paper.year}<span aria-hidden="true"> / </span>{paper.topic}</p>
        <h1>{paper.shortTitle}</h1>
        <p className={styles.originalTitle}>{paper.title}</p>
        <p className={styles.deck}>{description}</p>
        <ul className={styles.meta} aria-label="论文信息"><li>{authors}</li><li>{publication}</li></ul>
        <a className={styles.heroSource} href={paper.sourceUrl} target="_blank" rel="noopener noreferrer">查看论文原文 <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      {visual ? <div className={styles.heroVisual}>{visual}</div> : null}
    </header>
  );
}
