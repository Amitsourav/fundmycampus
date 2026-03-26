import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B.Tech Education Loan — Up to ₹30 Lakhs | Low Interest",
  description: "Get B.Tech education loans up to ₹30 Lakhs for IITs, NITs & top engineering colleges. Collateral-free options, competitive rates starting 6.75%.",
  keywords: "btech education loan, engineering education loan, IIT loan, NIT loan, B.Tech student loan",
  alternates: { canonical: "https://www.fundmycampus.com/courses-loan/btech" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
