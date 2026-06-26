import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, date, time, duration, timezone } = body

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Name, email, date and time are required.' }, { status: 400 })
    }

    // Save to Supabase bookings table
    const { data, error } = await supabase.from('bookings').insert([{
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      date,
      time,
      duration,
      timezone,
      status: 'confirmed',
      created_at: new Date().toISOString(),
    }]).select().single()

    if (error) {
      console.error('Supabase bookings error:', error)
      return NextResponse.json({ error: 'Failed to save booking.' }, { status: 500 })
    }

    // Send confirmation email via Resend
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const fmt12 = (t: string) => {
        const [h, m] = t.split(':').map(Number)
        return `${h % 12 || 12}:${m.toString().padStart(2,'0')} ${h < 12 ? 'AM' : 'PM'}`
      }
      const dateLabel = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })

      // Confirmation to client
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Clyvo AI <noreply@clyvoai.in>',
          to: email,
          subject: `Discovery Call Confirmed — ${dateLabel} at ${fmt12(time)} IST`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f0e8;padding:24px">
              <div style="background:#1a1a1a;padding:20px 24px;border-radius:4px 4px 0 0">
                <h1 style="color:#c9a84c;font-size:18px;margin:0;letter-spacing:0.05em">CLYVO AI — BOOKING CONFIRMED</h1>
              </div>
              <div style="background:#fff;padding:32px 24px;border-radius:0 0 4px 4px">
                <h2 style="color:#1a1a1a;font-size:22px;margin:0 0 16px;font-family:Georgia,serif;font-style:italic">
                  Your discovery call is booked, ${name.split(' ')[0]}.
                </h2>
                <table style="width:100%;border-collapse:collapse;margin-top:20px">
                  <tr><td style="padding:10px 0;border-bottom:1px solid #f0ebe0;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:100px">Date</td>
                      <td style="padding:10px 0;border-bottom:1px solid #f0ebe0;color:#1a1a1a;font-size:15px">${dateLabel}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid #f0ebe0;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Time</td>
                      <td style="padding:10px 0;border-bottom:1px solid #f0ebe0;color:#1a1a1a;font-size:15px">${fmt12(time)} IST · ${duration} minutes</td></tr>
                  <tr><td style="padding:10px 0;color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Format</td>
                      <td style="padding:10px 0;color:#1a1a1a;font-size:15px">Video / Phone — link will be sent separately</td></tr>
                </table>
                <p style="margin-top:24px;color:#4a4a4a;font-size:14px;line-height:1.7">
                  We&apos;ll reach out before the call with a video link. If you need to reschedule, reply to this email.
                </p>
              </div>
              <p style="text-align:center;color:#8a8a8a;font-size:11px;margin-top:16px">clyvoai.in</p>
            </div>
          `,
        }),
      }).catch(e => console.error('Resend error:', e))

      // Internal notification
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Clyvo AI <noreply@clyvoai.in>',
          to: 'clyvoai@gmail.com',
          subject: `New Booking: ${name} — ${dateLabel} ${fmt12(time)}`,
          html: `<p><strong>${name}</strong> (${email}${company ? `, ${company}` : ''}) booked a call for <strong>${dateLabel} at ${fmt12(time)} IST</strong>.</p>`,
        }),
      }).catch(e => console.error('Internal notify error:', e))
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 })
  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
