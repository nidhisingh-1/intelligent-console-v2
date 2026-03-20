import type {
  CapitalOverview,
  AgingStageData,
  VehicleSummary,
  VehicleDetail,
  StageConfig,
  VehicleStage,
  OpportunityItem,
  AccelerationImpact,
  WebsiteScoreOverview,
  ConversionFunnelData,
  VDPHeatmapItem,
  RevenueLeakage,
  VehicleWebsiteHealth,
} from "@/services/inventory/inventory.types"

export const STAGE_CONFIG: Record<VehicleStage, StageConfig> = {
  fresh: {
    label: "Fresh",
    color: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    dotColor: "bg-emerald-400",
    iconColor: "text-emerald-500",
    daysRange: [0, 15],
  },
  watch: {
    label: "Watch",
    color: "bg-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    dotColor: "bg-amber-400",
    iconColor: "text-amber-500",
    daysRange: [16, 30],
  },
  risk: {
    label: "Risk",
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    dotColor: "bg-orange-400",
    iconColor: "text-orange-500",
    daysRange: [31, 50],
  },
  critical: {
    label: "Critical",
    color: "bg-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    dotColor: "bg-red-400",
    iconColor: "text-red-500",
    daysRange: [51, 999],
  },
}

export const STAGE_ORDER: VehicleStage[] = ["fresh", "watch", "risk", "critical"]

export const mockCapitalOverview: CapitalOverview = {
  totalCapitalLocked: 4_820_000,
  totalDailyBurn: 12_640,
  avgDaysToLive: 18.4,
  capitalSavedThisMonth: 186_400,
  capitalAtRisk: 412_000,
  vehiclesInRisk: 24,
  vehiclesInCritical: 9,
  totalVehicles: 142,
  velocityScore: 72,
  marketBenchmarkDaysToLive: 24,
  deltas: {
    capitalLocked: -3.2,
    dailyBurn: -8.1,
    daysToLive: 2.4,
    capitalSaved: 14.6,
    capitalAtRisk: -6.8,
    riskCount: -12.0,
    velocityScore: 4.2,
  },
  trends: {
    dailyBurn: [14200, 13800, 13400, 13100, 12900, 12800, 12640],
    capitalSaved: [142000, 148000, 156000, 162000, 170000, 178000, 186400],
    capitalAtRisk: [480000, 462000, 448000, 436000, 428000, 418000, 412000],
  },
}

export const mockAgingStages: AgingStageData[] = [
  {
    stage: "fresh",
    count: 68,
    totalCapital: 2_176_000,
    marginExposurePercent: 4.2,
    avgDaysInStock: 7,
    avgLeadVelocity: 6.4,
  },
  {
    stage: "watch",
    count: 41,
    totalCapital: 1_312_000,
    marginExposurePercent: 18.6,
    avgDaysInStock: 23,
    avgLeadVelocity: 3.1,
  },
  {
    stage: "risk",
    count: 24,
    totalCapital: 960_000,
    marginExposurePercent: 42.1,
    avgDaysInStock: 39,
    avgLeadVelocity: 1.2,
  },
  {
    stage: "critical",
    count: 9,
    totalCapital: 372_000,
    marginExposurePercent: 78.3,
    avgDaysInStock: 62,
    avgLeadVelocity: 0.3,
  },
]

