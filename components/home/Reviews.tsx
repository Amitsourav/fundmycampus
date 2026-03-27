"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export const Reviews: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      text: "FundMyCampus made my dream of studying at Harvard possible. The loan approval was quick and the interest rates were very competitive. Highly recommended!",
      name: "Arjun Patel",
      course: "MBA at Harvard Business School",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
    {
      text: "Amazing support throughout my application process. They guided me through every step and made the entire loan process stress-free. Thank you team!",
      name: "Priya Sharma",
      course: "MS in Computer Science at Stanford",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop&q=80",
    },
    {
      text: "Professional service with transparent terms. No hidden charges and flexible repayment options. Got my loan approved within 48 hours as promised.",
      name: "Rohit Kumar",
      course: "MSc Data Science at Oxford",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      text: "Excellent customer service and competitive rates. The team was very responsive and helped me secure funding for my medical studies in Australia.",
      name: "Sneha Gupta",
      course: "MBBS at University of Melbourne",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    },
    {
      text: "Quick approval process and hassle-free documentation. FundMyCampus turned my dream of studying in Canada into reality. Grateful for their support!",
      name: "Vikash Singh",
      course: "Engineering at University of Toronto",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl text-black mb-4"
          >
            What Our <span className="text-teal-600">Students</span> Say
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-800 max-w-2xl mx-auto"
          >
            Real stories from students who achieved their dreams with our education loan support
          </motion.p>
        </motion.div>

        {/* Reviews Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="text-center">
            {/* Avatar */}
            <img
              src={reviews[currentSlide].image}
              alt={reviews[currentSlide].name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-md"
              width={80}
              height={80}
              loading="lazy"
            />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(reviews[currentSlide].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-teal-500 fill-current" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              "{reviews[currentSlide].text}"
            </blockquote>

            {/* Name & Course */}
            <p className="font-semibold text-black">{reviews[currentSlide].name}</p>
            <p className="text-gray-700 text-sm">{reviews[currentSlide].course}</p>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors border border-gray-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>

              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-teal-500 w-6" : "bg-gray-300 w-2"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors border border-gray-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <div className="bg-black rounded-xl p-8 md:p-10">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-serif text-2xl md:text-3xl text-teal-500 mb-1">4.9/5</p>
                <p className="text-gray-700 text-sm">Average Rating</p>
              </div>
              <div className="border-l border-r border-gray-800">
                <p className="font-serif text-2xl md:text-3xl text-teal-500 mb-1">2,500+</p>
                <p className="text-gray-700 text-sm">Happy Reviews</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl text-teal-500 mb-1">99%</p>
                <p className="text-gray-700 text-sm">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
