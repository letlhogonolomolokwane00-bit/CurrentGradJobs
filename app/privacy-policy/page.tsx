import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | CurrentGradJobs',
  description: 'How CurrentGradJobs handles information and advertising cookies.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground sm:py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3"><a href="/" className="font-semibold text-primary hover:underline">CurrentGradJobs</a><h1 className="text-balance text-4xl font-bold tracking-tight">Privacy Policy</h1><p className="text-muted-foreground">Last updated: 29 August 2026</p></header>
        <section className="space-y-4 leading-7"><p>CurrentGradJobs respects your privacy and is committed to responsible handling of personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA) and other applicable South African law.</p><h2 className="text-2xl font-semibold">Information we collect</h2><p>We do not store user accounts, personal profiles, job application information, uploaded resumes, CVs, or other resume data. Applications are made directly through the employer&apos;s or recruiter&apos;s website, and their privacy policy applies to information submitted there.</p><h2 className="text-2xl font-semibold">Cookies and advertising</h2><p>We may use Google AdSense to display advertisements. Google and its partners may use cookies or similar technologies to show and measure relevant advertising, subject to Google&apos;s policies and your available controls. You can manage advertising personalization through Google&apos;s ad settings and control cookies through your browser.</p><h2 className="text-2xl font-semibold">Your rights</h2><p>POPIA may give you rights to access, correct, or object to the processing of personal information held by a responsible party. Since CurrentGradJobs does not store user or resume data, requests should generally be directed to the employer or recruitment site receiving your application.</p><h2 className="text-2xl font-semibold">Contact</h2><p>For questions about this policy, please contact the CurrentGradJobs site administrators through the contact details published on this website.</p></section>
      </article>
    </main>
  )
}
