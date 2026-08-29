type SocialLink = { platform: string; url: string }

type Brand = { name: string; path: string }

const brands: Record<string, Brand> = {
  whatsapp: { name: 'WhatsApp channel', path: 'M12.04 2a9.94 9.94 0 0 0-8.59 15l-1.02 3.73 3.83-1a9.99 9.99 0 1 0 5.78-17.73Zm0 18.08a8.08 8.08 0 0 1-4.12-1.13l-.3-.18-2.27.6.61-2.21-.2-.32A8.07 8.07 0 1 1 12.04 20.08Zm4.43-6.05c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-1.43-.71-2.37-1.27-3.32-2.87-.25-.43.25-.4.71-1.32.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62 1.52.66 2.12.72 2.88.61.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z' },
  facebook: { name: 'Facebook page', path: 'M13.5 21v-8h2.75l.41-3h-3.16V8.08c0-.87.24-1.46 1.5-1.46h1.8V3.94c-.31-.04-1.38-.14-2.63-.14-2.6 0-4.38 1.59-4.38 4.51V10H7v3h2.79v8h3.71Z' },
  tiktok: { name: 'TikTok profile', path: 'M16.6 5.82A4.5 4.5 0 0 0 19.5 7V4.2a4.48 4.48 0 0 1-2.9-1.1A4.5 4.5 0 0 1 15.5 0h-2.8v13.6a2.63 2.63 0 1 1-2.63-2.63c.27 0 .53.04.78.12V8.24a5.45 5.45 0 1 0 4.65 5.36V6.7a7.24 7.24 0 0 0 1.1-.88Z' },
}

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  const visibleLinks = links.filter((link) => brands[link.platform] && /^https:\/\//i.test(link.url))
  if (!visibleLinks.length) return null
  return <nav className="flex items-center gap-3" aria-label="Social media links">{visibleLinks.map((link) => { const brand = brands[link.platform]; return <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={brand.name} className="inline-flex size-11 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-colors hover:border-primary-foreground/50 hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"><svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true"><path d={brand.path} /></svg></a> })}</nav>
}
