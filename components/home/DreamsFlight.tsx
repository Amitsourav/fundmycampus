"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CreditCard, RefreshCw, Clock, Settings } from "lucide-react";

export const DreamsFlight: React.FC = () => {
  const [activeTab, setActiveTab] = useState("abroad");

  const features = [
    { icon: CreditCard, title: "100%", subtitle: "Financing" },
    { icon: RefreshCw, title: "Flexible", subtitle: "Repayments" },
    { icon: Clock, title: "Quick", subtitle: "Solutions" },
    { icon: Settings, title: "Customizable", subtitle: "Loans" },
  ];

  const tabContent = {
    abroad: {
      title: "Moving abroad for your higher education opens several doors. You can gain access to highly-acclaimed and globally recognized programmes, or you may enhance your career prospects for the future. We have designed a study abroad loan for students who are planning to pursue higher education outside the country. Even if you are applying for a collateral-free education loan, you can achieve all your academic aspirations with ease! We offer a student loan without collateral and with collateral, depending on your student loan requirements."
    },
    india: {
      title: "Pursuing higher education in India offers excellent opportunities at premier institutions. Our education loans for Indian universities provide comprehensive funding for your academic journey. Whether you're aiming for IITs, IIMs, or other top institutions, we ensure you have the financial support needed to achieve your educational goals without any financial constraints."
    }
  };

  return (
    <section className="relative py-10 md:py-12 bg-white overflow-hidden">

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-black mb-4"
          >
            Let Your <span className="text-teal-600">Dreams</span> Take Flight
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Hyper-personalized financial solutions that power your education!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Student Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=90"
              alt="Students studying together with books and laptops for education"
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-xl"
              loading="lazy"
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8 max-w-sm">
              <button
                onClick={() => setActiveTab("abroad")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "abroad"
                    ? "bg-teal-500 text-black shadow-sm"
                    : "text-gray-800 hover:text-black"
                }`}
              >
                Study Abroad
              </button>
              <button
                onClick={() => setActiveTab("india")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "india"
                    ? "bg-teal-500 text-black shadow-sm"
                    : "text-gray-800 hover:text-black"
                }`}
              >
                Study in India
              </button>
            </div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <p className="text-gray-800 leading-relaxed">
                {tabContent[activeTab as keyof typeof tabContent].title}
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-5 bg-white rounded-xl border border-gray-100 hover:border-teal-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-teal-50 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-black mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-800">{feature.subtitle}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <Link href={activeTab === "abroad" ? "/abroad-study-loan" : "/india-study-loan"}>
                <Button variant="primary" size="lg">
                  Apply Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};