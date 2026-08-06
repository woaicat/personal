import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonPage } from "@/components/sql-learning/LessonPage";
import { getLessonById, implementedLessons } from "@/content/sql-learning/courseRegistry";

type LessonRouteProps = {
  params: Promise<{ lessonId: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return implementedLessons.map((lesson) => ({ lessonId: lesson.id }));
}

export async function generateMetadata({ params }: LessonRouteProps): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return { title: "SQL 课程" };
  }

  return {
    title: lesson.number
      ? `SQL 课程 ${lesson.number}：${lesson.title}`
      : `${lesson.title} | 面向产品经理的交互式SQL教学`,
    description: lesson.intro[0]
  };
}

export default async function SqlLessonRoute({ params }: LessonRouteProps) {
  const { lessonId } = await params;

  if (!getLessonById(lessonId)) {
    notFound();
  }

  return <LessonPage lessonId={lessonId} />;
}
