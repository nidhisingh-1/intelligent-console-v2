import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const updateUrlParams = (params: Record<string, string | string[] | boolean | undefined>) => {
  const url = new URL(window.location.href)

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
      url.searchParams.delete(key)
    } else if (Array.isArray(value)) {
      url.searchParams.set(key, value.join(","))
    } else if (typeof value === "boolean") {
      if (value) {
        url.searchParams.set(key, "1")
      } else {
        url.searchParams.delete(key)
      }
    } else {
      url.searchParams.set(key, String(value))
    }
  })

  window.history.replaceState({}, "", url.toString())
}

export const getUrlParams = (): Record<string, string> => {
  if (typeof window === "undefined") return {}

  const params: Record<string, string> = {}
  const urlParams = new URLSearchParams(window.location.search)

  urlParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}
