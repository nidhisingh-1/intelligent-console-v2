"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { VehicleDetail } from "@/services/inventory/inventory.types"
import { Gauge, Clock, PiggyBank, CheckCircle2, Zap, Users, AlertCircle } from "lucide-react"

interface VelocityCardProps {
  vehicle: VehicleDetail
}

interface StatBlockProps {
  icon: React.ReactNode
  label: string
  value: string
  accent?: string
  highlight?: boolean
  warning?: boolean
}

function StatBlock({ icon, label, value, accent, highlight, warning }: StatBlockProps) {
  return (
    <div className={cn(
      "relative p-3.5 rounded-xl border transition-all",
      warning
        ? "bg-red-50/50 border-red-200"
        : highlight
          ? "bg-emerald-50/50 border-emerald-200"
          : "bg-white border-gray-200"
    )}>
      {highlight && (
        <div className="absolute top-2 right-2">
          <Zap className="h-3.5 w-3.5 text-emerald-500" />
        </div>
      )}
      {warning && (
        <div className="absolute top-2 right-2">
          <AlertCircle className="h-3.5 w-3.5 text-red-500" />
        </div>
      )}
      <div className="flex items-center gap-2 mb-1.5">
        <div className={cn("p-1.5 rounded-md", accent || "bg-gray-100")}>
          {icon}
        </div>
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className={cn(
        "text-lg font-bold tracking-tight",
        warning
          ? "text-red-600"
          : highlight
            ? "text-emerald-700"
            : "text-foreground"
      )}>
        {value}
      </p>
    </div>
  )
}

export function VelocityCard({ vehicle }: VelocityCardProps) {
  const publishedLabel: Record<string, string> = {
    published: "Live",
    pending: "Pending Review",
    draft: "Draft",
  }

  const publishColor: Record<string, string> = {
    published: "text-emerald-600 bg-emerald-50 border-emerald-200",
    pending: "text-amber-600 bg-amber-50 border-amber-200",
    draft: "text-gray-500 bg-gray-50 border-gray-200",
  }

  const timeToFirstLeadWarning =
    vehicle.timeToFirstLead !== null && vehicle.timeToFirstLead > 7

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            Velocity Performance
          </CardTitle>
          <span className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
            publishColor[vehicle.publishStatus]
          )}>
            <CheckCircle2 className="h-3 w-3" />
            {publishedLabel[vehicle.publishStatus]}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2.5">
          <StatBlock
            icon={<Clock className="h-3.5 w-3.5 text-blue-500" />}
            label="Days to Live"
            value={vehicle.daysToLive > 0 ? `${vehicle.daysToLive} days` : "Expired"}
            accent="bg-blue-50"
            warning={vehicle.daysToLive <= 5 && vehicle.daysToLive > 0}
          />
          <StatBlock
            icon={<Users className="h-3.5 w-3.5 text-violet-500" />}
            label="Time to First Lead"
            value={
              vehicle.timeToFirstLead !== null
                ? `${vehicle.timeToFirstLead} days`
                : "No leads yet"
            }
            accent="bg-violet-50"
            warning={timeToFirstLeadWarning}
          />
          <StatBlock
            icon={<Clock className="h-3.5 w-3.5 text-emerald-500" />}
            label="Days Saved"
            value={`${vehicle.daysSaved} days`}
            accent="bg-emerald-50"
            highlight={vehicle.daysSaved > 0}
          />
          <StatBlock
            icon={<PiggyBank className="h-3.5 w-3.5 text-emerald-500" />}
            label="Capital Protected"
            value={`$${vehicle.capitalSaved.toLocaleString()}`}
            accent="bg-emerald-50"
            highlight={vehicle.capitalSaved > 0}
          />
        </div>

        {/* Time to First Lead warning callout */}
        {timeToFirstLeadWarning && (
          <div className="mt-3 p-2.5 rounded-lg bg-red-50 border border-red-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-red-700 leading-relaxed">
                <span className="font-semibold">Lead latency alert:</span> First lead took{" "}
                {vehicle.timeToFirstLead} days. Market average is under 5 days.
                Consider media quality or pricing review.
              </p>
            </div>
          </div>
        )}

        {vehicle.timeToFirstLead === null && vehicle.daysInStock > 7 && (
          <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-amber-700 leading-relaxed">
                <span className="font-semibold">No leads received</span> after {vehicle.daysInStock} days
                in stock. Verify listing quality and syndication status.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
