import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Filters, ReviewFilterState } from '@/lib/types'
import { DEFAULT_REVIEW_FILTERS } from '@/lib/types'

interface FiltersState {
  globalFilters: Filters
  reviewFilters: ReviewFilterState
}

const initialFilters: Filters = {
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

const initialState: FiltersState = {
  globalFilters: initialFilters,
  reviewFilters: DEFAULT_REVIEW_FILTERS,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Update global filters
    updateFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.globalFilters = { ...state.globalFilters, ...action.payload }
    },
    updateReviewFilters: (state, action: PayloadAction<Partial<ReviewFilterState>>) => {
      state.reviewFilters = { ...state.reviewFilters, ...action.payload }
    },
    
    // Reset filters
    resetFilters: () => initialState,
    resetReviewFilters: (state) => {
      state.reviewFilters = DEFAULT_REVIEW_FILTERS
    },
  },
})

export const {
  updateFilters,
  updateReviewFilters,
  resetFilters,
  resetReviewFilters,
} = filtersSlice.actions

export default filtersSlice.reducer

