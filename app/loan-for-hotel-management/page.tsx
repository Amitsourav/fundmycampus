"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hotel, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, ChefHat, Globe, Utensils, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function HotelManagementEducationLoanPage() {
  const hmSpecializations = [
    {
      name: "Food & Beverage Management",
      description: "Restaurant operations, culinary arts, beverage service",
      icon: Utensils,
      careerPath: "F&B Manager, Restaurant Manager, Culinary Director",
      avgSalary: "₹3-8 Lakhs/year"
    },
    {
      name: "Front Office Operations",
      description: "Guest relations, reservation systems, concierge services",
      icon: Users,
      careerPath: "Front Office Manager, Guest Relations Manager, Concierge",
      avgSalary: "₹3-7 Lakhs/year"
    },
    {
      name: "Housekeeping Management",
      description: "Hotel maintenance, laundry operations, quality control",
      icon: Shield,
      careerPath: "Housekeeping Manager, Operations Manager, Quality Manager",
      avgSalary: "₹2.5-6 Lakhs/year"
    },
    {
      name: "Event & Conference Management",
      description: "Event planning, conference coordination, banquet management",
      icon: Target,
      careerPath: "Event Manager, Conference Coordinator, Banquet Manager",
      avgSalary: "₹4-10 Lakhs/year"
    },
    {
      name: "Travel & Tourism",
      description: "Tour operations, travel planning, destination management",
      icon: Globe,
      careerPath: "Tour Manager, Travel Consultant, Tourism Officer",
      avgSalary: "₹3-8 Lakhs/year"
    },
    {
      name: "Culinary Arts",
      description: "Professional cooking, menu planning, kitchen management",
      icon: ChefHat,
      careerPath: "Executive Chef, Sous Chef, Kitchen Manager",
      avgSalary: "₹4-12 Lakhs/year"
    }
  ];

  const topHMColleges = [
    {
      name: "Institute of Hotel Management, Aurangabad",
      type: "Government (IHM)",
      fees: "₹1.5-2 Lakhs",
      duration: "4 Years (BHMCT)",
      accreditation: "AICTE Approved",
      specialities: "Industry Exposure, Practical Training"
    },
    {
      name: "Welcomgroup Graduate School of Hotel Administration, Manipal",
      type: "Private",
      fees: "₹6-8 Lakhs",
      duration: "4 Years",
      accreditation: "UGC Approved",
      specialities: "Tie-ups with International Hotels, Modern Infrastructure"
    },
    {
      name: "Christ University School of Hotel Management, Bangalore",
      type: "Private",
      fees: "₹4-5 Lakhs",
      duration: "4 Years",
      accreditation: "UGC & NAAC A+",
      specialities: "Industry Integration, Placement Assistance"
    },
    {
      name: "Army Institute of Hotel Management, Bangalore",
      type: "Private",
      fees: "₹3-4 Lakhs",
      duration: "4 Years",
      accreditation: "UGC Approved",
      specialities: "Disciplined Environment, Quality Education"
    },
    {
      name: "Institute of Hotel Management, Mumbai",
      type: "Government (IHM)",
      fees: "₹1.5-2 Lakhs",
      duration: "4 Years (BHMCT)",
      accreditation: "AICTE Approved",
      specialities: "Prime Location, Industry Connect"
    },
    {
      name: "Oberoi Centre of Learning & Development, Delhi",
      type: "Private",
      fees: "₹8-10 Lakhs",
      duration: "4 Years",
      accreditation: "Industry Recognition",
      specialities: "Oberoi Group Training, Premium Placement"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹20 Lakhs", description: "Complete coverage for hotel management course and living expenses" },
    { icon: Shield, title: "No Collateral Required", description: "Up to ₹7.5 Lakhs without any security for recognized institutions" },
    { icon: Clock, title: "Quick Approval", description: "Loan processing within 10-15 working days" },
    { icon: Award, title: "Industry-Specific Terms", description: "Flexible repayment considering industry patterns" },
  ];

  const careerProspects = [
    { role: "Hotel Manager", avgSalary: "₹5-15 LPA", growth: "High", demand: "Excellent" },
    { role: "Restaurant Manager", avgSalary: "₹3-8 LPA", growth: "High", demand: "Very Good" },
    { role: "Event Manager", avgSalary: "₹4-10 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Food & Beverage Manager", avgSalary: "₹4-9 LPA", growth: "Moderate", demand: "Good" },
    { role: "Front Office Manager", avgSalary: "₹3-7 LPA", growth: "Moderate", demand: "Good" },
    { role: "Executive Chef", avgSalary: "₹6-20 LPA", growth: "High", demand: "Very Good" },
    { role: "Travel Consultant", avgSalary: "₹2.5-6 LPA", growth: "Moderate", demand: "Good" },
    { role: "Cruise Ship Staff", avgSalary: "₹8-25 LPA", growth: "High", demand: "Very Good" }
  ];

  const industryFacts = [
    {
      title: "Growing Industry",
      value: "15% Annual Growth",
      description: "Indian hospitality industry growing rapidly with tourism boom"
    },
    {
      title: "Job Opportunities",
      value: "2M+ Jobs",
      description: "Over 2 million direct and indirect employment opportunities"
    },
    {
      title: "International Scope",
      value: "Global Career",
      description: "Hotel management skills are transferable worldwide"
    },
    {
      title: "Startup Potential",
      value: "Entrepreneurship",
      description: "High potential for restaurant and hospitality startups"
    }
  ];

  const eligibilityHM = [
    "Completed 10+2 from any stream (preferably with English as compulsory subject)",
    "Minimum 50% marks in qualifying examination (45% for reserved categories)",
    "Age between 17-25 years at the time of admission",
    "Valid entrance exam scores (NCHM JEE, state-level tests, or college-specific exams)",
    "Good communication skills and personality (important for hospitality industry)"
  ];

  const documentsHM = [
    "10th and 12th mark sheets and certificates",
    "Entrance exam scorecard (NCHM JEE or equivalent)",
    "College/institute admission letter with complete fee structure",
    "Income certificate and IT returns of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Character certificate from school/college",
    "Medical fitness certificate (if required by institution)"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section - Split Layout */}
      <section className="relative py-10 md:py-12 overflow-hidden bg-gradient-to-br from-white via-teal-50/30 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="order-2 lg:order-1"
            >
              <motion.div variants={staggerItem} className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-500 shadow-lg">
                  <Hotel className="h-8 w-8 text-black" />
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-serif text-display-md md:text-display-lg text-black mb-4"
              >
                Education Loan for Hotel Management
                <span className="block text-teal-600 mt-2">BHMCT Program</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-800 mb-8 leading-relaxed"
              >
                Build your career in the thriving hospitality industry with comprehensive loan coverage
                up to ₹20 Lakhs for hotel management and culinary programs.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <DollarSign className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">₹20 Lakhs</div>
                  <div className="text-xs text-gray-700">Max Loan</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <Clock className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">4 Years</div>
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
                    Apply for Hotel Management Loan
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

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                  alt="Luxury hotel lobby and hospitality environment"
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
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="font-bold text-black">15%</div>
                    <div className="text-sm text-gray-700">Annual Industry Growth</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-10 md:py-12 bg-gradient-to-tr from-teal-100 via-white to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Hotel Management Education Loan Features
            </h2>
            <p className="text-lg text-gray-800">
              Specialized financing for hospitality industry education
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
              Why Choose Hotel Management?
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

      {/* Hotel Management Specializations */}
      <section className="py-10 md:py-12 bg-gradient-to-bl from-white via-teal-50 to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Hotel Management Specializations
            </h2>
            <p className="text-lg text-gray-800">
              Diverse career paths in hospitality and tourism
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {hmSpecializations.map((spec, index) => (
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

      {/* Top Hotel Management Colleges */}
      <section className="py-10 md:py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Hotel Management Institutes in India
            </h2>
            <p className="text-lg text-gray-800">
              Premier institutions for hospitality education
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topHMColleges.map((college, index) => (
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
      <section className="py-10 md:py-12 bg-gradient-to-r from-teal-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Hotel Management Career Prospects
            </h2>
            <p className="text-lg text-gray-800">
              Diverse opportunities in hospitality, travel, and tourism
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
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityHM.map((item, index) => (
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
                {documentsHM.map((item, index) => (
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
        title="Hotel Management Education Loan FAQs"
        subtitle="Common questions about financing your hospitality education"
        faqs={[
          {
            question: "What is the cost of hotel management courses?",
            answer: "Hotel management courses (BHMCT/BHM) cost ₹1.5-3 Lakhs at government IHMs and ₹5-12 Lakhs at private institutes for the 4-year program. Premium institutes like Welcomgroup and Oberoi STEP may cost more. Loans of ₹8-20 Lakhs cover all expenses."
          },
          {
            question: "Are IHM students eligible for special loan benefits?",
            answer: "Students at government IHMs (Institute of Hotel Management) enjoy lower fees and often qualify for collateral-free loans. Many banks have tie-ups with premier IHMs offering faster processing and competitive interest rates."
          },
          {
            question: "What are the career prospects in hotel management?",
            answer: "Hotel management offers diverse careers in hotels, airlines, cruise ships, event management, and food chains. Starting salaries range from ₹2.5-5 LPA domestically, while international placements (cruise ships, Middle East hotels) offer ₹8-20 LPA."
          },
          {
            question: "Can I work internationally after hotel management?",
            answer: "Yes, hotel management qualifications are globally recognized. Cruise ship jobs, Middle East hotels, and international hotel chains actively recruit Indian graduates. International jobs significantly ease loan repayment with higher salaries."
          },
          {
            question: "Does the loan cover industrial training expenses?",
            answer: "Yes, education loans typically cover industrial training and internship period expenses, which are part of the curriculum. Some premium hotels provide stipends during training, which can supplement your finances."
          },
          {
            question: "Is hotel management a good investment post-COVID?",
            answer: "The hospitality industry has rebounded strongly post-pandemic with tourism growth. Hotel management remains a solid investment with diverse career options in hotels, events, airlines, and the growing food service industry."
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
              Start Your Hospitality Career Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and enter the dynamic world of hospitality
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for Hotel Management Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}