"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-8 right-8 z-[100]"
                >
                    <motion.div
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            size="icon"
                            onClick={scrollToTop}
                            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl hover:bg-primary/90 transition-colors border border-white/20 backdrop-blur-md"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="h-6 w-6" />
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
