import { caseWhenEvaluation } from "@/lib/sql-learning/evaluation/caseWhenEvaluator";
import type { Lesson } from "@/lib/sql-learning/types";

const sharedSelect = `SELECT
  opportunity_id,
  product,
  deal_stage,
  close_value,`;

export const caseWhenLesson: Lesson = {
  id: "case-when-business-classification",
  number: 13,
  title: "使用 CASE WHEN 进行业务分类",
  shortTitle: "CASE WHEN 业务分类",
  intro: [
    "产品分析中，原始字段往往不能直接回答业务问题。比如商机处于什么阶段、成交金额属于哪个区间，都需要先转成方便统计和沟通的业务分类。",
    "CASE WHEN 可以按顺序判断条件，并为每条记录返回一个新标签。它常被用于用户分群、订单状态、渠道归因和指标口径定义。",
    "本课使用 sales_pipeline 商机表。请把已成交商机按成交金额分为“高价值成交”和“一般成交”，并为流失或仍在推进的商机增加清晰标签。",
  ],
  syntaxLabel: "使用 CASE WHEN 创建业务分类",
  syntax: `CASE
  WHEN 条件 THEN 分类结果
  WHEN 条件 THEN 分类结果
  ELSE 默认分类
END AS 分类字段名`,
  sections: [
    {
      title: "CASE WHEN 像给每条商机贴标签",
      paragraphs: [
        "数据库会从上到下检查 WHEN 条件，遇到第一个符合的条件就停止。因此，更具体的规则要放在前面：先判断“已成交且金额不低于 1,000”，再判断“其他已成交”。",
        "ELSE 用来接住没有命中任何 WHEN 的记录。没有 ELSE 时，未命中的结果会显示为空值，分析时不容易看出它代表什么。",
      ],
      codeLabel: "先判断更具体的高价值成交",
      code: `CASE
  WHEN deal_stage = 'Won' AND close_value >= 1000 THEN '高价值成交'
  WHEN deal_stage = 'Won' THEN '一般成交'
  ELSE '推进中'
END AS opportunity_type`,
      tip: "deal_stage 中的 Won 是原始数据值，页面显示为“已成交”。SQL 条件仍需要使用 Won。",
    },
  ],
  exerciseLead: "每次只完成右侧当前高亮的一项任务；通过后，下一项才会解锁。",
  datasetLabel: "sales_pipeline（商机）",
  initialQuery: `SELECT
  opportunity_id,
  product,
  deal_stage,
  close_value,
  engage_date
FROM sales_pipeline
LIMIT 8;`,
  tasks: [
    {
      id: "case-when-high-value",
      description: "当 deal_stage = 'Won' 且成交金额不少于 1,000 时，标记为“高价值成交”。",
      solution: `${sharedSelect}
  CASE
    WHEN deal_stage = 'Won' AND close_value >= 1000 THEN '高价值成交'
    ELSE '其他'
  END AS opportunity_type
FROM sales_pipeline;`,
      evaluate: caseWhenEvaluation.highValue,
    },
    {
      id: "case-when-regular-won",
      description: "将其余已成交商机标记为“一般成交”。",
      solution: `${sharedSelect}
  CASE
    WHEN deal_stage = 'Won' AND close_value >= 1000 THEN '高价值成交'
    WHEN deal_stage = 'Won' THEN '一般成交'
    ELSE '其他'
  END AS opportunity_type
FROM sales_pipeline;`,
      evaluate: caseWhenEvaluation.regularWon,
    },
    {
      id: "case-when-other-stages",
      description: "将流失商机标记为“已流失”，其他商机标记为“推进中”。",
      solution: `${sharedSelect}
  CASE
    WHEN deal_stage = 'Won' AND close_value >= 1000 THEN '高价值成交'
    WHEN deal_stage = 'Won' THEN '一般成交'
    WHEN deal_stage = 'Lost' THEN '已流失'
    ELSE '推进中'
  END AS opportunity_type
FROM sales_pipeline;`,
      evaluate: caseWhenEvaluation.otherStages,
    },
  ],
  previousLesson: { id: "execution-order", label: "SQL 课程 12：查询的执行顺序" },
  nextLesson: { id: "date-ranges", label: "SQL 课程 14：日期筛选与时间范围分析" },
};
