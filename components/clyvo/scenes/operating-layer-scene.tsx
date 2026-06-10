'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { Check } from 'lucide-react'

const STEPS = [
  { num: '01', title: 'Discovery Call',           description: 'A free 45-minute call to understand your business, pain points, systems, and goals. No hard sell.' },
  { num: '02', title: 'Scoping & Proposal',        description: 'A full solution architecture, deliverables, timeline, and pricing — laid out clearly before we begin.' },
  { num: '03', title: 'Build & Development',       description: 'Custom development with regular progress updates, so you always know exactly where things stand.' },
  { num: '04', title: 'Testing & QA',             description: 'Rigorous testing against real business scenarios, with client UAT included before anything goes live.' },
  { num: '05', title: 'Deployment & Integration', description: 'Live deployment into your environment with full system integration and complete handover documentation.' },
  { num: '06', title: 'Retainer & Optimisation',  description: 'Ongoing monitoring, model updates, retraining, and new feature development as your business evolves.' },
]

function StepItem({
  progress,
  step,
  index,
  total,
}: {
  progress: MotionValue<number>
  step: typeof STEPS[0]
  index: number
  total: number
}) {
  const sliceStart = 0.08 + (index / total) * 0.78
  const sliceEnd   = sliceStart + 0.10

  const numOpacity = useTransform(
    progress,
    [Math.max(0, sliceStart - 0.03), sliceEnd, Math.min(1, sliceEnd + 0.28)],
    [0.15, 0.90, 0.40]
  )
  const contentOpacity = useTransform(progress, [sliceStart, sliceEnd], [0, 1])
  const dotScale = useTransform(
    progress,
    [Math.max(0, sliceStart - 0.02), sliceEnd, Math.min(1, sliceEnd + 0.15)],
    [0.6, 1.4, 1.0]
  )
  const completedOpacity = useTransform(progress, (v) => (v > sliceEnd + 0.05 ? 1 : 0))

  return (
    <div className="relative grid items-start gap-4 border-t border-white/[0.06] py-8 first:border-0 first:pt-0 sm:gap-6 sm:py-10 sm:grid-cols-[80px_1fr]">
      {/* Connector dot on left rail — desktop only */}
      <motion.div
        className="absolute -left-[1.375rem] top-10 hidden h-2.5 w-2.5 rounded-full sm:block"
        style={{ scale: dotScale, background: '#00E5FF' }}
      />

      {/* Step number */}
      <motion.div className="relative flex items-center gap-2" style={{ opacity: numOpacity }}>
        <span className="font-syne text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl">
          {step.num}
        </span>
        <motion.div style={{ opacity: completedOpacity }}>
          <Check className="h-4 w-4 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Content — no x translate (prevents mobile overflow) */}
      <motion.div style={{ opacity: contentOpacity }}>
        <h3 className="font-syne text-lg font-semibold text-white sm:text-xl">{step.title}</h3>
        <p className="mt-2 font-inter text-sm font-light leading-[1.75] text-white/45 md:text-base">
          {step.description}
        </p>
      </motion.div>
    </div>
  )
}

export function OperatingLayerScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.90], [0, 1])

  return (
    <section ref={sectionRef} id="how-it-works-scene" className="relative w-full overflow-hidden px-4 py-14 sm:px-6 md:px-8 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          className="mb-12 md:mb-16"
        >
          <span className="font-inter font-medium text-[11px] uppercase tracking-[0.18em] text-white/35">
            How It Works
          </span>
          <h2 className="mt-4 text-balance font-syne text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl md:text-5xl" style={{ fontFeatureSettings: "'ss01'" }}>
            A process built for results, not risk.
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-light leading-[1.75] text-white/45 md:text-base">
            Six clear stages, full transparency throughout — from the first call to live and beyond.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="flex gap-10 sm:gap-16">
          {/* Vertical progress line — hidden on mobile */}
          <div className="relative hidden shrink-0 flex-col items-center sm:flex" style={{ width: 2 }}>
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
            <motion.div
              className="absolute top-0 w-full rounded-full will-change-transform"
              style={{
                scaleY: lineScaleY,
                transformOrigin: 'top',
                height: '100%',
                background: '#00E5FF',
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex-1">
            {STEPS.map((step, i) => (
              <StepItem
                key={step.num}
                progress={scrollYProgress}
                step={step}
                index={i}
                total={STEPS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
