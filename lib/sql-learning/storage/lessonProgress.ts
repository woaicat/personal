import type { LessonProgress } from "@/lib/sql-learning/types";

// v2 起采用“完整结果集”判题，旧版本可能存在误判完成状态，因此不复用旧进度。
const storagePrefix = "sql-path:v2:lesson-progress:";

const emptyProgress: LessonProgress = {
  completedTaskIds: [],
  draftQuery: "",
};

export function readLessonProgress(lessonId: string): LessonProgress {
  try {
    const value = window.localStorage.getItem(`${storagePrefix}${lessonId}`);
    if (!value) return emptyProgress;
    const parsed = JSON.parse(value) as Partial<LessonProgress>;
    return {
      completedTaskIds: Array.isArray(parsed.completedTaskIds) ? parsed.completedTaskIds : [],
      draftQuery: typeof parsed.draftQuery === "string" ? parsed.draftQuery : "",
    };
  } catch {
    return emptyProgress;
  }
}

export function writeLessonProgress(lessonId: string, progress: LessonProgress) {
  window.localStorage.setItem(`${storagePrefix}${lessonId}`, JSON.stringify(progress));
}

/** 仅清除当前课程的草稿与任务完成状态，不影响其他课程。 */
export function clearLessonProgress(lessonId: string) {
  try {
    window.localStorage.removeItem(`${storagePrefix}${lessonId}`);
  } catch {
    // 浏览器禁止本地存储时，界面状态仍会在本次会话内重置。
  }
}
