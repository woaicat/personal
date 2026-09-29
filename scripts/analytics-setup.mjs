import { randomBytes, scryptSync } from "node:crypto";
import { readFile, writeFile, mkdir, chmod } from "node:fs/promises";
import { Writable } from "node:stream";
import { createInterface } from "node:readline/promises";

// Explicit local bootstrap only; no hosting/database resources are created.
let password;
if (process.argv.includes("--local-preview")) {
  password = randomBytes(24).toString("base64url");
  await mkdir(".local", { recursive: true, mode: 0o700 });
  // Disposable preview credential, never logged or committed. Delete after changing it.
  await writeFile(".local/preview-password.txt", password + "\n", {
    mode: 0o600,
  });
  await chmod(".local/preview-password.txt", 0o600);
} else {
  if (!process.stdin.isTTY)
    throw new Error("请在终端交互运行，不接受命令行或管道中的明文密码");
  let muted = false;
  const output = new Writable({
    write(chunk, _encoding, callback) {
      if (!muted) process.stdout.write(chunk);
      callback();
    },
  });
  const terminal = createInterface({
    input: process.stdin,
    output,
    terminal: true,
  });
  process.stdout.write("设置本地管理员密码（至少12个字符，输入不显示）：");
  muted = true;
  password = await terminal.question("");
  process.stdout.write("\n再次输入：");
  const confirmation = await terminal.question("");
  terminal.close();
  process.stdout.write("\n");
  if (
    password !== confirmation ||
    password.length < 12 ||
    password.length > 512
  )
    throw new Error("密码长度不符合要求或两次输入不一致");
}
const salt = randomBytes(32).toString("hex");
const key = scryptSync(password, salt, 64, {
  N: 131072,
  r: 8,
  p: 1,
  maxmem: 256 * 1024 * 1024,
}).toString("hex");
let existing = "";
try {
  existing = await readFile(".env.local", "utf8");
} catch {
  /* New local configuration. */
}
const config = {
  ANALYTICS_STORAGE: "local-sqlite",
  ANALYTICS_SQLITE_PATH: ".local/private-analytics.sqlite",
  ANALYTICS_ENABLED: "true",
  ANALYTICS_DEV_ENABLED: "true",
  ADMIN_PASSWORD_HASH: `scrypt$131072$8$1$${salt}$${key}`,
  ADMIN_SESSION_SECRET: randomBytes(32).toString("hex"),
  // Password changes revoke admin sessions, but must not split anonymous visitors.
  ANALYTICS_ID_SECRET:
    /^ANALYTICS_ID_SECRET=([a-f0-9]{64})$/m.exec(existing)?.[1] ||
    randomBytes(32).toString("hex"),
};
// dotenv expands dollar signs; escape hash separators in the file, not in memory.
const filtered = existing
  .split("\n")
  .filter(
    (line) => !Object.keys(config).some((name) => line.startsWith(`${name}=`)),
  )
  .join("\n")
  .trimEnd();
await writeFile(
  ".env.local",
  filtered +
    "\n" +
    Object.entries(config)
      .map(([name, value]) => `${name}=${value.replaceAll("$", "\\$")}`)
      .join("\n") +
    "\n",
  { mode: 0o600 },
);
await chmod(".env.local", 0o600);
console.log(
  "已配置本地测试数据库和管理员密钥；重启本地服务后生效。没有配置生产服务。",
);
if (process.argv.includes("--local-preview"))
  console.log(
    "临时测试密码保存在被Git忽略的 .local/preview-password.txt（仅供本地预览）。",
  );
