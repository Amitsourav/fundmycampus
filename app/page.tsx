import { Hero } from "@/components/home/Hero";
import { DreamsFlight } from "@/components/home/DreamsFlight";
import { AbroadFocus } from "@/components/home/AbroadFocus";
import { IndiaLoanPreview } from "@/components/home/IndiaLoanPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { LoanPartners } from "@/components/home/LoanPartners";
import { Reviews } from "@/components/home/Reviews";
import { Process } from "@/components/home/Process";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DreamsFlight />
      <Testimonials />
      <LoanPartners />
      <Reviews />
    </>
  );
}
