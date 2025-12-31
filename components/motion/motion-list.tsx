"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { buildFadeVariants } from "@/lib/motion/utils"
import { useMotionSettings } from "@/components/motion/motion-provider"

type MotionListProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  denseLimit?: number
}

export function MotionList<T>({
  items,
  renderItem,
  className,
  denseLimit = 30,
}: MotionListProps<T>) {
  const { reducedMotion } = useMotionSettings()
  const enableLayout = items.length <= denseLimit && !reducedMotion

  return (
    <motion.div
      className={cn("space-y-2", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={buildFadeVariants(reducedMotion)}
    >
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div key={index} layout={enableLayout}>
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
