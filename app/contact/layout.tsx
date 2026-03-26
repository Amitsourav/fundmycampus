import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact FundMyCampus — Free Education Loan Consultation",
  description: "Get free education loan consultation. Call +91 78272 25354 or fill the form. We help with study abroad & India education loans.",
  keywords: "contact FundMyCampus, education loan consultation, education loan help, loan advisor",
  openGraph: {
    title: "Contact FundMyCampus — Free Education Loan Consultation",
    description: "Get free education loan consultation. Call +91 78272 25354 or fill the form.",
  },
  alternates: {
    canonical: "https://www.fundmycampus.com/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
