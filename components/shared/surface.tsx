import * as React from "react"

import { cn } from "@/lib/utils"

type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "surface" | "popover" | "overlay"
}

export function Surface({
  tone = "surface",
  className,
  ...props
}: SurfaceProps) {
  const toneClass =
    tone === "overlay"
      ? "surface-popover rim-overlay"
      : tone === "popover"
        ? "surface-popover rim-popover"
        : "surface-card rim-surface"

  return <div className={cn(toneClass, className)} {...props} />
}
