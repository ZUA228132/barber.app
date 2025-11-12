
'use client'
import React, { useEffect } from 'react'
import Configurator from '@/components/Configurator'
import { readyAndExpandUi } from '@/lib/telegram'

export default function Page(){
  useEffect(()=>{
    readyAndExpandUi()
    const tg = (window as any).Telegram?.WebApp
    tg?.onEvent?.('themeChanged', () => {})
  },[])
  return (<main style={{padding:'20px 0'}}><Configurator/></main>)
}
