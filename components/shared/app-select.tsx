import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type AppSelectOption = { value: string; label: string; hint?: string }

type AppSelectProps = {
  label?: string
  placeholder?: string
  options: AppSelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  errorMessage?: string
  className?: string
}

export function AppSelect({
  label,
  placeholder,
  options,
  value,
  onValueChange,
  errorMessage,
  className,
}: AppSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label ? <span className="text-label">{label}</span> : null}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            "input-control focus-ring focus-visible:ring-0 focus-visible:ring-offset-0 flex w-full items-center justify-between",
            errorMessage && "border-destructive",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="surface-popover rim-popover">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex flex-col">
                <span>{option.label}</span>
                {option.hint ? (
                  <span className="text-caption">{option.hint}</span>
                ) : null}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorMessage ? (
        <span className="text-caption text-destructive">{errorMessage}</span>
      ) : null}
    </div>
  )
}
