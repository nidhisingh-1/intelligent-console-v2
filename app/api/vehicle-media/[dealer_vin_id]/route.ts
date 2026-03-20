import { NextRequest, NextResponse } from "next/server"
import { mockVehicles } from "@/lib/inventory-mocks"

const VEHICLE_MEDIA: Record<string, { images: Array<{ url: string; label: string; type: string }>; video_url: string | null }> = {
  "1HGCG5655WA042761": {
    images: [
      { url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", label: "Rear", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80", label: "Interior", type: "interior" },
    ],
    video_url: null,
  },
  "2T1BURHE5FC318765": {
    images: [
      { url: "https://images.unsplash.com/photo-1606611013016-969c19ba27da?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", label: "Rear", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", label: "Dashboard", type: "interior" },
    ],
    video_url: null,
  },
  "3GNKBERS1RS204512": {
    images: [
      { url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80", label: "Interior", type: "interior" },
    ],
    video_url: null,
  },
  "5UXCR6C05R9K78432": {
    images: [
      { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80", label: "Rear 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", label: "Interior", type: "interior" },
    ],
    video_url: null,
  },
  "WBA73AK06R5A91823": {
    images: [
      { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80", label: "Bed View", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", label: "Interior", type: "interior" },
    ],
    video_url: null,
  },
  "1G1YY22G965108723": {
    images: [
      { url: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1568844293986-8d0400f4745b?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", label: "Interior", type: "interior" },
    ],
    video_url: null,
  },
  "WVWZZZ3CZWE012345": {
    images: [
      { url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&q=80", label: "Side Profile", type: "exterior" },
    ],
    video_url: null,
  },
  "JN1TANT31U0000123": {
    images: [
      { url: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80", label: "Interior", type: "interior" },
    ],
    video_url: null,
  },
  "5YJ3E1EA1NF123456": {
    images: [
      { url: "https://images.unsplash.com/photo-1630990398498-7e3c5f304765?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80", label: "Interior", type: "interior" },
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", label: "Dashboard", type: "interior" },
    ],
    video_url: null,
  },
  "SALGS2RE6LA098765": {
    images: [
      { url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", label: "Interior", type: "interior" },
    ],
    video_url: null,
  },
  "3CZRE5H53PM700001": {
    images: [
      { url: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80", label: "Side Profile", type: "exterior" },
    ],
    video_url: null,
  },
  "1N4BL4DV5PN123456": {
    images: [
      { url: "https://images.unsplash.com/photo-1606611013016-969c19ba27da?w=800&q=80", label: "Front 3/4", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", label: "Side Profile", type: "exterior" },
      { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80", label: "Interior", type: "interior" },
    ],
    video_url: null,
  },
}

const DEFAULT_MEDIA = {
  images: [
    { url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", label: "Front 3/4", type: "exterior" },
  ],
  video_url: null,
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ dealer_vin_id: string }> }
) {
  const { dealer_vin_id } = await params
  const vehicle = mockVehicles.find((v) => v.vin === dealer_vin_id)

  if (!vehicle) {
    return NextResponse.json(
      { error: "Vehicle not found", dealer_vin_id },
      { status: 404 }
    )
  }

  const media = VEHICLE_MEDIA[dealer_vin_id] || DEFAULT_MEDIA

  return NextResponse.json({
    data: {
      dealer_vin_id,
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      trim: vehicle.trim,
      media_type: vehicle.mediaType,
      total_images: media.images.length,
      images: media.images,
      video_url: media.video_url,
    },
  })
}
