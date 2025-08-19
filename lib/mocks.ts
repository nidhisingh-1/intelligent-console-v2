import type {
  Dealership,
  Agent,
  Call,
  QAEnum,
  QAReview,
  QAAnnotation,
  QAEnumOccurrence,
  QAEnumResolution,
  Severity,
} from "./types"

// Mock dealerships
const dealerships: Dealership[] = [
  { id: "deal-1", name: "Downtown Motors", timezone: "America/New_York" },
  { id: "deal-2", name: "Westside Auto", timezone: "America/Los_Angeles" },
  { id: "deal-3", name: "Metro Car Sales", timezone: "America/Chicago" },
  { id: "deal-4", name: "Highway Dealers", timezone: "America/Denver" },
]

// Mock agents
const agents: Agent[] = [
  { id: "agent-1", name: "Sarah Chen", type: "HUMAN" },
  { id: "agent-2", name: "AI Assistant v2.1", type: "AI", currentVersion: "2.1.0" },
  { id: "agent-3", name: "Mike Rodriguez", type: "HUMAN" },
  { id: "agent-4", name: "AI Assistant v2.0", type: "AI", currentVersion: "2.0.3" },
  { id: "agent-5", name: "Emma Thompson", type: "HUMAN" },
  { id: "agent-6", name: "AI Assistant v1.9", type: "AI", currentVersion: "1.9.8" },
]

// Mock calls with some having transcripts
const calls: Call[] = [
  {
    id: "call-1",
    dealershipId: "deal-1",
    agentId: "agent-2",
    customerPhoneMasked: "***-***-1234",
    startedAt: "2024-01-15T10:30:00Z",
    durationSec: 420,
    recordingUrl: "/mock-audio/call-1.mp3",
    transcript: {
      items: [
        { t: 0, word: "Hello" },
        { t: 0.5, word: "thank" },
        { t: 1.0, word: "you" },
        { t: 1.5, word: "for" },
        { t: 2.0, word: "calling" },
        { t: 2.5, word: "Downtown" },
        { t: 3.0, word: "Motors" },
        { t: 4.0, word: "How" },
        { t: 4.5, word: "can" },
        { t: 5.0, word: "I" },
        { t: 5.5, word: "help" },
        { t: 6.0, word: "you" },
        { t: 6.5, word: "today" },
      ],
    },
  },
  {
    id: "call-2",
    dealershipId: "deal-2",
    agentId: "agent-1",
    customerPhoneMasked: "***-***-5678",
    startedAt: "2024-01-15T14:15:00Z",
    durationSec: 680,
    recordingUrl: "/mock-audio/call-2.mp3",
  },
  {
    id: "call-3",
    dealershipId: "deal-1",
    agentId: "agent-4",
    customerPhoneMasked: "***-***-9012",
    startedAt: "2024-01-16T09:45:00Z",
    durationSec: 320,
    transcript: {
      items: [
        { t: 0, word: "Good" },
        { t: 0.5, word: "morning" },
        { t: 1.5, word: "I" },
        { t: 2.0, word: "understand" },
        { t: 2.8, word: "you" },
        { t: 3.2, word: "are" },
        { t: 3.6, word: "interested" },
        { t: 4.5, word: "in" },
        { t: 4.8, word: "our" },
        { t: 5.2, word: "vehicles" },
      ],
    },
  },
  {
    id: "call-4",
    dealershipId: "deal-3",
    agentId: "agent-3",
    customerPhoneMasked: "***-***-3456",
    startedAt: "2024-01-16T16:20:00Z",
    durationSec: 890,
    recordingUrl: "/mock-audio/call-4.mp3",
  },
  {
    id: "call-5",
    dealershipId: "deal-2",
    agentId: "agent-6",
    customerPhoneMasked: "***-***-7890",
    startedAt: "2024-01-17T11:10:00Z",
    durationSec: 540,
    recordingUrl: "/mock-audio/call-5.mp3",
  },
  {
    id: "call-6",
    dealershipId: "deal-4",
    agentId: "agent-5",
    customerPhoneMasked: "***-***-2468",
    startedAt: "2024-01-17T13:30:00Z",
    durationSec: 720,
  },
  {
    id: "call-7",
    dealershipId: "deal-1",
    agentId: "agent-2",
    customerPhoneMasked: "***-***-1357",
    startedAt: "2024-01-18T08:45:00Z",
    durationSec: 450,
    recordingUrl: "/mock-audio/call-7.mp3",
  },
  {
    id: "call-8",
    dealershipId: "deal-3",
    agentId: "agent-4",
    customerPhoneMasked: "***-***-9753",
    startedAt: "2024-01-18T15:00:00Z",
    durationSec: 380,
  },
  {
    id: "call-9",
    dealershipId: "deal-2",
    agentId: "agent-1",
    customerPhoneMasked: "***-***-8642",
    startedAt: "2024-01-19T10:15:00Z",
    durationSec: 620,
    recordingUrl: "/mock-audio/call-9.mp3",
  },
  {
    id: "call-10",
    dealershipId: "deal-4",
    agentId: "agent-6",
    customerPhoneMasked: "***-***-7531",
    startedAt: "2024-01-19T14:45:00Z",
    durationSec: 290,
  },
]

