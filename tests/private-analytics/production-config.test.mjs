import test from "node:test";
import assert from "node:assert/strict";
import { scryptSync } from "node:crypto";
import { mkdtemp, readFile, writeFile, stat, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClient } from "@libsql/client";
import {
  makeProductionConfig,
  validateProductionConfig,
  productionConnection,
  saveProductionConfig,
  readProductionConfig,
} from "../../scripts/analytics-production-config.mjs";
import { initializeAnalyticsSchema } from "../../scripts/analytics-turso-schema.mjs";

const input = {
  databaseName: "site-prod",
  url: "libsql://site-prod-owner.aws-ap-northeast-1.turso.io",
  token: "t".repeat(64),
  password: "Unit test sample password 2026!",
  confirmation: "Unit test sample password 2026!",
};
const testUrl = "libsql://site-test-owner.aws-ap-northeast-1.turso.io";
const config = makeProductionConfig(input, testUrl);

test("production setup saves a compatible password hash and isolated secrets, with collection disabled", () => {
  const vars = config.variables;
  assert.equal(vars.ANALYTICS_DATA_MODE, "production");
  assert.equal(vars.ANALYTICS_ENABLED, "false");
  assert.equal(vars.ANALYTICS_DEV_ENABLED, "false");
  assert.equal(vars.ANALYTICS_PREVIEW_ENABLED, "false");
  assert.notEqual(vars.ADMIN_SESSION_SECRET, vars.ANALYTICS_ID_SECRET);
  const parts = vars.ADMIN_PASSWORD_HASH.split("$");
  assert.equal(parts.slice(0, 4).join("$"), "scrypt$131072$8$1");
  assert.equal(
    scryptSync(input.password, parts[4], 64, {
      N: 131072,
      r: 8,
      p: 1,
      maxmem: 256 * 1024 * 1024,
    }).toString("hex"),
    parts[5],
  );
  assert.equal(JSON.stringify(config).includes(input.password), false);
  assert.throws(() =>
    makeProductionConfig({ ...input, confirmation: "different" }, testUrl),
  );
  assert.throws(() =>
    makeProductionConfig(
      { ...input, password: "short", confirmation: "short" },
      testUrl,
    ),
  );
});

test("production setup rejects the test endpoint regardless of protocol and mismatched database names", () => {
  assert.throws(() =>
    productionConnection(
      input.databaseName,
      input.url,
      input.token,
      "https://site-prod-owner.aws-ap-northeast-1.turso.io",
    ),
  );
  assert.throws(() => productionConnection("site-test", testUrl, input.token));
  assert.throws(() =>
    productionConnection("other-prod", input.url, input.token, testUrl),
  );
  assert.throws(() =>
    productionConnection(
      input.databaseName,
      "https://site-prod-owner.turso.io.evil.example",
      input.token,
      testUrl,
    ),
  );
  for (const key of ["ANALYTICS_DEV_ENABLED", "ANALYTICS_PREVIEW_ENABLED"])
    assert.throws(() =>
      validateProductionConfig(
        { ...config, variables: { ...config.variables, [key]: "true" } },
        testUrl,
      ),
    );
  assert.throws(() =>
    validateProductionConfig(
      { ...config, variables: { ...config.variables, EXTRA_SECRET: "x" } },
      testUrl,
    ),
  );
});

test("production file round-trips dollar separators, remains private, refuses overwrite and leaves local env intact", async () => {
  const dir = await mkdtemp(join(tmpdir(), "analytics-production-"));
  try {
    const env = join(dir, ".env.local"),
      file = join(dir, ".local", "private-analytics-production.json");
    await writeFile(env, "ANALYTICS_DATA_MODE=test\n");
    await saveProductionConfig(config, file);
    assert.equal((await stat(file)).mode & 0o777, 0o600);
    assert.deepEqual(await readProductionConfig(testUrl, file), config);
    await assert.rejects(saveProductionConfig(config, file), /已有生产配置/);
    assert.equal(await readFile(env, "utf8"), "ANALYTICS_DATA_MODE=test\n");
    assert.equal(
      (await readFile(file, "utf8")).includes(input.password),
      false,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("shared initializer is repeatable and refuses nonempty production or unrelated/future schemas without clearing records", async () => {
  const directory = await mkdtemp(join(tmpdir(), "analytics-schema-"));
  const client = createClient({
    url: `file:${join(directory, "analytics.sqlite")}`,
    intMode: "number",
  });
  const unrelated = createClient({
    url: `file:${join(directory, "unrelated.sqlite")}`,
  });
  try {
    assert.deepEqual(
      await initializeAnalyticsSchema(client, { requireEmptyViews: true }),
      { version: 1, pv: 0 },
    );
    assert.deepEqual(
      await initializeAnalyticsSchema(client, { requireEmptyViews: true }),
      { version: 1, pv: 0 },
    );
    await client.batch(
      [
        "INSERT INTO sessions VALUES('session','visitor',1,1)",
        "INSERT INTO views VALUES('view','visitor','session','/','首页',1,'未知','桌面端',NULL,'tab')",
      ],
      "write",
    );
    await assert.rejects(
      initializeAnalyticsSchema(client, { requireEmptyViews: true }),
      /no existing views/,
    );
    assert.deepEqual(await initializeAnalyticsSchema(client), {
      version: 1,
      pv: 1,
    });
    await client.execute("UPDATE analytics_schema SET version=999 WHERE id=1");
    await assert.rejects(
      initializeAnalyticsSchema(client),
      /Unsupported schema/,
    );
    assert.equal(
      (await client.execute("SELECT COUNT(*) AS n FROM views")).rows[0].n,
      1,
    );
    await unrelated.execute("CREATE TABLE existing(value TEXT)");
    await assert.rejects(
      initializeAnalyticsSchema(unrelated),
      /empty dedicated database/,
    );
    assert.equal(
      (
        await unrelated.execute(
          "SELECT COUNT(*) AS n FROM sqlite_master WHERE name='analytics_schema'",
        )
      ).rows[0].n,
      0,
    );
  } finally {
    client.close();
    unrelated.close();
    await rm(directory, { recursive: true, force: true });
  }
});
