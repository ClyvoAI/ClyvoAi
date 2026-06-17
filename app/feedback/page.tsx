'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { StarRating } from '@/components/clyvo/star-rating'
import { SatisfactionPicker } from '@/components/clyvo/satisfaction-picker'
import type { Satisfaction } from '@/lib/testimonials'

const LOGO_FILTER = 'brightness(0) saturate(100%)'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputStyle = {
  background: 'rgba(245,240,232,0.6)',
  border: '1px solid rgba(201,168,76,0.2)',
  borderRadius: 0,
  padding: '14px 16px',
  fontFamily: 'var(--font-inter)',
  fontSize: '14px',
  fontWeight: 300,
  color: '#1A1A1A',
  width: '100%',
  outline: 'none',
}

const labelStyle = {
  fontFamily: 'var(--font-inter)',
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: '#C9A84C',
  display: 'block',
  marginBottom: '8px',
}

export default function FeedbackPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(0)
  const [satisfaction, setSatisfaction] = useState<Satisfaction | undefined>()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) { setError('Please choose a star rating.'); return }
    if (!satisfaction) { setError('Please choose how satisfied you were.'); return }

    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, rating, satisfaction, quote }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Submission failed')
      }
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-20" style={{ background: '#F5F0E8' }}>
      <Image src="/logo.png" alt="Clyvo AI" width={40} height={40}
        style={{ objectFit: 'contain', filter: LOGO_FILTER, opacity: 0.85 }} />

      <div className="mt-10 w-full max-w-lg">
        {status === 'success' ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 py-16 text-center">
            <CheckCircle className="h-12 w-12 text-[#C9A84C]" />
            <h1 className="font-playfair text-2xl font-semibold italic text-[#1A1A1A]">Thank you</h1>
            <p className="max-w-sm font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
              Your feedback means a lot. We review every submission before it goes live on the site.
            </p>
          </motion.div>
        ) : (
          <>
            <p className="text-center font-inter text-xs font-medium uppercase tracking-[0.2em] text-[#C9A84C]">
              Client Feedback
            </p>
            <h1 className="mt-3 text-center font-playfair text-3xl font-bold italic text-[#1A1A1A]">
              How did we do?
            </h1>
            <p className="mt-3 text-center font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
              Your honest feedback helps us improve — and helps the next business like yours decide if we&apos;re a fit.
            </p>

            <form onSubmit={submit} className="mt-10 space-y-6">
              <div>
                <label style={labelStyle}>Overall rating *</label>
                <StarRating value={rating} onChange={setRating} size={28} />
              </div>

              <div>
                <label style={labelStyle}>How satisfied were you? *</label>
                <SatisfactionPicker value={satisfaction} onChange={setSatisfaction} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    style={inputStyle} placeholder="Yusuf Bhai" />
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                    style={inputStyle} placeholder="Yusuf Bhai Perfumes" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Your Feedback *</label>
                <textarea required rows={4} value={quote} onChange={(e) => setQuote(e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  placeholder="What was your experience working with us?" />
              </div>

              {error && <p className="font-inter text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center"
                style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading'
                  ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Submitting...</>
                  : 'Submit Feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
