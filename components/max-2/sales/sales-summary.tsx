"use client"

import { mockSalesSummary } from "@/lib/max-2-mocks"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Car, DollarSign, Target, CalendarCheck, TestTube,
  FileText, ArrowLeftRight, Clock,
} from "lucide-react"

const metrics = [
  {
    label: "Units Sold MTD",
    value: (d: typeof mockSalesSummary) => `${d.unitsSoldMTD} / ${d.unitsTarget}`,
    icon: Car,
    color: (d: typeof mockSalesSummary) => d.unitsSoldMTD >= d.unitsTarget * 0.75 ? "text-emerald-600" : "text-amber-600",
    bg: (d: typeof mockSalesSummary) => d.unitsSoldMTD >= d.unitsTarget * 0.75 ? "bg-emerald-50" : "bg-amber-50",
  },
  {
    label: "Total Gross MTD",
    value: (d: typeof mockSalesSummary) => `$${(d.totalGrossMTD / 1000).toFixed(0)}k`,
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Close Rate",
    value: (d: typeof mockSalesSummary) => `${d.closeRate}%`,
    icon: Target,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Appts Today",
    value: (d: typeof mockSalesSummary) => d.appointmentsToday,
    icon: CalendarCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Test Drives",
    value: (d: typeof mockSalesSummary) => d.testDrivesToday,
    icon: TestTube,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Pending Deals",
    value: (d: typeof mockSalesSummary) => d.pendingDeals,
    icon: FileText,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Deals in F&I",
    value: (d: typeof mockSalesSummary) => d.dealsInFI,
    icon: ArrowLeftRight,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Avg Days to Close",
    value: (d: typeof mockSalesSummary) => d.avgDaysToClose,
    icon: Clock,
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
]

export function SalesSummary() {
  const data = mockSalesSummary
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {metrics.map((m) => {
        const Icon = m.icon
        const color = typeof m.color === "function" ? m.color(data) : m.color
        const bg = typeof m.bg === "function" ? m.bg(data) : m.bg
        return (
          <Card key={m.label}>
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className={cn("rounded-full p-2", bg)}>
                <Icon className={cn("h-4 w-4", color)} />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight">{m.value(data)}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
