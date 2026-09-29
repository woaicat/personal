import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
const build = await mkdtemp(path.join(tmpdir(), "jiaxuan-analytics-tests-"));
try {
  const compiled = spawnSync(
    "node_modules/.bin/tsc",
    ["-p", "tests/private-analytics/tsconfig.json", "--outDir", build],
    { stdio: "inherit" },
  );
  if (compiled.status) process.exitCode = compiled.status;
  else
    process.exitCode =
      spawnSync(
        process.execPath,
        [
          "--test",
          path.join(build, "tests/private-analytics/analytics.test.js"),
        ],
        { stdio: "inherit" },
      ).status || 0;
} finally {
  await rm(build, { recursive: true, force: true });
}
