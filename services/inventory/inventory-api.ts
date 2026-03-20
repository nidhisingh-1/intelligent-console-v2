import type { VehicleSummary, VehicleDetail } from "./inventory.types"

const API_BASE = "/api"

export interface VehicleMediaImage {
  url: string
  label: string
  type: "exterior" | "interior"
}

export interface VehicleMediaResponse {
  dealer_vin_id: string
  year: number
  make: string
  model: string
  trim: string
  media_type: string
  total_images: number
  images: VehicleMediaImage[]
  video_url: string | null
}

export interface VehicleListItem extends VehicleSummary {
  stageLabel: string
}

export interface VehicleDetailItem extends VehicleDetail {
  stageLabel: string
}

export interface PaginationInfo {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface VehiclesListResponse {
  data: VehicleListItem[]
  pagination: PaginationInfo
}

export interface VehicleDetailResponse {
  data: VehicleDetailItem
}

export interface VehicleMediaApiResponse {
  data: VehicleMediaResponse
}

export async function fetchVehicles(
  page = 1,
  perPage = 10,
  query = "*"
): Promise<VehiclesListResponse> {
  const url = `${API_BASE}/vehicles?page=${page}&per_page=${perPage}&q=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch vehicles: ${res.status}`)
  return res.json()
}

export async function fetchVehicleDetail(
  vehicleId: string
): Promise<VehicleDetailResponse> {
  const res = await fetch(`${API_BASE}/vehicles/${encodeURIComponent(vehicleId)}`)
  if (!res.ok) throw new Error(`Failed to fetch vehicle: ${res.status}`)
  return res.json()
}

export async function fetchVehicleMedia(
  dealerVinId: string
): Promise<VehicleMediaApiResponse> {
  const res = await fetch(`${API_BASE}/vehicle-media/${encodeURIComponent(dealerVinId)}`)
  if (!res.ok) throw new Error(`Failed to fetch vehicle media: ${res.status}`)
  return res.json()
}
