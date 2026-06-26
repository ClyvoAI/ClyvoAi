'use client'

import { useEffect } from 'react'

/**
 * Lenis smooth scroll — intercepts discrete USB mouse wheel events and
 * applies eased interpolation so Framer Motion useScroll hooks receive
 * smooth gradual values instead of sudden jumps.
 *
 * Install: npm install lenis
 */
export function SmoothScroll() {
  useEffect(() => {
    let lenis: any
    let rafId: number

    const init = async () => {
      const LenisModule = await import('lenis')
      const Lenis = LenisModule.default

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      })

      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return null
}
