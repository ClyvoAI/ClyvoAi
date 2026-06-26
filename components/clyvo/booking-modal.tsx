'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, Check, Loader2, Clock, Calendar } from 'lucide-react'

// ── Config ────────────────────────────────────────────────────────────────────
const MEETING_DURATION = 45  // minutes
const TIMEZONE = 'Asia/Kolkata'
const TIMEZONE_LABEL = 'IST (India)'

// Available time slots (24h format) — Mon–Fri only
const TIME_SLOTS = [
  '09:00', '09:45', '10:30', '11:15',
  '12:00', '14:00', '14:45', '15:30',
  '16:15', '17:00', '17:45',
]

const MONTHS = ['January','February','March','April','May','June',
  'July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const EASE = [0.16, 1, 0.3, 1] as const

// ── Helpers ───────────────────────────────────────────────────────────────────
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}
function isPast(date: Date) {
  const today = new Date(); today.setHours(0,0,0,0)
  return date < today
}
function isWeekend(date: Date) {
  const d = date.getDay()
  return d === 0 || d === 6
}
function fmt12(time24: string) {
  const [h, m] = time24.split(':').map(Number)
  const ampm = h < 12 ? 'AM' : 'PM'
  const h12 = h % 12 || 12
  return `${h12}:${m.toString().padStart(2,'0')} ${ampm}`
}
function fmtDate(date: Date) {
  return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface BookingButtonProps {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  onClick?: () => void
}

// ── Global modal state (singleton so any button can open it) ──────────────────
let _setOpen: ((v: boolean) => void) | null = null
export function openBookingModal() { _setOpen?.(true) }

// ── Main booking modal ────────────────────────────────────────────────────────
export function BookingModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1|2|3>(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [error, setError] = useState('')

  const now = new Date()
  const [calYear, setCalYear] = useState(now.getFullYear())
  const [calMonth, setCalMonth] = useState(now.getMonth())

  useEffect(() => { _setOpen = setOpen; return () => { _setOpen = null } }, [])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const reset = () => {
    setStep(1); setSelectedDate(null); setSelectedTime(null)
    setName(''); setEmail(''); setCompany(''); setStatus('idle'); setError('')
  }

  const close = () => { setOpen(false); setTimeout(reset, 400) }

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y-1); setCalMonth(11) }
    else setCalMonth(m => m-1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y+1); setCalMonth(0) }
    else setCalMonth(m => m+1)
  }

  const selectDate = (d: Date) => {
    setSelectedDate(d); setSelectedTime(null); setStep(2)
  }

  const selectTime = (t: string) => {
    setSelectedTime(t); setStep(3)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !name || !email) return
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, company,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          duration: MEETING_DURATION,
          timezone: TIMEZONE,
        }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Booking failed') }
      setStatus('success')
    } catch (err: any) {
      setStatus('error'); setError(err.message || 'Something went wrong.')
    }
  }

  // Calendar grid
  const daysInMonth = getDaysInMonth(calYear, calMonth)
  const firstDay    = getFirstDayOfMonth(calYear, calMonth)
  const calCells    = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : new Date(calYear, calMonth, i - firstDay + 1)
  )

  const inputStyle: React.CSSProperties = {
    background: 'rgba(245,240,232,0.8)',
    border: '1px solid rgba(201,168,76,0.25)',
    padding: '12px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: '#1A1A1A',
    width: '100%',
    outline: 'none',
    borderRadius: 0,
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[200] bg-black/50"
            style={{ backdropFilter: 'blur(4px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              style={{
                background: '#F5F0E8',
                boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
                pointerEvents: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b p-6"
                style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                <div>
                  <p className="eyebrow mb-1">Clyvo AI</p>
                  <h2 className="font-playfair text-2xl font-bold italic text-[#1A1A1A]">
                    Book a Discovery Call
                  </h2>
                  <div className="mt-2 flex items-center gap-3 font-inter text-xs text-[#8A8A8A]">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{MEETING_DURATION} min</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Video / Phone</span>
                    <span>·</span>
                    <span>{TIMEZONE_LABEL}</span>
                  </div>
                </div>
                <button onClick={close} className="p-2 text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2 px-6 pt-4">
                {(['Select Date','Select Time','Your Details'] as const).map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          background: step > i+1 ? '#C9A84C' : step === i+1 ? '#1A1A1A' : 'rgba(26,26,26,0.12)',
                          color: step >= i+1 ? '#F5F0E8' : '#8A8A8A',
                        }}>
                        {step > i+1 ? <Check className="h-2.5 w-2.5" /> : i+1}
                      </div>
                      <span className="font-inter text-[11px] uppercase tracking-wider"
                        style={{ color: step === i+1 ? '#1A1A1A' : '#8A8A8A' }}>
                        {label}
                      </span>
                    </div>
                    {i < 2 && <div className="h-px w-6 bg-[#C9A84C]/20" />}
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="p-6">

                {/* ── STEP 1: Calendar ── */}
                {step === 1 && (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <button onClick={prevMonth} className="p-1.5 hover:text-[#C9A84C] transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="font-syne text-sm font-semibold text-[#1A1A1A]">
                        {MONTHS[calMonth]} {calYear}
                      </span>
                      <button onClick={nextMonth} className="p-1.5 hover:text-[#C9A84C] transition-colors">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                    {/* Day headers */}
                    <div className="mb-2 grid grid-cols-7 text-center">
                      {DAYS.map(d => (
                        <div key={d} className="font-inter text-[10px] uppercase tracking-wider text-[#8A8A8A] py-1">{d}</div>
                      ))}
                    </div>
                    {/* Calendar cells */}
                    <div className="grid grid-cols-7 gap-1">
                      {calCells.map((date, i) => {
                        if (!date) return <div key={`empty-${i}`} />
                        const disabled = isPast(date) || isWeekend(date)
                        const isSelected = selectedDate && isSameDay(date, selectedDate)
                        const isToday = isSameDay(date, now)
                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => !disabled && selectDate(date)}
                            disabled={disabled}
                            className="relative flex h-9 w-full items-center justify-center font-inter text-sm transition-all"
                            style={{
                              background: isSelected ? '#1A1A1A' : isToday ? 'rgba(201,168,76,0.12)' : 'transparent',
                              color: isSelected ? '#F5F0E8' : disabled ? 'rgba(26,26,26,0.2)' : '#1A1A1A',
                              cursor: disabled ? 'not-allowed' : 'pointer',
                              border: isToday && !isSelected ? '1px solid rgba(201,168,76,0.4)' : '1px solid transparent',
                            }}
                            onMouseEnter={e => !disabled && !isSelected && (e.currentTarget.style.background = 'rgba(201,168,76,0.10)')}
                            onMouseLeave={e => !disabled && !isSelected && (e.currentTarget.style.background = 'transparent')}
                          >
                            {date.getDate()}
                          </button>
                        )
                      })}
                    </div>
                    <p className="mt-4 font-inter text-[11px] text-[#8A8A8A]">
                      Weekdays only · All times in {TIMEZONE_LABEL}
                    </p>
                  </div>
                )}

                {/* ── STEP 2: Time slots ── */}
                {step === 2 && selectedDate && (
                  <div>
                    <button onClick={() => setStep(1)}
                      className="mb-4 flex items-center gap-1 font-inter text-xs text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
                      <ChevronLeft className="h-3 w-3" /> Back
                    </button>
                    <p className="mb-4 font-inter text-sm font-medium text-[#1A1A1A]">
                      {fmtDate(selectedDate)}
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {TIME_SLOTS.map(t => (
                        <button
                          key={t}
                          onClick={() => selectTime(t)}
                          className="border py-3 font-inter text-sm transition-all"
                          style={{
                            borderColor: selectedTime === t ? '#1A1A1A' : 'rgba(201,168,76,0.3)',
                            background: selectedTime === t ? '#1A1A1A' : 'rgba(245,240,232,0.6)',
                            color: selectedTime === t ? '#F5F0E8' : '#1A1A1A',
                          }}
                          onMouseEnter={e => selectedTime !== t && (e.currentTarget.style.borderColor = '#C9A84C')}
                          onMouseLeave={e => selectedTime !== t && (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)')}
                        >
                          {fmt12(t)}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 font-inter text-[11px] text-[#8A8A8A]">
                      Duration: {MEETING_DURATION} minutes
                    </p>
                  </div>
                )}

                {/* ── STEP 3: Details form ── */}
                {step === 3 && status !== 'success' && (
                  <form onSubmit={submit}>
                    <button type="button" onClick={() => setStep(2)}
                      className="mb-4 flex items-center gap-1 font-inter text-xs text-[#8A8A8A] hover:text-[#1A1A1A] transition-colors">
                      <ChevronLeft className="h-3 w-3" /> Back
                    </button>

                    {/* Summary */}
                    <div className="mb-5 border-l-2 pl-4" style={{ borderColor: '#C9A84C' }}>
                      <p className="font-inter text-xs text-[#8A8A8A]">Your appointment</p>
                      <p className="font-syne text-sm font-semibold text-[#1A1A1A]">
                        {selectedDate && fmtDate(selectedDate)}
                      </p>
                      <p className="font-inter text-sm text-[#4A4A4A]">
                        {selectedTime && fmt12(selectedTime)} · {MEETING_DURATION} min · {TIMEZONE_LABEL}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="eyebrow mb-1.5 block">Full Name *</label>
                        <input type="text" required value={name} onChange={e => setName(e.target.value)}
                          style={inputStyle} placeholder="Alex Morgan"
                          onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.25)')} />
                      </div>
                      <div>
                        <label className="eyebrow mb-1.5 block">Email Address *</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          style={inputStyle} placeholder="alex@company.com"
                          onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.25)')} />
                      </div>
                      <div>
                        <label className="eyebrow mb-1.5 block">Company</label>
                        <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                          style={inputStyle} placeholder="Meridian Group"
                          onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                          onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.25)')} />
                      </div>
                    </div>

                    {error && <p className="mt-3 font-inter text-sm text-red-600">{error}</p>}

                    <button type="submit" disabled={status === 'loading'} className="btn-primary mt-5 w-full justify-center"
                      style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                      {status === 'loading'
                        ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Confirming...</>
                        : 'Confirm Booking'}
                    </button>
                    <p className="mt-2 text-center font-inter text-[11px] text-[#8A8A8A]">
                      A confirmation will be sent to your email
                    </p>
                  </form>
                )}

                {/* ── SUCCESS ── */}
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                      <Check className="h-7 w-7 text-emerald-500" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold italic text-[#1A1A1A]">
                      Booking Confirmed!
                    </h3>
                    <p className="max-w-sm font-inter text-sm text-[#4A4A4A]">
                      You&apos;re booked for{' '}
                      <strong>{selectedDate && fmtDate(selectedDate)}</strong> at{' '}
                      <strong>{selectedTime && fmt12(selectedTime)} {TIMEZONE_LABEL}</strong>.
                      A confirmation has been sent to <strong>{email}</strong>.
                    </p>
                    <p className="font-inter text-xs text-[#8A8A8A]">
                      We&apos;ll send a calendar invite and a video link before the call.
                    </p>
                    <button onClick={close} className="btn-primary mt-2">Done</button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Drop-in button that opens the modal ──────────────────────────────────────
export function BookingButton({ className, style, children, onClick }: BookingButtonProps) {
  return (
    <button
      type="button"
      onClick={() => { onClick?.(); openBookingModal() }}
      className={className}
      style={style}
    >
      {children}
    </button>
  )
}
