import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBA Education Loan — Up to ₹50 Lakhs | IIM & Top B-Schools",
  description: "MBA education loans up to ₹50 Lakhs for IIMs, ISB, XLRI & top business schools. Collateral-free options, quick approval.",
  keywords: "MBA education loan, IIM education loan, business school loan, MBA student loan, ISB loan",
  alternates: { canonical: "https://www.fundmycampus.com/loan-for-mba" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
