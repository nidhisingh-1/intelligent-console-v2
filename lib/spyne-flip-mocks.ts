// Mock data for Spyne Flip Dashboard (development purposes)
import type {
  OverviewKPIs,
  AIDemoSuccessScore,
  DealerDemo,
  SalesUserMetrics,
  DealerMetrics,
  DemoFunnel,
  FailureReport,
  StudioAIUsage,
  BackgroundUsage,
  ViniActivation,
  ViniInteraction,
  DealerCoverage,
  DailyTrend,
  WeeklyTrend,
  PerformanceMetrics,
  ReliabilityMetrics,
} from '@/services/spyne-flip/spyne-flip.types'

// Overview KPIs Mock Data
export const mockOverviewKPIs: OverviewKPIs = {
  totalSessions: {
    value: 1284,
    previousValue: 1156,
    change: 128,
    changePercent: 11.07,
  },
  uniqueSalesUsers: {
    value: 47,
    previousValue: 42,
    change: 5,
    changePercent: 11.9,
  },
  uniqueDealersDemoed: {
    value: 312,
    previousValue: 278,
    change: 34,
    changePercent: 12.23,
  },
  demoSuccessRate: {
    value: 78.4,
    previousValue: 72.1,
    change: 6.3,
    changePercent: 8.74,
  },
  avgDemoDuration: {
    value: 342,
    previousValue: 318,
    change: 24,
    changePercent: 7.55,
  },
  demosWithViniPercent: {
    value: 64.2,
    previousValue: 58.9,
    change: 5.3,
    changePercent: 9.0,
  },
  demosWithStudioTransformPercent: {
    value: 82.7,
    previousValue: 79.3,
    change: 3.4,
    changePercent: 4.29,
  },
}

// AI Demo Success Score Mock Data
export const mockAIDemoSuccessScore: AIDemoSuccessScore = {
  overallAverage: 73.2,
  distribution: {
    high: 342,
    medium: 567,
    low: 375,
  },
  trend: [
    { date: '2025-12-30', score: 68 },
    { date: '2025-12-31', score: 71 },
    { date: '2026-01-01', score: 69 },
    { date: '2026-01-02', score: 74 },
    { date: '2026-01-03', score: 76 },
    { date: '2026-01-04', score: 73 },
    { date: '2026-01-05', score: 78 },
  ],
}

