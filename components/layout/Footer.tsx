/**
 * Minimal luxury footer
 * Clean, sophisticated, with essential information only
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Services": [
      { label: "Study Abroad Loans", href: "/abroad-study-loan" },
      { label: "Study in India Loans", href: "/india-study-loan" },
      { label: "Loan Process", href: "/#process" },
    ],
    "Company": [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
    "Legal": [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-black text-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Brand */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:col-span-4"
          >
            <h3 className="font-serif text-3xl text-white mb-4">FundMyCampus</h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
              Premium education financing for ambitious students pursuing excellence at the world's finest institutions.
            </p>
            <div className="flex space-x-1 text-xs text-gray-400 uppercase tracking-wide-md">
              <span>Est.</span>
              <span>2024</span>
              <span>•</span>
              <span>Mumbai</span>
            </div>
          </motion.div>

          {/* Links Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h4 className="text-xs uppercase tracking-wide-lg mb-6 text-gray-100">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors duration-500"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <h4 className="text-xs uppercase tracking-wide-lg mb-6 text-gray-100">
              Connect
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:hello@fundmycampus.com" 
                className="block text-sm text-gray-300 hover:text-white transition-colors duration-500"
              >
                hello@fundmycampus.com
              </a>
              <a 
                href="tel:+919876543210" 
                className="block text-sm text-gray-300 hover:text-white transition-colors duration-500"
              >
                +91 98765 43210
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="h-px bg-gray-600" />
      </div>

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-400 uppercase tracking-wide-md">
            © {currentYear} FundMyCampus. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wide-md mt-4 md:mt-0">
            Crafted with excellence in Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
};