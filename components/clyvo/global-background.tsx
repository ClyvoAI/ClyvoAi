'use client'

// Static background orbs — no animation, no blur filter
// Animated blur filters on fixed elements cause scroll jank on all devices
export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div style={{
        position: 'absolute', width: '55vw', height: '55vw',
        top: '-15vw', right: '-15vw',
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', width: '45vw', height: '45vw',
        bottom: '-10vw', left: '-10vw',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
      }} />
    </div>
  )
}
