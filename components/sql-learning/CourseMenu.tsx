"use client";

import Link from "next/link";
import type { Route } from "next";
import { courseOutline } from "@/content/sql-learning/courseRegistry";

interface CourseMenuProps {
  open: boolean;
  currentLessonId: string;
  onSelect: () => void;
}

export function CourseMenu({ open, currentLessonId, onSelect }: CourseMenuProps) {
  if (!open) return null;

  return (
    <aside className="course-menu" aria-label="课程目录">
      <h2>所有课程</h2>
      {courseOutline.map((course) => course.lesson ? (
        <Link
          aria-current={course.id === currentLessonId ? "page" : undefined}
          className={course.id === currentLessonId ? "current" : ""}
          href={`/sql-learning/lesson/${course.id}` as Route}
          key={course.id}
          onClick={onSelect}
        >
          {course.label}
        </Link>
      ) : (
        <span className="planned" key={course.id}>
          {course.label}
          <small>即将推出</small>
        </span>
      ))}
    </aside>
  );
}
