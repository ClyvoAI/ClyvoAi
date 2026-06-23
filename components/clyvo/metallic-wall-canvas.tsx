'use client'

import { useEffect, useRef } from 'react'

/**
 * Renders a convincing titanium/steel wall texture to a canvas.
 * Technique: layered canvas 2D ops (no pixel loop) — GPU-composited.
 * Runs once on mount; static thereafter. No animation, no RAF.
 */
export function MetallicWallCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const W = canvas.width  = 1440
    const H = canvas.height = 900
    const ctx = canvas.getContext('2d')!

    // ── 1. Base: dark gunmetal gradient ──────────────────────────────────
    const base = ctx.createLinearGradient(0, 0, W, H)
    base.addColorStop(0.00, '#18191E')
    base.addColorStop(0.35, '#1E2028')
    base.addColorStop(0.65, '#1A1C22')
    base.addColorStop(1.00, '#101214')
    ctx.fillStyle = base
    ctx.fillRect(0, 0, W, H)

    // ── 2. Anisotropic metal grain (horizontal brushed titanium) ─────────
    // Real titanium has directional grain from manufacturing.
    // Simulate with tightly-spaced horizontal lines at micro-random opacity.
    ctx.globalCompositeOperation = 'screen'
    for (let y = 0; y < H; y++) {
      const t     = y / H
      const grain = Math.sin(y * 1.1) * 0.4 + Math.sin(y * 3.7) * 0.2 + Math.sin(y * 11.3) * 0.1
      const alpha = Math.max(0, Math.min(0.06, 0.025 + grain * 0.018))
      ctx.strokeStyle = `rgba(180,200,220,${alpha.toFixed(4)})`
      ctx.lineWidth   = 0.5 + (Math.abs(Math.sin(y * 0.7))) * 0.5
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
    }
    ctx.globalCompositeOperation = 'source-over'

    // ── 3. Reactor illumination — brightens wall near cube (58%, 38%) ────
    const RX = W * 0.58, RY = H * 0.38
    const reactorGlow = ctx.createRadialGradient(RX, RY, 0, RX, RY, 620)
    reactorGlow.addColorStop(0.00, 'rgba(0,160,255,0.16)')
    reactorGlow.addColorStop(0.25, 'rgba(0,100,200,0.08)')
    reactorGlow.addColorStop(0.55, 'rgba(0,40,120,0.04)')
    reactorGlow.addColorStop(1.00, 'transparent')
    ctx.fillStyle = reactorGlow
    ctx.fillRect(0, 0, W, H)

    // ── 4. Panel grid — dark seams + bright edge (recessed look) ────────
    const COLS = Math.ceil(W / 185), ROWS = Math.ceil(H / 128)
    for (let c = 1; c < COLS; c++) {
      const x = c * 185
      // seam shadow
      ctx.strokeStyle = 'rgba(0,0,0,0.70)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      // recessed top highlight (left edge of seam catches light)
      ctx.strokeStyle = 'rgba(255,255,255,0.055)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(x - 1, 0); ctx.lineTo(x - 1, H); ctx.stroke()
    }
    for (let r = 1; r < ROWS; r++) {
      const y = r * 128
      ctx.strokeStyle = 'rgba(0,0,0,0.65)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      ctx.strokeStyle = 'rgba(255,255,255,0.040)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(0, y - 1); ctx.lineTo(W, y - 1); ctx.stroke()
    }

    // ── 5. Rivets at panel intersections ─────────────────────────────────
    for (let c = 1; c < COLS; c++) {
      for (let r = 1; r < ROWS; r++) {
        const rx = c * 185, ry = r * 128
        // Rivet body: dark recessed hole
        const g = ctx.createRadialGradient(rx, ry, 0, rx, ry, 5)
        g.addColorStop(0,   'rgba(0,0,0,0.90)')
        g.addColorStop(0.5, 'rgba(15,18,22,0.70)')
        g.addColorStop(1,   'rgba(30,35,42,0.00)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(rx, ry, 5, 0, Math.PI * 2); ctx.fill()
        // Rivet specular — upper-left highlight from reactor-side light
        ctx.fillStyle = 'rgba(180,200,220,0.18)'
        ctx.beginPath(); ctx.arc(rx - 1.2, ry - 1.2, 1.8, 0, Math.PI * 2); ctx.fill()
      }
    }

    // ── 6. Rust stains at fracture stress points ──────────────────────────
    const rustPoints = [
      { x: 295, y: 155, rx: 55, ry: 40 },
      { x: 265, y: 710, rx: 60, ry: 45 },
      { x: 1185, y: 200, rx: 48, ry: 36 },
      { x: 1338, y: 715, rx: 52, ry: 40 },
      { x: 820,  y: 120, rx: 30, ry: 24 },
      { x: 478,  y: 636, rx: 22, ry: 16 },
    ]
    rustPoints.forEach(({ x, y, rx, ry }) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(rx, ry)
      const rg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1)
      rg.addColorStop(0.00, 'rgba(130,55,14,0.55)')
      rg.addColorStop(0.40, 'rgba(100,40,10,0.28)')
      rg.addColorStop(0.75, 'rgba(70,28,8,0.12)')
      rg.addColorStop(1.00, 'transparent')
      ctx.fillStyle = rg
      ctx.beginPath(); ctx.arc(0, 0, 1, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
    })

    // ── 7. Micro surface scratches ────────────────────────────────────────
    ctx.strokeStyle = 'rgba(200,215,225,0.06)'; ctx.lineWidth = 0.4
    ;[
      [130,95,  290,115], [1100,80, 1210,95], [55, 340, 185,355],
      [1310,295,1400,310],[360,770, 470,755], [910,830, 980,815],
    ].forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
    })

    // ── 8. Final vignette ────────────────────────────────────────────────
    const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85)
    vig.addColorStop(0,   'transparent')
    vig.addColorStop(1,   'rgba(0,0,0,0.72)')
    ctx.fillStyle = vig
    ctx.fillRect(0, 0, W, H)

    // Bottom darkening — so hero-to-cream transition looks intentional
    const btm = ctx.createLinearGradient(0, H * 0.6, 0, H)
    btm.addColorStop(0, 'transparent')
    btm.addColorStop(1, 'rgba(0,0,0,0.55)')
    ctx.fillStyle = btm
    ctx.fillRect(0, H * 0.6, W, H * 0.4)

  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ width: '100%', height: '100%', imageRendering: 'auto' }}
    />
  )
}
