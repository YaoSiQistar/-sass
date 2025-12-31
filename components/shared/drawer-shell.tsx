"use client"

import * as React from "react"
import { X } from "lucide-react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { AppButton } from "@/components/shared/app-button"

type DrawerShellProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

const sizeMap: Record<NonNullable<DrawerShellProps["size"]>, string> = {
  sm: "sm:max-w-[480px]",
  md: "sm:max-w-[560px]",
  lg: "sm:max-w-[640px]",
}

export function DrawerShell({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
}: DrawerShellProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent
        className={cn(
          "rim-overlay bg-surface-2 border-l border-border",
          "data-[vaul-drawer-direction=right]:w-full",
          sizeMap[size]
        )}
      >
        <DrawerHeader className="border-b border-border px-5 py-4 text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DrawerTitle className="text-base font-semibold text-text-1">
                {title}
              </DrawerTitle>
              {description ? (
                <DrawerDescription className="text-caption">
                  {description}
                </DrawerDescription>
              ) : null}
            </div>
            <DrawerClose asChild>
              <AppButton variant="ghost" size="sm">
                <X className="size-4" />
              </AppButton>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex-1 overflow-auto px-5 py-5">{children}</div>
        {footer ? (
          <div className="border-t border-border px-5 py-4">{footer}</div>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}
