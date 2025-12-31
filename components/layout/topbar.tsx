"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { Command, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { AppButton } from "@/components/shared/app-button"
import { Kbd } from "@/components/ui/kbd"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const titleMap: Record<string, { title: string; description?: string }> = {
  "/": { title: "风格系统", description: "视觉与交互基础层" },
  "/style-guide": { title: "风格系统", description: "设计系统校验页" },
  "/motion-lab": { title: "动效实验室", description: "全站动效演示" },
  "/applications": { title: "投递管理", description: "列表与流程推进" },
  "/clips": { title: "线索箱", description: "采集线索与清洗" },
  "/board": { title: "看板", description: "流程拖拽视图" },
  "/insights/roi": { title: "渠道 ROI", description: "投递效果分析" },
  "/tasks": { title: "任务", description: "待办与提醒" },
  "/data": { title: "数据中心", description: "导入导出与演示" },
  "/settings": { title: "设置", description: "账户与扩展" },
}

export default function Topbar() {
  const pathname = usePathname()
  const header = useMemo(() => {
    return titleMap[pathname] ?? {
      title: "工作台",
      description: "结构与视觉基线",
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="page-container flex h-14 items-center justify-between gap-6 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-text-1">
            {header.title}
          </span>
          {header.description ? (
            <span className="text-caption">{header.description}</span>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <AppButton
            variant="ghost"
            size="sm"
            className={cn("h-9 px-3 text-text-2")}
          >
            <Command className="size-4" />
            <span>全局搜索</span>
            <Kbd className="ml-2">Cmd+K</Kbd>
          </AppButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus-ring flex items-center gap-2 rounded-full border border-border bg-surface-1 px-2 py-1 text-sm text-text-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  TJ
                </span>
                <span>天睿</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                个人信息
              </DropdownMenuItem>
              <DropdownMenuItem>偏好设置</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
