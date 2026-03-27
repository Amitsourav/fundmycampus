/**
 * Premium Header - Fundmycampus
 * White background with yellow accents
 * Clean, modern navigation
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown, MessageCircle, Send, Phone, LogIn, UserPlus, User, LayoutDashboard, Edit, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const courseOptions = [
    { label: "Education Loan For BCA", href: "/courses-loan/bca" },
    { label: "Education Loan For Hotel Management", href: "/courses-loan/hotel-management" },
    { label: "Education Loan For BDS", href: "/courses-loan/bds" },
    { label: "Education Loan For BBA", href: "/courses-loan/bba" },
    { label: "Education Loan MBA", href: "/courses-loan/mba" },
    { label: "Education Loan For B Tech", href: "/courses-loan/btech" },
    { label: "Education Loan MBBS", href: "/courses-loan/mbbs" },
    { label: "Education Loan For Bsc Nursing", href: "/courses-loan/bsc-nursing" },
    { label: "Education Loan For CA", href: "/courses-loan/ca" },
  ];

  const productOptions = [
    { label: "Student Loan Abroad", href: "/abroad-study-loan" },
    { label: "Student Loan Domestic", href: "/india-study-loan" },
    { label: "Student Loan for Courses", href: "/courses-loan", hasSubmenu: true, submenu: courseOptions },
  ];

  const navLinks = [
    { label: "Product", href: "/product", hasDropdown: true },
    { label: "Tools", href: "/tools" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Community Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 text-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-2.5 flex items-center justify-between">
          <p className="hidden md:flex items-center gap-1 text-sm font-medium">
            <span>✨</span>
            Join our community for exclusive tips &amp; updates!
            <span>🎓</span>
          </p>
          <div className="flex items-center gap-3 mx-auto md:mx-0">
            <a href="/#contact-form" className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300">
              <Phone className="h-3 w-3" />
              Get Free Consultation
            </a>
            <a href="https://chat.whatsapp.com/Ex1huVZeeGR8NWbeHrVGYP" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300">
              <MessageCircle className="h-3 w-3" />
              Join WhatsApp Group
            </a>
            <a href="https://t.me/fundmycampus" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300">
              <Send className="h-3 w-3" />
              Join Telegram Group
              <span className="bg-yellow-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold text-black">Soon</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className={`fixed top-[44px] left-1/2 -translate-x-1/2 z-50 transition-all duration-600 ${
          isScrolled
            ? "mt-2 w-[95%] max-w-screen-xl bg-gray-50/95 backdrop-blur-md shadow-soft-xl rounded-full py-2 px-4 md:px-6 border border-gray-300"
            : "mt-3 w-[95%] max-w-screen-xl bg-gray-50/90 backdrop-blur-sm rounded-full py-3 px-4 md:px-8 border border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="flex items-center">
                <img src="/images/logo.png" alt="FundMyCampus — Education Loan Platform" className="h-32 w-64 -my-11 object-contain" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link, index) => (
                <div key={index} className="relative">
                  {link.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsProductDropdownOpen(true)}
                      onMouseLeave={() => setIsProductDropdownOpen(false)}
                    >
                      <button className="flex items-center space-x-1 text-base font-medium text-gray-800 hover:text-teal-600 transition-colors duration-300 group">
                        <span>{link.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductDropdownOpen ? "rotate-180" : ""}`} />
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      </button>

                      <AnimatePresence>
                        {isProductDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl"
                          >
                            {productOptions.map((option, optionIndex) => (
                              <div key={optionIndex} className="relative group/submenu">
                                {option.hasSubmenu ? (
                                  <div className="relative">
                                    <button className="flex items-center justify-between w-full px-4 py-3 text-black hover:bg-teal-500/10 hover:text-teal-500 transition-all duration-200 border-b border-gray-200 text-left group-hover/submenu:bg-teal-500/10 group-hover/submenu:text-teal-500">
                                      <span>{option.label}</span>
                                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                    </button>
                                    <div className="absolute left-full top-0 ml-1 w-72 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto invisible opacity-0 group-hover/submenu:visible group-hover/submenu:opacity-100 transition-all duration-200 z-50">
                                      {option.submenu?.map((subOption, subIndex) => (
                                        <Link key={subIndex} href={subOption.href} className="block px-4 py-2.5 text-black hover:bg-teal-500/10 hover:text-teal-500 transition-all duration-200 border-b border-gray-200 last:border-0 text-sm">
                                          {subOption.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <Link href={option.href} className="block px-4 py-3 text-black hover:bg-teal-500/10 hover:text-teal-500 transition-all duration-200 border-b border-gray-200 last:border-0">
                                    <motion.span initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: optionIndex * 0.1 }}>
                                      {option.label}
                                    </motion.span>
                                  </Link>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link href={link.href} className="relative text-base font-medium text-gray-800 hover:text-teal-600 transition-colors duration-300 group">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {!loading && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
                      {user.name || user.email?.split("@")[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        <Link href="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                          <LayoutDashboard className="w-4 h-4" /> My Dashboard
                        </Link>
                        <button onClick={() => { setIsUserMenuOpen(false); signOut(); }} className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100">
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : !loading ? (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="!text-gray-800 hover:!text-teal-600 hover:!bg-gray-100">
                      <LogIn className="w-4 h-4 mr-1.5" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="sm">
                      <UserPlus className="w-4 h-4 mr-1.5" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : null}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-white">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 rounded-b-2xl mt-2"
            >
              <nav className="max-w-screen-xl mx-auto px-6 py-6">
                {navLinks.map((link, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                          className="flex items-center justify-between w-full py-3 text-black hover:text-teal-500 transition-colors duration-300 font-medium"
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isProductDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mt-2 space-y-2"
                            >
                              {productOptions.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                  {option.hasSubmenu ? (
                                    <div>
                                      <button
                                        onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
                                        className="flex items-center justify-between w-full py-2 text-gray-800 hover:text-teal-500 transition-colors duration-300 text-sm"
                                      >
                                        <span>{option.label}</span>
                                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isCoursesDropdownOpen ? "rotate-180" : ""}`} />
                                      </button>
                                      <AnimatePresence>
                                        {isCoursesDropdownOpen && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="ml-4 mt-1 space-y-1"
                                          >
                                            {option.submenu?.map((subOption, subIndex) => (
                                              <Link key={subIndex} href={subOption.href} className="block py-1.5 text-gray-700 hover:text-teal-500 transition-colors duration-300 text-xs" onClick={() => setIsMobileMenuOpen(false)}>
                                                {subOption.label}
                                              </Link>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  ) : (
                                    <Link href={option.href} className="block py-2 text-gray-800 hover:text-teal-500 transition-colors duration-300 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                                      {option.label}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link href={link.href} className="block py-3 text-black hover:text-teal-500 transition-colors duration-300 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3"
                >
                  {!loading && user ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="secondary" size="md" fullWidth className="!bg-white !text-black !border-gray-300">
                          <LayoutDashboard className="w-4 h-4 mr-1.5" />
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/profile/edit" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="secondary" size="md" fullWidth className="!bg-white !text-black !border-gray-300">
                          <Edit className="w-4 h-4 mr-1.5" />
                          Edit Profile
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="md"
                        fullWidth
                        className="!text-red-600 hover:!text-red-700"
                        onClick={() => { setIsMobileMenuOpen(false); signOut(); }}
                      >
                        <LogOut className="w-4 h-4 mr-1.5" />
                        Log Out
                      </Button>
                    </>
                  ) : !loading ? (
                    <>
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="secondary" size="md" fullWidth className="!bg-white !text-black !border-gray-300">
                          <LogIn className="w-4 h-4 mr-1.5" />
                          Login
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="primary" size="md" fullWidth>
                          <UserPlus className="w-4 h-4 mr-1.5" />
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  ) : null}
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
