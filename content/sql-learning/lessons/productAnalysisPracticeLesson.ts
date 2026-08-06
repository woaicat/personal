import type { Lesson } from "@/lib/sql-learning/types";

export const productAnalysisPracticeLesson: Lesson = {
  id: "product-analysis-practice",
  heading: "SQL 课程 X：产品分析 SQL 实战",
  title: "产品分析 SQL 实战",
  shortTitle: "产品分析 SQL 实战",
  intro: [
    "这一课不再单独讲一个新语法，而是把前面学过的能力放在一起，完成一组更接近真实工作的产品分析任务。你需要先理解业务问题，再决定查哪张表、如何关联、怎样定义指标。",
    "实战数据来自 accounts 客户档案和 sales_pipeline 商机记录。你会分析客户价值、产品成交表现、客户最近行为和销售人员排名。每道题都对应一个产品经理可能拿去做周报、复盘或需求判断的问题。",
    "写综合 SQL 时，可以先在脑中拆成几步：准备明细 → 连接业务对象 → 计算指标 → 筛选或排名 → 按阅读顺序输出。CTE 能帮助你把这些步骤写清楚。",
  ],
  syntaxLabel: "综合分析的常见拆解方式",
  syntax: `WITH 明细层 AS (
  SELECT ...
  FROM ...
), 指标层 AS (
  SELECT ...
  FROM 明细层
  GROUP BY ...
)
SELECT ...
FROM 指标层
ORDER BY ...;`,
  sections: [
    {
      title: "先把业务问题翻译成数据问题",
      paragraphs: [
        "“哪些客户更值得关注？”可能需要客户行业、商机数量、成交数量和成交金额；“哪个产品表现更好？”需要产品维度、商机总数、成交数和成交率；“销售排名如何？”需要先汇总，再使用窗口函数排名。",
        "不要一上来就堆 SQL。先写出你希望结果表有哪些列，再反推每列来自哪张表、需要什么计算。这样能减少 JOIN 错表、统计重复和指标口径不清。",
      ],
      codeLabel: "客户价值指标可以这样拆",
      code: `COUNT(p.opportunity_id) AS opportunity_count
SUM(CASE WHEN p.deal_stage = 'Won'
         THEN p.close_value ELSE 0 END) AS won_close_value
ROUND(100.0 * 已成交商机数 / 商机总数, 2) AS won_rate_pct`,
      tip: "LEFT JOIN 可以把没有商机的客户也保留下来；如果只想看有商机的客户，才考虑使用 INNER JOIN 或在后续加筛选。",
    },
    {
      title: "指标口径要能被别人复算",
      paragraphs: [
        "成交金额只统计 deal_stage = 'Won' 的记录；成交率的分母是该分析范围内的全部商机；客户最近行为按 engage_date 判断，而不是按 close_date。每个指标都要说明分子、分母和时间范围。",
        "本课的标准答案不要求你写出完全一样的 SQL，但会检查最终字段、行数、数据和排序。只要你的写法等价，结果正确，就可以完成任务。",
      ],
    },
    {
      title: "做完查询后，再问一句“这个结果能说明什么？”",
      paragraphs: [
        "高成交率不一定代表产品最好，可能只是样本量很小；成交金额高的客户也不一定适合马上投入资源，还要结合行业、规模和最近跟进情况。SQL 负责把事实整理出来，产品判断还需要结合业务背景。",
      ],
    },
  ],
  exerciseLead: "这是综合实战。每题只解锁当前任务，重点检查 JOIN 范围、指标口径、窗口排名和最终排序。",
  datasetLabel: "accounts + sales_pipeline（客户与商机）",
  sourceTables: [
    { label: "accounts（客户档案）", query: "SELECT account, sector, revenue, employees FROM accounts LIMIT 8;" },
    { label: "sales_pipeline（商机记录）", query: "SELECT account, product, deal_stage, engage_date, close_date, close_value FROM sales_pipeline LIMIT 8;" },
  ],
  initialQuery: `SELECT a.account, a.sector, p.deal_stage, p.close_value
FROM accounts AS a
LEFT JOIN sales_pipeline AS p ON a.account = p.account
LIMIT 12;`,
  tasks: [
    {
      id: "practice-account-value",
      description: "按客户汇总商机总数、已成交商机数、已成交金额和成交率；返回客户、行业、opportunity_count、won_opportunity_count、won_close_value、won_rate_pct，并按已成交金额从高到低、客户名称正序排列。",
      solution: "WITH account_metrics AS (\n  SELECT a.account, a.sector,\n         COUNT(p.opportunity_id) AS opportunity_count,\n         SUM(CASE WHEN p.deal_stage = 'Won' THEN 1 ELSE 0 END) AS won_opportunity_count,\n         SUM(CASE WHEN p.deal_stage = 'Won' THEN COALESCE(p.close_value, 0) ELSE 0 END) AS won_close_value,\n         ROUND(CASE WHEN COUNT(p.opportunity_id) = 0 THEN 0.0\n                    ELSE 100.0 * SUM(CASE WHEN p.deal_stage = 'Won' THEN 1 ELSE 0 END) / COUNT(p.opportunity_id)\n               END, 2) AS won_rate_pct\n  FROM accounts AS a\n  LEFT JOIN sales_pipeline AS p ON a.account = p.account\n  GROUP BY a.account, a.sector\n)\nSELECT account, sector, opportunity_count, won_opportunity_count, won_close_value, won_rate_pct\nFROM account_metrics\nORDER BY won_close_value DESC, account ASC;",
      resultOrderMatters: true,
    },
    {
      id: "practice-product-performance",
      description: "按产品汇总商机总数、已成交商机数、已成交金额和成交率；返回 product、opportunity_count、won_opportunity_count、won_close_value、won_rate_pct，并按已成交金额从高到低、产品名称正序排列。",
      solution: "SELECT product,\n       COUNT(*) AS opportunity_count,\n       SUM(CASE WHEN deal_stage = 'Won' THEN 1 ELSE 0 END) AS won_opportunity_count,\n       SUM(CASE WHEN deal_stage = 'Won' THEN close_value ELSE 0 END) AS won_close_value,\n       ROUND(100.0 * SUM(CASE WHEN deal_stage = 'Won' THEN 1 ELSE 0 END) / COUNT(*), 2) AS won_rate_pct\nFROM sales_pipeline\nGROUP BY product\nORDER BY won_close_value DESC, product ASC;",
      resultOrderMatters: true,
    },
    {
      id: "practice-latest-account-activity",
      description: "每个客户只保留最近一次开始跟进记录，并补充客户所属行业；返回客户、行业、商机编号、开始跟进日期、商机阶段和成交金额，按开始跟进日期倒序、客户名称正序排列。",
      solution: "WITH ranked_opportunities AS (\n  SELECT p.account, p.opportunity_id, p.engage_date, p.deal_stage, p.close_value,\n         ROW_NUMBER() OVER (\n           PARTITION BY p.account\n           ORDER BY p.engage_date DESC, p.opportunity_id DESC\n         ) AS event_number\n  FROM sales_pipeline AS p\n  WHERE p.account IS NOT NULL AND p.engage_date IS NOT NULL\n)\nSELECT a.account, a.sector, r.opportunity_id, r.engage_date, r.deal_stage, r.close_value\nFROM ranked_opportunities AS r\nJOIN accounts AS a ON r.account = a.account\nWHERE r.event_number = 1\nORDER BY r.engage_date DESC, a.account ASC;",
      resultOrderMatters: true,
    },
    {
      id: "practice-agent-ranking",
      description: "按销售人员汇总全部商机数、已成交商机数和已成交金额，再使用 DENSE_RANK 按已成交金额排名；返回 sales_agent、opportunity_count、won_opportunity_count、won_close_value、sales_agent_rank，并按排名、销售人员排列。",
      solution: "WITH agent_metrics AS (\n  SELECT sales_agent,\n         COUNT(*) AS opportunity_count,\n         SUM(CASE WHEN deal_stage = 'Won' THEN 1 ELSE 0 END) AS won_opportunity_count,\n         SUM(CASE WHEN deal_stage = 'Won' THEN close_value ELSE 0 END) AS won_close_value\n  FROM sales_pipeline\n  GROUP BY sales_agent\n)\nSELECT sales_agent, opportunity_count, won_opportunity_count, won_close_value,\n       DENSE_RANK() OVER (ORDER BY won_close_value DESC) AS sales_agent_rank\nFROM agent_metrics\nORDER BY sales_agent_rank ASC, sales_agent ASC;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "retention-analysis", label: "SQL 课程 20：用户留存分析" },
};
