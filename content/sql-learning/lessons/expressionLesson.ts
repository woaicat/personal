import type { Lesson } from "@/lib/sql-learning/types";

export const expressionLesson: Lesson = {
  id: "expression-queries",
  number: 9,
  title: "带表达式的查询",
  shortTitle: "带表达式的查询",
  intro: [
    "SELECT 后面不只能写原始字段，还可以写表达式：对数值做加、减、乘、除，或把常量和字段组合起来。表达式能把原始业务记录变成更便于解释的分析指标。",
    "例如客户档案中的 revenue 以“百万美元”为单位，直接除以 employees 就能粗略观察单位员工对应的营收规模；用当前年份减去成立年份，则能得到客户经营年限。",
  ],
  syntaxLabel: "在 SELECT 中计算新字段",
  syntax: `SELECT 原字段,
       表达式 AS 新字段名
FROM 表名;`,
  sections: [
    {
      title: "表达式会生成一列新的结果，不会修改原表",
      paragraphs: [
        "AS 用来给计算结果起一个可读的别名。原始 accounts 表没有 revenue_per_employee 这一列，但查询运行后，结果表会多出这一列；关闭页面或换一条查询后，原表仍然保持不变。",
        "别名最好描述业务含义。与其叫 result1，不如叫 company_age 或 annual_revenue_usd，后续做图表、交接分析或和同事沟通都会轻松很多。",
      ],
      codeLabel: "计算每位员工对应的营收规模",
      code: `SELECT account,
       revenue / employees AS revenue_per_employee
FROM accounts;`,
    },
    {
      title: "常用算术运算符",
      paragraphs: ["表达式遵循常见的数学优先级：乘除优先于加减；复杂计算可以用括号明确顺序。数值字段参与计算时不需要引号。"],
      table: {
        title: "把原始数值转成分析指标",
        columns: ["运算符", "用途", "CRM 示例"],
        rows: [
          ["+", "相加", "revenue + 100"],
          ["-", "相减或计算差值", "2026 - year_established"],
          ["*", "相乘或单位换算", "revenue * 1000000"],
          ["/", "相除，计算比率或人均值", "revenue / employees"],
          ["( )", "明确先后顺序", "(revenue * 1000000) / employees"],
        ],
      },
      tip: "计算前先确认单位。本数据的 revenue 单位是“百万美元”，要换算为美元需要乘以 1,000,000。",
    },
    {
      title: "别把“算出来”误当成“有业务意义”",
      paragraphs: [
        "表达式很容易写，但指标是否有意义需要业务判断。人均营收可帮助粗略比较不同规模客户；它不等于客户真实的人效，也不能单独作为客户价值判断依据。",
        "产品分析中的好习惯是同时写清计算公式、单位和使用场景。这样其他人才能复算，也知道指标的边界。",
      ],
    },
  ],
  exerciseLead: "计算列需要使用 AS 起别名。系统会同时核对计算公式、列名和完整结果。",
  datasetLabel: "accounts（客户档案）",
  initialQuery: `SELECT account, revenue, employees, year_established
FROM accounts
LIMIT 12;`,
  tasks: [
    {
      id: "expression-revenue-per-employee",
      description: "计算每个客户的单位员工营收，返回客户名称和别名为 revenue_per_employee 的计算列。",
      solution: "SELECT account, revenue / employees AS revenue_per_employee\nFROM accounts;",
    },
    {
      id: "expression-company-age",
      description: "以 2026 年为基准计算客户成立年限，返回客户名称和别名为 company_age 的计算列。",
      solution: "SELECT account, 2026 - year_established AS company_age\nFROM accounts;",
    },
    {
      id: "expression-annual-revenue-usd",
      description: "将年营收从百万美元换算为美元，返回客户名称和别名为 annual_revenue_usd 的计算列。",
      solution: "SELECT account, revenue * 1000000 AS annual_revenue_usd\nFROM accounts;",
    },
  ],
  previousLesson: { id: "null-values", label: "SQL 课程 8：关于 NULL 值的简要说明" },
  nextLesson: { id: "case-when-business-classification", label: "SQL 课程 12：使用 CASE WHEN 进行业务分类" },
};
