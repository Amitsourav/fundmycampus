"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const loggedOutRef = useRef(false);
  const router = useRouter();

  const fetchSession = useCallback(async (force = false) => {
    if (!force && loggedOutRef.current) return;
    try {
      const session = await authClient.getSession();
      setUser(session?.data?.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchSession().finally(() => setLoading(false));
  }, [fetchSession]);

  const handleSignOut = useCallback(async () => {
    loggedOutRef.current = true;
    setUser(null);
    await authClient.signOut();
    router.push("/login");
  }, [router]);

  const refreshSession = useCallback(async () => {
    loggedOutRef.current = false;
    await fetchSession(true);
  }, [fetchSession]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
