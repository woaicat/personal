import type { Lesson } from "@/lib/sql-learning/types";

export const retentionAnalysisLesson: Lesson = {
  id: "retention-analysis",
  number: 20,
  title: "用户留存分析",
  shortTitle: "用户留存分析",
  intro: [
    "留存分析关注的不是“来了多少人”，而是“第一次来过的人，之后还有没有回来”。例如某个月第一次跟进的客户，后续月份是否再次产生跟进记录？这就是一个最基础的留存问题。",
    "当前 CRM 数据没有独立的 user_id 和产品事件表，因此本课把 account（客户名称）作为用户，把 engage_date（开始跟进日期）作为行为时间。这个定义会在查询中明确写出来，避免把商机数量误当成用户数量。",
    "我们会先找到每个客户第一次出现的月份，把它称为 cohort_month（用户群组月份）；再观察同一客户在哪些月份继续出现，计算月活跃客户、群组留存数量和留存率。",
  ],
  syntaxLabel: "先建立用户群组，再观察后续行为",
  syntax: `WITH account_cohorts AS (
  SELECT account,
         MIN(strftime('%Y-%m', engage_date)) AS cohort_month
  FROM sales_pipeline
  GROUP BY account
), monthly_activity AS (
  SELECT DISTINCT account,
         strftime('%Y-%m', engage_date) AS activity_month
  FROM sales_pipeline
)
SELECT ...;`,
  sections: [
    {
      title: "先说清楚：谁是用户，什么算一次行为",
      paragraphs: [
        "在真实产品事件表中，用户通常由 user_id 标识，行为可能是登录、浏览或完成任务。本课没有这样的产品事件表，所以使用 CRM 中最接近的业务对象：account 代表客户，engage_date 代表一次开始跟进行为。",
        "这意味着本课得到的是“客户跟进留存”的练习结果，不是 App 登录留存。换成真实产品事件表时，只需要替换用户字段和行为日期，分析思路仍然相同。",
      ],
      codeLabel: "统计每个月有多少活跃客户",
      code: `SELECT strftime('%Y-%m', engage_date) AS activity_month,
       COUNT(DISTINCT account) AS active_accounts
FROM sales_pipeline
WHERE account IS NOT NULL
  AND engage_date IS NOT NULL
GROUP BY activity_month
ORDER BY activity_month ASC;`,
      tip: "统计用户数量时要用 COUNT(DISTINCT account)，不能直接 COUNT(*)；一个客户一个月可能有多笔商机。",
    },
    {
      title: "Cohort：把第一次出现的用户放进同一组",
      paragraphs: [
        "如果一个客户第一次在 2016-11 被跟进，就属于 2016-11 这个 cohort。之后它在 2016-12、2017-01 是否再次出现，会分别记录在对应的 activity_month 中。",
        "monthly_activity 先用 DISTINCT 把同一个客户在同一个月份的多笔记录合并成一次“月活跃”。这样留存人数统计的是客户数，而不是商机数。",
      ],
      table: {
        title: "留存分析里的三个时间概念",
        columns: ["字段", "含义", "CRM 对应字段"],
        rows: [
          ["用户", "被观察的对象", "account 客户"],
          ["首次月份", "用户第一次出现的月份", "最早 engage_date 的月份"],
          ["活跃月份", "用户再次出现的月份", "engage_date 所在月份"],
        ],
      },
    },
    {
      title: "留存率的分母必须是最初那批用户",
      paragraphs: [
        "某个 cohort 在后续月份的留存率 = 该 cohort 在这个月份仍然活跃的客户数 ÷ 该 cohort 最初的客户数。分母不能换成当月全部活跃客户，否则算出来的是当月构成比例，不是留存率。",
        "最后一题会计算次月留存：例如 2016-11 cohort 的客户，在 2016-12 再次出现了多少。越靠近数据末尾的 cohort，可观察的后续月份越少，这是留存分析中的常见限制。",
      ],
    },
  ],
  exerciseLead: "本课严格按客户去重。请先排除缺失客户和缺失日期，再区分 cohort_month、activity_month、cohort_size 与 retained_accounts。",
  datasetLabel: "sales_pipeline（商机行为）",
  initialQuery: `SELECT account, engage_date, opportunity_id
FROM sales_pipeline
WHERE account IS NOT NULL
  AND engage_date IS NOT NULL
LIMIT 12;`,
  tasks: [
    {
      id: "retention-monthly-active",
      description: "按月份统计活跃客户数，返回 activity_month 和别名为 active_accounts 的去重客户数，并按月份正序排列。",
      solution: "SELECT strftime('%Y-%m', engage_date) AS activity_month,\n       COUNT(DISTINCT account) AS active_accounts\nFROM sales_pipeline\nWHERE account IS NOT NULL\n  AND engage_date IS NOT NULL\nGROUP BY activity_month\nORDER BY activity_month ASC;",
      resultOrderMatters: true,
    },
    {
      id: "retention-cohort-activity",
      description: "按首次跟进月份和后续活跃月份统计客户数，返回 cohort_month、activity_month 和别名为 retained_accounts 的去重客户数，并按两个月份正序排列。",
      solution: "WITH account_cohorts AS (\n  SELECT account, MIN(strftime('%Y-%m', engage_date)) AS cohort_month\n  FROM sales_pipeline\n  WHERE account IS NOT NULL AND engage_date IS NOT NULL\n  GROUP BY account\n), monthly_activity AS (\n  SELECT DISTINCT account, strftime('%Y-%m', engage_date) AS activity_month\n  FROM sales_pipeline\n  WHERE account IS NOT NULL AND engage_date IS NOT NULL\n)\nSELECT c.cohort_month, a.activity_month, COUNT(*) AS retained_accounts\nFROM account_cohorts AS c\nJOIN monthly_activity AS a ON c.account = a.account\nGROUP BY c.cohort_month, a.activity_month\nORDER BY c.cohort_month ASC, a.activity_month ASC;",
      resultOrderMatters: true,
    },
    {
      id: "retention-cohort-rate",
      description: "在上一题基础上加入每个 cohort 的 cohort_size 和留存率；返回 cohort_month、activity_month、retained_accounts、cohort_size、retention_rate_pct，留存率四舍五入到 2 位小数。",
      solution: "WITH account_cohorts AS (\n  SELECT account, MIN(strftime('%Y-%m', engage_date)) AS cohort_month\n  FROM sales_pipeline\n  WHERE account IS NOT NULL AND engage_date IS NOT NULL\n  GROUP BY account\n), monthly_activity AS (\n  SELECT DISTINCT account, strftime('%Y-%m', engage_date) AS activity_month\n  FROM sales_pipeline\n  WHERE account IS NOT NULL AND engage_date IS NOT NULL\n), cohort_activity AS (\n  SELECT c.cohort_month, a.activity_month, COUNT(*) AS retained_accounts\n  FROM account_cohorts AS c\n  JOIN monthly_activity AS a ON c.account = a.account\n  GROUP BY c.cohort_month, a.activity_month\n), cohort_sizes AS (\n  SELECT cohort_month, COUNT(*) AS cohort_size\n  FROM account_cohorts\n  GROUP BY cohort_month\n)\nSELECT a.cohort_month, a.activity_month, a.retained_accounts, s.cohort_size,\n       ROUND(100.0 * a.retained_accounts / s.cohort_size, 2) AS retention_rate_pct\nFROM cohort_activity AS a\nJOIN cohort_sizes AS s ON a.cohort_month = s.cohort_month\nORDER BY a.cohort_month ASC, a.activity_month ASC;",
      resultOrderMatters: true,
    },
    {
      id: "retention-next-month",
      description: "计算每个 cohort 的次月留存：返回 cohort_month、cohort_size、次月留存客户数 next_month_retained_accounts 和 next_month_retention_pct，按月份正序排列。",
      solution: "WITH account_cohorts AS (\n  SELECT account, MIN(strftime('%Y-%m', engage_date)) AS cohort_month\n  FROM sales_pipeline\n  WHERE account IS NOT NULL AND engage_date IS NOT NULL\n  GROUP BY account\n), cohort_sizes AS (\n  SELECT cohort_month, COUNT(*) AS cohort_size\n  FROM account_cohorts\n  GROUP BY cohort_month\n), next_month_activity AS (\n  SELECT DISTINCT account, strftime('%Y-%m', engage_date) AS activity_month\n  FROM sales_pipeline\n  WHERE account IS NOT NULL AND engage_date IS NOT NULL\n), next_month_retained AS (\n  SELECT c.cohort_month, COUNT(DISTINCT c.account) AS next_month_retained_accounts\n  FROM account_cohorts AS c\n  JOIN next_month_activity AS a ON c.account = a.account\n  WHERE a.activity_month = strftime('%Y-%m', date(c.cohort_month || '-01', '+1 month'))\n  GROUP BY c.cohort_month\n)\nSELECT s.cohort_month, s.cohort_size,\n       COALESCE(r.next_month_retained_accounts, 0) AS next_month_retained_accounts,\n       ROUND(100.0 * COALESCE(r.next_month_retained_accounts, 0) / s.cohort_size, 2) AS next_month_retention_pct\nFROM cohort_sizes AS s\nLEFT JOIN next_month_retained AS r ON s.cohort_month = r.cohort_month\nORDER BY s.cohort_month ASC;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "conversion-funnel", label: "SQL 课程 19：产品转化漏斗分析" },
  nextLesson: { id: "product-analysis-practice", label: "SQL 课程 X：产品分析 SQL 实战" },
};
