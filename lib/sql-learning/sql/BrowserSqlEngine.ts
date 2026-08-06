import initSqlJs from "sql.js";
import { crmSalesTables } from "@/content/sql-learning/datasets/crmSales";
import type { QueryResult, SqlCell } from "@/lib/sql-learning/types";
import { parseCsv } from "./csv";

const wasmUrl = "/sql-learning/sql-wasm.wasm";

function isReadOnlyQuery(sql: string) {
  const trimmedSql = sql.trim();
  if (!/^(select|with|explain)\b/i.test(trimmedSql)) return false;

  // 仅允许查询语句；额外阻止 WITH ... DELETE/UPDATE 和多语句 DML。
  return !/\b(insert|update|delete|replace|create|drop|alter|attach|detach|vacuum|pragma|reindex|begin|commit|rollback|savepoint|release)\b/i.test(trimmedSql);
}

export class BrowserSqlEngine {
  private database: initSqlJs.Database | null = null;

  async initialize() {
    if (this.database) return;

    const SQL = await initSqlJs({ locateFile: () => wasmUrl });
    this.database = new SQL.Database();

    await Promise.all(crmSalesTables.map(async (table) => {
      const response = await fetch(table.source);
      if (!response.ok) throw new Error(`无法读取本地数据：${table.source}`);

      const [headers, ...records] = parseCsv(await response.text());
      const columnDefinition = table.columns.map((column) => `${column.name} ${column.type}`).join(", ");
      this.database?.run(`CREATE TABLE ${table.name} (${columnDefinition});`);

      const placeholders = table.columns.map(() => "?").join(", ");
      const statement = this.database?.prepare(`INSERT INTO ${table.name} VALUES (${placeholders});`);
      if (!statement) return;

      records.forEach((record) => {
        const valueByHeader = Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""]));
        const values = table.columns.map((column) => {
          const rawValue = valueByHeader[column.name];
          if (rawValue === "") return null;
          return table.numericColumns.includes(column.name) ? Number(rawValue) : rawValue;
        });
        statement.run(values);
      });
      statement.free();
    }));
  }

  execute(sql: string): QueryResult {
    if (!this.database) throw new Error("SQL 引擎尚未准备完成。");
    if (!sql.trim()) throw new Error("请输入一条查询语句。");
    if (!isReadOnlyQuery(sql)) throw new Error("本课程仅支持 SELECT、WITH 和 EXPLAIN 查询，不会修改本地数据。");

    const result = this.database.exec(sql)[0];
    if (!result) return { columns: [], rows: [] };

    return {
      columns: result.columns,
      rows: result.values.map((row) => row.map((value) => {
        if (value === null || typeof value === "string" || typeof value === "number") return value as SqlCell;
        return String(value);
      })),
    };
  }
}
