import type { Lesson } from "@/lib/sql-learning/types";

export const nullValuesLesson: Lesson = {
  id: "null-values",
  number: 8,
  title: "关于 NULL 值的简要说明",
  shortTitle: "NULL 值的简要说明",
  intro: [
    "NULL 表示“这个值未知、缺失或不适用”。它不是数字 0，也不是空白文本。在 CRM 数据里，未关闭的商机没有关闭日期；独立客户没有母公司，这些都适合用 NULL 表示。",
    "NULL 最容易造成分析误差：如果把它当作普通值比较，往往得不到预期结果。因此 SQL 为它准备了专门的 IS NULL 和 IS NOT NULL 写法。",
  ],
  syntaxLabel: "筛选缺失与非缺失的值",
  syntax: `WHERE 字段 IS NULL
WHERE 字段 IS NOT NULL`,
  sections: [
    {
      title: "为什么不能写 = NULL？",
      paragraphs: [
        "普通比较的前提是两边都有确定的值；NULL 的意思恰恰是“未知”，因此 SQL 无法判断“未知是否等于未知”。写 WHERE close_date = NULL 不会得到你想要的结果。",
        "需要查询缺失数据时用 IS NULL；需要保留已填写的数据时用 IS NOT NULL。这两个写法没有等号。",
      ],
      codeLabel: "找出尚未关闭的商机",
      code: `SELECT opportunity_id, deal_stage, close_date
FROM sales_pipeline
WHERE close_date IS NULL;`,
      tip: "如果字段的实际值是空字符串 ''，它不是 NULL，需要写字段 = ''。使用前最好先理解数据来源的缺失值规则。",
    },
    {
      title: "产品分析中，NULL 往往值得先解释",
      paragraphs: [
        "发现 NULL 后，不要立刻把它当成错误。例如未关闭商机的 close_date 为空是合理业务状态；但产品名称无法匹配产品目录，则可能是数据同步或命名规范问题。",
        "一个稳妥的习惯是：先统计缺失数据代表什么，再决定是否筛掉、补值或单独作为一类展示。",
      ],
      table: {
        title: "本课程 CRM 数据中的 NULL 示例",
        columns: ["字段", "NULL 在这里代表什么", "常见分析处理"],
        rows: [
          ["accounts.subsidiary_of", "该客户没有记录母公司", "可识别独立客户"],
          ["sales_pipeline.close_date", "商机仍在跟进，尚未关闭", "不要计入已关闭商机"],
          ["外连接右表字段", "左表记录没有匹配对象", "用于排查漏关联或数据质量"],
        ],
      },
    },
  ],
  exerciseLead: "请使用 IS NULL 或 IS NOT NULL。系统会验证所有缺失记录，而不是只检查结果中的一条示例。",
  datasetLabel: "accounts（客户档案）",
  sourceTables: [
    { label: "accounts（客户档案）", query: "SELECT account, subsidiary_of FROM accounts LIMIT 8;" },
    { label: "sales_pipeline（商机）", query: "SELECT opportunity_id, sales_agent, deal_stage, close_date FROM sales_pipeline LIMIT 8;" },
  ],
  initialQuery: `SELECT account, subsidiary_of
FROM accounts
LIMIT 12;`,
  tasks: [
    {
      id: "null-independent-accounts",
      description: "找出没有母公司记录的全部客户名称。",
      solution: "SELECT account\nFROM accounts\nWHERE subsidiary_of IS NULL;",
    },
    {
      id: "null-subsidiary-accounts",
      description: "找出有母公司记录的客户名称和母公司名称。",
      solution: "SELECT account, subsidiary_of\nFROM accounts\nWHERE subsidiary_of IS NOT NULL;",
    },
    {
      id: "null-open-opportunities",
      description: "找出尚未关闭的商机，返回商机编号和商机阶段。",
      solution: "SELECT opportunity_id, deal_stage\nFROM sales_pipeline\nWHERE close_date IS NULL;",
    },
    {
      id: "null-closed-opportunities",
      description: "找出已经关闭的商机，返回商机编号和关闭日期。",
      solution: "SELECT opportunity_id, close_date\nFROM sales_pipeline\nWHERE close_date IS NOT NULL;",
    },
  ],
  previousLesson: { id: "outer-joins", label: "SQL 课程 7：外连接" },
  nextLesson: { id: "expression-queries", label: "SQL 课程 9：带表达式的查询" },
};
