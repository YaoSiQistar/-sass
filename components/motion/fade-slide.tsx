"use client"

import * as React from "react"
import { motion } from "motion/react"

import type { FadeSlideDirection } from "@/lib/motion/utils"
import { buildFadeSlideVariants } from "@/lib/motion/utils"
import { motionDistances } from "@/lib/motion/tokens"
import { useMotionSettings } from "@/components/motion/motion-provider"

type MotionFadeSlideProps = {
  direction?: FadeSlideDirection
  distance?: number
  className?: string
  children: React.ReactNode
}

export function MotionFadeSlide({
  direction = "up",
  distance = motionDistances.small,
  className,
  children,
}: MotionFadeSlideProps) {
  const { reducedMotion } = useMotionSettings()

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={buildFadeSlideVariants(direction, distance, reducedMotion)}
    >
      {children}
    </motion.div>
  )
}
