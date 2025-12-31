import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type AppInputProps = React.ComponentProps<typeof Input> & {
  label?: string
  description?: string
  errorMessage?: string
}

export function AppInput({
  label,
  description,
  errorMessage,
  className,
  id,
  ...props
}: AppInputProps) {
  const inputId = React.useId()
  const resolvedId = id ?? inputId

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={resolvedId} className="text-label">
          {label}
        </label>
      ) : null}
      <Input
        id={resolvedId}
        aria-invalid={Boolean(errorMessage)}
        className={cn(
          "input-control focus-ring focus-visible:ring-0 focus-visible:ring-offset-0",
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
