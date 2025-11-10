import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Basic selectors
export const selectIssues = (state: RootState) => state.issues.issues
export const selectSelectedIssue = (state: RootState) => state.issues.selectedIssue
export const selectIssuesLoading = (state: RootState) => state.issues.loading
export const selectIssuesError = (state: RootState) => state.issues.error
export const selectIssuesCallId = (state: RootState) => state.issues.callId

// Memoized selectors
export const selectIssuesByCallId = createSelector(
  [selectIssues, (_: RootState, callId: string) => callId],
  (issues, callId) => issues.filter(issue => issue.reviewId === callId)
)

export const selectIssueById = createSelector(
  [selectIssues, (_: RootState, issueId: string) => issueId],
  (issues, issueId) => issues.find(issue => issue.id === issueId)
)

export const selectIssuesBySeverity = createSelector(
  [selectIssues, (_: RootState, severity: string) => severity],
  (issues, severity) => issues.filter(issue => issue.severity === severity)
)

