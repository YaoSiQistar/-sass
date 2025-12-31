"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

type ConfirmDialogProps = {
  title: string
  description?: string
  trigger: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  destructive?: boolean
}

export function ConfirmDialog({
  title,
  description,
  trigger,
  confirmLabel = "确认",
  cancelLabel = "取消",
  onConfirm,
  destructive,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="surface-popover rim-popover">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base text-text-1">
            {title}
          </AlertDialogTitle>
          {description ? (
            <AlertDialogDescription className="text-caption">
              {description}
            </AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="focus-ring rounded-[10px]">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              "focus-ring rounded-[10px]",
              destructive && "bg-destructive text-white hover:bg-destructive/90"
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
