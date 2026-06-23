'use client'

import { motion } from 'motion/react'
import { MetallicWallCanvas } from '@/components/clyvo/metallic-wall-canvas'

/**
 * Hero background layers:
 *  1. MetallicWallCanvas   — procedural titanium texture (canvas 2D)
 *  2. Depth crack SVG      — bezier fractures with dark body + edge highlight
 *  3. Reactor ambient glow — large CSS radial, no blur aliasing
 *  4. /logo-reactor.png    — the pre-rendered neon-glowing favicon cube
 *  5. Orbital rings        — thin rotating, glow via box-shadow
 *
 * PREREQUISITE: copy cube_neon_blue_glow_1024.png → public/logo-reactor.png
 */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* 1 — Metallic canvas texture */}
      <MetallicWallCanvas />

      {/* 2 — Crack SVG overlay
          Each crack = 3 overlapping paths:
            a) wide dark fill (the void inside the crack)
            b) thin bright top-edge (light catches the lip)
          This creates genuine depth vs. the old single-stroke approach.
          All cracks radiate from reactor position (58%, 38%).             */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <filter id="crack-depth" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.8)" />
          </filter>
        </defs>

        {/* Crack macro — dark void body */}
        <g filter="url(#crack-depth)" strokeLinecap="round" strokeLinejoin="round" fill="none">

          {/* === VOID PATHS (4px dark — the actual crack void) === */}
          <path d="M840,390 C790,360 720,320 640,275 C590,248 520,220 440,190 C400,175 355,162 310,155"
            stroke="rgba(2,4,6,0.96)" strokeWidth="4" />
          <path d="M680,292 C650,305 615,318 575,325 C545,330 510,328"
            stroke="rgba(2,4,6,0.90)" strokeWidth="2.5" />
          <path d="M420,182 C400,170 375,165 345,168"
            stroke="rgba(2,4,6,0.85)" strokeWidth="1.5" />

          <path d="M840,390 C880,355 940,310 1010,270 C1065,240 1120,218 1180,205"
            stroke="rgba(2,4,6,0.94)" strokeWidth="3.5" />
          <path d="M965,288 C990,305 1020,318 1055,320"
            stroke="rgba(2,4,6,0.88)" strokeWidth="2" />

          <path d="M840,390 C800,425 750,468 690,510 C630,552 560,592 480,635 C420,665 350,690 270,710"
            stroke="rgba(2,4,6,0.96)" strokeWidth="4" />
          <path d="M720,490 C695,480 665,475 630,478 C605,480 580,488"
            stroke="rgba(2,4,6,0.90)" strokeWidth="2.5" />
          <path d="M430,648 C405,658 378,665 348,668"
            stroke="rgba(2,4,6,0.85)" strokeWidth="1.5" />

          <path d="M840,390 C885,430 940,478 1000,525 C1060,572 1130,618 1205,658 C1250,682 1295,700 1335,712"
            stroke="rgba(2,4,6,0.93)" strokeWidth="3.5" />
          <path d="M1025,540 C1050,530 1078,526 1105,530"
            stroke="rgba(2,4,6,0.88)" strokeWidth="2" />

          <path d="M840,390 C836,345 832,290 828,235 C825,195 822,158 820,125"
            stroke="rgba(2,4,6,0.88)" strokeWidth="2.5" />

          <path d="M840,390 C795,388 740,385 680,382 C620,379 555,378 485,380 C440,381 390,385 340,390"
            stroke="rgba(2,4,6,0.85)" strokeWidth="2" />
        </g>

        {/* === EDGE HIGHLIGHTS (1px bright — light catching the crack lip) === */}
        <g strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M840,390 C790,360 720,320 640,275 C590,248 520,220 440,190 C400,175 355,162 310,155"
            stroke="rgba(150,170,195,0.45)" strokeWidth="1" />
          <path d="M680,292 C650,305 615,318 575,325 C545,330 510,328"
            stroke="rgba(140,160,185,0.28)" strokeWidth="0.7" />

          <path d="M840,390 C880,355 940,310 1010,270 C1065,240 1120,218 1180,205"
            stroke="rgba(148,168,192,0.40)" strokeWidth="1" />

          <path d="M840,390 C800,425 750,468 690,510 C630,552 560,592 480,635 C420,665 350,690 270,710"
            stroke="rgba(150,170,195,0.44)" strokeWidth="1" />
          <path d="M720,490 C695,480 665,475 630,478 C605,480 580,488"
            stroke="rgba(138,158,182,0.28)" strokeWidth="0.7" />

          <path d="M840,390 C885,430 940,478 1000,525 C1060,572 1130,618 1205,658 C1250,682 1295,700 1335,712"
            stroke="rgba(145,165,190,0.38)" strokeWidth="1" />

          <path d="M840,390 C836,345 832,290 828,235 C825,195 822,158 820,125"
            stroke="rgba(140,160,185,0.30)" strokeWidth="0.8" />

          <path d="M840,390 C795,388 740,385 680,382 C620,379 555,378 485,380 C440,381 390,385 340,390"
            stroke="rgba(138,158,182,0.26)" strokeWidth="0.7" />
        </g>

        {/* Hairline stress fractures */}
        <g stroke="rgba(160,175,190,0.12)" strokeWidth="0.35" fill="none" strokeLinecap="round">
          <path d="M150,138 C178,146 208,150 232,146" />
          <path d="M1202,108 C1176,126 1156,140 1152,156" />
          <path d="M88,378 C114,370 138,366 160,370" />
          <path d="M1342,318 C1320,332 1302,346 1300,362" />
          <path d="M378,778 C406,766 428,760 448,763" />
          <path d="M952,838 C930,822 912,812 900,818" />
        </g>
      </svg>

      {/* 3 — Reactor ambient glow — positioned on cube (58%, 38%) */}
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        width: 650, height: 650, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,155,255,0.20) 0%, rgba(0,85,195,0.09) 38%, rgba(0,38,115,0.04) 62%, transparent 78%)',
        filter: 'blur(28px)',
        animation: 'reactor-bg-pulse 2.8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(70,195,255,0.16) 0%, rgba(0,135,255,0.07) 52%, transparent 78%)',
        filter: 'blur(16px)',
        animation: 'reactor-bg-pulse 2.8s ease-in-out infinite 0.7s',
      }} />

      {/* 4 + 5 — Glowing favicon cube + orbital rings */}
      <div style={{
        position: 'absolute', top: '38%', left: '58%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>
        {/* Outer dashed orbit */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', width: 420, height: 420, borderRadius: '50%',
            border: '1px dashed rgba(0,175,255,0.20)',
            boxShadow: '0 0 8px rgba(0,155,255,0.06) inset',
          }} />
        {/* Middle solid orbit */}
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', width: 320, height: 320, borderRadius: '50%',
            border: '1.5px solid rgba(0,195,255,0.25)',
            boxShadow: '0 0 14px rgba(0,175,255,0.12) inset, 0 0 14px rgba(0,175,255,0.10)',
          }} />
        {/* Inner fast orbit */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', width: 218, height: 218, borderRadius: '50%',
            border: '1px solid rgba(80,225,255,0.30)',
            boxShadow: '0 0 10px rgba(60,205,255,0.15) inset',
          }} />

        {/* The glowing favicon cube — /logo-reactor.png is the pre-rendered neon blue PNG */}
        <motion.div
          animate={{ opacity: [0.88, 1, 0.88], scale: [1, 1.03, 1] }}
          transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-reactor.png"
            alt=""
            width={260}
            height={260}
            style={{ objectFit: 'contain', display: 'block' }}
          />
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
