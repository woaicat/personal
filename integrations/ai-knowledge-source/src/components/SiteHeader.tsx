import Link from "next/link";
import { Search } from "lucide-react";
import type { SiteLink } from "@/lib/types";
import { isExternalHref } from "@/lib/url";

type SiteHeaderProps = {
  navigation: SiteLink[];
  defaultQuery?: string;
};

export function SiteHeader({ navigation, defaultQuery = "" }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="AI 产品经理知识体系首页">
        <span className="brand-name">AI 产品经理知识体系</span>
      </Link>

      <nav className="site-nav" aria-label="主导航">
        {navigation.map((item) =>
          isExternalHref(item.href) ? (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          )
        )}
      </nav>

      <div className="header-actions">
        <form className="search-form" action="/" role="search">
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
        <a className="start-link" href="/#articles">
          开始探索
        </a>
      </div>
    </header>
  );
}
