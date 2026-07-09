import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getArticle, getArticles, getRelatedArticles, getSiteData } from "@/lib/content";

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
    description: article.description
  };
}

export default async function ArticlePage({ params }: { params: ArticleParams }) {
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
        <Link className="back-link" href="/#articles">
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
