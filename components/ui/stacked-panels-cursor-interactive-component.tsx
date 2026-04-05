"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion, useSpring } from "motion/react";
import { Star } from "lucide-react";

const PANEL_COUNT = 15;
const WAVE_SPRING = { stiffness: 160, damping: 22, mass: 0.6 };
const SCENE_SPRING = { stiffness: 80, damping: 22, mass: 1 };
const Z_SPREAD = 24;
const SIGMA = 2.8;

interface Review {
  name: string;
  rating: number;
  text: string;
  course: string;
  date: string;
  avatar: string;
}

const REVIEWS: Review[] = [
  { name: "Arjun Patel", rating: 5, text: "FundMyCampus made my dream of studying at Harvard possible. The loan approval was quick and the interest rates were very competitive. Highly recommended!", course: "MBA, Harvard Business School", date: "2 weeks ago", avatar: "AP" },
  { name: "Priya Sharma", rating: 5, text: "Amazing support throughout my application process. They guided me through every step and made the loan process stress-free. Got approved in 48 hours!", course: "MS Computer Science, Stanford", date: "1 month ago", avatar: "PS" },
  { name: "Rohit Kumar", rating: 5, text: "Professional service with transparent terms. No hidden charges and flexible repayment options. My counselor was extremely helpful and always available.", course: "MSc Data Science, Oxford", date: "3 weeks ago", avatar: "RK" },
  { name: "Sneha Gupta", rating: 5, text: "Excellent customer service and competitive rates. The team helped me secure funding for my medical studies in Australia. Couldn't have done it without them.", course: "MBBS, University of Melbourne", date: "1 month ago", avatar: "SG" },
  { name: "Vikash Singh", rating: 5, text: "Quick approval process and hassle-free documentation. FundMyCampus turned my dream of studying in Canada into reality. Grateful for their support!", course: "Engineering, University of Toronto", date: "2 months ago", avatar: "VS" },
  { name: "Ananya Reddy", rating: 5, text: "Best education loan platform in India! Compared offers from multiple banks and got the lowest interest rate. The EMI calculator helped me plan perfectly.", course: "MBA, London Business School", date: "3 weeks ago", avatar: "AR" },
  { name: "Karan Mehta", rating: 5, text: "Got my collateral-free loan approved within 2 days. The entire process was digital and smooth. Special thanks to my counselor who went above and beyond.", course: "MS AI, Carnegie Mellon", date: "1 month ago", avatar: "KM" },
  { name: "Divya Nair", rating: 5, text: "I was confused about which bank to choose. FundMyCampus compared all options and helped me pick the best one. Saved me lakhs in interest!", course: "MBBS, University of Edinburgh", date: "2 months ago", avatar: "DN" },
  { name: "Rahul Joshi", rating: 4, text: "Very good experience overall. The team is knowledgeable and responsive. They helped me understand the loan process and what documents I needed.", course: "B.Tech, NIT Trichy", date: "1 month ago", avatar: "RJ" },
  { name: "Meera Iyer", rating: 5, text: "From application to disbursement, everything was seamless. The real-time tracking kept me updated at every step. No more calling banks for status!", course: "MS Biotech, MIT", date: "3 weeks ago", avatar: "MI" },
  { name: "Aditya Verma", rating: 5, text: "Referred 3 friends to FundMyCampus and earned referral rewards too! All of them got loans approved quickly. Truly the best platform for education loans.", course: "MBA, ISB Hyderabad", date: "2 months ago", avatar: "AV" },
  { name: "Pooja Desai", rating: 5, text: "The SOP review tool helped me improve my statement of purpose. Combined with their loan support, they're a complete education financing solution.", course: "MA Economics, LSE", date: "1 month ago", avatar: "PD" },
  { name: "Siddharth Rao", rating: 5, text: "One application, multiple bank offers. Compared to going directly to banks, FundMyCampus saved me so much time and effort. Smart approach!", course: "MS Robotics, ETH Zurich", date: "3 weeks ago", avatar: "SR" },
  { name: "Nisha Kapoor", rating: 5, text: "My parents were worried about financing. FundMyCampus counselor explained everything patiently and helped us feel confident about the process.", course: "BDS, King's College London", date: "2 months ago", avatar: "NK" },
  { name: "Amit Saxena", rating: 4, text: "Good platform with helpful tools. The EMI calculator and eligibility checker gave me a clear picture before I even applied. Smooth process.", course: "M.Tech, IIT Bombay", date: "1 month ago", avatar: "AS" },
];

const AVATAR_COLORS = [
  "bg-blue-500", "bg-red-500", "bg-green-500", "bg-purple-500",
  "bg-orange-500", "bg-pink-500", "bg-indigo-500", "bg-cyan-500",
  "bg-amber-500", "bg-emerald-500", "bg-violet-500", "bg-rose-500",
  "bg-teal-500", "bg-sky-500", "bg-lime-500",
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    function calc() { setMobile(window.innerWidth < 640); }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return mobile;
}

