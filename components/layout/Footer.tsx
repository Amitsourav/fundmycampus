"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-200 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">

          {/* Brand — 3 cols */}
          <div className="lg:col-span-3">
            <img src="/images/logo.png" alt="FundMyCampus" className="h-20 w-auto mb-4 brightness-0 invert" width={200} height={80} loading="lazy" />
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Premium education financing for ambitious students worldwide.
            </p>
          </div>

          {/* Links — 9 cols, split into sub-grid */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
            {/* Services */}
            <div>
              <h4 className="text-sm uppercase tracking-wide-lg mb-5 text-gray-100 font-semibold">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/abroad-study-loan" className="text-sm text-gray-400 hover:text-white transition-colors">Study Abroad Loans</Link></li>
                <li><Link href="/india-study-loan" className="text-sm text-gray-400 hover:text-white transition-colors">Study in India Loans</Link></li>
                <li><Link href="/tools" className="text-sm text-gray-400 hover:text-white transition-colors">Loan Tools</Link></li>
                <li><Link href="/#process" className="text-sm text-gray-400 hover:text-white transition-colors">Loan Process</Link></li>
              </ul>
            </div>

            {/* Course Loans — single column list */}
            <div>
              <h4 className="text-sm uppercase tracking-wide-lg mb-5 text-gray-100 font-semibold">Course Loans</h4>
              <ul className="space-y-3">
                <li><Link href="/loan-for-btech" className="text-sm text-gray-400 hover:text-white transition-colors">B.Tech Loan</Link></li>
                <li><Link href="/loan-for-mbbs" className="text-sm text-gray-400 hover:text-white transition-colors">MBBS Loan</Link></li>
                <li><Link href="/loan-for-mba" className="text-sm text-gray-400 hover:text-white transition-colors">MBA Loan</Link></li>
                <li><Link href="/loan-for-bba" className="text-sm text-gray-400 hover:text-white transition-colors">BBA Loan</Link></li>
                <li><Link href="/loan-for-bca" className="text-sm text-gray-400 hover:text-white transition-colors">BCA Loan</Link></li>
                <li><Link href="/loan-for-bds" className="text-sm text-gray-400 hover:text-white transition-colors">BDS Loan</Link></li>
                <li><Link href="/loan-for-bsc-nursing" className="text-sm text-gray-400 hover:text-white transition-colors">B.Sc Nursing</Link></li>
                <li><Link href="/loan-for-ca" className="text-sm text-gray-400 hover:text-white transition-colors">CA Loan</Link></li>
                <li><Link href="/loan-for-hotel-management" className="text-sm text-gray-400 hover:text-white transition-colors">Hotel Mgmt</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm uppercase tracking-wide-lg mb-5 text-gray-100 font-semibold">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blogs" className="text-sm text-gray-400 hover:text-white transition-colors">Blogs</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm uppercase tracking-wide-lg mb-5 text-gray-100 font-semibold">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm uppercase tracking-wide-lg mb-5 text-gray-100 font-semibold">Connect</h4>
              <ul className="space-y-3">
                <li><a href="mailto:deepak@fundmycampus.com" className="text-sm text-gray-400 hover:text-white transition-colors">deepak@fundmycampus.com</a></li>
                <li><a href="tel:+917827225354" className="text-sm text-gray-400 hover:text-white transition-colors">+91 78272 25354</a></li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="h-px bg-gray-800 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">© {currentYear} FundMyCampus. All rights reserved.</p>
          <p className="text-sm text-gray-500">Crafted with excellence in Faridabad</p>
        </div>
      </div>
    </footer>
  );
};
