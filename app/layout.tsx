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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jiaxuanstudio.com"),
  title: "个人作品集",
  description: "个人介绍、文章创作、项目经历与知识库展示网站。",
  openGraph: {
    title: "个人作品集",
    description: "个人介绍、文章创作、项目经历与知识库展示网站。",
    type: "website"
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
