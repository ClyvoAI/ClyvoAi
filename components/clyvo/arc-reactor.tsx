'use client'

import { motion } from 'motion/react'

/**
 * Glowing cube logo. The PNG already has neon glow baked in —
 * only a single tight drop-shadow is added via CSS to reinforce it.
 * Requires: public/logo-reactor.png
 */
export function ArcReactor() {
  return (
    <motion.div
      animate={{ opacity: [0.88, 1, 0.88], y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
      style={{
        width: 190,
        height: 190,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Single tight drop-shadow — reinforces baked-in glow without bloating it
        filter: [
          'drop-shadow(0 0 8px  rgba(60,190,255,0.70))',
          'drop-shadow(0 0 18px rgba(0,150,255,0.35))',
        ].join(' '),
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-reactor.png"
        alt="Clyvo AI"
        width={190}
        height={190}
        style={{ objectFit: 'contain', display: 'block' }}
      />
    </motion.div>
  )
}
