import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiaxuanstudio.com";
const buildUrl = (path = "/") => new URL(path, SITE_URL).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: buildUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: buildUrl("/act.html"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];
}
