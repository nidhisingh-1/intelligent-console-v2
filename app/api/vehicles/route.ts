import { NextRequest, NextResponse } from "next/server"
import { mockVehicles, STAGE_CONFIG } from "@/lib/inventory-mocks"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))
  const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get("per_page") || "10", 10)))
  const query = searchParams.get("q") || "*"

  let filtered = [...mockVehicles]

  if (query && query !== "*") {
    const q = query.toLowerCase()
    filtered = filtered.filter(
      (v) =>
        v.vin.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.trim.toLowerCase().includes(q) ||
        `${v.year}`.includes(q)
    )
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const pageData = filtered.slice(start, start + perPage)

  const vehicles = pageData.map((v) => ({
    ...v,
    stageLabel: STAGE_CONFIG[v.stage].label,
  }))

  return NextResponse.json({
    data: vehicles,
    pagination: {
      page,
      per_page: perPage,
      total,
      total_pages: totalPages,
    },
  })
}
