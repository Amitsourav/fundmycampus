"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, CheckCircle, ArrowRight, GraduationCap, DollarSign, FileText, Clock, Shield, Award, BookOpen, Users, Target, Heart, Activity, Brain, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
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
      {/* Hero Section - Split Layout */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white via-teal-50/30 to-white">
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
                  <HeartHandshake className="h-8 w-8 text-black" />
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-serif text-display-md md:text-display-lg text-black mb-4"
              >
                Education Loan for BSc Nursing
                <span className="block text-teal-600 mt-2">Bachelor of Science in Nursing</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-800 mb-8 leading-relaxed"
              >
                Join the noble nursing profession with comprehensive loan coverage up to ₹12 Lakhs
                for BSc Nursing education at premier healthcare institutions.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <DollarSign className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">₹12 Lakhs</div>
                  <div className="text-xs text-gray-700">Max Loan</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <Clock className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">4 Years</div>
                  <div className="text-xs text-gray-700">Course Duration</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md border border-gray-100">
                  <Award className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-bold text-black">6.75%</div>
                  <div className="text-xs text-gray-700">Interest Rate</div>
                </div>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/#contact-form">
                  <Button variant="primary" size="lg">
                    Apply for BSc Nursing Loan
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
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
                  alt="Nurses in healthcare setting providing patient care"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  loading="lazy"
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
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-black">95%+</div>
                    <div className="text-sm text-gray-700">Employment Rate</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BSc Nursing Education Loan Features
            </h2>
            <p className="text-lg text-gray-800">
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
                <feature.icon className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-black mb-2">{feature.title}</h3>
                <p className="text-gray-800 text-sm">{feature.description}</p>
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
            <p className="text-lg text-gray-800">
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
                <h3 className="font-serif text-2xl text-teal-600 mb-2">{fact.value}</h3>
                <h4 className="font-medium text-black mb-3">{fact.title}</h4>
                <p className="text-gray-800 text-sm">{fact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nursing Specializations */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Nursing Specializations & Career Paths
            </h2>
            <p className="text-lg text-gray-800">
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

      {/* Top BSc Nursing Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              Top Nursing Colleges in India
            </h2>
            <p className="text-lg text-gray-800">
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
      <section className="py-20 bg-gradient-to-bl from-white via-teal-50 to-teal-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-display-md text-black mb-4">
              BSc Nursing Career Prospects
            </h2>
            <p className="text-lg text-gray-800">
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
                {documentsBScNursing.map((item, index) => (
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
        title="BSc Nursing Education Loan FAQs"
        subtitle="Common questions about financing your nursing education"
        faqs={[
          {
            question: "What is the cost of BSc Nursing and loan requirement?",
            answer: "BSc Nursing costs ₹50,000-2 Lakhs at government colleges and ₹3-6 Lakhs at private colleges for the 4-year course. Education loans of ₹5-12 Lakhs typically cover all expenses including hostel and clinical training materials."
          },
          {
            question: "Is BSc Nursing eligible for collateral-free loans?",
            answer: "Yes, most BSc Nursing programs fall within the ₹7.5 Lakhs collateral-free limit. Government nursing college students often need minimal loans. Private college students can also avail collateral-free loans from most banks."
          },
          {
            question: "What are job prospects for loan repayment?",
            answer: "Nursing has excellent job security with 95%+ employment rate. Starting salaries range from ₹2.5-5 LPA in India, with significantly higher pay in government hospitals, abroad (Gulf, UK, Australia), and specializations like ICU nursing."
          },
          {
            question: "Can I work abroad after BSc Nursing?",
            answer: "Yes, BSc Nursing is recognized internationally. After clearing exams like NCLEX (USA), NMC CBT (UK), or HAAD/DHA (Gulf), nurses can work abroad with salaries of ₹15-40 LPA, making loan repayment very easy."
          },
          {
            question: "Are there special schemes for nursing students?",
            answer: "Yes, several state governments offer scholarships and stipends for nursing students. The healthcare sector focus post-pandemic has led to more schemes supporting nursing education. Check state-specific nursing council websites."
          },
          {
            question: "What is the repayment period for nursing education loans?",
            answer: "Standard repayment periods of 5-10 years apply. With the moratorium covering course duration plus 6-12 months, and high employment rates, nursing graduates typically face no difficulty in loan repayment."
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
              Start Your Nursing Career Journey
            </h2>
            <p className="text-xl text-black-800 mb-10">
              Apply now for education loan and make a difference in healthcare
            </p>
            <Link href="/#contact-form">
              <Button variant="secondary" size="lg">
                Apply for BSc Nursing Education Loan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}