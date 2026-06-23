import dynamic from 'next/dynamic'
import { Navigation }        from '@/components/clyvo/navigation'
import { HeroContent }       from '@/components/clyvo/hero-content'
import { Footer }            from '@/components/clyvo/footer'
import { GlobalBackground }  from '@/components/clyvo/global-background'
import { CursorGlow }        from '@/components/clyvo/cursor-glow'
import { ScrollDots }        from '@/components/clyvo/scroll-dots'
import { SectionConnector }  from '@/components/clyvo/section-connector'

const ProblemScene        = dynamic(() => import('@/components/clyvo/scenes/problem-scene').then(m => ({ default: m.ProblemScene })))
const TransformationScene = dynamic(() => import('@/components/clyvo/scenes/transformation-scene').then(m => ({ default: m.TransformationScene })))
const PortfolioScene      = dynamic(() => import('@/components/clyvo/scenes/portfolio-scene').then(m => ({ default: m.PortfolioScene })))
const TestimonialScene    = dynamic(() => import('@/components/clyvo/scenes/testimonial-scene').then(m => ({ default: m.TestimonialScene })))
const OperatingLayerScene = dynamic(() => import('@/components/clyvo/scenes/operating-layer-scene').then(m => ({ default: m.OperatingLayerScene })))
const CommandCenterScene  = dynamic(() => import('@/components/clyvo/scenes/command-center-scene').then(m => ({ default: m.CommandCenterScene })))
const ImpactScene         = dynamic(() => import('@/components/clyvo/scenes/impact-scene').then(m => ({ default: m.ImpactScene })))
const FutureScene         = dynamic(() => import('@/components/clyvo/scenes/future-scene').then(m => ({ default: m.FutureScene })))

export default function Home() {
  return (
    <main className="relative" style={{ background: '#F5F0E8' }}>
      <GlobalBackground />
      <CursorGlow />
      <ScrollDots />

      <div className="relative z-10">
        <Navigation />

        <div id="home"><HeroContent /></div>

        <SectionConnector fromLabel="Hero" toLabel="The Problem" />

        <div id="solutions"><ProblemScene /></div>

        <SectionConnector fromLabel="The Problem" toLabel="What We Build" />

        <div id="services"><TransformationScene /></div>

        <SectionConnector fromLabel="Our Services" toLabel="Selected Work" />

        <PortfolioScene />

        <SectionConnector fromLabel="Selected Work" toLabel="Client Feedback" />

        <TestimonialScene />

        <SectionConnector fromLabel="Client Feedback" toLabel="How It Works" />

        <div id="how-it-works"><OperatingLayerScene /></div>

        <SectionConnector fromLabel="Our Process" toLabel="Who We Work With" />

        <div id="about"><CommandCenterScene /></div>

        <SectionConnector fromLabel="Who We Work With" toLabel="Pricing" />

        <div id="pricing"><ImpactScene /></div>

        <SectionConnector fromLabel="Pricing" toLabel="Get Started" />

        <div id="contact"><FutureScene /></div>

        <Footer />
      </div>
    </main>
  )
}
