"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsEdition } from "@/lib/ai-knowledge/types";

type NewsPanelProps = {
  editions: NewsEdition[];
};

type SlideDirection = "idle" | "newer" | "older";

function formatCollectedAt(date: string) {
  return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$1年$2月$3日");
}

export function NewsPanel({ editions }: NewsPanelProps) {
  const [editionIndex, setEditionIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>("idle");
  const edition = editions[editionIndex];
  const isLatest = editionIndex === 0;
  const isOldest = editionIndex === editions.length - 1;

  if (!edition) {
    return null;
  }

  function showNewerEdition() {
    if (isLatest) return;
    setDirection("newer");
    setEditionIndex((current) => current - 1);
  }

  function showOlderEdition() {
    if (isOldest) return;
    setDirection("older");
    setEditionIndex((current) => current + 1);
  }

  return (
    <section id="news" className="content-panel news-panel" aria-labelledby="news-title">
      <header className="news-heading">
        <div className="news-title-group">
          <p className="news-eyebrow">AI SIGNALS · 每周精选</p>
          <h2 id="news-title">AI 情报</h2>
          <p>筛掉热闹，留下值得产品经理继续追踪的行业信号。</p>
        </div>
        <div className="news-date-navigation" aria-label="切换情报收集日期">
          <button
            type="button"
            onClick={showNewerEdition}
            disabled={isLatest}
            aria-label="查看更新一期情报"
            aria-controls="news-edition-list"
            title={isLatest ? "已经是最新一期" : "查看更新一期"}
          >
            <ChevronLeft size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <span
            key={edition.collectedAt}
            className="news-date-slide"
            data-direction={direction}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <time dateTime={edition.collectedAt}>{formatCollectedAt(edition.collectedAt)}</time>
            <span className="sr-only">，第 {editionIndex + 1} 期，共 {editions.length} 期</span>
          </span>
          <button
            type="button"
            onClick={showOlderEdition}
            disabled={isOldest}
            aria-label="查看更早一期情报"
            aria-controls="news-edition-list"
            title={isOldest ? "已经是最早一期" : "查看更早一期"}
          >
            <ChevronRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </header>
      <div key={edition.collectedAt} className="news-list-stage" data-direction={direction}>
        <ol id="news-edition-list" className="news-list">
          {edition.items.map((item, index) => (
            <li key={item.title} className={item.featured ? "news-item featured" : "news-item"}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <span className="news-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="news-copy">
                  <span className="news-meta">
                    <em>{item.tag}</em>
                    <span>{item.source}</span>
                    <time dateTime={item.date}>{item.date}</time>
                  </span>
                  <strong>{item.title}</strong>
                  <small>{item.summary}</small>
                </span>
                <ArrowUpRight className="news-arrow" size={20} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
