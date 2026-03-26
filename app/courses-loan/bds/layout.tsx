import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BDS Education Loan — Up to ₹25 Lakhs | Dental Course Loan",
  description: "BDS education loans up to ₹25 Lakhs for dental colleges across India. Flexible repayment, moratorium period, quick approval.",
  keywords: "BDS education loan, dental education loan, BDS student loan, dental course loan",
  alternates: { canonical: "https://www.fundmycampus.com/courses-loan/bds" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
