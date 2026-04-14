import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CSV_PATH = path.join(ROOT, "articles_data.csv");
const CONTENT_PATH = path.join(ROOT, "lib", "content.ts");

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    const next = line[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += ch;
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function parseCsv(text) {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n").filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    return [];
  }

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? "";
    });
    return row;
  });
}

function uniqueInOrder(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }
  return result;
}

function toTsString(value) {
  return JSON.stringify(String(value ?? ""));
}

function buildCardsBlock(cards) {
  if (cards.length === 0) {
    return "      cards: []";
  }

  const rows = cards.map((card, index) => {
    return [
      "        {",
      `          id: ${toTsString(`article-${index + 1}`)},`,
      `          category: ${toTsString(card.category)},`,
      `          title: ${toTsString(card.title)},`,
      `          summary: ${toTsString(card.summary)},`,
      `          publishDate: ${toTsString(card.publishDate)},`,
      `          url: ${toTsString(card.url)}`,
      "        }"
    ].join("\n");
  });

  return `      cards: [\n${rows.join(",\n")}\n      ]`;
}

function buildFiltersInline(filters) {
  const joined = filters.map((item) => toTsString(item)).join(", ");
  return `      filters: [${joined}],`;
}

function replaceRequired(source, pattern, replacement, errorMessage) {
  if (!pattern.test(source)) {
    throw new Error(errorMessage);
  }
  return source.replace(pattern, replacement);
}

function main() {
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`找不到 CSV 文件: ${CSV_PATH}`);
  }
  if (!fs.existsSync(CONTENT_PATH)) {
    throw new Error(`找不到内容文件: ${CONTENT_PATH}`);
  }

  const csvText = fs.readFileSync(CSV_PATH, "utf8");
  const rows = parseCsv(csvText);

  const cards = rows
    .map((row) => ({
      title: (row["标题"] ?? "").trim(),
      category: (row["标签"] ?? "").trim(),
      url: (row["跳转链接"] ?? "").trim(),
      summary: (row["摘要"] ?? "").trim(),
      publishDate: (row["发布日期"] ?? "").trim()
    }))
    .filter((row) => row.title !== "");

  const categories = uniqueInOrder(cards.map((card) => card.category).filter((item) => item !== ""));
  const filters = ["全部", ...categories];

  let content = fs.readFileSync(CONTENT_PATH, "utf8");

  content = replaceRequired(
    content,
    /(\{\s*label:\s*"文章",\s*value:\s*")[^"]*("\s*\})/,
    `$1${cards.length}$2`,
    "未匹配到“文章”统计字段，请检查 lib/content.ts 结构"
  );

  content = replaceRequired(
    content,
    /(\{\s*label:\s*"专题",\s*value:\s*")[^"]*("\s*\})/,
    `$1${categories.length}$2`,
    "未匹配到“专题”统计字段，请检查 lib/content.ts 结构"
  );

  content = replaceRequired(
    content,
    /^\s*filters:\s*\[[^\]]*\],$/m,
    buildFiltersInline(filters),
    "未匹配到 articles.filters 字段，请检查 lib/content.ts 结构"
  );

  const cardsPattern = /^\s*cards:\s*\[[\s\S]*?^\s*\](\n\s*\},\n\s*projects:)/m;
  const cardsMatch = content.match(cardsPattern);
  if (!cardsMatch) {
    throw new Error("未匹配到 articles.cards 区块，请检查 lib/content.ts 结构");
  }

  const cardsBlock = buildCardsBlock(cards);
  content = content.replace(cardsPattern, `${cardsBlock}${cardsMatch[1]}`);

  fs.writeFileSync(CONTENT_PATH, content, "utf8");

  console.log(`已同步文章 ${cards.length} 篇，专题 ${categories.length} 个。`);
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[sync:articles] ${message}`);
  process.exit(1);
}
