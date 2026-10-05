import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveUp } from "lucide-react";
import { chronologicalPapers, type Paper } from "@/content/ai-papers/papers";
import PaperSiteHeader from "../PaperSiteHeader";
import shared from "../ai-papers.module.css";
import styles from "./paper-detail.module.css";

export type PaperContentsItem = { id: string; title: string };

export default function PaperDetailLayout({
  paper,
  hero,
  contents = [],
  preview = false,
  children
}: {
  paper: Paper;
  hero: ReactNode;
  contents?: PaperContentsItem[];
  preview?: boolean;
  children: ReactNode;
}) {
  const readablePapers = chronologicalPapers.filter((item) => item.explainerUrl);
  const index = readablePapers.findIndex((item) => item.slug === paper.slug);
  const previous = index > 0 ? readablePapers[index - 1] : undefined;
  const next = index >= 0 ? readablePapers[index + 1] : undefined;

  return (
    <div className={`${shared.paperSite} ${styles.site}`} id="paper-top">
      <a className={styles.skipLink} href="#paper-content">跳到正文</a>
      <PaperSiteHeader onDetail />
      <main className={styles.main}>
        {preview ? <p className={styles.previewNote}><span />详情页样式预览<span className={styles.previewDivider}>/</span>示例内容节选</p> : null}
        {hero}
        {contents.length ? (
          <nav className={styles.contents} aria-label="本页内容">
            <span className={styles.contentsLabel}>本篇导读</span>
            {contents.map((item, itemIndex) => (
              <a key={item.id} href={`#${item.id}`}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item.title}</a>
            ))}
          </nav>
        ) : null}
        <article id="paper-content" className={styles.article} aria-label={`${paper.shortTitle}解读`} tabIndex={-1}>
          {children}
        </article>
        <aside className={styles.source} aria-label="论文原文">
          <div><span className={styles.kicker}>继续阅读</span><h2>回到论文，读读作者的原话。</h2><p>{paper.title} · {paper.year}</p></div>
          <a className={styles.sourceButton} href={paper.sourceUrl} target="_blank" rel="noopener noreferrer">阅读原论文 <ArrowUpRight size={17} aria-hidden="true" /></a>
        </aside>
        <nav className={styles.endNavigation} aria-label="论文翻页">
          {previous?.explainerUrl ? <Link href={{ pathname: previous.explainerUrl }}><ArrowLeft size={18} aria-hidden="true" /><span><small>上一篇</small>{previous.shortTitle}</span></Link> : <Link href="/ai-papers"><ArrowLeft size={18} aria-hidden="true" /><span><small>继续探索</small>返回全部论文</span></Link>}
          {next?.explainerUrl ? <Link href={{ pathname: next.explainerUrl }}><span><small>下一篇</small>{next.shortTitle}</span><ArrowRight size={18} aria-hidden="true" /></Link> : <Link href="/ai-papers"><span><small>继续探索</small>浏览论文目录</span><ArrowRight size={18} aria-hidden="true" /></Link>}
        </nav>
      </main>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} jiaxuan · 人工智能论文图解</span><a href="#paper-top">回到顶部 <MoveUp size={14} aria-hidden="true" /></a></footer>
    </div>
  );
}
