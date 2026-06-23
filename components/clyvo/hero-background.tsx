'use client'

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

        {/* ── Rust stains at fracture terminals and stress points ── */}
        <ellipse cx="295" cy="155" rx="48" ry="36" fill="url(#rust-a)" />
        <ellipse cx="260" cy="710" rx="55" ry="42" fill="url(#rust-a)" />
        <ellipse cx="1185" cy="202" rx="44" ry="34" fill="url(#rust-b)" />
        <ellipse cx="1340" cy="714" rx="50" ry="38" fill="url(#rust-b)" />
        <ellipse cx="820"  cy="122" rx="28" ry="22" fill="url(#rust-c)" />
        {/* Rust bleed at branch junction lower-left */}
        <ellipse cx="478" cy="636" rx="18" ry="13" fill="url(#rust-c)" />
        {/* Rust at left horizontal terminal */}
        <ellipse cx="336" cy="390" rx="22" ry="16" fill="url(#rust-c)" />

        {/* ── Organic fracture network — all originate from reactor impact (840,390) upper-right center ── */}
        <g filter="url(#crack-glow)" strokeLinecap="round" strokeLinejoin="round" fill="none">

          {/* === PRIMARY FRACTURES === */}

          {/* Fracture 1 — sweeps upper-left, biggest crack */}
          <path d="M840,390 C790,360 720,320 640,275 C590,248 520,220 440,190 C400,175 355,162 310,155"
            stroke="rgba(170,190,210,0.60)" strokeWidth="1.8" />
          {/* F1 branch A — splits at mid-point */}
          <path d="M680,292 C650,305 615,318 575,325 C545,330 510,328"
            stroke="rgba(150,170,190,0.38)" strokeWidth="0.9" />
          {/* F1 branch B — hairline from near-terminal */}
          <path d="M420,182 C400,170 375,165 345,168"
            stroke="rgba(130,150,170,0.25)" strokeWidth="0.55" />
          {/* F1 terminal micro-crack */}
          <path d="M310,155 C288,148 265,152 245,160"
            stroke="rgba(120,140,160,0.30)" strokeWidth="0.6" />

          {/* Fracture 2 — upper-right diagonal */}
          <path d="M840,390 C880,355 940,310 1010,270 C1065,240 1120,218 1180,205"
            stroke="rgba(160,180,200,0.52)" strokeWidth="1.5" />
          {/* F2 branch */}
          <path d="M965,288 C990,305 1020,318 1055,320"
            stroke="rgba(135,155,175,0.30)" strokeWidth="0.8" />
          {/* F2 hairline */}
          <path d="M1120,210 C1145,200 1170,195 1195,198"
            stroke="rgba(120,140,160,0.22)" strokeWidth="0.5" />

          {/* Fracture 3 — sweeps lower-left, longest */}
          <path d="M840,390 C800,425 750,468 690,510 C630,552 560,592 480,635 C420,665 350,690 270,710"
            stroke="rgba(165,185,205,0.58)" strokeWidth="1.8" />
          {/* F3 branch A — splits mid */}
          <path d="M720,490 C695,480 665,475 630,478 C605,480 580,488"
            stroke="rgba(140,160,180,0.35)" strokeWidth="0.9" />
          {/* F3 branch B — lower section */}
          <path d="M430,648 C405,658 378,665 348,668"
            stroke="rgba(125,145,165,0.28)" strokeWidth="0.65" />
          {/* F3 tertiary — hairline */}
          <path d="M560,595 C540,610 520,618 495,615"
            stroke="rgba(115,135,155,0.20)" strokeWidth="0.4" />

          {/* Fracture 4 — lower-right */}
          <path d="M840,390 C885,430 940,478 1000,525 C1060,572 1130,618 1205,658 C1250,682 1295,700 1335,712"
            stroke="rgba(158,178,198,0.50)" strokeWidth="1.5" />
          {/* F4 branch */}
          <path d="M1025,540 C1050,530 1078,526 1105,530"
            stroke="rgba(132,152,172,0.28)" strokeWidth="0.75" />
          <path d="M1200,660 C1220,650 1242,645"
            stroke="rgba(115,135,155,0.20)" strokeWidth="0.45" />

          {/* Fracture 5 — straight up, short */}
          <path d="M840,390 C836,345 832,290 828,235 C825,195 822,158 820,125"
            stroke="rgba(148,168,188,0.40)" strokeWidth="1.1" />
          <path d="M828,280 C812,268 795,262 775,265"
            stroke="rgba(125,145,165,0.22)" strokeWidth="0.5" />

          {/* Fracture 6 — left horizontal sweep */}
          <path d="M840,390 C795,388 740,385 680,382 C620,379 555,378 485,380 C440,381 390,385 340,390"
            stroke="rgba(142,162,182,0.35)" strokeWidth="1.0" />
          <path d="M630,382 C615,395 598,402 578,400"
            stroke="rgba(120,140,160,0.20)" strokeWidth="0.45" />

          {/* === SURFACE STRESS HAIRLINES (non-structural, from normal metal fatigue) === */}
          <g stroke="rgba(200,215,225,0.10)" strokeWidth="0.35">
            <path d="M150,140 C180,148 210,152 235,148" />
            <path d="M1200,110 C1175,128 1155,142 1150,158" />
            <path d="M90,380 C115,372 140,368 162,372" />
            <path d="M1340,320 C1318,335 1300,348 1298,365" />
            <path d="M380,780 C408,768 430,762 450,765" />
            <path d="M950,840 C928,825 910,815 898,820" />
            <path d="M60,560 C88,552 110,548 128,554" />
            <path d="M1380,580 C1355,568 1335,562 1325,568" />
          </g>
        </g>
      </svg>

      {/* 6 — Ambient reactor glow — centered on cube position (upper-right center) */}
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,160,255,0.22) 0%, rgba(0,90,200,0.10) 35%, rgba(0,40,120,0.05) 60%, transparent 75%)',
        filter: 'blur(35px)',
        animation: 'reactor-bg-pulse 2.8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        width: 360, height: 360,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(80,200,255,0.18) 0%, rgba(0,140,255,0.08) 50%, transparent 75%)',
        filter: 'blur(18px)',
        animation: 'reactor-bg-pulse 2.8s ease-in-out infinite 0.7s',
      }} />

      {/* GlobalBackground bleed kill — fixed elements show above absolute positioned divs in some stacking contexts */}
      <div style={{ position: 'absolute', inset: 0, background: 'transparent', zIndex: 0 }} />

      {/* 7 + 8 — Favicon cube + orbital rings — upper-right center */}
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>
        {/* Outer orbital ring */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%',
            border: '1px dashed rgba(0,170,255,0.18)' }} />
        {/* Segmented mid ring */}
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%',
            border: '1.5px solid rgba(0,190,255,0.22)',
            boxShadow: '0 0 12px rgba(0,160,255,0.10) inset, 0 0 12px rgba(0,160,255,0.10)' }} />
        {/* Inner ring — tightest, fastest */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%',
            border: '1px solid rgba(80,220,255,0.28)',
            boxShadow: '0 0 8px rgba(60,200,255,0.15) inset' }} />

        {/* Favicon cube — 260px, layered neon drop-shadow */}
        <motion.div
          animate={{ opacity: [0.82, 1, 0.82], scale: [1, 1.03, 1] }}
          transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'relative', width: 260, height: 260,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            filter: [
              'drop-shadow(0 0 6px  rgba(0,190,255,1.0))',
              'drop-shadow(0 0 20px rgba(0,160,255,0.80))',
              'drop-shadow(0 0 50px rgba(0,120,230,0.50))',
              'drop-shadow(0 0 90px rgba(0,80,200,0.28))',
            ].join(' '),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={260} height={260} style={{ objectFit: 'contain' }} />
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
