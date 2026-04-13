export interface MetaStat {
  label: string;
  value: string;
}

export interface FeaturedCard {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
  linkUrl: string;
}

export interface ArticleIntro {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  stats: MetaStat[];
  featured: FeaturedCard;
  panelTags: string[];
}

export interface ArticleSectionHeader {
  title: string;
  description: string;
}

export interface ArticleCard {
  id: string;
  category: string;
  title: string;
  summary: string;
  publishDate: string;
  url: string;
}

export interface ArticlesContent {
  intro: ArticleIntro;
  filters: string[];
  sectionHeader: ArticleSectionHeader;
  cards: ArticleCard[];
}

export interface ProjectIntro {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  stats: MetaStat[];
  featured: FeaturedCard;
  panelTags: string[];
}

export interface ProjectSectionHeader {
  title: string;
  description: string;
}

export interface ProjectCard {
  id: string;
  status: string;
  title: string;
  summary: string;
  videoUrl: string;
  projectUrl: string;
  detailUrl: string;
  tags: string[];
}

export interface ProjectsContent {
  intro: ProjectIntro;
  sectionHeader: ProjectSectionHeader;
  cards: ProjectCard[];
}

export interface KnowledgeIntro {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  stats: MetaStat[];
  featured: FeaturedCard;
  panelTags: string[];
}

export interface KnowledgeSectionHeader {
  title: string;
  description: string;
}

export interface KnowledgeCard {
  id: string;
  iconText: string;
  title: string;
  summary: string;
  url: string;
  tags: string[];
}

export interface KnowledgeContent {
  intro: KnowledgeIntro;
  sectionHeader: KnowledgeSectionHeader;
  cards: KnowledgeCard[];
}

export interface ContactItem {
  platform: string;
  account: string;
}

export interface ProfileContent {
  name: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  visualImage: string;
  visualCaption: string;
  visualText: string;
}

export interface SiteContent {
  brandName: string;
  pageTitle: string;
  profile: ProfileContent;
  topTabs: Array<{ label: string; href: string }>;
}

export interface PortfolioData {
  site: SiteContent;
  contacts: ContactItem[];
  articles: ArticlesContent;
  projects: ProjectsContent;
  knowledge: KnowledgeContent;
}