export const mockVehicles: VehicleSummary[] = [
  {
    vin: "1HGCG5655WA042761",
    year: 2024,
    make: "Toyota",
    model: "Camry",
    trim: "XSE V6",
    imageUrl: "/placeholder-car.jpg",
    stage: "fresh",
    daysInStock: 5,
    dailyBurn: 68,
    marginRemaining: 3_200,
    grossMargin: 3_540,
    acquisitionCost: 28_460,
    leads: 12,
    appointments: 3,
    ctr: 4.2,
    campaignStatus: "none",
    mediaType: "clone",
    priceReduced: false,
    publishStatus: "published",
    source: "auction",
    priceBand: "25k-35k",
    attractionRisk: "optimized",
    vdpViews: 1840,
  },
  {
    vin: "2T1BURHE5FC318765",
    year: 2024,
    make: "Honda",
    model: "Accord",
    trim: "Sport 2.0T",
    imageUrl: "/placeholder-car.jpg",
    stage: "fresh",
    daysInStock: 8,
    dailyBurn: 72,
    marginRemaining: 2_880,
    grossMargin: 3_456,
    acquisitionCost: 30_144,
    leads: 8,
    appointments: 2,
    ctr: 3.8,
    campaignStatus: "active",
    mediaType: "clone",
    priceReduced: false,
    publishStatus: "published",
    source: "trade-in",
    priceBand: "25k-35k",
    attractionRisk: "optimized",
    vdpViews: 1420,
  },
  {
    vin: "3GNKBERS1RS204512",
    year: 2025,
    make: "Chevrolet",
    model: "Equinox",
    trim: "RS AWD",
    imageUrl: "/placeholder-car.jpg",
    stage: "watch",
    daysInStock: 22,
    dailyBurn: 94,
    marginRemaining: 1_680,
    grossMargin: 3_748,
    acquisitionCost: 31_252,
    leads: 4,
    appointments: 1,
    ctr: 2.1,
    campaignStatus: "none",
    mediaType: "clone",
    priceReduced: false,
    publishStatus: "published",
    source: "wholesale",
    priceBand: "25k-35k",
    attractionRisk: "below-benchmark",
    vdpViews: 640,
  },
  {
    vin: "5UXCR6C05R9K78432",
    year: 2024,
    make: "BMW",
    model: "X3",
    trim: "xDrive30i",
    imageUrl: "/placeholder-car.jpg",
    stage: "watch",
    daysInStock: 28,
    dailyBurn: 142,
    marginRemaining: 2_240,
    grossMargin: 6_218,
    acquisitionCost: 42_782,
    leads: 6,
    appointments: 2,
    ctr: 3.4,
    campaignStatus: "active",
    mediaType: "real",
    priceReduced: false,
    publishStatus: "published",
    source: "direct",
    priceBand: "35k-50k",
    attractionRisk: "optimized",
    vdpViews: 2100,
  },
  {
    vin: "WBA73AK06R5A91823",
    year: 2024,
    make: "Ford",
    model: "F-150",
    trim: "Lariat 4WD",
    imageUrl: "/placeholder-car.jpg",
    stage: "risk",
    daysInStock: 38,
    dailyBurn: 118,
    marginRemaining: 1_480,
    grossMargin: 5_964,
    acquisitionCost: 48_036,
    leads: 2,
    appointments: 0,
    ctr: 1.2,
    campaignStatus: "none",
    mediaType: "clone",
    priceReduced: false,
    publishStatus: "published",
    source: "auction",
    priceBand: "35k-50k",
    attractionRisk: "low-conversion",
    vdpViews: 1240,
  },
  {
    vin: "1G1YY22G965108723",
    year: 2024,
    make: "Jeep",
    model: "Grand Cherokee",
    trim: "Limited 4x4",
    imageUrl: "/placeholder-car.jpg",
    stage: "risk",
    daysInStock: 44,
    dailyBurn: 106,
    marginRemaining: 890,
    grossMargin: 5_554,
    acquisitionCost: 44_446,
    leads: 1,
    appointments: 0,
    ctr: 0.8,
    campaignStatus: "scheduled",
    mediaType: "clone",
    priceReduced: true,
    publishStatus: "published",
    source: "trade-in",
    priceBand: "35k-50k",
    attractionRisk: "low-conversion",
    vdpViews: 980,
  },
  {
    vin: "WVWZZZ3CZWE012345",
    year: 2024,
    make: "Volkswagen",
    model: "Tiguan",
    trim: "SEL R-Line",
    imageUrl: "/placeholder-car.jpg",
    stage: "critical",
    daysInStock: 58,
    dailyBurn: 88,
    marginRemaining: 320,
    grossMargin: 5_424,
    acquisitionCost: 36_576,
    leads: 0,
    appointments: 0,
    ctr: 0.4,
    campaignStatus: "none",
    mediaType: "clone",
    priceReduced: true,
    publishStatus: "published",
    source: "wholesale",
    priceBand: "35k-50k",
    attractionRisk: "low-conversion",
    vdpViews: 320,
  },
  {
    vin: "JN1TANT31U0000123",
    year: 2024,
    make: "Nissan",
    model: "Rogue",
    trim: "SL AWD",
    imageUrl: "/placeholder-car.jpg",
    stage: "critical",
    daysInStock: 67,
    dailyBurn: 76,
    marginRemaining: -240,
    grossMargin: 4_852,
    acquisitionCost: 33_148,
    leads: 0,
    appointments: 0,
    ctr: 0.2,
    campaignStatus: "completed",
    mediaType: "clone",
    priceReduced: true,
    publishStatus: "published",
    source: "auction",
    priceBand: "25k-35k",
    attractionRisk: "low-conversion",
    vdpViews: 1200,
  },
  {
    vin: "5YJ3E1EA1NF123456",
    year: 2025,
    make: "Hyundai",
    model: "Tucson",
    trim: "Limited HEV",
    imageUrl: "/placeholder-car.jpg",
    stage: "fresh",
    daysInStock: 3,
    dailyBurn: 82,
    marginRemaining: 3_654,
    grossMargin: 3_900,
    acquisitionCost: 34_100,
    leads: 18,
    appointments: 5,
    ctr: 5.6,
    campaignStatus: "active",
    mediaType: "real",
    priceReduced: false,
    publishStatus: "published",
    source: "direct",
    priceBand: "25k-35k",
    attractionRisk: "optimized",
    vdpViews: 2680,
  },
  {
    vin: "SALGS2RE6LA098765",
    year: 2024,
    make: "Ram",
    model: "1500",
    trim: "Big Horn Crew",
    imageUrl: "/placeholder-car.jpg",
    stage: "watch",
    daysInStock: 19,
    dailyBurn: 124,
    marginRemaining: 3_104,
    grossMargin: 5_460,
    acquisitionCost: 42_540,
    leads: 9,
    appointments: 3,
    ctr: 3.9,
    campaignStatus: "active",
    mediaType: "clone",
    priceReduced: false,
    publishStatus: "published",
    source: "trade-in",
    priceBand: "35k-50k",
    attractionRisk: "below-benchmark",
    vdpViews: 1560,
  },
  {
    vin: "3CZRE5H53PM700001",
    year: 2024,
    make: "Kia",
    model: "Sportage",
    trim: "X-Pro Prestige",
    imageUrl: "/placeholder-car.jpg",
    stage: "risk",
    daysInStock: 41,
    dailyBurn: 96,
    marginRemaining: 1_120,
    grossMargin: 5_056,
    acquisitionCost: 37_944,
    leads: 3,
    appointments: 1,
    ctr: 1.6,
    campaignStatus: "none",
    mediaType: "clone",
    priceReduced: false,
    publishStatus: "published",
    source: "wholesale",
    priceBand: "35k-50k",
    attractionRisk: "below-benchmark",
    vdpViews: 720,
  },
  {
    vin: "1N4BL4DV5PN123456",
    year: 2024,
    make: "Subaru",
    model: "Outback",
    trim: "Touring XT",
    imageUrl: "/placeholder-car.jpg",
    stage: "watch",
    daysInStock: 25,
    dailyBurn: 86,
    marginRemaining: 1_960,
    grossMargin: 4_110,
    acquisitionCost: 37_890,
    leads: 5,
    appointments: 1,
    ctr: 2.4,
    campaignStatus: "none",
    mediaType: "clone",
    priceReduced: false,
    publishStatus: "published",
    source: "auction",
    priceBand: "35k-50k",
    attractionRisk: "below-benchmark",
    vdpViews: 880,
  },
]

