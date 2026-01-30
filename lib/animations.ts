/**
 * Premium Animation System - Fundmycampus
 * Slow, subtle, confidence-driven motion
 * No bounce, no fast transitions, no excessive motion
 */

import { Variants, Transition } from "framer-motion";

// Premium easing curve - smooth and confident
const premiumEase: [number, number, number, number] = [0.23, 1, 0.320, 1];

// Base transition settings
const baseTransition: Transition = {
  duration: 0.6,
  ease: premiumEase,
};

// Fade animations
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: baseTransition,
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

// Slide animations
export const slideIn: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
};

// Scale animations - very subtle
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
};

// Container animations with stagger
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

// Text reveal animation (for headlines)
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// Line draw animation (for dividers/borders)
export const lineGrow: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// Image reveal animation
export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.02,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// Parallax-style animation
export const parallaxFade: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: premiumEase,
    },
  },
};

// Page transition settings
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: premiumEase,
    },
  },
};

// Subtle hover effects
export const hoverScale = {
  scale: 1.02,
  transition: {
    duration: 0.3,
    ease: premiumEase,
  },
};

export const hoverLift = {
  y: -4,
  transition: {
    duration: 0.3,
    ease: premiumEase,
  },
};

// Button interactions
export const buttonHover = {
  scale: 1.02,
  transition: {
    duration: 0.3,
    ease: premiumEase as any,
  },
};

export const buttonTap = {
  scale: 0.98,
  transition: {
    duration: 0.1,
    ease: "linear" as const,
  },
};

// Navigation link underline animation
export const linkUnderline: Variants = {
  initial: {
    scaleX: 0,
  },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: premiumEase,
    },
  },
};

// Card hover animation
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: baseTransition,
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    transition: {
      duration: 0.3,
      ease: premiumEase,
    },
  },
};

// Mask reveal animation (for sections)
export const maskReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// Smooth scroll reveal
export const scrollReveal: Variants = {
  offscreen: {
    opacity: 0,
    y: 30,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

// Section reveal animation
export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: premiumEase,
      staggerChildren: 0.15,
    },
  },
};