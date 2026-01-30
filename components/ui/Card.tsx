/**
 * Luxury card component with subtle elegance
 * Clean lines, high whitespace, premium feel
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { hoverLift } from "@/lib/animations";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = false,
  padding = "lg",
}) => {
  const paddings = {
    none: "",
    sm: "p-8",
    md: "p-12",
    lg: "p-16",
    xl: "p-20",
  };
  
  const Component = hoverable ? motion.div : "div";
  const hoverProps = hoverable ? { whileHover: hoverLift } : {};
  
  return (
    <Component
      className={`
        bg-white
        ${paddings[padding]}
        ${hoverable ? "cursor-pointer transition-all duration-700" : ""}
        ${className}
      `}
      {...hoverProps}
    >
      {children}
    </Component>
  );
};