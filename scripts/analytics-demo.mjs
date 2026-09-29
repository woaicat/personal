import { DatabaseSync } from "node:sqlite";
import { readFileSync, realpathSync } from "node:fs";
import { resolve, sep } from "node:path";
import nextEnv from "@next/env";

// Development-only fixtures. Never send these records through the public collector.
if (process.env.NODE_ENV === "production" || process.env.VERCEL)
  throw new Error("模拟数据仅允许用于本地开发");
nextEnv.loadEnvConfig(process.cwd(), true);
if (
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL ||
  process.env.ANALYTICS_STORAGE !== "local-sqlite"
)
  throw new Error("请先配置本地SQLite统计环境");
const localRoot = realpathSync(resolve(".local"));
const file = realpathSync(
  resolve(
    process.env.ANALYTICS_SQLITE_PATH || ".local/private-analytics.sqlite",
  ),
);
if (!file.startsWith(localRoot + sep))
  throw new Error("模拟数据只能写入项目.local目录下的现有数据库");
const prefix = "demo-analytics-v1:";
const db = new DatabaseSync(file);
db.exec("PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;");
const clear = process.argv.includes("--clear");
const DAY = 86400000;
const now = Date.now() - 10000;
const today = Date.parse(
  new Date(now + 8 * 3600000).toISOString().slice(0, 10) + "T00:00:00+08:00",
);
const pages = [
  ["/", "主站首页", 24],
  ["/zero-to-one/agent", "Agent 课程", 18],
  ["/ai-knowledge", "AI 知识库", 12],
  ["/sql-learning", "SQL 学习", 10],
  ["/personal-space", "个人作品", 7],
  ["/sql-learning/sql-cheatsheet", "SQL 速查表", 6],
  ["/ai-papers", "AI 论文", 5],
  ["/ai-papers/alexnet", "AlexNet 论文", 3],
  ["/ai-papers/licklider", "人机共生论文", 2],
  ["/act.html", "行动计划表", 2],
];
const curriculum = readFileSync("content/agent-course/curriculum.ts", "utf8");
for (const [, id, title] of curriculum.matchAll(
  /id: "(\d{2})",\s*title: "([^"]+)"/g,
)) {
  if (["01", "05", "06", "09", "17", "19"].includes(id))
    pages.push([
      `/zero-to-one/agent/${id}`,
      `第${Number(id)}课 · ${title}`,
      id === "17" ? 12 : 4,
    ]);
}
let state = 170929;
const random = () => {
  state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
  return state / 4294967296;
};
const weightedPage = () => {
  let ticket = random() * pages.reduce((sum, p) => sum + p[2], 0);
  for (const page of pages) {
    ticket -= page[2];
    if (ticket < 0) return page;
  }
  return pages[0];
};
const regions = [
  "北京",
  "上海",
  "广东",
  "浙江",
  "江苏",
  "四川",
  "湖北",
  "山东",
  "福建",
  "陕西",
  "香港",
  "美国",
  "新加坡",
  "未知",
];
const durations = [
  [35, 10, 49],
  [45, 90, 3100],
  [11, 3700, 6900],
  [6, 7300, 10400],
  [3, 11000, 14000],
];
let views = 0,
  sessions = 0;
try {
  db.exec("BEGIN IMMEDIATE");
  // Prefix ownership makes reruns and cleanup safe for real local visits and login sessions.
  for (const table of ["events", "timing_quality", "activities"])
    db.prepare(
      `DELETE FROM ${table} WHERE view IN (SELECT id FROM views WHERE session LIKE ?)`,
    ).run(prefix + "%");
  db.prepare("DELETE FROM views WHERE session LIKE ?").run(prefix + "%");
  db.prepare("DELETE FROM sessions WHERE id LIKE ?").run(prefix + "%");
  if (!clear) {
    const sessionInsert = db.prepare("INSERT INTO sessions VALUES(?,?,?,?)");
    const viewInsert = db.prepare(
      "INSERT INTO views VALUES(?,?,?,?,?,?,?,?,?,?)",
    );
    const activityInsert = db.prepare("INSERT INTO activities VALUES(?,?,?,?)");
    for (let day = 0; day < 430; day++) {
      const startOfDay = today - (429 - day) * DAY;
      const endOfDay = Math.min(startOfDay + DAY - 1000, now);
      const weekday = new Date(startOfDay + 8 * 3600000).getUTCDay();
      const campaign = day % 61 >= 48 && day % 61 <= 52 ? 55 : 0;
      const count = Math.max(
        12,
        Math.round(
          (30 +
            day / 8 +
            16 * Math.sin(day / 9) +
            9 * Math.cos(day / 23) +
            campaign) *
            ([0, 6].includes(weekday) ? 0.72 : 1.12) +
            random() * 15,
        ),
      );
      for (let n = 0; n < count; n++) {
        const visitorIndex = Math.floor(random() * 1600);
        const visitor = prefix + "visitor:" + visitorIndex;
        const session = `${prefix}session:${day}:${n}`;
        const device =
          visitorIndex % 100 < 60
            ? "桌面端"
            : visitorIndex % 100 < 94
              ? "手机"
              : "平板";
        // Stable per visitor, with a deliberately nonuniform region distribution.
        const region =
          regions[
            Math.floor(((visitorIndex % 100) / 100) ** 2 * regions.length)
          ];
        let ticket = random() * 100;
        const band =
          durations.find(([weight]) => (ticket -= weight) < 0) || durations[0];
        const duration = Math.min(
          Math.round((band[1] + random() * (band[2] - band[1])) * 1000),
          endOfDay - startOfDay,
        );
        const started =
          startOfDay +
          Math.round(random() * Math.max(0, endOfDay - startOfDay - duration));
        const ended = started + duration;
        sessionInsert.run(session, visitor, started, ended);
        sessions++;
        // Short visits browse one page; longer sessions can visit several pages.
        const pageCount = duration < 60000 ? 1 : 1 + Math.floor(random() * 5);
        let cursor = started;
        for (let p = 0; p < pageCount; p++) {
          const [path, name] = weightedPage();
          const view = `${prefix}view:${day}:${n}:${p}`;
          const pageEnd =
            p === pageCount - 1
              ? ended
              : cursor + Math.floor((ended - cursor) / (pageCount - p));
          viewInsert.run(
            view,
            visitor,
            session,
            path,
            name,
            cursor,
            region,
            device,
            pageEnd,
            prefix + "tab:" + visitorIndex,
          );
          activityInsert.run(view, session, cursor, pageEnd);
          cursor = pageEnd;
          views++;
        }
      }
    }
  }
  db.exec("COMMIT");
  console.log(
    clear
      ? "已清除带专属标记的模拟数据；保留真实本地访问及登录会话。"
      : `已生成430天本地模拟数据：${sessions.toLocaleString("zh-CN")}次会话、${views.toLocaleString("zh-CN")}次浏览，覆盖${pages.length}个页面。重复运行会替换此前模拟记录。`,
  );
} catch (error) {
  db.exec("ROLLBACK");
  throw error;
} finally {
  db.close();
}
