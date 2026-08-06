import { caseWhenLesson } from "./lessons/caseWhenLesson";
import { aggregatesPartOneLesson } from "./lessons/aggregatesPartOneLesson";
import { aggregatesPartTwoLesson } from "./lessons/aggregatesPartTwoLesson";
import { executionOrderLesson } from "./lessons/executionOrderLesson";
import { introductionLesson } from "./lessons/introductionLesson";
import { innerJoinLesson } from "./lessons/innerJoinLesson";
import { numericFiltersLesson } from "./lessons/numericFiltersLesson";
import { nullValuesLesson } from "./lessons/nullValuesLesson";
import { outerJoinLesson } from "./lessons/outerJoinLesson";
import { selectLesson } from "./lessons/selectLesson";
import { selectReviewLesson } from "./lessons/selectReviewLesson";
import { sortingLesson } from "./lessons/sortingLesson";
import { textFiltersLesson } from "./lessons/textFiltersLesson";
import { expressionLesson } from "./lessons/expressionLesson";
import { dateRangesLesson } from "./lessons/dateRangesLesson";
import { dateGranularityLesson } from "./lessons/dateGranularityLesson";
import { cteLesson } from "./lessons/cteLesson";
import { windowFunctionsLesson } from "./lessons/windowFunctionsLesson";
import { windowDeduplicationLesson } from "./lessons/windowDeduplicationLesson";
import { conversionFunnelLesson } from "./lessons/conversionFunnelLesson";
import { retentionAnalysisLesson } from "./lessons/retentionAnalysisLesson";
import { productAnalysisPracticeLesson } from "./lessons/productAnalysisPracticeLesson";
import type { Lesson } from "@/lib/sql-learning/types";

export interface CourseOutlineItem {
  id: string;
  label: string;
  lesson?: Lesson;
}

// 课程目录与实际课程内容分离：先展示学习路径，开发某一课时再为它挂载 lesson 文件。
export const courseOutline: CourseOutlineItem[] = [
  { id: introductionLesson.id, label: "SQL 入门", lesson: introductionLesson },
  { id: selectLesson.id, label: "SQL 课程 1：SELECT 查询入门", lesson: selectLesson },
  { id: numericFiltersLesson.id, label: "SQL 课程 2：带约束的查询（第 1 部分）", lesson: numericFiltersLesson },
  { id: textFiltersLesson.id, label: "SQL 课程 3：带约束的查询（第 2 部分）", lesson: textFiltersLesson },
  { id: sortingLesson.id, label: "SQL 课程 4：筛选和排序查询结果", lesson: sortingLesson },
  { id: selectReviewLesson.id, label: "SQL 复习：简单的 SELECT 查询", lesson: selectReviewLesson },
  { id: innerJoinLesson.id, label: "SQL 课程 6：使用 JOIN 进行多表查询", lesson: innerJoinLesson },
  { id: outerJoinLesson.id, label: "SQL 课程 7：外连接", lesson: outerJoinLesson },
  { id: nullValuesLesson.id, label: "SQL 课程 8：关于 NULL 值的简要说明", lesson: nullValuesLesson },
  { id: expressionLesson.id, label: "SQL 课程 9：带表达式的查询", lesson: expressionLesson },
  { id: aggregatesPartOneLesson.id, label: "SQL 课程 10：带聚合函数的查询（第 1 部分）", lesson: aggregatesPartOneLesson },
  { id: aggregatesPartTwoLesson.id, label: "SQL 课程 11：带聚合函数的查询（第 2 部分）", lesson: aggregatesPartTwoLesson },
  { id: executionOrderLesson.id, label: "SQL 课程 12：查询的执行顺序", lesson: executionOrderLesson },
  { id: caseWhenLesson.id, label: "SQL 课程 13：使用 CASE WHEN 进行业务分类", lesson: caseWhenLesson },
  { id: dateRangesLesson.id, label: "SQL 课程 14：日期筛选与时间范围分析", lesson: dateRangesLesson },
  { id: dateGranularityLesson.id, label: "SQL 课程 15：按日、周、月统计数据", lesson: dateGranularityLesson },
  { id: cteLesson.id, label: "SQL 课程 16：使用 CTE 拆解查询", lesson: cteLesson },
  { id: windowFunctionsLesson.id, label: "SQL 课程 17：窗口函数：排名与累计值", lesson: windowFunctionsLesson },
  { id: windowDeduplicationLesson.id, label: "SQL 课程 18：窗口函数：用户去重与首末次行为", lesson: windowDeduplicationLesson },
  { id: conversionFunnelLesson.id, label: "SQL 课程 19：产品转化漏斗分析", lesson: conversionFunnelLesson },
  { id: retentionAnalysisLesson.id, label: "SQL 课程 20：用户留存分析", lesson: retentionAnalysisLesson },
  { id: productAnalysisPracticeLesson.id, label: "SQL 课程 X：产品分析 SQL 实战", lesson: productAnalysisPracticeLesson },
];

export const implementedLessons = courseOutline.flatMap((item) => item.lesson ? [item.lesson] : []);

export function getLessonById(id: string) {
  return implementedLessons.find((lesson) => lesson.id === id);
}
