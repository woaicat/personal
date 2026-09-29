import { readFile, writeFile, chmod } from "node:fs/promises";
import { Writable } from "node:stream";
import { createInterface } from "node:readline/promises";
import nextEnv from "@next/env";
import { connection, requireLocal } from "./analytics-turso-utils.mjs";

let terminal;
try {
  requireLocal();
  if (!process.stdin.isTTY)
    throw new Error("请在终端交互运行；不接受命令行或管道中的 Token");
  nextEnv.loadEnvConfig(process.cwd(), true);
  requireLocal();
  for (const key of [
    "ADMIN_PASSWORD_HASH",
    "ADMIN_SESSION_SECRET",
    "ANALYTICS_ID_SECRET",
  ])
    if (!process.env[key])
      throw new Error("请先运行 npm run analytics:setup 设置本地管理员密码");
  const existing = await readFile(".env.local", "utf8");
  let muted = false;
  const output = new Writable({
    write(chunk, _encoding, callback) {
      if (!muted) process.stdout.write(chunk);
      callback();
    },
  });
  terminal = createInterface({ input: process.stdin, output, terminal: true });
  const url = await terminal.question("云端测试库 Database URL：");
  process.stdout.write("测试库 Token（输入不显示）：");
  muted = true;
  const token = await terminal.question("");
  terminal.close();
  terminal = undefined;
  process.stdout.write("\n");
  const validated = connection(url.trim(), token.trim());
  const config = {
    ANALYTICS_STORAGE: "turso",
    ANALYTICS_DATA_MODE: "test",
    TURSO_DATABASE_URL: validated.url,
    TURSO_AUTH_TOKEN: validated.authToken,
    ANALYTICS_ENABLED: "true",
    ANALYTICS_DEV_ENABLED: "true",
    ANALYTICS_PREVIEW_ENABLED: "false",
  };
  const filtered = existing
    .split("\n")
    .filter(
      (line) =>
        !Object.keys(config).some((key) =>
          new RegExp(`^\\s*(?:export\\s+)?${key}\\s*=`).test(line),
        ),
    )
    .join("\n")
    .trimEnd();
  await writeFile(
    ".env.local",
    filtered +
      "\n" +
      Object.entries(config)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n") +
      "\n",
    { mode: 0o600 },
  );
  await chmod(".env.local", 0o600);
  console.log(
    "已保存云端测试库配置，保留管理员密钥及原SQLite数据。接着运行 npm run analytics:turso:init，完成后重启开发服务。",
  );
} catch (error) {
  terminal?.close();
  // Only our validation messages are surfaced; database/SDK errors may include secrets.
  console.error(error instanceof Error ? error.message : "设置失败");
  process.exitCode = 1;
}
