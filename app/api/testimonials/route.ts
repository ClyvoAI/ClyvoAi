import { NextResponse } from 'next/server'
import { createTestimonial, getApprovedTestimonials, getAverageRating } from '@/lib/testimonials'

export async function GET() {
  const [testimonials, stats] = await Promise.all([
    getApprovedTestimonials(),
    getAverageRating(),
  ])
  return NextResponse.json({ testimonials, stats })
}

export async function POST(request: Request) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

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
  return NextResponse.json({ success: true, id: testimonial.id })
}
