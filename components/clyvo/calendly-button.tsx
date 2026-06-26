'use client'

import { useEffect } from 'react'

// ─── Replace this with your real Calendly URL ───────────────────────────────
const CALENDLY_URL = 'https://calendly.com/YOUR-USERNAME/discovery-call'
// ────────────────────────────────────────────────────────────────────────────

/**
 * Loads the Calendly popup widget script once and exposes openCalendly().
 * Import CalendlyButton wherever you need a booking CTA.
 */

function loadCalendlyScript() {
  if (typeof window === 'undefined') return
  if (document.getElementById('calendly-script')) return

  // Calendly widget CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://assets.calendly.com/assets/external/widget.css'
  document.head.appendChild(link)

  // Calendly widget JS
  const script = document.createElement('script')
  script.id = 'calendly-script'
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  document.head.appendChild(script)
}

export function openCalendly() {
  if (typeof window === 'undefined') return
  // @ts-ignore — Calendly global injected by widget.js
  if (window.Calendly) {
    // @ts-ignore
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
  } else {
    // Fallback: open in new tab if script hasn't loaded yet
    window.open(CALENDLY_URL, '_blank', 'noopener')
  }
}

interface CalendlyButtonProps {
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  children: React.ReactNode
}

export function CalendlyButton({ className, style, onClick, children }: CalendlyButtonProps) {
  useEffect(() => { loadCalendlyScript() }, [])

  return (
    <button
      type="button"
      onClick={() => { onClick?.(); openCalendly() }}
      className={className}
      style={style}
    >
      {children}
    </button>
  )
}
