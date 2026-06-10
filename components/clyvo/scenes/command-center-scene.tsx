'use client'

import { motion } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { Building, Building2, Landmark, Check } from 'lucide-react'

const CLIENT_TYPES = [
  {
    icon: Building,
    range: '10–200 employees',
    title: 'SMBs',
    description: 'Automate operations, reduce manual work, and compete with larger players using AI.',
  },
  {
    icon: Building2,
    range: '200–2,000 employees',
    title: 'Mid-Market',
    description: 'Custom AI that integrates cleanly into your existing enterprise systems.',
  },
  {
    icon: Landmark,
    range: 'Complex environments',
    title: 'Enterprise',
    description: 'Complex requirements, multi-system environments, and bespoke AI infrastructure.',
  },
]

const IDEAL_TRAITS = [
  'A B2B business with repetitive, manual processes',
  'Existing systems and tools already in use',
  'A decision-maker who understands ROI',
  'Ready to move fast — not waiting for a committee',
]

export function CommandCenterScene() {
  return (
    <section id="about-scene" className="relative w-full overflow-hidden px-4 py-14 sm:px-6 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
          className="mb-12 md:mb-16"
        >
          <span className="font-inter font-medium text-[11px] uppercase tracking-[0.18em] text-white/35">
            Who We Work With
          </span>
          <h2 className="mt-4 text-balance font-syne text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl md:text-5xl" style={{ fontFeatureSettings: "'ss01'" }}>
            Built for B2B businesses of every size
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-light leading-[1.75] text-white/45 md:text-base">
            Whatever stage you&apos;re at, we scope the engagement to match the scale
            and complexity of your operations.
          </p>
        </motion.div>

        {/* Cards — 1-col on mobile, 3-col on sm+ */}
        <div className="grid gap-4 sm:grid-cols-3">
          {CLIENT_TYPES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_CINEMATIC }}
              className="rounded-xl border border-white/[0.10] bg-[#0d0d0d] p-6 transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-[3px] will-change-transform md:p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.10]">
                <c.icon className="h-5 w-5 text-white/50" />
              </div>
              <h3 className="mt-5 font-syne text-lg font-semibold text-white">{c.title}</h3>
              <span className="mt-1 block font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                {c.range}
              </span>
              <p className="mt-3 font-inter text-sm font-light leading-[1.75] text-white/45">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ideal fit banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE_CINEMATIC }}
          className="mt-6 rounded-xl border border-white/[0.10] bg-[#0d0d0d] px-6 py-8 md:mt-8 md:px-8 md:py-10"
          style={{ borderLeft: '2px solid rgba(255,255,255,0.20)' }}
        >
          <span className="font-inter font-medium text-[11px] uppercase tracking-[0.18em] text-white/35">
            Your Ideal Fit
          </span>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {IDEAL_TRAITS.map((trait) => (
              <li key={trait} className="flex items-start gap-3 font-inter text-sm font-light leading-[1.75] text-white/50">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                {trait}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
