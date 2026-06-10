'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const E = [0.22, 1, 0.36, 1] as const

const LOGO_FILTER = [
  'invert(1)',
  'sepia(1)',
  'saturate(5)',
  'hue-rotate(155deg)',
  'drop-shadow(0 0 5px rgba(0,229,255,0.95))',
  'drop-shadow(0 0 14px rgba(0,229,255,0.60))',
  'drop-shadow(0 0 28px rgba(0,229,255,0.25))',
].join(' ')

// Deterministic white particles — fewer on mobile
const PARTICLES = Array.from({ length: 30 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = seed / 233280
  return {
    left:     `${(i * 41) % 100}%`,
    bottom:   `${(rand * 80).toFixed(2)}%`,
    size:     1 + (i % 3) * 0.4,
    duration: `${10 + (i % 7) * 1.8}s`,
    delay:    `${(i % 9) * -1.3}s`,
    opacity:  0.10 + (i % 4) * 0.05,
  }
})

const WORDS = [
  { text: 'Custom', line: 0 },
  { text: 'AI.',    line: 0 },
  { text: 'Real',     line: 1 },
  { text: 'Results.', line: 1 },
]

export function HeroContent() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const headlineScale   = useTransform(scrollYProgress, [0, 0.50], [1, 0.7])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.50], [1, 0])
  const subtextOpacity  = useTransform(scrollYProgress, [0, 0.50], [1, 0])
  const orbScale        = useTransform(scrollYProgress, [0, 0.50], [1, 2])
  const heroContentY    = useTransform(scrollYProgress, [0, 0.50], [0, -80])
  const logoY           = useTransform(scrollYProgress, [0, 0.50], [0, -40])
  const logoOpacity     = useTransform(scrollYProgress, [0, 0.50], [1, 0])
  const cardX           = useTransform(scrollYProgress, [0, 0.50], [0, 150])
  const cardOpacity     = useTransform(scrollYProgress, [0, 0.50], [1, 0])

  return (
    <div ref={ref} className="relative h-[250vh] bg-transparent">
    <div className="sticky top-0 h-screen overflow-hidden bg-transparent">
      {/* Ocean/graphite ambient gradients */}
      <motion.div
        style={{ scale: orbScale }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 65% 55%, rgba(20,20,20,0.9) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(180,180,180,0.04) 0%, transparent 50%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 40% 30% at 75% 30%, rgba(0,229,255,0.06) 0%, transparent 60%)' }}
        />
      </motion.div>

      {/* SVG noise */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* 60px grid */}
      <div className="hero-grid pointer-events-none absolute inset-0" />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #000000 100%)' }}
      />

      {/* White particles — hidden on mobile for performance */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: p.left, bottom: p.bottom,
              width: p.size, height: p.size,
              opacity: p.opacity,
              animation: `particle-rise ${p.duration} ${p.delay} linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Logo moon — glowing Clyvo logo, desktop only */}
      <motion.div
        style={{ y: logoY, opacity: logoOpacity }}
        className="pointer-events-none absolute top-20 right-[6%] hidden md:block md:right-[10%]"
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-32 w-32 items-center justify-center rounded-full border md:h-44 md:w-44"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0.05) 50%, transparent 70%)',
            borderColor: 'rgba(0,229,255,0.3)',
            boxShadow: '0 0 60px rgba(0,229,255,0.4), 0 0 120px rgba(0,229,255,0.2), 0 0 200px rgba(0,229,255,0.08)',
          }}
        >
          <Image
            src="/logo.png"
            alt="Clyvo AI"
            width={64}
            height={64}
            className="h-16 w-16 md:h-24 md:w-24"
            style={{
              objectFit:    'contain',
              filter:       LOGO_FILTER,
              mixBlendMode: 'screen',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Main content — bottom-left aligned */}
      <motion.div
        style={{ scale: headlineScale, opacity: headlineOpacity, y: heroContentY, transformOrigin: 'bottom left' }}
        className="absolute bottom-0 left-5 max-w-[92vw] pb-24 pt-24 will-change-transform sm:left-8 md:left-16 md:pb-32 md:pt-0"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: E }}
          className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 backdrop-blur-sm"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-inter text-xs font-medium text-white/50 tracking-[0.15em]">
            Custom AI Agency · B2B
          </span>
        </motion.div>

        {/* Headline — responsive from mobile to cinema */}
        <h1
          className="font-syne font-extrabold leading-[0.95] text-white"
          style={{
            fontSize: 'clamp(2.2rem, 8vw, 9rem)',
            letterSpacing: '-0.05em',
            textShadow: '0 0 80px rgba(0,229,255,0.30)',
          }}
        >
          <span className="block whitespace-normal font-playfair font-bold italic md:whitespace-nowrap">
            {WORDS.filter(w => w.line === 0).map((w, i) => (
              <motion.span
                key={w.text}
                className="mr-[0.18em] inline-block last:mr-0 overflow-hidden"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.09, ease: E }}
              >
                {w.text}
              </motion.span>
            ))}
          </span>
          <span className="block whitespace-normal md:whitespace-nowrap text-white/20">
            {WORDS.filter(w => w.line === 1).map((w, i) => (
              <motion.span
                key={w.text}
                className="mr-[0.18em] inline-block last:mr-0 overflow-hidden"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.9, delay: 0.65 + i * 0.09, ease: E }}
              >
                {w.text}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Descriptor */}
        <motion.div style={{ opacity: subtextOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: E }}
            className="mt-5 max-w-[420px] font-inter text-base font-light leading-[1.75] text-white/45 sm:text-lg"
          >
            We build end-to-end AI systems for B2B businesses — from scratch,
            for your exact operations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: E }}
            className="mt-5 hidden font-mono text-sm tracking-widest text-white/20 sm:block"
          >
            100% Custom &nbsp;·&nbsp; B2B Only &nbsp;·&nbsp; Setup + Retainer
          </motion.p>
        </motion.div>

        {/* CTAs — stacked on mobile, row on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: E }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <a
            href="#contact"
            className="btn-active group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-inter text-base font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-[1.03] sm:w-auto"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }}
          >
            Book a Free Discovery Call
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#solutions"
            className="btn-active flex w-full items-center justify-center rounded-full border-2 border-white/20 px-8 py-4 font-inter text-base font-medium text-white/70 transition-all duration-300 hover:border-white/50 hover:text-white hover:bg-white/5 sm:w-auto"
          >
            See What We Build
          </a>
        </motion.div>
      </motion.div>

      {/* Floating AI status card — desktop only */}
      <motion.div
        style={{ x: cardX, opacity: cardOpacity }}
        className="pointer-events-none absolute right-8 top-1/2 hidden w-72 -translate-y-1/2 md:right-16 md:block"
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-syne text-sm font-semibold text-white">AI System Active</span>
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          </div>

          <div className="mt-4 space-y-2.5">
            {['Lead qualification', 'Data sync', 'Workflow trigger'].map((label, i) => (
              <div key={label} className="flex items-center gap-2.5">
                <motion.span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                />
                <span className="font-inter text-xs font-light text-white/50">{label}</span>
              </div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div className="mt-4 flex h-12 items-end gap-1.5">
            {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: 'rgba(0,229,255,0.35)' }}
                initial={{ height: '10%' }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              />
            ))}
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-3">
            <span className="font-syne text-xl font-extrabold text-white">12</span>
            <span className="ml-1.5 font-inter text-xs font-light text-white/40">processes automated</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-10 right-10 hidden items-end gap-3 md:flex">
        <span
          className="font-mono text-[9px] tracking-[0.4em] text-white/20"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/25">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  )
}
