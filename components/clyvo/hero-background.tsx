'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

/**
 * Full-bleed hero background.
 * Layers (bottom → top):
 *  1. Dark titanium base gradient
 *  2. Metal panel seam grid
 *  3. Diagonal metallic sheen
 *  4. SVG crack network radiating from center
 *  5. Rust stains at crack stress points
 *  6. Ambient reactor glow (CSS radial)
 *  7. Favicon cube logo — the actual "reactor"
 *  8. Minimal rotating orbital rings
 *  9. Edge vignette
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* 1 — Base: dark titanium */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #1E2028 0%, #252830 25%, #1A1C22 55%, #141618 80%, #1C1E26 100%)',
      }} />

      {/* 2 — Metal panel seams */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: [
          'repeating-linear-gradient(0deg,   rgba(255,255,255,0.022) 0px, transparent 1px, transparent 130px)',
          'repeating-linear-gradient(90deg,  rgba(255,255,255,0.015) 0px, transparent 1px, transparent 190px)',
        ].join(','),
      }} />

      {/* 3 — Metallic sheen */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(128deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.045) 45%, rgba(255,255,255,0.00) 65%)',
      }} />

      {/* 4 + 5 — Crack SVG + rust stains
          viewBox matches common 16:9 hero. preserveAspectRatio slice ensures coverage.
          All cracks radiate from center (720, 450) — the reactor impact point.      */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          {/* Crack glow — subtle light leak from reactor through the cracks */}
          <filter id="crack-glow">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Rust stain gradient */}
          <radialGradient id="rust-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#8B4010" stopOpacity="0.45" />
            <stop offset="60%"  stopColor="#6B3008" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="rust-b" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#7A3A0E" stopOpacity="0.30" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="rust-c" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#5C2C08" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* ── Rust stains at crack terminals ── */}
        <ellipse cx="340" cy="165" rx="55" ry="42" fill="url(#rust-a)" />
        <ellipse cx="190" cy="680" rx="60" ry="48" fill="url(#rust-a)" />
        <ellipse cx="1120" cy="200" rx="48" ry="38" fill="url(#rust-b)" />
        <ellipse cx="1260" cy="760" rx="55" ry="44" fill="url(#rust-b)" />
        <ellipse cx="500"  cy="120" rx="30" ry="24" fill="url(#rust-c)" />
        {/* Rust bleed along lower-left main crack */}
        <ellipse cx="455" cy="572" rx="20" ry="14" fill="url(#rust-c)" />

        {/* ── Main cracks — wide, close to center ── */}
        <g filter="url(#crack-glow)" strokeLinecap="round" fill="none">

          {/* Upper-left primary crack */}
          <path d="M720,450 L520,290 L340,165" stroke="rgba(160,180,200,0.55)" strokeWidth="1.8" />
          {/* UL branch 1 */}
          <path d="M560,320 L480,355 L400,340" stroke="rgba(140,160,180,0.35)" strokeWidth="0.9" />
          {/* UL branch 2 — hairline */}
          <path d="M460,240 L420,210 L400,230" stroke="rgba(120,140,160,0.25)" strokeWidth="0.5" />
          {/* UL tertiary */}
          <path d="M340,165 L290,140 L260,155" stroke="rgba(110,130,150,0.30)" strokeWidth="0.6" />

          {/* Upper-right primary crack */}
          <path d="M720,450 L940,295 L1120,200" stroke="rgba(155,175,195,0.50)" strokeWidth="1.5" />
          {/* UR branch */}
          <path d="M850,365 L900,390 L960,375" stroke="rgba(130,150,170,0.30)" strokeWidth="0.8" />
          <path d="M1000,255 L1060,240" stroke="rgba(120,140,160,0.22)" strokeWidth="0.5" />

          {/* Lower-left primary crack — longest, most dramatic */}
          <path d="M720,450 L455,572 L190,680" stroke="rgba(150,170,190,0.55)" strokeWidth="1.8" />
          {/* LL branch 1 */}
          <path d="M590,514 L530,490 L470,510" stroke="rgba(130,150,170,0.35)" strokeWidth="0.9" />
          {/* LL branch 2 */}
          <path d="M320,630 L260,640 L230,620" stroke="rgba(120,140,160,0.28)" strokeWidth="0.7" />

          {/* Lower-right primary crack */}
          <path d="M720,450 L990,615 L1260,760" stroke="rgba(150,170,185,0.48)" strokeWidth="1.5" />
          {/* LR branch */}
          <path d="M860,535 L920,515 L970,538" stroke="rgba(130,150,170,0.30)" strokeWidth="0.8" />
          <path d="M1100,660 L1140,640" stroke="rgba(110,130,150,0.22)" strokeWidth="0.5" />

          {/* Straight-up crack */}
          <path d="M720,450 L715,280 L720,130" stroke="rgba(140,160,180,0.35)" strokeWidth="1.0" />
          <path d="M710,330 L680,310 L670,290" stroke="rgba(120,140,160,0.22)" strokeWidth="0.5" />

          {/* Short left-side crack */}
          <path d="M720,450 L500,430 L340,420" stroke="rgba(140,160,180,0.28)" strokeWidth="0.9" />
          <path d="M600,440 L580,460 L550,455" stroke="rgba(120,140,160,0.18)" strokeWidth="0.45" />

          {/* Short right-side crack */}
          <path d="M720,450 L950,462 L1130,450" stroke="rgba(140,160,180,0.25)" strokeWidth="0.8" />
        </g>

        {/* ── Hairline surface scratches (non-structural) ── */}
        <g stroke="rgba(200,210,220,0.10)" strokeWidth="0.4" fill="none">
          <path d="M200,150 L350,180 L380,200" />
          <path d="M1100,100 L1050,150 L1080,180" />
          <path d="M100,400 L160,380 L200,400" />
          <path d="M1300,350 L1250,370 L1280,400" />
          <path d="M400,750 L450,730 L480,750" />
          <path d="M900,820 L860,800 L890,780" />
        </g>
      </svg>

      {/* 6 — Ambient reactor glow (CSS, not SVG — can bleed beyond any SVG clip) */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,160,255,0.22) 0%, rgba(0,90,200,0.10) 35%, rgba(0,40,120,0.05) 60%, transparent 75%)',
        filter: 'blur(35px)',
        animation: 'reactor-bg-pulse 2.8s ease-in-out infinite',
      }} />
      {/* Tighter secondary glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 360, height: 360,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(80,200,255,0.18) 0%, rgba(0,140,255,0.08) 50%, transparent 75%)',
        filter: 'blur(18px)',
        animation: 'reactor-bg-pulse 2.8s ease-in-out infinite 0.7s',
      }} />

      {/* 7 + 8 — Favicon cube (the reactor) + orbital rings */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>

        {/* Outer orbital ring — slow CW */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: 380, height: 380,
            borderRadius: '50%',
            border: '1px solid rgba(0,160,255,0.12)',
            borderStyle: 'dashed',
          }}
        />
        {/* Middle ring — CCW, slightly faster */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: 290, height: 290,
            borderRadius: '50%',
            border: '1px solid rgba(0,180,255,0.18)',
          }}
        />
        {/* Inner ring — CW fast */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: 205, height: 205,
            borderRadius: '50%',
            border: '1px solid rgba(60,210,255,0.22)',
          }}
        />

        {/* The favicon cube — THE reactor core */}
        <motion.div
          animate={{ opacity: [0.80, 1, 0.80] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'relative',
            width: 200, height: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            // Layered neon blue glow matching the favicon
            filter: [
              'drop-shadow(0 0 8px  rgba(0,180,255,1.0))',
              'drop-shadow(0 0 24px rgba(0,150,255,0.75))',
              'drop-shadow(0 0 60px rgba(0,100,220,0.45))',
              'drop-shadow(0 0 100px rgba(0,60,180,0.25))',
            ].join(' '),
          }}
        >
          <Image
            src="/logo.png"
            alt=""
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
            priority
          />
        </motion.div>
      </div>

      {/* 9 — Edge vignette — darkens corners so hero text is readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)',
      }} />
      {/* Bottom fade — helps text legibility at bottom-left */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
      }} />

      <style>{`
        @keyframes reactor-bg-pulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1.0; }
        }
      `}</style>
    </div>
  )
}
