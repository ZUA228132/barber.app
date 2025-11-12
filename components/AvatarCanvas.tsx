
'use client'
import React from 'react'
import { useConfig } from '@/store/config'
const Face:any={oval:'M150,70c45,0,70,38,70,85s-25,85-70,85s-70-38-70-85S105,70,150,70z',round:'M150,80c55,0,95,40,95,75s-40,95-95,95s-95-40-95-95S95,80,150,80z',square:'M95,80h110c25,0,45,20,45,45v90c0,25-20,45-45,45H95c-25,0-45-20-45-45v-90c0-25,20-45,45-45z',heart:'M150 95c20-25 70-25 85 10 10 25-5 60-35 85-20 17-36 26-50 38-14-12-30-21-50-38-30-25-45-60-35-85 15-35 65-35 85-10z'}
const Hair:any={buzz:'M70,90c20-25,60-40,80-40s60,15,80,40c-10,5-30,10-80,10s-70-5-80-10z',short:'M60,85c25-30,80-45,90-45s65,15,90,45c-15,10-30,20-90,20s-75-10-90-20z',medium:'M45,85c30-35,90-55,105-55s75,20,105,55c-10,30-20,60-20,90-25-25-45-35-85-35s-60,10-85,35c0-30-10-60-20-90z',long:'M40,90c35-45,95-65,110-65s75,20,110,65c0,70-30,130-110,160C70,220,40,160,40,90z'}
const Beard:any={none:'',stubble:'M105,190c10,25,35,35,45,35s35-10,45-35c-5,20-15,45-45,55c-30-10-40-35-45-55z',short:'M95,185c15,35,40,45,55,45s40-10,55-45c-10,25-20,60-55,70c-35-10-45-45-55-70z',full:'M85,175c20,55,45,75,65,80c20-5,45-25,65-80c-10,45-25,95-65,115c-40-20-55-70-65-115z',mustache:'M110,175c10-5,20,0,40,10c20-10,30-15,40-10c-10,20-30,25-40,25s-30-5-40-25z'}
export default function AvatarCanvas(){
  const {face,hair,beard}=useConfig()
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <svg viewBox="0 0 300 300" style={{width:'100%',maxWidth:300,filter:'drop-shadow(0 8px 26px rgba(0,0,0,.45))'}}>
        <defs>
          <linearGradient id="skin" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#f6d7c3"/><stop offset="100%" stopColor="#e7bea5"/>
          </linearGradient>
          <linearGradient id="hair" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#2b2b2b"/><stop offset="100%" stopColor="#000"/>
          </linearGradient>
        </defs>
        <path d="M135,210h30v35c-10,10-20,10-30,0z" fill="url(#skin)"/>
        <path d={Face[face]} fill="url(#skin)"/>
        <path d={Hair[hair]} fill="url(#hair)"/>
        {Beard[beard] && <path d={Beard[beard]} fill="url(#hair)" opacity="0.95"/>}
        <circle cx="120" cy="150" r="6" fill="#0e0e0f"/><circle cx="180" cy="150" r="6" fill="#0e0e0f"/>
        <path d="M100,135c10,-8 25,-8 35,0" stroke="#0e0e0f" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M165,135c10,-8 25,-8 35,0" stroke="#0e0e0f" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  )
}
