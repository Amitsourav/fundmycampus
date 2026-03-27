"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, CheckCircle, CreditCard, ArrowRight, Clock, Shield, Percent } from "lucide-react";

export const LoanJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      icon: FileText,
      title: "Apply Online",
      description: "Fill out a simple application form in just 5 minutes",
      color: "bg-teal-500",
    },
    {
      step: "02",
      icon: Search,
      title: "Quick Review",
      description: "Our team reviews your application within 24 hours",
      color: "bg-teal-500",
    },
    {
      step: "03",
      icon: CheckCircle,
      title: "Get Approved",
      description: "Receive approval with competitive interest rates",
      color: "bg-green-500",
    },
    {
      step: "04",
      icon: CreditCard,
      title: "Funds Disbursed",
      description: "Money transferred directly to your institution",
      color: "bg-green-500",
    },
  ];

  const highlights = [
    { icon: Clock, value: "48hrs", label: "Quick Approval" },
    { icon: Percent, value: "6.75%", label: "Starting Rate" },
    { icon: Shield, value: "100%", label: "Secure Process" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 md:py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
            Your <span className="text-teal-600">Easy Loan</span> Journey
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Get your education loan approved in 4 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Side - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-black" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-black">{item.value}</p>
                  <p className="text-gray-700 text-sm">{item.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Decorative Quote */}
            <div className="bg-black rounded-xl p-5 mt-4">
              <p className="text-teal-500 font-serif text-lg italic">
                "Making education dreams accessible to everyone"
              </p>
              <p className="text-gray-700 text-sm mt-2">— FundMyCampus</p>
            </div>
          </motion.div>

          {/* Center - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Phone Frame */}
            <div className="relative w-64 h-[520px] bg-black rounded-[3rem] p-3 shadow-2xl">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />

              {/* Phone Screen */}
              <div className="w-full h-full bg-white rounded-[2.3rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-11 bg-teal-500 flex items-center justify-center">
                  <span className="text-black font-semibold text-sm">FundMyCampus</span>
                </div>

                {/* App Content */}
                <div className="p-5">
                  <p className="text-gray-700 text-xs mb-3">LOAN APPLICATION</p>

                  {/* Progress Bar */}
                  <div className="flex gap-1 mb-6">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                          index <= activeStep ? "bg-teal-500" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Animated Step Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="text-center"
                    >
                      {/* Icon */}
                      <div className={`w-16 h-16 ${steps[activeStep].color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                        {React.createElement(steps[activeStep].icon, {
                          className: "w-8 h-8 text-white"
                        })}
                      </div>

                      {/* Step Number */}
                      <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800 mb-2">
                        Step {steps[activeStep].step}
                      </span>

                      {/* Title */}
                      <h3 className="font-bold text-lg text-black mb-2">
                        {steps[activeStep].title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-700 text-xs leading-relaxed">
                        {steps[activeStep].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Fake Button */}
                  <div className="absolute bottom-6 left-5 right-5">
                    <div className="w-full py-3 bg-black rounded-xl flex items-center justify-center gap-2">
                      <span className="text-white font-medium text-sm">Continue</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-14 h-14 bg-teal-500 rounded-xl shadow-lg flex items-center justify-center"
            >
              <CheckCircle className="w-7 h-7 text-black" />
            </motion.div>
          </motion.div>

          {/* Right Side - Steps List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {steps.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  index === activeStep
                    ? "bg-teal-500 shadow-lg"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                  index === activeStep ? "bg-black" : "bg-gray-100"
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    index === activeStep ? "text-teal-500" : "text-gray-800"
                  }`} />
                </div>
                <div className="flex-1">
                  <p className={`text-xs mb-0.5 ${
                    index === activeStep ? "text-black/60" : "text-gray-700"
                  }`}>
                    Step {item.step}
                  </p>
                  <h4 className={`font-semibold text-sm ${
                    index === activeStep ? "text-black" : "text-gray-800"
                  }`}>
                    {item.title}
                  </h4>
                </div>
                {index <= activeStep && (
                  <CheckCircle className={`w-5 h-5 ${
                    index === activeStep ? "text-black" : "text-green-500"
                  }`} />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
