import { NextResponse } from "next/server";
import { getSiteData } from "@/lib/content";

export function GET() {
  const site = getSiteData();

  return NextResponse.json({
    navigation: site.navigation,
    news: site.news,
    columns: site.columns,
    footer: site.footer
  });
}
