import { NextResponse } from 'next/server'
import { createClient, getAdminUser } from '@/lib/supabase/server'

export async function POST(request: Request) {
  if (!await getAdminUser()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => null)
  const platform = typeof body?.platform === 'string' ? body.platform : ''
  const url = typeof body?.url === 'string' ? body.url.trim() : ''
  if (!['whatsapp','facebook','tiktok'].includes(platform) || !/^https:\/\//i.test(url) || url.length > 500) return NextResponse.json({ error: 'Enter a valid HTTPS link.' }, { status: 400 })
  const supabase = await createClient()
  const { error } = await supabase.from('social_links').upsert({ platform, url, enabled: body?.enabled === true || body?.enabled === 'on', updated_at: new Date().toISOString() }, { onConflict: 'platform' })
  if (error) return NextResponse.json({ error: 'Could not save the link.' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
