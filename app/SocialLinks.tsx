'use client'

type SocialLink = { platform: string; url: string }

const brands: Record<string, { name: string; src: string }> = {
  whatsapp: { name: 'WhatsApp channel', src: 'https://thesvg.org/icons/whatsapp/default.svg' },
  facebook: { name: 'Facebook page', src: 'https://thesvg.org/icons/facebook/default.svg' },
  tiktok: { name: 'TikTok profile', src: 'https://thesvg.org/icons/tiktok/default.svg' },
}

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  if (!links.length) return null
  return (
    <nav className="flex items-center gap-5" aria-label="Social media links">
      {links.map((link) => {
        const brand = brands[link.platform]
        if (!brand) return null
        return (
          <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={brand.name} className="inline-flex size-12 items-center justify-center rounded-full bg-primary-foreground p-3 shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
            <img src={brand.src} alt="" className="size-6" />
          </a>
        )
      })}
    </nav>
  )
}
