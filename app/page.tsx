import dynamic from 'next/dynamic'
import { Navigation } from '@/components/clyvo/navigation'
import { HeroContent } from '@/components/clyvo/hero-content'
import { Footer } from '@/components/clyvo/footer'
import { GlobalBackground } from '@/components/clyvo/global-background'
import { SectionWipe } from '@/components/clyvo/section-wipe'
import { CursorGlow } from '@/components/clyvo/cursor-glow'
import { ScrollDots } from '@/components/clyvo/scroll-dots'

const ProblemScene = dynamic(() =>
  import('@/components/clyvo/scenes/problem-scene').then((m) => ({ default: m.ProblemScene }))
)
const TransformationScene = dynamic(() =>
  import('@/components/clyvo/scenes/transformation-scene').then((m) => ({ default: m.TransformationScene }))
)
const OperatingLayerScene = dynamic(() =>
  import('@/components/clyvo/scenes/operating-layer-scene').then((m) => ({ default: m.OperatingLayerScene }))
)
const CommandCenterScene = dynamic(() =>
  import('@/components/clyvo/scenes/command-center-scene').then((m) => ({ default: m.CommandCenterScene }))
)
const ImpactScene = dynamic(() =>
  import('@/components/clyvo/scenes/impact-scene').then((m) => ({ default: m.ImpactScene }))
)
const FutureScene = dynamic(() =>
  import('@/components/clyvo/scenes/future-scene').then((m) => ({ default: m.FutureScene }))
)

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Fixed ambient background — orbs + grid */}
      <GlobalBackground />

      {/* Cursor-follow glow */}
      <CursorGlow />

      {/* Fixed scroll section indicator */}
      <ScrollDots />

      {/* All content above background */}
      <div className="relative z-10">
        {/* Navigation — fixed, floats above everything */}
        <Navigation />

        {/* Hero */}
        <div id="home">
          <HeroContent />
        </div>

        <SectionWipe from="#000000" to="#0a0800" />

        {/* Problem */}
        <div id="solutions">
          <ProblemScene />
        </div>

        <SectionWipe from="#0a0800" to="#00080a" />

        {/* Services */}
        <div id="services">
          <TransformationScene />
        </div>

        <SectionWipe from="#00080a" to="#000a08" />

        {/* How It Works */}
        <div id="how-it-works">
          <OperatingLayerScene />
        </div>

        <SectionWipe from="#000a08" to="#080a00" />

        {/* Who We Work With */}
        <div id="about">
          <CommandCenterScene />
        </div>

        <SectionWipe from="#080a00" to="#00080a" />

        {/* Pricing */}
        <div id="pricing">
          <ImpactScene />
        </div>

        <SectionWipe from="#00080a" to="#000000" />

        {/* Final CTA */}
        <div id="contact">
          <FutureScene />
        </div>

        <Footer />
      </div>
    </main>
  )
}
