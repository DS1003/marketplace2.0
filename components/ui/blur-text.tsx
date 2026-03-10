"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface BlurTextProps {
  text: string
  className?: string
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  delay?: number
  stepDuration?: number
  threshold?: number
}

export function BlurText({
  text,
  className = "",
  animateBy = "words",
  direction = "top",
  delay = 0.1,
  stepDuration = 0.35,
  threshold = 0.1,
}: BlurTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const items = animateBy === "words" ? text.split(" ") : text.split("")
  const yOffset = direction === "top" ? -20 : 20

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: stepDuration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      aria-label={text}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          style={{
            display: "inline-block",
            whiteSpace: item === " " ? "pre" : "normal",
          }}
        >
          {item}
          {animateBy === "words" && index < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.div>
  )
}
