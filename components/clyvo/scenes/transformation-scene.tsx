'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'motion/react'
import { Bot, Workflow, Brain, Phone, Plug, ChevronLeft, ChevronRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' } as const

const CARD_W = 320   // px — card width
const GAP    = 28    // px — gap between cards
const STEP   = CARD_W + GAP  // px per card slot

const SERVICES = [
  { num: '01', icon: Bot,      title: 'AI Chatbots & Assistants',      description: 'Custom-trained agents for support, sales qualification, and onboarding — integrated into your existing platforms.' },
  { num: '02', icon: Workflow, title: 'Workflow & Process Automation',  description: 'End-to-end automation of repetitive processes — lead routing, document handling, approvals, data entry elimination.' },
  { num: '03', icon: Brain,    title: 'Custom AI Model Development',    description: 'Bespoke ML and LLM models trained on your data — predictive analytics, classification, content generation.' },
  { num: '04', icon: Phone,    title: 'AI Voice Agents',                description: 'Intelligent voice systems for inbound and outbound calls — customer service, appointment booking, qualification.' },
  { num: '05', icon: Plug,     title: 'System Integrations',            description: 'AI connected into your existing stack — Salesforce, HubSpot, SAP, NetSuite, APIs, and databases.' },
]

const SERVICE_HREFS: Record<string, string> = {
  '01': 'ai-chatbots', '02': 'workflow-automation', '03': 'custom-ai-models',
  '04': 'voice-agents', '05': 'system-integrations',
}

// Z-depth config per offset from active card
// Active pops forward, neighbours step back in Z — no rotation, no overlap
const DEPTH: Record<number, { z: number; scale: number; opacity: number }> = {
   0: { z:  80, scale: 1.00, opacity: 1.00 },
   1: { z:  -8, scale: 0.93, opacity: 0.72 },
  '-1':{ z:  -8, scale: 0.93, opacity: 0.72 },
   2: { z: -40, scale: 0.86, opacity: 0.42 },
  '-2':{ z: -40, scale: 0.86, opacity: 0.42 },
}

function getDepth(offset: number) {
  const key = Math.max(-2, Math.min(2, offset))
  return DEPTH[key] ?? DEPTH[2]
}

export function TransformationScene() {
  const [active, setActive]     = useState(0)
  const [mounted, setMounted]   = useState(false)
  const [stageW, setStageW]     = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const autoRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragStartX = useRef<number | null>(null)
  const total = SERVICES.length

  // Measure stage width for centering calculation
  useEffect(() => {
    setMounted(true)
    const measure = () => {
      if (stageRef.current) setStageW(stageRef.current.offsetWidth)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setActive(i => Math.min(total - 1, i + 1)), [total])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(
      () => setActive(i => (i + 1) % total),
      4500
    )
  }, [total])

  useEffect(() => { resetAuto(); return () => { if (autoRef.current) clearInterval(autoRef.current) } }, [resetAuto])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { prev(); resetAuto() }
      if (e.key === 'ArrowRight') { next(); resetAuto() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, resetAuto])

  const onPointerDown = (e: React.PointerEvent) => { dragStartX.current = e.clientX }
  const onPointerUp   = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 40) { delta < 0 ? next() : prev(); resetAuto() }
    dragStartX.current = null
  }

  // How far left to shift the track so the active card sits centred in the stage
  // Formula: offset that places card[active].left edge at (stageW/2 - CARD_W/2)
  const trackShift = stageW > 0
    ? stageW / 2 - CARD_W / 2 - active * STEP
    : 0

  return (
    <section id="services" className="relative overflow-hidden pb-20 pt-0" style={{ background: '#EDE6D6' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />

      {/* Header */}
      <div className="relative px-5 pb-12 pt-16 md:px-16 md:pt-24">
        <div className="section-divider" />
        <span className="eyebrow">What We Build</span>
        <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
          Five capabilities. Infinite applications.
        </h2>
        <p className="mt-4 max-w-lg font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
          Every engagement is built from scratch around your business.
        </p>
      </div>

      {/* Stage — clips overflow so only visible cards show, perspective for Z-depth */}
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden"
        style={{ height: 380, perspective: '900px', perspectiveOrigin: '50% 50%' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* ── Cyberpunk glow layer ────────────────────────────────────────────
            Three concentric radial glows behind the active card (always 50% X)
            + two dim satellite glows at the ±1 neighbour positions.
            All pointer-events-none so they never interfere with card clicks.
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Outer diffuse halo — widest, lowest opacity, slow pulse */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700, height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, rgba(180,120,30,0.08) 45%, transparent 75%)',
            filter: 'blur(32px)',
            animation: 'glow-pulse 4s ease-in-out infinite',
          }} />

          {/* Mid ring — tighter, warmer amber core */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -52%)',
            width: 400, height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255,185,50,0.28) 0%, rgba(201,168,76,0.14) 50%, transparent 75%)',
            filter: 'blur(18px)',
            animation: 'glow-pulse 4s ease-in-out infinite 0.6s',
          }} />

          {/* Tight bright core — simulates neon hotspot on the card face */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -58%)',
            width: 200, height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255,210,90,0.45) 0%, rgba(201,168,76,0.20) 60%, transparent 100%)',
            filter: 'blur(8px)',
            animation: 'glow-pulse 4s ease-in-out infinite 1.2s',
          }} />

          {/* Floor reflection — subtle warm pool under the cards */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: 500, height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.22) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'glow-pulse 4s ease-in-out infinite 2s',
          }} />

          {/* Satellite glow — left neighbour card (offset -1), dimmer */}
          {stageW > 0 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `calc(50% - ${STEP}px)`,
              transform: 'translate(-50%, -50%)',
              width: 260, height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)',
              filter: 'blur(24px)',
              transition: 'opacity 0.5s ease',
              opacity: active > 0 ? 1 : 0,
            }} />
          )}

          {/* Satellite glow — right neighbour card (offset +1), dimmer */}
          {stageW > 0 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `calc(50% + ${STEP}px)`,
              transform: 'translate(-50%, -50%)',
              width: 260, height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)',
              filter: 'blur(24px)',
              transition: 'opacity 0.5s ease',
              opacity: active < total - 1 ? 1 : 0,
            }} />
          )}
        </div>

        {/* Keyframes injected once — can't use globals.css @keyframes inside JSX easily */}
        <style>{`
          @keyframes glow-pulse {
            0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
            50%       { opacity: 1.00; transform: translate(-50%, -50%) scale(1.08); }
          }
        `}</style>

        {/* Sliding track — translate X to centre active card */}
        <div
          className="absolute top-0 flex items-center"
          style={{
            gap: GAP,
            height: '100%',
            paddingTop: 16,
            paddingBottom: 16,
            left: mounted ? trackShift : `calc(50% - ${CARD_W / 2}px)`,
            transition: 'left 0.55s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'left',
          }}
        >
          {SERVICES.map((s, i) => {
            const offset   = i - active
            const depth    = getDepth(offset)
            const isActive = offset === 0

            return (
              <div
                key={s.num}
                onClick={() => { if (!isActive) { setActive(i); resetAuto() } }}
                style={{
                  width: CARD_W,
                  flexShrink: 0,
                  cursor: isActive ? 'default' : 'pointer',
                  transform: `translateZ(${depth.z}px) scale(${depth.scale})`,
                  opacity: depth.opacity,
                  transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease',
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="glass-card flex h-full flex-col p-7"
                  style={{
                    height: 328,
                    // Kill the CSS float animation — carousel owns the motion
                    animation: 'none',
                    // Active card: brighter top edge highlight
                    borderTopColor: isActive ? 'rgba(255,255,255,0.95)' : undefined,
                    boxShadow: isActive
                      ? '0 40px 80px -20px rgba(26,26,26,0.22), 0 20px 40px -10px rgba(26,26,26,0.14), inset 0 2px 0 rgba(255,255,255,0.85), inset 2px 0 0 rgba(255,255,255,0.55)'
                      : undefined,
                  }}
                >
                  <span className="font-syne text-2xl font-bold text-[#C9A84C]/80">{s.num}</span>

                  <div
                    className="mt-5 flex h-10 w-10 items-center justify-center"
                    style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}
                  >
                    <s.icon className="h-4 w-4 text-[#C9A84C]" />
                  </div>

                  <h3 className="mt-5 font-syne text-base font-semibold text-[#1A1A1A]">{s.title}</h3>
                  <p className="mt-3 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{s.description}</p>

                  <a
                    href={`/services/${SERVICE_HREFS[s.num]}`}
                    className="mt-auto pt-5 font-inter text-[11px] uppercase tracking-[0.12em] text-[#C9A84C] transition-opacity hover:opacity-70"
                    tabIndex={isActive ? 0 : -1}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => { prev(); resetAuto() }}
          disabled={active === 0}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center transition-all disabled:opacity-30"
          style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); resetAuto() }}
              aria-label={`Go to ${SERVICES[i].title}`}
              className="rounded-full transition-all duration-300"
              style={{
                width:  active === i ? 20 : 6,
                height: 6,
                background: active === i ? '#C9A84C' : 'rgba(201,168,76,0.3)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => { next(); resetAuto() }}
          disabled={active === total - 1}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center transition-all disabled:opacity-30"
          style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
