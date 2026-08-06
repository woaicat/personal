/** 将 SQLite 的底层英文错误转成学习者可直接理解的中文反馈。 */
export function formatSqlError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  if (message.includes("incomplete input")) return "SQL 语句不完整，请检查是否漏写字段、FROM、END、括号或引号。";
  if (message.includes("syntax error") || message.includes("near \"")) return "SQL 语法有误，请检查关键字、逗号、括号和 CASE WHEN 的 END。";
  if (message.includes("no such column")) return "未找到对应字段，请检查字段名称是否正确。";
  if (message.includes("no such table")) return "未找到对应数据表，请检查表名是否正确。";
  if (message.includes("only supports") || message.includes("仅支持")) return "本课程仅支持 SELECT、WITH 和 EXPLAIN 查询，不会修改本地数据。";
  if (message.includes("请输入")) return "请输入一条完整的 SQL 查询后再运行。";

  return "SQL 执行失败，请检查语法、字段名和表名后重试。";
}
