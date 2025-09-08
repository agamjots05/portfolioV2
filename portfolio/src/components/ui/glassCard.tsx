"use client"

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  paddingX?: number;
  paddingY?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function GlassCard({ 
  children, 
  paddingX,
  paddingY,
  className,
  style,
  ...props 
}: GlassCardProps) {
  // Detect if Tailwind padding classes are present on this element
  const hasPaddingClass = Boolean(
    className && (
      className.includes(" p-") ||
      className.includes(" px-") ||
      className.includes(" py-") ||
      className.includes(" pl-") ||
      className.includes(" pr-") ||
      className.includes(" pt-") ||
      className.includes(" pb-") ||
      className.startsWith("p-") ||
      className.startsWith("px-") ||
      className.startsWith("py-")
    )
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
      className={`rounded-xl transition-all duration-300 text-white ${className || ''}`}
      style={{
        // Enhanced glass effect with better translucency
        background: 'rgba(255, 255, 255,0.01)',
        backdropFilter: 'blur(1px) saturate(110%) contrast(100%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%) contrast(120%)',
        // Enhanced shadow for depth
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1)
        `,
        // Only apply inline padding if no Tailwind padding classes are present
        ...(hasPaddingClass
          ? {}
          : {
              ...(paddingX !== undefined ? { paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` } : {}),
              ...(paddingY !== undefined ? { paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` } : {}),
            }),
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
} 