import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CA Education Loan — Up to ₹8 Lakhs | Chartered Accountant Loan",
  description: "CA education loans up to ₹8 Lakhs for CA course fees, coaching, and exam preparation. Quick approval, low interest rates.",
  keywords: "CA education loan, chartered accountant loan, CA course loan, CA student loan",
  alternates: { canonical: "https://www.fundmycampus.com/courses-loan/ca" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
