"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import {
  User, FileText, LogOut, GraduationCap, Clock, CheckCircle, XCircle,
  Bell, Gift, LayoutDashboard, Upload, Eye, Copy, Phone, AlertCircle,
  ChevronRight, Menu, X, MessageCircle, Send, ChevronDown
} from "lucide-react";

// ─────────────────── Types ───────────────────
interface Profile {
  full_name?: string; phone?: string; phone_verified?: boolean; gender?: string;
  date_of_birth?: string; marital_status?: string; about?: string;
  passport_number?: string; pan_number?: string; mother_maiden_name?: string;
  address_line1?: string; address_line2?: string; city?: string; district?: string;
  state?: string; zip_code?: string; country?: string;
  linkedin_url?: string; twitter_url?: string; instagram_url?: string;
  email?: string; referral_code?: string; role?: string; profile_completion_pct?: number; contact_consent?: boolean; is_whatsapp?: boolean;
}
interface LoanApplication {
  id: string; application_id?: string; status: string; created_at: string; loan_amount?: number;
  target_college?: string; target_country?: string; bank_name?: string; course_name?: string;
  course_level?: string; course_degree?: string;
  rejection_reason?: string; remarks?: string; notes?: string;
}
interface BankApplication { id: string; bank_name: string; status: string; remarks?: string; }
interface DocChecklist { document_type: string; label: string; required: boolean; status: "uploaded" | "pending" | "rejected" | "not_uploaded"; }
interface Document { id: string; document_type: string; file_name?: string; file_size?: number; file_url?: string; status: string; rejection_reason?: string; created_at: string; }
interface Notification { id: string; type: string; title: string; message: string; link?: string; is_read: boolean; created_at: string; }
interface Referral { id: string; status: string; created_at: string; }
interface Payout { id: string; amount: number; payout_type: string; status: string; created_at: string; }

// ─────────────────── Helpers ───────────────────
const DOC_LABELS: Record<string, string> = {
  // Personal
  passport: "Passport", pan_card: "PAN Card", aadhar: "Aadhaar",
  // Co-applicant
  bank_statement: "Bank Statement", itr: "ITR", salary_slip: "Salary Slip",
  // Collateral
  property_docs: "Property Documents",
  // Education
  offer_letter: "Offer Letter", transcript: "Transcript",
  marksheet_10th: "10th Marksheet", marksheet_12th: "12th Marksheet",
  graduation_certificate: "Graduation Certificate", pg_certificate: "PG Certificate",
  diploma_certificate: "Diploma", mba_certificate: "MBA",
  ca_cma_certificate: "CA / CMA", btech_be_certificate: "B.Tech / BE",
  // Other
  other: "Other Document",
};
const DOC_TYPES = Object.keys(DOC_LABELS);

const DOC_SECTIONS: { label: string; types: string[] }[] = [
  { label: "Personal", types: ["passport", "pan_card", "aadhar"] },
  { label: "Co-applicant", types: ["bank_statement", "itr", "salary_slip"] },
  { label: "Collateral", types: ["property_docs"] },
  { label: "Education", types: ["marksheet_10th", "marksheet_12th", "offer_letter"] },
];

const EXTRA_EDU_TYPES: Record<string, string> = {
  transcript: "Transcript", graduation_certificate: "Graduation Certificate",
  pg_certificate: "PG Certificate", diploma_certificate: "Diploma",
  mba_certificate: "MBA", ca_cma_certificate: "CA / CMA", btech_be_certificate: "B.Tech / BE",
};

