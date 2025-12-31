import * as React from "react"

import { cn } from "@/lib/utils"

type KpiCardProps = {
  title: string
  value: string
  hint?: string
  className?: string
}

export function KpiCard({ title, value, hint, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "section-card rim-surface elev-surface flex flex-col gap-2",
        className
      )}
    >
      <span className="text-caption">{title}</span>
      <span className="text-2xl font-semibold text-text-1">{value}</span>
      {hint ? <span className="text-caption">{hint}</span> : null}
    </div>
  )
}
