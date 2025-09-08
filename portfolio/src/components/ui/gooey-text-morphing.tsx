"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let textIndex = 0;
    let progress = 0;
    let isMorphing = true;
    let animationId: number;
    let lastTime = performance.now();

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;

      // Apply blur and opacity to the appearing text
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      // Apply inverse effect to disappearing text
      const inverseFraction = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / inverseFraction - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(inverseFraction, 0.4) * 100}%`;
    };

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;
      
      // Update progress based on current phase
      if (isMorphing) {
        progress += deltaTime;
        const fraction = Math.min(progress / morphTime, 1);
        setMorph(fraction);

        // Check if morph phase is complete
        if (progress >= morphTime) {
          isMorphing = false;
          progress = 0;
        }
      } else {
        progress += deltaTime;
        
        // Check if cooldown phase is complete
        if (progress >= cooldownTime) {
          isMorphing = true;
          progress = 0;
          textIndex = (textIndex + 1) % texts.length;

          // Update text content for next cycle
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex];
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    // Initialize text content
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[0];
      text2Ref.current.textContent = texts[1] || texts[0];
      text1Ref.current.style.opacity = "100%";
      text2Ref.current.style.opacity = "0%";
    }

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [texts, morphTime, cooldownTime]); // Removed frameTime from dependencies

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center",
            "text-foreground",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center",
            "text-foreground",
            textClassName
          )}
        />
      </div>
    </div>
  );
}
