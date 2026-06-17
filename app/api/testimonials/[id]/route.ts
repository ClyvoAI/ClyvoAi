import { NextRequest, NextResponse } from 'next/server'
import { setTestimonialApproval, deleteTestimonial } from '@/lib/testimonials'

export const dynamic = 'force-dynamic'

function isAuthorized(req: NextRequest) {
  return req.headers.get('x-admin-secret') === process.env.ADMIN_SECRET
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const approved = Boolean(body?.approved)
    await setTestimonialApproval(params.id, approved)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Testimonial approval error:', err)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await deleteTestimonial(params.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Testimonial delete error:', err)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
