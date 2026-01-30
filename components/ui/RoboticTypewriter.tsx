/**
 * Robotic Typewriter Component
 * Mechanical typing/deleting with cursor blink - Future UI aesthetic
 */

"use client";

import React, { useEffect, useRef, useState } from "react";

interface RoboticTypewriterProps {
  texts: string[];
  currentIndex: number;
  className?: string;
  style?: React.CSSProperties;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const RoboticTypewriter: React.FC<RoboticTypewriterProps> = ({
  texts,
  currentIndex,
  className = "",
  style = {},
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1000,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const previousIndex = useRef(-1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentTextRef = useRef("");

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Initialize first text immediately
  useEffect(() => {
    if (texts[0] && previousIndex.current === -1) {
      const firstText = texts[0];
      currentTextRef.current = firstText;
      setDisplayText("");
      
      // Start typing immediately
      let currentLength = 0;
      const type = () => {
        if (currentLength < firstText.length && currentTextRef.current === firstText) {
          setDisplayText(firstText.slice(0, currentLength + 1));
          currentLength++;
          timeoutRef.current = setTimeout(type, typingSpeed);
        }
      };
      
      timeoutRef.current = setTimeout(type, 100); // Start after small delay
      previousIndex.current = 0;
    }
  }, [texts, typingSpeed]);

  // Main typing/deleting logic for transitions
  useEffect(() => {
    if (texts[currentIndex] && previousIndex.current !== -1 && previousIndex.current !== currentIndex) {
      const targetText = texts[currentIndex];
      currentTextRef.current = targetText;

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Start deleting current text
      startDeleting(targetText);
      previousIndex.current = currentIndex;
    }
  }, [currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  const startTyping = (targetText: string) => {
    let currentLength = 0;
    setDisplayText('');
    
    const type = () => {
      if (currentLength < targetText.length && currentTextRef.current === targetText) {
        setDisplayText(targetText.slice(0, currentLength + 1));
        currentLength++;
        timeoutRef.current = setTimeout(type, typingSpeed);
      }
    };

    timeoutRef.current = setTimeout(type, typingSpeed);
  };

  const startDeleting = (targetText: string) => {
    let currentLength = displayText.length;
    
    const deleteChar = () => {
      if (currentLength > 0) {
        setDisplayText(prev => prev.slice(0, -1));
        currentLength--;
        timeoutRef.current = setTimeout(deleteChar, deletingSpeed);
      } else {
        // Pause before typing new text
        timeoutRef.current = setTimeout(() => {
          startTyping(targetText);
        }, pauseDuration);
      }
    };

    timeoutRef.current = setTimeout(deleteChar, pauseDuration);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`inline-block ${className}`} 
      style={{
        ...style,
        minHeight: '1.2em'
      }}
    >
      <span className="inline-block">
        {displayText}
      </span>
      <span 
        className={`inline-block w-0.5 h-[1em] bg-current ml-1 transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};