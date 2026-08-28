'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Job = { id?: number; title?: string; company?: string; location?: string; job_type?: string; closing_date?: string; apply_url?: string; is_new?: boolean }
export default function JobForm({ job }: { job?: Job }) {
  const router = useRouter(); const [error, setError] = useState(''); const [saving, setSaving] = useState(false)
  async function submit(formData: FormData) { setSaving(true); setError(''); const response = await fetch(job?.id ? `/api/admin/jobs/${job.id}` : '/api/admin/jobs', { method: job?.id ? 'PATCH' : 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(Object.fromEntries(formData)) }); if (!response.ok) { setError((await response.json()).error ?? 'Could not save job.'); setSaving(false); return } router.push('/admin'); router.refresh() }
  return <form action={submit} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6"><div className="grid gap-5 sm:grid-cols-2">{[['title','Job title'],['company','Company'],['location','Location'],['job_type','Job type'],['closing_date','Closing date'],['apply_url','Apply URL']].map(([name,label]) => <label key={name} className="flex flex-col gap-2 text-sm font-medium">{label}<input name={name} required={name !== 'closing_date'} defaultValue={job?.[name as keyof Job] as string ?? ''} type={name === 'closing_date' ? 'date' : name === 'apply_url' ? 'url' : 'text'} className="h-11 rounded-lg border border-input bg-background px-3" /></label>)}</div><label className="flex items-center gap-3 text-sm font-medium"><input name="is_new" type="checkbox" defaultChecked={job?.is_new ?? true} className="size-4" /> Mark as new</label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<button disabled={saving} className="h-11 rounded-lg bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60">{saving ? 'Saving…' : job?.id ? 'Update job' : 'Add job'}</button></form>
}
