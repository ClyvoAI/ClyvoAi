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
    <main className="relative min-h-screen" style={{ background: '#000000' }}>
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        {/* Subtle top glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,229,255,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="font-inter text-xs font-medium uppercase tracking-widest text-white/60">
              {badge}
            </span>
          </div>

          <h1
            className="font-syne font-bold text-white"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              textShadow: '0 0 80px rgba(0,229,255,0.20)',
            }}
          >
            {title}
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl font-inter text-white/50"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.6 }}
          >
            {tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/book"
              className="rounded-full bg-white px-8 py-3.5 font-inter text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:scale-[1.03]"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }}
            >
              Book a Discovery Call
            </a>
            <a
              href="/apply"
              className="rounded-full border-2 border-white/20 px-8 py-3.5 font-inter text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/50 hover:text-white"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <p
          className="text-center font-inter text-white/50 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}
        >
          {description}
        </p>
      </section>

      {/* Use Cases */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 text-center">
            <span className="font-inter text-xs font-medium uppercase tracking-widest text-white/30">
              Use Cases
            </span>
          </div>
          <h2
            className="mb-14 text-center font-syne font-bold text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', fontFeatureSettings: "'ss01'" }}
          >
            What We Build For You
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="group rounded-xl p-6 transition-all duration-300"
                style={{
                  background: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                }}
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.50)' }}
                >
                  {uc.icon}
                </div>
                <h3 className="mb-2 font-syne text-sm font-semibold text-white">{uc.title}</h3>
                <p className="font-inter text-xs text-white/40 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Build It */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-3 text-center">
            <span className="font-inter text-xs font-medium uppercase tracking-widest text-white/30">
              Our Process
            </span>
          </div>
          <h2
            className="mb-14 text-center font-syne font-bold text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', fontFeatureSettings: "'ss01'" }}
          >
            How We Build It
          </h2>

          <div className="relative">
            {/* Connector line */}
            <div
              className="absolute left-[22px] top-8 hidden h-[calc(100%-4rem)] w-px md:block"
              style={{ background: 'rgba(0,229,255,0.20)' }}
            />

            <div className="flex flex-col gap-10">
              {steps.map((step, i) => (
                <div key={step.number} className="flex gap-6">
                  <div
                    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
                    style={{
                      background: i === 0 ? '#00E5FF' : '#0d0d0d',
                      border: `1px solid ${i === 0 ? '#00E5FF' : 'rgba(255,255,255,0.15)'}`,
                      color: i === 0 ? '#000' : 'rgba(255,255,255,0.70)',
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-2">
                    <h3 className="mb-1 font-syne text-base font-semibold text-white">{step.title}</h3>
                    <p className="font-inter text-sm text-white/40 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 text-center">
            <span className="font-inter text-xs font-medium uppercase tracking-widest text-white/30">
              Results
            </span>
          </div>
          <h2
            className="mb-14 text-center font-syne font-bold text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em', fontFeatureSettings: "'ss01'" }}
          >
            What You Can Expect
          </h2>

          <div className="grid grid-cols-2 gap-px md:grid-cols-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {outcomes.map((o) => (
              <div
                key={o.label}
                className="flex flex-col items-center justify-center gap-2 px-6 py-10"
                style={{ background: '#000000' }}
              >
                <span
                  className="font-syne font-bold"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#00E5FF', letterSpacing: '-0.04em' }}
                >
                  {o.metric}
                </span>
                <span className="text-center font-inter text-xs text-white/40">{o.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 pb-40 pt-8 text-center">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2
            className="mb-5 font-syne font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', fontFeatureSettings: "'ss01'" }}
          >
            Ready to get started?
          </h2>
          <p className="mb-10 font-inter text-white/40">
            Book a free 45-minute discovery call. We&apos;ll map out exactly how this can work for your business.
          </p>
          <a
            href="/book"
            className="inline-block rounded-full bg-white px-10 py-4 font-inter text-base font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:scale-[1.03]"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)' }}
          >
            Book a Discovery Call
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
