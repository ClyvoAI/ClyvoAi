'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

interface SectionConnectorProps {
  fromLabel: string
  toLabel: string
  height?: number   // px height of the connector zone, default 120
}

/**
 * Drop at the BOTTOM of a section (before the next one starts).
 * Draws a Bezier path from a labelled node downward as you scroll into it.
 *
 * Usage:
 *   <SectionConnector fromLabel="The Problem" toLabel="What We Build" />
 *
 * The SVG path uses stroke-dashoffset via framer's pathLength so there's
 * zero JS animation loop — it's driven purely by scroll position.
 */
export function SectionConnector({ fromLabel, toLabel, height = 120 }: SectionConnectorProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Path draws as the connector enters the viewport
  const pathLength = useTransform(scrollYProgress, [0.1, 0.75], [0, 1])
  // Nodes and labels fade in slightly after path starts
  const nodeOpacity = useTransform(scrollYProgress, [0.05, 0.30], [0, 1])
  const toLabelOp   = useTransform(scrollYProgress, [0.55, 0.80], [0, 1])

  const cx = '50%'            // horizontal centre
  const startY = 24           // top node Y
  const endY   = height - 24  // bottom node Y
  const midY   = height / 2

  // Cubic Bezier: starts going down, curves slightly left/right, arrives centre
  const path = `M 50% ${startY} C 50% ${midY * 0.6}, 50% ${midY * 1.4}, 50% ${endY}`

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative w-full"
      style={{ height, zIndex: 2, overflow: 'visible' }}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 1 ${height}`}
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
      >
        {/* Glow duplicate — slightly thicker, very low opacity */}
        <motion.line
          x1={cx} y1={startY} x2={cx} y2={endY}
          stroke="rgba(201,168,76,0.12)"
          strokeWidth="8"
          style={{ pathLength }}
        />
        {/* Primary animated path */}
        <motion.path
          d={path}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 6"   // dashed = data-stream feel
          style={{ pathLength }}
        />
        {/* Top node */}
        <motion.circle cx={cx} cy={startY} r="3" fill="#C9A84C" style={{ opacity: nodeOpacity }} />
        <motion.circle cx={cx} cy={startY} r="7" fill="rgba(201,168,76,0.15)" style={{ opacity: nodeOpacity }} />
        {/* Bottom node */}
        <motion.circle cx={cx} cy={endY} r="3" fill="#C9A84C" style={{ opacity: toLabelOp }} />
        <motion.circle cx={cx} cy={endY} r="7" fill="rgba(201,168,76,0.15)" style={{ opacity: toLabelOp }} />
      </svg>

      {/* From label — top */}
      <motion.div
        style={{ opacity: nodeOpacity }}
        className="absolute top-3 left-1/2 -translate-x-1/2 -translate-y-1"
      >
        <span
          className="font-inter text-[9px] uppercase tracking-[0.18em] whitespace-nowrap px-2 py-0.5"
          style={{
            color: '#C9A84C',
            background: 'rgba(245,240,232,0.9)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          {fromLabel}
        </span>
      </motion.div>

      {/* To label — bottom */}
      <motion.div
        style={{ opacity: toLabelOp }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-1"
      >
        <span
          className="font-inter text-[9px] uppercase tracking-[0.18em] whitespace-nowrap px-2 py-0.5"
          style={{
            color: '#C9A84C',
            background: 'rgba(245,240,232,0.9)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          {toLabel}
        </span>
      </motion.div>
    </div>
  )
}
