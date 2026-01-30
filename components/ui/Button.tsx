/**
 * Premium Button Component - Fundmycampus
 * Black/Yellow/White color scheme
 * Bold, modern design with high contrast
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "@/lib/animations";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  disabled,
  onClick,
  type = "button"
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-sans font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-40 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-yellow text-black hover:bg-yellow-500 active:bg-yellow-600 shadow-soft hover:shadow-soft-lg font-semibold",
    secondary: "bg-black text-white border-2 border-yellow hover:bg-black-800 active:bg-black-700",
    ghost: "text-white hover:text-yellow hover:bg-black-800",
  };
  
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-3.5 text-base",
  };
  
  return (
    <motion.button
      whileHover={!disabled ? buttonHover : undefined}
      whileTap={!disabled ? buttonTap : undefined}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
};