'use client'

import { motion } from 'motion/react'

/**
 * PREREQUISITES:
 *  public/cracked-metal.jpg   — the cracked metallic surface photo
 *  public/logo-reactor.png    — cube_neon_blue_glow_1024.png renamed
 */
export function HeroBackground() {
  // Hole position — center of the photo's diamond pattern
  const HOLE_X = '50%'
  const HOLE_Y = '40%'

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ isolation: 'isolate' }}>

      {/* 1 — Pure dark base — visible through the hole */}
      <div style={{ position: 'absolute', inset: 0, background: '#080A10' }} />

      {/* 2 — Cracked wall photo WITH radial mask punching a hole at diamond center
          mask fades:  solid wall → crumbling edge → void at center
          hue-rotate removed (was killing sharpness), contrast boosted instead  */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/cracked-metal.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: `${HOLE_X} ${HOLE_Y}`,
        filter: 'brightness(0.46) contrast(1.28) saturate(0.55)',
        // Hole mask: transparent center (the void) → opaque wall
        WebkitMaskImage: `radial-gradient(ellipse 32% 38% at ${HOLE_X} ${HOLE_Y},
          transparent 0%,
          transparent 38%,
          rgba(0,0,0,0.35) 50%,
          rgba(0,0,0,0.75) 60%,
          black 72%)`,
        maskImage: `radial-gradient(ellipse 32% 38% at ${HOLE_X} ${HOLE_Y},
          transparent 0%,
          transparent 38%,
          rgba(0,0,0,0.35) 50%,
          rgba(0,0,0,0.75) 60%,
          black 72%)`,
      }} />

      {/* 3 — Energy light pouring through the hole from behind
          This sells the "something blasted through from the other side" read */}
      <div style={{
        position: 'absolute', top: HOLE_Y, left: HOLE_X,
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: `radial-gradient(circle,
          rgba(0,180,255,0.35) 0%,
          rgba(0,120,220,0.18) 30%,
          rgba(0,60,160,0.08) 55%,
          transparent 72%)`,
        filter: 'blur(22px)',
        animation: 'hole-pulse 2.6s ease-in-out infinite',
      }} />
      {/* Tight hot core glow */}
      <div style={{
        position: 'absolute', top: HOLE_Y, left: HOLE_X,
        transform: 'translate(-50%, -50%)',
        width: 280, height: 280, borderRadius: '50%',
        background: `radial-gradient(circle,
          rgba(120,220,255,0.28) 0%,
          rgba(0,170,255,0.14) 45%,
          transparent 72%)`,
        filter: 'blur(10px)',
        animation: 'hole-pulse 2.6s ease-in-out infinite 0.5s',
      }} />

      {/* 4 — Jagged light rays from the breach (thin SVG spokes, no rings) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <radialGradient id="ray-fade" cx="50%" cy="40%" r="50%" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(0,0) scale(1.44 0.9)">
            <stop offset="0%"   stopColor="rgba(80,200,255,0.55)" />
            <stop offset="40%"  stopColor="rgba(0,150,255,0.18)" />
            <stop offset="100%" stopColor="rgba(0,80,200,0)" />
          </radialGradient>
        </defs>
        {/* 8 light rays emanating from breach center */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45) * Math.PI / 180
          const cx = 0.50, cy = 0.40  // fractional of viewBox
          const len = 0.55
          const ex = cx + Math.cos(angle) * len
          const ey = cy + Math.sin(angle) * len
          return (
            <line
              key={i}
              x1={`${cx * 100}%`} y1={`${cy * 100}%`}
              x2={`${ex * 100}%`} y2={`${ey * 100}%`}
              stroke="url(#ray-fade)"
              strokeWidth={i % 2 === 0 ? '1.5' : '0.8'}
              opacity={i % 2 === 0 ? '0.55' : '0.28'}
            />
          )
        })}
      </svg>

      {/* 5 — Edge vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 95% 95% at ${HOLE_X} ${HOLE_Y},
          transparent 25%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)`,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 50%)',
      }} />

      {/* 6 — The glowing favicon cube — NO rings, just the logo bursting through */}
      <div style={{
        position: 'absolute', top: HOLE_Y, left: HOLE_X,
        transform: 'translate(-50%, -50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 3,
      }}>
        <motion.div
          animate={{ opacity: [0.90, 1, 0.90], scale: [1, 1.04, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-reactor.png"
            alt=""
            width={240}
            height={240}
            style={{ objectFit: 'contain', display: 'block' }}
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes hole-pulse {
          0%, 100% { opacity: 0.75; }
          50%       { opacity: 1.00; }
        }
      `}</style>
    </div>
  )
}
