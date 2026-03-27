"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Bookmark, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/lib/notion";

interface BlogDetailClientProps {
  post: BlogPost;
  relatedPosts: { id: string; title: string; image: string; date: string }[];
}

export function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
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
                  if (paragraph.startsWith("[TABLE]")) {
                    const tableData: string[][] = JSON.parse(paragraph.replace("[TABLE]", ""));
                    const headerRow = tableData[0];
                    const bodyRows = tableData.slice(1);
                    return (
                      <div key={index} className="my-6 overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-gray-900 text-white">
                            <tr>
                              {headerRow.map((cell, i) => (
                                <th key={i} className="px-4 py-3 font-semibold whitespace-nowrap">
                                  {cell}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {bodyRows.map((row, rowIdx) => (
                              <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                {row.map((cell, cellIdx) => (
                                  <td key={cellIdx} className="px-4 py-3 text-gray-700 border-t border-gray-100">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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

              {/* About FundMyCampus */}
              <div className="mt-12 mb-8 border-l-4 border-teal-500 pl-6 md:pl-8 py-4">
                <h4 className="font-serif text-lg md:text-xl text-black mb-3 tracking-wide font-bold">
                  About FundMyCampus
                </h4>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                  <span className="font-bold text-black">FundMyCampus</span> is an IIM Bangalore alum–founded education loan platform that helps students get an education loan at the lowest interest rate by comparing offers from 15+ banks and NBFCs for courses in India and abroad. We provide end-to-end education loan assistance — eligibility check, document support, loan application, sanction, and disbursement — so you avoid delays, confusion, and hidden charges. Our process is transparent and student-first, focused on helping you save money, time, and stress. Whether you need a study abroad education loan or a loan for programs like MBA, MS, MBBS, FundMyCampus helps you choose the best education loan based on your profile and university.
                </p>
              </div>

              {/* CTA Banner */}
              <div className="my-10 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl py-5 px-6 md:px-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-4 md:gap-8">
                {/* Illustration */}
                <img
                  src="/images/graduation-illustration.svg"
                  alt="Education consultation"
                  className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0 object-contain"
                />

                {/* Text */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    Need Help With Your Education Loan?
                  </h3>
                  <p className="text-pink-100 text-sm font-semibold">
                    Get expert guidance on loans, scholarships & financial planning — free.
                  </p>
                </div>

                {/* Button */}
                <Link href="/#contact-form" className="flex-shrink-0">
                  <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-purple-700 font-semibold px-6 py-2.5 rounded-xl transition-colors duration-300 text-sm whitespace-nowrap">
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              {/* WhatsApp Community Banner */}
              <div className="my-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl py-5 px-6 md:px-10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <svg className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.2" />
                  <path d="M24 4C12.954 4 4 12.954 4 24c0 3.527.922 6.832 2.531 9.703L4 44l10.547-2.766A19.91 19.91 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4zm0 36.4a16.35 16.35 0 0 1-8.34-2.28l-.598-.355-6.198 1.625 1.653-6.04-.39-.62A16.32 16.32 0 0 1 7.6 24c0-9.05 7.35-16.4 16.4-16.4S40.4 14.95 40.4 24 33.05 40.4 24 40.4zm8.99-12.27c-.493-.247-2.916-1.44-3.369-1.603-.452-.164-.781-.247-1.11.247-.329.493-1.274 1.603-1.562 1.932-.288.329-.575.37-1.068.123-.493-.247-2.081-.767-3.965-2.447-1.465-1.307-2.454-2.921-2.742-3.414-.288-.493-.031-.76.217-1.005.222-.22.493-.575.74-.863.247-.288.329-.493.493-.822.165-.329.082-.617-.041-.863-.123-.247-1.11-2.676-1.521-3.663-.4-.963-.808-.833-1.11-.848-.288-.014-.617-.017-.946-.017-.329 0-.863.123-1.315.617-.452.493-1.727 1.688-1.727 4.117 0 2.43 1.768 4.777 2.015 5.106.247.329 3.48 5.314 8.432 7.451 1.178.509 2.097.813 2.814 1.04 1.182.375 2.258.322 3.108.195.948-.141 2.916-1.192 3.328-2.344.411-1.152.411-2.14.288-2.344-.123-.206-.452-.329-.946-.575z" fill="white" />
                </svg>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    Join Our WhatsApp Community
                  </h3>
                  <p className="text-green-100 text-sm font-semibold">
                    Get exclusive tips, updates & connect with other students.
                  </p>
                </div>

                <a href="https://chat.whatsapp.com/Ex1huVZeeGR8NWbeHrVGYP" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-green-700 font-semibold px-6 py-2.5 rounded-xl transition-colors duration-300 text-sm whitespace-nowrap">
                    Join Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
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
                {relatedPosts.length > 0 && (
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
                )}

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
                  <Button variant="primary-light" size="sm" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-black">More Articles</h2>
              <Link href="/blogs" className="text-teal-600 hover:text-teal-700 flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blogs/${rp.id}`}>
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-black group-hover:text-teal-600 transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <span className="text-xs text-gray-500 mt-2 block">{rp.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
