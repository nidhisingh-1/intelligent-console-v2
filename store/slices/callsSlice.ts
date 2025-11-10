import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Call } from '@/lib/types'

export interface CallFilters {
  status: 'pending' | 'completed' | 'all'
  agentName: string
  agentType: string
  callType: string
  startDate?: string
  endDate?: string
}

interface CallsState {
  calls: Call[]
  selectedCall: Call | null
  loading: boolean
  error: string | null
  filters: CallFilters
  currentPage: number
  hasMore: boolean
}

const initialFilters: CallFilters = {
  status: 'pending',
  agentName: 'all',
  agentType: 'all',
  callType: 'all',
}

const initialState: CallsState = {
  calls: [],
  selectedCall: null,
  loading: false,
  error: null,
  filters: initialFilters,
  currentPage: 1,
  hasMore: true,
}

const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    // Set calls (replace all)
    setCalls: (state, action: PayloadAction<Call[]>) => {
      state.calls = action.payload
      state.currentPage = 1
      state.error = null
    },
    
    // Add calls (append for infinite scroll)
    addCalls: (state, action: PayloadAction<Call[]>) => {
      state.calls.push(...action.payload)
      state.hasMore = action.payload.length > 0
    },
    
    // Select a call
    selectCall: (state, action: PayloadAction<Call | null>) => {
      state.selectedCall = action.payload
    },
    
    // Update a single call
    updateCall: (state, action: PayloadAction<{ callId: string; updates: Partial<Call> }>) => {
      const { callId, updates } = action.payload
      const index = state.calls.findIndex(call => call.id === callId)
      if (index !== -1) {
        state.calls[index] = { ...state.calls[index], ...updates }
      }
      if (state.selectedCall?.id === callId) {
        state.selectedCall = { ...state.selectedCall, ...updates }
      }
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
    
    // Update filters
    updateFilters: (state, action: PayloadAction<Partial<CallFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.currentPage = 1
    },
    
    // Reset filters
    resetFilters: (state) => {
      state.filters = initialFilters
      state.currentPage = 1
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
  setCalls,
  addCalls,
  selectCall,
  updateCall,
  setLoading,
  setError,
  updateFilters,
  resetFilters,
  incrementPage,
  reset,
} = callsSlice.actions

export default callsSlice.reducer

