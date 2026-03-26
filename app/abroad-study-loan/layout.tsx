import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Abroad Education Loan — Collateral-Free, Starting 6.75%",
  description: "Get collateral-free study abroad education loans up to ₹1.5 Crore. Compare ICICI, Axis, Credila & more. 48-hour approval for USA, UK, Canada, Australia, Germany, Singapore.",
  keywords: "study abroad loan, education loan for abroad, collateral free study abroad loan, study abroad loan without security, education loan USA UK Canada",
  openGraph: {
    title: "Study Abroad Education Loan — Collateral-Free, Starting 6.75% | FundMyCampus",
    description: "Get collateral-free study abroad education loans up to ₹1.5 Crore. 48-hour approval for 50+ countries.",
  },
  alternates: {
    canonical: "https://www.fundmycampus.com/abroad-study-loan",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
