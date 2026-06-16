'use client'

import type { ReactNode } from 'react'
import { Navigation } from './navigation'
import { Footer } from './footer'

export interface UseCase {
  icon: ReactNode
  title: string
  description: string
}

export interface BuildStep {
  number: string
  title: string
  description: string
}

export interface Outcome {
  metric: string
  label: string
}

export interface ServicePageShellProps {
  badge: string
  title: string
  tagline: string
  description: string
  useCases: UseCase[]
  steps: BuildStep[]
  outcomes: Outcome[]
}

const GLASS = {
  background: 'rgba(255,255,255,0.45)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(201,168,76,0.18)',
  boxShadow: '0 8px 32px rgba(26,26,26,0.06)',
} as const

export function ServicePageShell({
  badge,
  title,
  tagline,
  description,
  useCases,
  steps,
  outcomes,
}: ServicePageShellProps) {
  return (
    <main className="relative min-h-screen" style={{ background: '#F5F0E8' }}>
      <Navigation />

      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '-10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }} />
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 pb-20 text-center" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{
            ...GLASS,
            border: '1px solid rgba(201,168,76,0.25)',
          }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
            <span className="font-inter text-xs font-medium uppercase tracking-widest" style={{ color: '#C9A84C' }}>
              {badge}
            </span>
          </div>

          {/* Gold rule */}
          <div className="mx-auto mb-6 w-8 h-px" style={{ background: '#C9A84C' }} />

          <h1
            className="font-playfair font-bold italic"
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: '#1A1A1A',
            }}
          >
            {title}
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl font-inter"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, color: '#4A4A4A' }}
          >
            {tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="font-inter text-sm font-medium uppercase tracking-widest transition-all duration-200"
              style={{
                background: '#1A1A1A',
                color: '#F5F0E8',
                padding: '14px 32px',
                borderRadius: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#C9A84C')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
            >
              Book a Discovery Call
            </a>
            <a
              href="/apply"
              className="font-inter text-sm font-medium uppercase tracking-widest transition-all duration-200"
              style={{
                background: 'transparent',
                color: '#1A1A1A',
                padding: '14px 32px',
                border: '1px solid #1A1A1A',
                borderRadius: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1A1A1A'
                e.currentTarget.style.color = '#F5F0E8'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#1A1A1A'
              }}
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="mx-auto max-w-6xl px-6" style={{ zIndex: 1, position: 'relative' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4 }} />
      </div>

      {/* Description */}
      <section className="relative mx-auto max-w-3xl px-6 py-20" style={{ zIndex: 1 }}>
        <p
          className="text-center font-inter leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', color: '#4A4A4A' }}
        >
          {description}
        </p>
      </section>

      {/* Use Cases */}
      <section className="relative px-6 pb-28" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-center">
            <span className="eyebrow">Use Cases</span>
          </div>
          <div className="mx-auto mb-4 w-8 h-px" style={{ background: '#C9A84C' }} />
          <h2
            className="mb-14 text-center font-playfair font-bold italic"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#1A1A1A', letterSpacing: '-0.02em' }}
          >
            What We Build For You
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-sm p-6 transition-all duration-300"
                style={{ ...GLASS }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(26,26,26,0.10)'
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,26,26,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)'
                }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center"
                  style={{
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: '#C9A84C',
                    background: 'rgba(201,168,76,0.06)',
                  }}
                >
                  {uc.icon}
                </div>
                <h3 className="mb-2 font-syne text-sm font-semibold" style={{ color: '#1A1A1A' }}>{uc.title}</h3>
                <p className="font-inter text-xs leading-relaxed" style={{ color: '#8A8A8A' }}>{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="mx-auto max-w-6xl px-6" style={{ zIndex: 1, position: 'relative' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.3 }} />
      </div>

      {/* How We Build It */}
      <section className="relative px-6 py-28" style={{ background: '#EDE6D6', zIndex: 1 }}>
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 text-center">
            <span className="eyebrow">Our Process</span>
          </div>
          <div className="mx-auto mb-4 w-8 h-px" style={{ background: '#C9A84C' }} />
          <h2
            className="mb-14 text-center font-playfair font-bold italic"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#1A1A1A', letterSpacing: '-0.02em' }}
          >
            How We Build It
          </h2>

          <div className="relative">
            {/* Connector line */}
            <div
              className="absolute left-[22px] top-8 hidden h-[calc(100%-4rem)] w-px md:block"
              style={{ background: 'rgba(201,168,76,0.3)' }}
            />

            <div className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="flex gap-6 rounded-sm p-5 transition-all duration-300"
                  style={{ ...GLASS }}
                >
                  <div
                    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center font-mono text-xs font-bold"
                    style={{
                      background: i === 0 ? '#C9A84C' : 'rgba(201,168,76,0.1)',
                      border: `1px solid ${i === 0 ? '#C9A84C' : 'rgba(201,168,76,0.3)'}`,
                      color: i === 0 ? '#F5F0E8' : '#C9A84C',
                      borderRadius: 0,
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-2">
                    <h3 className="mb-1 font-syne text-base font-semibold" style={{ color: '#1A1A1A' }}>{step.title}</h3>
                    <p className="font-inter text-sm leading-relaxed" style={{ color: '#8A8A8A' }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="relative px-6 py-28" style={{ zIndex: 1 }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 text-center">
            <span className="eyebrow">Results</span>
          </div>
          <div className="mx-auto mb-4 w-8 h-px" style={{ background: '#C9A84C' }} />
          <h2
            className="mb-14 text-center font-playfair font-bold italic"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#1A1A1A', letterSpacing: '-0.02em' }}
          >
            What You Can Expect
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {outcomes.map((o) => (
              <div
                key={o.label}
                className="flex flex-col items-center justify-center gap-2 px-6 py-10 rounded-sm transition-all duration-300"
                style={{ ...GLASS }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(26,26,26,0.10)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,26,26,0.06)'
                }}
              >
                <span
                  className="font-playfair font-bold"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#C9A84C', letterSpacing: '-0.04em' }}
                >
                  {o.metric}
                </span>
                <span className="text-center font-inter text-xs uppercase tracking-widest" style={{ color: '#8A8A8A' }}>{o.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 pb-32 pt-8 text-center" style={{ background: '#EDE6D6', zIndex: 1 }}>
        {/* Gold top rule */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4, marginBottom: '4rem' }} />
        <div className="mx-auto max-w-2xl">
          <span className="eyebrow">Get Started</span>
          <div className="mx-auto mt-3 mb-6 w-8 h-px" style={{ background: '#C9A84C' }} />
          <h2
            className="mb-5 font-playfair font-bold italic"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A', letterSpacing: '-0.02em' }}
          >
            Ready to get started?
          </h2>
          <p className="mb-10 font-inter" style={{ color: '#4A4A4A', lineHeight: 1.7 }}>
            Book a free 45-minute discovery call. We&apos;ll map out exactly how this can work for your business.
          </p>
          <a
            href="#contact"
            className="inline-block font-inter text-sm font-medium uppercase tracking-widest transition-all duration-200"
            style={{
              background: '#1A1A1A',
              color: '#F5F0E8',
              padding: '16px 40px',
              borderRadius: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#C9A84C')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
          >
            Book a Discovery Call →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
