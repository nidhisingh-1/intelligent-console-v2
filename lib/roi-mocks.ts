// ROI Dashboard Mock Data

import type {
  ROIDashboardKPIs,
  AIInsight,
  TrendsData,
  AgentBreakdownSummary,
  QualitySnapshot,
  OpportunitiesSummary,
  QualifiedCallsFunnel,
  CallBreakdown,
  TransferBreakdown,
  BusinessSummary,
  SalesPipeline,
  ServicePipeline,
  QuadrantMetrics,
} from '@/services/roi/roi.types'

// ========================================
// QUADRANT DATA (Inbound/Outbound × Sales/Service)
// ========================================

// SALES - INBOUND (customers calling about buying)
const salesInbound: QuadrantMetrics = {
  calls: 512,
  qualified: 482,
  qualificationRate: 94.1,
  leadsDelivered: 195,
  appointmentsBooked: 156,
  appointmentsShown: 121,
  dealsClosed: 41,
  revenue: 1368000,
}

// SALES - OUTBOUND (AI following up on sales leads)
const salesOutbound: QuadrantMetrics = {
  calls: 335,
  qualified: 314,
  qualificationRate: 93.7,
  leadsDelivered: 129,
  appointmentsBooked: 100,
  appointmentsShown: 77,
  dealsClosed: 26,
  revenue: 865000,
}

// SERVICE - INBOUND (customers calling about service)
const serviceInbound: QuadrantMetrics = {
  calls: 423,
  qualified: 399,
  qualificationRate: 94.3,
  leadsDelivered: 127,
  appointmentsBooked: 96,
  appointmentsShown: 80,
  dealsClosed: 64,
  revenue: 195000,
}

// SERVICE - OUTBOUND (AI calling for service reminders)
const serviceOutbound: QuadrantMetrics = {
  calls: 210,
  qualified: 196,
  qualificationRate: 93.3,
  leadsDelivered: 62,
  appointmentsBooked: 46,
  appointmentsShown: 38,
  dealsClosed: 30,
  revenue: 92000,
}

// ========================================
// COMBINED BUSINESS SUMMARY (GM VIEW)
// ========================================

export const mockBusinessSummary: BusinessSummary = {
  // Total Revenue = Sales + Service
  totalRevenue: 2520000,
  totalRevenueChange: 14.2,
  salesRevenue: 2233000,
  serviceRevenue: 287000,
  
  // Call Metrics
  totalCallsHandled: 1480,
  inboundCalls: 935,  // 512 + 423
  outboundCalls: 545, // 335 + 210
  totalQualifiedCalls: 1391,
  qualificationRate: 94.0,
  
  // Leads & Appointments
  totalLeadsDelivered: 513,
  totalAppointmentsBooked: 398,
  totalAppointmentsShown: 316,
  overallShowRate: 79.4,
  
  // Outcomes
  carsSold: 67,
  repairOrdersCompleted: 94,
  totalDeals: 161,
  conversionRate: 31.4,
  
  // Savings
  estimatedCostSavings: 24500,
}

// ========================================
// SALES PIPELINE
// ========================================

export const mockSalesPipeline: SalesPipeline = {
  totalCalls: 847,
  qualifiedCalls: 796,
  qualificationRate: 94.0,
  transfersAndCallbacks: 324,
  appointmentsBooked: 256,
  appointmentsShown: 198,
  showRate: 77.3,
  carsSold: 67,
  closeRate: 33.8,
  revenue: 2233000,
  // Breakdown
  inbound: salesInbound,
  outbound: salesOutbound,
}

// ========================================
// SERVICE PIPELINE
// ========================================

export const mockServicePipeline: ServicePipeline = {
  totalCalls: 633,
  qualifiedCalls: 595,
  qualificationRate: 94.0,
  transfersAndCallbacks: 189,
  appointmentsBooked: 142,
  appointmentsShown: 118,
  showRate: 83.1,
  repairOrdersCompleted: 94,
  closeRate: 79.7,
  revenue: 287000,
  // Breakdown
  inbound: serviceInbound,
  outbound: serviceOutbound,
}

// ========================================
// LEGACY STRUCTURES
// ========================================

export const mockQualifiedCallsFunnel: QualifiedCallsFunnel = {
  callsHandled: { label: 'Calls Handled', value: 1480 },
  qualifiedCalls: { label: 'Qualified Calls', value: 1391, conversionRate: 94.0 },
  appointmentsBooked: { label: 'Appointments Booked', value: 398, conversionRate: 77.6 },
  appointmentsShown: { label: 'Appointments Shown', value: 316, conversionRate: 79.4 },
  dealsClosed: { label: 'Deals Closed', value: 161, conversionRate: 50.9 },
  contributedRevenue: { value: 2520000, currency: 'USD' },
}

export const mockCallBreakdown: CallBreakdown = {
  sales: {
    inbound: 512,
    outbound: 335,
    qualified: 796,
    qualificationRate: 94.0,
  },
  service: {
    inbound: 423,
    outbound: 210,
    qualified: 595,
    qualificationRate: 94.0,
  },
}

export const mockTransferBreakdown: TransferBreakdown = {
  transferred: 345,
  callbackArranged: 168,
  totalQualified: 513,
}

