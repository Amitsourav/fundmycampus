"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Send,
  Copy,
  Check,
  Server,
  Database,
  Shield,
  Zap,
  Globe,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────

interface Param {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

interface Endpoint {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  summary: string;
  description: string;
  auth: string;
  params?: Param[];
  body?: Param[];
  response?: string;
  curl?: string;
}

interface Section {
  title: string;
  icon: React.ElementType;
  description: string;
  endpoints: Endpoint[];
}

// ─── API Data ────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

const sections: Section[] = [
  {
    title: "Authentication",
    icon: Shield,
    description: "Better Auth handles signup, login, and session management via cookies.",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/sign-up/email",
        summary: "Sign up a new user",
        description: "Creates a new user with email and password via Better Auth.",
        auth: "None (Public)",
        body: [
          { name: "email", type: "string", required: true, description: "User email address" },
          { name: "password", type: "string", required: true, description: "Password (min 6 chars)" },
          { name: "data", type: "object", description: "Optional user_metadata (full_name, phone, etc.)" },
        ],
        response: `{ "user": { "id": "uuid", "email": "..." }, "session": { ... } }`,
        curl: `curl -X POST '${BASE_URL}/api/auth/sign-up/email' \\
  -H 'Content-Type: application/json' \\
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'`,
      },
      {
        method: "POST",
        path: "/api/auth/sign-in/email",
        summary: "Login with email/password",
        description: "Authenticates user and sets session cookie.",
        auth: "None (Public)",
        body: [
          { name: "email", type: "string", required: true, description: "User email" },
          { name: "password", type: "string", required: true, description: "User password" },
        ],
        response: `{ "user": { ... }, "session": { ... } }`,
        curl: `curl -X POST '${BASE_URL}/api/auth/sign-in/email' \\
  -H 'Content-Type: application/json' \\
  -d '{"email":"test@example.com","password":"password123"}'`,
      },
      {
        method: "POST",
        path: "/api/auth/forget-password",
        summary: "Request password reset",
        description: "Sends a password reset email to the user.",
        auth: "None (Public)",
        body: [
          { name: "email", type: "string", required: true, description: "User email" },
        ],
        response: `{ "status": true }`,
      },
      {
        method: "GET",
        path: "/api/auth/get-session",
        summary: "Get current session",
        description: "Returns the authenticated user's session from the cookie.",
        auth: "Session Cookie",
        response: `{ "session": { "user": { "id": "uuid", "email": "..." } } }`,
      },
      {
        method: "POST",
        path: "/api/auth/sign-out",
        summary: "Sign out",
        description: "Invalidates the current session and clears cookies.",
        auth: "Session Cookie",
        response: `204 No Content`,
      },
    ],
  },
  {
    title: "API Endpoints",
    icon: Zap,
    description: "FastAPI backend endpoints handling business logic (Cloudflare Workers).",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/loans",
        summary: "Submit loan application",
        description: "Creates a new loan application. Auto-assigns a counselor, sends confirmation email, and creates a notification.",
        auth: "Session Cookie",
        body: [
          { name: "fullName", type: "string", required: true, description: "Applicant full name" },
          { name: "gender", type: "string", description: "male | female | other" },
          { name: "email", type: "string", required: true, description: "Applicant email" },
          { name: "phone", type: "string", required: true, description: "Phone number (+91...)" },
          { name: "isWhatsApp", type: "boolean", description: "Is this a WhatsApp number?" },
          { name: "hasOfferLetter", type: "boolean", description: "Has university offer letter?" },
          { name: "courseLevel", type: "string", description: "undergraduate | postgraduate | diploma | phd" },
          { name: "courseName", type: "string", description: "Name of the course" },
          { name: "targetCountry", type: "string", description: "Target study country" },
          { name: "targetUniversity", type: "string", description: "Target university name" },
          { name: "loanAmount", type: "number", description: "Requested loan amount in INR" },
          { name: "hasCollateral", type: "boolean", description: "Has collateral available?" },
          { name: "coApplicantIncome", type: "number", description: "Co-applicant annual income" },
        ],
        response: `{ "data": { "message": "Application submitted", "applicationId": "FMC-10001" } }`,
        curl: `curl -X POST '${BASE_URL}/api/v1/loans' \\
  --cookie 'better-auth.session_token=YOUR_SESSION' \\
  -H 'Content-Type: application/json' \\
  -d '{"fullName":"John Doe","email":"john@test.com","phone":"+919876543210","targetCountry":"USA","loanAmount":2500000}'`,
      },
      {
        method: "POST",
        path: "/api/v1/otp/send",
        summary: "Send phone OTP",
        description: "Sends a 6-digit OTP to the given phone number via Twilio Verify. Rate limited to 3 requests per 10 minutes.",
        auth: "Session Cookie (User)",
        body: [
          { name: "phone", type: "string", required: true, description: "Phone number in +91XXXXXXXXXX format" },
        ],
        response: `{ "data": { "verificationId": "...", "message": "OTP sent" } }`,
      },
      {
        method: "POST",
        path: "/api/v1/otp/verify",
        summary: "Verify phone OTP",
        description: "Verifies the OTP. On success, sets phone_verified=true on the profile. Max 5 attempts.",
        auth: "Session Cookie (User)",
        body: [
          { name: "otpId", type: "string", required: true, description: "Verification ID from send-otp" },
          { name: "otp", type: "string", required: true, description: "6-digit OTP code (stub accepts '123456')" },
        ],
        response: `{ "data": { "verified": true } }`,
      },
      {
        method: "POST",
        path: "/api/v1/contacts",
        summary: "Submit contact enquiry",
        description: "Public endpoint. Inserts a contact submission and sends email to the team + auto-reply. Rate limited to 3/hour/email.",
        auth: "None (Public)",
        body: [
          { name: "name", type: "string", required: true, description: "Full name" },
          { name: "email", type: "string", required: true, description: "Email address" },
          { name: "phone", type: "string", required: true, description: "Phone number" },
          { name: "message", type: "string", description: "Optional message" },
        ],
        response: `{ "data": { "message": "Contact form submitted" } }`,
        curl: `curl -X POST '${BASE_URL}/api/v1/contacts' \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"Jane","email":"jane@test.com","phone":"+919876543210","message":"Need help with loan"}'`,
      },
      {
        method: "POST",
        path: "/api/v1/documents/upload",
        summary: "Upload a document",
        description: "Uploads a file (PDF/JPEG/PNG/WebP, max 10MB) to storage and creates a document record.",
        auth: "Session Cookie (User)",
        body: [
          { name: "file", type: "File", required: true, description: "The file to upload (multipart/form-data)" },
          { name: "documentType", type: "string", required: true, description: "offer_letter | passport | pan_card | academic_transcripts | bank_statements | income_proof | co_applicant_income_proof | collateral_documents | photo | other" },
          { name: "loanApplicationId", type: "string", description: "Optional loan application to link to" },
        ],
        response: `{ "data": { "message": "Document uploaded", "documentId": "uuid" } }`,
      },
      {
        method: "POST",
        path: "/api/v1/loans/{id}/status",
        summary: "Update loan application status",
        description: "Admin/Counselor only. Validates state machine transitions, creates audit log, notifies user.",
        auth: "Session Cookie (Admin/Counselor)",
        body: [
          { name: "loanApplicationId", type: "string", required: true, description: "Loan application UUID" },
          { name: "newStatus", type: "string", required: true, description: "Target status (must follow state machine)" },
          { name: "note", type: "string", description: "Optional note for audit log" },
        ],
        response: `{ "data": { "message": "Status updated to sanctioned" } }`,
      },
      {
        method: "POST",
        path: "/api/v1/banks/match/{loanApplicationId}",
        summary: "Match bank offers for a loan",
        description: "Admin/Counselor only. Filters banks by eligibility criteria, calculates EMI, inserts offers, marks best offer.",
        auth: "Session Cookie (Admin/Counselor)",
        body: [
          { name: "loanApplicationId", type: "string", required: true, description: "Loan application UUID" },
        ],
        response: `{ "data": { "message": "5 bank offers matched", "offers": [...] } }`,
      },
      {
        method: "POST",
        path: "/api/v1/counselors/assign",
        summary: "Assign counselor to application",
        description: "Admin/Counselor only. Manually assign or auto-assign a counselor. Updates caseload counts.",
        auth: "Session Cookie (Admin/Counselor)",
        body: [
          { name: "loanApplicationId", type: "string", required: true, description: "Loan application UUID" },
          { name: "counselorId", type: "string", description: "Specific counselor UUID (omit for auto-assign)" },
        ],
        response: `{ "data": { "message": "Counselor assigned", "counselorId": "uuid" } }`,
      },
      {
        method: "POST",
        path: "/api/v1/admin/stats",
        summary: "Get admin dashboard statistics",
        description: "Admin only. Returns aggregate stats: users, applications, documents, referrals, payouts, top countries, counselor caseloads.",
        auth: "Session Cookie (Admin)",
        response: `{
  "data": {
    "totalUsers": 150,
    "newUsersThisMonth": 23,
    "totalApplications": 89,
    "applicationsThisMonth": 12,
    "applicationsByStatus": { "submitted": 15, "under_review": 8, ... },
    "totalDisbursed": 5,
    "disbursedAmountTotal": 12500000,
    "conversionRate": 5.6,
    "averageLoanAmount": 2500000,
    "topCountries": [{ "country": "USA", "count": 45 }, ...],
    "pendingDocuments": 18,
    "counselorCaseloads": [{ "name": "...", "activeCases": 5, "maxCases": 15 }],
    "activeReferrals": 12,
    "pendingPayouts": 3
  }
}`,
      },
      {
        method: "POST",
        path: "/api/v1/referrals/process",
        summary: "Process referral lifecycle event",
        description: "Service-level function. Handles referral events: signup, applied, sanctioned, disbursed.",
        auth: "Service Role Key",
        body: [
          { name: "action", type: "string", required: true, description: "signup | applied | sanctioned | disbursed" },
          { name: "refereeUserId", type: "string", required: true, description: "The referred user's ID" },
          { name: "referralCode", type: "string", description: "Required for 'signup' action" },
          { name: "loanApplicationId", type: "string", description: "Optional for 'applied' action" },
        ],
        response: `{ "data": { "message": "Referral signup processed successfully" } }`,
      },
      {
        method: "POST",
        path: "/api/v1/referrals/payout",
        summary: "Process referral payout via Razorpay",
        description: "Admin only. Initiates a bank transfer via Razorpay Payout API (3-step: contact, fund account, payout).",
        auth: "Session Cookie (Admin)",
        body: [
          { name: "payoutId", type: "string", required: true, description: "Referral payout UUID" },
          { name: "bankAccountDetails", type: "object", required: true, description: "{ accountNumber, ifscCode, accountHolderName }" },
        ],
        response: `{ "data": { "message": "Payout processing initiated", "razorpayPayoutId": "pout_..." } }`,
      },
      {
        method: "POST",
        path: "/api/v1/webhooks/razorpay",
        summary: "Razorpay webhook handler",
        description: "Receives payout events from Razorpay. Verifies signature, updates payout status, notifies user.",
        auth: "Razorpay Signature (X-Razorpay-Signature header)",
        body: [
          { name: "event", type: "string", description: "payout.processed | payout.reversed | payout.failed" },
          { name: "payload", type: "object", description: "Razorpay webhook payload" },
        ],
        response: `200 OK`,
      },
      {
        method: "POST",
        path: "/api/v1/notifications/send",
        summary: "Send in-app notification + optional email",
        description: "Service/Admin function. Creates a notification record and optionally sends email via SendGrid.",
        auth: "Service Role Key / Admin",
        body: [
          { name: "userId", type: "string", required: true, description: "Target user UUID" },
          { name: "type", type: "string", required: true, description: "Notification type (application_update, document_verified, etc.)" },
          { name: "title", type: "string", required: true, description: "Notification title" },
          { name: "message", type: "string", required: true, description: "Notification message" },
          { name: "email", type: "boolean", description: "Also send email? (default: false)" },
          { name: "emailTemplate", type: "string", description: "SendGrid template ID" },
          { name: "link", type: "string", description: "In-app link (e.g. /dashboard)" },
        ],
        response: `{ "data": { "message": "Notification sent" } }`,
      },
    ],
  },
  {
    title: "REST API",
    icon: Database,
    description: "FastAPI backend endpoints for all resources. Protected by session-based auth.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/profiles/me",
        summary: "Get user profile",
        description: "Returns the authenticated user's profile.",
        auth: "Session Cookie",
        response: `[{ "id": "uuid", "email": "...", "full_name": "...", "profile_completion_pct": 67, ... }]`,
        curl: `curl '${BASE_URL}/api/v1/profiles/me' \\
  --cookie 'better-auth.session_token=YOUR_SESSION'`,
      },
      {
        method: "PATCH",
        path: "/api/v1/profiles/me",
        summary: "Update user profile",
        description: "Updates profile fields. Profile completion % is recalculated automatically.",
        auth: "Session Cookie",
        body: [
          { name: "full_name", type: "string", description: "Full name" },
          { name: "phone", type: "string", description: "Phone number" },
          { name: "city", type: "string", description: "City" },
          { name: "state", type: "string", description: "State" },
          { name: "country", type: "string", description: "Country" },
        ],
        response: `204 No Content`,
      },
      {
        method: "GET",
        path: "/api/v1/loans/my",
        summary: "Get user's loan applications",
        description: "Returns all loan applications for the authenticated user with joined counselor data.",
        auth: "Session Cookie",
        response: `[{ "id": "uuid", "application_id": "FMC-10001", "status": "under_review", "counselors": { "name": "..." }, ... }]`,
      },
      {
        method: "GET",
        path: "/api/v1/documents/my",
        summary: "Get user's documents",
        description: "Returns all uploaded documents for the authenticated user.",
        auth: "Session Cookie",
        response: `[{ "id": "uuid", "document_type": "offer_letter", "status": "verified", ... }]`,
      },
      {
        method: "GET",
        path: "/api/v1/banks/offers/{appId}",
        summary: "Get matched bank offers",
        description: "Returns bank offers for a specific loan application with joined bank details.",
        auth: "Session Cookie",
        response: `[{ "bank_id": "uuid", "interest_rate": 8.65, "monthly_emi": 37250, "is_best_offer": true, "banks": { "name": "SBI" }, ... }]`,
      },
      {
        method: "GET",
        path: "/api/v1/notifications/my",
        summary: "Get user notifications",
        description: "Returns notifications ordered by newest first. Supports realtime subscriptions.",
        auth: "Session Cookie",
        response: `[{ "id": "uuid", "title": "...", "message": "...", "is_read": false, ... }]`,
      },
      {
        method: "GET",
        path: "/api/v1/referrals/my",
        summary: "Get user's referrals",
        description: "Returns all referrals where the user is the referrer.",
        auth: "Session Cookie",
        response: `[{ "id": "uuid", "status": "sanctioned", "profiles": { "full_name": "..." }, ... }]`,
      },
      {
        method: "GET",
        path: "/api/v1/banks",
        summary: "Get active banks",
        description: "Returns all active partner banks. Public read access.",
        auth: "None (Public)",
        response: `[{ "name": "SBI", "interest_rate_min": 8.15, "max_loan_amount": 15000000, ... }]`,
        curl: `curl '${BASE_URL}/api/v1/banks'`,
      },
      {
        method: "GET",
        path: "/api/v1/universities?search=harvard",
        summary: "Search universities",
        description: "Search universities by name. Uses trigram index for fast fuzzy matching. Public read access.",
        auth: "None (Public)",
        response: `[{ "name": "Harvard University", "country": "USA", "ranking": 1, ... }]`,
      },
      {
        method: "GET",
        path: "/api/v1/counselors",
        summary: "Get active counselors",
        description: "Admin/Counselor only. Returns active counselors with caseload info.",
        auth: "Session Cookie (Admin/Counselor)",
        response: `[{ "name": "...", "current_active_cases": 5, "max_active_cases": 15, ... }]`,
      },
    ],
  },
  {
    title: "Polling (Realtime Alternative)",
    icon: Globe,
    description: "Client-side polling replaces WebSocket-based realtime. The frontend polls these endpoints every 30 seconds.",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/notifications/my",
        summary: "Poll for notifications",
        description: `The frontend uses a polling hook (useRealtimeSubscription) that refetches data every 30 seconds for these resources:

- **loan_applications** — Status updates, counselor assignments
- **notifications** — New notifications
- **documents** — Document review status changes
- **bank_offers** — New matched offers

Each resource is polled via its respective API endpoint.`,
        auth: "Session Cookie",
        response: "JSON array of latest records",
      },
    ],
  },
];

