"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useAuth } from "@/lib/auth-context";

export const LoanPartners: React.FC = () => {
  const { user } = useAuth();
  const partners = [
    {
      name: "ICICI Bank",
      logo: "/images/banks/icici.jpeg",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹2 Cr",
      tenure: "Up To 14 Years",
    },
    {
      name: "Axis Bank",
      logo: "/images/banks/Axis.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹3 Cr",
      tenure: "Up To 15 Years",
    },
    {
      name: "Credila",
      logo: "/images/banks/credila.png",
      processingFees: "0.85% - 1%",
      loanAmount: "Up To ₹1 Cr",
      tenure: "Up To 15 Years",
    },
    {
      name: "PNB",
      logo: "/images/banks/pnb.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹2 Cr",
      tenure: "Up To 15 Years",
    },
    {
      name: "Union Bank",
      logo: "/images/banks/union.jpeg",
      processingFees: "0 - ₹5K",
      loanAmount: "Up To ₹75 Lakhs",
      tenure: "Up To 15 Years",
    },
    {
      name: "IDFC First Bank",
      logo: "/images/banks/idfc.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹1.5 Cr",
      tenure: "Up To 15 Years",
    },
    {
      name: "Yes Bank",
      logo: "/images/banks/yes.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹2 Cr",
      tenure: "Up To 15 Years",
    },
    {
      name: "Avanse",
      logo: "/images/banks/avanse.png",
      processingFees: "0 - 0.5%",
      loanAmount: "Up To ₹1.5 Cr",
      tenure: "Up To 15 Years",
    },
    {
      name: "Tata Capital",
      logo: "/images/banks/tata.png",
      processingFees: "0.5% - 1%",
      loanAmount: "Up To ₹2 Cr",
      tenure: "Up To 15 Years",
    },
    {
      name: "Auxilo",
      logo: "/images/banks/auxilo.png",
      processingFees: "0 - 0.5%",
      loanAmount: "Up To ₹1.5 Cr",
      tenure: "Up To 15 Years",
    },
    {
      name: "Prodigy Finance",
      logo: "/images/banks/prodigy.png",
      processingFees: "0 - 5%",
      loanAmount: "Up To 150,000 Dollars",
      tenure: "Up To 15 Years",
    },
    {
      name: "Poonawalla Fincorp",
      logo: "/images/banks/poonawala.jpeg",
      processingFees: "0.75% - 1%",
      loanAmount: "Up To ₹3 Cr",
      tenure: "Up To 15 Years",
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-white">
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
            className="font-serif text-3xl md:text-4xl text-black mb-4"
          >
            Choose from the <span className="text-teal-600">Best Loan Partners</span>
          </motion.h2>
        </motion.div>

        {/* Partners Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          {/* Table Header - Desktop */}
          <div className="bg-black text-white px-6 py-4 hidden md:block">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium">
              <div>Bank Name</div>
              <div>Processing Fees</div>
              <div>Loan Amount</div>
              <div>Tenure</div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="bg-black text-white px-4 py-4 md:hidden">
            <p className="text-sm font-medium">Our Banking Partners</p>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/80x40/f3f4f6/374151?text=${partner.name.substring(0, 3)}`;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{partner.name}</span>
                  </div>
                  <div className="text-sm text-gray-800">{partner.processingFees}</div>
                  <div className="text-sm text-gray-800">{partner.loanAmount}</div>
                  <div className="text-sm text-gray-800">{partner.tenure}</div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-8 bg-white rounded border border-gray-200 flex items-center justify-center p-1">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/80x40/f3f4f6/374151?text=${partner.name.substring(0, 3)}`;
                        }}
                      />
                    </div>
                    <span className="font-medium text-gray-900">{partner.name}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-gray-700 mb-1">Processing</p>
                      <p className="font-medium text-gray-800">{partner.processingFees}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-gray-700 mb-1">Amount</p>
                      <p className="font-medium text-gray-800">{partner.loanAmount}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-gray-700 mb-1">Tenure</p>
                      <p className="font-medium text-gray-800">{partner.tenure}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8"
        >
          <Link href={user ? "/dashboard" : "/login"}>
            <Button variant="primary" size="lg">
              Check Your Eligibility Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
