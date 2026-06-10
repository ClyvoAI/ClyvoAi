'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const DARK = '#000000'

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>
        {!done && (
          <motion.div
            key="app-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            // Use inline style — never depends on Tailwind class generation
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: DARK,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '0 2rem 5rem',
              pointerEvents: 'none',
            }}
          >
            {/* Nav shimmer — top center */}
            <div
              className="shimmer-bar"
              style={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 320,
                height: 44,
                borderRadius: 9999,
              }}
            />

            {/* Logo pulse — center of screen */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{ boxShadow: '0 0 60px rgba(0,229,255,0.5), 0 0 120px rgba(0,229,255,0.25)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Clyvo AI"
                  width={80}
                  height={80}
                  className="h-20 w-20"
                  style={{
                    objectFit:    'contain',
                    filter:       'invert(1) sepia(1) saturate(5) hue-rotate(155deg) drop-shadow(0 0 8px rgba(0,229,255,0.95)) drop-shadow(0 0 24px rgba(0,229,255,0.55)) drop-shadow(0 0 48px rgba(0,229,255,0.20))',
                    mixBlendMode: 'screen',
                    animation:    'logo-float-3d 5s ease-in-out infinite',
                  }}
                />
              </motion.div>
            </div>

            {/* Badge shimmer */}
            <div className="shimmer-bar" style={{ width: 200, height: 28, borderRadius: 9999, marginBottom: 32 }} />

            {/* Headline blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="shimmer-bar" style={{ width: '75%', height: 96, borderRadius: 16 }} />
              <div className="shimmer-bar" style={{ width: '60%', height: 96, borderRadius: 16, opacity: 0.45 }} />
            </div>

            {/* Descriptor lines */}
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="shimmer-bar" style={{ width: '100%', maxWidth: 400, height: 16, borderRadius: 8 }} />
              <div className="shimmer-bar" style={{ width: '80%', maxWidth: 320, height: 16, borderRadius: 8, opacity: 0.6 }} />
            </div>

            {/* CTA pill buttons */}
            <div style={{ marginTop: 40, display: 'flex', gap: 12 }}>
              <div className="shimmer-bar" style={{ width: 208, height: 56, borderRadius: 9999 }} />
              <div className="shimmer-bar" style={{ width: 176, height: 56, borderRadius: 9999, opacity: 0.5 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
