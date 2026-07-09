import { ArticleGrid, CategoryTabs, ColumnPanel, NewsPanel } from "@/components/HomeSections";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { filterArticles, getHotArticles, getSiteData } from "@/lib/content";

type HomeSearchParams = Promise<{
  category?: string;
  q?: string;
}>;

export default async function Home({ searchParams }: { searchParams?: HomeSearchParams }) {
  const params = searchParams ? await searchParams : {};
  const site = getSiteData();
  const selectedCategory = params.category || "推荐";
  const query = params.q || "";
  const articles = filterArticles({ category: selectedCategory, q: query });
  const visibleArticles = selectedCategory === "推荐" && !query ? articles.slice(0, 8) : articles;

  return (
    <>
      <div className="top-visual">
        <SiteHeader navigation={site.navigation} defaultQuery={query} />
        <Hero title={site.hero.title} subtitle={site.hero.subtitle} hotArticles={getHotArticles()} />
      </div>
      <main className="page-shell">
        <CategoryTabs categories={site.categories} selectedCategory={selectedCategory} query={query} />
        <ArticleGrid articles={visibleArticles} query={query} />
        <div className="lower-grid">
          <NewsPanel news={site.news} />
          <ColumnPanel columns={site.columns} />
        </div>
      </main>
      <SiteFooter footer={site.footer} />
    </>
  );
}