export function getMockVehicleDetail(vin: string): VehicleDetail | null {
  const summary = mockVehicles.find((v) => v.vin === vin)
  if (!summary) return null

  const daysToLive = summary.marginRemaining > 0
    ? Math.ceil(summary.marginRemaining / summary.dailyBurn)
    : 0

  const timeToFirstLead = summary.leads > 0
    ? Math.min(summary.daysInStock, Math.round(2 + Math.random() * 8))
    : null

  return {
    ...summary,
    acquisitionDate: new Date(
      Date.now() - summary.daysInStock * 86_400_000
    ).toISOString(),
    grossMarginBand:
      summary.grossMargin > 5000
        ? "high"
        : summary.grossMargin > 3000
          ? "medium"
          : "low",
    breakEvenDays: Math.ceil(summary.grossMargin / summary.dailyBurn),
    daysToLive,
    daysSaved: Math.max(0, Math.round(Math.random() * 6 + 2)),
    capitalSaved: Math.max(0, Math.round(Math.random() * 1200 + 400)),
    timeToFirstLead,
    holdingLossSoFar: summary.daysInStock * summary.dailyBurn,
    campaignAttribution:
      summary.campaignStatus === "active"
        ? "Acceleration Pack — Tier 2"
        : summary.campaignStatus === "completed"
          ? "Acceleration Pack — Tier 1"
          : null,
    cloneMediaPerformance: {
      leads: summary.leads,
      ctr: summary.ctr,
      appointments: summary.appointments,
    },
    realMediaPerformance:
      summary.mediaType === "real"
        ? {
            leads: Math.round(summary.leads * 1.18),
            ctr: +(summary.ctr * 1.24).toFixed(1),
            appointments: Math.round(summary.appointments * 1.15),
          }
        : null,
  }
}

