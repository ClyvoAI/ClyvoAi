import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const EASE_OUT       = [0.16, 1, 0.3, 1]  as const
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const

// ─── Shared stagger-reveal variants ──────────────────────────────────────────
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
}

export const STAGGER_VIEWPORT = { once: true, margin: '-100px' } as const
