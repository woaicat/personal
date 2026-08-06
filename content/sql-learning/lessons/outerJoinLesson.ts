import type { Lesson } from "@/lib/sql-learning/types";

export const outerJoinLesson: Lesson = {
  id: "outer-joins",
  number: 7,
  title: "外连接",
  shortTitle: "外连接",
  intro: [
    "INNER JOIN 只保留能匹配的记录，但分析中常常更关心“没有匹配上的那部分”：哪些销售人员还没有商机？哪些商机的产品没有出现在产品目录里？这正是外连接的用武之地。",
    "LEFT JOIN 会完整保留左边表的记录；右边表找不到匹配时，右侧字段会显示为 NULL。换句话说，外连接既可以补齐名单，也能暴露数据缺口。",
  ],
  syntaxLabel: "保留左表的所有记录",
  syntax: `SELECT 字段
FROM 左表 AS a
LEFT JOIN 右表 AS b
  ON a.共同字段 = b.共同字段;`,
  sections: [
    {
      title: "“左”到底指谁？",
      paragraphs: [
        "LEFT JOIN 中，写在 FROM 后面的表就是左表，它的记录会被全部保留。比如从 sales_teams 出发连接商机表，就能看到每一位销售人员；没有商机的人员在 opportunity_id 列显示 NULL。",
        "如果把两张表的位置交换，保留的对象也会交换。写外连接前，先问自己：我最不想丢掉的是哪份名单？把它放在左边。",
      ],
      codeLabel: "保留所有销售人员，即使暂时没有商机",
      code: `SELECT t.sales_agent, p.opportunity_id
FROM sales_teams AS t
LEFT JOIN sales_pipeline AS p
  ON t.sales_agent = p.sales_agent;`,
    },
    {
      title: "外连接也是数据质量检查工具",
      paragraphs: [
        "本地数据中，商机表出现了 GTXPro，而产品目录记录的是 GTX Pro。两者看起来很像，但字符串并不完全相同，INNER JOIN 会直接丢掉这些记录；LEFT JOIN 加上“右表字段为 NULL”的条件，则能把问题找出来。",
      ],
      tip: "NULL 不等于空字符串，也不等于 0。判断缺失值要使用 IS NULL，下一课会专门讲它。",
    },
  ],
  exerciseLead: "外连接的重点不是多写一个 LEFT，而是先确定必须保留哪张表的全部记录。",
  datasetLabel: "sales_teams（销售团队）",
  sourceTables: [
    { label: "sales_teams（销售团队）", query: "SELECT sales_agent, manager, regional_office FROM sales_teams LIMIT 8;" },
    { label: "sales_pipeline（商机）", query: "SELECT opportunity_id, sales_agent, product, account FROM sales_pipeline LIMIT 8;" },
    { label: "products（产品目录）", query: "SELECT product, series, sales_price FROM products;" },
  ],
  initialQuery: `SELECT sales_agent, manager, regional_office
FROM sales_teams
LIMIT 12;`,
  tasks: [
    {
      id: "outer-keep-sales-team",
      description: "保留所有销售人员，列出销售人员和其商机编号；没有商机的人员也必须出现。",
      solution: "SELECT t.sales_agent, p.opportunity_id\nFROM sales_teams AS t\nLEFT JOIN sales_pipeline AS p\n  ON t.sales_agent = p.sales_agent;",
    },
    {
      id: "outer-sales-without-opportunities",
      description: "找出目前没有任何商机的销售人员名称。",
      solution: "SELECT t.sales_agent\nFROM sales_teams AS t\nLEFT JOIN sales_pipeline AS p\n  ON t.sales_agent = p.sales_agent\nWHERE p.opportunity_id IS NULL;",
    },
    {
      id: "outer-unmatched-products",
      description: "找出商机表中无法匹配到产品目录的、不重复的产品名称。",
      solution: "SELECT DISTINCT p.product\nFROM sales_pipeline AS p\nLEFT JOIN products AS pr\n  ON p.product = pr.product\nWHERE pr.product IS NULL;",
    },
  ],
  previousLesson: { id: "inner-joins", label: "SQL 课程 6：使用 JOIN 进行多表查询" },
  nextLesson: { id: "null-values", label: "SQL 课程 8：关于 NULL 值的简要说明" },
};
