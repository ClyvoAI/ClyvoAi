'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Check } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const STEPS = [
  { num: '01', title: 'Discovery Call',           description: 'A free 45-minute call to understand your business, pain points, systems, and goals. No hard sell.' },
  { num: '02', title: 'Scoping & Proposal',        description: 'A full solution architecture, deliverables, timeline, and pricing — laid out clearly before we begin.' },
  { num: '03', title: 'Build & Development',       description: 'Custom development with regular progress updates, so you always know exactly where things stand.' },
  { num: '04', title: 'Testing & QA',             description: 'Rigorous testing against real business scenarios, with client UAT included before anything goes live.' },
  { num: '05', title: 'Deployment & Integration', description: 'Live deployment into your environment with full system integration and complete handover documentation.' },
  { num: '06', title: 'Retainer & Optimisation',  description: 'Ongoing monitoring, model updates, retraining, and new feature development as your business evolves.' },
]

// ── Data packet canvas ────────────────────────────────────────────────────────
// Renders travelling dots on the timeline line.
// lineHeight = actual rendered px height of the gold line.
// progress   = 0→1 scroll progress (how far the gold line has grown).
interface PacketCanvasProps {
  lineHeight: number
  progress: number
}

interface Packet { y: number; speed: number; alpha: number; size: number }

function PacketCanvas({ lineHeight, progress }: PacketCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const packets   = useRef<Packet[]>([])
  const rafRef    = useRef<number>(0)
  const prevProgress = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext('2d')
    if (!ctx) return

    // Spawn new packet when progress advances
    if (progress > prevProgress.current + 0.04 && lineHeight > 20) {
      packets.current.push({
        y:     0,
        speed: 1.2 + Math.random() * 1.4,
        alpha: 0.7 + Math.random() * 0.3,
        size:  3 + Math.random() * 2,
      })
      prevProgress.current = progress
    }

    canvas.width  = 20
    canvas.height = lineHeight

    const draw = () => {
      ctx.clearRect(0, 0, 20, lineHeight)
      packets.current = packets.current.filter(p => p.y < lineHeight)

      packets.current.forEach(p => {
        p.y     += p.speed
        p.alpha *= 0.998

        // Glow halo
        const grd = ctx.createRadialGradient(10, p.y, 0, 10, p.y, p.size * 3)
        grd.addColorStop(0, `rgba(255,190,0,${p.alpha * 0.9})`)
        grd.addColorStop(0.5, `rgba(201,168,76,${p.alpha * 0.4})`)
        grd.addColorStop(1, 'rgba(201,168,76,0)')
        ctx.beginPath()
        ctx.arc(10, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Hard dot
        ctx.beginPath()
        ctx.arc(10, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,210,50,${p.alpha})`
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    cancelAnimationFrame(rafRef.current)
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [lineHeight, progress])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0, left: -4,
        width: 20,
        height: lineHeight,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
}

function StepItem({ progress, step, index, total }: { progress: MotionValue<number>; step: typeof STEPS[0]; index: number; total: number }) {
  const s = 0.08 + (index / total) * 0.78
  const e = s + 0.10
  const numOp  = useTransform(progress, [Math.max(0, s - 0.03), e, Math.min(1, e + 0.28)], [0.2, 1, 0.5])
  const contOp = useTransform(progress, [s, e], [0, 1])
  const dotSc  = useTransform(progress, [Math.max(0, s - 0.02), e, Math.min(1, e + 0.15)], [0.6, 1.4, 1.0])
  const doneOp = useTransform(progress, (v) => (v > e + 0.05 ? 1 : 0))

  return (
    <div className="relative grid items-start gap-3 py-6 first:pt-0 sm:gap-8 sm:py-10 sm:grid-cols-[80px_1fr]"
      style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <style>{`div:first-child { border-top: none; }`}</style>
      <motion.div className="absolute -left-[1.375rem] top-10 hidden h-2.5 w-2.5 rounded-full sm:block"
        style={{ scale: dotSc, background: '#C9A84C', zIndex: 3 }} />
      <motion.div className="flex items-center gap-2" style={{ opacity: numOp }}>
        <span className="font-playfair text-3xl font-bold italic text-[#1A1A1A]">{step.num}</span>
        <motion.div style={{ opacity: doneOp }}>
          <Check className="h-4 w-4 text-[#C9A84C]" />
        </motion.div>
      </motion.div>
      <motion.div style={{ opacity: contOp }}>
        <h3 className="font-syne text-lg font-semibold text-[#1A1A1A]">{step.title}</h3>
        <p className="mt-2 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{step.description}</p>
      </motion.div>
    </div>
  )
}

export function OperatingLayerScene() {
  const sectionRef  = useRef<HTMLElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const [lineH, setLineH] = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.90], [0, 1])

  // Measure rendered line height for packet canvas
  const [progressVal, setProgressVal] = useState(0)
  useEffect(() => {
    return lineScaleY.on('change', v => {
      setProgressVal(v)
      if (lineRef.current) setLineH(lineRef.current.offsetHeight * v)
    })
  }, [lineScaleY])

  return (
    <section ref={sectionRef} id="how-it-works" className="relative section-padding" style={{ background: '#F5F0E8' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: EASE }}
          className="mb-10 md:mb-16">
          <div className="section-divider" />
          <span className="eyebrow">How It Works</span>
          <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            A process built for results, not risk.
          </h2>
          <p className="mt-4 max-w-lg font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
            Six clear stages, full transparency throughout — from the first call to live and beyond.
          </p>
        </motion.div>

        <div className="flex gap-6 sm:gap-16">
          {/* Timeline line + packet canvas */}
          <div className="relative hidden shrink-0 flex-col items-center sm:flex" style={{ width: 2 }}>
            {/* Track (background) */}
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(201,168,76,0.15)' }} />
            {/* Filling gold line */}
            <motion.div
              ref={lineRef}
              className="absolute top-0 w-full rounded-full will-change-transform"
              style={{ scaleY: lineScaleY, transformOrigin: 'top', height: '100%', background: '#C9A84C' }}
            />
            {/* Packet canvas — overlaid on top of the line */}
            <PacketCanvas lineHeight={lineH} progress={progressVal} />
          </div>

          <div className="flex-1">
            {STEPS.map((step, i) => (
              <StepItem key={step.num} progress={scrollYProgress} step={step} index={i} total={STEPS.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
