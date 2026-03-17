"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Bell, CheckCheck, GraduationCap, FileText, Users, Gift, Megaphone } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

function typeIcon(type: string) {
  if (type === "application_update") return <GraduationCap className="w-4 h-4 text-teal-600" />;
  if (type === "document_update") return <FileText className="w-4 h-4 text-blue-600" />;
  if (type === "referral_update" || type === "payout_update") return <Gift className="w-4 h-4 text-purple-600" />;
  if (type === "counselor_assigned") return <Users className="w-4 h-4 text-green-600" />;
  return <Megaphone className="w-4 h-4 text-gray-500" />;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    setFetching(true);
    api.get<Notification[]>("/api/v1/notifications/my", { unread_only: unreadOnly })
      .then(setNotifications)
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [user, unreadOnly]);

  async function markRead(id: string) {
    await api.patch(`/api/v1/notifications/${id}/read`).catch(() => {});
    setNotifications((n) => n.map((x) => x.id === id ? { ...x, is_read: true } : x));
  }

  async function markAllRead() {
    await api.post("/api/v1/notifications/read-all").catch(() => {});
    setNotifications((n) => n.map((x) => ({ ...x, is_read: true })));
  }

  if (loading) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-500">Stay up to date</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={markAllRead} className="!text-teal-600 hover:!text-teal-700 text-xs">
          <CheckCheck className="w-4 h-4 mr-1" /> Mark all read
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {[{ label: "All", value: false }, { label: "Unread only", value: true }].map(({ label, value }) => (
          <button key={label} onClick={() => setUnreadOnly(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${unreadOnly === value ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {fetching ? (
          <p className="text-sm text-gray-500 p-6 text-center">Loading...</p>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No notifications</p>
          </div>
        ) : (
          notifications.map((n, i) => (
            <div
              key={n.id}
              onClick={() => { markRead(n.id); if (n.link) router.push(n.link); }}
              className={`flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors ${i > 0 ? "border-t border-gray-100" : ""} ${!n.is_read ? "bg-teal-50/40" : ""}`}
            >
              <div className="mt-0.5">{typeIcon(n.type)}</div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!n.is_read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-xs text-gray-400">{timeAgo(n.created_at)}</span>
                {!n.is_read && <span className="w-2 h-2 rounded-full bg-teal-500" />}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
