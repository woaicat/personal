import { ArticleGrid, ColumnPanel, NewsPanel, SubsectionTabs } from "@/components/ai-knowledge/HomeSections";
import { Hero } from "@/components/ai-knowledge/Hero";
import { SiteFooter } from "@/components/ai-knowledge/SiteFooter";
import { SiteHeader } from "@/components/ai-knowledge/SiteHeader";
import { filterArticles, getHotArticles, getSiteData } from "@/lib/ai-knowledge/content";

type HomeSearchParams = Promise<{
  category?: string;
  q?: string;
  section?: string;
  subsection?: string;
}>;

export default async function AiKnowledgeHome({ searchParams }: { searchParams?: HomeSearchParams }) {
  const params = searchParams ? await searchParams : {};
  const site = getSiteData();
  const selectedSection = site.sections.find((section) => section.label === params.section)?.label || site.sections[0].label;
  const sectionConfig = site.sections.find((section) => section.label === selectedSection) || site.sections[0];
  const subsections = sectionConfig.subsections || [];
  const selectedSubsection = subsections.includes(params.subsection || "") ? params.subsection : undefined;
  const query = params.q || "";
  const articles = filterArticles({ section: selectedSection, subsection: selectedSubsection, q: query });
  const visibleArticles = articles.slice(0, 12);

  return (
    <>
      <div className="top-visual">
        <SiteHeader
          navigation={site.navigation}
          activeSection={selectedSection}
          defaultQuery={query}
          selectedSubsection={selectedSubsection}
        />
        <Hero title={site.hero.title} subtitle={site.hero.subtitle} hotArticles={getHotArticles()} />
      </div>
      <main className="page-shell">
        <SubsectionTabs section={selectedSection} subsections={subsections} selectedSubsection={selectedSubsection} query={query} />
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
