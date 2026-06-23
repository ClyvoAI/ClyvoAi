'use client'

import Image from 'next/image'

// ─── SVG math helpers ────────────────────────────────────────────────────────
const CX = 100, CY = 100

function toRad(deg: number) { return (deg - 90) * Math.PI / 180 }
function pt(r: number, deg: number) {
  return { x: CX + r * Math.cos(toRad(deg)), y: CY + r * Math.sin(toRad(deg)) }
}

/** Single ring segment: arc from r1→r2, angle a0→a1 (degrees CW from top) */
function seg(r1: number, r2: number, a0: number, a1: number): string {
  const o0 = pt(r2, a0), o1 = pt(r2, a1)
  const i1 = pt(r1, a1), i0 = pt(r1, a0)
  const lg = (a1 - a0) > 180 ? 1 : 0
  return [
    `M${o0.x.toFixed(2)},${o0.y.toFixed(2)}`,
    `A${r2},${r2},0,${lg},1,${o1.x.toFixed(2)},${o1.y.toFixed(2)}`,
    `L${i1.x.toFixed(2)},${i1.y.toFixed(2)}`,
    `A${r1},${r1},0,${lg},0,${i0.x.toFixed(2)},${i0.y.toFixed(2)}Z`,
  ].join(' ')
}

/** N evenly spaced ring segments with angular gap */
function ring(n: number, r1: number, r2: number, gap = 5): string[] {
  const step = 360 / n
  return Array.from({ length: n }, (_, i) =>
    seg(r1, r2, i * step + gap / 2, (i + 1) * step - gap / 2)
  )
}

/** Spoke lines from center out */
function spokes(n: number, r0: number, r1: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const a = i * (360 / n)
    const p0 = pt(r0, a), p1 = pt(r1, a)
    return `M${p0.x.toFixed(2)},${p0.y.toFixed(2)}L${p1.x.toFixed(2)},${p1.y.toFixed(2)}`
  })
}

/** Tick marks on a circle */
function ticks(n: number, r: number, len: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const a = i * (360 / n)
    const p0 = pt(r, a), p1 = pt(r + len, a)
    return `M${p0.x.toFixed(2)},${p0.y.toFixed(2)}L${p1.x.toFixed(2)},${p1.y.toFixed(2)}`
  })
}

// ─── Pre-computed paths ──────────────────────────────────────────────────────
const OUTER_SEGS  = ring(8,  68, 82, 6)   // 8 outer segments
const MID_SEGS    = ring(6,  50, 64, 8)   // 6 middle segments
const INNER_SEGS  = ring(3,  34, 46, 10)  // 3 inner triangular segments
const SPOKES      = spokes(6, 22, 68)     // 6 energy spokes
const TICK_MARKS  = ticks(36, 84, 5)      // 36 outer ticks
const INNER_RING  = ring(12, 22, 30, 4)   // 12 inner ring segments

