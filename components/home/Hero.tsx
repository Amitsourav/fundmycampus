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
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 pt-12 pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[600px] md:min-h-screen"
          >
            {/* Left Content */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              {/* Main Headline - Left aligned like inspiration */}
              <motion.h1
                variants={textReveal}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black mb-6 md:mb-8 leading-none"
              >
                Education Loans
                <span className="block text-black">for Study Abroad</span>
                <span className="block text-black">& India</span>
              </motion.h1>

              {/* Subheadline - Simple and clean */}
              <motion.p 
                variants={staggerItem}
                className="text-xl text-gray-800 mb-12 leading-relaxed max-w-lg"
              >
                We help fuel educational dreams by removing the barriers to financial access through private student loans.
              </motion.p>

              {/* Single CTA - Clean like inspiration */}
              <motion.div variants={staggerItem}>
                <Link href="/abroad-study-loan">
                  <Button variant="primary" size="lg">
                    Apply for Loan
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Content - 3D Style Education Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center"
            >
              <div className="relative w-full max-w-lg xl:max-w-xl">
                {/* 3D Style Illustration with Website Colors */}
                <svg
                  viewBox="0 0 500 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto drop-shadow-2xl"
                >
                  {/* Definitions for 3D effects */}
                  <defs>
                    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2DD4BF" />
                      <stop offset="100%" stopColor="#0D9488" />
                    </linearGradient>
                    <linearGradient id="blackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#374151" />
                      <stop offset="100%" stopColor="#111827" />
                    </linearGradient>
                    <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F3F4F6" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="4" dy="8" stdDeviation="8" floodOpacity="0.15" />
                    </filter>
                    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.1" />
                    </filter>
                  </defs>

                  {/* Background Elements */}
                  <circle cx="250" cy="250" r="180" fill="#CCFBF1" opacity="0.5" />

                  {/* Main 3D Laptop */}
                  <g filter="url(#shadow)" transform="translate(100, 180)">
                    {/* Laptop Base */}
                    <path d="M20 140 L280 140 L300 160 L0 160 Z" fill="url(#blackGrad)" />
                    {/* Laptop Screen Back */}
                    <rect x="30" y="20" width="240" height="120" rx="8" fill="url(#blackGrad)" />
                    {/* Laptop Screen */}
                    <rect x="40" y="28" width="220" height="104" rx="4" fill="url(#whiteGrad)" />
                    {/* Screen Content - Graph */}
                    <path d="M60 110 L100 90 L140 100 L180 60 L220 70 L240 50" stroke="#14B8A6" strokeWidth="4" strokeLinecap="round" fill="none" />
                    <circle cx="180" cy="60" r="6" fill="#14B8A6" />
                    <circle cx="240" cy="50" r="6" fill="#0F766E" />
                    {/* Dollar icon on screen */}
                    <circle cx="80" cy="60" r="16" fill="#14B8A6" />
                    <text x="80" y="66" textAnchor="middle" fill="#111827" fontSize="16" fontWeight="bold">$</text>
                  </g>

                  {/* 3D Graduation Cap */}
                  <g filter="url(#shadow)" transform="translate(280, 60)">
                    {/* Cap top */}
                    <path d="M60 30 L0 55 L60 80 L120 55 Z" fill="url(#blackGrad)" />
                    {/* Cap bottom */}
                    <ellipse cx="60" cy="55" rx="60" ry="15" fill="#1F2937" />
                    {/* Tassel */}
                    <line x1="60" y1="30" x2="60" y2="10" stroke="#374151" strokeWidth="3" />
                    <circle cx="60" cy="8" r="6" fill="url(#tealGrad)" />
                    <path d="M60 14 Q80 40 75 70" stroke="url(#tealGrad)" strokeWidth="3" fill="none" />
                    <circle cx="75" cy="72" r="5" fill="url(#tealGrad)" />
                  </g>

                  {/* 3D Coin Stack */}
                  <g filter="url(#softShadow)" transform="translate(50, 100)">
                    <ellipse cx="40" cy="80" rx="35" ry="10" fill="#0D9488" />
                    <ellipse cx="40" cy="70" rx="35" ry="10" fill="url(#tealGrad)" />
                    <ellipse cx="40" cy="60" rx="35" ry="10" fill="#0D9488" />
                    <ellipse cx="40" cy="50" rx="35" ry="10" fill="url(#tealGrad)" />
                    <ellipse cx="40" cy="40" rx="35" ry="10" fill="#0D9488" />
                    <ellipse cx="40" cy="30" rx="35" ry="10" fill="url(#tealGrad)" />
                    <text x="40" y="36" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="bold">₹</text>
                  </g>

                  {/* 3D Globe */}
                  <g filter="url(#softShadow)" transform="translate(350, 280)">
                    <circle cx="50" cy="50" r="45" fill="url(#blackGrad)" />
                    <circle cx="50" cy="50" r="40" fill="#374151" />
                    {/* Globe lines */}
                    <ellipse cx="50" cy="50" rx="18" ry="40" fill="none" stroke="url(#tealGrad)" strokeWidth="2" />
                    <ellipse cx="50" cy="50" rx="40" ry="18" fill="none" stroke="url(#tealGrad)" strokeWidth="2" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="url(#tealGrad)" strokeWidth="2" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="url(#tealGrad)" strokeWidth="2" />
                    {/* Airplane */}
                    <path d="M70 25 L85 20 L80 30 Z" fill="url(#tealGrad)" />
                  </g>

                  {/* 3D Book Stack */}
                  <g filter="url(#softShadow)" transform="translate(60, 340)">
                    <rect x="0" y="30" width="70" height="15" rx="2" fill="#1F2937" transform="rotate(-5)" />
                    <rect x="5" y="15" width="70" height="15" rx="2" fill="url(#tealGrad)" transform="rotate(-3)" />
                    <rect x="2" y="0" width="70" height="15" rx="2" fill="#374151" transform="rotate(-1)" />
                  </g>

                  {/* 3D Certificate */}
                  <g filter="url(#softShadow)" transform="translate(320, 180)">
                    <rect x="0" y="0" width="80" height="60" rx="4" fill="url(#whiteGrad)" />
                    <rect x="10" y="10" width="60" height="4" rx="2" fill="url(#tealGrad)" />
                    <rect x="10" y="20" width="50" height="3" rx="1" fill="#E5E7EB" />
                    <rect x="10" y="28" width="40" height="3" rx="1" fill="#E5E7EB" />
                    <circle cx="60" cy="45" r="10" fill="url(#tealGrad)" />
                    <path d="M55 45 L58 48 L65 41" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>

                  {/* Floating Elements */}
                  {/* Plus signs */}
                  <g fill="url(#tealGrad)">
                    <path d="M420 140 L426 140 L426 134 L432 134 L432 140 L438 140 L438 146 L432 146 L432 152 L426 152 L426 146 L420 146 Z" />
                    <path d="M140 280 L144 280 L144 276 L148 276 L148 280 L152 280 L152 284 L148 284 L148 288 L144 288 L144 284 L140 284 Z" />
                  </g>

                  {/* Dots */}
                  <circle cx="180" cy="120" r="5" fill="url(#tealGrad)" />
                  <circle cx="420" cy="320" r="4" fill="url(#tealGrad)" />
                  <circle cx="100" cy="250" r="3" fill="#14B8A6" />
                </svg>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute bottom-8 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 hidden sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shadow-md">
                      <Globe className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-black">50+ Countries</p>
                      <p className="text-xs text-gray-600">Global Education</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Amount Card */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute top-8 -right-4 bg-black rounded-2xl shadow-xl p-4 hidden sm:block"
                >
                  <p className="text-xs text-gray-400">Loans Disbursed</p>
                  <p className="text-2xl font-bold text-teal-400">₹500Cr+</p>
                </motion.div>

                {/* Additional floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute top-1/2 -left-8 bg-teal-500 rounded-full p-3 shadow-lg hidden sm:block"
                >
                  <Shield className="w-5 h-5 text-black" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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