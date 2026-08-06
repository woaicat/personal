import type { Lesson } from "@/lib/sql-learning/types";

export const aggregatesPartTwoLesson: Lesson = {
  id: "aggregates-part-two",
  number: 11,
  title: "带聚合函数的查询（第 2 部分）",
  shortTitle: "聚合函数查询（第 2 部分）",
  intro: [
    "上一课的聚合函数给出了一个总答案；但产品分析更常需要比较不同对象。例如各商机阶段分别有多少条记录、哪位销售人员带来的成交金额最高、哪个行业的已成交商机更多。",
    "GROUP BY 会先把记录按某个字段分成多组，再在每组内计算 COUNT、SUM 或 AVG。HAVING 则用于筛选已经聚合后的分组结果。",
  ],
  syntaxLabel: "按业务维度分组汇总",
  syntax: `SELECT 分组字段, 聚合函数(字段) AS 指标
FROM 表名
WHERE 行级筛选条件
GROUP BY 分组字段
HAVING 聚合后的筛选条件
ORDER BY 指标 DESC;`,
  sections: [
    {
      title: "GROUP BY：先分组，再计算",
      paragraphs: [
        "例如按 deal_stage 分组后，数据库会分别形成已成交、已流失、跟进中、待开发四组，再为每组计算商机数。SELECT 中除聚合函数外出现的字段，通常都需要写在 GROUP BY 中。",
      ],
      codeLabel: "查看各商机阶段的商机数量",
      code: `SELECT deal_stage,
       COUNT(*) AS opportunity_count
FROM sales_pipeline
GROUP BY deal_stage;`,
      tip: "GROUP BY 的字段决定了分析粒度：按销售人员分组得到“人”的表现，按客户分组得到“客户”的表现。",
    },
    {
      title: "WHERE 和 HAVING：筛选的时机不同",
      paragraphs: [
        "WHERE 在分组前过滤原始记录，适合写 deal_stage = 'Won' 这类行级条件；HAVING 在分组和聚合后过滤结果，适合写 COUNT(*) >= 100 这类指标条件。",
      ],
      table: {
        title: "两种筛选的分工",
        columns: ["子句", "筛选对象", "CRM 示例"],
        rows: [
          ["WHERE", "一条原始商机记录", "WHERE deal_stage = 'Won'"],
          ["HAVING", "一组汇总结果", "HAVING COUNT(*) >= 100"],
        ],
      },
      codeLabel: "只保留商机数不少于 100 的销售人员",
      code: `SELECT sales_agent, COUNT(*) AS won_opportunity_count
FROM sales_pipeline
WHERE deal_stage = 'Won'
GROUP BY sales_agent
HAVING COUNT(*) >= 100;`,
    },
  ],
  exerciseLead: "分组题会同时校验分组字段、聚合指标和 WHERE/HAVING 的作用范围；需要排序的题还会校验顺序。",
  datasetLabel: "sales_pipeline（商机）",
  initialQuery: `SELECT sales_agent, deal_stage, close_value
FROM sales_pipeline
LIMIT 12;`,
  tasks: [
    {
      id: "group-stage-count",
      description: "按商机阶段汇总商机数量，返回商机阶段和别名为 opportunity_count 的计数列。",
      solution: "SELECT deal_stage, COUNT(*) AS opportunity_count\nFROM sales_pipeline\nGROUP BY deal_stage;",
    },
    {
      id: "group-agent-won-count",
      description: "按销售人员汇总已成交商机数量，返回销售人员和别名为 won_opportunity_count 的计数列。",
      solution: "SELECT sales_agent, COUNT(*) AS won_opportunity_count\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\nGROUP BY sales_agent;",
    },
    {
      id: "group-agent-won-value",
      description: "按销售人员汇总已成交金额，并按金额从高到低排序；金额列别名为 won_close_value。",
      solution: "SELECT sales_agent, SUM(close_value) AS won_close_value\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\nGROUP BY sales_agent\nORDER BY won_close_value DESC;",
      resultOrderMatters: true,
    },
    {
      id: "group-agent-having",
      description: "找出已成交商机数不少于 100 的销售人员，返回销售人员和别名为 won_opportunity_count 的计数列。",
      solution: "SELECT sales_agent, COUNT(*) AS won_opportunity_count\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\nGROUP BY sales_agent\nHAVING COUNT(*) >= 100;",
    },
  ],
  previousLesson: { id: "aggregates-part-one", label: "SQL 课程 10：带聚合函数的查询（第 1 部分）" },
  nextLesson: { id: "execution-order", label: "SQL 课程 12：查询的执行顺序" },
};
