'use client'
import { CalendlyButton } from '@/components/clyvo/calendly-button'

import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { Bot, Workflow, Brain, Phone, Plug } from 'lucide-react'
import { useIsMobile } from '@/lib/device'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' } as const

const SERVICES = [
  { num: '01', icon: Bot,      title: 'AI Chatbots & Assistants',        description: 'Custom-trained agents for support, sales qualification, and onboarding — integrated into your existing platforms.' },
  { num: '02', icon: Workflow, title: 'Workflow & Process Automation',   description: 'End-to-end automation of repetitive processes — lead routing, document handling, approvals, data entry elimination.' },
  { num: '03', icon: Brain,    title: 'Custom AI Model Development',     description: 'Bespoke ML and LLM models trained on your data — predictive analytics, classification, content generation.' },
  { num: '04', icon: Phone,    title: 'AI Voice Agents',                 description: 'Intelligent voice systems for inbound and outbound calls — customer service, appointment booking, qualification.' },
  { num: '05', icon: Plug,     title: 'System Integrations',             description: 'AI connected into your existing stack — Salesforce, HubSpot, SAP, NetSuite, APIs, and databases.' },
]

const SERVICE_HREFS: Record<string, string> = {
  '01': 'ai-chatbots', '02': 'workflow-automation', '03': 'custom-ai-models',
  '04': 'voice-agents', '05': 'system-integrations',
}

export function TransformationScene() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Convert vertical mousewheel → horizontal scroll when cursor is on the track
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return
    const track = trackRef.current
    if (!track) return

    const onWheel = (e: WheelEvent) => {
      // Only hijack if there's room to scroll horizontally
      const maxScroll = track.scrollWidth - track.clientWidth
      const atStart = track.scrollLeft <= 0 && e.deltaY < 0
      const atEnd = track.scrollLeft >= maxScroll - 1 && e.deltaY > 0

      // If at either edge, let normal page scroll happen
      if (atStart || atEnd) return

      e.preventDefault()
      track.scrollLeft += e.deltaY
    }

    track.addEventListener('wheel', onWheel, { passive: false })
    return () => track.removeEventListener('wheel', onWheel)
  }, [isMobile])

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

      {isMobile ? (
        <div className="flex flex-col gap-3 px-5 pb-8">
          {SERVICES.map((s, i) => <ServiceCard key={s.num} s={s} index={i} fullWidth />)}
        </div>
      ) : (
        <div
          ref={trackRef}
          className="flex gap-6 px-10 pb-6 md:px-16"
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            /* Hide scrollbar but keep functionality */
            scrollbarWidth: 'none',         /* Firefox */
            msOverflowStyle: 'none',        /* IE/Edge */
          }}
        >
          <style>{`
            #services div[class*="flex gap-6"]::-webkit-scrollbar { display: none; }
          `}</style>
          {SERVICES.map((s, i) => <ServiceCard key={s.num} s={s} index={i} />)}
          <div className="w-4 shrink-0" />
        </div>
      )}
    </section>
  )
}

function ServiceCard({ s, index, fullWidth = false }: { s: typeof SERVICES[0]; index: number; fullWidth?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={VP} transition={{ duration: 0.7, delay: index * 0.07, ease: EASE }}
      className={`glass-card flex shrink-0 flex-col p-6 md:p-8 ${fullWidth ? 'w-full' : 'w-[340px]'}`}
      style={{ minHeight: fullWidth ? undefined : 320 }}
    >
      <span className="font-syne text-2xl font-bold text-[#C9A84C]/80">{s.num}</span>
      <div className="mt-5 flex h-10 w-10 items-center justify-center"
        style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)' }}>
        <s.icon className="h-4 w-4 text-[#C9A84C]" />
      </div>
      <h3 className="mt-5 font-syne text-base font-semibold text-[#1A1A1A]">{s.title}</h3>
      <p className="mt-3 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{s.description}</p>
      <a href={`/services/${SERVICE_HREFS[s.num]}`}
        className="mt-auto pt-6 font-inter text-[11px] uppercase tracking-[0.12em] text-[#C9A84C] transition-opacity hover:opacity-70">
        Learn more →
      </a>
    </motion.div>
  )
}
