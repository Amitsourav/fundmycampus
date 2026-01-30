"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Heart, Activity, Brain, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function BScNursingEducationLoanPage() {
  const nursingSpecializations = [
    {
      name: "Critical Care Nursing",
      description: "ICU care, ventilator management, emergency nursing",
      icon: Activity,
      careerPath: "ICU Nurse, Critical Care Specialist, Emergency Nurse",
      avgSalary: "₹4-12 Lakhs/year"
    },
    {
      name: "Pediatric Nursing",
      description: "Children's healthcare, neonatal care, child development",
      icon: Heart,
      careerPath: "Pediatric Nurse, NICU Nurse, Child Health Specialist",
      avgSalary: "₹3-10 Lakhs/year"
    },
    {
      name: "Community Health Nursing",
      description: "Public health, preventive care, health education",
      icon: Users,
      careerPath: "Community Health Nurse, Public Health Officer, Health Educator",
      avgSalary: "₹3-8 Lakhs/year"
    },
    {
      name: "Psychiatric Nursing",
      description: "Mental health care, behavioral therapy, counseling",
      icon: Brain,
      careerPath: "Psychiatric Nurse, Mental Health Counselor, Therapist",
      avgSalary: "₹3-9 Lakhs/year"
    },
    {
      name: "Geriatric Nursing",
      description: "Elderly care, chronic disease management, rehabilitation",
      icon: HeartHandshake,
      careerPath: "Geriatric Nurse, Elder Care Specialist, Rehabilitation Nurse",
      avgSalary: "₹3-8 Lakhs/year"
    },
    {
      name: "Surgical Nursing",
      description: "Operating room assistance, surgical procedures, post-op care",
      icon: Target,
      careerPath: "OR Nurse, Surgical Assistant, Recovery Room Nurse",
      avgSalary: "₹4-11 Lakhs/year"
    }
  ];

  const topBScNursingColleges = [
    {
      name: "All India Institute of Medical Sciences, Delhi",
      type: "Government",
      fees: "₹0.5-1 Lakh",
      duration: "4 Years",
      accreditation: "INC & NAAC A++",
      specialities: "Premier Medical Institute, Research Focus"
    },
    {
      name: "Christian Medical College, Vellore",
      type: "Private",
      fees: "₹3-4 Lakhs",
      duration: "4 Years",
      accreditation: "INC & NAAC A++",
      specialities: "Top Private Nursing College, International Standards"
    },
    {
      name: "Jamia Hamdard University, Delhi",
      type: "Private (Deemed)",
      fees: "₹2-3 Lakhs",
      duration: "4 Years",
      accreditation: "INC & NAAC A",
      specialities: "Quality Education, Modern Infrastructure"
    },
    {
      name: "Manipal College of Nursing, Manipal",
      type: "Private (Deemed)",
      fees: "₹4-5 Lakhs",
      duration: "4 Years",
      accreditation: "INC & NAAC A+",
      specialities: "Industry Connect, Clinical Excellence"
    },
    {
      name: "Rajkumari Amrit Kaur College of Nursing, Delhi",
      type: "Government",
      fees: "₹0.3-0.8 Lakhs",
      duration: "4 Years",
      accreditation: "INC Approved",
      specialities: "Established Institution, Affordable Fees"
    },
    {
      name: "SRM College of Nursing, Chennai",
      type: "Private",
      fees: "₹2.5-3.5 Lakhs",
      duration: "4 Years",
      accreditation: "INC & NAAC A+",
      specialities: "Modern Facilities, Hospital Integration"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹12 Lakhs", description: "Complete coverage for BSc Nursing fees and clinical expenses" },
    { icon: Shield, title: "No Collateral Required", description: "Up to ₹7.5 Lakhs without security for recognized nursing colleges" },
    { icon: Clock, title: "Healthcare Priority", description: "Fast-track processing for nursing education loans" },
    { icon: Award, title: "Nursing-Friendly Terms", description: "Flexible repayment considering healthcare employment" },
  ];

  const careerProspects = [
    { role: "Staff Nurse", avgSalary: "₹2.5-6 LPA", growth: "High", demand: "Excellent" },
    { role: "Nurse Supervisor", avgSalary: "₹4-8 LPA", growth: "High", demand: "Very Good" },
    { role: "ICU Nurse", avgSalary: "₹3.5-10 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Community Health Nurse", avgSalary: "₹3-7 LPA", growth: "Moderate", demand: "Good" },
    { role: "Nurse Educator", avgSalary: "₹4-12 LPA", growth: "High", demand: "Good" },
    { role: "Nurse Manager", avgSalary: "₹5-15 LPA", growth: "High", demand: "Very Good" },
    { role: "Clinical Specialist", avgSalary: "₹4-12 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Nurse Practitioner", avgSalary: "₹6-18 LPA", growth: "Very High", demand: "Excellent" }
  ];

  const industryFacts = [
    {
      title: "High Demand",
      value: "95%+ Employment",
      description: "Nursing professionals enjoy excellent job security globally"
    },
    {
      title: "Global Opportunities",
      value: "Worldwide Scope",
      description: "Nursing qualifications recognized internationally"
    },
    {
      title: "Noble Profession",
      value: "Healthcare Heroes",
      description: "Direct impact on patient care and community health"
    },
    {
      title: "Career Growth",
      value: "Multiple Paths",
      description: "Opportunities in clinical, education, administration, and research"
    }
  ];

  const eligibilityBScNursing = [
    "Completed 10+2 with Physics, Chemistry, Biology (PCB) and English as compulsory subjects",
    "Minimum 45% marks in PCB (40% for reserved categories)",
    "Age between 17-35 years at the time of admission",
    "Valid entrance exam scores (NEET/state nursing entrance tests)",
    "Medical fitness and physical capability for nursing profession"
  ];

  const documentsBScNursing = [
    "10th and 12th mark sheets and passing certificates",
    "Entrance exam scorecard (NEET/state nursing entrance)",
    "Nursing college admission letter with fee structure",
    "Income certificate and IT returns of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Medical fitness certificate and immunization records",
    "Character certificate and police verification (if required)"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920"
            alt="Nurses in healthcare setting providing patient care"
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
              <HeartHandshake className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Education Loan for BSc Nursing
              <span className="block text-yellow-400 mt-2">Bachelor of Science in Nursing</span>
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Join the noble nursing profession with comprehensive loan coverage up to ₹12 Lakhs 
              for BSc Nursing education at premier healthcare institutions.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply for BSc Nursing Loan
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
              BSc Nursing Education Loan Features
            </h2>
            <p className="text-lg text-gray-600">
              Specialized financing for nursing education
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
              Why Choose Nursing Profession?
            </h2>
            <p className="text-lg text-gray-600">
              Noble healthcare profession with global opportunities
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

      {/* Nursing Specializations */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Nursing Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-600">
              Diverse specialization options in healthcare nursing
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {nursingSpecializations.map((spec, index) => (
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

      {/* Top BSc Nursing Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Nursing Colleges in India
            </h2>
            <p className="text-lg text-gray-600">
              Premier institutions for nursing education
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topBScNursingColleges.map((college, index) => (
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
      <section className="py-20 bg-gradient-to-bl from-white via-yellow-50 to-amber-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BSc Nursing Career Prospects
            </h2>
            <p className="text-lg text-gray-600">
              Excellent opportunities in healthcare sector
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
                BSc Nursing Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityBScNursing.map((item, index) => (
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
                {documentsBScNursing.map((item, index) => (
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
              Start Your Nursing Career Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and make a difference in healthcare
            </p>
            <Button variant="secondary" size="lg">
              Apply for BSc Nursing Education Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}