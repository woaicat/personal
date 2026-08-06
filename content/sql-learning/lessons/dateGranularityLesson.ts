import type { Lesson } from "@/lib/sql-learning/types";

export const dateGranularityLesson: Lesson = {
  id: "date-granularity",
  number: 15,
  title: "按日、周、月统计数据",
  shortTitle: "按日、周、月统计数据",
  intro: [
    "单条日期记录适合追踪某一笔商机，但产品分析通常需要看趋势：每天成交量有没有突然变化？每周的销售节奏如何？哪个月份贡献了更多成交金额？",
    "SQLite 提供 strftime 函数，可以从日期文本中提取年份、月份、星期等部分。把提取出的时间粒度放进 GROUP BY，就能把逐笔记录汇总成日、周或月的趋势表。",
    "时间粒度决定了你看到的故事：按日看波动，按周看节奏，按月看整体趋势。粒度越粗，结果越稳定，但也会隐藏短期变化。",
  ],
  syntaxLabel: "提取日期粒度并分组",
  syntax: `SELECT strftime('%Y-%m', close_date) AS close_month,
       COUNT(*) AS opportunity_count
FROM sales_pipeline
WHERE deal_stage = 'Won'
GROUP BY close_month
ORDER BY close_month;`,
  sections: [
    {
      title: "strftime：从完整日期中提取分析维度",
      paragraphs: [
        "strftime('%Y', close_date) 提取四位年份，strftime('%m', close_date) 提取两位月份，strftime('%d', close_date) 提取日。把 '%Y-%m' 组合起来，就能得到类似 2017-03 的月份标签。",
        "不要直接按 close_date 分组来做月度趋势，那会把每一天都当成一个分组。想按月统计，就要先把日期转换成月份表达式，并在 SELECT 与 GROUP BY 中保持同一分析粒度。",
      ],
      codeLabel: "统计每个月的已成交商机数量",
      code: `SELECT strftime('%Y-%m', close_date) AS close_month,
       COUNT(*) AS won_opportunity_count
FROM sales_pipeline
WHERE deal_stage = 'Won'
  AND close_date IS NOT NULL
GROUP BY close_month
ORDER BY close_month ASC;`,
      tip: "strftime 的结果是文本。使用 YYYY-MM 格式后，按字母升序排列也正好对应从早到晚的月份顺序。",
    },
    {
      title: "周统计要先定义“一周从哪天开始”",
      paragraphs: [
        "SQLite 的 strftime('%w', close_date) 会返回星期几的数字：星期日是 0，星期一是 1。用 date(close_date, '-' || strftime('%w', close_date) || ' days') 可以把每一天换算成所在周的周日。",
        "这一步不是纯技术细节：周一开始还是周日开始，可能会影响周报的数字。分析前要把口径写清楚。本课统一使用“周日作为一周起点”。",
      ],
      table: {
        title: "常用日期格式符",
        columns: ["格式符", "含义", "结果示例"],
        rows: [
          ["%Y", "四位年份", "2017"],
          ["%m", "两位月份", "03"],
          ["%d", "两位日期", "09"],
          ["%w", "星期几，周日为 0", "4"],
        ],
      },
    },
    {
      title: "先过滤事件，再选择统计指标",
      paragraphs: [
        "“成交趋势”应该先 WHERE deal_stage = 'Won'，再按日期分组。如果把 Lost、Engaging 和 Prospecting 一起算进去，得到的其实是“所有商机关闭记录”或混合口径，而不是成交趋势。",
        "同一个时间粒度可以搭配不同指标：COUNT 看笔数，SUM 看金额，AVG 看平均客单价。先明确业务问题，再选择聚合函数。",
      ],
    },
  ],
  exerciseLead: "本课会核对日期转换后的分组标签、聚合指标和排序顺序；月、周、日的边界都要与任务描述一致。",
  datasetLabel: "sales_pipeline（商机）",
  initialQuery: `SELECT close_date, deal_stage, close_value
FROM sales_pipeline
WHERE close_date IS NOT NULL
LIMIT 12;`,
  tasks: [
    {
      id: "granularity-daily-december",
      description: "统计 2017 年 12 月每天的已成交商机数量，返回关闭日期别名 close_day 和别名为 won_opportunity_count 的计数，并按日期正序排列。",
      solution: "SELECT close_date AS close_day, COUNT(*) AS won_opportunity_count\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\n  AND close_date >= '2017-12-01'\n  AND close_date < '2018-01-01'\nGROUP BY close_day\nORDER BY close_day ASC;",
      resultOrderMatters: true,
    },
    {
      id: "granularity-weekly-october",
      description: "统计 2017 年 10 月每周的已成交商机数量，以周日作为每周起点；周起始日期列别名为 week_start，按周正序排列。",
      solution: "SELECT date(close_date, '-' || strftime('%w', close_date) || ' days') AS week_start,\n       COUNT(*) AS won_opportunity_count\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\n  AND close_date >= '2017-10-01'\n  AND close_date < '2017-11-01'\nGROUP BY week_start\nORDER BY week_start ASC;",
      resultOrderMatters: true,
    },
    {
      id: "granularity-monthly-count",
      description: "按月份统计全部已成交商机数量，返回月份别名 close_month 和别名为 won_opportunity_count 的计数，并按月份从早到晚排列。",
      solution: "SELECT strftime('%Y-%m', close_date) AS close_month,\n       COUNT(*) AS won_opportunity_count\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\n  AND close_date IS NOT NULL\nGROUP BY close_month\nORDER BY close_month ASC;",
      resultOrderMatters: true,
    },
    {
      id: "granularity-monthly-value",
      description: "按月份汇总已成交金额，返回月份别名 close_month 和别名为 won_close_value 的金额合计，并按月份正序排列。",
      solution: "SELECT strftime('%Y-%m', close_date) AS close_month,\n       SUM(close_value) AS won_close_value\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\n  AND close_date IS NOT NULL\nGROUP BY close_month\nORDER BY close_month ASC;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "date-ranges", label: "SQL 课程 14：日期筛选与时间范围分析" },
  nextLesson: { id: "cte", label: "SQL 课程 16：使用 CTE 拆解查询" },
};
