"use client";

import { useMemo, useState } from "react";
import { SqlLearningHeader } from "./SqlLearningHeader";
import {
  sqlCheatsheetCategories,
  sqlCheatsheetEntries,
  type SqlCheatsheetCategory,
} from "@/content/sql-learning/sqlCheatsheet";

export function SqlCheatsheetPage() {
  const [activeCategory, setActiveCategory] = useState<"全部" | SqlCheatsheetCategory>("全部");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();

  const visibleEntries = useMemo(() => sqlCheatsheetEntries.filter((entry) => {
    const matchesCategory = activeCategory === "全部" || entry.category === activeCategory;
    const searchableText = `${entry.title} ${entry.summary} ${entry.sql} ${entry.note}`.toLocaleLowerCase();
    return matchesCategory && (!normalizedSearchTerm || searchableText.includes(normalizedSearchTerm));
  }), [activeCategory, normalizedSearchTerm]);

  const copySql = async (id: string, sql: string) => {
    try {
      await navigator.clipboard.writeText(sql);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = sql;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => current === id ? null : current), 1600);
  };

  return (
    <main className="site-shell">
      <SqlLearningHeader activePage="cheatsheet" />
      <div className="cheatsheet-content">
        <div className="cheatsheet-heading">
          <p className="cheatsheet-eyebrow">SQL REFERENCE</p>
          <h1>常用 SQL 速查</h1>
          <p>
            把高频 SQL 写法整理成可搜索、可复制的参考卡片。这里使用的是通用占位符，
            不绑定某一套业务数据。
          </p>
        </div>

        <div className="cheatsheet-note">
          <strong>占位符说明：</strong>
          <code>table_name</code>、<code>column_name</code>、<code>:param</code> 都需要替换成你当前数据库中的真实表名、字段名和参数。
          复制后请根据数据库类型调整日期函数和分页语法。
        </div>

        <div className="cheatsheet-toolbar">
          <label className="cheatsheet-search-label" htmlFor="sql-cheatsheet-search">
            搜索写法
            <input
              id="sql-cheatsheet-search"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="搜索 JOIN、去重、分页、排名…"
              type="search"
              value={searchTerm}
            />
          </label>
          <div aria-label="SQL 分类" className="cheatsheet-categories" role="tablist">
            {sqlCheatsheetCategories.map((category) => (
              <button
                aria-selected={activeCategory === category}
                className={activeCategory === category ? "active" : ""}
                key={category}
                onClick={() => setActiveCategory(category)}
                role="tab"
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <p aria-live="polite" className="cheatsheet-count">
          当前显示 {visibleEntries.length} / {sqlCheatsheetEntries.length} 条写法
        </p>

        {visibleEntries.length > 0 ? (
          <div className="cheatsheet-grid">
            {visibleEntries.map((entry) => (
              <article className="cheatsheet-card" key={entry.id}>
                <div className="cheatsheet-card-header">
                  <span className="cheatsheet-category">{entry.category}</span>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                </div>
                <pre><code>{entry.sql}</code></pre>
                <div className="cheatsheet-card-footer">
                  <p>{entry.note}</p>
                  <button onClick={() => copySql(entry.id, entry.sql)} type="button">
                    {copiedId === entry.id ? "已复制" : "复制 SQL"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="cheatsheet-empty">没有找到匹配的 SQL 写法，请换一个关键词或分类。</p>
        )}
      </div>
    </main>
  );
}