function useSlideDistance() {
  const [dist, setDist] = useState(260);
  useEffect(() => {
    function calc() {
      const w = window.innerWidth;
      if (w < 640) setDist(120);
      else if (w < 1100) setDist(140);
      else if (w < 1400) setDist(180);
      else setDist(260);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return dist;
}

function ReviewPanel({
  index,
  total,
  waveY,
  scaleY,
  isSelected,
  slideDistance,
  isMobile,
  onSelect,
}: {
  index: number;
  total: number;
  waveY: ReturnType<typeof useSpring>;
  scaleY: ReturnType<typeof useSpring>;
  isSelected: boolean;
  slideDistance: number;
  isMobile: boolean;
  onSelect: (index: number) => void;
}) {
  const t = index / (total - 1);
  const baseZ = (index - (total - 1)) * Z_SPREAD;
  const review = REVIEWS[index];
  const avatarColor = AVATAR_COLORS[index];

  const w = isMobile ? 150 + t * 25 : 220 + t * 40;
  const h = isMobile ? 130 + t * 30 : 180 + t * 50;
  const opacity = 0.35 + t * 0.65;

  return (
    <motion.div
      className="absolute rounded-xl cursor-pointer"
      onClick={(e) => { e.stopPropagation(); onSelect(index); }}
      animate={isSelected ? {
        x: slideDistance,
        y: 0,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
      } : {
        x: 0,
        scale: 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      style={{
        width: w,
        height: h,
        marginLeft: isMobile ? 0 : -w / 2,
        marginTop: -h / 2,
        translateZ: isSelected ? baseZ + 60 : baseZ,
        y: isSelected ? undefined : waveY,
        scaleY: isSelected ? 1 : scaleY,
        transformOrigin: "center center",
        opacity: isSelected ? 1 : opacity,
        zIndex: isSelected ? 200 : index,
      }}
    >
      <div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{
          backgroundColor: isSelected ? "#ffffff" : `rgb(${255 - Math.round((1 - t) * 20)}, ${255 - Math.round((1 - t) * 20)}, ${255 - Math.round((1 - t) * 18)})`,
          boxShadow: isSelected
            ? "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)"
            : "0 2px 12px rgba(0,0,0,0.12), 1px 0 0 #d1d5db, -1px 0 0 #d1d5db, 0 1px 0 #d1d5db, 0 -1px 0 #e5e7eb",
        }}
      >
        <div className="h-full flex flex-col p-3.5">
          {/* Header */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <GoogleIcon />
              <span className={`font-medium text-gray-400 ${isSelected ? "text-[10px]" : "text-[9px]"}`}>Google</span>
            </div>
            <span className={`text-gray-400 ${isSelected ? "text-[9px]" : "text-[8px]"}`}>{review.date}</span>
          </div>

          {/* Stars */}
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-[#FBBC05] fill-[#FBBC05]" : "text-gray-200 fill-gray-200"}`} />
            ))}
          </div>

          {/* Review text */}
          <p className={`text-[10px] leading-relaxed text-gray-600 flex-1 ${isSelected ? "line-clamp-5" : "line-clamp-4"}`}>
            &ldquo;{review.text}&rdquo;
          </p>

          {/* Reviewer */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full ${avatarColor} flex items-center justify-center text-[8px] font-bold text-white shrink-0`}>
                {review.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-gray-900 truncate">{review.name}</p>
                <p className="text-[8px] text-gray-400 truncate">{review.course}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected highlight */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ border: "2px solid #4285F4" }} />
      )}
    </motion.div>
  );
}

export default function StackedPanels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const slideDistance = useSlideDistance();
  const isMobile = useIsMobile();

  const waveYSprings = Array.from({ length: PANEL_COUNT }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(0, WAVE_SPRING)
  );

  const scaleYSprings = Array.from({ length: PANEL_COUNT }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring(1, WAVE_SPRING)
  );

  const rotY = useSpring(-25, SCENE_SPRING);
  const rotX = useSpring(8, SCENE_SPRING);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (selectedIndex !== null) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      isHovering.current = true;

      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;

      rotY.set(-25 + (cx - 0.5) * -10);
      rotX.set(8 + (cy - 0.5) * 6);

      const cursorCardPos = (1 - cx) * (PANEL_COUNT - 1);

      waveYSprings.forEach((spring, i) => {
        const dist = Math.abs(i - cursorCardPos);
        const influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
        spring.set(-influence * 50);
      });

      scaleYSprings.forEach((spring, i) => {
        const dist = Math.abs(i - cursorCardPos);
        const influence = Math.exp(-(dist * dist) / (2 * SIGMA * SIGMA));
        spring.set(0.5 + influence * 0.5);
      });
    },
    [rotY, rotX, waveYSprings, scaleYSprings, selectedIndex]
  );

  const handleMouseLeave = useCallback(() => {
    if (selectedIndex !== null) return;
    isHovering.current = false;
    rotY.set(-25);
    rotX.set(8);
    waveYSprings.forEach((s) => s.set(0));
    scaleYSprings.forEach((s) => s.set(1));
  }, [rotY, rotX, waveYSprings, scaleYSprings, selectedIndex]);

  function handleSelect(index: number) {
    setSelectedIndex((prev) => (prev === index ? null : index));
  }

  function handleContainerClick() {
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      className="relative w-full h-full flex items-center select-none"
      style={{ perspective: "900px", justifyContent: isMobile ? "flex-start" : "center", paddingLeft: isMobile ? "20px" : "0" }}
    >
      <motion.div
        style={{
          rotateY: rotY,
          rotateX: rotX,
          transformStyle: "preserve-3d",
          position: "relative",
          width: 0,
          height: 0,
        }}
      >
        {Array.from({ length: PANEL_COUNT }).map((_, i) => (
          <ReviewPanel
            key={i}
            index={i}
            total={PANEL_COUNT}
            waveY={waveYSprings[i]}
            scaleY={scaleYSprings[i]}
            isSelected={selectedIndex === i}
            slideDistance={slideDistance}
            isMobile={isMobile}
            onSelect={handleSelect}
          />
        ))}
      </motion.div>
    </div>
  );
}
