"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import {
  User, FileText, LogOut, GraduationCap, Clock, CheckCircle, XCircle,
  Bell, Gift, LayoutDashboard, Upload, Eye, Copy, Phone, AlertCircle,
  ChevronRight, Menu, X
} from "lucide-react";

// ─────────────────── Types ───────────────────
interface Profile {
  full_name?: string; phone?: string; phone_verified?: boolean; gender?: string;
  date_of_birth?: string; marital_status?: string; about?: string;
  passport_number?: string; pan_number?: string; mother_maiden_name?: string;
  address_line1?: string; address_line2?: string; city?: string; district?: string;
  state?: string; zip_code?: string; country?: string;
  linkedin_url?: string; twitter_url?: string; instagram_url?: string;
  email?: string; referral_code?: string; role?: string; profile_completion_pct?: number;
}
interface LoanApplication { id: string; application_id?: string; status: string; created_at: string; loan_amount?: number; }
interface Document { id: string; document_type: string; file_name?: string; file_size?: number; file_url?: string; status: string; rejection_reason?: string; created_at: string; }
interface Notification { id: string; type: string; title: string; message: string; link?: string; is_read: boolean; created_at: string; }
interface Referral { id: string; status: string; created_at: string; }
interface Payout { id: string; amount: number; payout_type: string; status: string; created_at: string; }

// ─────────────────── Helpers ───────────────────
const DOC_LABELS: Record<string, string> = {
  passport: "Passport", pan_card: "PAN Card", aadhar: "Aadhaar", offer_letter: "Offer Letter",
  transcript: "Transcript", sop: "SOP", lor: "LOR", resume: "Resume",
  bank_statement: "Bank Statement", itr: "ITR", salary_slip: "Salary Slip",
  property_docs: "Property Docs", co_applicant_docs: "Co-applicant Docs", photo: "Photo", other: "Other",
};
const DOC_TYPES = Object.keys(DOC_LABELS);

function loanStatusColor(status: string) {
  if (["approved", "disbursed"].includes(status)) return "bg-green-100 text-green-700";
  if (["rejected", "withdrawn"].includes(status)) return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
}
function loanStatusIcon(status: string) {
  if (["approved", "disbursed"].includes(status)) return <CheckCircle className="w-4 h-4 text-green-500" />;
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

type Section = "overview" | "applications" | "documents" | "notifications" | "referrals" | "profile";

// ─────────────────── Sidebar ───────────────────
const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: "applications", label: "My Applications", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "documents", label: "Documents", icon: <FileText className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  { id: "referrals", label: "Referrals", icon: <Gift className="w-4 h-4" /> },
  { id: "profile", label: "Edit Profile", icon: <User className="w-4 h-4" /> },
];

