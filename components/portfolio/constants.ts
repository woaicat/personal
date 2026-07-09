import type { PortfolioData } from "@/lib/types";

export const TRACKED_SECTION_IDS = ["profile-intro", "articles", "projects", "knowledge", "media"];
export const ARTICLES_PER_PAGE = 6;
export const PROJECTS_PER_PAGE = 6;
export const KNOWLEDGE_PER_PAGE = 6;
export const MEDIA_PER_PAGE = 6;
export const HERO_ROTATE_MS = 10000;

export const PROFILE_VALUES = [
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

export const MEDIA_ICON_MAP: Record<
  PortfolioData["media"]["cards"][number]["mediaType"],
  { iconText: string; iconClassName: string }
> = {
  YouTube: { iconText: "▶", iconClassName: "youtube" },
  Newsletter: { iconText: "NEW", iconClassName: "newsletter" },
  微信公众号: { iconText: "💬", iconClassName: "wechat" },
  B站: { iconText: "📺", iconClassName: "bilibili" }
};

export function parsePublishDateToTimestamp(value: string) {
  const parts = value
    .split(/[^\d]+/)
    .filter(Boolean)
    .map((item) => Number(item));

  if (parts.length < 3) {
    return 0;
  }

  const [year, month, day] = parts;
  return new Date(year, month - 1, day).getTime();
}

export function getOutboundLinkProps(href: string): { target?: "_blank"; rel?: "noreferrer" } {
  if (!href || href.startsWith("#")) {
    return {};
  }

  return { target: "_blank", rel: "noreferrer" };
}
