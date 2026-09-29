import { createClient } from "@libsql/client/web";
import nextEnv from "@next/env";
import schema from "../lib/private-analytics/schema.json" with { type: "json" };
import { connection, requireLocal } from "./analytics-turso-utils.mjs";

let client;
try {
  requireLocal();
  nextEnv.loadEnvConfig(process.cwd(), true);
  requireLocal();
  if (
    process.env.ANALYTICS_STORAGE !== "turso" ||
    process.env.ANALYTICS_DATA_MODE !== "test"
  )
    throw new Error("Configuration missing");
  client = createClient({
    ...connection(process.env.TURSO_DATABASE_URL, process.env.TURSO_AUTH_TOKEN),
    intMode: "number",
  });
  const tx = await client.transaction("write");
  try {
    const tables = (
      await tx.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
      )
    ).rows;
    const hasMetadata = tables.some((row) => row.name === "analytics_schema");
    const version = hasMetadata
      ? Number(
          (await tx.execute("SELECT version FROM analytics_schema WHERE id=1"))
            .rows[0]?.version,
        )
      : 0;
    if (version !== 0 && version !== schema.version)
      throw new Error("Unsupported schema");
    if (version === 0 && tables.length)
      throw new Error("Requires an empty dedicated database");
    await tx.batch([
      ...schema.statements,
      {
        sql: "INSERT INTO analytics_schema(id,version) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET version=excluded.version",
        args: [schema.version],
      },
    ]);
    await tx.commit();
  } catch (error) {
    try {
      await tx.rollback();
    } catch {
      /* Preserve original error. */
    }
    throw error;
  } finally {
    tx.close();
  }
  const result = await client.execute("SELECT COUNT(*) AS n FROM views");
  console.log(
    `云端测试库已初始化（结构版本${schema.version}，已有PV ${result.rows[0]?.n}）。没有上传本地模拟数据，也没有修改生产环境。`,
  );
} catch {
  console.error(
    "初始化未完成。检查测试库URL、Token权限、连接状态及库类型；首次初始化要求空的专用libSQL数据库。已有数据不清空。错误详情不输出凭据。",
  );
  process.exitCode = 1;
} finally {
  client?.close();
}
