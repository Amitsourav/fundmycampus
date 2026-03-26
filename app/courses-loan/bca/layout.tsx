import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BCA Education Loan — Up to ₹15 Lakhs | Computer Science Loan",
  description: "BCA education loans up to ₹15 Lakhs for top computer science colleges. Collateral-free options, competitive interest rates.",
  keywords: "BCA education loan, BCA student loan, computer science loan, BCA college loan",
  alternates: { canonical: "https://www.fundmycampus.com/courses-loan/bca" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
