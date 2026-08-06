import type { Lesson } from "@/lib/sql-learning/types";

export const aggregatesPartOneLesson: Lesson = {
  id: "aggregates-part-one",
  number: 10,
  title: "带聚合函数的查询（第 1 部分）",
  shortTitle: "聚合函数查询（第 1 部分）",
  intro: [
    "产品分析常常不需要逐条查看商机，而是想快速得到一个总数：本月有多少商机、已成交金额是多少、平均成交金额大约多少。聚合函数会把多行记录压缩为一个汇总值，正适合回答这类问题。",
    "本课使用 sales_pipeline 商机表。它记录了每笔商机的阶段和成交金额；你将从逐行浏览，升级到用一条查询得到业务概览。",
  ],
  syntaxLabel: "在 SELECT 中使用聚合函数",
  syntax: `SELECT 聚合函数(字段) AS 指标名称
FROM 表名
WHERE 筛选条件;`,
  sections: [
    {
      title: "聚合函数把很多行变成一个答案",
      paragraphs: [
        "COUNT 用于计数，SUM 计算总和，AVG 计算平均值，MIN 和 MAX 分别找最小与最大值。除非后续使用 GROUP BY 分组，否则一条聚合查询通常只返回一行结果。",
        "例如，销售负责人问“所有已成交商机累计带来了多少收入”，你不需要导出 4,000 多行再手工相加；SUM 就能在数据库中完成计算。",
      ],
      table: {
        title: "常用聚合函数",
        columns: ["函数", "作用", "CRM 示例"],
        rows: [
          ["COUNT(*)", "统计记录行数", "COUNT(*) AS opportunity_count"],
          ["SUM(字段)", "计算数值总和", "SUM(close_value)"],
          ["AVG(字段)", "计算数值平均值", "AVG(close_value)"],
          ["MIN(字段)", "返回最小值", "MIN(close_value)"],
          ["MAX(字段)", "返回最大值", "MAX(close_value)"],
        ],
      },
    },
    {
      title: "先筛选，再汇总",
      paragraphs: [
        "WHERE 会在聚合前筛掉不需要的记录。若要计算已成交金额，应该先筛出 deal_stage = 'Won'，再对 close_value 求和；否则跟进中和已流失商机也会混入结果。",
        "NULL 会被 SUM、AVG、MIN、MAX 忽略；COUNT(*) 则会统计每一行。理解这个差异，能避免把“未关闭、没有金额”的商机误计入平均值。",
      ],
      codeLabel: "计算已成交商机的总成交金额",
      code: `SELECT SUM(close_value) AS won_close_value
FROM sales_pipeline
WHERE deal_stage = 'Won';`,
      tip: "聚合结果也应使用 AS 起清晰别名。页面会把 won_close_value 显示为“已成交金额合计”，SQL 中仍需使用原别名。",
    },
  ],
  exerciseLead: "每题都会返回一个汇总指标。请注意聚合字段、筛选条件和 AS 别名都属于验收范围。",
  datasetLabel: "sales_pipeline（商机）",
  initialQuery: `SELECT opportunity_id, deal_stage, close_value
FROM sales_pipeline
LIMIT 12;`,
  tasks: [
    {
      id: "aggregate-count-all",
      description: "统计全部商机数量，结果列别名为 opportunity_count。",
      solution: "SELECT COUNT(*) AS opportunity_count\nFROM sales_pipeline;",
    },
    {
      id: "aggregate-count-won",
      description: "统计已成交商机数量，结果列别名为 won_opportunity_count。",
      solution: "SELECT COUNT(*) AS won_opportunity_count\nFROM sales_pipeline\nWHERE deal_stage = 'Won';",
    },
    {
      id: "aggregate-sum-won-value",
      description: "计算已成交商机的成交金额合计，结果列别名为 won_close_value。",
      solution: "SELECT SUM(close_value) AS won_close_value\nFROM sales_pipeline\nWHERE deal_stage = 'Won';",
    },
    {
      id: "aggregate-average-won-value",
      description: "计算已成交商机的平均成交金额，结果列别名为 average_won_close_value。",
      solution: "SELECT AVG(close_value) AS average_won_close_value\nFROM sales_pipeline\nWHERE deal_stage = 'Won';",
    },
  ],
  previousLesson: { id: "expression-queries", label: "SQL 课程 9：带表达式的查询" },
  nextLesson: { id: "aggregates-part-two", label: "SQL 课程 11：带聚合函数的查询（第 2 部分）" },
};
