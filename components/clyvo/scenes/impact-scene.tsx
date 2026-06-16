'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ArrowRight, Hammer, RefreshCw } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-80px' } as const

const GLASS = {
  background: 'rgba(255,255,255,0.45)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(201,168,76,0.18)',
  boxShadow: '0 8px 32px rgba(26,26,26,0.06)',
}

const STATS = [
  { value: 500, suffix: '+', label: 'Clients Served' },
  { value: 98,  suffix: '%', label: 'Satisfaction' },
  { value: 3,   suffix: 'x', label: 'Average ROI' },
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
    <span ref={ref} className="font-playfair font-bold italic" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#1A1A1A' }}>
      {count}{suffix}
    </span>
  )
}

const PLAN = [
  { icon: Hammer,    title: 'Setup Fee',        note: 'Priced per project',      description: 'A one-time investment covering everything from discovery through to live deployment.', deliverables: ['Discovery & scoping', 'Solution design', 'Development & testing', 'Deployment & handover'] },
  { icon: RefreshCw, title: 'Monthly Retainer', note: 'Ongoing partnership',     description: 'Your AI system running, improving, and adapting to your business as it evolves.', deliverables: ['Monitoring & maintenance', 'Model updates & retraining', 'New feature development', 'Priority support'] },
]

export function ImpactScene() {
  return (
    <section id="pricing" className="relative section-padding" style={{ background: '#F5F0E8' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE }} className="mb-16">
          <div className="section-divider" />
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            One model. Full accountability.
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
            A one-time setup fee to build your system, and a monthly retainer to keep it running and improving.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 grid grid-cols-3 gap-8 py-12"
          style={{ borderTop: '1px solid rgba(201,168,76,0.25)', borderBottom: '1px solid rgba(201,168,76,0.25)' }}>
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-2 font-inter text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Glass Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {PLAN.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="p-8 md:p-10 transition-all duration-300"
              style={{ ...GLASS }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(26,26,26,0.10)'
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,26,26,0.06)'
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'
              }}
            >
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
          className="mt-12 flex flex-col items-center gap-5 text-center">
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
