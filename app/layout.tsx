import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  title: "FundMyCampus — Premium Education Financing for Global Aspirations",
  description: "Exclusive education loans for prestigious universities worldwide. Experience seamless financing with personalized service, competitive rates, and white-glove support.",
  keywords: "premium education loan, study abroad financing, international student loan, luxury education financing, elite university funding",
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
      >
        <Header />
        <main className="min-h-screen pt-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
