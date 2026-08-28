'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type LinkRow = { id: number; platform: string; url: string; enabled: boolean }
export default function SocialLinksForm({ links }: { links: LinkRow[] }) {
  const router = useRouter(); const [error, setError] = useState(''); const [saving, setSaving] = useState(false)
  async function save(formData: FormData) { setSaving(true); setError(''); const response = await fetch('/api/admin/social-links', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(Object.fromEntries(formData)) }); if (!response.ok) { setError((await response.json()).error ?? 'Could not save link.'); setSaving(false); return } router.refresh(); setSaving(false) }
  return <section className="mt-8 rounded-2xl border border-border bg-card p-6"><h2 className="text-xl font-bold">Social links</h2><p className="mt-1 text-sm text-muted-foreground">Add links that appear in the public footer.</p><div className="mt-5 grid gap-4 sm:grid-cols-3">{['whatsapp','facebook','tiktok'].map(platform => { const link = links.find(item => item.platform === platform); return <form key={platform} action={save} className="flex flex-col gap-3"><input type="hidden" name="platform" value={platform}/><label className="text-sm font-semibold capitalize">{platform}<input name="url" type="url" defaultValue={link?.url ?? ''} placeholder="https://" className="mt-2 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm" /></label><label className="flex items-center gap-2 text-sm"><input name="enabled" type="checkbox" defaultChecked={link?.enabled ?? true}/> Show on website</label><button disabled={saving} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">{saving ? 'Saving…' : 'Save link'}</button></form> })}</div>{error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}</section>
}
