"use client";

import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { agentCurriculum, allAgentLessons, type AgentLesson, type LessonStatus } from "../_content/curriculum";
import {
  AGENT_LAST_LESSON_KEY,
  AGENT_PROGRESS_KEY,
  getLessonStatus,
  type LessonProgressMap
} from "../_content/progress";
import styles from "./agent-course.module.css";

interface AgentLessonPageProps {
  lesson: AgentLesson;
}

function saveProgress(progress: LessonProgressMap) {
  window.localStorage.setItem(AGENT_PROGRESS_KEY, JSON.stringify(progress));
}

export default function AgentLessonPage({ lesson }: AgentLessonPageProps) {
  const [status, setStatus] = useState<LessonStatus>("not-started");
  const lessonIndex = allAgentLessons.findIndex((item) => item.id === lesson.id);
  const stage = useMemo(
    () => agentCurriculum.find((item) => item.lessons.some((itemLesson) => itemLesson.id === lesson.id)),
    [lesson.id]
  );
  const previousLesson = allAgentLessons[lessonIndex - 1];
  const nextLesson = allAgentLessons[lessonIndex + 1];

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(AGENT_PROGRESS_KEY);
      const progress = stored ? (JSON.parse(stored) as LessonProgressMap) : {};
      const currentStatus = getLessonStatus(progress, lesson.id);

      if (currentStatus !== "completed") {
        progress[lesson.id] = "in-progress";
        saveProgress(progress);
        setStatus("in-progress");
      } else {
        setStatus("completed");
      }
      window.localStorage.setItem(AGENT_LAST_LESSON_KEY, lesson.id);
    } catch {
      setStatus("in-progress");
    }
  }, [lesson.id]);

  const handleComplete = () => {
    try {
      const stored = window.localStorage.getItem(AGENT_PROGRESS_KEY);
      const progress = stored ? (JSON.parse(stored) as LessonProgressMap) : {};
      progress[lesson.id] = "completed";
      saveProgress(progress);
      setStatus("completed");
    } catch {
      setStatus("completed");
    }
  };

  return (
    <div className={styles.coursePage}>
      <header className={styles.courseHeader}>
        <div className={styles.courseHeaderInner}>
          <Link className={styles.breadcrumb} href="/" aria-label="返回 JiaXuan 个人作品集首页">
            jiaxuan <span aria-hidden="true">·</span> 从 0 到 1
          </Link>
          <nav className={styles.courseNav} aria-label="课程导航">
            <Link className={styles.courseNavActive} href="/zero-to-one/agent">
              Agent
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.detailMain}>
        <Link className={styles.backLink} href="/zero-to-one/agent">
          <ArrowLeft aria-hidden="true" size={15} /> 返回课程目录
        </Link>

        <div className={styles.detailHeader}>
          <span className={styles.detailNumber}>{lesson.id} / 14</span>
          <div>
            <p className={styles.eyebrow}>{stage?.label} · {stage?.title}</p>
            <h1>{lesson.title}</h1>
            <p className={styles.detailLead}>{lesson.summary}</p>
          </div>
        </div>

        <div className={styles.detailLayout}>
          <article className={styles.detailArticle}>
            <section id="why">
              <h2>为什么要做</h2>
              <p>{lesson.whyItMatters}</p>
            </section>
            <section id="case">
              <h2>应用到虚拟电商客服 Agent</h2>
              <div className={styles.caseCard}>
                <strong>案例推进</strong>
                <p>{lesson.caseApplication}</p>
              </div>
            </section>
            <section id="output">
              <h2>本课产出</h2>
              <div className={styles.outputCard}>
                <strong>{lesson.output}</strong>
                <p>完成这一课后，把结论沉淀为可复用的方案卡，并带入下一课继续推进。</p>
              </div>
            </section>
            <div className={styles.detailActions}>
              <button
                className={`${styles.completeButton}${status === "completed" ? ` ${styles.completeButtonCompleted}` : ""}`}
                type="button"
                onClick={handleComplete}
              >
                <CheckCircle2 aria-hidden="true" size={16} />
                {status === "completed" ? "已标记完成" : "标记完成"}
              </button>
              <nav className={styles.lessonNavigation} aria-label="课程前后导航">
                {previousLesson ? (
                  <a href={`/zero-to-one/agent/${previousLesson.id}`}>
                    <ArrowLeft aria-hidden="true" size={14} /> 上一课
                  </a>
                ) : null}
                {nextLesson ? (
                  <a href={`/zero-to-one/agent/${nextLesson.id}`}>
                    下一课 <ArrowRight aria-hidden="true" size={14} />
                  </a>
                ) : null}
              </nav>
            </div>
          </article>

          <aside className={styles.detailAside} aria-label="本章目录">
            <p>本章目录</p>
            <a href="#why">为什么要做</a>
            <a href="#case">案例推进</a>
            <a href="#output">本课产出</a>
          </aside>
        </div>
      </main>
    </div>
  );
}
