'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ContactForm } from '@/components/clyvo/contact-form'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, amount: 0.2 } as const

const GLASS = {
  background: 'rgba(255,255,255,0.45)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(201,168,76,0.18)',
  boxShadow: '0 8px 32px rgba(26,26,26,0.06)',
}

const WORDS = ['Your', 'industry', 'knowledge', '+', 'our', 'AI', 'expertise', '=', 'real', 'results.']
const ACCENTS = new Set(['+', '='])

export function FutureScene() {
  return (
    <section id="contact" className="relative overflow-hidden section-padding" style={{ background: '#EDE6D6', paddingBottom: '4rem' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,168,76,0.07) 0%, transparent 70%)',
      }} />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 md:mb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={VP} transition={{ duration: 0.7, ease: EASE }}>
            <div className="flex justify-center">
              <div className="section-divider" />
            </div>
            <span className="eyebrow">What&apos;s Next</span>
          </motion.div>

          <h2 className="mt-5 md:mt-8 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
            {WORDS.map((word, i) => (
              <motion.span key={i}
                className={`mr-[0.2em] inline-block last:mr-0 ${ACCENTS.has(word) ? 'text-gold' : ''}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={VP} transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}>
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={VP} transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mx-auto mt-6 max-w-lg font-inter text-base font-light leading-[1.8] text-[#4A4A4A]">
            Start with a free 45-minute discovery call. No commitment. No hard sell. Just clarity.
          </motion.p>
        </div>

        {/* Two-column: form + info */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_380px]">
          {/* Form — glass */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={VP} transition={{ duration: 0.8, ease: EASE }}
            style={{ ...GLASS }} className="p-6 md:p-10">
            <h3 className="font-syne text-lg font-semibold text-[#1A1A1A]">Book Your Discovery Call</h3>
            <p className="mt-2 font-inter text-sm font-light text-[#8A8A8A]">Free 45-minute consultation · No commitment</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </motion.div>

          {/* Info panel — glass */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={VP} transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="flex flex-col gap-6 md:gap-8 p-6 md:p-8"
            style={{ ...GLASS }}>
            {[
              { num: '01', title: 'Free consultation', desc: 'A 45-minute call to understand your needs — no pitch, no pressure.' },
              { num: '02', title: 'Custom proposal',   desc: 'We scope a solution tailored to your exact operations and budget.' },
              { num: '03', title: 'Fast delivery',     desc: 'Most projects go live in 4–8 weeks. No bloated timelines.' },
            ].map(item => (
              <div key={item.num} className="flex gap-5">
                <span className="font-playfair text-xl font-bold italic text-[#C9A84C]/95">{item.num}</span>
                <div>
                  <h4 className="font-syne text-sm font-semibold text-[#1A1A1A]">{item.title}</h4>
                  <p className="mt-1 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 24 }}>
              <p className="eyebrow mb-3">Or apply directly</p>
              <a href="/apply" className="btn-ghost inline-flex items-center gap-2">
                Submit an Application <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
