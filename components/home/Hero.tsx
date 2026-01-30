/**
 * Premium Hero Section - Fundmycampus
 * Clean white/yellow/black theme with premium contrast
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
      {/* Diagonal Yellow Section - 30% */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M0,0 L35,0 L25,100 L0,100 Z" 
            fill="#FCD34D"
          />
        </svg>
      </div>

      {/* Background Pattern - Subtle */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFD700 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating animated circles - top right */}
        <motion.div 
          className="absolute top-16 right-16 w-32 h-32 bg-gray-800/10 rounded-full"
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-20 right-20 w-24 h-24 bg-gray-800/8 rounded-full"
          animate={{
            y: [10, -10, 10],
            scale: [1, 0.9, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-24 right-24 w-16 h-16 bg-gray-800/6 rounded-full"
          animate={{
            y: [-5, 15, -5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating elements - left side with premium motion */}
        <motion.div 
          className="absolute top-1/3 left-12 w-20 h-20 bg-gray-800/8 rounded-full"
          animate={{
            x: [-5, 15, -5],
            y: [5, -10, 5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-32 w-16 h-16 bg-gray-800/8 rounded-full"
          animate={{
            x: [10, -5, 10],
            y: [-8, 12, -8],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-16 w-12 h-12 bg-gray-800/6 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.08, 0.18, 0.08]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Premium floating elements - bottom */}
        <motion.div 
          className="absolute bottom-32 right-1/4 w-24 h-24 bg-gray-800/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.14, 0.24, 0.14],
            rotate: [0, 120, 240, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-48 right-1/3 w-18 h-18 bg-gray-800/8 rounded-full"
          animate={{
            y: [0, -15, 0],
            x: [-5, 5, -5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-24 left-1/3 w-20 h-20 bg-gray-800/8 rounded-full"
          animate={{
            scale: [1, 0.8, 1.1, 1],
            opacity: [0.11, 0.21, 0.16, 0.11]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Premium gradient spots with motion */}
        <motion.div 
          className="absolute top-1/4 right-1/2 w-40 h-40 bg-gradient-to-br from-gray-800/10 to-transparent rounded-full blur-sm"
          animate={{
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.15, 0.25, 0.1, 0.15],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-gradient-to-tr from-gray-800/8 to-transparent rounded-full blur-sm"
          animate={{
            scale: [1, 0.8, 1.2, 1],
            opacity: [0.12, 0.22, 0.08, 0.12],
            x: [-10, 10, -10],
            y: [10, -10, 10]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Animated accent dots with premium motion */}
        <motion.div 
          className="absolute top-40 left-1/2 w-8 h-8 bg-gray-800/15 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-60 left-2/3 w-6 h-6 bg-gray-800/12 rounded-full"
          animate={{
            y: [-3, 8, -3],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-2/3 w-10 h-10 bg-gray-800/10 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-60 left-3/4 w-12 h-12 bg-gray-800/10 rounded-full"
          animate={{
            x: [-5, 5, -5],
            y: [5, -5, 5],
            opacity: [0.14, 0.24, 0.14]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Premium corner elements with motion */}
        <motion.div 
          className="absolute top-0 left-0 w-24 h-24 bg-gray-800/6 rounded-br-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.16, 0.08]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-28 h-28 bg-gray-800/8 rounded-tl-full"
          animate={{
            scale: [1, 0.9, 1.1, 1],
            opacity: [0.1, 0.2, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen"
          >
            {/* Left Content */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              {/* Main Headline - Left aligned like inspiration */}
              <motion.h1 
                variants={textReveal}
                className="font-serif text-6xl md:text-7xl lg:text-8xl text-black mb-8 leading-none"
              >
                Funding Your
                <span className="block text-black">Education</span>
                <span className="block text-black">Dreams</span>
              </motion.h1>

              {/* Subheadline - Simple and clean */}
              <motion.p 
                variants={staggerItem}
                className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg"
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

            {/* Right Content - Education Success Image */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-end"
            >
              <motion.div 
                className="relative group cursor-pointer"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 2
                }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=95"
                  alt="Students celebrating graduation with education funding"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  whileHover={{
                    filter: "brightness(1.1) contrast(1.05)"
                  }}
                />
                
                {/* Premium decorative elements with enhanced animations */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 bg-yellow/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow/15 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 0.8, 1.1, 1],
                    opacity: [0.1, 0.3, 0.15, 0.1],
                    x: [-2, 4, -2],
                    y: [2, -4, 2]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                {/* Premium floating accent elements */}
                <motion.div 
                  className="absolute -top-8 -left-8 w-12 h-12 bg-gray-200/40 rounded-full backdrop-blur-sm"
                  animate={{
                    y: [-5, 10, -5],
                    opacity: [0.15, 0.3, 0.15],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-8 -right-8 w-14 h-14 bg-yellow/35 rounded-full backdrop-blur-sm"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 0.9, 1],
                    opacity: [0.25, 0.4, 0.2, 0.25]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Hover reveal overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-gray-900/15 via-transparent to-gray-100/10 rounded-2xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.4 }}
                />
                
                {/* Success indicator badge */}
                <motion.div
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-semibold text-gray-900">🎓 Success</span>
                </motion.div>
              </motion.div>
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