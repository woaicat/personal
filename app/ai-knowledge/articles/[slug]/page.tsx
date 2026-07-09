import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/ai-knowledge/ArticleCard";
import { MarkdownContent } from "@/components/ai-knowledge/MarkdownContent";
import { SiteFooter } from "@/components/ai-knowledge/SiteFooter";
import { SiteHeader } from "@/components/ai-knowledge/SiteHeader";
import { getArticle, getArticles, getRelatedArticles, getSiteData } from "@/lib/ai-knowledge/content";
import { AI_KNOWLEDGE_BASE_PATH, knowledgeRoute } from "@/lib/ai-knowledge/url";

type ArticleParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: ArticleParams }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: "文章不存在"
    };
  }

  return {
    title: article.title,
    description: article.description,
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function AiKnowledgeArticlePage({ params }: { params: ArticleParams }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const site = getSiteData();

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);

  return (
    <>
      <SiteHeader navigation={site.navigation} />
      <main className="article-page">
        <Link className="back-link" href={knowledgeRoute(`${AI_KNOWLEDGE_BASE_PATH}#articles`)}>
          <ArrowLeft size={17} aria-hidden="true" />
          返回知识库首页
        </Link>

        <article className="article-detail">
          <header className="article-hero">
            <div>
              <span className="category-chip">{article.category}</span>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <div className="detail-meta">
                <span>{article.author}</span>
                <time dateTime={article.date}>{article.date}</time>
                <span>{article.readCount} 阅读</span>
              </div>
            </div>
            <img src={article.image} alt="" />
          </header>
          <MarkdownContent content={article.content} />
        </article>

        {related.length > 0 ? (
          <section className="related-section" aria-labelledby="related-title">
            <h2 id="related-title">继续阅读</h2>
            <div className="article-grid compact">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter footer={site.footer} />
    </>
  );
}
