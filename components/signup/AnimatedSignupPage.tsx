"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GraduationCap, CheckCircle, FileText, DollarSign, UserPlus } from "lucide-react";
import { SignupForm } from "@/components/signup/SignupForm";

// --- Pupil ---
const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "#1a1a1a",
  forceLookX,
  forceLookY,
}: {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const pos = (() => {
    if (!ref.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const r = ref.current.getBoundingClientRect();
    const dx = mouseX - (r.left + r.width / 2);
    const dy = mouseY - (r.top + r.height / 2);
    const d = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const a = Math.atan2(dy, dx);
    return { x: Math.cos(a) * d, y: Math.sin(a) * d };
  })();

  return (
    <div ref={ref} className="rounded-full" style={{
      width: size, height: size, backgroundColor: pupilColor,
      transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.1s ease-out",
    }} />
  );
};

// --- EyeBall ---
const EyeBall = ({
  size = 48, pupilSize = 16, maxDistance = 10,
  eyeColor = "white", pupilColor = "#1a1a1a",
  isBlinking = false, forceLookX, forceLookY,
}: {
  size?: number; pupilSize?: number; maxDistance?: number;
  eyeColor?: string; pupilColor?: string;
  isBlinking?: boolean; forceLookX?: number; forceLookY?: number;
}) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const pos = (() => {
    if (!ref.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const r = ref.current.getBoundingClientRect();
    const dx = mouseX - (r.left + r.width / 2);
    const dy = mouseY - (r.top + r.height / 2);
    const d = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const a = Math.atan2(dy, dx);
    return { x: Math.cos(a) * d, y: Math.sin(a) * d };
  })();

  return (
    <div ref={ref} className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{ width: size, height: isBlinking ? 2 : size, backgroundColor: eyeColor, overflow: "hidden" }}>
      {!isBlinking && (
        <div className="rounded-full" style={{
          width: pupilSize, height: pupilSize, backgroundColor: pupilColor,
          transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.1s ease-out",
        }} />
      )}
    </div>
  );
};

// --- Step icons for left panel ---
const STEPS = [
  { icon: UserPlus, label: "Create Account", color: "text-white" },
  { icon: CheckCircle, label: "Basic Details", color: "text-white" },
  { icon: FileText, label: "Education", color: "text-white" },
  { icon: DollarSign, label: "Finances", color: "text-white" },
];

