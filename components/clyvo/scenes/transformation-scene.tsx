'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'motion/react'
import { Bot, Workflow, Brain, Phone, Plug, ChevronLeft, ChevronRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' } as const

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

// Per-offset transform config:  offset = cardIndex - activeIndex
// offset 0  = front/active card
// offset ±1 = immediate neighbours
// offset ±2 = outer neighbours
// |offset| >= 3 = hidden
const SLOT: Record<number, {
  rotateY: number
  translateZ: number
  translateX: number
  scale: number
  opacity: number
  zIndex: number
}> = {
   0: { rotateY:   0, translateZ: 160, translateX:   0, scale: 1.00, opacity: 1.00, zIndex: 5 },
   1: { rotateY: -32, translateZ:  40, translateX:  60, scale: 0.82, opacity: 0.70, zIndex: 4 },
  '-1':{ rotateY:  32, translateZ:  40, translateX: -60, scale: 0.82, opacity: 0.70, zIndex: 4 },
   2: { rotateY: -54, translateZ: -80, translateX: 110, scale: 0.64, opacity: 0.35, zIndex: 3 },
  '-2':{ rotateY:  54, translateZ: -80, translateX:-110, scale: 0.64, opacity: 0.35, zIndex: 3 },
}

function getSlot(offset: number) {
  const clamped = Math.max(-2, Math.min(2, offset))
  return SLOT[clamped] ?? SLOT[2]
}

export function TransformationScene() {
  const [active, setActive] = useState(0)
  const total = SERVICES.length
  const dragStartX = useRef<number | null>(null)
  const autoRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  const prev = useCallback(() => setActive(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setActive(i => (i + 1) % total), [total])

  // Auto-advance every 4 s, pauses on interaction
  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(next, 4000)
  }, [next])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { prev(); resetAuto() }
      if (e.key === 'ArrowRight') { next(); resetAuto() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, resetAuto])

  // Touch/drag swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev()
      resetAuto()
    }
    dragStartX.current = null
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden pb-16 pt-0"
      style={{ background: '#EDE6D6' }}
    >
      <div className="gold-rule absolute inset-x-0 top-0" />

      {/* Section header */}
      <div className="relative px-5 pb-10 pt-16 md:px-16 md:pt-24">
        <div className="section-divider" />
        <span className="eyebrow">What We Build</span>
        <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
          Five capabilities. Infinite applications.
        </h2>
        <p className="mt-4 max-w-lg font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
          Every engagement is built from scratch around your business.
        </p>
      </div>

      {/* 3-D carousel stage */}
      <div
        className="relative mx-auto select-none"
        style={{ height: 380, maxWidth: 900 }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Perspective container — do NOT add overflow:hidden here or the side cards clip */}
        <div
          className="relative h-full w-full"
          style={{ perspective: '1100px', perspectiveOrigin: '50% 45%' }}
        >
          {SERVICES.map((s, i) => {
            const offset   = i - active
            // Wrap-around: pick the shortest path around the ring
            const wrapped  = ((offset + total + Math.floor(total / 2)) % total) - Math.floor(total / 2)
            const slot     = getSlot(wrapped)
            const isActive = wrapped === 0

            return (
              <div
                key={s.num}
                onClick={() => { if (!isActive) { setActive(i); resetAuto() } }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 300,
                  marginLeft: -150,
                  marginTop: -160,
                  cursor: isActive ? 'default' : 'pointer',
                  transform: `
                    translateX(${slot.translateX}px)
                    translateZ(${slot.translateZ}px)
                    rotateY(${slot.rotateY}deg)
                    scale(${slot.scale})
                  `,
                  opacity: slot.opacity,
                  zIndex: slot.zIndex,
                  transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  // Only allow pointer events on active or immediate neighbours
                  pointerEvents: Math.abs(wrapped) <= 1 ? 'auto' : 'none',
                }}
              >
                {/* Card surface */}
                <div
                  className="glass-card h-full p-7 flex flex-col"
                  style={{
                    height: 320,
                    // Active card gets brighter edges
                    borderTopColor: isActive ? 'rgba(255,255,255,0.95)' : undefined,
                    boxShadow: isActive
                      ? '0 40px 80px -20px rgba(26,26,26,0.22), 0 20px 40px -10px rgba(26,26,26,0.14), inset 0 2px 0 rgba(255,255,255,0.85), inset 2px 0 0 rgba(255,255,255,0.55)'
                      : undefined,
                    animation: 'none', // kill the base glass-float; carousel handles motion
                  }}
                >
                  <span className="font-syne text-2xl font-bold text-[#C9A84C]/80">{s.num}</span>

                  <div
                    className="mt-4 flex h-10 w-10 items-center justify-center"
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
          aria-label="Previous service"
          className="flex h-10 w-10 items-center justify-center transition-all"
          style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); resetAuto() }}
              aria-label={`Go to service ${i + 1}`}
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
          aria-label="Next service"
          className="flex h-10 w-10 items-center justify-center transition-all"
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
