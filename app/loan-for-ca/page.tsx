"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, TrendingUp, BarChart, PieChart, Building } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function CAEducationLoanPage() {
  const caSpecializations = [
    {
      name: "Audit & Assurance",
      description: "Financial auditing, internal controls, risk assessment",
      icon: Shield,
      careerPath: "Audit Partner, Internal Auditor, Risk Consultant",
      avgSalary: "₹6-25 Lakhs/year"
    },
    {
      name: "Taxation",
      description: "Income tax, GST, international taxation, tax planning",
      icon: Calculator,
      careerPath: "Tax Consultant, Tax Advisor, Tax Partner",
      avgSalary: "₹5-20 Lakhs/year"
    },
    {
      name: "Financial Management",
      description: "Corporate finance, investment analysis, financial planning",
      icon: TrendingUp,
      careerPath: "CFO, Financial Controller, Investment Advisor",
      avgSalary: "₹8-35 Lakhs/year"
    },
    {
      name: "Management Consulting",
      description: "Business strategy, process improvement, advisory services",
      icon: BarChart,
      careerPath: "Management Consultant, Business Advisor, Strategy Consultant",
      avgSalary: "₹10-40 Lakhs/year"
    },
    {
      name: "Forensic Accounting",
      description: "Financial investigations, fraud detection, litigation support",
      icon: PieChart,
      careerPath: "Forensic Accountant, Fraud Investigator, Expert Witness",
      avgSalary: "₹8-30 Lakhs/year"
    },
    {
      name: "Corporate Finance",
      description: "M&A, valuations, capital markets, restructuring",
      icon: Building,
      careerPath: "Investment Banker, Corporate Finance Manager, Valuation Expert",
      avgSalary: "₹10-50 Lakhs/year"
    }
  ];

  const caLevels = [
    {
      level: "CPT/Foundation",
      description: "Common Proficiency Test - Entry level for CA course",
      duration: "4 Months",
      fees: "₹5,000-10,000",
      eligibility: "10+2 with 50% marks"
    },
    {
      level: "IPCC/Intermediate", 
      description: "Integrated Professional Competence Course",
      duration: "8 Months",
      fees: "₹15,000-25,000",
      eligibility: "CPT Pass + Graduation"
    },
    {
      level: "CA Final",
      description: "Final level of Chartered Accountancy",
      duration: "6-18 Months",
      fees: "₹20,000-30,000",
      eligibility: "IPCC Pass + 3 Years Article"
    }
  ];

  const topCAInstitutes = [
    {
      name: "Institute of Chartered Accountants of India (ICAI)",
      type: "Professional Body",
      fees: "₹40,000-70,000 (Total)",
      duration: "3-5 Years",
      accreditation: "Statutory Body",
      specialities: "Premier CA Institute, National Recognition"
    },
    {
      name: "CA Coaching Institutes - Arun Sharma",
      type: "Coaching Institute",
      fees: "₹1-2 Lakhs",
      duration: "Course Duration",
      accreditation: "Recognized Coaching",
      specialities: "Expert Faculty, High Success Rate"
    },
    {
      name: "CA Coaching Institutes - Ravi Taori",
      type: "Coaching Institute",
      fees: "₹80,000-1.5 Lakhs",
      duration: "Course Duration",
      accreditation: "Recognized Coaching",
      specialities: "Comprehensive Training, Mock Tests"
    },
    {
      name: "Online CA Coaching - Unacademy",
      type: "Online Platform",
      fees: "₹30,000-80,000",
      duration: "Flexible",
      accreditation: "Digital Learning",
      specialities: "Flexible Learning, Expert Teachers"
    },
    {
      name: "CA Coaching Institutes - Varun Jain",
      type: "Coaching Institute",
      fees: "₹1-2 Lakhs",
      duration: "Course Duration",
      accreditation: "Recognized Coaching",
      specialities: "Conceptual Learning, Result Oriented"
    },
    {
      name: "Local CA Coaching Institutes",
      type: "Regional Institutes",
      fees: "₹50,000-1 Lakh",
      duration: "Course Duration",
      accreditation: "Local Recognition",
      specialities: "Affordable Learning, Personal Attention"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹8 Lakhs", description: "Complete coverage for CA course fees, coaching, and living expenses" },
    { icon: Shield, title: "No Collateral Required", description: "Up to ₹7.5 Lakhs without any security" },
    { icon: Clock, title: "Flexible Processing", description: "Understanding the CA course structure and timing" },
    { icon: Award, title: "Professional Course Benefits", description: "Special terms for professional qualification courses" },
  ];

  const careerProspects = [
    { role: "Chartered Accountant (Practice)", avgSalary: "₹5-50+ LPA", growth: "Very High", demand: "Excellent" },
    { role: "Chief Financial Officer", avgSalary: "₹15-60 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Tax Consultant", avgSalary: "₹4-25 LPA", growth: "High", demand: "Very Good" },
    { role: "Investment Banker", avgSalary: "₹12-50 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Financial Controller", avgSalary: "₹8-30 LPA", growth: "High", demand: "Very Good" },
    { role: "Management Consultant", avgSalary: "₹10-40 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Audit Manager", avgSalary: "₹6-25 LPA", growth: "High", demand: "Good" },
    { role: "Company Secretary", avgSalary: "₹5-20 LPA", growth: "Moderate", demand: "Good" }
  ];

  const industryFacts = [
    {
      title: "High Prestige",
      value: "Elite Profession",
      description: "CA is among the most respected professional qualifications"
    },
    {
      title: "Earning Potential",
      value: "Unlimited Income",
      description: "Own practice offers unlimited earning potential"
    },
    {
      title: "Job Security",
      value: "100% Employment",
      description: "CAs enjoy excellent job security across industries"
    },
    {
      title: "Global Recognition",
      value: "Worldwide Scope",
      description: "Indian CA qualification recognized internationally"
    }
  ];

  const eligibilityCA = [
    "Completed 10+2 from any stream with minimum 50% marks for Foundation",
    "For Direct Intermediate: Graduation with 55% marks (50% for Commerce)",
    "Age limit: No specific age limit for CA Foundation/Intermediate",
    "For Article training: Must complete Intermediate level",
    "Good analytical and mathematical skills essential"
  ];

  const documentsCA = [
    "10th and 12th mark sheets and certificates",
    "Graduation degree and mark sheets (for Direct Intermediate)",
    "CA Foundation/Intermediate registration and admit cards",
    "Coaching institute admission letter with fee structure",
    "Income certificate and IT returns of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Identity proof and address proof of applicant"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section - Split Layout */}
      <section className="relative py-10 md:py-12 overflow-hidden bg-gradient-to-br from-white via-teal-50/30 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800"
                  alt="Accounting and finance workspace with calculator and documents"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  width={800}
                  height={500}
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="font-bold text-black">100%</div>
                    <div className="text-sm text-gray-700">Employment Rate</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-500 shadow-lg">
                  <Calculator className="h-8 w-8 text-black" />
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-serif text-display-md md:text-display-lg text-black mb-4"
              >
                Education Loan for CA
                <span className="block text-teal-600 mt-2">Chartered Accountancy</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-800 mb-8 leading-relaxed"
              >
                Achieve your dream of becoming a Chartered Accountant with comprehensive loan coverage
                up to ₹8 Lakhs for CA course, coaching, and preparation expenses.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <DollarSign className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">₹8 Lakhs</div>
                  <div className="text-xs text-gray-700">Max Loan</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <Clock className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">3-5 Years</div>
                  <div className="text-xs text-gray-700">Course Duration</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <Award className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">6.75%</div>
                  <div className="text-xs text-gray-700">Interest Rate</div>
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/#contact-form">
                  <Button variant="primary" size="lg">
                    Apply for CA Loan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#contact-form">
                  <Button variant="secondary" size="lg">
                    Check Eligibility
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-10 md:py-12 bg-gradient-to-tr from-teal-100 via-white to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              CA Education Loan Features
            </h2>
            <p className="text-lg text-gray-800">
              Specialized financing for professional accounting qualification
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
                <feature.icon className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-black mb-2">{feature.title}</h3>
                <p className="text-gray-800 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industry Facts */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Why Choose Chartered Accountancy?
            </h2>
            <p className="text-lg text-gray-800">
              Elite professional qualification with unlimited potential
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {industryFacts.map((fact, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 text-center border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 hover:bg-white/80 transition-all duration-500"
              >
                <h3 className="font-serif text-2xl text-teal-600 mb-2">{fact.value}</h3>
                <h4 className="font-medium text-black mb-3">{fact.title}</h4>
                <p className="text-gray-800 text-sm">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CA Course Structure */}
      <section className="py-10 md:py-12 bg-gradient-to-bl from-white via-teal-50 to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              CA Course Structure
            </h2>
            <p className="text-lg text-gray-800">
              Progressive three-level structure for comprehensive training
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {caLevels.map((level, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-teal-500/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner border border-teal-500/40">
                    <span className="text-teal-600 font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="font-serif text-xl text-black">{level.level}</h3>
                </div>
                <p className="text-gray-800 text-sm mb-4">{level.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-800">Duration:</span>
                    <span className="text-black">{level.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Fees:</span>
                    <span className="text-black">{level.fees}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-gray-800">Eligibility:</span>
                    <p className="text-gray-800 text-xs mt-1">{level.eligibility}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CA Specializations */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              CA Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-800">
              Diverse specialization options in accounting and finance
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {caSpecializations.map((spec, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500/20 to-teal-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-inner border border-teal-500/40">
                    <spec.icon className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="font-serif text-lg text-black">{spec.name}</h3>
                </div>
                <p className="text-gray-800 text-sm mb-4">{spec.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-500" />
                    <span className="text-green-600 text-xs">{spec.careerPath}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-teal-600" />
                    <span className="text-teal-600 text-xs">{spec.avgSalary}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top CA Institutes */}
      <section className="py-10 md:py-12 bg-gradient-to-r from-teal-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top CA Coaching Institutes
            </h2>
            <p className="text-lg text-gray-800">
              Premier institutes for CA preparation and training
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topCAInstitutes.map((institute, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_16px_64px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
              >
                <div className="mb-4">
                  <h3 className="font-serif text-lg text-black mb-2">{institute.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-teal-500/20 text-teal-600 px-2 py-1 rounded">{institute.type}</span>
                    <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">{institute.accreditation}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-800">Course Fee:</span>
                    <span className="text-black">{institute.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Duration:</span>
                    <span className="text-black">{institute.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-800">Specialities:</span>
                    <p className="text-gray-800 text-xs mt-1">{institute.specialities}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Career Prospects */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              CA Career Prospects
            </h2>
            <p className="text-lg text-gray-800">
              Unlimited opportunities across all industries
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white/70 backdrop-blur-xl rounded-card overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_16px_64px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
          >
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-6 py-4">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium">
                <div>Job Role</div>
                <div>Average Salary</div>
                <div>Growth Potential</div>
                <div>Market Demand</div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {careerProspects.map((career, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-6 py-4 hover:bg-teal-50 transition-colors duration-200"
                >
                  <div className="grid grid-cols-4 gap-4 items-center text-sm">
                    <div className="font-medium text-black">{career.role}</div>
                    <div className="text-teal-600">{career.avgSalary}</div>
                    <div className="text-green-600">{career.growth}</div>
                    <div className="text-blue-600">{career.demand}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-10 md:py-12 bg-gradient-to-br from-teal-50 via-white to-teal-100">
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
                CA Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityCA.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">{item}</span>
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
                {documentsCA.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="CA Education Loan FAQs"
        subtitle="Common questions about financing your Chartered Accountancy journey"
        faqs={[
          {
            question: "Can I get an education loan specifically for CA?",
            answer: "Yes, many banks offer education loans for professional courses like CA. The loan covers ICAI registration fees, coaching institute fees, study materials, and exam fees. Typical loan amounts range from ₹2-8 Lakhs depending on coaching choices."
          },
          {
            question: "What costs does a CA education loan cover?",
            answer: "CA loans cover ICAI registration and exam fees (₹50,000-70,000 total), coaching fees (₹1-3 Lakhs), study materials, articleship period expenses, and living costs. You can apply for the entire amount or stage-wise for each level."
          },
          {
            question: "Is CA articleship period covered under the loan moratorium?",
            answer: "Yes, the moratorium period typically covers the entire CA journey including the 3-year articleship. Since articleship provides a stipend (₹5,000-15,000/month), some students start partial repayment during this period."
          },
          {
            question: "What if I don't clear CA exams - how does it affect the loan?",
            answer: "If you continue pursuing CA after failing, your loan continues with extended moratorium. Many students take multiple attempts. If you discontinue CA, you'll need to start repayment. Banks understand the difficulty of CA exams."
          },
          {
            question: "Is the ROI good for CA education loan?",
            answer: "Excellent ROI. CA qualification costs ₹3-8 Lakhs total (with coaching) but starting salaries range from ₹6-12 LPA. In practice, CAs can earn significantly more. It's one of the best returns on education investment."
          },
          {
            question: "Can I pursue CA while working and still get a loan?",
            answer: "Yes, loans are available for CA Foundation/Intermediate while working. However, terms might differ since you have income. Some working professionals prefer self-financing the relatively affordable CA course instead of loans."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-10 md:py-12 bg-teal-500">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center text-black"
          >
            <h2 className="font-serif text-display-md mb-6">
              Start Your CA Journey Today
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and become a Chartered Accountant
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for CA Education Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}