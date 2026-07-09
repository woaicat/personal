import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import type { ArticleMeta, ColumnItem, NewsItem } from "@/lib/ai-knowledge/types";
import { AI_KNOWLEDGE_BASE_PATH, knowledgeRoute } from "@/lib/ai-knowledge/url";

type SubsectionTabsProps = {
  section: string;
  subsections: string[];
  selectedSubsection?: string;
  query?: string;
};

function subsectionHref(section: string, subsection?: string, query?: string) {
  const params = new URLSearchParams({ section });
  if (subsection) {
    params.set("subsection", subsection);
  }
  if (query) {
    params.set("q", query);
  }

  return `${AI_KNOWLEDGE_BASE_PATH}?${params.toString()}#articles`;
}

export function SubsectionTabs({ section, subsections, selectedSubsection, query }: SubsectionTabsProps) {
  if (subsections.length === 0) {
    return null;
  }

  return (
    <nav className="category-tabs" aria-label="内容分类">
      {subsections.map((subsection) => (
        <Link
          key={subsection}
          className={subsection === selectedSubsection ? "active" : ""}
          href={knowledgeRoute(subsectionHref(section, subsection, query))}
        >
          {subsection}
        </Link>
      ))}
    </nav>
  );
}

type ArticleGridProps = {
  articles: ArticleMeta[];
  query?: string;
};

export function ArticleGrid({ articles, query }: ArticleGridProps) {
  return (
    <section id="articles" className="article-section" aria-labelledby="articles-title">
      <div className="sr-only">
        <h2 id="articles-title">文章列表</h2>
      </div>
      {articles.length > 0 ? (
        <div className="article-grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>暂时没有匹配内容</strong>
          <span>{query ? "换个关键词试试，或者先从推荐文章开始。" : "这个栏目还在补充文章。"}</span>
        </div>
      )}
    </section>
  );
}

type NewsPanelProps = {
  news: NewsItem[];
};

export function NewsPanel({ news }: NewsPanelProps) {
  return (
    <section id="news" className="content-panel news-panel" aria-labelledby="news-title">
      <div className="section-heading">
        <div>
          <h2 id="news-title">AI 情报</h2>
          <p>AI 产品与行业动态速递</p>
        </div>
        <Link className="text-link" href={knowledgeRoute(`${AI_KNOWLEDGE_BASE_PATH}#articles`)}>
          查看文章
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="news-list">
        {news.map((item) => (
          <Link key={item.title} className="news-item" href={knowledgeRoute(item.href)}>
            <img src={item.image} alt="" />
            <span>
              <strong>{item.title}</strong>
              <small>{item.summary}</small>
            </span>
            <time>{item.time}</time>
          </Link>
        ))}
      </div>
    </section>
  );
}

type ColumnPanelProps = {
  columns: ColumnItem[];
};

export function ColumnPanel({ columns }: ColumnPanelProps) {
  return (
    <section id="guide" className="content-panel column-panel" aria-labelledby="column-title">
      <div className="section-heading">
        <div>
          <h2 id="column-title">放下碗专栏</h2>
          <p>与你分享经验一起探索产品方法论</p>
        </div>
      </div>
      <div className="column-list">
        {columns.map((item) => (
          <Link key={item.title} className="column-item" href={knowledgeRoute(item.href)}>
            <img src={item.image} alt="" />
            <span>
              <em>{item.label}</em>
              <strong>{item.title}</strong>
              <small>{item.summary}</small>
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        ))}
      </div>
      <Link className="column-more" href={knowledgeRoute(`${AI_KNOWLEDGE_BASE_PATH}/articles/fangxiawan-column`)}>
        查看更多专栏文章
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}
