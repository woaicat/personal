import Link from "next/link";
import { Search } from "lucide-react";
import type { SiteLink } from "@/lib/ai-knowledge/types";
import { AI_KNOWLEDGE_BASE_PATH, isExternalHref, knowledgeRoute } from "@/lib/ai-knowledge/url";

type SiteHeaderProps = {
  navigation: SiteLink[];
  activeSection?: string;
  defaultQuery?: string;
  selectedSubsection?: string;
  tone?: "light" | "dark";
};

export function SiteHeader({ navigation, activeSection, defaultQuery = "", selectedSubsection, tone = "light" }: SiteHeaderProps) {
  const className = tone === "dark" ? "site-header site-header-over-hero" : "site-header";

  return (
    <header className={className}>
      <Link className="brand" href={knowledgeRoute(AI_KNOWLEDGE_BASE_PATH)} aria-label="AI 产品经理知识体系首页">
        <span className="brand-name">AI产品经理知识库</span>
      </Link>

      <nav className="site-nav" aria-label="知识库主导航">
        {navigation.map((item) =>
          isExternalHref(item.href) ? (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            <Link key={item.label} className={item.label === activeSection ? "active" : ""} href={knowledgeRoute(item.href)}>
              {item.label}
            </Link>
          )
        )}
      </nav>

      <div className="header-actions">
        <form className="search-form" action={AI_KNOWLEDGE_BASE_PATH} role="search">
          <Search size={15} aria-hidden="true" />
          {activeSection ? <input type="hidden" name="section" value={activeSection} /> : null}
          {selectedSubsection ? <input type="hidden" name="subsection" value={selectedSubsection} /> : null}
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={defaultQuery}
            placeholder="搜索文章、资源或关键词"
            aria-label="搜索文章、资源或关键词"
          />
        </form>
        <a className="start-link" href={`${AI_KNOWLEDGE_BASE_PATH}#articles`}>
          开始探索
        </a>
      </div>
    </header>
  );
}
