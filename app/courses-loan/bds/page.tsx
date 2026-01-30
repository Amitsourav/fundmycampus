"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Stethoscope, Activity, Microscope } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function BDSEducationLoanPage() {
  const bdsSpecializations = [
    {
      name: "Oral & Maxillofacial Surgery",
      description: "Surgical treatment of oral and facial conditions",
      icon: Activity,
      careerPath: "Oral Surgeon, Maxillofacial Surgeon, Hospital Dentist",
      avgSalary: "₹8-20 Lakhs/year"
    },
    {
      name: "Orthodontics",
      description: "Teeth alignment, braces, and corrective treatments",
      icon: Target,
      careerPath: "Orthodontist, Dental Specialist, Private Practice",
      avgSalary: "₹6-15 Lakhs/year"
    },
    {
      name: "Periodontics",
      description: "Gum diseases, dental implants, cosmetic dentistry",
      icon: Heart,
      careerPath: "Periodontist, Implantologist, Cosmetic Dentist",
      avgSalary: "₹5-12 Lakhs/year"
    },
    {
      name: "Endodontics",
      description: "Root canal treatments and dental pulp therapy",
      icon: Microscope,
      careerPath: "Endodontist, Root Canal Specialist, Dental Clinic Owner",
      avgSalary: "₹5-10 Lakhs/year"
    },
    {
      name: "Prosthodontics",
      description: "Dental prosthetics, crowns, bridges, dentures",
      icon: Shield,
      careerPath: "Prosthodontist, Dental Laboratory Owner, Dental Technician",
      avgSalary: "₹4-9 Lakhs/year"
    },
    {
      name: "Pediatric Dentistry",
      description: "Children's dental care and preventive treatments",
      icon: Users,
      careerPath: "Pediatric Dentist, Children's Hospital Dentist, Public Health",
      avgSalary: "₹4-8 Lakhs/year"
    }
  ];

  const topBDSColleges = [
    {
      name: "Maulana Azad Institute of Dental Sciences, Delhi",
      type: "Government",
      fees: "₹0.5-1 Lakh",
      duration: "5 Years",
      accreditation: "DCI Approved",
      specialities: "Premier Government Institute, Excellent Faculty"
    },
    {
      name: "Nair Hospital Dental College, Mumbai",
      type: "Government",
      fees: "₹0.8-1.2 Lakhs",
      duration: "5 Years",
      accreditation: "DCI & MCI Approved",
      specialities: "Clinical Excellence, Research Focus"
    },
    {
      name: "King George's Medical University, Lucknow",
      type: "Government",
      fees: "₹1-1.5 Lakhs",
      duration: "5 Years",
      accreditation: "DCI Approved",
      specialities: "Established Institution, Quality Education"
    },
    {
      name: "Manipal College of Dental Sciences",
      type: "Private",
      fees: "₹15-20 Lakhs",
      duration: "5 Years",
      accreditation: "DCI & NAAC A+",
      specialities: "Modern Infrastructure, International Standards"
    },
    {
      name: "Sri Ramachandra Institute of Higher Education",
      type: "Private (Deemed)",
      fees: "₹12-18 Lakhs",
      duration: "5 Years",
      accreditation: "DCI & NAAC A+",
      specialities: "Research Excellence, Clinical Training"
    },
    {
      name: "Jamia Millia Islamia, Faculty of Dentistry",
      type: "Central University",
      fees: "₹1.5-2 Lakhs",
      duration: "5 Years",
      accreditation: "DCI & NAAC A",
      specialities: "Quality Education, Affordable Fees"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹25 Lakhs", description: "Complete coverage for BDS course fees and clinical expenses" },
    { icon: Shield, title: "No Collateral Required", description: "Up to ₹7.5 Lakhs without security for recognized dental colleges" },
    { icon: Clock, title: "Quick Processing", description: "Loan approval within 10-15 working days" },
    { icon: Award, title: "Medical Course Benefits", description: "Special terms for healthcare education with flexible repayment" },
  ];

  const careerProspects = [
    { role: "General Dentist", avgSalary: "₹3-8 LPA", growth: "High", demand: "Excellent" },
    { role: "Dental Surgeon", avgSalary: "₹4-10 LPA", growth: "High", demand: "Very Good" },
    { role: "Orthodontist", avgSalary: "₹6-15 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Oral Surgeon", avgSalary: "₹8-20 LPA", growth: "High", demand: "Very Good" },
    { role: "Pediatric Dentist", avgSalary: "₹4-8 LPA", growth: "Moderate", demand: "Good" },
    { role: "Prosthodontist", avgSalary: "₹5-12 LPA", growth: "High", demand: "Good" },
    { role: "Dental Clinic Owner", avgSalary: "₹8-25 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Dental Consultant", avgSalary: "₹6-15 LPA", growth: "High", demand: "Very Good" }
  ];

  const industryFacts = [
    {
      title: "Growing Demand",
      value: "20% Annual Growth",
      description: "Dental healthcare market growing rapidly in India"
    },
    {
      title: "Job Security",
      value: "High Stability",
      description: "Healthcare professionals enjoy excellent job security"
    },
    {
      title: "Private Practice",
      value: "Entrepreneurship",
      description: "High potential for establishing own dental practice"
    },
    {
      title: "Specialization Scope",
      value: "6+ Specializations",
      description: "Multiple specialization options post-graduation"
    }
  ];

  const eligibilityBDS = [
    "Completed 10+2 with Physics, Chemistry, Biology (PCB) as compulsory subjects",
    "Minimum 50% marks in PCB (40% for reserved categories)",
    "Qualified NEET exam with valid scorecard",
    "Age between 17-25 years (relaxation for reserved categories)",
    "Medical fitness certificate for healthcare profession"
  ];

  const documentsBDS = [
    "10th and 12th mark sheets and certificates",
    "NEET scorecard and rank card",
    "College/medical college admission letter with fee structure",
    "Income certificate and IT returns of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Caste certificate (if applicable for reserved categories)",
    "Medical fitness certificate and character certificate"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1609207825181-52d3214556dd?w=1920"
            alt="Modern dental clinic with advanced equipment"
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
              <Heart className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Education Loan for BDS
              <span className="block text-yellow-400 mt-2">Bachelor of Dental Surgery</span>
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Build your career in dental healthcare with comprehensive loan coverage 
              up to ₹25 Lakhs for your dental surgery education at premier institutions.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply for BDS Loan
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
              BDS Education Loan Features
            </h2>
            <p className="text-lg text-gray-600">
              Specialized financing for dental education
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
              Why Choose Dental Surgery?
            </h2>
            <p className="text-lg text-gray-600">
              Industry insights and growth opportunities
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

      {/* BDS Specializations */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BDS Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-600">
              Diverse specialization options in dental sciences
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {bdsSpecializations.map((spec, index) => (
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

      {/* Top BDS Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Dental Colleges in India
            </h2>
            <p className="text-lg text-gray-600">
              Premier institutions for dental education
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topBDSColleges.map((college, index) => (
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
              BDS Career Prospects
            </h2>
            <p className="text-lg text-gray-600">
              Excellent opportunities in dental healthcare sector
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
                BDS Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityBDS.map((item, index) => (
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
                {documentsBDS.map((item, index) => (
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
              Start Your Dental Career Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and make a difference in dental healthcare
            </p>
            <Button variant="secondary" size="lg">
              Apply for BDS Education Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}