import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const ARTICLES_DIR = path.join(ROOT, "content", "ai-knowledge", "articles");
const SITE_PATH = path.join(ROOT, "content", "ai-knowledge", "site.json");
const KNOWLEDGE_IMAGES_DIR = path.join(ROOT, "public", "ai-knowledge", "images");

const ARTICLE_CATEGORIES = new Set(["导读", "产品经理", "方法论", "技术基础", "Agent", "案例库", "放下碗"]);
const ARTICLE_STATUSES = new Set(["draft", "published"]);
const REQUIRED_FIELDS = ["title", "description", "category", "section", "date", "author", "readCount", "image", "featured", "status"];
const ALLOWED_FIELDS = new Set([
  ...REQUIRED_FIELDS,
  "subsection",
  "updatedAt",
  "externalUrl",
  "hotRank",
  "hotSummary"
]);
const REQUIRED_NEWS_FIELDS = ["title", "summary", "href", "date", "source", "tag"];

const errors = [];
const externalUrls = new Map();
const hotRanks = new Map();

function addError(fileName, message) {
  errors.push(`${fileName}: ${message}`);
}

function isValidIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateImage(fileName, image) {
  if (typeof image !== "string" || !image.startsWith("/images/")) {
    addError(fileName, "image 必须使用 /images/... 路径");
    return;
  }

  const relativePath = image.slice("/images/".length);
  const resolvedPath = path.resolve(KNOWLEDGE_IMAGES_DIR, relativePath);
  const relativeToImages = path.relative(KNOWLEDGE_IMAGES_DIR, resolvedPath);

  if (relativeToImages.startsWith("..") || path.isAbsolute(relativeToImages)) {
    addError(fileName, "image 不能指向 AI 知识库图片目录之外");
    return;
  }

  if (!fs.existsSync(resolvedPath)) {
    addError(fileName, `图片不存在: ${image}`);
  }
}

function validateExternalUrl(fileName, externalUrl) {
  if (externalUrl === undefined) {
    return;
  }

  if (typeof externalUrl !== "string") {
    addError(fileName, "externalUrl 必须是字符串");
    return;
  }

  try {
    const parsed = new URL(externalUrl);
    if (parsed.protocol !== "https:") {
      addError(fileName, "externalUrl 只允许 HTTPS 链接");
      return;
    }

    const normalized = parsed.toString();
    const duplicate = externalUrls.get(normalized);
    if (duplicate) {
      addError(fileName, `externalUrl 与 ${duplicate} 重复`);
    } else {
      externalUrls.set(normalized, fileName);
    }
  } catch {
    addError(fileName, "externalUrl 不是有效 URL");
  }
}

function validateHotRecommendation(fileName, data) {
  if (data.hotRank === undefined) {
    if (data.hotSummary !== undefined) {
      addError(fileName, "填写 hotSummary 时必须同时填写 hotRank");
    }
    return;
  }

  if (!Number.isInteger(data.hotRank) || data.hotRank < 1 || data.hotRank > 4) {
    addError(fileName, "hotRank 必须是 1–4 的整数");
    return;
  }

  if (data.status !== "published") {
    addError(fileName, "热门推荐必须是 published 状态");
  }

  if (typeof data.hotSummary !== "string" || data.hotSummary.trim() === "") {
    addError(fileName, "热门推荐必须填写 hotSummary");
  }

  const duplicate = hotRanks.get(data.hotRank);
  if (duplicate) {
    addError(fileName, `hotRank ${data.hotRank} 与 ${duplicate} 重复`);
  } else {
    hotRanks.set(data.hotRank, fileName);
  }
}

