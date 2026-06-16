'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: '#F5F0E8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '0 2rem 5rem',
              pointerEvents: 'none',
            }}
          >
            {/* Nav shimmer */}
            <div style={{
              position: 'absolute', top: 20, left: '50%',
              transform: 'translateX(-50%)', width: 320, height: 44,
              borderRadius: 9999, background: 'rgba(26,26,26,0.04)',
            }} />

            {/* Logo center */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Clyvo AI" width={64} height={64}
                  style={{ objectFit: 'contain', opacity: 0.4 }} />
              </motion.div>
            </div>

            {/* Headline shimmer blocks */}
            <div style={{ marginBottom: 32, width: 180, height: 12, borderRadius: 8, background: 'rgba(201,168,76,0.2)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ width: '70%', height: 80, borderRadius: 8, background: 'rgba(26,26,26,0.05)' }} />
              <div style={{ width: '55%', height: 80, borderRadius: 8, background: 'rgba(26,26,26,0.03)' }} />
            </div>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ width: '100%', maxWidth: 380, height: 14, borderRadius: 8, background: 'rgba(26,26,26,0.04)' }} />
              <div style={{ width: '75%', maxWidth: 300, height: 14, borderRadius: 8, background: 'rgba(26,26,26,0.03)' }} />
            </div>
            <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
              <div style={{ width: 200, height: 48, borderRadius: 0, background: 'rgba(26,26,26,0.08)' }} />
              <div style={{ width: 160, height: 48, borderRadius: 0, background: 'rgba(26,26,26,0.04)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
