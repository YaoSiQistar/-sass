import { AppButton } from "@/components/shared/app-button"
import { PageHeader } from "@/components/shared/page-header"
import { Surface } from "@/components/shared/surface"

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="视觉系统阶段一"
        description="极简 SaaS 质感的基础层已建立，所有页面统一复用。"
        actions={<AppButton>查看风格指南</AppButton>}
      />
      <Surface className="p-6">
        <div className="space-y-3">
          <h2 className="text-section-title">当前阶段目标</h2>
          <p className="text-body">
            统一品牌蓝、光沿层级与微材质，保证表格、抽屉与表单都具有同一套精确的视觉指纹。
          </p>
        </div>
      </Surface>
    </div>
  )
}
