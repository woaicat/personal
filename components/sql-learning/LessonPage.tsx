"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useState } from "react";
import { CourseMenu } from "./CourseMenu";
import { LessonArticle } from "./LessonArticle";
import { SqlWorkspace } from "./SqlWorkspace";
import { getLessonById, implementedLessons } from "@/content/sql-learning/courseRegistry";
import type { Lesson } from "@/lib/sql-learning/types";

export function LessonPage({ lessonId }: { lessonId: string }) {
  const lesson = getLessonById(lessonId) ?? implementedLessons[0] as Lesson;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = lesson.number
      ? `SQL 课程 ${lesson.number}：${lesson.title} | 面向产品经理的交互式SQL教学`
      : `${lesson.title} | 面向产品经理的交互式SQL教学`;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [lesson.id, lesson.number, lesson.title]);

  return (
    <main className="site-shell" key={lesson.id}>
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div>
            <div className="brand-name">面向产品经理的交互式SQL教学</div>
            <p>通过真实业务数据，练习产品分析 SQL。</p>
          </div>
        </div>
        <nav>
          <div
            className="course-menu-trigger"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} type="button">▯ 课程目录</button>
            <CourseMenu currentLessonId={lesson.id} onSelect={() => setMenuOpen(false)} open={menuOpen} />
          </div>
        </nav>
      </header>
      <div className="lesson-content">
        <LessonArticle lesson={lesson} />
        {lesson.tasks && lesson.initialQuery && lesson.exerciseLead && <SqlWorkspace key={lesson.id} lesson={lesson} />}
        <footer className="lesson-footer">
          {lesson.previousLesson ? <Link href={`/sql-learning/lesson/${lesson.previousLesson.id}` as Route}>上一课 – {lesson.previousLesson.label}</Link> : <span />}
          {lesson.nextLesson ? <Link href={`/sql-learning/lesson/${lesson.nextLesson.id}` as Route}>下一课 – {lesson.nextLesson.label}</Link> : <span />}
          <span>数据仅保存在当前浏览器中</span>
        </footer>
      </div>
    </main>
  );
}
