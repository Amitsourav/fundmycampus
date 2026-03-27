import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact FundMyCampus — Free Education Loan Consultation",
  description: "Get free education loan consultation. Call +91 78272 25354 or fill the form. We help with study abroad & India education loans.",
  keywords: "contact FundMyCampus, education loan consultation, education loan help, loan advisor",
  openGraph: {
    title: "Contact FundMyCampus — Free Education Loan Consultation",
    description: "Get free education loan consultation. Call +91 78272 25354 or fill the form.",
  },
  alternates: {
    canonical: "https://www.fundmycampus.com/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.fundmycampus.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.fundmycampus.com/contact" },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
