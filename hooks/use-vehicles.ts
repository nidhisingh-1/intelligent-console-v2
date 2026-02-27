"use client"

import { useState, useEffect, useCallback } from "react"
import {
  fetchVehicles,
  fetchVehicleDetail,
  fetchVehicleMedia,
  type VehiclesListResponse,
  type VehicleDetailItem,
  type VehicleMediaResponse,
  type VehicleListItem,
  type PaginationInfo,
} from "@/services/inventory/inventory-api"

interface UseVehiclesOptions {
  page?: number
  perPage?: number
  query?: string
  enabled?: boolean
}

interface UseVehiclesReturn {
  vehicles: VehicleListItem[]
  pagination: PaginationInfo | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useVehicles(options: UseVehiclesOptions = {}): UseVehiclesReturn {
  const { page = 1, perPage = 50, query = "*", enabled = true } = options
  const [data, setData] = useState<VehiclesListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!enabled) return
    setLoading(true)
    setError(null)
    try {
      const result = await fetchVehicles(page, perPage, query)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vehicles")
    } finally {
      setLoading(false)
    }
  }, [page, perPage, query, enabled])

  useEffect(() => {
    load()
  }, [load])

  return {
    vehicles: data?.data ?? [],
    pagination: data?.pagination ?? null,
    loading,
    error,
    refetch: load,
  }
}

interface UseVehicleDetailReturn {
  vehicle: VehicleDetailItem | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useVehicleDetail(vehicleId: string | null): UseVehicleDetailReturn {
  const [vehicle, setVehicle] = useState<VehicleDetailItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!vehicleId) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await fetchVehicleDetail(vehicleId)
      setVehicle(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch vehicle")
    } finally {
      setLoading(false)
    }
  }, [vehicleId])

  useEffect(() => {
    load()
  }, [load])

  return { vehicle, loading, error, refetch: load }
}

interface UseVehicleMediaReturn {
  media: VehicleMediaResponse | null
  loading: boolean
  error: string | null
}

export function useVehicleMedia(dealerVinId: string | null): UseVehicleMediaReturn {
  const [media, setMedia] = useState<VehicleMediaResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!dealerVinId) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    fetchVehicleMedia(dealerVinId)
      .then((res) => setMedia(res.data))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to fetch media"))
      .finally(() => setLoading(false))
  }, [dealerVinId])

  return { media, loading, error }
}
