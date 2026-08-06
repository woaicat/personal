import { numericFilterEvaluation } from "@/lib/sql-learning/evaluation/accountLessonsEvaluator";
import type { Lesson } from "@/lib/sql-learning/types";

export const numericFiltersLesson: Lesson = {
  id: "numeric-filters",
  number: 2,
  title: "带约束的查询（第 1 部分）",
  shortTitle: "带约束的查询（第 1 部分）",
  intro: [
    "实际分析几乎从不需要整张表。WHERE 就像客户名单前的一道筛网：先让数据逐行经过条件，再只留下真正值得关注的记录。例如，只看某一年成立的客户，或只保留员工规模较小的潜在客户。",
    "accounts 表中的 year_established（成立年份）、revenue（年营收）与 employees（员工人数）都是数值字段。面对它们，可以使用比较符、范围或多个条件组合完成筛选。",
    "下面的客户档案仅作为起点。请在查询中加入 WHERE 条件，找出符合当前业务条件的全部客户。",
  ],
  syntaxLabel: "使用数值条件筛选记录",
  syntax: `SELECT 字段
FROM 表名
WHERE 条件
  AND / OR 另一条件;`,
  sections: [
    {
      title: "WHERE 放在哪里？",
      paragraphs: [
        "WHERE 总是跟在 FROM 后面。数据库会先找到 accounts 表，再判断每一行是否符合条件，最后只返回通过筛选的行。可以把它读成：“从客户档案中，找出员工人数少于 500 的客户”。",
      ],
      codeLabel: "筛选员工人数少于 500 的客户",
      code: `SELECT account, employees
FROM accounts
WHERE employees < 500;`,
      tip: "数值不需要单引号。employees < 500 是数值比较；写成 employees < '500' 虽然某些数据库也能执行，但不建议养成这个习惯。",
    },
    {
      title: "数值筛选运算符速查表",
      paragraphs: ["这些条件可以直接写在 WHERE 后面。BETWEEN 的两端都包含在结果中，等价于“大于等于起点并且小于等于终点”。"],
      table: {
        title: "常用数值条件",
        columns: ["运算符", "含义", "CRM 示例"],
        rows: [
          ["=、!=（或 <>）", "等于、不等于", "year_established != 2000"],
          ["<、<=、>、>=", "小于、小于等于、大于、大于等于", "employees >= 1000"],
          ["BETWEEN … AND …", "位于两个数之间，包含两端", "revenue BETWEEN 1000 AND 5000"],
          ["NOT BETWEEN … AND …", "不在指定区间内", "employees NOT BETWEEN 500 AND 2000"],
          ["IN (…) / NOT IN (…) ", "数值在（不在）给定列表中", "year_established IN (1996, 2000, 2005)"],
        ],
      },
    },
    {
      title: "多个条件：AND、OR 与括号",
      paragraphs: [
        "AND 表示两个条件必须同时成立，OR 表示满足其中一个即可。比如要找“营收较高且员工较多”的重点客户，用 AND；要找“成立于 1996 或 2000 年”的客户，用 OR。",
        "当 AND 和 OR 同时出现时，给 OR 的条件加上括号会更安全。这样既能避免误读，也便于团队成员复查你的分析口径。",
      ],
      codeLabel: "优先级清晰的组合条件",
      code: `SELECT account, revenue, employees
FROM accounts
WHERE revenue >= 5000
  AND (employees < 500 OR employees > 5000);`,
      tip: "不要只写 WHERE employees；SQL 需要一个能判断真假的完整条件，例如 employees < 500。",
    },
  ],
  exerciseLead: "查询可以正常执行，但只有完整满足当前筛选目标时，才会解锁下一题。",
  datasetLabel: "accounts（客户档案）",
  initialQuery: `SELECT account, year_established, revenue, employees
FROM accounts
LIMIT 12;`,
  tasks: [
    {
      id: "numeric-founded-1996",
      description: "找出成立于 1996 年的全部客户名称。",
      solution: "SELECT account\nFROM accounts\nWHERE year_established = 1996;",
      evaluate: numericFilterEvaluation.foundedIn1996,
    },
    {
      id: "numeric-employees-below-500",
      description: "找出员工数少于 500 人的全部客户名称。",
      solution: "SELECT account\nFROM accounts\nWHERE employees < 500;",
      evaluate: numericFilterEvaluation.employeesBelow500,
    },
    {
      id: "numeric-revenue-5000",
      description: "找出营收不少于 5,000 的全部客户名称。",
      solution: "SELECT account\nFROM accounts\nWHERE revenue >= 5000;",
      evaluate: numericFilterEvaluation.revenueAtLeast5000,
    },
    {
      id: "numeric-founded-range",
      description: "找出成立年份在 2000 至 2005 年（含首尾）的全部客户名称。",
      solution: "SELECT account\nFROM accounts\nWHERE year_established >= 2000 AND year_established <= 2005;",
      evaluate: numericFilterEvaluation.founded2000To2005,
    },
  ],
  previousLesson: { id: "select-queries", label: "SQL 课程 1：SELECT 查询入门" },
  nextLesson: { id: "text-filters", label: "SQL 课程 3：带约束的查询（第 2 部分）" },
};
