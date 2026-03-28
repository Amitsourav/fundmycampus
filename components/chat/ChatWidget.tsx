"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.fundmycampus.com";
const GUEST_TOKEN_KEY = "fmc_guest_token";
const GUEST_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

interface QuickReply {
  label: string;
  action: "message" | "link" | "handoff";
  url?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "counselor";
  message: string;
  quick_replies?: QuickReply[];
  created_at: string;
}

// --- API helpers ---

function getGuestToken(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(GUEST_TOKEN_KEY);
  if (!raw) return null;
  try {
    const { token, ts } = JSON.parse(raw);
    if (Date.now() - ts > GUEST_TOKEN_MAX_AGE) {
      localStorage.removeItem(GUEST_TOKEN_KEY);
      return null;
    }
    return token;
  } catch {
    // Legacy plain-string format
    return raw;
  }
}

function saveGuestToken(token: string) {
  localStorage.setItem(GUEST_TOKEN_KEY, JSON.stringify({ token, ts: Date.now() }));
}

async function apiFetch(path: string, opts: RequestInit = {}) {
  const guestToken = getGuestToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };
  if (guestToken) headers["X-Guest-Token"] = guestToken;

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
    credentials: "include", // send session cookie for logged-in users
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

// --- Icons (inline SVGs to avoid deps) ---

function ChatIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// --- Typing indicator ---

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 max-w-[80px]">
      <span className="w-2 h-2 rounded-full bg-black-300 animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 rounded-full bg-black-300 animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 rounded-full bg-black-300 animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

// --- Guest form ---

