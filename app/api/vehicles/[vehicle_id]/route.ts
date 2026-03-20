import { NextRequest, NextResponse } from "next/server"
import { getMockVehicleDetail, STAGE_CONFIG } from "@/lib/inventory-mocks"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ vehicle_id: string }> }
) {
  const { vehicle_id } = await params
  const vehicle = getMockVehicleDetail(vehicle_id)

  if (!vehicle) {
    return NextResponse.json(
      { error: "Vehicle not found", vehicle_id },
      { status: 404 }
    )
  }

  return NextResponse.json({
    data: {
      ...vehicle,
      stageLabel: STAGE_CONFIG[vehicle.stage].label,
    },
  })
}
