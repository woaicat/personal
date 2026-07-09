import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "./ai-knowledge/ai-knowledge.css";

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
const siteTitle = "JiaXuan GAO | AI产品经理｜智能体实践、AI产品测评与ToB落地";
const siteDescription =
  "高佳璇的个人作品集，记录 AI 产品经理在智能体实践、AI 产品测评、ToB 产品落地、知识库建设与方法论总结中的项目经验和文章创作。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "JiaXuan GAO",
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: "JiaXuan GAO", url: siteUrl }],
  creator: "JiaXuan GAO",
  publisher: "JiaXuan GAO",
  keywords: ["AI产品经理", "智能体实践", "AI产品测评", "ToB产品", "知识工作者", "个人作品集"],
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "JiaXuan GAO",
    locale: "zh_CN",
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
    title: siteTitle,
    description: siteDescription,
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
