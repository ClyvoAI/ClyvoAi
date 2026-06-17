'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home',         label: 'Home' },
  { id: 'solutions',    label: 'Problem' },
  { id: 'services',     label: 'Services' },
  { id: 'work',         label: 'Work' },
  { id: 'how-it-works', label: 'Process' },
  { id: 'about',        label: 'Clients' },
  { id: 'pricing',      label: 'Pricing' },
  { id: 'contact',      label: 'Contact' },
]

export function ScrollDots() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.4 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {SECTIONS.map(({ id, label }) => (
        <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          title={label}
          className="group relative flex items-center justify-end gap-2"
        >
          <span className="hidden font-inter text-[10px] uppercase tracking-[0.12em] text-[#1A1A1A]/40 opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: active === id ? 20 : 6,
              height: 6,
              background: active === id ? '#C9A84C' : 'rgba(26,26,26,0.2)',
            }}
          />
        </button>
      ))}
    </nav>
  )
}
