"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  mockWebsiteScore,
  mockConversionFunnel,
  mockVDPHeatmap,
  mockRevenueLeakage,
} from "@/lib/inventory-mocks"
import { ConversionFunnel } from "@/components/inventory/conversion-funnel"
import { RevenueLeakagePanel } from "@/components/inventory/revenue-leakage"
import { AIPageSummary } from "@/components/inventory"
import {
  Globe, Eye, MousePointerClick, Users, Camera, Sparkles,
  BarChart3, Smartphone, FileText, Target, ArrowRight,
  TrendingUp, Zap, AlertTriangle,
} from "lucide-react"
import { useScenario } from "@/lib/scenario-context"
import { getScenarioData } from "@/lib/demo-scenarios"

export default function WebsiteScorePage() {
  const { activeScenario } = useScenario()

  const vehicles = React.useMemo(
    () => getScenarioData(activeScenario).vehicles,
    [activeScenario]
  )

  const cloneVehicles = React.useMemo(() => vehicles.filter((v) => v.mediaType === "clone"), [vehicles])
  const realVehicles = React.useMemo(() => vehicles.filter((v) => v.mediaType === "real"), [vehicles])
  const cloneAvgCTR = cloneVehicles.length > 0 ? cloneVehicles.reduce((a, v) => a + v.ctr, 0) / cloneVehicles.length : 0
  const realAvgCTR = realVehicles.length > 0 ? realVehicles.reduce((a, v) => a + v.ctr, 0) / realVehicles.length : 0
  const ws = mockWebsiteScore

  const scorePct = ws.score / 100
  const strokeColor = ws.score >= 70 ? "#10b981" : ws.score >= 50 ? "#f59e0b" : "#ef4444"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Website Intelligence</h1>
            <p className="text-sm text-muted-foreground">VDP conversion performance, media quality impact & revenue leakage analysis</p>
          </div>
        </div>
      </div>

      <AIPageSummary
        summary={`Website health score is ${ws.score}/100 (${ws.scoreDelta > 0 ? "+" : ""}${ws.scoreDelta} pts). VDP conversion is ${ws.leadCVR}% vs ${ws.leadCVRBenchmark}% benchmark. Media quality is the biggest drag — upgrading clone vehicles to real could lift conversion by ${ws.benchmarkLeadConversionLift}% and recover an estimated $${(mockRevenueLeakage.estimatedAnnualMissedRevenue / 1000).toFixed(0)}K in annual revenue.`}
      />

      {/* ── Section 1: Overall Website Score ── */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-8">
            {/* Large Radial Meter */}
            <div className="relative flex-shrink-0">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                <circle
                  cx="80" cy="80" r="68" fill="none"
                  stroke={strokeColor}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${scorePct * 427.3} 427.3`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{ws.score}</span>
                <span className="text-xs text-muted-foreground font-medium">/100</span>
                {ws.scoreDelta > 0 && (
                  <span className="text-[11px] font-semibold text-emerald-600 mt-1">+{ws.scoreDelta} this month</span>
                )}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              {[
                { label: "Media Quality", value: ws.mediaQualityScore, max: 100, icon: <Camera className="h-3.5 w-3.5 text-violet-500" /> },
                { label: "Avg Photos/VIN", value: ws.avgPhotosPerVIN, max: 40, icon: <FileText className="h-3.5 w-3.5 text-blue-500" /> },
                { label: "360/Video Coverage", value: ws.threeSixtyVideoCoverage, max: 100, suffix: "%", icon: <Eye className="h-3.5 w-3.5 text-cyan-500" /> },
                { label: "Page Load Speed", value: ws.pageLoadSpeed, max: 5, suffix: "s", invert: true, icon: <Zap className="h-3.5 w-3.5 text-amber-500" /> },
                { label: "Lead Form Visibility", value: ws.leadFormVisibility, max: 100, suffix: "%", icon: <Target className="h-3.5 w-3.5 text-emerald-500" /> },
                { label: "CTA Placement", value: ws.ctaPlacementScore, max: 100, icon: <MousePointerClick className="h-3.5 w-3.5 text-orange-500" /> },
                { label: "Mobile Optimization", value: ws.mobileOptimization, max: 100, suffix: "%", icon: <Smartphone className="h-3.5 w-3.5 text-indigo-500" /> },
                { label: "VDP CTR vs Benchmark", value: ws.vdpCTR, max: ws.vdpCTRBenchmark * 2, suffix: "%", icon: <TrendingUp className="h-3.5 w-3.5 text-pink-500" /> },
              ].map((metric) => {
                const pct = metric.invert
                  ? Math.max(0, ((metric.max - metric.value) / metric.max) * 100)
                  : Math.min(100, (metric.value / metric.max) * 100)
                return (
                  <div key={metric.label} className="flex items-center gap-2.5">
                    {metric.icon}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-muted-foreground truncate">{metric.label}</span>
                        <span className="text-[11px] font-bold tabular-nums">
                          {metric.value}{metric.suffix || ""}
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            pct >= 70 ? "bg-emerald-400" : pct >= 40 ? "bg-amber-400" : "bg-red-400"
                          )}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section 2: Media Quality Impact ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            Media Quality Impact on Conversion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {/* Clone VDP CTR */}
            <div className="p-5 rounded-xl bg-gray-50 border">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-bold">AI Instant VDPs</span>
                <span className="text-xs text-muted-foreground ml-auto">{cloneVehicles.length} vehicles</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Avg VDP CTR</span>
                  <span className="text-lg font-bold tabular-nums">{cloneAvgCTR.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Avg Lead Conv.</span>
                  <span className="text-lg font-bold tabular-nums">{(cloneVehicles.reduce((a, v) => a + v.leads, 0) / Math.max(1, cloneVehicles.reduce((a, v) => a + v.vdpViews, 0)) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Real VDP CTR */}
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-800">Real Media VDPs</span>
                <span className="text-xs text-emerald-600 ml-auto">{realVehicles.length} vehicles</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Avg VDP CTR</span>
                  <span className="text-lg font-bold tabular-nums text-emerald-700">{realAvgCTR.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Avg Lead Conv.</span>
                  <span className="text-lg font-bold tabular-nums text-emerald-700">{(realVehicles.reduce((a, v) => a + v.leads, 0) / Math.max(1, realVehicles.reduce((a, v) => a + v.vdpViews, 0)) * 100).toFixed(1)}%</span>
                </div>
              </div>
              {realAvgCTR > cloneAvgCTR && (
                <div className="mt-3 pt-3 border-t border-emerald-200">
                  <p className="text-[11px] text-emerald-700">
                    <span className="font-bold">+{((realAvgCTR / cloneAvgCTR - 1) * 100).toFixed(0)}%</span> higher CTR than AI Instant
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Media Mix Benchmark */}
          <div className="mt-4 p-4 rounded-xl bg-violet-50 border border-violet-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-violet-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-violet-800">Media Mix Analysis</p>
                <p className="text-[11px] text-violet-700 mt-1 leading-relaxed">
                  Your inventory is <span className="font-bold">{ws.mediaMix.aiInstantPercent}% AI Instant</span> and{" "}
                  <span className="font-bold">{ws.mediaMix.realMediaPercent}% Real Media</span>.
                  Dealers with &gt;{ws.benchmarkRealMediaThreshold}% Real Media have{" "}
                  <span className="font-bold">+{ws.benchmarkLeadConversionLift}% higher lead conversion</span>.
                </p>
                <div className="mt-2 h-3 rounded-full bg-violet-100 overflow-hidden flex">
                  <div
                    className="h-full bg-gray-400 rounded-l-full"
                    style={{ width: `${ws.mediaMix.aiInstantPercent}%` }}
                  />
                  <div
                    className="h-full bg-emerald-500 rounded-r-full"
                    style={{ width: `${ws.mediaMix.realMediaPercent}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-violet-600">
                  <span>AI Instant {ws.mediaMix.aiInstantPercent}%</span>
                  <span>Real Media {ws.mediaMix.realMediaPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section 3: VDP Conversion Funnel ── */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Conversion Funnel</h2>
        <ConversionFunnel data={mockConversionFunnel} />
      </div>

      {/* ── Section 4: VDP Conversion Heatmap ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            VDP Conversion Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-red-500" />
                <span className="text-xs font-bold text-red-800">High Views, Low Leads</span>
              </div>
              <div className="space-y-2">
                {mockVDPHeatmap
                  .filter((v) => v.category === "high-views-low-leads")
                  .map((v) => (
                    <Link
                      key={v.vin}
                      href={`/inventory/${v.vin}`}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-red-100 hover:border-red-300 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-semibold group-hover:text-primary transition-colors">{v.year} {v.make} {v.model}</p>
                        <p className="text-[10px] text-muted-foreground">{v.vdpViews.toLocaleString()} views · {v.leads} leads</p>
                      </div>
                      <span className="text-[11px] font-bold text-red-600 tabular-nums">{v.conversionRate.toFixed(2)}%</span>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-bold text-amber-800">Low Visibility</span>
              </div>
              <div className="space-y-2">
                {mockVDPHeatmap
                  .filter((v) => v.category === "low-visibility")
                  .map((v) => (
                    <Link
                      key={v.vin}
                      href={`/inventory/${v.vin}`}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-amber-100 hover:border-amber-300 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-semibold group-hover:text-primary transition-colors">{v.year} {v.make} {v.model}</p>
                        <p className="text-[10px] text-muted-foreground">{v.vdpViews.toLocaleString()} views · {v.leads} leads</p>
                      </div>
                      <span className="text-[11px] font-bold text-amber-600 tabular-nums">{v.vdpViews} views</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* Optimized vehicles */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-800">Optimized VDPs</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {mockVDPHeatmap
                .filter((v) => v.category === "optimized")
                .map((v) => (
                  <Link
                    key={v.vin}
                    href={`/inventory/${v.vin}`}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-emerald-100 hover:border-emerald-300 transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold group-hover:text-primary transition-colors">{v.year} {v.make} {v.model}</p>
                      <p className="text-[10px] text-muted-foreground">{v.vdpViews.toLocaleString()} views · {v.leads} leads</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 tabular-nums">{v.conversionRate.toFixed(2)}%</span>
                  </Link>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section 5: Speed & UX Signals ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" />
            Speed & UX Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Mobile Load Time",
                value: `${ws.pageLoadSpeed}s`,
                benchmark: "< 3.0s",
                status: ws.pageLoadSpeed < 3.0 ? "good" : ws.pageLoadSpeed < 4.0 ? "moderate" : "poor",
                icon: <Smartphone className="h-5 w-5" />,
              },
              {
                label: "CTA Visibility Score",
                value: `${ws.ctaPlacementScore}/100`,
                benchmark: "> 80",
                status: ws.ctaPlacementScore > 80 ? "good" : ws.ctaPlacementScore > 60 ? "moderate" : "poor",
                icon: <MousePointerClick className="h-5 w-5" />,
              },
              {
                label: "Form Placement Score",
                value: `${ws.leadFormVisibility}/100`,
                benchmark: "> 85",
                status: ws.leadFormVisibility > 85 ? "good" : ws.leadFormVisibility > 70 ? "moderate" : "poor",
                icon: <FileText className="h-5 w-5" />,
              },
            ].map((signal) => (
              <div
                key={signal.label}
                className={cn(
                  "p-5 rounded-xl border-2",
                  signal.status === "good"
                    ? "bg-emerald-50/50 border-emerald-200"
                    : signal.status === "moderate"
                      ? "bg-amber-50/50 border-amber-200"
                      : "bg-red-50/50 border-red-200"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg w-fit mb-3",
                  signal.status === "good" ? "bg-emerald-100 text-emerald-600" :
                    signal.status === "moderate" ? "bg-amber-100 text-amber-600" :
                      "bg-red-100 text-red-600"
                )}>
                  {signal.icon}
                </div>
                <p className="text-xs text-muted-foreground">{signal.label}</p>
                <p className="text-2xl font-bold mt-1">{signal.value}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Benchmark: {signal.benchmark}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Section 6: Revenue Leakage ── */}
      <RevenueLeakagePanel data={mockRevenueLeakage} />
    </div>
  )
}
