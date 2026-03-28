/**
 * Premium Process Section - Italian Luxury Design
 * Elegant step-by-step loan process
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export const Process: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "Personalized discussion with our education financing specialists to understand your needs.",
    },
    {
      number: "02", 
      title: "Documentation",
      description: "Seamless collection and verification of required documents through our digital platform.",
    },
    {
      number: "03",
      title: "Processing",
      description: "Expert review and processing with our network of premium banking partners.",
    },
    {
      number: "04",
      title: "Approval",
      description: "Rapid approval decision with competitive terms tailored to your profile.",
    },
    {
      number: "05",
      title: "Disbursement",
      description: "Direct transfer of funds to your chosen institution with full transparency.",
    },
  ];

  return (
    <section id="process" className="py-10 md:py-12 bg-charcoal-50">
      <div className="container mx-auto px-4 md:px-8">
        <SectionTitle
          title="Our Process"
          subtitle="A streamlined, transparent approach to education financing that prioritizes your success."
          align="center"
          className="mb-20"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-noir/20 z-0" />
                )}
                
                <div className="relative z-10 bg-white p-5 md:p-8 border border-noir/10 hover:border-noir/20 transition-all duration-700 group">
                  <div className="text-4xl font-serif text-charcoal-300 mb-4 group-hover:text-olive transition-colors duration-500">
                    {step.number}
                  </div>
                  <h3 className="font-serif text-xl text-noir mb-4 group-hover:text-charcoal-700 transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline for mobile */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="lg:hidden mt-12 text-center"
        >
          <span className="text-xs uppercase tracking-wide-lg text-charcoal-500">
            Complete process typically takes 7-10 business days
          </span>
        </motion.div>
      </div>
    </section>
  );
};