"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Shield, Clock, DollarSign, Users, Check } from "lucide-react";

export const Testimonials: React.FC = () => {
  const features = [
    {
      title: "100% Secure Process",
      description: "Bank-level security with end-to-end encryption for all your financial data and documents.",
      icon: Shield,
    },
    {
      title: "48-Hour Approval",
      description: "Get quick decisions on your loan applications with our streamlined digital process.",
      icon: Clock,
    },
    {
      title: "Competitive Rates",
      description: "Starting from 6.75% per annum with flexible EMI options tailored to your future income.",
      icon: DollarSign,
    },
    {
      title: "No Collateral",
      description: "Collateral-free education loans up to ₹75 Lakhs for study in India and up to ₹1.5 Crore with collateral for study abroad.",
      icon: Shield,
    },
    {
      title: "Expert Counselors",
      description: "Dedicated education loan specialists guide you through every step of the process.",
      icon: Users,
    },
    {
      title: "No Hidden Charges",
      description: "Transparent pricing with no processing fees or hidden charges throughout your loan tenure.",
      icon: Check,
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
            Why Choose <span className="text-teal-600">FundMyCampus</span>?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-800 max-w-2xl mx-auto"
          >
            We make education financing simple, fast, and transparent
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-xl p-6 hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-black" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-xl text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-800 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <div className="bg-black rounded-xl p-8 md:p-10">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-serif text-2xl md:text-3xl text-teal-400 mb-1">15,000+</p>
                <p className="text-gray-300 text-sm">Happy Students</p>
              </div>
              <div className="border-l border-r border-gray-700">
                <p className="font-serif text-2xl md:text-3xl text-teal-400 mb-1">98%</p>
                <p className="text-gray-300 text-sm">Success Rate</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl text-teal-400 mb-1">50+</p>
                <p className="text-gray-300 text-sm">Partner Institutions</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
