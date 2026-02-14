"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function AbroadStudyLoanPage() {
  const countries = [
    {
      name: "United States",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop&q=80",
      universities: "Harvard, MIT, Stanford",
      avgLoan: "₹40-60 Lakhs"
    },
    {
      name: "United Kingdom",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
      universities: "Oxford, Cambridge, LSE",
      avgLoan: "₹35-50 Lakhs"
    },
    {
      name: "Canada",
      image: "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=800&auto=format&fit=crop&q=80",
      universities: "UofT, UBC, McGill",
      avgLoan: "₹30-45 Lakhs"
    },
    {
      name: "Australia",
      image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format&fit=crop&q=80",
      universities: "ANU, Melbourne, Sydney",
      avgLoan: "₹25-40 Lakhs"
    },
    {
      name: "Germany",
      image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&auto=format&fit=crop&q=80",
      universities: "TU Munich, Heidelberg",
      avgLoan: "₹15-25 Lakhs"
    },
    {
      name: "Singapore",
      image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&auto=format&fit=crop&q=80",
      universities: "NUS, NTU, SMU",
      avgLoan: "₹20-35 Lakhs"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹1.5 Crore", description: "Complete financing for tuition and living expenses" },
    { icon: Shield, title: "Zero Collateral", description: "Up to ₹7.5 Lakhs without any security" },
    { icon: Clock, title: "48-Hour Approval", description: "Quick decision on your loan application" },
    { icon: Award, title: "Competitive Rates", description: "Starting from 6.75% per annum" },
  ];

  const eligibility = [
    "Indian citizen with confirmed admission to foreign university",
    "Age between 18-35 years",
    "Co-applicant (parent/guardian) with stable income",
    "Good academic record (minimum 60% in previous education)",
    "Valid passport and visa documents",
  ];

  const documents = [
    "Admission letter from university",
    "Academic transcripts and certificates",
    "Income proof of co-applicant",
    "Bank statements (last 6 months)",
    "Passport and visa documents",
    "Property documents (if collateral required)",
  ];

  const process = [
    { step: "1", title: "Apply Online", description: "Fill our simple application form with basic details" },
    { step: "2", title: "Document Upload", description: "Submit required documents digitally" },
    { step: "3", title: "Quick Approval", description: "Get decision within 48 hours" },
    { step: "4", title: "Disbursement", description: "Funds transferred directly to university" },
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section - Split Layout */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-50 -skew-x-12 translate-x-20 hidden lg:block" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full">
                  <Globe className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">Study Abroad Loans</span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-tight"
              >
                Your Global
                <span className="block text-teal-600">Education Journey</span>
                Starts Here
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-800 mb-8 leading-relaxed max-w-lg"
              >
                Fulfill your dream of studying at top universities worldwide with our
                comprehensive education loan solutions. Get up to ₹1.5 Crore with minimal documentation.
              </motion.p>

              {/* Quick Stats */}
              <motion.div variants={staggerItem} className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">₹1.5 Cr</p>
                    <p className="text-xs text-gray-700">Max Loan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="font-bold text-black">48 Hours</p>
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
                <Link href="/#contact-form">
                  <Button variant="primary" size="lg">
                    Apply Now
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

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format&fit=crop&q=90"
                  alt="International students at university abroad"
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-black">50+ Countries</p>
                      <p className="text-sm text-gray-700">Worldwide Coverage</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Why Choose Our Study Abroad Loans
            </h2>
            <p className="text-lg text-gray-800">
              Premium features designed for global education aspirants
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

      {/* Countries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Study Destinations We Cover
            </h2>
            <p className="text-lg text-gray-800">
              Finance your education at top universities across the globe
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {countries.map((country, index) => (
              <motion.div 
                key={index} 
                variants={staggerItem}
                              >
                <div
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <div className="absolute bottom-4 left-6 text-white">
                      <h3 className="font-serif text-2xl mb-1">{country.name}</h3>
                      <p className="text-sm text-ivory/90">{country.universities}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">Average Loan</span>
                      <span className="text-lg font-serif text-teal-600">{country.avgLoan}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-gray-800">
              From application to disbursement in just 48 hours
            </p>
            
            {/* Process Visual */}
            <div className="relative mt-12 mb-8 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=1200&auto=format&fit=crop&q=80"
                alt="International students completing loan application process"
                className="w-full h-[250px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-serif mb-2">Quick & Easy Process</h3>
                  <p className="text-white/90">Get approved in 48 hours and start your global education journey</p>
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
            {process.map((item, index) => (
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
      <section className="py-20 bg-white">
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
                {eligibility.map((item, index) => (
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
                {documents.map((item, index) => (
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
        title="Study Abroad Loan FAQs"
        subtitle="Common questions about international education financing"
        faqs={[
          {
            question: "What is the maximum loan amount for studying abroad?",
            answer: "For studying abroad, you can get education loans up to ₹1.5 Crore depending on the country, university, and course. Top-tier universities in USA, UK, Canada, and Australia typically qualify for higher loan amounts. Collateral-free loans are available up to ₹40 Lakhs for select institutions."
          },
          {
            question: "Do I need a co-applicant for an abroad education loan?",
            answer: "Yes, most lenders require a co-applicant (parent, guardian, or spouse) for education loans. The co-applicant's income and credit history are considered for loan approval. Some NBFCs offer loans without co-applicants for students with confirmed job offers or scholarships."
          },
          {
            question: "What documents are required for a study abroad loan?",
            answer: "Key documents include: Admission letter from the university, passport, academic transcripts, standardized test scores (GRE/GMAT/IELTS/TOEFL), income proof of co-applicant, bank statements (6 months), property documents (if collateral), and KYC documents of applicant and co-applicant."
          },
          {
            question: "When do I need to start repaying the loan?",
            answer: "Most education loans offer a moratorium period that covers your course duration plus 6-12 months after completion (or 6 months after getting a job, whichever is earlier). During this period, you may need to pay only the interest or nothing at all, depending on the loan terms."
          },
          {
            question: "Can I get a loan for living expenses abroad?",
            answer: "Yes, education loans cover tuition fees, living expenses, accommodation, travel costs, books, laptop, and other education-related expenses. Typically, loans cover 100% of tuition fees and a reasonable amount for living expenses based on the country's cost of living."
          },
          {
            question: "What is the interest rate for study abroad loans?",
            answer: "Interest rates for study abroad loans typically range from 6.75% to 13% per annum depending on the lender, loan amount, collateral, and credit profile. Government banks usually offer lower rates, while NBFCs may charge slightly higher but offer faster processing."
          },
          {
            question: "Is collateral mandatory for abroad education loans?",
            answer: "Collateral is not mandatory for loans up to ₹7.5 Lakhs from most banks. For loans between ₹7.5 Lakhs to ₹40 Lakhs, some lenders offer collateral-free options based on the university ranking and co-applicant's profile. Loans above ₹40 Lakhs typically require collateral."
          },
          {
            question: "How long does the loan approval process take?",
            answer: "The loan approval process typically takes 7-15 working days for collateral-free loans and 15-30 days for loans with collateral. At FundMyCampus, we help expedite this process and many of our partner lenders offer approval within 48-72 hours."
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
              Start Your Global Education Journey Today
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now and get approval within 48 hours
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for Study Abroad Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}