import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import siteDataJson from "../../content/site.json";
import type { Article, ArticleCategory, ArticleMeta, SiteData } from "./types";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function toSlug(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function assertString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function parseArticle(fileName: string): Article {
  const slug = toSlug(fileName);
  const fullPath = path.join(articlesDirectory, fileName);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  return {
    slug,
    title: assertString(data.title, slug),
    description: assertString(data.description),
    category: assertString(data.category, "导读") as ArticleCategory,
    date: assertString(data.date),
    author: assertString(data.author, "周周 Jinno"),
    readCount: assertString(data.readCount, "0"),
    image: assertString(data.image, "/images/article-lake-1.png"),
    featured: Boolean(data.featured),
    hotRank: typeof data.hotRank === "number" ? data.hotRank : undefined,
    hotSummary: optionalString(data.hotSummary),
    content
  };
}

export const getSiteData = cache((): SiteData => siteDataJson as SiteData);

export const getArticles = cache((): Article[] => {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parseArticle)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export function getArticle(slug: string) {
  return getArticles().find((article) => article.slug === slug);
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

export function filterArticles(params: { category?: string; q?: string }) {
  const query = params.q?.trim().toLowerCase();
  const category = params.category && params.category !== "推荐" ? params.category : undefined;
  const base = category === "热门" ? getHotArticles() : getArticleMetas();

  return base.filter((article) => {
    const matchesCategory = !category || category === "热门" || article.category === category;
    const matchesQuery =
      !query ||
      [article.title, article.description, article.category, article.author]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return matchesCategory && matchesQuery;
  });
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getArticleMetas()
    .filter((candidate) => candidate.slug !== article.slug)
    .filter((candidate) => candidate.category === article.category || candidate.featured)
    .slice(0, limit);
}
