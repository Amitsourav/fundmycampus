/**
 * Segmented Image Transition Component
 * Divides images into 5 parts with sequential bottom-up reveal
 */

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SegmentedImageTransitionProps {
  images: string[];
  currentIndex: number;
  className?: string;
  onTransitionComplete?: () => void;
}

export const SegmentedImageTransition: React.FC<SegmentedImageTransitionProps> = ({
  images,
  currentIndex,
  className = "",
  onTransitionComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousIndex = useRef(-1); // Start with -1 to ensure first load triggers
  const segmentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (
      previousIndex.current !== currentIndex && 
      containerRef.current &&
      images[currentIndex] &&
      (previousIndex.current === -1 || images[previousIndex.current])
    ) {
      const container = containerRef.current;
      
      // Clear existing segments
      container.innerHTML = '';
      segmentsRef.current = [];
      
      // Create 5 segments for the new image
      for (let i = 0; i < 5; i++) {
        const segment = document.createElement('div');
        segment.className = 'absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden';
        segment.style.backgroundImage = `url('${images[currentIndex]}')`;
        segment.style.backgroundPosition = 'center 30%';
        segment.style.clipPath = `inset(${i * 20}% 0 ${100 - (i + 1) * 20}% 0)`;
        
        // Start from bottom (translated down) for animation, but not for first load
        if (previousIndex.current !== -1) {
          segment.style.transform = 'translateY(100%)';
        } else {
          segment.style.transform = 'translateY(0)';
        }
        
        container.appendChild(segment);
        segmentsRef.current.push(segment);
      }
      
      // Only animate if not first load
      if (previousIndex.current !== -1) {
        // Trigger text change immediately when image starts changing
        onTransitionComplete?.();
        
        // Animate segments sliding up from bottom
        const tl = gsap.timeline();
        
        segmentsRef.current.forEach((segment, i) => {
          tl.to(segment, {
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }, i * 0.1); // Stagger each segment by 100ms
        });
      } else {
        // For first load, also set the text immediately
        onTransitionComplete?.();
      }
      
      previousIndex.current = currentIndex;
    }
  }, [currentIndex, images, onTransitionComplete]);


  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
    />
  );
};