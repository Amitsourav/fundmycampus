import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Black palette
        black: {
          DEFAULT: "#000000",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#1A1A1A",
          900: "#000000",
        },
        // Secondary - Teal/Cyan palette
        teal: {
          DEFAULT: "#0D9488",
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        // Legacy yellow (kept for compatibility)
        yellow: {
          DEFAULT: "#0D9488",  // Mapped to teal
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
        // Accent - White palette
        white: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#F0F0F0",
          400: "#E5E5E5",
          500: "#D4D4D4",
          600: "#A3A3A3",
          700: "#737373",
          800: "#525252",
          900: "#262626",
        },
        // Supporting colors
        charcoal: {
          DEFAULT: "#1C1C1C",
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#3A3A3A",
          800: "#2C2C2C",
          900: "#1C1C1C",
        },
        gray: {
          DEFAULT: "#9CA3AF",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        // Functional colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        // System colors (mapped to new theme)
        primary: {
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#1A1A1A",
          900: "#000000",
          DEFAULT: "#000000",
        },
        secondary: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
          DEFAULT: "#0D9488",
        },
        // Legacy color mappings for compatibility
        ivory: "#FAFAFA",
        noir: "#0A0A0A",
        olive: "#3F4F44",
        gold: "#0D9488",
        ash: "#E5E7EB",
        graphite: "#3A3A3A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 4vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 3vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.75rem, 2.5vw, 2rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        "wide-sm": "0.025em",
        "wide-md": "0.05em",
        "wide-lg": "0.1em",
        "wide-xl": "0.15em",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "120": "30rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        "screen-xl": "1280px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionDuration: {
        "600": "600ms",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.23, 1, 0.320, 1)",
      },
      boxShadow: {
        "soft": "0 10px 30px rgba(0,0,0,0.05)",
        "soft-lg": "0 20px 50px rgba(0,0,0,0.08)",
        "soft-xl": "0 30px 70px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        "card": "16px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',
        },
      });
    },
  ],
};

export default config;