"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, MapPin, BookOpen, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function IndiaStudyLoanPage() {
  const topInstitutions = [
    {
      category: "IITs",
      name: "Indian Institutes of Technology",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      avgFees: "₹2-8 Lakhs",
      courses: "Engineering, Technology"
    },
    {
      category: "IIMs", 
      name: "Indian Institutes of Management",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&auto=format&fit=crop&q=80",
      avgFees: "₹20-25 Lakhs",
      courses: "MBA, Management"
    },
    {
      category: "AIIMS",
      name: "All India Institute of Medical Sciences",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80",
      avgFees: "₹5-15 Lakhs",
      courses: "MBBS, Medical"
    },
    {
      category: "NITs",
      name: "National Institutes of Technology",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=80", 
      avgFees: "₹2-6 Lakhs",
      courses: "Engineering, Technology"
    },
    {
      category: "NLUs",
      name: "National Law Universities",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80",
      avgFees: "₹3-12 Lakhs",
      courses: "Law, Legal Studies"
    },
    {
      category: "Private",
      name: "Top Private Universities",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
      avgFees: "₹8-25 Lakhs",
      courses: "All Disciplines"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹40 Lakhs", description: "Complete financing for tuition, hostel and other expenses" },
    { icon: Shield, title: "No Collateral", description: "Up to ₹7.5 Lakhs without any security for premier institutions" },
    { icon: Clock, title: "Quick Approval", description: "Loan approval within 7-10 working days" },
    { icon: Award, title: "Best Interest Rates", description: "Starting from 6.75% per annum with flexible terms" },
  ];

  const eligibilityIndia = [
    "Indian citizen seeking admission to recognized Indian institutions",
    "Age between 18-35 years at the time of application",
    "Co-applicant (parent/guardian) with stable income source",
    "Minimum 50% marks in qualifying examination",
    "Confirmed admission to eligible course and institution"
  ];

  const documentsIndia = [
    "Admission letter from recognized institution",
    "Academic mark sheets and certificates",
    "Income proof of co-applicant (salary slips, ITR)",
    "Bank statements of co-applicant (last 6 months)",
    "Identity and address proof of applicant and co-applicant",
    "Property documents (if collateral required)"
  ];

  const processSteps = [
    { step: "1", title: "Online Application", description: "Fill out our simple online form with your details" },
    { step: "2", title: "Document Verification", description: "Upload and verify all required documents" },
    { step: "3", title: "Institution Verification", description: "We verify your admission and course details" },
    { step: "4", title: "Quick Disbursement", description: "Direct payment to institution account" }
  ];

  const governmentSchemes = [
    {
      name: "Central Sector Interest Subsidy Scheme",
      description: "Interest subsidy for economically weaker students",
      benefit: "100% interest subsidy during moratorium period",
      eligibility: "Family income below ₹4.5 Lakhs"
    },
    {
      name: "Dr. A.P.J. Abdul Kalam Interest Subsidy Scheme", 
      description: "Interest subsidy for technical education",
      benefit: "Interest subsidy for technical courses",
      eligibility: "Family income below ₹4.5 Lakhs"
    },
    {
      name: "Padho Pardesh Scheme",
      description: "Interest subsidy for study abroad",
      benefit: "Interest subsidy for overseas education",
      eligibility: "Family income below ₹6 Lakhs"
    }
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section - Split Layout */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-teal-50 skew-x-12 -translate-x-20 hidden lg:block" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=90"
                  alt="Indian university campus with students"
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-bold text-black">500+ Institutions</p>
                      <p className="text-sm text-gray-700">IITs, IIMs, AIIMS & more</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.div variants={staggerItem} className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">Study in India</span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-tight"
              >
                Fund Your
                <span className="block text-teal-600">Indian Education</span>
                Dreams
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-800 mb-8 leading-relaxed max-w-lg"
              >
                Achieve your academic dreams at India's premier institutions with our
                comprehensive education loan solutions. Get up to ₹40 Lakhs with competitive rates.
              </motion.p>

              {/* Quick Stats */}
              <motion.div variants={staggerItem} className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">₹40 Lakhs</p>
                    <p className="text-xs text-gray-700">Max Loan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">7-10 Days</p>
                    <p className="text-xs text-gray-700">Approval</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">6.75%</p>
                    <p className="text-xs text-gray-700">Interest Rate</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="primary" size="lg">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="secondary" size="lg">
                  Check Eligibility
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-20 bg-gradient-to-tr from-teal-100 via-white to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Why Choose Our India Study Loans
            </h2>
            <p className="text-lg text-gray-800">
              Tailored features for Indian education aspirants
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
                                className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <feature.icon className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-black mb-2">{feature.title}</h3>
                <p className="text-gray-800 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Top Institutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Premier Institutions We Cover
            </h2>
            <p className="text-lg text-gray-800">
              Finance your education at India's top universities and colleges
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {topInstitutions.map((institution, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                              >
                <div
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={institution.image}
                      alt={institution.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <div className="absolute bottom-4 left-6 text-white">
                      <h3 className="font-serif text-2xl mb-1">{institution.category}</h3>
                      <p className="text-sm text-ivory/90">{institution.courses}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-medium text-black mb-2 text-sm">{institution.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">Average Fees</span>
                      <span className="text-lg font-serif text-teal-600">{institution.avgFees}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Government Schemes Section */}
      <section className="py-20 bg-gradient-to-tr from-teal-100 via-white to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Government Schemes & Benefits
            </h2>
            <p className="text-lg text-gray-800">
              Take advantage of government interest subsidy schemes
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {governmentSchemes.map((scheme, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start space-x-3 mb-4">
                  <Users className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0" />
                  <h3 className="font-serif text-lg text-black">{scheme.name}</h3>
                </div>
                <p className="text-gray-800 text-sm mb-3">{scheme.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-500" />
                    <span className="text-green-400 text-xs">{scheme.benefit}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-teal-600" />
                    <span className="text-gray-800 text-xs">{scheme.eligibility}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-gray-800">
              From application to disbursement in just 7-10 days
            </p>
            
            {/* India Education Journey */}
            <div className="relative mt-12 mb-8 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80"
                alt="Students studying at premier Indian educational institutions"
                className="w-full h-[250px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif mb-2">Excellence in Indian Education</h3>
                  <p className="text-white/90">Fast approval for top Indian institutions</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {processSteps.map((item, index) => (
              <motion.div key={index} variants={staggerItem} className="text-center">
                <div className="w-16 h-16 bg-teal-500 text-black rounded-full flex items-center justify-center font-serif text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-black mb-2">{item.title}</h3>
                <p className="text-gray-800 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-20 bg-gradient-to-tr from-teal-100 via-white to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Eligibility */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="font-serif text-2xl text-black mb-6">
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityIndia.map((item, index) => (
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
              className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="font-serif text-2xl text-black mb-6">
                Documents Required
              </h2>
              <ul className="space-y-3">
                {documentsIndia.map((item, index) => (
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
        title="India Education Loan FAQs"
        subtitle="Common questions about education loans for studying in India"
        faqs={[
          {
            question: "What is the maximum loan amount for studying in India?",
            answer: "For studying in India, you can get education loans up to ₹75 Lakhs for premier institutions like IITs, IIMs, and AIIMS. For other recognized institutions, loans up to ₹20-30 Lakhs are available. Collateral-free loans are available up to ₹7.5 Lakhs under government schemes."
          },
          {
            question: "What is the interest rate for education loans in India?",
            answer: "Interest rates for education loans in India typically range from 6.75% to 12% per annum. Government banks offer lower rates (6.75%-9.5%), while private banks and NBFCs may charge 9%-12%. Female students often get a 0.5% concession on interest rates."
          },
          {
            question: "Is collateral required for education loans in India?",
            answer: "Collateral is not required for loans up to ₹7.5 Lakhs under government schemes like Vidya Lakshmi. For loans between ₹7.5 Lakhs to ₹20 Lakhs, third-party guarantee may be required. Loans above ₹20 Lakhs typically require collateral security."
          },
          {
            question: "What is the repayment period for education loans?",
            answer: "Education loans in India typically have a repayment period of 5-15 years after the moratorium period ends. The moratorium includes your course duration plus 6-12 months. Some banks offer extended repayment up to 20 years for larger loan amounts."
          },
          {
            question: "Can I get tax benefits on education loans?",
            answer: "Yes, under Section 80E of the Income Tax Act, you can claim deduction on the entire interest paid on education loans. This benefit is available for 8 years from the year you start repaying the loan. There is no upper limit on the deduction amount."
          },
          {
            question: "What courses are eligible for education loans?",
            answer: "Education loans cover a wide range of courses including engineering, medical, management, law, arts, science, and professional courses like CA, CS. The course should be from a recognized institution in India. Both undergraduate and postgraduate courses are eligible."
          },
          {
            question: "How long does it take to get an education loan approved?",
            answer: "For collateral-free loans up to ₹7.5 Lakhs, approval typically takes 7-10 working days. For larger loans with collateral, the process may take 15-20 days. At FundMyCampus, we help expedite the process with our partner banks."
          },
          {
            question: "What documents are required for an India education loan?",
            answer: "Required documents include: Admission letter, fee structure, academic marksheets, income proof of parent/guardian, bank statements (6 months), KYC documents, and property documents (if collateral). Students from weaker sections may need caste/income certificates."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-teal-500">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center text-black"
          >
            <h2 className="font-serif text-display-md mb-6">
              Start Your Education Journey in India Today
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now and get approval within 7-10 days
            </p>
            <Button variant="secondary" size="lg">
              Apply for India Study Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}