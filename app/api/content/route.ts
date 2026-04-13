import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/content";

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json(data);
}

