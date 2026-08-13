export const sqlCheatsheetCategories = [
  "全部",
  "基础查询",
  "去重",
  "聚合分析",
  "JOIN",
  "NULL 与条件",
  "CTE",
  "分页",
  "排名",
  "日期",
] as const;

export type SqlCheatsheetCategory = Exclude<typeof sqlCheatsheetCategories[number], "全部">;

export interface SqlCheatsheetEntry {
  id: string;
  category: SqlCheatsheetCategory;
  title: string;
  summary: string;
  sql: string;
  note: string;
}

/**
 * 通用 SQL 速查内容。table_name、column_name 和 :param 都是占位符，
 * 使用时需要替换成当前数据库中的真实表名、字段名和参数。
 */
export const sqlCheatsheetEntries: SqlCheatsheetEntry[] = [
  {
    id: "select-columns",
    category: "基础查询",
    title: "选择需要的字段",
    summary: "从一张表中取出指定列，避免无目的地返回所有字段。",
    sql: `SELECT column_a, column_b
FROM table_name;`,
    note: "column_a、column_b 是字段名，table_name 是表名。",
  },
  {
    id: "where-filter",
    category: "基础查询",
    title: "按条件筛选",
    summary: "只返回满足条件的记录。多个条件可以用 AND 或 OR 连接。",
    sql: `SELECT *
FROM table_name
WHERE status = 'active'
  AND amount >= 100;`,
    note: "文本值通常使用单引号；实际值和字段类型要以当前数据库为准。",
  },
  {
    id: "order-by",
    category: "基础查询",
    title: "排序查询结果",
    summary: "使用 ASC 升序或 DESC 降序排列结果。",
    sql: `SELECT column_a, column_b
FROM table_name
ORDER BY column_b DESC, column_a ASC;`,
    note: "多字段排序时，先按第一个字段排序，再用后面的字段处理并列记录。",
  },
  {
    id: "distinct",
    category: "去重",
    title: "去除重复值",
    summary: "返回某个字段或字段组合的不重复结果。",
    sql: `SELECT DISTINCT category
FROM table_name;`,
    note: "DISTINCT 作用于 SELECT 后的全部字段组合，不是只对其中一列单独去重。",
  },
  {
    id: "count-distinct",
    category: "去重",
    title: "统计不重复数量",
    summary: "统计不同用户、客户或订单的数量。",
    sql: `SELECT COUNT(DISTINCT user_id) AS unique_users
FROM table_name;`,
    note: "user_id 为空时是否计入统计，需要结合业务口径确认。",
  },
  {
    id: "deduplicate-row-number",
    category: "去重",
    title: "每个对象只保留最新一条",
    summary: "先为每个对象内部排序，再过滤出序号为 1 的记录。",
    sql: `WITH ranked_rows AS (
  SELECT
    t.*,
    ROW_NUMBER() OVER (
      PARTITION BY entity_id
      ORDER BY updated_at DESC, record_id DESC
    ) AS row_num
  FROM table_name AS t
)
SELECT *
FROM ranked_rows
WHERE row_num = 1;`,
    note: "record_id 作为第二排序字段可以让相同 updated_at 时的结果更稳定。",
  },
  {
    id: "group-by",
    category: "聚合分析",
    title: "分组统计",
    summary: "按一个或多个维度汇总记录数、金额或其他指标。",
    sql: `SELECT
  category,
  COUNT(*) AS record_count,
  SUM(amount) AS total_amount
FROM table_name
GROUP BY category;`,
    note: "SELECT 中非聚合字段通常需要出现在 GROUP BY 中。",
  },
  {
    id: "having",
    category: "聚合分析",
    title: "筛选汇总结果",
    summary: "使用 HAVING 筛选分组后的结果，不能用 WHERE 代替。",
    sql: `SELECT
  category,
  COUNT(*) AS record_count
FROM table_name
GROUP BY category
HAVING COUNT(*) >= 10;`,
    note: "WHERE 先筛原始记录，HAVING 再筛分组结果。",
  },
  {
    id: "inner-join",
    category: "JOIN",
    title: "只保留两表都能匹配的记录",
    summary: "INNER JOIN 适合只分析存在对应关系的数据。",
    sql: `SELECT
  a.entity_id,
  b.detail_name
FROM table_a AS a
INNER JOIN table_b AS b
  ON a.entity_id = b.entity_id;`,
    note: "先确认连接字段代表同一个业务实体，避免错误关联。",
  },
  {
    id: "left-join",
    category: "JOIN",
    title: "保留左表全部记录",
    summary: "左表没有匹配记录时，右表字段会显示为 NULL。",
    sql: `SELECT
  a.entity_id,
  b.detail_name
FROM table_a AS a
LEFT JOIN table_b AS b
  ON a.entity_id = b.entity_id;`,
    note: "需要找出未匹配记录时，可以在后面加 WHERE b.entity_id IS NULL。",
  },
  {
    id: "is-null",
    category: "NULL 与条件",
    title: "筛选缺失值",
    summary: "判断 NULL 必须使用 IS NULL 或 IS NOT NULL。",
    sql: `SELECT *
FROM table_name
WHERE closed_at IS NULL;`,
    note: "不要写 closed_at = NULL；NULL 不是普通的可比较值。",
  },
  {
    id: "coalesce",
    category: "NULL 与条件",
    title: "为 NULL 提供默认值",
    summary: "COALESCE 从左到右返回第一个非 NULL 值。",
    sql: `SELECT
  entity_id,
  COALESCE(owner_name, '未分配') AS owner_name
FROM table_name;`,
    note: "默认值只是展示或计算口径，不代表原始数据已经被修改。",
  },
  {
    id: "case-when",
    category: "NULL 与条件",
    title: "按条件生成分类",
    summary: "把原始数值或状态转换成更容易理解的业务标签。",
    sql: `SELECT
  entity_id,
  CASE
    WHEN amount >= 1000 THEN 'high'
    WHEN amount >= 100 THEN 'medium'
    ELSE 'low'
  END AS amount_level
FROM table_name;`,
    note: "WHEN 按从上到下的顺序判断，条件重叠时要把更具体的条件放前面。",
  },
  {
    id: "cte",
    category: "CTE",
    title: "用 CTE 拆解复杂查询",
    summary: "先命名中间结果，再在后续查询中复用，提升可读性。",
    sql: `WITH filtered_rows AS (
  SELECT *
  FROM table_name
  WHERE status = 'active'
)
SELECT category, COUNT(*) AS record_count
FROM filtered_rows
GROUP BY category;`,
    note: "CTE 通常只在当前这一条 SQL 中有效，不会创建持久化表。",
  },
  {
    id: "limit-offset",
    category: "分页",
    title: "使用 LIMIT 和 OFFSET 分页",
    summary: "适合数据量较小或需要快速查看第几页结果的场景。",
    sql: `SELECT *
FROM table_name
ORDER BY record_id
LIMIT :page_size OFFSET :offset;`,
    note: "一定要搭配稳定的 ORDER BY；不同数据库的分页语法可能不同。",
  },
  {
    id: "cursor-pagination",
    category: "分页",
    title: "使用游标分页",
    summary: "记录上一页最后一个 ID，避免大 OFFSET 越翻页越慢。",
    sql: `SELECT *
FROM table_name
WHERE record_id > :last_record_id
ORDER BY record_id ASC
LIMIT :page_size;`,
    note: "record_id 需要有稳定且可比较的顺序；第一页可以不带 last_record_id 条件。",
  },
  {
    id: "row-number",
    category: "排名",
    title: "生成连续序号",
    summary: "ROW_NUMBER 为每一行生成唯一序号，即使并列也不会重复。",
    sql: `SELECT
  entity_id,
  score,
  ROW_NUMBER() OVER (ORDER BY score DESC, entity_id) AS row_num
FROM table_name;`,
    note: "适合取前 N 条、分页排序或给每条明细生成序号。",
  },
  {
    id: "rank-dense-rank",
    category: "排名",
    title: "处理并列排名",
    summary: "RANK 会跳号，DENSE_RANK 不跳号；两者都会让并列记录获得相同名次。",
    sql: `SELECT
  entity_id,
  score,
  RANK() OVER (ORDER BY score DESC) AS rank_num,
  DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank_num
FROM table_name;`,
    note: "选择哪一种排名方式，要先确认并列后是否需要跳过名次。",
  },
  {
    id: "top-n-per-group",
    category: "排名",
    title: "取每组排名前 N 条",
    summary: "先按分组生成窗口排名，再在外层筛选名次。",
    sql: `WITH ranked_rows AS (
  SELECT
    group_name,
    entity_id,
    score,
    ROW_NUMBER() OVER (
      PARTITION BY group_name
      ORDER BY score DESC, entity_id
    ) AS row_num
  FROM table_name
)
SELECT *
FROM ranked_rows
WHERE row_num <= 3;`,
    note: "不能直接在同一层 WHERE 中使用窗口函数的别名，通常需要 CTE 或子查询。",
  },
  {
    id: "date-range",
    category: "日期",
    title: "筛选一个完整日期范围",
    summary: "使用左闭右开区间，避免结束日期带时间时遗漏或重复数据。",
    sql: `SELECT *
FROM table_name
WHERE event_time >= :start_time
  AND event_time < :next_period_start;`,
    note: "例如查某个月，可以用当月 1 日作为开始、下月 1 日作为结束。",
  },
  {
    id: "date-group",
    category: "日期",
    title: "按日期粒度汇总",
    summary: "先把时间转换成日、周或月，再进行分组统计。",
    sql: `SELECT
  date_column AS period,
  COUNT(*) AS record_count
FROM table_name
GROUP BY date_column
ORDER BY period;`,
    note: "按月或按周的转换函数因数据库类型不同而不同，使用前请查对应数据库的日期函数。",
  },
];
