import { NextRequest, NextResponse } from 'next/server'
import { createTestimonial, getApprovedTestimonials, getAverageRating } from '@/lib/testimonials'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [testimonials, stats] = await Promise.all([
    getApprovedTestimonials(),
    getAverageRating(),
  ])
  return NextResponse.json({ testimonials, stats })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, company, rating, satisfaction, quote } = body ?? {}

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (!quote || typeof quote !== 'string' || !quote.trim()) {
      return NextResponse.json({ error: 'Feedback is required.' }, { status: 400 })
    }
    if (![1, 2, 3, 4, 5].includes(rating)) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 })
    }
    if (![1, 2, 3, 4, 5].includes(satisfaction)) {
      return NextResponse.json({ error: 'Satisfaction must be between 1 and 5.' }, { status: 400 })
    }

    const testimonial = await createTestimonial({ name, company, rating, satisfaction, quote })
    return NextResponse.json({ success: true, id: testimonial.id }, { status: 201 })
  } catch (err) {
    console.error('Testimonial API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
