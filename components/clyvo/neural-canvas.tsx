'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number; y: number
  vx: number; vy: number
  r: number
  pulseOffset: number
}

interface Packet {
  fromNode: number; toNode: number
  progress: number   // 0→1 along the edge
  speed: number
}

const NODE_COUNT  = 38
const EDGE_DIST   = 180   // max px to draw an edge
const MOUSE_REPEL = 120   // px radius mouse repels nodes
const MAX_PACKETS = 14    // simultaneous data packets

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse     = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let animId = 0
    let nodes: Node[] = []
    let packets: Packet[] = []
    let t = 0

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      initNodes()
    }

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.5 + Math.random() * 2,
        pulseOffset: Math.random() * Math.PI * 2,
      }))
    }

    const spawnPacket = () => {
      if (packets.length >= MAX_PACKETS) return
      // pick a random edge that exists
      for (let attempt = 0; attempt < 20; attempt++) {
        const a = Math.floor(Math.random() * nodes.length)
        const b = Math.floor(Math.random() * nodes.length)
        if (a === b) continue
        const dx = nodes[a].x - nodes[b].x
        const dy = nodes[a].y - nodes[b].y
        if (Math.sqrt(dx*dx + dy*dy) < EDGE_DIST) {
          packets.push({ fromNode: a, toNode: b, progress: 0, speed: 0.004 + Math.random() * 0.006 })
          return
        }
      }
    }

    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, W, H)

      // ── Move nodes ──
      nodes.forEach(n => {
        // mouse repel
        const mdx = n.x - mouse.current.x
        const mdy = n.y - mouse.current.y
        const md  = Math.sqrt(mdx*mdx + mdy*mdy)
        if (md < MOUSE_REPEL && md > 0) {
          const force = (MOUSE_REPEL - md) / MOUSE_REPEL * 0.8
          n.vx += (mdx / md) * force
          n.vy += (mdy / md) * force
        }
        // dampen
        n.vx *= 0.98
        n.vy *= 0.98
        n.x  += n.vx
        n.y  += n.vy
        // bounce
        if (n.x < 0)  { n.x = 0;  n.vx = Math.abs(n.vx) }
        if (n.x > W)  { n.x = W;  n.vx = -Math.abs(n.vx) }
        if (n.y < 0)  { n.y = 0;  n.vy = Math.abs(n.vy) }
        if (n.y > H)  { n.y = H;  n.vy = -Math.abs(n.vy) }
      })

      // ── Draw edges ──
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist > EDGE_DIST) continue
          const alpha = (1 - dist / EDGE_DIST) * 0.18
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(201,168,76,${alpha})`
          ctx.lineWidth   = 0.8
          ctx.stroke()
        }
      }

      // ── Draw data packets ──
      packets = packets.filter(p => p.progress <= 1)
      packets.forEach(p => {
        p.progress += p.speed
        if (p.progress > 1) return
        const a  = nodes[p.fromNode]
        const b  = nodes[p.toNode]
        if (!a || !b) return
        const px = a.x + (b.x - a.x) * p.progress
        const py = a.y + (b.y - a.y) * p.progress
        // glowing dot
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 6)
        grd.addColorStop(0, 'rgba(255,200,60,0.9)')
        grd.addColorStop(0.4, 'rgba(255,170,0,0.4)')
        grd.addColorStop(1, 'rgba(255,140,0,0)')
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
      })

      // ── Draw nodes ──
      nodes.forEach(n => {
        const pulse = 0.6 + 0.4 * Math.sin(t * 2 + n.pulseOffset)
        const alpha = 0.25 + 0.35 * pulse
        const grd   = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3)
        grd.addColorStop(0, `rgba(255,190,40,${alpha})`)
        grd.addColorStop(1, 'rgba(201,168,76,0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        // hard dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${0.5 + 0.3 * pulse})`
        ctx.fill()
      })

      // Spawn packets occasionally
      if (Math.random() < 0.04) spawnPacket()

      animId = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -999, y: -999 } }

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  )
}
