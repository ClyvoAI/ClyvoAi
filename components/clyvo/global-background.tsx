'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useIsMobile } from '@/lib/device'

const ParticleCanvas = dynamic(
  () => import('./global-background-canvas'),
  { ssr: false }
)

const GridWaveCanvas = dynamic(
  () => import('./grid-wave'),
  { ssr: false }
)

export function GlobalBackground() {
  const isMobile = useIsMobile()
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setCanvasReady(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Ambient colour orbs — always visible, pure CSS, cheap */}
      <div
        className="animate-float-a absolute"
        style={{
          width: isMobile ? 500 : 900,
          height: isMobile ? 500 : 900,
          top: -250, right: -250,
          background: 'radial-gradient(circle, rgba(0,229,255,0.09) 0%, transparent 70%)',
          filter: 'blur(140px)',
        }}
      />
      <div
        className="animate-float-b absolute"
        style={{
          width: isMobile ? 400 : 700,
          height: isMobile ? 400 : 700,
          bottom: -200, left: -200,
          background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Three.js canvas — desktop only, lazy-mounted after initial render */}
      {!isMobile && canvasReady && (
        <>
          <div
            className="absolute"
            style={{
              width: 500, height: 500, top: '40%', right: '8%',
              background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
          <GridWaveCanvas />
          <div className="absolute inset-0">
            <ParticleCanvas />
          </div>
        </>
      )}
    </div>
  )
}
