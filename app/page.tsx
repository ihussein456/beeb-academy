import HeroSection from "@/components/hero-section";
import { NotionFeatures, NotionTopics, NotionDaily, NotionFooter } from "@/components/notion-sections";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-[#2eaadc] selection:text-white">
      <HeroSection />
      <NotionFeatures />
      <NotionTopics />
      <NotionDaily />
      <NotionFooter />
    </div>
  );
}
