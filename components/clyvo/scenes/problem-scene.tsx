'use client'

import { motion } from 'motion/react'
import { MessageSquareOff, Building2 } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-80px' } as const

const ALTERNATIVES = [
  { icon: MessageSquareOff, title: 'Generic AI Tools',
    description: "ChatGPT and off-the-shelf platforms weren't built for your processes, your data, or the way your business actually runs." },
  { icon: Building2, title: 'Large IT Consultancies',
    description: 'Slow timelines, bloated teams, and over-engineered solutions that cost a fortune and take months to ship.' },
]

export function ProblemScene() {
  return (
    <section id="solutions" className="relative w-full section-padding section-has-glass" style={{ background: '#F5F0E8' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_460px]">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={VP} transition={{ duration: 0.9, ease: EASE }}>
            <div className="section-divider" />
            <span className="eyebrow">The Problem</span>
            <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              Generic AI wasn&apos;t built for your business.
            </h2>
            <p className="mt-6 font-inter text-base font-light leading-[1.85] text-[#4A4A4A]">
              Most B2B teams are stuck choosing between two bad options — neither designed around how their business actually operates.
            </p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              className="mt-12 border-l-2 pl-6" style={{ borderColor: '#C9A84C' }}>
              <p className="font-playfair text-xl font-semibold italic text-[#1A1A1A]">
                Clyvo AI is the{' '}
                <span style={{ color: '#C9A84C' }}>sharp, expert, custom</span>{' '}
                alternative.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — glass cards */}
          <div className="space-y-4">
            {ALTERNATIVES.map((alt, i) => (
              <motion.div key={alt.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={VP} transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
                className="glass-card p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center"
                  style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}>
                  <alt.icon className="h-4 w-4 text-[#C9A84C]" />
                </div>
                <h3 className="mt-5 font-syne text-base font-semibold text-[#1A1A1A]">{alt.title}</h3>
                <p className="mt-3 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{alt.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
