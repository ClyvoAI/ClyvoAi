'use client'

import { motion } from 'motion/react'

/**
 * Hero background using the real cracked metallic photo.
 * PREREQUISITE: copy cracked-metal.jpg → public/cracked-metal.jpg
 * PREREQUISITE: copy cube_neon_blue_glow_1024.png → public/logo-reactor.png
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ isolation: 'isolate' }}>

      {/* 1 — Real cracked metallic photo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/cracked-metal.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        filter: 'brightness(0.38) saturate(0.75) hue-rotate(195deg)',
        // brightness: darken it so text is legible
        // saturate: pull back the colour so reactor blue dominates
        // hue-rotate: shift remaining colour toward blue-steel to unify with reactor glow
      }} />

      {/* 2 — Reactor light bleed — illuminates the cracks around the cube */}
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,155,255,0.22) 0%, rgba(0,85,195,0.10) 38%, rgba(0,38,115,0.05) 62%, transparent 78%)',
        filter: 'blur(30px)',
        animation: 'reactor-bg-pulse 2.8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(70,195,255,0.18) 0%, rgba(0,135,255,0.08) 52%, transparent 78%)',
        filter: 'blur(14px)',
        animation: 'reactor-bg-pulse 2.8s ease-in-out infinite 0.7s',
      }} />

      {/* 3 — Edge vignette — focuses eye to centre */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)',
      }} />
      {/* Bottom fade for text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
      }} />

      {/* 4 — Orbital rings + glowing favicon cube */}
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%',
            border: '1px dashed rgba(0,175,255,0.22)',
            boxShadow: '0 0 8px rgba(0,155,255,0.08) inset' }} />

        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: 318, height: 318, borderRadius: '50%',
            border: '1.5px solid rgba(0,195,255,0.28)',
            boxShadow: '0 0 16px rgba(0,175,255,0.14) inset, 0 0 16px rgba(0,175,255,0.12)' }} />

        <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: 218, height: 218, borderRadius: '50%',
            border: '1px solid rgba(80,225,255,0.32)',
            boxShadow: '0 0 12px rgba(60,205,255,0.18) inset' }} />

        <motion.div
          animate={{ opacity: [0.88, 1, 0.88], scale: [1, 1.04, 1] }}
          transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-reactor.png" alt="" width={255} height={255}
            style={{ objectFit: 'contain', display: 'block' }} />
        </motion.div>
      </div>

      <style>{`
        @keyframes reactor-bg-pulse {
          0%, 100% { opacity: 0.70; }
          50%       { opacity: 1.00; }
        }
      `}</style>
    </div>
  )
}
