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
    const version = Number(
      (await tx.execute("PRAGMA user_version")).rows[0]?.user_version,
    );
    if (version !== 0 && version !== schema.version)
      throw new Error("Unsupported schema");
    if (
      version === 0 &&
      (
        await tx.execute(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
        )
      ).rows.length
    )
      throw new Error("Requires an empty dedicated database");
    await tx.batch([
      ...schema.statements,
      `PRAGMA user_version=${schema.version}`,
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
