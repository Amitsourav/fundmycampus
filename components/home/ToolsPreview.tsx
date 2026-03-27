"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, Scale, FileEdit, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export const ToolsPreview: React.FC = () => {
  const tools = [
    {
      id: "emi-calculator",
      name: "EMI Calculator",
      description: "Calculate your monthly loan payments instantly with our smart calculator",
      icon: Calculator,
      highlight: "Most Popular",
    },
    {
      id: "eligibility-checker",
      name: "Eligibility Checker",
      description: "Check your maximum loan eligibility based on income and credit score",
      icon: TrendingUp,
      highlight: null,
    },
    {
      id: "compare-loans",
      name: "Compare Loans",
      description: "Compare multiple loan offers side by side to find the best deal",
      icon: Scale,
      highlight: null,
    },
    {
      id: "sop-review",
      name: "SOP Review Tool",
      description: "Get instant AI-powered feedback on your Statement of Purpose",
      icon: FileEdit,
      highlight: "New",
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
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl text-black mb-4"
          >
            Free <span className="text-teal-600">Tools</span> for Smart Planning
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-800 max-w-2xl mx-auto"
          >
            Use our powerful calculators and tools to make informed decisions about your education loan
          </motion.p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tools.map((tool, index) => (
            <Link key={tool.id} href={`/tools#${tool.id}`}>
              <div className="group relative bg-gray-50 rounded-xl p-6 hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-all duration-300 h-full cursor-pointer">
                {/* Highlight Badge */}
                {tool.highlight && (
                  <span className={`absolute -top-3 right-4 px-3 py-1 text-xs font-bold rounded-full ${
                    tool.highlight === "New"
                      ? "bg-black text-teal-500"
                      : "bg-teal-500 text-black"
                  }`}>
                    {tool.highlight}
                  </span>
                )}

                {/* Icon */}
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <tool.icon className="w-6 h-6 text-black" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-black mb-3 group-hover:text-teal-700 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* Arrow indicator */}
                <div className="flex items-center text-teal-600 text-sm font-medium">
                  Try Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="bg-black rounded-xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  <span className="text-teal-400 font-medium">100% Free</span>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2">
                  All Tools, No Hidden Costs
                </h3>
                <p className="text-gray-400">
                  Access all our calculators and planning tools completely free
                </p>
              </div>
              <Link href="/tools">
                <Button variant="primary-light" size="lg">
                  Explore All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