// Dealer Demo Mock Data
export const mockDealerDemos: DealerDemo[] = [
  {
    dealerId: 'd-001',
    dealerName: 'AutoNation Toyota Downtown',
    isNewDealer: true,
    lastDemoDate: '2026-01-05T14:32:00Z',
    salesUserId: 'su-001',
    salesUserName: 'Sarah Johnson',
    demoType: 'both',
    aiDemoSuccessScore: 92,
    vinsProcessed: 24,
    viniUsed: true,
    demoStatus: 'completed',
  },
  {
    dealerId: 'd-002',
    dealerName: 'Pacific Honda',
    isNewDealer: false,
    lastDemoDate: '2026-01-05T11:15:00Z',
    salesUserId: 'su-002',
    salesUserName: 'Mike Chen',
    demoType: 'studio',
    aiDemoSuccessScore: 78,
    vinsProcessed: 18,
    viniUsed: false,
    demoStatus: 'completed',
  },
  {
    dealerId: 'd-003',
    dealerName: 'Luxury Motors BMW',
    isNewDealer: true,
    lastDemoDate: '2026-01-05T09:45:00Z',
    salesUserId: 'su-003',
    salesUserName: 'Emily Rodriguez',
    demoType: 'both',
    aiDemoSuccessScore: 85,
    vinsProcessed: 31,
    viniUsed: true,
    demoStatus: 'completed',
  },
  {
    dealerId: 'd-004',
    dealerName: 'Valley Ford',
    isNewDealer: false,
    lastDemoDate: '2026-01-04T16:20:00Z',
    salesUserId: 'su-001',
    salesUserName: 'Sarah Johnson',
    demoType: 'vini',
    aiDemoSuccessScore: 45,
    vinsProcessed: 0,
    viniUsed: true,
    demoStatus: 'partial',
  },
  {
    dealerId: 'd-005',
    dealerName: 'Premier Chevrolet',
    isNewDealer: true,
    lastDemoDate: '2026-01-04T14:00:00Z',
    salesUserId: 'su-004',
    salesUserName: 'David Kim',
    demoType: 'studio',
    aiDemoSuccessScore: 32,
    vinsProcessed: 5,
    viniUsed: false,
    demoStatus: 'failed',
  },
  {
    dealerId: 'd-006',
    dealerName: 'Sunset Nissan',
    isNewDealer: false,
    lastDemoDate: '2026-01-04T10:30:00Z',
    salesUserId: 'su-002',
    salesUserName: 'Mike Chen',
    demoType: 'both',
    aiDemoSuccessScore: 88,
    vinsProcessed: 22,
    viniUsed: true,
    demoStatus: 'completed',
  },
  {
    dealerId: 'd-007',
    dealerName: 'Mountain View Kia',
    isNewDealer: true,
    lastDemoDate: '2026-01-03T15:45:00Z',
    salesUserId: 'su-005',
    salesUserName: 'Lisa Park',
    demoType: 'both',
    aiDemoSuccessScore: 71,
    vinsProcessed: 15,
    viniUsed: true,
    demoStatus: 'completed',
  },
  {
    dealerId: 'd-008',
    dealerName: 'Metro Hyundai',
    isNewDealer: false,
    lastDemoDate: '2026-01-03T11:20:00Z',
    salesUserId: 'su-003',
    salesUserName: 'Emily Rodriguez',
    demoType: 'studio',
    aiDemoSuccessScore: 67,
    vinsProcessed: 12,
    viniUsed: false,
    demoStatus: 'partial',
  },
  {
    dealerId: 'd-009',
    dealerName: 'Coastal Mazda',
    isNewDealer: true,
    lastDemoDate: '2026-01-02T14:10:00Z',
    salesUserId: 'su-001',
    salesUserName: 'Sarah Johnson',
    demoType: 'both',
    aiDemoSuccessScore: 94,
    vinsProcessed: 28,
    viniUsed: true,
    demoStatus: 'completed',
  },
  {
    dealerId: 'd-010',
    dealerName: 'Downtown Subaru',
    isNewDealer: false,
    lastDemoDate: '2026-01-02T09:00:00Z',
    salesUserId: 'su-004',
    salesUserName: 'David Kim',
    demoType: 'vini',
    aiDemoSuccessScore: 56,
    vinsProcessed: 8,
    viniUsed: true,
    demoStatus: 'partial',
  },
]

// Sales User Metrics Mock Data
export const mockSalesUserMetrics: SalesUserMetrics = {
  dau: 32,
  wau: 47,
  avgDemosPerUser: 4.2,
  repeatUsageRate: 76.5,
}

// Dealer Metrics Mock Data
export const mockDealerMetrics: DealerMetrics = {
  newDealersDemoed: 128,
  existingDealersDemoed: 184,
  dealersPerDay: 44.6,
  dealersPerWeek: 312,
  avgVinsPerDealer: 18.3,
}

// Demo Funnel Mock Data
export const mockDemoFunnel: DemoFunnel = {
  totalSessions: 1284,
  steps: [
    { step: 'Plugin Opened', count: 1284, conversionRate: 100, dropOff: 0 },
    { step: 'Dealer Detected', count: 1198, conversionRate: 93.3, dropOff: 86 },
    { step: 'Profile Created', count: 412, conversionRate: 34.4, dropOff: 786 },
    { step: 'VLP Analyze Started', count: 1089, conversionRate: 90.9, dropOff: 109 },
    { step: 'VLP Transform Completed', count: 962, conversionRate: 88.3, dropOff: 127 },
    { step: 'Website Preview Opened', count: 847, conversionRate: 88.0, dropOff: 115 },
    { step: 'VINI Triggered on VLP', count: 624, conversionRate: 73.7, dropOff: 223 },
    { step: 'VDP Analyze Started', count: 578, conversionRate: 92.6, dropOff: 46 },
    { step: 'VDP Transform Completed', count: 498, conversionRate: 86.2, dropOff: 80 },
    { step: 'VINI Triggered on VDP', count: 342, conversionRate: 68.7, dropOff: 156 },
  ],
}

