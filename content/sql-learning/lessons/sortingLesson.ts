import { sortingEvaluation } from "@/lib/sql-learning/evaluation/accountLessonsEvaluator";
import type { Lesson } from "@/lib/sql-learning/types";

export const sortingLesson: Lesson = {
  id: "sorting-results",
  number: 4,
  title: "筛选和排序查询结果",
  shortTitle: "筛选和排序查询结果",
  intro: [
    "查询结果可能包含重复值，也未必按业务需要排序。DISTINCT 可以只保留不同的值；ORDER BY 决定输出顺序；LIMIT 和 OFFSET 则用于控制查看的记录范围。",
    "这些能力在产品分析中很常见：查看有哪些行业分类、优先关注最新成立的客户，或把长名单分批浏览。默认 ORDER BY 为升序，降序需要写 DESC。",
    "本课仍使用 accounts 客户档案表。请通过去重、排序和分页，让查询结果变得更适合直接阅读和分析。",
  ],
  syntaxLabel: "去重、排序与分页",
  syntax: `SELECT DISTINCT 字段
FROM 表名
ORDER BY 字段 ASC | DESC
LIMIT 行数 OFFSET 跳过行数;`,
  sections: [
    {
      title: "先去重：别让同一个分类出现十遍",
      paragraphs: [
        "客户表中会有很多客户属于同一行业。如果你只想知道“我们覆盖了哪些行业”，普通 SELECT 会重复返回 medical、retail 等值；SELECT DISTINCT 会把相同值合并成一条。",
      ],
      codeLabel: "查看不重复的客户行业",
      code: `SELECT DISTINCT sector
FROM accounts;`,
      tip: "DISTINCT 作用于 SELECT 后的整组字段。SELECT DISTINCT account, sector 会对“客户名称 + 行业”的组合去重，而不是只按行业去重。",
    },
    {
      title: "排序、截取与翻页速查表",
      paragraphs: ["这些子句通常写在 SELECT、FROM、WHERE 之后。想要稳定可复现的“前 5 条”时，一定要先写 ORDER BY；否则数据库返回的先后顺序没有业务保证。"],
      table: {
        title: "让结果更适合阅读的工具",
        columns: ["关键字", "作用", "CRM 示例"],
        rows: [
          ["DISTINCT", "移除完全相同的结果", "SELECT DISTINCT sector"],
          ["ORDER BY 字段 ASC", "按字段升序；ASC 可省略", "ORDER BY account ASC"],
          ["ORDER BY 字段 DESC", "按字段降序", "ORDER BY year_established DESC"],
          ["LIMIT n", "只保留前 n 行", "LIMIT 5"],
          ["OFFSET n", "跳过前 n 行，常与 LIMIT 配合", "LIMIT 5 OFFSET 5"],
        ],
      },
    },
    {
      title: "一个产品分析小场景：最新客户观察名单",
      paragraphs: [
        "假设销售负责人希望快速了解最近成立的目标客户，你不需要把所有客户逐条翻完。按成立年份从新到旧排序，再限制为前几条，就能得到一份可立即查看的名单。",
        "注意：用于排序的字段不一定要出现在 SELECT 中。下面的结果只显示客户名称，但仍然可以按 year_established 排序。",
      ],
      codeLabel: "按成立年份从新到旧查看前 4 个客户",
      code: `SELECT account
FROM accounts
ORDER BY year_established DESC
LIMIT 4;`,
    },
  ],
  exerciseLead: "当前任务会同时校验结果内容与返回顺序，请留意 ORDER BY、LIMIT 和 OFFSET 的组合。",
  datasetLabel: "accounts（客户档案）",
  initialQuery: `SELECT account, sector, year_established
FROM accounts
LIMIT 12;`,
  tasks: [
    {
      id: "sorting-distinct-sectors",
      description: "列出所有不重复的所属行业（sector），并按原始行业值的字母升序排列。",
      solution: "SELECT DISTINCT sector\nFROM accounts\nORDER BY sector ASC;",
      evaluate: sortingEvaluation.sectors,
    },
    {
      id: "sorting-newest-accounts",
      description: "按成立年份从新到旧，列出最新成立的 4 个客户名称。",
      solution: "SELECT account\nFROM accounts\nORDER BY year_established DESC\nLIMIT 4;",
      evaluate: sortingEvaluation.newest,
    },
    {
      id: "sorting-first-five",
      description: "按客户名称的字母升序，列出最前面的 5 个客户名称。",
      solution: "SELECT account\nFROM accounts\nORDER BY account ASC\nLIMIT 5;",
      evaluate: sortingEvaluation.firstFive,
    },
    {
      id: "sorting-next-five",
      description: "延续上一题的排序规则，跳过前 5 个客户后再列出 5 个客户名称。",
      solution: "SELECT account\nFROM accounts\nORDER BY account ASC\nLIMIT 5 OFFSET 5;",
      evaluate: sortingEvaluation.nextFive,
    },
  ],
  previousLesson: { id: "text-filters", label: "SQL 课程 3：带约束的查询（第 2 部分）" },
  nextLesson: { id: "select-review", label: "SQL 复习：简单的 SELECT 查询" },
};
