'use client'

import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Design decisions:
// - Nodes are TINY (1px dots). The LINES are the network, not the nodes.
// - Higher node count + shorter edge distance = denser, more connected mesh
// - Data packets are the focal motion element — bright, fast, clear
// - Color: deep teal-silver. Not neon green (algae), not gold (brand clash).
//   rgba(160,220,200) reads as "tech/AI" on cream without screaming.
// - All halos removed from nodes. They were creating the blob effect.
// - Mouse interaction: gentle attraction rather than violent repel
// ─────────────────────────────────────────────────────────────────────────────

const NODE_COUNT  = 42       // was 65 — cuts O(n²) edge checks from 4225 to 1764/frame
const EDGE_DIST   = 120      // was 130 — fewer edges per node
const MAX_PACKETS = 20
const SPEED       = 0.28  // node drift speed

const EDGE_COLOR  = '140,200,175'   // teal-silver, works on cream
const NODE_COLOR  = '100,180,155'
const PKT_CORE    = '200,255,230'   // bright mint — packets pop
const PKT_HALO    = '120,210,175'

interface Node { x: number; y: number; vx: number; vy: number }
interface Pkt   { a: number; b: number; t: number; speed: number }

export function NeuralCanvas() {
  const ref   = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let W = 0, H = 0, raf = 0
    let nodes: Node[] = []
    let pkts:  Pkt[]  = []

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }))
      pkts = []
    }

    const spawnPkt = () => {
      if (pkts.length >= MAX_PACKETS) return
      for (let i = 0; i < 30; i++) {
        const a = (Math.random() * nodes.length) | 0
        const b = (Math.random() * nodes.length) | 0
        if (a === b) continue
        const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y
        if (dx*dx + dy*dy < EDGE_DIST * EDGE_DIST) {
          pkts.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.018 })
          return
        }
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      // ── Move nodes ──────────────────────────────────────────────────────
      for (const n of nodes) {
        // Gentle mouse attraction (opposite of repel — feels more organic)
        const dx = mouse.current.x - n.x, dy = mouse.current.y - n.y
        const d2 = dx*dx + dy*dy
        if (d2 < 14400) { // 120px radius
          const d = Math.sqrt(d2)
          n.vx += (dx / d) * 0.018
          n.vy += (dy / d) * 0.018
        }
        n.vx *= 0.97; n.vy *= 0.97
        n.x += n.vx;  n.y += n.vy
        if (n.x < 0)  { n.x = 0;  n.vx *= -1 }
        if (n.x > W)  { n.x = W;  n.vx *= -1 }
        if (n.y < 0)  { n.y = 0;  n.vy *= -1 }
        if (n.y > H)  { n.y = H;  n.vy *= -1 }
      }

      // ── Draw edges (these ARE the network — make them visible) ──────────
      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d2 = dx*dx + dy*dy
          if (d2 > EDGE_DIST * EDGE_DIST) continue
          const alpha = (1 - Math.sqrt(d2) / EDGE_DIST) * 0.28
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(${EDGE_COLOR},${alpha})`
          ctx.lineWidth = 0.9
          ctx.stroke()
        }
      }

      // ── Data packets ────────────────────────────────────────────────────
      pkts = pkts.filter(p => p.t <= 1)
      for (const p of pkts) {
        p.t += p.speed
        if (p.t > 1) continue
        const na = nodes[p.a], nb = nodes[p.b]
        if (!na || !nb) continue
        const px = na.x + (nb.x - na.x) * p.t
        const py = na.y + (nb.y - na.y) * p.t
        // Halo — tight, 3px max so it reads as moving data not floating bubble
        const g = ctx.createRadialGradient(px, py, 0, px, py, 3)
        g.addColorStop(0,   `rgba(${PKT_CORE},0.85)`)
        g.addColorStop(0.6, `rgba(${PKT_HALO},0.20)`)
        g.addColorStop(1,   'transparent')
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, 6.283)
        ctx.fillStyle = g
        ctx.fill()
        // Hard dot
        ctx.beginPath()
        ctx.arc(px, py, 1.2, 0, 6.283)
        ctx.fillStyle = `rgba(${PKT_CORE},1)`
        ctx.fill()
      }

      // ── Nodes — 1px dots, no halos ──────────────────────────────────────
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.2, 0, 6.283)
        ctx.fillStyle = `rgba(${NODE_COLOR},0.55)`
        ctx.fill()
      }

      if (Math.random() < 0.06) spawnPkt()
      raf = requestAnimationFrame(tick)
    }

    // Track mouse via window — throttled to 30fps so it doesn't eat main thread
    let lastMouseUpdate = 0
    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseUpdate < 33) return  // ~30fps cap
      lastMouseUpdate = now
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    // Pause animation when tab is hidden — major CPU/GPU saving
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else { raf = requestAnimationFrame(tick) }
    }

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    resize()
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.65 }}
    />
  )
}
