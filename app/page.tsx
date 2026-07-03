import PortfolioClient from "@/components/PortfolioClient";
import { getPortfolioData } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jiaxuanstudio.com";
const ABSOLUTE_SITE_URL = new URL("/", SITE_URL).toString();
const OG_IMAGE_URL = new URL("/og-image-v2.jpg", SITE_URL).toString();

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function HomePage() {
  const data = await getPortfolioData();
  const profileTitle = data.site.profile.title.replace(/\s+/g, " ");
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: data.site.brandName,
      url: ABSOLUTE_SITE_URL,
      inLanguage: "zh-CN",
      description: data.site.profile.description,
      publisher: {
        "@type": "Person",
        name: data.site.profile.name
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: `${data.site.profile.name} - ${profileTitle}`,
      url: ABSOLUTE_SITE_URL,
      inLanguage: "zh-CN",
      description: data.site.profile.description,
      image: OG_IMAGE_URL,
      mainEntity: {
        "@type": "Person",
        name: data.site.profile.name,
        alternateName: ["高佳璇", "jiaxuan"],
        jobTitle: "AI产品经理",
        url: ABSOLUTE_SITE_URL,
        image: OG_IMAGE_URL,
        knowsAbout: ["AI产品设计", "智能体实践", "AI产品测评", "ToB产品落地", "知识库建设", "提示词工程"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "JiaXuan GAO 文章创作",
      itemListElement: data.articles.cards.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: article.url,
        name: article.title,
        description: article.summary
      }))
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd)
        }}
      />
      <PortfolioClient data={data} />
    </>
  );
}
