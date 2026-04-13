"use client"

import { spyneComponentClasses } from "@/lib/design-system/max-2"
import { cn } from "@/lib/utils"
import InfoTooltip from "@/components/max-2/sales/console-v2/components/InfoTooltip"

export type ServiceTopIntentRow = {
  intent: string
  calls: number
  resolved: number
  appts: number
  ratePct: number
  tone: "success" | "primary" | "warning"
}

const rateToneClass: Record<ServiceTopIntentRow["tone"], string> = {
  success: "text-spyne-success font-semibold",
  primary: "text-spyne-primary font-semibold",
  warning: "text-[var(--spyne-warning-ink)] font-semibold",
}

export function ServiceTopIntentsTable({
  rows,
  className,
}: {
  rows: ServiceTopIntentRow[]
  className?: string
}) {
  return (
    <div className={cn("spyne-card flex h-full min-h-0 flex-col p-4", className)}>
      <div className="mb-4 flex items-center gap-1.5">
        <h3 className={cn(spyneComponentClasses.cardTitle, "m-0")}>Top Intents by Resolution Rate</h3>
        <InfoTooltip text="Inbound call intents ranked by how often Mark resolves the request on the first touch, with appointment volume for each intent." />
      </div>
      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left">
          <thead>
            <tr className="border-b border-spyne-border">
              <th className="spyne-caption pb-2 pr-3 font-semibold uppercase tracking-wide text-spyne-text-secondary">
                Intent
              </th>
              <th className="spyne-caption pb-2 pr-3 text-center font-semibold uppercase tracking-wide text-spyne-text-secondary">
                Calls
              </th>
              <th className="spyne-caption pb-2 pr-3 text-center font-semibold uppercase tracking-wide text-spyne-text-secondary">
                Resolved
              </th>
              <th className="spyne-caption pb-2 pr-3 text-center font-semibold uppercase tracking-wide text-spyne-text-secondary">
                Appts
              </th>
              <th className="spyne-caption pb-2 text-right font-semibold uppercase tracking-wide text-spyne-text-secondary">
                Resolution rate
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.intent}
                className={cn("border-b border-spyne-border last:border-b-0", i % 2 === 1 ? "bg-muted/20" : "")}
              >
                <td className="spyne-body py-3 pr-3 font-medium text-spyne-text-primary">{row.intent}</td>
                <td className="spyne-body py-3 pr-3 text-center tabular-nums text-spyne-text-primary">
                  {row.calls}
                </td>
                <td className="spyne-body py-3 pr-3 text-center tabular-nums text-spyne-text-primary">
                  {row.resolved}
                </td>
                <td className="spyne-body py-3 pr-3 text-center tabular-nums text-spyne-text-primary">
                  {row.appts}
                </td>
                <td className={cn("spyne-body py-3 text-right tabular-nums", rateToneClass[row.tone])}>
                  {row.ratePct}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
