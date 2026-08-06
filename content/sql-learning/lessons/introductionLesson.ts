import type { Lesson } from "@/lib/sql-learning/types";

export const introductionLesson: Lesson = {
  id: "introduction",
  title: "SQL 入门",
  shortTitle: "产品分析 SQL 入门",
  intro: [
    "欢迎来到 SQL 入门。SQL 是一种“向数据库提问”的语言：你把想知道的问题写出来，数据库就从大量记录中找出答案。它不是编程语言入门考试，也不要求你先学会复杂代码。",
    "把 SQL 想成一位不会嫌你问题多的资料管理员。你可以问它：“客户档案里有哪些客户？”“这些客户属于什么行业？”“哪些商机已经成交？”SQL 就是把这些问题写成数据库能执行的句子。",
    "本网站使用一套 CRM 业务数据练习。你会先学会看懂表、行和列，再学习如何挑选字段、筛选记录、排序、关联和汇总。每一步都从一个直白的业务问题开始。",
  ],
  syntaxLabel: "本网站里的数据表",
  syntax: `accounts          客户档案：一行代表一个客户
sales_pipeline    商机记录：一行代表一笔商机
products          产品目录：一行代表一个产品
sales_teams       销售团队：一行代表一位销售人员`,
  sections: [
    {
      title: "什么是数据库？先把它想成很多张电子表格",
      paragraphs: [
        "关系型数据库可以先理解成一组互相关联的电子表格。每张表都围绕一个主题保存数据：客户放在客户档案表，商机放在商机表，产品放在产品目录表。",
        "一张表里，每一行是一条记录，每一列是这条记录的一个信息。比如客户档案表的一行就是一个客户；这一行里的行业、营收和办公地，分别描述这个客户的不同属性。",
      ],
      table: {
        title: "示例：accounts（客户档案）",
        columns: ["客户名称（account）", "所属行业（sector）", "成立年份（year_established）", "办公地（office_location）"],
        rows: [
          ["Acme Corporation", "科技", "1996", "美国"],
          ["Betasoloin", "医疗", "1999", "美国"],
          ["Betatech", "医疗", "1986", "肯尼亚"],
          ["Bioholding", "医疗", "2012", "菲律宾"],
          ["Bioplex", "医疗", "1991", "美国"],
        ],
      },
      tip: "表头上方是方便阅读的中文，下方的小字是 SQL 真正使用的字段名。写 SQL 时要写 account、sector 这样的原始字段名。",
    },
    {
      title: "SQL 到底在做什么？就是从表里挑出信息",
      paragraphs: [
        "如果你的问题是“我想看每个客户的名称和行业”，可以把它拆成两部分：第一，告诉数据库要看哪些列；第二，告诉数据库从哪张表里找。",
        "这正是最基础的 SQL 查询。先不用急着记很多规则，只要先看懂 SELECT 和 FROM 分别在回答什么问题。",
      ],
      codeLabel: "案例：查看每个客户的名称和行业",
      code: `SELECT account, sector
FROM accounts;`,
      tip: "读这句话时，可以翻译成：“从 accounts 客户档案表中，取出 account 客户名称和 sector 所属行业。”",
    },
    {
      title: "把第一条 SQL 拆成白话",
      paragraphs: [
        "SQL 的关键字看起来像英文，但每一部分都有明确的工作。你可以把下面这条查询当成一张简单的“取数申请单”：申请看什么、去哪里找、申请结束。",
      ],
      table: {
        title: "SELECT 查询的三个部分",
        columns: ["SQL 写法", "白话意思", "在本例中"],
        rows: [
          ["SELECT", "我要看什么", "客户名称和所属行业"],
          ["account, sector", "要看的具体列", "客户名称、所属行业"],
          ["FROM accounts", "去哪里找", "客户档案表"],
          [";", "这条查询写完了", "可以执行了"],
        ],
      },
    },
    {
      title: "查询结果是一张新的小表",
      paragraphs: [
        "运行上面的 SQL 后，数据库会返回一张只包含“客户名称”和“所属行业”的结果表。它不会修改 accounts 原始表，只是把你想看的内容单独整理出来。",
        "如果你只想看客户名称，就把 sector 从 SELECT 后面拿掉；如果还想看办公地，就写成 SELECT account, sector, office_location。你需要看的列，都写在 SELECT 后面，用英文逗号分隔。",
      ],
      codeLabel: "只查看客户名称",
      code: `SELECT account
FROM accounts;`,
    },
    {
      title: "产品经理为什么值得学 SQL？",
      paragraphs: [
        "因为很多产品问题最后都需要落到数据上。比如“我们的客户主要来自哪些行业？”“已成交商机集中在哪些产品？”“某个现象到底是个别案例，还是普遍存在？”这些问题都可以逐步翻译成 SQL。",
        "你不需要一开始就写出复杂查询。先学会从一张表里取出正确的信息，就已经能完成很多基础工作；后面的课程再教你加条件、排序、关联其他表和统计数量。",
      ],
      tip: "学习 SQL 的重点不是背英文单词，而是把业务问题拆成：我要看什么？从哪张表看？要不要筛选、排序或汇总？",
    },
    {
      title: "接下来怎么学？",
      paragraphs: [
        "下一课会专门练习 SELECT：你将亲手选择客户名称、行业和办公地等字段。之后再逐步加入 WHERE、ORDER BY、JOIN 和聚合函数，每一课只增加一个新能力。",
        "练习全部在浏览器内完成。你可以运行只读查询查看结果；只有结果真正符合当前任务，下一题才会解锁。数据和学习进度仅保存在当前浏览器，不会上传。",
      ],
    },
  ],
  nextLesson: { id: "select-queries", label: "SQL 课程 1：SELECT 查询入门" },
};
