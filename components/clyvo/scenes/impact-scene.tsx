'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight, Hammer, RefreshCw } from 'lucide-react'
import type { RatingStats } from '@/lib/testimonials'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-80px' } as const

// Real, verifiable numbers only — see /components/clyvo/scenes/portfolio-scene.tsx
// for the actual client list. Don't add a number here you can't point to.
const BASE_STATS = [
  { value: 4,   suffix: '',  label: 'Local Businesses Built', decimals: 0 },
  { value: 100, suffix: '%', label: 'Custom-Built, No Templates', decimals: 0 },
]

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1)
      setCount(Number((p * value).toFixed(decimals)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, decimals])
  return (
    <span ref={ref} className="font-playfair font-bold italic" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#1A1A1A' }}>
      {count.toFixed(decimals)}{suffix}
    </span>
  )
}

// Fetches the live average rating from approved testimonials. Returns
// null until there's at least one approved testimonial — the stats
// grid below only adds the third column once this resolves to a value.
function useAverageRating() {
  const [stats, setStats] = useState<RatingStats | null>(null)
  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => setStats(data.stats ?? null))
      .catch(() => setStats(null))
  }, [])
  return stats
}

const PLAN = [
  { icon: Hammer,    title: 'Setup Fee',        note: 'Priced per project',   description: 'A one-time investment covering everything from discovery through to live deployment.', deliverables: ['Discovery & scoping', 'Solution design', 'Development & testing', 'Deployment & handover'] },
  { icon: RefreshCw, title: 'Monthly Retainer', note: 'Ongoing partnership',  description: 'Your AI system running, improving, and adapting to your business as it evolves.', deliverables: ['Monitoring & maintenance', 'Model updates & retraining', 'New feature development', 'Priority support'] },
]

export function ImpactScene() {
  const ratingStats = useAverageRating()
  const STATS = ratingStats
    ? [...BASE_STATS, { value: ratingStats.average, suffix: '★', label: `Avg. Rating (${ratingStats.count})`, decimals: 1 }]
    : BASE_STATS

  return (
    <section id="pricing" className="relative section-padding section-has-glass" style={{ background: '#F5F0E8' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE }} className="mb-10 md:mb-16">
          <div className="section-divider" />
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            One model. Full accountability.
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
            A one-time setup fee to build your system, and a monthly retainer to keep it running and improving.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, ease: EASE }}
          className={`mb-10 md:mb-16 grid gap-4 md:gap-8 py-8 md:py-12 ${STATS.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}
          style={{ borderTop: '1px solid rgba(201,168,76,0.25)', borderBottom: '1px solid rgba(201,168,76,0.25)' }}>
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              <p className="mt-2 font-inter text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PLAN.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="glass-card p-8 md:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center"
                  style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}>
                  <p.icon className="h-4 w-4 text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="font-syne text-base font-semibold text-[#1A1A1A]">{p.title}</h3>
                  <span className="font-inter text-[10px] uppercase tracking-[0.15em] text-[#C9A84C]/70">{p.note}</span>
                </div>
              </div>
              <p className="mt-5 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{p.description}</p>
              <ul className="mt-5 space-y-2.5">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 font-inter text-sm font-light text-[#4A4A4A]">
                    <span className="h-1 w-4 shrink-0" style={{ background: '#C9A84C', opacity: 0.5 }} />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-8 md:mt-12 flex flex-col items-center gap-5 text-center">
          <p className="font-inter text-sm font-light text-[#8A8A8A]">
            No fixed package tiers. Every solution is scoped to your real problem.
          </p>
          <a href="#contact" className="btn-primary">
            Book a Discovery Call — it&apos;s free <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
