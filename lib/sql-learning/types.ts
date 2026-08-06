export type SqlCell = string | number | null;

export interface QueryResult {
  columns: string[];
  rows: SqlCell[][];
}

export interface TaskEvaluation {
  passed: boolean;
  feedback: string;
}

export interface LessonTask {
  id: string;
  description: string;
  solution: string;
  /** 任务明确要求排序时，连同结果行顺序一起验收。 */
  resultOrderMatters?: boolean;
  /** 可选的补充语义校验；所有任务都会再与标准结果集做完整验收。 */
  evaluate?: (result: QueryResult) => TaskEvaluation;
}

export interface LessonReferenceTable {
  title: string;
  columns: string[];
  rows: string[][];
}

/** 一课中的可组合讲解模块，内容留在课程文件中，不与页面组件耦合。 */
export interface LessonSection {
  title: string;
  paragraphs: string[];
  codeLabel?: string;
  code?: string;
  table?: LessonReferenceTable;
  tip?: string;
}

/** 多表课程中展示给学习者参考的源表预览。查询仍使用原始 SQL 表名。 */
export interface LessonSourceTable {
  label: string;
  query: string;
}

export interface Lesson {
  id: string;
  number?: number;
  heading?: string;
  exerciseLabel?: string;
  title: string;
  shortTitle: string;
  intro: string[];
  syntaxLabel?: string;
  syntax?: string;
  sections?: LessonSection[];
  exerciseLead?: string;
  tasks?: LessonTask[];
  initialQuery?: string;
  datasetLabel?: string;
  sourceTables?: LessonSourceTable[];
  previousLesson?: LessonNavigation;
  nextLesson?: LessonNavigation;
}

export interface LessonNavigation {
  id: string;
  label: string;
}

export interface LessonProgress {
  completedTaskIds: string[];
  draftQuery: string;
}
