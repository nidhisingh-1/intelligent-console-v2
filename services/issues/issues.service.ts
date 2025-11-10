import { apiClient } from '../api/client'
import type { CallData } from './issues.types'

export class IssuesService {
  /**
   * Fetch call by ID (legacy API endpoint)
   */
  static async fetchCallById(callId: string): Promise<CallData | null> {
    try {
      return await apiClient.get<CallData>(
        `/conversation/vapi/end-call-report-by-id?callId=${callId}`
      )
    } catch (error) {
      console.error('Error fetching call by ID:', error)
      return null
    }
  }
}

