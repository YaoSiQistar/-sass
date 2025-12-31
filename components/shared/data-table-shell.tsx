import * as React from "react"

import { cn } from "@/lib/utils"

type DataTableShellProps = {
  title?: string
  toolbar?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DataTableShell({
  title,
  toolbar,
  children,
  className,
}: DataTableShellProps) {
  return (
    <div className={cn("table-shell rim-surface elev-surface", className)}>
      {title ? (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-section-title">{title}</span>
          {toolbar}
        </div>
      ) : null}
      {children}
    </div>
  )
}
