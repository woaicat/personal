import { allAgentLessons } from "@/content/agent-course/curriculum";

export function findAgentLesson(lessonId: string) {
  return allAgentLessons.find((lesson) => lesson.id === lessonId);
}
