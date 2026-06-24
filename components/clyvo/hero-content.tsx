'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { NeuralCanvas } from '@/components/clyvo/neural-canvas'
import { ArcReactor }   from '@/components/clyvo/arc-reactor'

const EASE = [0.16, 1, 0.3, 1] as const
const LOGO_FILTER = 'brightness(0) saturate(100%)'

const GLASS = {
  background: 'rgba(245,240,232,0.55)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(201,168,76,0.22)',
  boxShadow: '0 8px 40px rgba(26,26,26,0.08)',
}

// ── Live metric hook ──────────────────────────────────────────────────────────
// Each metric ticks randomly within a realistic range, simulating live inference
function useLiveMetric(base: number, variance: number, interval: number) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + (Math.random() - 0.5) * variance * 2)
    }, interval)
    return () => clearInterval(id)
  }, [base, variance, interval])
  return value
}

// ── Spark line data (7 bars, rolling) ────────────────────────────────────────
function useSparkline() {
  const [bars, setBars] = useState([40, 70, 50, 90, 60, 80, 45])
  useEffect(() => {
    const id = setInterval(() => {
      setBars(prev => [...prev.slice(1), 20 + Math.random() * 75])
    }, 900)
    return () => clearInterval(id)
  }, [])
  return bars
}

// ── Task list cycling ─────────────────────────────────────────────────────────
const TASKS = [
  'Lead qualification',
  'Data sync',
  'Workflow trigger',
  'CRM update',
  'Invoice processed',
  'Email routed',
]

function useCyclingTasks() {
  const [active, setActive] = useState([0, 1, 2])
  useEffect(() => {
    const id = setInterval(() => {
      setActive(prev => {
        const next = (prev[2] + 1) % TASKS.length
        return [prev[1], prev[2], next]
      })
    }, 2200)
    return () => clearInterval(id)
  }, [])
  return active
}

