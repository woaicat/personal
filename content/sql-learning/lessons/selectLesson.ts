import { selectEvaluation } from "@/lib/sql-learning/evaluation/accountLessonsEvaluator";
import type { Lesson } from "@/lib/sql-learning/types";

export const selectLesson: Lesson = {
  id: "select-queries",
  number: 1,
  title: "SELECT 查询入门",
  shortTitle: "SELECT 查询入门",
  intro: [
    "要从 CRM 数据库中取出信息，需要编写 SELECT 查询。它就像在一大叠客户档案里圈出你真正想看的栏目：只看客户名称，还是同时看行业和办公地，都由你决定。",
    "客户档案表 accounts 中，一行代表一个客户；account、sector、office_location 等列是这个客户的不同属性。分析时优先选择真正需要的字段，结果会更清晰，也能避免把无关信息带进后续分析。",
    "本课先熟悉最基础的字段选择。默认结果会展示部分客户档案，请按右侧任务逐步调整查询。",
  ],
  syntaxLabel: "选择指定字段",
  syntax: `SELECT 字段1, 字段2
FROM 表名;`,
  sections: [
    {
      title: "SELECT 和 FROM 各做什么？",
      paragraphs: [
        "SELECT 后面写“想看到的列”，FROM 后面写“这些列来自哪张表”。读起来可以理解为：从客户档案中，选出客户名称和所属行业。",
        "字段之间用英文逗号隔开。SQL 的换行只是为了便于阅读，不会改变执行结果；语句末尾的分号在本网站中可写可不写。",
      ],
      codeLabel: "查看客户名称和所属行业",
      code: `SELECT account, sector
FROM accounts;`,
    },
    {
      title: "明确列出字段，还是使用星号？",
      paragraphs: [
        "SELECT * 表示返回一张表的所有字段，适合刚拿到陌生数据时快速“翻一眼档案”。但在正式分析中，建议明确列出需要的字段：结果更好读，也不容易误把敏感或无关字段带走。",
      ],
      table: {
        title: "两种写法的使用场景",
        columns: ["写法", "适合什么时候", "结果"],
        rows: [
          ["SELECT *", "第一次了解表结构、临时核对数据", "返回所有字段"],
          ["SELECT account, sector", "回答明确业务问题、制作分析底表", "只返回指定字段"],
        ],
      },
      tip: "星号不是错误，只是“全选”。当你明确知道需要什么时，列出字段是更专业也更稳妥的习惯。",
    },
    {
      title: "把英文表名当成数据的地址",
      paragraphs: [
        "页面里会把 accounts 翻译为“客户档案”，但 SQL 编辑器必须写原始表名 accounts。同样，客户名称对应 account，所属行业对应 sector。先记住这两个字段，本课的任务就能轻松完成。",
      ],
    },
  ],
  exerciseLead: "每次只完成右侧当前高亮的一项任务；通过后，下一项才会解锁。",
  datasetLabel: "accounts（客户档案）",
  initialQuery: `SELECT *
FROM accounts
LIMIT 12;`,
  tasks: [
    {
      id: "select-account",
      description: "找出每个客户的 account（客户名称）。",
      solution: "SELECT account\nFROM accounts;",
      evaluate: selectEvaluation.accounts,
    },
    {
      id: "select-sector",
      description: "找出每个客户的 sector（所属行业）。",
      solution: "SELECT sector\nFROM accounts;",
      evaluate: selectEvaluation.sectors,
    },
    {
      id: "select-account-location",
      description: "找出每个客户的 account 和 office_location（办公地）。",
      solution: "SELECT account, office_location\nFROM accounts;",
      evaluate: selectEvaluation.accountAndLocation,
    },
    {
      id: "select-all-account-fields",
      description: "查看 accounts 表中每个客户的全部字段。",
      solution: "SELECT *\nFROM accounts;",
      evaluate: selectEvaluation.allAccountFields,
    },
  ],
  previousLesson: { id: "introduction", label: "SQL 入门" },
  nextLesson: { id: "numeric-filters", label: "SQL 课程 2：带约束的查询（第 1 部分）" },
};
