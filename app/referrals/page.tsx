"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { ArrowLeft, Gift, Copy, CheckCircle, Clock, XCircle } from "lucide-react";

interface Profile {
  referral_code?: string;
}

interface Referral {
  id: string;
  referee_id: string;
  status: string;
  created_at: string;
}

interface Payout {
  id: string;
  amount: number;
  payout_type: string;
  status: string;
  created_at: string;
}

function payoutStatusBadge(status: string) {
  const map: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    processing: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    reversed: "bg-gray-100 text-gray-700",
  };
  return map[status] ?? "bg-gray-100 text-gray-700";
}

function referralStatusIcon(status: string) {
  if (status === "disbursed" || status === "paid") return <CheckCircle className="w-4 h-4 text-green-500" />;
  if (status === "expired") return <XCircle className="w-4 h-4 text-red-500" />;
  return <Clock className="w-4 h-4 text-yellow-500" />;
}

export default function ReferralsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [fetching, setFetching] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    Promise.allSettled([
      api.get<Profile>("/api/v1/profiles/me"),
      api.get<Referral[]>("/api/v1/referrals/my"),
      api.get<Payout[]>("/api/v1/referrals/my/payouts"),
    ]).then(([p, r, py]) => {
      if (p.status === "fulfilled") setProfile(p.value);
      if (r.status === "fulfilled") setReferrals(r.value);
      if (py.status === "fulfilled") setPayouts(py.value);
    }).finally(() => setFetching(false));
  }, [user]);

  function copyCode() {
    if (profile?.referral_code) {
      navigator.clipboard.writeText(profile.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) return null;

  const referralLink = profile?.referral_code ? `https://www.fundmycampus.com/signup?ref=${profile.referral_code}` : "";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Referrals</h1>
            <p className="text-sm text-gray-500">Earn rewards by referring friends</p>
          </div>
        </div>
      </div>

      {/* Share Code */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Your Referral Code</h2>
        {profile?.referral_code ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg font-mono text-lg font-bold text-teal-600 border border-gray-200">
                {profile.referral_code}
              </div>
              <button onClick={copyCode} className="flex items-center gap-2 px-4 py-3 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            {referralLink && (
              <div className="flex items-center gap-2">
                <input readOnly value={referralLink} className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600" />
                <button onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="px-3 py-2 text-xs text-teal-600 hover:text-teal-700 font-medium">
                  Copy link
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Loading your referral code...</p>
        )}
      </div>

      {/* How it works */}
      <div className="bg-teal-50 rounded-2xl border border-teal-100 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">How it works</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>🎉 Friend signs up with your code → You&apos;re notified</p>
          <p>📋 Friend&apos;s loan gets sanctioned → You earn <strong>₹1,000</strong> (+ ₹5,000 bonus every 5th referral)</p>
          <p>💰 Loan is disbursed → You earn <strong>₹1,000</strong> + friend gets <strong>₹1,000</strong> bonus</p>
        </div>
        <p className="mt-3 text-xs text-gray-500">* Minimum loan amount must be ₹10 Lakhs to qualify for referral rewards.</p>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Referral History</h2>
        {fetching ? <p className="text-sm text-gray-500">Loading...</p> : referrals.length === 0 ? (
          <div className="text-center py-6">
            <Gift className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No referrals yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {referrals.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {referralStatusIcon(r.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">Referral</p>
                    <p className="text-xs text-gray-500">{new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize bg-teal-100 text-teal-700">{r.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Payout History</h2>
        {fetching ? <p className="text-sm text-gray-500">Loading...</p> : payouts.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">No payouts yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {payouts.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-900">₹{p.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 capitalize">{p.payout_type.replace("_", " ")} · {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${payoutStatusBadge(p.status)}`}>{p.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
