"use client"

import { useRef } from "react"
import { useInView, type UseInViewOptions } from "framer-motion"

export function useScrollAnimation(options?: UseInViewOptions) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    ...options,
  })

  return { ref, isInView }
}
