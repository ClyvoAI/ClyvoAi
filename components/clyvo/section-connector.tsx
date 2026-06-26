'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface Props {
  fromLabel: string
  toLabel:   string
  height?:   number
}

export function SectionConnector({ fromLabel, toLabel, height = 100 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const pathLength    = useTransform(scrollYProgress, [0.10, 0.70], [0, 1])
  const topOpacity    = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const bottomOpacity = useTransform(scrollYProgress, [0.55, 0.80], [0, 1])

  const W  = 120
  const cx = W / 2
  const y0 = 16
  const y1 = height - 16
  const d  = `M ${cx} ${y0} C ${cx} ${y0 + 30}, ${cx} ${y1 - 30}, ${cx} ${y1}`

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative flex w-full items-center justify-center"
      style={{ height, zIndex: 1 }}
    >
      {/* Narrow SVG column — fixed px dimensions, no scaling artefacts */}
      <svg
        width={W}
        height={height}
        viewBox={`0 0 ${W} ${height}`}
        style={{ position: 'absolute', overflow: 'visible' }}
      >
        <motion.path
          d={d}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 5"
          style={{ pathLength }}
        />
        <motion.circle cx={cx} cy={y0} r="3"  fill="#C9A84C"               style={{ opacity: topOpacity }} />
        <motion.circle cx={cx} cy={y0} r="6"  fill="rgba(201,168,76,0.18)" style={{ opacity: topOpacity }} />
        <motion.circle cx={cx} cy={y1} r="3"  fill="#C9A84C"               style={{ opacity: bottomOpacity }} />
        <motion.circle cx={cx} cy={y1} r="6"  fill="rgba(201,168,76,0.18)" style={{ opacity: bottomOpacity }} />
      </svg>

      {/* Labels — positioned relative to the flex container, not the SVG */}
      <motion.span
        className="absolute top-0 left-1/2 -translate-x-1/2 font-inter text-[8px] uppercase tracking-[0.18em] whitespace-nowrap"
        style={{ color: 'rgba(201,168,76,0.55)', opacity: topOpacity }}
      >
        {fromLabel}
      </motion.span>

      <motion.span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-inter text-[8px] uppercase tracking-[0.18em] whitespace-nowrap"
        style={{ color: 'rgba(201,168,76,0.55)', opacity: bottomOpacity }}
      >
        {toLabel}
      </motion.span>
    </div>
  )
}
