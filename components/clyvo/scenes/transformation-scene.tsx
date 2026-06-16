'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Bot, Workflow, Brain, Phone, Plug } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '@/lib/device'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' } as const

const GLASS = {
  background: 'rgba(255,255,255,0.45)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(201,168,76,0.18)',
  boxShadow: '0 8px 32px rgba(26,26,26,0.06)',
}

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
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const isMobile   = useIsMobile()

  useEffect(() => {
    if (window.innerWidth < 768) return
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current, track = trackRef.current
    if (!section || !track) return
    const ctx = gsap.context(() => {
      const getAmt = () => -(track.scrollWidth - window.innerWidth + 96)
      gsap.to(track, {
        x: getAmt, ease: 'none',
        scrollTrigger: { trigger: section, pin: true, scrub: 1, start: 'top top', end: () => `+=${Math.abs(getAmt())}`, invalidateOnRefresh: true },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden"
      style={{ height: isMobile ? 'auto' : 'auto', paddingBottom: '5rem', background: '#EDE6D6' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />

      <div className="relative px-6 pb-10 pt-20 md:px-16 md:pt-24">
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
        <div className="flex flex-col gap-4 px-6 pb-16">
          {SERVICES.map((s, i) => <ServiceCard key={s.num} s={s} index={i} fullWidth />)}
        </div>
      ) : (
        <div className="overflow-visible px-10 md:px-16">
          <div ref={trackRef} className="flex gap-6 will-change-transform" style={{ width: 'max-content' }}>
            {SERVICES.map((s, i) => <ServiceCard key={s.num} s={s} index={i} />)}
            <div className="w-16 shrink-0" />
          </div>
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
      className={`flex shrink-0 flex-col p-8 transition-all duration-300 ${fullWidth ? 'w-full' : 'w-[340px]'}`}
      style={{ ...GLASS, minHeight: fullWidth ? undefined : 320 }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 20px 48px rgba(26,26,26,0.12)'
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,26,26,0.06)'
        e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'
      }}
    >
      <span className="font-syne text-2xl font-bold text-[#C9A84C]/40">{s.num}</span>
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
