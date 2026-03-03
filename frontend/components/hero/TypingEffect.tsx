"use client";

import React, { useEffect, useRef, useState } from "react";

interface TypingEffectProps {
  words: string[];
  className?: string;
  cursorChar?: string;
  speed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  words,
  className = "",
  cursorChar = "|",
  speed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 1500,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorBlinkRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cursor blink effect
    cursorBlinkRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      if (cursorBlinkRef.current) {
        clearInterval(cursorBlinkRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const type = () => {
      setDisplayText((prev) => {
        const target = currentWord;

        if (!isDeleting) {
          // Typing
          if (prev.length < target.length) {
            return target.substring(0, prev.length + 1);
          } else {
            // Finished typing, prepare to delete
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
            }, delayBetweenWords);
            return prev;
          }
        } else {
          // Deleting
          if (prev.length > 0) {
            return prev.substring(0, prev.length - 1);
          } else {
            // Finished deleting, move to next word
            setCurrentWordIndex((index) => (index + 1) % words.length);
            setIsDeleting(false);
            return "";
          }
        }
      });
    };

    timeoutRef.current = setTimeout(type, isDeleting ? deleteSpeed : speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isDeleting, currentWordIndex, words, speed, deleteSpeed, delayBetweenWords]);

  return (
    <span className={className}>
      <span className="text-cyan-400">{displayText}</span>
      <span className={`cursor ${showCursor ? "opacity-100" : "opacity-0"}`} style={{ marginLeft: "2px" }}>
        {cursorChar}
      </span>
    </span>
  );
};

export default TypingEffect;
