"use client"

import React, { useState, useRef, useCallback } from "react"

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
  innerClassName?: string
}

export function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  className = "",
  innerClassName = "",
}: MagnetProps) {
  const [isActive, setIsActive] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
      const magnetRange = Math.max(rect.width, rect.height) / 2 + padding

      if (distance < magnetRange) {
        setIsActive(true)
        setPosition({
          x: distanceX / magnetStrength,
          y: distanceY / magnetStrength,
        })
      } else {
        setIsActive(false)
        setPosition({ x: 0, y: 0 })
      }
    },
    [disabled, padding, magnetStrength]
  )

  const handleMouseLeave = useCallback(() => {
    setIsActive(false)
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
        }}
      >
        {children}
      </div>
    </div>
  )
}
