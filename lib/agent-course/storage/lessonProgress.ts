import type { LessonStatus } from "@/lib/agent-course/types";

export const AGENT_PROGRESS_KEY = "zero-to-one-agent-progress-v3";
export const AGENT_LAST_LESSON_KEY = "zero-to-one-agent-last-lesson-v3";

const LEGACY_PROGRESS_KEY = "zero-to-one-agent-progress-v2";
const LEGACY_LAST_LESSON_KEY = "zero-to-one-agent-last-lesson-v2";

export type LessonProgressMap = Record<string, LessonStatus>;

function parseProgress(value: string | null): LessonProgressMap {
  if (!value) return {};

  const parsed = JSON.parse(value);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? parsed as LessonProgressMap
    : {};
}

export function readLessonProgress(): { progress: LessonProgressMap; lastLessonId: string | null } {
  if (typeof window === "undefined") return { progress: {}, lastLessonId: null };

  try {
    const savedProgress = window.localStorage.getItem(AGENT_PROGRESS_KEY);
    if (savedProgress !== null) {
      return {
        progress: parseProgress(savedProgress),
        lastLessonId: window.localStorage.getItem(AGENT_LAST_LESSON_KEY)
      };
    }

    const progress = parseProgress(window.localStorage.getItem(LEGACY_PROGRESS_KEY));
    // Keep lesson 21 as 企业 Agent; the practice case has its own ID.
    const lastLessonId = window.localStorage.getItem(LEGACY_LAST_LESSON_KEY);
    window.localStorage.setItem(AGENT_PROGRESS_KEY, JSON.stringify(progress));
    if (lastLessonId) window.localStorage.setItem(AGENT_LAST_LESSON_KEY, lastLessonId);

    return { progress, lastLessonId };
  } catch {
    return { progress: {}, lastLessonId: null };
  }
}

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
    const { progress } = readLessonProgress();

    window.localStorage.setItem(
      AGENT_PROGRESS_KEY,
      JSON.stringify({ ...progress, [lessonId]: "completed" })
    );
    window.localStorage.setItem(AGENT_LAST_LESSON_KEY, lessonId);
  } catch {
    // Progress is an enhancement; a restricted or unavailable localStorage should not block the lesson.
  }
}
