import { mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
await mkdir(".analytics-test-build", { recursive: true });
const build = await mkdtemp(path.resolve(".analytics-test-build/run-"));
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
          ...(await readdir(path.join(build, "tests/private-analytics")))
            .filter((name) => name.endsWith(".test.js"))
            .map((name) => path.join(build, "tests/private-analytics", name)),
        ],
        { stdio: "inherit" },
      ).status || 0;
} finally {
  await rm(build, { recursive: true, force: true });
}
