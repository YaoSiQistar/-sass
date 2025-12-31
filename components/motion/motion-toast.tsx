"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckCircle2, Info, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { motionDistances, motionDurations, motionEasings } from "@/lib/motion/tokens"
import { useMotionSettings } from "@/components/motion/motion-provider"

export type MotionToastType = "success" | "error" | "info"

type ToastItem = {
  id: string
  type: MotionToastType
  message: string
  actionLabel?: string
  onAction?: () => void
}

type MotionToastContextValue = {
  pushToast: (toast: Omit<ToastItem, "id">) => void
}

const MotionToastContext = React.createContext<MotionToastContextValue | null>(
  null
)

export function MotionToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([])
  const { reducedMotion } = useMotionSettings()

  const pushToast = React.useCallback((toast: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID()
    setItems((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }, 2800)
  }, [])

  const iconMap: Record<MotionToastType, React.ReactNode> = {
    success: <CheckCircle2 className="size-4" />,
    error: <AlertTriangle className="size-4" />,
    info: <Info className="size-4" />,
  }

  return (
    <MotionToastContext.Provider value={{ pushToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-[320px] flex-col gap-2">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : motionDistances.small }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: motionDurations.fast,
                  ease: motionEasings.standard,
                },
              }}
              exit={{
                opacity: 0,
                y: reducedMotion ? 0 : motionDistances.micro,
                transition: {
                  duration: motionDurations.fast,
                  ease: motionEasings.exit,
                },
              }}
              className="pointer-events-auto surface-popover rim-popover flex items-center gap-3 border px-4 py-3 text-sm text-text-1 shadow-lg"
            >
              <span className="text-brand-ink">{iconMap[item.type]}</span>
              <span className="flex-1">{item.message}</span>
              {item.actionLabel ? (
                <button
                  type="button"
                  className={cn(
                    "focus-ring rounded-md px-2 py-1 text-xs text-brand-ink transition-transform",
                    "active:translate-y-[2px]"
                  )}
                  onClick={item.onAction}
                >
                  {item.actionLabel}
                </button>
              ) : null}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </MotionToastContext.Provider>
  )
}

export function useMotionToast() {
  const context = React.useContext(MotionToastContext)
  if (!context) {
    throw new Error("useMotionToast must be used within MotionToastProvider")
  }
  return context
}
