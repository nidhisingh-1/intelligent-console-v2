"use client"

import * as React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { Filters } from "@/lib/types"

export function useUrlSync() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const updateUrl = React.useCallback(
    (filters: Partial<Filters>) => {
      const params = new URLSearchParams(searchParams.toString())

      // Update date range
      if (filters.dateRange?.from) {
        params.set("from", filters.dateRange.from.toISOString().split("T")[0])
      } else {
        params.delete("from")
      }

      if (filters.dateRange?.to) {
        params.set("to", filters.dateRange.to.toISOString().split("T")[0])
      } else {
        params.delete("to")
      }

      // Update array parameters
      const arrayParams = [
        { key: "dealership", value: filters.dealerships },
        { key: "agent", value: filters.agents },
        { key: "severity", value: filters.severity },
        { key: "status", value: filters.status },
        { key: "enumStatus", value: filters.enumStatus },
      ]

      arrayParams.forEach(({ key, value }) => {
        if (value && value.length > 0) {
          params.set(key, value.join(","))
        } else {
          params.delete(key)
        }
      })

      // Update boolean parameters
      if (filters.aiOnly) {
        params.set("aiOnly", "1")
      } else {
        params.delete("aiOnly")
      }

      const newUrl = `${pathname}?${params.toString()}`
      router.replace(newUrl, { scroll: false })
    },
    [searchParams, router, pathname],
  )

  const parseFromUrl = React.useCallback((): Partial<Filters> => {
    const filters: Partial<Filters> = {}

    // Parse date range
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    if (from || to) {
      filters.dateRange = {
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
      }
    }

    // Parse array parameters
    const dealership = searchParams.get("dealership")
    if (dealership) filters.dealerships = dealership.split(",")

    const agent = searchParams.get("agent")
    if (agent) filters.agents = agent.split(",")

    const severity = searchParams.get("severity")
    if (severity) filters.severity = severity.split(",") as any

    const status = searchParams.get("status")
    if (status) filters.status = status.split(",") as any

    const enumStatus = searchParams.get("enumStatus")
    if (enumStatus) filters.enumStatus = enumStatus.split(",") as any

    // Parse boolean parameters
    const aiOnly = searchParams.get("aiOnly")
    if (aiOnly === "1") filters.aiOnly = true

    return filters
  }, [searchParams])

  return { updateUrl, parseFromUrl }
}
