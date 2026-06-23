'use client'

import { useEffect, useRef } from 'react'

/**
 * Site-wide fixed background layer.
 * Renders three slowly-drifting radial orbs in cyberpunk cyan + electric violet.
 * z-index: 0 — sits behind all content, above nothing.
 * All motion is CSS-only (no JS RAF) so it has zero runtime cost.
 */
export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">

      {/* ── Orb 1: primary cyan — top-right drift ── */}
      <div style={{
        position: 'absolute',
        width: '60vw', height: '60vw',
        top: '-20vw', right: '-10vw',
        background: 'radial-gradient(circle, rgba(0,210,255,0.10) 0%, rgba(0,150,220,0.04) 45%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'orb-drift-a 18s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* ── Orb 2: electric violet — bottom-left drift ── */}
      <div style={{
        position: 'absolute',
        width: '50vw', height: '50vw',
        bottom: '-15vw', left: '-10vw',
        background: 'radial-gradient(circle, rgba(130,0,255,0.08) 0%, rgba(80,0,180,0.03) 50%, transparent 72%)',
        filter: 'blur(50px)',
        animation: 'orb-drift-b 22s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* ── Orb 3: mid-page accent — roams centre ── */}
      <div style={{
        position: 'absolute',
        width: '40vw', height: '40vw',
        top: '35vh', left: '30vw',
        background: 'radial-gradient(circle, rgba(0,255,200,0.06) 0%, rgba(0,180,150,0.02) 55%, transparent 75%)',
        filter: 'blur(60px)',
        animation: 'orb-drift-c 28s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* ── Scanline overlay — subtle horizontal lines for depth ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,210,255,0.012) 3px, rgba(0,210,255,0.012) 4px)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
