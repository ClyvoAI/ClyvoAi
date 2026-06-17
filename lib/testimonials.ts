export type Satisfaction = 1 | 2 | 3 | 4 | 5

export const SATISFACTION_EMOJI: Record<Satisfaction, { emoji: string; label: string }> = {
  1: { emoji: '😞', label: 'Unhappy' },
  2: { emoji: '😕', label: 'Could be better' },
  3: { emoji: '🙂', label: 'Satisfied' },
  4: { emoji: '😀', label: 'Very satisfied' },
  5: { emoji: '🤩', label: 'Exceptional' },
}

export interface Testimonial {
  id: string
  name: string
  company: string
  rating: 1 | 2 | 3 | 4 | 5
  satisfaction: Satisfaction
  quote: string
  approved: boolean
  createdAt: string
}

export interface NewTestimonialInput {
  name: string
  company?: string
  rating: 1 | 2 | 3 | 4 | 5
  satisfaction: Satisfaction
  quote: string
}

export interface RatingStats {
  average: number
  count: number
}

/**
 * ⚠️ TEMPORARY in-memory store — NOT durable.
 *
 * This array resets on every deploy and every serverless cold start.
 * It exists only so the rest of the feature (rating/emoji inputs, the
 * /feedback submission page, the public testimonial section, and the
 * live "Avg. Rating" stat on the pricing section) is wired and testable
 * right now, end to end.
 *
 * Once you share what's behind /api/leads, swap the three functions
 * below for real queries against that same database. Nothing else in
 * the app needs to change — every other file only calls these three
 * functions, never touches storage directly.
 */
const TEMP_STORE: Testimonial[] = []

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  return TEMP_STORE.filter((t) => t.approved).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function getAverageRating(): Promise<RatingStats | null> {
  const approved = await getApprovedTestimonials()
  if (approved.length === 0) return null
  const sum = approved.reduce((acc, t) => acc + t.rating, 0)
  return { average: Math.round((sum / approved.length) * 10) / 10, count: approved.length }
}

export async function createTestimonial(input: NewTestimonialInput): Promise<Testimonial> {
  const testimonial: Testimonial = {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}`,
    name: input.name.trim(),
    company: input.company?.trim() ?? '',
    rating: input.rating,
    satisfaction: input.satisfaction,
    quote: input.quote.trim(),
    approved: false, // gated — approved manually before it's public
    createdAt: new Date().toISOString(),
  }
  TEMP_STORE.push(testimonial)
  return testimonial
}
