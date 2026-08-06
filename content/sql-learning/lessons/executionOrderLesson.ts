import type { Lesson } from "@/lib/sql-learning/types";

export const executionOrderLesson: Lesson = {
  id: "execution-order",
  number: 12,
  title: "查询的执行顺序",
  shortTitle: "查询的执行顺序",
  intro: [
    "SQL 的书写顺序是 SELECT → FROM → WHERE → GROUP BY……，但数据库实际执行时会先找到数据来源、连接表、筛选行，再分组汇总，最后才选择要展示的字段。理解这个顺序，是排查复杂查询错误最快的办法。",
    "例如，SELECT 中起的别名不能直接在 WHERE 中使用，因为 WHERE 执行得更早；而 HAVING 用于筛选聚合后的组，因为它发生在 GROUP BY 之后。",
  ],
  syntaxLabel: "SQL 的常见逻辑执行顺序",
  syntax: `1. FROM / JOIN      确定数据来源并连接表
2. WHERE            筛选原始记录
3. GROUP BY         形成分组
4. HAVING           筛选分组
5. SELECT           计算并选择展示字段
6. ORDER BY         排序结果
7. LIMIT / OFFSET   截取结果`,
  sections: [
    {
      title: "把查询想成一条数据加工流水线",
      paragraphs: [
        "从 sales_pipeline 和 accounts 连接开始，每笔商机先获得客户行业；再用 WHERE 保留已成交记录；随后按行业 GROUP BY；HAVING 可以过滤商机数太少的行业；最后 SELECT 展示指标并按指标排序。",
        "当结果“不对”时，沿着这个顺序检查：连接是否让行数膨胀？WHERE 是否过早过滤？GROUP BY 的粒度是否正确？HAVING 是否错误地写成了 WHERE？",
      ],
      codeLabel: "按行业统计已成交商机并排序",
      code: `SELECT a.sector,
       COUNT(*) AS won_opportunity_count
FROM sales_pipeline AS p
JOIN accounts AS a
  ON p.account = a.account
WHERE p.deal_stage = 'Won'
GROUP BY a.sector
ORDER BY won_opportunity_count DESC;`,
    },
    {
      title: "WHERE、HAVING 与别名的常见误区",
      paragraphs: [
        "WHERE close_value > 1000 是对每笔商机筛选；HAVING SUM(close_value) > 1000 是对每位销售人员的汇总金额筛选。两者看起来相似，回答的却不是同一个业务问题。",
        "ORDER BY 在 SELECT 之后执行，因此可以使用 SELECT 中的别名，如 ORDER BY won_close_value DESC。WHERE 执行较早，不能依赖同一层 SELECT 刚起好的别名。",
      ],
      table: {
        title: "按执行阶段选择子句",
        columns: ["想做什么", "应使用", "示例"],
        rows: [
          ["只看已成交商机", "WHERE", "WHERE p.deal_stage = 'Won'"],
          ["只看成交数不少于 100 的销售人员", "HAVING", "HAVING COUNT(*) >= 100"],
          ["按汇总金额从高到低展示", "ORDER BY", "ORDER BY won_close_value DESC"],
        ],
      },
      tip: "不要机械背顺序。每写一个条件，先问它是在筛一条原始记录，还是在筛一组汇总结果。",
    },
  ],
  exerciseLead: "本课没有新函数，重点是把已学子句放在正确位置。最后一题会同时验收 JOIN、筛选、分组和排序。",
  datasetLabel: "sales_pipeline（商机）",
  sourceTables: [
    { label: "sales_pipeline（商机）", query: "SELECT opportunity_id, account, deal_stage, close_value FROM sales_pipeline LIMIT 8;" },
    { label: "accounts（客户档案）", query: "SELECT account, sector, office_location FROM accounts LIMIT 8;" },
  ],
  initialQuery: `SELECT opportunity_id, account, deal_stage, close_value
FROM sales_pipeline
LIMIT 12;`,
  tasks: [
    {
      id: "execution-filter-then-group",
      description: "排除待开发商机后，按商机阶段统计数量；计数列别名为 opportunity_count。",
      solution: "SELECT deal_stage, COUNT(*) AS opportunity_count\nFROM sales_pipeline\nWHERE deal_stage != 'Prospecting'\nGROUP BY deal_stage;",
    },
    {
      id: "execution-having-after-group",
      description: "统计每位销售人员的已成交商机数，并只保留不少于 100 条的销售人员；计数列别名为 won_opportunity_count。",
      solution: "SELECT sales_agent, COUNT(*) AS won_opportunity_count\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\nGROUP BY sales_agent\nHAVING COUNT(*) >= 100;",
    },
    {
      id: "execution-join-group-order",
      description: "连接商机表和客户档案表，按所属行业统计已成交商机数，并从高到低排序；计数列别名为 won_opportunity_count。",
      solution: "SELECT a.sector, COUNT(*) AS won_opportunity_count\nFROM sales_pipeline AS p\nJOIN accounts AS a\n  ON p.account = a.account\nWHERE p.deal_stage = 'Won'\nGROUP BY a.sector\nORDER BY won_opportunity_count DESC;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "aggregates-part-two", label: "SQL 课程 11：带聚合函数的查询（第 2 部分）" },
  nextLesson: { id: "case-when-business-classification", label: "SQL 课程 13：使用 CASE WHEN 进行业务分类" },
};
