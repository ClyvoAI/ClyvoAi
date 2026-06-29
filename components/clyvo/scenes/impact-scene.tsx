'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight, Hammer, RefreshCw } from 'lucide-react'
import { BookingButton } from '@/components/clyvo/booking-modal'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-80px' } as const

const STATS = [
  { value: 4,   suffix: '',   label: 'Businesses Automated' },
  { value: 100, suffix: '%',  label: 'Custom Built' },
  { value: 2,   suffix: 'mo', label: 'Avg. Delivery' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1)
      setCount(Math.round(p * value))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])
  return (
    <span ref={ref} className="font-playfair font-bold italic" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#1A1A1A' }}>
      {count}{suffix}
    </span>
  )
}

const PLAN = [
  { icon: Hammer,    title: 'Setup Fee',        note: 'Priced per project',  description: 'A one-time investment covering everything from discovery through to live deployment.', deliverables: ['Discovery & scoping', 'Solution design', 'Development & testing', 'Deployment & handover'] },
  { icon: RefreshCw, title: 'Monthly Retainer', note: 'Ongoing partnership', description: 'Your AI system running, improving, and adapting to your business as it evolves.',         deliverables: ['Monitoring & maintenance', 'Model updates & retraining', 'New feature development', 'Priority support'] },
]

export function ImpactScene() {
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
          className="mb-10 md:mb-16 grid grid-cols-3 gap-4 md:gap-8 py-8 md:py-12"
          style={{ borderTop: '1px solid rgba(201,168,76,0.25)', borderBottom: '1px solid rgba(201,168,76,0.25)' }}>
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <Counter value={s.value} suffix={s.suffix} />
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
                  <h3 className="font-syne text-lg font-semibold text-[#1A1A1A]">{p.title}</h3>
                  <p className="font-inter text-[11px] uppercase tracking-[0.12em] text-[#C9A84C]/70">{p.note}</p>
                </div>
              </div>
              <p className="mt-6 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{p.description}</p>
              <ul className="mt-6 space-y-2">
                {p.deliverables.map(d => (
                  <li key={d} className="flex items-center gap-3 font-inter text-sm text-[#4A4A4A]">
                    <div className="h-px w-5 flex-shrink-0 bg-[#C9A84C]" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-12 text-center">
          <BookingButton className="btn-primary">
            Book a Discovery Call — it&apos;s free <ArrowRight className="h-3.5 w-3.5" />
          </BookingButton>
          <p className="mt-4 font-inter text-xs text-[#8A8A8A]">No commitment · 45-minute call · We&apos;ll scope your exact needs</p>
        </motion.div>
      </div>
    </section>
  )
}
