'use client'
import Image from 'next/image'

const LINKS = {
  Services: [
    { label: 'AI Chatbots',         href: '/services/ai-chatbots' },
    { label: 'Workflow Automation', href: '/services/workflow-automation' },
    { label: 'Custom AI Models',    href: '/services/custom-ai-models' },
    { label: 'Voice Agents',        href: '/services/voice-agents' },
    { label: 'System Integrations', href: '/services/system-integrations' },
  ],
  Company: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing',      href: '#pricing' },
    { label: 'About',        href: '#about' },
    { label: 'Apply',        href: '/apply' },
  ],
  Legal: [
    { label: 'Privacy',  href: '/privacy' },
    { label: 'Terms',    href: '/terms' },
  ],
}

const SOCIALS = [
  {
    label: 'Email',
    href: 'mailto:clyvoai@gmail.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/clyvo_ai?igsh=cjFjam0xZDF2cnBs',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/clyvo-ai/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', color: '#F5F0E8' }} className="relative">
      {/* Gold top rule */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', opacity: 0.4 }} />
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Clyvo AI" width={24} height={24}
                style={{ objectFit: 'contain', filter: 'invert(1) brightness(0.9)' }} />
              <span className="font-syne text-sm font-semibold uppercase tracking-[0.08em]">
                Clyvo <span style={{ color: '#C9A84C' }}>AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs font-inter text-sm font-light leading-[1.75]" style={{ color: 'rgba(245,240,232,0.45)' }}>
              Custom AI. Real Results. We build end-to-end AI systems for B2B businesses — from scratch, for your exact operations.
            </p>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.15em]"
              style={{ color: '#C9A84C' }}>
              Book a Discovery Call →
            </a>
            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={s.label}
                  style={{ color: 'rgba(245,240,232,0.35)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.35)')}
                  className="transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="font-inter text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.3)' }}>
                {group}
              </p>
              <ul className="mt-4 space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="font-inter text-sm font-light transition-colors"
                      style={{ color: 'rgba(245,240,232,0.55)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.55)')}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
          <p className="font-inter text-[11px]" style={{ color: 'rgba(245,240,232,0.3)' }}>
            © {new Date().getFullYear()} Clyvo AI. All rights reserved.
          </p>
          <p className="font-inter text-[11px]" style={{ color: 'rgba(245,240,232,0.2)' }}>
            clyvoai.in
          </p>
        </div>
      </div>
    </footer>
  )
}
