import PortfolioClient from "@/components/PortfolioClient";
import { getPortfolioData } from "@/lib/content";

export default async function HomePage() {
  const data = await getPortfolioData();
  return <PortfolioClient data={data} />;
}

