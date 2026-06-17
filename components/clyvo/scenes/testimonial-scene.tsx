'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { StarRating } from '@/components/clyvo/star-rating'
import { SATISFACTION_EMOJI, type Testimonial } from '@/lib/testimonials'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-80px' } as const

export function TestimonialScene() {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null)

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => setTestimonials(data.testimonials ?? []))
      .catch(() => setTestimonials([]))
  }, [])

  // Still loading, or nothing approved yet — don't render an empty-looking section
  if (testimonials === null || testimonials.length === 0) return null

  return (
    <section id="reviews" className="relative section-padding section-has-glass" style={{ background: '#EDE6D6' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE }} className="mb-10 md:mb-16"
        >
          <div className="section-divider" />
          <span className="eyebrow">Client Feedback</span>
          <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            What it&apos;s actually like to work with us.
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
            Unedited feedback from the businesses we&apos;ve built for.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="glass-card p-6 md:p-7"
            >
              <div className="flex items-center justify-between">
                <StarRating value={t.rating} size={16} />
                <span className="text-lg" role="img" aria-label={SATISFACTION_EMOJI[t.satisfaction].label}>
                  {SATISFACTION_EMOJI[t.satisfaction].emoji}
                </span>
              </div>
              <p className="mt-4 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 border-t pt-4" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                <p className="font-syne text-sm font-semibold text-[#1A1A1A]">{t.name}</p>
                {t.company && <p className="font-inter text-xs text-[#8A8A8A]">{t.company}</p>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
