'use client'

import { motion } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = seed / 233280
  return {
    left:     `${(i * 37) % 100}%`,
    top:      `${(rand * 100).toFixed(2)}%`,
    size:     0.8 + (i % 3) * 0.4,
    duration: 5 + (i % 6),
    delay:    (i % 8) * 0.35,
  }
})

const HEADLINE_WORDS = ['Your', 'industry', 'knowledge', '+', 'our', 'AI', 'expertise', '=', 'real', 'results.']
const ACCENT_WORDS   = new Set(['+', '='])

export function FutureScene() {
  return (
    <section id="contact-scene" className="relative overflow-hidden px-5 py-32 sm:py-44 md:py-56">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.07) 0%, transparent 70%)' }}
      />

      {/* Particles — fewer, desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ opacity: [0.03, 0.18, 0.03], y: [0, -30, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
          className="font-inter font-medium text-[11px] uppercase tracking-[0.18em] text-white/35"
        >
          What&apos;s Next
        </motion.span>

        <h2
          className="mt-5 font-syne font-extrabold tracking-[-0.03em] text-white"
          style={{ fontSize: 'clamp(1.9rem, 5.5vw, 4rem)', lineHeight: 1.08, fontFeatureSettings: "'ss01'" }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className={`mr-[0.22em] inline-block last:mr-0${ACCENT_WORDS.has(word) ? ' gradient-label' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_CINEMATIC }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE_CINEMATIC }}
          className="mt-6 max-w-xl font-inter text-sm font-light leading-[1.75] text-white/45 md:text-base"
        >
          Start with a free 45-minute discovery call. No commitment. No hard sell. Just clarity.
        </motion.p>

        {/* CTAs — stacked on mobile, row on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE_CINEMATIC }}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="btn-active group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-inter text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] sm:w-auto"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }}
          >
            Book Your Free Discovery Call
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="/apply"
            className="btn-active flex w-full items-center justify-center rounded-full border border-white/10 px-8 py-4 font-inter text-sm font-medium text-white/50 transition-all duration-300 hover:border-white/20 hover:text-white/80 sm:w-auto"
          >
            Submit an Application
          </a>
        </motion.div>
      </div>
    </section>
  )
}
