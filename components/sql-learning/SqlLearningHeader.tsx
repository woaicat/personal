"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import { CourseMenu } from "./CourseMenu";

interface SqlLearningHeaderProps {
  currentLessonId?: string;
  activePage?: "lesson" | "cheatsheet";
}

export function SqlLearningHeader({ currentLessonId, activePage }: SqlLearningHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark">S</span>
        <div>
          <div className="brand-name">面向产品经理的交互式SQL教学</div>
          <p>通过真实业务数据，练习产品分析 SQL。</p>
        </div>
      </div>
      <nav>
        <Link
          className={activePage === "cheatsheet" ? "current" : ""}
          href={"/sql-learning/sql-cheatsheet" as Route}
        >
          常用 SQL
        </Link>
        <div
          className="course-menu-trigger"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} type="button">▯ 课程目录</button>
          <CourseMenu currentLessonId={currentLessonId ?? ""} onSelect={() => setMenuOpen(false)} open={menuOpen} />
        </div>
      </nav>
    </header>
  );
}
