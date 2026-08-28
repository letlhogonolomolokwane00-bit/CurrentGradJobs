const JOB_TYPES = new Set(['Full-time', 'Part-time', 'Internship', 'Learnership', 'Contract', 'Temporary', 'Volunteer'])

export type JobPayload = {
  title: string
  company: string
  location: string
  job_type: string
  closing_date: string | null
  apply_url: string
  is_new: boolean
}

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export function validateJobPayload(body: unknown, partial = false): { payload?: JobPayload; error?: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid request.' }
  const input = body as Record<string, unknown>
  const title = text(input.title, 160)
  const company = text(input.company, 160)
  const location = text(input.location, 160)
  const job_type = text(input.job_type, 40)
  const apply_url = text(input.apply_url, 2048)
  const closing_date = input.closing_date ? text(input.closing_date, 10) : null
  if (!partial && (!title || !company || !location || !job_type || !apply_url)) return { error: 'Required fields are missing.' }
  if (job_type && !JOB_TYPES.has(job_type)) return { error: 'Invalid job type.' }
  if (apply_url && (!URL.canParse(apply_url) || !apply_url.startsWith('https://'))) return { error: 'Application links must use HTTPS.' }
  if (closing_date && !/^\d{4}-\d{2}-\d{2}$/.test(closing_date)) return { error: 'Invalid closing date.' }
  return { payload: { title, company, location, job_type, closing_date, apply_url, is_new: input.is_new === true || input.is_new === 'on' } }
}
