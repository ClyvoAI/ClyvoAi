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
  const total = SERVICES.length

  const prev = useCallback(() => setActive(a => (a - 1 + total) % total), [total])
  const next = useCallback(() => setActive(a => (a + 1) % total), [total])

  // Auto-advance every 4s — resets on manual interaction
  useEffect(() => {
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [next])

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Compute which 3 cards to show: [prev, active, next]
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

      {/* Card track */}
      <div className="flex items-stretch justify-center gap-4 px-5 md:gap-6 md:px-16">
        {slots.map((cardIdx, slotPos) => {
          const s = SERVICES[cardIdx]
          const isActive = slotPos === 1
          const Icon = s.icon

          return (
            <div
              key={cardIdx}
              onClick={() => !isActive && setActive(cardIdx)}
              style={{
                flex: isActive ? '0 0 340px' : '0 0 260px',
                minHeight: isActive ? '420px' : '380px',
                background: isActive ? '#FAF7F0' : 'rgba(26,26,26,0.82)',
                border: isActive
                  ? '1.5px solid #C9A84C'
                  : '1px solid rgba(201,168,76,0.15)',
                borderRadius: '12px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: isActive ? 'default' : 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                opacity: isActive ? 1 : 0.72,
                transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
                position: 'relative',
                overflow: 'hidden',
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
                  border: '1px solid #C9A84C',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C9A84C',
                }}
              >
                <Icon size={20} />
              </div>

              {/* Title */}
              <p
                className="font-inter text-base font-semibold leading-snug"
                style={{ color: isActive ? '#1A1A1A' : '#F5F0E8' }}
              >
                {s.title}
              </p>

              {/* Description */}
              <p
                className="font-inter text-sm font-light leading-[1.75]"
                style={{ color: isActive ? '#4A4A4A' : 'rgba(245,240,232,0.65)', flex: 1 }}
              >
                {s.description}
              </p>

              {/* CTA row */}
              <div style={{ marginTop: 'auto' }}>
                {isActive && (
                  <div
                    style={{
                      background: '#1A1A1A',
                      padding: '0.85rem 1.25rem',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                    onClick={() => window.location.href = '/book'}
                  >
                    <span
                      className="font-inter text-xs font-medium uppercase tracking-[0.15em]"
                      style={{ color: '#F5F0E8' }}
                    >
                      Build Your Custom AI System
                    </span>
                    <span style={{ color: '#C9A84C' }}>→</span>
                  </div>
                )}

                <a
                  href={SERVICE_HREFS[s.num]}
                  className="font-inter text-xs font-medium uppercase tracking-[0.15em]"
                  style={{ color: '#C9A84C', textDecoration: 'none' }}
                  onClick={e => e.stopPropagation()}
                >
                  Learn More →
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Nav row */}
      <div
        className="mt-10 flex items-center justify-center gap-4"
      >
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

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
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
