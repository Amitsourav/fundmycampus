"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Zap } from "lucide-react";

export const LoanPartners: React.FC = () => {
  const partners = [
    {
      name: "ICICI Bank",
      logo: "/images/banks/icici.jpeg",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹2 Cr",
      tenure: "Up To 14 Years"
    },
    {
      name: "Axis Bank", 
      logo: "/images/banks/Axis.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹3 Cr",
      tenure: "Up To 15 Years"
    },
    {
      name: "Credila",
      logo: "/images/banks/credila.png",
      processingFees: "0.85% - 1%",
      loanAmount: "Up To ₹1 Cr",
      tenure: "Up To 15 Years"
    },
    {
      name: "PNB",
      logo: "/images/banks/pnb.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹2 Cr", 
      tenure: "Up To 15 Years"
    },
    {
      name: "Union Bank",
      logo: "/images/banks/union.jpeg",
      processingFees: "0 - ₹5K",
      loanAmount: "Up To ₹75 Lakhs",
      tenure: "Up To 15 Years"
    },
    {
      name: "IDFC First Bank",
      logo: "/images/banks/idfc.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹1.5 Cr",
      tenure: "Up To 15 Years"
    },
    {
      name: "Yes Bank",
      logo: "/images/banks/yes.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹2 Cr",
      tenure: "Up To 15 Years"
    },
    {
      name: "Avanse",
      logo: "/images/banks/avanse.png",
      processingFees: "0 - 0.5%",
      loanAmount: "Up To ₹1.5 Cr",
      tenure: "Up To 15 Years"
    },
    {
      name: "Tata Capital",
      logo: "/images/banks/tata.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹2 Cr",
      tenure: "Up To 15 Years"
    },
    {
      name: "Auxilo",
      logo: "/images/banks/auxilo.png",
      processingFees: "0 - 0.5%",
      loanAmount: "Up To ₹1.5 Cr",
      tenure: "Up To 15 Years"
    },
    {
      name: "Prodigy Finance",
      logo: "/images/banks/prodigy.png",
      processingFees: "0 - 5%",
      loanAmount: "Up To 150,000 Dollars",
      tenure: "Up To 15 Years"
    },
    {
      name: "Poonawalla Fincorp",
      logo: "/images/banks/poonawala.jpeg",
      processingFees: "0.75% - 1%",
      loanAmount: "Up To ₹3 Cr",
      tenure: "Up To 15 Years"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-black mb-4"
          >
            Choose from the <span className="text-yellow-600">Best Loan Partners</span>
          </motion.h2>
        </motion.div>

        {/* Partners Table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Table Header */}
          <div className="bg-black text-white px-6 py-4">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-sm flex items-center justify-center text-xs mr-3">
                  %
                </div>
                Bank Name
              </div>
              <div>Processing Fees</div>
              <div>Loan Amount (INR)</div>
              <div>Loan Tenure</div>
            </div>
          </div>

          {/* Premium Animated Table Body */}
          <div className="divide-y divide-gray-100 overflow-hidden">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ 
                  backgroundColor: "#F8FAFC",
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  borderRadius: "12px"
                }}
                className="px-6 py-5 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                {/* Premium hover effect background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow/8 via-transparent to-gray-900/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Animated border indicator */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="grid grid-cols-4 gap-4 items-center relative z-10">
                  {/* Bank Logo & Name with premium animations */}
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="relative w-16 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2 shadow-sm group-hover:shadow-md group-hover:border-yellow-300 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Premium shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                        animate={{
                          x: [-100, 100]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      />
                      
                      <motion.img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        initial={{ opacity: 0.8 }}
                        whileInView={{ opacity: 1 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `https://via.placeholder.com/80x40/ffffff/1f2937?text=${partner.name.substring(0, 3)}`;
                        }}
                      />
                      
                      {/* Premium floating indicator */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>
                    
                    <motion.span 
                      className="text-sm font-medium text-gray-800 hidden md:block group-hover:text-yellow-700 transition-colors duration-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, x: 2 }}
                    >
                      {partner.name}
                    </motion.span>
                  </div>

                  {/* Processing Fees with animation */}
                  <motion.div 
                    className="text-sm text-gray-800 group-hover:text-gray-900 font-medium group-hover:scale-105 transition-all duration-300"
                    whileHover={{ x: 2 }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      {partner.processingFees}
                    </motion.span>
                  </motion.div>

                  {/* Loan Amount with premium number animation */}
                  <motion.div 
                    className="text-sm text-gray-800 group-hover:text-gray-900 font-medium group-hover:scale-105 transition-all duration-300"
                    whileHover={{ x: 2 }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="inline-block"
                    >
                      {partner.loanAmount}
                    </motion.span>
                    <motion.div
                      className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-xs text-yellow-600 font-bold opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0, rotate: -45 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>

                  {/* Tenure with animation */}
                  <motion.div 
                    className="text-sm text-gray-700 group-hover:text-gray-900 font-medium group-hover:scale-105 transition-all duration-300 relative"
                    whileHover={{ x: 2 }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      {partner.tenure}
                    </motion.span>
                  </motion.div>
                </div>
                
                {/* Premium row accent line */}
                <motion.div
                  className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-8"
        >
          <Button 
            variant="primary" 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold"
          >
            <Zap className="w-5 h-5 mr-2" />
            Check Your Eligibility Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};