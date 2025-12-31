"use client"

import * as React from "react"
import { AnimatePresence } from "motion/react"
import { ChevronDown, Layers, LayoutGrid, ListOrdered, MousePointer2, Sparkles } from "lucide-react"

import { AppButton } from "@/components/shared/app-button"
import { AppInput } from "@/components/shared/app-input"
import { PageHeader } from "@/components/shared/page-header"
import { Surface } from "@/components/shared/surface"
import { Toolbar } from "@/components/shared/toolbar"
import { MotionFadeSlide } from "@/components/motion/fade-slide"
import {
  MotionDialog,
  MotionDialogContent,
  MotionDialogDescription,
  MotionDialogHeader,
  MotionDialogTitle,
  MotionDialogTrigger,
} from "@/components/motion/motion-dialog"
import {
  MotionDrawer,
  MotionDrawerContent,
  MotionDrawerDescription,
  MotionDrawerHeader,
  MotionDrawerTitle,
  MotionDrawerTrigger,
} from "@/components/motion/motion-drawer"
import {
  MotionDropdown,
  MotionDropdownItem,
  MotionDropdownLabel,
  MotionDropdownSeparator,
  MotionPopover,
  MotionTooltip,
} from "@/components/motion/motion-popover"
import { MotionList } from "@/components/motion/motion-list"
import { MotionToastProvider, useMotionToast } from "@/components/motion/motion-toast"
import { useMotionSettings } from "@/components/motion/motion-provider"

const smallList = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `待办事项 ${i + 1}`,
  detail: "轻量动画仅用于小集合",
}))

const largeList = Array.from({ length: 120 }).map((_, i) => ({
  id: i,
  title: `演示条目 ${i + 1}`,
  detail: "大列表仅容器级淡入",
}))

