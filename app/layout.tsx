import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jiaxuanstudio.com";
const ogImageUrl = new URL("/og-image-v2.jpg", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JiaXuan GAO | AI产品经理",
  description: "智能体实践、产品评测与 ToB 产品落地记录。",
  openGraph: {
    title: "JiaXuan GAO | AI产品经理",
    description: "智能体实践、产品评测与 ToB 产品落地记录。",
    url: "/",
    siteName: "JiaXuan GAO",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "JiaXuan GAO AI产品经理网站预览图"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JiaXuan GAO | AI产品经理",
    description: "智能体实践、产品评测与 ToB 产品落地记录。",
    images: [ogImageUrl]
  },
  other: {
    image: ogImageUrl,
    thumbnail: ogImageUrl,
    "twitter:image:src": ogImageUrl
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${spaceGrotesk.variable} ${sourceSerif.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
