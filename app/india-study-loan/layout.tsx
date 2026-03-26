import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Loan for Study in India — IIT, IIM, AIIMS, NIT",
  description: "Education loans up to ₹40 Lakhs for IITs, IIMs, AIIMS, NITs & top Indian universities. Low interest rates, quick approval, zero collateral options.",
  keywords: "education loan India, IIT education loan, IIM education loan, AIIMS education loan, NIT education loan, domestic education loan",
  openGraph: {
    title: "Education Loan for Study in India — IIT, IIM, AIIMS | FundMyCampus",
    description: "Education loans up to ₹40 Lakhs for top Indian universities. Low interest, quick approval.",
  },
  alternates: {
    canonical: "https://www.fundmycampus.com/india-study-loan",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