function loanStatusColor(status: string) {
  if (["disbursed"].includes(status)) return "bg-green-100 text-green-700";
  if (["sanction", "processing_fee"].includes(status)) return "bg-blue-100 text-blue-700";
  if (["rejected", "withdrawn"].includes(status)) return "bg-red-100 text-red-700";
  if (["loan_login"].includes(status)) return "bg-purple-100 text-purple-700";
  return "bg-yellow-100 text-yellow-700";
}
function loanStatusIcon(status: string) {
  if (["disbursed", "sanction"].includes(status)) return <CheckCircle className="w-4 h-4 text-green-500" />;
  if (["rejected", "withdrawn"].includes(status)) return <XCircle className="w-4 h-4 text-red-500" />;
  return <Clock className="w-4 h-4 text-yellow-500" />;
}
function docStatusColor(status: string) {
  const m: Record<string, string> = { pending_review: "bg-yellow-100 text-yellow-700", under_review: "bg-blue-100 text-blue-700", verified: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700", expired: "bg-gray-100 text-gray-700" };
  return m[status] ?? "bg-gray-100 text-gray-700";
}
function docStatusIcon(status: string) {
  if (status === "verified") return <CheckCircle className="w-4 h-4 text-green-500" />;
  if (status === "rejected") return <XCircle className="w-4 h-4 text-red-500" />;
  if (status === "under_review") return <AlertCircle className="w-4 h-4 text-blue-500" />;
  return <Clock className="w-4 h-4 text-yellow-500" />;
}
function payoutStatusColor(status: string) {
  const m: Record<string, string> = { completed: "bg-green-100 text-green-700", processing: "bg-blue-100 text-blue-700", pending: "bg-yellow-100 text-yellow-700", failed: "bg-red-100 text-red-700", reversed: "bg-gray-100 text-gray-700" };
  return m[status] ?? "bg-gray-100 text-gray-700";
}
function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
function formatDate(d: string) { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
function formatSize(b: number) { return b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${(b / 1024).toFixed(0)} KB`; }

type Section = "overview" | "applications" | "documents" | "notifications" | "referrals" | "profile" | "chat";

// ─────────────────── Sidebar ───────────────────
const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode; activeColor: string; iconColor: string }[] = [
  { id: "overview",      label: "Overview",        icon: <LayoutDashboard className="w-4 h-4" />, activeColor: "bg-teal-500 text-white", iconColor: "text-teal-400" },
  { id: "applications",  label: "My Applications", icon: <GraduationCap className="w-4 h-4" />,  activeColor: "bg-teal-500 text-white", iconColor: "text-violet-400" },
  { id: "documents",     label: "Documents",       icon: <FileText className="w-4 h-4" />,        activeColor: "bg-teal-500 text-white", iconColor: "text-blue-400" },
  { id: "chat",          label: "Chat with Expert",icon: <MessageCircle className="w-4 h-4" />,   activeColor: "bg-teal-500 text-white", iconColor: "text-green-500" },
  { id: "profile",       label: "Edit Profile",    icon: <User className="w-4 h-4" />,            activeColor: "bg-teal-500 text-white", iconColor: "text-orange-400" },
];

function pctColor(pct: number) {
  if (pct < 20) return { bar: "bg-red-400",    text: "text-red-600",    border: "border-red-200",    bg: "bg-red-50",    banner: "bg-red-50 border border-red-200",    bannerText: "text-red-700",    bannerSub: "text-red-400" };
  if (pct < 50) return { bar: "bg-orange-400", text: "text-orange-600", border: "border-orange-200", bg: "bg-orange-50", banner: "bg-orange-50 border border-orange-200", bannerText: "text-orange-700", bannerSub: "text-orange-400" };
  if (pct < 80) return { bar: "bg-amber-400",  text: "text-amber-600",  border: "border-amber-200",  bg: "bg-amber-50",  banner: "bg-amber-50 border border-amber-200",  bannerText: "text-amber-700",  bannerSub: "text-amber-400" };
  if (pct < 100) return { bar: "bg-teal-500",  text: "text-teal-600",   border: "border-teal-200",   bg: "bg-teal-50",   banner: "bg-teal-50 border border-teal-200",    bannerText: "text-teal-700",   bannerSub: "text-teal-400" };
  return { bar: "bg-green-500", text: "text-green-600", border: "border-green-200", bg: "bg-green-50", banner: "bg-green-50 border border-green-200", bannerText: "text-green-700", bannerSub: "text-green-400" };
}

// ─────────────────── Overview Tab ───────────────────
function OverviewTab({ profile, loans, user, onSection }: { profile: Profile | null; loans: LoanApplication[]; user: { email?: string; name?: string } | null; onSection: (s: Section) => void }) {
  const displayName = profile?.full_name || user?.name || user?.email?.split("@")[0] || "User";
  const pct = profile?.profile_completion_pct ?? 0;
  const pc = pctColor(pct);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [checklist, setChecklist] = useState<DocChecklist[]>([]);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [referralCopied, setReferralCopied] = useState(false);
  const [showAllDocs, setShowAllDocs] = useState(false);
  const selectedLoanId = loans[0]?.id ?? "";

  useEffect(() => {
    Promise.allSettled([
      api.get<Notification[]>("/api/v1/notifications/my"),
      api.get<Document[]>("/api/v1/documents/my"),
      api.get<DocChecklist[]>("/api/v1/documents/required", selectedLoanId ? { loan_application_id: selectedLoanId } : undefined),
    ]).then(([n, d, cl]) => {
      if (n.status === "fulfilled" && Array.isArray(n.value)) setNotifications(n.value);
      if (d.status === "fulfilled" && Array.isArray(d.value)) setDocuments(d.value);
      if (cl.status === "fulfilled" && Array.isArray(cl.value)) setChecklist(cl.value);
    });
  }, [selectedLoanId]);

  async function handleDocUpload(docType: string, file: File) {
    setUploadingDoc(docType); setUploadError(""); setUploadSuccess("");
    try {
      const fd = new FormData();
      fd.append("file", file); fd.append("document_type", docType);
      if (selectedLoanId) fd.append("loan_application_id", selectedLoanId);
      const doc = await api.upload<Document>("/api/v1/documents", fd);
      setDocuments((d) => [doc, ...d]);
      setChecklist((cl) => cl.map((c) => c.document_type === docType ? { ...c, status: "pending" } : c));
      setUploadSuccess(`${DOC_LABELS[docType] ?? docType} uploaded!`);
    } catch (err) { setUploadError(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploadingDoc(null); }
  }

  const DOC_STATUS_STYLE: Record<string, { badge: string; label: string }> = {
    uploaded:     { badge: "bg-green-100 text-green-700",  label: "Uploaded" },
    pending:      { badge: "bg-yellow-100 text-yellow-700", label: "Pending Review" },
    rejected:     { badge: "bg-red-100 text-red-700",      label: "Rejected" },
    not_uploaded: { badge: "bg-gray-100 text-gray-500",    label: "Not Uploaded" },
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const activeLoans = loans.filter(l => !["rejected","withdrawn","disbursed"].includes(l.status));
  const approvedLoans = loans.filter(l => ["sanction","disbursed"].includes(l.status));

  // Next steps checklist
  const steps = [
    { done: !!profile?.full_name, label: "Add your full name", section: "profile" as Section },
    { done: !!profile?.phone, label: "Add phone number", section: "profile" as Section },
    { done: !!profile?.date_of_birth, label: "Add date of birth", section: "profile" as Section },
    { done: loans.length > 0, label: "Submit loan application", section: "applications" as Section },
    { done: documents.length > 0, label: "Upload a document", section: "documents" as Section },
  ];
  const pendingSteps = steps.filter(s => !s.done);

  function copyReferral() {
    if (profile?.referral_code) {
      navigator.clipboard.writeText(profile.referral_code);
      setReferralCopied(true);
      setTimeout(() => setReferralCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Applications", value: loans.length, num: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", dot: "bg-violet-400" },
          { label: "Active", value: activeLoans.length, num: "text-orange-500", bg: "bg-orange-50", border: "border-orange-100", dot: "bg-orange-400" },
          { label: "Approved", value: approvedLoans.length, num: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", dot: "bg-emerald-400" },
          { label: "Documents", value: documents.length, num: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", dot: "bg-blue-400" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-5`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${s.dot}`} />
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
            <p className={`text-3xl font-bold ${s.num}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Profile + Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 ${pc.bg} rounded-full flex items-center justify-center shrink-0 border-2 ${pc.border}`}>
              <User className={`w-7 h-7 ${pc.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <span className={`text-sm font-bold ${pc.text}`}>{pct}%</span>
          </div>
          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>Profile completion</span>
            <span className={`font-semibold ${pc.text}`}>
              {pct < 20 ? "Just started" : pct < 50 ? "In progress" : pct < 80 ? "Almost there" : pct < 100 ? "Nearly done!" : "Complete!"}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
            <div className={`${pc.bar} h-2.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
          </div>
          <button onClick={() => onSection("profile")} className={`w-full text-sm text-center ${pc.text} font-medium border ${pc.border} rounded-lg py-2 ${pc.bg} hover:opacity-80 transition-colors`}>
            {pct < 100 ? "Complete Profile →" : "View Profile →"}
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            {pendingSteps.length === 0 ? "✅ All steps complete!" : `Next Steps (${pendingSteps.length} remaining)`}
          </h2>
          <div className="space-y-3">
            {steps.map((s) => (
              <button key={s.label} onClick={() => !s.done && onSection(s.section)}
                className={`w-full flex items-center gap-3 text-left ${s.done ? "opacity-60 cursor-default" : "hover:bg-gray-50 rounded-lg"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${s.done ? "bg-green-100" : "bg-gray-100"}`}>
                  {s.done ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                </div>
                <span className={`text-sm ${s.done ? "line-through text-gray-400" : "text-gray-700"}`}>{s.label}</span>
                {!s.done && <ChevronRight className="w-3.5 h-3.5 text-gray-400 ml-auto" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications + Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent Applications</h2>
            <button onClick={() => onSection("applications")} className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          {loans.length === 0 ? (
            <div className="text-center py-6">
              <GraduationCap className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-2">No applications yet</p>
              <button onClick={() => onSection("applications")} className="text-sm text-teal-600 font-medium">Apply now →</button>
            </div>
          ) : (
            <div className="space-y-3">
              {loans.slice(0, 3).map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {loanStatusIcon(loan.status)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{loan.loan_amount ? `₹${loan.loan_amount.toLocaleString("en-IN")}` : loan.application_id ?? "Application"}</p>
                      <p className="text-xs text-gray-500">{formatDate(loan.created_at)}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${loanStatusColor(loan.status)}`}>{loan.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              Notifications
              {unreadCount > 0 && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">{unreadCount} new</span>}
            </h2>
            <button onClick={() => onSection("notifications")} className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
          </div>
          {notifications.length === 0 ? (
            <div className="text-center py-6">
              <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className={`flex gap-3 p-3 rounded-xl ${n.is_read ? "bg-gray-50" : "bg-teal-50 border border-teal-100"}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.is_read ? "bg-gray-300" : "bg-teal-500"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{n.title}</p>
                    <p className="text-xs text-gray-500 truncate">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{timeAgo(n.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2"><FileText className="w-4 h-4 text-teal-600" />My Documents</h2>
          <button onClick={() => onSection("documents")} className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
        </div>
        {uploadError && <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{uploadError}</div>}
        {uploadSuccess && <div className="mb-3 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">{uploadSuccess}</div>}
        {checklist.length > 0 ? (() => {
          const visible = showAllDocs ? checklist : checklist.slice(0, 4);
          return (
            <>
              <div className="space-y-2">
                {visible.map((item) => {
                  const style = DOC_STATUS_STYLE[item.status] ?? DOC_STATUS_STYLE.not_uploaded;
                  const needsUpload = item.status === "not_uploaded" || item.status === "rejected";
                  const isUploading = uploadingDoc === item.document_type;
                  return (
                    <div key={item.document_type} className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        {item.status === "uploaded" || item.status === "pending"
                          ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          : item.status === "rejected"
                          ? <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                          : <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />}
                        <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${style.badge}`}>{style.label}</span>
                        {needsUpload && (
                          <label className="cursor-pointer">
                            <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden"
                              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleDocUpload(item.document_type, f); }} />
                            <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isUploading ? "bg-gray-100 text-gray-400" : "bg-teal-500 text-white hover:bg-teal-600"}`}>
                              <Upload className="w-3 h-3" />{isUploading ? "Uploading..." : "Upload"}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {checklist.length > 4 && (
                <button onClick={() => setShowAllDocs(v => !v)} className="mt-3 w-full text-xs text-teal-600 font-medium border border-teal-100 rounded-lg py-2 hover:bg-teal-50 transition-colors">
                  {showAllDocs ? "Show less" : `Show ${checklist.length - 4} more`}
                </button>
              )}
            </>
          );
        })() : documents.length > 0 ? (() => {
          const visible = showAllDocs ? documents : documents.slice(0, 4);
          return (
            <>
              <div className="space-y-2">
                {visible.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {docStatusIcon(doc.status)}
                      <p className="text-sm font-medium text-gray-800">{DOC_LABELS[doc.document_type] ?? doc.document_type}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${docStatusColor(doc.status ?? "")}`}>{(doc.status ?? "pending").replace("_", " ")}</span>
                  </div>
                ))}
              </div>
              {documents.length > 4 && (
                <button onClick={() => setShowAllDocs(v => !v)} className="mt-3 w-full text-xs text-teal-600 font-medium border border-teal-100 rounded-lg py-2 hover:bg-teal-50 transition-colors">
                  {showAllDocs ? "Show less" : `Show ${documents.length - 4} more`}
                </button>
              )}
            </>
          );
        })() : (
          <div className="text-center py-6">
            <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-3">No documents uploaded yet</p>
            <button onClick={() => onSection("documents")} className="text-sm text-teal-600 font-medium hover:text-teal-700">Upload documents →</button>
          </div>
        )}
      </div>

      {/* Chat CTA */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-teal-100 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Chat with your Expert</p>
              <p className="text-xs text-gray-500 mt-0.5">Get instant answers on your loan application, documents & eligibility</p>
            </div>
          </div>
          <button onClick={() => onSection("chat")}
            className="shrink-0 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap">
            Open Chat →
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {["Loan eligibility", "Document checklist", "Application status"].map((q) => (
            <button key={q} onClick={() => onSection("chat")}
              className="text-xs text-teal-700 bg-white border border-teal-100 rounded-xl py-2 px-3 hover:bg-teal-50 transition-colors text-center font-medium shadow-sm">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Referral teaser */}
      <div onClick={() => onSection("referrals")} className="cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-5 text-white flex items-center justify-between gap-4 hover:from-teal-600 hover:to-teal-700 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">Refer friends & earn ₹2,000 per referral + ₹5,000 every 10th</p>
            <p className="text-xs text-teal-100 mt-0.5">View your referral journey →</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-teal-200 shrink-0" />
      </div>
    </div>
  );
}

// ─────────────────── Loan Process Tracker ───────────────────
const LOAN_STEPS = [
  { key: "applied",        label: "Applied",        sub: "Application submitted" },
  { key: "docs_received",  label: "Docs Received",  sub: "Documents received" },
  { key: "under_review",   label: "Under Review",   sub: "Team reviewing details" },
  { key: "loan_login",     label: "Loan Login",     sub: "Submitted to bank" },
  { key: "sanction",       label: "Sanctioned",     sub: "Loan approved by bank" },
  { key: "processing_fee", label: "Processing Fee", sub: "Fee payment required" },
  { key: "disbursed",      label: "Disbursed",      sub: "Amount credited" },
];

function getStepIndex(status: string): number {
  const map: Record<string, number> = {
    applied: 0,
    docs_received: 1,
    under_review: 2,
    loan_login: 3,
    sanction: 4,
    processing_fee: 5,
    disbursed: 6,
  };
  return map[status] ?? 0;
}

function isCancelled(status: string) {
  return ["rejected", "withdrawn"].includes(status);
}

const BANK_STATUS_COLOR: Record<string, string> = {
  disbursed: "bg-green-100 text-green-700", sanction: "bg-green-100 text-green-700",
  processing_fee: "bg-blue-100 text-blue-700", loan_login: "bg-purple-100 text-purple-700",
  under_review: "bg-yellow-100 text-yellow-700", docs_received: "bg-yellow-100 text-yellow-700",
  applied: "bg-gray-100 text-gray-600", rejected: "bg-red-100 text-red-700",
};

function BankTracker({ bank }: { bank: BankApplication }) {
  const cancelled = bank.status === "rejected";
  const activeStep = getStepIndex(bank.status);
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-900">{bank.bank_name}</p>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${BANK_STATUS_COLOR[bank.status] ?? "bg-gray-100 text-gray-600"}`}>
          {bank.status.replace(/_/g, " ")}
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[480px] relative">
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200" />
          <div className={`absolute top-4 left-4 h-0.5 transition-all ${cancelled ? "bg-red-400" : "bg-teal-500"}`}
            style={{ width: `calc((100% - 32px) * ${activeStep} / ${LOAN_STEPS.length - 1})` }} />
          <div className="flex justify-between relative">
            {LOAN_STEPS.map((step, i) => {
              const done = !cancelled && i < activeStep;
              const current = !cancelled && i === activeStep;
              const isCancelledHere = cancelled && i === activeStep;
              return (
                <div key={step.key} className="flex flex-col items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all bg-white ${
                    isCancelledHere ? "border-red-400 bg-red-50" :
                    done ? "border-teal-500 bg-teal-500" :
                    current ? "border-teal-500 bg-teal-500 ring-4 ring-teal-100" : "border-gray-300"
                  }`}>
                    {isCancelledHere ? <XCircle className="w-3.5 h-3.5 text-red-500" />
                      : done ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                      : current ? <div className="w-2 h-2 rounded-full bg-white" />
                      : <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                  </div>
                  <p className={`text-[10px] font-medium text-center leading-tight w-12 ${
                    isCancelledHere ? "text-red-600" : done || current ? "text-teal-700" : "text-gray-400"
                  }`}>{step.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {bank.remarks && <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">{bank.remarks}</p>}
    </div>
  );
}

function LoanProcessCard({ loan }: { loan: LoanApplication }) {
  const cancelled = isCancelled(loan.status);
  const [banks, setBanks] = useState<BankApplication[]>([]);

  useEffect(() => {
    api.get<BankApplication[]>(`/api/v1/loans/${loan.id}/banks`).then(setBanks).catch(() => {});
  }, [loan.id]);

  // Best bank = highest step index among all banks
  const bestBank = banks.length > 0 ? banks.reduce((best, b) =>
    getStepIndex(b.status) > getStepIndex(best.status) ? b : best
  , banks[0]) : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-semibold text-gray-900 text-base">
            {loan.loan_amount ? `₹${loan.loan_amount.toLocaleString("en-IN")}` : "Loan Application"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{loan.application_id ?? loan.id} · Applied {formatDate(loan.created_at)}</p>
        </div>
        {/* Best bank status badge */}
        {bestBank ? (
          <div className="shrink-0 bg-teal-50 border border-teal-200 rounded-xl px-3 py-2 min-w-[160px]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-teal-500 font-semibold uppercase tracking-wide">Best</span>
              <span className="text-xs font-bold text-teal-700">{bestBank.bank_name}</span>
            </div>
            {/* Mini step progress bar */}
            <div className="flex gap-0.5">
              {LOAN_STEPS.map((step, i) => {
                const stepIdx = getStepIndex(bestBank.status);
                const done = i <= stepIdx && !isCancelled(bestBank.status);
                return (
                  <div key={step.key} className={`flex-1 h-1.5 rounded-full transition-all ${done ? "bg-teal-500" : "bg-teal-100"}`} />
                );
              })}
            </div>
            <p className="text-[10px] text-teal-600 font-medium mt-1 text-right capitalize">
              {LOAN_STEPS[getStepIndex(bestBank.status)]?.label ?? bestBank.status.replace(/_/g, " ")}
            </p>
          </div>
        ) : (
          <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize shrink-0 ${cancelled ? "bg-red-100 text-red-700" : loanStatusColor(loan.status)}`}>
            {loan.status.replace(/_/g, " ")}
          </span>
        )}
      </div>

      {/* Details row */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-600">
        <span><span className="font-medium text-gray-800">Amount:</span> {loan.loan_amount ? `₹${loan.loan_amount.toLocaleString("en-IN")}` : "—"}</span>
        {loan.target_college ? <span><span className="font-medium text-gray-800">College:</span> {loan.target_college}</span> : <span className="text-gray-400">College: —</span>}
        {loan.target_country ? <span><span className="font-medium text-gray-800">Country:</span> {loan.target_country}</span> : <span className="text-gray-400">Country: —</span>}
        {(loan.course_name || loan.course_degree) && <span><span className="font-medium text-gray-800">Course:</span> {loan.course_name ?? loan.course_degree}</span>}
      </div>

      {/* Remarks */}
      {!cancelled && (loan.notes || loan.remarks) && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-xs font-medium text-blue-700 mb-1">Remarks from our team</p>
          <p className="text-sm text-blue-800">{loan.notes ?? loan.remarks}</p>
        </div>
      )}

      {/* Cancelled banner */}
      {cancelled && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm font-medium text-red-700 flex items-center gap-1.5">
            <XCircle className="w-4 h-4" /> Application {loan.status === "rejected" ? "Rejected" : "Withdrawn"}
          </p>
          {(loan.rejection_reason || loan.notes) && <p className="text-xs text-red-600 mt-1">{loan.rejection_reason ?? loan.notes}</p>}
        </div>
      )}

      {/* Banks with individual trackers */}
      {banks.length > 0 ? (
        <div className="space-y-3 border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Banks Processing Your Application</p>
          {banks.map((b) => <BankTracker key={b.id} bank={b} />)}
        </div>
      ) : (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 text-center py-2">No banks assigned yet. Our team is reviewing your application.</p>
        </div>
      )}
    </div>
  );
}

