"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AboutSection,
  ArticlesSection,
  KnowledgeSection,
  MediaSection,
  ProjectsSection
} from "@/components/portfolio/ContentSections";
import {
  ARTICLES_PER_PAGE,
  HERO_ROTATE_MS,
  KNOWLEDGE_PER_PAGE,
  MEDIA_PER_PAGE,
  PROFILE_VALUES,
  PROJECTS_PER_PAGE,
  TRACKED_SECTION_IDS,
  parsePublishDateToTimestamp
} from "@/components/portfolio/constants";
import { PortfolioFooter, PortfolioHeader } from "@/components/portfolio/PortfolioShell";
import { ProfileSections } from "@/components/portfolio/ProfileSections";
import type { PortfolioData } from "@/lib/types";

type HeroSlides = PortfolioData["site"]["profile"]["visualSlides"];

interface PortfolioClientProps {
  data: PortfolioData;
}

export default function PortfolioClient({ data }: PortfolioClientProps) {
  const fallbackHeroSlides: HeroSlides = [
    { image: "/hero-top.png", alt: "顶部展示图", caption: "用实验和指标推动产品快速迭代" }
  ];
  const heroSlides = data.site.profile.visualSlides.length > 0 ? data.site.profile.visualSlides : fallbackHeroSlides;
  const hasMultipleHeroSlides = heroSlides.length > 1;
  const [activeFilter, setActiveFilter] = useState<string>(data.articles.filters[0] ?? "全部");
  const [activeTab, setActiveTab] = useState<string>("profile-intro");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [projectPage, setProjectPage] = useState<number>(1);
  const [knowledgePage, setKnowledgePage] = useState<number>(1);
  const [mediaPage, setMediaPage] = useState<number>(1);
  const [heroSlideIndex, setHeroSlideIndex] = useState<number>(0);
  const [activeValue, setActiveValue] = useState<string>(PROFILE_VALUES[0].label);
  const activeHeroSlide = heroSlides[heroSlideIndex] ?? heroSlides[0]!;
  const profileTitleLines = data.site.profile.title.split("\n");

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
    setHeroSlideIndex(0);
  }, [heroSlides.length]);

  useEffect(() => {
    if (!hasMultipleHeroSlides) {
      return;
    }

    const timerId = window.setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, HERO_ROTATE_MS);

    return () => window.clearInterval(timerId);
  }, [hasMultipleHeroSlides, heroSlides.length]);

  useEffect(() => {
    const updateActiveTabByScroll = () => {
      const sections = TRACKED_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

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

  const handleHeroPrev = () => {
    setHeroSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleHeroNext = () => {
    setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handleTopTabClick = (href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    setActiveTab(href.slice(1));
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(1);
    document.getElementById("series")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <div className="bg-grid" />

      <PortfolioHeader site={data.site} activeTab={activeTab} onTopTabClick={handleTopTabClick} />

      <main>
        <ProfileSections
          data={data}
          profileTitleLines={profileTitleLines}
          heroSlides={heroSlides}
          activeHeroSlide={activeHeroSlide}
          heroSlideIndex={heroSlideIndex}
          hasMultipleHeroSlides={hasMultipleHeroSlides}
          activeValue={activeValue}
          onHeroPrev={handleHeroPrev}
          onHeroNext={handleHeroNext}
          onHeroDotClick={setHeroSlideIndex}
          onValueChange={setActiveValue}
        />

        <ArticlesSection
          articles={data.articles}
          paginatedArticles={paginatedArticles}
          activeFilter={activeFilter}
          currentPage={currentPage}
          totalPages={totalPages}
          onFilterClick={handleFilterClick}
          onCategoryClick={handleCategoryClick}
          onPreviousPage={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          onNextPage={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        />

        <ProjectsSection
          projects={data.projects}
          paginatedProjects={paginatedProjects}
          projectPage={projectPage}
          totalProjectPages={totalProjectPages}
          onPreviousPage={() => setProjectPage((prev) => Math.max(1, prev - 1))}
          onNextPage={() => setProjectPage((prev) => Math.min(totalProjectPages, prev + 1))}
        />

        <KnowledgeSection
          knowledge={data.knowledge}
          paginatedKnowledgeCards={paginatedKnowledgeCards}
          knowledgePage={knowledgePage}
          totalKnowledgePages={totalKnowledgePages}
          onPreviousPage={() => setKnowledgePage((prev) => Math.max(1, prev - 1))}
          onNextPage={() => setKnowledgePage((prev) => Math.min(totalKnowledgePages, prev + 1))}
        />

        <MediaSection
          media={data.media}
          paginatedMediaCards={paginatedMediaCards}
          mediaPage={mediaPage}
          totalMediaPages={totalMediaPages}
          onPreviousPage={() => setMediaPage((prev) => Math.max(1, prev - 1))}
          onNextPage={() => setMediaPage((prev) => Math.min(totalMediaPages, prev + 1))}
        />

        <AboutSection />
      </main>

      <PortfolioFooter brandName={data.site.brandName} />
    </>
  );
}
