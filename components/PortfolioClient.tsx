"use client";

import { useEffect, useMemo, useState } from "react";
import type { PortfolioData } from "@/lib/types";

interface PortfolioClientProps {
  data: PortfolioData;
}

const TRACKED_SECTION_IDS = ["profile-intro", "articles", "projects", "knowledge", "media"];
const ARTICLES_PER_PAGE = 6;
const PROJECTS_PER_PAGE = 6;
const KNOWLEDGE_PER_PAGE = 6;
const MEDIA_PER_PAGE = 6;
const PROFILE_VALUES = [
  {
    label: "成长型思维",
    description: "从过往经历中吸取经验教训，持续积累真正的解决问题的能力"
  },
  {
    label: "坚持",
    description: "即使面对困难，也能以长期视角继续前行"
  },
  {
    label: "善良",
    description: "与人为善，愿意帮助身边的人"
  },
  {
    label: "坚定表达",
    description: "尊重他人的同时，坦诚地表达自己的观点和立场"
  },
  {
    label: "正念",
    description: "对当下的体验保持察觉，用好奇的心态活在此刻"
  }
] as const;
const MEDIA_ICON_MAP: Record<
  PortfolioData["media"]["cards"][number]["mediaType"],
  { iconText: string; iconClassName: string }
> = {
  YouTube: { iconText: "▶", iconClassName: "youtube" },
  Newsletter: { iconText: "NEW", iconClassName: "newsletter" },
  微信公众号: { iconText: "💬", iconClassName: "wechat" },
  B站: { iconText: "📺", iconClassName: "bilibili" }
};
const parsePublishDateToTimestamp = (value: string) => {
  const parts = value
    .split(/[^\d]+/)
    .filter(Boolean)
    .map((item) => Number(item));

  if (parts.length < 3) {
    return 0;
  }

  const [year, month, day] = parts;
  return new Date(year, month - 1, day).getTime();
};

