"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { CreditCard, RefreshCw, Clock, Settings } from "lucide-react";

export const DreamsFlight: React.FC = () => {
  const [activeTab, setActiveTab] = useState("abroad");

  const features = [
    { icon: CreditCard, title: "100%", subtitle: "Financing" },
    { icon: RefreshCw, title: "Flexible", subtitle: "Repayments" },
    { icon: Clock, title: "Quick", subtitle: "Solutions" },
    { icon: Settings, title: "Customizable", subtitle: "Loans" },
  ];

  const tabContent = {
    abroad: {
      title: "Moving abroad for your higher education opens several doors. You can gain access to highly-acclaimed and globally recognized programmes, or you may enhance your career prospects for the future. We have designed a study abroad loan for students who are planning to pursue higher education outside the country. Even if you are applying for a collateral-free education loan, you can achieve all your academic aspirations with ease! We offer a student loan without collateral and with collateral, depending on your student loan requirements."
    },
    india: {
      title: "Pursuing higher education in India offers excellent opportunities at premier institutions. Our education loans for Indian universities provide comprehensive funding for your academic journey. Whether you're aiming for IITs, IIMs, or other top institutions, we ensure you have the financial support needed to achieve your educational goals without any financial constraints."
    }
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Premium Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large animated teal shapes - top left */}
        <motion.div 
          className="absolute top-16 left-16 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.2, 0.35, 0.15, 0.2],
            x: [-10, 20, -10],
            y: [10, -15, 10]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-24 left-24 w-48 h-48 bg-teal-400/30 rounded-full blur-2xl"
          animate={{
            scale: [1, 0.8, 1.1, 1],
            opacity: [0.3, 0.5, 0.2, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Animated yellow dots pattern - bottom left */}
        <motion.div 
          className="absolute bottom-32 left-16 w-32 h-32"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="grid grid-cols-4 gap-2 h-full w-full">
            {Array.from({length: 16}).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-3 h-3 bg-yellow/60 rounded-full"
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                viewport={{ once: true }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  },
                  opacity: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  },
                  rotate: {
                    duration: 0.8, 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 200
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Premium floating decorative elements */}
        <motion.div 
          className="absolute top-1/2 right-1/4 w-40 h-40 bg-yellow/20 rounded-full blur-xl"
          animate={{
            y: [-20, 20, -20],
            scale: [1, 1.3, 0.9, 1],
            opacity: [0.2, 0.4, 0.15, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-teal-300/25 rounded-full blur-lg"
          animate={{
            x: [-10, 15, -10],
            y: [10, -15, 10],
            rotate: [0, 270, 360],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Additional premium floating elements */}
        <motion.div 
          className="absolute top-1/4 left-1/2 w-20 h-20 bg-gray-100/40 rounded-full backdrop-blur-sm"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/2 left-1/4 w-16 h-16 bg-yellow/25 rounded-full backdrop-blur-sm"
          animate={{
            y: [-8, 12, -8],
            x: [4, -8, 4],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
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
            Let Your <span className="text-yellow-600">Dreams</span> Take Flight
          </motion.h2>
          <motion.p 
            variants={staggerItem}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Hyper-personalized financial solutions that power your education!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side - Premium Student Image */}
          <motion.div 
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="lg:col-span-5 relative lg:-mt-16"
          >
            <motion.div 
              className="relative group"
              whileHover={{ 
                scale: 1.02,
                rotateY: -3,
                rotateX: 2
              }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=90"
                alt="Students studying together with books and laptops for education"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                initial={{ scale: 1.1, filter: "brightness(0.9)" }}
                whileInView={{ scale: 1, filter: "brightness(1)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                whileHover={{
                  filter: "brightness(1.05) contrast(1.1) saturate(1.1)"
                }}
              />
              
              {/* Premium animated decorative overlays */}
              <motion.div 
                className="absolute -top-8 -left-8 w-32 h-32 bg-yellow/25 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.4, 0.9, 1],
                  opacity: [0.3, 0.5, 0.2, 0.3],
                  rotate: [0, 120, 240, 360]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-8 -right-8 w-40 h-40 bg-yellow/15 rounded-full blur-2xl"
                animate={{
                  scale: [1, 0.8, 1.3, 1],
                  opacity: [0.2, 0.4, 0.15, 0.2],
                  x: [-5, 10, -5],
                  y: [5, -10, 5]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              
              {/* Premium floating accent elements */}
              <motion.div 
                className="absolute top-6 left-6 w-12 h-12 bg-gray-100/60 rounded-full backdrop-blur-sm border border-gray-200/50"
                animate={{
                  y: [-3, 6, -3],
                  rotate: [0, 180, 360],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute bottom-6 left-6 w-16 h-16 bg-yellow/25 rounded-full backdrop-blur-sm"
                animate={{
                  scale: [1, 1.2, 0.9, 1],
                  rotate: [0, -180, -360],
                  opacity: [0.25, 0.45, 0.15, 0.25]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              {/* Study progress indicator */}
              <motion.div
                className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-gray-200"
                initial={{ opacity: 0, scale: 0, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-900">Learning</span>
                </div>
              </motion.div>
              
              {/* Hover overlay effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow/8 via-transparent to-gray-900/5 rounded-2xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            {/* Tabs */}
            <div className="flex bg-gray-50 p-1 rounded-xl mb-8 max-w-sm border border-gray-200">
              <button
                onClick={() => setActiveTab("abroad")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "abroad"
                    ? "bg-white text-black shadow-sm border border-yellow/20"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                Study Abroad
              </button>
              <button
                onClick={() => setActiveTab("india")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "india"
                    ? "bg-white text-black shadow-sm border border-yellow/20"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                Study in India
              </button>
            </div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <p className="text-gray-800 leading-relaxed">
                {tabContent[activeTab as keyof typeof tabContent].title}
              </p>
            </motion.div>

            {/* Premium Features Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                  }}
                  className="group text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-yellow-300 transition-all duration-500 cursor-pointer overflow-hidden relative"
                >
                  {/* Premium background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-yellow/8 via-transparent to-gray-900/3 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Animated icon with premium effects */}
                  <motion.div
                    className="relative z-10"
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.2
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-yellow/15 rounded-full flex items-center justify-center group-hover:bg-yellow/25 transition-colors duration-300"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(251, 191, 36, 0)",
                          "0 0 0 10px rgba(251, 191, 36, 0.1)",
                          "0 0 0 20px rgba(251, 191, 36, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      <feature.icon className="h-8 w-8 text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Premium text with animations */}
                  <motion.h4 
                    className="font-serif text-lg text-black mb-2 group-hover:text-yellow-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h4>
                  <motion.p 
                    className="text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.subtitle}
                  </motion.p>
                  
                  {/* Floating accent dot */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-yellow-500 rounded-full opacity-60"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={staggerItem}>
              <Button variant="primary" size="lg">
                Apply Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};