// UI state interfaces and hooks
// Note: Zustand stores are temporarily disabled to fix SSR issues

export interface FiltersState {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  status: string[]
  priority: string[]
  callType: string[]
  severity: string[]
  searchQuery: string
  
  // Actions
  setDateRange: (from: Date | undefined, to: Date | undefined) => void
  setStatus: (status: string[]) => void
  setPriority: (priority: string[]) => void
  setCallType: (callType: string[]) => void
  setSeverity: (severity: string[]) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

export interface GlobalSearchState {
  isOpen: boolean
  query: string
  results: any[]
  
  // Actions
  open: () => void
  close: () => void
  setQuery: (query: string) => void
  setResults: (results: any[]) => void
}

// Temporary mock implementations to fix SSR issues
export const useFiltersStore = () => ({
  filters: {
    dateRange: { from: undefined as Date | undefined, to: undefined as Date | undefined },
    status: [] as string[],
    priority: [] as string[],
    callType: [] as string[],
    severity: [] as string[],
    searchQuery: "",
    dealerships: [] as string[],
    agents: [] as string[],
    aiOnly: false,
    enumStatus: [] as string[],
  },
  dateRange: { from: undefined as Date | undefined, to: undefined as Date | undefined },
  status: [] as string[],
  priority: [] as string[],
  callType: [] as string[],
  severity: [] as string[],
  searchQuery: "",
  dealerships: [] as string[],
  agents: [] as string[],
  aiOnly: false,
  enumStatus: [] as string[],
  setDateRange: (from: Date | undefined, to: Date | undefined) => {},
  setStatus: (status: string[]) => {},
  setPriority: (priority: string[]) => {},
  setCallType: (callType: string[]) => {},
  setSeverity: (severity: string[]) => {},
  setSearchQuery: (query: string) => {},
  setDealerships: (dealerships: string[]) => {},
  setAgents: (agents: string[]) => {},
  setAiOnly: (aiOnly: boolean) => {},
  setEnumStatus: (enumStatus: string[]) => {},
  resetFilters: () => {},
})

export const useGlobalSearch = (searchQuery?: string) => ({
  isOpen: false,
  query: "",
  results: [] as any[],
  data: {
    calls: [] as any[],
    enums: [] as any[],
    annotations: [] as any[],
  },
  open: () => {},
  close: () => {},
  setQuery: () => {},
  setResults: () => {},
})

// Hook to initialize filters on app startup
export function useInitializeFilters() {
  // This hook can be used to initialize filters from URL params or other sources
  // For now, it's just a placeholder that can be expanded later
  return null
}
