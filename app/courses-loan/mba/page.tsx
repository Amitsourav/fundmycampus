"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crown, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, TrendingUp, Building, Globe, BarChart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
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
      {/* Hero Section - Split Layout */}
      <section className="relative py-10 md:py-12 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-50 -skew-x-12 translate-x-20 hidden lg:block" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={staggerItem} className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full">
                  <Crown className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">MBA Education Loan</span>
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-tight">
                Master of
                <span className="block text-teal-600">Business Administration</span>
              </motion.h1>

              <motion.p variants={staggerItem} className="text-lg text-gray-800 mb-8 leading-relaxed max-w-lg">
                Accelerate your career to leadership positions with an MBA degree. Get comprehensive
                loan coverage up to ₹50 Lakhs for your management education at premier business schools.
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">₹50 Lakhs</p>
                    <p className="text-xs text-gray-700">Max Loan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">48 Hours</p>
                    <p className="text-xs text-gray-700">Approval</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact-form">
                  <Button variant="primary" size="lg">
                    Apply for MBA Loan
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

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=90" alt="MBA students in business environment" className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-bold text-black">IIMs & Top B-Schools</p>
                    <p className="text-sm text-gray-700">100+ Partner Institutions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-10 md:py-12 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              MBA Education Loan Features
            </h2>
            <p className="text-lg text-gray-800">
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
              Why Choose MBA?
            </h2>
            <p className="text-lg text-gray-800">
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
                <h3 className="font-serif text-2xl text-teal-600 mb-2">{fact.value}</h3>
                <h4 className="font-medium text-black mb-3">{fact.title}</h4>
                <p className="text-gray-800 text-sm">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MBA Specializations */}
      <section className="py-10 md:py-12 bg-gradient-to-r from-teal-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              MBA Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-800">
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

      {/* Top MBA Colleges */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top MBA Institutes in India
            </h2>
            <p className="text-lg text-gray-800">
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
                    <span className="text-xs bg-teal-500/20 text-teal-600 px-2 py-1 rounded">{college.type}</span>
                    <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">{college.accreditation}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-800">Course Fee:</span>
                    <span className="text-black">{college.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Duration:</span>
                    <span className="text-black">{college.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-800">Specialities:</span>
                    <p className="text-gray-800 text-xs mt-1">{college.specialities}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Career Prospects */}
      <section className="py-10 md:py-12 bg-gradient-to-tr from-teal-100 via-white to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              MBA Career Prospects
            </h2>
            <p className="text-lg text-gray-800">
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
      <section className="py-10 md:py-12 bg-white">
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
                {documentsMBA.map((item, index) => (
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
        title="MBA Education Loan FAQs"
        subtitle="Common questions about financing your MBA degree"
        faqs={[
          {
            question: "What is the maximum loan amount for MBA programs?",
            answer: "For MBA programs at top B-schools like IIMs, ISB, and XLRI, you can get loans up to ₹50 Lakhs or more. For other AICTE-approved MBA programs, loans up to ₹20-30 Lakhs are available. Collateral-free loans are available up to ₹7.5-20 Lakhs depending on the institution's ranking."
          },
          {
            question: "Do IIM students get special loan benefits?",
            answer: "Yes, IIM students enjoy several benefits including higher loan limits (up to ₹50 Lakhs), lower interest rates (as low as 6.75%), 100% collateral-free loans, and faster approvals. Many banks have special tie-ups with IIMs for priority processing."
          },
          {
            question: "What is the ROI of taking an MBA loan?",
            answer: "MBA from top institutes offers excellent ROI. Average salaries at IIMs range from ₹25-35 LPA, with top packages exceeding ₹1 Crore. Even with a ₹25-30 Lakh loan, most graduates repay within 3-5 years while building substantial savings."
          },
          {
            question: "Can I get a loan for executive MBA programs?",
            answer: "Yes, education loans are available for executive MBA (EMBA) and part-time MBA programs from recognized institutions. However, since you're working, lenders may require higher income proof and the loan terms might differ from full-time MBA loans."
          },
          {
            question: "When should I apply for an MBA loan?",
            answer: "Apply for your education loan as soon as you receive your admission offer. This gives you time to compare options and complete documentation. Most banks require the final admission letter, so start the process after CAT/XAT results while gathering other documents."
          },
          {
            question: "Are there any scholarships that can reduce my loan burden?",
            answer: "Yes, most B-schools offer merit-based and need-based scholarships. IIMs offer scholarships up to ₹5-10 Lakhs. Additionally, corporate scholarships, government schemes, and bank interest subsidies for economically weaker sections can significantly reduce your loan requirement."
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
              Transform Your Career with MBA
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and accelerate to leadership positions
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for MBA Education Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}