export function getMockOpportunities(vehicles: VehicleSummary[]): OpportunityItem[] {
  const items: OpportunityItem[] = []

  const criticals = vehicles
    .filter((v) => v.stage === "critical")
    .sort((a, b) => a.marginRemaining - b.marginRemaining)
  for (const v of criticals) {
    items.push({
      vin: v.vin,
      year: v.year,
      make: v.make,
      model: v.model,
      stage: v.stage,
      reason: v.marginRemaining <= 0 ? "Margin Depleted" : `Only $${v.marginRemaining.toLocaleString()} margin left`,
      action: "Immediate Optimize",
      urgency: "high",
      dollarImpact: Math.abs(v.marginRemaining) + v.dailyBurn * 5,
    })
  }

  const highBurnRisk = vehicles
    .filter((v) => v.stage === "risk" && v.campaignStatus === "none")
    .sort((a, b) => b.dailyBurn - a.dailyBurn)
  for (const v of highBurnRisk) {
    items.push({
      vin: v.vin,
      year: v.year,
      make: v.make,
      model: v.model,
      stage: v.stage,
      reason: `$${v.dailyBurn}/day burn · No campaign active`,
      action: "Activate Campaign",
      urgency: "high",
      dollarImpact: v.dailyBurn * 8,
    })
  }

  const highInterestNoCampaign = vehicles
    .filter((v) => v.leads >= 6 && v.campaignStatus === "none" && v.mediaType === "clone")
    .sort((a, b) => b.leads - a.leads)
  for (const v of highInterestNoCampaign) {
    items.push({
      vin: v.vin,
      year: v.year,
      make: v.make,
      model: v.model,
      stage: v.stage,
      reason: `${v.leads} leads · Clone media only`,
      action: "Upgrade Media",
      urgency: "medium",
      dollarImpact: Math.round(v.marginRemaining * 0.18),
    })
  }

  return items.slice(0, 6)
}

export const mockWebsiteScore: WebsiteScoreOverview = {
  score: 78,
  scoreDelta: 4,
  conversionHealth: "strong",
  vdpCTR: 3.1,
  vdpCTRBenchmark: 2.4,
  leadCVR: 4.8,
  leadCVRBenchmark: 3.6,
  mediaQualityScore: 72,
  avgPhotosPerVIN: 24,
  threeSixtyVideoCoverage: 38,
  pageLoadSpeed: 2.4,
  leadFormVisibility: 88,
  ctaPlacementScore: 82,
  mobileOptimization: 91,
  mediaMix: {
    aiInstantPercent: 62,
    realMediaPercent: 38,
  },
  benchmarkRealMediaThreshold: 70,
  benchmarkLeadConversionLift: 22,
}

export const mockConversionFunnel: ConversionFunnelData = {
  totalVehicles: 142,
  vdpViews: 21_300,
  leads: 648,
  appointments: 92,
}

