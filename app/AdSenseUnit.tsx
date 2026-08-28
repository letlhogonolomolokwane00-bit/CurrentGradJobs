'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdSenseUnit() {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.dataset.adsbygoogleStatus) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('[v0] AdSense unit failed to initialize:', error)
    }
  }, [])

  return (
    <div className="min-h-24 overflow-hidden rounded-xl border border-dashed border-muted-foreground/45 bg-muted/40 px-4 py-4">
      <ins ref={adRef} className="adsbygoogle block min-h-16" style={{ display: 'block' }} data-ad-client="ca-pub-3963548836301053" data-ad-slot="7923114203" data-ad-format="auto" data-full-width-responsive="true" />
    </div>
  )
}
