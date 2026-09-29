import { access } from "node:fs/promises";
import { Writable } from "node:stream";
import { createInterface } from "node:readline/promises";
import nextEnv from "@next/env";
import { requireLocal } from "./analytics-turso-utils.mjs";
import {
  PRODUCTION_CONFIG_PATH,
  ProductionConfigError,
  makeProductionConfig,
  saveProductionConfig,
} from "./analytics-production-config.mjs";

let terminal;
try {
  requireLocal();
  if (!process.stdin.isTTY || process.argv.length !== 2)
    throw new ProductionConfigError(
      "请在终端交互运行；密码和Token不通过命令行或管道传入",
    );
  nextEnv.loadEnvConfig(process.cwd(), true);
  requireLocal();
  let exists = false;
  try {
    await access(PRODUCTION_CONFIG_PATH);
    exists = true;
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  if (exists)
    throw new ProductionConfigError(
      "已有生产配置，已保留原文件和密钥；如需调整请告诉我，不要重新生成",
    );
  let muted = false;
  const output = new Writable({
    write(chunk, _encoding, callback) {
      if (!muted) process.stdout.write(chunk);
      callback();
    },
  });
  terminal = createInterface({ input: process.stdin, output, terminal: true });
  const databaseName =
    (
      await terminal.question(
        "正式数据库名称（回车使用 personal-analytics-prod）：",
      )
    ).trim() || "personal-analytics-prod";
  const url = (await terminal.question("正式库 Database URL：")).trim();
  muted = true;
  process.stdout.write("正式库 Token（输入不显示）：");
  const token = (await terminal.question("")).trim();
  process.stdout.write("\n正式后台密码（至少12个字符，输入不显示）：");
  const password = await terminal.question("");
  process.stdout.write("\n再次输入密码：");
  const confirmation = await terminal.question("");
  terminal.close();
  terminal = undefined;
  process.stdout.write("\n");
  const config = makeProductionConfig(
    { databaseName, url, token, password, confirmation },
    process.env.TURSO_DATABASE_URL,
  );
  await saveProductionConfig(config);
  console.log(
    "已保存生产专用配置。密码仅保存哈希；当前测试配置保持不变，正式采集尚未开启。",
  );
  console.log(
    "接下来由我执行正式库初始化和Vercel生产配置，不需要再运行测试库的配置命令。没有发布生产。",
  );
} catch (error) {
  terminal?.close();
  console.error(
    error instanceof ProductionConfigError
      ? error.message
      : "生产配置未完成，请检查输入及本地运行环境；凭据不输出",
  );
  process.exitCode = 1;
}
