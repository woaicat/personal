import Link from "next/link";
import { Eye } from "lucide-react";
import type { ArticleMeta } from "@/lib/ai-knowledge/types";
import { AI_KNOWLEDGE_BASE_PATH, knowledgeRoute } from "@/lib/ai-knowledge/url";

type ArticleCardProps = {
  article: ArticleMeta;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="article-card">
      <Link href={knowledgeRoute(`${AI_KNOWLEDGE_BASE_PATH}/articles/${article.slug}`)} aria-label={`阅读 ${article.title}`}>
        <div className="card-image-wrap">
          <img src={article.image} alt="" />
          <span className="category-chip">{article.category}</span>
        </div>
        <div className="card-body">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <div className="card-meta">
            <span className="author-dot" aria-hidden="true" />
            <span>{article.author}</span>
            <time dateTime={article.date}>{article.date}</time>
            <span className="read-count">
              <Eye size={13} aria-hidden="true" />
              {article.readCount}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
