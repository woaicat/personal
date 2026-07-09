import Link from "next/link";
import { Search } from "lucide-react";
import type { SiteLink } from "@/lib/ai-knowledge/types";
import { AI_KNOWLEDGE_BASE_PATH, isExternalHref, knowledgeRoute } from "@/lib/ai-knowledge/url";

type SiteHeaderProps = {
  navigation: SiteLink[];
  defaultQuery?: string;
};

export function SiteHeader({ navigation, defaultQuery = "" }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand" href={knowledgeRoute(AI_KNOWLEDGE_BASE_PATH)} aria-label="AI 产品经理知识体系首页">
        <span className="brand-name">AI 产品经理知识体系</span>
      </Link>

      <nav className="site-nav" aria-label="知识库主导航">
        {navigation.map((item) =>
          isExternalHref(item.href) ? (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            <Link key={item.label} href={knowledgeRoute(item.href)}>
              {item.label}
            </Link>
          )
        )}
      </nav>

      <div className="header-actions">
        <form className="search-form" action={AI_KNOWLEDGE_BASE_PATH} role="search">
          <Search size={15} aria-hidden="true" />
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
