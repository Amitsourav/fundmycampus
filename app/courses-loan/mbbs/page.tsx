"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Heart, Activity, Brain, Microscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920"
            alt="Medical students and hospital environment"
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
              <Stethoscope className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Education Loan for MBBS
              <span className="block text-yellow-400 mt-2">Bachelor of Medicine & Bachelor of Surgery</span>
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Pursue your dream of becoming a doctor with comprehensive loan coverage up to ₹1 Crore 
              for MBBS education at premier medical colleges across India.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply for MBBS Loan
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
      <section className="py-20 bg-gradient-to-r from-amber-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              MBBS Education Loan Features
            </h2>
            <p className="text-lg text-gray-600">
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
              Why Choose Medical Profession?
            </h2>
            <p className="text-lg text-gray-600">
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
                <h3 className="font-serif text-2xl text-yellow-600 mb-2">{fact.value}</h3>
                <h4 className="font-medium text-black mb-3">{fact.title}</h4>
                <p className="text-gray-600 text-sm">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MBBS Specializations */}
      <section className="py-20 bg-gradient-to-bl from-white via-yellow-50 to-amber-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Medical Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-600">
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

      {/* Top MBBS Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Medical Colleges in India
            </h2>
            <p className="text-lg text-gray-600">
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
              MBBS Career Prospects
            </h2>
            <p className="text-lg text-gray-600">
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
                MBBS Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityMBBS.map((item, index) => (
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
                {documentsMBBS.map((item, index) => (
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
              Start Your Medical Career Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and serve humanity as a doctor
            </p>
            <Button variant="secondary" size="lg">
              Apply for MBBS Education Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}