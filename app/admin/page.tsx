'use client'

import { useEffect, useState, useCallback } from 'react'
import { CheckCircle, Clock, XCircle, Trash2, RefreshCw, Users, TrendingUp, Mail, Star, MessageSquare } from 'lucide-react'

type Lead = {
  id: string
  name: string
  email: string
  company: string | null
  employees: string | null
  message: string | null
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'rejected'
  notes: string | null
  source: string
  created_at: string
  updated_at: string | null
}

type Testimonial = {
  id: string
  name: string
  company: string
  rating: 1 | 2 | 3 | 4 | 5
  satisfaction: 1 | 2 | 3 | 4 | 5
  quote: string
  approved: boolean
  createdAt: string
}

const STATUS_CONFIG = {
  new:        { label: 'New',        color: '#C9A84C', bg: 'rgba(201,168,76,0.1)',  icon: Clock },
  contacted:  { label: 'Contacted',  color: '#0066cc', bg: 'rgba(0,102,204,0.1)',   icon: Mail },
  qualified:  { label: 'Qualified',  color: '#10B981', bg: 'rgba(16,185,129,0.1)',  icon: CheckCircle },
  closed:     { label: 'Closed',     color: '#6B7280', bg: 'rgba(107,114,128,0.1)', icon: CheckCircle },
  rejected:   { label: 'Rejected',   color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   icon: XCircle },
}

