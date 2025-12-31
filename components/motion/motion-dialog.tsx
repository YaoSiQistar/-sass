"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "motion/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { buildFadeVariants, buildScaleFadeVariants } from "@/lib/motion/utils"
import { overlayOpacity } from "@/lib/motion/tokens"
import { useMotionSettings } from "@/components/motion/motion-provider"

const MotionDialogContext = React.createContext(false)

function MotionDialog({
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
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
    <MotionDialogContext.Provider value={resolvedOpen}>
      <DialogPrimitive.Root
        open={resolvedOpen}
        onOpenChange={handleChange}
        {...props}
      />
    </MotionDialogContext.Provider>
  )
}

function MotionDialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} />
}

function MotionDialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />
}

function MotionDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  const { reducedMotion } = useMotionSettings()
  const { resolvedTheme } = useTheme()
  const overlayAlpha =
    resolvedTheme === "dark" ? overlayOpacity.dark : overlayOpacity.light

  return (
    <DialogPrimitive.Overlay asChild {...props}>
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
    </DialogPrimitive.Overlay>
  )
}

function MotionDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  const { reducedMotion } = useMotionSettings()
  const open = React.useContext(MotionDialogContext)

  return (
    <MotionDialogPortal>
      <AnimatePresence>
        {open ? (
          <React.Fragment key="dialog">
            <MotionDialogOverlay />
            <DialogPrimitive.Content asChild {...props}>
              <motion.div
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-surface-2 p-6 text-text-1 shadow-lg outline-none",
                  "rim-popover",
                  className
                )}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={buildScaleFadeVariants(reducedMotion)}
              >
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </React.Fragment>
        ) : null}
      </AnimatePresence>
    </MotionDialogPortal>
  )
}

function MotionDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-left", className)}
      {...props}
    />
  )
}

function MotionDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

function MotionDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-base font-semibold", className)}
      {...props}
    />
  )
}

function MotionDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-caption", className)}
      {...props}
    />
  )
}

export {
  MotionDialog,
  MotionDialogTrigger,
  MotionDialogPortal,
  MotionDialogOverlay,
  MotionDialogContent,
  MotionDialogHeader,
  MotionDialogFooter,
  MotionDialogTitle,
  MotionDialogDescription,
}
