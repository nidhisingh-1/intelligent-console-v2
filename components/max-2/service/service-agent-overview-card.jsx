"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import InfoTooltip from "@/components/max-2/sales/console-v2/components/InfoTooltip"

const SECTION_LABEL = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "var(--spyne-text-muted)",
  marginBottom: 8,
}

export default function ServiceAgentOverviewCard({ agent }) {
  const { name, role, photo, status, yesterdaySnapshot, performance } = agent
  const [imgError, setImgError] = useState(false)

  return (
    <div className="spyne-card spyne-animate-fade-in flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        {photo && !imgError ? (
          <img
            src={photo}
            alt={name}
            onError={() => setImgError(true)}
            className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
            style={{ border: "2px solid var(--spyne-border)" }}
          />
        ) : (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold"
            style={{
              background: "var(--spyne-brand-subtle)",
              color: "var(--spyne-brand)",
              border: "2px solid var(--spyne-brand-muted)",
            }}
          >
            {name.charAt(0)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="spyne-label" style={{ color: "var(--spyne-text-primary)", fontWeight: 700 }}>
              {name}
            </span>
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: status === "online" ? "var(--spyne-success)" : "var(--spyne-text-muted)" }}
            />
            <InfoTooltip text="Vini AI summary for service drive activity for the selected period: appointments, follow-ups, and after-hours coverage." />
          </div>
          <div className="spyne-caption mt-0.5" style={{ color: "var(--spyne-text-muted)" }}>
            {role}
          </div>
        </div>
      </div>

      <div>
        <div style={SECTION_LABEL}>Today</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <PerfStat value={yesterdaySnapshot.appointmentsBooked} label="Appts yesterday" />
          <PerfStat value={yesterdaySnapshot.activeFollowUpLeads} label="Active follow-ups" accent />
          <PerfStat value={performance.afterHours.leadsEngaged} label="After-hrs handled" />
          <PerfStat value={performance.afterHours.apptsBooked} label="After-hrs appts" accent />
        </div>
      </div>

      <button type="button" className="mt-auto flex cursor-pointer items-center gap-1" style={{ background: "none", border: "none", padding: 0 }}>
        <span className="spyne-label" style={{ color: "var(--spyne-brand)", fontWeight: 600 }}>
          View full performance
        </span>
        <ArrowRight size={11} style={{ color: "var(--spyne-brand)" }} />
      </button>
    </div>
  )
}

function PerfStat({ value, label, accent }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="spyne-number"
        style={{
          fontSize: 18,
          lineHeight: 1.1,
          color: accent ? "var(--spyne-brand)" : "var(--spyne-text-primary)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
      <span className="spyne-caption" style={{ color: "var(--spyne-text-muted)", lineHeight: 1.3 }}>
        {label}
      </span>
    </div>
  )
}
