import type { LessonStatus } from "./curriculum";

export const AGENT_PROGRESS_KEY = "zero-to-one-agent-progress-v1";
export const AGENT_LAST_LESSON_KEY = "zero-to-one-agent-last-lesson-v1";

export type LessonProgressMap = Record<string, LessonStatus>;

export function getLessonStatus(progress: LessonProgressMap, lessonId: string): LessonStatus {
  return progress[lessonId] ?? "not-started";
}

export function getStatusLabel(status: LessonStatus) {
  if (status === "completed") return "已完成";
  if (status === "in-progress") return "学习中";
  return "未开始";
}
