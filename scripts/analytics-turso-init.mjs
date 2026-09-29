import { createClient } from "@libsql/client/web";
import nextEnv from "@next/env";
import { initializeAnalyticsSchema } from "./analytics-turso-schema.mjs";
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
  const result = await initializeAnalyticsSchema(client);
  console.log(
    `云端测试库已初始化（结构版本${result.version}，已有PV ${result.pv}）。没有上传本地模拟数据，也没有修改生产环境。`,
  );
} catch {
  console.error(
    "初始化未完成。检查测试库URL、Token权限、连接状态及库类型；首次初始化要求空的专用libSQL数据库。已有数据不清空。错误详情不输出凭据。",
  );
  process.exitCode = 1;
} finally {
  client?.close();
}
