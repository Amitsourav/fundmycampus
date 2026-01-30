"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function AbroadStudyLoanPage() {
  const countries = [
    {
      name: "United States",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop&q=80",
      universities: "Harvard, MIT, Stanford",
      avgLoan: "₹40-60 Lakhs"
    },
    {
      name: "United Kingdom",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
      universities: "Oxford, Cambridge, LSE",
      avgLoan: "₹35-50 Lakhs"
    },
    {
      name: "Canada",
      image: "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=800&auto=format&fit=crop&q=80",
      universities: "UofT, UBC, McGill",
      avgLoan: "₹30-45 Lakhs"
    },
    {
      name: "Australia",
      image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format&fit=crop&q=80",
      universities: "ANU, Melbourne, Sydney",
      avgLoan: "₹25-40 Lakhs"
    },
    {
      name: "Germany",
      image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&auto=format&fit=crop&q=80",
      universities: "TU Munich, Heidelberg",
      avgLoan: "₹15-25 Lakhs"
    },
    {
      name: "Singapore",
      image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
      universities: "NUS, NTU, SMU",
      avgLoan: "₹20-35 Lakhs"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹1.5 Crore", description: "Complete financing for tuition and living expenses" },
    { icon: Shield, title: "Zero Collateral", description: "Up to ₹7.5 Lakhs without any security" },
    { icon: Clock, title: "48-Hour Approval", description: "Quick decision on your loan application" },
    { icon: Award, title: "Competitive Rates", description: "Starting from 8.5% per annum" },
  ];

  const eligibility = [
    "Indian citizen with confirmed admission to foreign university",
    "Age between 18-35 years",
    "Co-applicant (parent/guardian) with stable income",
    "Good academic record (minimum 60% in previous education)",
    "Valid passport and visa documents",
  ];

  const documents = [
    "Admission letter from university",
    "Academic transcripts and certificates",
    "Income proof of co-applicant",
    "Bank statements (last 6 months)",
    "Passport and visa documents",
    "Property documents (if collateral required)",
  ];

  const process = [
    { step: "1", title: "Apply Online", description: "Fill our simple application form with basic details" },
    { step: "2", title: "Document Upload", description: "Submit required documents digitally" },
    { step: "3", title: "Quick Approval", description: "Get decision within 48 hours" },
    { step: "4", title: "Disbursement", description: "Funds transferred directly to university" },
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1920&auto=format&fit=crop&q=80"
            alt="International students at university abroad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={staggerItem} className="mb-6">
              <Globe className="h-16 w-16 text-yellow-600 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-black mb-6"
            >
              Study Abroad Education Loans
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-gray-600 mb-10 leading-relaxed"
            >
              Fulfill your dream of studying at top universities worldwide with our 
              comprehensive education loan solutions. Get up to ₹1.5 Crore with minimal documentation.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="secondary" size="lg">
                Check Eligibility
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Why Choose Our Study Abroad Loans
            </h2>
            <p className="text-lg text-gray-600">
              Premium features designed for global education aspirants
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {loanFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="bg-white/70 backdrop-blur-xl rounded-card p-8 text-center border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] transition-all duration-500 hover:scale-105 hover:bg-white/80"
              >
                <feature.icon className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Study Destinations We Cover
            </h2>
            <p className="text-lg text-gray-600">
              Finance your education at top universities across the globe
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {countries.map((country, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div 
                  variants={cardHover}
                  className="bg-white/70 backdrop-blur-xl rounded-card overflow-hidden cursor-pointer border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_16px_64px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <div className="absolute bottom-4 left-6 text-white">
                      <h3 className="font-serif text-2xl mb-1">{country.name}</h3>
                      <p className="text-sm text-ivory/90">{country.universities}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Loan</span>
                      <span className="text-lg font-serif text-yellow-600">{country.avgLoan}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-gray-600">
              From application to disbursement in just 48 hours
            </p>
            
            {/* Process Visual */}
            <div className="relative mt-12 mb-8 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=1200&auto=format&fit=crop&q=80"
                alt="International students completing loan application process"
                className="w-full h-[250px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif mb-2">Quick & Easy Process</h3>
                  <p className="text-white/90">Get approved in 48 hours and start your global education journey</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {process.map((item, index) => (
              <motion.div key={index} variants={staggerItem} className="text-center">
                <div className="w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center font-serif text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Eligibility */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
            >
              <h2 className="font-serif text-2xl text-black mb-6">
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibility.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Documents */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
            >
              <h2 className="font-serif text-2xl text-black mb-6">
                Documents Required
              </h2>
              <ul className="space-y-3">
                {documents.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-400">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center text-black"
          >
            <h2 className="font-serif text-display-md mb-6">
              Start Your Global Education Journey Today
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now and get approval within 48 hours
            </p>
            <Button variant="secondary" size="lg">
              Apply for Study Abroad Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}