'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home',         label: 'Home' },
  { id: 'solutions',    label: 'Problem' },
  { id: 'services',     label: 'Services' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'about',        label: 'About' },
  { id: 'pricing',      label: 'Pricing' },
  { id: 'contact',      label: 'Contact' },
]

export function ScrollDots() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const elements = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          type="button"
          aria-label={`Scroll to ${s.label}`}
          onClick={() => scrollToSection(s.id)}
          className="flex h-4 w-4 items-center justify-center"
        >
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: 6,
              height: 6,
              backgroundColor: i === active ? '#ffffff' : 'rgba(255,255,255,0.20)',
              transform: i === active ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        </button>
      ))}
    </div>
  )
}
