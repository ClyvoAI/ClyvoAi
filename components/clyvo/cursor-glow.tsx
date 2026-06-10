'use client'

import { useEffect, useRef } from 'react'
import { useIsMobile } from '@/lib/device'

export function CursorGlow() {
  const isMobile = useIsMobile()
  const glowRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return

    function handleMove(e: MouseEvent) {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMove)

    let rafId: number
    function tick() {
      current.current.x += (target.current.x - current.current.x) * 0.1
      current.current.y += (target.current.y - current.current.y) * 0.1
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full md:block"
      style={{
        background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}
