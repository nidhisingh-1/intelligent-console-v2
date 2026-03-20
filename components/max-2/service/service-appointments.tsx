"use client"

import { mockServiceAppointments } from "@/lib/max-2-mocks"
import type { AppointmentStatus } from "@/services/max-2/max-2.types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Clock, User, Phone, CalendarCheck } from "lucide-react"

const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  "checked-in": { label: "Checked In", className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  "in-progress": { label: "In Progress", className: "bg-violet-500/10 text-violet-600 border-violet-200" },
  completed: { label: "Completed", className: "bg-green-500/10 text-green-700 border-green-200" },
  "no-show": { label: "No-Show", className: "bg-red-500/10 text-red-600 border-red-200" },
  cancelled: { label: "Cancelled", className: "bg-gray-500/10 text-gray-600 border-gray-200" },
}

export function ServiceAppointments() {
  const upcoming = mockServiceAppointments.filter(a => a.status === "confirmed")
  const completed = mockServiceAppointments.filter(a => a.status === "completed")
  const noShows = mockServiceAppointments.filter(a => a.status === "no-show")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Today&apos;s Appointments
            </CardTitle>
            <CardDescription>
              {upcoming.length} upcoming &middot; {completed.length} completed &middot; {noShows.length} no-show
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockServiceAppointments.map((appt) => {
          const status = statusConfig[appt.status]
          return (
            <div
              key={appt.id}
              className={cn(
                "rounded-lg border p-4 space-y-2",
                appt.status === "no-show" && "border-red-200 bg-red-50/30",
                appt.status === "completed" && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-bold text-sm">{appt.scheduledTime}</span>
                    <span className="text-xs text-muted-foreground">({appt.estimatedDuration})</span>
                    {appt.isWaiter && (
                      <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-200">
                        Waiter
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium">{appt.customerName}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {appt.phone}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{appt.vehicle}</p>
                  <p className="text-sm">{appt.serviceType}</p>
                  {appt.notes && (
                    <p className="text-xs text-muted-foreground italic">{appt.notes}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant="outline" className={cn("text-xs", status.className)}>
                    {status.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Advisor: {appt.advisor}</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
