"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, TrendingUp, BarChart, PieChart, LineChart } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920"
            alt="Professional business meeting and corporate office environment"
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
              <Briefcase className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Education Loan for BBA
              <span className="block text-yellow-400 mt-2">Bachelor of Business Administration</span>
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Launch your management career with a BBA degree. Get comprehensive loan coverage 
              up to ₹12 Lakhs for your business administration education at top institutions.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply for BBA Loan
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
      <section className="py-20 bg-gradient-to-tr from-yellow-100 via-white to-yellow-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BBA Education Loan Features
            </h2>
            <p className="text-lg text-gray-600">
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
              Why Choose Business Administration?
            </h2>
            <p className="text-lg text-gray-600">
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
                <h3 className="font-serif text-2xl text-yellow-600 mb-2">{fact.value}</h3>
                <h4 className="font-medium text-black mb-3">{fact.title}</h4>
                <p className="text-gray-600 text-sm">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BBA Specializations */}
      <section className="py-20 bg-gradient-to-bl from-white via-yellow-50 to-amber-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BBA Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-600">
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

      {/* Top BBA Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top BBA Colleges in India
            </h2>
            <p className="text-lg text-gray-600">
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
      <section className="py-20 bg-gradient-to-r from-amber-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BBA Career Prospects
            </h2>
            <p className="text-lg text-gray-600">
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
                BBA Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityBBA.map((item, index) => (
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
                {documentsBBA.map((item, index) => (
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
              Start Your Business Management Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and build your management career
            </p>
            <Button variant="secondary" size="lg">
              Apply for BBA Education Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}