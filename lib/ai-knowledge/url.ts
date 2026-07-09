import type { Route } from "next";

export const AI_KNOWLEDGE_BASE_PATH = "/ai-knowledge";
export const AI_KNOWLEDGE_ASSET_PATH = `${AI_KNOWLEDGE_BASE_PATH}/images`;

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

export function withSearchParams(base: string, params: Record<string, string | undefined>) {
  const url = new URL(base, "http://local");

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return `${url.pathname}${url.search}${url.hash}`;
}

export function knowledgeHref(href: string) {
  if (!href || isExternalHref(href)) {
    return href;
  }

  if (href.startsWith(`${AI_KNOWLEDGE_BASE_PATH}/`) || href === AI_KNOWLEDGE_BASE_PATH) {
    return href;
  }

  if (href === "/") {
    return AI_KNOWLEDGE_BASE_PATH;
  }

  if (href.startsWith("/#")) {
    return `${AI_KNOWLEDGE_BASE_PATH}${href.slice(1)}`;
  }

  if (href.startsWith("/?")) {
    return `${AI_KNOWLEDGE_BASE_PATH}${href.slice(1)}`;
  }

  if (href.startsWith("/")) {
    return `${AI_KNOWLEDGE_BASE_PATH}${href}`;
  }

  if (href.startsWith("#")) {
    return `${AI_KNOWLEDGE_BASE_PATH}${href}`;
  }

  return href;
}

export function knowledgeAssetPath(src: string) {
  if (!src || isExternalHref(src) || src.startsWith("data:")) {
    return src;
  }

  if (src.startsWith(`${AI_KNOWLEDGE_ASSET_PATH}/`)) {
    return src;
  }

  if (src.startsWith("/images/")) {
    return `${AI_KNOWLEDGE_BASE_PATH}${src}`;
  }

  if (src.startsWith("images/")) {
    return `${AI_KNOWLEDGE_BASE_PATH}/${src}`;
  }

  if (src.startsWith("/")) {
    return `${AI_KNOWLEDGE_BASE_PATH}${src}`;
  }

  return `${AI_KNOWLEDGE_ASSET_PATH}/${src}`;
}

export function knowledgeRoute(href: string) {
  return href as Route;
}