export const mockROIKPIs: ROIDashboardKPIs = {
  callsHandled: {
    value: 1480,
    previousValue: 1298,
    change: 182,
    changePercent: 14.0,
  },
  qualifiedCalls: {
    value: 1391,
    previousValue: 1215,
    change: 176,
    changePercent: 14.5,
  },
  appointmentsBooked: {
    value: 398,
    previousValue: 348,
    change: 50,
    changePercent: 14.4,
  },
  appointmentsShown: {
    value: 316,
    previousValue: 276,
    change: 40,
    changePercent: 14.5,
  },
  carsSold: {
    value: 67,
    previousValue: 58,
    change: 9,
    changePercent: 15.5,
  },
  repairOrdersCompleted: {
    value: 94,
    previousValue: 82,
    change: 12,
    changePercent: 14.6,
  },
  contributedRevenue: {
    value: 2520000,
    previousValue: 2198000,
    change: 322000,
    changePercent: 14.6,
    currency: 'USD',
  },
}

export const mockAIInsight: AIInsight = {
  id: 'insight-001',
  message: 'Inbound calls convert 12% better than outbound. Focus outbound on service reminders where conversion is strongest.',
  category: 'performance',
  priority: 'high',
  actionUrl: '/roi/insights',
}

export const mockTrendsData: TrendsData = {
  qualifiedCalls: [
    { date: '2025-12-09', value: 185, label: 'Week 1' },
    { date: '2025-12-16', value: 312, label: 'Week 2' },
    { date: '2025-12-23', value: 398, label: 'Week 3' },
    { date: '2025-12-30', value: 496, label: 'Week 4' },
  ],
  appointments: [
    { date: '2025-12-09', value: 82, label: 'Week 1' },
    { date: '2025-12-16', value: 138, label: 'Week 2' },
    { date: '2025-12-23', value: 176, label: 'Week 3' },
    { date: '2025-12-30', value: 220, label: 'Week 4' },
  ],
  revenue: [
    { date: '2025-12-09', value: 420000, label: 'Week 1' },
    { date: '2025-12-16', value: 580000, label: 'Week 2' },
    { date: '2025-12-23', value: 720000, label: 'Week 3' },
    { date: '2025-12-30', value: 800000, label: 'Week 4' },
  ],
}

export const mockAgentBreakdown: AgentBreakdownSummary = {
  activeAgents: 4,
  totalCallsHandled: 1480,
  overallQualificationRate: 94.0,
  agents: [
    {
      id: 'agent-001',
      name: 'Sales Inbound AI',
      type: 'sales',
      direction: 'inbound',
      callsHandled: 512,
      qualifiedCalls: 482,
      qualificationRate: 94.1,
      transferred: 125,
      callbacksArranged: 70,
      avgHandleTime: 185,
      customerRating: 4.7,
    },
    {
      id: 'agent-002',
      name: 'Sales Outbound AI',
      type: 'sales',
      direction: 'outbound',
      callsHandled: 335,
      qualifiedCalls: 314,
      qualificationRate: 93.7,
      transferred: 82,
      callbacksArranged: 47,
      avgHandleTime: 142,
      customerRating: 4.6,
    },
    {
      id: 'agent-003',
      name: 'Service Inbound AI',
      type: 'service',
      direction: 'inbound',
      callsHandled: 423,
      qualifiedCalls: 399,
      qualificationRate: 94.3,
      transferred: 89,
      callbacksArranged: 38,
      avgHandleTime: 156,
      customerRating: 4.8,
    },
    {
      id: 'agent-004',
      name: 'Service Outbound AI',
      type: 'service',
      direction: 'outbound',
      callsHandled: 210,
      qualifiedCalls: 196,
      qualificationRate: 93.3,
      transferred: 49,
      callbacksArranged: 13,
      avgHandleTime: 128,
      customerRating: 4.5,
    },
  ],
}

export const mockQualitySnapshot: QualitySnapshot = {
  overallHealthy: true,
  issueCount: 0,
  metrics: {
    qualificationRate: {
      name: 'Qualification Rate',
      value: 94.0,
      threshold: { good: 90, warning: 80 },
      trend: 'up',
    },
    avgHandleTime: {
      name: 'Avg Handle Time',
      value: 156,
      threshold: { good: 180, warning: 240 },
      trend: 'stable',
    },
    customerSatisfaction: {
      name: 'Customer Satisfaction',
      value: 4.7,
      threshold: { good: 4.5, warning: 4.0 },
      trend: 'up',
    },
    transferSuccessRate: {
      name: 'Transfer Success',
      value: 98.2,
      threshold: { good: 95, warning: 90 },
      trend: 'stable',
    },
  },
}

export const mockOpportunities: OpportunitiesSummary = {
  totalPotentialRevenue: 142500,
  opportunities: [
    {
      id: 'opp-001',
      title: '115 qualified leads didn\'t book',
      description: 'AI delivered 513 qualified leads (transfers + callbacks). Only 398 became appointments. Follow up on the 115 that didn\'t book.',
      potentialRevenue: 53000,
      actionLabel: 'View unboooked leads',
      category: 'callback_followup',
    },
    {
      id: 'opp-002',
      title: '82 appointments didn\'t show',
      description: 'Of 398 appointments booked, 82 didn\'t show up. Automated reminders 2hrs before could recover 30%.',
      potentialRevenue: 58000,
      actionLabel: 'Enable reminders',
      category: 'low_show_rate',
    },
    {
      id: 'opp-003',
      title: '168 callbacks still pending',
      description: 'These callbacks were scheduled by AI but not yet completed by your team. Each day delay reduces conversion.',
      potentialRevenue: 18500,
      actionLabel: 'View callback list',
      category: 'callback_followup',
    },
    {
      id: 'opp-004',
      title: 'Service outbound converting well',
      description: 'Service outbound has 48% close rate vs 20% for sales outbound. Consider shifting outbound capacity to service.',
      potentialRevenue: 13000,
      actionLabel: 'View breakdown',
      category: 'peak_optimization',
    },
  ],
}
