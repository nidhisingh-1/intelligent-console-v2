import { apiClient } from '../api/client'
import type {
  DashboardFilters,
  DashboardApiResponse,
  IssueCallsResponse,
} from './dashboard.types'

export class DashboardService {
  /**
   * Get dashboard issue statistics with filtering and pagination
   */
  static async getIssueStats(filters: DashboardFilters = {}): Promise<DashboardApiResponse> {
    const queryParams = new URLSearchParams()
    
    if (filters.page !== undefined) queryParams.append('page', filters.page.toString())
    if (filters.limit !== undefined) queryParams.append('limit', filters.limit.toString())
    if (filters.isActive !== undefined) queryParams.append('isActive', filters.isActive.toString())
    if (filters.status) queryParams.append('status', filters.status)
    if (filters.severity) queryParams.append('severity', filters.severity)
    if (filters.code) queryParams.append('code', filters.code)
    if (filters.search) queryParams.append('search', filters.search)
    if (filters.startDate) queryParams.append('startDate', filters.startDate)
    if (filters.endDate) queryParams.append('endDate', filters.endDate)
    if (filters.callType) queryParams.append('callType', filters.callType)
    if (filters.agentCallType) queryParams.append('agentCallType', filters.agentCallType)
    if (filters.agentType) queryParams.append('agentType', filters.agentType)
    if (filters.enterpriseId) queryParams.append('enterpriseId', filters.enterpriseId)
    
    const endpoint = `/conversation/converse-qc/issues-stats${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return apiClient.get<DashboardApiResponse>(endpoint)
  }

  /**
   * Get calls for a specific issue
   */
  static async getIssueCalls(
    issueId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<IssueCallsResponse> {
    return apiClient.get<IssueCallsResponse>(
      `/conversation/converse-qc/issue-master/${issueId}?page=${page}&limit=${limit}`
    )
  }

  /**
   * Update issue status
   */
  static async updateIssueStatus(
    issueId: string,
    status: 'resolved' | 'in_dev' | 'unresolved'
  ): Promise<{ success: boolean; message?: string }> {
    return apiClient.put<{ success: boolean; message?: string }>(
      `/conversation/converse-qc/issue-master/${issueId}`,
      { status }
    )
  }

  /**
   * Mark an issue as resolved
   */
  static async markIssueResolved(issueId: string): Promise<{ success: boolean; message?: string }> {
    return apiClient.post<{ success: boolean; message?: string }>(
      `/conversation/converse-qc/issues-stats/${issueId}/resolve`,
      {}
    )
  }

  /**
   * Mark an issue as unresolved
   */
  static async markIssueUnresolved(issueId: string): Promise<{ success: boolean; message?: string }> {
    return apiClient.post<{ success: boolean; message?: string }>(
      `/conversation/converse-qc/issues-stats/${issueId}/unresolve`,
      {}
    )
  }
}

