import Link from "next/link";
import { ArrowUpRight, NotebookPen } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import type { ArticleMeta, NewsItem } from "@/lib/ai-knowledge/types";
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
  updatedAt: string;
};

export function NewsPanel({ news, updatedAt }: NewsPanelProps) {
  const displayDate = updatedAt ? updatedAt.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$1年$2月$3日") : "持续更新";

  return (
    <section id="news" className="content-panel news-panel" aria-labelledby="news-title">
      <header className="news-heading">
        <div className="news-title-group">
          <p className="news-eyebrow">AI SIGNALS · 每周精选</p>
          <h2 id="news-title">AI 情报</h2>
          <p>筛掉热闹，留下值得产品经理继续追踪的行业信号。</p>
        </div>
        <time dateTime={updatedAt}>{displayDate}</time>
      </header>
      <ol className="news-list">
        {news.map((item, index) => (
          <li key={item.title} className={item.featured ? "news-item featured" : "news-item"}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <span className="news-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="news-copy">
                <span className="news-meta">
                  <em>{item.tag}</em>
                  <span>{item.source}</span>
                  <time dateTime={item.date}>{item.date}</time>
                </span>
                <strong>{item.title}</strong>
                <small>{item.summary}</small>
              </span>
              <ArrowUpRight className="news-arrow" size={20} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ColumnPanel() {
  return (
    <section id="guide" className="content-panel column-panel" aria-labelledby="column-title">
      <div className="section-heading">
        <div>
          <h2 id="column-title">放下碗专栏</h2>
          <p>一些需要慢一点想、再认真写下来的内容。</p>
        </div>
      </div>
      <div className="column-coming-soon">
        <NotebookPen size={28} strokeWidth={1.7} aria-hidden="true" />
        <p className="column-kicker">COMING SOON</p>
        <h3>先把值得写的内容攒够</h3>
        <p>最近还没有适合放进专栏的完整文章。等观点真正想清楚，再端上来。</p>
      </div>
    </section>
  );
}
