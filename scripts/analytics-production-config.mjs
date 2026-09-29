import { randomBytes, scryptSync } from "node:crypto";
import { readFile, writeFile, mkdir, chmod } from "node:fs/promises";
import { dirname } from "node:path";
import { connection } from "./analytics-turso-utils.mjs";

export const PRODUCTION_CONFIG_PATH =
  ".local/private-analytics-production.json";
export class ProductionConfigError extends Error {}
const names = [
  "ANALYTICS_STORAGE",
  "ANALYTICS_DATA_MODE",
  "TURSO_DATABASE_URL",
  "TURSO_AUTH_TOKEN",
  "ADMIN_PASSWORD_HASH",
  "ADMIN_SESSION_SECRET",
  "ANALYTICS_ID_SECRET",
  "ANALYTICS_ENABLED",
  "ANALYTICS_DEV_ENABLED",
  "ANALYTICS_PREVIEW_ENABLED",
];

export function productionConnection(databaseName, url, token, testUrl) {
  if (
    typeof databaseName !== "string" ||
    !/^[a-z0-9][a-z0-9-]{0,62}$/.test(databaseName) ||
    /(?:^|-)(?:test|preview|dev|development)(?:-|$)/.test(databaseName)
  )
    throw new ProductionConfigError(
      "请填写正式数据库的名称，不使用test、preview或dev命名的库",
    );
  let result;
  try {
    result = connection(url, token);
  } catch {
    throw new ProductionConfigError(
      "正式库URL或Token格式不正确，请从正式库详情复制",
    );
  }
  const hostname = new URL(result.url).hostname;
  if (
    !(
      hostname.startsWith(databaseName + "-") ||
      hostname.startsWith(databaseName + ".")
    )
  )
    throw new ProductionConfigError(
      "URL与填写的正式数据库名称不匹配，请核对数据库详情",
    );
  if (testUrl && hostname === new URL(testUrl).hostname)
    throw new ProductionConfigError(
      "正式库与当前测试库相同，请使用独立的正式库",
    );
  return result;
}

export function makeProductionConfig(input, testUrl) {
  const validated = productionConnection(
    input.databaseName,
    input.url,
    input.token,
    testUrl,
  );
  if (
    typeof input.password !== "string" ||
    input.password.length < 12 ||
    input.password.length > 512 ||
    input.password !== input.confirmation
  )
    throw new ProductionConfigError(
      "密码至少12个字符，最多512个字符，两次输入必须一致",
    );
  const salt = randomBytes(32).toString("hex");
  const key = scryptSync(input.password, salt, 64, {
    N: 131072,
    r: 8,
    p: 1,
    maxmem: 256 * 1024 * 1024,
  }).toString("hex");
  return {
    version: 1,
    databaseName: input.databaseName,
    preparedAt: new Date().toISOString(),
    variables: {
      ANALYTICS_STORAGE: "turso",
      ANALYTICS_DATA_MODE: "production",
      TURSO_DATABASE_URL: validated.url,
      TURSO_AUTH_TOKEN: validated.authToken,
      ADMIN_PASSWORD_HASH: `scrypt$131072$8$1$${salt}$${key}`,
      ADMIN_SESSION_SECRET: randomBytes(32).toString("hex"),
      ANALYTICS_ID_SECRET: randomBytes(32).toString("hex"),
      // Explicit activation happens with the authorized production release.
      ANALYTICS_ENABLED: "false",
      ANALYTICS_DEV_ENABLED: "false",
      ANALYTICS_PREVIEW_ENABLED: "false",
    },
  };
}

export function validateProductionConfig(config, testUrl) {
  const vars = config?.variables;
  if (
    config?.version !== 1 ||
    !vars ||
    Object.keys(vars).length !== names.length ||
    !names.every((name) => typeof vars[name] === "string") ||
    vars.ANALYTICS_STORAGE !== "turso" ||
    vars.ANALYTICS_DATA_MODE !== "production" ||
    !["true", "false"].includes(vars.ANALYTICS_ENABLED) ||
    vars.ANALYTICS_DEV_ENABLED !== "false" ||
    vars.ANALYTICS_PREVIEW_ENABLED !== "false" ||
    !/^scrypt\$131072\$8\$1\$[a-f0-9]{64}\$[a-f0-9]{128}$/.test(
      vars.ADMIN_PASSWORD_HASH,
    ) ||
    !/^[a-f0-9]{64}$/.test(vars.ADMIN_SESSION_SECRET) ||
    !/^[a-f0-9]{64}$/.test(vars.ANALYTICS_ID_SECRET) ||
    vars.ADMIN_SESSION_SECRET === vars.ANALYTICS_ID_SECRET
  )
    throw new ProductionConfigError(
      "生产配置不完整或隔离开关有误，请检查专用配置文件",
    );
  productionConnection(
    config.databaseName,
    vars.TURSO_DATABASE_URL,
    vars.TURSO_AUTH_TOKEN,
    testUrl,
  );
  return config;
}

export async function saveProductionConfig(
  config,
  file = PRODUCTION_CONFIG_PATH,
) {
  validateProductionConfig(config);
  await mkdir(dirname(file), { recursive: true, mode: 0o700 });
  try {
    await writeFile(file, JSON.stringify(config, null, 2) + "\n", {
      mode: 0o600,
      flag: "wx",
    });
  } catch (error) {
    if (error?.code === "EEXIST")
      throw new ProductionConfigError(
        "已有生产配置，已保留原文件和密钥；如需调整请告诉我，不要重新生成",
      );
    throw new ProductionConfigError("生产配置未保存，请检查本地目录权限");
  }
  await chmod(file, 0o600);
}

export async function readProductionConfig(
  testUrl,
  file = PRODUCTION_CONFIG_PATH,
) {
  let parsed;
  try {
    const text = await readFile(file, "utf8");
    if (text.length > 65536) throw new Error("Size");
    parsed = JSON.parse(text);
  } catch {
    throw new ProductionConfigError(
      "请先运行 npm run analytics:production:configure 保存正式配置",
    );
  }
  return validateProductionConfig(parsed, testUrl);
}
