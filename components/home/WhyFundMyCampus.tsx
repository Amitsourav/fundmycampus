"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { Shield, Clock, DollarSign, Users, CheckCircle, Globe, Award, HeartHandshake } from "lucide-react";

export const WhyFundMyCampus: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Secure Process",
      description: "Bank-level security with end-to-end encryption for all your financial data and documents.",
      highlight: "Trusted by 15,000+ students"
    },
    {
      icon: Clock,
      title: "48-Hour Approval",
      description: "Get quick decisions on your loan applications with our streamlined digital process.",
      highlight: "Fastest in Industry"
    },
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Starting from 6.75% per annum with flexible EMI options tailored to your future income.",
      highlight: "From 6.75% p.a."
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Study in 50+ countries with partnerships across top universities worldwide.",
      highlight: "50+ Countries"
    },
    {
      icon: Users,
      title: "Expert Counselors",
      description: "Dedicated education loan specialists guide you through every step of the process.",
      highlight: "Personal Support"
    },
    {
      icon: CheckCircle,
      title: "No Hidden Charges",
      description: "Transparent pricing with no processing fees or hidden charges throughout your loan tenure.",
      highlight: "100% Transparent"
    },
    {
      icon: Award,
      title: "Collateral-Free Options",
      description: "Get up to ₹7.5 Lakhs without any collateral based on your academic profile.",
      highlight: "Up to ₹7.5L"
    },
    {
      icon: HeartHandshake,
      title: "Flexible Repayment",
      description: "Moratorium period during studies with flexible repayment options post-graduation.",
      highlight: "Study First, Pay Later"
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-10 md:mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-black mb-4"
          >
            Why Choose <span className="text-teal-500">FundMyCampus</span>?
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-800 max-w-3xl mx-auto"
          >
            We're committed to making education accessible with transparent processes, 
            competitive rates, and personalized support every step of the way.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-5 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-teal-500" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl text-black mb-3 group-hover:text-gray-800 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-800 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Highlight */}
              <div className="inline-flex items-center px-3 py-1 bg-teal-50 rounded-full">
                <span className="text-xs font-medium text-teal-700">
                  {feature.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-20 bg-black rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="font-serif text-3xl md:text-4xl text-teal-500 mb-2">₹500Cr+</h4>
              <p className="text-gray-300">Loans Disbursed</p>
            </div>
            <div>
              <h4 className="font-serif text-3xl md:text-4xl text-teal-500 mb-2">15,000+</h4>
              <p className="text-gray-300">Students Funded</p>
            </div>
            <div>
              <h4 className="font-serif text-3xl md:text-4xl text-teal-500 mb-2">50+</h4>
              <p className="text-gray-300">Countries</p>
            </div>
            <div>
              <h4 className="font-serif text-3xl md:text-4xl text-teal-500 mb-2">98%</h4>
              <p className="text-gray-300">Approval Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};