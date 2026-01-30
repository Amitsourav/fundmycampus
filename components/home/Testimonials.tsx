"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AnimatedNumber: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ 
  value, 
  suffix = "", 
  duration = 2 
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      text: "Bank-level security with end-to-end encryption for all your financial data and documents.",
      title: "100% Secure Process",
      icon: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      fallbackIcon: "🛡️"
    },
    {
      text: "Get quick decisions on your loan applications with our streamlined digital process.",
      title: "48-Hour Approval", 
      icon: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      fallbackIcon: "⏱️"
    },
    {
      text: "Starting from 8.5% per annum with flexible EMI options tailored to your future income.",
      title: "Competitive Rates",
      icon: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      fallbackIcon: "💰"
    },
    {
      text: "Study in 50+ countries with partnerships across top universities worldwide.",
      title: "Global Coverage",
      icon: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      fallbackIcon: "🌍"
    },
    {
      text: "Dedicated education loan specialists guide you through every step of the process.",
      title: "Expert Counselors",
      icon: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      fallbackIcon: "👥"
    },
    {
      text: "Transparent pricing with no processing fees or hidden charges throughout your loan tenure.",
      title: "No Hidden Charges",
      icon: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      fallbackIcon: "✅"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-16 left-16 w-32 h-32 bg-yellow-200/30 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-16 right-16 w-40 h-40 bg-pink-200/30 rounded-full blur-xl"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200/20 rounded-full blur-lg"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="font-serif text-4xl md:text-5xl text-black mb-4"
          >
            Why Choose <span className="text-yellow-500">FundMyCampus</span>?
          </motion.h2>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left side - Previous testimonial preview */}
              <div className="hidden lg:block">
                <div className="bg-gray-50 rounded-2xl p-6 opacity-50">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {features[(currentSlide - 1 + features.length) % features.length].text}
                  </p>
                </div>
              </div>

              {/* Center - Current testimonial with premium effects */}
              <div className="text-center relative">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 120, scale: 0.9, rotateY: 15 }}
                  animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, x: -120, scale: 0.9, rotateY: -15 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Premium animated background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-yellow/10 rounded-3xl blur-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Company logo/icon with premium animations */}
                  <motion.div 
                    className="relative z-10 w-24 h-24 rounded-full overflow-hidden mx-auto mb-8 shadow-2xl border-4 border-white group"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      rotateY: 10,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
                    }}
                  >
                    {/* Animated border ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-500/30"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <motion.img
                      src={features[currentSlide].icon}
                      alt={`${features[currentSlide].title} icon`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      initial={{ scale: 1.2, filter: "brightness(0.8)" }}
                      animate={{ scale: 1, filter: "brightness(1)" }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLDivElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <motion.div 
                      className={`w-full h-full ${features[currentSlide].bgColor} rounded-full flex items-center justify-center text-4xl hidden`}
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      {features[currentSlide].fallbackIcon}
                    </motion.div>
                    
                    {/* Premium floating particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow/60 rounded-full"
                        style={{
                          top: `${20 + i * 20}%`,
                          left: `${-10 + i * 5}%`,
                        }}
                        animate={{
                          y: [-10, 10, -10],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Feature title with premium typography animation */}
                  <motion.h4 
                    className="font-serif text-2xl text-gray-800 mb-6 relative"
                    initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0em" }}
                    transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.05,
                      color: "#0D9488"
                    }}
                  >
                    {features[currentSlide].title}
                    
                    {/* Underline animation */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-yellow to-transparent"
                      initial={{ width: 0, x: "-50%" }}
                      animate={{ width: "100%", x: "-50%" }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </motion.h4>

                  {/* Feature description with typewriter effect */}
                  <motion.div className="relative max-w-lg mx-auto">
                    <motion.p 
                      className="text-gray-800 text-lg leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    >
                      {features[currentSlide].text.split('').map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: 0.9 + index * 0.01,
                            duration: 0.1
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.p>
                    
                    {/* Premium quote marks */}
                    <motion.div
                      className="absolute -top-4 -left-4 text-4xl text-blue-500/20 font-serif"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.4 }}
                    >
                      "
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-4 -right-4 text-4xl text-blue-500/20 font-serif rotate-180"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3, duration: 0.4 }}
                    >
                      "
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right side - Next testimonial preview */}
              <div className="hidden lg:block">
                <div className="bg-gray-50 rounded-2xl p-6 opacity-50">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {features[(currentSlide + 1) % features.length].text}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              {/* Pagination dots */}
              <div className="flex space-x-3">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-yellow-500 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats or additional info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <h4 className="font-serif text-2xl text-yellow-600 mb-2">
                <AnimatedNumber value={15000} suffix="+" duration={2.5} />
              </h4>
              <p className="text-gray-700">Happy Students</p>
            </div>
            <div>
              <h4 className="font-serif text-2xl text-yellow-600 mb-2">
                <AnimatedNumber value={98} suffix="%" duration={2} />
              </h4>
              <p className="text-gray-700">Success Rate</p>
            </div>
            <div>
              <h4 className="font-serif text-2xl text-yellow-600 mb-2">
                <AnimatedNumber value={50} suffix="+" duration={1.5} />
              </h4>
              <p className="text-gray-700">Partner Institutions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};