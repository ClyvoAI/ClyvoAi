export function SectionWipe({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-0 w-full"
      style={{ height: 120, background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
    />
  )
}
