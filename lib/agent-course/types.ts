export type LessonStatus = "not-started" | "in-progress" | "completed";

export interface AgentLesson {
  id: string;
  title: string;
  summary: string;
  output: string;
  whyItMatters: string;
  caseApplication: string;
}

export interface AgentStage {
  id: string;
  label: string;
  title: string;
  description: string;
  lessons: AgentLesson[];
}

export type LessonOutlineItem = {
  id: string;
  number: string;
  label: string;
  nested?: boolean;
};

export type AgentLessonPageDetail = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  series: string;
  keyPoints: string[];
  outline: LessonOutlineItem[];
  output: string;
  nextLesson: {
    id: string;
    title: string;
    description: string;
  };
};
