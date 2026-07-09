export type ArticleCategory =
  | "导读"
  | "产品经理"
  | "方法论"
  | "技术基础"
  | "Agent"
  | "案例库"
  | "放下碗";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: ArticleCategory;
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

export type NewsItem = {
  title: string;
  summary: string;
  href: string;
  time: string;
  image: string;
};

export type ColumnItem = {
  label: string;
  title: string;
  summary: string;
  href: string;
  image: string;
};

export type SiteData = {
  navigation: SiteLink[];
  categories: string[];
  hero: {
    title: string;
    subtitle: string;
  };
  news: NewsItem[];
  columns: ColumnItem[];
  footer: {
    contact: SiteLink[];
    resources: SiteLink[];
    articleMap: SiteLink[];
    archive: string[];
  };
};