const SATISFACTION_EMOJI: Record<number, { emoji: string; label: string }> = {
  1: { emoji: '😞', label: 'Unhappy' },
  2: { emoji: '😕', label: 'Could be better' },
  3: { emoji: '🙂', label: 'Satisfied' },
  4: { emoji: '😀', label: 'Very satisfied' },
  5: { emoji: '🤩', label: 'Exceptional' },
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} width={14} height={14} fill={n <= rating ? '#C9A84C' : 'none'} stroke="#C9A84C" strokeWidth={1.5} />
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const [view, setView]         = useState<'leads' | 'testimonials'>('leads')

  const [leads, setLeads]       = useState<Lead[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')
  const [secret, setSecret]     = useState('')
  const [authed, setAuthed]     = useState(false)
  const [filter, setFilter]     = useState<string>('all')
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')

  const [testimonials, setTestimonials]   = useState<Testimonial[]>([])
  const [tLoading, setTLoading]           = useState(false)
  const [tFetched, setTFetched]           = useState(false)
  const [tFilter, setTFilter]             = useState<'all' | 'pending' | 'approved'>('pending')

  const fetchLeads = useCallback(async (s: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads', { headers: { 'x-admin-secret': s } })
      if (res.status === 401) { setError('Invalid admin secret'); setAuthed(false); return }
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setLeads(data)
      setAuthed(true)
    } catch {
      setError('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchTestimonials = useCallback(async (s: string) => {
    setTLoading(true)
    try {
      const res = await fetch('/api/testimonials/admin', { headers: { 'x-admin-secret': s } })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setTestimonials(data)
    } catch {
      // leads tab already surfaces auth errors; keep this one quiet on the badge count
    } finally {
      setTLoading(false)
      setTFetched(true)
    }
  }, [])

  // Lazy-load testimonials the first time that tab is opened — same secret, no re-login
  useEffect(() => {
    if (authed && view === 'testimonials' && !tFetched) {
      fetchTestimonials(secret)
    }
  }, [authed, view, tFetched, secret, fetchTestimonials])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ status }),
    })
    fetchLeads(secret)
  }

  const saveNote = async (id: string) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ notes: noteText }),
    })
    setEditingNote(null)
    fetchLeads(secret)
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead permanently?')) return
    await fetch(`/api/leads/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': secret } })
    fetchLeads(secret)
  }

  const setTestimonialApproval = async (id: string, approved: boolean) => {
    await fetch(`/api/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ approved }),
    })
    fetchTestimonials(secret)
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial permanently?')) return
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': secret } })
    fetchTestimonials(secret)
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const counts = leads.reduce((acc, l) => ({ ...acc, [l.status]: (acc[l.status] || 0) + 1 }), {} as Record<string, number>)

  const tFiltered = testimonials.filter(t =>
    tFilter === 'all' ? true : tFilter === 'approved' ? t.approved : !t.approved
  )
  const pendingCount = testimonials.filter(t => !t.approved).length
  const approvedCount = testimonials.filter(t => t.approved).length
  const avgRating = approvedCount > 0
    ? Math.round((testimonials.filter(t => t.approved).reduce((acc, t) => acc + t.rating, 0) / approvedCount) * 10) / 10
    : null

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#F5F0E8' }}>
        <div style={{ background: '#FFFFFF', padding: 40, width: 360, boxShadow: '0 8px 40px rgba(26,26,26,0.08)' }}>
          <h1 className="font-playfair text-2xl font-bold italic text-[#1A1A1A]">Admin Access</h1>
          <p className="mt-2 font-inter text-sm text-[#8A8A8A]">Enter your admin secret to continue.</p>
          <input type="password" value={secret} onChange={e => setSecret(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchLeads(secret)}
            placeholder="Admin secret"
            className="mt-6 w-full p-3 font-inter text-sm text-[#1A1A1A] outline-none"
            style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(245,240,232,0.5)' }} />
          {error && <p className="mt-2 font-inter text-xs text-red-500">{error}</p>}
          <button onClick={() => fetchLeads(secret)}
            className="btn-primary mt-4 w-full justify-center">
            Access Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F5F0E8' }}>
      {/* Header */}
      <div style={{ background: '#1A1A1A', padding: '16px 32px' }} className="flex items-center justify-between">
        <div>
          <h1 className="font-syne text-lg font-semibold" style={{ color: '#F5F0E8' }}>Clyvo AI</h1>
          <p className="font-inter text-[11px] uppercase tracking-[0.15em]" style={{ color: '#C9A84C' }}>
            {view === 'leads' ? 'Lead Dashboard' : 'Testimonial Dashboard'}
          </p>
        </div>
        <button onClick={() => view === 'leads' ? fetchLeads(secret) : fetchTestimonials(secret)}
          className="flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.12em]" style={{ color: 'rgba(245,240,232,0.5)' }}>
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {/* Tab switcher */}
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="flex gap-2" style={{ borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
          {([
            { id: 'leads' as const,        label: 'Leads',        count: leads.length },
            { id: 'testimonials' as const, label: 'Testimonials', count: pendingCount },
          ]).map(t => (
            <button key={t.id} onClick={() => setView(t.id)}
              className="font-inter text-[12px] uppercase tracking-[0.12em] px-4 py-3 transition-colors"
              style={{
                color: view === t.id ? '#1A1A1A' : '#8A8A8A',
                borderBottom: view === t.id ? '2px solid #C9A84C' : '2px solid transparent',
                marginBottom: -1,
              }}>
              {t.label}{t.id === 'testimonials' && t.count > 0 ? ` (${t.count} pending)` : ''}
            </button>
          ))}
        </div>
      </div>

      {view === 'leads' ? (
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Users,      label: 'Total Leads', value: leads.length,          color: '#1A1A1A' },
              { icon: Clock,      label: 'New',         value: counts.new || 0,        color: '#C9A84C' },
              { icon: TrendingUp, label: 'Qualified',   value: counts.qualified || 0,  color: '#10B981' },
              { icon: Mail,       label: 'Contacted',   value: counts.contacted || 0,  color: '#0066cc' },
            ].map(s => (
              <div key={s.label} style={{ background: '#FFFFFF', padding: 20, boxShadow: '0 1px 3px rgba(26,26,26,0.06)' }}>
                <div className="flex items-center gap-2">
                  <s.icon className="h-4 w-4" style={{ color: s.color }} />
                  <span className="font-inter text-[11px] uppercase tracking-[0.12em] text-[#8A8A8A]">{s.label}</span>
                </div>
                <p className="mt-2 font-syne text-2xl font-bold text-[#1A1A1A]">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="mb-5 flex flex-wrap gap-2">
            {['all', 'new', 'contacted', 'qualified', 'closed', 'rejected'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="font-inter text-[11px] uppercase tracking-[0.12em] px-4 py-2 transition-all"
                style={{
                  background: filter === f ? '#1A1A1A' : 'transparent',
                  color: filter === f ? '#F5F0E8' : '#8A8A8A',
                  border: '1px solid',
                  borderColor: filter === f ? '#1A1A1A' : 'rgba(26,26,26,0.12)',
                }}>
                {f} {f !== 'all' && counts[f] ? `(${counts[f]})` : ''}
              </button>
            ))}
          </div>

          {/* Leads list */}
          {loading ? (
            <p className="font-inter text-sm text-[#8A8A8A]">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="font-inter text-sm text-[#8A8A8A]">No leads found.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map(lead => {
                const cfg = STATUS_CONFIG[lead.status]
                const Icon = cfg.icon
                return (
                  <div key={lead.id} style={{ background: '#FFFFFF', padding: 20, boxShadow: '0 1px 3px rgba(26,26,26,0.06)' }}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-syne font-semibold text-[#1A1A1A]">{lead.name}</h3>
                          <span style={{ background: cfg.bg, color: cfg.color, padding: '2px 10px', fontSize: 10, fontFamily: 'var(--font-inter)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                            {cfg.label}
                          </span>
                        </div>
                        <p className="mt-1 font-inter text-sm text-[#4A4A4A]">{lead.email}</p>
                        {lead.company && <p className="font-inter text-xs text-[#8A8A8A]">{lead.company}{lead.employees ? ` · ${lead.employees} employees` : ''}</p>}
                        {lead.message && (
                          <p className="mt-3 font-inter text-sm font-light leading-[1.7] text-[#4A4A4A]"
                            style={{ borderLeft: '2px solid rgba(201,168,76,0.4)', paddingLeft: 12 }}>
                            {lead.message}
                          </p>
                        )}
                        {lead.notes && (
                          <p className="mt-2 font-inter text-xs text-[#8A8A8A]">📝 {lead.notes}</p>
                        )}
                        <p className="mt-2 font-inter text-[11px] text-[#8A8A8A]">
                          {new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          {' · '}{lead.source}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <select value={lead.status} onChange={e => updateStatus(lead.id, e.target.value)}
                          className="font-inter text-[11px] uppercase tracking-[0.1em] px-3 py-2 outline-none cursor-pointer"
                          style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(245,240,232,0.5)', color: '#1A1A1A' }}>
                          {Object.entries(STATUS_CONFIG).map(([v, c]) => (
                            <option key={v} value={v}>{c.label}</option>
                          ))}
                        </select>
                        <button onClick={() => { setEditingNote(lead.id); setNoteText(lead.notes || '') }}
                          className="font-inter text-[11px] px-3 py-2 transition-colors"
                          style={{ border: '1px solid rgba(201,168,76,0.25)', color: '#8A8A8A' }}>
                          Note
                        </button>
                        <button onClick={() => deleteLead(lead.id)}
                          className="p-2 text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {editingNote === lead.id && (
                      <div className="mt-4 flex gap-2">
                        <input value={noteText} onChange={e => setNoteText(e.target.value)}
                          placeholder="Add a note..."
                          className="flex-1 p-2 font-inter text-sm outline-none"
                          style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(245,240,232,0.5)' }} />
                        <button onClick={() => saveNote(lead.id)} className="btn-primary" style={{ padding: '8px 16px' }}>Save</button>
                        <button onClick={() => setEditingNote(null)} className="btn-ghost" style={{ padding: '7px 16px' }}>Cancel</button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: MessageSquare, label: 'Total',    value: testimonials.length, color: '#1A1A1A' },
              { icon: Clock,         label: 'Pending',  value: pendingCount,        color: '#C9A84C' },
              { icon: CheckCircle,   label: 'Approved',  value: approvedCount,       color: '#10B981' },
              { icon: Star,          label: 'Avg Rating', value: avgRating ?? '—',   color: '#C9A84C' },
            ].map(s => (
              <div key={s.label} style={{ background: '#FFFFFF', padding: 20, boxShadow: '0 1px 3px rgba(26,26,26,0.06)' }}>
                <div className="flex items-center gap-2">
                  <s.icon className="h-4 w-4" style={{ color: s.color }} />
                  <span className="font-inter text-[11px] uppercase tracking-[0.12em] text-[#8A8A8A]">{s.label}</span>
                </div>
                <p className="mt-2 font-syne text-2xl font-bold text-[#1A1A1A]">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="mb-5 flex flex-wrap gap-2">
            {(['pending', 'approved', 'all'] as const).map(f => (
              <button key={f} onClick={() => setTFilter(f)}
                className="font-inter text-[11px] uppercase tracking-[0.12em] px-4 py-2 transition-all"
                style={{
                  background: tFilter === f ? '#1A1A1A' : 'transparent',
                  color: tFilter === f ? '#F5F0E8' : '#8A8A8A',
                  border: '1px solid',
                  borderColor: tFilter === f ? '#1A1A1A' : 'rgba(26,26,26,0.12)',
                }}>
                {f} {f === 'pending' && pendingCount ? `(${pendingCount})` : f === 'approved' && approvedCount ? `(${approvedCount})` : ''}
              </button>
            ))}
          </div>

          {/* Testimonials list */}
          {tLoading ? (
            <p className="font-inter text-sm text-[#8A8A8A]">Loading...</p>
          ) : tFiltered.length === 0 ? (
            <p className="font-inter text-sm text-[#8A8A8A]">
              {tFilter === 'pending' ? 'Nothing pending review.' : 'No testimonials found.'}
            </p>
          ) : (
            <div className="space-y-3">
              {tFiltered.map(t => (
                <div key={t.id} style={{ background: '#FFFFFF', padding: 20, boxShadow: '0 1px 3px rgba(26,26,26,0.06)' }}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-syne font-semibold text-[#1A1A1A]">{t.name}</h3>
                        {t.company && <span className="font-inter text-xs text-[#8A8A8A]">{t.company}</span>}
                        <span style={{
                          background: t.approved ? 'rgba(16,185,129,0.1)' : 'rgba(201,168,76,0.1)',
                          color: t.approved ? '#10B981' : '#C9A84C',
                          padding: '2px 10px', fontSize: 10, fontFamily: 'var(--font-inter)', letterSpacing: '0.12em', textTransform: 'uppercase',
                        }}>
                          {t.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <StarRow rating={t.rating} />
                        <span title={SATISFACTION_EMOJI[t.satisfaction]?.label}>{SATISFACTION_EMOJI[t.satisfaction]?.emoji}</span>
                      </div>
                      <p className="mt-3 font-inter text-sm font-light leading-[1.7] text-[#4A4A4A]"
                        style={{ borderLeft: '2px solid rgba(201,168,76,0.4)', paddingLeft: 12 }}>
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <p className="mt-2 font-inter text-[11px] text-[#8A8A8A]">
                        {new Date(t.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {t.approved ? (
                        <button onClick={() => setTestimonialApproval(t.id, false)}
                          className="font-inter text-[11px] uppercase tracking-[0.1em] px-3 py-2 transition-colors"
                          style={{ border: '1px solid rgba(201,168,76,0.25)', color: '#8A8A8A' }}>
                          Unpublish
                        </button>
                      ) : (
                        <button onClick={() => setTestimonialApproval(t.id, true)}
                          className="btn-primary" style={{ padding: '8px 16px', fontSize: 11 }}>
                          Approve
                        </button>
                      )}
                      <button onClick={() => deleteTestimonial(t.id)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
