import { NextResponse } from 'next/server'
import { createClient, getAdminUser } from '@/lib/supabase/server'
import { validateJobPayload } from '@/lib/adminJobValidation'

async function authorizedId(id: string) {
  if (!await getAdminUser()) return null
  return /^\d+$/.test(id) ? Number(id) : null
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const jobId = await authorizedId(id)
  if (jobId === null) return NextResponse.json({ error: 'Unauthorized or invalid job ID.' }, { status: 401 })
  try {
    const result = validateJobPayload(await request.json())
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 })
    const { error } = await (await createClient()).from('jobs').update(result.payload).eq('id', jobId)
    if (error) { console.error('[v0] Job update failed:', error.code); return NextResponse.json({ error: 'Unable to update this job.' }, { status: 400 }) }
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const jobId = await authorizedId(id)
  if (jobId === null) return NextResponse.json({ error: 'Unauthorized or invalid job ID.' }, { status: 401 })
  const { error } = await (await createClient()).from('jobs').delete().eq('id', jobId)
  if (error) { console.error('[v0] Job delete failed:', error.code); return NextResponse.json({ error: 'Unable to delete this job.' }, { status: 400 }) }
  return NextResponse.json({ ok: true })
}
