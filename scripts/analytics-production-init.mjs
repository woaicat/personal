import { createClient } from "@libsql/client/web";
import nextEnv from "@next/env";
import { connection, requireLocal } from "./analytics-turso-utils.mjs";
import { readProductionConfig } from "./analytics-production-config.mjs";
import { initializeAnalyticsSchema } from "./analytics-turso-schema.mjs";

let client;
try {
  requireLocal();
  nextEnv.loadEnvConfig(process.cwd(), true);
  requireLocal();
  if (process.argv.length !== 2) throw new Error("Unexpected arguments");
  const config = await readProductionConfig(process.env.TURSO_DATABASE_URL);
  const vars = config.variables;
  client = createClient({
    ...connection(vars.TURSO_DATABASE_URL, vars.TURSO_AUTH_TOKEN),
    intMode: "number",
  });
  const result = await initializeAnalyticsSchema(client, {
    requireEmptyViews: true,
  });
  if (result.pv !== 0) throw new Error("Views are not empty");
  console.log(
    `正式库已初始化并只读验证：结构版本${result.version}，PV 0。未写入测试访问，未开启正式采集，未修改本地测试配置或发布网站。`,
  );
} catch {
  console.error(
    "正式库初始化未完成。请核对生产专用配置、Token权限和连接；只接受独立的空库或无访问记录的已初始化库。已有数据不会清空，凭据不输出。",
  );
  process.exitCode = 1;
} finally {
  client?.close();
}
