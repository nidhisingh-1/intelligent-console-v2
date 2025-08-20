"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, BarChart3, Settings, Search, Menu, Moon, Sun, User, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { CommandPalette } from "./command-palette"
import { DateRangePicker } from "./filters/date-range-picker"
import { QuickFilters } from "./filters/quick-filters"
import { MultiSelect, type Option } from "./ui/multi-select"
// import { useInitializeFilters } from "@/lib/uiState"

const navigation = [
  {
    name: "Review Calls",
    href: "/review",
    icon: ClipboardList,
    description: "Call review dashboard",
  },
  {
    name: "Enum Management",
    href: "/enums",
    icon: Settings,
    description: "Manage QA enums catalog",
  },
]

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // useInitializeFilters()

  // Global keyboard shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("flex flex-col", mobile ? "h-full" : "h-screen")}>
      {/* Empty sidebar - navigation moved to top header */}
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - Hidden since navigation moved to top header */}
      <div className="hidden lg:block">
        {/* Sidebar removed - navigation now in top header */}
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex flex-col bg-card">
          {/* Main Header Row */}
          <div className="flex h-16 items-center gap-4 px-6">
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 px-6">
            <nav className="flex">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2",
                      "hover:text-[#6825d8] hover:border-[#6825d8]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive 
                        ? "text-[#6825d8] border-[#6825d8]" 
                        : "text-muted-foreground border-transparent"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
