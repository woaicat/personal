import type { PortfolioData } from "@/lib/types";
import { getOutboundLinkProps, MEDIA_ICON_MAP } from "./constants";
import { PaginationControls } from "./PaginationControls";

type IntroContent = PortfolioData["articles"]["intro"];

function SectionIntroCopy({ intro, className }: { intro: IntroContent; className: string }) {
  return (
    <div className={className}>
      <p className="eyebrow">{intro.eyebrow}</p>
      <h2>{intro.title}</h2>
      <p className="lede">{intro.description}</p>
      <div className="hero-cta">
        <a className="btn btn-primary" href={intro.ctaUrl}>
          {intro.ctaText}
        </a>
      </div>
      {intro.stats.length > 0 && (
        <div className="meta-row">
          {intro.stats.map((item) => (
            <div key={`${item.label}-${item.value}`}>
              <div className="meta-title">{item.value}</div>
              <div className="meta-sub">{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedPanel({
  intro,
  panelClassName,
  cardClassName
}: {
  intro: IntroContent;
  panelClassName: string;
  cardClassName: string;
}) {
  return (
    <div className={panelClassName}>
      <div className={cardClassName}>
        <p className="panel-eyebrow">{intro.featured.eyebrow}</p>
        <h3>{intro.featured.title}</h3>
        <p className="panel-body">{intro.featured.description}</p>
        {intro.featured.linkLabel.trim() !== "" && (
          <a className="text-link" href={intro.featured.linkUrl} {...getOutboundLinkProps(intro.featured.linkUrl)}>
            {intro.featured.linkLabel}
          </a>
        )}
      </div>
      {intro.panelTags.length > 0 && (
        <div className="panel-strip">
          {intro.panelTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

type ArticlesSectionProps = {
  articles: PortfolioData["articles"];
  paginatedArticles: PortfolioData["articles"]["cards"];
  activeFilter: string;
  currentPage: number;
  totalPages: number;
  onFilterClick: (filter: string) => void;
  onCategoryClick: (category: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function ArticlesSection({
  articles,
  paginatedArticles,
  activeFilter,
  currentPage,
  totalPages,
  onFilterClick,
  onCategoryClick,
  onPreviousPage,
  onNextPage
}: ArticlesSectionProps) {
  return (
    <>
      <section className="hero section-anchor" id="articles">
        <div className="container hero-grid">
          <SectionIntroCopy intro={articles.intro} className="hero-copy" />
          <FeaturedPanel intro={articles.intro} panelClassName="hero-panel" cardClassName="panel-card" />
        </div>
      </section>

      <section className="filters" id="series">
        <div className="container filter-grid">
          <div className="filter-title">筛选</div>
          <div className="chips">
            {articles.filters.map((filter) => (
              <button
                key={filter}
                className={`chip${activeFilter === filter ? " active" : ""}`}
                type="button"
                onClick={() => onFilterClick(filter)}
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
            <h2>{articles.sectionHeader.title}</h2>
            <p>{articles.sectionHeader.description}</p>
          </div>
          <div className="card-grid">
            {paginatedArticles.map((article) => (
              <article className="card" key={article.id} data-category={article.category}>
                <div className="card-top">
                  <button type="button" className="tag tag-button" onClick={() => onCategoryClick(article.category)}>
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

      <PaginationControls page={currentPage} totalPages={totalPages} onPrevious={onPreviousPage} onNext={onNextPage} />
    </>
  );
}

type ProjectsSectionProps = {
  projects: PortfolioData["projects"];
  paginatedProjects: PortfolioData["projects"]["cards"];
  projectPage: number;
  totalProjectPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function ProjectsSection({
  projects,
  paginatedProjects,
  projectPage,
  totalProjectPages,
  onPreviousPage,
  onNextPage
}: ProjectsSectionProps) {
  return (
    <section className="projects section-anchor" id="projects">
      <div className="container projects-intro">
        <div className="projects-intro-grid">
          <SectionIntroCopy intro={projects.intro} className="projects-copy" />
          <FeaturedPanel intro={projects.intro} panelClassName="projects-panel" cardClassName="projects-panel-card" />
        </div>
      </div>

      <div className="container" id="projects-content">
        <div className="section-head">
          <h2>{projects.sectionHeader.title}</h2>
          <p>{projects.sectionHeader.description}</p>
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
        <PaginationControls
          page={projectPage}
          totalPages={totalProjectPages}
          onPrevious={onPreviousPage}
          onNext={onNextPage}
          sectionClassName="projects-pagination"
          containerClassName="pager"
        />
      </div>
    </section>
  );
}

type KnowledgeSectionProps = {
  knowledge: PortfolioData["knowledge"];
  paginatedKnowledgeCards: PortfolioData["knowledge"]["cards"];
  knowledgePage: number;
  totalKnowledgePages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function KnowledgeSection({
  knowledge,
  paginatedKnowledgeCards,
  knowledgePage,
  totalKnowledgePages,
  onPreviousPage,
  onNextPage
}: KnowledgeSectionProps) {
  return (
    <section className="knowledge section-anchor" id="knowledge">
      <div className="container knowledge-intro">
        <div className="knowledge-intro-grid">
          <SectionIntroCopy intro={knowledge.intro} className="knowledge-copy" />
          <FeaturedPanel intro={knowledge.intro} panelClassName="knowledge-panel" cardClassName="knowledge-panel-card" />
        </div>
      </div>

      <div className="container" id="knowledge-content">
        <div className="section-head">
          <h2>{knowledge.sectionHeader.title}</h2>
          <p>{knowledge.sectionHeader.description}</p>
        </div>
        <div className="knowledge-grid">
          {paginatedKnowledgeCards.map((item) => (
            <article className="kb-card" key={item.id}>
              <div className="kb-head">
                <div className="kb-icon" aria-hidden="true">
                  {item.iconText}
                </div>
                <a className="kb-arrow" href={item.url} aria-label={`查看知识库 ${item.title}`} {...getOutboundLinkProps(item.url)}>
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
        <PaginationControls
          page={knowledgePage}
          totalPages={totalKnowledgePages}
          onPrevious={onPreviousPage}
          onNext={onNextPage}
          sectionClassName="knowledge-pagination"
          containerClassName="pager"
        />
      </div>
    </section>
  );
}

type MediaSectionProps = {
  media: PortfolioData["media"];
  paginatedMediaCards: PortfolioData["media"]["cards"];
  mediaPage: number;
  totalMediaPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export function MediaSection({
  media,
  paginatedMediaCards,
  mediaPage,
  totalMediaPages,
  onPreviousPage,
  onNextPage
}: MediaSectionProps) {
  return (
    <section className="media section-anchor" id="media">
      <div className="container media-intro">
        <div className="media-intro-grid">
          <SectionIntroCopy intro={media.intro} className="media-copy" />
          <FeaturedPanel intro={media.intro} panelClassName="media-panel" cardClassName="media-panel-card" />
        </div>
      </div>

      <div className="container" id="media-content">
        <div className="section-head">
          <h2>{media.sectionHeader.title}</h2>
          <p>{media.sectionHeader.description}</p>
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
                  <a className="media-arrow" href={item.url} aria-label={`访问媒体 ${item.name}`} {...getOutboundLinkProps(item.url)}>
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
        <PaginationControls
          page={mediaPage}
          totalPages={totalMediaPages}
          onPrevious={onPreviousPage}
          onNext={onNextPage}
          sectionClassName="media-pagination"
          containerClassName="pager"
        />
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
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
  );
}
