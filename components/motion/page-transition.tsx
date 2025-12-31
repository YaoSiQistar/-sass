"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"

import { motionDistances } from "@/lib/motion/tokens"
import { buildFadeSlideVariants } from "@/lib/motion/utils"
import { useMotionSettings } from "@/components/motion/motion-provider"

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { reducedMotion } = useMotionSettings()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={buildFadeSlideVariants(
          "up",
          motionDistances.micro,
          reducedMotion
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
