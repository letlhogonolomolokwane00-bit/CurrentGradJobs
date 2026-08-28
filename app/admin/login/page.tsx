'use client'

import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError('')
    const { error } = await createClient().auth.signInWithPassword({ email, password })
    if (error) { setError('Invalid email or password.'); setLoading(false); return }
    router.replace('/admin'); router.refresh()
  }
  return <main className="flex min-h-screen items-center justify-center bg-background px-6"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm"><p className="font-serif text-3xl font-black tracking-[-0.08em]">CurrentGradJobs</p><h1 className="mt-10 text-3xl font-bold">Admin sign in</h1><p className="mt-2 text-muted-foreground">Manage the opportunities shown on your site.</p><div className="mt-8 flex flex-col gap-4"><label className="flex flex-col gap-2 text-sm font-medium">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="h-12 rounded-lg border border-input bg-background px-3" /></label><label className="flex flex-col gap-2 text-sm font-medium">Password<input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="h-12 rounded-lg border border-input bg-background px-3" /></label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<button disabled={loading} className="h-12 rounded-lg bg-primary font-semibold text-primary-foreground disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button></div></form></main>
}
