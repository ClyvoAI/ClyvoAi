'use client'

import { SATISFACTION_EMOJI, type Satisfaction } from '@/lib/testimonials'

interface SatisfactionPickerProps {
  value?: Satisfaction
  onChange: (value: Satisfaction) => void
}

const LEVELS: Satisfaction[] = [1, 2, 3, 4, 5]

export function SatisfactionPicker({ value, onChange }: SatisfactionPickerProps) {
  return (
    <div className="flex items-center gap-2">
      {LEVELS.map((level) => {
        const { emoji, label } = SATISFACTION_EMOJI[level]
        const active = value === level
        return (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className="flex h-11 w-11 items-center justify-center text-xl transition-all duration-200"
            style={{
              border: `1px solid ${active ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
              background: active ? 'rgba(201,168,76,0.1)' : 'rgba(245,240,232,0.6)',
              transform: active ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            {emoji}
          </button>
        )
      })}
    </div>
  )
}