export default function PortfolioClient({ data }: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>(data.articles.filters[0] ?? "全部");
  const [activeTab, setActiveTab] = useState<string>("profile-intro");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [projectPage, setProjectPage] = useState<number>(1);
  const [knowledgePage, setKnowledgePage] = useState<number>(1);
  const [mediaPage, setMediaPage] = useState<number>(1);
  const [activeValue, setActiveValue] = useState<string>(PROFILE_VALUES[0].label);
  const getOutboundLinkProps = (href: string) => {
    if (!href || href.startsWith("#")) {
      return {};
    }
    return { target: "_blank", rel: "noreferrer" as const };
  };

  const filteredArticles = useMemo(() => {
    const source =
      activeFilter === "全部"
        ? data.articles.cards
        : data.articles.cards.filter((item) => item.category === activeFilter);

    return [...source].sort(
      (a, b) => parsePublishDateToTimestamp(b.publishDate) - parsePublishDateToTimestamp(a.publishDate)
    );
  }, [activeFilter, data.articles.cards]);
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }, [currentPage, filteredArticles]);
  const totalProjectPages = Math.max(1, Math.ceil(data.projects.cards.length / PROJECTS_PER_PAGE));
  const paginatedProjects = useMemo(() => {
    const startIndex = (projectPage - 1) * PROJECTS_PER_PAGE;
    return data.projects.cards.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [data.projects.cards, projectPage]);
  const totalKnowledgePages = Math.max(1, Math.ceil(data.knowledge.cards.length / KNOWLEDGE_PER_PAGE));
  const paginatedKnowledgeCards = useMemo(() => {
    const startIndex = (knowledgePage - 1) * KNOWLEDGE_PER_PAGE;
    return data.knowledge.cards.slice(startIndex, startIndex + KNOWLEDGE_PER_PAGE);
  }, [data.knowledge.cards, knowledgePage]);
  const totalMediaPages = Math.max(1, Math.ceil(data.media.cards.length / MEDIA_PER_PAGE));
  const paginatedMediaCards = useMemo(() => {
    const startIndex = (mediaPage - 1) * MEDIA_PER_PAGE;
    return data.media.cards.slice(startIndex, startIndex + MEDIA_PER_PAGE);
  }, [data.media.cards, mediaPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (knowledgePage > totalKnowledgePages) {
      setKnowledgePage(totalKnowledgePages);
    }
  }, [knowledgePage, totalKnowledgePages]);

  useEffect(() => {
    if (mediaPage > totalMediaPages) {
      setMediaPage(totalMediaPages);
    }
  }, [mediaPage, totalMediaPages]);

  useEffect(() => {
    if (projectPage > totalProjectPages) {
      setProjectPage(totalProjectPages);
    }
  }, [projectPage, totalProjectPages]);

  useEffect(() => {
    const updateActiveTabByScroll = () => {
      const sections = TRACKED_SECTION_IDS.map((id) => document.getElementById(id)).filter(
        Boolean
      ) as HTMLElement[];

      if (!sections.length) {
        return;
      }

      const triggerLine = 120;
      let currentSection = sections[0];
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= triggerLine && rect.bottom > triggerLine) {
          currentSection = section;
          nearestDistance = -1;
          return;
        }

        if (nearestDistance === -1) {
          return;
        }

        const distance = Math.abs(rect.top - triggerLine);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          currentSection = section;
        }
      });

      setActiveTab(currentSection.id);
    };

    updateActiveTabByScroll();
    window.addEventListener("scroll", updateActiveTabByScroll, { passive: true });
    window.addEventListener("resize", updateActiveTabByScroll);
    return () => {
      window.removeEventListener("scroll", updateActiveTabByScroll);
      window.removeEventListener("resize", updateActiveTabByScroll);
    };
  }, []);

  const handleTopTabClick = (href: string) => {
    if (!href.startsWith("#")) {
      return;
    }
    setActiveTab(href.slice(1));
  };

  const handleCategoryClick = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(1);
    document.getElementById("series")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <div className="bg-grid" />

      <header className="site-header">
        <div className="container nav">
          <div className="logo">{data.site.brandName}</div>
          <nav className="nav-links" aria-label="主导航">
            {data.site.topTabs.map((tab) => {
              const sectionId = tab.href.startsWith("#") ? tab.href.slice(1) : "";
              const isActive = sectionId !== "" && sectionId === activeTab;
              return (
                <a
                  key={tab.href}
                  className={`top-tab${isActive ? " active" : ""}`}
                  href={tab.href}
                  onClick={() => handleTopTabClick(tab.href)}
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

      <main>
        <section className="profile-showcase section-anchor" id="profile-intro">
          <div className="container profile-grid">
            <div className="profile-copy">
              <div className="profile-head">
                <div className="profile-name-row">
                  <span>{data.site.profile.name}</span>
                </div>
              </div>
              <h2>{data.site.profile.title}</h2>
              <p className="profile-desc">{data.site.profile.description}</p>
              <a className="btn btn-dark" href={data.site.profile.ctaUrl}>
                {data.site.profile.ctaText}
              </a>
            </div>
            <div className="profile-media">
              <div className="profile-visual">
                <img
                  className="profile-visual-image"
                  src={data.site.profile.visualImage}
                  alt={data.site.profile.visualText}
                />
              </div>
              <p className="profile-visual-caption">{data.site.profile.visualCaption}</p>
            </div>
          </div>
        </section>

        <section className="profile-bio">
          <div className="container">
            <div className="bio-intro">
              <h3>个人档案</h3>
              <p>嗨👋 ！ 我是jiaxuan， 一个AI产品经理，常驻北京 ，希望你能从我的作品集中找到一些灵感。</p>
            </div>

            <div className="bio-skills">
              <h4>个人技能</h4>
              <div className="bio-tags">
                <span>产品方案实现</span>
                <span>PRD撰写</span>
                <span>原型生成</span>
                <span>AI产品评测设计</span>
                <span>AI编程</span>
                <span>创意写作</span>
              </div>
            </div>

            <div className="bio-values">
              <h4>价值观</h4>
              <div className="value-tabs">
                {PROFILE_VALUES.map((item) => (
                  <button
                    key={item.label}
                    className={`value-chip${activeValue === item.label ? " active" : ""}`}
                    type="button"
                    onClick={() => setActiveValue(item.label)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="value-detail is-visible">
                {activeValue}：{PROFILE_VALUES.find((item) => item.label === activeValue)?.description}
              </p>
            </div>

            <div className="bio-card">
              <div className="bio-block">
                <h4>专精领域</h4>
                <div className="bio-list">
                  <div className="bio-item">
                    <span>B端产品设计（办公、合规、营销等领域）</span>
                  </div>
                  <div className="bio-item">
                    <span>AI产品设计（工作流、智能体、插件等形态）</span>
                  </div>
                </div>
              </div>

              <div className="bio-block">
                <h4>工作经历</h4>
                <div className="bio-list">
                  <div className="bio-item">
                    <span>在一家金融公司做AI产品经理</span>
                    <span>2023年-2026年</span>
                  </div>
                  <div className="bio-item">
                    <span>在一家教育公司做管培生</span>
                    <span>2021年-2022年</span>
                  </div>
                </div>
              </div>

              <div className="bio-block">
                <h4>我的三个超能力</h4>
                <div className="bio-list">
                  <div className="bio-item">
                    <span>1、此人对自己负责的事有超乎寻常的责任心和主动性</span>
                  </div>
                  <div className="bio-item">
                    <span>2、动手能力极强</span>
                  </div>
                  <div className="bio-item">
                    <span>3、擅长和周围的人建立友好人际关系</span>
                  </div>
                </div>
              </div>

              <div className="bio-block">
                <h4>正在寻找</h4>
                <p>新的AI产品工作（ToB领域 、泛营销等领域）</p>
              </div>
            </div>
          </div>
        </section>

        <div id="subscribe-anchor" className="anchor-offset" />
        <section className="press" id="subscribe">
          <div className="container press-grid">
            <div>
              <h2>在这里可以找到我</h2>
              <p>欢迎通过以下平台和账号与我交流。</p>
            </div>
            <div className="logos">
              {data.contacts.map((contact) => (
                <div className="platform-item" key={`${contact.platform}-${contact.account}`}>
                  <div className="platform-name">{contact.platform}</div>
                  <div className="platform-account">{contact.account}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hero section-anchor" id="articles">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{data.articles.intro.eyebrow}</p>
              <h1>{data.articles.intro.title}</h1>
              <p className="lede">{data.articles.intro.description}</p>
              <div className="hero-cta">
                <a className="btn btn-primary" href={data.articles.intro.ctaUrl}>
                  {data.articles.intro.ctaText}
                </a>
              </div>
              {data.articles.intro.stats.length > 0 && (
                <div className="meta-row">
                  {data.articles.intro.stats.map((item) => (
                    <div key={`${item.label}-${item.value}`}>
                      <div className="meta-title">{item.value}</div>
                      <div className="meta-sub">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="hero-panel">
              <div className="panel-card">
                <p className="panel-eyebrow">{data.articles.intro.featured.eyebrow}</p>
                <h3>{data.articles.intro.featured.title}</h3>
                <p className="panel-body">{data.articles.intro.featured.description}</p>
                {data.articles.intro.featured.linkLabel.trim() !== "" && (
                  <a
                    className="text-link"
                    href={data.articles.intro.featured.linkUrl}
                    {...getOutboundLinkProps(data.articles.intro.featured.linkUrl)}
                  >
                    {data.articles.intro.featured.linkLabel}
                  </a>
                )}
              </div>
              {data.articles.intro.panelTags.length > 0 && (
                <div className="panel-strip">
                  {data.articles.intro.panelTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="filters" id="series">
          <div className="container filter-grid">
            <div className="filter-title">筛选</div>
            <div className="chips">
              {data.articles.filters.map((filter) => (
                <button
                  key={filter}
                  className={`chip${activeFilter === filter ? " active" : ""}`}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="articles">
          <div className="container">
            <div className="section-head">
              <h2>{data.articles.sectionHeader.title}</h2>
              <p>{data.articles.sectionHeader.description}</p>
            </div>
            <div className="card-grid">
              {paginatedArticles.map((article) => (
                <article className="card" key={article.id} data-category={article.category}>
                  <div className="card-top">
                    <button
                      type="button"
                      className="tag tag-button"
                      onClick={() => handleCategoryClick(article.category)}
                    >
                      {article.category}
                    </button>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <div className="card-meta">
                    <span>{article.publishDate}</span>
                    <a className="text-link" href={article.url} {...getOutboundLinkProps(article.url)}>
                      阅读原文
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pagination">
          <div className="container pager">
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
            >
              上一页
            </button>
            <span>
              第 {currentPage} 页，共 {totalPages} 页
            </span>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage >= totalPages}
            >
              下一页
            </button>
          </div>
        </section>

        <section className="projects section-anchor" id="projects">
          <div className="container projects-intro">
            <div className="projects-intro-grid">
              <div className="projects-copy">
                <p className="eyebrow">{data.projects.intro.eyebrow}</p>
                <h2>{data.projects.intro.title}</h2>
                <p className="lede">{data.projects.intro.description}</p>
                <div className="hero-cta">
                  <a className="btn btn-primary" href={data.projects.intro.ctaUrl}>
                    {data.projects.intro.ctaText}
                  </a>
                </div>
                {data.projects.intro.stats.length > 0 && (
                  <div className="meta-row">
                    {data.projects.intro.stats.map((item) => (
                      <div key={`${item.label}-${item.value}`}>
                        <div className="meta-title">{item.value}</div>
                        <div className="meta-sub">{item.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="projects-panel">
                <div className="projects-panel-card">
                  <p className="panel-eyebrow">{data.projects.intro.featured.eyebrow}</p>
                  <h3>{data.projects.intro.featured.title}</h3>
                  <p className="panel-body">{data.projects.intro.featured.description}</p>
                  {data.projects.intro.featured.linkLabel.trim() !== "" && (
                    <a
                      className="text-link"
                      href={data.projects.intro.featured.linkUrl}
                      {...getOutboundLinkProps(data.projects.intro.featured.linkUrl)}
                    >
                      {data.projects.intro.featured.linkLabel}
                    </a>
                  )}
                </div>
                {data.projects.intro.panelTags.length > 0 && (
                  <div className="panel-strip">
                    {data.projects.intro.panelTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container" id="projects-content">
            <div className="section-head">
              <h2>{data.projects.sectionHeader.title}</h2>
              <p>{data.projects.sectionHeader.description}</p>
            </div>
            <div className="projects-grid">
              {paginatedProjects.map((project) => {
                const canVisitDetail = /^https?:\/\//.test(project.detailUrl);
                const canVisitProject = /^https?:\/\//.test(project.projectUrl);

                return (
                  <article className="project-card" key={project.id}>
                    <div className="project-head">
                      <span className="project-status">{project.status}</span>
                      {canVisitDetail ? (
                        <a
                          className="project-arrow"
                          href={project.detailUrl}
                          aria-label={`查看项目 ${project.title}`}
                          {...getOutboundLinkProps(project.detailUrl)}
                        >
                          ↗
                        </a>
                      ) : (
                        <span className="project-arrow is-disabled" aria-hidden="true">
                          ↗
                        </span>
                      )}
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="project-links">
                      {canVisitProject ? (
                        <a className="text-link" href={project.projectUrl} {...getOutboundLinkProps(project.projectUrl)}>
                          项目链接
                        </a>
                      ) : (
                        <span className="text-link is-disabled" aria-disabled="true">
                          项目链接
                        </span>
                      )}
                    </div>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={`${project.id}-${tag}`}>{tag}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
            <section className="pagination projects-pagination">
              <div className="pager">
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setProjectPage((prev) => Math.max(1, prev - 1))}
                  disabled={projectPage <= 1}
                >
                  上一页
                </button>
                <span>
                  第 {projectPage} 页，共 {totalProjectPages} 页
                </span>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setProjectPage((prev) => Math.min(totalProjectPages, prev + 1))}
                  disabled={projectPage >= totalProjectPages}
                >
                  下一页
                </button>
              </div>
            </section>
          </div>
        </section>

        <section className="knowledge section-anchor" id="knowledge">
          <div className="container knowledge-intro">
            <div className="knowledge-intro-grid">
              <div className="knowledge-copy">
                <p className="eyebrow">{data.knowledge.intro.eyebrow}</p>
                <h2>{data.knowledge.intro.title}</h2>
                <p className="lede">{data.knowledge.intro.description}</p>
                <div className="hero-cta">
                  <a className="btn btn-primary" href={data.knowledge.intro.ctaUrl}>
                    {data.knowledge.intro.ctaText}
                  </a>
                </div>
                {data.knowledge.intro.stats.length > 0 && (
                  <div className="meta-row">
                    {data.knowledge.intro.stats.map((item) => (
                      <div key={`${item.label}-${item.value}`}>
                        <div className="meta-title">{item.value}</div>
                        <div className="meta-sub">{item.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="knowledge-panel">
                <div className="knowledge-panel-card">
                  <p className="panel-eyebrow">{data.knowledge.intro.featured.eyebrow}</p>
                  <h3>{data.knowledge.intro.featured.title}</h3>
                  <p className="panel-body">{data.knowledge.intro.featured.description}</p>
                  {data.knowledge.intro.featured.linkLabel.trim() !== "" && (
                    <a
                      className="text-link"
                      href={data.knowledge.intro.featured.linkUrl}
                      {...getOutboundLinkProps(data.knowledge.intro.featured.linkUrl)}
                    >
                      {data.knowledge.intro.featured.linkLabel}
                    </a>
                  )}
                </div>
                {data.knowledge.intro.panelTags.length > 0 && (
                  <div className="panel-strip">
                    {data.knowledge.intro.panelTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container" id="knowledge-content">
            <div className="section-head">
              <h2>{data.knowledge.sectionHeader.title}</h2>
              <p>{data.knowledge.sectionHeader.description}</p>
            </div>
            <div className="knowledge-grid">
              {paginatedKnowledgeCards.map((item) => (
                <article className="kb-card" key={item.id}>
                  <div className="kb-head">
                    <div className="kb-icon" aria-hidden="true">
                      {item.iconText}
                    </div>
                    <a
                      className="kb-arrow"
                      href={item.url}
                      aria-label={`查看知识库 ${item.title}`}
                      {...getOutboundLinkProps(item.url)}
                    >
                      ↗
                    </a>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="kb-tags">
                    {item.tags.map((tag) => (
                      <span key={`${item.id}-${tag}`}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <section className="pagination knowledge-pagination">
              <div className="pager">
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setKnowledgePage((prev) => Math.max(1, prev - 1))}
                  disabled={knowledgePage <= 1}
                >
                  上一页
                </button>
                <span>
                  第 {knowledgePage} 页，共 {totalKnowledgePages} 页
                </span>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setKnowledgePage((prev) => Math.min(totalKnowledgePages, prev + 1))}
                  disabled={knowledgePage >= totalKnowledgePages}
                >
                  下一页
                </button>
              </div>
            </section>
          </div>
        </section>

        <section className="media section-anchor" id="media">
          <div className="container media-intro">
            <div className="media-intro-grid">
              <div className="media-copy">
                <p className="eyebrow">{data.media.intro.eyebrow}</p>
                <h2>{data.media.intro.title}</h2>
                <p className="lede">{data.media.intro.description}</p>
                <div className="hero-cta">
                  <a className="btn btn-primary" href={data.media.intro.ctaUrl}>
                    {data.media.intro.ctaText}
                  </a>
                </div>
                {data.media.intro.stats.length > 0 && (
                  <div className="meta-row">
                    {data.media.intro.stats.map((item) => (
                      <div key={`${item.label}-${item.value}`}>
                        <div className="meta-title">{item.value}</div>
                        <div className="meta-sub">{item.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="media-panel">
                <div className="media-panel-card">
                  <p className="panel-eyebrow">{data.media.intro.featured.eyebrow}</p>
                  <h3>{data.media.intro.featured.title}</h3>
                  <p className="panel-body">{data.media.intro.featured.description}</p>
                  {data.media.intro.featured.linkLabel.trim() !== "" && (
                    <a
                      className="text-link"
                      href={data.media.intro.featured.linkUrl}
                      {...getOutboundLinkProps(data.media.intro.featured.linkUrl)}
                    >
                      {data.media.intro.featured.linkLabel}
                    </a>
                  )}
                </div>
                {data.media.intro.panelTags.length > 0 && (
                  <div className="panel-strip">
                    {data.media.intro.panelTags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container" id="media-content">
            <div className="section-head">
              <h2>{data.media.sectionHeader.title}</h2>
              <p>{data.media.sectionHeader.description}</p>
            </div>
            <div className="media-grid">
              {paginatedMediaCards.map((item) => {
                const iconMeta = MEDIA_ICON_MAP[item.mediaType];
                return (
                  <article className="media-card" key={item.id}>
                    <div className="media-head">
                      <div className={`media-icon ${iconMeta.iconClassName}`} aria-hidden="true">
                        {iconMeta.iconText}
                      </div>
                      <a
                        className="media-arrow"
                        href={item.url}
                        aria-label={`访问媒体 ${item.name}`}
                        {...getOutboundLinkProps(item.url)}
                      >
                        ↗
                      </a>
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.mainContent}</p>
                    <div className="media-tags">
                      <span className="media-type">{item.mediaType}</span>
                    </div>
                  </article>
                );
              })}
            </div>
            <section className="pagination media-pagination">
              <div className="pager">
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setMediaPage((prev) => Math.max(1, prev - 1))}
                  disabled={mediaPage <= 1}
                >
                  上一页
                </button>
                <span>
                  第 {mediaPage} 页，共 {totalMediaPages} 页
                </span>
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => setMediaPage((prev) => Math.min(totalMediaPages, prev + 1))}
                  disabled={mediaPage >= totalMediaPages}
                >
                  下一页
                </button>
              </div>
            </section>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container about-grid">
            <div>
              <h2>关于作者</h2>
              <p>产品设计师与写作者，关注“更像人”的系统。研究界面结构如何改变我们的阅读、工作与决策方式。</p>
            </div>
            <div className="faq">
              <h3>常见问题</h3>
              <div className="faq-item">
                <div className="faq-q">多久发布一次？</div>
                <div className="faq-a">每两周一次，期间会不定期发布现场记录。</div>
              </div>
              <div className="faq-item">
                <div className="faq-q">接受投稿吗？</div>
                <div className="faq-a">只接受少量合作，请发送简短选题与参考。</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="logo">{data.site.brandName}</div>
            <p>面向思考型创造者的独立写作工作室。</p>
          </div>
          <div className="footer-meta">
            <span>© 2026 {data.site.brandName}</span>
            <span>保留所有权利</span>
          </div>
        </div>
      </footer>
    </>
  );
}
