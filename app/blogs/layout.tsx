import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Loan Blog — Guides, Tips & Bank Comparisons",
  description: "Expert guides on education loans, bank comparisons, study abroad tips, government schemes, and financial planning for Indian students.",
  keywords: "education loan blog, study abroad guide, education loan comparison, education loan tips, student loan India",
  openGraph: {
    title: "Education Loan Blog — Guides & Comparisons | FundMyCampus",
    description: "Expert guides on education loans, bank comparisons, and study abroad tips.",
  },
  alternates: {
    canonical: "https://www.fundmycampus.com/blogs",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.fundmycampus.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.fundmycampus.com/blogs" },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
