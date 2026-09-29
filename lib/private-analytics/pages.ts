import { allAgentLessons } from "../../content/agent-course/curriculum";
import { implementedLessons } from "../../content/sql-learning/courseRegistry";
import { getMarkdownArticles } from "../ai-knowledge/content";
import staticPaths from "./static-paths.json";
import { normalizePath } from "./aggregate";

const names: Record<string, string> = {
  "/": "主站首页",
  "/personal-space": "个人作品",
  "/ai-knowledge": "AI 知识库",
  "/ai-papers": "AI 论文",
  "/ai-papers/alexnet": "AlexNet 论文",
  "/ai-papers/licklider": "人机共生论文",
  "/sql-learning": "SQL 学习",
  "/sql-learning/sql-cheatsheet": "SQL 速查表",
  "/zero-to-one/agent": "Agent 课程",
  "/act.html": "行动计划表",
};
export function publicPageName(path: string): string | null {
  if (normalizePath(path) !== path) return null;
  if (staticPaths.includes(path)) return names[path] || path;
  const agent = /^\/zero-to-one\/agent\/([^/]+)$/.exec(path);
  if (agent) {
    const lesson = allAgentLessons.find((l) => l.id === agent[1]);
    return lesson ? `第${Number(lesson.id)}课 · ${lesson.title}` : null;
  }
  const sql = /^\/sql-learning\/lesson\/([^/]+)$/.exec(path);
  if (sql) {
    const lesson = implementedLessons.find((l) => l.id === sql[1]);
    return lesson ? `SQL · ${lesson.title}` : null;
  }
  const article = /^\/ai-knowledge\/articles\/([^/]+)$/.exec(path);
  if (article)
    return (
      getMarkdownArticles().find(
        (a) => a.status === "published" && a.slug === article[1],
      )?.title || null
    );
  return null;
}
