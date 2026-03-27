"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Heart, Activity, Brain, Microscope } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function MBBSEducationLoanPage() {
  const mbbsSpecializations = [
    {
      name: "General Medicine",
      description: "Primary healthcare, internal medicine, general practice",
      icon: Stethoscope,
      careerPath: "General Physician, Family Doctor, Internal Medicine Specialist",
      avgSalary: "₹8-25 Lakhs/year"
    },
    {
      name: "Surgery",
      description: "Surgical procedures, trauma care, operative medicine",
      icon: Activity,
      careerPath: "Surgeon, Trauma Specialist, Orthopedic Surgeon",
      avgSalary: "₹15-50 Lakhs/year"
    },
    {
      name: "Pediatrics",
      description: "Children's healthcare, neonatology, child development",
      icon: Heart,
      careerPath: "Pediatrician, Neonatologist, Child Specialist",
      avgSalary: "₹10-30 Lakhs/year"
    },
    {
      name: "Psychiatry",
      description: "Mental health, behavioral disorders, psychological medicine",
      icon: Brain,
      careerPath: "Psychiatrist, Mental Health Specialist, Counselor",
      avgSalary: "₹8-25 Lakhs/year"
    },
    {
      name: "Pathology",
      description: "Laboratory medicine, disease diagnosis, medical testing",
      icon: Microscope,
      careerPath: "Pathologist, Laboratory Director, Diagnostic Specialist",
      avgSalary: "₹10-35 Lakhs/year"
    },
    {
      name: "Emergency Medicine",
      description: "Critical care, emergency procedures, trauma management",
      icon: Target,
      careerPath: "Emergency Physician, Critical Care Specialist, Trauma Doctor",
      avgSalary: "₹12-40 Lakhs/year"
    }
  ];

  const topMBBSColleges = [
    {
      name: "All India Institute of Medical Sciences, Delhi",
      type: "Government",
      fees: "₹1-2 Lakhs",
      duration: "5.5 Years (MBBS + Internship)",
      accreditation: "NMC Approved",
      specialities: "Premier Medical Institute, Research Excellence"
    },
    {
      name: "Christian Medical College, Vellore",
      type: "Private",
      fees: "₹18-22 Lakhs",
      duration: "5.5 Years",
      accreditation: "NMC & NAAC A++",
      specialities: "Top Private Medical College, International Recognition"
    },
    {
      name: "Maulana Azad Medical College, Delhi",
      type: "Government",
      fees: "₹0.5-1 Lakh",
      duration: "5.5 Years",
      accreditation: "NMC Approved",
      specialities: "Government Excellence, Affordable Fees"
    },
    {
      name: "King George's Medical University, Lucknow",
      type: "Government",
      fees: "₹1-1.5 Lakhs",
      duration: "5.5 Years",
      accreditation: "NMC Approved",
      specialities: "Established Institution, Research Focus"
    },
    {
      name: "Kasturba Medical College, Manipal",
      type: "Private (Deemed)",
      fees: "₹65-75 Lakhs",
      duration: "5.5 Years",
      accreditation: "NMC & NAAC A+",
      specialities: "Modern Infrastructure, International Standards"
    },
    {
      name: "Armed Forces Medical College, Pune",
      type: "Government (Military)",
      fees: "₹0.2-0.5 Lakhs",
      duration: "5.5 Years",
      accreditation: "NMC Approved",
      specialities: "Military Medical Education, Service Commitment"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹1 Crore", description: "Complete coverage for MBBS fees including high-fee private colleges" },
    { icon: Shield, title: "Collateral Options", description: "Flexible security options for higher loan amounts" },
    { icon: Clock, title: "Medical Course Processing", description: "Specialized processing for medical education loans" },
    { icon: Award, title: "Doctor-Friendly Terms", description: "Repayment terms aligned with medical career progression" },
  ];

  const careerProspects = [
    { role: "General Physician", avgSalary: "₹8-25 LPA", growth: "High", demand: "Excellent" },
    { role: "Specialist Doctor", avgSalary: "₹15-50 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Surgeon", avgSalary: "₹20-75 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Emergency Physician", avgSalary: "₹12-40 LPA", growth: "High", demand: "Very Good" },
    { role: "Pathologist", avgSalary: "₹10-35 LPA", growth: "High", demand: "Good" },
    { role: "Psychiatrist", avgSalary: "₹8-25 LPA", growth: "Very High", demand: "Very Good" },
    { role: "Medical Officer", avgSalary: "₹6-15 LPA", growth: "Moderate", demand: "Good" },
    { role: "Private Practice", avgSalary: "₹20-100+ LPA", growth: "Very High", demand: "Excellent" }
  ];

  const industryFacts = [
    {
      title: "Job Security",
      value: "100% Employment",
      description: "Medical professionals enjoy highest job security and demand"
    },
    {
      title: "Social Impact",
      value: "Life Saving",
      description: "Direct contribution to healthcare and community well-being"
    },
    {
      title: "Global Recognition",
      value: "Worldwide Practice",
      description: "Medical degrees recognized globally for international practice"
    },
    {
      title: "Earning Potential",
      value: "High Returns",
      description: "Among highest earning professions with unlimited growth"
    }
  ];

  const eligibilityMBBS = [
    "Completed 10+2 with Physics, Chemistry, Biology (PCB) and English as compulsory subjects",
    "Minimum 50% marks in PCB (40% for reserved categories)",
    "Qualified NEET exam with valid scorecard and rank",
    "Age between 17-25 years (relaxation for reserved categories)",
    "Medical and physical fitness for medical profession"
  ];

  const documentsMBBS = [
    "10th and 12th mark sheets and passing certificates",
    "NEET scorecard, rank card, and counseling documents",
    "Medical college admission letter with complete fee structure",
    "Income certificate and IT returns of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Caste/category certificate (if applicable for reservations)",
    "Medical fitness certificate and character certificate"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section - Split Layout */}
      <section className="relative py-10 md:py-12 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-teal-50 skew-x-12 -translate-x-20 hidden lg:block" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative order-2 lg:order-1">
              <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=90" alt="Medical students studying" className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl" width={800} height={500} fetchPriority="high" />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-bold text-black">AIIMS & Top Colleges</p>
                    <p className="text-sm text-gray-700">Premier Medical Education</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="order-1 lg:order-2">
              <motion.div variants={staggerItem} className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full">
                  <Stethoscope className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">MBBS Education Loan</span>
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-tight">
                Bachelor of
                <span className="block text-teal-600">Medicine & Surgery</span>
              </motion.h1>

              <motion.p variants={staggerItem} className="text-lg text-gray-800 mb-8 leading-relaxed max-w-lg">
                Pursue your dream of becoming a doctor with comprehensive loan coverage up to ₹1 Crore
                for MBBS education at premier medical colleges across India.
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">₹1 Crore</p>
                    <p className="text-xs text-gray-700">Max Loan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">5.5 Years</p>
                    <p className="text-xs text-gray-700">Course Duration</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact-form">
                  <Button variant="primary" size="lg">
                    Apply for MBBS Loan
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
      <section className="py-10 md:py-12 bg-gradient-to-r from-teal-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              MBBS Education Loan Features
            </h2>
            <p className="text-lg text-gray-800">
              Premium financing for medical education
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
              Why Choose Medical Profession?
            </h2>
            <p className="text-lg text-gray-800">
              Noble profession with exceptional career prospects
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

      {/* MBBS Specializations */}
      <section className="py-10 md:py-12 bg-gradient-to-bl from-white via-teal-50 to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Medical Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-800">
              Diverse specialization options in medical sciences
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mbbsSpecializations.map((spec, index) => (
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

      {/* Top MBBS Colleges */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Medical Colleges in India
            </h2>
            <p className="text-lg text-gray-800">
              Premier institutions for medical education
            </p>
            
            {/* Medical Education Environment */}
            <div className="relative mt-12 mb-8 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&auto=format&fit=crop&q=80"
                alt="Modern medical college with advanced laboratories and facilities"
                className="w-full h-[300px] lg:h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-serif mb-2">World-Class Medical Education</h3>
                <p className="text-white/90 text-sm">State-of-the-art laboratories, hospitals, and research facilities</p>
              </div>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topMBBSColleges.map((college, index) => (
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
              MBBS Career Prospects
            </h2>
            <p className="text-lg text-gray-800">
              Unlimited opportunities in healthcare sector
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
                MBBS Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityMBBS.map((item, index) => (
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
                {documentsMBBS.map((item, index) => (
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
        title="MBBS Education Loan FAQs"
        subtitle="Common questions about financing your medical education"
        faqs={[
          {
            question: "What is the maximum loan for MBBS in India?",
            answer: "For MBBS at government medical colleges, loans up to ₹15-20 Lakhs are typically sufficient. For private medical colleges, loans up to ₹50-75 Lakhs or more are available depending on the college fees. AIIMS and top government colleges require minimal loans due to subsidized fees."
          },
          {
            question: "Is collateral required for MBBS education loans?",
            answer: "For loans up to ₹7.5 Lakhs, no collateral is required. Government medical college students often fall in this range. For private medical colleges requiring larger loans, collateral in the form of property, FDs, or other assets is typically required."
          },
          {
            question: "What is the repayment period for MBBS loans?",
            answer: "MBBS loans have extended repayment periods of up to 15 years considering the 5.5-year course duration plus internship. The moratorium period covers the entire course plus 1 year, giving you time to establish your practice or secure a job."
          },
          {
            question: "Can I get a loan for MBBS abroad (Ukraine, Russia, etc.)?",
            answer: "Yes, education loans are available for MBBS abroad in countries like Ukraine, Russia, Philippines, and China. Loan amounts range from ₹30-60 Lakhs. Ensure the university is recognized by MCI/NMC and appears in the WHO directory."
          },
          {
            question: "Are there special schemes for medical students?",
            answer: "Yes, several banks have special medical education loan schemes with lower interest rates, higher loan limits, and flexible repayment. Government schemes like Vidya Lakshmi and state-specific scholarships also support medical students from economically weaker sections."
          },
          {
            question: "What happens if I fail in MBBS exams?",
            answer: "If you fail and continue the course, your loan continues with extended moratorium. If you discontinue, repayment begins immediately. Some lenders offer insurance coverage for such scenarios. It's important to discuss this with your lender beforehand."
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
              Start Your Medical Career Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and serve humanity as a doctor
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for MBBS Education Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}