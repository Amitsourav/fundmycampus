import { Hero } from "@/components/home/Hero";
import { DreamsFlight } from "@/components/home/DreamsFlight";
import { Testimonials } from "@/components/home/Testimonials";
import { LoanPartners } from "@/components/home/LoanPartners";
import { CTABanner } from "@/components/home/CTABanner";
import { LoanJourney } from "@/components/home/LoanJourney";
import { ToolsPreview } from "@/components/home/ToolsPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DreamsFlight />
      <CTABanner />
      <Testimonials />
      <LoanJourney />
      <ToolsPreview />
      <LoanPartners />
    </>
  );
}
