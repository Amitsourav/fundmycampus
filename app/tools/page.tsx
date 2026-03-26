"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Calendar,
  PiggyBank,
  GraduationCap,
  Home,
  BookOpen,
  Plane,
  FileText,
  Info,
  ChevronDown,
  Award,
  Scale,
  Receipt,
  FileEdit,
  CheckCircle,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function ToolsPage() {
  // Navigation visibility state
  const [showToolsNav, setShowToolsNav] = useState(true);
  const toolsSectionRef = useRef<HTMLDivElement>(null);

  // Handle scroll to show/hide tools navigation
  useEffect(() => {
    const handleScroll = () => {
      if (toolsSectionRef.current) {
        const toolsSection = toolsSectionRef.current;
        const toolsBottom = toolsSection.offsetTop + toolsSection.offsetHeight;
        const scrollPosition = window.scrollY + 200; // Account for navbar height

        setShowToolsNav(scrollPosition < toolsBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // EMI Calculator States
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [loanTenure, setLoanTenure] = useState<number>(10);
  const [emiResult, setEmiResult] = useState<{
    emi: number;
    totalAmount: number;
    totalInterest: number;
  } | null>(null);

  // Cost Calculator States
  const [country, setCountry] = useState<string>("india");
  const [courseType, setCourseType] = useState<string>("engineering");
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [customFee, setCustomFee] = useState<number>(500000);
  const [duration, setDuration] = useState<number>(4);
  const [accommodation, setAccommodation] = useState<string>("hostel");
  const [costResult, setCostResult] = useState<{
    tuitionFee: number;
    livingExpenses: number;
    otherExpenses: number;
    totalCost: number;
    collegeName: string;
  } | null>(null);

  // College Database
  const collegeData: Record<string, Record<string, Array<{ name: string; fee: number; ranking?: string }>>> = {
    india: {
      engineering: [
        { name: "IIT Bombay", fee: 250000, ranking: "#1" },
        { name: "IIT Delhi", fee: 250000, ranking: "#2" },
        { name: "IIT Madras", fee: 250000, ranking: "#3" },
        { name: "BITS Pilani", fee: 500000, ranking: "#4" },
        { name: "NIT Trichy", fee: 150000, ranking: "#5" },
        { name: "VIT Vellore", fee: 200000, ranking: "Top 20" },
        { name: "SRM Chennai", fee: 300000, ranking: "Top 30" },
        { name: "Average Private College", fee: 150000 },
      ],
      medical: [
        { name: "AIIMS Delhi", fee: 50000, ranking: "#1" },
        { name: "CMC Vellore", fee: 250000, ranking: "#2" },
        { name: "JIPMER", fee: 50000, ranking: "#3" },
        { name: "Manipal College of Medical Sciences", fee: 800000, ranking: "Top 10" },
        { name: "Kasturba Medical College", fee: 700000, ranking: "Top 15" },
        { name: "Average Private Medical College", fee: 500000 },
      ],
      management: [
        { name: "IIM Ahmedabad", fee: 2500000, ranking: "#1" },
        { name: "IIM Bangalore", fee: 2400000, ranking: "#2" },
        { name: "IIM Calcutta", fee: 2700000, ranking: "#3" },
        { name: "ISB Hyderabad", fee: 4200000, ranking: "#4" },
        { name: "XLRI Jamshedpur", fee: 2500000, ranking: "#5" },
        { name: "SP Jain Mumbai", fee: 2000000, ranking: "Top 10" },
        { name: "Average Private B-School", fee: 800000 },
      ],
      arts: [
        { name: "St. Stephen's College Delhi", fee: 50000, ranking: "#1" },
        { name: "Lady Shri Ram College", fee: 45000, ranking: "#2" },
        { name: "Loyola College Chennai", fee: 40000, ranking: "#3" },
        { name: "Christ University Bangalore", fee: 100000, ranking: "Top 10" },
        { name: "Average Arts College", fee: 50000 },
      ],
      science: [
        { name: "IISc Bangalore", fee: 50000, ranking: "#1" },
        { name: "St. Xavier's Mumbai", fee: 80000, ranking: "#2" },
        { name: "Presidency College Kolkata", fee: 30000, ranking: "#3" },
        { name: "Fergusson College Pune", fee: 40000, ranking: "Top 10" },
        { name: "Average Science College", fee: 60000 },
      ],
    },
    usa: {
      engineering: [
        { name: "MIT", fee: 5500000, ranking: "#1" },
        { name: "Stanford University", fee: 5800000, ranking: "#2" },
        { name: "Caltech", fee: 5600000, ranking: "#3" },
        { name: "Carnegie Mellon", fee: 5400000, ranking: "#4" },
        { name: "UC Berkeley", fee: 4500000, ranking: "#5" },
        { name: "Georgia Tech", fee: 4000000, ranking: "#6" },
        { name: "Average US University", fee: 4500000 },
      ],
      medical: [
        { name: "Harvard Medical School", fee: 8000000, ranking: "#1" },
        { name: "Johns Hopkins", fee: 7500000, ranking: "#2" },
        { name: "Stanford Medicine", fee: 7200000, ranking: "#3" },
        { name: "Mayo Clinic School", fee: 6800000, ranking: "#4" },
        { name: "Average US Medical School", fee: 7000000 },
      ],
      management: [
        { name: "Harvard Business School", fee: 7500000, ranking: "#1" },
        { name: "Stanford GSB", fee: 7800000, ranking: "#2" },
        { name: "Wharton (UPenn)", fee: 7200000, ranking: "#3" },
        { name: "Kellogg (Northwestern)", fee: 6500000, ranking: "#4" },
        { name: "Booth (Chicago)", fee: 6400000, ranking: "#5" },
        { name: "Average US MBA", fee: 5500000 },
      ],
      arts: [
        { name: "Yale University", fee: 5000000, ranking: "#1" },
        { name: "Columbia University", fee: 4800000, ranking: "#2" },
        { name: "Princeton University", fee: 4600000, ranking: "#3" },
        { name: "Average US University", fee: 3500000 },
      ],
      science: [
        { name: "MIT", fee: 5500000, ranking: "#1" },
        { name: "Caltech", fee: 5600000, ranking: "#2" },
        { name: "Harvard University", fee: 5200000, ranking: "#3" },
        { name: "UC Berkeley", fee: 4500000, ranking: "#4" },
        { name: "Average US University", fee: 4000000 },
      ],
    },
    uk: {
      engineering: [
        { name: "Imperial College London", fee: 4200000, ranking: "#1" },
        { name: "University of Cambridge", fee: 4000000, ranking: "#2" },
        { name: "University of Oxford", fee: 4000000, ranking: "#3" },
        { name: "UCL", fee: 3500000, ranking: "#4" },
        { name: "University of Manchester", fee: 3000000, ranking: "#5" },
        { name: "Average UK University", fee: 3500000 },
      ],
      medical: [
        { name: "University of Oxford", fee: 4500000, ranking: "#1" },
        { name: "University of Cambridge", fee: 4500000, ranking: "#2" },
        { name: "Imperial College London", fee: 4200000, ranking: "#3" },
        { name: "UCL", fee: 4000000, ranking: "#4" },
        { name: "Average UK Medical School", fee: 4000000 },
      ],
      management: [
        { name: "London Business School", fee: 6500000, ranking: "#1" },
        { name: "Oxford Said Business School", fee: 5500000, ranking: "#2" },
        { name: "Cambridge Judge", fee: 5500000, ranking: "#3" },
        { name: "Imperial Business School", fee: 5000000, ranking: "#4" },
        { name: "Average UK MBA", fee: 4000000 },
      ],
      arts: [
        { name: "University of Oxford", fee: 3500000, ranking: "#1" },
        { name: "University of Cambridge", fee: 3500000, ranking: "#2" },
        { name: "LSE", fee: 3200000, ranking: "#3" },
        { name: "Average UK University", fee: 2800000 },
      ],
      science: [
        { name: "University of Cambridge", fee: 3800000, ranking: "#1" },
        { name: "University of Oxford", fee: 3800000, ranking: "#2" },
        { name: "Imperial College London", fee: 3500000, ranking: "#3" },
        { name: "Average UK University", fee: 3000000 },
      ],
    },
    canada: {
      engineering: [
        { name: "University of Toronto", fee: 3500000, ranking: "#1" },
        { name: "University of Waterloo", fee: 3200000, ranking: "#2" },
        { name: "McGill University", fee: 2800000, ranking: "#3" },
        { name: "UBC", fee: 3000000, ranking: "#4" },
        { name: "Average Canadian University", fee: 2500000 },
      ],
      medical: [
        { name: "University of Toronto", fee: 4000000, ranking: "#1" },
        { name: "McGill University", fee: 3500000, ranking: "#2" },
        { name: "UBC", fee: 3200000, ranking: "#3" },
        { name: "Average Canadian Medical School", fee: 3000000 },
      ],
      management: [
        { name: "Rotman (Toronto)", fee: 4500000, ranking: "#1" },
        { name: "Ivey (Western)", fee: 4200000, ranking: "#2" },
        { name: "Schulich (York)", fee: 4000000, ranking: "#3" },
        { name: "Desautels (McGill)", fee: 3800000, ranking: "#4" },
        { name: "Average Canadian MBA", fee: 3000000 },
      ],
      arts: [
        { name: "University of Toronto", fee: 2500000, ranking: "#1" },
        { name: "McGill University", fee: 2200000, ranking: "#2" },
        { name: "UBC", fee: 2400000, ranking: "#3" },
        { name: "Average Canadian University", fee: 2000000 },
      ],
      science: [
        { name: "University of Toronto", fee: 2800000, ranking: "#1" },
        { name: "McGill University", fee: 2500000, ranking: "#2" },
        { name: "UBC", fee: 2600000, ranking: "#3" },
        { name: "Average Canadian University", fee: 2200000 },
      ],
    },
    australia: {
      engineering: [
        { name: "University of Melbourne", fee: 3800000, ranking: "#1" },
        { name: "University of Sydney", fee: 3500000, ranking: "#2" },
        { name: "UNSW Sydney", fee: 3400000, ranking: "#3" },
        { name: "Monash University", fee: 3200000, ranking: "#4" },
        { name: "Average Australian University", fee: 3000000 },
      ],
      medical: [
        { name: "University of Melbourne", fee: 4500000, ranking: "#1" },
        { name: "University of Sydney", fee: 4200000, ranking: "#2" },
        { name: "Monash University", fee: 4000000, ranking: "#3" },
        { name: "Average Australian Medical School", fee: 3800000 },
      ],
      management: [
        { name: "Melbourne Business School", fee: 5000000, ranking: "#1" },
        { name: "AGSM (UNSW)", fee: 4500000, ranking: "#2" },
        { name: "Sydney Business School", fee: 4200000, ranking: "#3" },
        { name: "Average Australian MBA", fee: 3500000 },
      ],
      arts: [
        { name: "University of Melbourne", fee: 2800000, ranking: "#1" },
        { name: "University of Sydney", fee: 2600000, ranking: "#2" },
        { name: "ANU", fee: 2500000, ranking: "#3" },
        { name: "Average Australian University", fee: 2200000 },
      ],
      science: [
        { name: "University of Melbourne", fee: 3200000, ranking: "#1" },
        { name: "ANU", fee: 3000000, ranking: "#2" },
        { name: "University of Sydney", fee: 2900000, ranking: "#3" },
        { name: "Average Australian University", fee: 2500000 },
      ],
    },
  };

  // Get available colleges based on selected country and course
  const getAvailableColleges = () => {
    return collegeData[country]?.[courseType] || [];
  };

  // Loan Eligibility Calculator States
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [existingEmi, setExistingEmi] = useState<number>(0);
  const [creditScore, setCreditScore] = useState<string>("750-800");
  const [coApplicantIncome, setCoApplicantIncome] = useState<number>(0);
  const [eligibilityResult, setEligibilityResult] = useState<{
    maxLoanAmount: number;
    eligibleEmi: number;
    bankOffers: Array<{ bank: string; maxLoan: number; rate: string }>;
  } | null>(null);

  // Loan Comparison Tool States
  const [loan1, setLoan1] = useState<{
    amount: number;
    rate: number;
    tenure: number;
    processingFee: number;
  }>({ amount: 1000000, rate: 9.5, tenure: 10, processingFee: 10000 });
  const [loan2, setLoan2] = useState<{
    amount: number;
    rate: number;
    tenure: number;
    processingFee: number;
  }>({ amount: 1000000, rate: 10.0, tenure: 10, processingFee: 15000 });
  const [loan3, setLoan3] = useState<{
    amount: number;
    rate: number;
    tenure: number;
    processingFee: number;
  }>({ amount: 1000000, rate: 10.5, tenure: 10, processingFee: 8000 });
  const [comparisonResult, setComparisonResult] = useState<{
    loan1: { emi: number; totalCost: number; totalInterest: number };
    loan2: { emi: number; totalCost: number; totalInterest: number };
    loan3: { emi: number; totalCost: number; totalInterest: number };
    bestOption: number;
  } | null>(null);

  // Tax Benefit Calculator States
  const [interestPaid, setInterestPaid] = useState<number>(100000);
  const [taxSlab, setTaxSlab] = useState<string>("30");
  const [taxResult, setTaxResult] = useState<{
    annualSavings: number;
    totalSavingsOverLoan: number;
    effectiveRate: number;
  } | null>(null);

  // SOP Review Tool States
  const [sopText, setSopText] = useState<string>("");
  const [sopCourse, setSopCourse] = useState<string>("mba");
  const [sopCountry, setSopCountry] = useState<string>("usa");
  const [sopResult, setSopResult] = useState<{
    score: number;
    strengths: string[];
    improvements: string[];
    wordCount: number;
    readabilityScore: string;
  } | null>(null);

  // EMI Calculation Formula
  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 100 / 12; // Monthly interest rate
    const months = loanTenure * 12;

    const emi = (principal * rate * Math.pow(1 + rate, months)) / 
                (Math.pow(1 + rate, months) - 1);
    
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    setEmiResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    });
  };

  // Cost Calculation Logic
  const calculateCost = () => {
    let tuitionFee = 0;
    let livingExpenses = 0;
    let otherExpenses = 0;
    let collegeName = "Selected Institution";

    // Handle "Other" option with custom fee
    if (selectedCollege === "other") {
      tuitionFee = customFee * duration;
      collegeName = "Custom Institution";
    } else {
      // Get tuition fee from selected college
      const colleges = getAvailableColleges();
      const college = colleges.find(c => c.name === selectedCollege);

      if (college) {
        tuitionFee = college.fee * duration;
        collegeName = college.name;
      } else {
        // Fallback to average fees if no college selected
        const avgCollege = colleges[colleges.length - 1]; // Last one is usually "Average"
        if (avgCollege) {
          tuitionFee = avgCollege.fee * duration;
          collegeName = avgCollege.name;
        }
      }
    }

    // Living Expenses Calculation
    if (country === "india") {
      livingExpenses = accommodation === "hostel" ? 100000 * duration : 150000 * duration;
      otherExpenses = 50000 * duration;
    } else if (country === "usa") {
      livingExpenses = accommodation === "hostel" ? 1200000 * duration : 1800000 * duration;
      otherExpenses = 400000 * duration;
    } else if (country === "uk") {
      livingExpenses = accommodation === "hostel" ? 1000000 * duration : 1500000 * duration;
      otherExpenses = 350000 * duration;
    } else if (country === "canada") {
      livingExpenses = accommodation === "hostel" ? 900000 * duration : 1400000 * duration;
      otherExpenses = 300000 * duration;
    } else if (country === "australia") {
      livingExpenses = accommodation === "hostel" ? 1000000 * duration : 1600000 * duration;
      otherExpenses = 350000 * duration;
    }

    setCostResult({
      tuitionFee,
      livingExpenses,
      otherExpenses,
      totalCost: tuitionFee + livingExpenses + otherExpenses,
      collegeName
    });
  };

  // Loan Eligibility Calculation
  const calculateEligibility = () => {
    const totalIncome = monthlyIncome + coApplicantIncome;
    const availableIncome = totalIncome - existingEmi;
    
    // Standard DTI ratio of 40-50%
    const maxAllowedEmi = availableIncome * 0.45;
    
    // Credit score multiplier
    let creditMultiplier = 1;
    switch(creditScore) {
      case "800+":
        creditMultiplier = 1.2;
        break;
      case "750-800":
        creditMultiplier = 1.0;
        break;
      case "700-750":
        creditMultiplier = 0.8;
        break;
      case "650-700":
        creditMultiplier = 0.6;
        break;
      default:
        creditMultiplier = 0.4;
    }
    
    const eligibleEmi = maxAllowedEmi * creditMultiplier;
    
    // Calculate max loan amount (assuming 10% interest for 10 years)
    const rate = 0.10 / 12;
    const months = 10 * 12;
    const maxLoanAmount = (eligibleEmi * (Math.pow(1 + rate, months) - 1)) / (rate * Math.pow(1 + rate, months));
    
    // Bank offers based on credit score
    const bankOffers = [
      { bank: "SBI", maxLoan: maxLoanAmount * 0.9, rate: "9.5% - 11.5%" },
      { bank: "HDFC", maxLoan: maxLoanAmount * 0.95, rate: "10.0% - 12.0%" },
      { bank: "ICICI", maxLoan: maxLoanAmount * 0.85, rate: "10.5% - 12.5%" },
      { bank: "Axis Bank", maxLoan: maxLoanAmount * 0.88, rate: "10.25% - 12.25%" }
    ];
    
    setEligibilityResult({
      maxLoanAmount: Math.round(maxLoanAmount),
      eligibleEmi: Math.round(eligibleEmi),
      bankOffers
    });
  };

  // Loan Comparison Calculation
  const compareLoanOffers = () => {
    const calculateLoanMetrics = (loan: typeof loan1) => {
      const rate = loan.rate / 100 / 12;
      const months = loan.tenure * 12;
      const emi = (loan.amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      const totalAmount = emi * months;
      const totalInterest = totalAmount - loan.amount;
      const totalCost = totalAmount + loan.processingFee;
      
      return {
        emi: Math.round(emi),
        totalCost: Math.round(totalCost),
        totalInterest: Math.round(totalInterest)
      };
    };

    const loan1Metrics = calculateLoanMetrics(loan1);
    const loan2Metrics = calculateLoanMetrics(loan2);
    const loan3Metrics = calculateLoanMetrics(loan3);
    
    // Find best option (lowest total cost)
    const costs = [loan1Metrics.totalCost, loan2Metrics.totalCost, loan3Metrics.totalCost];
    const bestOption = costs.indexOf(Math.min(...costs)) + 1;
    
    setComparisonResult({
      loan1: loan1Metrics,
      loan2: loan2Metrics,
      loan3: loan3Metrics,
      bestOption
    });
  };

  // Tax Benefit Calculation
  const calculateTaxBenefit = () => {
    const taxRate = parseInt(taxSlab) / 100;
    const annualSavings = Math.min(interestPaid, 100000) * taxRate; // Section 80E has no limit, but practical limit

    // Assuming 10-year loan tenure
    const totalSavingsOverLoan = annualSavings * 10;

    // Effective interest rate after tax benefit
    const originalRate = 10; // Assuming 10% base rate
    const effectiveRate = originalRate - (annualSavings / interestPaid) * 100;

    setTaxResult({
      annualSavings: Math.round(annualSavings),
      totalSavingsOverLoan: Math.round(totalSavingsOverLoan),
      effectiveRate: Math.round(effectiveRate * 100) / 100
    });
  };

  // SOP Review Analysis
  const analyzeSOP = () => {
    const wordCount = sopText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = sopText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = wordCount / Math.max(sentences.length, 1);

    // Scoring criteria
    let score = 0;
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Word count scoring (ideal: 500-1000 words)
    if (wordCount >= 500 && wordCount <= 1000) {
      score += 25;
      strengths.push("Ideal word count for most applications");
    } else if (wordCount >= 400 && wordCount <= 1200) {
      score += 15;
      if (wordCount < 500) improvements.push("Consider expanding to at least 500 words");
      if (wordCount > 1000) improvements.push("Consider trimming to under 1000 words");
    } else {
      score += 5;
      if (wordCount < 400) improvements.push("SOP is too short - aim for 500-1000 words");
      if (wordCount > 1200) improvements.push("SOP is too long - aim for 500-1000 words");
    }

    // Check for key elements
    const lowerText = sopText.toLowerCase();

    // Personal motivation
    if (lowerText.includes("passion") || lowerText.includes("motivated") || lowerText.includes("inspired") || lowerText.includes("dream")) {
      score += 15;
      strengths.push("Shows personal motivation and passion");
    } else {
      improvements.push("Add personal motivation - why this field excites you");
    }

    // Career goals
    if (lowerText.includes("career") || lowerText.includes("goal") || lowerText.includes("aspire") || lowerText.includes("future")) {
      score += 15;
      strengths.push("Includes clear career goals");
    } else {
      improvements.push("Include your career goals and aspirations");
    }

    // Why this university/program
    if (lowerText.includes("university") || lowerText.includes("program") || lowerText.includes("curriculum") || lowerText.includes("faculty")) {
      score += 15;
      strengths.push("Mentions specific program/university details");
    } else {
      improvements.push("Explain why this specific program/university");
    }

    // Relevant experience
    if (lowerText.includes("experience") || lowerText.includes("project") || lowerText.includes("internship") || lowerText.includes("work")) {
      score += 15;
      strengths.push("Highlights relevant experience");
    } else {
      improvements.push("Add relevant work/project experience");
    }

    // Skills mention
    if (lowerText.includes("skill") || lowerText.includes("ability") || lowerText.includes("expertise") || lowerText.includes("proficient")) {
      score += 10;
      strengths.push("Mentions relevant skills");
    } else {
      improvements.push("Highlight your key skills");
    }

    // Readability
    let readabilityScore = "Good";
    if (avgWordsPerSentence > 25) {
      readabilityScore = "Complex";
      improvements.push("Sentences are too long - aim for 15-20 words per sentence");
    } else if (avgWordsPerSentence < 10) {
      readabilityScore = "Simple";
      improvements.push("Sentences are too short - add more detail");
    } else {
      score += 5;
      strengths.push("Good sentence structure and readability");
    }

    // Ensure minimum score
    score = Math.max(score, 10);
    score = Math.min(score, 100);

    setSopResult({
      score,
      strengths,
      improvements,
      wordCount,
      readabilityScore
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero Section - Split Layout */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-white">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500 -skew-x-12 translate-x-20 hidden lg:block" />

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
                  <Calculator className="h-5 w-5 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">Financial Tools</span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-6 leading-tight"
              >
                Free Education Loan
                <span className="block text-teal-600">Calculators & Tools</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-lg text-gray-800 mb-8 leading-relaxed max-w-lg"
              >
                Smart calculators to help you plan your education loan and estimate
                total study costs. Make informed financial decisions for your academic journey.
              </motion.p>

              {/* Tool highlights */}
              <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">EMI Calculator</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Cost Estimator</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Loan Eligibility</span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">SOP Review</span>
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=90"
                alt="Financial planning and calculation tools"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools Navigation - Sticky */}
      <section className={`sticky top-20 z-40 py-2 md:py-6 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300 ${showToolsNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="max-w-screen-xl mx-auto px-3 md:px-8">
          <p className="text-center text-xs md:text-sm text-gray-700 mb-2 md:mb-4">Jump to a tool</p>
          <div className="flex md:flex-wrap md:justify-center gap-2 md:gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <a href="#emi-calculator" className="group shrink-0 px-3 py-1.5 md:px-5 md:py-3 bg-teal-500 hover:bg-teal-500 rounded-lg md:rounded-xl border-2 border-teal-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="flex items-center gap-1.5 md:gap-2">
                <Calculator className="w-4 h-4 md:w-5 md:h-5 text-black" />
                <span className="font-semibold text-xs md:text-base text-black whitespace-nowrap">EMI Calculator</span>
              </span>
            </a>
            <a href="#cost-calculator" className="group shrink-0 px-3 py-1.5 md:px-5 md:py-3 bg-white hover:bg-teal-500 rounded-lg md:rounded-xl border-2 border-gray-200 hover:border-teal-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="flex items-center gap-1.5 md:gap-2">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-teal-600 group-hover:text-black" />
                <span className="font-semibold text-xs md:text-base text-gray-800 group-hover:text-black whitespace-nowrap">Cost Calculator</span>
              </span>
            </a>
            <a href="#eligibility-calculator" className="group shrink-0 px-3 py-1.5 md:px-5 md:py-3 bg-white hover:bg-teal-500 rounded-lg md:rounded-xl border-2 border-gray-200 hover:border-teal-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="flex items-center gap-1.5 md:gap-2">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-teal-600 group-hover:text-black" />
                <span className="font-semibold text-xs md:text-base text-gray-800 group-hover:text-black whitespace-nowrap">Loan Eligibility</span>
              </span>
            </a>
            <a href="#comparison-tool" className="group shrink-0 px-3 py-1.5 md:px-5 md:py-3 bg-white hover:bg-teal-500 rounded-lg md:rounded-xl border-2 border-gray-200 hover:border-teal-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="flex items-center gap-1.5 md:gap-2">
                <Scale className="w-4 h-4 md:w-5 md:h-5 text-teal-600 group-hover:text-black" />
                <span className="font-semibold text-xs md:text-base text-gray-800 group-hover:text-black whitespace-nowrap">Loan Comparison</span>
              </span>
            </a>
            <a href="#tax-calculator" className="group shrink-0 px-3 py-1.5 md:px-5 md:py-3 bg-white hover:bg-teal-500 rounded-lg md:rounded-xl border-2 border-gray-200 hover:border-teal-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="flex items-center gap-1.5 md:gap-2">
                <Receipt className="w-4 h-4 md:w-5 md:h-5 text-teal-600 group-hover:text-black" />
                <span className="font-semibold text-xs md:text-base text-gray-800 group-hover:text-black whitespace-nowrap">Tax Benefits</span>
              </span>
            </a>
            <a href="#sop-review" className="group shrink-0 px-3 py-1.5 md:px-5 md:py-3 bg-white hover:bg-teal-500 rounded-lg md:rounded-xl border-2 border-gray-200 hover:border-teal-500 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <span className="flex items-center gap-1.5 md:gap-2">
                <FileEdit className="w-4 h-4 md:w-5 md:h-5 text-teal-600 group-hover:text-black" />
                <span className="font-semibold text-xs md:text-base text-gray-800 group-hover:text-black whitespace-nowrap">SOP Review</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Tools Sections Container */}
      <div ref={toolsSectionRef}>
      {/* EMI Calculator Section */}
      <section id="emi-calculator" className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-serif text-display-md text-black mb-4">
                Education Loan EMI Calculator
              </h2>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto">
                Calculate your monthly EMI based on loan amount, interest rate, and tenure. 
                Plan your repayment strategy with accurate projections.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Calculator Input */}
              <div className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] transition-all duration-500">
                <h3 className="font-serif text-2xl text-black mb-6">Loan Details</h3>
                
                <div className="space-y-6">
                  {/* Loan Amount */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <PiggyBank className="w-4 h-4 text-teal-600" />
                        Loan Amount
                      </span>
                      <span className="text-teal-600 font-bold">{formatCurrency(loanAmount)}</span>
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="50000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-700 mt-1">
                      <span>₹1 Lakh</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-teal-600" />
                        Interest Rate (% p.a.)
                      </span>
                      <span className="text-teal-600 font-bold">{interestRate}%</span>
                    </label>
                    <input
                      type="range"
                      min="6"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-700 mt-1">
                      <span>6%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-teal-600" />
                        Loan Tenure (Years)
                      </span>
                      <span className="text-teal-600 font-bold">{loanTenure} Years</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-700 mt-1">
                      <span>1 Year</span>
                      <span>20 Years</span>
                    </div>
                  </div>

                  <Button 
                    onClick={calculateEMI}
                    variant="primary" 
                    size="lg" 
                    className="w-full bg-teal-500 hover:bg-teal-600"
                  >
                    Calculate EMI
                  </Button>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100 rounded-card p-8 border border-teal-200">
                <h3 className="font-serif text-2xl text-black mb-6">EMI Breakdown</h3>
                
                {emiResult ? (
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-800 mb-2">Monthly EMI</p>
                        <p className="text-4xl font-bold text-teal-600">{formatCurrency(emiResult.emi)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-800 mb-1">Principal Amount</p>
                        <p className="text-xl font-bold text-black">{formatCurrency(loanAmount)}</p>
                      </div>
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-800 mb-1">Total Interest</p>
                        <p className="text-xl font-bold text-black">{formatCurrency(emiResult.totalInterest)}</p>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                      <p className="text-sm text-gray-800 mb-1">Total Amount Payable</p>
                      <p className="text-2xl font-bold text-black">{formatCurrency(emiResult.totalAmount)}</p>
                    </div>

                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="font-medium mb-1">EMI Calculation Formula:</p>
                          <p className="text-xs">EMI = [P x R x (1+R)^N]/[(1+R)^N-1]</p>
                          <p className="text-xs mt-1">Where P = Principal, R = Monthly Interest Rate, N = Number of Months</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-700">Enter loan details and click Calculate EMI to see results</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section id="cost-calculator" className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-serif text-display-md text-black mb-4">
                Education Cost Calculator
              </h2>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto">
                Estimate the total cost of your education including tuition fees, 
                living expenses, and other costs based on your destination and course.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Calculator Input */}
              <div className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] transition-all duration-500">
                <h3 className="font-serif text-2xl text-black mb-6">Study Details</h3>
                
                <div className="space-y-6">
                  {/* Country Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Plane className="w-4 h-4 text-teal-600" />
                      Study Destination
                    </label>
                    <select
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setSelectedCollege("");
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="india">India</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                    </select>
                  </div>

                  {/* Course Type */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <BookOpen className="w-4 h-4 text-teal-600" />
                      Course Type
                    </label>
                    <select
                      value={courseType}
                      onChange={(e) => {
                        setCourseType(e.target.value);
                        setSelectedCollege("");
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="engineering">Engineering</option>
                      <option value="medical">Medical</option>
                      <option value="management">Management</option>
                      <option value="arts">Arts & Humanities</option>
                      <option value="science">Science</option>
                    </select>
                  </div>

                  {/* College Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Award className="w-4 h-4 text-teal-600" />
                      Select College/University
                    </label>
                    <select
                      value={selectedCollege}
                      onChange={(e) => setSelectedCollege(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="">-- Select a College --</option>
                      {getAvailableColleges().map((college, index) => (
                        <option key={index} value={college.name}>
                          {college.name} {college.ranking ? `(${college.ranking})` : ""} - {formatCurrency(college.fee)}/year
                        </option>
                      ))}
                      <option value="other">Other (Enter custom fee)</option>
                    </select>
                    <p className="text-xs text-gray-700 mt-1">Fees shown are per year tuition only</p>
                  </div>

                  {/* Custom Fee Input (shown when "Other" is selected) */}
                  {selectedCollege === "other" && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 text-teal-600" />
                        Annual Tuition Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={customFee}
                        onChange={(e) => setCustomFee(Number(e.target.value))}
                        placeholder="Enter annual tuition fee"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>
                  )}

                  {/* Course Duration */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      Course Duration (Years)
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value={1}>1 Year</option>
                      <option value={2}>2 Years</option>
                      <option value={3}>3 Years</option>
                      <option value={4}>4 Years</option>
                      <option value={5}>5 Years</option>
                      <option value={6}>6 Years</option>
                    </select>
                  </div>

                  {/* Accommodation Type */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Home className="w-4 h-4 text-teal-600" />
                      Accommodation Type
                    </label>
                    <select
                      value={accommodation}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="hostel">University Hostel</option>
                      <option value="private">Private Accommodation</option>
                    </select>
                  </div>

                  <Button 
                    onClick={calculateCost}
                    variant="primary" 
                    size="lg" 
                    className="w-full bg-teal-500 hover:bg-teal-600"
                  >
                    Calculate Total Cost
                  </Button>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100 rounded-card p-8 border border-teal-200">
                <h3 className="font-serif text-2xl text-black mb-6">Cost Breakdown</h3>
                
                {costResult ? (
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm font-medium text-teal-700 mb-1">{costResult.collegeName}</p>
                        <p className="text-sm text-gray-800 mb-2">Total Education Cost</p>
                        <p className="text-4xl font-bold text-teal-600">{formatCurrency(costResult.totalCost)}</p>
                        <p className="text-xs text-gray-700 mt-2">For {duration} year(s)</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-800">
                            <GraduationCap className="w-4 h-4 text-teal-600" />
                            Tuition Fees
                          </span>
                          <span className="text-lg font-bold text-black">{formatCurrency(costResult.tuitionFee)}</span>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-800">
                            <Home className="w-4 h-4 text-teal-600" />
                            Living Expenses
                          </span>
                          <span className="text-lg font-bold text-black">{formatCurrency(costResult.livingExpenses)}</span>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-800">
                            <FileText className="w-4 h-4 text-teal-600" />
                            Other Expenses
                          </span>
                          <span className="text-lg font-bold text-black">{formatCurrency(costResult.otherExpenses)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="font-medium mb-1">Cost Estimation Note:</p>
                          <p className="text-xs">These are approximate costs based on average expenses. Actual costs may vary based on institution, location, and personal lifestyle choices.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-700">Select your study details and click Calculate to see estimated costs</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Loan Eligibility Calculator Section */}
      <section id="eligibility-calculator" className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-serif text-display-md text-black mb-4">
                Loan Eligibility Calculator
              </h2>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto">
                Determine your maximum loan eligibility based on income, credit score, 
                and existing commitments. Get personalized offers from top banks.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Calculator Input */}
              <div className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] transition-all duration-500">
                <h3 className="font-serif text-2xl text-black mb-6">Income & Credit Details</h3>
                
                <div className="space-y-6">
                  {/* Monthly Income */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-teal-600" />
                        Monthly Income
                      </span>
                      <span className="text-teal-600 font-bold">{formatCurrency(monthlyIncome)}</span>
                    </label>
                    <input
                      type="range"
                      min="20000"
                      max="200000"
                      step="5000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-700 mt-1">
                      <span>₹20k</span>
                      <span>₹2 Lakh</span>
                    </div>
                  </div>

                  {/* Existing EMI */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-teal-600" />
                        Existing EMI Commitments
                      </span>
                      <span className="text-teal-600 font-bold">{formatCurrency(existingEmi)}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={existingEmi}
                      onChange={(e) => setExistingEmi(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-700 mt-1">
                      <span>₹0</span>
                      <span>₹50k</span>
                    </div>
                  </div>

                  {/* Credit Score */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Award className="w-4 h-4 text-teal-600" />
                      Credit Score Range
                    </label>
                    <select
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="800+">800+ (Excellent)</option>
                      <option value="750-800">750-800 (Very Good)</option>
                      <option value="700-750">700-750 (Good)</option>
                      <option value="650-700">650-700 (Fair)</option>
                      <option value="600-650">600-650 (Poor)</option>
                    </select>
                  </div>

                  {/* Co-applicant Income */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-teal-600" />
                        Co-applicant Income (Optional)
                      </span>
                      <span className="text-teal-600 font-bold">{formatCurrency(coApplicantIncome)}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="5000"
                      value={coApplicantIncome}
                      onChange={(e) => setCoApplicantIncome(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-700 mt-1">
                      <span>₹0</span>
                      <span>₹1.5 Lakh</span>
                    </div>
                  </div>

                  <Button 
                    onClick={calculateEligibility}
                    variant="primary" 
                    size="lg" 
                    className="w-full bg-teal-500 hover:bg-teal-600"
                  >
                    Check Eligibility
                  </Button>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100 rounded-card p-8 border border-teal-200">
                <h3 className="font-serif text-2xl text-black mb-6">Eligibility Results</h3>
                
                {eligibilityResult ? (
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-800 mb-2">Maximum Loan Amount</p>
                        <p className="text-4xl font-bold text-teal-600">{formatCurrency(eligibilityResult.maxLoanAmount)}</p>
                        <p className="text-xs text-gray-700 mt-2">Based on 10-year tenure</p>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                      <p className="text-sm text-gray-800 mb-1">Maximum Eligible EMI</p>
                      <p className="text-2xl font-bold text-black">{formatCurrency(eligibilityResult.eligibleEmi)}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-black">Bank Offers</h4>
                      {eligibilityResult.bankOffers.map((offer, index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-black">{offer.bank}</p>
                              <p className="text-xs text-gray-800">Interest: {offer.rate}</p>
                            </div>
                            <p className="text-lg font-bold text-teal-600">{formatCurrency(offer.maxLoan)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="font-medium mb-1">Eligibility Note:</p>
                          <p className="text-xs">Final approval depends on detailed documentation, property valuation, and bank policies. These are indicative amounts.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-700">Enter your details and check eligibility to see loan offers</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Loan Comparison Tool Section */}
      <section id="comparison-tool" className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-serif text-display-md text-black mb-4">
                Loan Comparison Tool
              </h2>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto">
                Compare up to 3 different loan offers side by side. Analyze EMI, 
                total cost, and find the best deal for your education financing.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="space-y-8"
            >
              {/* Loan Input Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Loan 1 */}
                <div className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)]">
                  <h4 className="font-serif text-xl text-black mb-4">Loan Option 1</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Loan Amount</label>
                      <input
                        type="number"
                        value={loan1.amount}
                        onChange={(e) => setLoan1({...loan1, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="1000000"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={loan1.rate}
                        onChange={(e) => setLoan1({...loan1, rate: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="9.5"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Tenure (Years)</label>
                      <input
                        type="number"
                        value={loan1.tenure}
                        onChange={(e) => setLoan1({...loan1, tenure: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Processing Fee</label>
                      <input
                        type="number"
                        value={loan1.processingFee}
                        onChange={(e) => setLoan1({...loan1, processingFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="10000"
                      />
                    </div>
                  </div>
                </div>

                {/* Loan 2 */}
                <div className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)]">
                  <h4 className="font-serif text-xl text-black mb-4">Loan Option 2</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Loan Amount</label>
                      <input
                        type="number"
                        value={loan2.amount}
                        onChange={(e) => setLoan2({...loan2, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="1000000"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={loan2.rate}
                        onChange={(e) => setLoan2({...loan2, rate: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="10.0"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Tenure (Years)</label>
                      <input
                        type="number"
                        value={loan2.tenure}
                        onChange={(e) => setLoan2({...loan2, tenure: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Processing Fee</label>
                      <input
                        type="number"
                        value={loan2.processingFee}
                        onChange={(e) => setLoan2({...loan2, processingFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="15000"
                      />
                    </div>
                  </div>
                </div>

                {/* Loan 3 */}
                <div className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)]">
                  <h4 className="font-serif text-xl text-black mb-4">Loan Option 3</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Loan Amount</label>
                      <input
                        type="number"
                        value={loan3.amount}
                        onChange={(e) => setLoan3({...loan3, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="1000000"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={loan3.rate}
                        onChange={(e) => setLoan3({...loan3, rate: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="10.5"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Tenure (Years)</label>
                      <input
                        type="number"
                        value={loan3.tenure}
                        onChange={(e) => setLoan3({...loan3, tenure: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-800 mb-1 block">Processing Fee</label>
                      <input
                        type="number"
                        value={loan3.processingFee}
                        onChange={(e) => setLoan3({...loan3, processingFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="8000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare Button */}
              <div className="text-center">
                <Button 
                  onClick={compareLoanOffers}
                  variant="primary" 
                  size="lg" 
                  className="bg-teal-500 hover:bg-teal-600 px-12"
                >
                  <Scale className="w-5 h-5 mr-2" />
                  Compare Loan Offers
                </Button>
              </div>

              {/* Comparison Results */}
              {comparisonResult && (
                <div className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20">
                  <h3 className="font-serif text-2xl text-black mb-6 text-center">Comparison Results</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-800"></th>
                          <th className="text-center py-3 px-4 font-medium text-gray-800">
                            Loan Option 1
                            {comparisonResult.bestOption === 1 && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Best</span>
                            )}
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-800">
                            Loan Option 2
                            {comparisonResult.bestOption === 2 && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Best</span>
                            )}
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-800">
                            Loan Option 3
                            {comparisonResult.bestOption === 3 && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Best</span>
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-700">Monthly EMI</td>
                          <td className="py-3 px-4 text-center font-bold text-teal-600">{formatCurrency(comparisonResult.loan1.emi)}</td>
                          <td className="py-3 px-4 text-center font-bold text-teal-600">{formatCurrency(comparisonResult.loan2.emi)}</td>
                          <td className="py-3 px-4 text-center font-bold text-teal-600">{formatCurrency(comparisonResult.loan3.emi)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-700">Total Interest</td>
                          <td className="py-3 px-4 text-center text-black">{formatCurrency(comparisonResult.loan1.totalInterest)}</td>
                          <td className="py-3 px-4 text-center text-black">{formatCurrency(comparisonResult.loan2.totalInterest)}</td>
                          <td className="py-3 px-4 text-center text-black">{formatCurrency(comparisonResult.loan3.totalInterest)}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-700">Total Cost (incl. fees)</td>
                          <td className="py-3 px-4 text-center font-bold text-black">{formatCurrency(comparisonResult.loan1.totalCost)}</td>
                          <td className="py-3 px-4 text-center font-bold text-black">{formatCurrency(comparisonResult.loan2.totalCost)}</td>
                          <td className="py-3 px-4 text-center font-bold text-black">{formatCurrency(comparisonResult.loan3.totalCost)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">Comparison Note:</p>
                        <p className="text-xs">The "Best" option is determined by the lowest total cost. Consider other factors like bank reputation, service quality, and prepayment charges before making a decision.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tax Benefit Calculator Section */}
      <section id="tax-calculator" className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-serif text-display-md text-black mb-4">
                Tax Benefit Calculator
              </h2>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto">
                Calculate your tax savings under Section 80E for education loan interest. 
                Understand the financial benefits and effective interest rate after tax savings.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Calculator Input */}
              <div className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] transition-all duration-500">
                <h3 className="font-serif text-2xl text-black mb-6">Tax Details</h3>
                
                <div className="space-y-6">
                  {/* Annual Interest Paid */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-teal-600" />
                        Annual Interest Paid
                      </span>
                      <span className="text-teal-600 font-bold">{formatCurrency(interestPaid)}</span>
                    </label>
                    <input
                      type="range"
                      min="10000"
                      max="200000"
                      step="5000"
                      value={interestPaid}
                      onChange={(e) => setInterestPaid(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-700 mt-1">
                      <span>₹10k</span>
                      <span>₹2 Lakh</span>
                    </div>
                  </div>

                  {/* Tax Slab Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <TrendingUp className="w-4 h-4 text-teal-600" />
                      Your Tax Slab
                    </label>
                    <select
                      value={taxSlab}
                      onChange={(e) => setTaxSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="5">5% Tax Slab (₹2.5L - ₹5L)</option>
                      <option value="20">20% Tax Slab (₹5L - ₹10L)</option>
                      <option value="30">30% Tax Slab (Above ₹10L)</option>
                    </select>
                  </div>

                  <Button 
                    onClick={calculateTaxBenefit}
                    variant="primary" 
                    size="lg" 
                    className="w-full bg-teal-500 hover:bg-teal-600"
                  >
                    Calculate Tax Savings
                  </Button>

                  {/* Information Box */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Section 80E Benefits:</p>
                        <ul className="text-xs space-y-1">
                          <li>• No upper limit on deduction amount</li>
                          <li>• Available for the entire loan tenure</li>
                          <li>• Only interest component is deductible</li>
                          <li>• Applicable for loans from approved institutions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100 rounded-card p-8 border border-teal-200">
                <h3 className="font-serif text-2xl text-black mb-6">Tax Savings Analysis</h3>
                
                {taxResult ? (
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-800 mb-2">Annual Tax Savings</p>
                        <p className="text-4xl font-bold text-green-600">{formatCurrency(taxResult.annualSavings)}</p>
                        <p className="text-xs text-gray-700 mt-2">Under Section 80E</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-800 mb-1">Total Savings (10 Years)</p>
                        <p className="text-2xl font-bold text-black">{formatCurrency(taxResult.totalSavingsOverLoan)}</p>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-800 mb-1">Effective Interest Rate</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-teal-600">{taxResult.effectiveRate}%</p>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            After Tax Benefits
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tax Benefit Breakdown */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                      <h4 className="font-medium text-black mb-4">Savings Breakdown</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-800">Interest Paid (Annual)</span>
                          <span className="font-medium text-black">{formatCurrency(interestPaid)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-800">Tax Slab</span>
                          <span className="font-medium text-black">{taxSlab}%</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Tax Savings</span>
                            <span className="font-bold text-green-600">{formatCurrency(taxResult.annualSavings)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="font-medium mb-1">Important Note:</p>
                          <p className="text-xs">Tax benefits are subject to your total taxable income and applicable tax laws. Consult a tax advisor for personalized advice.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-700">Enter your tax details and calculate savings to see benefits</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SOP Review Tool Section */}
      <section id="sop-review" className="py-20 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-serif text-display-md text-black mb-4">
                SOP Review Tool
              </h2>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto">
                Get instant feedback on your Statement of Purpose. Our tool analyzes your SOP
                for key elements, word count, and provides actionable suggestions for improvement.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* SOP Input */}
              <div className="bg-white/70 backdrop-blur-xl rounded-card p-8 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] transition-all duration-500">
                <h3 className="font-serif text-2xl text-black mb-6">Your Statement of Purpose</h3>

                <div className="space-y-6">
                  {/* Course Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <GraduationCap className="w-4 h-4 text-teal-600" />
                        Course Type
                      </label>
                      <select
                        value={sopCourse}
                        onChange={(e) => setSopCourse(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      >
                        <option value="mba">MBA</option>
                        <option value="ms">MS/Masters</option>
                        <option value="phd">PhD</option>
                        <option value="undergraduate">Undergraduate</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Plane className="w-4 h-4 text-teal-600" />
                        Target Country
                      </label>
                      <select
                        value={sopCountry}
                        onChange={(e) => setSopCountry(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      >
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                        <option value="germany">Germany</option>
                      </select>
                    </div>
                  </div>

                  {/* SOP Text Area */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FileEdit className="w-4 h-4 text-teal-600" />
                      Paste Your SOP
                    </label>
                    <textarea
                      value={sopText}
                      onChange={(e) => setSopText(e.target.value)}
                      placeholder="Paste your Statement of Purpose here... (minimum 100 words recommended)"
                      className="w-full h-64 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    />
                    <div className="flex justify-between text-xs text-gray-700 mt-2">
                      <span>Word count: {sopText.trim().split(/\s+/).filter(word => word.length > 0).length}</span>
                      <span>Recommended: 500-1000 words</span>
                    </div>
                  </div>

                  <Button
                    onClick={analyzeSOP}
                    variant="primary"
                    size="lg"
                    className="w-full bg-teal-500 hover:bg-teal-600"
                    disabled={sopText.trim().split(/\s+/).filter(word => word.length > 0).length < 50}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze My SOP
                  </Button>

                  {sopText.trim().split(/\s+/).filter(word => word.length > 0).length < 50 && (
                    <p className="text-xs text-center text-gray-700">
                      Please enter at least 50 words to analyze
                    </p>
                  )}
                </div>
              </div>

              {/* SOP Analysis Result */}
              <div className="bg-gradient-to-br from-teal-50 via-white to-teal-100 rounded-card p-8 border border-teal-200">
                <h3 className="font-serif text-2xl text-black mb-6">Analysis Results</h3>

                {sopResult ? (
                  <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-800 mb-2">SOP Score</p>
                        <div className="relative inline-flex items-center justify-center">
                          <svg className="w-32 h-32">
                            <circle
                              className="text-gray-200"
                              strokeWidth="10"
                              stroke="currentColor"
                              fill="transparent"
                              r="50"
                              cx="64"
                              cy="64"
                            />
                            <circle
                              className={`${sopResult.score >= 70 ? 'text-green-500' : sopResult.score >= 50 ? 'text-teal-500' : 'text-red-500'}`}
                              strokeWidth="10"
                              strokeDasharray={`${sopResult.score * 3.14} 314`}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="50"
                              cx="64"
                              cy="64"
                              style={{ transform: 'rotate(-90deg)', transformOrigin: '64px 64px' }}
                            />
                          </svg>
                          <span className={`absolute text-3xl font-bold ${sopResult.score >= 70 ? 'text-green-600' : sopResult.score >= 50 ? 'text-teal-600' : 'text-red-600'}`}>
                            {sopResult.score}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">
                          {sopResult.score >= 80 ? 'Excellent!' : sopResult.score >= 60 ? 'Good, with room to improve' : 'Needs significant improvement'}
                        </p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-800 mb-1">Word Count</p>
                        <p className="text-xl font-bold text-black">{sopResult.wordCount}</p>
                      </div>
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-800 mb-1">Readability</p>
                        <p className="text-xl font-bold text-black">{sopResult.readabilityScore}</p>
                      </div>
                    </div>

                    {/* Strengths */}
                    {sopResult.strengths.length > 0 && (
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <h4 className="flex items-center gap-2 font-medium text-green-800 mb-3">
                          <CheckCircle className="w-5 h-5" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {sopResult.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                              <span className="mt-1">•</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {sopResult.improvements.length > 0 && (
                      <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                        <h4 className="flex items-center gap-2 font-medium text-orange-800 mb-3">
                          <AlertCircle className="w-5 h-5" />
                          Areas to Improve
                        </h4>
                        <ul className="space-y-2">
                          {sopResult.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-orange-700">
                              <span className="mt-1">•</span>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-teal-600 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="font-medium mb-1">Pro Tip:</p>
                          <p className="text-xs">Tailor your SOP for each university. Mention specific professors, research areas, or programs that interest you.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileEdit className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-700">Paste your SOP and click Analyze to get feedback</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </div>

      {/* Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-display-md text-black mb-12"
            >
              Financial Planning Tips
            </motion.h2>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl text-black mb-3">Compare Interest Rates</h3>
                <p className="text-sm text-gray-800">
                  Even a 0.5% difference in interest rate can save lakhs over the loan tenure. Always compare rates from multiple lenders.
                </p>
              </motion.div>

              <motion.div 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl text-black mb-3">Optimal Tenure</h3>
                <p className="text-sm text-gray-800">
                  Choose a tenure that balances affordable EMIs with minimal total interest. Shorter tenure means less interest but higher EMIs.
                </p>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl text-black mb-3">Part Payments</h3>
                <p className="text-sm text-gray-800">
                  Making partial prepayments whenever possible can significantly reduce your total interest burden and loan tenure.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Education Loan Tools FAQs"
        subtitle="Common questions about our loan calculators and tools"
        faqs={[
          {
            question: "How accurate are the EMI calculations?",
            answer: "Our EMI calculator uses the standard reducing balance method used by banks. The calculations are highly accurate for planning purposes. However, actual EMI may vary slightly based on the specific loan terms, processing fees, and any additional charges by the lender."
          },
          {
            question: "What factors affect my loan eligibility?",
            answer: "Key factors include: your co-applicant's monthly income, existing EMI obligations, credit score, age, employment stability, and the institution you're applying to. Higher income, good credit score (750+), and admission to top-ranked institutions improve eligibility."
          },
          {
            question: "How should I use the loan comparison tool?",
            answer: "Enter details of different loan offers you've received - loan amount, interest rate, tenure, and processing fees. The tool calculates total cost including all charges, helping you identify the most economical option. Don't just compare EMIs; look at total repayment amount."
          },
          {
            question: "What does the education cost calculator include?",
            answer: "Our cost calculator provides estimates for tuition fees (based on actual college data), living expenses, accommodation costs, and other expenses like books, travel, and insurance. Select your country, course, and college to get a realistic total cost estimate."
          },
          {
            question: "How does the SOP review tool work?",
            answer: "The SOP review tool analyzes your Statement of Purpose for key elements like word count, structure, clarity, and content relevance. It provides scores and suggestions for improvement. While helpful for initial review, we recommend professional editing for final submissions."
          },
          {
            question: "Can I save my calculations?",
            answer: "Currently, calculations are session-based. We recommend taking screenshots or noting down important figures. You can also share the page URL with your family for discussions. We're working on adding save and export features soon."
          },
          {
            question: "Are the college fees in the cost calculator up to date?",
            answer: "We update our college fee database regularly based on official sources. However, fees can change annually. The figures provide good estimates for planning, but always verify current fees directly with the institution before finalizing your budget."
          },
          {
            question: "What is the tax benefit calculator showing?",
            answer: "Under Section 80E, you can claim tax deduction on the entire interest paid on education loans. Our calculator shows your potential tax savings based on your tax slab. This benefit is available for 8 years from when you start repaying the loan."
          }
        ]}
      />
    </div>
  );
}