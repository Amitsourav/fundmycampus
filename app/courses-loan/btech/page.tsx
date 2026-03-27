"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Zap, Cog, Wrench, Code } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function BTechEducationLoanPage() {
  const btechSpecializations = [
    {
      name: "Computer Science & Engineering",
      description: "Software development, AI/ML, data structures, algorithms",
      icon: Code,
      careerPath: "Software Engineer, Data Scientist, Tech Lead, Product Manager",
      avgSalary: "₹6-25 Lakhs/year"
    },
    {
      name: "Electronics & Communication",
      description: "Circuit design, telecommunications, embedded systems",
      icon: Zap,
      careerPath: "Electronics Engineer, Telecom Engineer, Hardware Designer",
      avgSalary: "₹4-15 Lakhs/year"
    },
    {
      name: "Mechanical Engineering",
      description: "Machine design, manufacturing, automotive, aerospace",
      icon: Cog,
      careerPath: "Mechanical Engineer, Design Engineer, Manufacturing Engineer",
      avgSalary: "₹4-12 Lakhs/year"
    },
    {
      name: "Civil Engineering",
      description: "Construction, infrastructure, structural design, project management",
      icon: Wrench,
      careerPath: "Civil Engineer, Construction Manager, Structural Engineer",
      avgSalary: "₹3-10 Lakhs/year"
    },
    {
      name: "Information Technology",
      description: "Web development, database management, network systems",
      icon: Target,
      careerPath: "IT Specialist, Network Engineer, System Administrator",
      avgSalary: "₹5-20 Lakhs/year"
    },
    {
      name: "Chemical Engineering",
      description: "Process engineering, petroleum, pharmaceuticals, materials",
      icon: Users,
      careerPath: "Chemical Engineer, Process Engineer, Research Scientist",
      avgSalary: "₹4-15 Lakhs/year"
    }
  ];

  const topBTechColleges = [
    {
      name: "Indian Institute of Technology, Bombay",
      type: "Government (IIT)",
      fees: "₹8-10 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A++, NBA",
      specialities: "Premier Engineering Institute, Global Recognition"
    },
    {
      name: "Indian Institute of Technology, Delhi",
      type: "Government (IIT)",
      fees: "₹8-10 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A++, NBA",
      specialities: "Research Excellence, Industry Connect"
    },
    {
      name: "National Institute of Technology, Trichy",
      type: "Government (NIT)",
      fees: "₹5-6 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A+, NBA",
      specialities: "Top NIT, Strong Alumni Network"
    },
    {
      name: "Birla Institute of Technology & Science, Pilani",
      type: "Private (Deemed)",
      fees: "₹15-18 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A, NBA",
      specialities: "Industry Partnerships, Innovation Focus"
    },
    {
      name: "VIT University, Vellore",
      type: "Private (Deemed)",
      fees: "₹8-12 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A+, NBA",
      specialities: "International Programs, Modern Infrastructure"
    },
    {
      name: "Delhi Technological University",
      type: "Government (State)",
      fees: "₹3-4 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A+, NBA",
      specialities: "Affordable Excellence, Industry Integration"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹30 Lakhs", description: "Complete coverage for B.Tech fees and engineering expenses" },
    { icon: Shield, title: "No Collateral Required", description: "Up to ₹7.5 Lakhs without security for premier engineering colleges" },
    { icon: Clock, title: "Quick Processing", description: "Fast approval within 10-15 working days" },
    { icon: Award, title: "Engineering Course Benefits", description: "Special terms recognizing high employment potential" },
  ];

  const careerProspects = [
    { role: "Software Engineer", avgSalary: "₹6-25 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Data Scientist", avgSalary: "₹8-30 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Product Manager", avgSalary: "₹10-40 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Mechanical Engineer", avgSalary: "₹4-12 LPA", growth: "Moderate", demand: "Good" },
    { role: "Electronics Engineer", avgSalary: "₹4-15 LPA", growth: "High", demand: "Good" },
    { role: "Civil Engineer", avgSalary: "₹3-10 LPA", growth: "Moderate", demand: "Good" },
    { role: "System Analyst", avgSalary: "₹5-18 LPA", growth: "High", demand: "Very Good" },
    { role: "Tech Lead", avgSalary: "₹12-50 LPA", growth: "Very High", demand: "Excellent" }
  ];

  const industryFacts = [
    {
      title: "High Employability",
      value: "95%+ Placement",
      description: "Top engineering colleges report excellent placement rates"
    },
    {
      title: "Salary Growth",
      value: "20-30% Annual",
      description: "Engineering professionals enjoy rapid salary progression"
    },
    {
      title: "Global Opportunities",
      value: "Worldwide Demand",
      description: "Engineering skills are valued globally across industries"
    },
    {
      title: "Innovation Leaders",
      value: "Tech Entrepreneurs",
      description: "Many successful startups founded by engineering graduates"
    }
  ];

  const eligibilityBTech = [
    "Completed 10+2 with Physics, Chemistry, Mathematics (PCM) as compulsory subjects",
    "Minimum 75% marks in PCM (65% for reserved categories)",
    "Valid JEE Main/Advanced scores or state entrance exam qualification",
    "Age between 17-25 years at the time of admission",
    "Medical fitness for technical education"
  ];

  const documentsBTech = [
    "10th and 12th mark sheets and certificates",
    "JEE Main/Advanced scorecard and rank card",
    "College/engineering institute admission letter with fee structure",
    "Income certificate and IT returns of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Caste/category certificate (if applicable)",
    "Character certificate and medical fitness certificate"
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
                  <Cpu className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">B.Tech Education Loan</span>
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-tight">
                Bachelor of
                <span className="block text-teal-600">Technology</span>
              </motion.h1>

              <motion.p variants={staggerItem} className="text-lg text-gray-800 mb-8 leading-relaxed max-w-lg">
                Build your engineering career with a B.Tech degree from premier institutions.
                Get comprehensive loan coverage up to ₹30 Lakhs for your technology education.
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">₹30 Lakhs</p>
                    <p className="text-xs text-gray-700">Max Loan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">10-15 Days</p>
                    <p className="text-xs text-gray-700">Approval</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact-form">
                  <Button variant="primary" size="lg">
                    Apply for B.Tech Loan
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
              <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=90" alt="Engineering students in lab" className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-bold text-black">IITs & NITs</p>
                    <p className="text-sm text-gray-700">Premier Engineering Colleges</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-10 md:py-12 bg-gradient-to-bl from-white via-teal-50 to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              B.Tech Education Loan Features
            </h2>
            <p className="text-lg text-gray-800">
              Specialized financing for engineering education
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
              Why Choose Engineering?
            </h2>
            <p className="text-lg text-gray-800">
              Industry insights and career growth potential
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

      {/* B.Tech Specializations */}
      <section className="py-10 md:py-12 bg-gradient-to-tr from-teal-100 via-white to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              B.Tech Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-800">
              Diverse engineering disciplines for technology careers
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {btechSpecializations.map((spec, index) => (
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

      {/* Top B.Tech Colleges */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Engineering Colleges in India
            </h2>
            <p className="text-lg text-gray-800">
              Premier institutions for technology education
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topBTechColleges.map((college, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_16px_64px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
              >
                <div className="mb-4">
                  <h3 className="font-serif text-lg text-black mb-2">{college.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-teal-500/20 text-teal-700 px-2 py-1 rounded">{college.type}</span>
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
      <section className="py-10 md:py-12 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              B.Tech Career Prospects
            </h2>
            <p className="text-lg text-gray-800">
              Excellent opportunities across technology sectors
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
                B.Tech Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityBTech.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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
                {documentsBTech.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="B.Tech Education Loan FAQs"
        subtitle="Common questions about financing your engineering degree"
        faqs={[
          {
            question: "What is the maximum loan for B.Tech at IITs and NITs?",
            answer: "For B.Tech at IITs and NITs, you can get education loans up to ₹20-40 Lakhs. These premier institutions qualify for higher loan limits due to excellent placement records. Collateral-free loans up to ₹7.5 Lakhs are available for all IIT/NIT students."
          },
          {
            question: "Are loans available for private engineering colleges?",
            answer: "Yes, education loans are available for AICTE-approved private engineering colleges. Loan amounts typically range from ₹10-20 Lakhs. The college's NAAC accreditation and placement record influence the loan terms and interest rates."
          },
          {
            question: "What engineering branches have the best loan terms?",
            answer: "Computer Science, IT, Electronics, and Mechanical engineering from top colleges get favorable loan terms due to high placement rates. However, all engineering branches from recognized institutions are eligible for education loans."
          },
          {
            question: "Can I get a loan for lateral entry B.Tech programs?",
            answer: "Yes, loans are available for lateral entry (diploma to degree) B.Tech programs from recognized institutions. The loan amount covers the remaining years of the course, typically 3 years for lateral entry students."
          },
          {
            question: "Is hostel fee included in the education loan?",
            answer: "Yes, education loans cover tuition fees, hostel fees, mess charges, library fees, laboratory fees, and other institutional charges. Books, laptop, and equipment costs are also covered up to reasonable limits."
          },
          {
            question: "What is the typical EMI after completing B.Tech?",
            answer: "For a ₹10 Lakh loan at 9% interest with 7-year repayment, the EMI is approximately ₹16,000. With average fresher salaries of ₹4-8 LPA at good colleges, this is comfortably manageable within the standard 40% income guideline."
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
              Start Your Engineering Journey Today
            </h2>
            <p className="text-xl text-black mb-10">
              Apply now for education loan and build tomorrow's technology
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for B.Tech Education Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}