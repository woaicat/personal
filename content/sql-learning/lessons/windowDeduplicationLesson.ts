import type { Lesson } from "@/lib/sql-learning/types";

export const windowDeduplicationLesson: Lesson = {
  id: "window-deduplication",
  number: 18,
  title: "窗口函数：用户去重与首末次行为",
  shortTitle: "窗口函数：用户去重与首末次行为",
  intro: [
    "同一个客户可能对应很多条商机记录。如果产品分析要做“每个客户一行”的客户概览，就不能直接 SELECT DISTINCT *：不同商机的日期、产品和金额不同，DISTINCT 并不能帮你选出“哪一条才是代表记录”。",
    "本课把 accounts 中的客户视为用户分析对象，把 sales_pipeline 中的商机视为客户行为事件。ROW_NUMBER 可以在每个客户内部按时间排序，再保留第 1 行，从而实现可解释的去重。",
    "首末次行为还需要明确排序方向：升序得到首次跟进，降序得到最近跟进。对于同一天发生的多条记录，本课用 opportunity_id 做稳定的第二排序条件。没有客户名称或跟进日期的记录无法进入客户行为时间线，因此会被排除。",
  ],
  syntaxLabel: "按用户分组并给行为编号",
  syntax: `WITH ranked_events AS (
  SELECT 用户字段, 行为字段,
         ROW_NUMBER() OVER (
           PARTITION BY 用户字段
           ORDER BY 行为时间 ASC
         ) AS event_number
  FROM 行为表
)
SELECT ...
FROM ranked_events
WHERE event_number = 1;`,
  sections: [
    {
      title: "为什么 DISTINCT 不能完成业务去重",
      paragraphs: [
        "SELECT DISTINCT account 只能得到客户名称列表；一旦同时选择 opportunity_id、product 或 engage_date，每条商机通常仍然不同。业务上的去重不是删除“看起来相同的行”，而是先定义每个客户要保留哪一条行为。",
        "ROW_NUMBER() OVER (PARTITION BY account ORDER BY engage_date ASC, opportunity_id ASC) 会在每个客户内部重新编号。外层 WHERE event_number = 1 后，就只留下每个客户最早的一条跟进记录。",
      ],
      codeLabel: "保留每个客户最早的跟进记录",
      code: `WITH ranked_account_events AS (
  SELECT account, opportunity_id, engage_date, product,
         ROW_NUMBER() OVER (
           PARTITION BY account
           ORDER BY engage_date ASC, opportunity_id ASC
         ) AS event_number
  FROM sales_pipeline
  WHERE account IS NOT NULL
    AND engage_date IS NOT NULL
)
SELECT account, opportunity_id, engage_date, product
FROM ranked_account_events
WHERE event_number = 1;`,
      tip: "account 为空的商机无法归属到某个客户；engage_date 为空的记录无法参与首末次时间排序。本课会把它们排除。",
    },
    {
      title: "FIRST_VALUE 与 LAST_VALUE：在组内观察首末值",
      paragraphs: [
        "FIRST_VALUE 可以返回窗口中第一行的值，LAST_VALUE 可以返回最后一行的值。使用 LAST_VALUE 时要特别写出 ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING，否则默认窗口可能只看到当前行之前的范围，结果会看起来像“当前值”。",
        "如果只想保留一行客户结果，可以同时使用 ROW_NUMBER 做外层去重；窗口函数负责计算首末值，ROW_NUMBER 负责从每个客户的多条事件中选出一行。",
      ],
      table: {
        title: "客户行为时间线的选择规则",
        columns: ["分析目标", "排序方向", "保留条件"],
        rows: [
          ["首次跟进", "engage_date ASC", "event_number = 1"],
          ["最近跟进", "engage_date DESC", "event_number = 1"],
          ["最近一次成交", "close_date DESC", "只在 Won 且有关闭日期的记录中编号"],
        ],
      },
    },
    {
      title: "首末次行为必须先定义事件范围",
      paragraphs: [
        "“最近一次行为”可以指最近一次跟进、最近一次关闭商机，或者最近一次已成交商机。它们对应不同的 WHERE 条件。若要看最近一次成交，就要先限制 deal_stage = 'Won' 并排除空 close_date，再进行窗口排序。",
        "这类查询的重点不是背一段固定模板，而是先回答三个问题：谁是用户？什么算行为？按哪个时间字段判断先后？",
      ],
    },
  ],
  exerciseLead: "本课按客户去重。系统会核对每个客户恰好一行、首末次选择规则、完整字段和最终排序。",
  datasetLabel: "sales_pipeline（商机）",
  initialQuery: `SELECT account, opportunity_id, engage_date, product
FROM sales_pipeline
WHERE account IS NOT NULL
LIMIT 12;`,
  tasks: [
    {
      id: "window-first-account-event",
      description: "每个客户只保留最早的开始跟进记录，返回客户、商机编号、开始跟进日期和产品，并按客户名称正序排列。",
      solution: "WITH ranked_account_events AS (\n  SELECT account, opportunity_id, engage_date, product,\n         ROW_NUMBER() OVER (\n           PARTITION BY account\n           ORDER BY engage_date ASC, opportunity_id ASC\n         ) AS event_number\n  FROM sales_pipeline\n  WHERE account IS NOT NULL\n    AND engage_date IS NOT NULL\n)\nSELECT account, opportunity_id, engage_date, product\nFROM ranked_account_events\nWHERE event_number = 1\nORDER BY account ASC;",
      resultOrderMatters: true,
    },
    {
      id: "window-last-account-event",
      description: "每个客户只保留最近的开始跟进记录，返回客户、商机编号、开始跟进日期和产品，并按客户名称正序排列。",
      solution: "WITH ranked_account_events AS (\n  SELECT account, opportunity_id, engage_date, product,\n         ROW_NUMBER() OVER (\n           PARTITION BY account\n           ORDER BY engage_date DESC, opportunity_id DESC\n         ) AS event_number\n  FROM sales_pipeline\n  WHERE account IS NOT NULL\n    AND engage_date IS NOT NULL\n)\nSELECT account, opportunity_id, engage_date, product\nFROM ranked_account_events\nWHERE event_number = 1\nORDER BY account ASC;",
      resultOrderMatters: true,
    },
    {
      id: "window-first-last-values",
      description: "每个客户只返回一行，同时展示首次跟进日期、最近跟进日期、首次跟进产品和最近跟进产品；结果列别名分别为 first_engage_date、last_engage_date、first_product、last_product，并按客户名称正序排列。",
      solution: "WITH account_timeline AS (\n  SELECT account,\n         FIRST_VALUE(engage_date) OVER w AS first_engage_date,\n         LAST_VALUE(engage_date) OVER w AS last_engage_date,\n         FIRST_VALUE(product) OVER w AS first_product,\n         LAST_VALUE(product) OVER w AS last_product,\n         ROW_NUMBER() OVER (PARTITION BY account ORDER BY engage_date ASC, opportunity_id ASC) AS event_number\n  FROM sales_pipeline\n  WHERE account IS NOT NULL\n    AND engage_date IS NOT NULL\n  WINDOW w AS (\n    PARTITION BY account\n    ORDER BY engage_date ASC, opportunity_id ASC\n    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n  )\n)\nSELECT account, first_engage_date, last_engage_date, first_product, last_product\nFROM account_timeline\nWHERE event_number = 1\nORDER BY account ASC;",
      resultOrderMatters: true,
    },
    {
      id: "window-last-won-event",
      description: "每个客户只保留最近一次已成交商机，返回客户、商机编号、关闭日期和成交金额，并按关闭日期倒序、客户名称正序排列。",
      solution: "WITH account_won_events AS (\n  SELECT account, opportunity_id, close_date, close_value,\n         ROW_NUMBER() OVER (\n           PARTITION BY account\n           ORDER BY close_date DESC, close_value DESC, opportunity_id DESC\n         ) AS event_number\n  FROM sales_pipeline\n  WHERE account IS NOT NULL\n    AND deal_stage = 'Won'\n    AND close_date IS NOT NULL\n)\nSELECT account, opportunity_id, close_date, close_value\nFROM account_won_events\nWHERE event_number = 1\nORDER BY close_date DESC, account ASC;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "window-functions", label: "SQL 课程 17：窗口函数：排名与累计值" },
  nextLesson: { id: "conversion-funnel", label: "SQL 课程 19：产品转化漏斗分析" },
};
