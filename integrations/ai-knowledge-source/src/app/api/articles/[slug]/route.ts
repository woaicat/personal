import { NextResponse } from "next/server";
import { getArticle } from "@/lib/content";

type RouteParams = Promise<{ slug: string }>;

export async function GET(_request: Request, { params }: { params: RouteParams }) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}
