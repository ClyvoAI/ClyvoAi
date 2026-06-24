'use client'

import { motion } from 'motion/react'

/**
 * Glowing cube logo with the same animations as the arc reactor.
 * Requires: public/logo-reactor.png
 */
export function ArcReactor() {
  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      {/* Outer ambient glow — pulses slowly */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: -50,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(80,200,255,0.22) 0%, rgba(0,140,255,0.10) 45%, transparent 70%)',
          filter: 'blur(18px)',
        }}
      />

      {/* Secondary tight glow — offset phase */}
      <motion.div
        animate={{ opacity: [1, 0.55, 1], scale: [1.04, 1, 1.04] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: -20,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120,220,255,0.18) 0%, rgba(0,180,255,0.08) 55%, transparent 75%)',
          filter: 'blur(10px)',
        }}
      />

      {/* The glowing cube */}
      <motion.div
        animate={{ opacity: [0.88, 1, 0.88] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative', zIndex: 2,
          width: 200, height: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          filter: [
            'drop-shadow(0 0 10px rgba(80,210,255,0.90))',
            'drop-shadow(0 0 28px rgba(0,170,255,0.65))',
            'drop-shadow(0 0 60px rgba(0,120,230,0.40))',
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
    </div>
  )
}
