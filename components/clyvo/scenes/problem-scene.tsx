'use client'

import { motion } from 'motion/react'
import { staggerContainer, staggerItem, STAGGER_VIEWPORT } from '@/lib/utils'
import { MessageSquareOff, Building2 } from 'lucide-react'

const ALTERNATIVES = [
  {
    icon: MessageSquareOff,
    title: 'Generic AI Tools',
    description:
      "ChatGPT and off-the-shelf platforms weren't built for your processes, your data, or the way your business actually runs.",
  },
  {
    icon: Building2,
    title: 'Large IT Consultancies',
    description:
      'Slow timelines, bloated teams, and over-engineered solutions that cost a fortune and take months to ship.',
  },
]

export function ProblemScene() {
  return (
    <section id="solutions-scene" className="relative w-full overflow-hidden px-4 py-14 sm:px-6 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <motion.div
        className="relative mx-auto max-w-6xl"
        initial="hidden"
        whileInView="show"
        viewport={STAGGER_VIEWPORT}
        variants={staggerContainer}
      >
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">

          {/* Left */}
          <motion.div variants={staggerItem}>
            <span className="font-inter font-medium text-[11px] uppercase tracking-[0.18em] text-white/35">
              The Problem
            </span>
            <h2 className="mt-4 text-balance font-syne text-2xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-3xl md:text-5xl" style={{ fontFeatureSettings: "'ss01'" }}>
              Generic AI wasn&apos;t built for your business.
            </h2>
            <p className="mt-5 max-w-lg text-balance font-inter text-sm font-light leading-[1.75] text-white/45 md:text-base">
              Most B2B teams are stuck choosing between two bad options — neither designed
              around how their business actually operates.
            </p>
          </motion.div>

          {/* Right — cards */}
          <div className="space-y-4">
            {ALTERNATIVES.map((alt) => (
              <motion.div
                key={alt.title}
                variants={staggerItem}
                className="rounded-xl border border-white/[0.10] bg-[#0d0d0d] p-6 transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-[3px] md:p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.10]">
                  <alt.icon className="h-5 w-5 text-white/50" />
                </div>
                <h3 className="mt-4 font-syne text-base font-semibold text-white">{alt.title}</h3>
                <p className="mt-2 font-inter text-sm font-light leading-[1.75] text-white/45">
                  {alt.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <motion.div
          variants={staggerItem}
          className="mt-12 w-full rounded-xl border border-white/[0.10] bg-[#0d0d0d] p-6 text-center md:mt-16 md:p-12"
        >
          <p className="font-syne text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Clyvo AI is the{' '}
            <span style={{ color: '#00E5FF' }}>sharp, expert, custom</span>{' '}
            alternative.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
