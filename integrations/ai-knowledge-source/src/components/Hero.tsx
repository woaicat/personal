import Link from "next/link";
import type { ArticleMeta } from "@/lib/types";

type HeroProps = {
  title: string;
  subtitle: string;
  hotArticles: ArticleMeta[];
};

export function Hero({ title, subtitle, hotArticles }: HeroProps) {
  return (
    <section className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div>
          <h1 id="hero-title">{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="hero-dots" aria-hidden="true">
          <span />
          <span />
          <span className="active" />
          <span />
        </div>
      </div>

      <aside className="hot-panel" aria-labelledby="hot-title">
        <div className="panel-title-row">
          <h2 id="hot-title">热门推荐</h2>
        </div>
        <ol className="hot-list">
          {hotArticles.slice(0, 4).map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`}>
                <span className="rank">{article.hotRank}</span>
                <span>
                  <strong>{article.title}</strong>
                  <small>{article.hotSummary || article.description}</small>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
