import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Education Loan Calculators — EMI, Eligibility & Cost Tools",
  description: "Use free EMI calculator, eligibility checker, loan comparison tool, and SOP reviewer for education loans. Plan your study abroad or India financing smartly.",
  keywords: "education loan EMI calculator, loan eligibility calculator, education cost calculator, loan comparison tool, SOP review tool",
  openGraph: {
    title: "Free Education Loan Calculators & Tools | FundMyCampus",
    description: "Calculate EMI, check eligibility, compare loans, and review your SOP — all for free.",
  },
  alternates: {
    canonical: "https://www.fundmycampus.com/tools",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.fundmycampus.com" },
      { "@type": "ListItem", position: 2, name: "Loan Tools", item: "https://www.fundmycampus.com/tools" },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
