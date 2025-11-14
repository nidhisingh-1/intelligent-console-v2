import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Basic selectors
export const selectDashboardIssues = (state: RootState) => state.dashboard.issues
export const selectDashboardStats = (state: RootState) => state.dashboard.stats
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading
export const selectDashboardError = (state: RootState) => state.dashboard.error
export const selectDashboardFilters = (state: RootState) => state.dashboard.filters

// Memoized selectors
export const selectFilteredDashboardIssues = createSelector(
  [selectDashboardIssues, selectDashboardFilters],
  (issues, filters) => {
    let filtered = issues
    
    // Filter by severity
    if (filters.severity.length > 0) {
      filtered = filtered.filter(issue => 
        filters.severity.includes(issue.severity.toUpperCase())
      )
    }
    
    // Filter by status
    if (filters.status.length > 0) {
      // Add status filtering logic here if needed
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(issue =>
        issue.description.toLowerCase().includes(query) ||
        issue.transcriptText.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }
)

