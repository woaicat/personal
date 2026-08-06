import type { Lesson } from "@/lib/sql-learning/types";

export const conversionFunnelLesson: Lesson = {
  id: "conversion-funnel",
  number: 19,
  title: "产品转化漏斗分析",
  shortTitle: "产品转化漏斗分析",
  intro: [
    "漏斗分析是在问：一批对象经过一系列阶段后，还剩下多少？产品经理会用它观察注册、激活、付费等步骤；销售团队也会用它观察商机从接触到成交的过程。",
    "本课使用 sales_pipeline 的 deal_stage 做一个 CRM 商机漏斗：Prospecting（待开发）→ Engaging（跟进中）→ Won（已成交）。Lost（已流失）是离开主路径的结果，需要单独观察。",
    "需要先说明数据边界：当前表记录的是每笔商机的阶段快照，不是同一个用户逐步经过每个阶段的事件日志。因此，本课得到的是“商机阶段分布和成交率练习”，不能直接当成严格的用户转化率。",
  ],
  syntaxLabel: "先汇总阶段，再计算漏斗指标",
  syntax: `WITH stage_counts AS (
  SELECT deal_stage, COUNT(*) AS opportunity_count
  FROM sales_pipeline
  GROUP BY deal_stage
)
SELECT deal_stage, opportunity_count
FROM stage_counts
ORDER BY ...;`,
  sections: [
    {
      title: "漏斗的第一步：先把每个阶段数清楚",
      paragraphs: [
        "最基础的漏斗不是马上算百分比，而是先回答“每个阶段有多少笔商机”。COUNT(*) 统计记录数，GROUP BY deal_stage 把记录按阶段分组。只有分组结果正确，后面的比例才有意义。",
        "数据库默认按字母顺序返回阶段，但业务漏斗需要自己的顺序。可以用 CASE WHEN 给阶段编号：Prospecting 排第 1，Engaging 排第 2，Won 排第 3，Lost 排第 4。",
      ],
      codeLabel: "按业务顺序统计商机阶段",
      code: `SELECT deal_stage,
       COUNT(*) AS opportunity_count
FROM sales_pipeline
GROUP BY deal_stage
ORDER BY CASE deal_stage
  WHEN 'Prospecting' THEN 1
  WHEN 'Engaging' THEN 2
  WHEN 'Won' THEN 3
  WHEN 'Lost' THEN 4
END;`,
      tip: "页面会把 Won 显示成“已成交”，但 SQL 条件和排序仍要使用原始值 Won。",
    },
    {
      title: "数量、占比和成交率不是一回事",
      paragraphs: [
        "阶段数量回答“有多少笔”，阶段占比回答“全部商机中这一阶段占多少”。例如一个阶段有 1,000 笔，不代表这 1,000 笔都来自同一批用户，也不代表它们最终都会成交。",
        "本课还会计算整体 Won rate：已成交商机数 ÷ 全部商机数。这个指标描述当前 CRM 管道中的成交比例；如果要分析严格的用户转化，还需要用户事件表和明确的进入漏斗时间。",
      ],
      table: {
        title: "本课使用的漏斗指标",
        columns: ["指标", "计算方式", "回答的问题"],
        rows: [
          ["阶段数量", "COUNT(*)", "每个阶段有多少笔商机？"],
          ["阶段占比", "阶段数量 ÷ 全部数量", "全部商机中有多少在这个阶段？"],
          ["成交率", "Won 数量 ÷ 全部数量", "当前管道中有多少笔已成交？"],
        ],
      },
    },
    {
      title: "按产品拆开，寻找漏斗差异",
      paragraphs: [
        "整体成交率可能掩盖产品之间的差异。按 product 分组后，可以同时观察每种产品的商机数量、成交数量和成交率。分析时要同时看分母：只有几笔商机的产品，即使成交率很高，也未必比大体量产品更稳定。",
      ],
    },
  ],
  exerciseLead: "本课会核对分组结果、阶段顺序、比例计算和产品维度的完整结果；请区分阶段占比与成交率。",
  datasetLabel: "sales_pipeline（商机）",
  initialQuery: `SELECT opportunity_id, product, deal_stage, close_value
FROM sales_pipeline
LIMIT 12;`,
  tasks: [
    {
      id: "funnel-stage-counts",
      description: "统计每个商机阶段的数量，返回 deal_stage 和别名为 opportunity_count 的计数，并按待开发、跟进中、已成交、已流失的业务顺序排列。",
      solution: "SELECT deal_stage, COUNT(*) AS opportunity_count\nFROM sales_pipeline\nGROUP BY deal_stage\nORDER BY CASE deal_stage\n  WHEN 'Prospecting' THEN 1\n  WHEN 'Engaging' THEN 2\n  WHEN 'Won' THEN 3\n  WHEN 'Lost' THEN 4\nEND;",
      resultOrderMatters: true,
    },
    {
      id: "funnel-stage-share",
      description: "计算每个商机阶段占全部商机的比例，返回阶段、opportunity_count 和四舍五入到 2 位小数的 stage_share_pct，并按业务阶段顺序排列。",
      solution: "WITH stage_counts AS (\n  SELECT deal_stage, COUNT(*) AS opportunity_count\n  FROM sales_pipeline\n  GROUP BY deal_stage\n)\nSELECT deal_stage,\n       opportunity_count,\n       ROUND(opportunity_count * 100.0 / SUM(opportunity_count) OVER (), 2) AS stage_share_pct\nFROM stage_counts\nORDER BY CASE deal_stage\n  WHEN 'Prospecting' THEN 1\n  WHEN 'Engaging' THEN 2\n  WHEN 'Won' THEN 3\n  WHEN 'Lost' THEN 4\nEND;",
      resultOrderMatters: true,
    },
    {
      id: "funnel-overall-won-rate",
      description: "计算全部商机数量、已成交商机数量和已成交比例；返回 total_opportunity_count、won_opportunity_count、won_rate_pct，比例四舍五入到 2 位小数。",
      solution: "SELECT COUNT(*) AS total_opportunity_count,\n       SUM(CASE WHEN deal_stage = 'Won' THEN 1 ELSE 0 END) AS won_opportunity_count,\n       ROUND(100.0 * SUM(CASE WHEN deal_stage = 'Won' THEN 1 ELSE 0 END) / COUNT(*), 2) AS won_rate_pct\nFROM sales_pipeline;",
    },
    {
      id: "funnel-product-comparison",
      description: "按产品比较商机总数、已成交商机数和成交率；返回 product、total_opportunity_count、won_opportunity_count、won_rate_pct，并按成交率从高到低、产品名称正序排列。",
      solution: "SELECT product,\n       COUNT(*) AS total_opportunity_count,\n       SUM(CASE WHEN deal_stage = 'Won' THEN 1 ELSE 0 END) AS won_opportunity_count,\n       ROUND(100.0 * SUM(CASE WHEN deal_stage = 'Won' THEN 1 ELSE 0 END) / COUNT(*), 2) AS won_rate_pct\nFROM sales_pipeline\nGROUP BY product\nORDER BY won_rate_pct DESC, product ASC;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "window-deduplication", label: "SQL 课程 18：窗口函数：用户去重与首末次行为" },
  nextLesson: { id: "retention-analysis", label: "SQL 课程 20：用户留存分析" },
};