function MotionLabContent() {
  const { reducedMotion, setReducedMotion } = useMotionSettings()
  const [isLarge, setIsLarge] = React.useState(false)
  const [tab, setTab] = React.useState("overview")
  const { pushToast } = useMotionToast()

  return (
    <div className="space-y-10 pb-10">
      <PageHeader
        title="动效实验室"
        description="明显但克制的动效系统，支持 reduced-motion 与性能降级。"
        actions={
          <div className="flex items-center gap-2">
            <AppButton
              variant={reducedMotion ? "secondary" : "primary"}
              onClick={() => setReducedMotion(!reducedMotion)}
            >
              {reducedMotion ? "已开启减少动效" : "模拟减少动效"}
            </AppButton>
            <AppButton variant="secondary" onClick={() => setIsLarge(!isLarge)}>
              {isLarge ? "切回小列表" : "切换大列表"}
            </AppButton>
          </div>
        }
      />

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Page & FadeSlide</h2>
          <p className="text-body">页面切换与模块出现使用轻量位移。</p>
        </div>
        <Surface className="p-6">
          <MotionFadeSlide>
            <div className="flex items-center gap-3 text-body">
              <Sparkles className="size-4" />
              这是一个通用 FadeSlide 模块，适用于区块出现。
            </div>
          </MotionFadeSlide>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Dialog / Drawer</h2>
          <p className="text-body">浮层进入/退出采用淡入+轻位移，退出更快。</p>
        </div>
        <Surface className="p-6">
          <div className="flex flex-wrap gap-3">
            <MotionDialog>
              <MotionDialogTrigger asChild>
                <AppButton>打开 Dialog</AppButton>
              </MotionDialogTrigger>
              <MotionDialogContent>
                <MotionDialogHeader>
                  <MotionDialogTitle>确认操作</MotionDialogTitle>
                  <MotionDialogDescription>
                    动效节奏克制，不影响 focus trap。
                  </MotionDialogDescription>
                </MotionDialogHeader>
                <div className="flex justify-end gap-2">
                  <AppButton variant="secondary" size="sm">
                    取消
                  </AppButton>
                  <AppButton size="sm">确认</AppButton>
                </div>
              </MotionDialogContent>
            </MotionDialog>

            <MotionDrawer>
              <MotionDrawerTrigger asChild>
                <AppButton variant="secondary">打开 Drawer</AppButton>
              </MotionDrawerTrigger>
              <MotionDrawerContent>
                <MotionDrawerHeader>
                  <MotionDrawerTitle>详情抽屉</MotionDrawerTitle>
                  <MotionDrawerDescription>
                    右侧滑入，遮罩淡入。
                  </MotionDrawerDescription>
                </MotionDrawerHeader>
                <div className="flex-1 space-y-4 px-5 py-5">
                  <AppInput label="公司" placeholder="输入公司" />
                  <AppInput label="岗位" placeholder="输入岗位" />
                  <AppInput label="城市" placeholder="输入城市" />
                </div>
                <div className="border-t border-border px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <AppButton variant="secondary" size="sm">
                      取消
                    </AppButton>
                    <AppButton size="sm">保存</AppButton>
                  </div>
                </div>
              </MotionDrawerContent>
            </MotionDrawer>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Popover / Dropdown / Tooltip</h2>
          <p className="text-body">小位移 + 快速淡入，保持利落。</p>
        </div>
        <Surface className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <MotionPopover
              trigger={<AppButton variant="secondary">筛选条件</AppButton>}
            >
              <div className="space-y-2">
                <span className="text-label">筛选条件</span>
                <AppInput placeholder="城市" />
                <AppInput placeholder="状态" />
              </div>
            </MotionPopover>

            <MotionDropdown
              trigger={
                <AppButton variant="ghost">
                  更多操作
                  <ChevronDown className="size-4" />
                </AppButton>
              }
            >
              <MotionDropdownLabel>快捷操作</MotionDropdownLabel>
              <MotionDropdownSeparator />
              <MotionDropdownItem>复制链接</MotionDropdownItem>
              <MotionDropdownItem>标记完成</MotionDropdownItem>
            </MotionDropdown>

            <MotionTooltip
              trigger={<AppButton variant="secondary">口径说明</AppButton>}
              content="按投递 cohort 统计"
            />
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Tabs Content</h2>
          <p className="text-body">内容切换淡入 + 小位移。</p>
        </div>
        <Surface className="p-6">
          <div className="flex items-center gap-2">
            {(["overview", "timeline", "tasks"] as const).map((item) => (
              <AppButton
                key={item}
                size="sm"
                variant={tab === item ? "primary" : "secondary"}
                onClick={() => setTab(item)}
              >
                {item}
              </AppButton>
            ))}
          </div>
          <div className="mt-4">
            <AnimatePresence mode="wait">
              <MotionFadeSlide key={tab}>
                <div className="section-card flex items-center gap-3">
                  <Layers className="size-4" />
                  <span className="text-body">当前 Tab：{tab}</span>
                </div>
              </MotionFadeSlide>
            </AnimatePresence>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">List & Performance</h2>
          <p className="text-body">
            小列表启用 layout 动画，大列表只容器淡入。
          </p>
        </div>
        <Surface className="p-6">
          <Toolbar>
            <div className="flex items-center gap-2">
              <MousePointer2 className="size-4 text-text-3" />
              <span className="text-caption">
                {isLarge ? "大列表模式" : "小列表模式"}
              </span>
            </div>
            <AppButton variant="secondary" size="sm" onClick={() => setIsLarge(!isLarge)}>
              切换列表大小
            </AppButton>
          </Toolbar>
          <div className="mt-4">
            <MotionList
              items={isLarge ? largeList : smallList}
              renderItem={(item) => (
                <div className="section-card flex items-center justify-between">
                  <div>
                    <div className="text-body font-medium text-text-1">
                      {item.title}
                    </div>
                    <div className="text-caption">{item.detail}</div>
                  </div>
                  <AppButton size="sm" variant="ghost">
                    操作
                  </AppButton>
                </div>
              )}
            />
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Toast & Inline Feedback</h2>
          <p className="text-body">Toast 轻位移 + 淡入，退出更快。</p>
        </div>
        <Surface className="p-6">
          <div className="flex flex-wrap gap-2">
            <AppButton
              onClick={() =>
                pushToast({
                  type: "success",
                  message: "投递状态已更新",
                  actionLabel: "撤销",
                })
              }
            >
              Success Toast
            </AppButton>
            <AppButton
              variant="secondary"
              onClick={() =>
                pushToast({
                  type: "error",
                  message: "网络错误，请重试",
                })
              }
            >
              Error Toast
            </AppButton>
            <AppButton
              variant="ghost"
              onClick={() =>
                pushToast({
                  type: "info",
                  message: "列表已刷新",
                })
              }
            >
              Info Toast
            </AppButton>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Drag Feedback Spec</h2>
          <p className="text-body">拖拽时放大 1.01 + shadow-dragging。</p>
        </div>
        <Surface className="p-6">
          <div className="section-card flex items-center gap-3">
            <LayoutGrid className="size-4" />
            <div>
              <div className="text-body font-medium text-text-1">
                看板卡片（拖拽预设）
              </div>
              <div className="text-caption">
                dragging: scale(1.01) + shadow-dragging；drop 使用 spring。
              </div>
            </div>
          </div>
        </Surface>
      </section>
    </div>
  )
}

export default function MotionLabPage() {
  return (
    <MotionToastProvider>
      <MotionLabContent />
    </MotionToastProvider>
  )
}
