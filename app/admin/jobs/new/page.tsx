import { redirect } from 'next/navigation'
import Link from 'next/link'
import JobForm from '../../JobForm'
import { getAdminUser } from '@/lib/supabase/server'
export default async function NewJobPage() { if (!await getAdminUser()) redirect('/admin/login'); return <main className="min-h-screen bg-muted/30 px-6 py-10"><div className="mx-auto max-w-3xl"><Link href="/admin" className="text-sm font-medium">← Back to dashboard</Link><h1 className="mt-8 text-4xl font-bold">Add opportunity</h1><p className="mt-2 mb-8 text-muted-foreground">Publish a new listing to the homepage.</p><JobForm /></div></main> }
