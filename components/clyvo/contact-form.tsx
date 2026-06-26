'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { openBookingModal } from '@/components/clyvo/booking-modal'

const EASE = [0.16, 1, 0.3, 1] as const

const EMPLOYEE_OPTIONS = [
  '1–10', '10–50', '50–200', '200–500', '500–2000', '2000+'
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', employees: '', message: '' })
  const [termsAccepted, setTermsAccepted] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact-form' }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Submission failed')
      }
      setStatus('success')
      // Open Calendly so they can book right after submitting
      setTimeout(() => openBookingModal(), 600)
    } catch (err: any) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 py-16 text-center">
        <CheckCircle className="h-12 w-12 text-[#C9A84C]" />
        <h3 className="font-playfair text-2xl font-semibold italic text-[#1A1A1A]">Message Received</h3>
        <p className="max-w-sm font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
          We&apos;ll review your details and be in touch within 24 hours.
        </p>
        <button onClick={openCalendly} className="btn-primary">
          Book Your Call Now <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    )
  }

  const inputStyle = {
    background: 'rgba(245,240,232,0.6)',
    border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: 0,
    padding: '14px 16px',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    fontWeight: 400,
    color: '#1A1A1A',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#C9A84C',
    display: 'block',
    marginBottom: '6px',
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input type="text" value={form.name} onChange={set('name')} required
            style={inputStyle} placeholder="Alex Morgan"
            onFocus={e => (e.target.style.borderColor = '#C9A84C')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input type="email" value={form.email} onChange={set('email')} required
            style={inputStyle} placeholder="alex@company.com"
            onFocus={e => (e.target.style.borderColor = '#C9A84C')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}>Company</label>
          <input type="text" value={form.company} onChange={set('company')}
            style={inputStyle} placeholder="Meridian Group"
            onFocus={e => (e.target.style.borderColor = '#C9A84C')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
        <div>
          <label style={labelStyle}>Company Size</label>
          <select value={form.employees} onChange={set('employees')}
            style={{ ...inputStyle, cursor: 'pointer' }}
            onFocus={e => (e.target.style.borderColor = '#C9A84C')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}>
            <option value="">Select range</option>
            {EMPLOYEE_OPTIONS.map(o => <option key={o} value={o}>{o} employees</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Tell Us About Your Needs</label>
        <textarea value={form.message} onChange={set('message')} rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Describe your current processes and what you're hoping to automate or improve..."
          onFocus={e => (e.target.style.borderColor = '#C9A84C')}
          onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
      </div>

      {error && <p className="font-inter text-sm text-red-600">{error}</p>}

      <div className="flex flex-col gap-3">
        {/* Terms checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={termsAccepted}
            onChange={e => setTermsAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#C9A84C]"
          />
          <span className="font-inter text-[11px] leading-[1.7] text-[#4A4A4A]">
            I agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer"
              className="text-[#C9A84C] hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer"
              className="text-[#C9A84C] hover:underline">Privacy Policy</a>.
            I understand Clyvo AI retains IP ownership of all deliverables.
          </span>
        </label>

        <button type="submit" disabled={status === 'loading' || !termsAccepted} className="btn-primary"
          style={{ opacity: (status === 'loading' || !termsAccepted) ? 0.5 : 1 }}>
          {status === 'loading'
            ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending...</>
            : <><span>Send Message</span><ArrowRight className="h-3.5 w-3.5" /></>
          }
        </button>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#8A8A8A' }}>
          Free consultation · No commitment
        </p>
      </div>
    </form>
  )
}
