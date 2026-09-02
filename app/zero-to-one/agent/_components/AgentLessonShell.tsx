import { ArrowLeft, ArrowRight, BookOpen, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { AgentLessonPageDetail } from "../_content/lesson-page-details";
import styles from "./agent-course.module.css";

export function AgentLessonSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className={styles.lessonSection} id={id} aria-labelledby={`${id}-title`}><h2 id={`${id}-title`}>{title}</h2>{children}</section>;
}

export default function AgentLessonShell({ detail, children }: { detail: AgentLessonPageDetail; children: ReactNode }) {
  return <div className={`${styles.coursePage} ${styles.lessonPage}`}><div className={styles.lessonLayout}><main className={styles.lessonMain}>
    <Link className={styles.lessonBackLink} href="/zero-to-one/agent"><ArrowLeft aria-hidden="true" size={19} strokeWidth={1.8} />返回课程目录</Link>
    <header className={styles.lessonHeader}><h1>第 {Number(detail.id)} 课&nbsp;&nbsp;{detail.title}</h1><p className={styles.lessonSubtitle}>{detail.subtitle}</p><p className={styles.lessonMeta}>预计 {detail.duration}&nbsp;&nbsp;·&nbsp;&nbsp;系列：{detail.series}</p></header>
    <section className={styles.lessonKeyPoints}><h2><span className={styles.lessonBadge} aria-hidden="true"><Sparkles size={13} strokeWidth={2.4} /></span>本课要点</h2><ul>{detail.keyPoints.map((item) => <li key={item}>{item}</li>)}</ul></section>
    {children}
    <footer className={styles.lessonFooter}><div className={styles.lessonOutputSummary}><FileText aria-hidden="true" size={28} strokeWidth={1.6} /><div><h2>本课产出</h2><p>{detail.output}</p></div></div><Link className={styles.lessonNextButton} href={`/zero-to-one/agent/${detail.nextLesson.id}`}>进入下一课 <ArrowRight aria-hidden="true" size={17} /></Link></footer>
  </main><aside className={styles.lessonAside} aria-label="本课大纲"><div className={styles.lessonOutline}><h2>本课大纲</h2><nav>{detail.outline.map((item) => <a className={item.nested ? styles.lessonOutlineNested : undefined} href={`#${item.id}`} key={item.id}>{item.nested ? <span>{item.number}</span> : <strong>{item.number}</strong>}<span>{item.label}</span></a>)}</nav></div><div className={styles.lessonContinue}><h2><BookOpen aria-hidden="true" size={22} strokeWidth={1.8} /><span>继续学习</span></h2><Link href={`/zero-to-one/agent/${detail.nextLesson.id}`}><strong>下一课：{detail.nextLesson.title}</strong><ArrowRight aria-hidden="true" size={19} /><span>{detail.nextLesson.description}</span></Link></div></aside></div></div>;
}
