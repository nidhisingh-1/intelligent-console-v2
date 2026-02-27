// Spyne Flip Dashboard Types

export type DateRange = 'today' | '7d' | '30d' | 'custom'

export interface SpyneFlipFilters {
  dateRange?: DateRange
  customDateFrom?: Date
  customDateTo?: Date
  salesUserId?: string
  dealerId?: string
  dealerType?: 'new' | 'existing' | 'all'
  pageType?: 'vlp' | 'vdp' | 'all'
  feature?: 'studio' | 'vini' | 'both' | 'all'
}

// Overview KPIs with time comparison
export interface KPIMetric {
  value: number
  previousValue: number
  change: number // absolute change
  changePercent: number // percentage change
}

export interface OverviewKPIs {
  totalSessions: KPIMetric
  uniqueSalesUsers: KPIMetric
  uniqueDealersDemoed: KPIMetric
  demoSuccessRate: KPIMetric // %
  avgDemoDuration: KPIMetric // in seconds
  demosWithViniPercent: KPIMetric
  demosWithStudioTransformPercent: KPIMetric
}

// AI Demo Success Score
export interface AIDemoSuccessScore {
  overallAverage: number // 0-100
  distribution: {
    high: number // >= 80
    medium: number // 50-79
    low: number // < 50
  }
  trend: Array<{
    date: string
    score: number
  }>
}

// Dealer-level view
export interface DealerDemo {
  dealerId: string
  dealerName: string
  isNewDealer: boolean
  lastDemoDate: string
  salesUserId: string
  salesUserName: string
  demoType: 'studio' | 'vini' | 'both'
  aiDemoSuccessScore: number // 0-100
  vinsProcessed: number
  viniUsed: boolean
  demoStatus: 'completed' | 'partial' | 'failed'
}

// Usage & Adoption
export interface SalesUserMetrics {
  dau: number // Daily Active Users
  wau: number // Weekly Active Users
  avgDemosPerUser: number
  repeatUsageRate: number // % users with >1 demo/week
}

export interface DealerMetrics {
  newDealersDemoed: number
  existingDealersDemoed: number
  dealersPerDay: number
  dealersPerWeek: number
  avgVinsPerDealer: number
}

// Demo Funnel
export interface FunnelStep {
  step: string
  count: number
  conversionRate: number // % from previous step
  dropOff: number // count dropped
}

export interface DemoFunnel {
  steps: FunnelStep[]
  totalSessions: number
}

// Failure & Error Reporting
export type FailureType =
  | 'plugin_crash'
  | 'dealer_detection_failed'
  | 'scan_failed'
  | 'transform_failed'
  | 'preview_load_failed'
  | 'vini_widget_init_failed'
  | 'plugin_loaded_too_frequently'

export interface FailureReport {
  type: FailureType
  count: number
  percentOfSessions: number
  lastOccurrence: string // ISO timestamp
}

// Feature-level Usage (Studio AI)
export interface StudioAIUsage {
  vlpTransformsCount: number
  vdpTransformsCount: number
  avgTransformTime: number // in seconds
  rawToTransformedToggleUsage: number // %
}

export interface BackgroundUsage {
  mostUsedBgs: Array<{ bgId: string; bgName: string; usageCount: number }>
  bgReuseRate: number // % VLP → VDP reuse
  bgChangeFrequencyPerDealer: number
}

// VINI Engagement
export interface ViniActivation {
  widgetShown: number
  widgetActivated: number
  inboundCount: number
  outboundCount: number
  agentPersonalityDistribution: Array<{ personality: string; count: number }>
}

export interface ViniInteraction {
  callsInitiated: number
  chatsInitiated: number
  emailsInitiated: number
  avgCallDuration: number // in seconds
  callsWithEndCallSummaryPercent: number
}

// Dealer Coverage
export interface DealerCoverage {
  dealersWithStudioOnly: number
  dealersWithViniOnly: number
  dealersWithBoth: number
  vinsScrapedPerDealer: number
  dealersWithCachedInventory: number
  autoRooftopSwitchSuccessRate: number // %
}

// Time-based Trends
export interface DailyTrend {
  date: string // YYYY-MM-DD
  sessions: number
  successfulSessions: number
  failedSessions: number
}

export interface WeeklyTrend {
  week: string // YYYY-WW
  sessions: number
  wowGrowth: number // % week-over-week
  failureRate: number // %
  featureAdoption: {
    studio: number
    vini: number
    both: number
  }
}

// System Health
export interface PerformanceMetrics {
  avgScanTime: number // in seconds
  avgTransformTime: number // in seconds
  avgPreviewLoadTime: number // in seconds
  avgViniWidgetLoadTime: number // in seconds
}

export interface ReliabilityMetrics {
  pluginCrashesPerDay: number
  abruptSessionTerminations: number
}

// Demo Feasibility Types
export type DemoFeasibilityStatus = 'yes' | 'no' | 'partial'

export interface DealerDemoFeasibility {
  dealerId: string
  dealerName: string
  websiteUrl: string
  flipDemoPossible: DemoFeasibilityStatus
  reason?: string // Only for 'no' or 'partial' status
  flipDemoLink?: string // Only for 'yes' status
  consoleDemoLink: string // Always available as guaranteed fallback
}

export type DemoFeasibilityReason =
  | 'spa_site'
  | 'iframe_inventory'
  | 'bot_blocked'
  | 'cdn_restrictions'
  | 'inventory_not_detectable'
  | 'dynamic_inventory_loading'
  | 'cors_restrictions'
  | 'custom_framework'

export const DEMO_FEASIBILITY_REASONS: Record<DemoFeasibilityReason, string> = {
  spa_site: 'Single-page application structure',
  iframe_inventory: 'Inventory loaded via iframe',
  bot_blocked: 'Website restricts live injection',
  cdn_restrictions: 'CDN security restrictions',
  inventory_not_detectable: 'Inventory structure not supported',
  dynamic_inventory_loading: 'Dynamic inventory loading',
  cors_restrictions: 'Cross-origin restrictions',
  custom_framework: 'Custom website framework',
}

// API Response Types
export interface SpyneFlipApiResponse<T> {
  data: T
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

// Session Event Types (for telemetry)
export interface SessionEvent {
  sessionId: string
  timestamp: string
  eventType: SessionEventType
  userId?: string
  dealerId?: string
  metadata?: Record<string, any>
}

export type SessionEventType =
  | 'plugin_opened'
  | 'dealer_detected'
  | 'profile_created'
  | 'vlp_analyze_started'
  | 'vlp_transform_completed'
  | 'website_preview_opened'
  | 'vini_triggered_vlp'
  | 'vdp_analyze_started'
  | 'vdp_transform_completed'
  | 'vini_triggered_vdp'
  | 'plugin_crash'
  | 'dealer_detection_failed'
  | 'scan_failed'
  | 'transform_failed'
  | 'preview_load_failed'
  | 'vini_widget_init_failed'
  | 'session_ended'

