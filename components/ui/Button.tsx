/**
 * Premium Button Component - Fundmycampus
 * Black/Teal/White color scheme
 * Bold, modern design with high contrast
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "@/lib/animations";

interface ButtonProps {
  variant?: "primary" | "primary-light" | "secondary" | "ghost";
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
  const baseStyles = "relative inline-flex items-center justify-center font-sans font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 active:bg-gray-900 shadow-soft hover:shadow-soft-lg font-semibold",
    "primary-light": "bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 shadow-soft hover:shadow-soft-lg font-semibold",
    secondary: "bg-black text-white border-2 border-teal-500 hover:bg-black-800 active:bg-black-700",
    ghost: "text-white hover:text-teal-400 hover:bg-black-800",
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