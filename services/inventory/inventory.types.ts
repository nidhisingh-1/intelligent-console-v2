export type VehicleStage = "fresh" | "watch" | "risk" | "critical"

export type CampaignStatus = "none" | "active" | "scheduled" | "completed"
export type MediaType = "clone" | "real" | "none"
export type VehicleSource = "auction" | "trade-in" | "wholesale" | "direct"
export type PriceBand = "under-25k" | "25k-35k" | "35k-50k" | "over-50k"
export type SegmentView = "stage" | "priceBand" | "source" | "mediaType"

export interface StageConfig {
  label: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  dotColor: string
  iconColor: string
  daysRange: [number, number]
}

export interface CapitalOverview {
  totalCapitalLocked: number
  totalDailyBurn: number
  avgDaysToLive: number
  capitalSavedThisMonth: number
  capitalAtRisk: number
  vehiclesInRisk: number
  vehiclesInCritical: number
  totalVehicles: number
  velocityScore: number
  marketBenchmarkDaysToLive: number
  deltas: {
    capitalLocked: number
    dailyBurn: number
    daysToLive: number
    capitalSaved: number
    capitalAtRisk: number
    riskCount: number
    velocityScore: number
  }
  trends: {
    dailyBurn: number[]
    capitalSaved: number[]
    capitalAtRisk: number[]
  }
}

export interface AgingStageData {
  stage: VehicleStage
  count: number
  totalCapital: number
  marginExposurePercent: number
  avgDaysInStock: number
  avgLeadVelocity: number
}

export interface VehicleSummary {
  vin: string
  year: number
  make: string
  model: string
  trim: string
  imageUrl: string
  stage: VehicleStage
  daysInStock: number
  dailyBurn: number
  marginRemaining: number
  grossMargin: number
  acquisitionCost: number
  leads: number
  appointments: number
  ctr: number
  campaignStatus: CampaignStatus
  mediaType: MediaType
  priceReduced: boolean
  publishStatus: "published" | "pending" | "draft"
  source: VehicleSource
  priceBand: PriceBand
  attractionRisk: AttractionRisk
  vdpViews: number
}

export interface VehicleDetail extends VehicleSummary {
  acquisitionDate: string
  grossMarginBand: "high" | "medium" | "low"
  breakEvenDays: number
  daysToLive: number
  daysSaved: number
  capitalSaved: number
  timeToFirstLead: number | null
  holdingLossSoFar: number
  campaignAttribution: string | null
  cloneMediaPerformance: {
    leads: number
    ctr: number
    appointments: number
  }
  realMediaPerformance: {
    leads: number
    ctr: number
    appointments: number
  } | null
}

export interface AccelerationImpact {
  estimatedLeadLift: string
  estimatedDaysFaster: string
  estimatedMarginRecovery: number
}

export interface CampaignActivation {
  vin: string
  marginRemaining: number
  estimatedLeadLift: number
  estimatedLeadLiftPercent: number
  estimatedMarginProtection: number
  estimatedDaysSaved: number
}

export interface OpportunityItem {
  vin: string
  year: number
  make: string
  model: string
  stage: VehicleStage
  reason: string
  action: string
  urgency: "high" | "medium" | "low"
  dollarImpact: number
}

export type AttractionRisk = "optimized" | "below-benchmark" | "low-conversion"

export interface WebsiteScoreOverview {
  score: number
  scoreDelta: number
  conversionHealth: "strong" | "moderate" | "weak"
  vdpCTR: number
  vdpCTRBenchmark: number
  leadCVR: number
  leadCVRBenchmark: number
  mediaQualityScore: number
  avgPhotosPerVIN: number
  threeSixtyVideoCoverage: number
  pageLoadSpeed: number
  leadFormVisibility: number
  ctaPlacementScore: number
  mobileOptimization: number
  mediaMix: {
    aiInstantPercent: number
    realMediaPercent: number
  }
  benchmarkRealMediaThreshold: number
  benchmarkLeadConversionLift: number
}

export interface ConversionFunnelData {
  totalVehicles: number
  vdpViews: number
  leads: number
  appointments: number
}

export interface VDPHeatmapItem {
  vin: string
  year: number
  make: string
  model: string
  vdpViews: number
  leads: number
  conversionRate: number
  category: "high-views-low-leads" | "low-visibility" | "optimized"
}

export interface RevenueLeakage {
  lowConversionVehicles: number
  estimatedAnnualMissedRevenue: number
  avgConversionGap: number
  topLeakageVINs: Array<{
    vin: string
    year: number
    make: string
    model: string
    views: number
    leads: number
    missedRevenue: number
  }>
}

export interface VehicleWebsiteHealth {
  vdpViews: number
  vdpCTR: number
  vdpCTRBenchmark: number
  leadConversion: number
  leadConversionBenchmark: number
  attractionRisk: AttractionRisk
  insight: string
}

export interface DashboardFilters {
  stage: VehicleStage | "all"
  campaignStatus: CampaignStatus | "all"
  mediaType: MediaType | "all"
  search: string
  sortBy: keyof VehicleSummary
  sortDir: "asc" | "desc"
}

export type RiskViewMode = "capital" | "attraction" | "combined"
