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
