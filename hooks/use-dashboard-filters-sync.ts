"use client"

import { useCallback, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export interface DashboardFilterState {
  selectedCategory: string
  selectedStatus: string
  selectedDateRange: string
  customDateFrom: Date | undefined
  customDateTo: Date | undefined
  selectedSeverity: string
  selectedAgentType: string
  selectedAgentCallType: string
  selectedEnterpriseId: string
  searchTerm: string
}

const DEFAULT_FILTERS: DashboardFilterState = {
  selectedCategory: "all",
  selectedStatus: "all",
  selectedDateRange: "all",
  customDateFrom: undefined,
  customDateTo: undefined,
  selectedSeverity: "all",
  selectedAgentType: "all",
  selectedAgentCallType: "all",
  selectedEnterpriseId: "all",
  searchTerm: "",
}

/**
 * Hook to sync dashboard filters with URL parameters
 * This preserves filter state when navigating away and back
 */
export function useDashboardFiltersSync() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Parse filters from URL
  const parseFiltersFromUrl = useCallback((): Partial<DashboardFilterState> => {
    const filters: Partial<DashboardFilterState> = {}

    const category = searchParams.get("category")
    if (category) filters.selectedCategory = category

    const status = searchParams.get("status")
    if (status) filters.selectedStatus = status

    const dateRange = searchParams.get("dateRange")
    if (dateRange) filters.selectedDateRange = dateRange

    const dateFrom = searchParams.get("dateFrom")
    if (dateFrom) {
      filters.customDateFrom = new Date(dateFrom)
    }

    const dateTo = searchParams.get("dateTo")
    if (dateTo) {
      filters.customDateTo = new Date(dateTo)
    }

    const severity = searchParams.get("severity")
    if (severity) filters.selectedSeverity = severity

    const agentType = searchParams.get("agentType")
    if (agentType) filters.selectedAgentType = agentType

    const agentCallType = searchParams.get("agentCallType")
    if (agentCallType) filters.selectedAgentCallType = agentCallType

    const enterpriseId = searchParams.get("enterpriseId")
    if (enterpriseId) filters.selectedEnterpriseId = enterpriseId

    const search = searchParams.get("search")
    if (search) filters.searchTerm = search

    return filters
  }, [searchParams])

  // Update URL with current filters
  const updateUrlWithFilters = useCallback(
    (filters: Partial<DashboardFilterState>) => {
      const params = new URLSearchParams(searchParams.toString())

      // Update category
      if (filters.selectedCategory && filters.selectedCategory !== "all") {
        params.set("category", filters.selectedCategory)
      } else {
        params.delete("category")
      }

      // Update status
      if (filters.selectedStatus && filters.selectedStatus !== "all") {
        params.set("status", filters.selectedStatus)
      } else {
        params.delete("status")
      }

      // Update date range
      if (filters.selectedDateRange && filters.selectedDateRange !== "all") {
        params.set("dateRange", filters.selectedDateRange)
      } else {
        params.delete("dateRange")
      }

      // Update custom dates
      if (filters.customDateFrom) {
        params.set("dateFrom", filters.customDateFrom.toISOString())
      } else {
        params.delete("dateFrom")
      }

      if (filters.customDateTo) {
        params.set("dateTo", filters.customDateTo.toISOString())
      } else {
        params.delete("dateTo")
      }

      // Update severity
      if (filters.selectedSeverity && filters.selectedSeverity !== "all") {
        params.set("severity", filters.selectedSeverity)
      } else {
        params.delete("severity")
      }

      // Update agent type
      if (filters.selectedAgentType && filters.selectedAgentType !== "all") {
        params.set("agentType", filters.selectedAgentType)
      } else {
        params.delete("agentType")
      }

      // Update agent call type
      if (filters.selectedAgentCallType && filters.selectedAgentCallType !== "all") {
        params.set("agentCallType", filters.selectedAgentCallType)
      } else {
        params.delete("agentCallType")
      }

      // Update enterprise ID
      if (filters.selectedEnterpriseId && filters.selectedEnterpriseId !== "all") {
        params.set("enterpriseId", filters.selectedEnterpriseId)
      } else {
        params.delete("enterpriseId")
      }

      // Update search
      if (filters.searchTerm && filters.searchTerm.trim()) {
        params.set("search", filters.searchTerm.trim())
      } else {
        params.delete("search")
      }

      // Update URL without scrolling
      const newUrl = `${pathname}?${params.toString()}`
      router.replace(newUrl, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  return {
    parseFiltersFromUrl,
    updateUrlWithFilters,
    DEFAULT_FILTERS,
  }
}