// Mock QA enums with mixed severities
const enums: QAEnum[] = [
  {
    id: "enum-1",
    code: "GREETING_MISSING",
    title: "Missing Professional Greeting",
    description: "Agent failed to provide a proper greeting at the start of the call",
    defaultSeverity: "MEDIUM",
    isActive: true,
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "enum-2",
    code: "PRICING_ERROR",
    title: "Incorrect Pricing Information",
    description: "Agent provided inaccurate pricing or failed to mention current promotions",
    defaultSeverity: "HIGH",
    isActive: true,
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "enum-3",
    code: "COMPLIANCE_VIOLATION",
    title: "Regulatory Compliance Issue",
    description: "Agent failed to follow required disclosure or compliance procedures",
    defaultSeverity: "CRITICAL",
    isActive: true,
    updatedAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "enum-4",
    code: "FOLLOWUP_MISSING",
    title: "No Follow-up Scheduled",
    description: "Agent did not schedule appropriate follow-up contact with customer",
    defaultSeverity: "LOW",
    isActive: true,
    updatedAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "enum-5",
    code: "INTERRUPTION",
    title: "Customer Interruption",
    description: "Agent interrupted customer while they were speaking",
    defaultSeverity: "MEDIUM",
    isActive: true,
    updatedAt: "2024-01-11T00:00:00Z",
  },
  {
    id: "enum-6",
    code: "INFO_INCOMPLETE",
    title: "Incomplete Information Gathering",
    description: "Agent failed to collect all necessary customer information",
    defaultSeverity: "HIGH",
    isActive: true,
    updatedAt: "2024-01-13T00:00:00Z",
  },
  {
    id: "enum-7",
    code: "TONE_UNPROFESSIONAL",
    title: "Unprofessional Tone",
    description: "Agent used inappropriate tone or language during the call",
    defaultSeverity: "HIGH",
    isActive: true,
    updatedAt: "2024-01-09T00:00:00Z",
  },
  {
    id: "enum-8",
    code: "HOLD_TIME_EXCESSIVE",
    title: "Excessive Hold Time",
    description: "Customer was placed on hold for longer than acceptable duration",
    defaultSeverity: "MEDIUM",
    isActive: false,
    updatedAt: "2024-01-07T00:00:00Z",
  },
]

// Mock reviews
const reviews: QAReview[] = [
  {
    id: "review-1",
    callId: "call-1",
    reviewer: "You",
    pass: true,
    overallSummary: "Good call overall, agent followed protocol well.",
    createdAt: "2024-01-15T12:00:00Z",
  },
  {
    id: "review-2",
    callId: "call-2",
    reviewer: "You",
    pass: false,
    overallSummary: "Several issues identified with pricing information and follow-up.",
    createdAt: "2024-01-15T16:30:00Z",
  },
  {
    id: "review-3",
    callId: "call-3",
    reviewer: "Sarah Johnson",
    pass: null,
    createdAt: "2024-01-16T10:15:00Z",
  },
  {
    id: "review-4",
    callId: "call-4",
    reviewer: "You",
    pass: true,
    overallSummary: "Excellent customer service, all requirements met.",
    createdAt: "2024-01-16T17:00:00Z",
  },
]

// Mock annotations
const annotations: QAAnnotation[] = [
  {
    id: "ann-1",
    reviewId: "review-2",
    callTsSec: 45,
    note: "Agent provided incorrect pricing for the 2024 model",
    severity: "HIGH",
    enumId: "enum-2",
  },
  {
    id: "ann-2",
    reviewId: "review-2",
    callTsSec: 320,
    note: "No follow-up appointment was scheduled",
    severity: "LOW",
    enumId: "enum-4",
  },
  {
    id: "ann-3",
    reviewId: "review-1",
    callTsSec: 15,
    note: "Good professional greeting",
    severity: "LOW",
  },
]

// Mock enum occurrences
const occurrences: QAEnumOccurrence[] = [
  {
    id: "occ-1",
    reviewId: "review-2",
    enumId: "enum-2",
    severity: "HIGH",
    firstSeenTsSec: 45,
    lastSeenTsSec: 45,
    evidenceCount: 1,
  },
  {
    id: "occ-2",
    reviewId: "review-2",
    enumId: "enum-4",
    severity: "LOW",
    firstSeenTsSec: 320,
    lastSeenTsSec: 320,
    evidenceCount: 1,
  },
]

// Mock resolutions
const resolutions: QAEnumResolution[] = [
  {
    enumId: "enum-8",
    scope: "GLOBAL",
    status: "SOLVED",
    effectiveFrom: "2024-01-10T00:00:00Z",
    note: "Implemented new hold time monitoring system",
  },
  {
    enumId: "enum-2",
    scope: "DEALERSHIP",
    dealershipId: "deal-2",
    status: "OPEN",
    effectiveFrom: "2024-01-15T00:00:00Z",
    note: "Pricing training scheduled for next week",
  },
]

export const MOCKS = {
  dealerships,
  agents,
  calls,
  reviews,
  enums,
  annotations,
  occurrences,
  resolutions,
}

// Helper functions for working with mock data
export const getSeverityWeight = (severity: Severity): number => {
  switch (severity) {
    case "LOW":
      return 1
    case "MEDIUM":
      return 2
    case "HIGH":
      return 3
    case "CRITICAL":
      return 4
    default:
      return 0
  }
}

export const getSeverityColor = (severity: Severity): string => {
  switch (severity) {
    case "LOW":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "HIGH":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "CRITICAL":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export const formatTimestamp = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
