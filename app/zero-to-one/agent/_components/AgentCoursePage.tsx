"use client";

import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { agentCurriculum, allAgentLessons } from "../_content/curriculum";
import {
  AGENT_LAST_LESSON_KEY,
  AGENT_PROGRESS_KEY,
  getLessonStatus,
  getStatusLabel,
  type LessonProgressMap
} from "../_content/progress";
import styles from "./agent-course.module.css";

const firstLessonId = allAgentLessons[0]?.id ?? "01";

export function getNextLessonId(progress: LessonProgressMap, lastLessonId: string | null) {
  if (lastLessonId && getLessonStatus(progress, lastLessonId) !== "completed") {
    return lastLessonId;
  }

  return allAgentLessons.find((lesson) => getLessonStatus(progress, lesson.id) !== "completed")?.id ?? firstLessonId;
}

export default function AgentCoursePage() {
  const [progress, setProgress] = useState<LessonProgressMap>({});
  const [lastLessonId, setLastLessonId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedProgress = window.localStorage.getItem(AGENT_PROGRESS_KEY);
      const savedLastLesson = window.localStorage.getItem(AGENT_LAST_LESSON_KEY);

      if (savedProgress) {
        setProgress(JSON.parse(savedProgress) as LessonProgressMap);
      }
      setLastLessonId(savedLastLesson);
    } catch {
      setProgress({});
      setLastLessonId(null);
    }
  }, []);

  const completedCount = useMemo(
    () => allAgentLessons.filter((lesson) => getLessonStatus(progress, lesson.id) === "completed").length,
    [progress]
  );
  const progressPercent = Math.round((completedCount / allAgentLessons.length) * 100);
  const nextLessonId = getNextLessonId(progress, lastLessonId);

  return (
    <div className={styles.coursePage}>
      <header className={styles.courseHeader}>
        <div className={styles.courseHeaderInner}>
          <Link className={styles.breadcrumb} href="/" aria-label="返回 JiaXuan 个人作品集首页">
            jiaxuan <span aria-hidden="true">·</span> 从 0 到 1
          </Link>
          <nav className={styles.courseNav} aria-label="课程导航">
            <Link className={styles.courseNavActive} href="/zero-to-one/agent" aria-current="page">
              Agent
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="agent-course-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>从 0 到 1 系列</p>
              <h1 id="agent-course-title">从 0 到 1 设计一个 Agent</h1>
              <p className={styles.heroDescription}>用一个虚拟电商客服案例，完成需求判断、智能体设计、评测与监控。</p>
              <div className={styles.progressActionRow}>
                <a className={styles.primaryButton} href={`/zero-to-one/agent/${nextLessonId}`}>
                  {completedCount > 0 ? "继续学习" : "开始学习"}
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2.3} />
                </a>
                <span className={styles.progressCount}>已完成 {completedCount} / {allAgentLessons.length} 课</span>
              </div>
              <div className={styles.progressLine} aria-label={`课程进度 ${progressPercent}%`}>
                <span style={{ width: `${progressPercent}%` }} />
              </div>
              <div className={styles.progressPercent}>{progressPercent}%</div>
              <div className={styles.heroNotes}>
                <p>
                  <CheckCircle2 aria-hidden="true" size={16} />
                  完成后你将得到：一份可评审的电商客服 Agent 设计方案包
                </p>
                <p>
                  <Info aria-hidden="true" size={16} />
                  课程案例：虚拟电商平台客服 Agent（仅用于教学）
                </p>
              </div>
            </div>
            <div className={styles.heroVisualSpace} aria-hidden="true" />
          </div>
        </section>

        <section className={styles.curriculum} aria-labelledby="curriculum-title">
          <h2 id="curriculum-title" className={styles.srOnly}>
            课程列表
          </h2>
          {agentCurriculum.map((stage) => (
            <section
              className={`${styles.stage} ${styles[`stage-${stage.id}`]}`}
              key={stage.id}
              aria-labelledby={`${stage.id}-title`}
            >
              <div className={styles.stageIntro}>
                <p className={styles.stageLabel}>{stage.label}</p>
                <h2 id={`${stage.id}-title`}>{stage.title}</h2>
                <p>{stage.description}</p>
              </div>
              <div className={styles.lessonList}>
                {stage.lessons.map((lesson) => {
                  const status = getLessonStatus(progress, lesson.id);

                  return (
                    <a className={styles.lessonRow} href={`/zero-to-one/agent/${lesson.id}`} key={lesson.id}>
                      <span className={styles.lessonNumber}>{lesson.id}</span>
                      <span className={styles.lessonCopy}>
                        <strong>{lesson.title}</strong>
                        <span>{lesson.summary}</span>
                      </span>
                      <span className={styles.lessonOutput}>本课产出：{lesson.output}</span>
                      <span className={styles.lessonVisualSpace} aria-hidden="true" />
                      <span className={`${styles.lessonStatus} ${styles[`status-${status}`]}`}>{getStatusLabel(status)}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          ))}
        </section>

        <section className={styles.courseDisclaimer}>
          <Info aria-hidden="true" size={17} />
          <p>本课程使用虚拟教学案例，不接入真实平台数据、账号或客服系统。</p>
        </section>
      </main>
    </div>
  );
}
