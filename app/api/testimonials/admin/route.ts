import { NextRequest, NextResponse } from 'next/server'
import { getAllTestimonials } from '@/lib/testimonials'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Admin-only endpoint — protected by secret header, same pattern as app/api/leads/route.ts
  const secret = req.headers.get('x-admin-secret')
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const testimonials = await getAllTestimonials()
  return NextResponse.json(testimonials)
}
