import { readFileSync } from "node:fs";
import path from "node:path";
import type { AgentLessonPageDetail } from "@/lib/agent-course/types";
import AgentPracticeReader, { type PracticeChapter, type PracticeSection } from "@/components/agent-course/lessons/AgentPracticeReader";

const lessonCopy = readFileSync(
  path.join(process.cwd(), "docs/agent-course/lesson-practice-01-sales-agent-revised.md"),
  "utf8"
);

function parseLesson(markdown: string) {
  const chapters: PracticeChapter[] = [];
  const introduction: string[] = [];
  let title = "";
  let chapter: PracticeChapter | null = null;
  let chapterIntroduction: string[] = [];
  let section: PracticeSection | null = null;
  let sectionBody: string[] = [];

  const finishSection = () => {
    if (!chapter || !section) return;
    section.markdown = sectionBody.join("\n").trim();
    chapter.sections.push(section);
    section = null;
    sectionBody = [];
  };

  const finishChapter = () => {
    if (!chapter) return;
    const prelude = chapterIntroduction.join("\n").trim();
    if (chapter.sections.length === 0) {
      chapter.sections.push({ id: chapter.id, number: chapter.number, title: chapter.title, markdown: prelude });
    } else if (prelude) {
      chapter.sections[0].markdown = `${prelude}\n\n${chapter.sections[0].markdown}`;
    }
    chapters.push(chapter);
    chapter = null;
    chapterIntroduction = [];
  };

  for (const line of markdown.split(/\r?\n/)) {
    const mainTitle = line.match(/^# (.+)$/);
    const chapterHeading = line.match(/^## (\d+)、(.+)$/);
    const sectionHeading = line.match(/^### (\d+)\.(\d+)\s+(.+)$/);

    if (mainTitle && !title) {
      title = mainTitle[1].trim();
    } else if (chapterHeading) {
      finishSection();
      finishChapter();
      chapter = {
        id: `section-${chapterHeading[1]}`,
        number: chapterHeading[1],
        title: chapterHeading[2].trim(),
        sections: []
      };
    } else if (sectionHeading && chapter) {
      finishSection();
      section = {
        id: `section-${sectionHeading[1]}-${sectionHeading[2]}`,
        number: `${sectionHeading[1]}.${sectionHeading[2]}`,
        title: sectionHeading[3].trim(),
        markdown: ""
      };
    } else if (section) {
      sectionBody.push(line);
    } else if (chapter) {
      chapterIntroduction.push(line);
    } else {
      introduction.push(line);
    }
  }

  finishSection();
  finishChapter();

  return { title, introduction: introduction.join("\n").trim(), chapters };
}

const lesson = parseLesson(lessonCopy);

export default function AgentPracticeLessonPage({ detail }: { detail: AgentLessonPageDetail }) {
  return <AgentPracticeReader detail={detail} title={lesson.title} introduction={lesson.introduction} chapters={lesson.chapters} />;
}
