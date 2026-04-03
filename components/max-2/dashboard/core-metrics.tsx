"use client"

import { mockCoreMetrics } from "@/lib/max-2-mocks"
import type { MetricStatus } from "@/services/max-2/max-2.types"
import {
  SpyneRoiKpiMetricCell,
  SpyneRoiKpiStrip,
  type SpyneRoiKpiMetricStatus,
} from "@/components/max-2/spyne-roi-kpi-strip"

const statusToStrip: Record<MetricStatus, SpyneRoiKpiMetricStatus> = {
  above: "good",
  at: "watch",
  below: "bad",
}

function formatValue(value: number, unit: string): string {
  if (unit === "$/day") return `$${value.toFixed(2)}`
  if (unit === "$") return `$${value.toLocaleString()}`
  if (unit === "%") return `${value}%`
  if (unit === "x") return `${value}×`
  if (unit === "days") return `${value}d`
  return value.toLocaleString()
}

function formatTarget(target: number, unit: string): string {
  if (unit === "$/day") return `$${target}`
  if (unit === "$") return `$${target.toLocaleString()}`
  if (unit === "%") return `${target}%`
  if (unit === "x") return `${target}×`
  if (unit === "days") return `${target}d`
  return target.toLocaleString()
}

export function CoreMetrics() {
  return (
    <SpyneRoiKpiStrip gridClassName="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {mockCoreMetrics.map((m) => (
        <SpyneRoiKpiMetricCell
          key={m.id}
          label={m.name}
          value={formatValue(m.value, m.unit)}
          sub={`Target: ${formatTarget(m.target, m.unit)}`}
          status={statusToStrip[m.status]}
        />
      ))}
    </SpyneRoiKpiStrip>
  )
}
