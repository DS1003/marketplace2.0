"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  splitType?: "chars" | "words"
  tag?: keyof JSX.IntrinsicElements
  from?: { opacity?: number; y?: number; x?: number; scale?: number; rotateX?: number }
  to?: { opacity?: number; y?: number; x?: number; scale?: number; rotateX?: number }
  threshold?: number
  staggerChildren?: number
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  splitType = "chars",
  tag: Tag = "p",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  staggerChildren = 0.03,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    if (splitType === "words") {
      setItems(text.split(" "))
    } else {
      setItems(text.split(""))
    }
  }, [text, splitType])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration,
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
          {splitType === "words" && index < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.div>
  )
}
