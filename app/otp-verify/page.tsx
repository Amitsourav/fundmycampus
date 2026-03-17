"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Phone, CheckCircle } from "lucide-react";

export default function OtpVerifyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await api.post("/api/v1/otp/send", { phone });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setSending(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setVerifying(true);
    try {
      await api.post("/api/v1/otp/verify", { phone, code });
      setVerified(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setVerifying(false);
    }
  }

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/profile/edit" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verify Phone</h1>
            <p className="text-sm text-gray-500">Enter OTP sent to your number</p>
          </div>
        </div>

        {verified ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-teal-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Phone Verified!</h2>
            <p className="text-sm text-gray-500 mb-6">Your phone number has been verified successfully.</p>
            <Link href="/profile/edit">
              <Button variant="primary" size="md" fullWidth>Back to Profile</Button>
            </Link>
          </div>
        ) : (
          <>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

            {!sent ? (
              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <Button type="submit" variant="primary" size="md" fullWidth disabled={sending}>
                  {sending ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4">
                <p className="text-sm text-gray-600">OTP sent to <strong>{phone}</strong></p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter 6-digit OTP</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                    placeholder="000000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center text-2xl tracking-widest"
                  />
                </div>
                <Button type="submit" variant="primary" size="md" fullWidth disabled={verifying}>
                  {verifying ? "Verifying..." : "Verify OTP"}
                </Button>
                <button type="button" onClick={() => setSent(false)} className="w-full text-sm text-teal-600 hover:text-teal-700">
                  Wrong number? Change
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
