"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "motion/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import {
  motionDistances,
  motionDurations,
  motionEasings,
  motionSprings,
  overlayOpacity,
} from "@/lib/motion/tokens"
import { buildFadeVariants } from "@/lib/motion/utils"
import { useMotionSettings } from "@/components/motion/motion-provider"

const MotionDrawerContext = React.createContext(false)

function MotionDrawer({
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false
  )
  const isControlled = open !== undefined
  const resolvedOpen = isControlled ? open : uncontrolledOpen

  const handleChange = (next: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(next)
    }
    onOpenChange?.(next)
  }

  return (
    <MotionDrawerContext.Provider value={resolvedOpen}>
      <SheetPrimitive.Root
        open={resolvedOpen}
        onOpenChange={handleChange}
        {...props}
      />
    </MotionDrawerContext.Provider>
  )
}

function MotionDrawerTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger {...props} />
}

function MotionDrawerPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal {...props} />
}

function MotionDrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  const { reducedMotion } = useMotionSettings()
  const { resolvedTheme } = useTheme()
  const overlayAlpha =
    resolvedTheme === "dark" ? overlayOpacity.dark : overlayOpacity.light

  return (
    <SheetPrimitive.Overlay asChild {...props}>
      <motion.div
        className={cn("fixed inset-0 z-50", className)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={buildFadeVariants(reducedMotion)}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayAlpha})`,
        }}
      />
    </SheetPrimitive.Overlay>
  )
}

function MotionDrawerContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  const { reducedMotion } = useMotionSettings()
  const open = React.useContext(MotionDrawerContext)
  const offset = reducedMotion ? 0 : motionDistances.large

  const axisVariants = {
    initial: {
      opacity: 0,
      x: side === "right" ? offset : side === "left" ? -offset : 0,
      y: side === "bottom" ? offset : side === "top" ? -offset : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: reducedMotion
        ? {
            duration: motionDurations.fast,
            ease: motionEasings.standard,
          }
        : motionSprings.drawerSpring,
    },
    exit: {
      opacity: 0,
      x: side === "right" ? offset : side === "left" ? -offset : 0,
      y: side === "bottom" ? offset : side === "top" ? -offset : 0,
      transition: {
        duration: motionDurations.fast,
        ease: motionEasings.exit,
      },
    },
  }

  return (
    <MotionDrawerPortal>
      <AnimatePresence>
        {open ? (
          <React.Fragment key="drawer">
            <MotionDrawerOverlay />
            <SheetPrimitive.Content asChild {...props}>
              <motion.div
                className={cn(
                  "fixed z-50 flex flex-col border border-border bg-surface-2 shadow-lg",
                  "rim-overlay",
                  side === "right" &&
                    "inset-y-0 right-0 h-full w-full sm:max-w-[560px]",
                  side === "left" &&
                    "inset-y-0 left-0 h-full w-full sm:max-w-[560px]",
                  side === "top" && "inset-x-0 top-0 h-auto",
                  side === "bottom" && "inset-x-0 bottom-0 h-auto",
                  className
                )}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={axisVariants}
              >
                {children}
              </motion.div>
            </SheetPrimitive.Content>
          </React.Fragment>
        ) : null}
      </AnimatePresence>
    </MotionDrawerPortal>
  )
}

function MotionDrawerHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 border-b border-border px-5 py-4",
        className
      )}
      {...props}
    />
  )
}

function MotionDrawerFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto border-t border-border px-5 py-4", className)}
      {...props}
    />
  )
}

function MotionDrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn("text-base font-semibold", className)}
      {...props}
    />
  )
}

function MotionDrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      className={cn("text-caption", className)}
      {...props}
    />
  )
}

export {
  MotionDrawer,
  MotionDrawerTrigger,
  MotionDrawerPortal,
  MotionDrawerOverlay,
  MotionDrawerContent,
  MotionDrawerHeader,
  MotionDrawerFooter,
  MotionDrawerTitle,
  MotionDrawerDescription,
}
