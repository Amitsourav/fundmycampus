import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MBBS Education Loan — Up to ₹1 Crore | Medical Student Loan",
  description: "MBBS education loans up to ₹1 Crore for AIIMS, government & private medical colleges. Flexible repayment, moratorium period included.",
  keywords: "MBBS education loan, medical education loan, AIIMS loan, medical student loan, doctor education loan",
  alternates: { canonical: "https://www.fundmycampus.com/loan-for-mbbs" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
