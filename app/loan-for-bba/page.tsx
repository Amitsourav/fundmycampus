"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, TrendingUp, BarChart, PieChart, LineChart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function BBAEducationLoanPage() {
  const bbaSpecializations = [
    {
      name: "Finance & Banking",
      description: "Investment banking, financial analysis, corporate finance",
      icon: TrendingUp,
      careerPath: "Financial Analyst, Investment Banker, Financial Planner",
      avgSalary: "₹4-12 Lakhs/year"
    },
    {
      name: "Marketing & Sales",
      description: "Digital marketing, brand management, sales strategy",
      icon: Target,
      careerPath: "Marketing Manager, Sales Executive, Brand Manager",
      avgSalary: "₹3-10 Lakhs/year"
    },
    {
      name: "Human Resource Management",
      description: "Talent acquisition, employee relations, organizational behavior",
      icon: Users,
      careerPath: "HR Manager, Talent Acquisition Specialist, HR Business Partner",
      avgSalary: "₹3-8 Lakhs/year"
    },
    {
      name: "Operations Management",
      description: "Supply chain, logistics, process optimization",
      icon: BarChart,
      careerPath: "Operations Manager, Supply Chain Analyst, Process Manager",
      avgSalary: "₹4-10 Lakhs/year"
    },
    {
      name: "International Business",
      description: "Global trade, export-import, international markets",
      icon: PieChart,
      careerPath: "International Trade Specialist, Export Manager, Global Business Analyst",
      avgSalary: "₹5-12 Lakhs/year"
    },
    {
      name: "Entrepreneurship",
      description: "Business development, startup management, innovation",
      icon: LineChart,
      careerPath: "Entrepreneur, Business Consultant, Startup Founder",
      avgSalary: "₹5-20 Lakhs/year"
    }
  ];

  const topBBAColleges = [
    {
      name: "Shaheed Sukhdev College of Business Studies, Delhi",
      type: "Government (DU)",
      fees: "₹0.5-1 Lakh",
      duration: "3 Years",
      accreditation: "NAAC A+",
      specialities: "Premier DU College, Excellent Placement Record"
    },
    {
      name: "Christ University, Bangalore",
      type: "Private (Deemed)",
      fees: "₹3-4 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A+",
      specialities: "Industry Integration, International Programs"
    },
    {
      name: "Symbiosis Centre for Management Studies, Pune",
      type: "Private (Deemed)",
      fees: "₹4-5 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A",
      specialities: "Management Focus, Corporate Connections"
    },
    {
      name: "Narsee Monjee Institute of Management Studies",
      type: "Private (Deemed)",
      fees: "₹5-6 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A+",
      specialities: "Strong Alumni Network, Industry Partnerships"
    },
    {
      name: "IIM Indore - Integrated Program",
      type: "Government (IIM)",
      fees: "₹8-10 Lakhs",
      duration: "5 Years (IPM)",
      accreditation: "AACSB Accredited",
      specialities: "Premier Management Institute, Direct MBA Path"
    },
    {
      name: "Lovely Professional University, Punjab",
      type: "Private",
      fees: "₹2.5-3.5 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A+",
      specialities: "Comprehensive Programs, Modern Infrastructure"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹12 Lakhs", description: "Complete coverage for BBA course fees and related expenses" },
    { icon: Shield, title: "No Collateral Required", description: "Up to ₹7.5 Lakhs without security for recognized business schools" },
    { icon: Clock, title: "Quick Processing", description: "Loan approval within 7-10 working days" },
    { icon: Award, title: "Business Course Benefits", description: "Special terms considering management education value" },
  ];

  const careerProspects = [
    { role: "Business Analyst", avgSalary: "₹4-10 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Marketing Executive", avgSalary: "₹3-8 LPA", growth: "High", demand: "Very Good" },
    { role: "Financial Analyst", avgSalary: "₹4-12 LPA", growth: "High", demand: "Excellent" },
    { role: "HR Executive", avgSalary: "₹3-7 LPA", growth: "Moderate", demand: "Good" },
    { role: "Operations Executive", avgSalary: "₹3-8 LPA", growth: "High", demand: "Good" },
    { role: "Sales Manager", avgSalary: "₹4-10 LPA", growth: "High", demand: "Very Good" },
    { role: "Management Trainee", avgSalary: "₹3-6 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Business Consultant", avgSalary: "₹5-15 LPA", growth: "High", demand: "Very Good" }
  ];

  const industryFacts = [
    {
      title: "Management Roles",
      value: "High Demand",
      description: "Growing demand for management professionals across industries"
    },
    {
      title: "Salary Growth",
      value: "15-20% Annual",
      description: "Average salary increment in management roles"
    },
    {
      title: "MBA Pathway",
      value: "Direct Eligibility",
      description: "BBA graduates directly eligible for MBA programs"
    },
    {
      title: "Entrepreneurship",
      value: "Strong Foundation",
      description: "Excellent base for starting own business ventures"
    }
  ];

  const eligibilityBBA = [
    "Completed 10+2 from any stream with minimum 50% marks",
    "Mathematics and English as compulsory subjects in 12th grade",
    "Age between 17-22 years at the time of admission",
    "Valid entrance exam scores (CUET, IPM, university-specific tests)",
    "Good communication skills and leadership potential"
  ];

  const documentsBBA = [
    "10th and 12th mark sheets and certificates",
    "Entrance exam scorecard (CUET/IPM/university-specific)",
    "College/university admission letter with fee structure",
    "Income certificate and IT returns of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Character certificate from school/college",
    "Passport size photographs and identity proofs"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section - Split Layout */}
      <section className="relative py-10 md:py-12 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-teal-50 skew-x-12 -translate-x-20 hidden lg:block" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative order-2 lg:order-1">
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=90" alt="Business professionals in meeting" className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl" width={800} height={500} fetchPriority="high" />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-bold text-black">Management Ready</p>
                    <p className="text-sm text-gray-700">Top Business Schools</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="order-1 lg:order-2">
              <motion.div variants={staggerItem} className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full">
                  <Briefcase className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">BBA Education Loan</span>
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-tight">
                Bachelor of
                <span className="block text-teal-600">Business Administration</span>
              </motion.h1>

              <motion.p variants={staggerItem} className="text-lg text-gray-800 mb-8 leading-relaxed max-w-lg">
                Launch your management career with a BBA degree. Get comprehensive loan coverage
                up to ₹12 Lakhs for your business administration education at top institutions.
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">₹12 Lakhs</p>
                    <p className="text-xs text-gray-700">Max Loan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">3 Years</p>
                    <p className="text-xs text-gray-700">Course Duration</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact-form">
                  <Button variant="primary" size="lg">
                    Apply for BBA Loan
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
              BBA Education Loan Features
            </h2>
            <p className="text-lg text-gray-800">
              Specialized financing for business administration education
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
              Why Choose Business Administration?
            </h2>
            <p className="text-lg text-gray-800">
              Industry insights and career opportunities
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

      {/* BBA Specializations */}
      <section className="py-10 md:py-12 bg-gradient-to-bl from-white via-teal-50 to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BBA Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-800">
              Diverse specialization options in business management
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {bbaSpecializations.map((spec, index) => (
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

      {/* Top BBA Colleges */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top BBA Colleges in India
            </h2>
            <p className="text-lg text-gray-800">
              Premier institutions for business administration education
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topBBAColleges.map((college, index) => (
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
      <section className="py-10 md:py-12 bg-gradient-to-r from-teal-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BBA Career Prospects
            </h2>
            <p className="text-lg text-gray-800">
              Excellent opportunities across business sectors
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
                BBA Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityBBA.map((item, index) => (
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
                {documentsBBA.map((item, index) => (
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
        title="BBA Education Loan FAQs"
        subtitle="Common questions about financing your BBA degree"
        faqs={[
          {
            question: "What is the typical cost of BBA and loan requirement?",
            answer: "BBA programs cost ₹3-12 Lakhs for the 3-year course depending on the college. Top colleges like Christ University, Symbiosis, and NMIMS cost more. Education loans of ₹5-15 Lakhs typically cover tuition and living expenses."
          },
          {
            question: "Is BBA worth the education loan investment?",
            answer: "BBA provides a strong foundation for business careers or further studies like MBA. Starting salaries range from ₹3-6 LPA, with significant growth after MBA. Consider it an investment in your business education journey."
          },
          {
            question: "Can I get a combined loan for BBA + MBA?",
            answer: "Generally, loans are course-specific. However, some integrated BBA-MBA programs (5-year courses) are eligible for single education loans covering the entire duration. Check with colleges offering such programs."
          },
          {
            question: "Which BBA specializations have better loan terms?",
            answer: "All BBA specializations (Finance, Marketing, HR, Operations) have similar loan terms. However, BBA from colleges with better placement records may get faster approvals and potentially better interest rates."
          },
          {
            question: "What are the repayment options after BBA?",
            answer: "Standard repayment begins after the moratorium period (course duration + 6-12 months). With typical BBA loans of ₹5-10 Lakhs, EMIs range from ₹6,000-15,000, manageable even with entry-level salaries."
          },
          {
            question: "Are there scholarships to reduce the loan amount?",
            answer: "Yes, many BBA colleges offer merit-based scholarships covering 10-50% of fees. Corporate scholarships, state government schemes, and minority scholarships can also reduce your loan requirement significantly."
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
              Start Your Business Management Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and build your management career
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for BBA Education Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}