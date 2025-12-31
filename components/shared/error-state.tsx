import * as React from "react"

import { AppButton } from "@/components/shared/app-button"
import { cn } from "@/lib/utils"

type ErrorStateProps = {
  title: string
  description?: string
  errorId?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title,
  description,
  errorId,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "section-card rim-surface elev-surface flex flex-col gap-3 px-6 py-8",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-section-title text-text-1">{title}</p>
        {description ? <p className="text-caption">{description}</p> : null}
      </div>
      {errorId ? (
        <div className="rounded-md border border-border bg-muted px-3 py-2 text-caption text-text-3">
          错误编号：{errorId}
        </div>
      ) : null}
      <div>
        <AppButton variant="secondary" onClick={onRetry}>
          重新加载
        </AppButton>
      </div>
    </div>
  )
}
