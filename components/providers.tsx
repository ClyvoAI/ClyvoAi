'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollBackground } from '@/components/clyvo/scroll-background'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Disable Lenis smooth scroll on mobile — causes jank on iOS/Android
    if (window.innerWidth < 768) return

    let lenis: { raf: (t: number) => void; on: (event: string, cb: () => void) => void; destroy: () => void } | null = null
    let rafId: number

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      } as ConstructorParameters<typeof Lenis>[0])

      lenis.on('scroll', () => ScrollTrigger.update())

      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      function raf(time: number) {
        rafId = requestAnimationFrame(raf)
        void time
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      gsap.ticker.remove((time) => { lenis?.raf(time * 1000) })
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <>
      <ScrollBackground />
      {children}
    </>
  )
}
