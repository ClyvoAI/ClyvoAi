'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const LOGO_FILTER = 'brightness(0) saturate(100%)'

const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = seed / 233280
  return {
    left: `${(i * 41) % 100}%`, bottom: `${(rand * 80).toFixed(2)}%`,
    size: 1 + (i % 3) * 0.3, duration: `${12 + (i % 6) * 2}s`,
    delay: `${(i % 9) * -1.5}s`, opacity: 0.04 + (i % 4) * 0.02,
  }
})

export function HeroContent() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY       = useTransform(scrollYProgress, [0, 0.7], [0, -60])
  const cardOpacity    = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const cardX          = useTransform(scrollYProgress, [0, 0.5], [0, 80])
  const logoOpacity    = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const logoY          = useTransform(scrollYProgress, [0, 0.5], [0, -30])

  return (
    <section ref={ref} className="relative w-full overflow-hidden" style={{ height: '100vh', background: '#F5F0E8' }}>
      {/* Subtle grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* Warm radial glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)',
      }} />

      {/* Edge vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(245,240,232,0.7) 100%)',
      }} />

      {/* Fine particles — desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
        {PARTICLES.map((p, i) => (
          <span key={i} className="absolute rounded-full" style={{
            left: p.left, bottom: p.bottom, width: p.size, height: p.size,
            background: '#C9A84C', opacity: p.opacity,
            animation: `particle-rise ${p.duration} ${p.delay} linear infinite`,
          }} />
        ))}
      </div>

      {/* Logo orb — desktop only */}
      <motion.div style={{ y: logoY, opacity: logoOpacity }}
        className="pointer-events-none absolute top-24 right-[8%] hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-36 w-36 items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '50%',
            boxShadow: '0 0 60px rgba(201,168,76,0.15)',
          }}
        >
          <Image src="/logo.png" alt="Clyvo AI" width={56} height={56}
            style={{ objectFit: 'contain', filter: LOGO_FILTER, opacity: 0.7 }} />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }}
        className="absolute bottom-0 left-0 w-full pb-20 pl-6 sm:pl-10 md:pl-16 lg:pl-24 will-change-transform"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mb-6 flex items-center gap-3"
        >
          <div style={{ width: 24, height: 1, background: '#C9A84C' }} />
          <span className="eyebrow">Custom AI Agency · B2B</span>
        </motion.div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(2.8rem, 9vw, 9.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
          <span className="block headline-luxury overflow-hidden">
            {['Custom', 'AI.'].map((w, i) => (
              <motion.span key={w} className="mr-[0.15em] inline-block last:mr-0"
                initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease: EASE }}
              >{w}</motion.span>
            ))}
          </span>
          <span className="block headline-luxury text-[#1A1A1A]/20 overflow-hidden"
            style={{ fontSize: '0.92em' }}>
            {['Real', 'Results.'].map((w, i) => (
              <motion.span key={w} className="mr-[0.15em] inline-block last:mr-0"
                initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.1, delay: 0.75 + i * 0.12, ease: EASE }}
              >{w}</motion.span>
            ))}
          </span>
        </h1>

        {/* Subtext */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          className="mt-8 max-w-md"
        >
          <p className="font-inter text-base font-light leading-[1.8] text-[#1A1A1A]/55">
            We build end-to-end AI systems for B2B businesses — from scratch, for your exact operations.
          </p>
          <p className="mt-3 hidden font-inter text-[11px] uppercase tracking-[0.2em] text-[#C9A84C]/70 sm:block">
            100% Custom &nbsp;·&nbsp; B2B Only &nbsp;·&nbsp; Setup + Retainer
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a href="#contact" className="btn-primary">
            Book a Free Discovery Call <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a href="#solutions" className="btn-ghost">
            See What We Build
          </a>
        </motion.div>
      </motion.div>

      {/* Floating AI card — desktop only */}
      <motion.div
        style={{ x: cardX, opacity: cardOpacity, position: 'absolute', right: '5rem', top: '50%', transform: 'translateY(-50%)' } as any}
        className="pointer-events-none hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'rgba(245,240,232,0.95)',
            border: '1px solid rgba(201,168,76,0.2)',
            boxShadow: '0 8px 40px rgba(26,26,26,0.08)',
            padding: '20px 24px', width: 260,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-syne text-[13px] font-semibold text-[#1A1A1A]">AI System Active</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="mt-4 space-y-2.5">
            {['Lead qualification', 'Data sync', 'Workflow trigger'].map((l, i) => (
              <div key={l} className="flex items-center gap-2">
                <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} />
                <span className="font-inter text-[11px] text-[#1A1A1A]/50">{l}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-10 items-end gap-1">
            {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
              <motion.div key={i} className="flex-1"
                style={{ background: 'rgba(201,168,76,0.4)' }}
                initial={{ height: '10%' }} animate={{ height: `${h}%` }}
                transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
            ))}
          </div>
          <div className="mt-4 border-t pt-3" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
            <span className="font-syne text-xl font-bold text-[#1A1A1A]">12</span>
            <span className="ml-1.5 font-inter text-[11px] text-[#1A1A1A]/40">processes automated</span>
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
