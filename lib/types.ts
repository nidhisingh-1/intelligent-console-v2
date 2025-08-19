// Core data types for the QA Review Dashboard
export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
export type AgentType = "AI" | "HUMAN"

export interface Dealership {
  id: string
  name: string
  timezone: string
}

export interface Agent {
  id: string
  name: string
  type: AgentType
  currentVersion?: string
}

export interface Call {
  id: string
  dealershipId: string
  agentId: string
  customerPhoneMasked: string
  startedAt: string
  durationSec: number
  recordingUrl?: string
  transcript?: {
    items: { t: number; word: string }[]
  }
}

export interface QAEnum {
  id: string
  code: string
  title: string
  description: string
  defaultSeverity: Severity
  isActive: boolean
  updatedAt: string
}

export interface QAReview {
  id: string
  callId: string
  reviewer: "You" | string
  pass: boolean | null
  overallSummary?: string
  createdAt: string
}

export interface QAAnnotation {
  id: string
  reviewId: string
  callTsSec: number
  note: string
  aiSummary?: string
  severity: Severity
  enumId?: string
}

export interface QAEnumOccurrence {
  id: string
  reviewId: string
  enumId: string
  severity: Severity
  firstSeenTsSec: number
  lastSeenTsSec: number
  evidenceCount: number
}

export interface QAEnumResolution {
  enumId: string
  scope: "GLOBAL" | "DEALERSHIP" | "AGENT" | "AGENT_VERSION"
  dealershipId?: string
  agentId?: string
  agentVersion?: string
  status: "OPEN" | "SOLVED"
  effectiveFrom: string
  note?: string
}

// Filter types
export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export interface Filters {
  dateRange: DateRange
  dealerships: string[]
  agents: string[]
  severity: Severity[]
  status: ("Reviewed" | "Unreviewed" | "Pass" | "Fail")[]
  aiOnly: boolean
  enumStatus: ("OPEN" | "SOLVED" | "REGRESSED")[]
}