// Failure Reports Mock Data
export const mockFailureReports: FailureReport[] = [
  {
    type: 'plugin_crash',
    count: 23,
    percentOfSessions: 1.79,
    lastOccurrence: '2026-01-05T13:45:00Z',
  },
  {
    type: 'dealer_detection_failed',
    count: 86,
    percentOfSessions: 6.70,
    lastOccurrence: '2026-01-05T14:12:00Z',
  },
  {
    type: 'scan_failed',
    count: 45,
    percentOfSessions: 3.50,
    lastOccurrence: '2026-01-05T11:30:00Z',
  },
  {
    type: 'transform_failed',
    count: 127,
    percentOfSessions: 9.89,
    lastOccurrence: '2026-01-05T15:20:00Z',
  },
  {
    type: 'preview_load_failed',
    count: 38,
    percentOfSessions: 2.96,
    lastOccurrence: '2026-01-05T10:45:00Z',
  },
  {
    type: 'vini_widget_init_failed',
    count: 52,
    percentOfSessions: 4.05,
    lastOccurrence: '2026-01-05T12:00:00Z',
  },
  {
    type: 'plugin_loaded_too_frequently',
    count: 18,
    percentOfSessions: 1.40,
    lastOccurrence: '2026-01-04T16:30:00Z',
  },
]

// Studio AI Usage Mock Data
export const mockStudioAIUsage: StudioAIUsage = {
  vlpTransformsCount: 962,
  vdpTransformsCount: 498,
  avgTransformTime: 4.2,
  rawToTransformedToggleUsage: 67.8,
}

// Background Usage Mock Data
export const mockBackgroundUsage: BackgroundUsage = {
  mostUsedBgs: [
    { bgId: 'bg-001', bgName: 'Studio White', usageCount: 342 },
    { bgId: 'bg-002', bgName: 'Outdoor Showroom', usageCount: 287 },
    { bgId: 'bg-003', bgName: 'Luxury Garage', usageCount: 198 },
    { bgId: 'bg-004', bgName: 'Urban Street', usageCount: 156 },
    { bgId: 'bg-005', bgName: 'Mountain Road', usageCount: 89 },
  ],
  bgReuseRate: 72.4,
  bgChangeFrequencyPerDealer: 2.3,
}

// VINI Activation Mock Data
export const mockViniActivation: ViniActivation = {
  widgetShown: 847,
  widgetActivated: 624,
  inboundCount: 287,
  outboundCount: 337,
  agentPersonalityDistribution: [
    { personality: 'Professional', count: 312 },
    { personality: 'Friendly', count: 198 },
    { personality: 'Casual', count: 89 },
    { personality: 'Formal', count: 25 },
  ],
}

// VINI Interaction Mock Data
export const mockViniInteraction: ViniInteraction = {
  callsInitiated: 456,
  chatsInitiated: 234,
  emailsInitiated: 89,
  avgCallDuration: 187,
  callsWithEndCallSummaryPercent: 84.2,
}

// Dealer Coverage Mock Data
export const mockDealerCoverage: DealerCoverage = {
  dealersWithStudioOnly: 98,
  dealersWithViniOnly: 34,
  dealersWithBoth: 180,
  vinsScrapedPerDealer: 18.3,
  dealersWithCachedInventory: 245,
  autoRooftopSwitchSuccessRate: 91.2,
}

// Daily Trends Mock Data
export const mockDailyTrends: DailyTrend[] = [
  { date: '2025-12-30', sessions: 156, successfulSessions: 118, failedSessions: 38 },
  { date: '2025-12-31', sessions: 142, successfulSessions: 109, failedSessions: 33 },
  { date: '2026-01-01', sessions: 98, successfulSessions: 72, failedSessions: 26 },
  { date: '2026-01-02', sessions: 178, successfulSessions: 142, failedSessions: 36 },
  { date: '2026-01-03', sessions: 201, successfulSessions: 162, failedSessions: 39 },
  { date: '2026-01-04', sessions: 234, successfulSessions: 189, failedSessions: 45 },
  { date: '2026-01-05', sessions: 275, successfulSessions: 215, failedSessions: 60 },
]

