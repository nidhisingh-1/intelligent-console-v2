import type { RootState } from '../index'

export const selectGlobalFilters = (state: RootState) => state.filters.globalFilters

export const selectReviewFilters = (state: RootState) => state.filters.reviewFilters

