// Types for Enums API Service

export const ENUM_CATEGORIES = {
  COMMUNICATION_CALL_QUALITY: 'communication_call_quality',
  FOLLOWUP_COMMUNICATION: 'followup_communication',
  PROCESS_CUSTOMER_MANAGEMENT: 'process_customer_management',
  VEHICLE_DATA_SYSTEM: 'vehicle_data_system',
} as const

export const ENUM_CATEGORY_LABELS = {
  [ENUM_CATEGORIES.COMMUNICATION_CALL_QUALITY]: 'Communication & Call Quality',
  [ENUM_CATEGORIES.FOLLOWUP_COMMUNICATION]: 'Follow-up & Communications', 
  [ENUM_CATEGORIES.PROCESS_CUSTOMER_MANAGEMENT]: 'Process & Customer Management',
  [ENUM_CATEGORIES.VEHICLE_DATA_SYSTEM]: 'Vehicle Data & System',
} as const

export type EnumCategoryCode = typeof ENUM_CATEGORIES[keyof typeof ENUM_CATEGORIES]

export type SeverityLevel = 'low' | 'medium' | 'high'

export interface IssueMaster {
  _id: string
  code: EnumCategoryCode
  title: string
  description: string
  defaultSeverity: SeverityLevel
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateIssueMasterRequest {
  code: EnumCategoryCode
  title: string
  description: string
  defaultSeverity: SeverityLevel
  isActive: boolean
}

export interface UpdateIssueMasterRequest {
  code?: EnumCategoryCode
  title?: string
  description?: string
  defaultSeverity?: SeverityLevel
  isActive?: boolean
}

export interface GetIssueMastersParams {
  search?: string
  code?: EnumCategoryCode
  isActive?: boolean
  page?: number
  limit?: number
}

export interface GetIssueMastersResponse {
  data: IssueMaster[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

