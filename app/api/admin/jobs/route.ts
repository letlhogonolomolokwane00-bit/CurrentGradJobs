import { NextResponse } from 'next/server'
import { createClient, getAdminUser } from '@/lib/supabase/server'
import { validateJobPayload } from '@/lib/adminJobValidation'

export async function POST(request: Request) {
  if (!await getAdminUser()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const result = validateJobPayload(await request.json())
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 })
    const { error } = await (await createClient()).from('jobs').insert(result.payload)
    if (error) {
      console.error('[v0] Job insert failed:', error.code)
      return NextResponse.json({ error: 'Unable to save this job.' }, { status: 400 })
    }
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
