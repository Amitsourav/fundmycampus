import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBA Education Loan — Up to ₹12 Lakhs | Management Course Loan",
  description: "BBA education loans up to ₹12 Lakhs for top management colleges. Low interest rates, easy documentation, fast approval.",
  keywords: "BBA education loan, BBA student loan, management course loan, BBA college loan",
  alternates: { canonical: "https://www.fundmycampus.com/loan-for-bba" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
