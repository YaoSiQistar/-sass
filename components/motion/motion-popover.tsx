"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { buildFadeSlideVariants } from "@/lib/motion/utils"
import { motionDistances } from "@/lib/motion/tokens"
import { useMotionSettings } from "@/components/motion/motion-provider"

function useControlledOpen(
  controlled: boolean | undefined,
  onChange: ((open: boolean) => void) | undefined
) {
  const [open, setOpen] = React.useState(false)
  const isControlled = controlled !== undefined

  const value = isControlled ? controlled : open
  const setValue = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setOpen(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [value, setValue] as const
}

export function MotionPopover({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
}) {
  const { reducedMotion } = useMotionSettings()
  const [open, setOpen] = useControlledOpen(controlledOpen, onOpenChange)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <AnimatePresence>
          {open ? (
            <PopoverPrimitive.Content
              forceMount
              asChild
              align={align}
              side={side}
              sideOffset={sideOffset}
            >
              <motion.div
                className={cn(
                  "surface-popover rim-popover z-50 w-72 p-4",
                  className
                )}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={buildFadeSlideVariants(
                  side === "top"
                    ? "down"
                    : side === "bottom"
                      ? "up"
                      : side === "left"
                        ? "right"
                        : "left",
                  motionDistances.small,
                  reducedMotion
                )}
              >
                {children}
              </motion.div>
            </PopoverPrimitive.Content>
          ) : null}
        </AnimatePresence>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export function MotionDropdown({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  className,
  side = "bottom",
  align = "start",
  sideOffset = 8,
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
}) {
  const { reducedMotion } = useMotionSettings()
  const [open, setOpen] = useControlledOpen(controlledOpen, onOpenChange)

  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen}>
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <AnimatePresence>
          {open ? (
            <DropdownMenuPrimitive.Content
              forceMount
              asChild
              align={align}
              side={side}
              sideOffset={sideOffset}
            >
              <motion.div
                className={cn(
                  "surface-popover rim-popover z-50 min-w-[10rem] p-1",
                  className
                )}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={buildFadeSlideVariants(
                  side === "top"
                    ? "down"
                    : side === "bottom"
                      ? "up"
                      : side === "left"
                        ? "right"
                        : "left",
                  motionDistances.small,
                  reducedMotion
                )}
              >
                {children}
              </motion.div>
            </DropdownMenuPrimitive.Content>
          ) : null}
        </AnimatePresence>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

export function MotionDropdownItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "flex cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm text-text-2 outline-none focus:bg-muted",
        className
      )}
      {...props}
    />
  )
}

export function MotionDropdownLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn("px-2 py-1 text-xs text-text-3", className)}
      {...props}
    />
  )
}

export function MotionDropdownSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export function MotionTooltip({
  trigger,
  content,
  side = "top",
  sideOffset = 6,
}: {
  trigger: React.ReactNode
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}) {
  const { reducedMotion } = useMotionSettings()
  const [open, setOpen] = React.useState(false)

  return (
    <TooltipPrimitive.Provider delayDuration={120}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <AnimatePresence>
            {open ? (
              <TooltipPrimitive.Content
                forceMount
                asChild
                side={side}
                sideOffset={sideOffset}
              >
                <motion.div
                  className="rounded-md bg-foreground px-2 py-1 text-xs text-background"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={buildFadeSlideVariants(
                    side === "top"
                      ? "down"
                      : side === "bottom"
                        ? "up"
                        : side === "left"
                          ? "right"
                          : "left",
                    motionDistances.micro,
                    reducedMotion
                  )}
                >
                  {content}
                </motion.div>
              </TooltipPrimitive.Content>
            ) : null}
          </AnimatePresence>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
