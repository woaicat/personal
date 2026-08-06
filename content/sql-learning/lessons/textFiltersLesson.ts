import { textFilterEvaluation } from "@/lib/sql-learning/evaluation/accountLessonsEvaluator";
import type { Lesson } from "@/lib/sql-learning/types";

export const textFiltersLesson: Lesson = {
  id: "text-filters",
  number: 3,
  title: "带约束的查询（第 2 部分）",
  shortTitle: "带约束的查询（第 2 部分）",
  intro: [
    "WHERE 不只用于数字，也能筛选文字字段。文本条件常见于客户分群：例如只关注医疗行业客户、某个办公地的客户，或按客户名称前缀查找一批待联系名单。",
    "精确匹配可以使用 =；LIKE 搭配通配符 % 可以匹配不确定长度的文字；IN 则能同时指定多个候选值。文本内容需要用单引号包起来。",
    "本课继续使用 accounts 客户档案表。请根据行业、办公地和客户名称完成筛选，体会不同文本条件的适用场景。",
  ],
  syntaxLabel: "使用文本条件筛选记录",
  syntax: `WHERE 字段 = '精确值'
WHERE 字段 LIKE '前缀%'
WHERE 字段 IN ('值1', '值2')`,
  sections: [
    {
      title: "文字条件与数值条件，最大的不同是什么？",
      paragraphs: [
        "数字可以直接写 500；文字要用单引号包起来。例如 sector = 'medical' 中，medical 是数据里存储的原始行业值。页面会把它显示为“医疗”，但写 SQL 时仍要使用 medical。",
        "精确匹配很适合行业、国家、状态等标准化字段；如果你只记得客户名称的一部分，LIKE 会更方便。",
      ],
      codeLabel: "找出医疗行业客户",
      code: `SELECT account, sector
FROM accounts
WHERE sector = 'medical';`,
    },
    {
      title: "文本筛选运算符速查表",
      paragraphs: ["先从最准确的 = 开始；只有当你确实需要模糊匹配时，再使用 LIKE。这样结果更可控，也更不容易误选客户。"],
      table: {
        title: "常用文本条件",
        columns: ["写法", "含义", "CRM 示例"],
        rows: [
          ["= / !=（或 <>）", "精确等于 / 不等于某段文字", "office_location = 'Kenya'"],
          ["LIKE 'B%'", "以 B 开头；% 代表任意长度文字", "account LIKE 'B%'"],
          ["LIKE '%tech%'", "名称中包含 tech", "account LIKE '%tech%'"],
          ["LIKE 'A_'", "_ 代表恰好一个字符", "account LIKE 'A_'"],
          ["IN ('值1', '值2')", "属于给定文字列表之一", "sector IN ('finance', 'software')"],
          ["NOT IN ('值1', '值2')", "不属于给定文字列表", "sector NOT IN ('retail', 'medical')"],
        ],
      },
      tip: "% 和 _ 只在 LIKE 中有特殊含义；在 = 条件中，它们只是普通字符。",
    },
    {
      title: "把筛选条件写成业务语言",
      paragraphs: [
        "写 SQL 前，先用一句话说清目标：例如“找出金融和软件行业的客户”。再把其中的“和”翻译为 IN 列表，最后决定要返回哪些字段。这种先业务、后 SQL 的习惯，会让查询更不容易写偏。",
      ],
      codeLabel: "同时关注两个行业",
      code: `SELECT account, sector, office_location
FROM accounts
WHERE sector IN ('finance', 'software');`,
    },
  ],
  exerciseLead: "每次只需完成一个业务筛选任务。等价的 SQL 写法也可以通过判定。",
  datasetLabel: "accounts（客户档案）",
  initialQuery: `SELECT account, sector, office_location
FROM accounts
LIMIT 12;`,
  tasks: [
    {
      id: "text-medical-sector",
      description: "找出所属行业为 medical（医疗）的全部客户名称。",
      solution: "SELECT account\nFROM accounts\nWHERE sector = 'medical';",
      evaluate: textFilterEvaluation.medical,
    },
    {
      id: "text-kenya-office",
      description: "找出办公地位于 Kenya（肯尼亚）的客户名称。",
      solution: "SELECT account\nFROM accounts\nWHERE office_location = 'Kenya';",
      evaluate: textFilterEvaluation.kenya,
    },
    {
      id: "text-name-starts-b",
      description: "找出客户名称以 B 开头的全部客户。",
      solution: "SELECT account\nFROM accounts\nWHERE account LIKE 'B%';",
      evaluate: textFilterEvaluation.startsWithB,
    },
    {
      id: "text-sector-in",
      description: "找出所属行业为 finance（金融）或 software（软件）的全部客户。",
      solution: "SELECT account\nFROM accounts\nWHERE sector IN ('finance', 'software');",
      evaluate: textFilterEvaluation.financeOrSoftware,
    },
  ],
  previousLesson: { id: "numeric-filters", label: "SQL 课程 2：带约束的查询（第 1 部分）" },
  nextLesson: { id: "sorting-results", label: "SQL 课程 4：筛选和排序查询结果" },
};
