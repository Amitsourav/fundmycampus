"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { CheckCircle, UserPlus } from "lucide-react";

// ────────────────── Types ──────────────────
interface AccountData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface BasicData {
  full_name: string;
  phone: string;
  gender: string;
  whatsapp_same: boolean;
}

interface EducationData {
  has_offer_letter: string; // "yes" | "no" | "applying"
  course_level: string;
  degree: string;
  country: string;
  college: string;
  start_year: string;
  start_month: string;
}

interface FinancialData {
  loan_amount: string;
  has_collateral: string; // "yes" | "no"
  co_applicant_income: string;
  existing_emis: string;
  heard_via: string;
}

// ────────────────── Step Indicator (Steps 1-3 only) ──────────────────
function StepIndicator({ step }: { step: number }) {
  const labels = ["Basic Details", "Education", "Finances"];
  // step 1 = index 0, step 2 = index 1, step 3 = index 2
  const idx = step - 1;
  return (
    <div className="flex items-center gap-2 mb-8">
      {labels.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < idx
                  ? "bg-teal-500 text-white"
                  : i === idx
                  ? "bg-teal-500 text-white ring-4 ring-teal-100"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < idx ? <CheckCircle className="w-4 h-4" /> : i + 2}
            </div>
            <span className={`text-xs hidden sm:block ${i === idx ? "text-teal-600 font-medium" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
          {i < labels.length - 1 && (
            <div className={`flex-1 h-0.5 mb-4 transition-all ${i < idx ? "bg-teal-500" : "bg-gray-200"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ────────────────── Step 0: Create Account ──────────────────
function AccountStep({
  data,
  onChange,
  onNext,
  error,
  loading,
}: {
  data: AccountData;
  onChange: (d: Partial<AccountData>) => void;
  onNext: () => void;
  error: string;
  loading: boolean;
}) {
  const [fieldErrors, setFieldErrors] = useState<Partial<AccountData>>({});

  function validate() {
    const errors: Partial<AccountData> = {};
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.password || data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="you@example.com"
          className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.email ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-teal-500"}`}
        />
        {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => onChange({ password: e.target.value })}
          placeholder="Min. 8 characters"
          className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.password ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-teal-500"}`}
        />
        {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
        <input
          type="password"
          value={data.confirmPassword}
          onChange={(e) => onChange({ confirmPassword: e.target.value })}
          placeholder="Repeat password"
          className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent ${fieldErrors.confirmPassword ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-teal-500"}`}
        />
        {fieldErrors.confirmPassword && <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>}
      </div>
      <Button type="submit" variant="primary" size="md" fullWidth disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
}

// ────────────────── Step 1: Basic Details ──────────────────
function BasicDetailsStep({
  data,
  onChange,
  onNext,
  onSkip,
}: {
  data: BasicData;
  onChange: (d: Partial<BasicData>) => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
        <input
          type="text"
          value={data.full_name}
          onChange={(e) => onChange({ full_name: e.target.value })}
          placeholder="Your full name"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="+91 XXXXX XXXXX"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
        <select
          value={data.gender}
          onChange={(e) => onChange({ gender: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={data.whatsapp_same}
          onChange={(e) => onChange({ whatsapp_same: e.target.checked })}
          className="w-4 h-4 accent-teal-500"
        />
        WhatsApp number same as phone
      </label>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="primary" size="md" fullWidth onClick={onNext}>
          Continue
        </Button>
        <Button type="button" variant="ghost" size="md" fullWidth onClick={onSkip} className="!text-gray-500 hover:!text-gray-700">
          Skip for now
        </Button>
      </div>
    </div>
  );
}

// ────────────────── Step 2: Education Details ──────────────────
function EducationStep({
  data,
  onChange,
  onNext,
  onSkip,
}: {
  data: EducationData;
  onChange: (d: Partial<EducationData>) => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Do you have an offer letter?</label>
        <div className="flex gap-4">
          {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }, { value: "applying", label: "Still applying" }].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="radio"
                name="offer_letter"
                value={value}
                checked={data.has_offer_letter === value}
                onChange={() => onChange({ has_offer_letter: value })}
                className="accent-teal-500"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Level</label>
          <select
            value={data.course_level}
            onChange={(e) => onChange({ course_level: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          >
            <option value="">Select</option>
            <option value="Undergrad">Undergraduate</option>
            <option value="Masters">Postgraduate</option>
            <option value="PG Diploma">PG Diploma</option>
            <option value="UG Diploma">UG Diploma</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Degree</label>
          <input
            type="text"
            value={data.degree}
            onChange={(e) => onChange({ degree: e.target.value })}
            placeholder="e.g. B.Tech, MBA"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Country of Study</label>
        <input
          type="text"
          value={data.country}
          onChange={(e) => onChange({ country: e.target.value })}
          placeholder="e.g. USA, UK, India"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">College / University</label>
        <input
          type="text"
          value={data.college}
          onChange={(e) => onChange({ college: e.target.value })}
          placeholder="Institution name"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Month</label>
          <select
            value={data.start_month}
            onChange={(e) => onChange({ start_month: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          >
            <option value="">Month</option>
            {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Year</label>
          <input
            type="number"
            value={data.start_year}
            onChange={(e) => onChange({ start_year: e.target.value })}
            placeholder="e.g. 2025"
            min="2020"
            max="2030"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="primary" size="md" fullWidth onClick={onNext}>
          Continue
        </Button>
        <Button type="button" variant="ghost" size="md" fullWidth onClick={onSkip} className="!text-gray-500 hover:!text-gray-700">
          Skip for now
        </Button>
      </div>
    </div>
  );
}

// ────────────────── Step 3: Financial Details ──────────────────
function FinancialStep({
  data,
  onChange,
  onSubmit,
  onSkip,
  loading,
  error,
}: {
  data: FinancialData;
  onChange: (d: Partial<FinancialData>) => void;
  onSubmit: () => void;
  onSkip: () => void;
  loading: boolean;
  error: string;
}) {
  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Loan Amount Required (₹)</label>
        <input
          type="number"
          value={data.loan_amount}
          onChange={(e) => onChange({ loan_amount: e.target.value })}
          placeholder="e.g. 2000000"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Do you have collateral?</label>
        <div className="flex gap-4">
          {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="radio"
                name="collateral"
                value={value}
                checked={data.has_collateral === value}
                onChange={() => onChange({ has_collateral: value })}
                className="accent-teal-500"
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Co-applicant Monthly Income (₹)</label>
        <input
          type="number"
          value={data.co_applicant_income}
          onChange={(e) => onChange({ co_applicant_income: e.target.value })}
          placeholder="e.g. 50000"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Existing Monthly EMIs (₹)</label>
        <input
          type="number"
          value={data.existing_emis}
          onChange={(e) => onChange({ existing_emis: e.target.value })}
          placeholder="0 if none"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">How did you hear about us?</label>
        <select
          value={data.heard_via}
          onChange={(e) => onChange({ heard_via: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        >
          <option value="">Select</option>
          <option value="google">Google</option>
          <option value="instagram">Instagram</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="friend">Friend / Family</option>
          <option value="youtube">YouTube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="primary" size="md" fullWidth onClick={onSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
        <Button type="button" variant="ghost" size="md" fullWidth onClick={onSkip} className="!text-gray-500 hover:!text-gray-700">
          Skip for now
        </Button>
      </div>
    </div>
  );
}

// ────────────────── Success Screen ──────────────────
function SuccessScreen() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-teal-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
      <p className="text-sm text-gray-500">Redirecting you to your dashboard...</p>
    </div>
  );
}

// ────────────────── Main Form ──────────────────
export function SignupForm() {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [accountError, setAccountError] = useState("");
  const [loanError, setLoanError] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);
  const [loanLoading, setLoanLoading] = useState(false);

  const [account, setAccount] = useState<AccountData>({ email: "", password: "", confirmPassword: "" });
  const [basic, setBasic] = useState<BasicData>({ full_name: "", phone: "", gender: "", whatsapp_same: true });
  const [education, setEducation] = useState<EducationData>({
    has_offer_letter: "", course_level: "", degree: "", country: "", college: "", start_year: "", start_month: "",
  });
  const [financial, setFinancial] = useState<FinancialData>({
    loan_amount: "", has_collateral: "", co_applicant_income: "", existing_emis: "", heard_via: "",
  });

  async function handleCreateAccount() {
    setAccountError("");
    setAccountLoading(true);
    try {
      await api.post("/api/v1/auth/register", {
        email: account.email,
        password: account.password,
        name: account.email.split("@")[0],
      });
      await refreshSession();
      setStep(1);
    } catch (err) {
      setAccountError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setAccountLoading(false);
    }
  }

  async function handleSubmitLoan() {
    setLoanError("");
    setLoanLoading(true);
    try {
      // Build FLAT payload with proper type conversions per spec
      const payload = {
        full_name: basic.full_name,
        gender: basic.gender,
        email: account.email,
        phone: basic.phone,
        is_whatsapp: basic.whatsapp_same,
        has_offer_letter: education.has_offer_letter === "yes",
        university_app_status: education.has_offer_letter !== "yes" ? education.has_offer_letter : undefined,
        course_start_year: education.start_year ? parseInt(education.start_year) : undefined,
        course_start_month: education.start_month || undefined,
        course_level: education.course_level || undefined,
        course_degree: education.degree || undefined,
        course_name: education.degree || undefined,
        target_country: education.country || undefined,
        target_college: education.college || undefined,
        loan_amount: financial.loan_amount ? parseFloat(financial.loan_amount) : undefined,
        has_collateral: financial.has_collateral === "yes",
        co_applicant_income: financial.co_applicant_income ? parseFloat(financial.co_applicant_income) : 0,
        existing_emis: financial.existing_emis ? parseFloat(financial.existing_emis) : 0,
        hear_about_us: financial.heard_via || undefined,
      };
      await api.post("/api/v1/loans", payload);
      setSubmitted(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      setLoanError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoanLoading(false);
    }
  }

  const titles = ["Create Your Account", "Basic Details", "Education Details", "Financial Details"];
  const subtitles = ["Step 1 of 4", "Step 2 of 4", "Step 3 of 4", "Step 4 of 4"];

  if (submitted) {
    return (
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <SuccessScreen />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{titles[step]}</h1>
          <p className="text-sm text-gray-500">{subtitles[step]}</p>
        </div>
      </div>

      {/* Step indicator only for steps 1-3 */}
      {step > 0 && <StepIndicator step={step} />}

      {step === 0 && (
        <AccountStep
          data={account}
          onChange={(d) => setAccount((p) => ({ ...p, ...d }))}
          onNext={handleCreateAccount}
          error={accountError}
          loading={accountLoading}
        />
      )}
      {step === 1 && (
        <BasicDetailsStep
          data={basic}
          onChange={(d) => setBasic((p) => ({ ...p, ...d }))}
          onNext={() => setStep(2)}
          onSkip={() => router.push("/dashboard")}
        />
      )}
      {step === 2 && (
        <EducationStep
          data={education}
          onChange={(d) => setEducation((p) => ({ ...p, ...d }))}
          onNext={() => setStep(3)}
          onSkip={() => router.push("/dashboard")}
        />
      )}
      {step === 3 && (
        <FinancialStep
          data={financial}
          onChange={(d) => setFinancial((p) => ({ ...p, ...d }))}
          onSubmit={handleSubmitLoan}
          onSkip={() => router.push("/dashboard")}
          loading={loanLoading}
          error={loanError}
        />
      )}
    </div>
  );
}
