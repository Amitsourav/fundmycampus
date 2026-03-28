"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShadcnButton } from "@/components/ui/shadcn-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/lib/auth-context";

// --- Pupil (no white eyeball, just dot) ---

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined)
      return { x: forceLookX, y: forceLookY };

    const pupil = pupilRef.current.getBoundingClientRect();
    const cx = pupil.left + pupil.width / 2;
    const cy = pupil.top + pupil.height / 2;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const pos = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

// --- EyeBall (white with pupil) ---

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined)
      return { x: forceLookX, y: forceLookY };

    const eye = eyeRef.current.getBoundingClientRect();
    const cx = eye.left + eye.width / 2;
    const cy = eye.top + eye.height / 2;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const pos = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: pupilSize,
            height: pupilSize,
            backgroundColor: pupilColor,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

// --- Main Login Page ---

export function AnimatedLoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, refreshSession } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) router.push("/dashboard");
  }, [authLoading, user, router]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking effects
  useEffect(() => {
    const schedule = (setter: (v: boolean) => void) => {
      const t = setTimeout(() => {
        setter(true);
        setTimeout(() => {
          setter(false);
          schedule(setter);
        }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t1 = schedule(setIsPurpleBlinking);
    const t2 = schedule(setIsBlackBlinking);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Look at each other when typing
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(timer);
    }
    setIsLookingAtEachOther(false);
  }, [isTyping]);

  // Purple peeking when password visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const t = setTimeout(() => {
        setIsPurplePeeking(true);
        setTimeout(() => setIsPurplePeeking(false), 800);
      }, Math.random() * 3000 + 2000);
      return () => clearTimeout(t);
    }
    setIsPurplePeeking(false);
  }, [password, showPassword, isPurplePeeking]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 3;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    return {
      faceX: Math.max(-15, Math.min(15, dx / 20)),
      faceY: Math.max(-10, Math.min(10, dy / 30)),
      bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
    };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await authClient.signIn.email({ email, password, rememberMe });
      if (result.error) {
        setError(result.error.message || "Invalid email or password");
        return;
      }
      await refreshSession();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const hidingPassword = password.length > 0 && !showPassword;
  const showingPassword = password.length > 0 && showPassword;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Characters Panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400 p-12 text-white">
        <div className="relative z-20" />

        <div className="relative z-20 flex items-end justify-center h-[500px]">
          <div className="relative" style={{ width: 550, height: 400 }}>
            {/* Teal tall character (was purple) */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 70,
                width: 180,
                height: isTyping || hidingPassword ? 440 : 400,
                backgroundColor: "#0F766E",
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transform: showingPassword
                  ? "skewX(0deg)"
                  : isTyping || hidingPassword
                  ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                  : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left: showingPassword ? 20 : isLookingAtEachOther ? 55 : 45 + purplePos.faceX,
                  top: showingPassword ? 35 : isLookingAtEachOther ? 65 : 40 + purplePos.faceY,
                }}
              >
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#1a1a1a" isBlinking={isPurpleBlinking}
                  forceLookX={showingPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={showingPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#1a1a1a" isBlinking={isPurpleBlinking}
                  forceLookX={showingPassword ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={showingPassword ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
              </div>
            </div>

            {/* Black character */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 240,
                width: 120,
                height: 310,
                backgroundColor: "#1a1a1a",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transform: showingPassword
                  ? "skewX(0deg)"
                  : isLookingAtEachOther
                  ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                  : isTyping || hidingPassword
                  ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                  : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: showingPassword ? 10 : isLookingAtEachOther ? 32 : 26 + blackPos.faceX,
                  top: showingPassword ? 28 : isLookingAtEachOther ? 12 : 32 + blackPos.faceY,
                }}
              >
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#1a1a1a" isBlinking={isBlackBlinking}
                  forceLookX={showingPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={showingPassword ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#1a1a1a" isBlinking={isBlackBlinking}
                  forceLookX={showingPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={showingPassword ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
              </div>
            </div>

            {/* Warm orange semi-circle character */}
            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 0,
                width: 240,
                height: 200,
                zIndex: 3,
                backgroundColor: "#FF9B6B",
                borderRadius: "120px 120px 0 0",
                transform: showingPassword ? "skewX(0deg)" : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left: showingPassword ? 50 : 82 + (orangePos.faceX || 0),
                  top: showingPassword ? 85 : 90 + (orangePos.faceY || 0),
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#1a1a1a" forceLookX={showingPassword ? -5 : undefined} forceLookY={showingPassword ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#1a1a1a" forceLookX={showingPassword ? -5 : undefined} forceLookY={showingPassword ? -4 : undefined} />
              </div>
            </div>

            {/* Yellow tall rounded character */}
            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 310,
                width: 140,
                height: 230,
                backgroundColor: "#E8D754",
                borderRadius: "70px 70px 0 0",
                zIndex: 4,
                transform: showingPassword ? "skewX(0deg)" : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: showingPassword ? 20 : 52 + (yellowPos.faceX || 0),
                  top: showingPassword ? 35 : 40 + (yellowPos.faceY || 0),
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#1a1a1a" forceLookX={showingPassword ? -5 : undefined} forceLookY={showingPassword ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#1a1a1a" forceLookX={showingPassword ? -5 : undefined} forceLookY={showingPassword ? -4 : undefined} />
              </div>
              <div
                className="absolute w-20 h-[4px] bg-[#1a1a1a] rounded-full transition-all duration-200 ease-out"
                style={{
                  left: showingPassword ? 10 : 40 + (yellowPos.faceX || 0),
                  top: showingPassword ? 88 : 88 + (yellowPos.faceY || 0),
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm text-white/60">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Decorative */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Right — Login Form */}
      <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 bg-white">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12">
            <div className="size-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <GraduationCap className="size-4 text-teal-600" />
            </div>
            <span>FundMyCampus</span>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back!</h1>
            <p className="text-gray-500 text-sm">Sign in to your FundMyCampus account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
                className="h-12 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="border-gray-300 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember for 30 days
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-teal-600 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <ShadcnButton
              type="submit"
              className="w-full h-12 text-base font-medium bg-black hover:bg-gray-800 text-white"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </ShadcnButton>
          </form>

          <div className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-gray-900 font-medium hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
