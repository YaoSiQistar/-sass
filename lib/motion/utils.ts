import type { Variants } from "motion/react"

import {
  motionDistances,
  motionDurations,
  motionEasings,
} from "@/lib/motion/tokens"

export type FadeSlideDirection = "up" | "down" | "left" | "right"

export function buildFadeSlideVariants(
  direction: FadeSlideDirection,
  distance = motionDistances.small,
  reduced = false
): Variants {
  const offset = reduced ? 0 : distance
  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const sign = direction === "up" || direction === "left" ? 1 : -1

  return {
    initial: {
      opacity: 0,
      [axis]: offset * sign,
    },
    animate: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: reduced ? motionDurations.fast : motionDurations.normal,
        ease: motionEasings.standard,
      },
    },
    exit: {
      opacity: 0,
      [axis]: offset * sign * 0.6,
      transition: {
        duration: motionDurations.fast,
        ease: motionEasings.exit,
      },
    },
  }
}

export function buildFadeVariants(reduced = false): Variants {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: reduced ? motionDurations.fast : motionDurations.normal,
        ease: motionEasings.standard,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: motionDurations.fast,
        ease: motionEasings.exit,
      },
    },
  }
}

export function buildScaleFadeVariants(reduced = false): Variants {
  return {
    initial: {
      opacity: 0,
      scale: reduced ? 1 : 0.98,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: motionDurations.normal,
        ease: motionEasings.emphasized,
      },
    },
    exit: {
      opacity: 0,
      scale: reduced ? 1 : 0.98,
      transition: {
        duration: motionDurations.fast,
        ease: motionEasings.exit,
      },
    },
  }
}
