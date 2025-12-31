"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Boxes,
  LayoutGrid,
  ListOrdered,
  ListTodo,
  Mailbox,
  Settings,
  Sparkles,
  Table,
} from "lucide-react"

import { cn } from "@/lib/utils"

const navGroups = [
  {
    title: "工作流",
    items: [
      { label: "线索箱", href: "/clips", icon: Mailbox },
      { label: "投递管理", href: "/applications", icon: Table },
      { label: "看板", href: "/board", icon: LayoutGrid },
      { label: "任务", href: "/tasks", icon: ListTodo },
    ],
  },
  {
    title: "洞察",
    items: [{ label: "渠道 ROI", href: "/insights/roi", icon: BarChart3 }],
  },
  {
    title: "系统",
    items: [
      { label: "数据中心", href: "/data", icon: Boxes },
      { label: "风格系统", href: "/style-guide", icon: Sparkles },
      { label: "动效实验室", href: "/motion-lab", icon: ListOrdered },
      { label: "设置", href: "/settings", icon: Settings },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="border-r border-border bg-surface-1 px-4 py-6">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-brand-soft text-sm font-semibold text-brand-ink">
          JT
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text-1">
            投递管理
          </span>
          <span className="text-caption">极简求职工作台</span>
        </div>
      </div>
      <nav className="space-y-6">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <div className="px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {group.title}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "focus-ring flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors",
                      "hover:bg-muted/60",
                      isActive && "nav-active"
                    )}
                  >
                    <Icon className="size-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
              )}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
