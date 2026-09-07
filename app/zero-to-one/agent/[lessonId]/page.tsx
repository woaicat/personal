import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgentLessonCompletionTracker from "@/components/agent-course/AgentLessonCompletionTracker";
import AgentLessonPage from "@/components/agent-course/AgentLessonPage";
import { allAgentLessons } from "@/content/agent-course/curriculum";
import { findAgentLesson } from "@/lib/agent-course/content";

type AgentLessonRouteProps = {
  params: Promise<{ lessonId: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return allAgentLessons.map((lesson) => ({ lessonId: lesson.id }));
}

export async function generateMetadata({ params }: AgentLessonRouteProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = findAgentLesson(lessonId);

  return {
    title: lesson ? `${lessonId === "02" ? "价值判断" : lesson.title} | 从 0 到 1 设计一个 Agent` : "从 0 到 1 设计一个 Agent"
  };
}

export default async function AgentLessonRoute({ params }: AgentLessonRouteProps) {
  const { lessonId } = await params;
  const lesson = findAgentLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <AgentLessonCompletionTracker lessonId={lesson.id}>
      <AgentLessonPage lesson={lesson} />
    </AgentLessonCompletionTracker>
  );
}
