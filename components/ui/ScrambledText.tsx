/**
 * Scrambled Text Animation Component
 * Characters cycle through random letters before revealing actual text
 * Matrix/glitch effect for premium tech aesthetic
 */

"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrambledTextProps {
  texts: string[];
  currentIndex: number;
  className?: string;
  style?: React.CSSProperties;
  scrambleSpeed?: number;
  revealSpeed?: number;
}

export const ScrambledText: React.FC<ScrambledTextProps> = ({
  texts,
  currentIndex,
  className = "",
  style = {},
  scrambleSpeed = 30,
  revealSpeed = 50,
}) => {
  const [displayText, setDisplayText] = useState("");
  const previousIndex = useRef(-1);
  const animationRef = useRef<NodeJS.Timeout[]>([]);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  // Clear all timeouts
  const clearAnimations = () => {
    animationRef.current.forEach(timeout => clearTimeout(timeout));
    animationRef.current = [];
  };

  // Scramble animation
  const scrambleText = (targetText: string) => {
    clearAnimations();
    
    const targetArray = targetText.split('');
    const currentArray = new Array(targetArray.length).fill('');
    const revealed = new Array(targetArray.length).fill(false);
    
    // Initial display with random characters
    setDisplayText(targetArray.map(char => 
      char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
    ).join(''));

    // Reveal characters one by one
    let revealIndex = 0;
    
    const revealNextChar = () => {
      if (revealIndex >= targetArray.length) return;
      
      const i = revealIndex;
      let iterations = 0;
      const maxIterations = 10;
      
      // Scramble this position
      const scrambleInterval = setInterval(() => {
        if (!revealed[i] && targetArray[i] !== ' ') {
          currentArray[i] = chars[Math.floor(Math.random() * chars.length)];
          setDisplayText([...currentArray].join(''));
        }
        
        iterations++;
        
        // After scrambling, reveal the actual character
        if (iterations >= maxIterations) {
          clearInterval(scrambleInterval);
          revealed[i] = true;
          currentArray[i] = targetArray[i];
          setDisplayText([...currentArray].join(''));
        }
      }, scrambleSpeed);
      
      // Move to next character
      revealIndex++;
      if (revealIndex < targetArray.length) {
        const timeout = setTimeout(revealNextChar, revealSpeed);
        animationRef.current.push(timeout);
      }
    };
    
    // Start revealing
    const timeout = setTimeout(revealNextChar, 100);
    animationRef.current.push(timeout);
  };

  // Direct morph animation - no deletion
  const morphText = (fromText: string, toText: string) => {
    clearAnimations();
    
    // Ensure both texts have same length by padding shorter one
    const maxLength = Math.max(fromText.length, toText.length);
    const paddedFrom = fromText.padEnd(maxLength, ' ');
    const paddedTo = toText.padEnd(maxLength, ' ');
    
    const currentArray = paddedFrom.split('');
    const targetArray = paddedTo.split('');
    const morphing = new Array(maxLength).fill(true);
    
    // Start morphing each character
    for (let i = 0; i < maxLength; i++) {
      if (paddedFrom[i] === paddedTo[i]) {
        morphing[i] = false; // Don't morph if same character
        continue;
      }
      
      let iterations = 0;
      const maxIterations = 15 + Math.floor(Math.random() * 10);
      
      const morphInterval = setInterval(() => {
        if (morphing[i] && targetArray[i] !== ' ') {
          currentArray[i] = chars[Math.floor(Math.random() * chars.length)];
          setDisplayText(currentArray.join('').trim());
        }
        
        iterations++;
        
        if (iterations >= maxIterations) {
          clearInterval(morphInterval);
          morphing[i] = false;
          currentArray[i] = targetArray[i];
          setDisplayText(currentArray.join('').trim());
        }
      }, scrambleSpeed);
    }
  };

  // Handle text changes
  useEffect(() => {
    if (texts[currentIndex]) {
      const targetText = texts[currentIndex];
      
      if (previousIndex.current === -1) {
        // First load - immediate scramble
        scrambleText(targetText);
      } else if (previousIndex.current !== currentIndex) {
        // Direct morph from current to new text
        const fromText = texts[previousIndex.current] || '';
        morphText(fromText, targetText);
      }
      
      previousIndex.current = currentIndex;
    }
  }, [currentIndex, texts]);

  // Cleanup
  useEffect(() => {
    return () => clearAnimations();
  }, []);

  return (
    <div 
      className={`inline-block ${className}`} 
      style={{
        ...style,
        minHeight: '1.2em'
      }}
    >
      {displayText}
    </div>
  );
};