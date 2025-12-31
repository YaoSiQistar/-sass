import * as React from "react"

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type AppTextareaProps = React.ComponentProps<typeof Textarea> & {
  label?: string
  description?: string
  errorMessage?: string
}

export function AppTextarea({
  label,
  description,
  errorMessage,
  className,
  id,
  ...props
}: AppTextareaProps) {
  const inputId = React.useId()
  const resolvedId = id ?? inputId

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={resolvedId} className="text-label">
          {label}
        </label>
      ) : null}
      <Textarea
        id={resolvedId}
        aria-invalid={Boolean(errorMessage)}
        className={cn(
          "focus-ring min-h-[120px] rounded-[10px] border border-input bg-transparent px-3 py-2 text-sm text-text-1 focus-visible:ring-0 focus-visible:ring-offset-0",
          "placeholder:text-text-3",
          errorMessage && "border-destructive",
          className
        )}
        {...props}
      />
      {description ? <span className="text-caption">{description}</span> : null}
      {errorMessage ? (
        <span className="text-caption text-destructive">{errorMessage}</span>
      ) : null}
    </div>
  )
}
