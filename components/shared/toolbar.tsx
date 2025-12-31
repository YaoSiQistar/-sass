import * as React from "react"

import { cn } from "@/lib/utils"

type ToolbarProps = React.HTMLAttributes<HTMLDivElement>

export function Toolbar({ className, ...props }: ToolbarProps) {
  return <div className={cn("toolbar", className)} {...props} />
}