export const mockVDPHeatmap: VDPHeatmapItem[] = [
  { vin: "WBA73AK06R5A91823", year: 2024, make: "Ford", model: "F-150", vdpViews: 1240, leads: 2, conversionRate: 0.16, category: "high-views-low-leads" },
  { vin: "JN1TANT31U0000123", year: 2024, make: "Nissan", model: "Rogue", vdpViews: 1200, leads: 0, conversionRate: 0, category: "high-views-low-leads" },
  { vin: "1G1YY22G965108723", year: 2024, make: "Jeep", model: "Grand Cherokee", vdpViews: 980, leads: 1, conversionRate: 0.10, category: "high-views-low-leads" },
  { vin: "WVWZZZ3CZWE012345", year: 2024, make: "Volkswagen", model: "Tiguan", vdpViews: 320, leads: 0, conversionRate: 0, category: "low-visibility" },
  { vin: "3GNKBERS1RS204512", year: 2025, make: "Chevrolet", model: "Equinox", vdpViews: 640, leads: 4, conversionRate: 0.63, category: "low-visibility" },
  { vin: "5YJ3E1EA1NF123456", year: 2025, make: "Hyundai", model: "Tucson", vdpViews: 2680, leads: 18, conversionRate: 0.67, category: "optimized" },
  { vin: "1HGCG5655WA042761", year: 2024, make: "Toyota", model: "Camry", vdpViews: 1840, leads: 12, conversionRate: 0.65, category: "optimized" },
]

export const mockRevenueLeakage: RevenueLeakage = {
  lowConversionVehicles: 18,
  estimatedAnnualMissedRevenue: 124_000,
  avgConversionGap: 1.8,
  topLeakageVINs: [
    { vin: "WBA73AK06R5A91823", year: 2024, make: "Ford", model: "F-150", views: 1240, leads: 2, missedRevenue: 18_400 },
    { vin: "JN1TANT31U0000123", year: 2024, make: "Nissan", model: "Rogue", views: 1200, leads: 0, missedRevenue: 22_600 },
    { vin: "1G1YY22G965108723", year: 2024, make: "Jeep", model: "Grand Cherokee", views: 980, leads: 1, missedRevenue: 14_200 },
    { vin: "WVWZZZ3CZWE012345", year: 2024, make: "Volkswagen", model: "Tiguan", views: 320, leads: 0, missedRevenue: 11_800 },
    { vin: "3CZRE5H53PM700001", year: 2024, make: "Kia", model: "Sportage", views: 720, leads: 3, missedRevenue: 9_600 },
  ],
}

export function getMockVehicleWebsiteHealth(vehicle: VehicleSummary): VehicleWebsiteHealth {
  const vdpCTRBenchmark = 2.4
  const leadConvBenchmark = 3.2

  const leadConv = vehicle.leads > 0 && vehicle.vdpViews > 0
    ? +((vehicle.leads / vehicle.vdpViews) * 100).toFixed(1)
    : 0

  let insight = ""
  if (vehicle.vdpViews > 800 && leadConv < leadConvBenchmark) {
    insight = "This vehicle has strong visibility but weak conversion. Media upgrade recommended."
  } else if (vehicle.vdpViews < 400) {
    insight = "Low visibility. Consider campaign activation to drive VDP traffic."
  } else if (vehicle.attractionRisk === "optimized") {
    insight = "VDP performance is above benchmark. Maintain current media strategy."
  } else {
    insight = "Conversion slightly below benchmark. Review CTA placement and media quality."
  }

  return {
    vdpViews: vehicle.vdpViews,
    vdpCTR: vehicle.ctr,
    vdpCTRBenchmark,
    leadConversion: leadConv,
    leadConversionBenchmark: leadConvBenchmark,
    attractionRisk: vehicle.attractionRisk,
    insight,
  }
}

export function getAccelerationImpact(stage: VehicleStage): AccelerationImpact {
  const impacts: Record<VehicleStage, AccelerationImpact> = {
    fresh: { estimatedLeadLift: "+1–2", estimatedDaysFaster: "1–2", estimatedMarginRecovery: 0 },
    watch: { estimatedLeadLift: "+3–5", estimatedDaysFaster: "4–6", estimatedMarginRecovery: 320 },
    risk: { estimatedLeadLift: "+3–5", estimatedDaysFaster: "5–8", estimatedMarginRecovery: 456 },
    critical: { estimatedLeadLift: "+4–7", estimatedDaysFaster: "6–10", estimatedMarginRecovery: 680 },
  }
  return impacts[stage]
}
