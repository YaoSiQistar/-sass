import * as React from "react"

import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("page-header", className)}>
      <div className="page-header-stack">
        <h1 className="text-page-title">{title}</h1>
        {description ? <p className="text-caption">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}
