"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { SiteContent } from "@/lib/types";

type PortfolioHeaderProps = {
  site: SiteContent;
  activeTab: string;
  onTopTabClick: (href: string) => void;
};

export function PortfolioHeader({ site, activeTab, onTopTabClick }: PortfolioHeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<"agent" | "other" | null>(null);

  const toggleDropdown = (dropdown: "agent" | "other") => {
    setOpenDropdown((current) => (current === dropdown ? null : dropdown));
  };

  return (
    <header className="site-header">
      <div className="container nav">
        <div className="logo">{site.brandName}</div>
        <nav className="nav-links" aria-label="主导航">
          {site.topTabs.map((tab) => {
            const sectionId = tab.href.startsWith("#") ? tab.href.slice(1) : "";
            const isActive = sectionId !== "" && sectionId === activeTab;
            const shouldOpenInNewTab = tab.href === "/sql-learning" || tab.href === "/ai-knowledge";
            const isAiKnowledgeTab = tab.href === "/ai-knowledge";

            if (tab.label === "从0-1") {
              return (
                <div
                  className="nav-dropdown"
                  key={tab.href}
                  onMouseEnter={() => setOpenDropdown("agent")}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="top-tab top-tab-disclosure"
                    type="button"
                    aria-expanded={openDropdown === "agent"}
                    onClick={() => toggleDropdown("agent")}
                  >
                    <span>{tab.label}</span>
                    <ChevronDown aria-hidden="true" size={14} strokeWidth={2.25} />
                  </button>
                  <div className={`nav-dropdown-menu${openDropdown === "agent" ? " is-open" : ""}`}>
                    <a href={tab.href} target="_blank" rel="noreferrer" onClick={() => setOpenDropdown(null)}>
                      从0到1设计一个Agent
                    </a>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={tab.href}
                className={`top-tab${isActive ? " active" : ""}${isAiKnowledgeTab ? " top-tab-featured" : ""}`}
                href={tab.href}
                onClick={() => onTopTabClick(tab.href)}
                target={shouldOpenInNewTab ? "_blank" : undefined}
                rel={shouldOpenInNewTab ? "noreferrer" : undefined}
              >
                {tab.label}
              </a>
            );
          })}
          <div
            className="nav-dropdown nav-dropdown-other"
            onMouseEnter={() => setOpenDropdown("other")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="top-tab top-tab-disclosure"
              type="button"
              aria-expanded={openDropdown === "other"}
              onClick={() => toggleDropdown("other")}
            >
              <span>其他</span>
              <ChevronDown aria-hidden="true" size={14} strokeWidth={2.25} />
            </button>
            <div className={`nav-dropdown-menu${openDropdown === "other" ? " is-open" : ""}`}>
              <a
                href="#media"
                onClick={() => {
                  onTopTabClick("#media");
                  setOpenDropdown(null);
                }}
              >
                媒体推荐
              </a>
              <a href="/act.html" target="_blank" rel="noreferrer" onClick={() => setOpenDropdown(null)}>
                ACT
              </a>
            </div>
          </div>
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
