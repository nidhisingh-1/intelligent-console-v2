"use client"

import * as React from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Filters, DateRange, Severity } from "./types"
import { MOCKS } from "./mocks"
import { updateUrlParams, getUrlParams } from "./utils"

// Filters store for managing UI state
interface FiltersStore {
  filters: Filters
  setDateRange: (dateRange: DateRange) => void
  setDealerships: (dealerships: string[]) => void
  setAgents: (agents: string[]) => void
  setSeverity: (severity: Severity[]) => void
  setStatus: (status: ("Reviewed" | "Unreviewed" | "Pass" | "Fail")[]) => void
  setAiOnly: (aiOnly: boolean) => void
  setEnumStatus: (enumStatus: ("OPEN" | "SOLVED" | "REGRESSED")[]) => void
  resetFilters: () => void
  initializeFromUrl: () => void
  syncToUrl: () => void
}

const defaultFilters: Filters = {
  dateRange: { from: undefined, to: undefined },
  dealerships: [],
  agents: [],
  severity: [],
  status: [],
  aiOnly: false,
  enumStatus: [],
}

export const useFiltersStore = create<FiltersStore>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,
      setDateRange: (dateRange) => {
        set((state) => ({ filters: { ...state.filters, dateRange } }))
        get().syncToUrl()
      },
      setDealerships: (dealerships) => {
        set((state) => ({ filters: { ...state.filters, dealerships } }))
        get().syncToUrl()
      },
      setAgents: (agents) => {
        set((state) => ({ filters: { ...state.filters, agents } }))
        get().syncToUrl()
      },
      setSeverity: (severity) => {
        set((state) => ({ filters: { ...state.filters, severity } }))
        get().syncToUrl()
      },
      setStatus: (status) => {
        set((state) => ({ filters: { ...state.filters, status } }))
        get().syncToUrl()
      },
      setAiOnly: (aiOnly) => {
        set((state) => ({ filters: { ...state.filters, aiOnly } }))
        get().syncToUrl()
      },
      setEnumStatus: (enumStatus) => {
        set((state) => ({ filters: { ...state.filters, enumStatus } }))
        get().syncToUrl()
      },
      resetFilters: () => {
        set({ filters: defaultFilters })
        get().syncToUrl()
      },
      initializeFromUrl: () => {
        if (typeof window === "undefined") return

        const params = getUrlParams()
        const filters = { ...defaultFilters }

        // Parse date range
        if (params.from) {
          filters.dateRange.from = new Date(params.from)
        }
        if (params.to) {
          filters.dateRange.to = new Date(params.to)
        }

        // Parse array parameters
        if (params.dealership) {
          filters.dealerships = params.dealership.split(",")
        }
        if (params.agent) {
          filters.agents = params.agent.split(",")
        }
        if (params.severity) {
          filters.severity = params.severity.split(",") as Severity[]
        }
        if (params.status) {
          filters.status = params.status.split(",") as ("Reviewed" | "Unreviewed" | "Pass" | "Fail")[]
        }
        if (params.enumStatus) {
          filters.enumStatus = params.enumStatus.split(",") as ("OPEN" | "SOLVED" | "REGRESSED")[]
        }

        // Parse boolean parameters
        if (params.aiOnly === "1") {
          filters.aiOnly = true
        }

        set({ filters })
      },
      syncToUrl: () => {
        if (typeof window === "undefined") return

        const { filters } = get()
        updateUrlParams({
          from: filters.dateRange.from?.toISOString().split("T")[0],
          to: filters.dateRange.to?.toISOString().split("T")[0],
          dealership: filters.dealerships.length > 0 ? filters.dealerships : undefined,
          agent: filters.agents.length > 0 ? filters.agents : undefined,
          severity: filters.severity.length > 0 ? filters.severity : undefined,
          status: filters.status.length > 0 ? filters.status : undefined,
          enumStatus: filters.enumStatus.length > 0 ? filters.enumStatus : undefined,
          aiOnly: filters.aiOnly,
        })
      },
    }),
    {
      name: "qa-dashboard-filters",
    },
  ),
)

// Hook to initialize filters from URL on page load
export const useInitializeFilters = () => {
  const initializeFromUrl = useFiltersStore((state) => state.initializeFromUrl)

  React.useEffect(() => {
    initializeFromUrl()
  }, [initializeFromUrl])
}

// Mock query hooks that simulate API calls with filtering
export const useMockQuery = <T>(
  queryFn: (filters: Filters) => T,
  deps: any[] = []
) => {\
  const { filters } = useFiltersStore()\
  const [data, setData] = React.useState<T | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(true)
    // Simulate API delay\
    const timeout = setTimeout(() => {
      setData(queryFn(filters))\
      setIsLoading(false)
    }, Math.random() * 500 + 200) // 200-700ms delay

    return () => clearTimeout(timeout)
  }, [filters, ...deps])

  return { data, isLoading }
}

