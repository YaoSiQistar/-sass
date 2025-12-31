"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

type MotionContextValue = {
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
  prefersReducedMotion: boolean
}

const MotionContext = React.createContext<MotionContextValue | null>(null)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const [reducedMotion, setReducedMotion] = React.useState(false)

  const value = React.useMemo(
    () => ({ reducedMotion, setReducedMotion, prefersReducedMotion }),
    [reducedMotion, prefersReducedMotion]
  )

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export function useMotionSettings() {
  const context = React.useContext(MotionContext)
  const prefersReducedMotion = useReducedMotion()

  if (!context) {
    return {
      reducedMotion: prefersReducedMotion,
      setReducedMotion: () => undefined,
      prefersReducedMotion,
    }
  }

  return {
    reducedMotion: context.reducedMotion || context.prefersReducedMotion,
    setReducedMotion: context.setReducedMotion,
    prefersReducedMotion: context.prefersReducedMotion,
  }
}
