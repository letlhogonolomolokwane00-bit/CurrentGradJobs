import { BriefcaseBusiness, CalendarDays, Search } from 'lucide-react'
import supabase, { isSupabaseConfigured } from '@/lib/supabaseClient'
import JobFilters from './JobFilters'
import SocialLinks from './SocialLinks'

export const dynamic = 'force-dynamic'

type Job = { title: string; company: string; location: string; closing_date: string | null; apply_url: string; is_new: boolean | null; job_type: string | null }
type SocialLink = { platform: string; url: string; enabled: boolean }

async function getSocialLinks(): Promise<SocialLink[]> {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase.from('social_links').select('platform, url, enabled').eq('enabled', true)
  if (error) { console.error('[v0] Failed to fetch social links:', error.message); return [] }
  return (data ?? []) as SocialLink[]
}

async function getJobs(): Promise<Job[]> {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase.from('jobs').select('title, company, location, closing_date, apply_url, is_new, job_type').order('created_at', { ascending: false })
  if (error) { console.error('[v0] Failed to fetch jobs:', error.message); return [] }
  return (data ?? []) as Job[]
}

function Logo() { return <a href="#top" className="font-serif text-2xl font-black tracking-[-0.08em] text-primary-foreground sm:text-3xl">CurrentGradJobs<span className="mt-1 block space-y-1" aria-hidden="true"><span className="block h-0.5 bg-primary-foreground" /><span className="block h-0.5 bg-primary-foreground" /></span></a> }


export default async function Page() {
  const [jobs, socialLinks] = await Promise.all([getJobs(), getSocialLinks()])
  return <main id="top" className="min-h-screen bg-background text-foreground"><section className="bg-primary text-primary-foreground"><header className="border-b border-primary-foreground/15"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8"><Logo /><nav className="flex items-center gap-4 text-sm font-semibold sm:gap-8 sm:text-base" aria-label="Main navigation"><a href="#jobs">Jobs</a><a href="#jobs">Internships</a><a href="#jobs">Learnerships</a><a href="#about">About</a></nav></div></header><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 px-6 py-14 md:flex-row lg:px-8 lg:py-20"><div className="max-w-xl"><h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">Find Opportunities.<br />Build Your Future.</h1><p className="mt-6 max-w-lg text-lg leading-7 text-primary-foreground/85">Curated jobs, internships, and learnerships for students and graduates. Apply directly to top companies.</p><a href="#jobs" className="mt-7 inline-flex items-center gap-3 rounded-lg bg-primary-foreground px-5 py-3 text-base font-semibold text-primary"><Search className="size-5" aria-hidden="true" />Browse All Opportunities</a></div><div className="w-full max-w-xs md:max-w-sm" aria-label="Suitcase and graduation cap illustration"><svg viewBox="0 0 300 210" className="w-full" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="36" y="53" width="157" height="111" rx="18" /><path d="M83 53V38c0-10 8-18 18-18h28c10 0 18 8 18 18v15M37 109l77 19 78-19M106 121h17v23h-17z" /><path d="m151 111 67-39 67 39-67 39-67-39Z" /><path d="M245 127v40M218 151c0 23 16 35 35 35s35-12 35-35" /></svg></div></div></section><section id="jobs" className="mx-auto flex max-w-6xl flex-col gap-7 px-6 py-6 sm:py-10 lg:px-8"><div className="flex flex-col gap-2"><h2 className="text-3xl font-bold tracking-tight">Latest Opportunities</h2><p className="text-base text-muted-foreground">Hand-picked opportunities, updated regularly.</p></div><JobFilters jobs={jobs} /></section><footer id="about" className="bg-primary px-6 py-12 text-primary-foreground lg:px-8"><div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3"><div><Logo /><p className="mt-5 max-w-xs text-sm leading-6 text-primary-foreground/80">A simple, curated job directory for students and graduates. We connect you to opportunities — you apply directly.</p></div><div><h3 className="font-bold">Quick Links</h3><nav className="mt-4 flex flex-col gap-2 text-sm text-primary-foreground/80"><a href="#jobs">Jobs</a><a href="#jobs">Internships</a><a href="#jobs">Learnerships</a><a href="#about">About</a></nav></div><div><h3 className="font-bold">Disclaimer</h3><p className="mt-4 text-sm leading-6 text-primary-foreground/80">CurrentGradJobs is not affiliated with any company. We simply share opportunities to help you take the next step.</p></div></div><p className="mx-auto mt-10 max-w-6xl border-t border-primary-foreground/15 pt-6 text-center text-sm text-primary-foreground/70"><span className="font-semibold">Follow us:</span><SocialLinks links={socialLinks} /><span>© 2025 CurrentGradJobs. All rights reserved. </span><a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="ml-4 text-muted-foreground underline-offset-4 hover:underline">Privacy Policy</a> <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="ml-4 text-muted-foreground underline-offset-4 hover:underline">Terms of Service</a></p></footer></main>
}
