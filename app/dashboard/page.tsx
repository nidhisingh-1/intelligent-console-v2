import { AppShell } from "@/components/app-shell"
// import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
// import { KpiCards } from "@/components/dashboard/kpi-cards"
// import { TopEnumsChart } from "@/components/charts/top-enums-chart"
// import { TrendChart } from "@/components/charts/trend-chart"
// import { ResolutionFunnelChart } from "@/components/charts/resolution-funnel-chart"
// import { EnumsTable } from "@/components/dashboard/enums-table"

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="attio-container h-full flex flex-col">
        {/* Page Header */}
        <div className="attio-page-header">
          <h1 className="attio-heading-1">Analytics Dashboard</h1>
          <p className="attio-body mt-2">Performance insights and quality assurance metrics</p>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* KPI Cards */}
            <div className="attio-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="attio-heading-3">Total Calls</h3>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">1,247</div>
              <div className="flex items-center gap-2 attio-body-small text-muted-foreground">
                <span className="text-green-600">↑ 12%</span>
                <span>vs last month</span>
              </div>
            </div>

            <div className="attio-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="attio-heading-3">Quality Score</h3>
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">87%</div>
              <div className="flex items-center gap-2 attio-body-small text-muted-foreground">
                <span className="text-green-600">↑ 5%</span>
                <span>vs last month</span>
              </div>
            </div>

            <div className="attio-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="attio-heading-3">Issues Found</h3>
                <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">43</div>
              <div className="flex items-center gap-2 attio-body-small text-muted-foreground">
                <span className="text-red-600">↓ 8%</span>
                <span>vs last month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Call Trends Chart Placeholder */}
            <div className="attio-card p-6">
              <h3 className="attio-heading-3 mb-4">Call Volume Trends</h3>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="attio-body-small text-muted-foreground">Chart visualization coming soon</p>
                </div>
              </div>
            </div>

            {/* Quality Distribution Chart Placeholder */}
            <div className="attio-card p-6">
              <h3 className="attio-heading-3 mb-4">Quality Distribution</h3>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <p className="attio-body-small text-muted-foreground">Chart visualization coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="attio-card p-6">
            <h3 className="attio-heading-3 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { type: 'review', message: 'Call review completed for John Smith', time: '2 minutes ago', status: 'success' },
                { type: 'issue', message: 'Quality issue identified in customer call', time: '15 minutes ago', status: 'warning' },
                { type: 'enum', message: 'New enum code TECH_ISSUE created', time: '1 hour ago', status: 'info' },
                { type: 'review', message: 'Bulk review completed for 25 calls', time: '2 hours ago', status: 'success' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {activity.status === 'success' && (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {activity.status === 'warning' && (
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    )}
                    {activity.status === 'info' && (
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="attio-body">{activity.message}</p>
                    <p className="attio-caption mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
