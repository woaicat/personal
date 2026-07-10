import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import siteDataJson from "@/content/ai-knowledge/site.json";
import type { Article, ArticleCategory, ArticleMeta, ArticleStatus, SiteData } from "./types";
import { knowledgeAssetPath, knowledgeHref } from "./url";

const articlesDirectory = path.join(process.cwd(), "content", "ai-knowledge", "articles");
const DEFAULT_SECTION = "AI产品落地";

const articleSectionFallbacks: Record<string, { section: string; subsection?: string }> = {
  "ai-product-thinking-framework": { section: "AI产品落地", subsection: "需求判断" },
  "requirement-fit-for-ai": { section: "AI产品落地", subsection: "需求判断" },
  "ai-product-methodology": { section: "AI产品落地", subsection: "方案选择" },
  "evaluation-driven-iteration": { section: "AI产品落地", subsection: "评测驱动迭代" },
  "large-model-map": { section: "AI技术基础" },
  "agent-design-pattern": { section: "AI Agent", subsection: "Agent组件" },
  "ai-case-library": { section: "AI Agent", subsection: "案例库" },
  "fangxiawan-column": { section: "放下碗专栏" }
};

function toSlug(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function assertString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function parseExternalUrl(value: unknown, fileName: string) {
  const externalUrl = optionalString(value);

  if (!externalUrl) {
    return undefined;
  }

  try {
    const parsed = new URL(externalUrl);
    if (parsed.protocol !== "https:") {
      throw new Error("only HTTPS links are allowed");
    }
    return parsed.toString();
  } catch {
    throw new Error(`[ai-knowledge] ${fileName} contains an invalid externalUrl`);
  }
}

function parseStatus(value: unknown, fileName: string): ArticleStatus {
  if (value === "draft" || value === "published") {
    return value;
  }

  throw new Error(`[ai-knowledge] ${fileName} contains an invalid status`);
}

function normalizeSiteData(site: SiteData): SiteData {
  return {
    ...site,
    navigation: site.navigation.map((item) => ({ ...item, href: knowledgeHref(item.href) })),
    sections: site.sections,
    news: site.news.map((item) => ({
      ...item,
      href: knowledgeHref(item.href)
    })),
    footer: {
      contact: site.footer.contact.map((item) => ({ ...item, href: knowledgeHref(item.href) }))
    }
  };
}

function parseArticle(fileName: string): Article {
  const slug = toSlug(fileName);
  const fallback = articleSectionFallbacks[slug] ?? { section: DEFAULT_SECTION };
  const fullPath = path.join(articlesDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const externalUrl = parseExternalUrl(data.externalUrl, fileName);
  const status = parseStatus(data.status, fileName);

  return {
    slug,
    title: assertString(data.title, slug),
    description: assertString(data.description),
    category: assertString(data.category, "导读") as ArticleCategory,
    section: assertString(data.section, fallback.section),
    subsection: optionalString(data.subsection) ?? fallback.subsection,
    contentType: externalUrl ? "link" : "markdown",
    externalUrl,
    status,
    date: assertString(data.date),
    author: assertString(data.author, "jiaxuan"),
    readCount: assertString(data.readCount, "0"),
    image: knowledgeAssetPath(assertString(data.image, "/images/article-lake-1.png")),
    featured: Boolean(data.featured),
    hotRank: typeof data.hotRank === "number" ? data.hotRank : undefined,
    hotSummary: optionalString(data.hotSummary),
    content
  };
}

export const getSiteData = cache((): SiteData => normalizeSiteData(siteDataJson as SiteData));

export const getArticles = cache((): Article[] => {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const includeDrafts = process.env.NODE_ENV !== "production";

  return fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parseArticle)
    .filter((article) => includeDrafts || article.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export function getArticle(slug: string) {
  return getMarkdownArticles().find((article) => article.slug === slug);
}

export function getMarkdownArticles() {
  return getArticles().filter((article) => article.contentType === "markdown");
}

export function getArticleMetas(): ArticleMeta[] {
  return getArticles().map(({ content: _content, ...meta }) => meta);
}

export function getFeaturedArticles() {
  return getArticleMetas().filter((article) => article.featured);
}

export function getHotArticles() {
  return getArticleMetas()
    .filter((article) => typeof article.hotRank === "number")
    .sort((a, b) => (a.hotRank ?? 99) - (b.hotRank ?? 99));
}

export function filterArticles(params: { category?: string; q?: string; section?: string; subsection?: string }) {
  const query = params.q?.trim().toLowerCase();
  const category = params.category && params.category !== "推荐" ? params.category : undefined;
  const base = category === "热门" ? getHotArticles() : getArticleMetas();

  return base.filter((article) => {
    const matchesCategory = !category || category === "热门" || article.category === category;
    const matchesSection = !params.section || article.section === params.section;
    const matchesSubsection = !params.subsection || article.subsection === params.subsection;
    const matchesQuery =
      !query ||
      [article.title, article.description, article.category, article.section, article.subsection, article.author]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return matchesCategory && matchesSection && matchesSubsection && matchesQuery;
  });
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getArticleMetas()
    .filter((candidate) => candidate.slug !== article.slug)
    .filter((candidate) => candidate.category === article.category || candidate.featured)
    .slice(0, limit);
}
