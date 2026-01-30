"use client";

import React from "react";
import { motion } from "framer-motion";
import { Computer, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Code, Database, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function BCAEducationLoanPage() {
  const bcaSpecializations = [
    {
      name: "Software Development",
      description: "Full-stack development, web technologies, mobile apps",
      icon: Code,
      careerPath: "Software Developer, Web Developer, App Developer",
      avgSalary: "₹3-8 Lakhs/year"
    },
    {
      name: "Database Management",
      description: "Database design, SQL, data analytics",
      icon: Database,
      careerPath: "Database Administrator, Data Analyst, SQL Developer",
      avgSalary: "₹4-9 Lakhs/year"
    },
    {
      name: "Mobile Application Development",
      description: "Android, iOS, cross-platform development",
      icon: Smartphone,
      careerPath: "Mobile App Developer, UI/UX Designer, Product Manager",
      avgSalary: "₹5-12 Lakhs/year"
    },
    {
      name: "System Administration",
      description: "Network management, cybersecurity, cloud computing",
      icon: Shield,
      careerPath: "System Administrator, Network Engineer, Cloud Architect",
      avgSalary: "₹4-10 Lakhs/year"
    }
  ];

  const topBCAColleges = [
    {
      name: "Christ University, Bangalore",
      type: "Private",
      fees: "₹2.5-3.5 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A+",
      specialities: "Industry Integration, Placement Support"
    },
    {
      name: "Symbiosis Institute of Computer Studies, Pune", 
      type: "Private",
      fees: "₹3-4 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A",
      specialities: "Research Focus, International Exposure"
    },
    {
      name: "Lovely Professional University, Punjab",
      type: "Private",
      fees: "₹2-2.8 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A+",
      specialities: "Industry Partnerships, Modern Infrastructure"
    },
    {
      name: "Jamia Millia Islamia, Delhi",
      type: "Central University",
      fees: "₹0.8-1.2 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A",
      specialities: "Quality Education, Research Opportunities"
    },
    {
      name: "Indira Gandhi National Open University",
      type: "Central University",
      fees: "₹0.4-0.6 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A++",
      specialities: "Distance Learning, Flexible Schedule"
    },
    {
      name: "Bangalore University",
      type: "State University",
      fees: "₹1-1.5 Lakhs",
      duration: "3 Years",
      accreditation: "NAAC A",
      specialities: "Comprehensive Curriculum, Industry Connect"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹15 Lakhs", description: "Complete coverage for BCA course fees and expenses" },
    { icon: Shield, title: "No Collateral Required", description: "Up to ₹7.5 Lakhs without any security for recognized institutions" },
    { icon: Clock, title: "Quick Processing", description: "Loan approval within 7-10 working days" },
    { icon: Award, title: "Competitive Interest", description: "Starting from 9.5% per annum with flexible repayment" },
  ];

  const careerProspects = [
    { role: "Software Developer", avgSalary: "₹3-8 LPA", growth: "High", demand: "Excellent" },
    { role: "Web Developer", avgSalary: "₹3-7 LPA", growth: "High", demand: "Very Good" },
    { role: "Database Administrator", avgSalary: "₹4-9 LPA", growth: "Moderate", demand: "Good" },
    { role: "System Analyst", avgSalary: "₹4-8 LPA", growth: "High", demand: "Good" },
    { role: "Mobile App Developer", avgSalary: "₹5-12 LPA", growth: "Very High", demand: "Excellent" },
    { role: "UI/UX Designer", avgSalary: "₹4-10 LPA", growth: "High", demand: "Very Good" }
  ];

  const eligibilityBCA = [
    "Completed 10+2 with Mathematics as compulsory subject",
    "Minimum 50% marks in qualifying examination (45% for reserved categories)", 
    "Age between 17-25 years at the time of admission",
    "Valid entrance exam scores where required (CUET, university-specific tests)",
    "English proficiency for better career prospects"
  ];

  const documentsBCA = [
    "10th and 12th mark sheets and certificates",
    "Entrance exam scorecard (if applicable)",
    "College admission letter with fee structure",
    "Income certificate of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Identity proof and address proof of applicant and co-applicant"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920"
            alt="Computer programming and coding environment"
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
              <Computer className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Education Loan for BCA
              <span className="block text-yellow-400 mt-2">Bachelor of Computer Applications</span>
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Launch your career in Information Technology with a BCA degree. 
              Get comprehensive loan coverage up to ₹15 Lakhs for your computer applications education.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply for BCA Loan
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
              BCA Education Loan Features
            </h2>
            <p className="text-lg text-gray-600">
              Specialized financing for computer applications education
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

      {/* BCA Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BCA Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-600">
              Choose from diverse specializations in computer applications
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {bcaSpecializations.map((spec, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-inner border border-yellow-400/40">
                    <spec.icon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-serif text-xl text-black">{spec.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{spec.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-500" />
                    <span className="text-green-600 text-sm">{spec.careerPath}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-yellow-600" />
                    <span className="text-yellow-600 text-sm">{spec.avgSalary}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top BCA Colleges */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top BCA Colleges in India
            </h2>
            <p className="text-lg text-gray-600">
              Premier institutions offering quality BCA education
            </p>
            
            {/* College Campus Showcase */}
            <div className="relative mt-12 mb-8 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&auto=format&fit=crop&q=80"
                alt="Modern university campus with students studying computer science"
                className="w-full h-[300px] lg:h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-serif mb-2">Premier Tech Education Environment</h3>
                <p className="text-white/90 text-sm">Modern computer labs, libraries, and collaborative learning spaces</p>
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
            {topBCAColleges.map((college, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_16px_64px_rgba(251,191,36,0.25)] hover:scale-[1.02] transition-all duration-500"
              >
                <div className="mb-4">
                  <h3 className="font-serif text-lg text-black mb-2">{college.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-yellow-400/20 text-yellow-700 px-2 py-1 rounded">{college.type}</span>
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
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BCA Career Prospects
            </h2>
            <p className="text-lg text-gray-600">
              Excellent job opportunities in the IT industry
            </p>
            
            {/* Professional Environment Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-12">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80"
                  alt="Software developers collaborating in modern tech office"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-medium">Tech Industry Careers</h4>
                  <p className="text-sm text-white/90">Software development roles</p>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80"
                  alt="Data analysts working with computers and analytics"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-medium">Data & Analytics</h4>
                  <p className="text-sm text-white/90">High-growth opportunities</p>
                </div>
              </div>
            </div>
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
      <section className="py-20 bg-gradient-to-bl from-white via-yellow-50 to-amber-50">
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
                BCA Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityBCA.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
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
                {documentsBCA.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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
              Start Your BCA Journey Today
            </h2>
            <p className="text-xl text-black mb-10">
              Apply now for education loan and secure your future in IT
            </p>
            <Button variant="secondary" size="lg">
              Apply for BCA Education Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}