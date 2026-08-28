import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import JobForm from '../../../JobForm'
import { createClient, getAdminUser } from '@/lib/supabase/server'
export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) { if (!await getAdminUser()) redirect('/admin/login'); const { id } = await params; const { data: job } = await (await createClient()).from('jobs').select('id,title,company,location,job_type,closing_date,apply_url,is_new').eq('id', id).single(); if (!job) notFound(); return <main className="min-h-screen bg-muted/30 px-6 py-10"><div className="mx-auto max-w-3xl"><Link href="/admin" className="text-sm font-medium">← Back to dashboard</Link><h1 className="mt-8 text-4xl font-bold">Edit opportunity</h1><p className="mt-2 mb-8 text-muted-foreground">Update the listing details.</p><JobForm job={job} /></div></main> }
