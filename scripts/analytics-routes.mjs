import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
async function walk(dir, prefix = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes = [];
  if (
    entries.some((entry) => /^page\.[jt]sx?$/.test(entry.name)) &&
    !prefix.includes("[") &&
    !/^\/(admin|api)(\/|$)/.test(prefix)
  )
    routes.push(prefix || "/");
  for (const entry of entries)
    if (
      entry.isDirectory() &&
      !entry.name.startsWith("@") &&
      !entry.name.startsWith("_")
    )
      routes.push(
        ...(await walk(
          path.join(dir, entry.name),
          prefix + (entry.name.startsWith("(") ? "" : `/${entry.name}`),
        )),
      );
  return routes;
}
await writeFile(
  "lib/private-analytics/static-paths.json",
  JSON.stringify(
    [...new Set([...(await walk("app")), "/act.html"])].sort(),
    null,
    2,
  ) + "\n",
);
console.log("已更新公共页面统计注册表");
