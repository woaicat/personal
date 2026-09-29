import test from "node:test";
import assert from "node:assert/strict";
import { connection } from "../../scripts/analytics-turso-utils.mjs";

test("setup accepts region-qualified Turso URLs while rejecting other destinations", () => {
  const token = "t".repeat(64);
  for (const url of [
    "libsql://analytics-test.turso.io",
    "libsql://analytics-test.aws-ap-northeast-1.turso.io",
    "https://analytics-test.aws-ap-northeast-1.turso.io",
  ])
    assert.deepEqual(connection(url, token), {
      url: new URL(url).toString(),
      authToken: token,
    });
  for (const url of [
    "http://analytics-test.aws-ap-northeast-1.turso.io",
    "https://analytics-test.turso.io.evil.example",
    "https://analytics-test.not-turso.io",
    "https://analytics-test..turso.io",
    "https://-analytics-test.turso.io",
    "https://user:password@analytics-test.turso.io",
    "https://analytics-test.turso.io?token=x",
    "https://analytics-test.turso.io/path",
    "https://analytics-test.turso.io:9999",
  ])
    assert.throws(() => connection(url, token));
  assert.throws(() => connection("libsql://analytics-test.turso.io", ""));
});
