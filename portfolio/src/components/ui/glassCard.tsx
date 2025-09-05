"use client"

import * as React from "react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  paddingX?: number
  paddingY?: number
}

export function GlassCard({ 
  children, 
  paddingX = 24,
  paddingY = 24,
  className,
  style,
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={`rounded-xl transition-all duration-300 text-white ${className || ''}`}
      style={{
        // Enhanced glass effect with better translucency
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(1px) saturate(110%) contrast(115%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%) contrast(120%)',
        
        // Subtle border for definition
        
        // Enhanced shadow for depth
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(255, 255, 255, 0.1)
        `,
        
        // Explicit padding using inline styles
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
        
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
} 