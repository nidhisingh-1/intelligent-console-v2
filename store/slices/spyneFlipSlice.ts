import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {
  SpyneFlipFilters,
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

interface SpyneFlipState {
  // Filters
  filters: SpyneFlipFilters

  // Data
  overviewKPIs: OverviewKPIs | null
  aiDemoSuccessScore: AIDemoSuccessScore | null
  dealerDemos: DealerDemo[]
  salesUserMetrics: SalesUserMetrics | null
  dealerMetrics: DealerMetrics | null
  demoFunnel: DemoFunnel | null
  failureReports: FailureReport[]
  studioAIUsage: StudioAIUsage | null
  backgroundUsage: BackgroundUsage | null
  viniActivation: ViniActivation | null
  viniInteraction: ViniInteraction | null
  dealerCoverage: DealerCoverage | null
  dailyTrends: DailyTrend[]
  weeklyTrends: WeeklyTrend[]
  performanceMetrics: PerformanceMetrics | null
  reliabilityMetrics: ReliabilityMetrics | null

  // Loading states
  loading: {
    overview: boolean
    aiScore: boolean
    dealers: boolean
    usage: boolean
    funnel: boolean
    failures: boolean
    features: boolean
    vini: boolean
    coverage: boolean
    trends: boolean
    health: boolean
  }

  // Error states
  error: string | null
}

const initialFilters: SpyneFlipFilters = {
  dateRange: '7d',
  dealerType: 'all',
  pageType: 'all',
  feature: 'all',
}

const initialState: SpyneFlipState = {
  filters: initialFilters,
  overviewKPIs: null,
  aiDemoSuccessScore: null,
  dealerDemos: [],
  salesUserMetrics: null,
  dealerMetrics: null,
  demoFunnel: null,
  failureReports: [],
  studioAIUsage: null,
  backgroundUsage: null,
  viniActivation: null,
  viniInteraction: null,
  dealerCoverage: null,
  dailyTrends: [],
  weeklyTrends: [],
  performanceMetrics: null,
  reliabilityMetrics: null,
  loading: {
    overview: false,
    aiScore: false,
    dealers: false,
    usage: false,
    funnel: false,
    failures: false,
    features: false,
    vini: false,
    coverage: false,
    trends: false,
    health: false,
  },
  error: null,
}

const spyneFlipSlice = createSlice({
  name: 'spyneFlip',
  initialState,
  reducers: {
    // Update filters
    updateFilters: (state, action: PayloadAction<Partial<SpyneFlipFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    // Reset filters
    resetFilters: (state) => {
      state.filters = initialFilters
    },

    // Overview
    setOverviewKPIs: (state, action: PayloadAction<OverviewKPIs>) => {
      state.overviewKPIs = action.payload
      state.loading.overview = false
    },
    setOverviewLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.overview = action.payload
    },

    // AI Demo Success Score
    setAIDemoSuccessScore: (state, action: PayloadAction<AIDemoSuccessScore>) => {
      state.aiDemoSuccessScore = action.payload
      state.loading.aiScore = false
    },
    setAIScoreLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.aiScore = action.payload
    },

    // Dealer Demos
    setDealerDemos: (state, action: PayloadAction<DealerDemo[]>) => {
      state.dealerDemos = action.payload
      state.loading.dealers = false
    },
    setDealersLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.dealers = action.payload
    },

    // Usage & Adoption
    setSalesUserMetrics: (state, action: PayloadAction<SalesUserMetrics>) => {
      state.salesUserMetrics = action.payload
      state.loading.usage = false
    },
    setDealerMetrics: (state, action: PayloadAction<DealerMetrics>) => {
      state.dealerMetrics = action.payload
      state.loading.usage = false
    },
    setUsageLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.usage = action.payload
    },

    // Funnel
    setDemoFunnel: (state, action: PayloadAction<DemoFunnel>) => {
      state.demoFunnel = action.payload
      state.loading.funnel = false
    },
    setFunnelLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.funnel = action.payload
    },

    // Failures
    setFailureReports: (state, action: PayloadAction<FailureReport[]>) => {
      state.failureReports = action.payload
      state.loading.failures = false
    },
    setFailuresLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.failures = action.payload
    },

    // Features
    setStudioAIUsage: (state, action: PayloadAction<StudioAIUsage>) => {
      state.studioAIUsage = action.payload
      state.loading.features = false
    },
    setBackgroundUsage: (state, action: PayloadAction<BackgroundUsage>) => {
      state.backgroundUsage = action.payload
      state.loading.features = false
    },
    setFeaturesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.features = action.payload
    },

    // VINI
    setViniActivation: (state, action: PayloadAction<ViniActivation>) => {
      state.viniActivation = action.payload
      state.loading.vini = false
    },
    setViniInteraction: (state, action: PayloadAction<ViniInteraction>) => {
      state.viniInteraction = action.payload
      state.loading.vini = false
    },
    setViniLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.vini = action.payload
    },

    // Coverage
    setDealerCoverage: (state, action: PayloadAction<DealerCoverage>) => {
      state.dealerCoverage = action.payload
      state.loading.coverage = false
    },
    setCoverageLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.coverage = action.payload
    },

    // Trends
    setDailyTrends: (state, action: PayloadAction<DailyTrend[]>) => {
      state.dailyTrends = action.payload
      state.loading.trends = false
    },
    setWeeklyTrends: (state, action: PayloadAction<WeeklyTrend[]>) => {
      state.weeklyTrends = action.payload
      state.loading.trends = false
    },
    setTrendsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.trends = action.payload
    },

    // Health
    setPerformanceMetrics: (state, action: PayloadAction<PerformanceMetrics>) => {
      state.performanceMetrics = action.payload
      state.loading.health = false
    },
    setReliabilityMetrics: (state, action: PayloadAction<ReliabilityMetrics>) => {
      state.reliabilityMetrics = action.payload
      state.loading.health = false
    },
    setHealthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.health = action.payload
    },

    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    // Reset state
    reset: () => initialState,
  },
})

export const {
  updateFilters,
  resetFilters,
  setOverviewKPIs,
  setOverviewLoading,
  setAIDemoSuccessScore,
  setAIScoreLoading,
  setDealerDemos,
  setDealersLoading,
  setSalesUserMetrics,
  setDealerMetrics,
  setUsageLoading,
  setDemoFunnel,
  setFunnelLoading,
  setFailureReports,
  setFailuresLoading,
  setStudioAIUsage,
  setBackgroundUsage,
  setFeaturesLoading,
  setViniActivation,
  setViniInteraction,
  setViniLoading,
  setDealerCoverage,
  setCoverageLoading,
  setDailyTrends,
  setWeeklyTrends,
  setTrendsLoading,
  setPerformanceMetrics,
  setReliabilityMetrics,
  setHealthLoading,
  setError,
  reset,
} = spyneFlipSlice.actions

export default spyneFlipSlice.reducer

