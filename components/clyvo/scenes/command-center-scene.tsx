'use client'

import { motion } from 'motion/react'
import { Building, Building2, Landmark, Check } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-80px' } as const

const CLIENT_TYPES = [
  { icon: Building,  range: '10–200 employees',     title: 'SMBs',        description: 'Automate operations, reduce manual work, and compete with larger players using AI.' },
  { icon: Building2, range: '200–2,000 employees',   title: 'Mid-Market',  description: 'Custom AI that integrates cleanly into your existing enterprise systems.' },
  { icon: Landmark,  range: 'Complex environments',  title: 'Enterprise',  description: 'Complex requirements, multi-system environments, and bespoke AI infrastructure.' },
]

const IDEAL_TRAITS = [
  'A B2B business with repetitive, manual processes',
  'Existing systems and tools already in use',
  'A decision-maker who understands ROI',
  'Ready to move fast — not waiting for a committee',
]

export function CommandCenterScene() {
  return (
    <section id="about" className="relative section-padding section-has-glass" style={{ background: '#EDE6D6' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE }} className="mb-16">
          <div className="section-divider" />
          <span className="eyebrow">Who We Work With</span>
          <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            Built for B2B businesses of every size
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
            Whatever stage you&apos;re at, we scope the engagement to match the scale and complexity of your operations.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {CLIENT_TYPES.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="glass-card p-8">
              <div className="flex h-10 w-10 items-center justify-center"
                style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}>
                <c.icon className="h-4 w-4 text-[#C9A84C]" />
              </div>
              <h3 className="mt-5 font-syne text-base font-semibold text-[#1A1A1A]">{c.title}</h3>
              <span className="mt-1 block font-inter text-[10px] uppercase tracking-[0.15em] text-[#C9A84C]/70">{c.range}</span>
              <p className="mt-3 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{c.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-6 glass-card p-8 md:p-10"
          style={{ borderLeft: '3px solid #C9A84C' }}>
          <span className="eyebrow">Your Ideal Fit</span>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {IDEAL_TRAITS.map((trait) => (
              <li key={trait} className="flex items-start gap-3 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                {trait}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
