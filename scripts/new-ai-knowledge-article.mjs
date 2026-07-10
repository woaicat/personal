import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TEMPLATE_PATH = path.join(ROOT, "content", "ai-knowledge", "templates", "article.md");
const ARTICLES_DIR = path.join(ROOT, "content", "ai-knowledge", "articles");

function fail(message) {
  console.error(`[content:new] ${message}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const slug = args[0];
const externalFlagIndex = args.indexOf("--external");
const externalUrl = externalFlagIndex >= 0 ? args[externalFlagIndex + 1] : undefined;

if (!slug) {
  fail("请提供 slug，例如 npm run content:new -- agent-memory");
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  fail("slug 只能包含小写字母、数字和单个连字符");
}

if (externalFlagIndex >= 0) {
  try {
    const parsed = new URL(externalUrl);
    if (parsed.protocol !== "https:") {
      fail("外链只允许 HTTPS URL");
    }
  } catch {
    fail("--external 后需要提供有效的 HTTPS URL");
  }
}

const targetPath = path.join(ARTICLES_DIR, `${slug}.md`);
if (fs.existsSync(targetPath)) {
  fail(`${slug}.md 已存在`);
}

const today = new Date().toISOString().slice(0, 10);
const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
const output = template
  .replaceAll("{{date}}", today)
  .replace("{{externalUrlLine}}", externalUrl ? `externalUrl: "${externalUrl}"` : "");

fs.writeFileSync(targetPath, output, "utf8");
console.log(`[content:new] 已创建 content/ai-knowledge/articles/${slug}.md`);
