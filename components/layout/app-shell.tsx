import * as React from "react"
import Sidebar from "@/components/layout/sidebar"
import Topbar from "@/components/layout/topbar"
import PageTransition from "@/components/motion/page-transition"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="app-content">
          <div className="page-container">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>
    </div>
  )
}
