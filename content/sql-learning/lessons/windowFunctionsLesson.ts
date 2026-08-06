import type { Lesson } from "@/lib/sql-learning/types";

export const windowFunctionsLesson: Lesson = {
  id: "window-functions",
  number: 17,
  title: "窗口函数：排名与累计值",
  shortTitle: "窗口函数：排名与累计值",
  intro: [
    "GROUP BY 会把多行压缩成一行，但很多分析既想保留每笔明细，又想在旁边看到它在组内的排名或累计值。窗口函数正好解决这个问题：它会“看着一组行计算”，却不会把明细行折叠掉。",
    "本课使用 RANK、DENSE_RANK、ROW_NUMBER 和 SUM() OVER。PARTITION BY 决定在哪个业务范围内计算，ORDER BY 决定排名或累计的先后顺序。",
    "窗口函数里的排序是分析口径的一部分。做累计成交金额时，如果同一天有多笔商机，就需要用 opportunity_id 作为第二排序条件，保证每一步都能复现。",
  ],
  syntaxLabel: "在保留明细的同时计算窗口指标",
  syntax: `函数(...) OVER (
  PARTITION BY 分组字段
  ORDER BY 排序字段
  ROWS BETWEEN ... AND ...
) AS 窗口指标`,
  sections: [
    {
      title: "窗口函数与 GROUP BY 的区别",
      paragraphs: [
        "GROUP BY 的结果是一组一个汇总值，例如每位销售人员一行；窗口函数会把这个值写回组内的每条记录。例如一笔成交商机既可以保留自己的 close_value，也可以同时显示它在产品内的金额排名。",
        "可以把窗口想成一扇移动的观察窗：PARTITION BY 划定窗户属于哪个组，ORDER BY 决定窗户从哪一行开始移动。",
      ],
      codeLabel: "计算每个产品内的成交金额排名",
      code: `SELECT product, opportunity_id, close_value,
       RANK() OVER (
         PARTITION BY product
         ORDER BY close_value DESC
       ) AS rank_in_product
FROM sales_pipeline
WHERE deal_stage = 'Won';`,
      tip: "RANK 遇到并列值会跳号；DENSE_RANK 遇到并列值不跳号；ROW_NUMBER 即使金额相同也会给每行一个唯一序号。",
    },
    {
      title: "排名函数：先选对含义，再选函数",
      paragraphs: [
        "RANK 适合回答“这笔商机在同产品中排第几”，并列第一后下一名会是第三。DENSE_RANK 适合连续名次。ROW_NUMBER 更适合去重或取每组前 N 条，因为每一行都有唯一编号。",
      ],
      table: {
        title: "三种常用排名函数",
        columns: ["函数", "并列时的表现", "适合场景"],
        rows: [
          ["RANK()", "会跳号", "竞赛式排名"],
          ["DENSE_RANK()", "不跳号", "连续等级排名"],
          ["ROW_NUMBER()", "每行唯一序号", "去重、取每组前 N 条"],
        ],
      },
    },
    {
      title: "累计值需要明确窗口范围",
      paragraphs: [
        "SUM(close_value) OVER (PARTITION BY sales_agent ORDER BY close_date, opportunity_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) 会从每位销售人员的第一笔成交开始，逐笔累加到当前记录。",
        "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW 的意思是“从本组第一行到当前行”。如果没有稳定的 ORDER BY，累计值的每一步就可能因为同一天记录的先后不确定而难以复核。",
      ],
    },
  ],
  exerciseLead: "窗口题会保留明细行，并严格核对窗口计算结果和最终排序。请不要把窗口函数误写成会压缩行数的 GROUP BY。",
  datasetLabel: "sales_pipeline（商机）",
  initialQuery: `SELECT opportunity_id, sales_agent, product, deal_stage, close_value
FROM sales_pipeline
WHERE deal_stage = 'Won'
LIMIT 12;`,
  tasks: [
    {
      id: "window-product-rank",
      description: "在每个产品内部，按成交金额从高到低为已成交商机排名；返回产品、商机编号、成交金额和别名为 rank_in_product 的排名，并按产品、排名、商机编号排列。",
      solution: "SELECT product, opportunity_id, close_value,\n       RANK() OVER (PARTITION BY product ORDER BY close_value DESC) AS rank_in_product\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\nORDER BY product ASC, rank_in_product ASC, opportunity_id ASC;",
      resultOrderMatters: true,
    },
    {
      id: "window-agent-cumulative-value",
      description: "按每位销售人员分别累计已成交金额，返回销售人员、商机编号、关闭日期、成交金额和别名为 cumulative_won_value 的累计金额；按销售人员、关闭日期、商机编号排列。",
      solution: "SELECT sales_agent, opportunity_id, close_date, close_value,\n       SUM(close_value) OVER (\n         PARTITION BY sales_agent\n         ORDER BY close_date ASC, opportunity_id ASC\n         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n       ) AS cumulative_won_value\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\nORDER BY sales_agent ASC, close_date ASC, opportunity_id ASC;",
      resultOrderMatters: true,
    },
    {
      id: "window-agent-rank",
      description: "先按销售人员汇总已成交金额，再使用 DENSE_RANK 对销售人员排名；返回销售人员、won_close_value 和别名为 sales_agent_rank 的排名，并按排名、销售人员排列。",
      solution: "WITH agent_totals AS (\n  SELECT sales_agent, SUM(close_value) AS won_close_value\n  FROM sales_pipeline\n  WHERE deal_stage = 'Won'\n  GROUP BY sales_agent\n)\nSELECT sales_agent, won_close_value,\n       DENSE_RANK() OVER (ORDER BY won_close_value DESC) AS sales_agent_rank\nFROM agent_totals\nORDER BY sales_agent_rank ASC, sales_agent ASC;",
      resultOrderMatters: true,
    },
    {
      id: "window-top-three-products",
      description: "使用 ROW_NUMBER 为每个产品内的已成交商机编号，只保留每个产品成交金额最高的 3 条；返回产品、销售人员、商机编号、成交金额和别名为 row_number_in_product 的序号。",
      solution: "WITH ranked_opportunities AS (\n  SELECT product, sales_agent, opportunity_id, close_value,\n         ROW_NUMBER() OVER (\n           PARTITION BY product\n           ORDER BY close_value DESC, opportunity_id ASC\n         ) AS row_number_in_product\n  FROM sales_pipeline\n  WHERE deal_stage = 'Won'\n)\nSELECT product, sales_agent, opportunity_id, close_value, row_number_in_product\nFROM ranked_opportunities\nWHERE row_number_in_product <= 3\nORDER BY product ASC, row_number_in_product ASC;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "cte", label: "SQL 课程 16：使用 CTE 拆解查询" },
  nextLesson: { id: "window-deduplication", label: "SQL 课程 18：窗口函数：用户去重与首末次行为" },
};
