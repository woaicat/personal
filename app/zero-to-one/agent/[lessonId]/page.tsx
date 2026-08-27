import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgentLessonPage from "../_components/AgentLessonPage";
import { allAgentLessons, findAgentLesson } from "../_content/curriculum";

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
    title: lesson ? `${lesson.title} | 从 0 到 1 设计一个 Agent` : "从 0 到 1 设计一个 Agent"
  };
}

export default async function AgentLessonRoute({ params }: AgentLessonRouteProps) {
  const { lessonId } = await params;
  const lesson = findAgentLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  return <AgentLessonPage lesson={lesson} />;
}
