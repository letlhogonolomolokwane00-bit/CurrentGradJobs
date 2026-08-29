import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | CurrentGradJobs',
  description: 'Terms governing use of the CurrentGradJobs opportunity listings website.',
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground sm:py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3"><a href="/" className="font-semibold text-primary hover:underline">CurrentGradJobs</a><h1 className="text-balance text-4xl font-bold tracking-tight">Terms of Service</h1><p className="text-muted-foreground">Last updated: 29 August 2026</p></header>
        <section className="space-y-4 leading-7"><p>By using CurrentGradJobs, you agree to these terms. The site provides curated job, internship, and learnership listings for general informational purposes.</p><h2 className="text-2xl font-semibold">Listings and applications</h2><p>We do not guarantee that a listing is accurate, current, available, or suitable for you. You are responsible for checking details and applying directly with the relevant employer or recruiter. We do not store user information, application data, resumes, CVs, or other documents submitted through external application websites.</p><h2 className="text-2xl font-semibold">Acceptable use</h2><p>You must use the site lawfully and must not interfere with its operation, scrape it in a way that harms the service, or misuse any contact or listing information.</p><h2 className="text-2xl font-semibold">Advertising and external links</h2><p>The site may display Google AdSense advertisements and link to third-party websites. Those services may use cookies and have their own terms and privacy policies. CurrentGradJobs is not responsible for third-party content, availability, recruitment decisions, or data practices.</p><h2 className="text-2xl font-semibold">Disclaimer and changes</h2><p>CurrentGradJobs is provided on an “as available” basis to the extent permitted by South African law. We may update listings, these terms, or the site without notice. Continued use after changes means you accept the updated terms.</p><h2 className="text-2xl font-semibold">Contact</h2><p>For questions about these terms, please contact the CurrentGradJobs site administrators through the contact details published on this website.</p></section>
      </article>
    </main>
  )
}