// ─────────────────── Overview Tab ───────────────────
function OverviewTab({ profile, loans, user, onSection }: { profile: Profile | null; loans: LoanApplication[]; user: { email?: string; name?: string } | null; onSection: (s: Section) => void }) {
  const displayName = profile?.full_name || user?.name || user?.email?.split("@")[0] || "User";
  const pct = profile?.profile_completion_pct ?? 0;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [docCount, setDocCount] = useState<number | null>(null);
  const [referralCopied, setReferralCopied] = useState(false);

  useEffect(() => {
    Promise.allSettled([
      api.get<Notification[]>("/api/v1/notifications/my"),
      api.get<Document[]>("/api/v1/documents/my"),
    ]).then(([n, d]) => {
      if (n.status === "fulfilled") setNotifications(n.value);
      if (d.status === "fulfilled") setDocCount(d.value.length);
    });
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const activeLoans = loans.filter(l => !["rejected","withdrawn","disbursed"].includes(l.status));
  const approvedLoans = loans.filter(l => ["approved","disbursed"].includes(l.status));

  // Next steps checklist
  const steps = [
    { done: !!profile?.full_name, label: "Add your full name", section: "profile" as Section },
    { done: !!profile?.phone, label: "Add phone number", section: "profile" as Section },
    { done: !!profile?.date_of_birth, label: "Add date of birth", section: "profile" as Section },
    { done: loans.length > 0, label: "Submit loan application", section: "applications" as Section },
    { done: (docCount ?? 0) > 0, label: "Upload a document", section: "documents" as Section },
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
          { label: "Applications", value: loans.length, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Active", value: activeLoans.length, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Approved", value: approvedLoans.length, color: "text-green-600", bg: "bg-green-50" },
          { label: "Documents", value: docCount ?? "—", color: "text-blue-600", bg: "bg-blue-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Profile + Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{displayName}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              {profile?.role && <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full capitalize">{profile.role}</span>}
            </div>
          </div>
          <div className="mb-2 flex justify-between text-xs text-gray-600">
            <span>Profile completion</span>
            <span className="font-semibold text-teal-600">{pct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
            <div className="bg-teal-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <button onClick={() => onSection("profile")} className="w-full text-sm text-center text-teal-600 font-medium border border-teal-200 rounded-lg py-2 hover:bg-teal-50 transition-colors">
            Complete Profile →
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

      {/* Referral banner */}
      {profile?.referral_code && (
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Gift className="w-5 h-5" />
                <h2 className="font-semibold">Refer & Earn ₹1,000</h2>
              </div>
              <p className="text-sm text-teal-100">Share your code. Earn when your friend gets a loan disbursed.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-mono font-bold tracking-widest text-sm">
                {profile.referral_code}
              </div>
              <button onClick={copyReferral} className="px-4 py-2 bg-white text-teal-600 rounded-lg text-sm font-semibold hover:bg-teal-50 transition-colors flex items-center gap-1.5">
                {referralCopied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {referralCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────── Applications Tab ───────────────────
function ApplicationsTab({ loans }: { loans: LoanApplication[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-gray-900">My Loan Applications</h2>
        <Link href="/signup">
          <Button variant="primary" size="sm"><GraduationCap className="w-4 h-4 mr-1.5" />New Application</Button>
        </Link>
      </div>
      {loans.length === 0 ? (
        <div className="text-center py-16">
          <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No applications yet</p>
          <Link href="/signup"><Button variant="primary" size="md">Apply for Loan</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {loans.map((loan) => (
            <div key={loan.id} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {loanStatusIcon(loan.status)}
                  <div>
                    <p className="font-semibold text-gray-900">{loan.loan_amount ? `₹${loan.loan_amount.toLocaleString("en-IN")}` : "Loan Application"}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{loan.application_id ?? loan.id} · Applied {formatDate(loan.created_at)}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${loanStatusColor(loan.status)}`}>{loan.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────── Documents Tab ───────────────────
function DocumentsTab({ loans }: { loans: LoanApplication[] }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [docType, setDocType] = useState("");
  const [loanId, setLoanId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api.get<Document[]>("/api/v1/documents/my").then(setDocuments).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !docType) { setError("Select document type and file"); return; }
    if (file.size > 10 * 1024 * 1024) { setError("File must be under 10MB"); return; }
    setError(""); setSuccess(""); setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file); fd.append("document_type", docType);
      if (loanId) fd.append("loan_application_id", loanId);
      const doc = await api.upload<Document>("/api/v1/documents", fd);
      setDocuments((d) => [doc, ...d]);
      setSuccess("Document uploaded!"); setFile(null); setDocType(""); setLoanId("");
    } catch (err) { setError(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploading(false); }
  }

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2"><Upload className="w-4 h-4 text-teal-600" />Upload Document</h2>
        {error && <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
        {success && <div className="mb-3 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">{success}</div>}
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type</label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Select type</option>
                {DOC_TYPES.map((t) => <option key={t} value={t}>{DOC_LABELS[t]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Link to Application (optional)</label>
              <select value={loanId} onChange={(e) => setLoanId(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">None</option>
                {loans.map((l) => <option key={l.id} value={l.id}>{l.application_id ?? l.id}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">File (PDF, JPEG, PNG — max 10MB)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
          </div>
          <Button type="submit" variant="primary" size="md" disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</Button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Uploaded Documents</h2>
        {loading ? <p className="text-sm text-gray-500 text-center py-6">Loading...</p> : documents.length === 0 ? (
          <div className="text-center py-12"><FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" /><p className="text-sm text-gray-500">No documents yet</p></div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {docStatusIcon(doc.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{DOC_LABELS[doc.document_type] ?? doc.document_type}</p>
                    <p className="text-xs text-gray-500">{doc.file_name} {doc.file_size ? `· ${formatSize(doc.file_size)}` : ""} · {formatDate(doc.created_at)}</p>
                    {doc.rejection_reason && <p className="text-xs text-red-600 mt-0.5">{doc.rejection_reason}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${docStatusColor(doc.status ?? "")}`}>{(doc.status ?? "pending").replace("_", " ")}</span>
                  {doc.file_url && <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700"><Eye className="w-4 h-4" /></a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
    await api.patch(`/api/v1/notifications/${id}/read`).catch(() => {});
    setNotifications((n) => n.map((x) => x.id === id ? { ...x, is_read: true } : x));
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
        <div className="text-center py-12"><Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" /><p className="text-sm text-gray-500">No notifications</p></div>
      ) : (
        <div className="space-y-1">
          {notifications.map((n) => (
            <div key={n.id} onClick={() => { markRead(n.id); if (n.link) router.push(n.link); }}
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors ${!n.is_read ? "bg-teal-50/50" : ""}`}>
              <Bell className={`w-4 h-4 mt-0.5 shrink-0 ${!n.is_read ? "text-teal-500" : "text-gray-400"}`} />
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

  return (
    <div className="space-y-6">
      {/* Code */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Your Referral Code</h2>
        {profile?.referral_code ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg font-mono text-xl font-bold text-teal-600 border border-gray-200">{profile.referral_code}</div>
              <button onClick={() => copy(profile.referral_code!)} className="flex items-center gap-2 px-4 py-3 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ) : <p className="text-sm text-gray-500">Loading...</p>}
        <div className="mt-4 p-4 bg-teal-50 rounded-xl">
          <p className="text-xs font-semibold text-gray-700 mb-2">How it works</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p>🎉 Friend signs up with your code → you&apos;re notified</p>
            <p>📋 Loan sanctioned → You earn <strong>₹1,000</strong> (+₹5,000 every 5th referral)</p>
            <p>💰 Loan disbursed → You earn <strong>₹1,000</strong> + friend gets <strong>₹1,000</strong></p>
          </div>
        </div>
      </div>

      {/* Referrals */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Referral History</h2>
        {loading ? <p className="text-sm text-gray-500">Loading...</p> : referrals.length === 0 ? (
          <div className="text-center py-8"><Gift className="w-8 h-8 text-gray-300 mx-auto mb-2" /><p className="text-sm text-gray-500">No referrals yet</p></div>
        ) : (
          <div className="space-y-3">
            {referrals.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-yellow-500" /><div><p className="text-sm font-medium text-gray-900">Referral</p><p className="text-xs text-gray-500">{formatDate(r.created_at)}</p></div></div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 font-medium capitalize">{r.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payouts */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Payout History</h2>
        {loading ? <p className="text-sm text-gray-500">Loading...</p> : payouts.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No payouts yet</p>
        ) : (
          <div className="space-y-3">
            {payouts.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div><p className="text-sm font-medium text-gray-900">₹{p.amount.toLocaleString()}</p><p className="text-xs text-gray-500 capitalize">{p.payout_type.replace("_", " ")} · {formatDate(p.created_at)}</p></div>
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
    try {
      await api.patch("/api/v1/profiles/me", {
        full_name: form.full_name, phone: form.phone, gender: form.gender,
        date_of_birth: form.date_of_birth, marital_status: form.marital_status, about: form.about,
        passport_number: form.passport_number, pan_number: form.pan_number, mother_maiden_name: form.mother_maiden_name,
        address_line1: form.address_line1, address_line2: form.address_line2, city: form.city,
        district: form.district, state: form.state, zip_code: form.zip_code, country: form.country,
        linkedin_url: form.linkedin_url, twitter_url: form.twitter_url, instagram_url: form.instagram_url,
      });
      setSuccess(true); onSave(form);
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
          <div><p className="text-xs text-gray-500 mb-1">Role</p><span className="text-xs px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 font-medium capitalize">{form.role ?? "user"}</span></div>
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
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label><input type="text" value={form.full_name ?? ""} onChange={(e) => f("full_name", e.target.value)} className={inp} /></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <div className="flex gap-2">
                <input type="tel" value={form.phone ?? ""} onChange={(e) => f("phone", e.target.value)} className={`flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500`} />
                {!form.phone_verified && form.phone && <Link href="/otp-verify"><button type="button" className="px-3 py-2.5 text-xs font-medium text-teal-600 border border-teal-300 rounded-lg hover:bg-teal-50">Verify</button></Link>}
                {form.phone_verified && <span className="flex items-center text-xs text-green-600 gap-1"><CheckCircle className="w-4 h-4" />Verified</span>}
              </div>
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

        <div className="border-t border-gray-100 pt-4">
          <Button type="submit" variant="primary" size="md" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
        </div>
      </form>
    </div>
  );
}

// ─────────────────── Main Dashboard ───────────────────
export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<Section>((searchParams.get("tab") as Section) ?? "overview");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loans, setLoans] = useState<LoanApplication[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    Promise.allSettled([
      api.get<Profile>("/api/v1/profiles/me"),
      api.get<LoanApplication[]>("/api/v1/loans/my"),
    ]).then(([p, l]) => {
      if (p.status === "fulfilled") setProfile(p.value);
      if (l.status === "fulfilled") setLoans(l.value);
    }).finally(() => setDataLoading(false));
  }, [user]);

  const handleSection = useCallback((s: Section) => { setActiveSection(s); setSidebarOpen(false); }, []);

  if (loading || (!user && !loading)) return null;

  const displayName = profile?.full_name || user?.name || user?.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Welcome back, {displayName}!</h1>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={signOut} className="!text-gray-500 hover:!text-red-500">
            <LogOut className="w-4 h-4 mr-1.5" />Sign Out
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sticky top-24">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => handleSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1 ${activeSection === item.id ? "bg-teal-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                  {item.icon}{item.label}
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
                    {item.icon}{item.label}
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
                {activeSection === "referrals" && <ReferralsTab profile={profile} />}
                {activeSection === "profile" && <ProfileTab profile={profile} onSave={setProfile} />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
