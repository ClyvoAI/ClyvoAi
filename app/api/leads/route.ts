import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

async function sendLeadNotification(lead: {
  name: string
  email: string
  company?: string | null
  employees?: string | null
  message?: string | null
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Clyvo AI <noreply@clyvoai.in>',
      to: 'clyvoai@gmail.com',
      subject: `New Lead: ${lead.name}${lead.company ? ` — ${lead.company}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f5f0e8;">
          <div style="background: #1a1a1a; padding: 20px 24px; border-radius: 4px 4px 0 0;">
            <h1 style="color: #c9a84c; font-size: 18px; margin: 0; letter-spacing: 0.05em;">NEW LEAD — CLYVO AI</h1>
          </div>
          <div style="background: #ffffff; padding: 24px; border-radius: 0 0 4px 4px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe0; color: #8a8a8a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 130px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe0; color: #1a1a1a; font-size: 15px;">${lead.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe0; color: #8a8a8a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe0; color: #1a1a1a; font-size: 15px;">
                  <a href="mailto:${lead.email}" style="color: #c9a84c;">${lead.email}</a>
                </td>
              </tr>
              ${lead.company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe0; color: #8a8a8a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe0; color: #1a1a1a; font-size: 15px;">${lead.company}</td>
              </tr>` : ''}
              ${lead.employees ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe0; color: #8a8a8a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Company Size</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe0; color: #1a1a1a; font-size: 15px;">${lead.employees}</td>
              </tr>` : ''}
              ${lead.message ? `
              <tr>
                <td style="padding: 10px 0; color: #8a8a8a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-size: 15px; line-height: 1.6;">${lead.message}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f0ebe0;">
              <a href="https://clyvoai.in/admin" style="background: #1a1a1a; color: #f5f0e8; padding: 10px 20px; text-decoration: none; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">
                View in Admin →
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #8a8a8a; font-size: 11px; margin-top: 16px;">clyvoai.in</p>
        </div>
      `,
    }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, employees, message, source } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const { data, error } = await supabase.from('leads').insert([{
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      employees: employees || null,
      message: message?.trim() || null,
      source: source || 'website',
      status: 'new',
      created_at: new Date().toISOString(),
    }]).select().single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    // Send email notification (non-blocking — don't fail the request if email fails)
    sendLeadNotification({ name, email, company, employees, message }).catch(err =>
      console.error('Email notification error:', err)
    )

    return NextResponse.json({ success: true, id: data.id }, { status: 201 })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Admin-only endpoint — protected by secret header
  const secret = req.headers.get('x-admin-secret')
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
