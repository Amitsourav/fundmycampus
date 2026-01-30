"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, TrendingUp, Building, Globe, BarChart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function MBAEducationLoanPage() {
  const mbaSpecializations = [
    {
      name: "Finance & Investment Banking",
      description: "Corporate finance, investment analysis, financial markets",
      icon: TrendingUp,
      careerPath: "Investment Banker, Financial Analyst, Portfolio Manager",
      avgSalary: "₹12-50 Lakhs/year"
    },
    {
      name: "Marketing & Brand Management",
      description: "Digital marketing, brand strategy, consumer behavior",
      icon: Target,
      careerPath: "Brand Manager, Marketing Director, Digital Marketing Head",
      avgSalary: "₹8-35 Lakhs/year"
    },
    {
      name: "Human Resource Management",
      description: "Talent management, organizational development, leadership",
      icon: Users,
      careerPath: "HR Director, Chief People Officer, Talent Head",
      avgSalary: "₹10-30 Lakhs/year"
    },
    {
      name: "Operations & Supply Chain",
      description: "Supply chain optimization, logistics, process management",
      icon: BarChart,
      careerPath: "Operations Director, Supply Chain Head, Process Manager",
      avgSalary: "₹10-40 Lakhs/year"
    },
    {
      name: "Strategy & Consulting",
      description: "Business strategy, management consulting, transformation",
      icon: Building,
      careerPath: "Strategy Consultant, Business Analyst, Management Consultant",
      avgSalary: "₹15-60 Lakhs/year"
    },
    {
      name: "International Business",
      description: "Global markets, international trade, cross-cultural management",
      icon: Globe,
      careerPath: "Global Business Head, International Trade Manager, Export Director",
      avgSalary: "₹12-45 Lakhs/year"
    }
  ];

  const topMBAColleges = [
    {
      name: "Indian Institute of Management, Ahmedabad",
      type: "Government (IIM)",
      fees: "₹25-28 Lakhs",
      duration: "2 Years",
      accreditation: "AACSB & EQUIS",
      specialities: "Top Global Ranking, Premier Brand"
    },
    {
      name: "Indian Institute of Management, Bangalore",
      type: "Government (IIM)",
      fees: "₹24-27 Lakhs",
      duration: "2 Years", 
      accreditation: "AACSB & EQUIS",
      specialities: "Research Excellence, Industry Connect"
    },
    {
      name: "Indian Institute of Management, Calcutta",
      type: "Government (IIM)",
      fees: "₹24-27 Lakhs",
      duration: "2 Years",
      accreditation: "AACSB & EQUIS",
      specialities: "Legacy Institution, Strong Alumni"
    },
    {
      name: "Indian School of Business, Hyderabad",
      type: "Private",
      fees: "₹35-40 Lakhs",
      duration: "1 Year",
      accreditation: "AACSB & EQUIS",
      specialities: "International Faculty, Global Outlook"
    },
    {
      name: "XLRI - Xavier School of Management",
      type: "Private",
      fees: "₹25-30 Lakhs",
      duration: "2 Years",
      accreditation: "AACSB",
      specialities: "HR Excellence, Values-based Education"
    },
    {
      name: "Faculty of Management Studies, Delhi",
      type: "Government (DU)",
      fees: "₹1-2 Lakhs",
      duration: "2 Years",
      accreditation: "NAAC A+",
      specialities: "Affordable Excellence, Delhi University"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹50 Lakhs", description: "Complete coverage for MBA fees and living expenses" },
    { icon: Shield, title: "Collateral Options", description: "Flexible collateral options for higher amounts" },
    { icon: Clock, title: "Fast Processing", description: "Priority processing for MBA applications" },
    { icon: Award, title: "Post-MBA Terms", description: "Repayment aligned with MBA salary expectations" },
  ];

  const careerProspects = [
    { role: "Investment Banker", avgSalary: "₹15-60 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Management Consultant", avgSalary: "₹18-70 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Product Manager", avgSalary: "₹12-50 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Strategy Manager", avgSalary: "₹15-55 LPA", growth: "High", demand: "Very Good" },
    { role: "Business Development Head", avgSalary: "₹12-45 LPA", growth: "High", demand: "Very Good" },
    { role: "Marketing Director", avgSalary: "₹10-40 LPA", growth: "High", demand: "Good" },
    { role: "Operations Director", avgSalary: "₹12-45 LPA", growth: "High", demand: "Good" },
    { role: "General Manager", avgSalary: "₹15-50 LPA", growth: "Very High", demand: "Excellent" }
  ];

  const industryFacts = [
    {
      title: "ROI Excellence",
      value: "300-500% ROI",
      description: "Top MBA programs offer exceptional return on investment"
    },
    {
      title: "Salary Jump",
      value: "200-400% Hike",
      description: "Average salary increase post-MBA from premier institutes"
    },
    {
      title: "Leadership Roles",
      value: "C-Suite Ready",
      description: "MBA graduates fast-tracked to senior management roles"
    },
    {
      title: "Global Opportunities",
      value: "Worldwide Scope",
      description: "MBA opens doors to international career opportunities"
    }
  ];

  const eligibilityMBA = [
    "Bachelor's degree in any discipline with minimum 50% marks",
    "Valid CAT/XAT/GMAT/GRE scores as per institute requirements",
    "Minimum 2-3 years work experience (for executive MBA programs)",
    "Age typically between 21-30 years (varies by program)",
    "Strong academic record and leadership potential"
  ];

  const documentsMBA = [
    "Bachelor's degree certificates and mark sheets",
    "CAT/XAT/GMAT scorecard and percentile",
    "Work experience certificates and salary slips",
    "College admission letter with complete fee structure",
    "Income proof and IT returns of applicant/co-applicant",
    "Bank statements and financial documents",
    "Statement of Purpose and recommendation letters"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920"
            alt="Executive boardroom and business strategy environment"
            className="w-full h-full object-cover"
            loading="lazy"
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
              <Crown className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Education Loan for MBA
              <span className="block text-yellow-400 mt-2">Master of Business Administration</span>
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Accelerate your career to leadership positions with an MBA degree. Get comprehensive 
              loan coverage up to ₹50 Lakhs for your management education at premier business schools.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply for MBA Loan
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
              MBA Education Loan Features
            </h2>
            <p className="text-lg text-gray-600">
              Premium financing for elite business education
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

      {/* Industry Facts */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Why Choose MBA?
            </h2>
            <p className="text-lg text-gray-600">
              Transformational career impact and growth potential
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
                <h3 className="font-serif text-2xl text-yellow-600 mb-2">{fact.value}</h3>
                <h4 className="font-medium text-black mb-3">{fact.title}</h4>
                <p className="text-gray-600 text-sm">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MBA Specializations */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              MBA Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-600">
              Elite specializations for senior management roles
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mbaSpecializations.map((spec, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-yellow-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-inner border border-yellow-400/40">
                    <spec.icon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h3 className="font-serif text-lg text-black">{spec.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{spec.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-500" />
                    <span className="text-green-600 text-xs">{spec.careerPath}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-yellow-600" />
                    <span className="text-yellow-600 text-xs">{spec.avgSalary}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top MBA Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top MBA Institutes in India
            </h2>
            <p className="text-lg text-gray-600">
              Premier business schools for world-class management education
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topMBAColleges.map((college, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_16px_64px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
              >
                <div className="mb-4">
                  <h3 className="font-serif text-lg text-black mb-2">{college.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-yellow-400/20 text-yellow-600 px-2 py-1 rounded">{college.type}</span>
                    <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">{college.accreditation}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course Fee:</span>
                    <span className="text-black">{college.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="text-black">{college.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Specialities:</span>
                    <p className="text-gray-600 text-xs mt-1">{college.specialities}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Career Prospects */}
      <section className="py-20 bg-gradient-to-tr from-yellow-100 via-white to-yellow-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              MBA Career Prospects
            </h2>
            <p className="text-lg text-gray-600">
              Premium opportunities across industries and sectors
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white/70 backdrop-blur-xl rounded-card overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_16px_64px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
          >
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-6 py-4">
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
                  className="px-6 py-4 hover:bg-yellow-50 transition-colors duration-200"
                >
                  <div className="grid grid-cols-4 gap-4 items-center text-sm">
                    <div className="font-medium text-black">{career.role}</div>
                    <div className="text-yellow-600">{career.avgSalary}</div>
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
                MBA Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityMBA.map((item, index) => (
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
                {documentsMBA.map((item, index) => (
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
              Transform Your Career with MBA
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and accelerate to leadership positions
            </p>
            <Button variant="secondary" size="lg">
              Apply for MBA Education Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}