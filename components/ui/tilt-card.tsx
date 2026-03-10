"use client"

import React, { useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  perspective?: number
  transitionSpeed?: number
  glareEnable?: boolean
  glareMaxOpacity?: number
  glareColor?: string
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  perspective = 1000,
  transitionSpeed = 400,
  glareEnable = true,
  glareMaxOpacity = 0.2,
  glareColor = "255, 255, 255",
}: TiltCardProps) {
  const [transform, setTransform] = useState("")
  const [glareStyle, setGlareStyle] = useState({})
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      )

      if (glareEnable) {
        const glareX = (x / rect.width) * 100
        const glareY = (y / rect.height) * 100
        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(${glareColor}, ${glareMaxOpacity}), transparent 60%)`,
        })
      }
    },
    [maxTilt, scale, perspective, glareEnable, glareMaxOpacity, glareColor]
  )

  const handleMouseLeave = useCallback(() => {
    setTransform("")
    setGlareStyle({})
  }, [])

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: `transform ${transitionSpeed}ms ease-out`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {glareEnable && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            ...glareStyle,
            transition: `background ${transitionSpeed}ms ease-out`,
          }}
        />
      )}
    </div>
  )
}