function GuestForm({ onSubmit, loading }: { onSubmit: (name: string, phone: string) => void; loading: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^\+?[0-9]{7,15}$/.test(phone.replace(/[\s-]/g, "")))
      e.phone = "Enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) onSubmit(name.trim(), phone.replace(/[\s-]/g, ""));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
      <p className="text-sm text-black-500 mb-1">
        Welcome! Enter your details to start chatting.
      </p>
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-black-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        />
        {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border border-black-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        />
        {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Starting..." : "Start Chat"}
      </button>
    </form>
  );
}

// --- Quick reply chips ---

function QuickReplies({
  replies,
  onAction,
}: {
  replies: QuickReply[];
  onAction: (reply: QuickReply) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {replies.map((r, i) => (
        <button
          key={i}
          onClick={() => onAction(r)}
          className="px-3 py-1.5 text-xs font-medium rounded-full border border-teal-500 text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

// --- Message bubble ---

function MessageBubble({
  msg,
  onQuickReply,
}: {
  msg: ChatMessage;
  onQuickReply: (r: QuickReply) => void;
}) {
  const isUser = msg.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[80%] ${isUser ? "order-1" : ""}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-teal-600 text-white rounded-br-md"
              : "bg-black-100 text-black-800 rounded-bl-md"
          }`}
        >
          {msg.message}
        </div>
        {msg.quick_replies && msg.quick_replies.length > 0 && (
          <QuickReplies replies={msg.quick_replies} onAction={onQuickReply} />
        )}
      </div>
    </div>
  );
}

// --- Main widget ---

export default function ChatWidget() {
  const { user, loading: authLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const [guestReady, setGuestReady] = useState(false);
  const [guestFormLoading, setGuestFormLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = !!user;
  const greetedRef = useRef(false);
  const needsGuestForm = !isLoggedIn && !guestReady && !getGuestToken();

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open, guestReady]);

  // Reset unread when opening + greet logged-in user
  useEffect(() => {
    if (open) setUnread(0);
    if (open && isLoggedIn && !greetedRef.current && messages.length === 0) {
      greetedRef.current = true;
      const name = user?.name?.split(" ")[0] || "";
      addSystemMessage(
        `Hi${name ? ` ${name}` : ""}! Welcome to FundMyCampus. How can I help you today?`
      );
    }
  }, [open, isLoggedIn]);

  // On mount / auth change, resume guest session if token exists
  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn && getGuestToken()) {
      resumeGuestSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isLoggedIn]);

  async function resumeGuestSession() {
    try {
      const data = await apiFetch("/api/v1/chat/guest/resume", { method: "POST" });
      setGuestReady(true);
      if (data.messages) {
        setMessages(parseMessages(data.messages));
      } else {
        await fetchGuestHistory();
      }
    } catch {
      // Token may be invalid — clear and show form
      localStorage.removeItem(GUEST_TOKEN_KEY);
      setGuestReady(false);
    }
  }

  async function fetchGuestHistory() {
    try {
      const data = await apiFetch("/api/v1/chat/guest/messages", { method: "GET" });
      if (data.messages) setMessages(parseMessages(data.messages));
    } catch {
      // Silently fail
    }
  }

  function parseMessages(raw: unknown[]): ChatMessage[] {
    return (raw as ChatMessage[]).map((m) => ({
      ...m,
      quick_replies: parseQuickReplies(m.quick_replies),
    }));
  }

  function parseQuickReplies(qr: unknown): QuickReply[] | undefined {
    if (!qr) return undefined;
    if (typeof qr === "string") {
      try {
        return JSON.parse(qr);
      } catch {
        return undefined;
      }
    }
    if (Array.isArray(qr)) return qr as QuickReply[];
    return undefined;
  }

  // --- Guest start ---
  async function handleGuestStart(name: string, phone: string) {
    setGuestFormLoading(true);
    try {
      const data = await apiFetch("/api/v1/chat/guest/start", {
        method: "POST",
        body: JSON.stringify({ name, phone }),
      });
      if (data.guest_token) saveGuestToken(data.guest_token);
      setGuestReady(true);
      if (data.bot_response) {
        addBotResponse(data.bot_response);
      }
    } catch {
      // Could show error, but keep it simple
    } finally {
      setGuestFormLoading(false);
    }
  }

  // --- Send message ---
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || sending) return;
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "user",
        message: text.trim(),
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setSending(true);
      setTyping(true);

      try {
        const endpoint = isLoggedIn
          ? "/api/v1/chat/bot/send"
          : "/api/v1/chat/guest/send";

        const data = await apiFetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ message: text.trim() }),
        });

        // Brief delay for natural feel
        await new Promise((r) => setTimeout(r, 600));
        setTyping(false);

        if (data.bot_response) {
          addBotResponse(data.bot_response);
        }
      } catch {
        setTyping(false);
        addSystemMessage("Something went wrong. Please try again.");
      } finally {
        setSending(false);
      }
    },
    [isLoggedIn, sending]
  );

  function addBotResponse(br: ChatMessage) {
    const parsed: ChatMessage = {
      ...br,
      quick_replies: parseQuickReplies(br.quick_replies),
    };
    setMessages((prev) => [...prev, parsed]);
    if (!open) setUnread((u) => u + 1);
  }

  function addSystemMessage(text: string) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender: "bot",
        message: text,
        created_at: new Date().toISOString(),
      },
    ]);
  }

  // --- Quick reply handler ---
  async function handleQuickReply(reply: QuickReply) {
    if (reply.action === "message") {
      sendMessage(reply.label);
    } else if (reply.action === "link" && reply.url) {
      window.open(reply.url, "_blank", "noopener,noreferrer");
    } else if (reply.action === "handoff" && isLoggedIn) {
      handleHandoff();
    }
  }

  async function handleHandoff() {
    setSending(true);
    setTyping(true);
    try {
      const data = await apiFetch("/api/v1/chat/bot/handoff", { method: "POST" });
      setTyping(false);
      if (data.bot_response) {
        addBotResponse(data.bot_response);
      } else {
        addSystemMessage("You've been connected to a counselor. They'll respond shortly.");
      }
    } catch {
      setTyping(false);
      addSystemMessage("Could not connect to counselor. Please try again.");
    } finally {
      setSending(false);
    }
  }

  // --- Key handler ---
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const showInput = isLoggedIn || guestReady;

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-premium ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        } bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[350px] h-[500px] max-h-[calc(100vh-7rem)] sm:max-h-[500px] ${
          open ? "max-sm:!fixed max-sm:!inset-0 max-sm:!w-full max-sm:!h-full max-sm:!max-h-full max-sm:!bottom-0 max-sm:!right-0 max-sm:!rounded-none max-sm:!translate-y-0" : ""
        } bg-white rounded-2xl shadow-soft-xl flex flex-col overflow-hidden border border-black-100`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black-900 text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-sm font-medium">FundMyCampus Chat</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        {needsGuestForm ? (
          <div className="flex-1 flex items-center justify-center">
            <GuestForm onSubmit={handleGuestStart} loading={guestFormLoading} />
          </div>
        ) : (
          <>
            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 scrollbar-hide">
              {messages.length === 0 && !typing && (
                <p className="text-center text-black-400 text-sm mt-8">
                  Send a message to get started
                </p>
              )}
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  onQuickReply={handleQuickReply}
                />
              ))}
              {typing && <TypingIndicator />}
            </div>

            {/* Input */}
            {showInput && (
              <div className="shrink-0 border-t border-black-100 p-3 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 text-sm bg-black-50 border border-black-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    disabled={sending}
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || sending}
                    className="p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed z-50 bottom-5 right-4 sm:right-6 w-14 h-14 rounded-full bg-black-900 text-white shadow-soft-lg hover:shadow-soft-xl flex items-center justify-center transition-all duration-300 ease-premium hover:scale-105 active:scale-95 ${
          open ? "rotate-90 opacity-0 pointer-events-none sm:rotate-0 sm:opacity-100 sm:pointer-events-auto" : ""
        }`}
        aria-label="Open chat"
      >
        <ChatIcon />
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-500 text-[10px] font-bold flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
    </>
  );
}
