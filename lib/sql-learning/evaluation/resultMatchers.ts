import type { QueryResult, TaskEvaluation } from "@/lib/sql-learning/types";

function findColumn(result: QueryResult, column: string) {
  return result.columns.findIndex((item) => item.toLowerCase() === column.toLowerCase());
}

function missingColumn(result: QueryResult, column: string): TaskEvaluation {
  return { passed: false, feedback: `请在结果中返回 ${column} 字段。` };
}

/** 校验一组客户是否完整返回；不比较 SQL 写法，让等价查询也可通过。 */
export function matchesAccountSet(result: QueryResult, expectedAccounts: string[]): TaskEvaluation {
  const accountIndex = findColumn(result, "account");
  if (accountIndex === -1) return missingColumn(result, "account");

  const actualAccounts = result.rows.map((row) => String(row[accountIndex]));
  const actualSet = new Set(actualAccounts);
  const expectedSet = new Set(expectedAccounts);
  const sameMembers = actualSet.size === expectedSet.size
    && [...expectedSet].every((account) => actualSet.has(account));

  if (!sameMembers || actualAccounts.length !== expectedAccounts.length) {
    return { passed: false, feedback: "返回的客户范围还不完整或包含了不符合条件的客户，请检查筛选条件。" };
  }
  return { passed: true, feedback: "当前任务完成。" };
}

/** 校验单列的全部值及其顺序，适用于 DISTINCT、ORDER BY、LIMIT 与 OFFSET。 */
export function matchesOrderedValues(result: QueryResult, column: string, expectedValues: string[]): TaskEvaluation {
  const columnIndex = findColumn(result, column);
  if (columnIndex === -1) return missingColumn(result, column);
  if (result.rows.length !== expectedValues.length) {
    return { passed: false, feedback: "返回的行数不正确，请检查去重、排序或分页条件。" };
  }

  const actualValues = result.rows.map((row) => String(row[columnIndex]));
  if (!actualValues.every((value, index) => value === expectedValues[index])) {
    return { passed: false, feedback: "结果内容或顺序不正确，请检查 ORDER BY、LIMIT 与 OFFSET。" };
  }
  return { passed: true, feedback: "当前任务完成。" };
}

/** 校验基础 SELECT 练习：字段存在且返回账户表的全部 85 条记录。 */
export function matchesAccountProjection(result: QueryResult, requiredColumns: string[]): TaskEvaluation {
  const sameProjection = result.columns.length === requiredColumns.length
    && requiredColumns.every((column, index) => result.columns[index]?.toLowerCase() === column.toLowerCase());
  if (!sameProjection) {
    return { passed: false, feedback: `请只返回任务要求的字段，字段顺序应为：${requiredColumns.join("、")}。` };
  }
  if (result.rows.length !== 85) {
    return { passed: false, feedback: "请从 accounts 表返回全部客户记录，不要额外筛选或限制行数。" };
  }
  return { passed: true, feedback: "当前任务完成。" };
}

/**
 * 对照当前任务的标准查询结果，验证字段和完整数据集合。
 * 不比较没有排序要求的行顺序，因此等价的 WHERE / BETWEEN / IN 写法仍可通过。
 */
export function matchesExpectedResult(actual: QueryResult, expected: QueryResult, orderMatters = false): TaskEvaluation {
  const sameColumns = actual.columns.length === expected.columns.length
    && actual.columns.every((column, index) => column.toLowerCase() === expected.columns[index]?.toLowerCase());
  if (!sameColumns) {
    return { passed: false, feedback: `返回字段不符合任务要求。请检查 SELECT 后的字段，顺序应与任务目标一致。` };
  }

  if (actual.rows.length !== expected.rows.length) {
    return { passed: false, feedback: `返回行数不正确：当前为 ${actual.rows.length} 行，任务要求的结果应为 ${expected.rows.length} 行。` };
  }

  const rowSignature = (row: QueryResult["rows"][number]) => JSON.stringify(row);
  const actualRows = actual.rows.map(rowSignature);
  const expectedRows = expected.rows.map(rowSignature);
  if (!orderMatters) {
    actualRows.sort();
    expectedRows.sort();
  }
  const sameRows = actualRows.every((row, index) => row === expectedRows[index]);
  if (!sameRows) {
    return { passed: false, feedback: orderMatters
      ? "结果内容或排序不符合任务要求。请检查 ORDER BY 和排序方向。"
      : "返回的数据与任务目标不一致。请检查筛选条件、分类条件或去重条件。" };
  }

  return { passed: true, feedback: "当前任务完成。" };
}
