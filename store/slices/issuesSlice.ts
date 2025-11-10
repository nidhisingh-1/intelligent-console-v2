import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { QAAnnotation } from '@/lib/types'

interface IssuesState {
  issues: QAAnnotation[]
  selectedIssue: QAAnnotation | null
  loading: boolean
  error: string | null
  callId: string | null
}

const initialState: IssuesState = {
  issues: [],
  selectedIssue: null,
  loading: false,
  error: null,
  callId: null,
}

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    // Set issues for a call
    setIssues: (state, action: PayloadAction<{ callId: string; issues: QAAnnotation[] }>) => {
      state.issues = action.payload.issues
      state.callId = action.payload.callId
      state.error = null
    },
    
    // Add a new issue
    addIssue: (state, action: PayloadAction<QAAnnotation>) => {
      state.issues.push(action.payload)
    },
    
    // Update an issue
    updateIssue: (state, action: PayloadAction<{ issueId: string; updates: Partial<QAAnnotation> }>) => {
      const { issueId, updates } = action.payload
      const index = state.issues.findIndex(issue => issue.id === issueId)
      if (index !== -1) {
        state.issues[index] = { ...state.issues[index], ...updates }
      }
      if (state.selectedIssue?.id === issueId) {
        state.selectedIssue = { ...state.selectedIssue, ...updates }
      }
    },
    
    // Remove an issue
    removeIssue: (state, action: PayloadAction<string>) => {
      state.issues = state.issues.filter(issue => issue.id !== action.payload)
      if (state.selectedIssue?.id === action.payload) {
        state.selectedIssue = null
      }
    },
    
    // Select an issue
    selectIssue: (state, action: PayloadAction<QAAnnotation | null>) => {
      state.selectedIssue = action.payload
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
  setIssues,
  addIssue,
  updateIssue,
  removeIssue,
  selectIssue,
  setLoading,
  setError,
  reset,
} = issuesSlice.actions

export default issuesSlice.reducer

