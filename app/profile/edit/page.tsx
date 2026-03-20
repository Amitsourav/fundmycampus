"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, User, Copy, CheckCircle } from "lucide-react";

interface ProfileData {
  full_name: string;
  phone: string;
  phone_verified: boolean;
  gender: string;
  date_of_birth: string;
  marital_status: string;
  about: string;
  passport_number: string;
  pan_number: string;
  mother_maiden_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  district: string;
  state: string;
  zip_code: string;
  country: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  // read-only
  email?: string;
  referral_code?: string;
  role?: string;
  profile_completion_pct?: number;
}

const defaultProfile: ProfileData = {
  full_name: "", phone: "", phone_verified: false, gender: "", date_of_birth: "",
  marital_status: "", about: "", passport_number: "", pan_number: "", mother_maiden_name: "",
  address_line1: "", address_line2: "", city: "", district: "", state: "", zip_code: "",
  country: "India", linkedin_url: "", twitter_url: "", instagram_url: "",
};

function SectionTitle({ title }: { title: string }) {
  return <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 pt-2">{title}</p>;
}

export default function EditProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [saving, setSaving] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    api.get<ProfileData>("/api/v1/profiles/me")
      .then((data) => {
        const sanitized = Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, v ?? ""])
        );
        setProfile({ ...defaultProfile, ...sanitized });
      })
      .catch(() => {})
      .finally(() => setFetchLoading(false));
  }, [user]);

  function handleChange(field: keyof ProfileData, value: string) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);
    try {
      await api.patch("/api/v1/profiles/me", {
        full_name: profile.full_name, phone: profile.phone, gender: profile.gender,
        date_of_birth: profile.date_of_birth, marital_status: profile.marital_status,
        about: profile.about, passport_number: profile.passport_number,
        pan_number: profile.pan_number, mother_maiden_name: profile.mother_maiden_name,
        address_line1: profile.address_line1, address_line2: profile.address_line2,
        city: profile.city, district: profile.district, state: profile.state,
        zip_code: profile.zip_code, country: profile.country,
        linkedin_url: profile.linkedin_url, twitter_url: profile.twitter_url,
        instagram_url: profile.instagram_url,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function copyCode() {
    if (profile.referral_code) {
      navigator.clipboard.writeText(profile.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading || fetchLoading) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-sm text-gray-500">Update your personal information</p>
          </div>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}
      {success && <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-sm text-teal-700">Profile updated successfully!</div>}

      {/* Read-only info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 space-y-3">
        <SectionTitle title="Account Info" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-800">{profile.email || user?.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Role</p>
            <span className="text-xs px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 font-medium capitalize">{profile.role || "user"}</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Profile Completion</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${profile.profile_completion_pct ?? 0}%` }} />
              </div>
              <span className="text-xs text-gray-600 font-medium">{profile.profile_completion_pct ?? 0}%</span>
            </div>
          </div>
          {profile.referral_code && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Referral Code</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-teal-600">{profile.referral_code}</span>
                <button onClick={copyCode} className="text-gray-400 hover:text-teal-600 transition-colors">
                  {copied ? <CheckCircle className="w-4 h-4 text-teal-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">

        {/* Personal Information */}
        <div>
          <SectionTitle title="Personal Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input type="text" value={profile.full_name} onChange={(e) => handleChange("full_name", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <div className="flex gap-2">
                <input type="tel" value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                {!profile.phone_verified && profile.phone && (
                  <Link href="/otp-verify">
                    <button type="button" className="px-3 py-2.5 text-xs font-medium text-teal-600 border border-teal-300 rounded-lg hover:bg-teal-50 transition-colors whitespace-nowrap">
                      Verify
                    </button>
                  </Link>
                )}
                {profile.phone_verified && <span className="flex items-center text-xs text-green-600 gap-1"><CheckCircle className="w-4 h-4" /> Verified</span>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
              <select value={profile.gender} onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
              <input type="date" value={profile.date_of_birth} onChange={(e) => handleChange("date_of_birth", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Marital Status</label>
              <select value={profile.marital_status} onChange={(e) => handleChange("marital_status", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">About</label>
              <textarea value={profile.about} onChange={(e) => handleChange("about", e.target.value)} rows={3}
                placeholder="Tell us a bit about yourself"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
            </div>
          </div>
        </div>

        {/* Identity Documents */}
        <div className="border-t border-gray-100 pt-5">
          <SectionTitle title="Identity Documents" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Passport Number</label>
              <input type="text" value={profile.passport_number} onChange={(e) => handleChange("passport_number", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">PAN Number</label>
              <input type="text" value={profile.pan_number} onChange={(e) => handleChange("pan_number", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mother&apos;s Maiden Name</label>
              <input type="text" value={profile.mother_maiden_name} onChange={(e) => handleChange("mother_maiden_name", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="border-t border-gray-100 pt-5">
          <SectionTitle title="Address" />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 1</label>
              <input type="text" value={profile.address_line1} onChange={(e) => handleChange("address_line1", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 2</label>
              <input type="text" value={profile.address_line2} onChange={(e) => handleChange("address_line2", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input type="text" value={profile.city} onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
                <input type="text" value={profile.district} onChange={(e) => handleChange("district", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <input type="text" value={profile.state} onChange={(e) => handleChange("state", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">PIN Code</label>
                <input type="text" value={profile.zip_code} onChange={(e) => handleChange("zip_code", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                <input type="text" value={profile.country} onChange={(e) => handleChange("country", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-100 pt-5">
          <SectionTitle title="Social Links" />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
              <input type="url" value={profile.linkedin_url} onChange={(e) => handleChange("linkedin_url", e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Twitter / X</label>
              <input type="url" value={profile.twitter_url} onChange={(e) => handleChange("twitter_url", e.target.value)}
                placeholder="https://x.com/..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Instagram</label>
              <input type="url" value={profile.instagram_url} onChange={(e) => handleChange("instagram_url", e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <Button type="submit" variant="primary" size="md" fullWidth disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Link href="/dashboard" className="flex-1">
            <Button type="button" variant="ghost" size="md" fullWidth className="!text-gray-500">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
