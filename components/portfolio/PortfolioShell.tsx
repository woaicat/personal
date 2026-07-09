import type { SiteContent } from "@/lib/types";

type PortfolioHeaderProps = {
  site: SiteContent;
  activeTab: string;
  onTopTabClick: (href: string) => void;
};

export function PortfolioHeader({ site, activeTab, onTopTabClick }: PortfolioHeaderProps) {
  return (
    <header className="site-header">
      <div className="container nav">
        <div className="logo">{site.brandName}</div>
        <nav className="nav-links" aria-label="主导航">
          {site.topTabs.map((tab) => {
            const sectionId = tab.href.startsWith("#") ? tab.href.slice(1) : "";
            const isActive = sectionId !== "" && sectionId === activeTab;
            const shouldOpenInNewTab = !tab.href.startsWith("#");

            return (
              <a
                key={tab.href}
                className={`top-tab${isActive ? " active" : ""}`}
                href={tab.href}
                onClick={() => onTopTabClick(tab.href)}
                target={shouldOpenInNewTab ? "_blank" : undefined}
                rel={shouldOpenInNewTab ? "noreferrer" : undefined}
              >
                {tab.label}
              </a>
            );
          })}
          <a className="btn btn-primary" href="#subscribe-anchor">
            订阅
          </a>
        </nav>
      </div>
    </header>
  );
}

export function PortfolioFooter({ brandName }: { brandName: string }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">{brandName}</div>
          <p>面向思考型创造者的独立写作工作室。</p>
        </div>
        <div className="footer-meta">
          <span>© 2026 {brandName}</span>
          <span>保留所有权利</span>
        </div>
      </div>
    </footer>
  );
}
