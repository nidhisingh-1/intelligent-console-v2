import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Basic selectors
export const selectCalls = (state: RootState) => state.calls.calls
export const selectSelectedCall = (state: RootState) => state.calls.selectedCall
export const selectCallsLoading = (state: RootState) => state.calls.loading
export const selectCallsError = (state: RootState) => state.calls.error
export const selectCallsFilters = (state: RootState) => state.calls.filters

// Memoized selectors
export const selectFilteredCalls = createSelector(
  [selectCalls, selectCallsFilters],
  (calls, filters) => {
    // Additional client-side filtering if needed
    return calls
  }
)

export const selectCallById = createSelector(
  [selectCalls, (_: RootState, callId: string) => callId],
  (calls, callId) => calls.find(call => call.id === callId)
)

