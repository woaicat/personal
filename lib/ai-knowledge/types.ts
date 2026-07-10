export type ArticleCategory =
  | "导读"
  | "产品经理"
  | "方法论"
  | "技术基础"
  | "Agent"
  | "案例库"
  | "放下碗";

export type ArticleStatus = "draft" | "published";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
  section: string;
  subsection?: string;
  contentType: "markdown" | "link";
  externalUrl?: string;
  status: ArticleStatus;
  date: string;
  author: string;
  readCount: string;
  image: string;
  featured: boolean;
  hotRank?: number;
  hotSummary?: string;
};

export type Article = ArticleMeta & {
  content: string;
};

export type SiteLink = {
  label: string;
  href: string;
  value?: string;
};

export type KnowledgeSection = {
  label: string;
  subsections?: string[];
};

export type NewsItem = {
  title: string;
  summary: string;
  href: string;
  date: string;
  source: string;
  tag: string;
  featured?: boolean;
};

export type SiteData = {
  navigation: SiteLink[];
  sections: KnowledgeSection[];
  categories: string[];
  hero: {
    title: string;
    subtitle: string;
  };
  newsUpdatedAt: string;
  news: NewsItem[];
  footer: {
    contact: SiteLink[];
  };
};