// ─────────────────── Applications Tab ───────────────────
function ApplicationsTab({ loans }: { loans: LoanApplication[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-violet-50 border border-violet-100 rounded-2xl px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-violet-900">My Loan Applications</h2>
          <p className="text-xs text-violet-400 mt-0.5">{loans.length} application{loans.length !== 1 ? "s" : ""} found</p>
        </div>
        <Link href="/signup">
          <Button variant="primary" size="sm"><GraduationCap className="w-4 h-4 mr-1.5" />New Application</Button>
        </Link>
      </div>
      {loans.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16">
          <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-violet-400" />
          </div>
          <p className="text-gray-500 mb-4">No applications yet</p>
          <Link href="/signup"><Button variant="primary" size="md">Apply for Loan</Button></Link>
        </div>
      ) : (
        loans.map((loan) => <LoanProcessCard key={loan.id} loan={loan} />)
      )}
    </div>
  );
}

// ─────────────────── Documents Tab ───────────────────
function DocumentsTab({ loans }: { loans: LoanApplication[] }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [extraEduRows, setExtraEduRows] = useState<{ id: number; docType: string }[]>([]);
  const [extraEduCounter, setExtraEduCounter] = useState(0);
  const loanId = loans[0]?.id ?? "";

  useEffect(() => {
    api.get<Document[]>("/api/v1/documents/my")
      .then((d) => { if (Array.isArray(d)) setDocuments(d); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function uploadDoc(docType: string, f: File) {
    if (f.size > 10 * 1024 * 1024) { setError("File must be under 10MB"); return; }
    setUploading(docType); setError(""); setSuccess("");
    try {
      const fd = new FormData();
      fd.append("file", f); fd.append("document_type", docType);
      if (loanId) fd.append("loan_application_id", loanId);
      const doc = await api.upload<Document>("/api/v1/documents", fd);
      setDocuments((d) => [doc, ...d]);
      setSuccess(`${DOC_LABELS[docType] ?? docType} uploaded successfully!`);
    } catch (err) { setError(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploading(null); }
  }

  // Get latest uploaded doc for a type
  function getDocStatus(docType: string) {
    return documents.find((d) => d.document_type === docType);
  }

  const STATUS_STYLE: Record<string, string> = {
    pending_review: "bg-yellow-100 text-yellow-700", under_review: "bg-blue-100 text-blue-700",
    verified: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700",
  };


  function DocRow({ docType }: { docType: string }) {
    const uploaded = getDocStatus(docType);
    const isUploading = uploading === docType;
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {uploaded?.status === "verified" ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
            : uploaded?.status === "rejected" ? <XCircle className="w-4 h-4 text-red-500 shrink-0" />
            : uploaded ? <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
            : <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />}
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800">{DOC_LABELS[docType]}</p>
            {uploaded && <p className="text-xs text-gray-400 truncate">{uploaded.file_name}</p>}
            {uploaded?.rejection_reason && <p className="text-xs text-red-600">{uploaded.rejection_reason}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {uploaded && (
            <>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_STYLE[uploaded.status] ?? "bg-gray-100 text-gray-500"}`}>
                {uploaded.status.replace(/_/g, " ")}
              </span>
              {uploaded.file_url && <a href={uploaded.file_url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700"><Eye className="w-4 h-4" /></a>}
            </>
          )}
          <label className="cursor-pointer">
            <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadDoc(docType, f); }} />
            <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isUploading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : uploaded ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-teal-500 text-white hover:bg-teal-600"}`}>
              <Upload className="w-3 h-3" />{isUploading ? "Uploading..." : uploaded ? "Re-upload" : "Upload"}
            </span>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
      {success && <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">{success}</div>}
      {loading ? <p className="text-sm text-gray-500 text-center py-8">Loading...</p> : (
        <>
          {/* Personal, Co-applicant, Collateral sections */}
          {(() => {
            const sectionStyles = [
              { icon: "🪪", accent: "border-l-4 border-blue-400", titleColor: "text-blue-700" },
              { icon: "👥", accent: "border-l-4 border-orange-400", titleColor: "text-orange-700" },
              { icon: "🏠", accent: "border-l-4 border-yellow-400", titleColor: "text-yellow-700" },
            ];
            return DOC_SECTIONS.slice(0, 3).map((section, i) => (
              <div key={section.label} className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${sectionStyles[i].accent}`}>
                <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2 ${sectionStyles[i].titleColor}`}>
                  <span>{sectionStyles[i].icon}</span>{section.label} Documents
                </h2>
                <div className="space-y-2">
                  {section.types.map((t) => <DocRow key={t} docType={t} />)}
                </div>
              </div>
            ));
          })()}

          {/* Education section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 border-l-4 border-teal-400">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2 text-teal-700">
              <span>🎓</span>Education Documents
            </h2>
            <div className="space-y-2">
              {DOC_SECTIONS[3].types.map((t) => <DocRow key={t} docType={t} />)}
            </div>

            {/* Extra education upload rows */}
            {extraEduRows.length > 0 && (
              <div className="space-y-2 mt-2">
                {extraEduRows.map((row) => (
                  <div key={row.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <select value={row.docType}
                      onChange={(e) => setExtraEduRows((r) => r.map((x) => x.id === row.id ? { ...x, docType: e.target.value } : x))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                      <option value="">Select degree type</option>
                      {Object.entries(EXTRA_EDU_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                    <label className="cursor-pointer shrink-0">
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f && row.docType) uploadDoc(row.docType, f); }} />
                      <span className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${!row.docType ? "bg-gray-100 text-gray-400" : uploading === row.docType ? "bg-gray-100 text-gray-400" : "bg-teal-500 text-white hover:bg-teal-600"}`}>
                        <Upload className="w-3 h-3" />{uploading === row.docType ? "Uploading..." : "Upload"}
                      </span>
                    </label>
                    <button onClick={() => setExtraEduRows((r) => r.filter((x) => x.id !== row.id))}
                      className="text-gray-400 hover:text-red-500 shrink-0"><XCircle className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setExtraEduCounter((c) => c + 1); setExtraEduRows((r) => [...r, { id: extraEduCounter + 1, docType: "" }]); }}
                className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium">
                <span className="w-6 h-6 rounded-full border-2 border-teal-400 flex items-center justify-center text-teal-500 font-bold text-base leading-none">+</span>
                Add More Education Document
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────── Notifications Tab ───────────────────
function NotificationsTab() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    api.get<Notification[]>("/api/v1/notifications/my", { unread_only: unreadOnly }).then(setNotifications).catch(() => {}).finally(() => setLoading(false));
  }, [unreadOnly]);

  async function markRead(id: string) {
    setNotifications((n) => n.map((x) => x.id === id ? { ...x, is_read: true } : x));
    api.patch(`/api/v1/notifications/${id}/read`).catch(() => {
      setNotifications((n) => n.map((x) => x.id === id ? { ...x, is_read: false } : x));
    });
  }
  async function markAll() {
    await api.post("/api/v1/notifications/read-all").catch(() => {});
    setNotifications((n) => n.map((x) => ({ ...x, is_read: true })));
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[{ label: "All", v: false }, { label: "Unread", v: true }].map(({ label, v }) => (
              <button key={label} onClick={() => setUnreadOnly(v)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${unreadOnly === v ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{label}</button>
            ))}
          </div>
          <button onClick={markAll} className="text-xs text-teal-600 hover:text-teal-700 font-medium">Mark all read</button>
        </div>
      </div>
      {loading ? <p className="text-sm text-gray-500 text-center py-8">Loading...</p> : notifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Bell className="w-7 h-7 text-teal-300" />
          </div>
          <p className="text-sm text-gray-500">No notifications</p>
        </div>
      ) : (
        <div className="space-y-1">
          {notifications.map((n) => (
            <div key={n.id} onClick={() => { markRead(n.id); if (n.link) router.push(n.link); }}
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors ${!n.is_read ? "bg-teal-50 border border-teal-100 hover:bg-teal-100/50" : "hover:bg-gray-50"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!n.is_read ? "bg-teal-100" : "bg-gray-100"}`}>
                <Bell className={`w-4 h-4 ${!n.is_read ? "text-teal-600" : "text-gray-400"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!n.is_read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-xs text-gray-400">{timeAgo(n.created_at)}</span>
                {!n.is_read && <span className="w-2 h-2 rounded-full bg-teal-500" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────── Referrals Tab ───────────────────
const REFERRAL_JOURNEY = [
  { icon: "🔗", title: "Share Your Code", desc: "Send your unique code to friends applying for education loans", color: "bg-blue-50 border-blue-200", dot: "bg-blue-500" },
  { icon: "✍️", title: "Friend Signs Up", desc: "Your friend registers on FundMyCampus using your code", color: "bg-purple-50 border-purple-200", dot: "bg-purple-500" },
  { icon: "🏦", title: "Loan Sanctioned", desc: "You earn ₹1,000 when their loan gets sanctioned by the bank", color: "bg-yellow-50 border-yellow-200", dot: "bg-yellow-500" },
  { icon: "💸", title: "Loan Disbursed", desc: "You earn another ₹1,000 + your friend earns ₹1,000 too!", color: "bg-green-50 border-green-200", dot: "bg-green-500" },
];

const EARNINGS_TABLE = [
  { referrals: 1,  total: 2000,  bonus: 0 },
  { referrals: 5,  total: 10000, bonus: 0 },
  { referrals: 10, total: 20000, bonus: 5000 },
  { referrals: 20, total: 40000, bonus: 10000 },
  { referrals: 30, total: 60000, bonus: 15000 },
];

const REFERRAL_STATUS_STEPS: Record<string, number> = {
  // DB values (what backend actually stores)
  applied: 1, sanctioned: 2, disbursed: 3,
  // Also handle prefixed variants in case backend uses these
  signed_up: 1, loan_applied: 1, loan_sanctioned: 2, loan_disbursed: 3,
};

function ReferralsTab({ profile }: { profile: Profile | null }) {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.allSettled([
      api.get<Referral[]>("/api/v1/referrals/my"),
      api.get<Payout[]>("/api/v1/referrals/my/payouts"),
    ]).then(([r, p]) => {
      if (r.status === "fulfilled") setReferrals(r.value);
      if (p.status === "fulfilled") setPayouts(p.value);
    }).finally(() => setLoading(false));
  }, []);

  function copy(text: string) { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  const totalEarned = payouts.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);
  const pendingEarnings = payouts.filter(p => p.status === "processing" || p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const disbursed = referrals.filter(r => r.status === "loan_disbursed").length;

  return (
    <div className="space-y-6">

      {/* Hero — code + stats */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="w-5 h-5" />
          <p className="font-bold text-lg">Refer & Earn</p>
        </div>
        <p className="text-sm text-teal-100 mb-5">Earn up to ₹2,000 per friend + ₹5,000 bonus every 10th referral</p>

        {/* Code box */}
        {profile?.referral_code && (
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 px-4 py-3 bg-white/15 backdrop-blur-sm rounded-xl font-mono text-2xl font-bold tracking-widest text-center">
              {profile.referral_code}
            </div>
            <button onClick={() => copy(profile.referral_code!)}
              className="flex items-center gap-2 px-4 py-3 bg-white text-teal-600 rounded-xl text-sm font-semibold hover:bg-teal-50 transition-colors shrink-0">
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Referred", value: referrals.length },
            { label: "Disbursed", value: disbursed },
            { label: "Total Earned", value: `₹${totalEarned.toLocaleString("en-IN")}` },
          ].map((s) => (
            <div key={s.label} className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-[11px] text-teal-100 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        {pendingEarnings > 0 && (
          <p className="text-xs text-teal-100 mt-3 text-center">₹{pendingEarnings.toLocaleString("en-IN")} pending payout</p>
        )}
      </div>

      {/* Journey */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-5">How the Referral Journey Works</h2>
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-100" />
          <div className="space-y-4">
            {REFERRAL_JOURNEY.map((step, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg shrink-0 z-10 ${step.color}`}>
                  {step.icon}
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                  {i === 2 && <span className="inline-block mt-1.5 text-[11px] font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full">+₹1,000 to you</span>}
                  {i === 3 && <span className="inline-block mt-1.5 text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">+₹1,000 to you &amp; ₹1,000 to friend</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 p-4 bg-teal-50 rounded-xl border border-teal-100">
          <p className="text-xs font-semibold text-teal-700 flex items-center gap-1.5">🎁 Bonus Milestone</p>
          <p className="text-xs text-teal-600 mt-1">Every 10th successful referral earns you an extra <strong>₹5,000</strong> bonus on top of the regular reward!</p>
        </div>
      </div>

      {/* Earnings potential table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Earnings Potential</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-xs font-semibold text-gray-500">Referrals</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500">Base Earnings</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500">Bonus</th>
                <th className="text-right py-2 text-xs font-semibold text-teal-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {EARNINGS_TABLE.map((row) => (
                <tr key={row.referrals} className={`border-b border-gray-50 ${referrals.length >= row.referrals ? "bg-emerald-50" : ""}`}>
                  <td className="py-3 text-gray-900 font-medium flex items-center gap-2">
                    {referrals.length >= row.referrals
                      ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-200" />}
                    {row.referrals} {row.referrals === 1 ? "friend" : "friends"}
                  </td>
                  <td className="py-3 text-right text-gray-700">₹{row.total.toLocaleString("en-IN")}</td>
                  <td className="py-3 text-right font-medium">{row.bonus > 0 ? <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-xs">+₹{row.bonus.toLocaleString("en-IN")}</span> : <span className="text-gray-300">—</span>}</td>
                  <td className="py-3 text-right font-bold text-emerald-700">₹{(row.total + row.bonus).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referral history */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Referral History</h2>
        {loading ? <p className="text-sm text-gray-500 py-4 text-center">Loading...</p> : referrals.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🤝</div>
            <p className="text-sm font-medium text-gray-700">No referrals yet</p>
            <p className="text-xs text-gray-500 mt-1">Share your code and start earning!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {referrals.map((r, idx) => {
              const step = REFERRAL_STATUS_STEPS[r.status] ?? 1;
              return (
                <div key={r.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-900">Referral #{idx + 1}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 font-medium capitalize">{r.status.replace(/_/g, " ")}</span>
                      <span className="text-xs text-gray-400">{formatDate(r.created_at)}</span>
                    </div>
                  </div>
                  {/* Mini journey progress */}
                  <div className="flex gap-0.5">
                    {["Signed Up","Applied","Sanctioned","Disbursed"].map((label, i) => (
                      <div key={label} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-full h-1.5 rounded-full ${i < step ? "bg-teal-500" : "bg-gray-200"}`} />
                        <p className={`text-[9px] font-medium ${i < step ? "text-teal-600" : "text-gray-400"}`}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payouts */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Payout History</h2>
        {loading ? <p className="text-sm text-gray-500 text-center py-4">Loading...</p> : payouts.length === 0 ? (
          <div className="text-center py-6 text-sm text-gray-500">No payouts yet</div>
        ) : (
          <div className="space-y-3">
            {payouts.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-base">💰</div>
                  <div>
                    <p className="text-sm font-bold text-green-700">₹{p.amount.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-gray-500 capitalize">{p.payout_type.replace(/_/g, " ")} · {formatDate(p.created_at)}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${payoutStatusColor(p.status)}`}>{p.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────── Profile Tab ───────────────────
function ProfileTab({ profile, onSave }: { profile: Profile | null; onSave: (p: Profile) => void }) {
  const [form, setForm] = useState<Profile>(profile ?? {});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { if (profile) setForm(profile); }, [profile]);

  function f(field: keyof Profile, value: string) { setForm((p) => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(""); setSuccess(false); setSaving(true);
    const val = (v: string | null | undefined) => (v && v.trim() !== "" ? v : undefined);
    const payload: Record<string, unknown> = {};
    if (val(form.full_name)) payload.full_name = val(form.full_name);
    if (val(form.phone)) payload.phone = val(form.phone);
    if (val(form.gender)) payload.gender = val(form.gender);
    if (val(form.date_of_birth)) payload.date_of_birth = val(form.date_of_birth);
    if (val(form.marital_status)) payload.marital_status = val(form.marital_status);
    if (val(form.about)) payload.about = val(form.about);
    if (val(form.passport_number)) payload.passport_number = val(form.passport_number);
    if (val(form.pan_number)) payload.pan_number = val(form.pan_number);
    if (val(form.mother_maiden_name)) payload.mother_maiden_name = val(form.mother_maiden_name);
    if (val(form.address_line1)) payload.address_line1 = val(form.address_line1);
    if (val(form.address_line2)) payload.address_line2 = val(form.address_line2);
    if (val(form.city)) payload.city = val(form.city);
    if (val(form.district)) payload.district = val(form.district);
    if (val(form.state)) payload.state = val(form.state);
    if (val(form.zip_code)) payload.zip_code = val(form.zip_code);
    if (val(form.country)) payload.country = val(form.country);
    if (val(form.linkedin_url)) payload.linkedin_url = val(form.linkedin_url);
    if (val(form.twitter_url)) payload.twitter_url = val(form.twitter_url);
    if (val(form.instagram_url)) payload.instagram_url = val(form.instagram_url);
    payload.contact_consent = !!form.contact_consent;
    payload.is_whatsapp = !!form.is_whatsapp;
    try {
      const updated = await api.patch<Profile>("/api/v1/profiles/me", payload);
      setSuccess(true); onSave(updated);
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to save"); }
    finally { setSaving(false); }
  }

  const inp = "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500";
  const sec = "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4";

  return (
    <div className="space-y-6">
      {/* Read-only */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className={sec}>Account Info</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><p className="text-xs text-gray-500 mb-1">Email</p><p className="text-sm font-medium text-gray-800">{form.email}</p></div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Profile Completion</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5"><div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${form.profile_completion_pct ?? 0}%` }} /></div>
              <span className="text-xs text-gray-600 font-medium">{form.profile_completion_pct ?? 0}%</span>
            </div>
          </div>
          {form.referral_code && (
            <div><p className="text-xs text-gray-500 mb-1">Referral Code</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-teal-600">{form.referral_code}</span>
                <button onClick={() => { navigator.clipboard.writeText(form.referral_code!); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="text-gray-400 hover:text-teal-600">
                  {copied ? <CheckCircle className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
        {success && <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">Profile updated successfully!</div>}

        {/* Personal */}
        <div>
          <p className={sec}>Personal Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label><input type="text" value={form.full_name ?? ""} onChange={(e) => f("full_name", e.target.value)} className={inp} /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input type="tel" value={form.phone ?? ""} onChange={(e) => f("phone", e.target.value)} className={`flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500`} />
                {!form.phone_verified && form.phone && <Link href="/otp-verify"><button type="button" className="px-3 py-2.5 text-xs font-medium text-teal-600 border border-teal-300 rounded-lg hover:bg-teal-50">Verify</button></Link>}
                {form.phone_verified && <span className="flex items-center text-xs text-green-600 gap-1"><CheckCircle className="w-4 h-4" />Verified</span>}
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={form.is_whatsapp ?? false}
                  onChange={(e) => setForm((p) => ({ ...p, is_whatsapp: e.target.checked }))}
                  className="w-4 h-4 accent-teal-500" />
                <span className="text-xs text-gray-500">This number is on WhatsApp</span>
              </label>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
              <select value={form.gender ?? ""} onChange={(e) => f("gender", e.target.value)} className={`${inp} bg-white`}>
                <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label><input type="date" value={form.date_of_birth ?? ""} onChange={(e) => f("date_of_birth", e.target.value)} className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Marital Status</label>
              <select value={form.marital_status ?? ""} onChange={(e) => f("marital_status", e.target.value)} className={`${inp} bg-white`}>
                <option value="">Select</option><option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
              </select>
            </div>
            <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1.5">About</label>
              <textarea value={form.about ?? ""} onChange={(e) => f("about", e.target.value)} rows={3} placeholder="Tell us about yourself" className={`${inp} resize-none`} /></div>
          </div>
        </div>

        {/* Identity */}
        <div className="border-t border-gray-100 pt-5">
          <p className={sec}>Identity Documents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Passport Number</label><input type="text" value={form.passport_number ?? ""} onChange={(e) => f("passport_number", e.target.value)} className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">PAN Number</label><input type="text" value={form.pan_number ?? ""} onChange={(e) => f("pan_number", e.target.value)} className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Mother&apos;s Maiden Name</label><input type="text" value={form.mother_maiden_name ?? ""} onChange={(e) => f("mother_maiden_name", e.target.value)} className={inp} /></div>
          </div>
        </div>

        {/* Address */}
        <div className="border-t border-gray-100 pt-5">
          <p className={sec}>Address</p>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 1</label><input type="text" value={form.address_line1 ?? ""} onChange={(e) => f("address_line1", e.target.value)} className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 2</label><input type="text" value={form.address_line2 ?? ""} onChange={(e) => f("address_line2", e.target.value)} className={inp} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">City</label><input type="text" value={form.city ?? ""} onChange={(e) => f("city", e.target.value)} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">District</label><input type="text" value={form.district ?? ""} onChange={(e) => f("district", e.target.value)} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">State</label><input type="text" value={form.state ?? ""} onChange={(e) => f("state", e.target.value)} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">PIN Code</label><input type="text" value={form.zip_code ?? ""} onChange={(e) => f("zip_code", e.target.value)} className={inp} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label><input type="text" value={form.country ?? "India"} onChange={(e) => f("country", e.target.value)} className={inp} /></div>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="border-t border-gray-100 pt-5">
          <p className={sec}>Social Links</p>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label><input type="url" value={form.linkedin_url ?? ""} onChange={(e) => f("linkedin_url", e.target.value)} placeholder="https://linkedin.com/in/..." className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Twitter / X</label><input type="url" value={form.twitter_url ?? ""} onChange={(e) => f("twitter_url", e.target.value)} placeholder="https://x.com/..." className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Instagram</label><input type="url" value={form.instagram_url ?? ""} onChange={(e) => f("instagram_url", e.target.value)} placeholder="https://instagram.com/..." className={inp} /></div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <label className="flex items-start gap-3 cursor-pointer mb-5">
            <input
              type="checkbox"
              checked={form.contact_consent ?? false}
              onChange={(e) => setForm((p) => ({ ...p, contact_consent: e.target.checked }))}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500 shrink-0"
            />
            <span className="text-sm text-gray-600">
              I consent to be contacted via phone calls, SMS, and email regarding my loan application and related services.
            </span>
          </label>
          <Button type="submit" variant="primary" size="md" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
        </div>
      </form>
    </div>
  );
}

// ─────────────────── Chat ───────────────────
interface ChatMessage {
  id: string;
  user_id: string;
  sender_id: string;
  sender_role: "user" | "counselor" | "admin";
  message: string;
  is_read: boolean;
  created_at: string;
}

function useChatMessages(active: boolean) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const lastRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    async function fetch(since?: string) {
      try {
        const params: Record<string, string> = {};
        if (since) params.since = since;
        const data = await api.get<ChatMessage[]>("/api/v1/chat/messages", params);
        if (cancelled) return;
        if (since) {
          setMessages((prev) => {
            const ids = new Set(prev.map((m) => m.id));
            const fresh = data.filter((m) => !ids.has(m.id));
            return fresh.length ? [...prev, ...fresh] : prev;
          });
        } else {
          setMessages(data);
        }
        if (data.length > 0) lastRef.current = data[data.length - 1].created_at;
      } catch { /* ignore */ }
    }
    fetch();
    api.patch("/api/v1/chat/messages/read").catch(() => {});
    const id = setInterval(() => fetch(lastRef.current ?? undefined), 4000);
    return () => { cancelled = true; clearInterval(id); };
  }, [active]);

  return { messages, setMessages, lastRef };
}

// Full-page chat section (desktop sidebar)
function ChatSection({ userId }: { userId: string }) {
  const { messages, setMessages, lastRef } = useChatMessages(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const msg = text.trim();
    if (!msg || sending) return;
    setText("");
    setSending(true);
    try {
      const sent = await api.post<ChatMessage>("/api/v1/chat/send", { message: msg });
      setMessages((prev) => [...prev, sent]);
      lastRef.current = sent.created_at;
    } catch { setText(msg); }
    finally { setSending(false); }
  }

  function formatTime(d: string) {
    return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  }

  const QUICK = ["What documents do I need?", "What's my loan status?", "How long does approval take?"];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ height: "calc(100vh - 180px)", minHeight: 500 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-teal-500 to-teal-600 shrink-0">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">FundMyCampus Expert</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
            <p className="text-xs text-teal-100">Online — typically replies in minutes</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-teal-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Start a conversation</p>
            <p className="text-xs text-gray-400 mb-6">Our experts are here to help with your loan journey</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK.map((q) => (
                <button key={q} onClick={() => setText(q)}
                  className="text-xs bg-white border border-teal-200 text-teal-700 rounded-full px-4 py-2 hover:bg-teal-50 transition-colors font-medium shadow-sm">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => {
          const isMe = m.sender_id === userId || m.sender_role === "user";
          return (
            <div key={m.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shrink-0 self-end">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[70%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {!isMe && <p className="text-[10px] font-semibold text-teal-600 px-1 capitalize">{m.sender_role}</p>}
                <div className={`px-4 py-2.5 rounded-2xl ${isMe ? "bg-teal-500 text-white rounded-tr-sm" : "bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-sm"}`}>
                  <p className="text-sm leading-relaxed">{m.message}</p>
                </div>
                <p className={`text-[10px] px-1 ${isMe ? "text-gray-400" : "text-gray-400"}`}>{formatTime(m.created_at)}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies (when messages exist) */}
      {messages.length > 0 && (
        <div className="flex gap-2 px-5 py-2 bg-gray-50 border-t border-gray-100 overflow-x-auto shrink-0">
          {QUICK.map((q) => (
            <button key={q} onClick={() => setText(q)}
              className="text-xs bg-white border border-gray-200 text-gray-600 rounded-full px-3 py-1.5 hover:border-teal-300 hover:text-teal-700 transition-colors whitespace-nowrap font-medium shrink-0">
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={sendMessage} className="flex items-center gap-3 px-4 py-3 bg-white border-t border-gray-100 shrink-0">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50"
          disabled={sending}
        />
        <button type="submit" disabled={!text.trim() || sending}
          className="w-10 h-10 bg-teal-500 hover:bg-teal-600 disabled:opacity-40 rounded-xl flex items-center justify-center transition-colors shrink-0">
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}

// Mobile-only floating chat widget
function ChatWidget({ userId, unread }: { userId: string; unread: number }) {
  const [open, setOpen] = useState(false);
  const { messages, setMessages, lastRef } = useChatMessages(open);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const msg = text.trim();
    if (!msg || sending) return;
    setText(""); setSending(true);
    try {
      const sent = await api.post<ChatMessage>("/api/v1/chat/send", { message: msg });
      setMessages((prev) => [...prev, sent]);
      lastRef.current = sent.created_at;
    } catch { setText(msg); }
    finally { setSending(false); }
  }

  function formatTime(d: string) {
    return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="lg:hidden">
      {open && (
        <div className="fixed bottom-20 right-4 z-50 w-80 flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden" style={{ height: "460px" }}>
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Expert Chat</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                <p className="text-[10px] text-teal-100">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-400">No messages yet. Say hi!</p>
              </div>
            )}
            {messages.map((m) => {
              const isMe = m.sender_id === userId || m.sender_role === "user";
              return (
                <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] px-3 py-2 ${isMe ? "bg-teal-500 text-white rounded-2xl rounded-tr-sm" : "bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm"}`}>
                    {!isMe && <p className="text-[10px] font-semibold text-teal-600 mb-0.5 capitalize">{m.sender_role}</p>}
                    <p className="text-sm leading-relaxed">{m.message}</p>
                    <p className={`text-[10px] mt-1 text-right ${isMe ? "text-teal-100" : "text-gray-400"}`}>{formatTime(m.created_at)}</p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={sendMessage} className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 bg-white shrink-0">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 bg-gray-50"
              disabled={sending} />
            <button type="submit" disabled={!text.trim() || sending}
              className="w-8 h-8 bg-teal-500 hover:bg-teal-600 disabled:opacity-40 rounded-xl flex items-center justify-center transition-colors shrink-0">
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </form>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-50 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 relative"
        style={{ width: 52, height: 52 }}>
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
    </div>
  );
}

// ─────────────────── Main Dashboard ───────────────────
export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [topTab, setTopTab] = useState<"dashboard" | "referrals">("dashboard");
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loans, setLoans] = useState<LoanApplication[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [loading, user, router]);

  // Poll chat unread count
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    async function fetchChatUnread() {
      try {
        const data = await api.get<{ unread_count: number }>("/api/v1/chat/unread");
        if (!cancelled) setUnreadChatCount(data.unread_count);
      } catch { /* ignore */ }
    }
    fetchChatUnread();
    const id = setInterval(fetchChatUnread, 5000);
    return () => { cancelled = true; clearInterval(id); };
  }, [user]);

  useEffect(() => {
    if (!user) return;
    Promise.allSettled([
      api.get<Profile>("/api/v1/profiles/me"),
      api.get<LoanApplication[]>("/api/v1/loans/my"),
      api.get<Notification[]>("/api/v1/notifications/my"),
    ]).then(([p, l, n]) => {
      if (p.status === "fulfilled") setProfile(p.value);
      if (l.status === "fulfilled") setLoans(l.value);
      if (n.status === "fulfilled" && Array.isArray(n.value))
        setUnreadNotifCount(n.value.filter((x) => !x.is_read).length);
    }).finally(() => setDataLoading(false));
  }, [user]);

  const handleSection = useCallback((s: Section) => {
    if (s === "referrals") { setTopTab("referrals"); setSidebarOpen(false); return; }
    setTopTab("dashboard");
    setActiveSection(s);
    setSidebarOpen(false);
  }, []);

  if (loading || (!user && !loading)) return null;

  const displayName = profile?.full_name || user?.name || user?.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Welcome back, {displayName}!</h1>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleSection("notifications")} className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifCount > 9 ? "9+" : unreadNotifCount}
                </span>
              )}
            </button>
            <Button variant="ghost" size="sm" onClick={signOut} className="!text-gray-500 hover:!text-red-500">
              <LogOut className="w-4 h-4 mr-1.5" />Sign Out
            </Button>
          </div>
        </div>

        {/* Top-level tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 shadow-sm rounded-2xl p-1.5 mb-4">
          <button
            onClick={() => setTopTab("dashboard")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${topTab === "dashboard" ? "bg-teal-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button
            onClick={() => setTopTab("referrals")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${topTab === "referrals" ? "bg-teal-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
            <Gift className="w-4 h-4" /> Referrals
          </button>
        </div>

        {topTab === "referrals" ? (
          <ReferralsTab profile={profile} />
        ) : (
          <>
            {/* Profile Completion Bar */}
            {profile && (profile.profile_completion_pct ?? 0) < 100 && (() => {
              const p = profile.profile_completion_pct ?? 0;
              const c = pctColor(p);
              return (
                <div className={`mb-6 ${c.banner} rounded-2xl p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className={`w-4 h-4 ${c.bannerText}`} />
                      <span className={`text-sm font-semibold ${c.bannerText}`}>
                        {p < 20 ? "Profile is incomplete — start now" : p < 50 ? "Keep going, add more details" : p < 80 ? "Almost there!" : "Nearly complete!"}
                      </span>
                    </div>
                    <span className={`text-lg font-bold ${c.bannerText}`}>{p}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2 mb-2">
                    <div className={`${c.bar} h-2 rounded-full transition-all`} style={{ width: `${p}%` }} />
                  </div>
                  <p className={`text-xs ${c.bannerSub}`}>A complete profile helps us match you with the best loan offers faster.</p>
                </div>
              );
            })()}

            <div className="flex gap-6">
              {/* Sidebar — desktop */}
              <aside className="hidden lg:block w-56 shrink-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sticky top-24">
                  {NAV_ITEMS.map((item) => (
                    <button key={item.id} onClick={() => handleSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${activeSection === item.id ? item.activeColor : "text-gray-600 hover:bg-gray-100"}`}>
                      <span className={activeSection === item.id ? "text-white" : item.iconColor}>{item.icon}</span>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.id === "chat" && unreadChatCount > 0 && (
                        <span className="w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shrink-0">
                          {unreadChatCount > 9 ? "9+" : unreadChatCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </aside>

              {/* Mobile sidebar overlay */}
              {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                  <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
                  <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-semibold text-gray-900">Dashboard</p>
                      <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                    </div>
                    {NAV_ITEMS.map((item) => (
                      <button key={item.id} onClick={() => handleSection(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${activeSection === item.id ? "bg-teal-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                        {item.icon}
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.id === "chat" && unreadChatCount > 0 && (
                          <span className="w-5 h-5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shrink-0">
                            {unreadChatCount > 9 ? "9+" : unreadChatCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main content */}
              <main className="flex-1 min-w-0">
                {dataLoading ? (
                  <div className="text-center py-20 text-sm text-gray-500">Loading dashboard...</div>
                ) : (
                  <>
                    {activeSection === "overview" && <OverviewTab profile={profile} loans={loans} user={user} onSection={handleSection} />}
                    {activeSection === "applications" && <ApplicationsTab loans={loans} />}
                    {activeSection === "documents" && <DocumentsTab loans={loans} />}
                    {activeSection === "notifications" && <NotificationsTab />}
                    {activeSection === "chat" && user && <ChatSection userId={user.id} />}
                    {activeSection === "profile" && <ProfileTab profile={profile} onSave={setProfile} />}
                  </>
                )}
              </main>
            </div>
          </>
        )}
      </div>
      {user && <ChatWidget userId={user.id} unread={unreadChatCount} />}
    </div>
  );
}
