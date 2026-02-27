"use client"

import * as React from "react"
import { AppShell } from "@/components/app-shell"

export default function ROILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell>
      <div className="min-h-screen bg-gray-50/50">
        {children}
      </div>
    </AppShell>
  )
}
