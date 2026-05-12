"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type TypewriterVariant = "precision" | "manifesto" | "whisper" | "cascade" | "glitch" | "oracle";

interface TypewriterLine {
  text: string;
  pauseAfter?: number;
}

interface VariantConfig {
  speed: number;
  cursor: string;
  cursorClass: string;
  deleteSpeed?: number;
}

interface Props {
  lines: string | string[] | TypewriterLine[];
  variant?: TypewriterVariant;
  startDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

const VARIANT_CONFIGS: Record<TypewriterVariant, VariantConfig> = {
  precision: { speed: 35, cursor: "▋", cursorClass: "typewriter-cursor--amber" },
  manifesto: { speed: 55, cursor: "│", cursorClass: "typewriter-cursor--gold" },
  whisper: { speed: 25, cursor: "·", cursorClass: "typewriter-cursor--muted" },
  cascade: { speed: 40, cursor: "▋", cursorClass: "typewriter-cursor--amber" },
  glitch: { speed: 38, cursor: "▋", cursorClass: "typewriter-cursor--error" },
  oracle: { speed: 45, cursor: "▋", cursorClass: "typewriter-cursor--amber", deleteSpeed: 28 },
};

export default function Typewriter({ lines, variant = "precision", startDelay = 0, className, style, onComplete }: Props) {
  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [started, setStarted] = useState(false);
  
  const config = VARIANT_CONFIGS[variant];
  const normalizedLines = Array.isArray(lines) 
    ? lines.map(l => typeof l === "string" ? { text: l } : l)
    : [{ text: lines }];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  // Jitter Logic for Whisper
  const getNextDelay = useCallback((char: string) => {
    let delay = config.speed;
    if (variant === "whisper") {
      const jitter = (Math.random() * 0.8 - 0.4) * delay; // ±40%
      delay += jitter;
      if (char === " " || char === "." || char === ",") delay += 150; // Cognitive pause
    }
    return delay;
  }, [variant, config.speed]);

  // Main Loop
  useEffect(() => {
    if (!started || isPaused) return;

    const currentLine = normalizedLines[lineIndex];
    if (!currentLine) {
      if (onComplete) onComplete();
      return;
    }

    const handleTyping = () => {
      const targetText = currentLine.text;
      
      // Glitch Logic
      if (variant === "glitch" && Math.random() < 0.05 && charIndex < targetText.length) {
        const glitchChars = "!@#$%^&*()_+{}[]";
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        setDisplayText(prev => prev.slice(0, -1) + randomChar);
        timerRef.current = setTimeout(() => {
          setDisplayText(targetText.slice(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        }, 80); // Self-correcting delay
        return;
      }

      if (isDeleting) {
        if (displayText.length > 0) {
          timerRef.current = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, config.deleteSpeed || config.speed);
        } else {
          setIsDeleting(false);
          setLineIndex(prev => (prev + 1) % normalizedLines.length);
          setCharIndex(0);
        }
      } else {
        if (charIndex < targetText.length) {
          const nextChar = targetText[charIndex];
          timerRef.current = setTimeout(() => {
            setDisplayText(prev => prev + nextChar);
            setCharIndex(prev => prev + 1);
          }, getNextDelay(nextChar));
        } else {
          // Finished line
          if (variant === "oracle") {
            setIsPaused(true);
            timerRef.current = setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, 2000); // Oracle pause before delete
          } else if (lineIndex < normalizedLines.length - 1) {
            setIsPaused(true);
            timerRef.current = setTimeout(() => {
              setIsPaused(false);
              setLineIndex(prev => prev + 1);
              setCharIndex(0);
              setDisplayText("");
            }, currentLine.pauseAfter || 500);
          } else if (onComplete) {
            onComplete();
          }
        }
      }
    };

    handleTyping();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [started, lineIndex, charIndex, isDeleting, isPaused, normalizedLines, variant, config, getNextDelay, onComplete, displayText.length]);

  const fullAriaLabel = normalizedLines.map(l => l.text).join(" ");

  return (
    <span 
      className={className} 
      aria-label={fullAriaLabel}
      role="text"
      aria-live="polite"
      style={{ ...style, display: "inline-block", position: "relative" }}
    >
      {displayText}
      {(!started || (lineIndex === normalizedLines.length - 1 && charIndex === normalizedLines[lineIndex].text.length && variant !== "oracle")) 
        ? null 
        : <span className={`typewriter-cursor ${config.cursorClass}`} aria-hidden="true">{config.cursor}</span>
      }
    </span>
  );
}
