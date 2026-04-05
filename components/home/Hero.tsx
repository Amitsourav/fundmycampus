/**
 * Premium Hero Section - Fundmycampus
 * Clean white/teal/black theme with premium contrast
 * Modern typography, striking visuals, confident tone
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem, textReveal } from "@/lib/animations";
import { ArrowRight, Globe, Shield, Clock } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import dynamic from "next/dynamic";

const StackedPanels = dynamic(() => import("@/components/ui/stacked-panels-cursor-interactive-component"), { ssr: false });

export const Hero: React.FC = () => {
  const trustIndicators = [
    { value: "₹500Cr+", label: "Disbursed" },
    { value: "15,000+", label: "Students Abroad" },
    { value: "50+", label: "Countries" },
  ];

  const features = [
    { icon: Globe, text: "Study in 50+ countries" },
    { icon: Shield, text: "100% financing available" },
    { icon: Clock, text: "48-hour approval" },
  ];

  const bankPartners = [
    { name: "ICICI Bank", logo: "/images/banks/icici.jpeg" },
    { name: "Axis Bank", logo: "/images/banks/Axis.png" },
    { name: "Credila", logo: "/images/banks/credila.png" },
    { name: "PNB", logo: "/images/banks/pnb.png" },
    { name: "Union Bank", logo: "/images/banks/union.jpeg" },
    { name: "IDFC First", logo: "/images/banks/idfc.png" },
    { name: "Yes Bank", logo: "/images/banks/yes.png" },
    { name: "Avanse", logo: "/images/banks/avanse.png" },
    { name: "Tata Capital", logo: "/images/banks/tata.png" },
    { name: "Auxilo", logo: "/images/banks/auxilo.png" },
    { name: "Prodigy Finance", logo: "/images/banks/prodigy.png" },
    { name: "Poonawalla", logo: "/images/banks/poonawala.jpeg" },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Diagonal Teal Section - 30% */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0,0 L35,0 L25,100 L0,100 Z"
            fill="#14B8A6"
          />
        </svg>
      </div>

      {/* Background Pattern - Subtle */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0D9488 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>


      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-24 md:pt-32 pb-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-6 lg:gap-12 items-center"
          >
            {/* Left Content */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              {/* Main Headline - Left aligned like inspiration */}
              <motion.h1
                variants={textReveal}
                className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl text-black mb-6 md:mb-7 leading-none"
              >
                Education Loans
                <span className="block text-black">for Study Abroad</span>
                <span className="block text-black">& India</span>
              </motion.h1>

              {/* Subheadline - Simple and clean */}
              <motion.p 
                variants={staggerItem}
                className="text-lg text-gray-800 mb-10 leading-relaxed max-w-lg"
              >
                We help fuel educational dreams by removing the barriers to financial access through private student loans.
              </motion.p>

              {/* Stats badge */}
              <motion.div variants={staggerItem} className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-black">₹500Cr+</p>
                  <p className="text-xs text-gray-700">Loan Disbursed</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-black">15,000+</p>
                  <p className="text-xs text-gray-700">Students Helped</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-black">50+</p>
                  <p className="text-xs text-gray-700">Countries</p>
                </div>
              </motion.div>

              {/* Single CTA */}
              <motion.div variants={staggerItem}>
                <Link href="/abroad-study-loan">
                  <Button variant="primary" size="lg">
                    Apply for Loan
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Interactive Stacked Panels */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6 order-1 lg:order-2 hidden md:flex justify-center items-center"
            >
              <div className="relative w-full h-[220px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
                <StackedPanels />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bank Partners Ribbon */}
      <div className="relative z-20 pb-4">
        <p className="text-center text-sm font-medium text-gray-500 mb-4 tracking-wide uppercase">
          Trusted by 12+ Banking Partners
        </p>
        <Marquee duration={30} pauseOnHover fade fadeAmount={8}>
          {bankPartners.map((bank) => (
            <div
              key={bank.name}
              className="flex items-center gap-4 mx-8 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/60 shadow-sm"
            >
              <img
                src={bank.logo}
                alt={bank.name}
                className="h-9 w-14 object-contain"
                width={56}
                height={36}
                loading="lazy"
              />
              <span className="text-base font-bold text-gray-800 whitespace-nowrap">
                {bank.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Curved bottom section like inspiration */}
      <div className="relative z-20">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-20 md:h-24"
        >
          <path 
            d="M0 120V20C240 80 480 80 720 20C960 -40 1200 -40 1440 20V120H0Z" 
            fill="#F9FAFB"
          />
        </svg>
      </div>
    </section>
  );
};