import type { Lesson } from "@/lib/sql-learning/types";

export const dateRangesLesson: Lesson = {
  id: "date-ranges",
  number: 14,
  title: "日期筛选与时间范围分析",
  shortTitle: "日期筛选与时间范围分析",
  intro: [
    "产品经理经常会问“某个时间段发生了什么”：十月份新增了多少商机？第四季度成交了多少笔？某位销售在第一季度最早什么时候开始跟进？这类问题的关键，是把日期边界写得准确。",
    "本课使用 sales_pipeline 中的 engage_date（开始跟进日期）和 close_date（关闭日期）。它们采用 YYYY-MM-DD 格式，所以可以直接用 >=、< 和 BETWEEN 做时间范围筛选。",
    "日期分析还有一个容易忽略的事实：未关闭的商机没有 close_date。缺失日期不是一个具体日期，不能把它当成 0 或空字符串参与比较。",
  ],
  syntaxLabel: "按日期筛选记录",
  syntax: `SELECT 字段
FROM 表名
WHERE 日期字段 >= '开始日期'
  AND 日期字段 < '结束日期';`,
  sections: [
    {
      title: "ISO 日期可以按字符串顺序比较",
      paragraphs: [
        "YYYY-MM-DD 的排列顺序与时间先后顺序一致：2017-03-01 小于 2017-10-01。只要日期字段保持这种格式，WHERE close_date >= '2017-10-01' 就能筛出从 10 月 1 日开始的记录。日期常量要用单引号，不能写成数字 20171001。",
        "开始日期通常使用 >=，结束日期更推荐使用下一个时间段的起点并写 <。例如筛选整个 10 月，写 close_date >= '2017-10-01' AND close_date < '2017-11-01'，就不会漏掉 10 月 31 日，也不会误带入 11 月 1 日。",
      ],
      codeLabel: "筛选 2017 年 10 月关闭的商机",
      code: `SELECT opportunity_id, close_date, deal_stage
FROM sales_pipeline
WHERE close_date >= '2017-10-01'
  AND close_date < '2017-11-01';`,
      tip: "用下一个月的第一天作为结束边界，比手写某个月有 30 天还是 31 天更稳妥。",
    },
    {
      title: "BETWEEN 包含两端，适合真正的闭区间",
      paragraphs: [
        "BETWEEN '2016-10-01' AND '2016-12-31' 等价于 >= '2016-10-01' AND <= '2016-12-31'，两端日期都会被包含。它适合按自然日描述一个已经明确知道最后一天的范围。",
        "如果分析的是月份、季度或年度，使用“左闭右开”的 >= 起点 AND < 下一个周期起点通常更不容易出错。这样也方便把相邻的时间段拼接起来，而不会重复计算边界记录。",
      ],
      table: {
        title: "日期范围写法速查",
        columns: ["写法", "含义", "示例"],
        rows: [
          [">= 起点 AND < 终点", "左闭右开，不包含终点", "完整 2017 年 10 月"],
          ["BETWEEN 起点 AND 终点", "包含起点和终点", "2016-10-01 至 2016-12-31"],
          ["IS NOT NULL", "排除没有日期的记录", "只看已经关闭的商机"],
        ],
      },
    },
    {
      title: "先确认日期代表什么业务事件",
      paragraphs: [
        "engage_date 代表开始跟进，close_date 代表商机关闭。用 close_date 分析成交或流失的发生时间，用 engage_date 分析销售团队何时开始接触客户；不要因为两个字段都长得像日期，就混用它们。",
        "例如“2017 年第一季度开始跟进、后来已经有关闭日期的商机”需要同时筛选 engage_date 和 close_date。多个条件一起写，才能让时间范围对应真实的业务问题。",
      ],
    },
  ],
  exerciseLead: "每题都会严格核对日期范围、返回字段和完整结果。请特别留意结束日期是否应该写成下一个周期的起点。",
  datasetLabel: "sales_pipeline（商机）",
  initialQuery: `SELECT opportunity_id, deal_stage, engage_date, close_date
FROM sales_pipeline
LIMIT 12;`,
  tasks: [
    {
      id: "date-range-october-closed",
      description: "列出 2017 年 10 月关闭的所有商机，返回商机编号、关闭日期和商机阶段，并按关闭日期正序、商机编号正序排列。",
      solution: "SELECT opportunity_id, close_date, deal_stage\nFROM sales_pipeline\nWHERE close_date >= '2017-10-01'\n  AND close_date < '2017-11-01'\nORDER BY close_date ASC, opportunity_id ASC;",
      resultOrderMatters: true,
    },
    {
      id: "date-range-q4-won-count",
      description: "统计 2017 年第四季度已成交商机数量，结果列别名为 q4_won_opportunity_count。",
      solution: "SELECT COUNT(*) AS q4_won_opportunity_count\nFROM sales_pipeline\nWHERE deal_stage = 'Won'\n  AND close_date >= '2017-10-01'\n  AND close_date < '2018-01-01';",
    },
    {
      id: "date-range-agent-first-engage",
      description: "统计 2016 年第四季度每位销售人员最早的开始跟进日期，返回销售人员和别名为 first_engage_date 的日期，并按日期正序、销售人员正序排列。",
      solution: "SELECT sales_agent, MIN(engage_date) AS first_engage_date\nFROM sales_pipeline\nWHERE engage_date BETWEEN '2016-10-01' AND '2016-12-31'\nGROUP BY sales_agent\nHAVING MIN(engage_date) IS NOT NULL\nORDER BY first_engage_date ASC, sales_agent ASC;",
      resultOrderMatters: true,
    },
    {
      id: "date-range-q1-engaged-closed",
      description: "找出 2017 年第一季度开始跟进、且已经有关闭日期的 10 条商机，返回商机编号、开始跟进日期和关闭日期；按开始跟进日期倒序、商机编号正序排列。",
      solution: "SELECT opportunity_id, engage_date, close_date\nFROM sales_pipeline\nWHERE engage_date >= '2017-01-01'\n  AND engage_date < '2017-04-01'\n  AND close_date IS NOT NULL\nORDER BY engage_date DESC, opportunity_id ASC\nLIMIT 10;",
      resultOrderMatters: true,
    },
  ],
  previousLesson: { id: "case-when-business-classification", label: "SQL 课程 13：使用 CASE WHEN 进行业务分类" },
  nextLesson: { id: "date-granularity", label: "SQL 课程 15：按日、周、月统计数据" },
};
