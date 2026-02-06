"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, User, Share2, Bookmark, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

// Blog post data (in a real app, this would come from a CMS or database)
const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}> = {
  "complete-guide-education-loan-2024": {
    title: "Complete Guide to Education Loans in India 2024",
    excerpt: "Everything you need to know about education loans - from eligibility criteria to repayment strategies.",
    content: [
      "Education loans have become an essential financial tool for students aspiring to pursue higher education in India and abroad. With rising education costs, understanding how education loans work is crucial for students and parents alike.",
      "## What is an Education Loan?",
      "An education loan is a type of loan designed to help students pay for post-secondary education and associated fees such as tuition, books, supplies, and living expenses. These loans are offered by banks, NBFCs, and government schemes.",
      "## Types of Education Loans",
      "**1. Domestic Education Loans:** For studies within India at recognized institutions. Loan amounts typically range from ₹4 Lakhs to ₹20 Lakhs depending on the course and institution.",
      "**2. Study Abroad Loans:** For international education with higher loan limits up to ₹1.5 Crore. These cover tuition, living expenses, travel, and other costs.",
      "**3. Collateral-Free Loans:** Available up to ₹7.5 Lakhs without requiring any security. Ideal for students without property assets.",
      "**4. Collateral-Based Loans:** For larger amounts, secured against property, FDs, or other assets.",
      "## Eligibility Criteria",
      "To qualify for an education loan, you typically need:",
      "- Indian citizenship",
      "- Admission to a recognized institution",
      "- A co-applicant (parent/guardian/spouse)",
      "- Good academic record",
      "- Age between 18-35 years",
      "## Interest Rates in 2024",
      "Current interest rates range from 6.75% to 13% depending on the lender and loan type. Government banks typically offer lower rates starting at 6.75%, while private banks and NBFCs may charge 9-13%.",
      "## Documents Required",
      "Essential documents include admission letter, fee structure, academic records, identity proof, address proof, income proof of co-applicant, and bank statements.",
      "## Repayment Options",
      "Most loans offer a moratorium period covering course duration plus 6-12 months. Repayment periods range from 5-15 years. EMI starts after the moratorium ends.",
      "## Tax Benefits",
      "Under Section 80E, you can claim tax deduction on the entire interest paid on education loans for up to 8 years from when you start repaying.",
      "## Tips for Getting Your Loan Approved",
      "1. Apply early - start the process as soon as you get admission",
      "2. Maintain a good credit score for your co-applicant",
      "3. Keep all documents ready and organized",
      "4. Compare offers from multiple lenders",
      "5. Consider the total cost, not just the interest rate"
    ],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80",
    author: "FundMyCampus Team",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    date: "January 15, 2024",
    readTime: "12 min read",
    category: "Guide",
    tags: ["Education Loan", "Student Finance", "Loan Guide", "2024"]
  },
  "study-abroad-loan-tips": {
    title: "10 Tips to Get Your Study Abroad Loan Approved Quickly",
    excerpt: "Learn the insider tips that can help you get faster approval for your international education loan.",
    content: [
      "Getting a study abroad loan approved quickly requires preparation, the right documentation, and understanding what lenders look for. Here are 10 proven tips to speed up your approval process.",
      "## 1. Start Early",
      "Begin your loan application process at least 3-4 months before your course starts. This gives you enough time to gather documents, compare lenders, and handle any issues that arise.",
      "## 2. Choose the Right Co-applicant",
      "Your co-applicant's profile significantly impacts approval. Choose someone with stable income, good credit history, and minimal existing debt. Parents or working spouses are ideal co-applicants.",
      "## 3. Maintain a Good Credit Score",
      "Ensure your co-applicant has a credit score above 750. Check the credit report beforehand and resolve any issues. A higher score can also get you better interest rates.",
      "## 4. Get Admission to a Ranked University",
      "Loans for top-ranked universities get faster approvals and better terms. QS Top 200 universities often qualify for premium loan products with higher limits and lower rates.",
      "## 5. Prepare Complete Documentation",
      "Missing documents are the #1 cause of delays. Create a checklist and gather all documents including admission letter, I-20/CAS, fee structure, transcripts, test scores, and financial documents.",
      "## 6. Show Strong Financial Background",
      "Lenders want to see repayment capability. Having savings, investments, or property strengthens your application even for collateral-free loans.",
      "## 7. Consider Multiple Lenders",
      "Don't put all eggs in one basket. Apply to 2-3 lenders simultaneously. This increases your chances and lets you compare offers.",
      "## 8. Be Honest in Your Application",
      "Never misrepresent information. Lenders verify everything, and dishonesty leads to rejection. Be upfront about any concerns.",
      "## 9. Use a Loan Aggregator",
      "Platforms like FundMyCampus can help you compare multiple lenders, ensure complete documentation, and expedite the process with their banking relationships.",
      "## 10. Follow Up Regularly",
      "After submission, follow up with the bank every 2-3 days. This keeps your application on track and helps you address any queries quickly."
    ],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80",
    author: "Priya Sharma",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    date: "January 10, 2024",
    readTime: "8 min read",
    category: "Study Abroad",
    tags: ["Study Abroad", "Loan Tips", "Quick Approval", "International Education"]
  }
};

