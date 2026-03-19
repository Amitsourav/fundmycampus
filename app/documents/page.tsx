"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, FileText, Upload, Eye, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  passport: "Passport", pan_card: "PAN Card", aadhar: "Aadhaar",
  offer_letter: "Offer Letter", transcript: "Transcript",
  marksheet_10th: "10th Marksheet", marksheet_12th: "12th Marksheet",
  graduation_certificate: "Graduation Certificate", pg_certificate: "PG Certificate",
  diploma_certificate: "Diploma", mba_certificate: "MBA",
  ca_cma_certificate: "CA / CMA", btech_be_certificate: "B.Tech / BE",
  bank_statement: "Bank Statement", itr: "Income Tax Return",
  salary_slip: "Salary Slip", property_docs: "Property Documents",
};

const DOCUMENT_TYPES = Object.keys(DOCUMENT_TYPE_LABELS);

interface Document {
  id: string;
  document_type: string;
  file_name: string;
  file_size: number;
  file_url: string;
  status: string;
  rejection_reason?: string;
  created_at: string;
}

interface LoanApp {
  id: string;
  application_id: string;
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending_review: "bg-yellow-100 text-yellow-700",
    under_review: "bg-blue-100 text-blue-700",
    verified: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    expired: "bg-gray-100 text-gray-700",
  };
  return map[status] ?? "bg-gray-100 text-gray-700";
}

function statusIcon(status: string) {
  if (status === "verified") return <CheckCircle className="w-4 h-4 text-green-500" />;
  if (status === "rejected") return <XCircle className="w-4 h-4 text-red-500" />;
  if (status === "under_review") return <AlertCircle className="w-4 h-4 text-blue-500" />;
  return <Clock className="w-4 h-4 text-yellow-500" />;
}

function formatSize(bytes: number) {
  if (!bytes) return "—";
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

export default function DocumentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loans, setLoans] = useState<LoanApp[]>([]);
  const [docLoading, setDocLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [docType, setDocType] = useState("");
  const [loanId, setLoanId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    Promise.allSettled([
      api.get<Document[]>("/api/v1/documents/my"),
      api.get<LoanApp[]>("/api/v1/loans/my"),
    ]).then(([docs, lns]) => {
      if (docs.status === "fulfilled") setDocuments(docs.value);
      if (lns.status === "fulfilled") setLoans(lns.value as LoanApp[]);
    }).finally(() => setDocLoading(false));
  }, [user]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !docType) { setUploadError("Please select a document type and file"); return; }
    if (file.size > 10 * 1024 * 1024) { setUploadError("File must be under 10MB"); return; }
    setUploadError("");
    setUploadSuccess("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("document_type", docType);
      if (loanId) formData.append("loan_application_id", loanId);
      const newDoc = await api.upload<Document>("/api/v1/documents", formData);
      setDocuments((d) => [newDoc, ...d]);
      setUploadSuccess("Document uploaded successfully!");
      setFile(null);
      setDocType("");
      setLoanId("");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
            <p className="text-sm text-gray-500">Upload and manage your documents</p>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-teal-600" /> Upload Document
        </h2>
        {uploadError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{uploadError}</div>}
        {uploadSuccess && <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">{uploadSuccess}</div>}
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Document Type</label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Select type</option>
                {DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{DOCUMENT_TYPE_LABELS[t]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Link to Application (optional)</label>
              <select value={loanId} onChange={(e) => setLoanId(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">None</option>
                {loans.map((l) => <option key={l.id} value={l.id}>{l.application_id}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">File (PDF, JPEG, PNG — max 10MB)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" />
          </div>
          <Button type="submit" variant="primary" size="md" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Document"}
          </Button>
        </form>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Uploaded Documents</h2>
        {docLoading ? (
          <p className="text-sm text-gray-500 py-4 text-center">Loading...</p>
        ) : documents.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {statusIcon(doc.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{DOCUMENT_TYPE_LABELS[doc.document_type] ?? doc.document_type}</p>
                    <p className="text-xs text-gray-500">{doc.file_name} · {formatSize(doc.file_size)} · {new Date(doc.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    {doc.rejection_reason && <p className="text-xs text-red-600 mt-0.5">{doc.rejection_reason}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusBadge(doc.status ?? "")}`}>
                    {(doc.status ?? "pending").replace("_", " ")}
                  </span>
                  {doc.file_url && (
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">
                      <Eye className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