// Weekly Trends Mock Data
export const mockWeeklyTrends: WeeklyTrend[] = [
  {
    week: '2025-W49',
    sessions: 987,
    wowGrowth: 5.2,
    failureRate: 18.4,
    featureAdoption: { studio: 78, vini: 52, both: 45 },
  },
  {
    week: '2025-W50',
    sessions: 1045,
    wowGrowth: 5.9,
    failureRate: 17.8,
    featureAdoption: { studio: 80, vini: 55, both: 48 },
  },
  {
    week: '2025-W51',
    sessions: 1098,
    wowGrowth: 5.1,
    failureRate: 16.9,
    featureAdoption: { studio: 81, vini: 58, both: 52 },
  },
  {
    week: '2025-W52',
    sessions: 1156,
    wowGrowth: 5.3,
    failureRate: 16.2,
    featureAdoption: { studio: 82, vini: 60, both: 54 },
  },
  {
    week: '2026-W01',
    sessions: 1284,
    wowGrowth: 11.1,
    failureRate: 15.4,
    featureAdoption: { studio: 83, vini: 64, both: 58 },
  },
]

// Performance Metrics Mock Data
export const mockPerformanceMetrics: PerformanceMetrics = {
  avgScanTime: 2.8,
  avgTransformTime: 4.2,
  avgPreviewLoadTime: 1.5,
  avgViniWidgetLoadTime: 0.8,
}

// Reliability Metrics Mock Data
export const mockReliabilityMetrics: ReliabilityMetrics = {
  pluginCrashesPerDay: 3.3,
  abruptSessionTerminations: 47,
}

// Sales Users Mock Data for filters
export const mockSalesUsers = [
  { id: 'su-001', name: 'Sarah Johnson', email: 'sarah.johnson@spyne.ai' },
  { id: 'su-002', name: 'Mike Chen', email: 'mike.chen@spyne.ai' },
  { id: 'su-003', name: 'Emily Rodriguez', email: 'emily.rodriguez@spyne.ai' },
  { id: 'su-004', name: 'David Kim', email: 'david.kim@spyne.ai' },
  { id: 'su-005', name: 'Lisa Park', email: 'lisa.park@spyne.ai' },
]

// Dealers Mock Data for filters
export const mockDealers = mockDealerDemos.map((d) => ({
  id: d.dealerId,
  name: d.dealerName,
}))

// Sales Leaderboard Mock Data
export interface SalesLeaderboardEntry {
  userId: string
  userName: string
  totalDemos: number
  successfulDemos: number
  successRate: number
  avgScore: number
  dealersDemoed: number
  viniUsageRate: number
  rank: number
  rankChange: number // positive = moved up, negative = moved down
}

export const mockSalesLeaderboard: SalesLeaderboardEntry[] = [
  {
    userId: 'su-001',
    userName: 'Sarah Johnson',
    totalDemos: 87,
    successfulDemos: 78,
    successRate: 89.7,
    avgScore: 91,
    dealersDemoed: 62,
    viniUsageRate: 82.3,
    rank: 1,
    rankChange: 0,
  },
  {
    userId: 'su-003',
    userName: 'Emily Rodriguez',
    totalDemos: 72,
    successfulDemos: 63,
    successRate: 87.5,
    avgScore: 86,
    dealersDemoed: 54,
    viniUsageRate: 78.4,
    rank: 2,
    rankChange: 2,
  },
  {
    userId: 'su-002',
    userName: 'Mike Chen',
    totalDemos: 68,
    successfulDemos: 58,
    successRate: 85.3,
    avgScore: 83,
    dealersDemoed: 48,
    viniUsageRate: 71.2,
    rank: 3,
    rankChange: -1,
  },
  {
    userId: 'su-005',
    userName: 'Lisa Park',
    totalDemos: 54,
    successfulDemos: 45,
    successRate: 83.3,
    avgScore: 79,
    dealersDemoed: 41,
    viniUsageRate: 68.5,
    rank: 4,
    rankChange: 1,
  },
  {
    userId: 'su-004',
    userName: 'David Kim',
    totalDemos: 45,
    successfulDemos: 34,
    successRate: 75.6,
    avgScore: 72,
    dealersDemoed: 32,
    viniUsageRate: 55.2,
    rank: 5,
    rankChange: -2,
  },
  {
    userId: 'su-006',
    userName: 'Alex Thompson',
    totalDemos: 38,
    successfulDemos: 31,
    successRate: 81.6,
    avgScore: 77,
    dealersDemoed: 29,
    viniUsageRate: 62.1,
    rank: 6,
    rankChange: 0,
  },
  {
    userId: 'su-007',
    userName: 'Jessica Lee',
    totalDemos: 32,
    successfulDemos: 26,
    successRate: 81.3,
    avgScore: 74,
    dealersDemoed: 25,
    viniUsageRate: 58.8,
    rank: 7,
    rankChange: 1,
  },
  {
    userId: 'su-008',
    userName: 'Ryan Martinez',
    totalDemos: 28,
    successfulDemos: 22,
    successRate: 78.6,
    avgScore: 71,
    dealersDemoed: 21,
    viniUsageRate: 52.4,
    rank: 8,
    rankChange: -1,
  },
]

