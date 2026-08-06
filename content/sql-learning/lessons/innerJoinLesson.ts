import type { Lesson } from "@/lib/sql-learning/types";

export const innerJoinLesson: Lesson = {
  id: "inner-joins",
  number: 6,
  title: "使用 JOIN 进行多表查询",
  shortTitle: "使用 JOIN 进行多表查询",
  intro: [
    "真实业务信息通常分散在多张表中：商机表记录一笔销售机会，销售团队表记录人员归属，客户表保存行业与规模。JOIN 的作用是依据共同字段，把它们临时拼成一张适合分析的结果表。",
    "普通 JOIN（也叫 INNER JOIN）只保留两张表都能匹配上的记录。它非常适合回答“每笔商机由谁跟进”“该客户属于哪个行业”这类需要跨表的信息问题。",
  ],
  syntaxLabel: "按共同字段连接两张表",
  syntax: `SELECT 字段
FROM 表A AS a
JOIN 表B AS b
  ON a.共同字段 = b.共同字段;`,
  sections: [
    {
      title: "把 ON 理解为两张表的“对接规则”",
      paragraphs: [
        "ON 后面必须写清楚哪两个字段代表同一件事。例如 sales_pipeline 和 sales_teams 都有 sales_agent；当两边的销售人员相同时，一笔商机就能匹配到其主管和区域办公室。",
        "a、b、p、t 这类短写法叫表别名。它们不是必须的，但在多表查询里能让字段来源一目了然，也能避免两张表都有 account 时产生歧义。",
      ],
      codeLabel: "为每笔商机补充销售团队信息",
      code: `SELECT p.opportunity_id, p.sales_agent, t.manager
FROM sales_pipeline AS p
JOIN sales_teams AS t
  ON p.sales_agent = t.sales_agent;`,
    },
    {
      title: "INNER JOIN 会过滤什么？",
      paragraphs: [
        "只有 ON 条件匹配成功的行会被保留。如果产品目录中没有对应产品，或商机记录缺少客户名称，那条记录不会出现在 INNER JOIN 的结果里。这不是数据被删除，而是本次查询没有把它选出来。",
        "下一课会学习外连接：当你想保留“没有匹配项”的记录来排查漏数或数据质量时，外连接更合适。",
      ],
      tip: "先检查要连接的字段是否确实代表同一业务实体。名称相同但含义不同的字段，不能直接 JOIN。",
    },
  ],
  exerciseLead: "每题都需要写清 JOIN 的对象和 ON 条件；系统会核对全部匹配记录，而不是只检查示例行。",
  datasetLabel: "sales_pipeline（商机）",
  sourceTables: [
    { label: "sales_pipeline（商机）", query: "SELECT opportunity_id, sales_agent, product, account FROM sales_pipeline LIMIT 8;" },
    { label: "sales_teams（销售团队）", query: "SELECT sales_agent, manager, regional_office FROM sales_teams LIMIT 8;" },
    { label: "accounts（客户档案）", query: "SELECT account, sector, office_location FROM accounts LIMIT 8;" },
    { label: "products（产品目录）", query: "SELECT product, series, sales_price FROM products;" },
  ],
  initialQuery: `SELECT opportunity_id, sales_agent, product, account
FROM sales_pipeline
LIMIT 12;`,
  tasks: [
    {
      id: "join-sales-team",
      description: "连接商机表和销售团队表，列出每笔商机的编号、销售人员和销售主管。",
      solution: "SELECT p.opportunity_id, p.sales_agent, t.manager\nFROM sales_pipeline AS p\nJOIN sales_teams AS t\n  ON p.sales_agent = t.sales_agent;",
    },
    {
      id: "join-account-sector",
      description: "连接商机表和客户档案表，列出商机编号、客户名称和所属行业。",
      solution: "SELECT p.opportunity_id, p.account, a.sector\nFROM sales_pipeline AS p\nJOIN accounts AS a\n  ON p.account = a.account;",
    },
    {
      id: "join-product-price",
      description: "连接商机表和产品目录，列出商机编号、产品名称和标准售价。",
      solution: "SELECT p.opportunity_id, p.product, pr.sales_price\nFROM sales_pipeline AS p\nJOIN products AS pr\n  ON p.product = pr.product;",
    },
  ],
  previousLesson: { id: "select-review", label: "SQL 复习：简单的 SELECT 查询" },
  nextLesson: { id: "outer-joins", label: "SQL 课程 7：外连接" },
};