function validateNewsEditions(site) {
  if (!Array.isArray(site.newsEditions) || site.newsEditions.length === 0) {
    addError("site.json", "newsEditions 必须至少包含一期情报");
    return;
  }

  const collectedDates = new Set();
  const newsUrls = new Map();

  site.newsEditions.forEach((edition, editionIndex) => {
    const editionName = `site.json newsEditions[${editionIndex}]`;

    if (!isValidIsoDate(edition.collectedAt)) {
      addError(editionName, "collectedAt 必须是有效的 YYYY-MM-DD 日期");
    } else if (collectedDates.has(edition.collectedAt)) {
      addError(editionName, `collectedAt ${edition.collectedAt} 重复`);
    } else {
      collectedDates.add(edition.collectedAt);
    }

    const previousEdition = site.newsEditions[editionIndex - 1];
    if (previousEdition && previousEdition.collectedAt <= edition.collectedAt) {
      addError(editionName, "newsEditions 必须按 collectedAt 从新到旧排列");
    }

    if (!Array.isArray(edition.items) || edition.items.length === 0) {
      addError(editionName, "items 必须至少包含一条情报");
      return;
    }

    let featuredCount = 0;

    edition.items.forEach((item, itemIndex) => {
      const itemName = `${editionName}.items[${itemIndex}]`;

      for (const field of REQUIRED_NEWS_FIELDS) {
        if (typeof item[field] !== "string" || item[field].trim() === "") {
          addError(itemName, `缺少有效字段 ${field}`);
        }
      }

      if (!isValidIsoDate(item.date)) {
        addError(itemName, "date 必须是有效的 YYYY-MM-DD 日期");
      } else if (isValidIsoDate(edition.collectedAt) && item.date > edition.collectedAt) {
        addError(itemName, "date 不能晚于本期 collectedAt");
      }

      if (item.featured !== undefined && typeof item.featured !== "boolean") {
        addError(itemName, "featured 必须是 true 或 false");
      }

      if (item.featured) {
        featuredCount += 1;
      }

      if (typeof item.href === "string") {
        try {
          const parsed = new URL(item.href);
          if (parsed.protocol !== "https:") {
            addError(itemName, "href 只允许 HTTPS 链接");
          } else {
            const normalized = parsed.toString();
            const duplicate = newsUrls.get(normalized);
            if (duplicate) {
              addError(itemName, `href 与 ${duplicate} 重复`);
            } else {
              newsUrls.set(normalized, itemName);
            }
          }
        } catch {
          addError(itemName, "href 不是有效 URL");
        }
      }
    });

    if (featuredCount > 1) {
      addError(editionName, "每期最多设置一条 featured 情报");
    }
  });
}

function main() {
  const site = JSON.parse(fs.readFileSync(SITE_PATH, "utf8"));
  validateNewsEditions(site);
  const sections = new Map(site.sections.map((section) => [section.label, new Set(section.subsections ?? [])]));
  const files = fs.readdirSync(ARTICLES_DIR).filter((fileName) => fileName.endsWith(".md")).sort();

  for (const fileName of files) {
    const fullPath = path.join(ARTICLES_DIR, fileName);
    const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

    for (const field of REQUIRED_FIELDS) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        addError(fileName, `缺少必填字段 ${field}`);
      }
    }

    for (const field of Object.keys(data)) {
      if (!ALLOWED_FIELDS.has(field)) {
        addError(fileName, `存在未识别字段 ${field}`);
      }
    }

    if (!ARTICLE_CATEGORIES.has(data.category)) {
      addError(fileName, `category 不在允许范围内: ${String(data.category)}`);
    }

    if (!ARTICLE_STATUSES.has(data.status)) {
      addError(fileName, "status 只能是 draft 或 published");
    }

    if (!isValidIsoDate(data.date)) {
      addError(fileName, "date 必须是有效的 YYYY-MM-DD 日期");
    }

    if (data.updatedAt !== undefined && !isValidIsoDate(data.updatedAt)) {
      addError(fileName, "updatedAt 必须是有效的 YYYY-MM-DD 日期");
    }

    const subsections = sections.get(data.section);
    if (!subsections) {
      addError(fileName, `section 不在 site.json 中: ${String(data.section)}`);
    } else if (data.subsection && !subsections.has(data.subsection)) {
      addError(fileName, `subsection 不属于 ${data.section}: ${data.subsection}`);
    }

    if (typeof data.featured !== "boolean") {
      addError(fileName, "featured 必须是 true 或 false");
    }

    if (typeof data.readCount !== "string") {
      addError(fileName, "readCount 必须使用字符串，例如 \"0\"");
    }

    validateImage(fileName, data.image);
    validateExternalUrl(fileName, data.externalUrl);
    validateHotRecommendation(fileName, data);

    if (!data.externalUrl && content.trim() === "") {
      addError(fileName, "站内文章必须包含 Markdown 正文");
    }
  }

  for (const rank of [1, 2, 3, 4]) {
    if (!hotRanks.has(rank)) {
      errors.push(`热门推荐缺少 hotRank ${rank}`);
    }
  }

  if (errors.length > 0) {
    console.error(`[content:check] 发现 ${errors.length} 个问题:`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(`[content:check] ${files.length} 篇文章、热门推荐 4 篇、AI 情报 ${site.newsEditions.length} 期校验通过。`);
}

main();
