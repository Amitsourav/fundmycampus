import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth-context";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fundmycampus.com"),
  title: {
    default: "FundMyCampus — Education Loans for Study Abroad & India",
    template: "%s | FundMyCampus",
  },
  description: "Apply for education loans for study abroad or Indian universities. Collateral-free loans starting at 6.85%, 48-hr approval, 15,000+ students helped. Compare ICICI, Axis, Credila & more.",
  keywords: "education loan study abroad, collateral free education loan india, study abroad loan, education loan without security, NBFC education loan, education loan for abroad studies",
  openGraph: {
    type: "website",
    siteName: "FundMyCampus",
    title: "FundMyCampus — Education Loans for Study Abroad & India",
    description: "Get collateral-free education loans starting at 6.85% for studying abroad or in India. Fast 48-hour approval. 15,000+ students funded.",
    url: "https://www.fundmycampus.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "FundMyCampus — Education Loans for Study Abroad & India",
    description: "Get collateral-free education loans starting at 6.85% for studying abroad or in India. Fast 48-hour approval.",
  },
  alternates: {
    canonical: "https://www.fundmycampus.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YW1T2TMGBD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YW1T2TMGBD');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-ivory text-noir`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Header />
          <main className="min-h-screen pt-12">{children}</main>
          <Footer />
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
