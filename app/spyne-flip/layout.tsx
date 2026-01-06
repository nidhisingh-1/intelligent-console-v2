"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { 
  Activity,
  LayoutDashboard, 
  Layers, 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  Building2,
  TrendingUp,
  Download,
  Trophy,
  Target,
  Calendar
} from "lucide-react"

const navItems = [
  { href: '/spyne-flip', label: 'Overview', icon: LayoutDashboard },
  { href: '/spyne-flip/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/spyne-flip/funnel', label: 'Demo Funnel', icon: Layers },
  { href: '/spyne-flip/dealers', label: 'Dealers', icon: Building2 },
  { href: '/spyne-flip/coverage', label: 'Coverage', icon: Target },
  { href: '/spyne-flip/usage', label: 'Usage', icon: Users },
  { href: '/spyne-flip/vini', label: 'VINI', icon: MessageSquare },
  { href: '/spyne-flip/errors', label: 'Errors', icon: AlertTriangle },
  { href: '/spyne-flip/trends', label: 'Trends', icon: TrendingUp },
  { href: '/spyne-flip/health', label: 'Health', icon: Activity },
  { href: '/spyne-flip/export', label: 'Export', icon: Download },
]

export default function SpyneFlipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [dateRange, setDateRange] = React.useState('7d')

  return (
    <AppShell>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50">
          <div className="px-6 py-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h1 className="text-2xl font-bold">Spyne Flip Analytics</h1>
                </div>
                <p className="text-muted-foreground">
                  Chrome plugin usage, demo performance, and system health tracking
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[140px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-b bg-background sticky top-0 z-10">
          <div className="px-6">
            <nav className="flex gap-1 overflow-x-auto py-2 -mb-px">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || 
                  (item.href !== '/spyne-flip' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                      isActive 
                        ? "bg-violet-100 text-violet-700" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {children}
        </div>

        {/* Footer */}
        <footer className="border-t px-6 py-4 mt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Spyne Flip Dashboard v1.0</p>
            <p>Data refreshed every 5 minutes • Last sync: {new Date().toLocaleTimeString()}</p>
          </div>
        </footer>
      </div>
    </AppShell>
  )
}

