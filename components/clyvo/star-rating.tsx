'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  size?: number
}

export function StarRating({ value, onChange, size = 20 }: StarRatingProps) {
  const interactive = typeof onChange === 'function'

  return (
    <div
      className="inline-flex items-center gap-1"
      role={interactive ? 'radiogroup' : undefined}
      aria-label="Rating"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-pressed={interactive ? value === n : undefined}
          style={{ cursor: interactive ? 'pointer' : 'default', lineHeight: 0, background: 'none', border: 'none', padding: 0 }}
        >
          <Star width={size} height={size} fill={n <= value ? '#C9A84C' : 'none'} stroke="#C9A84C" strokeWidth={1.5} />
        </button>
      ))}
    </div>
  )
}
