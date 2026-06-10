'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { EASE_CINEMATIC } from '@/lib/utils'
import { Bot, Workflow, Brain, Phone, Plug } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '@/lib/device'

const SERVICES = [
  {
    num: '01', icon: Bot,
    title: 'AI Chatbots & Assistants',
    description: 'Custom-trained agents for support, sales qualification, and onboarding — integrated into your existing platforms.',
  },
  {
    num: '02', icon: Workflow,
    title: 'Workflow & Process Automation',
    description: 'End-to-end automation of repetitive processes — lead routing, document handling, approvals, data entry elimination.',
  },
  {
    num: '03', icon: Brain,
    title: 'Custom AI Model Development',
    description: 'Bespoke ML and LLM models trained on your data — predictive analytics, classification, content generation.',
  },
  {
    num: '04', icon: Phone,
    title: 'AI Voice Agents',
    description: 'Intelligent voice systems for inbound and outbound calls — customer service, appointment booking, qualification.',
  },
  {
    num: '05', icon: Plug,
    title: 'System Integrations',
    description: 'AI connected into your existing stack — Salesforce, HubSpot, SAP, NetSuite, APIs, and databases.',
  },
]

export function TransformationScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const isMobile   = useIsMobile()

  useEffect(() => {
    // Check synchronously — skip GSAP pin entirely on mobile
    if (window.innerWidth < 768) return

    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 96)

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          invalidateOnRefresh: true,
        },
      })

      return () => { tween.scrollTrigger?.kill(); tween.kill() }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services-scene"
      className="relative overflow-hidden"
      style={{ height: isMobile ? 'auto' : '100vh' }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* Header */}
      <div className="relative px-5 pb-8 pt-16 md:px-16 md:pb-10 md:pt-20">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
          className="font-inter font-medium text-[11px] uppercase tracking-[0.18em] text-white/35"
        >
          What We Build
        </motion.span>

        <h2 className="mt-4 font-syne text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl md:text-5xl" style={{ fontFeatureSettings: "'ss01'" }}>
          {['Five', 'capabilities.', 'Infinite', 'applications.'].map((word, i) => (
            <motion.span
              key={word}
              className="mr-[0.22em] inline-block last:mr-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_CINEMATIC }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE_CINEMATIC }}
          className="mt-3 max-w-xl font-inter text-sm font-light text-white/45 md:text-base"
        >
          Every engagement is built from scratch around your business.
        </motion.p>
      </div>

      {/* Cards — vertical stack on mobile, horizontal scroll on desktop */}
      {isMobile ? (
        <div className="flex flex-col gap-4 px-5 pb-16">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} index={i} fullWidth />
          ))}
        </div>
      ) : (
        <div className="relative overflow-visible px-8 md:px-16">
          <div
            ref={trackRef}
            className="flex gap-5 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.num} s={s} index={i} />
            ))}
            <div className="w-16 shrink-0" />
          </div>
        </div>
      )}
    </section>
  )
}

function ServiceCard({
  s,
  index,
  fullWidth = false,
}: {
  s: typeof SERVICES[0]
  index: number
  fullWidth?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE_CINEMATIC }}
      className={`group flex shrink-0 flex-col rounded-xl border border-white/[0.10] bg-[#0d0d0d] p-7 transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-[3px] will-change-transform
        ${fullWidth ? 'w-full' : 'w-[360px]'}`}
      style={{ minHeight: fullWidth ? undefined : 320 }}
    >
      <span className="font-syne text-3xl font-bold tracking-tight text-white/15">
        {s.num}
      </span>

      <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.10]">
        <s.icon className="h-5 w-5 text-white/50" />
      </div>

      <h3 className="mt-5 font-syne text-lg font-semibold text-white md:text-xl">{s.title}</h3>
      <p className="mt-3 font-inter text-sm font-light leading-[1.75] text-white/45">
        {s.description}
      </p>

      <a
        href={`/services/${s.num === '01' ? 'ai-chatbots' : s.num === '02' ? 'workflow-automation' : s.num === '03' ? 'custom-ai-models' : s.num === '04' ? 'voice-agents' : 'system-integrations'}`}
        className="mt-auto pt-6 font-inter text-xs text-white/30 underline-offset-2 transition-colors hover:text-[#00E5FF]"
      >
        Learn more →
      </a>
    </motion.div>
  )
}
