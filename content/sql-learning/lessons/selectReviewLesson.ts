import type { Lesson } from "@/lib/sql-learning/types";

export const selectReviewLesson: Lesson = {
  id: "select-review",
  number: 5,
  heading: "SQL 复习：简单的 SELECT 查询",
  exerciseLabel: "复习",
  title: "简单的 SELECT 查询",
  shortTitle: "简单 SELECT 查询复习",
  intro: [
    "到这里，你已经掌握了 SELECT、WHERE、文本与数值条件，以及排序和分页。它们看似基础，却是产品分析里使用频率最高的一组能力：很多日常取数需求，不需要复杂语法就能解决。",
    "这一课不引入新语法，而是把此前的能力放回到一组完整的客户分析问题里。先读清业务目标，再决定要选哪些字段、如何筛选、是否需要排序。",
  ],
  syntaxLabel: "一条常用查询的骨架",
  syntax: `SELECT 需要的字段
FROM 数据表
WHERE 筛选条件
ORDER BY 排序字段
LIMIT 返回行数;`,
  sections: [
    {
      title: "从问题到查询：先写中文，再写 SQL",
      paragraphs: [
        "例如“查看美国客户的名称和行业”，它包含三个明确部分：返回 account 和 sector、从 accounts 表取数、仅保留 office_location 为 United States 的记录。把业务句子拆开，SQL 就不再像需要死记硬背的公式。",
      ],
      codeLabel: "美国客户的名称和行业",
      code: `SELECT account, sector
FROM accounts
WHERE office_location = 'United States';`,
      tip: "页面中显示“美国”，但 CRM 原始值是 United States；条件里应使用原始值。",
    },
    {
      title: "提交前的三步自查",
      paragraphs: [
        "第一，SELECT 后是否只保留任务要求的字段；第二，WHERE 条件是否把不相关记录排除；第三，如果题目要求“前几名”或“最新”，是否写了 ORDER BY。",
        "本网站会按字段、行数和完整结果集判题。语法能运行不代表业务结果正确，这正是产品分析中最需要培养的习惯。",
      ],
    },
  ],
  exerciseLead: "把前四课的能力组合起来。结果字段、客户范围和排序都需要符合当前任务。",
  datasetLabel: "accounts（客户档案）",
  initialQuery: `SELECT account, sector, office_location
FROM accounts
LIMIT 12;`,
  tasks: [
    {
      id: "review-account-sector",
      description: "列出每个客户的客户名称（account）和所属行业（sector）。",
      solution: "SELECT account, sector\nFROM accounts;",
    },
    {
      id: "review-us-customers",
      description: "列出办公地位于 United States（美国）的客户名称和所属行业。",
      solution: "SELECT account, sector\nFROM accounts\nWHERE office_location = 'United States';",
    },
    {
      id: "review-high-revenue",
      description: "列出年营收不少于 5,000 的客户名称、年营收和员工人数。",
      solution: "SELECT account, revenue, employees\nFROM accounts\nWHERE revenue >= 5000;",
    },
    {
      id: "review-new-customers",
      description: "按成立年份从新到旧，列出最新成立的 5 个客户名称和成立年份。",
      solution: "SELECT account, year_established\nFROM accounts\nORDER BY year_established DESC\nLIMIT 5;",
    },
  ],
  previousLesson: { id: "sorting-results", label: "SQL 课程 4：筛选和排序查询结果" },
  nextLesson: { id: "inner-joins", label: "SQL 课程 6：使用 JOIN 进行多表查询" },
};
