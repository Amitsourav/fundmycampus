"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function BlogPage() {
  const featuredPost = {
    id: "complete-guide-education-loan-2024",
    title: "Complete Guide to Education Loans in India 2024",
    excerpt: "Everything you need to know about education loans - from eligibility criteria to repayment strategies. A comprehensive guide for students and parents.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
    author: "FundMyCampus Team",
    date: "January 15, 2024",
    readTime: "12 min read",
    category: "Guide"
  };

  const blogPosts = [
    {
      id: "study-abroad-loan-tips",
      title: "10 Tips to Get Your Study Abroad Loan Approved Quickly",
      excerpt: "Learn the insider tips that can help you get faster approval for your international education loan.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
      author: "Priya Sharma",
      date: "January 10, 2024",
      readTime: "8 min read",
      category: "Study Abroad"
    },
    {
      id: "collateral-free-education-loans",
      title: "Collateral-Free Education Loans: Everything You Need to Know",
      excerpt: "Understand which banks offer collateral-free loans, eligibility criteria, and maximum loan amounts available.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
      author: "Rahul Verma",
      date: "January 5, 2024",
      readTime: "6 min read",
      category: "Loans"
    },
    {
      id: "education-loan-tax-benefits",
      title: "How to Claim Tax Benefits on Your Education Loan",
      excerpt: "A detailed guide on Section 80E and how to maximize your tax savings on education loan interest.",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop&q=80",
      author: "Amit Kumar",
      date: "December 28, 2023",
      readTime: "5 min read",
      category: "Tax Planning"
    },
    {
      id: "iim-education-loan-guide",
      title: "Education Loan for IIMs: Complete Guide for MBA Aspirants",
      excerpt: "Special loan schemes, interest rates, and tips for financing your MBA at India's premier B-schools.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      author: "Sneha Patel",
      date: "December 20, 2023",
      readTime: "10 min read",
      category: "MBA"
    },
    {
      id: "mbbs-abroad-loan",
      title: "MBBS Abroad: Financing Your Medical Education in Top Countries",
      excerpt: "Compare costs and loan options for MBBS in Russia, Ukraine, Philippines, and other popular destinations.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
      author: "Dr. Ananya Singh",
      date: "December 15, 2023",
      readTime: "9 min read",
      category: "Medical"
    },
    {
      id: "education-loan-interest-rates-comparison",
      title: "Education Loan Interest Rates 2024: Bank-wise Comparison",
      excerpt: "Compare interest rates from SBI, HDFC, ICICI, Axis, and other major banks for education loans.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      author: "Vikram Mehta",
      date: "December 10, 2023",
      readTime: "7 min read",
      category: "Comparison"
    }
  ];

  const categories = [
    { name: "All", count: 15 },
    { name: "Study Abroad", count: 5 },
    { name: "Loans", count: 4 },
    { name: "MBA", count: 3 },
    { name: "Medical", count: 2 },
    { name: "Tax Planning", count: 1 }
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl text-black mb-4"
            >
              Education Loan <span className="text-teal-600">Blog</span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg text-gray-800 max-w-2xl mx-auto"
            >
              Expert insights, tips, and guides to help you navigate education financing
            </motion.p>
          </motion.div>

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href={`/blogs/${featuredPost.id}`}>
              <div className="relative rounded-2xl overflow-hidden bg-black group cursor-pointer">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-teal-500 text-black text-xs font-bold rounded-full mb-4 w-fit">
                      Featured
                    </span>
                    <h2 className="font-serif text-2xl lg:text-3xl text-white mb-4 group-hover:text-teal-500 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-300 mb-6 line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="font-serif text-xl text-black mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-teal-50 transition-colors text-left">
                        <span className="text-gray-800">{category.name}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-6 bg-teal-50 rounded-xl">
                  <h4 className="font-semibold text-black mb-2">Newsletter</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Get the latest education loan tips delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-2 text-sm"
                  />
                  <Button variant="primary" size="sm" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="lg:col-span-3">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    variants={staggerItem}
                    className="group"
                  >
                    <Link href={`/blogs/${post.id}`}>
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-800 rounded">
                            {post.category}
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="font-serif text-lg text-black mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* Load More */}
              <div className="text-center mt-10">
                <Button variant="secondary" size="lg">
                  Load More Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Blog FAQs"
        subtitle="Common questions about our education loan resources"
        faqs={[
          {
            question: "How often do you publish new articles?",
            answer: "We publish 2-3 new articles every week covering various aspects of education loans, study abroad guidance, and financial planning tips for students and parents."
          },
          {
            question: "Can I contribute to the blog?",
            answer: "Yes, we welcome guest contributions from education consultants, financial advisors, and students who want to share their experiences. Contact us with your article idea for consideration."
          },
          {
            question: "Are the interest rates mentioned in articles current?",
            answer: "We update our articles regularly to reflect current interest rates and policies. However, rates change frequently, so always verify with the bank or our tools page for the latest figures."
          },
          {
            question: "Can I request an article on a specific topic?",
            answer: "Absolutely! We love hearing from our readers. Send us your topic suggestions through our contact page, and we'll consider covering it in our upcoming articles."
          },
          {
            question: "How can I stay updated with new articles?",
            answer: "Subscribe to our newsletter to receive the latest articles directly in your inbox. You can also follow us on social media for updates and quick tips."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-teal-500">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
              Ready to Apply for Your Education Loan?
            </h2>
            <p className="text-black/80 mb-8 max-w-2xl mx-auto">
              Use our free tools to calculate EMI, check eligibility, and compare loan options from top banks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools">
                <Button variant="secondary" size="lg">
                  Explore Loan Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="border-2 border-black text-black hover:bg-black hover:text-white">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
