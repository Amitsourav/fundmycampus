/**
 * Premium CTA Section - Italian Luxury Design
 * Final call to action with sophisticated styling
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { fadeInUp } from "@/lib/animations";

export const CTA: React.FC = () => {
  return (
    <section className="py-16 md:py-32 bg-noir text-ivory">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-serif text-display-lg text-ivory mb-6">
            Your Educational Journey{" "}
            <em className="not-italic text-ivory/70">Awaits</em>
          </h2>
          
          <p className="text-xl text-ivory/80 leading-relaxed mb-12 max-w-2xl mx-auto">
            Join thousands of ambitious students who have transformed their academic 
            dreams into reality with FundMyCampus. Excellence deserves exceptional support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Start Your Journey
              </Button>
            </Link>
            <a 
              href="tel:+917827225354"
              className="text-ivory/80 hover:text-ivory transition-colors duration-500 text-sm uppercase tracking-wide-md"
            >
              Call +91 78272 25354
            </a>
          </div>

          {/* Subtle footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="border-t border-ivory/20 pt-8"
          >
            <p className="text-xs uppercase tracking-wide-lg text-ivory/60">
              Trusted by students at 500+ institutions worldwide since 2024
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};