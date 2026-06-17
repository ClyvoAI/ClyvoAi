'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown, MessageSquare, GitBranch, Cpu, Phone, Link2 } from 'lucide-react'

const LOGO_FILTER = 'brightness(0) saturate(100%)'

function LogoBadge({ size = 28 }: { size?: number }) {
  return (
    <Image src="/logo.png" alt="Clyvo AI" width={size} height={size}
      style={{ objectFit: 'contain', flexShrink: 0, filter: LOGO_FILTER }} />
  )
}

const SERVICES = [
  { href: '/services/ai-chatbots',          icon: <MessageSquare className="h-4 w-4" />, name: 'AI Chatbots & Assistants',    desc: 'Conversations that convert 24/7' },
  { href: '/services/workflow-automation',  icon: <GitBranch className="h-4 w-4" />,     name: 'Workflow Automation',          desc: 'Eliminate repetitive manual work' },
  { href: '/services/custom-ai-models',     icon: <Cpu className="h-4 w-4" />,           name: 'Custom AI Models',             desc: 'AI trained on your own data' },
  { href: '/services/voice-agents',         icon: <Phone className="h-4 w-4" />,         name: 'AI Voice Agents',              desc: 'Intelligent inbound/outbound calls' },
  { href: '/services/system-integrations',  icon: <Link2 className="h-4 w-4" />,         name: 'System Integrations',          desc: 'Connect AI to your existing stack' },
]

const NAV_LINKS = [
  { href: '#work',        label: 'Work' },
  { href: '#how-it-works',label: 'How It Works' },
  { href: '#pricing',     label: 'Pricing' },
  { href: '#about',       label: 'About' },
]

export function Navigation() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen]     = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(245,240,232,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Left spacer — mobile balance only */}
          <div className="h-10 w-10 md:hidden" />

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <LogoBadge size={26} />
            <span className="font-syne text-sm font-semibold tracking-[0.08em] text-[#1A1A1A] uppercase">
              Clyvo <span style={{ color: '#C9A84C' }}>AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* Solutions dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-1 px-4 py-2 font-inter text-[12px] font-medium uppercase tracking-[0.10em] text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A]"
              >
                Solutions <ChevronDown className={`h-3 w-3 transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2"
                    style={{
                      background: 'rgba(245,240,232,0.98)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      boxShadow: '0 20px 60px rgba(26,26,26,0.12)',
                    }}
                  >
                    {SERVICES.map((s) => (
                      <a key={s.href} href={s.href}
                        className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-[rgba(201,168,76,0.06)]"
                        onClick={() => setDropOpen(false)}
                      >
                        <span className="mt-0.5 text-[#C9A84C]/70">{s.icon}</span>
                        <div>
                          <p className="font-inter text-[12px] font-medium text-[#1A1A1A]">{s.name}</p>
                          <p className="font-inter text-[11px] text-[#1A1A1A]/45">{s.desc}</p>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}
                className="px-4 py-2 font-inter text-[12px] font-medium uppercase tracking-[0.10em] text-[#1A1A1A]/60 transition-colors hover:text-[#1A1A1A]"
              >
                {l.label}
              </a>
            ))}

            <a href="#contact" className="btn-primary ml-2" style={{ fontSize: '10px', padding: '10px 16px' }}>
              Book a Discovery Call
            </a>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              className="flex h-10 w-10 items-center justify-center text-[#1A1A1A]/60 hover:text-[#1A1A1A] md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto px-8 py-8"
            style={{ background: '#F5F0E8' }}
          >
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <LogoBadge size={24} />
                <span className="font-syne text-sm font-semibold uppercase tracking-[0.08em]">
                  Clyvo <span style={{ color: '#C9A84C' }}>AI</span>
                </span>
              </a>
              <button className="flex h-10 w-10 items-center justify-center text-[#1A1A1A]/50" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-1">
              <p className="eyebrow mb-4">Navigation</p>
              {SERVICES.map((s) => (
                <a key={s.href} href={s.href}
                  className="py-3 font-syne text-xl font-semibold text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.name}
                </a>
              ))}
              <div className="my-4 gold-rule" />
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href}
                  className="py-3 font-syne text-xl font-semibold text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <a href="#contact" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>
                Book a Discovery Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
