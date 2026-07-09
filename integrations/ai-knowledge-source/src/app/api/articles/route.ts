import { NextResponse } from "next/server";
import { filterArticles, getArticleMetas } from "@/lib/content";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const q = searchParams.get("q") || undefined;
  const articles = category || q ? filterArticles({ category, q }) : getArticleMetas();

  return NextResponse.json({
    count: articles.length,
    articles
  });
}
