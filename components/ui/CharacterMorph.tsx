/**
 * Advanced Character-Level Text Morphing
 * Future UI / Italian luxury tech aesthetic
 */

"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";

interface CharacterMorphProps {
  texts: string[];
  currentIndex: number;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
}

export const CharacterMorph: React.FC<CharacterMorphProps> = ({
  texts,
  currentIndex,
  className = "",
  style = {},
  stagger = 0.02,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousIndex = useRef(currentIndex);

  // Prepare text data
  const textData = useMemo(() => {
    return texts.map(text => ({
      text,
      chars: text.split('')
    }));
  }, [texts]);

  useEffect(() => {
    if (
      previousIndex.current !== currentIndex && 
      containerRef.current &&
      textData[previousIndex.current] &&
      textData[currentIndex]
    ) {
      const container = containerRef.current;
      const prevText = textData[previousIndex.current];
      const nextText = textData[currentIndex];
      
      // Clear container
      container.innerHTML = '';
      
      // Create character containers
      const maxLength = Math.max(prevText.chars.length, nextText.chars.length);
      const charElements: HTMLSpanElement[] = [];
      
      for (let i = 0; i < maxLength; i++) {
        const charContainer = document.createElement('span');
        charContainer.className = 'relative inline-block';
        charContainer.style.minWidth = '0.5ch';
        
        const currentChar = document.createElement('span');
        currentChar.className = 'absolute inset-0 inline-block';
        currentChar.textContent = prevText.chars[i] || '';
        
        const nextChar = document.createElement('span');
        nextChar.className = 'absolute inset-0 inline-block opacity-0';
        nextChar.textContent = nextText.chars[i] || '';
        
        charContainer.appendChild(currentChar);
        charContainer.appendChild(nextChar);
        container.appendChild(charContainer);
        
        charElements.push(charContainer);
      }
      
      // Animate character morphing
      const tl = gsap.timeline();
      
      charElements.forEach((charEl, i) => {
        const currentChar = charEl.children[0] as HTMLSpanElement;
        const nextChar = charEl.children[1] as HTMLSpanElement;
        
        const delay = i * stagger;
        
        // Phase 1: Dissolve current character
        tl.to(currentChar, {
          opacity: 0,
          y: -20,
          scale: 0.8,
          filter: "blur(4px)",
          duration: 0.3,
          ease: "power2.in"
        }, delay)
        
        // Phase 2: Emerge next character
        .fromTo(nextChar, 
          {
            opacity: 0,
            y: 20,
            scale: 1.2,
            filter: "blur(6px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out"
          }, 
          delay + 0.15
        );
      });
      
      previousIndex.current = currentIndex;
    }
  }, [currentIndex, textData, stagger]);

  // Initialize the first text
  useEffect(() => {
    if (containerRef.current && textData[currentIndex]) {
      const container = containerRef.current;
      container.innerHTML = '';
      
      textData[currentIndex].chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'inline-block';
        container.appendChild(span);
      });
    }
  }, [textData, currentIndex]);

  return (
    <div 
      ref={containerRef} 
      className={`inline-block ${className}`} 
      style={{
        ...style,
        minHeight: '1.2em'
      }}
    />
  );
};