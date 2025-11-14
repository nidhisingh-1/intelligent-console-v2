import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { QAAnnotation } from '@/lib/types'

export interface DashboardFilters {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  status: string[]
  priority: string[]
  callType: string[]
  severity: string[]
  searchQuery: string
  dealerships: string[]
  agents: string[]
  aiOnly: boolean
  enumStatus: string[]
}

interface DashboardStats {
  totalIssues: number
  resolvedIssues: number
  pendingIssues: number
  highSeverityIssues: number
  avgResolutionTime: number
}

interface DashboardState {
  issues: QAAnnotation[]
  stats: DashboardStats | null
  loading: boolean
  error: string | null
  filters: DashboardFilters
  currentPage: number
  hasMore: boolean
}

const initialFilters: DashboardFilters = {
  dateRange: {
    from: undefined,
    to: undefined,
  },
  status: [],
  priority: [],
  callType: [],
  severity: [],
  searchQuery: '',
  dealerships: [],
  agents: [],
  aiOnly: false,
  enumStatus: [],
}

const initialState: DashboardState = {
  issues: [],
  stats: null,
  loading: false,
  error: null,
  filters: initialFilters,
  currentPage: 1,
  hasMore: true,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Set dashboard issues
    setIssues: (state, action: PayloadAction<QAAnnotation[]>) => {
      state.issues = action.payload
      state.currentPage = 1
      state.error = null
    },
    
    // Add issues (append for infinite scroll)
    addIssues: (state, action: PayloadAction<QAAnnotation[]>) => {
      state.issues.push(...action.payload)
      state.hasMore = action.payload.length > 0
    },
    
    // Set dashboard stats
    setStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload
    },
    
    // Update filters
    updateFilters: (state, action: PayloadAction<Partial<DashboardFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.currentPage = 1
    },
    
    // Reset filters
    resetFilters: (state) => {
      state.filters = initialFilters
      state.currentPage = 1
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    
    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    
    // Increment page
    incrementPage: (state) => {
      state.currentPage += 1
    },
    
    // Reset entire state
    reset: () => initialState,
  },
})

export const {
  setIssues,
  addIssues,
  setStats,
  updateFilters,
  resetFilters,
  setLoading,
  setError,
  incrementPage,
  reset,
} = dashboardSlice.actions

export default dashboardSlice.reducer