export const useCallsQuery = () => {\
  return useMockQuery((filters: Filters) => {\
    let filteredCalls = MOCKS.calls

    // Filter by date range
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredCalls = filteredCalls.filter(call => {
        const callDate = new Date(call.startedAt)
        if (filters.dateRange.from && callDate < filters.dateRange.from) return false
        if (filters.dateRange.to && callDate > filters.dateRange.to) return false
        return true
      })
    }

    // Filter by dealerships
    if (filters.dealerships.length > 0) {
      filteredCalls = filteredCalls.filter(call => 
        filters.dealerships.includes(call.dealershipId)
      )
    }

    // Filter by agents
    if (filters.agents.length > 0) {
      filteredCalls = filteredCalls.filter(call => 
        filters.agents.includes(call.agentId)
      )
    }

    // Filter by AI only
    if (filters.aiOnly) {\
      const aiAgentIds = MOCKS.agents
        .filter(agent => agent.type === 'AI')
        .map(agent => agent.id)
      filteredCalls = filteredCalls.filter(call => 
        aiAgentIds.includes(call.agentId)
      )
    }

    // Filter by review status
    if (filters.status.length > 0) {\
      const callsWithReviews = filteredCalls.map(call => {\
        const review = MOCKS.reviews.find(r => r.callId === call.id)
        return { call, review }
      })

      const statusFiltered = callsWithReviews.filter(({ review }) => {\
        if (filters.status.includes('Unreviewed') && !review) return true
        if (filters.status.includes('Reviewed') && review) return true
        if (filters.status.includes('Pass') && review?.pass === true) return true
        if (filters.status.includes('Fail') && review?.pass === false) return true
        return false
      })

      filteredCalls = statusFiltered.map(({ call }) => call)
    }

    return filteredCalls
  })
}

export const useEnumsQuery = () => {\
  return useMockQuery((filters: Filters) => {\
    let filteredEnums = MOCKS.enums

    // Apply enum status filter if specified
    if (filters.enumStatus.length > 0) {
      // This would normally check against resolutions and occurrences
      // For now, we'll use a simplified mock implementation
      filteredEnums = filteredEnums.filter(enum_ => {
        const resolution = MOCKS.resolutions.find(r => r.enumId === enum_.id)
        let status: "OPEN" | "SOLVED" | "REGRESSED" = "OPEN"
        
        if (resolution) {
          status = resolution.status === "SOLVED" ? "SOLVED" : "OPEN"
          // Mock regressed logic
          const hasRecentOccurrences = MOCKS.occurrences.some(o => o.enumId === enum_.id)
          if (status === "SOLVED" && hasRecentOccurrences) {
            status = "REGRESSED"
          }
        }
        
        return filters.enumStatus.includes(status)
      })
    }
    
    return filteredEnums
  })
}

export const useDashboardQuery = () => {\
  return useMockQuery((filters: Filters) => {
    // Get filtered reviews based on current filters\
    let filteredReviews = MOCKS.reviews

    // Apply date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredReviews = filteredReviews.filter((review) => {
        const reviewDate = new Date(review.createdAt)
        if (filters.dateRange.from && reviewDate < filters.dateRange.from) return false
        if (filters.dateRange.to && reviewDate > filters.dateRange.to) return false
        return true
      })
    }

    // Apply dealership/agent filters by checking associated calls
    if (filters.dealerships.length > 0 || filters.agents.length > 0 || filters.aiOnly) {
      filteredReviews = filteredReviews.filter((review) => {
        const call = MOCKS.calls.find((c) => c.id === review.callId)
        if (!call) return false

        if (filters.dealerships.length > 0 && !filters.dealerships.includes(call.dealershipId)) return false
        if (filters.agents.length > 0 && !filters.agents.includes(call.agentId)) return false

        if (filters.aiOnly) {
          const agent = MOCKS.agents.find((a) => a.id === call.agentId)
          if (!agent || agent.type !== "AI") return false
        }

        return true
      })
    }

    // Get filtered annotations
    let filteredAnnotations = MOCKS.annotations.filter((a) => 
      filteredReviews.some((r) => r.id === a.reviewId)
    )

    // Apply severity filter
    if (filters.severity.length > 0) {
      filteredAnnotations = filteredAnnotations.filter((a) => 
        filters.severity.includes(a.severity)
      )
    }

    // Calculate metrics
    const reviewsDone = filteredReviews.length
    const passedReviews = filteredReviews.filter((r) => r.pass === true).length
    const passRate = reviewsDone > 0 ? (passedReviews / reviewsDone) * 100 : 0

    const uniqueEnums = new Set(
      filteredAnnotations.filter((a) => a.enumId).map((a) => a.enumId)
    ).size

    const totalWeight = filteredAnnotations.reduce(
      (sum, annotation) => sum + getSeverityWeight(annotation.severity), 0
    )
    const maxPossibleWeight = filteredAnnotations.length * 4
    const weightedScore = maxPossibleWeight > 0 
      ? ((maxPossibleWeight - totalWeight) / maxPossibleWeight) * 100 
      : 100

    return {\
      reviews: filteredReviews,
      annotations: filteredAnnotations,
      kpis: {
        reviewsDone,
        passRate,
        uniqueEnums,
        weightedScore,
      }
    }
  })
}

export const useGlobalSearch = (query: string) => {\
  return useMockQuery((filters: Filters) => {\
    if (!query.trim()) return { calls: [], enums: [], annotations: [] }

    const searchTerm = query.toLowerCase()

    // Search calls
    const calls = MOCKS.calls.filter(call => 
      call.id.toLowerCase().includes(searchTerm) ||
      call.customerPhoneMasked.includes(searchTerm)
    )

    // Search enums
    const enums = MOCKS.enums.filter(enum_ =>
      enum_.code.toLowerCase().includes(searchTerm) ||
      enum_.title.toLowerCase().includes(searchTerm) ||
      enum_.description.toLowerCase().includes(searchTerm)
    )

    // Search annotations
    const annotations = MOCKS.annotations.filter(annotation =>
      annotation.note.toLowerCase().includes(searchTerm) ||
      annotation.aiSummary?.toLowerCase().includes(searchTerm)
    )

    return { calls, enums, annotations }
  }, [query])\
}
