import type { Metadata } from "next"
import "./globals.css"
import AppShell from "@/components/layout/app-shell"
import { ThemeProvider } from "@/components/system/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { MotionProvider } from "@/components/motion/motion-provider"

export const metadata: Metadata = {
  title: "投递管理 SaaS",
  description: "求职投递管理 SaaS 设计系统",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="app-root antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionProvider>
            <AppShell>{children}</AppShell>
            <Toaster />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
