"use client";

import React, { useState } from "react";
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
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function ToolsPage() {
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
  const [duration, setDuration] = useState<number>(4);
  const [accommodation, setAccommodation] = useState<string>("hostel");
  const [costResult, setCostResult] = useState<{
    tuitionFee: number;
    livingExpenses: number;
    otherExpenses: number;
    totalCost: number;
  } | null>(null);

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

    // Tuition Fee Calculation based on country and course
    if (country === "india") {
      switch(courseType) {
        case "engineering":
          tuitionFee = 150000 * duration;
          break;
        case "medical":
          tuitionFee = 500000 * duration;
          break;
        case "management":
          tuitionFee = 300000 * duration;
          break;
        case "arts":
          tuitionFee = 50000 * duration;
          break;
        default:
          tuitionFee = 100000 * duration;
      }
    } else if (country === "usa") {
      switch(courseType) {
        case "engineering":
          tuitionFee = 4500000 * duration;
          break;
        case "medical":
          tuitionFee = 7000000 * duration;
          break;
        case "management":
          tuitionFee = 5500000 * duration;
          break;
        case "arts":
          tuitionFee = 3500000 * duration;
          break;
        default:
          tuitionFee = 4000000 * duration;
      }
    } else if (country === "uk") {
      tuitionFee = 3500000 * duration;
    } else if (country === "canada") {
      tuitionFee = 2500000 * duration;
    } else if (country === "australia") {
      tuitionFee = 3000000 * duration;
    }

    // Living Expenses Calculation
    if (country === "india") {
      livingExpenses = accommodation === "hostel" ? 100000 * duration : 150000 * duration;
      otherExpenses = 50000 * duration;
    } else {
      livingExpenses = accommodation === "hostel" ? 800000 * duration : 1200000 * duration;
      otherExpenses = 300000 * duration;
    }

    setCostResult({
      tuitionFee,
      livingExpenses,
      otherExpenses,
      totalCost: tuitionFee + livingExpenses + otherExpenses
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&auto=format&fit=crop&q=80"
            alt="Financial planning and calculation tools"
            className="w-full h-full object-cover"
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
              <Calculator className="h-16 w-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-serif text-display-lg text-white mb-6"
            >
              Financial Planning Tools
            </motion.h1>
            
            <motion.p 
              variants={staggerItem}
              className="text-xl text-white/90 mb-10 leading-relaxed"
            >
              Smart calculators to help you plan your education loan and estimate 
              total study costs. Make informed financial decisions for your academic journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tools Navigation */}
      <section className="py-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#emi-calculator" className="px-6 py-3 bg-white/70 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-black">EMI Calculator</span>
              </span>
            </a>
            <a href="#cost-calculator" className="px-6 py-3 bg-white/70 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-black">Cost Calculator</span>
              </span>
            </a>
            <a href="#eligibility-calculator" className="px-6 py-3 bg-white/70 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-black">Loan Eligibility</span>
              </span>
            </a>
            <a href="#comparison-tool" className="px-6 py-3 bg-white/70 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-black">Loan Comparison</span>
              </span>
            </a>
            <a href="#tax-calculator" className="px-6 py-3 bg-white/70 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-black">Tax Benefits</span>
              </span>
            </a>
          </div>
        </div>
      </section>

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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                        <PiggyBank className="w-4 h-4 text-yellow-600" />
                        Loan Amount
                      </span>
                      <span className="text-yellow-600 font-bold">{formatCurrency(loanAmount)}</span>
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="10000000"
                      step="50000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1 Lakh</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-yellow-600" />
                        Interest Rate (% p.a.)
                      </span>
                      <span className="text-yellow-600 font-bold">{interestRate}%</span>
                    </label>
                    <input
                      type="range"
                      min="6"
                      max="15"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>6%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-600" />
                        Loan Tenure (Years)
                      </span>
                      <span className="text-yellow-600 font-bold">{loanTenure} Years</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 Year</span>
                      <span>20 Years</span>
                    </div>
                  </div>

                  <Button 
                    onClick={calculateEMI}
                    variant="primary" 
                    size="lg" 
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                  >
                    Calculate EMI
                  </Button>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-card p-8 border border-yellow-200">
                <h3 className="font-serif text-2xl text-black mb-6">EMI Breakdown</h3>
                
                {emiResult ? (
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Monthly EMI</p>
                        <p className="text-4xl font-bold text-yellow-600">{formatCurrency(emiResult.emi)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                        <p className="text-xl font-bold text-black">{formatCurrency(loanAmount)}</p>
                      </div>
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                        <p className="text-xl font-bold text-black">{formatCurrency(emiResult.totalInterest)}</p>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                      <p className="text-sm text-gray-600 mb-1">Total Amount Payable</p>
                      <p className="text-2xl font-bold text-black">{formatCurrency(emiResult.totalAmount)}</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
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
                    <p className="text-gray-500">Enter loan details and click Calculate EMI to see results</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section id="cost-calculator" className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                      <Plane className="w-4 h-4 text-yellow-600" />
                      Study Destination
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
                      <BookOpen className="w-4 h-4 text-yellow-600" />
                      Course Type
                    </label>
                    <select
                      value={courseType}
                      onChange={(e) => setCourseType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="engineering">Engineering</option>
                      <option value="medical">Medical</option>
                      <option value="management">Management</option>
                      <option value="arts">Arts & Humanities</option>
                      <option value="science">Science</option>
                    </select>
                  </div>

                  {/* Course Duration */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 text-yellow-600" />
                      Course Duration (Years)
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
                      <Home className="w-4 h-4 text-yellow-600" />
                      Accommodation Type
                    </label>
                    <select
                      value={accommodation}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="hostel">University Hostel</option>
                      <option value="private">Private Accommodation</option>
                    </select>
                  </div>

                  <Button 
                    onClick={calculateCost}
                    variant="primary" 
                    size="lg" 
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                  >
                    Calculate Total Cost
                  </Button>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-card p-8 border border-yellow-200">
                <h3 className="font-serif text-2xl text-black mb-6">Cost Breakdown</h3>
                
                {costResult ? (
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Total Education Cost</p>
                        <p className="text-4xl font-bold text-yellow-600">{formatCurrency(costResult.totalCost)}</p>
                        <p className="text-xs text-gray-500 mt-2">For {duration} year(s)</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-600">
                            <GraduationCap className="w-4 h-4 text-yellow-600" />
                            Tuition Fees
                          </span>
                          <span className="text-lg font-bold text-black">{formatCurrency(costResult.tuitionFee)}</span>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-600">
                            <Home className="w-4 h-4 text-yellow-600" />
                            Living Expenses
                          </span>
                          <span className="text-lg font-bold text-black">{formatCurrency(costResult.livingExpenses)}</span>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4 text-yellow-600" />
                            Other Expenses
                          </span>
                          <span className="text-lg font-bold text-black">{formatCurrency(costResult.otherExpenses)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
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
                    <p className="text-gray-500">Select your study details and click Calculate to see estimated costs</p>
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                        <DollarSign className="w-4 h-4 text-yellow-600" />
                        Monthly Income
                      </span>
                      <span className="text-yellow-600 font-bold">{formatCurrency(monthlyIncome)}</span>
                    </label>
                    <input
                      type="range"
                      min="20000"
                      max="200000"
                      step="5000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹20k</span>
                      <span>₹2 Lakh</span>
                    </div>
                  </div>

                  {/* Existing EMI */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-yellow-600" />
                        Existing EMI Commitments
                      </span>
                      <span className="text-yellow-600 font-bold">{formatCurrency(existingEmi)}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={existingEmi}
                      onChange={(e) => setExistingEmi(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹0</span>
                      <span>₹50k</span>
                    </div>
                  </div>

                  {/* Credit Score */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      Credit Score Range
                    </label>
                    <select
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
                        <GraduationCap className="w-4 h-4 text-yellow-600" />
                        Co-applicant Income (Optional)
                      </span>
                      <span className="text-yellow-600 font-bold">{formatCurrency(coApplicantIncome)}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="5000"
                      value={coApplicantIncome}
                      onChange={(e) => setCoApplicantIncome(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹0</span>
                      <span>₹1.5 Lakh</span>
                    </div>
                  </div>

                  <Button 
                    onClick={calculateEligibility}
                    variant="primary" 
                    size="lg" 
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                  >
                    Check Eligibility
                  </Button>
                </div>
              </div>

              {/* Result Display */}
              <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-card p-8 border border-yellow-200">
                <h3 className="font-serif text-2xl text-black mb-6">Eligibility Results</h3>
                
                {eligibilityResult ? (
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Maximum Loan Amount</p>
                        <p className="text-4xl font-bold text-yellow-600">{formatCurrency(eligibilityResult.maxLoanAmount)}</p>
                        <p className="text-xs text-gray-500 mt-2">Based on 10-year tenure</p>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                      <p className="text-sm text-gray-600 mb-1">Maximum Eligible EMI</p>
                      <p className="text-2xl font-bold text-black">{formatCurrency(eligibilityResult.eligibleEmi)}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-black">Bank Offers</h4>
                      {eligibilityResult.bankOffers.map((offer, index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-black">{offer.bank}</p>
                              <p className="text-xs text-gray-600">Interest: {offer.rate}</p>
                            </div>
                            <p className="text-lg font-bold text-yellow-600">{formatCurrency(offer.maxLoan)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
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
                    <p className="text-gray-500">Enter your details and check eligibility to see loan offers</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Loan Comparison Tool Section */}
      <section id="comparison-tool" className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Loan Amount</label>
                      <input
                        type="number"
                        value={loan1.amount}
                        onChange={(e) => setLoan1({...loan1, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="1000000"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={loan1.rate}
                        onChange={(e) => setLoan1({...loan1, rate: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="9.5"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Tenure (Years)</label>
                      <input
                        type="number"
                        value={loan1.tenure}
                        onChange={(e) => setLoan1({...loan1, tenure: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Processing Fee</label>
                      <input
                        type="number"
                        value={loan1.processingFee}
                        onChange={(e) => setLoan1({...loan1, processingFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Loan Amount</label>
                      <input
                        type="number"
                        value={loan2.amount}
                        onChange={(e) => setLoan2({...loan2, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="1000000"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={loan2.rate}
                        onChange={(e) => setLoan2({...loan2, rate: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="10.0"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Tenure (Years)</label>
                      <input
                        type="number"
                        value={loan2.tenure}
                        onChange={(e) => setLoan2({...loan2, tenure: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Processing Fee</label>
                      <input
                        type="number"
                        value={loan2.processingFee}
                        onChange={(e) => setLoan2({...loan2, processingFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Loan Amount</label>
                      <input
                        type="number"
                        value={loan3.amount}
                        onChange={(e) => setLoan3({...loan3, amount: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="1000000"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={loan3.rate}
                        onChange={(e) => setLoan3({...loan3, rate: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="10.5"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Tenure (Years)</label>
                      <input
                        type="number"
                        value={loan3.tenure}
                        onChange={(e) => setLoan3({...loan3, tenure: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Processing Fee</label>
                      <input
                        type="number"
                        value={loan3.processingFee}
                        onChange={(e) => setLoan3({...loan3, processingFee: Number(e.target.value)})}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  className="bg-yellow-500 hover:bg-yellow-600 px-12"
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
                          <th className="text-left py-3 px-4 font-medium text-gray-600"></th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Loan Option 1
                            {comparisonResult.bestOption === 1 && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Best</span>
                            )}
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Loan Option 2
                            {comparisonResult.bestOption === 2 && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Best</span>
                            )}
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
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
                          <td className="py-3 px-4 text-center font-bold text-yellow-600">{formatCurrency(comparisonResult.loan1.emi)}</td>
                          <td className="py-3 px-4 text-center font-bold text-yellow-600">{formatCurrency(comparisonResult.loan2.emi)}</td>
                          <td className="py-3 px-4 text-center font-bold text-yellow-600">{formatCurrency(comparisonResult.loan3.emi)}</td>
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

                  <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                        <Receipt className="w-4 h-4 text-yellow-600" />
                        Annual Interest Paid
                      </span>
                      <span className="text-yellow-600 font-bold">{formatCurrency(interestPaid)}</span>
                    </label>
                    <input
                      type="range"
                      min="10000"
                      max="200000"
                      step="5000"
                      value={interestPaid}
                      onChange={(e) => setInterestPaid(Number(e.target.value))}
                      className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹10k</span>
                      <span>₹2 Lakh</span>
                    </div>
                  </div>

                  {/* Tax Slab Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <TrendingUp className="w-4 h-4 text-yellow-600" />
                      Your Tax Slab
                    </label>
                    <select
                      value={taxSlab}
                      onChange={(e) => setTaxSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
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
              <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-card p-8 border border-yellow-200">
                <h3 className="font-serif text-2xl text-black mb-6">Tax Savings Analysis</h3>
                
                {taxResult ? (
                  <div className="space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Annual Tax Savings</p>
                        <p className="text-4xl font-bold text-green-600">{formatCurrency(taxResult.annualSavings)}</p>
                        <p className="text-xs text-gray-500 mt-2">Under Section 80E</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-600 mb-1">Total Savings (10 Years)</p>
                        <p className="text-2xl font-bold text-black">{formatCurrency(taxResult.totalSavingsOverLoan)}</p>
                      </div>

                      <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                        <p className="text-sm text-gray-600 mb-1">Effective Interest Rate</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-yellow-600">{taxResult.effectiveRate}%</p>
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
                          <span className="text-sm text-gray-600">Interest Paid (Annual)</span>
                          <span className="font-medium text-black">{formatCurrency(interestPaid)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Tax Slab</span>
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

                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
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
                    <p className="text-gray-500">Enter your tax details and calculate savings to see benefits</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl text-black mb-3">Compare Interest Rates</h3>
                <p className="text-sm text-gray-600">
                  Even a 0.5% difference in interest rate can save lakhs over the loan tenure. Always compare rates from multiple lenders.
                </p>
              </motion.div>

              <motion.div 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl text-black mb-3">Optimal Tenure</h3>
                <p className="text-sm text-gray-600">
                  Choose a tenure that balances affordable EMIs with minimal total interest. Shorter tenure means less interest but higher EMIs.
                </p>
              </motion.div>

              <motion.div 
                variants={staggerItem}
                className="bg-white/70 backdrop-blur-xl rounded-card p-6 border border-white/20 shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:shadow-[0_12px_48px_rgba(251,191,36,0.25)] hover:scale-105 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl text-black mb-3">Part Payments</h3>
                <p className="text-sm text-gray-600">
                  Making partial prepayments whenever possible can significantly reduce your total interest burden and loan tenure.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}