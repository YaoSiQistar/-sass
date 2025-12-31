"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Filter,
  Flame,
  Info,
  LayoutGrid,
  Plus,
} from "lucide-react"

import { AppButton } from "@/components/shared/app-button"
import { AppInput } from "@/components/shared/app-input"
import { AppSelect } from "@/components/shared/app-select"
import { AppTextarea } from "@/components/shared/app-textarea"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { DataTableShell } from "@/components/shared/data-table-shell"
import { DrawerShell } from "@/components/shared/drawer-shell"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { KpiCard } from "@/components/shared/kpi-card"
import { PageHeader } from "@/components/shared/page-header"
import { Surface } from "@/components/shared/surface"
import { Toolbar } from "@/components/shared/toolbar"
import { SkeletonCard } from "@/components/shared/skeletons/skeleton-card"
import { SkeletonDrawer } from "@/components/shared/skeletons/skeleton-drawer"
import { SkeletonTable } from "@/components/shared/skeletons/skeleton-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const sampleOptions = [
  { value: "boss", label: "Boss 直聘", hint: "职位抓取源" },
  { value: "lagou", label: "拉勾", hint: "互联网岗位" },
  { value: "referral", label: "内推", hint: "熟人推荐" },
]

export default function StyleGuidePage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <div className="space-y-10 pb-10">
      <PageHeader
        title="风格系统"
        description="Brand Blue / Light Rim / Micro Texture 统一驱动全站质感。"
        actions={
          <div className="flex items-center gap-2">
            <AppButton variant="secondary">查看规范</AppButton>
            <AppButton>提交反馈</AppButton>
          </div>
        }
      />

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Overview</h2>
          <p className="text-body">
            视觉指纹由品牌蓝、光沿层级与微材质组成，保证系统级一致性与高级感。
          </p>
        </div>
        <Surface className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <span className="text-label">Brand Blue</span>
              <p className="text-caption">
                低饱和墨蓝，只用于聚焦、强调与关键状态。
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-label">Light Rim</span>
              <p className="text-caption">
                通过上缘高光建立层级，避免厚边框。
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-label">Micro Texture</span>
              <p className="text-caption">
                仅用于大面积背景，增加空气感。
              </p>
            </div>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Colors</h2>
          <p className="text-body">
            全部颜色来自 tokens，禁止组件内硬编码。
          </p>
        </div>
        <Surface className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="h-12 rounded-lg border border-border bg-background" />
              <span className="text-caption">background</span>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg border border-border bg-card" />
              <span className="text-caption">card</span>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg border border-border bg-popover" />
              <span className="text-caption">popover</span>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg border border-border bg-muted" />
              <span className="text-caption">muted</span>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-brand" />
              <span className="text-caption">brand</span>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-brand-soft" />
              <span className="text-caption">brand-soft</span>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-success" />
              <span className="text-caption">success</span>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-warning" />
              <span className="text-caption">warning</span>
            </div>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Typography</h2>
          <p className="text-body">统一的字号与行高让信息密度可控。</p>
        </div>
        <Surface className="p-6 space-y-4">
          <div className="space-y-2">
            <span className="text-page-title">页面标题 / Applications</span>
            <span className="text-section-title">模块标题 / Timeline</span>
            <p className="text-body">
              正文文本用于表格、详情与说明，保持 1.6 行高。
            </p>
            <span className="text-caption">辅助说明 / Caption</span>
            <span className="text-label">表单标签 / Label</span>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Density & Layout</h2>
          <p className="text-body">
            页面与表格采用 8px 网格，保持专业密度。
          </p>
        </div>
        <Surface className="p-6 space-y-4">
          <Toolbar>
            <div className="flex items-center gap-2">
              <AppInput placeholder="搜索公司或岗位" />
              <AppButton variant="secondary" size="sm">
                <Filter className="size-4" />
                筛选
              </AppButton>
            </div>
            <div className="flex items-center gap-2">
              <AppButton variant="secondary" size="sm">
                导出
              </AppButton>
              <AppButton size="sm">
                <Plus className="size-4" />
                新增
              </AppButton>
            </div>
          </Toolbar>
          <div className="app-divider" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="section-card">
              <span className="text-caption">卡片 padding 16</span>
            </div>
            <div className="section-card">
              <span className="text-caption">抽屉与表单统一密度</span>
            </div>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Elevation & Rim</h2>
          <p className="text-body">
            Surface / Popover / Overlay 通过 rim 与阴影拉开层级。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="surface-card rim-surface p-4">
            <p className="text-caption">Surface</p>
          </div>
          <div className="surface-popover rim-popover p-4">
            <p className="text-caption">Popover</p>
          </div>
          <div className="surface-popover rim-overlay p-4">
            <p className="text-caption">Overlay</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Components</h2>
          <p className="text-body">所有控件统一高度、focus ring 与密度。</p>
        </div>
        <Surface className="p-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            <AppButton>主要操作</AppButton>
            <AppButton variant="secondary">次级操作</AppButton>
            <AppButton variant="ghost">幽灵按钮</AppButton>
            <AppButton variant="outline">描边按钮</AppButton>
            <AppButton variant="destructive">危险操作</AppButton>
            <AppButton loading>加载中</AppButton>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AppInput
              label="公司名称"
              placeholder="输入公司"
              description="用于快速识别来源"
            />
            <AppInput
              label="投递状态"
              placeholder="输入状态"
              errorMessage="状态不能为空"
            />
            <AppSelect label="渠道" placeholder="请选择" options={sampleOptions} />
            <AppTextarea
              label="备注"
              placeholder="记录关键沟通"
              description="支持多行输入"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <span className="text-label">Checkbox / Radio / Switch</span>
              <div className="flex items-center gap-3">
                <Checkbox id="check-a" />
                <label htmlFor="check-a" className="text-body">
                  批量选择
                </label>
              </div>
              <RadioGroup defaultValue="a" className="space-y-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="a" id="radio-a" />
                  <label htmlFor="radio-a" className="text-body">
                    公开
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="b" id="radio-b" />
                  <label htmlFor="radio-b" className="text-body">
                    私密
                  </label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-2">
                <Switch id="switch-a" />
                <label htmlFor="switch-a" className="text-body">
                  自动转入投递
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-label">Badge / Tabs</span>
              <div className="flex flex-wrap gap-2">
                <Badge className="badge-soft">默认</Badge>
                <Badge className="badge-brand">主强调</Badge>
                <Badge className="badge-success">通过</Badge>
                <Badge className="badge-warning">待跟进</Badge>
                <Badge className="badge-danger">拒绝</Badge>
              </div>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-muted/60">
                  <TabsTrigger value="overview">概览</TabsTrigger>
                  <TabsTrigger value="timeline">时间线</TabsTrigger>
                  <TabsTrigger value="tasks">任务</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-4 text-caption">
                  统一 tabs 指示线，避免大色块。
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <span className="text-label">Tooltip / Popover / Dropdown</span>
              <div className="flex flex-wrap items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AppButton variant="ghost" size="sm">
                      <Info className="size-4" />
                      指标口径
                    </AppButton>
                  </TooltipTrigger>
                  <TooltipContent>按投递 cohort 统计</TooltipContent>
                </Tooltip>
                <Popover>
                  <PopoverTrigger asChild>
                    <AppButton variant="secondary" size="sm">
                      过滤条件
                      <ChevronDown className="size-4" />
                    </AppButton>
                  </PopoverTrigger>
                  <PopoverContent className="surface-popover rim-popover w-64">
                    <div className="space-y-2">
                      <span className="text-label">常用筛选</span>
                      <AppInput placeholder="城市" />
                      <AppInput placeholder="状态" />
                    </div>
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <AppButton variant="ghost" size="sm">
                      更多操作
                      <ChevronDown className="size-4" />
                    </AppButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="surface-popover rim-popover">
                    <DropdownMenuLabel>快捷操作</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>复制链接</DropdownMenuItem>
                    <DropdownMenuItem>标记完成</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-label">Dialog / Drawer / Toast</span>
              <div className="flex flex-wrap gap-2">
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setDialogOpen(true)}
                >
                  打开对话框
                </AppButton>
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setDrawerOpen(true)}
                >
                  打开抽屉
                </AppButton>
                <AppButton
                  size="sm"
                  onClick={() =>
                    toast.success("已更新投递状态", {
                      action: {
                        label: "撤销",
                        onClick: () => toast("已撤销变更"),
                      },
                    })
                  }
                >
                  触发 Toast
                </AppButton>
              </div>
            </div>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="surface-popover rim-popover">
              <DialogHeader>
                <DialogTitle>确认操作</DialogTitle>
                <DialogDescription>
                  对话框采用统一 rim 与阴影，避免重边框。
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setDialogOpen(false)}
                >
                  取消
                </AppButton>
                <AppButton size="sm">确认</AppButton>
              </div>
            </DialogContent>
          </Dialog>

          <DrawerShell
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            title="详情抽屉"
            description="统一 header/body/footer 结构"
            footer={
              <div className="flex justify-end gap-2">
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setDrawerOpen(false)}
                >
                  取消
                </AppButton>
                <AppButton size="sm">保存</AppButton>
              </div>
            }
          >
            <div className="space-y-4">
              <AppInput label="公司" placeholder="输入公司" />
              <AppInput label="岗位" placeholder="输入岗位" />
              <AppTextarea label="备注" placeholder="记录关键细节" />
            </div>
          </DrawerShell>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Patterns</h2>
          <p className="text-body">常用业务模式保持结构一致。</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <EmptyState
            title="还没有投递记录"
            description="安装插件或导入 CSV 开始建立你的投递漏斗。"
            icon={<LayoutGrid className="size-5" />}
            actionLabel="安装插件"
            secondaryLabel="导入 CSV"
          />
          <ErrorState
            title="加载失败"
            description="网络异常，请稍后重试。"
            errorId="ERR-2025-001"
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <SkeletonTable />
          <SkeletonDrawer />
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">DataTable Shell</h2>
          <p className="text-body">表格密度、hover 与选中统一。</p>
        </div>
        <DataTableShell
          title="投递列表"
          toolbar={
            <div className="flex items-center gap-2">
              <AppButton variant="ghost" size="sm">
                批量操作
              </AppButton>
              <AppButton size="sm">
                <Plus className="size-4" />
                新建
              </AppButton>
            </div>
          }
        >
          <Table>
            <TableHeader>
              <TableRow className="text-xs text-muted-foreground">
                <TableHead className="w-10">
                  <Checkbox />
                </TableHead>
                <TableHead>公司</TableHead>
                <TableHead>岗位</TableHead>
                <TableHead>城市</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">更新时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((row) => (
                <TableRow
                  key={row}
                  className={row === 2 ? "bg-brand-soft" : ""}
                >
                  <TableCell>
                  <Checkbox defaultChecked={row === 2} />
                  </TableCell>
                  <TableCell>星河科技</TableCell>
                  <TableCell>前端工程师</TableCell>
                  <TableCell>上海</TableCell>
                  <TableCell>
                    <Badge className="badge-brand">已投递</Badge>
                  </TableCell>
                  <TableCell className="text-right text-caption">
                    2 小时前
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DataTableShell>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">KPI Cards</h2>
          <p className="text-body">用于 ROI 顶部指标区域。</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard title="投递数" value="128" hint="样本量 n=128" />
          <KpiCard title="约面率" value="18%" hint="按投递 cohort" />
          <KpiCard title="Offer" value="6" hint="OFFER / 投递" />
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Design QA Checklist</h2>
          <p className="text-body">系统性自检，用于验收一致性。</p>
        </div>
        <Surface className="p-6">
          <ul className="space-y-2 text-body">
            <li>所有颜色均来自 CSS variables</li>
            <li>focus ring 内圈品牌蓝 + 外圈柔光</li>
            <li>rim 统一用于 surface/popover/drawer/toast</li>
            <li>表格密度与 hover/selected 一致</li>
            <li>空态/错误态/骨架样式统一</li>
          </ul>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Confirm Dialog</h2>
          <p className="text-body">确认弹窗用于高风险操作。</p>
        </div>
        <ConfirmDialog
          title="确认撤销 Token"
          description="撤销后插件将立即失效，需要重新生成。"
          confirmLabel="确认撤销"
          destructive
          trigger={<AppButton variant="destructive">撤销 Token</AppButton>}
          onConfirm={() => toast("已撤销")}
        />
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Status Tags</h2>
          <p className="text-body">轻量语义提示，避免大面积色块。</p>
        </div>
        <Surface className="p-6">
          <div className="flex flex-wrap gap-2">
            <Badge className="badge-brand">
              <CheckCircle2 className="size-3" />
              已投递
            </Badge>
            <Badge className="badge-warning">
              <Flame className="size-3" />
              待跟进
            </Badge>
            <Badge className="badge-danger">
              <AlertTriangle className="size-3" />
              已拒绝
            </Badge>
            <Badge className="badge-soft">
              <Calendar className="size-3" />
              计划面试
            </Badge>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-section-title">Inline Controls</h2>
          <p className="text-body">用于详情页快速编辑的状态。</p>
        </div>
        <Surface className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <AppButton variant="secondary" size="sm">
              编辑字段
              <ArrowRight className="size-4" />
            </AppButton>
            <AppInput placeholder="可编辑字段" className="max-w-[220px]" />
          </div>
        </Surface>
      </section>
    </div>
  )
}
