'use client'

import { useScroll, useTransform, useMotionValueEvent } from 'motion/react'

// Section background stops — keyed to overall page scroll progress
const STOPS    = [0,          0.15,        0.30,        0.45,        0.60,        0.75,        0.90,        1.00]
const COLORS   = ['#000000', '#000000', '#0a0800', '#00080a', '#000a08', '#080a00', '#00080a', '#000000']

export function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  const bg = useTransform(scrollYProgress, STOPS, COLORS)

  useMotionValueEvent(bg, 'change', (latest) => {
    document.body.style.backgroundColor = latest
  })

  return null
}
