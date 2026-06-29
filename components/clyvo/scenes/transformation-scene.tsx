'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bot, Workflow, Brain, Phone, Plug, ChevronLeft, ChevronRight } from 'lucide-react'

const SERVICES = [
  { num: '01', icon: Bot,      title: 'AI Chatbots & Assistants',     description: 'Custom-trained agents for support, sales qualification, and onboarding — integrated into your existing platforms.' },
  { num: '02', icon: Workflow, title: 'Workflow & Process Automation', description: 'End-to-end automation of repetitive processes — lead routing, document handling, approvals, data entry elimination.' },
  { num: '03', icon: Brain,    title: 'Custom AI Model Development',   description: 'Bespoke ML and LLM models trained on your data — predictive analytics, classification, content generation.' },
  { num: '04', icon: Phone,    title: 'AI Voice Agents',               description: 'Intelligent voice systems for inbound and outbound calls — customer service, appointment booking, qualification.' },
  { num: '05', icon: Plug,     title: 'System Integrations',           description: 'AI connected into your existing stack — Salesforce, HubSpot, SAP, NetSuite, APIs, and databases.' },
]

const SERVICE_HREFS: Record<string, string> = {
  '01': '/solutions/ai-chatbots',
  '02': '/solutions/workflow-automation',
  '03': '/solutions/custom-ai-models',
  '04': '/solutions/voice-agents',
  '05': '/solutions/system-integrations',
}

export function TransformationScene() {
  const [active, setActive] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const total = SERVICES.length

  const prev = useCallback(() => { setActive(a => (a - 1 + total) % total); setAutoPlay(false) }, [total])
  const next = useCallback(() => { setActive(a => (a + 1) % total); setAutoPlay(false) }, [total])

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => setActive(a => (a + 1) % total), 4000)
    return () => clearInterval(id)
  }, [autoPlay, total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // 3 visible slots: left-peek, active, right-peek
  const slots = [
    (active - 1 + total) % total,
    active,
    (active + 1) % total,
  ]

  return (
    <section
      id="services"
      className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24"
      style={{ background: '#EDE6D6' }}
    >
      {/* Section header */}
      <div className="px-5 pb-12 md:px-16">
        <div className="mb-4 h-px w-10" style={{ background: '#C9A84C' }} />
        <span
          className="mb-6 block font-inter text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: '#C9A84C' }}
        >
          What We Build
        </span>
        <h2
          className="font-playfair text-4xl italic md:text-5xl"
          style={{ color: '#1A1A1A' }}
        >
          Five capabilities. Infinite applications.
        </h2>
        <p
          className="mt-4 max-w-md font-inter text-sm font-light leading-[1.8]"
          style={{ color: '#4A4A4A' }}
        >
          Every engagement is built from scratch around your business.
        </p>
      </div>

      {/* Cards — overflow visible so peek cards show at edges */}
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          gap: '20px',
          padding: '0 40px',
          overflowX: 'visible',
        }}
      >
        {slots.map((cardIdx, slotPos) => {
          const s = SERVICES[cardIdx]
          const isActive = slotPos === 1
          const Icon = s.icon

          return (
            <div
              key={cardIdx}
              onClick={() => { if (!isActive) { setActive(cardIdx); setAutoPlay(false) } }}
              style={{
                flex: isActive ? '0 0 320px' : '0 0 260px',
                minHeight: '380px',
                background: '#FAF7F0',
                border: isActive
                  ? '1px solid rgba(201,168,76,0.6)'
                  : '1px solid rgba(201,168,76,0.2)',
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: isActive ? 'default' : 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                opacity: isActive ? 1 : 0.7,
                transform: isActive ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                // Active card: gold glow. Inactive: flat.
                boxShadow: isActive
                  ? '0 0 0 1.5px rgba(201,168,76,0.5), 0 0 24px rgba(201,168,76,0.35), 0 0 60px rgba(201,168,76,0.2), 0 16px 48px rgba(201,168,76,0.15)'
                  : 'none',
                position: 'relative',
              }}
            >
              {/* Number */}
              <span
                className="font-inter text-sm font-medium"
                style={{ color: '#C9A84C', letterSpacing: '0.05em' }}
              >
                {s.num}
              </span>

              {/* Icon box */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  border: '1px solid rgba(201,168,76,0.5)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C9A84C',
                  background: 'rgba(201,168,76,0.05)',
                }}
              >
                <Icon size={20} />
              </div>

              {/* Title */}
              <p
                className="font-inter text-base leading-snug"
                style={{
                  color: '#1A1A1A',
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {s.title}
              </p>

              {/* Description */}
              <p
                className="font-inter text-sm font-light leading-[1.75]"
                style={{ color: '#4A4A4A', flex: 1 }}
              >
                {s.description}
              </p>

              {/* Learn more */}
              <a
                href={SERVICE_HREFS[s.num]}
                className="font-inter text-xs font-medium uppercase tracking-[0.15em]"
                style={{ color: '#C9A84C', textDecoration: 'none', marginTop: 'auto' }}
                onClick={e => e.stopPropagation()}
              >
                Learn More →
              </a>
            </div>
          )
        })}
      </div>

      {/* Nav */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            width: 40,
            height: 40,
            border: '1px solid rgba(201,168,76,0.35)',
            background: 'transparent',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#C9A84C',
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setAutoPlay(false) }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                height: 4,
                width: i === active ? 28 : 16,
                borderRadius: 2,
                background: i === active ? '#C9A84C' : 'rgba(201,168,76,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next"
          style={{
            width: 40,
            height: 40,
            border: '1px solid rgba(201,168,76,0.35)',
            background: 'transparent',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#C9A84C',
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  )
}
