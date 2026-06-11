'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const EMPLOYEE_OPTIONS = [
  '1–10', '10–50', '50–200', '200–500', '500–2000', '2000+'
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', company: '', employees: '', message: '' })

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
          We&apos;ll review your details and be in touch within 24 hours to schedule your discovery call.
        </p>
      </motion.div>
    )
  }

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
    transition: 'border-color 0.2s ease',
  }

  const labelStyle = {
    fontFamily: 'var(--font-inter)',
    fontSize: '10px',
    fontWeight: 500,
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
            style={inputStyle} placeholder="James Richardson"
            onFocus={e => (e.target.style.borderColor = '#C9A84C')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input type="email" value={form.email} onChange={set('email')} required
            style={inputStyle} placeholder="james@company.com"
            onFocus={e => (e.target.style.borderColor = '#C9A84C')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}>Company</label>
          <input type="text" value={form.company} onChange={set('company')}
            style={inputStyle} placeholder="Acme Corporation"
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

      {error && (
        <p className="font-inter text-sm text-red-600">{error}</p>
      )}

      <div className="flex flex-col gap-3">
        <button type="submit" disabled={status === 'loading'} className="btn-primary"
          style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
          {status === 'loading'
            ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending...</>
            : <><span>Send Message</span><ArrowRight className="h-3.5 w-3.5" /></>
          }
        </button>
        <p className="font-inter text-[11px] text-[#8A8A8A]">Free consultation · No commitment</p>
      </div>
    </form>
  )
}
