/**
 * Premium section title component
 * Elegant typography with subtle animations
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { textReveal, fadeInUp } from "@/lib/animations";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignments = {
    left: "text-left",
    center: "text-center mx-auto",
  };
  
  return (
    <div className={`max-w-4xl ${alignments[align]} ${className}`}>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={textReveal}
        className="font-serif text-display-md text-noir mb-6"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};