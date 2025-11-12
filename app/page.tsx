
'use client'
import React, { useEffect } from 'react'
import Configurator from '@/components/Configurator'

export default function Page() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    tg?.onEvent?.('themeChanged', () => {})
  }, [])

  return (
    <main className="py-6">
      <Configurator />
    </main>
  )
}
