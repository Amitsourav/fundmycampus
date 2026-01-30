"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hotel, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, ChefHat, Globe, Utensils, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
            alt="Luxury hotel lobby and hospitality environment"
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
              <Hotel className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Education Loan for Hotel Management
              <span className="block text-yellow-400 mt-2">Bachelor of Hotel Management & Catering Technology</span>
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Build your career in the thriving hospitality industry with comprehensive loan coverage 
              up to ₹20 Lakhs for hotel management and culinary programs.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply for Hotel Management Loan
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
      <section className="py-20 bg-gradient-to-tr from-yellow-100 via-white to-yellow-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Hotel Management Education Loan Features
            </h2>
            <p className="text-lg text-gray-600">
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
              Why Choose Hotel Management?
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

      {/* Hotel Management Specializations */}
      <section className="py-20 bg-gradient-to-bl from-white via-yellow-50 to-amber-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Hotel Management Specializations
            </h2>
            <p className="text-lg text-gray-600">
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

      {/* Top Hotel Management Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Hotel Management Institutes in India
            </h2>
            <p className="text-lg text-gray-600">
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
      <section className="py-20 bg-gradient-to-r from-amber-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Hotel Management Career Prospects
            </h2>
            <p className="text-lg text-gray-600">
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
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityHM.map((item, index) => (
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
                {documentsHM.map((item, index) => (
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
              Start Your Hospitality Career Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and enter the dynamic world of hospitality
            </p>
            <Button variant="secondary" size="lg">
              Apply for Hotel Management Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}