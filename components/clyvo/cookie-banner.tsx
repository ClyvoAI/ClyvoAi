'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export type CookieConsent = 'all' | 'limited' | 'declined' | null

const STORAGE_KEY = 'clyvo_cookie_consent'

export function getCookieConsent(): CookieConsent {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem(STORAGE_KEY) as CookieConsent) || null
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  const accept = (choice: CookieConsent) => {
    localStorage.setItem(STORAGE_KEY, choice as string)
    setVisible(false)
    // If accepted all, allow GA to run
    if (choice === 'all' && typeof window !== 'undefined') {
      // @ts-ignore
      window['ga-disable-G-XXXXXXXXXX'] = false
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[500]"
          style={{
            background: 'rgba(26,26,26,0.97)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(201,168,76,0.25)',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left: message */}
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-4 w-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-inter text-[12px] text-[#F5F0E8]/80 leading-[1.7]">
                    We use cookies to improve your experience. By continuing, you agree to our{' '}
                    <Link href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</Link>
                    {' '}and{' '}
                    <Link href="/terms" className="text-[#C9A84C] hover:underline">Terms of Service</Link>.
                  </p>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                        <p className="font-inter text-[11px] text-[#F5F0E8]/55">
                          <strong className="text-[#F5F0E8]/80">Essential cookies</strong> — always active. Required for the site to function (booking modal, form state, session).
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                        <p className="font-inter text-[11px] text-[#F5F0E8]/55">
                          <strong className="text-[#F5F0E8]/80">Analytics cookies</strong> — Google Analytics. Collects anonymised page view data. Included in &ldquo;Accept All&rdquo;, excluded from &ldquo;Limited&rdquo; and &ldquo;Decline&rdquo;.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-red-400 flex-shrink-0" />
                        <p className="font-inter text-[11px] text-[#F5F0E8]/55">
                          <strong className="text-[#F5F0E8]/80">Marketing cookies</strong> — none. We do not use advertising or tracking cookies.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  <button
                    onClick={() => setExpanded(e => !e)}
                    className="mt-1.5 font-inter text-[11px] text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors"
                  >
                    {expanded ? 'Show less ↑' : 'Cookie details ↓'}
                  </button>
                </div>
              </div>

              {/* Right: buttons */}
              <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => accept('declined')}
                  className="font-inter text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 transition-colors"
                  style={{
                    color: 'rgba(245,240,232,0.40)',
                    border: '1px solid rgba(245,240,232,0.12)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.70)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.40)')}
                >
                  Decline
                </button>
                <button
                  onClick={() => accept('limited')}
                  className="font-inter text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 transition-all"
                  style={{
                    color: '#C9A84C',
                    border: '1px solid rgba(201,168,76,0.35)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)')}
                >
                  Limited Accept
                </button>
                <button
                  onClick={() => accept('all')}
                  className="font-inter text-[11px] uppercase tracking-[0.1em] px-5 py-2.5 transition-colors"
                  style={{
                    background: '#C9A84C',
                    color: '#1A1A1A',
                    fontWeight: 700,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#B8973B')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
