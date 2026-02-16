"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ChevronRight } from "lucide-react";
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
