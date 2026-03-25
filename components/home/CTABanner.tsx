"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export const CTABanner: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        <div className="relative bg-teal-500 rounded-2xl overflow-hidden">
          {/* Background decorative shapes */}
          <div className="absolute top-0 right-20 w-32 h-32 bg-teal-300 rounded-full -translate-y-1/2 opacity-60" />
          <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-teal-500 rounded-full translate-y-1/2 opacity-40" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-8 py-6">
            {/* Left - Illustration */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <img
                src="https://illustrations.popsy.co/amber/student-going-to-school.svg"
                alt="Student with luggage ready for study abroad"
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </motion.div>

            {/* Center - Bold Statement */}
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-black text-center font-bold">
              Start Your Study Abroad Journey Today
            </h2>

            {/* Right - CTA Button */}
            <Button variant="primary" size="lg" className="bg-black hover:bg-gray-900 text-white whitespace-nowrap">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
