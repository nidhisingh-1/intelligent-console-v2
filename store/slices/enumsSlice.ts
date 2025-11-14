import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { QAEnum } from '@/lib/types'

interface EnumsState {
  enums: QAEnum[]
  selectedEnum: QAEnum | null
  loading: boolean
  error: string | null
}

const initialState: EnumsState = {
  enums: [],
  selectedEnum: null,
  loading: false,
  error: null,
}

const enumsSlice = createSlice({
  name: 'enums',
  initialState,
  reducers: {
    // Set enums
    setEnums: (state, action: PayloadAction<QAEnum[]>) => {
      state.enums = action.payload
      state.error = null
    },
    
    // Add a new enum
    addEnum: (state, action: PayloadAction<QAEnum>) => {
      state.enums.push(action.payload)
    },
    
    // Update an enum
    updateEnum: (state, action: PayloadAction<{ enumId: string; updates: Partial<QAEnum> }>) => {
      const { enumId, updates } = action.payload
      const index = state.enums.findIndex(enumItem => enumItem.id === enumId)
      if (index !== -1) {
        state.enums[index] = { ...state.enums[index], ...updates }
      }
      if (state.selectedEnum?.id === enumId) {
        state.selectedEnum = { ...state.selectedEnum, ...updates }
      }
    },
    
    // Remove an enum
    removeEnum: (state, action: PayloadAction<string>) => {
      state.enums = state.enums.filter(enumItem => enumItem.id !== action.payload)
      if (state.selectedEnum?.id === action.payload) {
        state.selectedEnum = null
      }
    },
    
    // Select an enum
    selectEnum: (state, action: PayloadAction<QAEnum | null>) => {
      state.selectedEnum = action.payload
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
    
    // Reset entire state
    reset: () => initialState,
  },
})

export const {
  setEnums,
  addEnum,
  updateEnum,
  removeEnum,
  selectEnum,
  setLoading,
  setError,
  reset,
} = enumsSlice.actions

export default enumsSlice.reducer

