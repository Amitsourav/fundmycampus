"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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

export const Reviews: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const reviews = [
    {
      text: "FundMyCampus made my dream of studying at Harvard possible. The loan approval was quick and the interest rates were very competitive. Highly recommended!",
      name: "Arjun Patel",
      course: "MBA at Harvard Business School",
      rating: 5,
      bgColor: "bg-blue-100",
      avatar: "AP",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      text: "Amazing support throughout my application process. They guided me through every step and made the entire loan process stress-free. Thank you team!",
      name: "Priya Sharma", 
      course: "MS in Computer Science at Stanford",
      rating: 5,
      bgColor: "bg-green-100",
      avatar: "PS",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      text: "Professional service with transparent terms. No hidden charges and flexible repayment options. Got my loan approved within 48 hours as promised.",
      name: "Rohit Kumar",
      course: "MSc Data Science at Oxford",
      rating: 5,
      bgColor: "bg-purple-100", 
      avatar: "RK",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      text: "Excellent customer service and competitive rates. The team was very responsive and helped me secure funding for my medical studies in Australia.",
      name: "Sneha Gupta",
      course: "MBBS at University of Melbourne",
      rating: 5,
      bgColor: "bg-pink-100",
      avatar: "SG",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      text: "Quick approval process and hassle-free documentation. FundMyCampus turned my dream of studying in Canada into reality. Grateful for their support!",
      name: "Vikash Singh",
      course: "Engineering at University of Toronto",
      rating: 5,
      bgColor: "bg-yellow-100",
      avatar: "VS",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-16 left-16 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"
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
            What Our <span className="text-yellow-500">Students</span> Say
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Real stories from students who achieved their dreams with our education loan support
          </motion.p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left side - Previous review preview */}
              <div className="hidden lg:block">
                <div className="bg-gray-50 rounded-2xl p-6 opacity-50">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{reviews[(currentSlide - 1 + reviews.length) % reviews.length].text.substring(0, 100)}..."
                  </p>
                </div>
              </div>

              {/* Center - Current review with premium effects */}
              <div className="text-center relative">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 150, scale: 0.8, rotateY: 20 }}
                  animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, x: -150, scale: 0.8, rotateY: -20 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 25,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  {/* Premium background glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-gray-900/5 rounded-3xl blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Student avatar with premium animations */}
                  <motion.div 
                    className="relative z-10 w-24 h-24 rounded-full overflow-hidden mx-auto mb-8 shadow-2xl border-4 border-white group"
                    initial={{ scale: 0, rotate: -360, y: -50 }}
                    animate={{ scale: 1, rotate: 0, y: 0 }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      rotateY: 10,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                    }}
                  >
                    {/* Animated glowing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-yellow-500/40"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Premium floating particles around avatar */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-500/70 rounded-full"
                        style={{
                          top: `${15 + i * 20}%`,
                          left: `${10 + i * 20}%`,
                        }}
                        animate={{
                          y: [-8, 8, -8],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.5, 1.2, 0.5],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.4
                        }}
                      />
                    ))}
                    
                    <motion.img
                      src={reviews[currentSlide].image}
                      alt={`${reviews[currentSlide].name} profile`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      initial={{ scale: 1.2, filter: "brightness(0.7) saturate(0.5)" }}
                      animate={{ scale: 1, filter: "brightness(1) saturate(1)" }}
                      transition={{ duration: 0.8, delay: 0.4 }}
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
                      className={`w-full h-full ${reviews[currentSlide].bgColor} rounded-full flex items-center justify-center text-3xl font-bold text-gray-700 hidden`}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      {reviews[currentSlide].avatar}
                    </motion.div>
                  </motion.div>

                  {/* Premium star rating with animations */}
                  <motion.div 
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {[...Array(reviews[currentSlide].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 0.8 + i * 0.1,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 300
                        }}
                        whileHover={{
                          scale: 1.3,
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        <Star className="w-6 h-6 text-yellow-500 fill-current mx-0.5" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Review text with premium typewriter effect */}
                  <motion.div className="relative mb-8 max-w-lg mx-auto">
                    <motion.p 
                      className="text-gray-700 text-lg leading-relaxed italic relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      "{reviews[currentSlide].text.split('').map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: 1.2 + index * 0.015,
                            duration: 0.1
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}"
                    </motion.p>
                    
                    {/* Premium quote decorations */}
                    <motion.div
                      className="absolute -top-6 -left-6 text-6xl text-yellow-500/20 font-serif leading-none"
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
                    >
                      "
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-6 -right-6 text-6xl text-yellow-500/20 font-serif leading-none rotate-180"
                      initial={{ opacity: 0, scale: 0, rotate: 135 }}
                      animate={{ opacity: 1, scale: 1, rotate: 180 }}
                      transition={{ delay: 1.6, duration: 0.6, type: "spring" }}
                    >
                      "
                    </motion.div>
                  </motion.div>

                  {/* Student name and course with premium reveal */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Name with gradient text animation */}
                    <motion.h4 
                      className="font-serif text-2xl text-gray-800 mb-2 relative"
                      whileHover={{ 
                        scale: 1.05,
                        color: "#EAB308"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {reviews[currentSlide].name.split('').map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: 2 + index * 0.05,
                            duration: 0.3
                          }}
                          whileHover={{
                            y: -2,
                            transition: { duration: 0.2 }
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                      
                      {/* Decorative underline */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
                        initial={{ width: 0, x: "-50%" }}
                        animate={{ width: "100%", x: "-50%" }}
                        transition={{ delay: 2.3, duration: 0.8 }}
                      />
                    </motion.h4>
                    
                    {/* Course with slide-in effect */}
                    <motion.p 
                      className="text-gray-700 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.5, duration: 0.5 }}
                      whileHover={{
                        color: "#374151",
                        x: 2
                      }}
                    >
                      {reviews[currentSlide].course}
                    </motion.p>
                    
                    {/* Success badge */}
                    <motion.div
                      className="inline-block mt-3 px-4 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.8, duration: 0.4, type: "spring" }}
                    >
                      ✓ Funded Successfully
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right side - Next review preview */}
              <div className="hidden lg:block">
                <div className="bg-gray-50 rounded-2xl p-6 opacity-50">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{reviews[(currentSlide + 1) % reviews.length].text.substring(0, 100)}..."
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 hover:border-yellow-300 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              {/* Pagination dots */}
              <div className="flex space-x-3">
                {reviews.map((_, index) => (
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
                className="w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 hover:border-yellow-300 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Review Stats */}
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
                <AnimatedNumber value={4.9} suffix="/5" duration={2} />
              </h4>
              <p className="text-gray-700">Average Rating</p>
            </div>
            <div>
              <h4 className="font-serif text-2xl text-yellow-600 mb-2">
                <AnimatedNumber value={2500} suffix="+" duration={2.5} />
              </h4>
              <p className="text-gray-700">Happy Reviews</p>
            </div>
            <div>
              <h4 className="font-serif text-2xl text-yellow-600 mb-2">
                <AnimatedNumber value={99} suffix="%" duration={2} />
              </h4>
              <p className="text-gray-700">Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};