/**
 * Common API types
 */

export interface ApiResponse<T = any> {
  data: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export interface ApiError {
  message: string
  status?: number
  error?: string
}

