/**
 * Premium Text Morphing Component
 * Italian luxury tech aesthetic with smooth letter interpolation
 */

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MorphingTextProps {
  texts: string[];
  currentIndex: number;
  className?: string;
  style?: React.CSSProperties;
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  currentIndex,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTextRef = useRef<HTMLSpanElement>(null);
  const nextTextRef = useRef<HTMLSpanElement>(null);
  const previousIndex = useRef(currentIndex);

  useEffect(() => {
    if (previousIndex.current !== currentIndex && containerRef.current && currentTextRef.current && nextTextRef.current) {
      const container = containerRef.current;
      const currentText = currentTextRef.current;
      const nextText = nextTextRef.current;
      
      // Set up the next text
      nextText.textContent = texts[currentIndex];
      
      // Create the morphing timeline
      const tl = gsap.timeline();
      
      // Phase 1: Dissolve current text with blur and scale
      tl.to(currentText, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(8px)",
        duration: 0.4,
        ease: "power2.out"
      })
      
      // Phase 2: Transform to next text with elegant emerge
      .set(nextText, {
        opacity: 0,
        scale: 0.95,
        filter: "blur(6px)",
        y: 10
      })
      .to(nextText, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2")
      
      // Phase 3: Finalize transition
      .set(currentText, {
        textContent: texts[currentIndex],
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0
      })
      .set(nextText, {
        opacity: 0
      });

      previousIndex.current = currentIndex;
    }
  }, [currentIndex, texts]);

  // Initialize the first text
  useEffect(() => {
    if (currentTextRef.current && texts[currentIndex]) {
      currentTextRef.current.textContent = texts[currentIndex];
    }
  }, [texts, currentIndex]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      <span
        ref={currentTextRef}
        className="block"
        style={{
          filter: "blur(0px)",
          transform: "scale(1) translateY(0px)",
        }}
      >
        {texts[currentIndex]}
      </span>
      <span
        ref={nextTextRef}
        className="absolute inset-0 opacity-0"
        style={{
          filter: "blur(6px)",
          transform: "scale(0.95) translateY(10px)",
        }}
      />
    </div>
  );
};