// ─── Component ───────────────────────────────────────────────────────────────
export function ArcReactor() {
  return (
    <div
      className="relative pointer-events-none select-none"
      style={{ width: 200, height: 200 }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes arc-cw   { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
        @keyframes arc-ccw  { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
        @keyframes arc-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1);    }
          50%       { opacity: 1.0; transform: scale(1.08); }
        }
        @keyframes arc-ripple {
          0%   { r: 18; opacity: 0.9; }
          100% { r: 92; opacity: 0;   }
        }
        @keyframes arc-scan {
          0%   { transform: rotate(0deg);   }
          100% { transform: rotate(360deg); }
        }
        .arc-spin-slow    { animation: arc-cw  12s linear infinite; transform-origin: 100px 100px; }
        .arc-spin-mid-ccw { animation: arc-ccw  8s linear infinite; transform-origin: 100px 100px; }
        .arc-spin-inner   { animation: arc-cw   5s linear infinite; transform-origin: 100px 100px; }
        .arc-spin-ticks   { animation: arc-cw  20s linear infinite; transform-origin: 100px 100px; }
        .arc-spin-scan    { animation: arc-scan 3s linear infinite;  transform-origin: 100px 100px; }
      `}</style>

      {/* ── Outer ambient glow (CSS — not SVG so it bleeds past SVG boundary) ── */}
      <div style={{
        position: 'absolute',
        inset: -50,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,180,255,0.30) 0%, rgba(0,80,200,0.12) 40%, transparent 70%)',
        filter: 'blur(22px)',
        animation: 'arc-pulse 2.4s ease-in-out infinite',
        animationDelay: '0s',
      }} />

      {/* ── SVG ── */}
      <svg
        width={200} height={200}
        viewBox="0 0 200 200"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          {/* Blue glow filter */}
          <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="arc-glow-soft" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="arc-core-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Radial gradient for dark reactor background */}
          <radialGradient id="reactor-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#001830" />
            <stop offset="100%" stopColor="#000C1A" />
          </radialGradient>

          {/* Core glow gradient */}
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#DFFFFF" stopOpacity="1" />
            <stop offset="30%"  stopColor="#88EEFF" stopOpacity="0.9" />
            <stop offset="70%"  stopColor="#0099FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0044AA" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dark background disc */}
        <circle cx={CX} cy={CY} r={88} fill="url(#reactor-bg)" />

        {/* Outer border ring */}
        <circle cx={CX} cy={CY} r={88} fill="none" stroke="#0055AA" strokeWidth="1.5" opacity="0.6" />
        <circle cx={CX} cy={CY} r={83} fill="none" stroke="#003377" strokeWidth="0.5" opacity="0.4" />

        {/* Tick marks — slow rotate */}
        <g className="arc-spin-ticks" filter="url(#arc-glow)">
          {TICK_MARKS.map((d, i) => (
            <path key={i} d={d} stroke={i % 3 === 0 ? '#00BBFF' : '#004488'} strokeWidth={i % 3 === 0 ? 1.5 : 0.8} strokeLinecap="round" />
          ))}
        </g>

        {/* Outer segments — slow CW */}
        <g className="arc-spin-slow" filter="url(#arc-glow)">
          {OUTER_SEGS.map((d, i) => (
            <path
              key={i} d={d}
              fill={i % 2 === 0 ? '#003B6E' : '#002850'}
              stroke="#0088CC" strokeWidth="0.8" opacity="0.9"
            />
          ))}
        </g>

        {/* Energy spokes — behind mid ring */}
        <g opacity="0.25">
          {SPOKES.map((d, i) => (
            <path key={i} d={d} stroke="#00BBFF" strokeWidth="0.6" />
          ))}
        </g>

        {/* Middle segments — faster CCW */}
        <g className="arc-spin-mid-ccw" filter="url(#arc-glow)">
          {MID_SEGS.map((d, i) => (
            <path
              key={i} d={d}
              fill={i % 2 === 0 ? '#004E8C' : '#003366'}
              stroke="#00AAEE" strokeWidth="0.8"
            />
          ))}
        </g>

        {/* Inner ring segments — fast CW */}
        <g className="arc-spin-inner" filter="url(#arc-glow)">
          {INNER_SEGS.map((d, i) => (
            <path
              key={i} d={d}
              fill="#0066AA"
              stroke="#55DDFF" strokeWidth="1"
            />
          ))}
        </g>

        {/* Inner micro-ring */}
        <g className="arc-spin-mid-ccw">
          {INNER_RING.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#0099CC" strokeWidth="0.5" opacity="0.6" />
          ))}
        </g>

        {/* Core glow disc */}
        <circle cx={CX} cy={CY} r={22} fill="url(#core-glow)" filter="url(#arc-core-glow)" style={{ animation: 'arc-pulse 1.8s ease-in-out infinite' }} />

        {/* Bright core */}
        <circle cx={CX} cy={CY} r={14} fill="#CCEEFF" opacity="0.95" filter="url(#arc-glow-soft)" />
        <circle cx={CX} cy={CY} r={8}  fill="#FFFFFF" opacity="1" />

        {/* Scanning beam — thin line that sweeps */}
        <g className="arc-spin-scan" opacity="0.15">
          <line x1={CX} y1={CY} x2={CX} y2={CY - 80} stroke="#00EEFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Ripple pulses — CSS would need keyframes on SVG attr, use animateTransform */}
        <circle cx={CX} cy={CY} r={18} fill="none" stroke="#00DDFF" strokeWidth="1" opacity="0">
          <animate attributeName="r"       from="18" to="88"  dur="2.4s" begin="0s"    repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0"  dur="2.4s" begin="0s"    repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r={18} fill="none" stroke="#0088FF" strokeWidth="0.8" opacity="0">
          <animate attributeName="r"       from="18" to="88"  dur="2.4s" begin="1.2s"  repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.4" to="0"  dur="2.4s" begin="1.2s"  repeatCount="indefinite" />
        </circle>
      </svg>

      {/* ── Logo — centered over SVG core ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 22, height: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        filter: 'brightness(0) invert(1)',
        opacity: 0.95,
        zIndex: 2,
      }}>
        <Image src="/logo.png" alt="" width={20} height={20} style={{ objectFit: 'contain' }} />
      </div>
    </div>
  )
}
