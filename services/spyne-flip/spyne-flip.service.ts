import { apiClient } from '../api/client'
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
  SpyneFlipApiResponse,
} from './spyne-flip.types'
import {
  mockOverviewKPIs,
  mockAIDemoSuccessScore,
  mockDealerDemos,
  mockSalesUserMetrics,
  mockDealerMetrics,
  mockDemoFunnel,
  mockFailureReports,
  mockStudioAIUsage,
  mockBackgroundUsage,
  mockViniActivation,
  mockViniInteraction,
  mockDealerCoverage,
  mockDailyTrends,
  mockWeeklyTrends,
  mockPerformanceMetrics,
  mockReliabilityMetrics,
} from '@/lib/spyne-flip-mocks'

// Set to true to use mock data instead of API calls
const USE_MOCK_DATA = true

export class SpyneFlipService {
  private buildQueryParams(filters: SpyneFlipFilters): URLSearchParams {
    const params = new URLSearchParams()

    if (filters.dateRange) {
      params.append('dateRange', filters.dateRange)
    }
    if (filters.customDateFrom) {
      params.append('customDateFrom', filters.customDateFrom.toISOString())
    }
    if (filters.customDateTo) {
      params.append('customDateTo', filters.customDateTo.toISOString())
    }
    if (filters.salesUserId) {
      params.append('salesUserId', filters.salesUserId)
    }
    if (filters.dealerId) {
      params.append('dealerId', filters.dealerId)
    }
    if (filters.dealerType && filters.dealerType !== 'all') {
      params.append('dealerType', filters.dealerType)
    }
    if (filters.pageType && filters.pageType !== 'all') {
      params.append('pageType', filters.pageType)
    }
    if (filters.feature && filters.feature !== 'all') {
      params.append('feature', filters.feature)
    }

    return params
  }

  /**
   * Get Overview KPIs
   */
  async getOverviewKPIs(filters: SpyneFlipFilters = {}): Promise<OverviewKPIs> {
    if (USE_MOCK_DATA) return mockOverviewKPIs
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/overview/kpis${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<OverviewKPIs>>(endpoint)
    return response.data
  }

  /**
   * Get AI Demo Success Score
   */
  async getAIDemoSuccessScore(filters: SpyneFlipFilters = {}): Promise<AIDemoSuccessScore> {
    if (USE_MOCK_DATA) return mockAIDemoSuccessScore
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/ai-demo-success-score${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<AIDemoSuccessScore>>(endpoint)
    return response.data
  }

  /**
   * Get Dealer Demos (for dealer-level view table)
   */
  async getDealerDemos(
    filters: SpyneFlipFilters = {},
    page: number = 1,
    limit: number = 50
  ): Promise<SpyneFlipApiResponse<DealerDemo[]>> {
    if (USE_MOCK_DATA) {
      return {
        data: mockDealerDemos,
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: mockDealerDemos.length,
          itemsPerPage: limit,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }
    }
    const params = this.buildQueryParams(filters)
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    const endpoint = `/spyne-flip/dealers/demos${params.toString() ? `?${params.toString()}` : ''}`
    return apiClient.get<SpyneFlipApiResponse<DealerDemo[]>>(endpoint)
  }

  /**
   * Get Sales User Metrics
   */
  async getSalesUserMetrics(filters: SpyneFlipFilters = {}): Promise<SalesUserMetrics> {
    if (USE_MOCK_DATA) return mockSalesUserMetrics
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/usage/sales-users${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<SalesUserMetrics>>(endpoint)
    return response.data
  }

  /**
   * Get Dealer Metrics
   */
  async getDealerMetrics(filters: SpyneFlipFilters = {}): Promise<DealerMetrics> {
    if (USE_MOCK_DATA) return mockDealerMetrics
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/usage/dealers${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<DealerMetrics>>(endpoint)
    return response.data
  }

  /**
   * Get Demo Funnel
   */
  async getDemoFunnel(filters: SpyneFlipFilters = {}): Promise<DemoFunnel> {
    if (USE_MOCK_DATA) return mockDemoFunnel
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/funnel${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<DemoFunnel>>(endpoint)
    return response.data
  }

  /**
   * Get Failure Reports
   */
  async getFailureReports(filters: SpyneFlipFilters = {}): Promise<FailureReport[]> {
    if (USE_MOCK_DATA) return mockFailureReports
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/failures${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<FailureReport[]>>(endpoint)
    return response.data
  }

  /**
   * Get Studio AI Usage
   */
  async getStudioAIUsage(filters: SpyneFlipFilters = {}): Promise<StudioAIUsage> {
    if (USE_MOCK_DATA) return mockStudioAIUsage
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/features/studio-ai${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<StudioAIUsage>>(endpoint)
    return response.data
  }

  /**
   * Get Background Usage
   */
  async getBackgroundUsage(filters: SpyneFlipFilters = {}): Promise<BackgroundUsage> {
    if (USE_MOCK_DATA) return mockBackgroundUsage
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/features/backgrounds${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<BackgroundUsage>>(endpoint)
    return response.data
  }

  /**
   * Get VINI Activation Metrics
   */
  async getViniActivation(filters: SpyneFlipFilters = {}): Promise<ViniActivation> {
    if (USE_MOCK_DATA) return mockViniActivation
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/vini/activation${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<ViniActivation>>(endpoint)
    return response.data
  }

  /**
   * Get VINI Interaction Metrics
   */
  async getViniInteraction(filters: SpyneFlipFilters = {}): Promise<ViniInteraction> {
    if (USE_MOCK_DATA) return mockViniInteraction
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/vini/interaction${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<ViniInteraction>>(endpoint)
    return response.data
  }

  /**
   * Get Dealer Coverage
   */
  async getDealerCoverage(filters: SpyneFlipFilters = {}): Promise<DealerCoverage> {
    if (USE_MOCK_DATA) return mockDealerCoverage
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/coverage/dealers${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<DealerCoverage>>(endpoint)
    return response.data
  }

  /**
   * Get Daily Trends
   */
  async getDailyTrends(filters: SpyneFlipFilters = {}): Promise<DailyTrend[]> {
    if (USE_MOCK_DATA) return mockDailyTrends
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/trends/daily${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<DailyTrend[]>>(endpoint)
    return response.data
  }

  /**
   * Get Weekly Trends
   */
  async getWeeklyTrends(filters: SpyneFlipFilters = {}): Promise<WeeklyTrend[]> {
    if (USE_MOCK_DATA) return mockWeeklyTrends
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/trends/weekly${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<WeeklyTrend[]>>(endpoint)
    return response.data
  }

  /**
   * Get Performance Metrics
   */
  async getPerformanceMetrics(filters: SpyneFlipFilters = {}): Promise<PerformanceMetrics> {
    if (USE_MOCK_DATA) return mockPerformanceMetrics
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/health/performance${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<PerformanceMetrics>>(endpoint)
    return response.data
  }

  /**
   * Get Reliability Metrics
   */
  async getReliabilityMetrics(filters: SpyneFlipFilters = {}): Promise<ReliabilityMetrics> {
    if (USE_MOCK_DATA) return mockReliabilityMetrics
    const params = this.buildQueryParams(filters)
    const endpoint = `/spyne-flip/health/reliability${params.toString() ? `?${params.toString()}` : ''}`
    const response = await apiClient.get<SpyneFlipApiResponse<ReliabilityMetrics>>(endpoint)
    return response.data
  }
}

// Export singleton instance
export const spyneFlipService = new SpyneFlipService()