export function HeroContent() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY       = useTransform(scrollYProgress, [0, 0.7], [0, -60])
  const cardOpacity    = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const cardX          = useTransform(scrollYProgress, [0, 0.5], [0, 80])
  const logoOpacity    = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const logoY          = useTransform(scrollYProgress, [0, 0.5], [0, -30])

  // Live metrics
  const latency   = useLiveMetric(42, 12, 800)
  const accuracy  = useLiveMetric(98.4, 0.8, 1200)
  const throughput = useLiveMetric(1240, 180, 700)
  const bars      = useSparkline()
  const taskIdx   = useCyclingTasks()
  const [processed, setProcessed] = useState(12)
  useEffect(() => {
    const id = setInterval(() => setProcessed(p => Math.min(p + 1, 20)), 4700)
    return () => clearInterval(id)
  }, [])

  return (
    <section ref={ref} className="relative w-full h-[78vh] md:h-screen" style={{ background: '#F5F0E8', overflow: 'clip' }}>

      {/* ── Neural network canvas — behind everything ── */}
      <NeuralCanvas />

      {/* Subtle grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-40" />

      {/* Warm radial glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)',
      }} />

      {/* Edge vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(245,240,232,0.8) 100%)',
      }} />

      {/* Arc Reactor — replaces logo orb */}
      <motion.div style={{ y: logoY, opacity: logoOpacity }}
        className="pointer-events-none absolute hidden md:block"
        style={{ top: '50%', left: '58%', transform: 'translate(-50%, -50%)' }}>
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
        >
          <ArcReactor />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }}
        className="absolute bottom-0 left-0 w-full pb-10 md:pb-20 pl-6 sm:pl-10 md:pl-16 lg:pl-24 will-change-transform">
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mb-6 flex items-center gap-3">
          <div style={{ width: 24, height: 1, background: '#C9A84C' }} />
          <span className="eyebrow">Custom AI Agency · B2B</span>
        </motion.div>

        <h1 style={{ fontSize: 'clamp(2.8rem, 9vw, 9.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em', paddingBottom: '0.1em', overflow: 'visible' }}>
          <span className="block headline-luxury" style={{ overflow: 'visible' }}>
            {['Custom', 'AI.'].map((w, i) => (
              <motion.span key={w} className="mr-[0.15em] inline-block last:mr-0"
                style={{ overflow: 'visible', display: 'inline-block' }}
                initial={{ clipPath: 'inset(0 100% 0 -10%)' }}
                animate={{ clipPath: 'inset(0 0% 0 -10%)' }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: EASE }}
              >{w}</motion.span>
            ))}
          </span>
          <span className="block headline-luxury" style={{ fontSize: '0.92em', color: 'rgba(26,26,26,0.70)', overflow: 'visible' }}>
            {['Real', 'Results.'].map((w, i) => (
              <motion.span key={w} className="mr-[0.15em] inline-block last:mr-0"
                style={{ overflow: 'visible', display: 'inline-block' }}
                initial={{ clipPath: 'inset(0 100% 0 -10%)' }}
                animate={{ clipPath: 'inset(0 0% 0 -10%)' }}
                transition={{ duration: 1.1, delay: 0.75 + i * 0.12, ease: EASE }}
              >{w}</motion.span>
            ))}
          </span>
        </h1>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }} className="mt-8 max-w-md">
          <p className="font-inter text-base font-light leading-[1.8] text-[#1A1A1A]/85">
            We build end-to-end AI systems for B2B businesses — from scratch, for your exact operations.
          </p>
          <p className="mt-3 hidden font-inter text-[11px] uppercase tracking-[0.2em] text-[#C9A84C]/70 sm:block">
            100% Custom &nbsp;·&nbsp; B2B Only &nbsp;·&nbsp; Setup + Retainer
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
          className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn-primary">
            Book a Free Discovery Call <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a href="#solutions" className="btn-ghost">See What We Build</a>
        </motion.div>
      </motion.div>

      {/* ── Live AI dashboard card ─────────────────────────────────────────── */}
      <motion.div
        style={{ x: cardX, opacity: cardOpacity, position: 'absolute', right: '2rem', top: '8%' } as any}
        className="pointer-events-none hidden xl:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          style={{ ...GLASS, padding: '20px 24px', width: 272 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-syne text-[13px] font-semibold text-[#1A1A1A]">AI System Active</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-inter text-[9px] uppercase tracking-[0.1em] text-emerald-600">Live</span>
            </div>
          </div>

          {/* Live metric row */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: 'Latency',  value: `${latency.toFixed(0)}ms`,     color: '#C9A84C' },
              { label: 'Accuracy', value: `${accuracy.toFixed(1)}%`,      color: '#C9A84C' },
              { label: 'req/min',  value: throughput.toFixed(0),           color: '#C9A84C' },
            ].map(m => (
              <div key={m.label} className="rounded-sm px-2 py-1.5 text-center"
                style={{ background: 'rgba(26,26,26,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <div className="font-syne text-[12px] font-bold" style={{ color: m.color }}>
                  {m.value}
                </div>
                <div className="font-inter text-[8px] uppercase tracking-[0.08em] text-[#1A1A1A]/35 mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Cycling task list */}
          <div className="mt-3 space-y-2">
            {taskIdx.map((ti, pos) => (
              <motion.div
                key={ti}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: pos === 2 ? 0.35 : pos === 1 ? 0.65 : 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: pos === 0 ? '#10B981' : '#C9A84C' }}
                  animate={{ opacity: pos === 0 ? [0.5, 1, 0.5] : 1 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="font-inter text-[11px] text-[#1A1A1A]/60">{TASKS[ti]}</span>
                {pos === 0 && (
                  <span className="ml-auto font-inter text-[9px] text-emerald-500 uppercase tracking-wide">done</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Sparkline — live rolling bars */}
          <div className="mt-3 flex h-10 items-end gap-0.5">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: i === bars.length - 1 ? 'rgba(255,190,0,0.7)' : 'rgba(201,168,76,0.35)' }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between border-t pt-3"
            style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
            <div>
              <span className="font-syne text-xl font-bold text-[#1A1A1A]">{processed}</span>
              <span className="ml-1.5 font-inter text-[11px] text-[#1A1A1A]/40">processes automated</span>
            </div>
            <div className="font-inter text-[9px] uppercase tracking-[0.08em] text-[#C9A84C]/60">
              ↑ 3.2x ROI
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 hidden items-end gap-2 md:flex">
        <span className="font-inter text-[9px] uppercase tracking-[0.4em] text-[#1A1A1A]/30"
          style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <motion.div className="h-10 w-px" style={{ background: 'rgba(201,168,76,0.4)' }}
          animate={{ scaleY: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>
    </section>
  )
}
