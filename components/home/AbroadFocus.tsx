/**
 * Premium Study Abroad Section - Italian Luxury Design
 * Sophisticated showcase of international opportunities
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export const AbroadFocus: React.FC = () => {
  const destinations = [
    { country: "United States", universities: "5,000+", flag: "🇺🇸", description: "Ivy League & Top-tier Universities" },
    { country: "United Kingdom", universities: "150+", flag: "🇬🇧", description: "Russell Group & Historic Institutions" },
    { country: "Canada", universities: "100+", flag: "🇨🇦", description: "Research-Intensive Universities" },
    { country: "Australia", universities: "40+", flag: "🇦🇺", description: "Group of Eight Universities" },
    { country: "Germany", universities: "400+", flag: "🇩🇪", description: "Technical Universities & Excellence" },
    { country: "Netherlands", universities: "60+", flag: "🇳🇱", description: "Research Universities" },
  ];

  const benefits = [
    {
      title: "Up to ₹1.5 Crore",
      description: "Maximum loan amount for comprehensive coverage",
    },
    {
      title: "6.75% Interest Rate",
      description: "Starting rates with competitive terms",
    },
    {
      title: "No Collateral",
      description: "Up to ₹75 Lakhs without security",
    },
    {
      title: "100% Financing",
      description: "Complete coverage of educational expenses",
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Title */}
        <SectionTitle
          title="Study Abroad Excellence"
          subtitle="Premium education loans for the world's most prestigious institutions. Experience seamless financing for your global academic journey."
          align="center"
          className="mb-10 md:mb-20"
        />

        {/* Destinations Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-10 md:mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {destinations.map((destination, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card hoverable padding="md" className="text-center group border border-noir/10 hover:border-noir/20 transition-all duration-700">
                  <div className="text-4xl mb-4">{destination.flag}</div>
                  <h3 className="font-serif text-xl text-noir mb-2 group-hover:text-charcoal-700 transition-colors">
                    {destination.country}
                  </h3>
                  <p className="text-sm text-charcoal-600 mb-2">{destination.universities} Universities</p>
                  <p className="text-xs uppercase tracking-wide text-charcoal-400">
                    {destination.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-10 md:mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-display-sm text-center text-noir mb-12">
              Exceptional Terms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-serif text-noir mb-2">{benefit.title}</div>
                  <div className="text-sm text-charcoal-600 leading-relaxed">
                    {benefit.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex justify-center mb-10 md:mb-20"
        >
          <div className="w-24 h-px bg-noir/20" />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h3 className="font-serif text-display-sm text-noir mb-6">
            Begin Your Global Journey
          </h3>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Connect with our education financing specialists to explore opportunities 
            at the world's most prestigious institutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/abroad-study-loan">
              <Button variant="primary" size="lg">
                Explore Study Abroad
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};