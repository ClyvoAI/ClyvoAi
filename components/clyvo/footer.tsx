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
    { label: 'Our Work',     href: '#work' },
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
    label: 'WhatsApp',
    href: 'https://wa.me/919581074763',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.494 2.031 7.808L0 32l8.385-2.001A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.538a13.51 13.51 0 0 1-6.928-1.906l-.496-.295-5.007 1.194 1.257-4.87-.323-.513A13.474 13.474 0 0 1 2.462 16C2.462 8.996 8.996 2.462 16 2.462S29.538 8.996 29.538 16 23.004 29.538 16 29.538zm7.406-10.118c-.406-.203-2.402-1.185-2.774-1.32-.372-.136-.643-.203-.913.203-.271.406-1.049 1.32-1.286 1.591-.237.271-.474.305-.88.102-.406-.203-1.714-.632-3.265-2.014-1.207-1.075-2.022-2.402-2.259-2.808-.237-.406-.025-.625.178-.827.182-.181.406-.474.609-.711.203-.237.271-.406.406-.677.136-.271.068-.508-.034-.711-.102-.203-.913-2.201-1.25-3.013-.329-.791-.663-.684-.913-.696l-.778-.013c-.271 0-.711.102-1.083.508-.372.406-1.421 1.388-1.421 3.386s1.455 3.928 1.658 4.199c.203.271 2.863 4.369 6.937 6.124.97.419 1.727.669 2.317.856.973.309 1.859.265 2.559.161.781-.116 2.402-.982 2.741-1.931.338-.948.338-1.761.237-1.931-.102-.169-.372-.271-.778-.474z"/>
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
