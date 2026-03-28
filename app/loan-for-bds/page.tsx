"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Stethoscope, Activity, Microscope } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
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
      {/* Hero Section - Split Layout */}
      <section className="relative py-10 md:py-12 overflow-hidden bg-gradient-to-br from-white via-teal-50/30 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800"
                  alt="Dental professionals working in modern clinic"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  width={800}
                  height={500}
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="font-bold text-black">300+</div>
                    <div className="text-sm text-gray-700">Dental Colleges</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-500 shadow-lg">
                  <Heart className="h-8 w-8 text-black" />
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-serif text-display-md md:text-display-lg text-black mb-4"
              >
                Education Loan for BDS
                <span className="block text-teal-600 mt-2">Bachelor of Dental Surgery</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-800 mb-8 leading-relaxed"
              >
                Build your career in dental healthcare with comprehensive loan coverage
                up to ₹25 Lakhs for your dental surgery education at premier institutions.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <DollarSign className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">₹25 Lakhs</div>
                  <div className="text-xs text-gray-700">Max Loan</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <Clock className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">5 Years</div>
                  <div className="text-xs text-gray-700">Course Duration</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <Award className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">6.85%</div>
                  <div className="text-xs text-gray-700">Interest Rate</div>
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/#contact-form">
                  <Button variant="primary" size="lg">
                    Apply for BDS Loan
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
      <section className="py-10 md:py-12 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BDS Education Loan Features
            </h2>
            <p className="text-lg text-gray-800">
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
              Why Choose Dental Surgery?
            </h2>
            <p className="text-lg text-gray-800">
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
                <h3 className="font-serif text-2xl text-teal-600 mb-2">{fact.value}</h3>
                <h4 className="font-medium text-black mb-3">{fact.title}</h4>
                <p className="text-gray-800 text-sm">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BDS Specializations */}
      <section className="py-10 md:py-12 bg-gradient-to-r from-teal-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BDS Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-800">
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

      {/* Top BDS Colleges */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Dental Colleges in India
            </h2>
            <p className="text-lg text-gray-800">
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
      <section className="py-10 md:py-12 bg-gradient-to-bl from-white via-teal-50 to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BDS Career Prospects
            </h2>
            <p className="text-lg text-gray-800">
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
                BDS Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityBDS.map((item, index) => (
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
                {documentsBDS.map((item, index) => (
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
        title="BDS Education Loan FAQs"
        subtitle="Common questions about financing your dental education"
        faqs={[
          {
            question: "What is the cost of BDS in India and loan requirements?",
            answer: "BDS at government dental colleges costs ₹2-5 Lakhs total, while private colleges charge ₹10-25 Lakhs for the 5-year course. Education loans of ₹10-30 Lakhs are available depending on the college type and location."
          },
          {
            question: "Is BDS a good investment considering the loan burden?",
            answer: "Yes, BDS offers good ROI. After completing BDS and gaining experience, dentists earn ₹4-10 LPA in jobs or significantly more in private practice. Specializations like orthodontics and oral surgery command even higher earnings."
          },
          {
            question: "Can I get a loan for BDS followed by MDS?",
            answer: "Yes, separate loans are available for BDS and MDS. Many students complete BDS, work for a few years, and then pursue MDS. Some lenders offer combined education loan planning for students committed to both degrees."
          },
          {
            question: "Are there government subsidies for BDS loans?",
            answer: "Yes, interest subsidies are available under schemes like Central Sector Interest Subsidy for economically weaker sections. State governments also have specific schemes for students from reserved categories pursuing professional courses."
          },
          {
            question: "What is the moratorium period for BDS loans?",
            answer: "The moratorium period typically covers the 5-year course duration plus 1-year internship, plus an additional 6-12 months. This means repayment usually starts about 7 years after taking the loan, giving you time to establish yourself."
          },
          {
            question: "Can I use the loan for setting up my dental clinic?",
            answer: "Education loans are specifically for course fees and related expenses. For setting up a clinic after completing BDS, you would need a separate business loan or professional loan, which banks readily offer to qualified dentists."
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
              Start Your Dental Career Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and make a difference in dental healthcare
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for BDS Education Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}