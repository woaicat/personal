import type { LessonStatus } from "./curriculum";

export const AGENT_PROGRESS_KEY = "zero-to-one-agent-progress-v2";
export const AGENT_LAST_LESSON_KEY = "zero-to-one-agent-last-lesson-v2";

export type LessonProgressMap = Record<string, LessonStatus>;

export function getLessonStatus(progress: LessonProgressMap, lessonId: string): LessonStatus {
  return progress[lessonId] ?? "not-started";
}

export function getStatusLabel(status: LessonStatus) {
  if (status === "completed") return "已完成";
  if (status === "in-progress") return "学习中";
  return "未开始";
}

export function markLessonCompleted(lessonId: string) {
  if (typeof window === "undefined") return;

  try {
    const savedProgress = window.localStorage.getItem(AGENT_PROGRESS_KEY);
    const parsedProgress = savedProgress ? JSON.parse(savedProgress) : {};
    const progress = parsedProgress && typeof parsedProgress === "object" && !Array.isArray(parsedProgress)
      ? parsedProgress as LessonProgressMap
      : {};

    window.localStorage.setItem(
      AGENT_PROGRESS_KEY,
      JSON.stringify({ ...progress, [lessonId]: "completed" })
    );
    window.localStorage.setItem(AGENT_LAST_LESSON_KEY, lessonId);
  } catch {
    // Progress is an enhancement; a restricted or unavailable localStorage should not block the lesson.
  }
}
