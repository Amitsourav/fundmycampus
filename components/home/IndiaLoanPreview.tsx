/**
 * Premium India Loan Preview - Italian Luxury Design
 * Subtle, elegant showcase for domestic education loans
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fadeInUp } from "@/lib/animations";

export const IndiaLoanPreview: React.FC = () => {
  const highlights = [
    { metric: "₹40L", description: "Maximum loan amount" },
    { metric: "6.85%", description: "Starting interest rate" },
    { metric: "500+", description: "Partner institutions" },
    { metric: "15 Years", description: "Repayment tenure" },
  ];

  const institutions = [
    "Indian Institutes of Technology",
    "Indian Institutes of Management", 
    "All India Institute of Medical Sciences",
    "National Law Universities",
    "Indian Statistical Institutes",
    "Prestigious Private Universities"
  ];

  return (
    <section className="py-10 md:py-12 bg-charcoal-50">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <Card padding="xl" className="border border-noir/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wide-lg text-charcoal-500 border border-charcoal-200 mb-6">
                  Domestic Excellence
                </span>
                
                <h2 className="font-serif text-display-md text-noir mb-6">
                  Study in <em className="not-italic text-charcoal-600">India</em>
                </h2>
                
                <p className="text-lg text-charcoal-600 leading-relaxed mb-8">
                  Premium financing for India's most prestigious institutions. 
                  Support your academic journey at IITs, IIMs, AIIMS, and other 
                  centers of excellence across the country.
                </p>

                {/* Institution Types */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wide-md text-charcoal-700 mb-4">
                    Supported Institutions
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {institutions.map((institution, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-1 h-1 bg-olive rounded-full mr-3" />
                        <span className="text-sm text-charcoal-600">{institution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/india-study-loan">
                  <Button variant="secondary" size="md">
                    Explore India Loans
                  </Button>
                </Link>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="text-center p-6 bg-white border border-noir/10 hover:border-noir/20 transition-all duration-500"
                  >
                    <div className="text-3xl font-serif text-noir mb-2">
                      {highlight.metric}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-charcoal-500">
                      {highlight.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};