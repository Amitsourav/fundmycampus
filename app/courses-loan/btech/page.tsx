"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Zap, Cog, Wrench, Code } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem, scrollReveal, cardHover } from "@/lib/animations";

export default function BTechEducationLoanPage() {
  const btechSpecializations = [
    {
      name: "Computer Science & Engineering",
      description: "Software development, AI/ML, data structures, algorithms",
      icon: Code,
      careerPath: "Software Engineer, Data Scientist, Tech Lead, Product Manager",
      avgSalary: "₹6-25 Lakhs/year"
    },
    {
      name: "Electronics & Communication",
      description: "Circuit design, telecommunications, embedded systems",
      icon: Zap,
      careerPath: "Electronics Engineer, Telecom Engineer, Hardware Designer",
      avgSalary: "₹4-15 Lakhs/year"
    },
    {
      name: "Mechanical Engineering",
      description: "Machine design, manufacturing, automotive, aerospace",
      icon: Cog,
      careerPath: "Mechanical Engineer, Design Engineer, Manufacturing Engineer",
      avgSalary: "₹4-12 Lakhs/year"
    },
    {
      name: "Civil Engineering",
      description: "Construction, infrastructure, structural design, project management",
      icon: Wrench,
      careerPath: "Civil Engineer, Construction Manager, Structural Engineer",
      avgSalary: "₹3-10 Lakhs/year"
    },
    {
      name: "Information Technology",
      description: "Web development, database management, network systems",
      icon: Target,
      careerPath: "IT Specialist, Network Engineer, System Administrator",
      avgSalary: "₹5-20 Lakhs/year"
    },
    {
      name: "Chemical Engineering",
      description: "Process engineering, petroleum, pharmaceuticals, materials",
      icon: Users,
      careerPath: "Chemical Engineer, Process Engineer, Research Scientist",
      avgSalary: "₹4-15 Lakhs/year"
    }
  ];

  const topBTechColleges = [
    {
      name: "Indian Institute of Technology, Bombay",
      type: "Government (IIT)",
      fees: "₹8-10 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A++, NBA",
      specialities: "Premier Engineering Institute, Global Recognition"
    },
    {
      name: "Indian Institute of Technology, Delhi",
      type: "Government (IIT)",
      fees: "₹8-10 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A++, NBA",
      specialities: "Research Excellence, Industry Connect"
    },
    {
      name: "National Institute of Technology, Trichy",
      type: "Government (NIT)",
      fees: "₹5-6 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A+, NBA",
      specialities: "Top NIT, Strong Alumni Network"
    },
    {
      name: "Birla Institute of Technology & Science, Pilani",
      type: "Private (Deemed)",
      fees: "₹15-18 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A, NBA",
      specialities: "Industry Partnerships, Innovation Focus"
    },
    {
      name: "VIT University, Vellore",
      type: "Private (Deemed)",
      fees: "₹8-12 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A+, NBA",
      specialities: "International Programs, Modern Infrastructure"
    },
    {
      name: "Delhi Technological University",
      type: "Government (State)",
      fees: "₹3-4 Lakhs",
      duration: "4 Years",
      accreditation: "NAAC A+, NBA",
      specialities: "Affordable Excellence, Industry Integration"
    }
  ];

  const loanFeatures = [
    { icon: DollarSign, title: "Up to ₹30 Lakhs", description: "Complete coverage for B.Tech fees and engineering expenses" },
    { icon: Shield, title: "No Collateral Required", description: "Up to ₹7.5 Lakhs without security for premier engineering colleges" },
    { icon: Clock, title: "Quick Processing", description: "Fast approval within 10-15 working days" },
    { icon: Award, title: "Engineering Course Benefits", description: "Special terms recognizing high employment potential" },
  ];

  const careerProspects = [
    { role: "Software Engineer", avgSalary: "₹6-25 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Data Scientist", avgSalary: "₹8-30 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Product Manager", avgSalary: "₹10-40 LPA", growth: "Very High", demand: "Excellent" },
    { role: "Mechanical Engineer", avgSalary: "₹4-12 LPA", growth: "Moderate", demand: "Good" },
    { role: "Electronics Engineer", avgSalary: "₹4-15 LPA", growth: "High", demand: "Good" },
    { role: "Civil Engineer", avgSalary: "₹3-10 LPA", growth: "Moderate", demand: "Good" },
    { role: "System Analyst", avgSalary: "₹5-18 LPA", growth: "High", demand: "Very Good" },
    { role: "Tech Lead", avgSalary: "₹12-50 LPA", growth: "Very High", demand: "Excellent" }
  ];

  const industryFacts = [
    {
      title: "High Employability",
      value: "95%+ Placement",
      description: "Top engineering colleges report excellent placement rates"
    },
    {
      title: "Salary Growth",
      value: "20-30% Annual",
      description: "Engineering professionals enjoy rapid salary progression"
    },
    {
      title: "Global Opportunities",
      value: "Worldwide Demand",
      description: "Engineering skills are valued globally across industries"
    },
    {
      title: "Innovation Leaders",
      value: "Tech Entrepreneurs",
      description: "Many successful startups founded by engineering graduates"
    }
  ];

  const eligibilityBTech = [
    "Completed 10+2 with Physics, Chemistry, Mathematics (PCM) as compulsory subjects",
    "Minimum 75% marks in PCM (65% for reserved categories)",
    "Valid JEE Main/Advanced scores or state entrance exam qualification",
    "Age between 17-25 years at the time of admission",
    "Medical fitness for technical education"
  ];

  const documentsBTech = [
    "10th and 12th mark sheets and certificates",
    "JEE Main/Advanced scorecard and rank card",
    "College/engineering institute admission letter with fee structure",
    "Income certificate and IT returns of parents/guardians",
    "Bank statements of co-applicant (last 6 months)",
    "Caste/category certificate (if applicable)",
    "Character certificate and medical fitness certificate"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1920"
            alt="Engineering laboratory and technology workspace"
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
              <Cpu className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Education Loan for B.Tech
              <span className="block text-yellow-400 mt-2">Bachelor of Technology</span>
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Build your engineering career with a B.Tech degree from premier institutions. 
              Get comprehensive loan coverage up to ₹30 Lakhs for your technology education.
            </motion.p>
            
            <motion.div 
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="primary" size="lg">
                Apply for B.Tech Loan
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
      <section className="py-20 bg-gradient-to-bl from-white via-yellow-50 to-amber-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              B.Tech Education Loan Features
            </h2>
            <p className="text-lg text-gray-600">
              Specialized financing for engineering education
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
              Why Choose Engineering?
            </h2>
            <p className="text-lg text-gray-600">
              Industry insights and career growth potential
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

      {/* B.Tech Specializations */}
      <section className="py-20 bg-gradient-to-tr from-yellow-100 via-white to-yellow-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              B.Tech Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-600">
              Diverse engineering disciplines for technology careers
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {btechSpecializations.map((spec, index) => (
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

      {/* Top B.Tech Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Engineering Colleges in India
            </h2>
            <p className="text-lg text-gray-600">
              Premier institutions for technology education
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topBTechColleges.map((college, index) => (
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
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              B.Tech Career Prospects
            </h2>
            <p className="text-lg text-gray-600">
              Excellent opportunities across technology sectors
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
                B.Tech Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {eligibilityBTech.map((item, index) => (
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
                {documentsBTech.map((item, index) => (
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
              Start Your Engineering Journey Today
            </h2>
            <p className="text-xl text-black mb-10">
              Apply now for education loan and build tomorrow's technology
            </p>
            <Button variant="secondary" size="lg">
              Apply for B.Tech Education Loan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}