// Default content for posts not in our database
const defaultPost = {
  title: "Article Coming Soon",
  excerpt: "This article is currently being written by our expert team.",
  content: [
    "We're working on bringing you comprehensive, well-researched content on this topic.",
    "## Stay Tuned",
    "Our team of education finance experts is preparing detailed insights and actionable advice for this topic.",
    "In the meantime, explore our other articles or use our free tools to plan your education financing.",
    "## Need Immediate Help?",
    "If you have questions about education loans, don't hesitate to contact our team for personalized guidance."
  ],
  image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80",
  author: "FundMyCampus Team",
  authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  date: "Coming Soon",
  readTime: "5 min read",
  category: "Guide",
  tags: ["Education Loan", "Student Finance"]
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug] || defaultPost;

  const relatedPosts = [
    {
      id: "collateral-free-education-loans",
      title: "Collateral-Free Education Loans: Everything You Need to Know",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop&q=80",
      date: "January 5, 2024"
    },
    {
      id: "education-loan-tax-benefits",
      title: "How to Claim Tax Benefits on Your Education Loan",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&auto=format&fit=crop&q=80",
      date: "December 28, 2023"
    },
    {
      id: "iim-education-loan-guide",
      title: "Education Loan for IIMs: Complete Guide for MBA Aspirants",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=80",
      date: "December 20, 2023"
    }
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-30">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blogs" className="inline-flex items-center text-teal-500 hover:text-teal-300 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <span className="inline-block px-3 py-1 bg-teal-500 text-black text-xs font-bold rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 max-w-4xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{post.author}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="prose prose-lg max-w-none">
                {post.content.map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="font-serif text-2xl text-black mt-8 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <p key={index} className="font-semibold text-black mb-2">
                        {paragraph.replace(/\*\*/g, "")}
                      </p>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="text-gray-700 ml-4">
                        {paragraph.replace("- ", "")}
                      </li>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share & Save */}
              <div className="mt-6 flex items-center gap-4">
                <Button variant="secondary" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* CTA Card */}
                <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                  <h3 className="font-serif text-xl text-black mb-3">
                    Need Help With Your Loan?
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Get free consultation from our education loan experts.
                  </p>
                  <Link href="/contact">
                    <Button variant="primary" size="sm" className="w-full">
                      Get Free Consultation
                    </Button>
                  </Link>
                </div>

                {/* Related Posts */}
                <div>
                  <h3 className="font-serif text-xl text-black mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blogs/${relatedPost.id}`}>
                        <div className="flex gap-4 group">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-black group-hover:text-teal-600 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h4>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {relatedPost.date}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-black rounded-xl p-6">
                  <h3 className="font-serif text-xl text-white mb-3">
                    Subscribe to Newsletter
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Get weekly tips on education loans and scholarships.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 rounded-lg mb-3 text-sm"
                  />
                  <Button variant="primary" size="sm" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-black">More Articles</h2>
            <Link href="/blogs" className="text-teal-600 hover:text-teal-700 flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post.id} href={`/blogs/${post.id}`}>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-black group-hover:text-teal-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <span className="text-xs text-gray-500 mt-2 block">{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
