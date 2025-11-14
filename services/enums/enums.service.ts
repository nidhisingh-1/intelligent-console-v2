import { apiClient } from '../api/client'
import type {
  GetIssueMastersParams,
  GetIssueMastersResponse,
  CreateIssueMasterRequest,
  UpdateIssueMasterRequest,
  IssueMaster,
} from './enums.types'

export class EnumsService {
  private static readonly baseEndpoint = '/conversation/converse-qc'

  /**
   * Get all issue masters with optional filtering
   */
  static async getIssueMasters(params?: GetIssueMastersParams): Promise<GetIssueMastersResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.search) queryParams.append('search', params.search)
    if (params?.code) queryParams.append('code', params.code)
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())
    if (params?.page !== undefined) queryParams.append('page', params.page.toString())
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString())

    const endpoint = `${this.baseEndpoint}/issue-masters${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return apiClient.get<GetIssueMastersResponse>(endpoint)
  }

  /**
   * Search issue masters by title and code
   */
  static async searchIssueMasters(query: string): Promise<GetIssueMastersResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('search', query)
    const endpoint = `${this.baseEndpoint}/issue-masters?${queryParams.toString()}`
    return apiClient.get<GetIssueMastersResponse>(endpoint)
  }

  /**
   * Get a single issue master by ID
   */
  static async getIssueMasterById(issueId: string): Promise<IssueMaster> {
    return apiClient.get<IssueMaster>(`${this.baseEndpoint}/issue-masters/${issueId}`)
  }

  /**
   * Create a new issue master
   */
  static async createIssueMaster(data: CreateIssueMasterRequest): Promise<IssueMaster> {
    return apiClient.post<IssueMaster>(`${this.baseEndpoint}/issue-master`, data)
  }

  /**
   * Update an issue master
   */
  static async updateIssueMaster(
    issueId: string,
    data: UpdateIssueMasterRequest
  ): Promise<IssueMaster> {
    return apiClient.put<IssueMaster>(`${this.baseEndpoint}/issue-master/${issueId}`, data)
  }

  /**
   * Delete an issue master
   */
  static async deleteIssueMaster(issueId: string): Promise<{ success: boolean }> {
    return apiClient.delete<{ success: boolean }>(`${this.baseEndpoint}/issue-masters/${issueId}`)
  }
}

