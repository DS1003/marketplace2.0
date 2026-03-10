"use client"

import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeContentProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  duration?: number
  delay?: number
  threshold?: number
  scale?: number
  blur?: boolean
}

export function FadeContent({
  children,
  className = "",
  direction = "up",
  distance = 40,
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  scale,
  blur = false,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 }
      case "down":
        return { y: -distance, x: 0 }
      case "left":
        return { x: distance, y: 0 }
      case "right":
        return { x: -distance, y: 0 }
      default:
        return { x: 0, y: 0 }
    }
  }

  const initial = getInitialPosition()

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...initial,
      scale: scale ? 0.95 : 1,
      filter: blur ? "blur(10px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