// Dealer Coverage Split Mock Data
export interface DealerCoverageSplit {
  studioOnly: { count: number; percentage: number; topDealers: string[] }
  viniOnly: { count: number; percentage: number; topDealers: string[] }
  both: { count: number; percentage: number; topDealers: string[] }
  total: number
}

export const mockDealerCoverageSplit: DealerCoverageSplit = {
  studioOnly: {
    count: 98,
    percentage: 31.4,
    topDealers: ['Pacific Honda', 'Metro Hyundai', 'Central Auto'],
  },
  viniOnly: {
    count: 34,
    percentage: 10.9,
    topDealers: ['Valley Ford', 'Downtown Subaru', 'Quick Cars'],
  },
  both: {
    count: 180,
    percentage: 57.7,
    topDealers: ['AutoNation Toyota', 'Luxury Motors BMW', 'Sunset Nissan'],
  },
  total: 312,
}

// Usage Heatmap Mock Data (hour x day of week)
export interface UsageHeatmapCell {
  day: number // 0-6 (Mon-Sun)
  hour: number // 0-23
  sessions: number
}

export const mockUsageHeatmap: UsageHeatmapCell[] = (() => {
  const data: UsageHeatmapCell[] = []
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Business hours (9-18) on weekdays have higher activity
      let sessions = Math.floor(Math.random() * 10) + 1
      if (day < 5 && hour >= 9 && hour <= 17) {
        sessions = Math.floor(Math.random() * 40) + 15
        // Peak hours 10-12 and 14-16
        if ((hour >= 10 && hour <= 12) || (hour >= 14 && hour <= 16)) {
          sessions = Math.floor(Math.random() * 30) + 25
        }
      }
      data.push({ day, hour, sessions })
    }
  }
  return data
})()

// Feature Adoption Mock Data
export interface FeatureAdoptionData {
  name: string
  adoption: number
  users: number
  trend: number
  color: string
}

export const mockFeatureAdoption: FeatureAdoptionData[] = [
  { name: 'VLP Transform', adoption: 83, users: 39, trend: 5.2, color: '#8b5cf6' },
  { name: 'VDP Transform', adoption: 68, users: 32, trend: 8.4, color: '#06b6d4' },
  { name: 'VINI Activation', adoption: 64, users: 30, trend: 12.1, color: '#10b981' },
  { name: 'Background Selection', adoption: 72, users: 34, trend: 3.6, color: '#f59e0b' },
  { name: 'Preview Mode', adoption: 78, users: 37, trend: -2.1, color: '#ec4899' },
]

// User Activity Timeline Mock Data
export interface UserActivityData {
  day: string
  activeUsers: number
  newUsers: number
  sessions: number
}

export const mockUserActivityTimeline: UserActivityData[] = [
  { day: 'Mon', activeUsers: 28, newUsers: 3, sessions: 156 },
  { day: 'Tue', activeUsers: 32, newUsers: 5, sessions: 178 },
  { day: 'Wed', activeUsers: 35, newUsers: 4, sessions: 201 },
  { day: 'Thu', activeUsers: 38, newUsers: 6, sessions: 224 },
  { day: 'Fri', activeUsers: 34, newUsers: 2, sessions: 198 },
  { day: 'Sat', activeUsers: 12, newUsers: 1, sessions: 45 },
  { day: 'Sun', activeUsers: 8, newUsers: 0, sessions: 28 },
]

// Session Duration Distribution Mock Data
export interface SessionDurationData {
  range: string
  count: number
}

export const mockSessionDurationDistribution: SessionDurationData[] = [
  { range: '<1 min', count: 45 },
  { range: '1-2 min', count: 89 },
  { range: '2-5 min', count: 234 },
  { range: '5-10 min', count: 412 },
  { range: '10-15 min', count: 287 },
  { range: '15-30 min', count: 156 },
  { range: '>30 min', count: 61 },
]

