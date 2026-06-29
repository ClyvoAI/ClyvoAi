'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Bot, Workflow, Brain, Phone, Plug, ChevronLeft, ChevronRight } from 'lucide-react'
import { BookingButton } from '@/components/clyvo/booking-modal'

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

export function TransformationScene() {
  const [active, setActive] = useState(2) // start on middle card
  const total = SERVICES.length

  const prev = useCallback(() => setActive(a => (a - 1 + total) % total), [total])
  const next = useCallback(() => setActive(a => (a + 1) % total), [total])

  // Auto-advance every 3.5s
  useEffect(() => {
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [next])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  return (
    <section id="services" className="relative section-has-glass pb-12 md:pb-20"
      style={{ background: '#EDE6D6' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />

      <div className="relative px-5 pb-8 pt-16 md:px-16 md:pb-10 md:pt-24">
        <div className="section-divider" />
        <span className="eyebrow">What We Build</span>
        <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
          Five capabilities. Infinite applications.
        </h2>
        <p className="mt-4 max-w-lg font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
          Every engagement is built from scratch around your business.
        </p>
      </div>

      {/* Desktop dial carousel — no scrollbar, arrow navigation */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-center gap-5 px-16 pb-10"
          style={{ perspective: '1200px' }}>

          {SERVICES.map((s, i) => {
            const offset = i - active
            const isActive = offset === 0
            const isAdjacent = Math.abs(offset) === 1
            const isHidden = Math.abs(offset) > 2

            if (isHidden) return null

            const scale   = isActive ? 1 : isAdjacent ? 0.88 : 0.76
            const opacity = isActive ? 1 : isAdjacent ? 0.65 : 0.35
            const zIndex  = isActive ? 10 : isAdjacent ? 5 : 1
            const translateX = offset * 340
            const rotateY = offset * -8

            return (
              <motion.div
                key={s.num}
                onClick={() => !isActive && setActive(i)}
                animate={{ scale, opacity, x: translateX, rotateY, zIndex }}
                transition={{ duration: 0.55, ease: EASE }}
                style={{
                  position: 'absolute',
                  width: 320,
                  cursor: isActive ? 'default' : 'pointer',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div style={{
                  background: isActive
                    ? 'rgba(255,248,230,0.98)'
                    : 'rgba(245,240,232,0.75)',
                  border: isActive
                    ? '1.5px solid rgba(201,168,76,0.55)'
                    : '1px solid rgba(201,168,76,0.18)',
                  boxShadow: isActive
                    ? '0 0 40px rgba(201,168,76,0.20), 0 16px 48px rgba(26,26,26,0.10)'
                    : '0 4px 20px rgba(26,26,26,0.06)',
                  padding: '32px',
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease',
                }}>
                  {/* Warm golden glow overlay on active card */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }} />
                  )}

                  <span className="font-syne text-2xl font-bold" style={{ color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.45)' }}>
                    {s.num}
                  </span>
                  <div className="mt-5 flex h-10 w-10 items-center justify-center"
                    style={{
                      border: `1px solid ${isActive ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)'}`,
                      background: isActive ? 'rgba(201,168,76,0.10)' : 'rgba(201,168,76,0.04)',
                    }}>
                    <s.icon className="h-4 w-4" style={{ color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.5)' }} />
                  </div>
                  <h3 className="mt-5 font-syne text-base font-semibold" style={{ color: isActive ? '#1A1A1A' : '#4A4A4A' }}>
                    {s.title}
                  </h3>
                  <p className="mt-3 font-inter text-sm font-light leading-[1.8]" style={{ color: isActive ? '#4A4A4A' : '#8A8A8A' }}>
                    {s.description}
                  </p>
                  <a href={`/services/${SERVICE_HREFS[s.num]}`}
                    className="mt-auto pt-6 font-inter text-[11px] uppercase tracking-[0.12em] transition-opacity hover:opacity-70"
                    style={{ color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.45)' }}>
                    Learn more →
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Dot indicators + arrow controls */}
        <div className="flex items-center justify-center gap-6 pb-6">
          <button onClick={prev} className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:text-[#C9A84C]"
            style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {SERVICES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="rounded-full transition-all"
                style={{
                  width: i === active ? 24 : 6,
                  height: 6,
                  background: i === active ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                }} />
            ))}
          </div>

          <button onClick={next} className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:text-[#C9A84C]"
            style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col gap-3 px-5 pb-8 md:hidden">
        {SERVICES.map((s, i) => (
          <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={VP} transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            className="glass-card flex flex-col p-6">
            <span className="font-syne text-2xl font-bold text-[#C9A84C]/80">{s.num}</span>
            <div className="mt-5 flex h-10 w-10 items-center justify-center"
              style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}>
              <s.icon className="h-4 w-4 text-[#C9A84C]" />
            </div>
            <h3 className="mt-5 font-syne text-base font-semibold text-[#1A1A1A]">{s.title}</h3>
            <p className="mt-3 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{s.description}</p>
            <a href={`/services/${SERVICE_HREFS[s.num]}`}
              className="mt-auto pt-6 font-inter text-[11px] uppercase tracking-[0.12em] text-[#C9A84C] hover:opacity-70">
              Learn more →
            </a>
          </motion.div>
        ))}
      </div>

      <div className="px-5 pb-4 text-center md:px-16">
        <BookingButton className="btn-primary">
          Build Your Custom AI System <span className="ml-1">→</span>
        </BookingButton>
      </div>
    </section>
  )
}
