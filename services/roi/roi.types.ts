// ROI Dashboard Types

export type TimeRange = 'today' | 'this_week' | 'mtd' | 'last_month' | 'custom'

export type DealerMode = 'sales' | 'service' | 'combined'

export type CallDirection = 'inbound' | 'outbound'

export type CallType = 'sales' | 'service'

export interface ROIFilters {
  timeRange: TimeRange
  mode: DealerMode
  customDateFrom?: Date
  customDateTo?: Date
}

export interface KPIMetric {
  value: number
  previousValue: number
  change: number
  changePercent: number
}

export interface RevenueKPI extends KPIMetric {
  currency: string
}

// Quadrant data (Inbound/Outbound × Sales/Service)
export interface QuadrantMetrics {
  calls: number
  qualified: number
  qualificationRate: number
  leadsDelivered: number  // transfers + callbacks
  appointmentsBooked: number
  appointmentsShown: number
  dealsClosed: number
  revenue: number
}

export interface DirectionBreakdown {
  inbound: QuadrantMetrics
  outbound: QuadrantMetrics
  total: QuadrantMetrics
}

export interface DepartmentPipeline {
  sales: DirectionBreakdown
  service: DirectionBreakdown
}

// Combined Business Summary for GM view
export interface BusinessSummary {
  totalRevenue: number
  totalRevenueChange: number
  salesRevenue: number
  serviceRevenue: number
  totalCallsHandled: number
  totalQualifiedCalls: number
  qualificationRate: number
  totalLeadsDelivered: number
  totalAppointmentsBooked: number
  totalAppointmentsShown: number
  overallShowRate: number
  carsSold: number
  repairOrdersCompleted: number
  totalDeals: number
  conversionRate: number
  estimatedCostSavings: number
  
  // Breakdown by direction
  inboundCalls: number
  outboundCalls: number
}

// Legacy types for backward compatibility
export interface SalesPipeline {
  totalCalls: number
  qualifiedCalls: number
  qualificationRate: number
  transfersAndCallbacks: number
  appointmentsBooked: number
  appointmentsShown: number
  showRate: number
  carsSold: number
  closeRate: number
  revenue: number
  // Direction breakdown
  inbound: QuadrantMetrics
  outbound: QuadrantMetrics
}

export interface ServicePipeline {
  totalCalls: number
  qualifiedCalls: number
  qualificationRate: number
  transfersAndCallbacks: number
  appointmentsBooked: number
  appointmentsShown: number
  showRate: number
  repairOrdersCompleted: number
  closeRate: number
  revenue: number
  // Direction breakdown
  inbound: QuadrantMetrics
  outbound: QuadrantMetrics
}

export interface FunnelStep {
  label: string
  value: number
  conversionRate?: number
}

export interface QualifiedCallsFunnel {
  callsHandled: FunnelStep
  qualifiedCalls: FunnelStep
  appointmentsBooked: FunnelStep
  appointmentsShown: FunnelStep
  dealsClosed: FunnelStep
  contributedRevenue: {
    value: number
    currency: string
  }
}

export interface CallBreakdown {
  sales: {
    inbound: number
    outbound: number
    qualified: number
    qualificationRate: number
  }
  service: {
    inbound: number
    outbound: number
    qualified: number
    qualificationRate: number
  }
}

export interface TransferBreakdown {
  transferred: number
  callbackArranged: number
  totalQualified: number
}

export interface ROIDashboardKPIs {
  callsHandled: KPIMetric
  qualifiedCalls: KPIMetric
  appointmentsBooked: KPIMetric
  appointmentsShown: KPIMetric
  carsSold: KPIMetric
  repairOrdersCompleted: KPIMetric
  contributedRevenue: RevenueKPI
}

export interface AIInsight {
  id: string
  message: string
  category: 'timing' | 'performance' | 'opportunity' | 'alert'
  priority: 'high' | 'medium' | 'low'
  actionUrl?: string
}

export interface TrendDataPoint {
  date: string
  value: number
  label?: string
}

export interface TrendsData {
  qualifiedCalls: TrendDataPoint[]
  appointments: TrendDataPoint[]
  revenue: TrendDataPoint[]
}

export interface AIAgent {
  id: string
  name: string
  type: 'sales' | 'service'
  direction: 'inbound' | 'outbound' | 'both'
  callsHandled: number
  qualifiedCalls: number
  qualificationRate: number
  transferred: number
  callbacksArranged: number
  avgHandleTime: number
  customerRating?: number
}

export interface AgentBreakdownSummary {
  activeAgents: number
  totalCallsHandled: number
  overallQualificationRate: number
  agents: AIAgent[]
}

export interface QualityMetric {
  name: string
  value: number
  threshold: { good: number; warning: number }
  trend: 'up' | 'down' | 'stable'
}

export interface QualitySnapshot {
  overallHealthy: boolean
  issueCount: number
  metrics: {
    qualificationRate: QualityMetric
    avgHandleTime: QualityMetric
    customerSatisfaction: QualityMetric
    transferSuccessRate: QualityMetric
  }
}

export interface Opportunity {
  id: string
  title: string
  description: string
  potentialRevenue: number
  actionLabel: string
  actionUrl?: string
  category: 'low_show_rate' | 'after_hours_volume' | 'callback_followup' | 'peak_optimization'
}

export interface OpportunitiesSummary {
  totalPotentialRevenue: number
  opportunities: Opportunity[]
}

export interface ROIDashboardData {
  businessSummary: BusinessSummary
  salesPipeline: SalesPipeline
  servicePipeline: ServicePipeline
  departmentPipeline: DepartmentPipeline
  kpis: ROIDashboardKPIs
  funnel: QualifiedCallsFunnel
  callBreakdown: CallBreakdown
  transferBreakdown: TransferBreakdown
  insight: AIInsight
  trends: TrendsData
  agentBreakdown: AgentBreakdownSummary
  qualitySnapshot: QualitySnapshot
  opportunities: OpportunitiesSummary
  lastUpdated: string
}

export function getTimeRangeLabel(range: TimeRange): string {
  switch (range) {
    case 'today':
      return 'Today'
    case 'this_week':
      return 'This Week'
    case 'mtd':
      return 'MTD'
    case 'last_month':
      return 'Last Month'
    case 'custom':
      return 'Custom'
    default:
      return 'MTD'
  }
}
