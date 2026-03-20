"use client"

import { AppShell } from "@/components/app-shell"

export default function Velocity2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell>
      <div className="min-h-screen bg-white">
        {children}
      </div>
    </AppShell>
  )
}
