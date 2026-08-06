import type { Lesson } from "@/lib/sql-learning/types";

export const cteLesson: Lesson = {
  id: "cte",
  number: 16,
  title: "使用 CTE 拆解查询",
  shortTitle: "使用 CTE 拆解查询",
  intro: [
    "当一条 SQL 同时包含筛选、计算、分组和再次筛选时，所有逻辑挤在一起很容易读不懂。CTE（Common Table Expression，公共表表达式）可以先把中间结果命名，再在后面的查询中使用它。",
    "可以把 CTE 想成一张只在本条 SQL 中临时存在的“中间表”：WITH 名称 AS (查询) 先准备数据，后面的 SELECT 再消费这份数据。它不会修改原始 CSV，也不会把中间结果永久保存。",
    "本课会把商机分析拆成几个清晰阶段：先筛出已成交商机，再按销售人员或客户汇总，最后筛选和排序汇总结果。",
  ],
  syntaxLabel: "用 WITH 命名中间结果",
  syntax: `WITH 中间表名 AS (
  SELECT ...
  FROM ...
  WHERE ...
)
SELECT ...
FROM 中间表名;`,
  sections: [
    {
      title: "CTE 先做准备，主查询再回答问题",
      paragraphs: [
        "如果每个指标都重复写 WHERE deal_stage = 'Won'，查询会变长，也容易某一处漏写条件。可以先定义 won_opportunities，只保留已成交商机；后续查询面对的就是一张更小、更明确的中间表。",
        "CTE 的名字应该表达它包含什么数据，例如 won_opportunities、agent_summary、monthly_won。好的名字会让 SQL 像一段业务说明，而不是一串难以维护的括号。",
      ],
      codeLabel: "先准备已成交商机，再按销售人员汇总",
      code: `WITH won_opportunities AS (
  SELECT sales_agent, close_value
  FROM sales_pipeline
  WHERE deal_stage = 'Won'
)
SELECT sales_agent,
       COUNT(*) AS won_opportunity_count,
       SUM(close_value) AS won_close_value
FROM won_opportunities
GROUP BY sales_agent;`,
      tip: "CTE 只在当前查询中有效。它不是 CREATE TABLE，不会给本地数据增加一张永久表。",
    },
    {
      title: "多层 CTE：把不同粒度分开",
      paragraphs: [
        "产品分析经常需要先按人或客户汇总，再对汇总后的结果做筛选。例如“找出成交笔数至少 150 笔的销售人员”，150 是销售人员这一组的指标，不应该写进最初筛选每条商机的 WHERE 中。",
        "第一层 CTE 处理明细，第二层 CTE 处理汇总，最后的 SELECT 处理展示和排序。每一层只负责一个问题，调试时也可以暂时把最后的 SELECT 改成查看中间结果。",
      ],
      table: {
        title: "CTE 分层的思路",
        columns: ["阶段", "处理对象", "示例"],
        rows: [
          ["明细层", "单条商机", "筛选 deal_stage = 'Won'"],
          ["汇总层", "销售人员或客户分组", "COUNT、SUM、GROUP BY"],
          ["展示层", "汇总后的结果", "阈值筛选、排序、取字段"],
        ],
      },
    },
    {
      title: "CTE 不会改变分析口径",
      paragraphs: [
        "把一条查询拆成 CTE，并不会自动让结果更正确。仍然要检查 JOIN 是否重复计数、NULL 是否需要排除、金额是否只统计 Won。CTE 的价值是让这些口径更容易被看见和复用。",
      ],
    },
  ],
  exerciseLead: "每道题都要求使用一个或多个 CTE；系统验收最终结果，不按 SQL 文本判定，但字段、行数、数据和排序必须正确。",
  datasetLabel: "sales_pipeline（商机）",
  sourceTables: [
    { label: "sales_pipeline（商机）", query: "SELECT sales_agent, account, deal_stage, close_value, close_date FROM sales_pipeline LIMIT 8;" },
    { label: "accounts（客户档案）", query: "SELECT account, sector FROM accounts LIMIT 8;" },
  ],
  initialQuery: `SELECT sales_agent, deal_stage, close_value
FROM sales_pipeline
LIMIT 12;`,
  tasks: [
    {
      id: "cte-agent-summary",
      description: "使用 CTE 先筛出已成交商机，再按销售人员汇总成交笔数和成交金额；返回销售人员、won_opportunity_count 和 won_close_value，并按金额从高到低排列。",
      solution: "WITH won_opportunities AS (\n  SELECT sales_agent, close_value\n  FROM sales_pipeline\n  WHERE deal_stage = 'Won'\n)\nSELECT sales_agent,\n       COUNT(*) AS won_opportunity_count,\n       SUM(close_value) AS won_close_value\nFROM won_opportunities\nGROUP BY sales_agent\nORDER BY won_close_value DESC, sales_agent ASC;",
      resultOrderMatters: true,
    },
    {
      id: "cte-agent-threshold",
      description: "使用 CTE 先得到每位销售人员的已成交商机数和成交金额，再找出成交笔数不少于 150 的销售人员；按成交金额从高到低排列。",
      solution: "WITH agent_summary AS (\n  SELECT sales_agent,\n         COUNT(*) AS won_opportunity_count,\n         SUM(close_value) AS won_close_value\n  FROM sales_pipeline\n  WHERE deal_stage = 'Won'\n  GROUP BY sales_agent\n)\nSELECT sales_agent, won_opportunity_count, won_close_value\nFROM agent_summary\nWHERE won_opportunity_count >= 150\nORDER BY won_close_value DESC, sales_agent ASC;",
      resultOrderMatters: true,
    },
    {
      id: "cte-account-summary-join",
      description: "使用 CTE 按客户汇总商机总数和已成交金额，再连接 accounts 表，找出商机总数不少于 100 的客户；返回客户、行业、商机数量和已成交金额，并按金额从高到低排列。",
      solution: "WITH account_pipeline AS (\n  SELECT account,\n         COUNT(*) AS opportunity_count,\n         SUM(CASE WHEN deal_stage = 'Won' THEN close_value ELSE 0 END) AS won_close_value\n  FROM sales_pipeline\n  GROUP BY account\n)\nSELECT a.account, a.sector, p.opportunity_count, p.won_close_value\nFROM account_pipeline AS p\nJOIN accounts AS a ON p.account = a.account\nWHERE p.opportunity_count >= 100\nORDER BY p.won_close_value DESC, a.account ASC;",
      resultOrderMatters: true,
    },
    {
      id: "cte-monthly-threshold",
      description: "使用 CTE 按月份统计已成交商机数量，再筛选出成交笔数不少于 250 的月份；返回 close_month 和 won_opportunity_count，并按月份正序排列。",
      solution: "WITH monthly_won AS (\n  SELECT strftime('%Y-%m', close_date) AS close_month,\n         COUNT(*) AS won_opportunity_count\n  FROM sales_pipeline\n  WHERE deal_stage = 'Won'\n  GROUP BY close_month\n)\nSELECT close_month, won_opportunity_count\nFROM monthly_won\nWHERE won_opportunity_count >= 250\nORDER BY close_month ASC;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "date-granularity", label: "SQL 课程 15：按日、周、月统计数据" },
  nextLesson: { id: "window-functions", label: "SQL 课程 17：窗口函数：排名与累计值" },
};