// ─── Status Machine ──────────────────────────────────────────────────

const statusTransitions: Record<string, string[]> = {
  draft: ["submitted"],
  submitted: ["under_review", "cancelled"],
  under_review: ["documents_required", "bank_processing", "rejected"],
  documents_required: ["under_review", "cancelled"],
  bank_processing: ["sanctioned", "rejected"],
  sanctioned: ["disbursed"],
  disbursed: [],
  rejected: [],
  cancelled: [],
};

// ─── Components ──────────────────────────────────────────────────────

const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-700",
  POST: "bg-blue-100 text-blue-700",
  PATCH: "bg-amber-100 text-amber-700",
  DELETE: "bg-red-100 text-red-700",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-gray-400 hover:text-gray-600 transition-colors"
      title="Copy"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [expanded, setExpanded] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  async function handleTest() {
    setTesting(true);
    setTestResult(null);
    try {
      const url = `${BASE_URL}${endpoint.path.split("?")[0]}`;
      const res = await fetch(url, {
        method: endpoint.method === "GET" ? "GET" : "POST",
        credentials: "include" as RequestCredentials,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await res.text();
      try {
        setTestResult(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setTestResult(text);
      }
    } catch (err) {
      setTestResult(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
      >
        {expanded ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />}
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${methodColors[endpoint.method]}`}>
          {endpoint.method}
        </span>
        <code className="text-sm text-gray-700 font-mono truncate">{endpoint.path}</code>
        <span className="text-sm text-gray-500 ml-auto hidden sm:block">{endpoint.summary}</span>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 px-4 py-4 space-y-4 bg-gray-50/50">
          <p className="text-sm text-gray-600">{endpoint.description}</p>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Auth:</span>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{endpoint.auth}</span>
          </div>

          {endpoint.body && endpoint.body.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Request Body</h5>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-3 py-2 text-xs font-medium text-gray-500">Param</th>
                      <th className="px-3 py-2 text-xs font-medium text-gray-500">Type</th>
                      <th className="px-3 py-2 text-xs font-medium text-gray-500 hidden sm:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {endpoint.body.map((p) => (
                      <tr key={p.name}>
                        <td className="px-3 py-2 font-mono text-xs">
                          {p.name}
                          {p.required && <span className="text-red-500 ml-0.5">*</span>}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500">{p.type}</td>
                        <td className="px-3 py-2 text-xs text-gray-500 hidden sm:table-cell">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {endpoint.response && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-semibold text-gray-500 uppercase">Response</h5>
                <CopyButton text={endpoint.response} />
              </div>
              <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {endpoint.response}
              </pre>
            </div>
          )}

          {endpoint.curl && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-semibold text-gray-500 uppercase">cURL Example</h5>
                <CopyButton text={endpoint.curl} />
              </div>
              <pre className="bg-gray-900 text-gray-300 text-xs p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {endpoint.curl}
              </pre>
            </div>
          )}

          {endpoint.method === "GET" && !endpoint.path.startsWith("ws") && (
            <div>
              <button
                onClick={handleTest}
                disabled={testing}
                className="flex items-center gap-2 text-xs font-medium text-white bg-teal-500 hover:bg-teal-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {testing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                {testing ? "Testing..." : "Try it"}
              </button>
              {testResult && (
                <pre className="mt-2 bg-gray-900 text-green-400 text-xs p-3 rounded-lg overflow-x-auto max-h-60 whitespace-pre-wrap">
                  {testResult}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Database Schema Section ─────────────────────────────────────────

const tables = [
  { name: "profiles", columns: "id, email, full_name, phone, phone_verified, role, gender, date_of_birth, address_line1, city, state, country, referral_code, profile_completion_pct, ...", rls: "Users read/update own. Admins read all." },
  { name: "loan_applications", columns: "id, user_id, application_id (FMC-XXXXX), status, full_name, email, phone, course_level, target_country, target_university, loan_amount, assigned_counselor_id, ...", rls: "Users read own. Counselors/Admins read all." },
  { name: "documents", columns: "id, user_id, loan_application_id, document_type, file_name, file_path, status, rejection_reason, reviewed_by, ...", rls: "Users read own. Counselors/Admins manage all." },
  { name: "counselors", columns: "id, name, email, phone, whatsapp_number, specializations[], current_active_cases, max_active_cases, is_active", rls: "Public read. Admins manage." },
  { name: "banks", columns: "id, name, interest_rate_min/max, max_loan_amount, processing_fee_pct, requires_collateral, supported_countries[], supported_course_levels[], ...", rls: "Public read. Admins manage." },
  { name: "bank_offers", columns: "id, loan_application_id, bank_id, interest_rate, loan_amount, tenure_months, monthly_emi, processing_fee, is_best_offer, status", rls: "Users read own. Counselors/Admins manage." },
  { name: "referrals", columns: "id, referrer_id, referee_id, referral_code, status (pending/applied/sanctioned/disbursed/expired), qualified_at", rls: "Users read own. Admins read all." },
  { name: "referral_payouts", columns: "id, user_id, referral_id, amount, milestone_bonus, total_amount (generated), status, razorpay_payout_id", rls: "Users read own. Admins manage." },
  { name: "notifications", columns: "id, user_id, type, title, message, link, is_read, created_at", rls: "Users read/update own." },
  { name: "contact_submissions", columns: "id, name, email, phone, message, status (new/contacted/resolved/spam)", rls: "Public insert. Admins read/update." },
  { name: "universities", columns: "id, name, country, city, ranking, website", rls: "Public read." },
  { name: "loan_status_history", columns: "id, loan_application_id, old_status, new_status, changed_by, note, created_at", rls: "Users read own. Admins read all." },
  { name: "admin_audit_log", columns: "id, admin_id, action, entity_type, entity_id, old_value, new_value, created_at", rls: "Admins only." },
];

// ─── Main Page ───────────────────────────────────────────────────────

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>("Authentication");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Server className="w-6 h-6 text-teal-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">FundMyCampus API Docs</h1>
            <p className="text-xs text-gray-500">Base URL: <code className="bg-gray-100 px-1.5 py-0.5 rounded">{BASE_URL}</code></p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex gap-6">
        {/* Sidebar */}
        <nav className="hidden lg:block w-56 shrink-0 sticky top-20 self-start space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.title}
                onClick={() => setActiveSection(s.title)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === s.title
                    ? "bg-teal-50 text-teal-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {s.title}
              </button>
            );
          })}
          <button
            onClick={() => setActiveSection("Database Schema")}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              activeSection === "Database Schema"
                ? "bg-teal-50 text-teal-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Database className="w-4 h-4" />
            Database Schema
          </button>
          <button
            onClick={() => setActiveSection("Status Machine")}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
              activeSection === "Status Machine"
                ? "bg-teal-50 text-teal-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Zap className="w-4 h-4" />
            Status Machine
          </button>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Mobile section tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2">
            {[...sections.map((s) => s.title), "Database Schema", "Status Machine"].map((title) => (
              <button
                key={title}
                onClick={() => setActiveSection(title)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  activeSection === title
                    ? "bg-teal-500 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {title}
              </button>
            ))}
          </div>

          {/* API Sections */}
          {sections.map((section) => (
            <div
              key={section.title}
              className={activeSection === section.title ? "block" : "hidden"}
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{section.description}</p>
              </div>
              <div className="space-y-3">
                {section.endpoints.map((ep, i) => (
                  <EndpointCard key={i} endpoint={ep} />
                ))}
              </div>
            </div>
          ))}

          {/* Database Schema */}
          <div className={activeSection === "Database Schema" ? "block" : "hidden"}>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">Database Schema</h2>
              <p className="text-sm text-gray-500 mt-1">
                {tables.length} tables with Row Level Security. Managed via database migrations.
              </p>
            </div>
            <div className="space-y-3">
              {tables.map((t) => (
                <div key={t.name} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-teal-500" />
                    <h3 className="font-mono text-sm font-bold text-gray-900">{t.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-mono mb-2">{t.columns}</p>
                  <p className="text-xs text-purple-600"><span className="font-medium">RLS:</span> {t.rls}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Machine */}
          <div className={activeSection === "Status Machine" ? "block" : "hidden"}>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">Loan Status Machine</h2>
              <p className="text-sm text-gray-500 mt-1">Valid state transitions for loan applications. Enforced by the update-loan-status edge function.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Current Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Allowed Transitions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Object.entries(statusTransitions).map(([status, transitions]) => (
                    <tr key={status}>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-medium">{status}</code>
                      </td>
                      <td className="px-4 py-3">
                        {transitions.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {transitions.map((t) => (
                              <code key={t} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded">{t}</code>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Terminal state</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Visual Flow</h3>
              <pre className="text-xs text-gray-600 overflow-x-auto">{`
  draft -> submitted -> under_review -> documents_required
                |              |                |
                |              v                v
                |        bank_processing    under_review (loop)
                |              |
                |              v
                |         sanctioned -> disbursed
                |              |
                v              v
            cancelled       rejected
              `}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
