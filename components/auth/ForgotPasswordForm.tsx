"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const client = authClient as any;
      const forgotFn = client.forgetPassword ?? client.requestPasswordReset ?? client.sendPasswordResetEmail;
      const result = forgotFn
        ? await forgotFn({ email, redirectTo: "/reset-password" })
        : null;
      if (result?.error) {
        setError(result.error.message || "Something went wrong");
        return;
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
          <p className="text-sm text-gray-500">We&apos;ll send you a reset link</p>
        </div>
      </div>

      {sent ? (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-800">
          Check your email — we&apos;ve sent a password reset link to <strong>{email}</strong>.
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <Button type="submit" variant="primary" size="md" fullWidth disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
