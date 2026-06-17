import { supabase } from '@/lib/supabase'

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

// Row shape as stored in Supabase — snake_case, matching your `leads` table convention
interface TestimonialRow {
  id: string
  name: string
  company: string | null
  rating: number
  satisfaction: number
  quote: string
  approved: boolean
  created_at: string
}

function rowToTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    company: row.company ?? '',
    rating: row.rating as Testimonial['rating'],
    satisfaction: row.satisfaction as Satisfaction,
    quote: row.quote,
    approved: row.approved,
    createdAt: row.created_at,
  }
}

// ---- Public-facing reads (used by testimonial-scene.tsx + impact-scene.tsx) ----

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error (getApprovedTestimonials):', error)
    return []
  }
  return (data as TestimonialRow[]).map(rowToTestimonial)
}

export async function getAverageRating(): Promise<RatingStats | null> {
  const approved = await getApprovedTestimonials()
  if (approved.length === 0) return null
  const sum = approved.reduce((acc, t) => acc + t.rating, 0)
  return { average: Math.round((sum / approved.length) * 10) / 10, count: approved.length }
}

// ---- Public write (used by app/feedback/page.tsx via POST /api/testimonials) ----

export async function createTestimonial(input: NewTestimonialInput): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([{
      name: input.name.trim(),
      company: input.company?.trim() || null,
      rating: input.rating,
      satisfaction: input.satisfaction,
      quote: input.quote.trim(),
      approved: false, // gated — flipped via the admin endpoints below
      created_at: new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return rowToTestimonial(data as TestimonialRow)
}

// ---- Admin-only operations (used by the admin API routes, secret-header gated) ----

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error (getAllTestimonials):', error)
    return []
  }
  return (data as TestimonialRow[]).map(rowToTestimonial)
}

export async function setTestimonialApproval(id: string, approved: boolean): Promise<void> {
  const { error } = await supabase.from('testimonials').update({ approved }).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
