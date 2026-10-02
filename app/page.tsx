import { PortfolioProvider } from "@/components/content/portfolio-provider";
import { PortfolioSite } from "@/components/portfolio/portfolio-site";

export default function Home() {
  return <PortfolioProvider><PortfolioSite /></PortfolioProvider>;
}
