"use client"

import { mockRepairOrders } from "@/lib/max-2-mocks"
import type { ROStatus } from "@/services/max-2/max-2.types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { AlertCircle, Clock } from "lucide-react"

const statusConfig: Record<ROStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  "in-progress": { label: "In Progress", className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  "waiting-parts": { label: "Waiting Parts", className: "bg-amber-500/10 text-amber-600 border-amber-200" },
  "waiting-approval": { label: "Waiting Approval", className: "bg-red-500/10 text-red-600 border-red-200" },
  completed: { label: "Completed", className: "bg-green-500/10 text-green-700 border-green-200" },
  invoiced: { label: "Invoiced", className: "bg-gray-500/10 text-gray-600 border-gray-200" },
}

export function RepairOrdersTable() {
  const activeROs = mockRepairOrders.filter(
    (ro) => ro.status !== "invoiced"
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Repair Orders</CardTitle>
            <CardDescription>
              {activeROs.length} active ROs &middot; {mockRepairOrders.filter(r => r.isWaiter && r.status !== "completed" && r.status !== "invoiced").length} waiters
            </CardDescription>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Today&apos;s labor: <span className="font-semibold text-foreground">${mockRepairOrders.reduce((s, r) => s + r.laborTotal, 0).toLocaleString()}</span>
            </span>
            <span className="text-muted-foreground">
              Parts: <span className="font-semibold text-foreground">${mockRepairOrders.reduce((s, r) => s + r.partsTotal, 0).toLocaleString()}</span>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>RO #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Advisor</TableHead>
              <TableHead>Tech</TableHead>
              <TableHead>Bay</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Promised</TableHead>
              <TableHead className="text-right">Estimate</TableHead>
              <TableHead>Complaints</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRepairOrders.map((ro) => {
              const status = statusConfig[ro.status]
              return (
                <TableRow key={ro.id} className={cn(ro.hasConcern && "bg-red-50/50")}>
                  <TableCell className="font-mono text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      {ro.roNumber}
                      {ro.isWaiter && (
                        <Clock className="h-3 w-3 text-amber-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm">{ro.customerName}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[180px] truncate">
                    {ro.vehicle}
                  </TableCell>
                  <TableCell className="text-xs">{ro.advisor}</TableCell>
                  <TableCell className="text-xs">{ro.technician}</TableCell>
                  <TableCell className="text-xs">{ro.bay ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-xs", status.className)}>
                      {ro.hasConcern && <AlertCircle className="h-3 w-3 mr-1" />}
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{ro.promisedTime}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${ro.totalEstimate.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px]">
                    {ro.complaints.join(", ")}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