export function AnimatedSignupPage() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isBlinking1, setIsBlinking1] = useState(false);
  const [isBlinking2, setIsBlinking2] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const char1Ref = useRef<HTMLDivElement>(null);
  const char2Ref = useRef<HTMLDivElement>(null);
  const char3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  // Detect current step by observing DOM
  useEffect(() => {
    const interval = setInterval(() => {
      const stepIndicators = document.querySelectorAll("[class*='ring-4']");
      if (stepIndicators.length > 0) {
        // Steps 1-3 have step indicator, step 0 doesn't
        const activeIdx = Array.from(document.querySelectorAll("[class*='rounded-full'][class*='w-8']"))
          .findIndex(el => el.classList.contains("ring-4"));
        setCurrentStep(activeIdx >= 0 ? activeIdx + 1 : 0);
      } else {
        // Check if we're on account step or success
        const successEl = document.querySelector("[class*='Application Submitted']");
        if (successEl) setCurrentStep(4);
        else setCurrentStep(0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Blinking
  useEffect(() => {
    const schedule = (setter: (v: boolean) => void) => {
      const t = setTimeout(() => {
        setter(true);
        setTimeout(() => { setter(false); schedule(setter); }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t1 = schedule(setIsBlinking1);
    const t2 = schedule(setIsBlinking2);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const calcPos = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const r = ref.current.getBoundingClientRect();
    const dx = mouseX - (r.left + r.width / 2);
    const dy = mouseY - (r.top + r.height / 3);
    return {
      faceX: Math.max(-15, Math.min(15, dx / 20)),
      faceY: Math.max(-10, Math.min(10, dy / 30)),
      bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
    };
  };

  const p1 = calcPos(char1Ref);
  const p2 = calcPos(char2Ref);
  const p3 = calcPos(char3Ref);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Characters Panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-black via-gray-900 to-black p-12 text-white overflow-hidden">
        <div className="relative z-20" />

        {/* Step progress on left */}
        <div className="relative z-20 flex flex-col items-start gap-3 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${i <= currentStep ? "opacity-100" : "opacity-30"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                i < currentStep ? "bg-teal-500" : i === currentStep ? "bg-teal-500 ring-4 ring-teal-500/30" : "bg-white/10"
              }`}>
                {i < currentStep ? <CheckCircle className="w-4 h-4 text-white" /> : <s.icon className="w-4 h-4 text-white" />}
              </div>
              <span className={`text-sm font-medium ${i === currentStep ? "text-white" : "text-gray-400"}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Animal Characters */}
        <div className="relative z-20 flex items-end justify-center h-[400px]">
          <div className="flex items-end gap-6">

            {/* Bear */}
            <div ref={char1Ref} className="relative transition-all duration-500" style={{ transform: `translateY(${-Math.abs(p1.faceY) * 0.5}px)` }}>
              {/* Ears */}
              <div className="absolute -top-5 left-2 w-10 h-10 rounded-full bg-[#8B5E3C]" />
              <div className="absolute -top-5 right-2 w-10 h-10 rounded-full bg-[#8B5E3C]" />
              <div className="absolute -top-3 left-4 w-6 h-6 rounded-full bg-[#C4956A]" />
              <div className="absolute -top-3 right-4 w-6 h-6 rounded-full bg-[#C4956A]" />
              {/* Head */}
              <div className="relative w-28 h-28 rounded-full bg-[#A0714F] flex items-center justify-center">
                {/* Muzzle */}
                <div className="absolute bottom-3 w-16 h-12 rounded-full bg-[#C4956A]" />
                {/* Eyes */}
                <div className="absolute flex gap-6 transition-all duration-200" style={{ top: 30 + p1.faceY * 0.5, left: 22 + p1.faceX * 0.5 }}>
                  <EyeBall size={18} pupilSize={8} maxDistance={4} eyeColor="white" isBlinking={isBlinking1} />
                  <EyeBall size={18} pupilSize={8} maxDistance={4} eyeColor="white" isBlinking={isBlinking1} />
                </div>
                {/* Nose */}
                <div className="absolute bottom-6 w-5 h-4 rounded-full bg-[#3D2B1F]" />
                {/* Mouth */}
                <div className="absolute bottom-3 w-3 h-2 border-b-2 border-[#3D2B1F] rounded-b-full" />
              </div>
            </div>

            {/* Cat */}
            <div ref={char2Ref} className="relative transition-all duration-500" style={{ transform: `translateY(${-Math.abs(p2.faceY) * 0.5 - 20}px)` }}>
              {/* Ears (triangles) */}
              <div className="absolute -top-8 left-1" style={{ width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderBottom: "22px solid #FF8C42" }} />
              <div className="absolute -top-8 right-1" style={{ width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderBottom: "22px solid #FF8C42" }} />
              {/* Inner ears */}
              <div className="absolute -top-4 left-3" style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "14px solid #FFB07C" }} />
              <div className="absolute -top-4 right-3" style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "14px solid #FFB07C" }} />
              {/* Head */}
              <div className="relative w-24 h-24 rounded-full bg-[#FF8C42] flex items-center justify-center">
                {/* Eyes */}
                <div className="absolute flex gap-5 transition-all duration-200" style={{ top: 26 + p2.faceY * 0.5, left: 20 + p2.faceX * 0.5 }}>
                  <EyeBall size={16} pupilSize={10} maxDistance={3} eyeColor="#FFFDE0" pupilColor="#2D2D2D" isBlinking={isBlinking2} />
                  <EyeBall size={16} pupilSize={10} maxDistance={3} eyeColor="#FFFDE0" pupilColor="#2D2D2D" isBlinking={isBlinking2} />
                </div>
                {/* Nose */}
                <div className="absolute bottom-7 w-3 h-2.5 rounded-b-full bg-[#FF6B6B]" style={{ borderRadius: "0 0 6px 6px", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
                {/* Whiskers */}
                <div className="absolute bottom-5 left-1 w-8 h-[1.5px] bg-[#3D2B1F]/40 -rotate-6" />
                <div className="absolute bottom-6 left-0 w-9 h-[1.5px] bg-[#3D2B1F]/40 rotate-3" />
                <div className="absolute bottom-5 right-1 w-8 h-[1.5px] bg-[#3D2B1F]/40 rotate-6" />
                <div className="absolute bottom-6 right-0 w-9 h-[1.5px] bg-[#3D2B1F]/40 -rotate-3" />
                {/* Mouth */}
                <div className="absolute bottom-4 w-6 h-1.5 border-b-2 border-[#3D2B1F]/50 rounded-b-full" />
              </div>
            </div>

            {/* Owl */}
            <div className="relative transition-all duration-500" style={{ transform: `translateY(${-Math.abs(p1.faceY) * 0.3 - 10}px)` }}>
              {/* Ear tufts */}
              <div className="absolute -top-6 left-3" style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: "18px solid #6366F1" }} />
              <div className="absolute -top-6 right-3" style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: "18px solid #6366F1" }} />
              {/* Head */}
              <div className="relative w-28 h-32 rounded-[50%] bg-[#6366F1] flex items-center justify-center">
                {/* Face disc */}
                <div className="absolute top-5 w-24 h-20 rounded-full bg-[#818CF8]/40" />
                {/* Eye circles */}
                <div className="absolute flex gap-2 transition-all duration-200" style={{ top: 14 + p1.faceY * 0.3 }}>
                  <div className="w-12 h-12 rounded-full bg-[#C7D2FE] flex items-center justify-center">
                    <EyeBall size={20} pupilSize={12} maxDistance={4} eyeColor="#FEF3C7" pupilColor="#1a1a1a" isBlinking={isBlinking1} />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#C7D2FE] flex items-center justify-center">
                    <EyeBall size={20} pupilSize={12} maxDistance={4} eyeColor="#FEF3C7" pupilColor="#1a1a1a" isBlinking={isBlinking1} />
                  </div>
                </div>
                {/* Beak */}
                <div className="absolute bottom-8" style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "12px solid #F59E0B" }} />
                {/* Belly */}
                <div className="absolute bottom-0 w-16 h-10 rounded-t-full bg-[#818CF8]/30" />
              </div>
            </div>

            {/* Bunny */}
            <div ref={char3Ref} className="relative transition-all duration-500" style={{ transform: `translateY(${-Math.abs(p3.faceY) * 0.5 - 5}px)` }}>
              {/* Ears (long) */}
              <div className="absolute -top-16 left-3 w-8 h-20 rounded-full bg-[#F9A8D4]" />
              <div className="absolute -top-16 right-3 w-8 h-20 rounded-full bg-[#F9A8D4]" style={{ transform: "rotate(8deg)" }} />
              <div className="absolute -top-14 left-5 w-4 h-14 rounded-full bg-[#FBD5E8]" />
              <div className="absolute -top-14 right-5 w-4 h-14 rounded-full bg-[#FBD5E8]" style={{ transform: "rotate(8deg)" }} />
              {/* Head */}
              <div className="relative w-24 h-24 rounded-full bg-[#F9A8D4] flex items-center justify-center">
                {/* Cheeks */}
                <div className="absolute bottom-5 left-0 w-6 h-4 rounded-full bg-[#FF8FA3]/50" />
                <div className="absolute bottom-5 right-0 w-6 h-4 rounded-full bg-[#FF8FA3]/50" />
                {/* Eyes */}
                <div className="absolute flex gap-4 transition-all duration-200" style={{ top: 28 + p3.faceY * 0.5, left: 22 + p3.faceX * 0.5 }}>
                  <Pupil size={10} maxDistance={4} pupilColor="#1a1a1a" />
                  <Pupil size={10} maxDistance={4} pupilColor="#1a1a1a" />
                </div>
                {/* Nose */}
                <div className="absolute bottom-7 w-3 h-2.5 rounded-full bg-[#FF6B81]" />
                {/* Mouth */}
                <div className="absolute bottom-4 flex gap-0.5">
                  <div className="w-2.5 h-1.5 border-b-2 border-[#3D2B1F]/40 rounded-bl-full" />
                  <div className="w-2.5 h-1.5 border-b-2 border-[#3D2B1F]/40 rounded-br-full" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm text-white/40">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Decorative */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      {/* Right — Signup Form */}
      <div className="flex items-center justify-center p-4 sm:p-8 bg-white overflow-y-auto">
        <SignupForm />
      </div>
    </div>
  );
}
