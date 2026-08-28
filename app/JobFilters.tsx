'use client'

import { useMemo, useState } from 'react'
import { BriefcaseBusiness, CalendarDays, ExternalLink, MapPin, Search, SlidersHorizontal, X } from 'lucide-react'

type Job = {
  title: string
  company: string
  location: string
  closing_date: string | null
  apply_url: string
  is_new: boolean | null
  job_type: string | null
}

const normalize = (value: string | null | undefined) => (value ?? '').trim().toLowerCase()
const typeKey = (value: string | null) => {
  const type = normalize(value)
  if (type.includes('intern')) return 'internship'
  if (type.includes('learn')) return 'learnership'
  return 'job'
}

function Card({ job, index }: { job: Job; index: number }) {
  return <article className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:gap-6 sm:p-6"><div className="flex items-start gap-4 sm:items-center"><div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{index + 1}</div><div><h3 className="text-xl font-bold tracking-tight sm:text-2xl">{job.title}</h3><p className="mt-1 text-base">{job.company}</p><div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground"><span className="inline-flex items-center gap-1.5"><MapPin className="size-4" />{job.location}</span><span aria-hidden="true">·</span><span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="size-4" />{job.job_type ?? 'Opportunity'}</span><span aria-hidden="true">·</span><span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" />{job.closing_date ?? 'Open until filled'}</span></div>{job.is_new && <span className="mt-3 inline-flex rounded border border-emerald-600 px-2 py-0.5 text-xs font-semibold text-emerald-700">NEW</span>}</div></div><a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.02] sm:ml-auto">Apply Direct <ExternalLink className="size-4" /></a></article>
}

import AdSenseUnit from './AdSenseUnit'

function AdBreak() { return <AdSenseUnit /> }

export default function JobFilters({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [location, setLocation] = useState('all')
  const locations = useMemo(() => Array.from(new Set(jobs.map((job) => job.location).filter(Boolean))).sort(), [jobs])
  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const haystack = `${job.title} ${job.company} ${job.location} ${job.job_type}`.toLowerCase()
    return haystack.includes(query.toLowerCase()) && (selectedType === 'all' || typeKey(job.job_type) === selectedType) && (location === 'all' || job.location === location)
  }), [jobs, location, query, selectedType])
  const clear = () => { setQuery(''); setSelectedType('all'); setLocation('all') }
  const active = query || location !== 'all' || selectedType !== 'all'

  return <div className="flex flex-col gap-5"><div className="rounded-xl border border-border bg-card p-4"><div className="flex flex-col gap-3 lg:flex-row"><label className="relative flex min-h-12 flex-1 items-center"><Search className="absolute left-4 size-5 text-muted-foreground" /><span className="sr-only">Search opportunities</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs, companies, or keywords" className="h-12 w-full rounded-lg border border-border bg-background pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-ring" /></label><label className="relative flex min-h-12 items-center gap-2"><SlidersHorizontal className="size-4 text-muted-foreground" /><span className="sr-only">Filter by location</span><select value={location} onChange={(event) => setLocation(event.target.value)} className="h-12 min-w-48 rounded-lg border border-border bg-background px-4 text-base outline-none focus:ring-2 focus:ring-ring"><option value="all">All locations</option>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div><div className="mt-4 flex flex-wrap items-center gap-2"><button onClick={() => setSelectedType('all')} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedType === 'all' ? 'bg-primary text-primary-foreground' : 'border border-border bg-background'}`}>All opportunities</button><button onClick={() => setSelectedType('job')} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedType === 'job' ? 'bg-primary text-primary-foreground' : 'border border-border bg-background'}`}>Jobs</button><button onClick={() => setSelectedType('internship')} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedType === 'internship' ? 'bg-primary text-primary-foreground' : 'border border-border bg-background'}`}>Internships</button><button onClick={() => setSelectedType('learnership')} className={`rounded-full px-4 py-2 text-sm font-semibold ${selectedType === 'learnership' ? 'bg-primary text-primary-foreground' : 'border border-border bg-background'}`}>Learnerships</button>{active && <button onClick={clear} className="ml-auto inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><X className="size-4" />Clear filters</button>}</div></div><p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> of {jobs.length} opportunities</p><div className="flex flex-col gap-3">{filteredJobs.length ? filteredJobs.map((job, index) => <div key={`${job.title}-${job.company}-${index}`} className="flex flex-col gap-3"><Card job={job} index={index} />{index < filteredJobs.length - 1 && <AdBreak />}</div>) : <div className="rounded-xl border border-dashed border-border px-6 py-12 text-center"><p className="font-semibold">No opportunities found</p><p className="mt-1 text-sm text-muted-foreground">Try a different search or clear your filters.</p></div>}</div></div>
}
