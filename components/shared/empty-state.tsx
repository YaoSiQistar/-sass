import * as React from "react"

import { AppButton } from "@/components/shared/app-button"
import { cn } from "@/lib/utils"

type EmptyStateProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "section-card rim-surface elev-surface flex flex-col items-center gap-4 px-6 py-10 text-center",
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-text-2">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-section-title text-text-1">{title}</p>
        {description ? <p className="text-caption">{description}</p> : null}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {actionLabel ? (
          <AppButton onClick={onAction}>{actionLabel}</AppButton>
        ) : null}
        {secondaryLabel ? (
          <AppButton variant="secondary" onClick={onSecondary}>
            {secondaryLabel}
          </AppButton>
        ) : null}
      </div>
    </div>
  )
}
