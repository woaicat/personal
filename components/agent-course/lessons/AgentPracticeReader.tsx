"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, List, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import styles from "@/components/agent-course/styles/agent-sales-practice.module.css";

export type PracticeSection = {
  id: string;
  number: string;
  title: string;
  markdown: string;
};

export type PracticeChapter = {
  id: string;
  number: string;
  title: string;
  sections: PracticeSection[];
};

type ReadingPage = PracticeSection & {
  chapter: PracticeChapter | null;
};

function LessonMarkdown({ markdown }: { markdown: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    a: ({ href, children }) => <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}>{children}</a>
  }}>{markdown}</ReactMarkdown>;
}

export default function AgentPracticeReader({
  detail,
  title,
  introduction,
  chapters
}: {
  detail: AgentLessonPageDetail;
  title: string;
  introduction: string;
  chapters: PracticeChapter[];
}) {
  const pages = useMemo<ReadingPage[]>(() => [
    { id: "overview", number: "", title, markdown: introduction, chapter: null },
    ...chapters.flatMap((chapter) => chapter.sections.map((section) => ({ ...section, chapter })))
  ], [chapters, introduction, title]);
  const [currentId, setCurrentId] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const directoryRef = useRef<HTMLDivElement>(null);
  const mobileDirectoryRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useCallback((id: string) => {
    if (!pages.some((page) => page.id === id)) return;
    if (id === currentId) {
      dialogRef.current?.close();
      setMobileOpen(false);
      return;
    }
    const suffix = id === "overview" ? "" : `#${id}`;
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${suffix}`);
    setCurrentId(id);
    dialogRef.current?.close();
    setMobileOpen(false);
  }, [currentId, pages]);

  useEffect(() => {
    const syncFromUrl = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const chapter = chapters.find((item) => item.id === id);
      setCurrentId(pages.some((page) => page.id === id) ? id : chapter?.sections[0].id ?? "overview");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hashchange", syncFromUrl);
    };
  }, [chapters, pages]);

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
    const directory = directoryRef.current;
    const chapterLink = directory?.querySelector<HTMLElement>('[data-current-chapter="true"]');
    if (directory && chapterLink) {
      const listRect = directory.getBoundingClientRect();
      const chapterRect = chapterLink.getBoundingClientRect();
      directory.scrollTop += chapterRect.top - listRect.top - 12;
    } else if (directory) {
      directory.scrollTop = 0;
    }
  }, [currentId]);

  useLayoutEffect(() => {
    if (!mobileOpen) return;
    const directory = mobileDirectoryRef.current;
    if (!directory) return;
    const current = directory.querySelector<HTMLElement>('[aria-current="location"]');
    if (!current) {
      directory.scrollTop = 0;
      return;
    }
    const chapter = current.closest<HTMLElement>('[data-chapter]')?.querySelector<HTMLElement>('[data-chapter-link]');
    const target = chapter ?? current;
    const listRect = directory.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    directory.scrollTop += targetRect.top - listRect.top - 12;
  }, [mobileOpen, currentId]);

  const currentIndex = Math.max(0, pages.findIndex((page) => page.id === currentId));
  const page = pages[currentIndex];
  const previous = pages[currentIndex - 1];
  const next = pages[currentIndex + 1];

  const directory = (mobile = false) => <nav className={styles.directoryList} aria-label="课程章节" ref={mobile ? mobileDirectoryRef : undefined}>
    <Link
      className={`${styles.overviewLink} ${currentId === "overview" ? styles.overviewCurrent : ""}`}
      href="/zero-to-one/agent/practice-01"
      aria-current={currentId === "overview" ? "location" : undefined}
      onClick={(event) => { event.preventDefault(); navigate("overview"); }}
    ><BookOpen size={16} aria-hidden="true" /><strong>前言</strong></Link>
    {chapters.map((chapter) => {
      const first = chapter.sections[0];
      const isCurrentChapter = page.chapter?.id === chapter.id;
      return <div className={styles.chapterGroup} key={chapter.id} data-chapter={chapter.id}>
        <a
          className={`${styles.chapterLink} ${isCurrentChapter ? styles.chapterCurrent : ""}`}
          href={`#${first.id}`}
          data-current-chapter={isCurrentChapter ? "true" : undefined}
          data-chapter-link
          aria-current={first.id === chapter.id && currentId === first.id ? "location" : undefined}
          onClick={(event) => { event.preventDefault(); navigate(first.id); }}
        ><span>{chapter.number.padStart(2, "0")}</span><strong>{chapter.title}</strong></a>
        {first.id !== chapter.id && chapter.sections.map((section) => <a
          className={`${styles.sectionLink} ${currentId === section.id ? styles.sectionCurrent : ""}`}
          href={`#${section.id}`}
          key={section.id}
          aria-current={currentId === section.id ? "location" : undefined}
          onClick={(event) => { event.preventDefault(); navigate(section.id); }}
        ><span>{section.number}</span><span>{section.title}</span></a>)}
      </div>;
    })}
  </nav>;

  return <div className={styles.page}>
    <header className={styles.topbar}>
      <Link className={styles.back} href="/zero-to-one/agent"><ArrowLeft size={18} aria-hidden="true" />返回课程列表</Link>
      <span className={styles.topTag}>实战练习 / 01</span>
      <button className={styles.courseTitle} type="button" onClick={() => navigate("overview")}>{detail.title}</button>
      <button className={styles.mobileMenu} type="button" aria-label="打开本课目录" aria-controls="practice-directory" aria-expanded={mobileOpen} onClick={() => { dialogRef.current?.showModal(); setMobileOpen(true); }}><List size={21} aria-hidden="true" />本课目录</button>
    </header>

    <div className={styles.workspace}>
      <main className={styles.reader}>
        <div className={styles.readerHeading}>
          <span className={styles.eyebrow}>{page.chapter ? `第 ${page.chapter.number} 章 · ${page.chapter.title}` : "实战练习 / 01"}</span>
          <h1>{page.chapter && page.id !== page.chapter.id ? `${page.number} ${page.title}` : page.title}</h1>
          {currentId === "overview" && <p>{detail.subtitle}</p>}
        </div>
        <div className={styles.readerScroll} ref={scrollRef} tabIndex={0} aria-label={`${page.title}正文`}>
          <article className={styles.article} key={currentId}>
            {currentId === "overview" && detail.keyPoints.length > 0 && <section className={styles.keyPoints} aria-label="本课要点"><h2>本课要点</h2><ul>{detail.keyPoints.map((point) => <li key={point}>{point}</li>)}</ul></section>}
            <LessonMarkdown markdown={page.markdown} />
            {currentIndex === pages.length - 1 && detail.output && <section className={styles.output}><h2>本课产出</h2><p>{detail.output}</p></section>}
          </article>
        </div>
        <footer className={styles.readerFooter}>
          <div className={styles.footerLeft}>{previous ? <button type="button" className={styles.previous} aria-label={`上一节：${previous.title}`} onClick={() => navigate(previous.id)}><span className={styles.fullLabel}>← {previous.title}</span><span className={styles.shortLabel}>← 上一节</span></button> : <span>预计 {detail.duration}</span>}</div>
          {next ? <button type="button" className={styles.next} data-action="next-section" aria-label={currentIndex === 0 ? "开始学习" : `下一节：${next.title}`} onClick={() => navigate(next.id)}><span className={styles.fullLabel}>{currentIndex === 0 ? "开始学习" : `下一节：${next.title}`}</span><span className={styles.shortLabel}>{currentIndex === 0 ? "开始学习" : "下一节"}</span><ArrowRight size={16} aria-hidden="true" /></button> : <Link className={styles.next} href="/zero-to-one/agent"><span>返回课程列表</span><ArrowRight size={16} aria-hidden="true" /></Link>}
        </footer>
      </main>

      <aside className={styles.directory} aria-label="课程目录"><div className={styles.directoryHeading}><h2>课程目录</h2></div><div className={styles.directoryScroll} ref={directoryRef}>{directory()}</div></aside>
    </div>

    <dialog className={styles.mobileDirectory} id="practice-directory" ref={dialogRef} onClose={() => setMobileOpen(false)}>
      <div className={styles.mobileDirectoryHeading}><h2>课程目录</h2><button type="button" aria-label="关闭课程目录" onClick={() => dialogRef.current?.close()}><X size={20} aria-hidden="true" /></button></div>
      {directory(true)}
    </dialog>
  </div>;
}
