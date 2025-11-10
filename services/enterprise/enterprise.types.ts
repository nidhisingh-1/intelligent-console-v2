// Types for Enterprise API Service

export interface Enterprise {
  enterpriseId: string
  name: string
  created_at?: string
  updated_at?: string
  id?: string
}

export interface EnterpriseResponse {
  data: {
    enterprises: Enterprise[]
    pagination: {
      currentPage: number
      totalPages: number
      totalCount: number
      hasNextPage: boolean
      hasPreviousPage: boolean
      limit: number
    }
  }
  error: boolean
  message: string
  code: string
  details: any
}

export interface Team {
  enterprise_id: string
  team_id: string
  team_name: string
  is_default: boolean
  website_link: string
  is_website_builder: boolean
  website_blocker_onboarding: boolean
  spyne_website_link?: string
}

export interface EnterpriseDetails {
  name: string
  api_key: string
  logo_url: string
  category: string
  category_id: string
  stage: string
  website_links: string
}

export interface TeamListResponse {
  message: string
  error: boolean
  code: string
  details: any
  data: {
    teamDetails: Team[]
    entepriseDetails: EnterpriseDetails
    teamConfigAvailable: boolean
  }
}

export interface QueryBuilderRequest {
  table: string
  columns: string
  filter?: {
    [key: string]: any
    $and?: any[]
    $or?: any[]
  }
  joins?: any[]
  groupBy?: string[]
  having?: any
  orderBy?: string[]
  limit?: number
  offset?: number
}

export interface QueryBuilderResponse {
  data: any[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

