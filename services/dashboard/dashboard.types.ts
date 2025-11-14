// Types for Dashboard API Service

export interface DashboardIssueStats {
  _id: string
  code: string
  title: string
  description: string
  isActive: boolean
  status: 'resolved' | 'in_dev' | 'unresolved'
  lastResolvedAt: string | null
  lastResolvedBy: string | null
  occurrence: {
    total: number
    liveCall: number
    demoCall: number
    afterLastResolved: number
    uniqueCallsCount?: number
  }
  uniqueCallsCount?: number
  severityOccurrence: {
    high: number
    medium: number
    low: number
  }
  createdAt: string
  updatedAt: string
  firstMarkDate?: string
  lastMarkDate?: string
}

export interface DashboardFilters {
  page?: number
  limit?: number
  isActive?: boolean
  status?: 'resolved' | 'in_dev' | 'unresolved'
  severity?: 'high' | 'medium' | 'low'
  code?: string
  search?: string
  startDate?: string
  endDate?: string
  callType?: string
  agentCallType?: string
  agentType?: string
  enterpriseId?: string
}

export interface DashboardApiResponse {
  data: DashboardIssueStats[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  filters: Record<string, any>
}

export interface IssueCall {
  callId: string
  enterpriseId: string
  enterpriseName: string
  teamId: string
  teamName: string
  note: string
  severity: 'high' | 'medium' | 'low'
  callRecordingUrl: string
  secondsFromStart: number
  transcript: string
}

export interface IssueCallsResponse {
  data: IssueCall[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

